import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MotionRoot } from "@/components/motion/MotionRoot";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <Header />
      <MotionRoot>{children}</MotionRoot>
      <Footer />
    </div>
  );
}
