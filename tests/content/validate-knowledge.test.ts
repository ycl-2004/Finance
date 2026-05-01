import { describe, expect, it } from "vitest";
import { getAllArticles } from "../../src/content/load-knowledge";
import { findAdviceLanguage } from "../../src/lib/content-guards";

describe("knowledge loader", () => {
  it("loads the current knowledge base", async () => {
    const articles = await getAllArticles();
    expect(articles).toHaveLength(40);
  });

  it("normalizes required metadata", async () => {
    const articles = await getAllArticles();
    for (const article of articles) {
      expect(article.title.length).toBeGreaterThan(0);
      expect(article.topic.length).toBeGreaterThan(0);
      expect(article.audience.length).toBeGreaterThan(0);
      expect(article.difficulty).toBe("beginner");
      expect(article.lastReviewed).toMatch(/^\d{4}-\d{2}$/);
    }
  });

  it("detects prohibited direct advice language", () => {
    expect(findAdviceLanguage("你应该买这个产品")).toContain("你应该买");
  });
});
