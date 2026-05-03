"use client";

import { motion, useReducedMotion } from "motion/react";
import { splitTitleOnComma } from "@/lib/title-format";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroTitle({
  id,
  lines,
  text
}: {
  id?: string;
  lines?: string[];
  text?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const titleLines = lines ?? splitTitleOnComma(text ?? "");

  return (
    <motion.h1
      animate="visible"
      className="hero-title"
      id={id}
      initial={shouldReduceMotion ? false : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : 0.09
          }
        }
      }}
    >
      {titleLines.map((line, index) => (
        <span className="hero-title__mask" key={`${line}-${index}`}>
          <motion.span
            className="hero-title__line"
            variants={{
              hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: "105%" },
              visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease } }
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
