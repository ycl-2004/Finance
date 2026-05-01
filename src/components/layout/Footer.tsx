import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span>资料校准时间以各文章标注为准，实际使用前请重新核对。</span>
        <span>
          <Link href="/boundaries">教育边界</Link> · <Link href="/documents">资料清单</Link>
        </span>
      </div>
    </footer>
  );
}
