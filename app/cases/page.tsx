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
          用虚拟场景练习“先问什么、缺什么资料、哪些结论不能直接下”。案例只训练理解框架。
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
