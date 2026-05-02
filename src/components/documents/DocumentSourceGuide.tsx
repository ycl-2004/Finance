"use client";

import { useEffect, useMemo, useState } from "react";
import { AppIcon } from "@/components/icons/AppIcon";
import {
  documentSourceScenarioMap,
  documentSourceSections,
  type DocumentSourceSection
} from "@/data/document-source-guide";

function getRequestedSourceId(sections: DocumentSourceSection[]) {
  if (typeof window === "undefined") return sections[0]?.id ?? "";

  const params = new URLSearchParams(window.location.search);
  const requestedSource = params.get("source");
  if (requestedSource && sections.some((section) => section.id === requestedSource)) {
    return requestedSource;
  }

  const requestedScenario = params.get("scenario");
  const mappedSource = requestedScenario ? documentSourceScenarioMap[requestedScenario] : undefined;
  if (mappedSource && sections.some((section) => section.id === mappedSource)) {
    return mappedSource;
  }

  return sections[0]?.id ?? "";
}

export function DocumentSourceGuide({
  sections = documentSourceSections
}: {
  sections?: DocumentSourceSection[];
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const activeSection = useMemo(
    () => sections.find((section) => section.id === activeId) ?? sections[0],
    [activeId, sections]
  );

  useEffect(() => {
    setActiveId(getRequestedSourceId(sections));
  }, [sections]);

  if (!activeSection) return null;

  function selectSection(id: string) {
    setActiveId(id);
    if (typeof window === "undefined") return;
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("source", id);
    window.history.replaceState({}, "", nextUrl);
  }

  return (
    <section className="document-source-guide" aria-labelledby="document-source-guide-title">
      <div className="source-guide">
        <div className="source-guide__picker" aria-label="选择资料类型">
          {sections.map((section) => (
            <button
              aria-pressed={section.id === activeSection.id}
              className={`source-guide__option${section.id === activeSection.id ? " source-guide__option--active" : ""}`}
              key={section.id}
              onClick={() => selectSection(section.id)}
              type="button"
            >
              <span className="card-icon">
                <AppIcon name={section.icon} />
              </span>
              <span>
                <strong>{section.title}</strong>
                <em>{section.bestFor}</em>
              </span>
            </button>
          ))}
        </div>

        <article className="source-guide__detail">
          <div className="source-guide__detail-header">
            <span className="tag tag--accent">{activeSection.eyebrow}</span>
            <h3>{activeSection.title}</h3>
            <p>{activeSection.summary}</p>
          </div>

          <div className="source-guide__columns">
            <section>
              <h4>去哪里找</h4>
              <ul className="check-list">
                {activeSection.sources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            </section>
            <section>
              <h4>通常需要准备</h4>
              <ul className="check-list">
                {activeSection.documents.map((document) => (
                  <li key={document}>{document}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="source-guide__steps">
            <h4>怎么准备</h4>
            <ol className="document-step-list">
              {activeSection.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="source-guide__cautions">
            <h4>先注意</h4>
            <ul>
              {activeSection.cautions.map((caution) => (
                <li key={caution}>{caution}</li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </section>
  );
}
