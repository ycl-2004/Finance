import { GlossaryTable } from "@/components/glossary/GlossaryTable";
import { Reveal } from "@/components/motion/Reveal";
import { extractGlossaryTerms } from "@/content/extract-glossary";

export const metadata = {
  title: "术语表"
};

export default async function GlossaryPage() {
  const terms = await extractGlossaryTerms();

  return (
    <>
      <Reveal as="header" className="page-hero">
        <p className="eyebrow">Glossary</p>
        <h1>金融术语表</h1>
        <p className="lead">
          遇到看不懂的英文缩写或中文术语，可以先在这里查个大概。
          这些解释只用于学习，不是产品或策略建议。
        </p>
      </Reveal>
      <GlossaryTable terms={terms} />
    </>
  );
}
