import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export default function NotFound() {
  return (
    <Reveal className="page-hero">
      <p className="eyebrow">404</p>
      <h1>没有找到这个页面</h1>
      <p className="lead">这个链接可能已经移动，或者对应内容还没有建立。</p>
      <div className="actions">
        <Link className="button button--primary" href="/">
          回到首页
        </Link>
        <Link className="button" href="/learn">
          查看学习路线
        </Link>
      </div>
    </Reveal>
  );
}
