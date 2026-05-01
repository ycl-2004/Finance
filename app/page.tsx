import Link from "next/link";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { HomeHeroDotCanvas } from "@/components/home/HomeHeroDotCanvas";
import { LearningAtlas, type LearningAtlasStage } from "@/components/home/LearningAtlas";
import { ScenarioExplorer, type ScenarioExplorerItem } from "@/components/home/ScenarioExplorer";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { Reveal } from "@/components/motion/Reveal";
import { getAllArticles } from "@/content/load-knowledge";
import type { Scenario } from "@/data/scenarios";
import { learningPath } from "@/data/learning-path";
import { scenarios } from "@/data/scenarios";
import { topicMetadata } from "@/data/topic-metadata";
import { articleRoute, scenarioRoute, topicRoute } from "@/lib/routes";

function themesForScenario(scenario: Scenario): string[] {
  const text = [
    scenario.slug,
    scenario.title,
    scenario.userType,
    scenario.problem,
    ...scenario.whatToLearnFirst
  ].join(" ");
  const themes = new Set<string>();

  if (/new|新移民|留学|加拿大/.test(text)) themes.add("新移民");
  if (/home|house|mortgage|房|房贷|首付|FHSA|续约/.test(text)) themes.add("买房");
  if (/TFSA|RRSP|FHSA|RESP|RDSP|账户|room/.test(text)) themes.add("账户");
  if (/insurance|risk|保险|重疾|伤残|风险/.test(text)) themes.add("保险");
  if (/retirement|estate|退休|遗嘱|传承|CPP|OAS|RRIF/.test(text)) themes.add("退休");
  if (/business|企业|公司|自雇|owner|GST|payroll/.test(text)) themes.add("企业主");
  if (/tax|税|deduction|credit|高收入/.test(text)) themes.add("税务");

  return themes.size ? Array.from(themes) : ["账户"];
}

export default async function HomePage() {
  const articles = await getAllArticles();
  const articleBySlug = new Map(articles.map((article) => [article.slug, article]));
  const articleCountByTopic = new Map<string, number>();
  articles.forEach((article) =>
    articleCountByTopic.set(article.topic, (articleCountByTopic.get(article.topic) ?? 0) + 1)
  );
  const firstStage = learningPath[0];
  const primaryTopics = topicMetadata.filter((topic) => topic.order >= 10).slice(0, 8);
  const heroArticles = firstStage.requiredArticles.slice(0, 3).map((slug) => ({
    slug,
    href: articleRoute(slug),
    title: articleBySlug.get(slug)?.title ?? slug
  }));
  const atlasStages: LearningAtlasStage[] = learningPath.map((stage) => ({
    id: stage.id,
    order: stage.order,
    title: stage.title,
    goal: stage.goal,
    audience: stage.audience,
    href: `/learn#${stage.id}`,
    primaryArticleTitle: articleBySlug.get(stage.requiredArticles[0])?.title ?? stage.requiredArticles[0],
    primaryArticleHref: articleRoute(stage.requiredArticles[0]),
    articleCount: stage.requiredArticles.length + stage.optionalArticles.length,
    scenarioCount: stage.relatedScenarios.length,
    checkQuestion: stage.checkQuestions[0] ?? "这个阶段的核心概念是否已经能用自己的话讲清楚？",
    relatedScenarios: stage.relatedScenarios
      .map((slug) => scenarios.find((scenario) => scenario.slug === slug)?.title)
      .filter((title): title is string => Boolean(title))
      .slice(0, 2)
  }));
  const scenarioItems: ScenarioExplorerItem[] = scenarios.map((scenario) => ({
    slug: scenario.slug,
    title: scenario.title,
    userType: scenario.userType,
    problem: scenario.problem,
    href: scenarioRoute(scenario.slug),
    themes: themesForScenario(scenario),
    resourceCount: scenario.relatedArticles.length,
    documentCount: scenario.documentsToPrepare.length,
    questionCount: scenario.advisorQuestions.length
  }));

  return (
    <>
      <Reveal as="section" className="home-hero" ariaLabelledBy="home-hero-title">
        <HomeHeroDotCanvas />
        <div className="home-hero__content">
          <div className="hero-copy">
            <p className="eyebrow">Advisor-grade Financial Learning Atlas</p>
            <HeroTitle
              id="home-hero-title"
              lines={["把加拿大金融问题，", "整理成可以一步步理解的", "学习地图。"]}
            />
            <p className="lead">
              从账户、买房、保险、投资、税务到退休和企业主财务，先建立框架，再带着更好的问题去找专业人士确认。
            </p>
            <div className="actions">
              <Link className="button button--primary" href="/learn">
                开始学习
              </Link>
              <Link className="button" href="/scenarios">
                按生活问题进入
              </Link>
              <Link className="button button--quiet" href="/glossary">
                查术语
              </Link>
            </div>
            <div className="hero-proof-grid" aria-label="学习中心概览">
              <span>
                <strong>{learningPath.length}</strong>
                学习阶段
              </span>
              <span>
                <strong>{scenarios.length}</strong>
                生活场景
              </span>
              <span>
                <strong>{articles.length}</strong>
                知识文章
              </span>
            </div>
          </div>

          <aside className="hero-brief" aria-label="今天从这里开始">
            <p className="eyebrow">Start Here</p>
            <h2>{firstStage.title}</h2>
            <p>{firstStage.goal}</p>
            <ol className="lesson-list">
              {heroArticles.map((article, index) => (
                <li key={article.slug}>
                  <Link className="lesson-item" href={article.href}>
                    <span>{article.title}</span>
                    <em>{String(index + 1).padStart(2, "0")}</em>
                  </Link>
                </li>
              ))}
            </ol>
            <BoundaryNotice compact />
          </aside>
        </div>
        <span className="scroll-cue" aria-hidden="true" />
      </Reveal>

      <LearningAtlas stages={atlasStages} />

      <ScenarioExplorer scenarios={scenarioItems} />

      <Reveal as="section" className="section knowledge-index" ariaLabelledBy="knowledge-index-title">
        <div className="section-header section-header--wide">
          <div>
            <p className="eyebrow">Knowledge Index</p>
            <h2 id="knowledge-index-title">知道主题时，直接进入知识库。</h2>
            <p>主题页保留清晰的阅读结构，适合复习、查证和准备资料。</p>
          </div>
          <Link className="button" href="/topics">
            全部主题
          </Link>
        </div>
        <div className="knowledge-grid">
          {primaryTopics.map((topic) => (
            <Link className="knowledge-topic" href={topicRoute(topic.slug)} key={topic.slug}>
              <span>{topic.englishTitle}</span>
              <strong>{topic.title}</strong>
              <em>{articleCountByTopic.get(topic.slug) ?? 0} 篇</em>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section tool-strip" ariaLabel="常用工具">
        <Link className="tool-link" href="/documents">
          <span>资料清单</span>
          <strong>CRA、银行、保险、房贷、退休和企业资料从哪里取得。</strong>
        </Link>
        <Link className="tool-link" href="/glossary">
          <span>术语表</span>
          <strong>搜索中英文金融术语，先把语言障碍拆掉。</strong>
        </Link>
        <Link className="tool-link" href="/cases">
          <span>案例练习</span>
          <strong>用虚拟场景练习先问什么、缺什么资料、边界在哪里。</strong>
        </Link>
      </Reveal>
    </>
  );
}
