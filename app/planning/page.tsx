import Link from "next/link";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { AppIcon, type AppIconName } from "@/components/icons/AppIcon";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getChecklistByScenarioSlug } from "@/data/document-checklists";
import { scenarios } from "@/data/scenarios";
import { scenarioRoute } from "@/lib/routes";

export const metadata = {
  title: "开始规划"
};

const priorityScenarioSlugs = [
  "tax-season-prep",
  "cashflow-reset",
  "first-home",
  "new-to-canada",
  "kids-education",
  "pre-retirement",
  "mortgage-renewal",
  "business-owner"
];

const stageIconBySlug: Record<string, AppIconName> = {
  "first-home": "home",
  "tax-season-prep": "fileText",
  "cashflow-reset": "wallet",
  "new-to-canada": "compass",
  "kids-education": "graduationCap",
  "pre-retirement": "wallet",
  "mortgage-renewal": "fileText",
  "business-owner": "briefcase"
};

const flowSteps = [
  {
    icon: "compass",
    title: "选择场景",
    body: "用真实生活问题开始，而不是先翻金融术语。",
    output: "进入个人化路径"
  },
  {
    icon: "clipboard",
    title: "生成清单",
    body: "按场景显示资料、问题和安全提醒。",
    output: "知道还缺什么"
  },
  {
    icon: "checkCircle",
    title: "勾选进度",
    body: "进度保存在本机浏览器，之后可以继续整理。",
    output: "形成准备状态"
  },
  {
    icon: "fileText",
    title: "导出 PDF",
    body: "把资料清单和问题打印或保存成 PDF。",
    output: "带进顾问会议"
  },
  {
    icon: "phone",
    title: "预约确认",
    body: "准备到一定程度后，再预约 15 分钟准备会确认缺口。",
    output: "进入咨询转化"
  }
] satisfies { icon: AppIconName; title: string; body: string; output: string }[];

export default function PlanningPage() {
  const priorityScenarios = priorityScenarioSlugs
    .map((slug) => scenarios.find((scenario) => scenario.slug === slug))
    .filter((scenario): scenario is (typeof scenarios)[number] => Boolean(scenario));

  return (
    <>
      <Reveal as="header" className="page-hero planning-hero">
        <p className="eyebrow">Start Planning</p>
        <HeroTitle text="开始规划，不是开始乱看文章" />
        <p className="lead">
          选择最接近你当前情况的场景。每个场景都会带你完成三件事：
          知道要准备什么、知道常见错误、知道应该问顾问什么。
        </p>
        <div className="actions">
          <Link className="button button--primary" href="/documents">
            <AppIcon name="clipboard" />
            直接做资料清单
          </Link>
          <Link className="button" href="/scenarios">
            <AppIcon name="compass" />
            查看全部场景
          </Link>
          <Link className="button" href="/consultation">
            <AppIcon name="phone" />
            预约准备会
          </Link>
        </div>
        <BoundaryNotice compact />
      </Reveal>

      <Reveal as="section" className="section planning-flow" ariaLabelledBy="planning-flow-title">
        <div className="section-header section-header--wide">
          <div>
            <p className="eyebrow">User Flow</p>
            <h2 id="planning-flow-title">从看内容，到完成一份准备包</h2>
            <p>主流程保持简单：先选场景，再整理资料，最后把准备成果带进顾问会议。</p>
          </div>
          <Link className="button" href="/documents">
            <AppIcon name="arrowRight" />
            开始生成
          </Link>
        </div>
        <div className="flow-map" role="list">
          {flowSteps.map((step, index) => (
            <article className="flow-card" key={step.title} role="listitem">
              <div className="flow-card__marker">
                <span className="flow-index">{index + 1}</span>
                <span className="card-icon">
                  <AppIcon name={step.icon} />
                </span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <strong>{step.output}</strong>
            </article>
          ))}
        </div>
      </Reveal>

      <RevealGroup className="planning-grid" ariaLabel="开始规划场景">
        {priorityScenarios.map((scenario, index) => {
          const checklist = getChecklistByScenarioSlug(scenario.slug);
          const documentsHref = checklist ? `/documents?scenario=${checklist.scenarioSlug}` : "/documents";

          return (
            <RevealItem className="planning-card" key={scenario.slug}>
              <article>
                <div className="planning-card__top">
                  <span className="card-icon">
                    <AppIcon name={stageIconBySlug[scenario.slug] ?? "compass"} />
                  </span>
                  <span className="tag tag--accent">{scenario.stageLabel}</span>
                  <span className="planning-card__index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="planning-card__metric">{scenario.documentsToPrepare.length} 类资料</span>
                  <span className="planning-card__metric">
                    {scenario.advisorQuestions.length} 个顾问问题
                  </span>
                </div>
                <h2>{scenario.shortTitle}</h2>
                <p>{scenario.actionSummary}</p>
                <div className="actions">
                  <Link className="button button--primary" href={scenarioRoute(scenario.slug)}>
                    <AppIcon name="route" />
                    进入流程
                  </Link>
                  <Link className="button" href={documentsHref}>
                    <AppIcon name="clipboard" />
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
          <div>
            <strong>5</strong>
            <span>预约确认</span>
          </div>
        </div>
      </Reveal>
    </>
  );
}
