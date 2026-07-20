#!/usr/bin/env node
/**
 * Generate github-snake SVG locally using Platane/snk
 * Usage: node generate-snake.js
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const USERNAME = "p-moon";
const REPO = "moon-doc/.github";
const OUTPUT_BRANCH = "output";
const DIST_DIR = path.join(__dirname, "dist");

// 1. Fetch full contribution calendar (may need multiple years)
function fetchContributions(username) {
  // Get current year contributions
  const query = `{
    user(login: "${username}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }`;

  const result = execSync(
    `gh api graphql -f query='${query}' --jq '.data.user.contributionsCollection.contributionCalendar'`,
    { encoding: "utf-8" }
  );

  return JSON.parse(result);
}

// 2. Generate snake SVG from contribution grid
function generateSnakeSVG(contribData) {
  const weeks = contribData.weeks;
  const cellSize = 11;
  const cellPadding = 3;
  const step = cellSize + cellPadding;
  const headerHeight = 20;

  const numWeeks = weeks.length;
  const svgWidth = numWeeks * step + 30;
  const svgHeight = 7 * step + headerHeight + 20;

  // Build grid: 7 rows x N weeks
  const grid = [];
  for (let w = 0; w < weeks.length; w++) {
    for (let d = 0; d < 7; d++) {
      const day = weeks[w].contributionDays[d];
      if (!day) continue;
      const x = 20 + w * step;
      const y = headerHeight + d * step;
      const count = day.contributionCount;
      const color = day.color;
      grid.push({ x, y, count, color, date: day.date, week: w, dayIdx: d });
    }
  }

  // Find snake path through contribution cells
  const contributionCells = grid.filter((c) => c.count > 0);
  const snakePath = [];

  if (contributionCells.length > 0) {
    // Sort by date to create a natural path
    contributionCells.sort((a, b) => a.date.localeCompare(b.date));

    // Take a subset for the snake body (up to ~120 cells for a nice snake)
    const maxSnakeLength = Math.min(contributionCells.length, 120);
    const step2 = Math.max(1, Math.floor(contributionCells.length / maxSnakeLength));
    for (let i = 0; i < contributionCells.length; i += step2) {
      snakePath.push(contributionCells[i]);
    }
  }

  // Draw all contribution cells
  let rects = "";
  for (const cell of grid) {
    const isSnake = snakePath.some((s) => s.date === cell.date);
    const opacity = isSnake ? 1 : 0.8;
    rects += `  <rect x="${cell.x}" y="${cell.y}" width="${cellSize}" height="${cellSize}" rx="2" ry="2" fill="${cell.color}" opacity="${opacity}"/>\n`;
  }

  // Draw snake body path
  let snakeBody = "";
  if (snakePath.length >= 2) {
    const pathD = snakePath
      .map((p, i) => {
        const cx = p.x + cellSize / 2;
        const cy = p.y + cellSize / 2;
        return i === 0 ? `M${cx},${cy}` : `L${cx},${cy}`;
      })
      .join(" ");

    snakeBody = `  <path d="${pathD}" fill="none" stroke="#39d353" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>\n`;

    // Snake head
    const head = snakePath[snakePath.length - 1];
    const hx = head.x + cellSize / 2;
    const hy = head.y + cellSize / 2;
    snakeBody += `  <circle cx="${hx}" cy="${hy}" r="5" fill="#39d353"/>\n`;
    snakeBody += `  <circle cx="${hx - 1.5}" cy="${hy - 1}" r="1" fill="#0d1117"/>\n`;
    snakeBody += `  <circle cx="${hx + 1.5}" cy="${hy - 1}" r="1" fill="#0d1117"/>\n`;
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
  <style>
    rect { transition: fill 0.3s ease; }
  </style>
  <rect width="100%" height="100%" fill="#0d1117" rx="8"/>
  <text x="20" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="12" fill="#8b949e">🐍 ${USERNAME}'s contributions</text>
${rects}${snakeBody}</svg>`;

  return svg;
}

// 3. Generate dark variant
function generateDarkSVG(contribData) {
  const weeks = contribData.weeks;
  const cellSize = 11;
  const cellPadding = 3;
  const step = cellSize + cellPadding;
  const headerHeight = 20;

  const numWeeks = weeks.length;
  const svgWidth = numWeeks * step + 30;
  const svgHeight = 7 * step + headerHeight + 20;

  const darkColors = {
    "#ebedf0": "#161b22",
    "#9be9a8": "#0e4429",
    "#40c463": "#006d32",
    "#30a14e": "#26a641",
    "#216e39": "#39d353",
  };

  const grid = [];
  let rects = "";
  for (let w = 0; w < weeks.length; w++) {
    for (let d = 0; d < 7; d++) {
      const day = weeks[w].contributionDays[d];
      if (!day) continue;
      const x = 20 + w * step;
      const y = headerHeight + d * step;
      const color = darkColors[day.color] || day.color;
      rects += `  <rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="2" ry="2" fill="${color}"/>\n`;
      grid.push({ x, y, count: day.contributionCount, color, date: day.date });
    }
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
  <rect width="100%" height="100%" fill="#0d1117" rx="8"/>
  <text x="20" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="12" fill="#8b949e">🐍 ${USERNAME}'s contributions</text>
${rects}</svg>`;

  return svg;
}

// Main
console.log(`🎣 Fetching contributions for ${USERNAME}...`);
const contribData = fetchContributions(USERNAME);
console.log(`✅ Got ${contribData.totalContributions} total contributions`);

// Create dist directory
fs.mkdirSync(DIST_DIR, { recursive: true });

// Generate SVGs
console.log("🎨 Generating SVGs...");
const svgLight = generateSnakeSVG(contribData);
const svgDark = generateDarkSVG(contribData);

fs.writeFileSync(path.join(DIST_DIR, "github-snake.svg"), svgLight);
fs.writeFileSync(path.join(DIST_DIR, "github-snake-dark.svg"), svgDark);
console.log(`✅ Written to ${DIST_DIR}/`);

// Push to output branch
console.log(`🚀 Pushing to ${REPO}:${OUTPUT_BRANCH}...`);
execSync(
  `cd ${DIST_DIR} && ` +
    `git init && ` +
    `git config user.name "github-actions[bot]" && ` +
    `git config user.email "github-actions[bot]@users.noreply.github.com" && ` +
    `git add -A && ` +
    `git commit -m "Generate snake SVGs" && ` +
    `git push --force git@github.com:${REPO}.git HEAD:refs/heads/${OUTPUT_BRANCH}`,
  { encoding: "utf-8" }
);
console.log("🎉 Done!");
