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
          不知道该看哪个主题？先从你的真实问题开始。每个场景会告诉你先理解什么、
          准备什么资料、可以问顾问什么问题。
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
