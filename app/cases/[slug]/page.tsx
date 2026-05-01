import Link from "next/link";
import { notFound } from "next/navigation";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { getArticlesBySlugs } from "@/content/load-knowledge";
import { caseStudies, getCaseStudyBySlug } from "@/data/case-studies";
import { articleRoute } from "@/lib/routes";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  return {
    title: study?.title ?? "案例练习"
  };
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();
  const related = await getArticlesBySlugs(study.relatedArticles);

  return (
    <div className="page-grid">
      <section>
        <header className="article-header">
          <p className="eyebrow">Case Study</p>
          <h1>{study.title}</h1>
          <p className="lead">{study.background}</p>
          <div className="meta-row">
            <span className="tag tag--accent">{study.level}</span>
            <span className="tag">{study.estimatedMinutes} 分钟</span>
          </div>
          <BoundaryNotice compact />
        </header>
        <div className="grid grid--2">
          <section className="panel">
            <h2>已知资料</h2>
            <ul>
              {study.knownFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </section>
          <section className="panel">
            <h2>缺失资料</h2>
            <ul>
              {study.missingFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </section>
        </div>
        <section className="section panel">
          <h2>学习任务</h2>
          <ul>
            {study.tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </section>
        <section className="section panel">
          <h2>思考路径</h2>
          <ol>
            {study.thinkingPath.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
        <section className="section">
          <h2>相关知识文章</h2>
          <div className="grid">
            {related.map((article) => (
              <Link className="card" href={articleRoute(article.slug)} key={article.slug}>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </section>
      <aside className="right-rail">
        <h2>边界</h2>
        <p>{study.notAdviceBoundary}</p>
      </aside>
    </div>
  );
}
