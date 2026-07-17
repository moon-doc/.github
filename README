<div align="center">

<!-- Hero Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:16213e,100:0f3460&height=220&section=header&text=P-Moon&fontSize=80&fontColor=e0e0e0&animation=fadeIn&fontAlignY=32&desc=Crafting%20Elegant%20Document%20Experiences&descSize=24&descAlignY=52&descColor=a0a0c0" width="100%" />

<!-- Typing SVG -->
<a href="https://github.com/p-moon">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&duration=3000&pause=1000&color=60A0DC&center=true&vCenter=true&multiline=true&repeat=true&width=600&height=100&lines=%E2%80%8B%E2%80%8B%F0%9F%91%8B%20Welcome%20to%20P-Moon%20Organization;Markdown%20%E2%86%92%20HTML%20%E2%86%92%20PDF%20%E2%86%92%20Live%20Preview;Cross-Platform%20%7C%20Web%20%7C%20Desktop%20%7C%20Mobile" />
</a>

<br/>

<!-- Shields -->
<img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://img.shields.io/badge/Projects-2+-blue?style=for-the-badge&logo=code&logoColor=white" />
<img src="https://img.shields.io/badge/Languages-TypeScript%20%7C%20Java%20%7C%20Rust-orange?style=for-the-badge&logoColor=white" />
<img src="https://img.shields.io/badge/Platform-Web%20%7C%20macOS%20%7C%20Windows%20%7C%20Linux%20%7C%20Android-purple?style=for-the-badge&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=book&logoColor=white" />

<br/><br/>

<!-- Organization Description -->
<h3>🌙 About P-Moon</h3>

> We believe documents should be **beautiful**, **accessible**, and **cross-platform**.
> P-Moon builds open-source tools that transform raw Markdown into stunning reading experiences —
> from the browser to the desktop, from the phone to the PDF.

<br/>

<!-- Activity Graph -->
<img src="https://github-readme-activity-graph.vercel.app/graph?username=p-moon&theme=midnight-purple&area=true&hide_title=false&custom_title=P-Moon%20Contribution%20Rhythm&bg_color=1a1a2e&line=60a0dc&point=e94560&repo=p-moon/mdoc" width="100%" />

<br/>

</div>

---

## 🚀 Our Projects

<table>
<tr>
<td width="50%">

### 🌙 [mdoc](https://github.com/p-moon/mdoc) — Document Engine

**One command, beautiful documents.**

```
npx @p-moon/mdoc README.md    # → HTML
npx @p-moon/mdoc README.md --pdf  # → PDF
npx @p-moon/mdoc serve ./docs     # → Live Preview
```

<details>
<summary>📖 Full Feature List</summary>

| Category | Features |
|----------|----------|
| 📝 **Markdown** | Full markdown-it syntax, tables, footnotes, task lists |
| 📐 **LaTeX** | `$...$` inline & `$$...$$` block, KaTeX server-side render |
| 🎨 **Code Highlight** | highlight.js all languages + line markers `{2,4-5}` |
| 🧜 **Mermaid** | Browser-side real-time chart rendering |
| 🌿 **PlantUML** | Auto-encode to SVG, no Java needed |
| 😀 **Emoji** | Full `:smile:` short-code support |
| 📌 **Admonition** | `:::tip` `:::warning` `:::danger` colored boxes |
| 📑 **TOC** | Auto-generated navigation from headings |
| 🔍 **Search** | Offline full-text search index |
| 🏗️ **Build** | Recursive directory compilation with sitemap + RSS |
| 📄 **PDF** | Puppeteer-powered, WYSIWYG export |
| 🔎 **Lint** | 16 rules covering syntax errors, unclosed formulas, etc. |
| 🖥️ **Preview** | VuePress-style UI: sidebar, breadcrumb, search, hot-reload |

</details>

<details>
<summary>🛠️ Tech Stack</summary>

| Layer | Technology |
|-------|-----------|
| Engine | TypeScript · markdown-it · KaTeX · highlight.js |
| Charts | Mermaid · PlantUML |
| PDF | Puppeteer / Puppeteer-core |
| Desktop | Tauri v2 (Rust + WebView) |
| Mobile | Tauri Android |
| Web UI | Vue 3 · Vite · vue-router |
| PDF Reader | pdfjs-dist · foliate-js · annotpdf |
| Drawing | Excalidraw |

</details>

<img src="https://img.shields.io/npm/v/@p-moon/mdoc?style=flat-square&logo=npm&color=60A0DC" />
<img src="https://img.shields.io/github/commit-activity/m/p-moon/mdoc?style=flat-square&color=e94560" />
<img src="https://img.shields.io/github/stars/p-moon/mdoc?style=flat-square&color=yellow" />

</td>
<td width="50%">

### 🛡️ [mdoc-server](https://github.com/p-moon/mdoc-server) — Auth & Cloud Sync

**Secure authentication, device fingerprinting, cloud-ready.**

```
docker compose up -d   # → Production in 5 minutes
```

<details>
<summary>📖 Architecture Details</summary>

| Layer | Technology |
|-------|-----------|
| Runtime | JDK 21 · Spring Boot 3.3 |
| Database | PostgreSQL 16 |
| Auth | JWT (jjwt 0.12) · Access 7d + Refresh 30d |
| SMS | Tencent Cloud SMS (with Mock mode) |
| Anti-Scraping | AES-256 encrypted deviceId + HMAC-SHA256 request signing |
| TLS | Let's Encrypt · auto-renew via certbot + nginx crond |
| Infra | Docker Compose · Nginx reverse proxy |

</details>

<details>
<summary>🔒 Security Highlights</summary>

- ✅ HTTPS + HSTS (TLS 1.2/1.3)
- ✅ AES-256-CBC encrypted device identifiers
- ✅ HMAC-SHA256 request signing (anti-script, anti-replay)
- ✅ 5-minute timestamp tolerance window
- ✅ SMS rate limiting (60s interval, 10/day per phone)
- ✅ Phone number masking (`138****8000`)
- ✅ Non-root Docker container
- ✅ PostgreSQL isolated to internal network

</details>

<img src="https://img.shields.io/badge/JDK-21-orange?style=flat-square&logo=java" />
<img src="https://img.shields.io/badge/Spring%20Boot-3.3-green?style=flat-square&logo=spring" />
<img src="https://img.shields.io/badge/Docker-Ready-blue?style=flat-square&logo=docker" />

</td>
</tr>
</table>

---

<div align="center">

## ⚡ Quick Stats

<img src="https://github-readme-stats.vercel.app/api?username=p-moon&show_icons=true&theme=midnight-purple&hide_border=true&bg_color=1a1a2e&title_color=e94560&icon_color=60a0dc&text_color=a0a0c0&count_private=true&include_all_commits=true" height="170" />
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=p-moon&layout=compact&theme=midnight-purple&hide_border=true&bg_color=1a1a2e&title_color=e94560&text_color=a0a0c0&langs_count=8" height="170" />

<br/>

## 🎯 Our Vision

```
   ┌─────────────────────────────────────────────────────────────┐
   │                                                             │
   │   📄  Raw Markdown                                         │
   │        │                                                    │
   │        ▼                                                    │
   │   🎨  mdoc Engine ─── render ──→ HTML / PDF / Live Preview │
   │        │                                                    │
   │        ▼                                                    │
   │   🖥️  Cross-Platform Shell (Web / Tauri / Android)         │
   │        │                                                    │
   │        ▼                                                    │
   │   🛡️  mdoc-server ── auth ──→ Cloud Sync & User Identity   │
   │                                                             │
   │   ══════════════════════════════════════════════════════     │
   │   One ecosystem. Every platform. Zero friction.            │
   │                                                             │
   └─────────────────────────────────────────────────────────────┘
```

<br/>

## 🏗️ Architecture Map

<img src="https://skillicons.dev/icons?i=ts,js,vue,react,rust,java,spring,postgres,docker,nginx,linux,git,nodejs,npm,html,css,less,vite,tauri,puppeteer&theme=dark&perline=10" />

<br/>

## 🌟 Get Involved

| Link | Description |
|------|-------------|
| 📦 [npm: @p-moon/mdoc](https://www.npmjs.com/package/@p-moon/mdoc) | Install & start in seconds |
| 🐙 [p-moon/mdoc](https://github.com/p-moon/mdoc) | Core engine repo |
| 🐙 [p-moon/mdoc-server](https://github.com/p-moon/mdoc-server) | Backend auth service |
| 🐛 [Issues](https://github.com/p-moon/mdoc/issues) | Bug reports & feature requests |
| 💬 [Discussions](https://github.com/p-moon/mdoc/discussions) | Ideas & questions |

<br/>

> *"Give me a `.md` file, and I shall give you a masterpiece."*
> — P-Moon 🌙

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f3460,50:16213e,100:1a1a2e&height=120&section=footer" width="100%" />

</div>
