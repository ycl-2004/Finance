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
    description: "看看这个学习中心怎么用、内容从哪里来、边界在哪里。",
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
    description: "了解 QM Financials 的公开服务方向和内容边界。",
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
    description: "整理常见资料从哪里找，以及敏感信息怎么保护。",
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
    description: "快速查中英文金融词和常见缩写。",
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
    description: "把收入、支出、资产、负债、保险和税务放到一张图里看。",
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
    description: "看懂 TFSA、RRSP、FHSA 等账户的用途、税务特点和 room 查询。",
    audience: "beginner",
    difficulty: "beginner",
    order: 20,
    primaryQuestion: "不同注册账户有什么区别？",
    relatedTerms: ["TFSA", "RRSP", "FHSA", "RESP", "RDSP", "room"]
  },
  {
    slug: "investment-planning-portfolio-strategy",
    title: "投资规划",
    englishTitle: "Investment Planning and Portfolio Strategy",
    description: "先看目标、时间、风险、费用和税务位置，再谈投资产品。",
    audience: "beginner",
    difficulty: "beginner",
    order: 30,
    primaryQuestion: "投资前应该先理解什么？",
    relatedTerms: ["asset allocation", "diversification", "risk tolerance", "MER"]
  },
  {
    slug: "insurance-risk-management",
    title: "保险和风险",
    englishTitle: "Insurance and Risk Management",
    description: "先找出家庭或企业承受不了的风险，再看保险能解决什么。",
    audience: "beginner",
    difficulty: "beginner",
    order: 40,
    primaryQuestion: "保险是解决什么风险？",
    relatedTerms: ["life insurance", "critical illness", "disability insurance", "annuity"]
  },
  {
    slug: "mortgage-lending",
    title: "房贷和买房",
    englishTitle: "Mortgage and Lending",
    description: "看懂首次买房、续约、转贷、利率、还款和压力测试。",
    audience: "beginner",
    difficulty: "beginner",
    order: 50,
    primaryQuestion: "买房和房贷前要先准备什么？",
    relatedTerms: ["mortgage", "down payment", "amortization", "stress test"]
  },
  {
    slug: "tax-optimization-asset-protection",
    title: "税务和资产保护",
    englishTitle: "Tax Optimization and Asset Protection",
    description: "理解税务规划、账户安排、资产保护和需要专业确认的边界。",
    audience: "beginner",
    difficulty: "beginner",
    order: 60,
    primaryQuestion: "税务规划和资产保护的边界在哪里？",
    relatedTerms: ["deduction", "credit", "marginal tax rate", "asset protection"]
  },
  {
    slug: "retirement-estate-planning",
    title: "退休和传承",
    englishTitle: "Retirement and Estate Planning",
    description: "看懂 CPP、OAS、RRSP/RRIF、遗嘱、授权和财富转移。",
    audience: "beginner",
    difficulty: "beginner",
    order: 70,
    primaryQuestion: "退休收入和遗产安排要先看哪些资料？",
    relatedTerms: ["CPP", "OAS", "RRIF", "will", "probate"]
  },
  {
    slug: "small-business-owner-financial-consulting",
    title: "企业主财务",
    englishTitle: "Small Business Owner Financial Consulting",
    description: "把个人和公司现金流、税务、保障、退出和传承风险分清楚。",
    audience: "beginner",
    difficulty: "beginner",
    order: 80,
    primaryQuestion: "个人和公司财务怎么分清？",
    relatedTerms: ["GST/HST", "payroll", "salary", "dividend", "shareholder agreement"]
  }
];

export function getTopicBySlug(slug: string): TopicMetadata | undefined {
  return topicMetadata.find((topic) => topic.slug === slug);
}

export function getTopicTitle(slug: string): string {
  return getTopicBySlug(slug)?.title ?? slug;
}
