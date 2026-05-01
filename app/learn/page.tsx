import Link from "next/link";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getAllArticles } from "@/content/load-knowledge";
import { learningPath } from "@/data/learning-path";
import { getScenarioBySlug } from "@/data/scenarios";
import { articleRoute, scenarioRoute } from "@/lib/routes";

export const metadata = {
  title: "开始学习"
};

export default async function LearnPage() {
  const articles = await getAllArticles();

  return (
    <>
      <Reveal as="header" className="page-hero">
        <p className="eyebrow">Start Here</p>
        <h1>学习路线</h1>
        <p className="lead">
          学习中心现在是辅助工具：当你在资料准备或场景流程里遇到不懂的概念，
          再回到这里按路径补基础。
        </p>
        <div className="actions">
          <Link className="button button--primary" href="/documents">
            先完成资料准备
          </Link>
          <Link className="button" href="/planning">
            按场景开始规划
          </Link>
          <Link className="button button--quiet" href={articleRoute(learningPath[0].requiredArticles[0])}>
            从第一阶段学习
          </Link>
        </div>
        <BoundaryNotice compact />
      </Reveal>

      <RevealGroup className="learning-route">
        {learningPath.map((stage) => (
          <RevealItem className="learning-stage" key={stage.id}>
            <article id={stage.id}>
              <div className="learning-stage__number">Stage {stage.order}</div>
              <div className="learning-stage__main">
                <div className="learning-stage__intro">
                  <div className="meta-row">
                    <span className="tag tag--accent">{stage.audience}</span>
                  </div>
                  <h2>{stage.title}</h2>
                  <p>{stage.goal}</p>
                </div>
                <div className="learning-stage__grid">
                  <div>
                    <h3>必读文章</h3>
                    <ul className="inline-link-list">
                      {stage.requiredArticles.map((slug) => {
                        const article = articles.find((item) => item.slug === slug);
                        return (
                          <li key={slug}>
                            <Link href={articleRoute(slug)}>{article?.title ?? slug}</Link>
                          </li>
                        );
                      })}
                    </ul>
                    {stage.optionalArticles.length > 0 && (
                      <>
                        <h3>选读</h3>
                        <ul className="inline-link-list">
                          {stage.optionalArticles.map((slug) => {
                            const article = articles.find((item) => item.slug === slug);
                            return (
                              <li key={slug}>
                                <Link href={articleRoute(slug)}>{article?.title ?? slug}</Link>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    )}
                  </div>
                  <div>
                    <h3>看完后问问自己</h3>
                    <ul className="check-list">
                      {stage.checkQuestions.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                    <h3>相关生活场景</h3>
                    <ul className="inline-link-list">
                      {stage.relatedScenarios.map((slug) => {
                        const scenario = getScenarioBySlug(slug);
                        return (
                          <li key={slug}>
                            <Link href={scenarioRoute(slug)}>{scenario?.title ?? slug}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </>
  );
}
