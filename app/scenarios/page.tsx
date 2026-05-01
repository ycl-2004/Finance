import { ScenarioCard } from "@/components/cards/ScenarioCard";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { scenarios } from "@/data/scenarios";

export const metadata = {
  title: "场景流程"
};

export default function ScenariosPage() {
  return (
    <>
      <Reveal as="header" className="page-hero">
        <p className="eyebrow">Scenario Flows</p>
        <h1>按场景开始规划</h1>
        <p className="lead">
          每个场景都按“要做什么、常见错误、准备资料、顾问问题”组织。
          先完成行动路径，再回到学习中心补概念。
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
