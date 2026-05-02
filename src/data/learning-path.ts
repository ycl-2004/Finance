export type LearningStage = {
  id: string;
  order: number;
  title: string;
  goal: string;
  audience: string;
  requiredArticles: string[];
  optionalArticles: string[];
  checkQuestions: string[];
  relatedScenarios: string[];
};

export const learningPath: LearningStage[] = [
  {
    id: "map-and-terms",
    order: 1,
    title: "金融地图和术语",
    goal: "先看懂加拿大金融规划包含哪些模块，以及常见中英文术语是什么意思。",
    audience: "新手、新移民、刚开始整理财务的人",
    requiredArticles: ["README", "glossary", "01-comprehensive-financial-planning/00-overview"],
    optionalArticles: ["00-registry", "company-profile"],
    checkQuestions: [
      "账户和投资产品有什么区别？",
      "为什么财务规划要先看现金流、目标和风险，而不是先问买什么产品？"
    ],
    relatedScenarios: ["new-to-canada", "account-differences"]
  },
  {
    id: "planning-foundation",
    order: 2,
    title: "综合财务规划",
    goal: "建立一张家庭财务快照，看清目标、现金流、资产负债、保障和税务的关系。",
    audience: "想系统整理家庭财务的人",
    requiredArticles: [
      "01-comprehensive-financial-planning/00-overview",
      "01-comprehensive-financial-planning/01-client-data-map",
      "01-comprehensive-financial-planning/02-planning-process",
      "01-comprehensive-financial-planning/03-cashflow-debt-basics"
    ],
    optionalArticles: ["client-document-source-map"],
    checkQuestions: [
      "一页式家庭财务快照应该包含哪些资料？",
      "多个目标冲突时，为什么要先排序而不是同时做所有事？"
    ],
    relatedScenarios: ["new-to-canada", "cashflow-reset", "young-family-insurance"]
  },
  {
    id: "documents-and-process",
    order: 3,
    title: "资料准备和流程",
    goal: "知道资料从哪里找、如何保护敏感信息，以及为什么规划前要先整理资料。",
    audience: "准备见顾问或整理资料的人",
    requiredArticles: ["client-document-source-map"],
    optionalArticles: ["03-canadian-registered-accounts/06-room-check-workflow"],
    checkQuestions: [
      "为什么不应该发送 CRA 或银行密码？",
      "为什么所有余额、账户额度、利率和罚金都要标明日期？"
    ],
    relatedScenarios: ["tax-season-prep", "cashflow-reset", "first-home", "pre-retirement"]
  },
  {
    id: "registered-accounts",
    order: 4,
    title: "注册账户",
    goal: "看懂 TFSA、RRSP、FHSA、RESP、RDSP 的用途、税务特点和额度查询。",
    audience: "想理解加拿大账户体系的人",
    requiredArticles: [
      "03-canadian-registered-accounts/00-overview-comparison",
      "03-canadian-registered-accounts/01-tfsa",
      "03-canadian-registered-accounts/02-rrsp",
      "03-canadian-registered-accounts/03-fhsa"
    ],
    optionalArticles: [
      "03-canadian-registered-accounts/04-resp",
      "03-canadian-registered-accounts/05-rdsp",
      "03-canadian-registered-accounts/06-room-check-workflow"
    ],
    checkQuestions: [
      "为什么 TFSA 不是一种投资产品，而是一个账户外壳？",
      "FHSA 为什么不能等同于 RRSP 或普通储蓄账户？"
    ],
    relatedScenarios: ["account-differences", "first-home", "kids-education"]
  },
  {
    id: "investment",
    order: 5,
    title: "投资规划",
    goal: "先理解目标、期限、风险、费用、税务位置和组合结构，再讨论投资产品。",
    audience: "想开始投资或理解投资组合的人",
    requiredArticles: [
      "02-investment-planning-portfolio-strategy/00-overview",
      "02-investment-planning-portfolio-strategy/01-risk-return-time-horizon",
      "02-investment-planning-portfolio-strategy/02-portfolio-concepts",
      "02-investment-planning-portfolio-strategy/03-fees-taxes-behaviour-risks"
    ],
    optionalArticles: ["06-tax-optimization-asset-protection/01-tax-planning-building-blocks"],
    checkQuestions: [
      "时间周期为什么会影响投资选择？",
      "费用、税务和行为风险为什么会影响长期结果？"
    ],
    relatedScenarios: ["account-differences", "high-income-accounts"]
  },
  {
    id: "insurance",
    order: 6,
    title: "保险和风险",
    goal: "先识别不可承受的风险，再理解不同保险类型的功能和限制。",
    audience: "年轻家庭、有房贷、有依赖者或企业主",
    requiredArticles: [
      "04-insurance-risk-management/00-overview",
      "04-insurance-risk-management/01-life-insurance",
      "04-insurance-risk-management/02-critical-illness-disability-accident",
      "04-insurance-risk-management/04-needs-analysis-risk-points"
    ],
    optionalArticles: ["04-insurance-risk-management/03-annuities"],
    checkQuestions: [
      "保险为什么不是越多越好？",
      "人寿、重疾、伤残分别解决什么风险？"
    ],
    relatedScenarios: ["young-family-insurance", "business-owner"]
  },
  {
    id: "mortgage",
    order: 7,
    title: "房贷和买房",
    goal: "理解首次买房、续约、转贷、利率、还款和压力测试。",
    audience: "首次买房者、准备续约或转贷的人",
    requiredArticles: [
      "05-mortgage-lending/00-overview",
      "05-mortgage-lending/01-first-home-buyer",
      "05-mortgage-lending/02-refinance-renewal-switching",
      "05-mortgage-lending/03-rates-payments-stress-test"
    ],
    optionalArticles: ["03-canadian-registered-accounts/03-fhsa"],
    checkQuestions: [
      "为什么买房不能只看月供？",
      "renewal、refinance、switch 有什么不同？"
    ],
    relatedScenarios: ["first-home", "mortgage-renewal"]
  },
  {
    id: "tax-and-protection",
    order: 8,
    title: "税务和资产保护",
    goal: "理解税务规划、资产保护结构和需要专业确认的边界。",
    audience: "收入结构较复杂、有投资或企业的人",
    requiredArticles: [
      "06-tax-optimization-asset-protection/00-overview",
      "06-tax-optimization-asset-protection/01-tax-planning-building-blocks",
      "06-tax-optimization-asset-protection/02-asset-protection-legal-structure",
      "06-tax-optimization-asset-protection/03-risk-points",
      "06-tax-optimization-asset-protection/04-tax-season-prep"
    ],
    optionalArticles: ["08-small-business-owner-financial-consulting/01-business-tax-cashflow"],
    checkQuestions: [
      "deduction 和 credit 有什么区别？",
      "资产保护为什么不能只靠某一种账户或保险？"
    ],
    relatedScenarios: ["tax-season-prep", "high-income-accounts", "business-owner"]
  },
  {
    id: "retirement-estate",
    order: 9,
    title: "退休和传承",
    goal: "理解公共养老金、注册账户提款、年金、遗嘱、授权和传承资料。",
    audience: "临近退休、照顾父母、开始考虑遗产安排的人",
    requiredArticles: [
      "07-retirement-estate-planning/00-overview",
      "07-retirement-estate-planning/01-retirement-income-sources",
      "07-retirement-estate-planning/02-rrif-annuity-withdrawal",
      "07-retirement-estate-planning/03-estate-wealth-transfer-bc"
    ],
    optionalArticles: ["04-insurance-risk-management/03-annuities"],
    checkQuestions: [
      "CPP、OAS、RRIF 和 TFSA 在退休现金流中分别扮演什么角色？",
      "遗嘱、POA 和受益人指定为什么需要一起检查？"
    ],
    relatedScenarios: ["pre-retirement"]
  },
  {
    id: "business-owner",
    order: 10,
    title: "企业主财务",
    goal: "区分个人和公司财务，理解现金流、税务、保障、退出和传承风险。",
    audience: "自雇人士、小企业主、公司股东",
    requiredArticles: [
      "08-small-business-owner-financial-consulting/00-overview",
      "08-small-business-owner-financial-consulting/01-business-tax-cashflow",
      "08-small-business-owner-financial-consulting/02-owner-compensation-benefits-protection",
      "08-small-business-owner-financial-consulting/03-succession-exit-risk"
    ],
    optionalArticles: ["06-tax-optimization-asset-protection/02-asset-protection-legal-structure"],
    checkQuestions: [
      "为什么企业主不能把公司现金流和个人现金流混在一起看？",
      "企业退出和传承风险为什么需要提前讨论？"
    ],
    relatedScenarios: ["business-owner"]
  }
];
