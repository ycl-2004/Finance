import Image from "next/image";
import Link from "next/link";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { HomeReadinessStory } from "@/components/home/HomeReadinessStory";
import { HomeScenarioExplorer } from "@/components/home/HomeScenarioExplorer";
import { AppIcon, type AppIconName } from "@/components/icons/AppIcon";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getAllArticles } from "@/content/load-knowledge";
import { getChecklistByScenarioSlug } from "@/data/document-checklists";
import { learningPath } from "@/data/learning-path";
import { scenarios } from "@/data/scenarios";
import { topicMetadata } from "@/data/topic-metadata";
import { articleRoute, scenarioRoute, topicRoute } from "@/lib/routes";
import { siteAssetPath } from "@/lib/site-assets";

const homeScenarioSlugs = [
  "new-to-canada",
  "tax-season-prep",
  "cashflow-reset",
  "first-home",
  "mortgage-renewal",
  "pre-retirement"
];

const valueProps = [
  { icon: "clipboard", label: "明确需要准备的资料" },
  { icon: "compass", label: "知道应该问顾问什么" },
  { icon: "shieldCheck", label: "避免信息不对称" },
  { icon: "checkCircle", label: "不被产品节奏带着走" }
] satisfies { icon: AppIconName; label: string }[];

const stageIconBySlug: Record<string, AppIconName> = {
  "new-to-canada": "compass",
  "tax-season-prep": "fileText",
  "cashflow-reset": "wallet",
  "first-home": "home",
  "kids-education": "graduationCap",
  "mortgage-renewal": "fileText",
  "pre-retirement": "wallet",
  "business-owner": "briefcase"
};

const topicIconBySlug: Record<string, AppIconName> = {
  "comprehensive-financial-planning": "compass",
  "investment-planning-portfolio-strategy": "wallet",
  "canadian-registered-accounts": "fileText",
  "insurance-risk-management": "shieldCheck"
};

const prepFlow = [
  {
    icon: "compass",
    title: "选择场景",
    body: "先确认你是报税、买房、续约、退休，还是正在整理现金流。"
  },
  {
    icon: "clipboard",
    title: "生成资料清单",
    body: "把收入、账户、税务、保险、房贷和敏感资料分组整理。"
  },
  {
    icon: "fileText",
    title: "准备会议问题",
    body: "把不确定的地方变成可以带进顾问会议的问题。"
  },
  {
    icon: "users",
    title: "交给专业人士确认",
    body: "准备工具负责结构，具体建议由持牌或合资格专业人士确认。"
  }
] satisfies { icon: AppIconName; title: string; body: string }[];

export default async function HomePage() {
  const articles = await getAllArticles();
  const homeScenarios = homeScenarioSlugs
    .map((slug) => scenarios.find((scenario) => scenario.slug === slug))
    .filter((scenario): scenario is (typeof scenarios)[number] => Boolean(scenario));
  const featuredScenario = homeScenarios.find((scenario) => scenario.slug === "first-home") ?? homeScenarios[0];
  const scenarioExplorerItems = homeScenarios.map((scenario) => {
    const checklist = getChecklistByScenarioSlug(scenario.slug);

    return {
      badge: checklist ? "资料清单" : "准备流程",
      boundaries: scenario.boundaries.length,
      documents: scenario.documentsToPrepare,
      documentTotal: scenario.documentsToPrepare.length,
      href: scenarioRoute(scenario.slug),
      icon: stageIconBySlug[scenario.slug] ?? "compass",
      label: scenario.stageLabel,
      problem: scenario.problem,
      questions: scenario.advisorQuestions,
      questionTotal: scenario.advisorQuestions.length,
      slug: scenario.slug,
      summary: scenario.actionSummary,
      title: scenario.shortTitle
    };
  });
  const homeLearningStages = learningPath.slice(0, 5);
  const primaryTopics = topicMetadata.filter((topic) => topic.order >= 10).slice(0, 4);
  const heroImageSrc = siteAssetPath("/images/qm-meeting-prep-hero.png");

  return (
    <>
      <Reveal as="section" className="home-hero home-hero--planner" ariaLabelledBy="home-hero-title">
        <div className="home-hero__content">
          <div className="hero-copy">
            <p className="eyebrow">QM Financial Preparation Hub</p>
            <HeroTitle id="home-hero-title" text="见金融顾问前，先把问题与资料准备好" />
            <p className="lead">
              适用于新移民、买房、家庭保障、房贷续约、退休和企业主规划。
              先选场景，生成资料清单，再带着明确问题进入会议。
            </p>
            <div className="actions">
              <Link className="button button--primary" href="/planning">
                <AppIcon name="route" />
                开始规划
              </Link>
              <Link className="button" href="/documents">
                <AppIcon name="clipboard" />
                查看资料清单
              </Link>
              <Link className="button button--quiet" href="/consultation">
                <AppIcon name="phone" />
                预约准备会
              </Link>
            </div>
            <div className="hero-proof-grid" aria-label="网站内容统计">
              <span>
                <strong>{homeScenarios.length}</strong>
                高优先级场景
              </span>
              <span>
                <strong>{scenarios.length}</strong>
                总场景流程
              </span>
              <span>
                <strong>{articles.length}</strong>
                辅助文章
              </span>
            </div>
            <BoundaryNotice compact />
          </div>

          <figure className="advisor-desk-visual" aria-label="顾问会议前的资料准备桌面">
            <Image
              alt=""
              className="advisor-desk-visual__image"
              height={864}
              priority
              src={heroImageSrc}
              width={1536}
            />
            <div className="hero-floating-annotations" aria-hidden="true">
              <span className="hero-annotation hero-annotation--one">NOA / T4 / T5</span>
              <span className="hero-annotation hero-annotation--two">Advisor questions</span>
              <span className="hero-annotation hero-annotation--three">Local checklist</span>
            </div>
            <div className="advisor-readiness-note" aria-label="从零选择会议准备场景">
              <div className="advisor-readiness-note__top">
                <span>Readiness starts at</span>
                <strong>0%</strong>
              </div>
              <div>
                <span className="advisor-readiness-note__label">Choose a case</span>
                <strong>先选你的生活场景</strong>
                <p>不用先背金融术语。从一个真实场景开始，页面会带你生成资料清单和顾问问题。</p>
              </div>
              <div className="advisor-scenario-chooser" aria-label="可选准备场景">
                {homeScenarios.map((scenario) => (
                  <Link href={scenarioRoute(scenario.slug)} key={scenario.slug}>
                    <span>{scenario.stageLabel}</span>
                    <strong>{scenario.shortTitle}</strong>
                  </Link>
                ))}
              </div>
              <ul className="console-checklist" aria-label="资料准备状态示例">
                <li>
                  <span className="status-dot status-dot--active" aria-hidden="true" />
                  选择场景后从 0% 开始
                </li>
                <li>
                  <span className="status-dot" aria-hidden="true" />
                  清单和问题按场景生成
                </li>
                <li>
                  <span className="status-dot" aria-hidden="true" />
                  进度只保存在本机浏览器
                </li>
              </ul>
            </div>
            <figcaption className="sr-only">
              一张包含加拿大地图、资料夹、纸本清单和平板规划界面的顾问会前准备桌面。
            </figcaption>
          </figure>
        </div>
      </Reveal>

      <Reveal as="section" className="section scenario-navigator-section" ariaLabelledBy="stage-entry-title">
        <div className="section-header section-header--wide">
          <div>
            <p className="eyebrow">Start Here</p>
            <h2 id="stage-entry-title">你现在处于哪个阶段？</h2>
            <p>不要从知识库开始翻。先点一个场景，让页面带你走到资料清单。</p>
          </div>
          <Link className="button" href="/planning">
            全部规划入口
          </Link>
        </div>

        <HomeScenarioExplorer initialSlug={featuredScenario?.slug} items={scenarioExplorerItems} />
      </Reveal>

      <HomeReadinessStory />

      <RevealGroup className="section prep-flow" ariaLabelledBy="prep-flow-title">
        <RevealItem className="prep-flow__header">
          <p className="eyebrow">Meeting Preparation Flow</p>
          <h2 id="prep-flow-title">不是让用户读文章，而是带用户完成准备流程</h2>
          <p>每一步都指向一次更清楚、更可验证的顾问会议。</p>
        </RevealItem>
        <div className="prep-flow__track" role="list">
          {prepFlow.map((step, index) => (
            <RevealItem className="prep-flow__step" key={step.title}>
              <span className="prep-flow__number">{String(index + 1).padStart(2, "0")}</span>
              <span className="prep-flow__icon" aria-hidden="true">
                <AppIcon name={step.icon} />
              </span>
              <strong>{step.title}</strong>
              <p>{step.body}</p>
            </RevealItem>
          ))}
        </div>
      </RevealGroup>

      <RevealGroup className="section value-band" ariaLabel="平台核心价值">
        <RevealItem className="value-band__intro">
          <p className="eyebrow">Readiness System</p>
          <h2>把会议主动权还给客户</h2>
        </RevealItem>
        {valueProps.map((item) => (
          <RevealItem className="value-band__item" key={item.label}>
            <span className="value-band__icon" aria-hidden="true">
              <AppIcon name={item.icon} />
            </span>
            <strong>{item.label}</strong>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal as="section" className="section trust-boundary" ariaLabelledBy="trust-band-title">
        <div className="trust-boundary__copy">
          <p className="eyebrow">Trust Boundary</p>
          <h2 id="trust-band-title">We help you prepare. Licensed professionals help you decide.</h2>
          <p>
            我们帮助你准备会议、整理资料、建立问题清单和理解基本概念。
            具体投资、保险、税务、法律或贷款决定，请由相应持牌或专业人士确认。
          </p>
        </div>
        <div className="trust-boundary__rules" role="list" aria-label="教育边界">
          <span role="listitem">不提供个人化投资建议</span>
          <span role="listitem">不替代税务、法律或贷款意见</span>
          <span role="listitem">不要求发送 CRA 或银行密码</span>
        </div>
        <Link className="button" href="/about">
          了解我们的边界
        </Link>
      </Reveal>

      <Reveal as="section" className="section learning-path-section" ariaLabelledBy="learning-support-title">
        <div className="section-header section-header--wide">
          <div>
            <p className="eyebrow">Learning Center</p>
            <h2 id="learning-support-title">学习中心是辅助，不是入口障碍</h2>
            <p>当你在准备清单里遇到不懂的词，再回到学习中心补概念。</p>
          </div>
          <Link className="button" href="/learn">
            进入学习中心
          </Link>
        </div>
        <div className="learning-path-home">
          <ol className="learning-path-home__steps" aria-label="推荐学习路径">
            {homeLearningStages.map((stage) => (
              <li key={stage.id}>
                <Link href={`/learn#${stage.id}`}>
                  <span>{String(stage.order).padStart(2, "0")}</span>
                  <strong>{stage.title}</strong>
                  <p>{stage.goal}</p>
                </Link>
              </li>
            ))}
          </ol>
          <div className="learning-path-home__topics" aria-label="常用参考主题">
            <span className="learning-path-home__topics-label">关联资料</span>
            {primaryTopics.map((topic) => (
              <Link href={topicRoute(topic.slug)} key={topic.slug}>
                <span aria-hidden="true">
                  <AppIcon name={topicIconBySlug[topic.slug] ?? "fileText"} />
                </span>
                <strong>{topic.title}</strong>
                <p>{topic.primaryQuestion}</p>
              </Link>
            ))}
            <Link className="learning-path-home__document-link" href={articleRoute("client-document-source-map")}>
              <span aria-hidden="true">
                <AppIcon name="fileText" />
              </span>
              <strong>资料地图</strong>
              <p>如果你不知道 NOA、账户结单、可用额度这些资料从哪里来，从这里查。</p>
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section final-cta" ariaLabelledBy="final-cta-title">
        <div>
          <p className="eyebrow">Ready for the meeting</p>
          <h2 id="final-cta-title">带着资料和问题进入顾问会议</h2>
          <p>先完成一个场景的准备，再决定是否需要预约准备会或继续学习。</p>
        </div>
        <div className="final-cta__actions">
          <Link className="button button--primary" href="/planning">
            <AppIcon name="route" />
            开始规划
          </Link>
          <Link className="button" href="/consultation">
            <AppIcon name="phone" />
            预约准备会
          </Link>
        </div>
      </Reveal>
    </>
  );
}
