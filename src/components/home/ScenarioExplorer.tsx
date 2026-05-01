"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export type ScenarioExplorerItem = {
  slug: string;
  title: string;
  userType: string;
  problem: string;
  href: string;
  themes: string[];
  resourceCount: number;
  documentCount: number;
  questionCount: number;
};

const filters = ["全部", "新移民", "买房", "账户", "保险", "退休", "企业主", "税务"];

export function ScenarioExplorer({ scenarios }: { scenarios: ScenarioExplorerItem[] }) {
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const shouldReduceMotion = useReducedMotion();
  const filteredScenarios = useMemo(() => {
    if (activeFilter === "全部") return scenarios;
    return scenarios.filter((scenario) => scenario.themes.includes(activeFilter));
  }, [activeFilter, scenarios]);

  return (
    <motion.section
      className="section scenario-explorer"
      initial={false}
      transition={{ duration: 0.56, ease }}
      viewport={{ once: true, amount: 0.16 }}
      whileInView={{ opacity: 1, y: 0 }}
      aria-labelledby="scenario-explorer-title"
    >
      <div className="section-header section-header--wide">
        <div>
          <p className="eyebrow">Life Situation Explorer</p>
          <h2 id="scenario-explorer-title">从正在发生的问题进入。</h2>
          <p>把生活阶段、资料准备和顾问问题放在同一个入口里，适合不知道该搜什么词的人。</p>
        </div>
        <Link className="button" href="/scenarios">
          全部场景
        </Link>
      </div>

      <div className="scenario-filter" aria-label="筛选生活场景">
        {filters.map((filter) => (
          <button
            className={`filter-chip${filter === activeFilter ? " filter-chip--active" : ""}`}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="scenario-board" role="list">
        {filteredScenarios.slice(0, 6).map((scenario, index) => (
          <motion.div
            initial={false}
            key={scenario.slug}
            layout
            layoutId={`scenario-${scenario.slug}`}
            transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.06, ease }}
            viewport={{ once: true, amount: 0.18 }}
            whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.012 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
          <Link className="scenario-tile" href={scenario.href} role="listitem">
            <div className="scenario-tile__header">
              <span>{scenario.themes.slice(0, 2).join(" / ")}</span>
              <strong>{scenario.resourceCount} 个资源</strong>
            </div>
            <h3>{scenario.title}</h3>
            <p>{scenario.problem}</p>
            <div className="scenario-tile__meta" aria-label="场景资料">
              <span>{scenario.documentCount} 类资料</span>
              <span>{scenario.questionCount} 个问题</span>
              <span>{scenario.userType}</span>
            </div>
          </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
