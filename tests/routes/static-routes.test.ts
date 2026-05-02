import { describe, expect, it } from "vitest";
import { documentChecklists, getChecklistByScenarioSlug } from "../../src/data/document-checklists";
import { scenarios } from "../../src/data/scenarios";
import { articleRoute, caseRoute, scenarioRoute, topicRoute } from "../../src/lib/routes";

describe("route helpers", () => {
  it("builds stable public routes", () => {
    expect(articleRoute("03-canadian-registered-accounts/01-tfsa")).toBe(
      "/articles/03-canadian-registered-accounts/01-tfsa"
    );
    expect(topicRoute("canadian-registered-accounts")).toBe(
      "/topics/canadian-registered-accounts"
    );
    expect(scenarioRoute("first-home")).toBe("/scenarios/first-home");
    expect(caseRoute("first-home-prep")).toBe("/cases/first-home-prep");
  });

  it("keeps every scenario connected to its document checklist", () => {
    for (const scenario of scenarios) {
      const checklist = getChecklistByScenarioSlug(scenario.slug);

      expect(checklist, `${scenario.slug} should have a document checklist`).toBeDefined();
      expect(checklist?.slug).toBe(scenario.slug);
    }
  });

  it("keeps checklist query slugs aligned with scenario routes", () => {
    for (const checklist of documentChecklists) {
      expect(scenarios.some((scenario) => scenario.slug === checklist.scenarioSlug)).toBe(true);
      expect(checklist.slug).toBe(checklist.scenarioSlug);
    }
  });

  it("keeps tax and cashflow beginner paths available as actionable scenarios", () => {
    expect(scenarios.map((scenario) => scenario.slug)).toEqual(
      expect.arrayContaining(["tax-season-prep", "cashflow-reset"])
    );
    expect(getChecklistByScenarioSlug("tax-season-prep")?.groups.length).toBeGreaterThan(0);
    expect(getChecklistByScenarioSlug("cashflow-reset")?.groups.length).toBeGreaterThan(0);
  });
});
