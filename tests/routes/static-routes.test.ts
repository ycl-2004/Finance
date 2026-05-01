import { describe, expect, it } from "vitest";
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
});
