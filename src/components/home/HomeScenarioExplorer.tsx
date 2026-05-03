"use client";

import { type PointerEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring
} from "motion/react";
import { AppIcon, type AppIconName } from "@/components/icons/AppIcon";

const ease = [0.22, 1, 0.36, 1] as const;

export type ScenarioExplorerItem = {
  badge: string;
  boundaries: number;
  documents: string[];
  documentTotal: number;
  href: string;
  icon: AppIconName;
  label: string;
  problem: string;
  questions: string[];
  questionTotal: number;
  slug: string;
  summary: string;
  title: string;
};

type HomeScenarioExplorerProps = {
  initialSlug?: string;
  items: ScenarioExplorerItem[];
};

export function HomeScenarioExplorer({ initialSlug, items }: HomeScenarioExplorerProps) {
  const [activeSlug, setActiveSlug] = useState(initialSlug ?? items[0]?.slug ?? "");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 24, stiffness: 180 });
  const springY = useSpring(mouseY, { damping: 24, stiffness: 180 });

  const activeItem = useMemo(
    () => items.find((item) => item.slug === activeSlug) ?? items[0],
    [activeSlug, items]
  );
  const hoveredItem = useMemo(
    () => items.find((item) => item.slug === hoveredSlug) ?? activeItem,
    [activeItem, hoveredSlug, items]
  );

  if (!activeItem) return null;

  const updateCursorPreview = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    mouseX.set(event.pageX - window.scrollX + 22);
    mouseY.set(event.pageY - window.scrollY + 22);
  };

  return (
    <div
      className="scenario-explorer"
      onPointerLeave={() => setHoveredSlug(null)}
      onPointerMove={updateCursorPreview}
    >
      <div className="scenario-explorer__list" role="list">
        {items.map((item, index) => {
          const isActive = item.slug === activeItem.slug;

          return (
            <motion.div
              className="scenario-explorer__item-shell"
              key={item.slug}
              onHoverEnd={() => setHoveredSlug(null)}
              onPointerEnter={(event) => {
                updateCursorPreview(event);
                setActiveSlug(item.slug);
                if (event.pointerType !== "touch") setHoveredSlug(item.slug);
              }}
              role="listitem"
              whileHover={shouldReduceMotion ? undefined : { x: 5 }}
              transition={{ duration: 0.32, ease }}
            >
              {isActive && (
                <motion.div
                  className="scenario-explorer__hover-bg"
                  layoutId="scenario-explorer-hover"
                  transition={{ duration: 0.38, ease }}
                />
              )}
              <Link
                className="scenario-explorer__item"
                href={item.href}
                onFocus={() => setActiveSlug(item.slug)}
              >
                <span className="scenario-explorer__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="scenario-explorer__icon" aria-hidden="true">
                  <AppIcon name={item.icon} />
                </span>
                <span className="scenario-explorer__body">
                  <span>{item.label}</span>
                  <strong>{item.title}</strong>
                  <em>{item.summary}</em>
                </span>
                <span className="scenario-explorer__badge">{item.badge}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.aside
          animate={{ opacity: 1, y: 0 }}
          aria-label="推荐场景预览"
          className="scenario-explorer__preview"
          exit={{ opacity: 0, y: -12 }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          key={activeItem.slug}
          transition={{ duration: shouldReduceMotion ? 0 : 0.38, ease }}
        >
          <div>
            <p className="eyebrow">Selected Preview</p>
            <h3>{activeItem.title}</h3>
            <p>{activeItem.problem}</p>
          </div>

          <div className="scenario-explorer__stats" aria-label="这个场景会生成的准备内容">
            <span>
              <strong>{activeItem.documentTotal}</strong>
              资料类别
            </span>
            <span>
              <strong>{activeItem.questionTotal}</strong>
              顾问问题
            </span>
            <span>
              <strong>{activeItem.boundaries}</strong>
              边界提醒
            </span>
          </div>

          <div className="scenario-explorer__visual" aria-hidden="true">
            <span className="scenario-explorer__paper scenario-explorer__paper--front">
              {activeItem.documents[0] ?? "资料清单"}
            </span>
            <span className="scenario-explorer__paper scenario-explorer__paper--middle">
              {activeItem.questions[0] ?? "顾问问题"}
            </span>
            <span className="scenario-explorer__paper scenario-explorer__paper--back">
              Professional review
            </span>
          </div>

          <div className="scenario-explorer__columns">
            <div>
              <span>会议前先准备</span>
              <ul>
                {activeItem.documents.slice(0, 3).map((document) => (
                  <li key={document}>{document}</li>
                ))}
              </ul>
            </div>
            <div>
              <span>带进会议的问题</span>
              <ul>
                {activeItem.questions.slice(0, 2).map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </div>
          </div>

          <Link className="button button--primary" href={activeItem.href}>
            查看这个流程
          </Link>
        </motion.aside>
      </AnimatePresence>

      <AnimatePresence>
        {hoveredSlug && hoveredItem && !shouldReduceMotion && (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="cursor-scenario-preview"
            exit={{ opacity: 0, scale: 0.96 }}
            initial={{ opacity: 0, scale: 0.94 }}
            style={{ x: springX, y: springY }}
            transition={{ duration: 0.18, ease }}
          >
            <span>{hoveredItem.label}</span>
            <strong>{hoveredItem.title}</strong>
            <em>
              {hoveredItem.documentTotal} 类资料 / {hoveredItem.questionTotal} 个问题
            </em>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
