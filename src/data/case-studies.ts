export type CaseStudy = {
  slug: string;
  title: string;
  level: "beginner" | "intermediate";
  estimatedMinutes: number;
  background: string;
  knownFacts: string[];
  missingFacts: string[];
  tasks: string[];
  thinkingPath: string[];
  relatedArticles: string[];
  notAdviceBoundary: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "newcomer-family-map",
    title: "新移民家庭建立财务规划地图",
    level: "beginner",
    estimatedMinutes: 15,
    background: "一家三口刚到加拿大，有工资收入、租房支出、少量存款，还没系统理解税务、账户和保险。",
    knownFacts: ["有稳定收入", "有孩子", "正在建立信用记录", "还没有明确买房时间"],
    missingFacts: ["CRA 账户是否已开通", "现金流结余", "现有保险和雇主福利", "短中长期目标"],
    tasks: ["画出家庭财务快照", "列出优先资料清单", "区分短期和长期目标"],
    thinkingPath: ["先确认现金流", "再看高息债和应急金", "之后理解注册账户和风险保障"],
    relatedArticles: ["01-comprehensive-financial-planning/00-overview", "client-document-source-map", "glossary"],
    notAdviceBoundary: "本案例只训练资料整理和学习顺序，不判断具体账户或产品。"
  },
  {
    slug: "first-home-prep",
    title: "首次买房者整理账户、现金流和房贷资料",
    level: "beginner",
    estimatedMinutes: 18,
    background: "一对夫妻准备 12-18 个月内买房，听说 FHSA 和 RRSP HBP 可以用，但不知道先查什么。",
    knownFacts: ["有首付储蓄", "有 RRSP 和 TFSA", "有稳定就业收入", "准备找 mortgage pre-approval"],
    missingFacts: ["FHSA 开户资格", "各账户可用额度", "信用报告", "月度现金流和债务付款"],
    tasks: ["列出买房前资料清单", "区分账户规则和房贷规则", "写出要问顾问的问题"],
    thinkingPath: ["先查 CRA 可用额度", "再看现金流和债务", "最后理解压力测试和保险风险"],
    relatedArticles: [
      "05-mortgage-lending/01-first-home-buyer",
      "03-canadian-registered-accounts/03-fhsa",
      "05-mortgage-lending/03-rates-payments-stress-test"
    ],
    notAdviceBoundary: "本案例不判断买房预算、贷款额度、利率选择或账户提款方案。"
  },
  {
    slug: "young-family-protection-gap",
    title: "年轻家庭保险需求和风险缺口",
    level: "beginner",
    estimatedMinutes: 16,
    background: "年轻家庭有房贷和孩子，主要收入来自一方工资，有雇主福利但没看过细节。",
    knownFacts: ["有房贷", "有孩子", "有雇主福利", "有每月固定支出"],
    missingFacts: ["福利手册", "现有保单", "紧急备用金", "收入中断时现金流缺口"],
    tasks: ["识别风险缺口", "整理保险资料", "区分人寿、重疾、伤残功能"],
    thinkingPath: ["先问风险会造成什么现金流缺口", "再看已有保障", "最后列出需要专业确认的问题"],
    relatedArticles: [
      "04-insurance-risk-management/00-overview",
      "04-insurance-risk-management/01-life-insurance",
      "04-insurance-risk-management/04-needs-analysis-risk-points"
    ],
    notAdviceBoundary: "本案例不计算具体保额，不推荐保险产品。"
  },
  {
    slug: "high-income-account-order",
    title: "高收入家庭学习 TFSA / RRSP / 非注册账户差异",
    level: "intermediate",
    estimatedMinutes: 18,
    background: "家庭收入提高后想做税务优化，同时开始投资非注册账户。",
    knownFacts: ["边际税率较高", "有 TFSA 和 RRSP 可用额度", "有非注册投资", "未来可能买房或创业"],
    missingFacts: ["未来收入变化", "资金使用时间", "非注册账户 ACB", "费用和风险承受能力"],
    tasks: ["比较账户税务特点", "列出流动性问题", "整理要问税务和投资专业人士的问题"],
    thinkingPath: ["先分清账户外壳和投资产品", "再看当下税率和未来提款", "最后看费用和投资风险"],
    relatedArticles: [
      "03-canadian-registered-accounts/00-overview-comparison",
      "03-canadian-registered-accounts/02-rrsp",
      "02-investment-planning-portfolio-strategy/03-fees-taxes-behaviour-risks"
    ],
    notAdviceBoundary: "本案例不判断供款金额、投资产品或税务申报结论。"
  },
  {
    slug: "pre-retirement-income-map",
    title: "临近退休客户整理 CPP / OAS / RRSP / RRIF",
    level: "intermediate",
    estimatedMinutes: 20,
    background: "客户距离退休约 5 年，想知道公共养老金、注册账户提款和遗产文件如何一起整理。",
    knownFacts: ["有 RRSP 和 TFSA", "可能有雇主养老金", "有房产", "有遗嘱但多年未更新"],
    missingFacts: ["CPP 供款记录", "OAS 居住年限", "RRSP/RRIF 余额", "受益人指定", "税后支出目标"],
    tasks: ["列出退休资料清单", "识别收入来源", "写出需要专业确认的问题"],
    thinkingPath: ["先列收入来源", "再看提款规则和税务", "最后检查遗嘱、授权和受益人"],
    relatedArticles: [
      "07-retirement-estate-planning/00-overview",
      "07-retirement-estate-planning/01-retirement-income-sources",
      "07-retirement-estate-planning/03-estate-wealth-transfer-bc"
    ],
    notAdviceBoundary: "本案例不决定 CPP/OAS 领取时间或提款顺序。"
  },
  {
    slug: "business-owner-boundaries",
    title: "小企业主区分个人、公司、税务和风险",
    level: "intermediate",
    estimatedMinutes: 20,
    background: "企业主收入来自公司，个人支出和公司支出混杂，缺少退出和风险安排。",
    knownFacts: ["公司有收入", "企业主从公司取钱", "有商业贷款或担保", "没有清晰传承或退出安排"],
    missingFacts: ["T2 和财务报表", "GST/HST 和薪资记录状态", "股东协议", "商业保险", "个人现金流"],
    tasks: ["区分个人和公司资料", "列出税务和法律确认点", "识别企业主风险"],
    thinkingPath: ["先分开现金流", "再看税务和合规", "最后讨论失能、死亡、退出和传承风险"],
    relatedArticles: [
      "08-small-business-owner-financial-consulting/00-overview",
      "08-small-business-owner-financial-consulting/01-business-tax-cashflow",
      "08-small-business-owner-financial-consulting/03-succession-exit-risk"
    ],
    notAdviceBoundary: "本案例不替代会计、法律或商业保险建议。"
  }
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
