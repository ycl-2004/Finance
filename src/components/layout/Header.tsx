import Link from "next/link";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/planning", label: "开始规划" },
  { href: "/documents", label: "资料准备" },
  { href: "/learn", label: "学习中心" },
  { href: "/about", label: "关于我们" }
];

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">Q</span>
          <span className="brand-copy">
            <strong>QM Financial</strong>
            <span>Learning Hub</span>
          </span>
        </Link>
        <nav className="main-nav" aria-label="主导航">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="top-actions">
          <Link className="button button--primary button--nav" href="/planning">
            开始规划
          </Link>
          <button className="lang-button" type="button">
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
