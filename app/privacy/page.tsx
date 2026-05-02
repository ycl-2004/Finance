import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = {
  title: "隐私说明"
};

export default function PrivacyPage() {
  return (
    <>
      <Reveal as="header" className="page-hero">
        <p className="eyebrow">Privacy</p>
        <h1>隐私说明</h1>
        <p className="lead">
          第一版平台不要求用户上传真实文件，也不保存到服务器。资料清单和预约摘要只用于会前准备。
        </p>
        <div className="actions">
          <Link className="button button--primary" href="/documents">
            返回资料准备
          </Link>
          <Link className="button" href="/consultation">
            预约准备会
          </Link>
        </div>
      </Reveal>

      <Reveal as="article" className="article-body">
        <h2>本站目前如何处理资料</h2>
        <ul>
          <li>资料清单勾选进度保存在你的浏览器 localStorage，不会上传到服务器。</li>
          <li>预约意向表单会在本机生成摘要，正式安排需要电话确认或由你主动发送邮件。</li>
          <li>本站不要求上传 CRA、银行、保险、Service Canada 或投资账户文件。</li>
          <li>本站不要求提供 CRA、银行、保险、Service Canada 的用户名或密码。</li>
        </ul>

        <h2>不要输入或发送的信息</h2>
        <ul>
          <li>完整 SIN 号码、完整银行账号、信用卡 CVV/CVC。</li>
          <li>任何登录密码、一次性验证码或账户恢复码。</li>
          <li>未经遮盖的身份证、税务、保险或银行文件。</li>
        </ul>

        <h2>浏览器本机数据</h2>
        <p>
          如果你在共用电脑上使用本站，请在完成后重置资料清单，并清除浏览器本机数据。
          本机保存是为了让你稍后继续整理，不代表 QM Financials 已收到你的资料。
        </p>

        <h2>正式咨询前</h2>
        <p>
          需要核对敏感信息时，优先在正式会议中现场展示，或按专业人士提供的安全流程提交。
          具体隐私、合规和记录保存要求，应以提供服务的专业人士或机构的正式文件为准。
        </p>
      </Reveal>
    </>
  );
}
