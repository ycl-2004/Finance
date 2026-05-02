import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article/ArticleBody";
import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { DocumentChecklistApp } from "@/components/documents/DocumentChecklist";
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
        <h1>资料准备</h1>
        <p className="lead">
          选择场景，勾选资料，生成可带进会议的准备清单。
        </p>
        <BoundaryNotice compact />
      </Reveal>

      <Reveal as="div" className="document-workspace-shell">
        <DocumentChecklistApp />
      </Reveal>

      <Reveal as="div" className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Reference</p>
            <h2>详细资料来源说明</h2>
            <p>下面保留原有资料地图，方便你继续查每类文件通常从哪里取得。</p>
          </div>
        </div>
        <ArticleBody html={article.html} />
      </Reveal>
    </>
  );
}
