import { CaseCard } from "@/components/cards/CaseCard";
import { caseStudies } from "@/data/case-studies";

export const metadata = {
  title: "案例练习"
};

export default function CasesPage() {
  return (
    <>
      <header className="article-header">
        <p className="eyebrow">Practice Cases</p>
        <h1>案例练习</h1>
        <p className="lead">
          用虚拟场景练习“先问什么、缺什么资料、哪些结论不能直接下”。案例只训练理解框架。
        </p>
      </header>
      <section className="grid grid--2">
        {caseStudies.map((study) => (
          <CaseCard study={study} key={study.slug} />
        ))}
      </section>
    </>
  );
}
