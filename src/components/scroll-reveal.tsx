import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  index?: number;
  className?: string;
  direction?: "up" | "left" | "right";
};

/**
 * Reveals children with a staggered scroll-triggered animation.
 * Wrap individual items in a list for a cascading effect.
 */
export default function ScrollReveal({ children, index = 0, className, direction = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const initialPos = direction === "up"
    ? { opacity: 0, y: 24 }
    : direction === "left"
      ? { opacity: 0, x: -24 }
      : { opacity: 0, x: 24 };

  const animatePos = direction === "up"
    ? { opacity: 1, y: 0 }
    : { opacity: 1, x: 0 };

  return (
    <motion.div
      ref={ref}
      initial={initialPos}
      animate={isInView ? animatePos : initialPos}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
