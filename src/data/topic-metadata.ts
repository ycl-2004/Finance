export type TopicMetadata = {
  slug: string;
  title: string;
  englishTitle: string;
  description: string;
  audience: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  order: number;
  primaryQuestion: string;
  relatedTerms: string[];
};

export const topicMetadata: TopicMetadata[] = [
  {
    slug: "knowledge-system",
    title: "知识库导览",
    englishTitle: "Knowledge System",
    description: "了解这个学习中心如何组织内容、来源、边界和使用方式。",
    audience: "beginner",
    difficulty: "beginner",
    order: 0,
    primaryQuestion: "这个知识库怎么用？",
    relatedTerms: ["registry", "glossary", "source"]
  },
  {
    slug: "company-profile",
    title: "公司基础资料",
    englishTitle: "Company Profile",
    description: "认识 QM Financials Inc. 的公开定位、服务线和内容边界。",
    audience: "beginner",
    difficulty: "beginner",
    order: 1,
    primaryQuestion: "QM Financials 是谁，公开服务方向是什么？",
    relatedTerms: ["financial advisor", "wealth management"]
  },
  {
    slug: "client-document-source-map",
    title: "资料准备流程",
    englishTitle: "Client Document Source Map",
    description: "客户如何安全取得税务、投资、保险、房贷、退休和企业资料。",
    audience: "beginner",
    difficulty: "beginner",
    order: 2,
    primaryQuestion: "规划前需要准备哪些资料，去哪里拿？",
    relatedTerms: ["NOA", "CRA account", "MSCA", "policy", "mortgage statement"]
  },
  {
    slug: "glossary",
    title: "金融术语",
    englishTitle: "Glossary",
    description: "中英文金融术语快速查找入口。",
    audience: "beginner",
    difficulty: "beginner",
    order: 3,
    primaryQuestion: "这些英文金融词是什么意思？",
    relatedTerms: ["TFSA", "RRSP", "KYC", "MER", "mortgage"]
  },
  {
    slug: "comprehensive-financial-planning",
    title: "综合财务规划",
    englishTitle: "Comprehensive Financial Planning",
    description: "把收入、支出、资产、负债、保险、税务、买房、退休和传承放在同一张图里看。",
    audience: "beginner",
    difficulty: "beginner",
    order: 10,
    primaryQuestion: "财务规划到底规划什么？",
    relatedTerms: ["cashflow", "net worth", "emergency fund", "goals"]
  },
  {
    slug: "canadian-registered-accounts",
    title: "加拿大注册账户",
    englishTitle: "Canadian Registered Accounts",
    description: "理解 TFSA、RRSP、FHSA、RESP、RDSP 的用途、税务特点和资料查询流程。",
    audience: "beginner",
    difficulty: "beginner",
    order: 20,
    primaryQuestion: "不同注册账户有什么区别？",
    relatedTerms: ["TFSA", "RRSP", "FHSA", "RESP", "RDSP", "room"]
  },
  {
    slug: "investment-planning-portfolio-strategy",
    title: "投资规划和组合策略",
    englishTitle: "Investment Planning and Portfolio Strategy",
    description: "从目标、时间、风险、费用和税务位置理解投资组合，而不是追逐短期预测。",
    audience: "beginner",
    difficulty: "beginner",
    order: 30,
    primaryQuestion: "投资前应该先理解什么？",
    relatedTerms: ["asset allocation", "diversification", "risk tolerance", "MER"]
  },
  {
    slug: "insurance-risk-management",
    title: "保险和风险管理",
    englishTitle: "Insurance and Risk Management",
    description: "先识别家庭或企业无法承受的风险，再理解人寿、重疾、伤残、意外和年金。",
    audience: "beginner",
    difficulty: "beginner",
    order: 40,
    primaryQuestion: "保险是解决什么风险？",
    relatedTerms: ["life insurance", "critical illness", "disability insurance", "annuity"]
  },
  {
    slug: "mortgage-lending",
    title: "房贷和贷款方案",
    englishTitle: "Mortgage and Lending",
    description: "理解首次买房、续约、转贷、利率、还款和压力测试。",
    audience: "beginner",
    difficulty: "beginner",
    order: 50,
    primaryQuestion: "买房和房贷前要先准备什么？",
    relatedTerms: ["mortgage", "down payment", "amortization", "stress test"]
  },
  {
    slug: "tax-optimization-asset-protection",
    title: "税务优化和资产保护",
    englishTitle: "Tax Optimization and Asset Protection",
    description: "理解合法税务规划、扣除、抵免、账户安排、资产隔离和法律边界。",
    audience: "beginner",
    difficulty: "beginner",
    order: 60,
    primaryQuestion: "税务规划和资产保护的边界在哪里？",
    relatedTerms: ["deduction", "credit", "marginal tax rate", "asset protection"]
  },
  {
    slug: "retirement-estate-planning",
    title: "退休规划与财富传承",
    englishTitle: "Retirement and Estate Planning",
    description: "理解 CPP、OAS、RRSP/RRIF、年金、遗嘱、授权文件和财富转移。",
    audience: "beginner",
    difficulty: "beginner",
    order: 70,
    primaryQuestion: "退休收入和遗产安排要先看哪些资料？",
    relatedTerms: ["CPP", "OAS", "RRIF", "will", "probate"]
  },
  {
    slug: "small-business-owner-financial-consulting",
    title: "小企业 / 企业主财务咨询",
    englishTitle: "Small Business Owner Financial Consulting",
    description: "理解企业主的个人和公司现金流、税务、保障、退出和传承风险。",
    audience: "beginner",
    difficulty: "beginner",
    order: 80,
    primaryQuestion: "企业主的个人财务和公司财务怎么分清？",
    relatedTerms: ["GST/HST", "payroll", "salary", "dividend", "shareholder agreement"]
  }
];

export function getTopicBySlug(slug: string): TopicMetadata | undefined {
  return topicMetadata.find((topic) => topic.slug === slug);
}

export function getTopicTitle(slug: string): string {
  return getTopicBySlug(slug)?.title ?? slug;
}
