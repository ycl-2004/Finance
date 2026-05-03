# ThisWeb.dev / 高级非卡片化 UI 参考手册

> 目的：这份文件是给之后做 UI 设计、写 Codex Prompt、重构全局视觉系统时使用的参考。核心方向是：参考 thisweb.dev 的炫技感，但不要机械复制；把它拆成可复用的设计原则、交互模式和 React/Tailwind/Framer Motion 实践方法。

> 说明：你前面说的是 `listweb.dev / lessweb.dev`，我这里按你一直讨论的目标网站 `https://www.thisweb.dev/` 来整理。网站是强视觉、强滚动、强 hover 的作品展示型页面；很多效果属于「滚动叙事 + 鼠标交互 + 非卡片化布局」系统。

---

## 0. 总体设计关键词

thisweb.dev 给人的核心感觉不是普通 dashboard，也不是卡片堆叠，而是：

- **Scroll-driven storytelling**：滚动不是翻页面，而是在推进故事。
- **Non-card layout**：内容不是一个个卡片，而是像展览空间里的模块、场景、浮层。
- **Hover discovery**：鼠标移过去才出现细节、图案、提示、图片或辅助信息。
- **Layered depth**：背景、文字、图片、装饰层、动效层彼此叠加。
- **Editorial / gallery feeling**：像艺术展、作品集、杂志版式，而不是 SaaS 管理后台。
- **Motion as identity**：动效不是装饰，而是品牌识别的一部分。

---

## 1. 重点：为什么它不像“卡片套卡片”

普通 UI 常见结构：

```txt
Page container
  └── Section card
        └── Inner card
              └── Small card
```

thisweb.dev 更像：

```txt
Full viewport scene
  ├── Huge typography layer
  ├── Floating visual layer
  ├── Interaction hotspot layer
  ├── Scroll motion layer
  └── Background atmosphere layer
```

所以改你的项目时，重点不是把 card 加阴影，而是要直接换成：

- section-based layout
- full-width storytelling blocks
- overlapping visual elements
- scroll reveal / parallax / mask reveal
- hover-triggered preview
- progressive disclosure

---

# 2. 可复用 UI / 交互模式清单（30 项）

下面每一项都包含：

- **现象**：用户看到什么
- **可以用在哪里**：你的项目适合放在哪些页面
- **实现方式**：React / Tailwind / Framer Motion 思路
- **Codex 指令**：可以直接给 Codex 的实现要求
- **验证位置**：在 thisweb.dev 上如何观察类似感觉

---

## 01. Scroll-triggered Fade In / 滚动渐显

### 现象
元素不是一开始全部出现，而是滚动到某个 section 时，文字、图片、说明逐步 fade in + slide up。

### 可以用在哪里
- 首页 hero 下方的项目介绍
- Canvas view 的每个 section
- Timeline / List view 的条目进入视口时

### 实现方式
用 Framer Motion：

```tsx
<motion.section
  initial={{ opacity: 0, y: 48 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
>
  ...
</motion.section>
```

### Codex 指令
```txt
Add scroll-triggered reveal animation to every major section. Use Framer Motion whileInView. Keep animation subtle: opacity 0→1, y 40→0, duration 0.6–0.8s, custom ease.
```

### 验证位置
打开 thisweb.dev 首页，慢慢向下滚动，观察各个视觉块不是一次性出现，而是随着滚动逐步进入画面。

---

## 02. Scroll-linked Parallax / 视差滚动

### 现象
背景、装饰图形、图片和文字不是同速移动，产生前后层次。

### 可以用在哪里
- 你的首页 hero 背景
- Canvas 页面的背景光斑
- Timeline 页面的年份/节点背景

### 实现方式
用 `useScroll + useTransform`：

```tsx
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, -180]);

<motion.div style={{ y }} className="absolute inset-0 pointer-events-none" />
```

### Codex 指令
```txt
Create a reusable ParallaxLayer component using useScroll and useTransform. Apply slower movement to background gradients and faster movement to foreground decorative elements.
```

### 验证位置
在 thisweb.dev 首页滚动时观察背景和前景的相对速度，视觉不是平面滑动，而是有纵深。

---

## 03. Sticky Scene / 固定场景滚动

### 现象
某个区域 sticky 在屏幕上，用户继续滚动时内部内容发生变化。

### 可以用在哪里
- 你的 Canvas view：左侧固定主题，右侧内容变化
- Timeline view：年份固定，事件流动
- Project detail：项目标题固定，细节逐步展开

### 实现方式
Tailwind：

```tsx
<section className="relative min-h-[220vh]">
  <div className="sticky top-0 h-screen flex items-center">
    ...
  </div>
</section>
```

配合 scroll progress 改 opacity / scale / translate。

### Codex 指令
```txt
Convert long content sections into sticky storytelling scenes. Use a sticky full-height wrapper and animate inner layers based on scroll progress.
```

### 验证位置
在 thisweb.dev 里观察某些视觉内容不会马上离开，而是停留在视窗中，配合滚动切换状态。

---

## 04. Section-as-Scene / 每个区块是一幕场景

### 现象
每个 section 都像独立海报/展览，而不是一个普通 container。

### 可以用在哪里
- Homepage 每个大模块
- About / Self Intro
- Project showcase

### 实现方式
不要写：

```tsx
<Card><CardContent>...</CardContent></Card>
```

改成：

```tsx
<section className="relative min-h-screen overflow-hidden px-8 py-24">
  <BackgroundAtmosphere />
  <MassiveTitle />
  <FloatingMedia />
  <ContentRail />
</section>
```

### Codex 指令
```txt
Stop using nested Card components for major sections. Rebuild each main page block as a full-width scene with background, typography, floating media, and content rail layers.
```

### 验证位置
看 thisweb.dev 的首页结构，重点观察它不是一排排等宽 card，而是以大面积画面和滚动节奏组织内容。

---

## 05. Hover Image Reveal / Hover 出现图片

### 现象
鼠标 hover 某个文字/项目名时，旁边或鼠标附近出现图片、图案、预览。

### 可以用在哪里
- Project list：hover 项目名出现项目截图
- Timeline：hover 某个经历出现照片/标签
- Skills：hover 技能出现 demo / icon / short note

### 实现方式
用 state 记录 hover item：

```tsx
const [active, setActive] = useState<string | null>(null);

<button onMouseEnter={() => setActive(id)} onMouseLeave={() => setActive(null)}>
  {title}
</button>

<AnimatePresence>
  {active && (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 8 }}
      className="pointer-events-none fixed ..."
    >
      <img src={preview} />
    </motion.div>
  )}
</AnimatePresence>
```

### Codex 指令
```txt
Add hover preview behavior to project/title lists. On hover, reveal a floating image or abstract visual preview with AnimatePresence. It should feel like discovery, not a tooltip.
```

### 验证位置
在 thisweb.dev 的作品/链接区域，把鼠标移到可点击文字或项目项上，观察是否出现额外视觉元素、图案或预览层。

---

## 06. Cursor-follow Preview / 预览跟随鼠标

### 现象
hover 后出现的图片不是固定死的，而是轻微跟随 cursor。

### 可以用在哪里
- 项目列表
- 技能列表
- 导航菜单

### 实现方式
监听 mousemove：

```tsx
const [pos, setPos] = useState({ x: 0, y: 0 });

<div onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
  ...
</div>

<motion.div
  animate={{ x: pos.x + 24, y: pos.y + 24 }}
  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
/>
```

### Codex 指令
```txt
Create cursor-following visual previews for hover states. Use spring motion so the preview lags slightly behind the cursor.
```

### 验证位置
在 thisweb.dev 上 hover 可交互元素，观察图案/预览层是否与鼠标位置有关。

---

## 07. Text Mask Reveal / 文字遮罩出现

### 现象
文字不是简单 fade in，而是像被一层 mask 打开，从下往上或从左到右露出。

### 可以用在哪里
- Hero 大标题
- Section heading
- Project title

### 实现方式
结构：外层 overflow-hidden，内层 y 方向进入。

```tsx
<div className="overflow-hidden">
  <motion.h1
    initial={{ y: '100%' }}
    animate={{ y: 0 }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
  >
    Title
  </motion.h1>
</div>
```

### Codex 指令
```txt
Implement masked text reveal for hero and section titles. Wrap text lines in overflow-hidden containers and animate inner text from y:100% to y:0.
```

### 验证位置
刷新 thisweb.dev 首页，观察首屏文字或大标题的进入方式。

---

## 08. Staggered Text / 文字分批出现

### 现象
标题、副标题、说明、按钮不是同时出现，而是按顺序出现。

### 可以用在哪里
- Hero
- Section intro
- Contact page

### 实现方式
Framer Motion variants：

```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 }
};
```

### Codex 指令
```txt
Use staggered animation for headings, descriptions, and CTAs. Avoid animating every tiny element; only animate meaningful hierarchy.
```

### 验证位置
thisweb.dev 的首屏和 section 进入时，观察文案层级不是同一帧出现。

---

## 09. Huge Typography / 巨型字体构图

### 现象
大字本身成为画面元素，而不只是文字内容。

### 可以用在哪里
- 首页 hero
- 页面标题
- Timeline 年份
- Project category

### 实现方式
Tailwind 示例：

```tsx
<h1 className="text-[clamp(4rem,14vw,14rem)] leading-[0.85] tracking-[-0.08em] font-semibold">
  Canvas
</h1>
```

### Codex 指令
```txt
Use oversized editorial typography as a layout element. Titles should define the composition, not just label sections.
```

### 验证位置
thisweb.dev 的首页/标题区域，大字占据主要视觉重量。

---

## 10. Asymmetric Layout / 非对称布局

### 现象
内容不是 3 列等宽卡片，而是左右重量不同、上下错位、留白有节奏。

### 可以用在哪里
- Project showcase
- About me
- Experience

### 实现方式
CSS grid：

```tsx
<section className="grid grid-cols-12 gap-6">
  <div className="col-span-7 col-start-1">...</div>
  <div className="col-span-4 col-start-9 mt-32">...</div>
</section>
```

### Codex 指令
```txt
Replace symmetric card grids with asymmetric editorial grids. Use 12-column layout, offsets, and intentional whitespace.
```

### 验证位置
看 thisweb.dev 页面内容的左右分布，很多地方不是机械居中或等宽排列。

---

## 11. Overlapping Elements / 元素重叠

### 现象
图片、文字、装饰元素相互压住一点点，产生设计感。

### 可以用在哪里
- Canvas 页面
- Project detail
- Hero

### 实现方式
`relative + absolute + z-index`：

```tsx
<div className="relative">
  <h2 className="relative z-20">Title</h2>
  <img className="absolute right-0 top-10 z-10 opacity-80" />
  <div className="absolute inset-0 z-0 blur-3xl" />
</div>
```

### Codex 指令
```txt
Introduce controlled overlap between typography, media, and ambient background elements. Avoid isolated boxes.
```

### 验证位置
观察 thisweb.dev 视觉层不是完全分离，背景/文字/图像存在叠加关系。

---

## 12. Ambient Background / 氛围背景层

### 现象
背景不是纯色，而是有光晕、渐变、噪点、暗角、淡淡的动态层。

### 可以用在哪里
- 全局 layout
- Hero
- 每个 major section

### 实现方式
```tsx
<div className="fixed inset-0 -z-10 bg-[#f6efe7]" />
<div className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-pink-200/30 blur-[120px]" />
<div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.05] mix-blend-multiply noise" />
```

### Codex 指令
```txt
Add a global ambient background system: warm base color, large blurred gradient blobs, subtle noise texture, and no harsh flat white background.
```

### 验证位置
thisweb.dev 的高级感部分来自背景氛围，而不是靠卡片边框。

---

## 13. Soft Gradient Glow / 柔和渐变光

### 现象
局部有柔和光晕，hover 或 scroll 时略微变化。

### 可以用在哪里
- CTA
- 当前选中的项目
- Hero 装饰层

### 实现方式
```tsx
<div className="absolute -inset-8 rounded-full bg-gradient-to-r from-pink-300/30 via-amber-200/20 to-blue-200/20 blur-3xl" />
```

### Codex 指令
```txt
Use soft gradient glow for emphasis. Do not use neon-heavy glow. Keep opacity low and blur high.
```

### 验证位置
观察 thisweb.dev 的重点区域，通常不是硬边阴影，而是柔和的光感。

---

## 14. Glass Layer / 轻量毛玻璃层

### 现象
部分 floating panel 有透明、模糊、轻边框，但不是传统卡片。

### 可以用在哪里
- 导航栏
- 浮动状态条
- 小型说明面板

### 实现方式
```tsx
<div className="backdrop-blur-xl bg-white/30 border border-white/30 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
  ...
</div>
```

### Codex 指令
```txt
Use glass layers only for floating UI controls, not for every content section. Keep blur subtle and borders low-contrast.
```

### 验证位置
thisweb.dev 的浮层/导航区域如果有透明感，重点是轻而克制。

---

## 15. Minimal Sticky Navigation / 极简固定导航

### 现象
导航存在感低，但一直可用；不会抢主视觉。

### 可以用在哪里
- 全站 nav
- 页面内 section jump

### 实现方式
```tsx
<nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-white/40 px-4 py-2 backdrop-blur-xl">
  ...
</nav>
```

### Codex 指令
```txt
Redesign navigation as a minimal floating/sticky control. It should feel like a tool overlay, not a header bar.
```

### 验证位置
观察 thisweb.dev 的导航/入口，不是传统大 header，而更像视觉系统中的一层。

---

## 16. Magnetic Button / 磁吸按钮

### 现象
鼠标靠近按钮时，按钮或内部文字有轻微吸附/移动感。

### 可以用在哪里
- CTA
- Contact button
- Project link

### 实现方式
简化版：hover scale + translate；进阶版：根据 cursor 计算偏移。

```tsx
<motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
  Open project
</motion.button>
```

### Codex 指令
```txt
Add subtle magnetic button interactions to primary CTAs. Avoid exaggerated movement; use spring transitions.
```

### 验证位置
hover thisweb.dev 的可点击元素，观察按钮/文字是否有轻微响应，而不是只有颜色变化。

---

## 17. Hover Morphing Background / hover 背景变形

### 现象
鼠标移到一个 item，背景形状、渐变或图案随之变化。

### 可以用在哪里
- Project list
- Skill tags
- Navigation menu

### 实现方式
用 shared layout：

```tsx
{active === id && (
  <motion.div
    layoutId="hover-bg"
    className="absolute inset-0 rounded-full bg-white/40 backdrop-blur-xl"
  />
)}
```

### Codex 指令
```txt
Implement shared hover background using Framer Motion layoutId. The active background should morph between items smoothly.
```

### 验证位置
在 thisweb.dev 的菜单/列表 hover 时，观察背景或强调层是否流动到当前 item。

---

## 18. Progressive Disclosure / 渐进式信息展示

### 现象
默认只展示最重要信息，hover / click / scroll 后才展开细节。

### 可以用在哪里
- Resume project bullets
- Timeline details
- 技能说明

### 实现方式
默认只显示 title + one-line summary，hover 后显示 tags / metrics / link。

### Codex 指令
```txt
Reduce initial information density. Show only title and key sentence by default; reveal tags, metadata, and details on hover or section focus.
```

### 验证位置
thisweb.dev 的高级感很大一部分来自信息密度控制，不会把所有文字一次性塞出来。

---

## 19. Horizontal Scroll Showcase / 横向作品展示

### 现象
某些区块在垂直滚动时，内部内容横向移动，像 gallery。

### 可以用在哪里
- Project gallery
- UI inspiration collection
- Timeline

### 实现方式
sticky 外层 + translateX：

```tsx
const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

<motion.div style={{ x }} className="flex gap-12">
  ...
</motion.div>
```

### Codex 指令
```txt
Create one horizontal-scroll showcase section using sticky vertical scroll mapped to translateX. Use it for featured projects only.
```

### 验证位置
如果 thisweb.dev 有横向/错位作品流，观察它如何用滚动推动 gallery，而不是普通网格列表。

---

## 20. Masked Image Reveal / 图片遮罩揭示

### 现象
图片不是直接出现，而是被 clip-path / scale / mask 逐步打开。

### 可以用在哪里
- Project screenshot
- About portrait
- Visual preview

### 实现方式
```tsx
<motion.div
  initial={{ clipPath: 'inset(20% 20% 20% 20%)', scale: 1.08 }}
  whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
  className="overflow-hidden"
>
  <img className="h-full w-full object-cover" />
</motion.div>
```

### Codex 指令
```txt
Add masked image reveal for large media. Use clip-path or overflow-hidden scale reveal instead of simple fade-in.
```

### 验证位置
thisweb.dev 的视觉图片/图形进入时，观察是否有遮罩、裁切或 scale 的过程。

---

## 21. Floating Tags / 浮动标签

### 现象
标签不是规整 pill list，而是像注释、标记、坐标点一样浮在画面中。

### 可以用在哪里
- Skill tags
- Project metadata
- Timeline annotations

### 实现方式
```tsx
<span className="absolute left-[12%] top-[30%] rounded-full border border-black/10 bg-white/30 px-3 py-1 text-xs backdrop-blur-md">
  React
</span>
```

### Codex 指令
```txt
Turn metadata into floating annotations instead of inline tag rows. Position them intentionally around the main visual.
```

### 验证位置
观察 thisweb.dev 是否把小信息当作画面的一部分，而不是机械排列的 chips。

---

## 22. Editorial Split / 杂志式左右分栏

### 现象
左边大标题，右边短文案或交互列表；版式像杂志，不像表单。

### 可以用在哪里
- About
- Experience
- Project intro

### 实现方式
```tsx
<section className="grid min-h-screen grid-cols-12 items-center gap-8">
  <h2 className="col-span-7 text-[10vw] leading-none">Work</h2>
  <div className="col-span-4 col-start-9">...</div>
</section>
```

### Codex 指令
```txt
Use editorial split layouts for content-heavy sections. Large typographic anchor on one side, concise content rail on the other.
```

### 验证位置
thisweb.dev 页面大多有强构图感，而不是内容平均分布。

---

## 23. Depth Through Scale / 用比例制造层级

### 现象
重要元素非常大，次要元素非常小，中间层级少，所以画面有冲击力。

### 可以用在哪里
- Hero
- Section title
- Project numbering

### 实现方式
建立 typography scale：

```txt
Display: clamp(72px, 14vw, 220px)
Hero: clamp(48px, 9vw, 128px)
Section: clamp(36px, 6vw, 88px)
Body: 16px–20px
Caption: 11px–13px
```

### Codex 指令
```txt
Create a typography scale with extreme contrast between display text and body text. Avoid medium-sized everything.
```

### 验证位置
看 thisweb.dev：高级感来自大胆字号和留白，而不是每个模块都差不多大。

---

## 24. Soft Page Transition / 页面切换动效

### 现象
进入/离开页面时有整体 fade / slide / mask，而不是突然跳转。

### 可以用在哪里
- Route transition
- Project detail open
- Modal / overlay

### 实现方式
用 AnimatePresence 包 route：

```tsx
<AnimatePresence mode="wait">
  <motion.main
    key={pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    {children}
  </motion.main>
</AnimatePresence>
```

### Codex 指令
```txt
Add global page transition using AnimatePresence. Keep transitions elegant and short, around 300–500ms.
```

### 验证位置
在 thisweb.dev 点击导航或切换页面，观察是否有顺滑过渡感。

---

## 25. Micro Interaction Feedback / 微交互反馈

### 现象
hover、click、focus 都有反馈，用户感觉页面是“活的”。

### 可以用在哪里
- 所有按钮
- 所有链接
- 所有可点击项目

### 实现方式
统一 motion preset：

```tsx
const hoverLift = {
  whileHover: { y: -3, scale: 1.015 },
  whileTap: { scale: 0.985 },
  transition: { type: 'spring', stiffness: 260, damping: 22 }
};
```

### Codex 指令
```txt
Create reusable motion presets for hover, tap, reveal, and page transitions. Apply them consistently instead of writing random animations per component.
```

### 验证位置
thisweb.dev 的可交互元素通常不会是死的，hover/click 都有小反馈。

---

## 26. Noise Texture / 细微噪点质感

### 现象
背景不是完全干净的数字纯色，有一点纸张/胶片质感。

### 可以用在哪里
- 全局背景
- Hero
- Overlay

### 实现方式
CSS：

```css
.noise::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.04;
  background-image: url('/noise.png');
  mix-blend-mode: multiply;
}
```

或者用 CSS radial-gradient 生成轻微噪点。

### Codex 指令
```txt
Add a subtle global noise texture overlay with very low opacity. It should add material feeling without being visible as a pattern.
```

### 验证位置
观察 thisweb.dev 的背景/图片过渡处，是否有微妙纹理，而不是纯色塑料感。

---

## 27. Large Negative Space / 大量留白

### 现象
内容之间距离很大，页面呼吸感强。

### 可以用在哪里
- 全局 section spacing
- Project showcase
- About intro

### 实现方式
```tsx
<section className="px-6 py-32 md:px-12 md:py-48 lg:py-64">
```

### Codex 指令
```txt
Increase vertical rhythm and negative space. Do not fill every blank area with content. Use emptiness as part of the composition.
```

### 验证位置
thisweb.dev 高级感来自“敢留白”，不是把内容塞满。

---

## 28. Visual Rhythm / 视觉节奏变化

### 现象
页面不是每个 section 都一样高、一样布局；有密有疏，有大有小。

### 可以用在哪里
- 全局 homepage
- Portfolio / project sections

### 实现方式
设计 section 类型：

```txt
Hero Scene: 100vh
Intro Scene: 70vh
Feature Scene: 140vh sticky
Gallery Scene: 180vh horizontal scroll
Contact Scene: 80vh
```

### Codex 指令
```txt
Create varied section rhythms. Avoid repeating identical section heights and layouts. The page should feel like a directed sequence.
```

### 验证位置
滚动 thisweb.dev，观察每段节奏是否有变化，而不是模板重复。

---

## 29. Non-Rectangular Emphasis / 非矩形强调

### 现象
重点不一定通过 card 表达，可能是线条、圆形、mask、背景区域、巨大编号。

### 可以用在哪里
- 当前 active item
- Experience highlight
- Project feature

### 实现方式
```tsx
<div className="absolute -left-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full border border-black/10" />
```

### Codex 指令
```txt
Use circles, lines, masks, and typographic emphasis instead of rectangular cards for highlighting important content.
```

### 验证位置
thisweb.dev 的视觉强调通常不依赖传统边框卡片。

---

## 30. Design Tokens / 设计系统 token 化

### 现象
全站感觉一致，因为颜色、字号、动效、间距都像同一个系统。

### 可以用在哪里
- 全局 UI 重构第一步

### 实现方式
建立 tokens：

```ts
export const motionPreset = {
  softReveal: {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  },
  hoverLift: {
    whileHover: { y: -3, scale: 1.015 },
    whileTap: { scale: 0.985 }
  }
};
```

Tailwind theme：

```ts
theme: {
  extend: {
    colors: {
      paper: '#F7F0E8',
      ink: '#171412',
      blush: '#EAC7C7',
      mist: '#DDE7EA'
    },
    borderRadius: {
      organic: '2rem'
    }
  }
}
```

### Codex 指令
```txt
Before refactoring pages, create design tokens for colors, typography, spacing, radius, shadows, and motion presets. Use those tokens across the entire UI.
```

### 验证位置
thisweb.dev 全站视觉一致，不像临时拼组件。

---

# 3. 你的项目应该怎么套用

## A. Homepage

目标：从普通首页改成「作品集式入口」。

推荐组合：

- Huge Typography
- Ambient Background
- Text Mask Reveal
- Cursor-follow Preview
- Section-as-Scene
- Soft Page Transition

结构建议：

```txt
Hero Scene
  ├── 巨型标题
  ├── 一句定位说明
  ├── 浮动关键词
  ├── 背景渐变光
  └── scroll cue

Featured Work Scene
  ├── 左侧大字 Work
  ├── 右侧 hover project list
  └── hover 出现项目预览图

About / Self Scene
  ├── 非对称图文
  ├── 浮动标签：MBTI / Motto / Workflow / Agent Native
  └── 轻微 parallax
```

---

## B. Canvas View

目标：不要再像 card board，要像「个人宇宙地图」。

推荐组合：

- Floating Tags
- Overlapping Elements
- Ambient Background
- Progressive Disclosure
- Hover Preview
- Scroll-triggered Reveal

结构建议：

```txt
Canvas View
  ├── 背景层：soft gradient + noise
  ├── 中心主线：你的个人 narrative
  ├── 周围模块：self / workflow / projects / content / contact
  ├── hover 后出现解释
  └── click 后进入 detail
```

Codex 指令：

```txt
Refactor Canvas View from card layout into a spatial narrative map. Replace boxed cards with floating content clusters, annotation tags, and hover-revealed details. Keep the same data, but redesign presentation.
```

---

## C. Timeline View

目标：不要做普通时间线，要做 scroll-driven 年份叙事。

推荐组合：

- Sticky Scene
- Huge Typography
- Scroll-linked Animation
- Progressive Disclosure
- Masked Image Reveal

结构建议：

```txt
Timeline View
  ├── 左侧 sticky year / phase title
  ├── 右侧 experience events
  ├── 当前 active event 高亮
  ├── hover 出现图片/关键词
  └── scroll 改变背景氛围
```

Codex 指令：

```txt
Rebuild Timeline View as a sticky scroll narrative. Keep the year/phase fixed while entries reveal on scroll. Avoid card rows; use editorial event blocks with large typography and subtle separators.
```

---

## D. List View

目标：不是普通 list，而是「高级目录 / index」。

推荐组合：

- Hover Image Reveal
- Shared Hover Background
- Editorial Split
- Large Negative Space
- Micro Interaction

结构建议：

```txt
List View
  ├── 左侧 category index
  ├── 右侧 item list
  ├── hover item 显示 preview
  ├── active item 背景 morph
  └── click 进入 detail
```

Codex 指令：

```txt
Redesign List View as an editorial index. Remove list cards. Use large text rows, subtle dividers, hover previews, and active background morphing.
```

---

# 4. 全局 UI 重构顺序

不要一次性全改，否则容易崩。建议顺序：

## Phase 1：建立设计系统

- color tokens
- typography scale
- spacing scale
- motion presets
- background atmosphere component
- reusable reveal component

## Phase 2：首页做标杆

先把 homepage 做到最漂亮，让它成为全站 reference。

## Phase 3：Canvas View

把主要内容从 card map 改成 spatial narrative map。

## Phase 4：Timeline / List

把辅助视图改成同一套视觉语言。

## Phase 5：全局 polish

- hover consistency
- scroll consistency
- page transition
- mobile responsive
- performance check

---

# 5. 可以直接给 Codex 的总 Prompt

```txt
You are a senior frontend engineer and UI systems designer.

We are refactoring this project into a premium, non-card-based, motion-driven UI inspired by https://www.thisweb.dev/.

Current problem:
- The UI looks like cards inside cards.
- The layout feels generic and dashboard-like.
- There is not enough motion, visual hierarchy, or design identity.

Target:
- Editorial, immersive, non-card UI.
- Section-as-scene layout.
- Strong typography.
- Scroll-triggered reveal.
- Scroll-linked parallax where useful.
- Hover image/visual previews.
- Floating annotations instead of tag rows.
- Ambient background with soft gradients and subtle noise.
- Consistent motion presets using Framer Motion.

Important rules:
1. Keep existing data and app logic intact.
2. Refactor presentation/UI only.
3. Avoid generic Card components for major sections.
4. Replace nested boxes with full-width scenes, floating content clusters, and editorial layouts.
5. Create reusable design tokens before modifying many pages.
6. Implement one high-quality reference page first, then apply the system globally.

Implementation steps:
1. Audit current components and identify nested card patterns.
2. Create design tokens: colors, typography, spacing, shadow, radius, motion.
3. Create reusable components:
   - AmbientBackground
   - RevealSection
   - MagneticButton
   - HoverPreviewList
   - FloatingAnnotation
   - StickyStorySection
4. Refactor homepage as the reference implementation.
5. Refactor Canvas View into a spatial narrative map.
6. Refactor Timeline View into a sticky scroll narrative.
7. Refactor List View into an editorial index with hover previews.
8. Ensure responsive behavior and no broken functionality.

Design quality bar:
Every section should feel like a designed scene, not a container.
If a layout looks like a card grid, redesign it.
```

---

# 6. 实现时要避免的坑

## 01. 不要过度动画
动效太多会廉价。重点 section 才需要复杂动效。

## 02. 不要所有东西都 glassmorphism
毛玻璃只适合浮层、导航、小面板；大面积用会俗。

## 03. 不要假 3D
没有目的的 rotateX / rotateY 会像模板。除非跟滚动/hover 有明确关系。

## 04. 不要让可读性牺牲给炫技
正文、项目说明、按钮必须清楚。

## 05. 不要把所有模块都做成浮动
需要主视觉，也需要稳定的信息结构。

## 06. 移动端要降级
移动端 hover 不存在，所以 hover preview 要改成 tap / expand。

---

# 7. 技术选择建议

## 推荐

- React
- Tailwind CSS
- Framer Motion / Motion for React
- CSS variables
- IntersectionObserver / whileInView
- useScroll / useTransform

## 进阶可选

- GSAP ScrollTrigger：更复杂的滚动叙事
- Lenis：顺滑滚动
- Three.js / React Three Fiber：如果未来要做 3D 视觉

## 先不要上

- 太重的 WebGL 背景
- 复杂 shader
- 没有设计目的的 3D

---

# 8. 最小可行版本 MVP

如果只想先快速让 UI 变高级，先做这 8 个：

1. Ambient background
2. Huge typography
3. Section-as-scene layout
4. Scroll reveal
5. Hover preview list
6. Floating annotations
7. Soft page transition
8. Design tokens

这 8 个做完，你的项目会马上从「卡片模板感」变成「设计作品集感」。

---

# 9. 参考资料

- thisweb.dev: https://www.thisweb.dev/
- Motion for React scroll animations: https://motion.dev/docs/react-scroll-animations
- Motion for React docs: https://motion.dev/docs/react
- MDN CSS scroll-driven animations: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations
- MDN CSS transitions: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transitions
- MDN CSS transforms: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transforms
- MDN :hover pseudo-class: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:hover

---

# 10. 一句话总结

你要学 thisweb.dev，不是学某一个按钮或某一个卡片，而是学它的系统：

```txt
大字构图 + 场景式布局 + 滚动叙事 + hover 探索 + 层次氛围 + 克制信息密度
```

把这个系统套进你的项目，你的 UI 才会真正从「组件堆叠」变成「设计作品」。
