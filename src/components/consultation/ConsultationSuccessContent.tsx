"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppIcon } from "@/components/icons/AppIcon";
import { getChecklistByScenarioSlug } from "@/data/document-checklists";
import { getScenarioBySlug } from "@/data/scenarios";
import { scenarioRoute } from "@/lib/routes";

export function ConsultationSuccessContent() {
  const searchParams = useSearchParams();
  const scenarioSlug = searchParams.get("scenario") ?? undefined;
  const scenario = scenarioSlug ? getScenarioBySlug(scenarioSlug) : undefined;
  const checklist = scenarioSlug ? getChecklistByScenarioSlug(scenarioSlug) : undefined;
  const returnHref = checklist
    ? `/documents?scenario=${checklist.scenarioSlug}`
    : scenario
      ? scenarioRoute(scenario.slug)
      : "/documents";

  return (
    <>
      <p className="lead">
        {scenario
          ? `你选择的是「${scenario.shortTitle}」。下一步请致电确认时间，并把准备资料和问题带进会议。`
          : "下一步请致电确认时间，并把准备资料和问题带进会议。"}
      </p>
      <div className="actions">
        <a className="button button--primary" href="tel:+17789299942">
          <AppIcon name="phone" />
          致电确认时间
        </a>
        <Link className="button" href={returnHref}>
          <AppIcon name="fileText" />
          {checklist ? "返回资料清单" : "返回场景流程"}
        </Link>
      </div>
    </>
  );
}
