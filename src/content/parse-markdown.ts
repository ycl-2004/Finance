import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { articleFrontmatterSchema, type Article } from "./schema";
import { estimateReadingMinutes } from "./reading-time";

const sourceUrlRegex = /https?:\/\/[^\s)]+/g;

export async function markdownToHtml(markdown: string): Promise<string> {
  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);

  return processed.toString();
}

export function extractTitle(markdown: string, fallback: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? fallback;
}

export function extractSummary(markdown: string): string {
  const body = markdown
    .replace(/^---[\s\S]*?---/, "")
    .replace(/^#\s+.+$/m, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && !line.startsWith("|"));

  const firstParagraph = body.find((line) => !line.startsWith("- ") && !/^\d+\./.test(line));
  return firstParagraph?.slice(0, 140) ?? "中文金融知识库文章。";
}

export function extractSources(markdown: string): string[] {
  return Array.from(new Set(markdown.match(sourceUrlRegex) ?? []));
}

export function extractLastReviewed(markdown: string): string | undefined {
  return markdown.match(/(?:资料校准时间|last reviewed|last_reviewed)[：:\s]+(\d{4}-\d{2})/i)?.[1];
}

function defaultTopicFromSlug(slugParts: string[]): string {
  const first = slugParts[0] ?? "knowledge-system";
  if (first === "README" || first === "00-registry") {
    return "knowledge-system";
  }

  if (/^\d{2}-/.test(first)) {
    return first.replace(/^\d{2}-/, "");
  }

  return first.replace(/\.md$/, "");
}

export async function parseMarkdownArticle(input: {
  raw: string;
  path: string;
  slugParts: string[];
}): Promise<Article> {
  const { raw, path, slugParts } = input;
  const parsed = matter(raw);
  const frontmatter = articleFrontmatterSchema.parse(parsed.data);
  const fallbackTitle = slugParts.at(-1)?.replace(/-/g, " ") ?? "Untitled";
  const title = frontmatter.title ?? extractTitle(parsed.content, fallbackTitle);
  const body = parsed.content.trim();
  const lastReviewed =
    frontmatter.lastReviewed ??
    frontmatter.last_reviewed ??
    extractLastReviewed(raw) ??
    "2026-04";

  return {
    slug: slugParts.join("/"),
    slugParts,
    path,
    title,
    topic: frontmatter.topic ?? defaultTopicFromSlug(slugParts),
    audience: frontmatter.audience,
    difficulty: frontmatter.difficulty,
    lastReviewed,
    estimatedMinutes: estimateReadingMinutes(body),
    summary: frontmatter.summary ?? extractSummary(body),
    body,
    html: await markdownToHtml(body),
    sourceUrls: extractSources(raw),
    terms: frontmatter.terms ?? [],
    relatedArticles: frontmatter.relatedArticles ?? [],
    reviewStatus: frontmatter.reviewStatus
  };
}
