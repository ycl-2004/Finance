# QM Financial Learning Hub UI Style Guide

> 用途：讓後續設計師、前端工程師或其他協作者，光看這份文件就能判斷本站目前 UI 風格、General Styles、配色邏輯，以及未來整改時應該保留或修正什麼。

## 1. 風格一句話

本站目前是 **加拿大金融機構感的中文顧問會前準備工作台**，不是行銷 landing page，也不是單純文檔站。

它的視覺目標是：

- 可信
- 克制
- 清晰
- 有秩序
- 小白友好
- 顧問機構專業感
- 適合長文閱讀和客戶教育

如果用英文關鍵詞描述：

- Advisor-grade
- Calm
- Structured
- Trust-first
- Canadian financial institution
- Editorial
- Knowledge-led
- Warm neutral
- Low-noise fintech
- Advisor readiness desk

## 2. 不要變成什麼

後續整改時，最重要的是不要把它改成以下幾種方向：

- 不要變成金融銷售頁：大 hero、誇張數字、產品 CTA、強銷售感。
- 不要變成普通文檔站：只剩左側導航 + Markdown 文章。
- 不要變成 AI 工具頁：大聊天框、紫色漸層、科技感過重。
- 不要變成投資交易平台：深色數據面板、K 線、收益率暗示。
- 不要變成課程廣告頁：過度激勵、過度包裝、低信任感。

核心判斷標準：

> 首頁、學習路線、生活場景必須比文章列表更重要。使用者應該從「我要學什麼 / 我遇到什麼問題」進入，而不是從文件夾進入。

## 3. 當前設計參考

目前設計語言接近：

- **Stripe / Wise**：金融科技的信任感、留白、精緻但克制的層級，適合加拿大金融服務語境。
- **Mintlify**：文檔型知識產品、清晰導航、可閱讀正文、低干擾資訊架構。

但本站不模仿品牌。只是借用：

- 清楚的資訊層級。
- 乾淨的內容區塊。
- 低噪音配色。
- 專業、可信、清醒的產品語氣。
- 真實資料準備工作台的視覺語言，而不是純卡片堆疊。
- 像整理文件、勾選清單、建立會議問題，而不是瀏覽一組互相競爭的卡片。

首頁主視覺使用生成資產 `public/images/qm-meeting-prep-hero.png`：

- 內容是加拿大地圖、平板規劃介面、紙本清單和資料夾。
- 不出現人臉、握手、收益圖、美元符號或可讀敏感文字。
- 後續新增 hero 或插圖時，應沿用「資料準備 / 顧問會議 / 加拿大語境 / 克制金融產品」方向。

## 4. 色彩系統

目前全域色彩定義在 `app/globals.css` 的 `:root`。

| Token | Hex / Value | 用途 | 感覺 |
| --- | --- | --- | --- |
| `--bg` | `#f4f0e7` | 全站背景 | 暖白、紙感、閱讀友好 |
| `--surface` | `rgba(255,255,255,0.92)` | 卡片、正文、面板 | 乾淨、正式、稍有層次 |
| `--surface-muted` | `#f0ece2` | hover、弱背景、表頭 | 溫和分區 |
| `--text` | `#18282d` | 主文字 | 深墨綠黑，不刺眼 |
| `--muted` | `#68736f` | 輔助文字 | 中性灰綠、穩定 |
| `--border` | `rgba(47,64,57,0.16)` | 邊框 | 低對比、分隔資訊 |
| `--accent` | `#0f6b63` | 主強調色 | 沉穩藍綠 |
| `--accent-strong` | `#084a45` | 主按鈕、重要互動 | 更深、更可信 |
| `--accent-soft` | `#e3f2ef` | tag / 柔和強調背景 | 不刺眼的提示 |
| `--gold` | `#9a7130` | 少量金棕強調 | 文件夾、資料標籤、機構感 |
| `--warning` | `#8a5b14` | 警示文字 | 合規提醒 |
| `--warning-soft` | `#fff5df` | 教育邊界提示背景 | 溫和但明顯 |
| `--danger` | `#8f3434` | 高風險提示預留 | 嚴肅風險 |

### 色彩性格

整體是 **暖白紙感 + 深海軍藍 / 沉穩藍綠 + 中性灰 + 少量金棕提示**。

它不走傳統金融常見的：

- 金色奢華
- 深藍企業模板
- 大面積黑色
- 紫藍 AI 漸層
- 高飽和科技色

### 改色原則

可以調整：

- 背景白度。
- accent 的深淺。
- muted 灰階。
- warning 的強弱。

不建議：

- 把主色改成亮藍、亮紫、亮橘。
- 大面積使用漸層。
- 用紅綠代表投資結果。
- 把整站做成深色模式作為唯一主題。

## 5. Typography / 字體語氣

目前使用系統字體堆疊：

```css
Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
"Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif
```

### 字體語氣

- 中文閱讀優先。
- 字體要穩、清楚、不要裝飾性。
- 不用 serif，不做雜誌感。
- 不做過度年輕化、遊戲化、可愛化。

### 層級

目前大致規則：

- `h1`：頁面主題，`2rem` 到 `3.35rem`。
- `h2`：區塊標題，約 `1.45rem`。
- `h3`：卡片或小節標題，約 `1.06rem`。
- `.lead`：頁面說明，較大、muted。
- `.eyebrow`：英文/分類提示，小而粗，使用 accent。

整改時要注意：

- 不要讓卡片內標題像 hero 一樣大。
- 不要用負 letter-spacing。
- 不要用過多字重。
- 中文長段落要保持足夠 line-height，目前 `1.7` 是合理的。

## 6. Layout / 版面語言

### 整體寬度

```css
--max-page: 1180px;
```

內容不是 full-bleed，也不是窄文檔。它是中等寬度的知識產品頁面。

### 首頁

首頁是 readiness desk，不是 marketing hero，也不是 dashboard card wall。

目前首屏結構：

- 左：產品定位、開始學習、按問題學習、查術語、教育邊界。
- 右：今天從這裡開始，顯示第一個學習階段。
- 下方：生活場景、主題知識庫、工具、案例。

首頁判斷標準：

- 使用者 10 秒內知道這是金融學習中心。
- 使用者能選「開始學習」或「按問題學習」。
- 不能只看到主題卡片。
- 首屏必須像「資料準備桌面 / 會前工作台」，不是模擬 SaaS 控制台。

### 文章頁

文章頁是三欄布局：

- 左：學習入口 / 主題導航。
- 中：文章 header + 正文。
- 右：學習節點、相關場景、下一步。

這是為了避免文章頁退化成 Markdown 容器。

### 移動端

在 `980px` 以下：

- 所有多欄布局變成單欄。
- sidebar/right rail 取消 sticky。
- header 改成垂直堆疊。
- 搜索框全寬。

整改時要保留：

- 移動端正文優先。
- 表格可以橫向滾動。
- CTA 不要擠成一排。

## 7. Component Style / 元件語言

### Card / Surface

卡片不再是主要版面語言。新的預設是：

- 內容區塊優先使用分隔線、列表、步驟軌道、左右欄和留白。
- 重複且可點擊的入口才使用卡片。
- 卡片 radius 保持 6–8px。
- 陰影極少使用；優先靠 border、色塊和 spacing 建立層級。
- hover 可以微動，但不能讓所有 surface 都像浮起的 SaaS 卡片。

卡片用途：

- 主題入口。
- 生活場景。
- 案例。
- 工具入口。

不要用卡片包整個頁面 section；卡片應該是可點擊或重複資訊單位。首頁、planning、documents 這類核心流程頁應該更像工作台和清單，而不是卡片牆。

### Button

按鈕特徵：

- 6px radius。
- min-height 42px。
- 主按鈕使用 `--accent-strong`。
- 次按鈕白底 + border。

按鈕語氣：

- 清楚命令：開始學習、按問題學習、查術語。
- 不使用刺激性 CTA，例如「立即致富」「馬上規劃你的財富」。

### Tags

Tag 用於：

- 難度。
- 閱讀時間。
- 校準日期。
- 分類。

Tag 是輔助資訊，不是裝飾。

### Boundary Notice

`.boundary` 是本站非常重要的信任元件。

用途：

- 顯示教育用途。
- 提醒不是個人建議。
- 降低金融內容誤解風險。

視覺：

- 淡琥珀背景 `#fff4df`。
- 暖棕色文字。
- 不用紅色恐嚇。

整改時不能移除，也不能藏到 footer。

## 8. Interaction / 互動語氣

互動要安靜、可預期：

- hover 只做輕微背景變化、邊框變化、微上浮。
- 搜索結果是清楚列表，不做複雜動畫。
- focus state 明顯，保留可及性。
- 不做大範圍 motion、parallax、orb、bokeh、炫技動畫。

本站的互動應該像顧問遞給你一份整理好的學習資料，而不是像 app 在推銷你點擊。

## 9. General Style Prompt

如果要讓另一個設計師或 AI 根據本站風格延伸新頁面，可以使用下面這段：

```text
Design a professional Chinese Canadian financial education interface for a trust-first advisor knowledge hub. The style should feel calm, structured, editorial, and credible. Use a warm off-white background, white content surfaces, subtle neutral borders, dark neutral text, muted gray secondary text, and restrained teal accents. Prioritize learning paths, life-situation entry points, clear metadata, and non-advice boundary notices. Avoid marketing-heavy hero sections, decorative gradients, purple AI aesthetics, financial sales language, oversized cards, and trading-platform visuals. The UI should guide beginners from dashboard to learning path or life scenario, then into articles, glossary, cases, and document preparation.
```

中文版本：

```text
設計一個專業、可信、克制的中文加拿大金融教育介面。它應該像顧問機構的知識中心，而不是金融銷售頁或普通文檔站。使用暖白背景、白色內容面、低對比中性邊框、深色主文字、灰色輔助文字和沉穩藍綠色強調。優先呈現首頁 dashboard、學習路線、生活場景、文章 metadata 和教育邊界提醒。避免大面積漸層、紫色 AI 風格、誇張 hero、投資交易視覺、強銷售 CTA 和過度卡片化。使用者應該能從「開始學習」或「按問題學習」進入，而不是只能從文章列表進入。
```

## 10. UI Audit Checklist

後續整改時，用這份清單快速判斷是否偏離原風格。

### 產品路徑

- [ ] 首頁是否仍然優先引導「開始學習」？
- [ ] 首頁是否仍然有「生活場景 / 按問題學習」？
- [ ] 主題知識庫是否仍是深度入口，而不是唯一入口？
- [ ] 文章頁是否有下一步、相關場景、metadata，而不是只有正文？

### 視覺風格

- [ ] 是否仍然是暖白 + 白色 surface + 沉穩藍綠？
- [ ] 是否避免了大面積深藍、金色、紫色、漸層？
- [ ] 邊框和陰影是否克制？
- [ ] 卡片是否只用於可點擊或重複資訊單位？

### 內容信任

- [ ] 教育邊界是否在首頁、文章頁、生活場景頁可見？
- [ ] CTA 是否沒有銷售或承諾語氣？
- [ ] 是否沒有暗示具體產品、收益或個人建議？

### 中文閱讀

- [ ] 中文長文 line-height 是否舒適？
- [ ] 表格在手機上是否不溢出？
- [ ] 導航文案是否用使用者語言，而不是內部分類？
- [ ] 英文術語是否保留，但有中文語境？

## 11. 未來整改方向

可以優先改善：

1. 增加首頁資訊密度的節奏差異，讓「生活場景」更像主入口。
2. 為文章頁增加「小白重點」自動區塊，而不是只依賴正文。
3. 增加 active navigation state，讓使用者知道自己在哪裡。
4. 增加可視化學習進度，但先用本地狀態，不急著做帳號。
5. 增加更精細的 mobile navigation，避免 header 在手機上太長。

暫時不建議：

1. 不急著做深色模式。
2. 不急著加入大量插圖。
3. 不急著加入複雜動畫。
4. 不急著把它改成 AI chat-first 介面。
5. 不急著做完整品牌重設。

## 12. 當前 CSS 來源

目前主要 style source：

- `app/globals.css`

關鍵頁面：

- `app/page.tsx`
- `app/learn/page.tsx`
- `app/scenarios/page.tsx`
- `app/articles/[...slug]/page.tsx`

若未來要重構 UI，建議先保留現有 token，再逐步把全域 class 拆成 component-level styles 或 design tokens，而不是一次性重寫整個視覺系統。
