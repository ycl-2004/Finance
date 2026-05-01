"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { SearchItem } from "@/content/schema";

const typeLabel: Record<SearchItem["type"], string> = {
  article: "文章",
  topic: "主题",
  scenario: "生活场景",
  case: "案例",
  glossary: "术语",
  tool: "工具"
};

export function SearchBox({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalized) return [];
    return items
      .filter((item) => {
        const haystack = [item.title, item.summary, ...item.keywords].join(" ").toLowerCase();
        return haystack.includes(normalized);
      })
      .slice(0, 8);
  }, [items, normalized]);

  return (
    <div className="search">
      <label className="sr-only" htmlFor="site-search">
        搜索知识库
      </label>
      <input
        id="site-search"
        type="search"
        placeholder="搜索 TFSA、房贷、保险..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {query && (
        <div className="search-results" role="listbox" aria-label="搜索结果">
          {results.length ? (
            results.map((item) => (
              <Link
                className="search-result"
                href={item.href}
                key={`${item.type}-${item.href}`}
                onClick={() => setQuery("")}
              >
                <strong>{item.title}</strong>
                <span>
                  {typeLabel[item.type]} · {item.summary}
                </span>
              </Link>
            ))
          ) : (
            <div className="search-result">
              <strong>没有找到结果</strong>
              <span>试试英文缩写、中文术语或主题名称。</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
