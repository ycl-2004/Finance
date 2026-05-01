"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealElement = "section" | "div" | "header" | "article" | "aside";

type RevealProps = {
  as?: RevealElement;
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  layoutId?: string;
  role?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
};

const components = {
  section: motion.section,
  div: motion.div,
  header: motion.header,
  article: motion.article,
  aside: motion.aside
};

export function Reveal({
  as = "section",
  children,
  className,
  delay = 0,
  id,
  layoutId,
  role,
  ariaLabel,
  ariaLabelledBy
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = components[as];

  return (
    <Component
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={className}
      id={id}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
      layoutId={layoutId}
      role={role}
      transition={{ duration: 0.56, delay, ease }}
      viewport={{ once: true, amount: 0.18 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </Component>
  );
}

export function RevealGroup({
  children,
  className,
  as = "section",
  ariaLabel,
  ariaLabelledBy
}: Omit<RevealProps, "delay" | "id" | "layoutId" | "role">) {
  const shouldReduceMotion = useReducedMotion();
  const Component = components[as];

  return (
    <Component
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : 0.08
          }
        }
      }}
      viewport={{ once: true, amount: 0.14 }}
      whileInView="visible"
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease } }
      }}
    >
      {children}
    </motion.div>
  );
}
