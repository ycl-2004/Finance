import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: {
    default: "QM Financial Learning Hub",
    template: "%s | QM Financial Learning Hub"
  },
  description: "中文加拿大金融顾问会前准备平台，帮助用户按场景整理资料、问题和学习内容。",
  openGraph: {
    title: "QM Financial Learning Hub",
    description: "中文加拿大金融顾问会前准备平台，按场景生成资料清单并整理顾问问题。",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans" data-scroll-behavior="smooth">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
