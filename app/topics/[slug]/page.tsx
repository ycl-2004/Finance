import Link from "next/link";
import { notFound } from "next/navigation";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { getArticlesByTopic } from "@/content/load-knowledge";
import { learningPath } from "@/data/learning-path";
import { scenarios } from "@/data/scenarios";
import { getTopicBySlug, topicMetadata } from "@/data/topic-metadata";
import { articleRoute, scenarioRoute } from "@/lib/routes";

export function generateStaticParams() {
  return topicMetadata.map((topic) => ({ slug: topic.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  return {
    title: topic?.title ?? "主题知识库"
  };
}

export default async function TopicDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const articles = await getArticlesByTopic(slug);
  const relatedStages = learningPath.filter(
    (stage) =>
      stage.requiredArticles.some((articleSlug) => articleSlug.includes(slug)) ||
      stage.optionalArticles.some((articleSlug) => articleSlug.includes(slug))
  );
  const relatedScenarios = scenarios.filter((scenario) =>
    scenario.relatedArticles.some((articleSlug) => articleSlug.includes(slug))
  );

  return (
    <div className="page-grid">
      <section>
        <header className="article-header">
          <p className="eyebrow">{topic.englishTitle}</p>
          <h1>{topic.title}</h1>
          <p className="lead">{topic.description}</p>
          <div className="meta-row">
            <span className="tag tag--accent">{topic.primaryQuestion}</span>
            <span className="tag">{articles.length} 篇文章</span>
          </div>
          <BoundaryNotice compact />
        </header>

        <section className="grid">
          {articles.map((article) => (
            <Link className="card" href={articleRoute(article.slug)} key={article.slug}>
              <div className="meta-row">
                <span className="tag tag--accent">{article.difficulty}</span>
                <span className="tag">{article.estimatedMinutes} 分钟</span>
                <span className="tag">校准：{article.lastReviewed}</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
            </Link>
          ))}
        </section>
      </section>
      <aside className="right-rail">
        <h2>相关学习阶段</h2>
        <ul>
          {relatedStages.map((stage) => (
            <li key={stage.id}>
              <Link href={`/learn#${stage.id}`}>{stage.title}</Link>
            </li>
          ))}
        </ul>
        <h2 style={{ marginTop: 18 }}>相关生活场景</h2>
        <ul>
          {relatedScenarios.map((scenario) => (
            <li key={scenario.slug}>
              <Link href={scenarioRoute(scenario.slug)}>{scenario.title}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
