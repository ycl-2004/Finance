import Link from "next/link";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
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
      <header className="article-header">
        <p className="eyebrow">Start Here</p>
        <h1>学习路线</h1>
        <p className="lead">
          不从文件夹开始，而从一个小白应该建立的理解顺序开始。每个阶段都有目标、必读文章、
          检查问题和相关生活场景。
        </p>
        <div className="actions">
          <Link className="button button--primary" href={articleRoute(learningPath[0].requiredArticles[0])}>
            从第一阶段开始
          </Link>
          <Link className="button" href="/scenarios">
            按问题学习
          </Link>
        </div>
        <BoundaryNotice compact />
      </header>

      <section className="grid">
        {learningPath.map((stage) => (
          <article className="panel" id={stage.id} key={stage.id}>
            <div className="meta-row">
              <span className="tag tag--accent">Stage {stage.order}</span>
              <span className="tag">{stage.audience}</span>
            </div>
            <h2>{stage.title}</h2>
            <p>{stage.goal}</p>
            <div className="grid grid--2">
              <div>
                <h3>必读文章</h3>
                <ul>
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
                    <ul>
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
                <h3>学完后检查自己</h3>
                <ul>
                  {stage.checkQuestions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
                <h3>相关生活场景</h3>
                <ul>
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
          </article>
        ))}
      </section>
    </>
  );
}
