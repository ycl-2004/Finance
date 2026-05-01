import Link from "next/link";
import type { CaseStudy } from "@/data/case-studies";
import { caseRoute } from "@/lib/routes";

export function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <Link className="card case-card" href={caseRoute(study.slug)}>
      <div className="meta-row">
        <span className="tag tag--accent">{study.level}</span>
        <span className="tag">{study.estimatedMinutes} 分钟</span>
      </div>
      <h3>{study.title}</h3>
      <p>{study.background}</p>
    </Link>
  );
}
