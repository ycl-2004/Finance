import Link from "next/link";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export const metadata = {
  title: "关于我们"
};

const trustBlocks = [
  {
    title: "我们是谁",
    body: "QM Financial Learning Hub 是一个中文加拿大金融教育与会前准备平台，帮助用户在见金融顾问、会计师、律师或贷款专业人士前，把资料和问题先整理清楚。"
  },
  {
    title: "为什么做这个",
    body: "很多客户不是缺产品，而是缺准备路径：不知道该带什么资料、不知道该问什么问题，也不知道哪些信息需要专业人士确认。"
  },
  {
    title: "持牌说明",
    body: "本网站本身不是持牌主体，也不构成任何持牌声明。涉及具体投资、保险、贷款、税务或法律建议时，请以相关专业人士或机构的公开登记和书面披露为准。"
  },
  {
    title: "我们不提供什么",
    body: "不推荐具体证券、基金、保险产品、贷款机构、税务结构或法律文件；不收集真实客户文件；不要求用户上传敏感资料。"
  }
];

export default function AboutPage() {
  return (
    <>
      <Reveal as="header" className="page-hero">
        <p className="eyebrow">About</p>
        <h1>我们帮助你准备，不替你下结论</h1>
        <p className="lead">
          这个平台的价值不是给你一个答案，而是让你在进入专业咨询前，
          已经知道要准备什么、要问什么、哪些边界不能跨。
        </p>
        <div className="actions">
          <Link className="button button--primary" href="/planning">
            开始规划
          </Link>
          <Link className="button" href="/documents">
            资料准备
          </Link>
        </div>
        <BoundaryNotice compact />
      </Reveal>

      <RevealGroup className="about-grid" ariaLabel="关于我们与信任说明">
        {trustBlocks.map((block) => (
          <RevealItem className="about-card" key={block.title}>
            <article>
              <h2>{block.title}</h2>
              <p>{block.body}</p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal as="section" className="section trust-band" ariaLabelledBy="about-boundary-title">
        <div>
          <p className="eyebrow">Promise</p>
          <h2 id="about-boundary-title">清楚边界，是信任的一部分</h2>
          <p>
            我们会把教育内容、资料准备、专业建议边界分开说明。
            当信息会变化或需要个人判断时，页面会提醒你向相应专业人士确认。
          </p>
        </div>
        <Link className="button" href="/boundaries">
          查看教育边界
        </Link>
      </Reveal>
    </>
  );
}
