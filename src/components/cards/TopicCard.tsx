import type { TopicMetadata } from "@/data/topic-metadata";
import { MotionListLink } from "@/components/motion/MotionListLink";
import { topicRoute } from "@/lib/routes";

export function TopicCard({
  topic,
  count,
  index = 0
}: {
  topic: TopicMetadata;
  count?: number;
  index?: number;
}) {
  return (
    <MotionListLink
      description={topic.description}
      eyebrow={topic.englishTitle}
      href={topicRoute(topic.slug)}
      index={index}
      layoutId={`topic-${topic.slug}`}
      meta={[topic.difficulty, typeof count === "number" ? `${count} 篇` : "主题"]}
      title={topic.primaryQuestion}
    />
  );
}
