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
    body: "本网站本身不是持牌主体，也不构成任何持牌声明。涉及具体投资、保险、贷款、税务或法律建议时，请以相关专业人士或机构的公开登记和书面披露为准。用户也应该学会自行核对专业人士资格。"
  },
  {
    title: "我们不提供什么",
    body: "不推荐具体证券、基金、保险产品、贷款机构、税务结构或法律文件；不收集真实客户文件；不要求用户上传敏感资料。"
  }
];

const verificationLinks = [
  {
    title: "查顾问注册",
    body: "投资相关服务应核对注册信息、公司名称、服务范围和披露文件。",
    href: "https://www.aretheyregistered.ca/"
  },
  {
    title: "了解如何选择顾问",
    body: "先理解收费、资质、利益冲突和服务边界，再进入个人建议。",
    href: "https://www.canada.ca/en/financial-consumer-agency/services/savings-investments/choose-financial-advisor.html"
  },
  {
    title: "BC 投资者教育",
    body: "BCSC 提供投资者保护和 registration check 的公开说明。",
    href: "https://www.bcsc.bc.ca/industry/registrant-regulation/registration-basics/checking-registration"
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

      <Reveal as="section" className="section verification-section" ariaLabelledBy="verification-title">
        <div className="section-header section-header--wide">
          <div>
            <p className="eyebrow">Verify</p>
            <h2 id="verification-title">如何验证专业人士，而不是只相信网页文案</h2>
            <p>
              金融相关决定进入个人建议前，用户应该确认对方身份、注册状态、服务边界和费用披露。
            </p>
          </div>
          <Link className="button" href="/privacy">
            隐私说明
          </Link>
        </div>
        <div className="verification-list">
          {verificationLinks.map((item) => (
            <a href={item.href} key={item.title} rel="noreferrer" target="_blank">
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </a>
          ))}
        </div>
      </Reveal>
    </>
  );
}
