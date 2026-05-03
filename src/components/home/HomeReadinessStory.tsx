"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { AppIcon, type AppIconName } from "@/components/icons/AppIcon";

const ease = [0.22, 1, 0.36, 1] as const;

const readinessSteps = [
  {
    icon: "compass",
    label: "0%",
    title: "先选真实生活场景",
    summary: "从报税、买房、续约、退休或现金流整理开始，而不是从产品名开始。",
    details: ["确认当前目标", "标出需要专业确认的边界", "建立第一组问题"]
  },
  {
    icon: "clipboard",
    label: "35%",
    title: "把资料变成可检查清单",
    summary: "收入、账户、税单、债务、保险和房贷资料按场景分组。",
    details: ["资料来源更清楚", "敏感信息有边界", "遗漏项目更容易发现"]
  },
  {
    icon: "fileText",
    label: "70%",
    title: "把不懂的地方变成会议问题",
    summary: "不要求用户先懂所有术语，而是把不确定点整理成顾问能回答的问题。",
    details: ["问题更具体", "讨论不被产品节奏带走", "学习内容按需补充"]
  },
  {
    icon: "shieldCheck",
    label: "100%",
    title: "带着结构进入专业确认",
    summary: "页面负责准备，投资、保险、税务、法律和贷款决定由专业人士确认。",
    details: ["不替代持牌建议", "不收集敏感密码", "保留教育边界"]
  }
] satisfies {
  details: string[];
  icon: AppIconName;
  label: string;
  summary: string;
  title: string;
}[];

export function HomeReadinessStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
    target: sectionRef
  });
  const displayY = useTransform(scrollYProgress, [0, 1], [34, -34]);
  const meterScale = useTransform(scrollYProgress, [0.18, 0.82], [0, 1]);

  return (
    <section
      aria-labelledby="readiness-story-title"
      className="section readiness-story"
      ref={sectionRef}
    >
      <div className="readiness-story__sticky">
        <motion.div
          className="readiness-story__display"
          style={{ y: shouldReduceMotion ? 0 : displayY }}
        >
          <p className="eyebrow">Preparation Story</p>
          <h2 id="readiness-story-title">从 0% 到带着问题进会议</h2>
          <p>
            每一步都把零散资料收束成可检查的结构：先确认场景，再整理资料，
            最后把不确定的地方交给合资格专业人士确认。
          </p>
          <div className="readiness-story__meter" aria-hidden="true">
            <span />
            <motion.span style={{ scaleX: shouldReduceMotion ? 1 : meterScale }} />
          </div>
          <div className="readiness-story__annotations" aria-label="准备成果示例">
            <span>资料来源</span>
            <span>顾问问题</span>
            <span>专业边界</span>
          </div>
          <div className="readiness-story__actions">
            <Link className="button button--primary" href="/planning">
              <AppIcon name="route" />
              开始规划
            </Link>
            <Link className="button" href="/documents">
              <AppIcon name="clipboard" />
              查看资料清单
            </Link>
          </div>
        </motion.div>

        <div className="readiness-story__steps" role="list">
          {readinessSteps.map((step, index) => (
            <motion.article
              className="readiness-story__step"
              key={step.title}
              role="listitem"
              transition={{ duration: 0.32, ease }}
              whileHover={shouldReduceMotion ? undefined : { x: 6 }}
            >
              <span className="readiness-story__step-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="readiness-story__step-icon" aria-hidden="true">
                <AppIcon name={step.icon} />
              </span>
              <span className="readiness-story__step-body">
                <em>{step.label}</em>
                <strong>{step.title}</strong>
                <p>{step.summary}</p>
                <ul>
                  {step.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
