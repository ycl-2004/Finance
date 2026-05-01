import type { CaseStudy } from "@/data/case-studies";
import { MotionListLink } from "@/components/motion/MotionListLink";
import { caseRoute } from "@/lib/routes";

export function CaseCard({ study, index = 0 }: { study: CaseStudy; index?: number }) {
  return (
    <MotionListLink
      description={study.background}
      eyebrow="案例练习"
      href={caseRoute(study.slug)}
      index={index}
      layoutId={`case-${study.slug}`}
      meta={[study.level, `${study.estimatedMinutes} 分钟`, `${study.tasks.length} 个任务`]}
      title={study.title}
    />
  );
}
