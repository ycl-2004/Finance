import type { MetadataRoute } from "next";
import { getAllArticles } from "@/content/load-knowledge";
import { caseStudies } from "@/data/case-studies";
import { scenarios } from "@/data/scenarios";
import { topicMetadata } from "@/data/topic-metadata";
import { articleRoute, caseRoute, scenarioRoute, topicRoute } from "@/lib/routes";

export const dynamic = "force-static";

function withTrailingSlash(route: string) {
  return route === "/" ? "/" : `${route}/`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.GITHUB_PAGES === "true" ? "https://ycl-2004.github.io/Finance" : "http://localhost:3000");
  const articles = await getAllArticles();
  const staticRoutes = [
    "/",
    "/planning",
    "/documents",
    "/learn",
    "/topics",
    "/glossary",
    "/scenarios",
    "/cases",
    "/consultation",
    "/about",
    "/boundaries"
  ];
  const routes = [
    ...staticRoutes,
    ...topicMetadata.map((topic) => topicRoute(topic.slug)),
    ...articles.map((article) => articleRoute(article.slug)),
    ...scenarios.map((scenario) => scenarioRoute(scenario.slug)),
    ...caseStudies.map((study) => caseRoute(study.slug))
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${withTrailingSlash(route)}`,
    lastModified: new Date()
  }));
}
