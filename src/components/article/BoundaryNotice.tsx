import Link from "next/link";

type BoundaryNoticeProps = {
  compact?: boolean;
};

export function BoundaryNotice({ compact = false }: BoundaryNoticeProps) {
  return (
    <aside className="boundary" aria-label="教育用途边界">
      <strong>教育用途，不是个人建议</strong>
      <span>
        本站内容仅用于加拿大金融教育和资料准备，不构成投资、保险、房贷、税务或法律建议。
        {!compact && "实际决策前请与合资格专业人士确认。"}
      </span>{" "}
      <Link href="/boundaries">查看使用边界</Link>
    </aside>
  );
}
