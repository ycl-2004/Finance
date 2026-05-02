"use client";

import Link from "next/link";
import { AppIcon } from "@/components/icons/AppIcon";
import { SearchBox } from "@/components/search/SearchBox";
import type { SearchItem } from "@/content/schema";
import { useLocale } from "@/i18n/LocaleProvider";

const navItems = [
  { href: "/", zh: "首页", en: "Home" },
  { href: "/planning", zh: "开始规划", en: "Start planning" },
  { href: "/documents", zh: "资料准备", en: "Documents" },
  { href: "/learn", zh: "学习中心", en: "Learning" },
  { href: "/about", zh: "关于我们", en: "About" }
];

export function Header({ searchItems }: { searchItems: SearchItem[] }) {
  const { locale, toggleLocale } = useLocale();
  const isEnglish = locale === "en";

  return (
    <header className="site-header" data-no-translate>
      <div className="site-header__inner">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">Q</span>
          <span className="brand-copy">
            <strong>QM Financials</strong>
            <span>{isEnglish ? "Preparation Hub" : "顾问会前准备中心"}</span>
          </span>
        </Link>
        <nav className="main-nav" aria-label={isEnglish ? "Main navigation" : "主导航"}>
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {isEnglish ? item.en : item.zh}
            </Link>
          ))}
        </nav>
        <div className="header-search">
          <SearchBox items={searchItems} />
        </div>
        <div className="top-actions">
          <Link className="button button--primary button--nav" href="/planning">
            <AppIcon name="route" />
            {isEnglish ? "Start planning" : "开始规划"}
          </Link>
          <button
            aria-label={isEnglish ? "Switch to Chinese" : "切换到英文"}
            className="lang-button"
            onClick={toggleLocale}
            type="button"
          >
            {isEnglish ? "ZH" : "EN"}
          </button>
        </div>
      </div>
    </header>
  );
}
