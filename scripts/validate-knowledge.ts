import { getAllArticles } from "../src/content/load-knowledge";
import { validateArticleForPublicUse } from "../src/lib/content-guards";
import { topicMetadata } from "../src/data/topic-metadata";
import { learningPath } from "../src/data/learning-path";
import { scenarios } from "../src/data/scenarios";
import { caseStudies } from "../src/data/case-studies";
import { documentChecklists } from "../src/data/document-checklists";

async function main() {
  const errors: string[] = [];
  const articles = await getAllArticles();
  const articleSlugs = new Set(articles.map((article) => article.slug));
  const topicSlugs = new Set(topicMetadata.map((topic) => topic.slug));

  if (articles.length !== 40) {
    errors.push(`Expected 40 knowledge Markdown files, found ${articles.length}`);
  }

  for (const article of articles) {
    errors.push(...validateArticleForPublicUse(article));
    if (!topicSlugs.has(article.topic)) {
      errors.push(`${article.path}: topic '${article.topic}' is not defined in topic metadata`);
    }
  }

  for (const stage of learningPath) {
    if (stage.checkQuestions.length < 2) {
      errors.push(`Learning stage '${stage.id}' must have at least 2 check questions`);
    }
    for (const slug of [...stage.requiredArticles, ...stage.optionalArticles]) {
      if (!articleSlugs.has(slug)) {
        errors.push(`Learning stage '${stage.id}' references missing article '${slug}'`);
      }
    }
  }

  for (const scenario of scenarios) {
    if (scenario.relatedArticles.length < 3) {
      errors.push(`Scenario '${scenario.slug}' must link at least 3 articles/resources`);
    }
    const checklist = documentChecklists.find(
      (documentChecklist) => documentChecklist.scenarioSlug === scenario.slug
    );
    if (!checklist) {
      errors.push(`Scenario '${scenario.slug}' must have a matching document checklist`);
    }
    for (const slug of scenario.relatedArticles) {
      if (!articleSlugs.has(slug)) {
        errors.push(`Scenario '${scenario.slug}' references missing article '${slug}'`);
      }
    }
  }

  for (const checklist of documentChecklists) {
    if (!scenarios.some((scenario) => scenario.slug === checklist.scenarioSlug)) {
      errors.push(`Document checklist '${checklist.slug}' references missing scenario '${checklist.scenarioSlug}'`);
    }
    if (checklist.slug !== checklist.scenarioSlug) {
      errors.push(`Document checklist '${checklist.slug}' slug must match scenarioSlug '${checklist.scenarioSlug}'`);
    }
    if (checklist.groups.length === 0) {
      errors.push(`Document checklist '${checklist.slug}' must include at least one group`);
    }
    if (checklist.advisorQuestions.length < 3) {
      errors.push(`Document checklist '${checklist.slug}' must include at least 3 advisor questions`);
    }
  }

  for (const study of caseStudies) {
    if (study.missingFacts.length === 0) {
      errors.push(`Case '${study.slug}' must include missing facts`);
    }
    if (study.relatedArticles.length < 3) {
      errors.push(`Case '${study.slug}' must link at least 3 articles`);
    }
    for (const slug of study.relatedArticles) {
      if (!articleSlugs.has(slug)) {
        errors.push(`Case '${study.slug}' references missing article '${slug}'`);
      }
    }
  }

  if (errors.length) {
    console.error("Knowledge validation failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Knowledge validation passed: ${articles.length} Markdown files checked.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
