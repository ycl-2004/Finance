import { notFound } from "next/navigation";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { MotionListLink } from "@/components/motion/MotionListLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
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
        <Reveal as="header" className="page-hero detail-hero" layoutId={`case-${study.slug}`}>
          <p className="eyebrow">Case Study</p>
          <h1>{study.title}</h1>
          <p className="lead">{study.background}</p>
          <div className="meta-row">
            <span className="tag tag--accent">{study.level}</span>
            <span className="tag">{study.estimatedMinutes} 分钟</span>
          </div>
          <BoundaryNotice compact />
        </Reveal>
        <RevealGroup as="div" className="info-surface info-surface--two">
          <RevealItem className="info-panel">
            <h2>已知资料</h2>
            <ul className="check-list">
              {study.knownFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </RevealItem>
          <RevealItem className="info-panel">
            <h2>缺失资料</h2>
            <ul className="check-list">
              {study.missingFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>
        <Reveal className="section info-panel">
          <h2>学习任务</h2>
          <ul className="check-list check-list--spacious">
            {study.tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="section info-panel">
          <h2>思考路径</h2>
          <ol className="step-list">
            {study.thinkingPath.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Reveal>
        <Reveal as="section" className="section">
          <h2>相关知识文章</h2>
          <div className="content-list">
            {related.map((article, index) => (
              <MotionListLink
                description={article.summary}
                eyebrow={`${article.estimatedMinutes} 分钟`}
                href={articleRoute(article.slug)}
                index={index}
                key={article.slug}
                layoutId={`article-${article.slug}`}
                meta={[article.difficulty, `校准：${article.lastReviewed}`]}
                title={article.title}
              />
            ))}
          </div>
        </Reveal>
      </section>
      <Reveal as="aside" className="right-rail">
        <h2>边界</h2>
        <p>{study.notAdviceBoundary}</p>
      </Reveal>
    </div>
  );
}
