import { notFound } from "next/navigation";
import Link from "next/link";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { AppIcon } from "@/components/icons/AppIcon";
import { MotionListLink } from "@/components/motion/MotionListLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getArticlesBySlugs } from "@/content/load-knowledge";
import { getChecklistByScenarioSlug } from "@/data/document-checklists";
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
  const checklist = getChecklistByScenarioSlug(scenario.slug);
  const documentsHref = checklist ? `/documents?scenario=${checklist.slug}` : "/documents";

  return (
    <div className="page-grid">
      <section>
        <Reveal as="header" className="page-hero detail-hero" layoutId={`scenario-${scenario.slug}`}>
          <p className="eyebrow">开始规划 / {scenario.stageLabel}</p>
          <h1>{scenario.title}</h1>
          <p className="lead">{scenario.problem}</p>
          <div className="meta-row">
            <span className="tag tag--accent">适合：{scenario.userType}</span>
          </div>
          <div className="actions">
            <Link className="button button--primary" href={documentsHref}>
              <AppIcon name="clipboard" />
              生成资料清单
            </Link>
            <Link className="button" href={`${documentsHref}#document-print-area`}>
              <AppIcon name="fileText" />
              下载 PDF
            </Link>
            <Link className="button" href={`/consultation?scenario=${scenario.slug}`}>
              <AppIcon name="phone" />
              预约准备会
            </Link>
          </div>
          <BoundaryNotice compact />
        </Reveal>

        <RevealGroup as="div" className="scenario-flow">
          <RevealItem className="scenario-step">
            <span className="scenario-step__number">1</span>
            <div>
              <p className="eyebrow">你现在要做什么</p>
              <h2>先把问题变成准备动作</h2>
              <p>{scenario.actionSummary}</p>
            </div>
          </RevealItem>

          <RevealItem className="scenario-step">
            <span className="scenario-step__number">2</span>
            <div>
              <p className="eyebrow">常见错误</p>
              <h2>先避开这些坑</h2>
              <ul className="check-list check-list--spacious">
                {scenario.commonMistakes.map((mistake) => (
                  <li key={mistake}>{mistake}</li>
                ))}
              </ul>
            </div>
          </RevealItem>

          <RevealItem className="scenario-step scenario-step--split">
            <span className="scenario-step__number">3</span>
            <div>
              <p className="eyebrow">你需要准备什么</p>
              <h2>资料先整理齐</h2>
              <ul className="check-list">
                {scenario.documentsToPrepare.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="actions">
                <Link className="button button--primary" href={documentsHref}>
                  <AppIcon name="clipboard" />
                  进入资料清单
                </Link>
              </div>
            </div>
          </RevealItem>

          <RevealItem className="scenario-step">
            <span className="scenario-step__number">4</span>
            <div>
              <p className="eyebrow">你应该问顾问什么</p>
              <h2>带着问题去，而不是被产品带着走</h2>
              <ul className="check-list check-list--spacious">
                {scenario.advisorQuestions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </div>
          </RevealItem>
        </RevealGroup>

        <Reveal className="section scenario-cta">
          <div>
            <p className="eyebrow">Ready</p>
            <h2>1 分钟生成你的准备清单</h2>
            <p>勾选进度会保存在本机浏览器。准备好后可以打印或保存为 PDF。</p>
          </div>
          <div className="actions">
            <Link className="button button--primary" href={documentsHref}>
              <AppIcon name="clipboard" />
              生成资料清单
            </Link>
            <Link className="button" href={`/consultation?scenario=${scenario.slug}`}>
              <AppIcon name="phone" />
              预约准备会
            </Link>
          </div>
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
        <h2>边界</h2>
        <ul className="check-list">
          {scenario.boundaries.map((boundary) => (
            <li key={boundary}>{boundary}</li>
          ))}
        </ul>
        <h2 style={{ marginTop: 18 }}>先理解</h2>
        <ul className="check-list">
          {scenario.whatToLearnFirst.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
