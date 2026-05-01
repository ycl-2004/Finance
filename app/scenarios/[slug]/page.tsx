import Link from "next/link";
import { notFound } from "next/navigation";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { getArticlesBySlugs } from "@/content/load-knowledge";
import { getScenarioBySlug, scenarios } from "@/data/scenarios";
import { articleRoute } from "@/lib/routes";

export function generateStaticParams() {
  return scenarios.map((scenario) => ({ slug: scenario.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scenario = getScenarioBySlug(slug);
  return {
    title: scenario?.title ?? "生活场景"
  };
}

export default async function ScenarioDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scenario = getScenarioBySlug(slug);
  if (!scenario) notFound();
  const relatedArticles = await getArticlesBySlugs(scenario.relatedArticles);

  return (
    <div className="page-grid">
      <section>
        <header className="article-header">
          <p className="eyebrow">生活场景 / 按问题学习</p>
          <h1>{scenario.title}</h1>
          <p className="lead">{scenario.problem}</p>
          <div className="meta-row">
            <span className="tag tag--accent">适合：{scenario.userType}</span>
          </div>
          <BoundaryNotice compact />
        </header>

        <div className="grid grid--2">
          <section className="panel">
            <h2>先理解这几件事</h2>
            <ul>
              {scenario.whatToLearnFirst.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="panel">
            <h2>需要准备的资料</h2>
            <ul>
              {scenario.documentsToPrepare.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="section panel">
          <h2>可以问顾问的问题</h2>
          <ul>
            {scenario.advisorQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </section>

        <section className="section">
          <div className="section-header">
            <div>
              <h2>相关知识文章</h2>
              <p>先读这些，再回到场景整理自己的问题。</p>
            </div>
          </div>
          <div className="grid">
            {relatedArticles.map((article) => (
              <Link className="card" href={articleRoute(article.slug)} key={article.slug}>
                <span className="tag tag--accent">{article.estimatedMinutes} 分钟</span>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </section>
      <aside className="right-rail">
        <h2>不直接下结论</h2>
        <ul>
          {scenario.boundaries.map((boundary) => (
            <li key={boundary}>{boundary}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
