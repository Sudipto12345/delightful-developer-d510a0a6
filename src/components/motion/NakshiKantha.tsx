import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Nakshi Kantha motifs — running-stitch dividers and a stitched sun/lotus
 * roundel, referencing traditional Bengali kantha embroidery. Used sparingly
 * as ElevateHub's signature visual element.
 */

export function KanthaDivider({
  className = "",
  segments = 20,
}: {
  className?: string;
  segments?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const width = segments * 60;

  let wave = `M0 16`;
  for (let i = 0; i < segments; i++) {
    const x = i * 60 + 60;
    wave += ` Q ${i * 60 + 30} ${i % 2 === 0 ? 2 : 30}, ${x} 16`;
  }

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} 32`}
      preserveAspectRatio="none"
      className={`h-5 w-full text-accent/60 ${className}`}
      aria-hidden="true"
    >
      <motion.path
        d={wave}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeDasharray="5 6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
      {Array.from({ length: segments + 1 }).map((_, i) => (
        <motion.rect
          key={i}
          x={i * 60 - 4}
          y={12}
          width={8}
          height={8}
          rx={1.5}
          transform={`rotate(45 ${i * 60} 16)`}
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 0.85, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.2 + i * 0.04 }}
        />
      ))}
    </svg>
  );
}

export function KanthaMotif({ className = "", size = 160 }: { className?: string; size?: number }) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 200 200"
        className="h-full w-full text-accent"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="1 7"
          strokeLinecap="round"
        />
        <circle
          cx="100"
          cy="100"
          r="64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 6"
          strokeLinecap="round"
        />
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const x1 = 100 + Math.cos(angle) * 42;
          const y1 = 100 + Math.sin(angle) * 42;
          const x2 = 100 + Math.cos(angle) * 58;
          const y2 = 100 + Math.sin(angle) * 58;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          );
        })}
        <circle
          cx="100"
          cy="100"
          r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 5"
        />
        <circle cx="100" cy="100" r="5" fill="currentColor" />
      </motion.svg>
    </div>
  );
}
