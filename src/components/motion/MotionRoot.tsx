"use client";

import type { ReactNode } from "react";
import { LayoutGroup, MotionConfig } from "motion/react";

export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id="qm-layout">
        <main className="page-shell" id="main-content">{children}</main>
      </LayoutGroup>
    </MotionConfig>
  );
}
