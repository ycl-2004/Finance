import { describe, expect, it } from "vitest";
import { containsCjk, localizeVisibleText } from "../../src/i18n/domTranslations";

describe("DOM translation helpers", () => {
  it("translates registered Chinese UI copy into English", () => {
    expect(localizeVisibleText("开始规划", "en")).toBe("Start planning");
    expect(localizeVisibleText("查看可打印清单", "en")).toBe("Printable checklist");
  });

  it("does not leak unregistered Chinese copy in English mode", () => {
    const translated = localizeVisibleText("这是一段未来新增但还没有登记的中文文案。", "en");

    expect(containsCjk(translated)).toBe(false);
  });

  it("translates English UI labels back to Chinese mode when needed", () => {
    expect(localizeVisibleText("Start Here", "zh")).toBe("从这里开始");
    expect(localizeVisibleText("Open", "zh")).toBe("打开");
  });
});
