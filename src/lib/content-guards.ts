import type { Article } from "@/content/schema";

export const prohibitedAdvicePhrases = [
  "你应该买",
  "你应该卖",
  "应该投资",
  "保证收益",
  "稳赚",
  "一定能赚钱"
];

export function findAdviceLanguage(text: string): string[] {
  const hits = new Set<string>();
  const lines = text.split("\n");

  for (const line of lines) {
    for (const phrase of prohibitedAdvicePhrases) {
      if (!line.includes(phrase)) continue;
      const before = line.slice(0, line.indexOf(phrase));
      const isBoundaryExample = /不|不要|不能|不会|避免|禁止|不是|不应|不输出|不出现|说[“"]?$/.test(
        before.trim()
      );
      if (!isBoundaryExample) hits.add(phrase);
    }
  }

  return Array.from(hits);
}

export function validateArticleForPublicUse(article: Article): string[] {
  const errors: string[] = [];

  if (!/^\d{4}-\d{2}$/.test(article.lastReviewed)) {
    errors.push(`${article.path}: lastReviewed must use YYYY-MM format`);
  }

  if (!article.topic) {
    errors.push(`${article.path}: missing topic`);
  }

  if (!article.audience) {
    errors.push(`${article.path}: missing audience`);
  }

  const h1Count = article.body.match(/^#\s+/gm)?.length ?? 0;
  if (h1Count !== 1) {
    errors.push(`${article.path}: expected exactly one H1, found ${h1Count}`);
  }

  const banned = findAdviceLanguage(article.body);
  if (banned.length) {
    errors.push(`${article.path}: contains prohibited advice language: ${banned.join(", ")}`);
  }

  return errors;
}
