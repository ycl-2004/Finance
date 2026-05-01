import { CaseCard } from "@/components/cards/CaseCard";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { caseStudies } from "@/data/case-studies";

export const metadata = {
  title: "案例练习"
};

export default function CasesPage() {
  return (
    <>
      <Reveal as="header" className="page-hero">
        <p className="eyebrow">Practice Cases</p>
        <h1>案例练习</h1>
        <p className="lead">
          用虚拟小场景练习如何拆问题：先问什么、还缺什么、哪些结论需要专业人士确认。
        </p>
      </Reveal>
      <RevealGroup className="content-list content-list--split">
        {caseStudies.map((study, index) => (
          <CaseCard index={index} study={study} key={study.slug} />
        ))}
      </RevealGroup>
    </>
  );
}
