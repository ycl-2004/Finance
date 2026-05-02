import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import type { SearchItem } from "@/content/schema";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { ScrollRestoration } from "@/components/motion/ScrollRestoration";

export function SiteShell({
  children,
  searchItems
}: {
  children: ReactNode;
  searchItems: SearchItem[];
}) {
  return (
    <LocaleProvider>
      <div className="site-shell">
        <a className="skip-link" href="#main-content">
          跳到主要内容
        </a>
        <ScrollRestoration />
        <div className="site-frame">
          <Header searchItems={searchItems} />
          <MotionRoot>{children}</MotionRoot>
          <Footer />
        </div>
      </div>
    </LocaleProvider>
  );
}
