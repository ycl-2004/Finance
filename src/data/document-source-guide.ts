import type { AppIconName } from "@/components/icons/AppIcon";

export type DocumentSourceSection = {
  id: string;
  title: string;
  eyebrow: string;
  icon: AppIconName;
  bestFor: string;
  summary: string;
  sources: string[];
  documents: string[];
  steps: string[];
  cautions: string[];
};

export const documentSourceScenarioMap: Record<string, string> = {
  "account-differences": "registered-accounts",
  "business-owner": "business-owner",
  "cashflow-reset": "banking-cashflow",
  "first-home": "mortgage-property",
  "high-income-accounts": "investment-accounts",
  "kids-education": "registered-accounts",
  "mortgage-renewal": "mortgage-property",
  "new-to-canada": "identity-family",
  "pre-retirement": "retirement-income",
  "tax-season-prep": "tax-cra",
  "young-family-insurance": "insurance-benefits"
};

export const documentSourceSections: DocumentSourceSection[] = [
  {
    id: "identity-family",
    title: "身份和家庭",
    eyebrow: "基础身份",
    icon: "users",
    bestFor: "新移民、家庭状态变化、共同申请",
    summary: "先确认法定姓名、身份文件、家庭状态和居住历史，避免后面税务、贷款、保险和遗产资料对不上。",
    sources: ["客户本人", "政府身份证件", "家庭记录", "移民或身份文件"],
    documents: ["法定姓名和生日", "婚姻状态或共同申请人信息", "子女资料", "近 2 年居住地址记录"],
    steps: [
      "先列出所有申请人或家庭成员的基本信息。",
      "确认文件上的姓名、生日和地址是否一致。",
      "把身份文件只用于核对，不通过普通邮件或聊天发送完整敏感号码。"
    ],
    cautions: ["不判断移民身份、税务居民身份或法律家庭关系。", "涉及法律状态时，请向相应专业人士确认。"]
  },
  {
    id: "tax-cra",
    title: "税务与 CRA",
    eyebrow: "CRA",
    icon: "fileText",
    bestFor: "报税、NOA、税单、收入证明",
    summary: "用于报税准备、贷款收入证明、注册账户额度查询和 CRA 记录核对。",
    sources: ["CRA My Account", "报税软件", "会计师或报税人员", "雇主、学校、金融机构"],
    documents: ["NOA / NOR", "T1 General 或报税摘要", "T4 / T4A / T5 / T3 / T2202", "RRSP 供款收据", "收入证明"],
    steps: [
      "登入 CRA My Account。",
      "在 Tax returns 或 Mail 找对应年份 NOA/NOR。",
      "在税务单据区域查询 T4、T5 等税单。",
      "在收入证明区域下载 Proof of Income Statement。",
      "在注册账户区域核对 TFSA、RRSP 或 FHSA 可用额度。"
    ],
    cautions: [
      "不要发送 CRA 用户名、密码或验证码。",
      "CRA 显示的可用额度可能滞后，需和金融机构当年交易记录一起核对。",
      "缺少税单时，先联系发出文件的单位，例如雇主、学校或金融机构。"
    ]
  },
  {
    id: "service-canada",
    title: "CPP / OAS / EI",
    eyebrow: "MSCA",
    icon: "fileText",
    bestFor: "公共养老金、EI、ROE、退休收入",
    summary: "用于确认 CPP 供款记录、CPP/OAS 估算、EI 记录和部分政府税单。",
    sources: ["My Service Canada Account", "Service Canada", "雇主 ROE 记录"],
    documents: ["CPP 供款记录", "CPP 领取估算", "OAS / EI 付款记录", "ROE", "T4E / T4A / NR4"],
    steps: [
      "登入 My Service Canada Account。",
      "进入 CPP 区域下载供款记录。",
      "查看 CPP/OAS 估算，并保存查询日期。",
      "如已领取 CPP/OAS，下载付款记录或付款证明。"
    ],
    cautions: ["CPP 估算不是完整退休规划。", "OAS 需要整理加拿大居住年限和长期离境记录。"]
  },
  {
    id: "banking-cashflow",
    title: "银行现金流",
    eyebrow: "现金流",
    icon: "wallet",
    bestFor: "预算、债务、应急金、买房现金流",
    summary: "用于看清真实收入支出、债务付款和现金缓冲，不只看账户余额。",
    sources: ["银行 app 或网银", "信用卡账户", "贷款机构线上账户"],
    documents: ["3-12 个月支票账户或储蓄账户结单", "信用卡结单", "贷款、信用额度或 HELOC 结单", "固定支出清单"],
    steps: [
      "下载 PDF 账户结单，不只截图余额。",
      "按账户和月份命名文件。",
      "标出工资入账、房租/房贷、保险、托儿和债务最低还款。",
      "单独列出年度大额支出和不定期入账。"
    ],
    cautions: ["信用卡要看结单余额、最低还款额和利率。", "信用额度要确认额度上限、余额、利率，以及是否有抵押。"]
  },
  {
    id: "investment-accounts",
    title: "投资与账户",
    eyebrow: "投资账户",
    icon: "wallet",
    bestFor: "投资账户、非注册账户、费用、持仓",
    summary: "用于整理账户类型、持仓、交易、费用、税单和投资目标。",
    sources: ["银行或投资平台", "顾问客户账户", "年度税务文件包", "月结单或季结单"],
    documents: ["账户结单", "持仓报告", "交易记录", "成本记录", "费用报告", "T3 / T5 / T5008"],
    steps: [
      "列出所有投资账户和金融机构。",
      "下载最新账户结单和上一年年底账户结单。",
      "下载持仓摘要或投资组合摘要。",
      "非注册账户另存已实现收益/亏损报告和相关税单。"
    ],
    cautions: ["非注册账户的成本记录不能永远只依赖平台。", "进入投资建议前，顾问还需要单独确认你的个人资料、目标和风险承受能力。"]
  },
  {
    id: "registered-accounts",
    title: "注册账户额度",
    eyebrow: "TFSA / RRSP / FHSA",
    icon: "clipboard",
    bestFor: "TFSA、RRSP、FHSA、RESP、RDSP",
    summary: "用于核对额度、金融机构结单、供款收据和孩子或受益人相关资料。",
    sources: ["CRA My Account", "金融机构", "RESP / RDSP 开户机构", "账户结单"],
    documents: ["TFSA / RRSP / FHSA 可用额度", "金融机构结单", "RRSP 供款收据", "T4FHSA", "RESP / RDSP 账户结单"],
    steps: [
      "先从 CRA 查看个人层面的 TFSA/RRSP/FHSA 资料。",
      "再收集所有金融机构账户结单。",
      "把当年供款、提款和转账单独列出。",
      "RESP/RDSP 按孩子或受益人合并查看。"
    ],
    cautions: ["CRA 数据通常有时间差。", "不要只看某一家银行。", "RESP 和 RDSP 可能涉及多个供款人或账户持有人。"]
  },
  {
    id: "credit-debt",
    title: "信用和债务",
    eyebrow: "信用",
    icon: "checkCircle",
    bestFor: "信用报告、贷款、还款压力",
    summary: "用于确认信用报告、债务余额、利率、最低还款和提前还款成本。",
    sources: ["Equifax", "TransUnion", "贷款机构", "信用卡公司"],
    documents: ["信用报告", "信用分数（如有）", "贷款合同", "还清金额说明", "利率和最低还款额"],
    steps: [
      "分别向 Equifax 和 TransUnion 获取信用报告。",
      "保存报告日期。",
      "检查姓名、地址、账户、额度、余额和还款记录。",
      "向每个贷款机构下载最新结单。",
      "如准备转贷或还清，索取书面还清金额说明。"
    ],
    cautions: ["自己查自己的信用报告通常不影响信用分数。", "信用报告可能漏掉私人贷款、税款欠款或新近债务。"]
  },
  {
    id: "mortgage-property",
    title: "房贷和房产",
    eyebrow: "房贷",
    icon: "home",
    bestFor: "首次买房、续约、转贷、房产资料",
    summary: "用于整理房贷余额、利率、期限、罚金、房产税、物业管理资料和首付来源。",
    sources: ["贷款机构线上账户", "房贷经纪", "律师或公证文件", "市政府或地税网站", "BC Assessment", "LTSA", "物业管理公司"],
    documents: ["房贷结单", "续约通知", "还清金额说明", "房产税通知", "房屋保险", "物业管理文件", "购房合同", "产权查询"],
    steps: [
      "向贷款机构索取当前房贷结单。",
      "如考虑提前解约、转到其他机构或重新贷款，索取书面还清金额说明。",
      "确认提前还款权利已用和剩余额度。",
      "查看房产税、BC Assessment 和 LTSA title。",
      "首次买房同时整理首付来源证明。"
    ],
    cautions: [
      "续约通知不等于最佳方案。",
      "房贷保险通常保护贷款机构，不是保护借款人。",
      "BC 首次买房税务优惠使用前要重新核对成交日期规则。"
    ]
  },
  {
    id: "insurance-benefits",
    title: "保险与雇主福利",
    eyebrow: "保险",
    icon: "shieldCheck",
    bestFor: "人寿、重疾、伤残、团体福利",
    summary: "用于确认保额、保单持有人、受益人、附加保障、除外责任、等待期和现金价值。",
    sources: ["保险公司客户账户", "原保险顾问或经纪", "雇主福利账户", "HR 或福利管理人员"],
    documents: ["保单合同", "保单摘要", "有效保单说明", "保费表", "受益人指定记录", "团体福利手册"],
    steps: [
      "列出所有个人保单和团体福利。",
      "向保险公司或顾问索取完整保单合同。",
      "永久寿险索取当前有效保单说明。",
      "伤残险核对等待期、给付期限和伤残定义。",
      "团体福利向 HR 下载福利手册。"
    ],
    cautions: ["有保险不等于保障足够。", "雇主福利可能离职后失效。", "受益人指定要和遗嘱及家庭状态一起看。"]
  },
  {
    id: "retirement-income",
    title: "退休收入",
    eyebrow: "退休",
    icon: "wallet",
    bestFor: "CPP/OAS、雇主养老金、RRSP/RRIF、退休预算",
    summary: "用于整理公共养老金、雇主养老金、注册账户、退休支出和配偶/遗属福利。",
    sources: ["MSCA", "CRA My Account", "雇主养老金管理方", "金融机构", "保险公司"],
    documents: ["CPP 供款记录", "CPP 领取估算", "OAS 居住资料", "雇主养老金结单", "RRSP/RRIF/TFSA 账户结单", "退休预算"],
    steps: [
      "下载 CPP 供款记录和领取估算。",
      "整理加拿大居住年限。",
      "向雇主养老金管理方索取可选领取方案。",
      "下载退休账户结单。",
      "列出退休后固定支出和可调整支出。"
    ],
    cautions: ["CPP/OAS 最高金额不能当默认金额。", "RRSP/RRIF 提款会影响应税收入。", "配偶一方去世后的现金流要单独看。"]
  },
  {
    id: "estate-incapacity",
    title: "遗产和授权",
    eyebrow: "遗产授权",
    icon: "fileText",
    bestFor: "遗嘱、授权、受益人、房产产权",
    summary: "用于复盘遗嘱、授权、医疗代表协议、受益人指定、房产产权和执行人可找到的资产位置。",
    sources: ["律师或公证办公室", "保险公司", "金融机构", "LTSA", "公司记录册"],
    documents: ["遗嘱", "持续授权书", "医疗代表协议", "预先医疗指示", "受益人指定记录", "房产产权记录"],
    steps: [
      "找到最新签署版本，不用草稿。",
      "记录签署日期和文件保管位置。",
      "向金融机构和保险公司确认受益人指定记录。",
      "对房产做产权查询。",
      "列出执行人可找到的资产位置清单，不写密码。"
    ],
    cautions: ["遗嘱不自动控制所有保险和注册账户的受益人。", "结婚、离婚、生子、搬省、买房或创业后应复盘。"]
  },
  {
    id: "business-owner",
    title: "企业主资料",
    eyebrow: "企业主",
    icon: "briefcase",
    bestFor: "公司税务、现金流、股权、商业保险",
    summary: "用于区分个人、公司和税务现金流，整理公司记录、贷款、合同和股东文件。",
    sources: ["CRA My Business Account", "会计师", "记账系统", "公司银行账户", "BC Registries", "公司记录册", "薪资服务平台"],
    documents: ["Business number", "T2 公司税申报", "GST/HST 申报", "薪资记录", "财务报表", "总账", "银行结单", "股东协议"],
    steps: [
      "查看 CRA My Business Account 的账户余额、邮件和申报状态。",
      "从会计师取得 T2 和财务报表。",
      "从记账系统导出损益表、资产负债表和应收应付账龄。",
      "从银行下载公司银行账户和信用卡结单。",
      "从 BC Registries 或公司记录册确认公司记录。"
    ],
    cautions: ["公司账上利润不等于企业主可自由取用现金。", "GST/HST、薪资扣缴和公司税欠款不能当普通运营现金。"]
  }
];
