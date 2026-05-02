"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppIcon } from "@/components/icons/AppIcon";
import { getChecklistByScenarioSlug } from "@/data/document-checklists";
import { getScenarioBySlug } from "@/data/scenarios";
import { scenarioRoute } from "@/lib/routes";

type ConsultationDraft = {
  scenario: string;
  name: string;
  email: string;
  phone: string;
  timing: string;
  question: string;
  createdAt: string;
};

export function ConsultationSuccessContent() {
  const searchParams = useSearchParams();
  const scenarioSlug = searchParams.get("scenario") ?? undefined;
  const [draft, setDraft] = useState<ConsultationDraft | null>(null);
  const scenario = draft?.scenario
    ? getScenarioBySlug(draft.scenario)
    : scenarioSlug
      ? getScenarioBySlug(scenarioSlug)
      : undefined;
  const checklist = scenarioSlug ? getChecklistByScenarioSlug(scenarioSlug) : undefined;
  const returnHref = checklist
    ? `/documents?scenario=${checklist.scenarioSlug}`
    : scenario
      ? scenarioRoute(scenario.slug)
      : "/documents";
  const mailtoHref = useMemo(() => {
    const subject = `预约准备会 - ${scenario?.shortTitle ?? "资料准备"}`;
    const bodyLines = [
      "你好，我想确认一次准备会时间。",
      "",
      `场景：${scenario?.shortTitle ?? draft?.scenario ?? "未选择"}`,
      `姓名：${draft?.name ?? ""}`,
      `电话：${draft?.phone ?? ""}`,
      `Email：${draft?.email ?? ""}`,
      `时间状态：${draft?.timing ?? ""}`,
      `最想先确认的问题：${draft?.question ?? ""}`,
      "",
      "安全说明：我不会在邮件中附上完整 SIN、银行账号、登录密码或信用卡 CVV。"
    ];

    return `mailto:info@qm-financials.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join("\n")
    )}`;
  }, [draft, scenario]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("qm-consultation-draft");
      if (raw) setDraft(JSON.parse(raw));
    } catch {
      setDraft(null);
    }
  }, []);

  return (
    <>
      <p className="lead">
        {scenario
          ? `你选择的是「${scenario.shortTitle}」。预约摘要已保存在本机；下一步请致电确认时间，或发送邮件草稿。`
          : "预约摘要已保存在本机；下一步请致电确认时间，或发送邮件草稿。"}
      </p>
      <div className="actions">
        <a className="button button--primary" href="tel:+17789299942">
          <AppIcon name="phone" />
          致电确认时间
        </a>
        <a className="button" href={mailtoHref}>
          <AppIcon name="fileText" />
          发送邮件草稿
        </a>
        <Link className="button" href={returnHref}>
          <AppIcon name="fileText" />
          {checklist ? "返回资料清单" : "返回场景流程"}
        </Link>
      </div>
    </>
  );
}
