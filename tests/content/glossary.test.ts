import { describe, expect, it } from "vitest";
import { extractGlossaryTerms } from "../../src/content/extract-glossary";

describe("glossary extraction", () => {
  it("extracts searchable bilingual terms", async () => {
    const terms = await extractGlossaryTerms();
    expect(terms.find((term) => term.term === "TFSA")?.chinese).toContain("免税");
    expect(terms.find((term) => term.chinese.includes("房贷"))?.term).toBe("Mortgage");
  });
});
