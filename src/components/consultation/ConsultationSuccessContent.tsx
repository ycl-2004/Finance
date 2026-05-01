"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppIcon } from "@/components/icons/AppIcon";
import { getChecklistByScenarioSlug } from "@/data/document-checklists";

export function ConsultationSuccessContent() {
  const searchParams = useSearchParams();
  const scenario = searchParams.get("scenario") ?? undefined;
  const checklist = scenario ? getChecklistByScenarioSlug(scenario) : undefined;

  return (
    <>
      <p className="lead">
        {checklist
          ? `你选择的是「${checklist.title}」。下一步请致电确认时间，并把准备清单保存成 PDF。`
          : "下一步请致电确认时间，并把准备清单保存成 PDF。"}
      </p>
      <div className="actions">
        <a className="button button--primary" href="tel:+17789299942">
          <AppIcon name="phone" />
          致电确认时间
        </a>
        <Link className="button" href={scenario ? `/documents?scenario=${scenario}` : "/documents"}>
          <AppIcon name="fileText" />
          返回资料清单
        </Link>
      </div>
    </>
  );
}
