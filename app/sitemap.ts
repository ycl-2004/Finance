import type { MetadataRoute } from "next";
import { getAllArticles } from "@/content/load-knowledge";
import { caseStudies } from "@/data/case-studies";
import { scenarios } from "@/data/scenarios";
import { topicMetadata } from "@/data/topic-metadata";
import { articleRoute, caseRoute, scenarioRoute, topicRoute } from "@/lib/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://example.com";
  const articles = await getAllArticles();
  const staticRoutes = ["/", "/learn", "/topics", "/glossary", "/scenarios", "/cases", "/documents", "/boundaries"];
  const routes = [
    ...staticRoutes,
    ...topicMetadata.map((topic) => topicRoute(topic.slug)),
    ...articles.map((article) => articleRoute(article.slug)),
    ...scenarios.map((scenario) => scenarioRoute(scenario.slug)),
    ...caseStudies.map((study) => caseRoute(study.slug))
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
