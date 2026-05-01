import Link from "next/link";
import { getSearchIndex } from "@/content/load-knowledge";
import { SearchBox } from "@/components/search/SearchBox";

const navItems = [
  { href: "/learn", label: "开始学习" },
  { href: "/scenarios", label: "生活场景" },
  { href: "/topics", label: "主题知识库" },
  { href: "/glossary", label: "术语表" },
  { href: "/cases", label: "案例练习" },
  { href: "/documents", label: "资料清单" }
];

export async function Header() {
  const searchIndex = await getSearchIndex();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">Q</span>
          <span className="brand-copy">
            <strong>QM Financial Learning Hub</strong>
            <span>中文加拿大金融学习中心</span>
          </span>
        </Link>
        <nav className="main-nav" aria-label="主导航">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-search">
          <SearchBox items={searchIndex} />
        </div>
      </div>
    </header>
  );
}
