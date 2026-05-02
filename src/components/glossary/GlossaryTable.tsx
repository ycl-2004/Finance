"use client";

import { useMemo, useState } from "react";
import type { GlossaryTerm } from "@/content/extract-glossary";

export function GlossaryTable({ terms }: { terms: GlossaryTerm[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => Array.from(new Set(terms.map((term) => term.category))).sort(),
    [terms]
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return terms.filter((term) => {
      const categoryMatch = category === "all" || term.category === category;
      const text = `${term.term} ${term.chinese} ${term.description}`.toLowerCase();
      return categoryMatch && (!normalized || text.includes(normalized));
    });
  }, [terms, query, category]);

  return (
    <section className="section glossary-section">
      <div className="filter-row">
        <input
          type="search"
          placeholder="搜索 TFSA、免税储蓄账户、mortgage..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="搜索术语"
        />
        <select
          aria-label="术语分类"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="all">全部分类</option>
          {categories.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="table-surface">
        <table>
          <thead>
            <tr>
              <th>Term</th>
              <th>中文</th>
              <th>说明</th>
              <th>分类</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((term) => (
              <tr key={`${term.category}-${term.term}`}>
                <td>{term.term}</td>
                <td>{term.chinese}</td>
                <td>{term.description}</td>
                <td>{term.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && <p className="muted">没有找到匹配术语。</p>}
      </div>
    </section>
  );
}
