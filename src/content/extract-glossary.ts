import fs from "node:fs";
import path from "node:path";

export type GlossaryTerm = {
  term: string;
  chinese: string;
  description: string;
  category: string;
  aliases: string[];
};

function splitMarkdownRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

export async function extractGlossaryTerms(): Promise<GlossaryTerm[]> {
  const filePath = path.join(process.cwd(), "knowledge", "glossary.md");
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  const terms: GlossaryTerm[] = [];
  let category = "未分类";

  for (const line of lines) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      category = heading[1].trim();
      continue;
    }

    if (!line.trim().startsWith("|") || line.includes("---")) continue;
    const cells = splitMarkdownRow(line);
    if (cells.length < 3 || cells[0].toLowerCase() === "term") continue;

    const [term, chinese, description] = cells;
    terms.push({
      term,
      chinese,
      description,
      category,
      aliases: [term.toLowerCase(), chinese]
    });
  }

  return terms;
}
