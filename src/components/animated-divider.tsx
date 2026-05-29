import { motion, useInView } from "motion/react";
import { useRef } from "react";

/**
 * Animated gradient divider line that reveals on scroll.
 */
export default function AnimatedDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex justify-center py-2">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="h-px w-full max-w-xs"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.52 0.19 250 / 0.4), transparent)",
          transformOrigin: "center",
        }}
      />
    </div>
  );
}
