"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppIcon } from "@/components/icons/AppIcon";
import { scenarios } from "@/data/scenarios";

const timeOptions = [
  "本周内",
  "未来 2 周内",
  "3 个月内需要做决定",
  "只是先确认资料缺口"
];

const scenarioOptions = scenarios.map((scenario) => ({
  slug: scenario.slug,
  title: scenario.shortTitle,
  label: scenario.stageLabel
}));

export function ConsultationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedScenario = searchParams.get("scenario");
  const [scenarioSlug, setScenarioSlug] = useState(scenarioOptions[0]?.slug ?? "");

  useEffect(() => {
    if (requestedScenario && scenarioOptions.some((option) => option.slug === requestedScenario)) {
      setScenarioSlug(requestedScenario);
    }
  }, [requestedScenario]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      scenario: scenarioSlug,
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      timing: String(formData.get("timing") ?? ""),
      question: String(formData.get("question") ?? ""),
      createdAt: new Date().toISOString()
    };
    window.localStorage.setItem("qm-consultation-draft", JSON.stringify(payload));
    router.push(`/consultation/success?scenario=${scenarioSlug}`);
  }

  return (
    <form className="consultation-form" onSubmit={handleSubmit}>
      <div className="scenario-picker" aria-label="选择咨询场景">
        {scenarioOptions.map((option) => (
          <button
            className={`scenario-option${option.slug === scenarioSlug ? " scenario-option--active" : ""}`}
            key={option.slug}
            onClick={() => setScenarioSlug(option.slug)}
            type="button"
          >
            <span className="card-icon">
              <AppIcon name={iconForScenario(option.slug)} />
            </span>
            <span>
              <strong>{option.title}</strong>
              <em>{option.label}</em>
            </span>
          </button>
        ))}
      </div>

      <div className="form-grid">
        <label className="form-field">
          <span>姓名</span>
          <input autoComplete="name" name="name" placeholder="请输入你的姓名" required />
        </label>
        <label className="form-field">
          <span>电话</span>
          <input autoComplete="tel" name="phone" placeholder="+1 778 929 9942" required type="tel" />
        </label>
        <label className="form-field">
          <span>Email</span>
          <input autoComplete="email" name="email" placeholder="name@example.com" required type="email" />
        </label>
        <label className="form-field">
          <span>时间状态</span>
          <select name="timing" required>
            {timeOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="form-field">
        <span>你最想先确认的问题</span>
        <textarea
          name="question"
          placeholder="例如：我准备买房，想确认首付和收入资料。"
          rows={4}
        />
      </label>

      <div className="consultation-disclaimer">
        <AppIcon name="shieldCheck" />
        <span>不要填写完整 SIN、银行账号、登录密码或信用卡 CVV。</span>
      </div>

      <div className="actions">
        <button className="button button--primary" type="submit">
          <AppIcon name="checkCircle" />
          生成确认页
        </button>
        <a className="button" href="tel:+17789299942">
          <AppIcon name="phone" />
          致电
        </a>
      </div>
    </form>
  );
}

function iconForScenario(slug: string) {
  switch (slug) {
    case "first-home":
      return "home";
    case "new-to-canada":
      return "compass";
    case "kids-education":
      return "graduationCap";
    case "account-differences":
      return "fileText";
    case "mortgage-renewal":
      return "fileText";
    case "young-family-insurance":
      return "shieldCheck";
    case "pre-retirement":
      return "wallet";
    case "business-owner":
      return "briefcase";
    case "high-income-accounts":
      return "wallet";
    default:
      return "clipboard";
  }
}
