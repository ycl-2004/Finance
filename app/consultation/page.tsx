import { Suspense } from "react";
import Link from "next/link";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { ConsultationForm } from "@/components/consultation/ConsultationForm";
import { AppIcon } from "@/components/icons/AppIcon";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = {
  title: "预约准备会"
};

const trustItems = [
  {
    icon: "shieldCheck",
    title: "不收敏感密码",
    body: "不要提交 CRA、银行、保险或 Service Canada 登录信息。"
  },
  {
    icon: "clipboard",
    title: "先确认资料",
    body: "重点是确认你还缺哪些资料和问题，不直接推荐产品。"
  },
  {
    icon: "phone",
    title: "15 分钟准备会",
    body: "适合已经开始整理清单、但不确定下一步的人。"
  }
] as const;

export default function ConsultationPage() {
  return (
    <>
      <Reveal as="header" className="page-hero consultation-hero">
        <p className="eyebrow">Consultation</p>
        <h1>预约 15 分钟准备会</h1>
        <p className="lead">
          先把你的场景、时间状态和核心问题整理清楚。准备会用于确认资料缺口和下一步问题，
          不替代投资、保险、税务、法律或贷款建议。
        </p>
        <div className="actions">
          <a className="button button--primary" href="tel:+17789299942">
            <AppIcon name="phone" />
            直接致电 +1 778 929 9942
          </a>
          <Link className="button" href="/documents">
            <AppIcon name="clipboard" />
            先做资料清单
          </Link>
        </div>
        <BoundaryNotice compact />
      </Reveal>

      <Reveal as="section" className="section consultation-layout" ariaLabelledBy="consultation-form-title">
        <div className="consultation-panel">
          <p className="eyebrow">Book A Prep Call</p>
          <h2 id="consultation-form-title">填写预约意向</h2>
          <p>
            当前版本会把预约草稿保存在你的浏览器，用来生成确认页。正式发送前，请通过电话确认时间。
          </p>
          <Suspense fallback={<div className="form-loading">正在载入预约表单...</div>}>
            <ConsultationForm />
          </Suspense>
        </div>

        <aside className="consultation-side">
          <div className="journey-card">
            <div className="journey-title">
              <h3>建议顺序</h3>
              <span className="status-badge">可执行</span>
            </div>
            <div className="journey-steps">
              <div className="journey-step done">
                <span className="step-dot">
                  <AppIcon name="clipboard" />
                </span>
                <div>
                  <strong>完成资料清单</strong>
                  <span>先把能找到的资料勾选出来</span>
                </div>
                <span className="step-tag">准备</span>
              </div>
              <div className="journey-step active">
                <span className="step-dot">2</span>
                <div>
                  <strong>预约准备会</strong>
                  <span>确认缺口和下一步要问的问题</span>
                </div>
                <span className="step-tag">确认</span>
              </div>
              <div className="journey-step">
                <span className="step-dot">3</span>
                <div>
                  <strong>进入正式会议</strong>
                  <span>带着资料和问题与专业人士讨论</span>
                </div>
                <span className="step-tag">行动</span>
              </div>
            </div>
          </div>

          <div className="trust-strip">
            {trustItems.map((item) => (
              <div className="trust-item" key={item.title}>
                <AppIcon name={item.icon} />
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </div>
            ))}
          </div>
        </aside>
      </Reveal>
    </>
  );
}
