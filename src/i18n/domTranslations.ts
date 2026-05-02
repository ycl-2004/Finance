export type Locale = "zh" | "en";

const cjkPattern = /[\u3400-\u9fff]/;

const zhOverrides: Record<string, string> = {
  "Learning Hub": "准备中心",
  "QM Financial Preparation Hub": "QM Financials 会议准备中心",
  "Start Here": "从这里开始",
  "Trust Boundary": "信任边界",
  "Learning Center": "学习中心",
  "Document Preparation": "资料准备",
  Reference: "资料来源",
  "Knowledge Topics": "主题知识库",
  "Scenario Flows": "场景流程",
  "Practice Cases": "案例练习",
  Glossary: "术语表",
  About: "关于",
  Promise: "承诺",
  "Education Boundary": "教育边界",
  Privacy: "隐私说明",
  Consultation: "预约准备",
  "Book A Prep Call": "预约准备会",
  "Request Saved": "预约意向已生成",
  "Start Planning": "开始规划",
  "User Flow": "用户流程",
  "Action Path": "行动路径",
  "Tax Season": "报税季",
  Ready: "准备完成",
  "Next Step": "下一步",
  "Case Study": "案例练习",
  Open: "打开",
  Term: "术语"
};

const enOverrides: Record<string, string> = {
  首页: "Home",
  开始规划: "Start planning",
  资料准备: "Documents",
  学习中心: "Learning",
  关于我们: "About",
  教育边界: "Education boundary",
  隐私说明: "Privacy",
  预约准备会: "Book a prep call",
  直接致电: "Call directly",
  致电: "Call",
  "致电确认时间": "Call to confirm",
  "生成确认页": "Create confirmation page",
  "保存本机摘要": "Save local summary",
  "发送邮件草稿": "Send email draft",
  "返回资料清单": "Back to document checklist",
  "返回场景流程": "Back to scenario flow",
  "查看可打印清单": "Printable checklist",
  "生成资料清单": "Create document checklist",
  "进入资料清单": "Open document checklist",
  "查看场景流程": "View scenario flow",
  "补充学习": "Learn more",
  "查看使用边界": "View boundaries",
  "了解我们的边界": "Learn our boundaries",
  "全部规划入口": "All planning paths",
  "查看全部场景": "View all scenarios",
  "查看资料清单": "View document checklist",
  "按场景开始规划": "Plan by life scenario",
  "生活场景": "Life scenarios",
  "开始学习": "Start learning",
  "术语表": "Glossary",
  "案例练习": "Practice cases",
  "资料清单": "Document checklist",
  "主题": "Topics",
  "学习入口": "Learning entry points",
  "主导航": "Main navigation",
  "侧边导航": "Side navigation",
  "快速开始": "Quick start",
  "首页快速场景入口": "Home quick scenario links",
  "网站内容统计": "Site content stats",
  "平台核心价值": "Platform value",
  "关于我们与信任说明": "About and trust notes",
  "开始规划场景": "Planning scenarios",
  "资料准备辅助信息": "Document preparation support",
  "完成进度": "Completion progress",
  "选择资料清单版本": "Choose checklist version",
  "选择咨询场景": "Choose consultation scenario",
  "搜索知识库": "Search the knowledge base",
  "搜索结果": "Search results",
  "搜索术语": "Search terms",
  "术语分类": "Term category",
  "文章信息": "Article information",
  "条目信息": "Item information",
  "没有找到这个页面": "Page not found",
  "回到首页": "Back to home",
  "查看学习路线": "View learning path",
  "没有找到匹配术语。": "No matching terms found.",
  "没有找到结果": "No results found",
  "试试英文缩写、中文术语或主题名称。": "Try an acronym, term, or topic name.",
  "全部分类": "All categories",
  中文: "Chinese",
  说明: "Description",
  分类: "Category",
  "关于": "About",
  "边界": "Boundaries",
  "先理解": "Learn first",
  "下一步": "Next step",
  "相关知识文章": "Related learning articles",
  "相关学习阶段": "Related learning stages",
  "相关生活场景": "Related life scenarios",
  "学习节点": "Learning node",
  "相关场景": "Related scenarios",
  "查看完整主题": "View full topic",
  "回到主题": "Back to topic",
  "暂无直接关联场景": "No directly related scenario yet",
  "已知资料": "Known information",
  "缺失资料": "Missing information",
  "学习任务": "Learning task",
  "思考路径": "Thinking path",
  "不要发送": "Do not send",
  "你应该问顾问什么": "Questions to ask your advisor",
  "生成准备清单": "Create a preparation checklist",
  "下载 PDF": "Save as PDF",
  "重置清单": "Reset checklist",
  "资料准备已完成": "Document preparation complete",
  "准备到 50% 后，建议确认缺口": "After 50%, confirm remaining gaps",
  "建议顺序": "Suggested order",
  "可执行": "Actionable",
  "完成资料清单": "Complete document checklist",
  "正式会议": "Formal meeting",
  "准备": "Prepare",
  "确认": "Confirm",
  "行动": "Act",
  "不收敏感密码": "No sensitive passwords",
  "先确认资料": "Confirm documents first",
  "15 分钟准备会": "15-minute prep call",
  "填写预约意向": "Fill out booking intent",
  姓名: "Name",
  电话: "Phone",
  "时间状态": "Timing",
  "你最想先确认的问题": "Top question to confirm",
  "预约意向已生成": "Booking intent created",
  "接下来你可以做什么": "What you can do next",
  "安全提醒": "Safety reminder",
  "使用边界": "Usage boundaries",
  "本站不提供": "This site does not provide",
  "信息时效": "Information freshness",
  "如何正确使用": "How to use this correctly",
  "主题知识库": "Topic library",
  "金融术语表": "Financial glossary",
  "学习路线": "Learning path",
  "必读文章": "Required reading",
  "选读": "Optional reading",
  "看完后问问自己": "Ask yourself after reading",
  "你现在处于哪个阶段？": "Which stage are you in?",
  "今天你想解决什么问题？": "What are you trying to solve today?",
  "帮你在见金融顾问前，准备好所有关键问题与资料": "Prepare your key questions and documents before meeting a financial advisor",
  "适用于新移民、买房、家庭保障、房贷续约、退休和企业主规划。 先选场景，生成资料清单，再带着明确问题进入会议。": "For newcomers, home buyers, families, mortgage renewals, retirement, and business owners. Choose a scenario, build a document checklist, then enter the meeting with clearer questions.",
  "高优先级场景": "Priority scenarios",
  "总场景流程": "Total scenario flows",
  "辅助文章": "Supporting articles",
  "不要从知识库开始翻。先点一个场景，让页面带你走到资料清单。": "Do not start by browsing the whole knowledge base. Pick a scenario first, then let the page guide you to the right checklist.",
  "可生成资料清单": "Checklist available",
  "查看准备流程": "View preparation flow",
  "我们不提供投资建议。我们帮助你理解和准备。": "We do not provide investment advice. We help you understand and prepare.",
  "这个网站的角色是会议前准备工具：帮你整理资料、建立问题清单、理解基本概念。 具体投资、保险、税务、法律或贷款决定，请由相应持牌或专业人士确认。": "This site is a pre-meeting preparation tool: it helps you organize documents, build questions, and understand core concepts. Specific investment, insurance, tax, legal, or mortgage decisions should be confirmed by qualified professionals.",
  "学习中心是辅助，不是入口障碍": "Learning supports the path; it is not the starting barrier",
  "当你在准备清单里遇到不懂的词，再回到学习中心补概念。": "When you run into an unfamiliar term in a checklist, come back to the learning center for context.",
  "学习路径": "Learning path",
  "每类文件通常在哪里找？": "Where do common documents usually come from?",
  "如果你不知道 NOA、statement、room 这些资料从哪里来，从这里查。": "Use this guide when you are not sure where NOA, statements, room records, and similar documents usually come from.",
  "开始规划，不是开始乱看文章": "Start with planning, not random reading",
  "选择最接近你当前情况的场景。每个场景都会带你完成三件事： 知道要准备什么、知道常见错误、知道应该问顾问什么。": "Choose the scenario closest to your situation. Each path helps you see what to prepare, what mistakes to avoid, and what to ask your advisor.",
  "直接做资料清单": "Go straight to documents",
  "从看内容，到完成一份准备包": "From reading to a usable preparation pack",
  "主流程保持简单：先选场景，再整理资料，最后把准备成果带进顾问会议。": "The main flow stays simple: choose a scenario, organize documents, then bring the preparation pack into your advisor meeting.",
  "开始生成": "Start creating",
  "进入流程": "Enter flow",
  "从内容变成行动": "Turn content into action",
  "这个平台的顺序不是“先读很多文章”，而是先把会议前最关键的准备动作完成。": "The site does not ask you to read everything first. It helps you complete the most important preparation steps before the meeting.",
  "选择场景": "Choose scenario",
  "勾选资料": "Check documents",
  "列出问题": "List questions",
  "带进顾问会议": "Bring to the advisor meeting",
  "预约确认": "Book confirmation",
  "选择场景，勾选资料，生成可带进会议的准备清单。": "Choose a scenario, check off documents, and create a preparation list you can bring into the meeting.",
  "按资料类型找到资料来源": "Find document sources by type",
  "选择你正在准备的资料类型，只看对应入口、常见文件、准备步骤和注意事项。": "Choose the document type you are preparing and see only the relevant access points, common files, steps, and reminders.",
  "先整理场景、时间和核心问题。准备会用于确认资料缺口， 不替代投资、保险、税务、法律或贷款建议。": "Start by organizing your scenario, timing, and core questions. The prep call is for confirming gaps, not for investment, insurance, tax, legal, or mortgage advice.",
  "致电 +1 778 929 9942": "Call +1 778 929 9942",
  "预约草稿只保存在本机。正式安排请电话确认。": "The booking draft is saved only in this browser. Please call to confirm the actual appointment time.",
  "这一步只会在本机生成预约摘要，不会自动上传资料或发送给团队。 正式安排请电话确认，或在确认页发送邮件草稿。": "This step only creates a local booking summary. It does not upload documents or automatically send anything to the team. Please call to confirm, or send the email draft from the confirmation page.",
  "不提供投资、保险、税务或法律建议；我们帮助你在见专业人士前理解和准备。": "We do not provide investment, insurance, tax, or legal advice; we help you understand and prepare before meeting professionals.",
  "我刚来加拿大，应该先了解什么金融基础？": "I just arrived in Canada. What financial basics should I learn first?",
  "我想买第一套房，应该先准备什么？": "I want to buy my first home. What should I prepare first?",
  "TFSA、RRSP、FHSA 到底有什么不同？": "What is the difference between TFSA, RRSP, and FHSA?",
  "我有孩子，RESP 要怎么理解？": "I have children. How should I understand RESP?",
  "我的房贷快续约了，要注意什么？": "My mortgage is up for renewal. What should I watch for?",
  "我想了解保险，不知道从哪里开始。": "I want to understand insurance but do not know where to start.",
  "我快退休了，要先看哪些资料？": "I am nearing retirement. What documents should I review first?",
  "我是小企业主，个人和公司财务要分清什么？": "I am a small business owner. What should I separate between personal and business finances?",
  "收入提高后，账户和税务顺序要怎么学习？": "After income rises, how should I learn account and tax sequencing?",
  "我第一次或今年要报税，应该先准备什么？": "I need to file taxes this year. What should I prepare first?",
  "我想整理每月财务和债务，要从哪里开始？": "I want to organize monthly finances and debt. Where should I start?",
  "刚来加拿大": "New to Canada",
  "准备买房": "Buying a first home",
  "比较账户": "Compare accounts",
  "有孩子": "Family with children",
  "房贷续约": "Mortgage renewal",
  "家庭保险": "Family insurance",
  "准备退休": "Pre-retirement",
  "企业主": "Business owner",
  "高收入账户": "High-income accounts",
  "报税准备": "Tax preparation",
  "现金流整理": "Cash flow reset",
  "我是企业主": "I am a business owner",
  "新移民起步": "Newcomer basics",
  "首次置业": "First home",
  "账户选择": "Account choice",
  "家庭教育金": "Education savings",
  "风险保护": "Risk protection",
  "退休收入": "Retirement income",
  "公司与个人": "Business and personal",
  "税务顺序": "Tax sequence",
  "现金流 / 债务": "Cash flow / debt",
  "买房资料清单": "Home buying document checklist",
  "注册账户比较清单": "Registered account comparison checklist",
  "新移民金融起步清单": "Newcomer financial setup checklist",
  "有孩子家庭准备清单": "Family with children checklist",
  "房贷续约/转贷清单": "Mortgage renewal / refinance checklist",
  "家庭保险准备清单": "Family insurance preparation checklist",
  "退休前准备清单": "Pre-retirement preparation checklist",
  "高收入账户与税务顺序清单": "High-income account and tax sequence checklist",
  "报税准备清单": "Tax preparation checklist",
  "现金流与债务整理清单": "Cash flow and debt checklist",
  "企业主资料清单": "Business owner document checklist",
  "金融地图和术语": "Financial map and terms",
  "综合财务规划": "Comprehensive financial planning",
  "资料准备和流程": "Documents and process",
  "注册账户": "Registered accounts",
  "投资规划": "Investment planning",
  "保险和风险": "Insurance and risk",
  "房贷和买房": "Mortgage and home buying",
  "税务和资产保护": "Tax and asset protection",
  "退休和传承": "Retirement and estate planning",
  "企业主财务": "Business owner finance",
  "金融术语": "Financial terms",
  "加拿大注册账户": "Canadian registered accounts",
  "保险和风险管理": "Insurance and risk management",
  "公司基础资料": "Company profile",
  "知识库导览": "Knowledge system",
  "资料准备流程": "Document preparation workflow"
};

function preserveWhitespace(original: string, translated: string) {
  const leading = original.match(/^\s*/)?.[0] ?? "";
  const trailing = original.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translated}${trailing}`;
}

function normalize(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function englishFallback(text: string) {
  const normalized = normalize(text);
  if (!normalized) return text;

  const minutesMatch = normalized.match(/^(\d+)\s*分钟(?:阅读)?$/);
  if (minutesMatch) return `${minutesMatch[1]} min`;

  const completedMatch = normalized.match(/^已完成\s+(\d+)\/(\d+)\s+项$/);
  if (completedMatch) return `Completed ${completedMatch[1]}/${completedMatch[2]} items`;

  const groupCountMatch = normalized.match(/^(\d+)\/(\d+)$/);
  if (groupCountMatch) return normalized;

  if (normalized.includes("不构成") || normalized.includes("不提供")) {
    return "Educational information only. This is not personalized financial, legal, tax, insurance, or mortgage advice.";
  }

  if (normalized.includes("SIN") || normalized.includes("密码") || normalized.includes("账号")) {
    return "Do not share full SIN numbers, account numbers, passwords, or sensitive login details.";
  }

  if (normalized.includes("资料") || normalized.includes("清单") || normalized.includes("文件")) {
    return "Prepare the relevant documents and keep sensitive information protected.";
  }

  if (normalized.includes("顾问") || normalized.includes("问题")) {
    return "Bring clear questions to your advisor meeting.";
  }

  if (normalized.includes("房贷") || normalized.includes("买房")) {
    return "Review mortgage, cash flow, and housing documents before comparing options.";
  }

  if (normalized.includes("保险") || normalized.includes("风险")) {
    return "Review current coverage, risks, and family responsibilities before discussing insurance.";
  }

  if (normalized.includes("税") || normalized.includes("账户") || normalized.includes("room")) {
    return "Review account room, tax records, timing, and liquidity before making decisions.";
  }

  if (normalized.includes("退休") || normalized.includes("遗嘱")) {
    return "Review retirement income, account statements, beneficiaries, and estate documents.";
  }

  if (normalized.includes("企业") || normalized.includes("公司")) {
    return "Separate business records, personal cash flow, tax questions, and succession risks.";
  }

  if (normalized.endsWith("？") || normalized.endsWith("?")) {
    return "Confirm this question with a qualified professional.";
  }

  return "Use this section to prepare for your advisor conversation. Switch to Chinese for the full source text.";
}

export function localizeVisibleText(text: string, locale: Locale) {
  const normalized = normalize(text);
  if (!normalized) return text;

  if (locale === "zh") {
    const translated = zhOverrides[normalized];
    return translated ? preserveWhitespace(text, translated) : text;
  }

  const translated = enOverrides[normalized];
  if (translated) return preserveWhitespace(text, translated);

  if (cjkPattern.test(normalized)) {
    return preserveWhitespace(text, englishFallback(normalized));
  }

  return text;
}

export function containsCjk(text: string) {
  return cjkPattern.test(text);
}
