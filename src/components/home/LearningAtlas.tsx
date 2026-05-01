"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export type LearningAtlasStage = {
  id: string;
  order: number;
  title: string;
  goal: string;
  audience: string;
  href: string;
  primaryArticleTitle: string;
  primaryArticleHref: string;
  articleCount: number;
  scenarioCount: number;
  checkQuestion: string;
  relatedScenarios: string[];
};

export function LearningAtlas({ stages }: { stages: LearningAtlasStage[] }) {
  const [activeId, setActiveId] = useState(stages[0]?.id ?? "");
  const shouldReduceMotion = useReducedMotion();
  const activeStage = useMemo(
    () => stages.find((stage) => stage.id === activeId) ?? stages[0],
    [activeId, stages]
  );

  if (!activeStage) return null;

  return (
    <motion.section
      className="section learning-atlas"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
      transition={{ duration: 0.56, ease }}
      viewport={{ once: true, amount: 0.16 }}
      whileInView={{ opacity: 1, y: 0 }}
      aria-labelledby="learning-atlas-title"
    >
      <div className="section-header section-header--wide">
        <div>
          <p className="eyebrow">Learning Atlas</p>
          <h2 id="learning-atlas-title">先建立地图，再进入文章。</h2>
          <p>
            每个阶段都对应目标、必读内容、检查问题和真实生活场景，让学习顺序更清楚。
          </p>
        </div>
        <Link className="button" href="/learn">
          查看完整路线
        </Link>
      </div>

      <div className="learning-atlas__grid">
        <motion.ol className="atlas-list" aria-label="学习阶段">
          {stages.map((stage, index) => (
            <motion.li
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              key={stage.id}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.06, ease }}
              viewport={{ once: true, amount: 0.2 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Link
                className={`atlas-row${stage.id === activeStage.id ? " atlas-row--active" : ""}`}
                href={stage.href}
                onFocus={() => setActiveId(stage.id)}
                onMouseEnter={() => setActiveId(stage.id)}
              >
                <span className="atlas-row__index">{String(stage.order).padStart(2, "0")}</span>
                <span className="atlas-row__body">
                  <strong>{stage.title}</strong>
                  <span>{stage.goal}</span>
                </span>
                <span className="atlas-row__meta">{stage.articleCount} 篇</span>
              </Link>
            </motion.li>
          ))}
        </motion.ol>

        <aside className="atlas-preview" aria-live="polite">
          <div className="atlas-preview__top">
            <span className="tag tag--accent">Stage {activeStage.order}</span>
            <span className="tag">{activeStage.audience}</span>
          </div>
          <h3>{activeStage.title}</h3>
          <p>{activeStage.goal}</p>

          <div className="atlas-preview__metric-grid" aria-label="阶段概览">
            <span>
              <strong>{activeStage.articleCount}</strong>
              <em>文章</em>
            </span>
            <span>
              <strong>{activeStage.scenarioCount}</strong>
              <em>场景</em>
            </span>
          </div>

          <div className="atlas-preview__note">
            <span>检查问题</span>
            <p>{activeStage.checkQuestion}</p>
          </div>

          <div className="atlas-preview__links">
            <Link href={activeStage.primaryArticleHref}>先读：{activeStage.primaryArticleTitle}</Link>
            <span>{activeStage.relatedScenarios.join(" · ")}</span>
          </div>
        </aside>
      </div>
    </motion.section>
  );
}
