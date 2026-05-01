"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroTitle({ id, lines }: { id?: string; lines: string[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.h1
      animate="visible"
      className="hero-title"
      id={id}
      initial={false}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : 0.09
          }
        }
      }}
    >
      {lines.map((line) => (
        <motion.span
          className="hero-title__line"
          key={line}
          variants={{
            hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease } }
          }}
        >
          {line}
        </motion.span>
      ))}
    </motion.h1>
  );
}
