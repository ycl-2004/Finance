export type Scenario = {
  slug: string;
  title: string;
  userType: string;
  problem: string;
  whatToLearnFirst: string[];
  documentsToPrepare: string[];
  advisorQuestions: string[];
  relatedArticles: string[];
  boundaries: string[];
};

export const scenarios: Scenario[] = [
  {
    slug: "new-to-canada",
    title: "我刚来加拿大，应该先了解什么金融基础？",
    userType: "新移民、留学生转工签、刚开始建立加拿大财务系统的人",
    problem: "不知道加拿大金融规划有哪些模块，也不知道 TFSA、RRSP、信用、保险和税务之间的关系。",
    whatToLearnFirst: ["金融术语", "综合财务规划", "现金流和应急金", "信用和债务", "注册账户基础"],
    documentsToPrepare: ["SIN 和税务居民身份信息", "银行账户和信用卡资料", "最近收入资料", "CRA account 访问准备"],
    advisorQuestions: [
      "我目前最应该先整理哪几类资料？",
      "哪些账户需要等有税务居民身份或报税记录后再确认？",
      "我的短期现金流和长期目标应该如何排序？"
    ],
    relatedArticles: ["README", "glossary", "01-comprehensive-financial-planning/00-overview"],
    boundaries: ["不判断移民身份、税务居民身份或具体账户适合性。"]
  },
  {
    slug: "first-home",
    title: "我想买第一套房，应该先准备什么？",
    userType: "首次买房者、新移民家庭、正在比较首付和房贷的人",
    problem: "只知道想买房，但还没把首付账户、现金流、压力测试、保险和税务资料放在一起看。",
    whatToLearnFirst: ["首付和现金流", "FHSA", "RRSP HBP", "房贷压力测试", "保险和风险"],
    documentsToPrepare: ["收入证明", "银行 statements", "CRA room", "信用和债务资料", "预批或房贷资料"],
    advisorQuestions: [
      "我是否符合 FHSA 的基本条件？",
      "首付资金现在在哪些账户？",
      "房贷利率变化会如何影响现金流？"
    ],
    relatedArticles: [
      "05-mortgage-lending/01-first-home-buyer",
      "03-canadian-registered-accounts/03-fhsa",
      "05-mortgage-lending/03-rates-payments-stress-test",
      "04-insurance-risk-management/00-overview"
    ],
    boundaries: ["不判断可以买多少钱、借多少钱、选哪家 lender 或具体房产。"]
  },
  {
    slug: "account-differences",
    title: "TFSA、RRSP、FHSA 到底有什么不同？",
    userType: "准备开始储蓄、投资或买房的人",
    problem: "知道这些账户名字，但不清楚账户用途、税务特点和 room 查询方式。",
    whatToLearnFirst: ["账户和投资产品的区别", "TFSA", "RRSP", "FHSA", "room 查询"],
    documentsToPrepare: ["CRA account", "NOA/NOR", "金融机构账户 statements", "当年供款和提款记录"],
    advisorQuestions: [
      "我的 contribution room 是否以 CRA 最新数据为准？",
      "我的资金使用时间会如何影响账户选择？",
      "哪些交易还没有反映在 CRA account？"
    ],
    relatedArticles: [
      "03-canadian-registered-accounts/00-overview-comparison",
      "03-canadian-registered-accounts/01-tfsa",
      "03-canadian-registered-accounts/02-rrsp",
      "03-canadian-registered-accounts/03-fhsa"
    ],
    boundaries: ["不直接判断某个人应该优先用哪个账户。"]
  },
  {
    slug: "kids-education",
    title: "我有孩子，RESP 要怎么理解？",
    userType: "有孩子或计划教育储蓄的家庭",
    problem: "听说 RESP 有政府补助，但不清楚 beneficiary、subscriber、CESG 和孩子不上学时的处理。",
    whatToLearnFirst: ["RESP 基础", "政府教育补助", "教育目标时间", "家庭现金流"],
    documentsToPrepare: ["孩子 SIN", "RESP statements", "subscriber 记录", "已有教育储蓄资料"],
    advisorQuestions: [
      "多个 subscriber 是否需要合并计算？",
      "孩子年龄是否影响补助条件？",
      "如果未来不上学，有哪些一般处理方向需要了解？"
    ],
    relatedArticles: [
      "03-canadian-registered-accounts/04-resp",
      "03-canadian-registered-accounts/00-overview-comparison",
      "01-comprehensive-financial-planning/00-overview"
    ],
    boundaries: ["不承诺政府补助资格或教育投资结果。"]
  },
  {
    slug: "mortgage-renewal",
    title: "我的房贷快续约了，要注意什么？",
    userType: "房贷 term 即将到期、正在考虑 refinance 或 switch 的房主",
    problem: "只看续约利率，忽略现金流、penalty、摊还期、提前还款权利和压力测试。",
    whatToLearnFirst: ["renewal", "refinance", "switch", "固定和浮动利率", "提前还款和 penalty"],
    documentsToPrepare: ["mortgage statement", "renewal notice", "payout statement", "收入和债务资料", "property tax / strata 信息"],
    advisorQuestions: [
      "renewal、switch、refinance 对我的现金流有什么不同影响？",
      "当前合同是否有 penalty 或提前还款限制？",
      "如果利率变化，我的月供和长期成本会怎样变化？"
    ],
    relatedArticles: [
      "05-mortgage-lending/02-refinance-renewal-switching",
      "05-mortgage-lending/03-rates-payments-stress-test",
      "client-document-source-map"
    ],
    boundaries: ["不提供具体 lender、利率锁定或贷款结构建议。"]
  },
  {
    slug: "young-family-insurance",
    title: "我想了解保险，不知道从哪里开始。",
    userType: "年轻家庭、有房贷、有孩子、有收入依赖者的人",
    problem: "不知道人寿、重疾、伤残和雇主福利分别解决什么风险。",
    whatToLearnFirst: ["风险缺口", "人寿保险", "重疾险", "伤残险", "雇主福利"],
    documentsToPrepare: ["现有 policy", "雇主福利 booklet", "房贷和债务资料", "家庭支出和收入资料"],
    advisorQuestions: [
      "如果主要收入中断，家庭现金流缺口在哪里？",
      "现有雇主福利能覆盖哪些风险，不能覆盖哪些？",
      "受益人和 owner 安排是否需要更新？"
    ],
    relatedArticles: [
      "04-insurance-risk-management/00-overview",
      "04-insurance-risk-management/01-life-insurance",
      "04-insurance-risk-management/02-critical-illness-disability-accident",
      "04-insurance-risk-management/04-needs-analysis-risk-points"
    ],
    boundaries: ["不判断具体保额、保费、产品或承保结果。"]
  },
  {
    slug: "pre-retirement",
    title: "我快退休了，要先看哪些资料？",
    userType: "临近退休、开始规划提款、养老金和遗产文件的人",
    problem: "不确定 CPP/OAS、RRSP/RRIF、TFSA、年金、税务和遗嘱文件如何一起看。",
    whatToLearnFirst: ["CPP/OAS", "RRSP/RRIF", "年金", "退休现金流", "遗嘱和授权文件"],
    documentsToPrepare: ["CPP Statement of Contributions", "OAS 居住资料", "RRSP/RRIF/TFSA statements", "pension statement", "will/POA 文件"],
    advisorQuestions: [
      "退休收入来源有哪些，税后现金流如何估算？",
      "RRSP 转 RRIF 前需要了解哪些规则？",
      "受益人、遗嘱和授权文件是否一致？"
    ],
    relatedArticles: [
      "07-retirement-estate-planning/00-overview",
      "07-retirement-estate-planning/01-retirement-income-sources",
      "07-retirement-estate-planning/02-rrif-annuity-withdrawal",
      "07-retirement-estate-planning/03-estate-wealth-transfer-bc"
    ],
    boundaries: ["不提供具体提款顺序、养老金领取时间或法律文件建议。"]
  },
  {
    slug: "business-owner",
    title: "我是小企业主，个人和公司财务要分清什么？",
    userType: "自雇人士、公司 owner、合伙人、小企业主",
    problem: "个人现金流、公司现金流、税务、保险、担保和退出安排容易混在一起。",
    whatToLearnFirst: ["企业现金流", "owner compensation", "GST/HST 和 payroll", "企业保险", "succession"],
    documentsToPrepare: ["T2 / financial statements", "GST/HST 和 payroll 资料", "business bank statements", "shareholder agreement", "商业保险资料"],
    advisorQuestions: [
      "个人和公司现金流有没有混用？",
      "salary 和 dividend 的一般税务差异需要向会计师确认什么？",
      "如果 owner 失能、死亡或退出，公司如何继续运作？"
    ],
    relatedArticles: [
      "08-small-business-owner-financial-consulting/00-overview",
      "08-small-business-owner-financial-consulting/01-business-tax-cashflow",
      "08-small-business-owner-financial-consulting/02-owner-compensation-benefits-protection",
      "08-small-business-owner-financial-consulting/03-succession-exit-risk"
    ],
    boundaries: ["不替代会计师、律师或商业保险专业人士的具体建议。"]
  },
  {
    slug: "high-income-accounts",
    title: "收入提高后，账户和税务顺序要怎么学习？",
    userType: "收入上升、开始比较 RRSP、TFSA、非注册账户和税务规划的人",
    problem: "容易只看当年省税，忽略流动性、未来提款税、投资风险和费用。",
    whatToLearnFirst: ["边际税率", "RRSP", "TFSA", "非注册投资税务", "投资费用"],
    documentsToPrepare: ["NOA/NOR", "RRSP deduction limit", "TFSA room", "投资 statements", "预计收入变化"],
    advisorQuestions: [
      "现在税率和未来税率可能有什么差异？",
      "账户选择如何影响流动性和提款税？",
      "投资费用和资产位置如何影响税后结果？"
    ],
    relatedArticles: [
      "03-canadian-registered-accounts/01-tfsa",
      "03-canadian-registered-accounts/02-rrsp",
      "02-investment-planning-portfolio-strategy/03-fees-taxes-behaviour-risks",
      "06-tax-optimization-asset-protection/01-tax-planning-building-blocks"
    ],
    boundaries: ["不判断个人应该供款多少或选择哪个投资产品。"]
  }
];

export function getScenarioBySlug(slug: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.slug === slug);
}
