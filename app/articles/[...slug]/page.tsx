import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { Sidebar } from "@/components/layout/Sidebar";
import { getAllArticles, getArticleBySlug } from "@/content/load-knowledge";
import { learningPath } from "@/data/learning-path";
import { scenarios } from "@/data/scenarios";
import { articleRoute, scenarioRoute, topicRoute } from "@/lib/routes";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slugParts }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  return {
    title: article?.title ?? "文章"
  };
}

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const relatedStages = learningPath.filter(
    (stage) =>
      stage.requiredArticles.includes(article.slug) || stage.optionalArticles.includes(article.slug)
  );
  const relatedScenarios = scenarios.filter((scenario) =>
    scenario.relatedArticles.includes(article.slug)
  );
  const articles = await getAllArticles();
  const sameTopic = articles.filter((item) => item.topic === article.topic);
  const nextArticle =
    sameTopic[(sameTopic.findIndex((item) => item.slug === article.slug) + 1) % sameTopic.length];

  return (
    <div className="article-layout">
      <Sidebar />
      <section>
        <ArticleHeader article={article} />
        <ArticleBody html={article.html} />
      </section>
      <aside className="right-rail">
        <h2>学习节点</h2>
        <ul>
          {relatedStages.map((stage) => (
            <li key={stage.id}>
              <Link href={`/learn#${stage.id}`}>{stage.title}</Link>
            </li>
          ))}
          {!relatedStages.length && (
            <li>
              <Link href={topicRoute(article.topic)}>回到主题</Link>
            </li>
          )}
        </ul>
        <h2 style={{ marginTop: 18 }}>相关场景</h2>
        <ul>
          {relatedScenarios.map((scenario) => (
            <li key={scenario.slug}>
              <Link href={scenarioRoute(scenario.slug)}>{scenario.title}</Link>
            </li>
          ))}
          {!relatedScenarios.length && <li className="muted">暂无直接关联场景</li>}
        </ul>
        <h2 style={{ marginTop: 18 }}>下一步</h2>
        <ul>
          {nextArticle && nextArticle.slug !== article.slug && (
            <li>
              <Link href={articleRoute(nextArticle.slug)}>{nextArticle.title}</Link>
            </li>
          )}
          <li>
            <Link href={topicRoute(article.topic)}>查看完整主题</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
