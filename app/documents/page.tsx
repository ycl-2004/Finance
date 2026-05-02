import { BoundaryNotice } from "@/components/article/BoundaryNotice";
import { DocumentChecklistApp } from "@/components/documents/DocumentChecklist";
import { DocumentSourceGuide } from "@/components/documents/DocumentSourceGuide";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = {
  title: "资料清单"
};

export default function DocumentsPage() {
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
            <p className="eyebrow">资料来源</p>
            <h2 id="document-source-guide-title">按资料类型找到资料来源</h2>
            <p>选择你正在准备的资料类型，只看对应入口、常见文件、准备步骤和注意事项。</p>
          </div>
        </div>
        <DocumentSourceGuide />
      </Reveal>
    </>
  );
}
