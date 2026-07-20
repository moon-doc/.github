#!/usr/bin/env node
/**
 * Generate GitHub Stats SVG cards locally via GitHub GraphQL API
 * Usage: node generate-stats-svg.js
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const USERNAME = "p-moon";

function fetchStats() {
  const query = `{
    user(login: "${USERNAME}") {
      name
      repositories(privacy: PUBLIC, first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
        totalCount
        nodes {
          stargazerCount
          forkCount
          primaryLanguage { name color }
          issues { totalCount }
          pullRequests { totalCount }
        }
      }
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        totalIssueContributions
        totalRepositoryContributions
        restrictedContributionsCount
      }
      followers { totalCount }
      following { totalCount }
    }
  }`;

  const result = execSync(`gh api graphql -f query='${query}' --jq '.data.user'`, {
    encoding: "utf-8",
  });
  return JSON.parse(result);
}

function generateStatsCard(user) {
  const repos = user.repositories.nodes;
  const totalStars = repos.reduce((s, r) => s + r.stargazerCount, 0);
  const totalForks = repos.reduce((s, r) => s + r.forkCount, 0);
  const cc = user.contributionsCollection;
  const totalCommits = cc.totalCommitContributions + cc.restrictedContributionsCount;
  const totalPRs = cc.totalPullRequestContributions;
  const totalIssues = cc.totalIssueContributions;
  const totalRepos = user.repositories.totalCount;

  const stats = [
    { icon: "⭐", label: "Total Stars", value: totalStars },
    { icon: "🍴", label: "Total Forks", value: totalForks },
    { icon: "📦", label: "Repositories", value: totalRepos },
    { icon: "🔀", label: "Pull Requests", value: totalPRs },
    { icon: "🎯", label: "Issues", value: totalIssues },
    { icon: "✏️", label: "Commits", value: totalCommits },
    { icon: "👥", label: "Followers", value: user.followers.totalCount },
  ];

  const cardW = 340;
  const rowH = 28;
  const headerH = 56;
  const padding = 20;
  const cardH = headerH + stats.length * rowH + padding;

  let rows = "";
  stats.forEach((s, i) => {
    const y = headerH + 8 + i * rowH;
    rows += `
    <text x="${padding + 4}" y="${y}" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="13" fill="#8b949e">${s.icon}</text>
    <text x="${padding + 28}" y="${y}" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="12" fill="#a0a0c0">${s.label}</text>
    <text x="${cardW - padding}" y="${y}" text-anchor="end" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="13" fill="#e94560" font-weight="600">${s.value.toLocaleString()}</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${cardW}" height="${cardH}" viewBox="0 0 ${cardW} ${cardH}">
  <defs>
    <linearGradient id="sbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a1a2e"/>
      <stop offset="100%" stop-color="#16213e"/>
    </linearGradient>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e94560"/>
      <stop offset="100%" stop-color="#60a0dc"/>
    </linearGradient>
  </defs>
  <rect width="${cardW}" height="${cardH}" rx="12" fill="url(#sbg)"/>
  <rect width="${cardW}" height="3" rx="1.5" fill="url(#titleGrad)" opacity="0.8"/>
  <text x="${padding}" y="30" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="16" fill="url(#titleGrad)" font-weight="700">⚡ GitHub Stats</text>
  <text x="${cardW - padding}" y="30" text-anchor="end" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="11" fill="#8b949e">@${USERNAME}</text>${rows}
</svg>`;
}

function generateLangsCard(user) {
  const repos = user.repositories.nodes;
  const langMap = {};

  repos.forEach((r) => {
    if (r.primaryLanguage) {
      const name = r.primaryLanguage.name;
      if (!langMap[name]) langMap[name] = { count: 0, color: r.primaryLanguage.color };
      langMap[name].count++;
    }
  });

  const langs = Object.entries(langMap)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const total = langs.reduce((s, l) => s + l.count, 0);

  const cardW = 340;
  const rowH = 26;
  const headerH = 56;
  const barH = 10;
  const padding = 20;
  const barY = headerH + 4;
  const listY = barY + barH + 16;
  const cardH = listY + langs.length * rowH + padding;

  // Progress bar
  let barRects = "";
  let offsetX = padding;
  const barWidth = cardW - padding * 2;
  langs.forEach((l) => {
    const w = (l.count / total) * barWidth;
    barRects += `<rect x="${offsetX}" y="${barY}" width="${Math.max(w, 2)}" height="${barH}" fill="${l.color}"/>`;
    offsetX += w;
  });

  // Language list
  let rows = "";
  langs.forEach((l, i) => {
    const y = listY + i * rowH;
    const pct = ((l.count / total) * 100).toFixed(1);
    rows += `
    <circle cx="${padding + 6}" cy="${y - 4}" r="4" fill="${l.color}"/>
    <text x="${padding + 16}" y="${y}" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="11" fill="#a0a0c0">${l.name}</text>
    <text x="${cardW - padding}" y="${y}" text-anchor="end" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="11" fill="#8b949e">${pct}%</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${cardW}" height="${cardH}" viewBox="0 0 ${cardW} ${cardH}">
  <defs>
    <linearGradient id="lbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a1a2e"/>
      <stop offset="100%" stop-color="#16213e"/>
    </linearGradient>
    <linearGradient id="langTitle" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e94560"/>
      <stop offset="100%" stop-color="#60a0dc"/>
    </linearGradient>
  </defs>
  <rect width="${cardW}" height="${cardH}" rx="12" fill="url(#lbg)"/>
  <rect width="${cardW}" height="3" rx="1.5" fill="url(#langTitle)" opacity="0.8"/>
  <text x="${padding}" y="30" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="16" fill="url(#langTitle)" font-weight="700">🗣️ Top Languages</text>
  <text x="${cardW - padding}" y="30" text-anchor="end" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="11" fill="#8b949e">@${USERNAME}</text>
  <rect x="${padding}" y="${barY}" width="${barWidth}" height="${barH}" rx="5" fill="#161b22"/>
  ${barRects}${rows}
</svg>`;
}

// Main
console.log(`🎣 Fetching stats for ${USERNAME}...`);
const user = fetchStats();

console.log("🎨 Generating SVGs...");
const distDir = path.join(__dirname, "dist");
fs.mkdirSync(distDir, { recursive: true });

const statsSvg = generateStatsCard(user);
const langsSvg = generateLangsCard(user);

fs.writeFileSync(path.join(distDir, "github-stats.svg"), statsSvg);
fs.writeFileSync(path.join(distDir, "github-top-langs.svg"), langsSvg);
console.log("✅ Written to dist/");
