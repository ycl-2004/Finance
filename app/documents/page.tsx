import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article/ArticleBody";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { Reveal } from "@/components/motion/Reveal";
import { getArticleBySlug } from "@/content/load-knowledge";

export const metadata = {
  title: "资料清单"
};

export default async function DocumentsPage() {
  const article = await getArticleBySlug(["client-document-source-map"]);
  if (!article) notFound();

  return (
    <>
      <Reveal as="header" className="page-hero">
        <p className="eyebrow">Document Preparation</p>
        <h1>资料清单</h1>
        <p className="lead">
          会议前先看一眼：常见资料在哪里找、要注意哪些日期、敏感信息怎么保护。
        </p>
        <BoundaryNotice compact />
      </Reveal>
      <Reveal className="info-panel">
        <h2>先记住这 4 条</h2>
        <ul className="check-list check-list--spacious">
          <li>不要共享 CRA、银行、保险或 Service Canada 密码。</li>
          <li>不要无保护地发送完整 SIN、完整银行卡号或完整账号。</li>
          <li>所有资料都要标明日期，因为余额、room、利率和 penalty 会变化。</li>
          <li>顾问代表客户查 CRA 资料时，应使用正式授权，不使用客户本人登入资料。</li>
        </ul>
      </Reveal>
      <Reveal as="div" className="section">
        <ArticleBody html={article.html} />
      </Reveal>
    </>
  );
}
