import Link from "next/link";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getAllArticles } from "@/content/load-knowledge";
import { getChecklistByScenarioSlug } from "@/data/document-checklists";
import { learningPath } from "@/data/learning-path";
import { scenarios } from "@/data/scenarios";
import { topicMetadata } from "@/data/topic-metadata";
import { articleRoute, scenarioRoute, topicRoute } from "@/lib/routes";

const homeScenarioSlugs = [
  "new-to-canada",
  "first-home",
  "kids-education",
  "mortgage-renewal",
  "pre-retirement"
];

const valueProps = [
  "明确需要准备的资料",
  "知道应该问顾问什么",
  "避免信息不对称",
  "不再被产品带着走"
];

export default async function HomePage() {
  const articles = await getAllArticles();
  const homeScenarios = homeScenarioSlugs
    .map((slug) => scenarios.find((scenario) => scenario.slug === slug))
    .filter((scenario): scenario is (typeof scenarios)[number] => Boolean(scenario));
  const firstStage = learningPath[0];
  const primaryTopics = topicMetadata.filter((topic) => topic.order >= 10).slice(0, 4);

  return (
    <>
      <Reveal as="section" className="home-hero home-hero--planner" ariaLabelledBy="home-hero-title">
        <div className="home-hero__content">
          <div className="hero-copy">
            <p className="eyebrow">QM Financial Preparation Hub</p>
            <h1 id="home-hero-title">帮你在见金融顾问前，准备好所有关键问题与资料</h1>
            <p className="lead">
              适用于：新移民 / 买房 / 家庭 / 房贷续约 / 退休 / 企业主。
              先选场景，再生成资料清单，最后带着清楚的问题进入顾问会议。
            </p>
            <div className="actions">
              <Link className="button button--primary" href="/planning">
                开始规划
              </Link>
              <Link className="button" href="/documents">
                查看资料清单
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

          <aside className="hero-quick-panel" aria-label="快速开始">
            <h2>今天你想解决什么问题？</h2>
            <nav aria-label="首页快速场景入口">
              {homeScenarios.map((scenario) => (
                <Link href={scenarioRoute(scenario.slug)} key={scenario.slug}>
                  <span>{scenario.shortTitle}</span>
                  <em>›</em>
                </Link>
              ))}
              <Link href={scenarioRoute("business-owner")}>
                <span>我是企业主</span>
                <em>›</em>
              </Link>
            </nav>
          </aside>
        </div>
      </Reveal>

      <Reveal as="section" className="section stage-entry" ariaLabelledBy="stage-entry-title">
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

        <div className="stage-grid" role="list">
          {homeScenarios.map((scenario) => {
            const checklist = getChecklistByScenarioSlug(scenario.slug);
            return (
              <Link className="stage-card" href={scenarioRoute(scenario.slug)} key={scenario.slug} role="listitem">
                <span>{scenario.stageLabel}</span>
                <h3>{scenario.shortTitle}</h3>
                <p>{scenario.actionSummary}</p>
                <em>
                  {checklist ? "可生成资料清单" : "查看准备流程"} →
                </em>
              </Link>
            );
          })}
        </div>
      </Reveal>

      <RevealGroup className="section value-grid" ariaLabel="平台核心价值">
        {valueProps.map((item, index) => (
          <RevealItem className="value-card" key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item}</strong>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal as="section" className="section trust-band" ariaLabelledBy="trust-band-title">
        <div>
          <p className="eyebrow">Trust Boundary</p>
          <h2 id="trust-band-title">我们不提供投资建议。我们帮助你理解和准备。</h2>
          <p>
            这个网站的角色是会议前准备工具：帮你整理资料、建立问题清单、理解基本概念。
            具体投资、保险、税务、法律或贷款决定，请由相应持牌或专业人士确认。
          </p>
        </div>
        <Link className="button" href="/about">
          了解我们的边界
        </Link>
      </Reveal>

      <Reveal as="section" className="section learning-support" ariaLabelledBy="learning-support-title">
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
        <div className="support-grid">
          <Link className="support-card" href={`/learn#${firstStage.id}`}>
            <span>学习路径</span>
            <strong>{firstStage.title}</strong>
            <p>{firstStage.goal}</p>
          </Link>
          {primaryTopics.map((topic) => (
            <Link className="support-card" href={topicRoute(topic.slug)} key={topic.slug}>
              <span>{topic.englishTitle}</span>
              <strong>{topic.title}</strong>
              <p>{topic.primaryQuestion}</p>
            </Link>
          ))}
          <Link className="support-card support-card--strong" href={articleRoute("client-document-source-map")}>
            <span>资料地图</span>
            <strong>每类文件通常在哪里找？</strong>
            <p>如果你不知道 NOA、statement、room 这些资料从哪里来，从这里查。</p>
          </Link>
        </div>
      </Reveal>
    </>
  );
}
