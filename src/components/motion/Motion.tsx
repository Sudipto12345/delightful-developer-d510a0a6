import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.98 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent =
          Math.round(v).toLocaleString("en-US", { maximumFractionDigits: 0 }) + suffix;
      }
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function Parallax({
  children,
  amount = 60,
  className,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Lightweight CSS 3D object — rotating cobalt cube with depth layers. */
export function CobaltCube({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <div className="relative h-40 w-40 [perspective:900px]">
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          animate={{ rotateX: [12, 22, 12], rotateY: [0, 360] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {[
            "translateZ(80px)",
            "rotateY(180deg) translateZ(80px)",
            "rotateY(90deg) translateZ(80px)",
            "rotateY(-90deg) translateZ(80px)",
            "rotateX(90deg) translateZ(80px)",
            "rotateX(-90deg) translateZ(80px)",
          ].map((t) => (
            <div
              key={t}
              className="absolute inset-0 rounded-sm border border-primary-soft/40 bg-cobalt/40 backdrop-blur-[1px]"
              style={{ transform: t, opacity: 0.55 }}
            />
          ))}
        </motion.div>
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-24 w-24 rounded-full bg-spark opacity-30 blur-2xl" />
        </div>
      </div>
    </div>
  );
}

/**
 * Ambient site-wide background: drifting depth-layered orbs with a subtle
 * pointer-driven 3D tilt. Fixed behind all page content, used once in
 * PublicShell so every public page gets the same living backdrop.
 */
export function AmbientBackground() {
  const [reduced, setReduced] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 35, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 35, damping: 18, mass: 0.6 });
  const rotateX = useTransform(sy, [-1, 1], [4, -4]);
  const rotateY = useTransform(sx, [-1, 1], [-4, 4]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    function handlePointerMove(e: PointerEvent) {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    }
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduced, mx, my]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [perspective:1200px]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 grid-noise opacity-[0.12]" />
      <motion.div
        style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }}
        className="absolute inset-0 [transform-style:preserve-3d]"
      >
        <div
          className="absolute -top-40 -left-32 h-[26rem] w-[26rem] rounded-full bg-cobalt opacity-25 blur-[110px] animate-float"
          style={{ transform: "translateZ(-40px)" }}
        />
        <div
          className="absolute top-1/3 -right-40 h-[22rem] w-[22rem] rounded-full bg-spark opacity-[0.18] blur-[100px] animate-float"
          style={{ transform: "translateZ(-20px)", animationDelay: "1.4s" }}
        />
        <div
          className="absolute bottom-[-9rem] left-1/4 h-[20rem] w-[20rem] rounded-full bg-cobalt opacity-[0.12] blur-[100px] animate-spin-slow"
          style={{ transform: "translateZ(-60px)" }}
        />
      </motion.div>
    </div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const list = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-3">
      <div className="flex w-max animate-marquee gap-8">
        {list.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
