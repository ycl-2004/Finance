"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppIcon } from "@/components/icons/AppIcon";
import {
  documentChecklists,
  universalSafetyWarnings,
  type DocumentChecklist
} from "@/data/document-checklists";
import { scenarios } from "@/data/scenarios";
import { scenarioRoute } from "@/lib/routes";

const storagePrefix = "qm-document-checklist";

function storageKey(slug: string) {
  return `${storagePrefix}:${slug}`;
}

function readSavedState(slug: string): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(storageKey(slug));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveState(slug: string, value: Record<string, boolean>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(slug), JSON.stringify(value));
}

export function DocumentChecklistApp({
  checklists = documentChecklists
}: {
  checklists?: DocumentChecklist[];
}) {
  const [activeSlug, setActiveSlug] = useState(checklists[0]?.slug ?? "");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const activeChecklist =
    checklists.find((checklist) => checklist.slug === activeSlug) ?? checklists[0];

  useEffect(() => {
    const requestedScenario = new URLSearchParams(window.location.search).get("scenario");
    if (requestedScenario && checklists.some((checklist) => checklist.slug === requestedScenario)) {
      setActiveSlug(requestedScenario);
    }
  }, [checklists]);

  useEffect(() => {
    if (!activeChecklist) return;
    setCheckedItems(readSavedState(activeChecklist.slug));
  }, [activeChecklist]);

  const allItems = useMemo(
    () => activeChecklist?.groups.flatMap((group) => group.items) ?? [],
    [activeChecklist]
  );
  const completedCount = allItems.filter((item) => checkedItems[item.id]).length;
  const percent = allItems.length ? Math.round((completedCount / allItems.length) * 100) : 0;
  const isReadyForConsultation = percent >= 50;
  const isComplete = percent === 100;
  const activeScenario = scenarios.find(
    (scenario) => scenario.slug === activeChecklist?.scenarioSlug
  );

  if (!activeChecklist) return null;

  function toggleItem(id: string) {
    const nextState = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(nextState);
    saveState(activeChecklist.slug, nextState);
  }

  function resetChecklist() {
    const nextState: Record<string, boolean> = {};
    setCheckedItems(nextState);
    saveState(activeChecklist.slug, nextState);
  }

  function selectChecklist(slug: string) {
    setActiveSlug(slug);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("scenario", slug);
    window.history.replaceState({}, "", nextUrl);
  }

  return (
    <section className="document-workspace" aria-labelledby="document-checklist-title">
      <div className="document-workspace__intro">
        <div>
          <p className="eyebrow">Document Preparation</p>
          <h2 id="document-checklist-title">生成准备清单</h2>
          <p>
            勾选只保存在本机，不上传资料。完成后可导出 PDF，或预约准备会确认缺口。
          </p>
        </div>
        <div className="document-score" aria-label="完成进度">
          <strong>{percent}%</strong>
          <span>
            已完成 {completedCount}/{allItems.length} 项
          </span>
        </div>
      </div>

      <div className="document-tabs" aria-label="选择资料清单版本">
        {checklists.map((checklist) => {
          const scenario = scenarios.find((item) => item.slug === checklist.scenarioSlug);
          return (
            <button
              className={`document-tab${checklist.slug === activeChecklist.slug ? " document-tab--active" : ""}`}
              key={checklist.slug}
              onClick={() => selectChecklist(checklist.slug)}
              type="button"
            >
              <span>{scenario?.stageLabel ?? "场景"}</span>
              {scenario?.shortTitle ?? checklist.title}
            </button>
          );
        })}
      </div>

      <div className="document-layout">
        <div className="document-main" id="document-print-area">
          <div className="document-panel document-panel--header">
            <div>
              <span className="tag tag--accent">{activeScenario?.stageLabel ?? "资料准备"}</span>
              <h3>{activeChecklist.title}</h3>
              <p>{activeChecklist.description}</p>
            </div>
            <div className="checklist-toolbar">
              <button className="button button--primary" onClick={() => window.print()} type="button">
                <AppIcon name="fileText" />
                下载 PDF
              </button>
              <button className="button" onClick={resetChecklist} type="button">
                <AppIcon name="checkCircle" />
                重置清单
              </button>
            </div>
          </div>

          <div className="document-progress" aria-hidden="true">
            <span style={{ width: `${percent}%` }} />
          </div>

          {activeChecklist.groups.map((group) => {
            const groupDone = group.items.filter((item) => checkedItems[item.id]).length;
            return (
              <section className="document-panel document-group" key={group.id}>
                <div className="document-group__header">
                  <h3>{group.title}</h3>
                  <span>
                    {groupDone}/{group.items.length}
                  </span>
                </div>
                <div className="document-checks">
                  {group.items.map((item) => {
                    const inputId = `${activeChecklist.slug}-${item.id}`;
                    return (
                      <label className="document-check" htmlFor={inputId} key={item.id}>
                        <input
                          checked={Boolean(checkedItems[item.id])}
                          id={inputId}
                          onChange={() => toggleItem(item.id)}
                          type="checkbox"
                        />
                        <span>
                          <strong>{item.label}</strong>
                          {item.helper && <em>{item.helper}</em>}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <aside className="document-rail" aria-label="资料准备辅助信息">
          <section
            className={`document-panel document-conversion${isReadyForConsultation ? " document-conversion--ready" : ""}`}
          >
            <span className="card-icon">
              <AppIcon name={isComplete ? "checkCircle" : "phone"} />
            </span>
            <p className="eyebrow">{isComplete ? "Ready" : "Next Step"}</p>
            <h3>{isComplete ? "资料准备已完成" : "准备到 50% 后，建议确认缺口"}</h3>
            <p>
              {isReadyForConsultation
                ? "你已经有一份可讨论的准备包。下一步可下载 PDF，或预约确认缺口。"
                : "先完成一半清单。进度会保存在本机，之后可继续补齐。"}
            </p>
            <div className="document-rail__actions">
              <Link
                className="button button--primary button--full"
                href={`/consultation?scenario=${activeChecklist.slug}`}
              >
                <AppIcon name="phone" />
                预约准备会
              </Link>
              <a className="button button--full" href="tel:+17789299942">
                <AppIcon name="phone" />
                直接致电
              </a>
            </div>
          </section>

          <section className="document-panel document-panel--danger">
            <h3>不要发送</h3>
            <ul className="document-warning-list">
              {universalSafetyWarnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </section>

          <section className="document-panel">
            <h3>你应该问顾问什么</h3>
            <ul className="check-list">
              {activeChecklist.advisorQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </section>

          <section className="document-panel">
            <h3>下一步</h3>
            <ol className="document-step-list">
              <li>先完成这份清单。</li>
              <li>把不确定的问题写在旁边。</li>
              <li>带着资料和问题进入顾问会议。</li>
            </ol>
            <div className="document-rail__actions">
              <Link className="button button--primary button--full" href={scenarioRoute(activeChecklist.scenarioSlug)}>
                <AppIcon name="route" />
                查看场景流程
              </Link>
              <Link className="button button--full" href="/learn">
                <AppIcon name="bookOpen" />
                补充学习
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
