import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { ScrollRestoration } from "@/components/motion/ScrollRestoration";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <ScrollRestoration />
      <div className="site-frame">
        <Header />
        <MotionRoot>{children}</MotionRoot>
        <Footer />
      </div>
    </div>
  );
}
