export type ChecklistItem = {
  id: string;
  label: string;
  helper?: string;
};

export type ChecklistGroup = {
  id: string;
  title: string;
  items: ChecklistItem[];
};

export type DocumentChecklist = {
  slug: string;
  scenarioSlug: string;
  title: string;
  description: string;
  groups: ChecklistGroup[];
  advisorQuestions: string[];
};

export const universalSafetyWarnings = [
  "不要通过邮件或聊天发送完整 SIN 号码。",
  "不要发送完整银行账号、银行卡号、信用卡 CVV/CVC。",
  "不要共享 CRA、银行、保险或 Service Canada 的用户名和密码。",
  "所有文件先遮盖不必要的敏感字段，只保留顾问确实需要核对的信息。"
];

export const documentChecklists: DocumentChecklist[] = [
  {
    slug: "first-home",
    scenarioSlug: "first-home",
    title: "买房资料清单",
    description: "用于首次买房、预批、首付来源说明和房贷顾问沟通前的准备。",
    advisorQuestions: [
      "固定利率和浮动利率的现金流差异是什么？",
      "提前还款权利和 penalty 怎么计算？",
      "首付资金来源、FHSA 和 RRSP HBP 需要提前准备哪些记录？"
    ],
    groups: [
      {
        id: "identity",
        title: "个人身份与家庭信息",
        items: [
          { id: "government-id", label: "有效政府身份证件" },
          { id: "status-document", label: "PR card、工签或其他身份文件（如适用）" },
          { id: "marital-status", label: "婚姻状况或共同申请人信息" },
          { id: "address-history", label: "近 2 年居住地址记录" }
        ]
      },
      {
        id: "income",
        title: "收入证明",
        items: [
          { id: "noa", label: "最近 2 年 Notice of Assessment (CRA)" },
          { id: "t4-t1", label: "T4 / T1 General" },
          { id: "pay-stubs", label: "最近 3 个月工资单" },
          { id: "employment-letter", label: "雇主信：职位、收入、入职时间" },
          { id: "self-employed", label: "自雇人士：T2125、财务报表或会计师信" }
        ]
      },
      {
        id: "assets-debts",
        title: "资产与负债",
        items: [
          { id: "bank-statements", label: "近 3 个月银行对账单" },
          { id: "investment-statements", label: "TFSA / RRSP / FHSA / 非注册账户 statements" },
          { id: "down-payment-source", label: "首付来源说明和大额入账记录" },
          { id: "debt-summary", label: "车贷、学生贷款、信用额度和信用卡余额" },
          { id: "credit-report", label: "信用报告或信用分数截图（如已有）" }
        ]
      },
      {
        id: "property",
        title: "房产相关",
        items: [
          { id: "offer", label: "购房合同 / accepted offer（如已有）" },
          { id: "property-tax", label: "property tax 或 strata fee 信息（如适用）" },
          { id: "insurance-quote", label: "房屋保险报价（可后补）" }
        ]
      }
    ]
  },
  {
    slug: "new-to-canada",
    scenarioSlug: "new-to-canada",
    title: "新移民金融起步清单",
    description: "用于刚到加拿大、准备建立银行、信用、税务和基础保障系统。",
    advisorQuestions: [
      "我现在最需要先建立的是银行、信用、税务还是保险资料？",
      "哪些账户需要等报税记录或税务身份确认后再决定？",
      "我应该保留哪些第一年记录，方便之后申请贷款或报税？"
    ],
    groups: [
      {
        id: "identity-status",
        title: "身份与税务基础",
        items: [
          { id: "sin-record", label: "SIN 号码记录", helper: "只在必要时现场出示，避免发送完整号码。" },
          { id: "status-documents", label: "PR card、study permit、work permit 或登陆文件" },
          { id: "tax-residency-notes", label: "入境日期、居住地址和税务居民相关记录" },
          { id: "cra-account", label: "CRA account 注册准备信息" }
        ]
      },
      {
        id: "bank-credit",
        title: "银行与信用",
        items: [
          { id: "chequing-saving", label: "chequing / savings 账户信息" },
          { id: "credit-card", label: "第一张信用卡或 secured card 信息" },
          { id: "monthly-cashflow", label: "每月收入、房租、交通和固定支出清单" },
          { id: "credit-report", label: "信用报告查询方式或已有截图" }
        ]
      },
      {
        id: "income-benefits",
        title: "收入与福利",
        items: [
          { id: "first-paystub", label: "第一份工资单或雇主信（如已有）" },
          { id: "benefit-booklet", label: "雇主福利 booklet（如已有）" },
          { id: "insurance-policy", label: "已有保险或海外保单摘要" }
        ]
      }
    ]
  },
  {
    slug: "kids-education",
    scenarioSlug: "kids-education",
    title: "有孩子家庭准备清单",
    description: "用于 RESP、教育储蓄、家庭保险和现金流规划前的准备。",
    advisorQuestions: [
      "孩子年龄和家庭收入会怎样影响教育储蓄节奏？",
      "已有 RESP 的 subscriber、beneficiary 和 grant 记录是否清楚？",
      "如果家庭主要收入中断，教育目标会受什么影响？"
    ],
    groups: [
      {
        id: "child-info",
        title: "孩子与家庭资料",
        items: [
          { id: "child-sin", label: "孩子 SIN 记录", helper: "不要无保护发送完整号码。" },
          { id: "birth-certificate", label: "出生证明或监护关系文件（如适用）" },
          { id: "family-noa", label: "父母最近 2 年 NOA" },
          { id: "ccb-notice", label: "Canada Child Benefit 通知或记录（如适用）" }
        ]
      },
      {
        id: "resp",
        title: "教育储蓄",
        items: [
          { id: "resp-statements", label: "现有 RESP statements" },
          { id: "subscriber-records", label: "subscriber / beneficiary 记录" },
          { id: "grant-history", label: "CESG 或其他 grant 记录" },
          { id: "education-goal", label: "教育目标时间和预计资金需求草稿" }
        ]
      },
      {
        id: "family-protection",
        title: "家庭保障",
        items: [
          { id: "life-ci-policy", label: "现有人寿、重疾或伤残保单" },
          { id: "employer-benefits", label: "雇主福利 booklet" },
          { id: "monthly-expense", label: "家庭月支出和债务清单" }
        ]
      }
    ]
  },
  {
    slug: "mortgage-renewal",
    scenarioSlug: "mortgage-renewal",
    title: "房贷续约/转贷清单",
    description: "用于 renewal、switch 或 refinance 比较前的资料准备。",
    advisorQuestions: [
      "renewal、switch 和 refinance 的成本与现金流差别是什么？",
      "当前合同是否有 penalty、prepayment privilege 或限制？",
      "如果利率上升或摊还期变化，长期成本会怎样改变？"
    ],
    groups: [
      {
        id: "mortgage-current",
        title: "现有房贷",
        items: [
          { id: "mortgage-statement", label: "最新 mortgage statement" },
          { id: "renewal-notice", label: "renewal notice" },
          { id: "payout-statement", label: "payout statement 或 penalty 估算" },
          { id: "prepayment-terms", label: "提前还款权利和限制条款" }
        ]
      },
      {
        id: "property-costs",
        title: "房产成本",
        items: [
          { id: "property-tax", label: "property tax notice" },
          { id: "strata-fee", label: "strata fee / condo fee 信息（如适用）" },
          { id: "home-insurance", label: "房屋保险记录" }
        ]
      },
      {
        id: "financial-update",
        title: "财务更新",
        items: [
          { id: "income-docs", label: "最近收入证明" },
          { id: "debts", label: "债务、信用额度和信用卡余额" },
          { id: "bank-statements", label: "近 3 个月银行流水" }
        ]
      }
    ]
  },
  {
    slug: "pre-retirement",
    scenarioSlug: "pre-retirement",
    title: "退休前准备清单",
    description: "用于退休收入、提款、养老金、税务和遗产文件梳理。",
    advisorQuestions: [
      "我的退休收入来源分别从什么时候开始？",
      "RRSP、RRIF、TFSA、pension 和非注册账户的提款顺序需要确认什么？",
      "遗嘱、授权文件和受益人安排是否一致？"
    ],
    groups: [
      {
        id: "income-sources",
        title: "退休收入来源",
        items: [
          { id: "cpp-statement", label: "CPP Statement of Contributions" },
          { id: "oas-residency", label: "OAS 居住年限相关记录" },
          { id: "pension-statement", label: "雇主 pension statement" },
          { id: "annuity-policy", label: "年金或保证收入资料（如有）" }
        ]
      },
      {
        id: "accounts",
        title: "账户与税务",
        items: [
          { id: "rrsp-rrif", label: "RRSP / RRIF statements" },
          { id: "tfsa", label: "TFSA statements" },
          { id: "nonregistered", label: "非注册投资账户 statements" },
          { id: "latest-noa", label: "最近 2 年 NOA" }
        ]
      },
      {
        id: "estate",
        title: "遗产与授权文件",
        items: [
          { id: "will", label: "遗嘱" },
          { id: "poa", label: "Power of Attorney / Representation Agreement" },
          { id: "beneficiaries", label: "账户和保单受益人记录" },
          { id: "insurance", label: "现有保险或长期照护安排" }
        ]
      }
    ]
  },
  {
    slug: "business-owner",
    scenarioSlug: "business-owner",
    title: "企业主资料清单",
    description: "用于把个人财务、公司现金流、税务、保险和退出安排分开整理。",
    advisorQuestions: [
      "个人现金流和公司现金流有哪些地方混在一起？",
      "salary、dividend、retained earnings 的问题需要向会计师确认什么？",
      "如果 owner 失能、死亡或退出，公司如何继续运作？"
    ],
    groups: [
      {
        id: "company-financials",
        title: "公司财务",
        items: [
          { id: "t2", label: "T2 corporate tax return" },
          { id: "financial-statements", label: "近 2 年 financial statements" },
          { id: "business-bank", label: "business bank statements" },
          { id: "ar-ap", label: "应收、应付和主要合同摘要" }
        ]
      },
      {
        id: "tax-payroll",
        title: "税务与薪酬",
        items: [
          { id: "gst-hst", label: "GST/HST 申报资料" },
          { id: "payroll", label: "payroll / T4 / T5 记录" },
          { id: "shareholder-loan", label: "shareholder loan 记录" },
          { id: "owner-compensation", label: "salary / dividend 历史记录" }
        ]
      },
      {
        id: "risk-succession",
        title: "风险与退出",
        items: [
          { id: "shareholder-agreement", label: "shareholder agreement" },
          { id: "business-insurance", label: "商业保险、key person 或 buy-sell 资料" },
          { id: "personal-guarantees", label: "个人担保和公司债务清单" },
          { id: "succession-plan", label: "succession / exit 计划草稿（如有）" }
        ]
      }
    ]
  }
];

export function getChecklistByScenarioSlug(slug: string): DocumentChecklist | undefined {
  return documentChecklists.find((checklist) => checklist.scenarioSlug === slug);
}
