import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span>我们不提供投资、保险、税务或法律建议；我们帮助你在见专业人士前理解和准备。</span>
        <span>
          <Link href="/about">关于我们</Link> · <Link href="/boundaries">教育边界</Link> ·{" "}
          <Link href="/privacy">隐私说明</Link> · <Link href="/documents">资料准备</Link> ·{" "}
          <Link href="/consultation">预约准备会</Link>
        </span>
      </div>
    </footer>
  );
}
