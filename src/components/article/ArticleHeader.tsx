import Link from "next/link";
import type { Article } from "@/content/schema";
import { scenarios } from "@/data/scenarios";
import { getTopicTitle } from "@/data/topic-metadata";
import { scenarioRoute, topicRoute } from "@/lib/routes";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { Reveal } from "@/components/motion/Reveal";
import { BoundaryNotice } from "./BoundaryNotice";

export function ArticleHeader({ article }: { article: Article }) {
  const relatedScenarios = scenarios
    .filter((scenario) => scenario.relatedArticles.includes(article.slug))
    .slice(0, 3);

  return (
    <Reveal as="header" className="page-hero article-hero" layoutId={`article-${article.slug}`}>
      <p className="eyebrow">
        <Link href={topicRoute(article.topic)}>{getTopicTitle(article.topic)}</Link>
      </p>
      <HeroTitle text={article.title} />
      <p className="lead">{article.summary}</p>
      <div className="meta-row" aria-label="文章信息">
        <span className="tag tag--accent">{article.difficulty}</span>
        <span className="tag">{article.estimatedMinutes} 分钟阅读</span>
        <span className="tag">校准：{article.lastReviewed}</span>
        <span className="tag">{article.audience}</span>
      </div>
      <div className="article-prep-strip">
        <div>
          <span>适用场景</span>
          <div>
            {relatedScenarios.length ? (
              relatedScenarios.map((scenario) => (
                <Link href={scenarioRoute(scenario.slug)} key={scenario.slug}>
                  {scenario.shortTitle}
                </Link>
              ))
            ) : (
              <Link href="/planning">选择你的场景</Link>
            )}
          </div>
        </div>
        <Link className="button button--primary" href="/documents">
          建议先完成：资料准备
        </Link>
      </div>
      <BoundaryNotice compact />
    </Reveal>
  );
}
