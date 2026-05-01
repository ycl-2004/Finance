import { TopicCard } from "@/components/cards/TopicCard";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { getAllArticles } from "@/content/load-knowledge";
import { topicMetadata } from "@/data/topic-metadata";

export const metadata = {
  title: "主题知识库"
};

export default async function TopicsPage() {
  const articles = await getAllArticles();
  const countByTopic = new Map<string, number>();
  articles.forEach((article) =>
    countByTopic.set(article.topic, (countByTopic.get(article.topic) ?? 0) + 1)
  );

  return (
    <>
      <Reveal as="header" className="page-hero">
        <p className="eyebrow">Knowledge Topics</p>
        <h1>主题知识库</h1>
        <p className="lead">
          如果你已经知道要查账户、投资、保险、房贷、税务或退休，
          可以直接从这里进入对应主题。
        </p>
      </Reveal>
      <RevealGroup className="content-list content-list--split">
        {topicMetadata
          .filter((topic) => topic.order >= 10)
          .map((topic, index) => (
            <TopicCard
              index={index}
              topic={topic}
              count={countByTopic.get(topic.slug)}
              key={topic.slug}
            />
          ))}
      </RevealGroup>
    </>
  );
}
