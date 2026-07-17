<div align="center">

<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- 🌙 HERO BANNER — 贡献指南专用 Header                                 -->
<!-- ═══════════════════════════════════════════════════════════════════ -->
<img src="https://capsule-render.vercel.app/api?type=venom&height=200&color=0:0f3460,50:16213e,100:1a1a2e&fontColor=ffffff&text=%F0%9F%94%84%20Contributing%20Guide&fontSize=55&animation=fadeIn&fontAlignY=38&desc=%E5%B0%8F%E6%9C%88%E4%BA%AE%E9%98%85%E8%AF%BB%E5%99%A8%20%C2%B7%20%E5%8D%8F%E4%BD%9C%E8%A7%84%E8%8C%83%E4%B8%8E%E6%B5%81%E7%A8%8B&descSize=18&descAlignY=58&descColor=d0d0ff&stroke=533483&strokeWidth=1" width="100%" />

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=18&duration=2800&pause=800&color=60A0DC&center=true&vCenter=true&repeat=true&width=650&height=35&lines=Fork+%E2%86%92+Branch+%E2%86%92+Code+%E2%86%92+Commit+%E2%86%92+PR+%E2%86%92+Review+%E2%86%92+Merge" />

</div>

---

# 🔄 Moon-Doc 贡献指南

感谢你对 **小月亮阅读器**（Moon-Doc）的关注！本文档将帮助你了解如何参与项目贡献。

---

## 🚀 快速开始

<div align="center">

```
  🍴 1. Fork           📦 2. Branch           💻 3. Code           🔀 4. PR
  ─────────────  →  ─────────────────  →  ──────────────  →  ──────────────
  Fork 到你的账号      git checkout -b     编写代码 + 测试       关联 Issue
                       feat/xxx             遵循代码风格          CI 通过 + Review
```

</div>

---

## 🐛 报告 Bug

1. 前往对应仓库的 [Issues](https://github.com/moon-doc/mdoc/issues) 页面
2. 使用 **Bug Report** 模板
3. 请包含：
   - 📋 复现步骤
   - ✅ 期望行为 vs ❌ 实际行为
   - 💻 运行环境（OS、Node 版本、浏览器等）
   - 📎 相关日志 / 截图

---

## ✨ 提交功能建议

1. 前往 [Issues](https://github.com/moon-doc/mdoc/issues) 页面
2. 使用 **Feature Request** 模板
3. 请描述：
   - 🎯 使用场景与痛点
   - ✨ 期望的行为
   - 💡 可能的实现思路（可选）

---

## 🔀 分支规范

| 分支类型 | 命名格式 | 示例 |
|----------|----------|------|
| ✨ 新功能 | `feat/<简述>` | `feat/dark-theme` |
| 🐛 Bug 修复 | `fix/<简述>` | `fix/pdf-export-encoding` |
| 📝 文档 | `docs/<简述>` | `docs/api-reference` |
| ♻️ 重构 | `refactor/<简述>` | `refactor/render-pipeline` |
| ⚡ 性能 | `perf/<简述>` | `perf/large-file-render` |

**原则：**
- 始终从最新的 `main` 创建分支
- 每个分支只做一件事（单一职责）
- 及时同步 `main` 的变更

---

## 📝 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 列表

| Type | 说明 | 示例 |
|------|------|------|
| `feat` | ✨ 新功能 | `feat: 添加暗色主题支持` |
| `fix` | 🐛 Bug 修复 | `fix: 修复 PDF 导出乱码` |
| `docs` | 📝 文档变更 | `docs: 更新 README 安装说明` |
| `style` | 🎨 代码风格 | `style: 调整缩进格式` |
| `refactor` | ♻️ 重构 | `refactor: 拆分渲染管道` |
| `perf` | ⚡ 性能优化 | `perf: 优化大文件渲染速度` |
| `test` | ✅ 测试 | `test: 补充 KaTeX 渲染用例` |
| `chore` | 🔧 构建/工具 | `chore: 升级 Tauri 到 v2.1` |
| `ci` | 👷 CI 配置 | `ci: 添加 macOS 构建任务` |

### Scope（可选）

指明影响的模块：

| Scope | 模块 |
|-------|------|
| `engine` | mdoc 核心引擎 |
| `web` | Web UI |
| `server` | mdoc-server |
| `desktop` | Tauri 桌面端 |
| `android` | Android 端 |
| `pdf` | PDF 导出 |

### 示例

```
feat(engine): 添加 Admonition 容器支持

支持 :::tip / :::warning / :::danger 语法，
渲染为彩色提示框，可自定义标题。

Closes #42
```

---

## 🔍 代码审查

### 提交 PR 时

- **标题**遵循提交规范格式
- **描述**中关联相关 Issue（`Closes #xxx` / `Fixes #xxx`）
- 大型变更请附带**迁移说明**或**设计文档**
- 确保 CI 全部通过

### 审查 PR 时

- 关注**逻辑正确性**与**边界情况**
- 检查是否遵循项目代码风格
- 验证测试覆盖
- 提出建设性意见，避免纯否定

### 合并策略

| 策略 | 用途 |
|------|------|
| ✅ **Squash Merge** | 默认方式，保持主分支历史整洁 |
| 📋 **Merge Commit** | 需要保留详细提交历史时使用 |
| ❌ **Rebase Merge** | 禁止使用，避免重写公共历史 |

---

## 🏗️ 开发环境搭建

### mdoc（前端引擎）

```bash
git clone https://github.com/moon-doc/mdoc.git
cd mdoc
npm install
npm run dev          # 启动实时预览 🔥
npm run build:all   # 全量构建 🏗️
```

### mdoc-server（后端服务）

```bash
git clone https://github.com/moon-doc/mdoc-server.git
cd mdoc-server
# 需要 JDK 21 + Maven
./mvnw spring-boot:run
```

---

## 📦 发布流程

<div align="center">

```
  📝 更新版本号  →  🏷️ 创建 Tag  →  🤖 CI 自动发布  →  📢 GitHub Release
  package.json     v1.x.x          npm / Docker Hub     更新日志
```

</div>

---

## 🤝 行为准则

参与本项目即表示你同意遵守我们的 [行为准则](./CODE_OF_CONDUCT.md)，该准则基于 **Debian 行为准则**，强调礼貌、善意推定、合作、言简意赅、开放和妥善处理问题。

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=100&color=0:533483,50:0f3460,100:e94560&section=footer" width="100%" />

</div>
