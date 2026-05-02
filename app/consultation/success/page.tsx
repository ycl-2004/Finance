import { Suspense } from "react";
import { ConsultationSuccessContent } from "@/components/consultation/ConsultationSuccessContent";
import { AppIcon } from "@/components/icons/AppIcon";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = {
  title: "预约确认"
};

export default function ConsultationSuccessPage() {
  return (
    <>
      <Reveal as="header" className="page-hero success-hero">
        <p className="eyebrow">Request Saved</p>
        <h1>预约意向已生成</h1>
        <Suspense
          fallback={
            <p className="lead">下一步请致电确认时间，并把准备清单保存成 PDF。</p>
          }
        >
          <ConsultationSuccessContent />
        </Suspense>
      </Reveal>

      <Reveal as="section" className="section success-grid" ariaLabelledBy="success-next-title">
        <div className="document-panel">
          <span className="card-icon">
            <AppIcon name="checkCircle" />
          </span>
          <h2 id="success-next-title">接下来你可以做什么</h2>
          <ol className="document-step-list">
            <li>确认资料清单里还有哪些项目没准备。</li>
            <li>把想问的问题写在清单旁边。</li>
            <li>使用浏览器打印功能保存 PDF。</li>
            <li>致电 QM Financials 确认时间，或发送邮件草稿。</li>
          </ol>
        </div>

        <div className="document-panel document-panel--danger">
          <h2>安全提醒</h2>
          <p>
            预约前不要发送完整 SIN、银行账号、信用卡 CVV，或任何 CRA、银行、保险、
            Service Canada 密码。需要核对时，优先在会议中现场展示。
          </p>
        </div>
      </Reveal>
    </>
  );
}
