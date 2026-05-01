import Link from "next/link";
import type { TopicMetadata } from "@/data/topic-metadata";
import { topicRoute } from "@/lib/routes";

export function TopicCard({ topic, count }: { topic: TopicMetadata; count?: number }) {
  return (
    <Link className="card topic-card" href={topicRoute(topic.slug)}>
      <div className="meta-row">
        <span className="tag tag--accent">{topic.title}</span>
        {typeof count === "number" && <span className="tag">{count} 篇</span>}
      </div>
      <h3>{topic.primaryQuestion}</h3>
      <p>{topic.description}</p>
    </Link>
  );
}
