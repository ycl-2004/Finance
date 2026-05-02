export type Scenario = {
  slug: string;
  title: string;
  shortTitle: string;
  stageLabel: string;
  userType: string;
  problem: string;
  actionSummary: string;
  commonMistakes: string[];
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
    shortTitle: "刚来加拿大",
    stageLabel: "新移民起步",
    userType: "新移民、留学生转工签、刚开始建立加拿大财务系统的人",
    problem: "不知道加拿大金融规划有哪些模块，也不知道 TFSA、RRSP、信用、保险和税务之间的关系。",
    actionSummary: "先把身份、税务居民、银行账户、信用记录和现金流资料放在同一张清单里，再决定下一步该问谁。",
    commonMistakes: [
      "急着开账户或买产品，却没有先确认税务身份和现金流目标。",
      "把 CRA、银行和 Service Canada 密码直接发给别人。",
      "没有保存第一份工资单、T4、租房和银行记录，后面补资料很麻烦。"
    ],
    whatToLearnFirst: ["金融术语", "综合财务规划", "现金流和应急金", "信用和债务", "注册账户基础"],
    documentsToPrepare: ["SIN 和税务居民身份信息", "银行账户和信用卡资料", "最近收入资料", "CRA 账户访问准备"],
    advisorQuestions: [
      "我目前最应该先整理哪几类资料？",
      "哪些账户需要等有税务居民身份或报税记录后再确认？",
      "我的短期现金流和长期目标应该如何排序？"
    ],
    relatedArticles: ["README", "glossary", "01-comprehensive-financial-planning/00-overview"],
    boundaries: ["不判断移民身份、税务居民身份或具体账户适合性。"]
  },
  {
    slug: "tax-season-prep",
    title: "我第一次或今年要报税，应该先准备什么？",
    shortTitle: "报税准备",
    stageLabel: "报税季",
    userType: "第一次在加拿大报税、新移民、工资收入者、自雇人士或收到 CRA 信件的人",
    problem: "不知道 T4、T5、RRSP 供款收据、NOA、CRA 账户和扣税资料分别从哪里找，也不清楚哪些问题该问会计师。",
    actionSummary: "先按收入、税单、扣除/抵免、注册账户和 CRA 记录整理资料，再把不确定的问题交给报税或税务专业人士确认。",
    commonMistakes: [
      "只等雇主给 T4，没有检查银行、投资平台、学校、CRA 账户和 RRSP 供款收据。",
      "把 CRA 登录密码发给别人，或把完整 SIN、银行账号无保护发送。",
      "没有保留收据、学费单、搬家/托儿/医疗等可能相关资料，之后补证据很困难。"
    ],
    whatToLearnFirst: ["CRA 账户", "NOA/NOR", "税单", "RRSP 供款收据", "扣除和抵免"],
    documentsToPrepare: ["T4/T4A/T5/T3 等税单", "NOA/NOR", "RRSP/FHSA 供款收据", "学费、托儿、医疗或捐款收据", "自雇收入和费用记录"],
    advisorQuestions: [
      "我今年是否还有缺失税单或收据？",
      "哪些扣除或抵免需要会计师确认资格和证据？",
      "报税后我应该如何保存 NOA、账户额度和税务文件包？"
    ],
    relatedArticles: [
      "client-document-source-map",
      "06-tax-optimization-asset-protection/04-tax-season-prep",
      "06-tax-optimization-asset-protection/01-tax-planning-building-blocks",
      "03-canadian-registered-accounts/06-room-check-workflow",
      "08-small-business-owner-financial-consulting/01-business-tax-cashflow"
    ],
    boundaries: ["不替代报税服务、税务意见或 CRA 个案判断。"]
  },
  {
    slug: "cashflow-reset",
    title: "我想整理每月财务和债务，要从哪里开始？",
    shortTitle: "现金流整理",
    stageLabel: "现金流 / 债务",
    userType: "刚开始理财、有信用卡债务、收入变化、想建立预算和应急金的人",
    problem: "每月钱进钱出不清楚，只看账户余额，无法判断能存多少、先还什么债、是否有足够缓冲。",
    actionSummary: "先把 3 个月收入、固定支出、债务最低还款、利率和应急金放在一起，再决定下一步问顾问、银行或信用辅导机构什么。",
    commonMistakes: [
      "只看银行当前余额，没有下载账户结单看真实现金流。",
      "只看债务总额，没有看利率、最低还款、到期日和是否 secured。",
      "一边投资一边滚高息信用卡债，却没有先确认现金缓冲和债务成本。"
    ],
    whatToLearnFirst: ["现金流", "应急金", "信用卡和 LOC", "债务利率", "短期目标排序"],
    documentsToPrepare: ["近 3 个月银行账户结单", "信用卡结单", "贷款和信用额度结单", "固定支出清单", "收入和工资单"],
    advisorQuestions: [
      "我每月真正可支配现金流是多少？",
      "哪些债务利率最高、现金流压力最大？",
      "应急金、还债、储蓄和投资应该如何排序讨论？"
    ],
    relatedArticles: [
      "01-comprehensive-financial-planning/00-overview",
      "01-comprehensive-financial-planning/03-cashflow-debt-basics",
      "01-comprehensive-financial-planning/01-client-data-map",
      "01-comprehensive-financial-planning/02-planning-process",
      "client-document-source-map"
    ],
    boundaries: ["不提供债务重组、贷款申请、投资或信用修复的个人化建议。"]
  },
  {
    slug: "first-home",
    title: "我想买第一套房，应该先准备什么？",
    shortTitle: "准备买房",
    stageLabel: "首次置业",
    userType: "首次买房者、新移民家庭、正在比较首付和房贷的人",
    problem: "只知道想买房，但还没把首付账户、现金流、压力测试、保险和税务资料放在一起看。",
    actionSummary: "先整理首付来源、收入证明、债务和账户可用额度，再带着清楚的问题去谈预批、利率结构和风险。",
    commonMistakes: [
      "只看挂牌价和月供，没有先算 closing cost、保险、维修和现金缓冲。",
      "没有提前准备 NOA、pay stub、银行流水和首付来源说明。",
      "不清楚固定/浮动利率、提前还款权利和罚金怎么影响后续选择。"
    ],
    whatToLearnFirst: ["首付和现金流", "FHSA", "RRSP HBP", "房贷压力测试", "保险和风险"],
    documentsToPrepare: ["收入证明", "银行账户结单", "CRA 可用额度", "信用和债务资料", "预批或房贷资料"],
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
    boundaries: ["不判断可以买多少钱、借多少钱、选哪家贷款机构或具体房产。"]
  },
  {
    slug: "account-differences",
    title: "TFSA、RRSP、FHSA 到底有什么不同？",
    shortTitle: "比较账户",
    stageLabel: "账户选择",
    userType: "准备开始储蓄、投资或买房的人",
    problem: "知道这些账户名字，但不清楚账户用途、税务特点和可用额度查询方式。",
    actionSummary: "先确认每个账户的用途、可用额度来源、资金使用时间，再把问题带给顾问或税务专业人士确认。",
    commonMistakes: [
      "把账户和投资产品混为一谈，以为开了账户就等于完成投资规划。",
      "没有核对 CRA 可用额度和金融机构交易记录之间的时间差。",
      "只看当年税务效果，没有考虑提款时间、流动性和未来税率。"
    ],
    whatToLearnFirst: ["账户和投资产品的区别", "TFSA", "RRSP", "FHSA", "额度查询"],
    documentsToPrepare: ["CRA 账户", "NOA/NOR", "金融机构账户结单", "当年供款和提款记录"],
    advisorQuestions: [
      "我的可用额度是否以 CRA 最新数据为准？",
      "我的资金使用时间会如何影响账户选择？",
      "哪些交易还没有反映在 CRA 账户？"
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
    shortTitle: "有孩子",
    stageLabel: "家庭教育金",
    userType: "有孩子或计划教育储蓄的家庭",
    problem: "听说 RESP 有政府补助，但不清楚受益人、供款人、CESG 和孩子不上学时的处理。",
    actionSummary: "先把孩子身份资料、家庭收入、已有 RESP 和教育目标时间整理好，再讨论供款节奏和补助规则。",
    commonMistakes: [
      "只记得 RESP 有补助，却没有确认孩子 SIN、供款人和已有账户。",
      "多个家庭成员重复开 RESP，后续 contribution 和 grant 记录混乱。",
      "没有同时看家庭现金流、保险和教育储蓄优先级。"
    ],
    whatToLearnFirst: ["RESP 基础", "政府教育补助", "教育目标时间", "家庭现金流"],
    documentsToPrepare: ["孩子 SIN", "RESP 账户结单", "供款人记录", "已有教育储蓄资料"],
    advisorQuestions: [
      "多个供款人是否需要合并计算？",
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
    shortTitle: "房贷续约",
    stageLabel: "续约/转贷",
    userType: "房贷期限即将到期、正在考虑重新贷款或转到其他机构的房主",
    problem: "只看续约利率，忽略现金流、罚金、摊还期、提前还款权利和压力测试。",
    actionSummary: "先拿到续约通知、房贷结单和还清金额信息，再比较续约、转到其他机构或重新贷款的影响。",
    commonMistakes: [
      "只问最低利率，没有问罚金、提前还款权利和摊还期变化。",
      "等到到期前几天才整理资料，比较选择的时间太短。",
      "没有把重新贷款的现金流目标、费用和长期利息成本放在一起看。"
    ],
    whatToLearnFirst: ["续约", "重新贷款", "转到其他机构", "固定和浮动利率", "提前还款和罚金"],
    documentsToPrepare: ["房贷结单", "续约通知", "还清金额说明", "收入和债务资料", "房产税或物业管理信息"],
    advisorQuestions: [
      "续约、转到其他机构或重新贷款对我的现金流有什么不同影响？",
      "当前合同是否有罚金或提前还款限制？",
      "如果利率变化，我的月供和长期成本会怎样变化？"
    ],
    relatedArticles: [
      "05-mortgage-lending/02-refinance-renewal-switching",
      "05-mortgage-lending/03-rates-payments-stress-test",
      "client-document-source-map"
    ],
    boundaries: ["不提供具体贷款机构、利率锁定或贷款结构建议。"]
  },
  {
    slug: "young-family-insurance",
    title: "我想了解保险，不知道从哪里开始。",
    shortTitle: "家庭保险",
    stageLabel: "风险保护",
    userType: "年轻家庭、有房贷、有孩子、有收入依赖者的人",
    problem: "不知道人寿、重疾、伤残和雇主福利分别解决什么风险。",
    actionSummary: "先列出收入依赖、债务、孩子费用和现有福利，再讨论家庭真正缺口在哪里。",
    commonMistakes: [
      "直接比较保费，没先算收入中断、债务和照护责任。",
      "不知道雇主福利的保障范围、等待期和离职后的变化。",
      "忘记检查受益人、保单持有人和已有保单是否仍符合家庭安排。"
    ],
    whatToLearnFirst: ["风险缺口", "人寿保险", "重疾险", "伤残险", "雇主福利"],
    documentsToPrepare: ["现有保单", "雇主福利手册", "房贷和债务资料", "家庭支出和收入资料"],
    advisorQuestions: [
      "如果主要收入中断，家庭现金流缺口在哪里？",
      "现有雇主福利能覆盖哪些风险，不能覆盖哪些？",
      "受益人和保单持有人安排是否需要更新？"
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
    shortTitle: "准备退休",
    stageLabel: "退休收入",
    userType: "临近退休、开始规划提款、养老金和遗产文件的人",
    problem: "不确定 CPP/OAS、RRSP/RRIF、TFSA、年金、税务和遗嘱文件如何一起看。",
    actionSummary: "先把 CPP/OAS、养老金、注册账户、税务和遗嘱授权文件放在一张时间线上，再确认退休现金流。",
    commonMistakes: [
      "只看账户余额，没有估算税后现金流和提款时间。",
      "CPP/OAS、RRIF、pension、TFSA 分开看，缺少整体顺序。",
      "遗嘱、POA、受益人和账户安排没有一起核对。"
    ],
    whatToLearnFirst: ["CPP/OAS", "RRSP/RRIF", "年金", "退休现金流", "遗嘱和授权文件"],
    documentsToPrepare: ["CPP 供款记录", "OAS 居住资料", "RRSP/RRIF/TFSA 账户结单", "雇主养老金结单", "遗嘱/授权文件"],
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
    shortTitle: "企业主",
    stageLabel: "公司与个人",
    userType: "自雇人士、公司企业主、合伙人、小企业主",
    problem: "个人现金流、公司现金流、税务、保险、担保和退出安排容易混在一起。",
    actionSummary: "先分开个人资料和公司资料，整理现金流、税务、保险、股东协议和未来退出安排。",
    commonMistakes: [
      "个人和公司现金流混用，顾问、会计师和银行都难以判断真实情况。",
      "只讨论省税，没有同步看现金流、风险和传承安排。",
      "没有准备财务报表、GST/HST、薪资记录和股东协议。"
    ],
    whatToLearnFirst: ["企业现金流", "企业主薪酬", "GST/HST 和薪资记录", "企业保险", "传承安排"],
    documentsToPrepare: ["T2 / 财务报表", "GST/HST 和薪资记录", "公司银行账户结单", "股东协议", "商业保险资料"],
    advisorQuestions: [
      "个人和公司现金流有没有混用？",
      "salary 和 dividend 的一般税务差异需要向会计师确认什么？",
      "如果企业主失能、死亡或退出，公司如何继续运作？"
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
    shortTitle: "高收入账户",
    stageLabel: "税务顺序",
    userType: "收入上升、开始比较 RRSP、TFSA、非注册账户和税务规划的人",
    problem: "容易只看当年省税，忽略流动性、未来提款税、投资风险和费用。",
    actionSummary: "先核对当年收入、边际税率、账户可用额度、投资期限和流动性，再确认账户顺序和税务问题。",
    commonMistakes: [
      "只追求当年 RRSP 退税，没有看未来提款税和现金需求。",
      "没有分清注册账户、非注册账户和公司账户的税务差异。",
      "忽略投资费用、资产放在哪类账户以及行为风险。"
    ],
    whatToLearnFirst: ["边际税率", "RRSP", "TFSA", "非注册投资税务", "投资费用"],
    documentsToPrepare: ["NOA/NOR", "RRSP 扣除额度", "TFSA 可用额度", "投资账户结单", "预计收入变化"],
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
