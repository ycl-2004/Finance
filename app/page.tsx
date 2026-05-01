import Link from "next/link";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { ScenarioCard } from "@/components/cards/ScenarioCard";
import { TopicCard } from "@/components/cards/TopicCard";
import { getAllArticles } from "@/content/load-knowledge";
import { learningPath } from "@/data/learning-path";
import { scenarios } from "@/data/scenarios";
import { topicMetadata } from "@/data/topic-metadata";
import { articleRoute } from "@/lib/routes";

export default async function HomePage() {
  const articles = await getAllArticles();
  const articleCountByTopic = new Map<string, number>();
  articles.forEach((article) =>
    articleCountByTopic.set(article.topic, (articleCountByTopic.get(article.topic) ?? 0) + 1)
  );
  const firstStage = learningPath[0];
  const primaryTopics = topicMetadata.filter((topic) => topic.order >= 10).slice(0, 8);

  return (
    <>
      <section className="home-hero">
        <div className="hero-panel">
          <div className="hero-dashboard">
            <div className="hero-copy">
              <p className="eyebrow">Public Chinese Financial Education Hub</p>
              <h1>从小白开始，系统理解加拿大金融规划。</h1>
              <p className="lead">
                按学习路线、生活场景和主题知识库理解注册账户、投资、保险、房贷、税务、
                退休和企业主财务问题。先学习框架，再带着好问题找专业人士确认。
              </p>
              <div className="actions">
                <Link className="button button--primary" href="/learn">
                  开始学习
                </Link>
                <Link className="button" href="/scenarios">
                  按问题学习
                </Link>
                <Link className="button" href="/glossary">
                  查术语
                </Link>
              </div>
              <BoundaryNotice compact />
              <div className="trust-row" aria-label="学习中心特点">
                <span>教育优先 · 非个人建议</span>
                <span>内容可信 · 来源清楚</span>
                <span>定期校准 · 使用前核对</span>
              </div>
            </div>
            <aside className="start-card">
              <p className="eyebrow">今天从这里开始</p>
              <h2>{firstStage.title}</h2>
              <p>{firstStage.goal}</p>
              <ol className="lesson-list">
                {firstStage.requiredArticles.slice(0, 3).map((slug, index) => {
                  const article = articles.find((item) => item.slug === slug);
                  return (
                    <li key={slug}>
                      <Link className="lesson-item" href={articleRoute(slug)}>
                        <span>{article?.title ?? slug}</span>
                        <em>{String(index + 1).padStart(2, "0")}</em>
                      </Link>
                    </li>
                  );
                })}
              </ol>
              <Link className="button button--primary button--full" href="/learn">
                查看完整路线
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2>按生活场景进入</h2>
            <p>不知道该看哪个主题时，先从你遇到的问题开始。</p>
          </div>
          <Link className="button" href="/scenarios">
            全部场景
          </Link>
        </div>
        <div className="grid grid--3">
          {scenarios.slice(0, 6).map((scenario) => (
            <ScenarioCard scenario={scenario} key={scenario.slug} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2>主题知识库</h2>
            <p>当你已经知道要查哪个领域，可以从顾问服务主题深入。</p>
          </div>
          <Link className="button" href="/topics">
            全部主题
          </Link>
        </div>
        <div className="grid grid--2">
          {primaryTopics.map((topic) => (
            <TopicCard
              topic={topic}
              count={articleCountByTopic.get(topic.slug)}
              key={topic.slug}
            />
          ))}
        </div>
      </section>

      <section className="section grid grid--3">
        <Link className="card" href="/documents">
          <span className="tag tag--accent">工具</span>
          <h3>资料清单</h3>
          <p>客户去哪里取得 CRA、银行、保险、房贷、退休和企业资料。</p>
        </Link>
        <Link className="card" href="/glossary">
          <span className="tag tag--accent">工具</span>
          <h3>术语表</h3>
          <p>搜索中英文金融术语，先把语言障碍拆掉。</p>
        </Link>
        <Link className="card" href="/cases">
          <span className="tag tag--accent">进阶</span>
          <h3>案例练习</h3>
          <p>用虚拟场景练习“先问什么、缺什么资料、边界在哪里”。</p>
        </Link>
      </section>
    </>
  );
}
