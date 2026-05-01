import { notFound } from "next/navigation";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { MotionListLink } from "@/components/motion/MotionListLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
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
        <Reveal as="header" className="page-hero detail-hero" layoutId={`scenario-${scenario.slug}`}>
          <p className="eyebrow">生活场景 / 按问题学习</p>
          <h1>{scenario.title}</h1>
          <p className="lead">{scenario.problem}</p>
          <div className="meta-row">
            <span className="tag tag--accent">适合：{scenario.userType}</span>
          </div>
          <BoundaryNotice compact />
        </Reveal>

        <RevealGroup as="div" className="info-surface info-surface--two">
          <RevealItem className="info-panel">
            <h2>先理解这几件事</h2>
            <ul className="check-list">
              {scenario.whatToLearnFirst.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </RevealItem>
          <RevealItem className="info-panel">
            <h2>需要准备的资料</h2>
            <ul className="check-list">
              {scenario.documentsToPrepare.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>

        <Reveal className="section info-panel">
          <h2>可以问顾问的问题</h2>
          <ul className="check-list check-list--spacious">
            {scenario.advisorQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" className="section">
          <div className="section-header">
            <div>
              <h2>相关知识文章</h2>
              <p>先读这些，再回到场景整理自己的问题。</p>
            </div>
          </div>
          <div className="content-list">
            {relatedArticles.map((article, index) => (
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
        <h2>不直接下结论</h2>
        <ul className="check-list">
          {scenario.boundaries.map((boundary) => (
            <li key={boundary}>{boundary}</li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
