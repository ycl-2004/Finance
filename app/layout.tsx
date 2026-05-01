import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: {
    default: "QM Financial Learning Hub",
    template: "%s | QM Financial Learning Hub"
  },
  description: "中文加拿大金融学习中心，面向小白学习和客户教育场景。",
  openGraph: {
    title: "QM Financial Learning Hub",
    description: "中文加拿大金融学习中心，按学习路线、生活场景和主题知识库组织。",
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
