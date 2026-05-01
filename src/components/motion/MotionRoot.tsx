"use client";

import type { ReactNode } from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "motion/react";
import { usePathname } from "next/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

export function MotionRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id="qm-layout">
        <AnimatePresence initial={false} mode="sync">
          <motion.main
            animate={{ opacity: 1, y: 0 }}
            className="page-shell"
            exit={{ opacity: 0, y: -10 }}
            initial={false}
            key={pathname}
            transition={{ duration: 0.46, ease }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </LayoutGroup>
    </MotionConfig>
  );
}
