import { GlossaryTable } from "@/components/glossary/GlossaryTable";
import { extractGlossaryTerms } from "@/content/extract-glossary";

export const metadata = {
  title: "术语表"
};

export default async function GlossaryPage() {
  const terms = await extractGlossaryTerms();

  return (
    <>
      <header className="article-header">
        <p className="eyebrow">Glossary</p>
        <h1>金融术语表</h1>
        <p className="lead">
          搜索英文缩写、中文译名或说明文字。术语解释用于学习，不代表任何产品或策略建议。
        </p>
      </header>
      <GlossaryTable terms={terms} />
    </>
  );
}
