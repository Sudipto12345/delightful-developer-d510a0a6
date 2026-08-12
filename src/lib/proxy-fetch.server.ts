// HTTPS-over-HTTP-proxy fetch for the Cloudflare Workers runtime.
//
// QuotaGuard Static is a forward proxy: an HTTPS request must be tunnelled with
// an HTTP CONNECT request and then upgraded to TLS. Plain `fetch()` cannot do
// that, so we open a raw socket to the proxy, send CONNECT, call startTls() and
// speak HTTP/1.1 to the origin over the tunnel.

type ProxyParts = { host: string; port: number; auth?: string };

function parseProxy(proxyUrl: string): ProxyParts {
  const u = new URL(proxyUrl);
  const username = decodeURIComponent(u.username);
  const password = decodeURIComponent(u.password);
  const port = Number(u.port || (u.protocol === "https:" ? 443 : 80));
  const parts: ProxyParts = { host: u.hostname, port };
  if (username) parts.auth = btoa(`${username}:${password}`);
  return parts;
}

function headersToLines(headers: Headers): string {
  const lines: string[] = [];
  headers.forEach((value, key) => {
    if (key.toLowerCase() === "host") return;
    lines.push(`${key}: ${value}`);
  });
  return lines.join("\r\n");
}

function indexOfSequence(buf: Uint8Array, seq: number[], from = 0): number {
  outer: for (let i = from; i <= buf.length - seq.length; i++) {
    for (let j = 0; j < seq.length; j++) if (buf[i + j] !== seq[j]) continue outer;
    return i;
  }
  return -1;
}

function concat(a: Uint8Array, b: Uint8Array): Uint8Array {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

const CRLF2 = [13, 10, 13, 10];

/** Fetch an absolute https:// URL through an HTTP forward proxy. */
export async function proxyFetch(
  target: string,
  init: RequestInit,
  proxyUrl: string,
): Promise<Response> {
  const { connect } = (await import("cloudflare:sockets")) as {
    connect: (
      addr: { hostname: string; port: number },
      opts?: { secureTransport?: "on" | "off" | "starttls"; allowHalfOpen?: boolean },
    ) => {
      readable: ReadableStream<Uint8Array>;
      writable: WritableStream<Uint8Array>;
      startTls: () => {
        readable: ReadableStream<Uint8Array>;
        writable: WritableStream<Uint8Array>;
        close: () => Promise<void>;
      };
      close: () => Promise<void>;
    };
  };

  const proxy = parseProxy(proxyUrl);
  const url = new URL(target);
  const originPort = url.port || "443";

  const socket = connect(
    { hostname: proxy.host, port: proxy.port },
    { secureTransport: "starttls", allowHalfOpen: false },
  );

  const encoder = new TextEncoder();
  const writer = socket.writable.getWriter();
  const reader = socket.readable.getReader();

  const connectLines = [
    `CONNECT ${url.hostname}:${originPort} HTTP/1.1`,
    `Host: ${url.hostname}:${originPort}`,
    proxy.auth ? `Proxy-Authorization: Basic ${proxy.auth}` : "",
    "Proxy-Connection: keep-alive",
    "",
    "",
  ]
    .filter((l, i, arr) => l !== "" || i >= arr.length - 2)
    .join("\r\n");

  await writer.write(encoder.encode(connectLines));

  // Read the proxy's CONNECT response.
  let buf = new Uint8Array(0);
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    if (value) buf = concat(buf, value);
    if (indexOfSequence(buf, CRLF2) !== -1) break;
  }
  const connectHead = new TextDecoder().decode(buf.slice(0, indexOfSequence(buf, CRLF2)));
  const statusLine = connectHead.split("\r\n")[0] ?? "";
  if (!/ 2\d\d /.test(`${statusLine} `)) {
    reader.releaseLock();
    writer.releaseLock();
    await socket.close().catch(() => {});
    throw new Error(`Static-IP proxy refused CONNECT: ${statusLine || "no response"}`);
  }

  reader.releaseLock();
  writer.releaseLock();

  // Upgrade the tunnel to TLS with the origin (SNI = origin hostname).
  const tls = socket.startTls();
  const tlsWriter = tls.writable.getWriter();
  const tlsReader = tls.readable.getReader();

  const method = (init.method ?? "GET").toUpperCase();
  const headers = new Headers(init.headers);
  const bodyText = typeof init.body === "string" ? init.body : undefined;
  headers.set("Host", url.hostname);
  headers.set("Connection", "close");
  headers.set("Accept-Encoding", "identity");
  if (bodyText !== undefined) {
    headers.set("Content-Length", String(new TextEncoder().encode(bodyText).length));
  } else if (method === "POST") {
    headers.set("Content-Length", "0");
  }

  const requestText =
    `${method} ${url.pathname}${url.search} HTTP/1.1\r\n` +
    `Host: ${url.hostname}\r\n` +
    `${headersToLines(headers)}\r\n\r\n` +
    (bodyText ?? "");

  await tlsWriter.write(encoder.encode(requestText));

  let raw = new Uint8Array(0);
  for (;;) {
    const { value, done } = await tlsReader.read();
    if (done) break;
    if (value) raw = concat(raw, value);
  }
  tlsReader.releaseLock();
  tlsWriter.releaseLock();
  await tls.close().catch(() => {});

  const headEnd = indexOfSequence(raw, CRLF2);
  if (headEnd === -1) throw new Error("Malformed response from static-IP proxy tunnel");
  const headText = new TextDecoder().decode(raw.slice(0, headEnd));
  const bodyBytes = raw.slice(headEnd + 4);

  const [status, ...headerLines] = headText.split("\r\n");
  const statusCode = Number((status ?? "").split(" ")[1] ?? 502);
  const resHeaders = new Headers();
  let chunked = false;
  for (const line of headerLines) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key.toLowerCase() === "transfer-encoding" && /chunked/i.test(value)) chunked = true;
    if (["transfer-encoding", "content-length", "connection"].includes(key.toLowerCase())) continue;
    resHeaders.append(key, value);
  }

  let bodyOut = new TextDecoder().decode(bodyBytes);
  if (chunked) {
    let rest = bodyOut;
    let decoded = "";
    for (;;) {
      const nl = rest.indexOf("\r\n");
      if (nl === -1) break;
      const size = parseInt(rest.slice(0, nl).trim(), 16);
      if (!Number.isFinite(size) || size === 0) break;
      decoded += rest.slice(nl + 2, nl + 2 + size);
      rest = rest.slice(nl + 2 + size + 2);
    }
    bodyOut = decoded;
  }

  return new Response(bodyOut, { status: statusCode || 502, headers: resHeaders });
}
