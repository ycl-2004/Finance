import Link from "next/link";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getChecklistByScenarioSlug } from "@/data/document-checklists";
import { scenarios } from "@/data/scenarios";
import { scenarioRoute } from "@/lib/routes";

export const metadata = {
  title: "开始规划"
};

const priorityScenarioSlugs = [
  "first-home",
  "new-to-canada",
  "kids-education",
  "pre-retirement",
  "mortgage-renewal",
  "business-owner"
];

export default function PlanningPage() {
  const priorityScenarios = priorityScenarioSlugs
    .map((slug) => scenarios.find((scenario) => scenario.slug === slug))
    .filter((scenario): scenario is (typeof scenarios)[number] => Boolean(scenario));

  return (
    <>
      <Reveal as="header" className="page-hero planning-hero">
        <p className="eyebrow">Start Planning</p>
        <h1>开始规划，不是开始乱看文章</h1>
        <p className="lead">
          选择最接近你当前情况的场景。每个场景都会带你完成三件事：
          知道要准备什么、知道常见错误、知道应该问顾问什么。
        </p>
        <div className="actions">
          <Link className="button button--primary" href="/documents">
            直接做资料清单
          </Link>
          <Link className="button" href="/scenarios">
            查看全部场景
          </Link>
        </div>
        <BoundaryNotice compact />
      </Reveal>

      <RevealGroup className="planning-grid" ariaLabel="开始规划场景">
        {priorityScenarios.map((scenario, index) => {
          const checklist = getChecklistByScenarioSlug(scenario.slug);
          const documentsHref = checklist ? `/documents?scenario=${checklist.slug}` : "/documents";

          return (
            <RevealItem className="planning-card" key={scenario.slug}>
              <article>
                <div className="planning-card__top">
                  <span className="tag tag--accent">{scenario.stageLabel}</span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h2>{scenario.shortTitle}</h2>
                <p>{scenario.actionSummary}</p>
                <div className="planning-card__meta">
                  <span>{scenario.documentsToPrepare.length} 类资料</span>
                  <span>{scenario.advisorQuestions.length} 个顾问问题</span>
                </div>
                <div className="actions">
                  <Link className="button button--primary" href={scenarioRoute(scenario.slug)}>
                    进入流程
                  </Link>
                  <Link className="button" href={documentsHref}>
                    资料清单
                  </Link>
                </div>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <Reveal as="section" className="section planning-method" ariaLabelledBy="planning-method-title">
        <div className="section-header">
          <div>
            <p className="eyebrow">Action Path</p>
            <h2 id="planning-method-title">从内容变成行动</h2>
            <p>这个平台的顺序不是“先读很多文章”，而是先把会议前最关键的准备动作完成。</p>
          </div>
        </div>
        <div className="planning-method__steps">
          <div>
            <strong>1</strong>
            <span>选择场景</span>
          </div>
          <div>
            <strong>2</strong>
            <span>勾选资料</span>
          </div>
          <div>
            <strong>3</strong>
            <span>列出问题</span>
          </div>
          <div>
            <strong>4</strong>
            <span>带进顾问会议</span>
          </div>
        </div>
      </Reveal>
    </>
  );
}
