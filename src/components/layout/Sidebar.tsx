import Link from "next/link";
import { topicMetadata } from "@/data/topic-metadata";
import { topicRoute } from "@/lib/routes";

export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="侧边导航">
      <section className="sidebar__section">
        <h2>学习入口</h2>
        <nav className="sidebar__nav">
          <Link href="/learn">开始学习</Link>
          <Link href="/scenarios">生活场景</Link>
          <Link href="/glossary">术语表</Link>
          <Link href="/cases">案例练习</Link>
          <Link href="/documents">资料清单</Link>
        </nav>
      </section>
      <section className="sidebar__section">
        <h2>主题</h2>
        <nav className="sidebar__nav">
          {topicMetadata
            .filter((topic) => topic.order >= 10)
            .map((topic) => (
              <Link href={topicRoute(topic.slug)} key={topic.slug}>
                {topic.title}
              </Link>
            ))}
        </nav>
      </section>
    </aside>
  );
}
