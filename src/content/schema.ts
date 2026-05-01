import { z } from "zod";

export const difficultySchema = z
  .enum(["beginner", "intermediate", "advanced"])
  .default("beginner");

export const articleFrontmatterSchema = z.object({
  title: z.string().optional(),
  topic: z.string().optional(),
  audience: z.string().default("beginner"),
  difficulty: difficultySchema,
  lastReviewed: z.string().optional(),
  last_reviewed: z.string().optional(),
  summary: z.string().optional(),
  terms: z.array(z.string()).optional(),
  relatedArticles: z.array(z.string()).optional(),
  reviewStatus: z.string().optional()
});

export type Difficulty = z.infer<typeof difficultySchema>;

export type Article = {
  slug: string;
  slugParts: string[];
  path: string;
  title: string;
  topic: string;
  audience: string;
  difficulty: Difficulty;
  lastReviewed: string;
  estimatedMinutes: number;
  summary: string;
  body: string;
  html: string;
  sourceUrls: string[];
  terms: string[];
  relatedArticles: string[];
  reviewStatus?: string;
};

export type SearchItem = {
  title: string;
  href: string;
  type: "article" | "topic" | "scenario" | "case" | "glossary" | "tool";
  summary: string;
  keywords: string[];
};
