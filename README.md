# QM Financials 中文金融知识库

## Purpose

这个项目用来学习和整理 QM Financials Inc. 业务背后的加拿大金融知识。

当前目标不是做销售材料，也不是让 AI 给客户自动建议，而是先把公司业务、金融产品、账户规则、风险点和常见规划流程整理成一个干净、可检索、适合小白学习的知识库。

## QM Financial Learning Hub

本项目现在会把 `knowledge/` 里的 Markdown 知识库发布成一个公开中文学习网站：

- 首页 dashboard：从学习路线或生活场景进入。
- 学习路线：按小白学习顺序组织文章。
- 生活场景：按真实问题进入知识库，例如首次买房、账户区别、保险、退休。
- 主题知识库：按顾问服务方向深入阅读。
- 术语表：中英文金融术语搜索。
- 案例练习：用虚拟场景训练资料整理和问题边界。
- 资料清单：会议前可给客户预习的资料准备页面。

第一版不接 AI、不登录、不保存客户资料、不推荐具体产品。

## Development Commands

| Command | Description |
| --- | --- |
| `npm install` | Install app dependencies |
| `npm run dev` | Start local dev server |
| `npm run validate:knowledge` | Validate Markdown content, links to structured data, and public-use boundaries |
| `npm test` | Run content and route tests |
| `npm run build` | Build the production site and generate a static search index |
| `npm run start` | Start the production server after build |

## GitHub Pages Deployment

The repository is configured to deploy through GitHub Actions to GitHub Pages.

- Workflow: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- Target branch: `main`
- Static output: `out/`
- Pages URL after deployment: `https://ycl-2004.github.io/Finance/`

For GitHub Pages, the workflow sets `GITHUB_PAGES=true`, which tells Next.js to export a static site under the `/Finance` base path. Local development still runs at the root path with `npm run dev`.

## Company Snapshot

QM Financials Inc. 是一家位于大温地区的金融服务/财富规划团队。公开官网定位是 financial planning and wealth management，核心服务对象可能包括个人、家庭、新移民、首次买房者、退休规划客户和小企业/企业主。

本项目关注 qm-financials.com 对应的 QM Financials Inc.，不要和 qmfinancials.com 对应的 Quantum Financials Service 混同。

更完整的公司基础资料见 [knowledge/company-profile.md](knowledge/company-profile.md)。

## Main Service Directions

QM Financials 公开呈现的主要服务方向包括：

- 综合财务规划
- 投资规划和投资组合策略
- 加拿大注册账户规划：TFSA、RRSP、FHSA、RESP、RDSP
- 保险和风险管理：人寿、重疾、伤残、意外、年金等
- 房贷和贷款方案：首次买房、refinancing、利率与还款策略
- 税务优化和资产保护
- 退休规划与财富传承
- 小企业/企业主财务咨询

## Knowledge Base Layout

知识库按服务方向拆成独立资料夹，方便之后单独学习和给 AI 检索：

- [knowledge/00-registry.md](knowledge/00-registry.md): 知识库主索引
- [knowledge/company-profile.md](knowledge/company-profile.md): 公司基础资料
- [knowledge/glossary.md](knowledge/glossary.md): 金融术语表
- [knowledge/01-comprehensive-financial-planning](knowledge/01-comprehensive-financial-planning): 综合财务规划
- [knowledge/02-investment-planning-portfolio-strategy](knowledge/02-investment-planning-portfolio-strategy): 投资规划和投资组合策略
- [knowledge/03-canadian-registered-accounts](knowledge/03-canadian-registered-accounts): 加拿大注册账户规划
- [knowledge/04-insurance-risk-management](knowledge/04-insurance-risk-management): 保险和风险管理
- [knowledge/05-mortgage-lending](knowledge/05-mortgage-lending): 房贷和贷款方案
- [knowledge/06-tax-optimization-asset-protection](knowledge/06-tax-optimization-asset-protection): 税务优化和资产保护
- [knowledge/07-retirement-estate-planning](knowledge/07-retirement-estate-planning): 退休规划与财富传承
- [knowledge/08-small-business-owner-financial-consulting](knowledge/08-small-business-owner-financial-consulting): 小企业/企业主财务咨询

## Content Rules

- 内容以中文为主，面向小白学习。
- 写实际信息、规则、概念、流程、风险点和需要确认的问题。
- 不写泛泛营销话术。
- 正文尽量不插外部链接；使用到的来源统一放在每个 Markdown 文件底部，避免打断学习阅读。
- 不推荐具体证券、基金、保险、贷款或税务结构。
- 不把教育内容写成个人投资、保险、房贷、税务或法律建议。
- 所有会变动的限额、税率、贷款规则、政府补助和监管要求，实际使用前都要重新核对。

## Current Status

当前版本已从纯学习网站推进为会前准备平台：首页、开始规划、资料清单、场景流程、预约摘要、隐私说明和搜索入口已经串起来。

最近一次 80 分整改补强：

- 接入 Header 全站搜索。
- 新增报税准备和现金流/债务整理场景。
- 新增两套资料清单和两篇小白文章。
- 预约流程改为本机摘要 + 电话/邮件确认，避免假提交。
- 关于页增加专业人士验证入口，新增隐私说明。
- 去掉外部 stock hero 图，改为更克制的产品式视觉。

详细说明见 [docs/product/80-point-upgrade-notes.md](docs/product/80-point-upgrade-notes.md)。

## 资料来源

- QM Financials Inc. official site: https://qm-financials.com/
- QM Financials Inc. public content file: https://qm-financials.com/content/translations.json
