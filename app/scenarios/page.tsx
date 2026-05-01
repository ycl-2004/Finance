import { ScenarioCard } from "@/components/cards/ScenarioCard";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { scenarios } from "@/data/scenarios";

export const metadata = {
  title: "生活场景"
};

export default function ScenariosPage() {
  return (
    <>
      <Reveal as="header" className="page-hero">
        <p className="eyebrow">Learn by Situation</p>
        <h1>按问题学习</h1>
        <p className="lead">
          不确定该看哪个主题时，先从眼前的问题开始。每个场景都会帮你整理：
          先看什么、准备什么、可以问什么。
        </p>
      </Reveal>
      <RevealGroup className="content-list content-list--split">
        {scenarios.map((scenario, index) => (
          <ScenarioCard index={index} scenario={scenario} key={scenario.slug} />
        ))}
      </RevealGroup>
    </>
  );
}
