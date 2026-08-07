import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import logoMark from "@/assets/logo-mark.png";

/** Brand splash shown briefly on first paint. */
export function LogoLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative grid place-items-center">
            <motion.span
              className="absolute h-32 w-32 rounded-full bg-primary/25 blur-2xl"
              animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src={logoMark}
              alt="ElevateHub Ltd"
              width={96}
              height={96}
              className="relative h-20 w-20"
              initial={{ scale: 0.7, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <motion.div
            className="absolute bottom-[38%] h-[3px] w-40 overflow-hidden rounded-full bg-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              className="block h-full w-1/3 rounded-full bg-spark"
              animate={{ x: ["-120%", "320%"] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
