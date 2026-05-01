import fs from "node:fs";
import path from "node:path";
import { parseMarkdownArticle } from "./parse-markdown";
import type { Article, SearchItem } from "./schema";
import { getTopicBySlug, topicMetadata } from "../data/topic-metadata";
import { scenarios } from "../data/scenarios";
import { caseStudies } from "../data/case-studies";
import { articleRoute, caseRoute, scenarioRoute, topicRoute } from "../lib/routes";
import { extractGlossaryTerms } from "./extract-glossary";

const knowledgeDir = path.join(process.cwd(), "knowledge");

let articleCache: Article[] | null = null;

function getMarkdownFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.name.startsWith(".")) return [];
    if (entry.isDirectory()) return getMarkdownFiles(fullPath);
    return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
  });
}

function slugPartsForFile(filePath: string): string[] {
  const relative = path.relative(knowledgeDir, filePath);
  return relative.replace(/\.md$/, "").split(path.sep);
}

export async function getAllArticles(): Promise<Article[]> {
  if (articleCache) return articleCache;

  const files = getMarkdownFiles(knowledgeDir).sort();
  const articles = await Promise.all(
    files.map((filePath) =>
      parseMarkdownArticle({
        raw: fs.readFileSync(filePath, "utf8"),
        path: path.relative(process.cwd(), filePath),
        slugParts: slugPartsForFile(filePath)
      })
    )
  );

  articleCache = articles.sort((a, b) => a.slug.localeCompare(b.slug));
  return articleCache;
}

export async function getArticleBySlug(slugParts: string[]): Promise<Article | undefined> {
  const slug = slugParts.join("/");
  const articles = await getAllArticles();
  return articles.find((article) => article.slug === slug);
}

export async function getArticlesByTopic(topic: string): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((article) => article.topic === topic);
}

export async function getArticlesBySlugs(slugs: string[]): Promise<Article[]> {
  const articles = await getAllArticles();
  return slugs
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter((article): article is Article => Boolean(article));
}

export async function getSearchIndex(): Promise<SearchItem[]> {
  const articles = await getAllArticles();
  const glossaryTerms = await extractGlossaryTerms();

  const articleItems: SearchItem[] = articles.map((article) => ({
    title: article.title,
    href: articleRoute(article.slug),
    type: "article",
    summary: article.summary,
    keywords: [article.topic, article.title, article.slug, ...article.terms, ...article.sourceUrls]
  }));

  const topicItems: SearchItem[] = topicMetadata.map((topic) => ({
    title: topic.title,
    href: topicRoute(topic.slug),
    type: "topic",
    summary: topic.description,
    keywords: [topic.slug, topic.englishTitle, topic.primaryQuestion, ...topic.relatedTerms]
  }));

  const scenarioItems: SearchItem[] = scenarios.map((scenario) => ({
    title: scenario.title,
    href: scenarioRoute(scenario.slug),
    type: "scenario",
    summary: scenario.problem,
    keywords: [
      scenario.userType,
      scenario.problem,
      ...scenario.whatToLearnFirst,
      ...scenario.advisorQuestions
    ]
  }));

  const caseItems: SearchItem[] = caseStudies.map((study) => ({
    title: study.title,
    href: caseRoute(study.slug),
    type: "case",
    summary: study.background,
    keywords: [study.level, ...study.tasks, ...study.relatedArticles]
  }));

  const glossaryItems: SearchItem[] = glossaryTerms.map((term) => ({
    title: `${term.term} / ${term.chinese}`,
    href: `/glossary?query=${encodeURIComponent(term.term)}`,
    type: "glossary",
    summary: term.description,
    keywords: [term.term, term.chinese, term.category, ...term.aliases]
  }));

  const toolItems: SearchItem[] = [
    {
      title: "开始规划",
      href: "/planning",
      type: "tool",
      summary: "按新移民、买房、家庭、房贷续约、退休和企业主场景进入准备流程。",
      keywords: ["开始规划", "场景", "买房", "新移民", "退休", "企业主"]
    },
    {
      title: "资料准备",
      href: "/documents",
      type: "tool",
      summary: "可勾选资料清单，保存本机进度，并打印或保存为 PDF。",
      keywords: ["资料清单", "checklist", "PDF", "NOA", "T4", "bank statements"]
    },
    {
      title: "关于我们",
      href: "/about",
      type: "tool",
      summary: "说明平台定位、信任边界、持牌说明和不提供的服务。",
      keywords: ["关于我们", "信任", "持牌", "边界", "不提供建议"]
    }
  ];

  return [...toolItems, ...topicItems, ...scenarioItems, ...articleItems, ...caseItems, ...glossaryItems].map(
    (item) => ({
      ...item,
      summary: item.summary.replace(/\s+/g, " ").slice(0, 180),
      keywords: item.keywords.filter(Boolean)
    })
  );
}

export async function getTopicArticles(topicSlug: string): Promise<{
  topic: ReturnType<typeof getTopicBySlug>;
  articles: Article[];
}> {
  return {
    topic: getTopicBySlug(topicSlug),
    articles: await getArticlesByTopic(topicSlug)
  };
}
