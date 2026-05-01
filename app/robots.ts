import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap:
      process.env.GITHUB_PAGES === "true"
        ? "https://ycl-2004.github.io/Finance/sitemap.xml"
        : undefined
  };
}
