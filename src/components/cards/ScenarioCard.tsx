import type { Scenario } from "@/data/scenarios";
import { MotionListLink } from "@/components/motion/MotionListLink";
import { scenarioRoute } from "@/lib/routes";

export function ScenarioCard({ scenario, index = 0 }: { scenario: Scenario; index?: number }) {
  return (
    <MotionListLink
      description={scenario.problem}
      eyebrow="生活场景"
      href={scenarioRoute(scenario.slug)}
      index={index}
      layoutId={`scenario-${scenario.slug}`}
      meta={[`${scenario.relatedArticles.length} 个资源`, `${scenario.documentsToPrepare.length} 类资料`]}
      title={scenario.title}
    />
  );
}
