"use client";

import { motion, useReducedMotion } from "framer-motion";

// Fades + slides its children in the first time they scroll into view.
// Respects the user's "reduce motion" setting.
export default function Reveal({ children, delay = 0, y = 24, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
