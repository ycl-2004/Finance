import Link from "next/link";
import type { Article } from "@/content/schema";
import { getTopicTitle } from "@/data/topic-metadata";
import { topicRoute } from "@/lib/routes";
import { BoundaryNotice } from "./BoundaryNotice";

export function ArticleHeader({ article }: { article: Article }) {
  return (
    <header className="article-header">
      <p className="eyebrow">
        <Link href={topicRoute(article.topic)}>{getTopicTitle(article.topic)}</Link>
      </p>
      <h1>{article.title}</h1>
      <p className="lead">{article.summary}</p>
      <div className="meta-row" aria-label="文章信息">
        <span className="tag tag--accent">{article.difficulty}</span>
        <span className="tag">{article.estimatedMinutes} 分钟阅读</span>
        <span className="tag">校准：{article.lastReviewed}</span>
        <span className="tag">{article.audience}</span>
      </div>
      <BoundaryNotice compact />
    </header>
  );
}
