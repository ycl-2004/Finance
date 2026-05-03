"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion, MotionConfig, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function MotionRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id="qm-layout">
        <motion.main
          animate={{ opacity: 1, y: 0 }}
          className="page-shell"
          id="main-content"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          key={pathname}
          transition={{ duration: shouldReduceMotion ? 0 : 0.42, ease }}
        >
          {children}
        </motion.main>
      </LayoutGroup>
    </MotionConfig>
  );
}
