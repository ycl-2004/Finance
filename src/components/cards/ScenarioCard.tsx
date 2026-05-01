import Link from "next/link";
import type { Scenario } from "@/data/scenarios";
import { scenarioRoute } from "@/lib/routes";

export function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <Link className="card scenario-card" href={scenarioRoute(scenario.slug)}>
      <div className="meta-row">
        <span className="tag tag--accent">生活场景</span>
        <span className="tag">{scenario.relatedArticles.length} 个资源</span>
      </div>
      <h3>{scenario.title}</h3>
      <p>{scenario.problem}</p>
    </Link>
  );
}
