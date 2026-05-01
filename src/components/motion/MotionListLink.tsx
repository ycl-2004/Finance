"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

type MotionListLinkProps = {
  description: string;
  eyebrow?: string;
  href: string;
  index?: number;
  layoutId?: string;
  meta?: string[];
  title: string;
};

export function MotionListLink({
  description,
  eyebrow,
  href,
  index = 0,
  layoutId,
  meta = [],
  title
}: MotionListLinkProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="motion-list-shell"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      layout
      layoutId={layoutId}
      transition={{ duration: 0.54, delay: shouldReduceMotion ? 0 : index * 0.07, ease }}
      viewport={{ once: true, amount: 0.16 }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              scale: 1.012,
              y: -4,
              transition: { duration: 0.28, ease }
            }
      }
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Link className="content-list-item" href={href}>
        <span className="content-list-item__rail" aria-hidden="true" />
        <span className="content-list-item__body">
          {eyebrow && <span className="content-list-item__eyebrow">{eyebrow}</span>}
          <strong>{title}</strong>
          <span>{description}</span>
        </span>
        {meta.length > 0 && (
          <span className="content-list-item__meta" aria-label="条目信息">
            {meta.map((item) => (
              <em key={item}>{item}</em>
            ))}
          </span>
        )}
        <span className="content-list-item__action" aria-hidden="true">
          Open
        </span>
      </Link>
    </motion.div>
  );
}
