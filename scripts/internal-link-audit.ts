import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.env.LINK_AUDIT_DIR || 'dist');
const reportPath = path.resolve('internal-link-report.md');
const pages: string[] = [];

function walk(directory: string) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.name === 'index.html') pages.push(fullPath);
  }
}

function routeFor(file: string) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  return relative === 'index.html' ? '/' : `/${relative.replace(/\/index\.html$/, '')}/`;
}

function normalizeTarget(raw: string) {
  const target = raw.split('#')[0].split('?')[0];
  if (!target || target === '/') return '/';
  return target.endsWith('/') ? target : `${target}/`;
}

if (!fs.existsSync(root)) {
  process.stderr.write(`Link audit directory does not exist: ${root}\n`);
  process.exit(1);
}

walk(root);
const routes = new Set(pages.map(routeFor));
const inbound = new Map<string, Set<string>>([...routes].map((route) => [route, new Set()]));
const broken: string[] = [];

for (const file of pages) {
  const source = routeFor(file);
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
    const raw = match[1];
    if (!raw || raw.includes('${') || raw.startsWith('#') || /^(?:https?:|mailto:|tel:|javascript:|data:)/i.test(raw)) continue;
    if (!raw.startsWith('/')) continue;
    const target = normalizeTarget(raw);
    if (/\.[a-z0-9]+\/$/i.test(target) && !target.endsWith('.html/')) continue;
    if (!routes.has(target)) broken.push(`${source} -> ${target}`);
    else if (target !== source) inbound.get(target)?.add(source);
  }
}

const orphanPages = [...routes].filter((route) => route !== '/' && !inbound.get(route)?.size);
const lowLinkPages = [...routes].filter((route) => route !== '/' && (inbound.get(route)?.size || 0) < 2);
const lines = [
  '# Internal Link Report',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  `- Pages scanned: ${pages.length}`,
  `- Internal routes discovered: ${routes.size}`,
  `- Broken internal links: ${broken.length}`,
  `- Orphan pages: ${orphanPages.length}`,
  `- Pages with fewer than two inbound links: ${lowLinkPages.length}`,
  '',
  '## Broken Links',
  '',
  ...(broken.length ? broken.map((item) => `- ${item}`) : ['None detected.']),
  '',
  '## Orphan Pages',
  '',
  ...(orphanPages.length ? orphanPages.map((item) => `- ${item}`) : ['None detected.']),
  '',
  '## Low Internal Link Pages',
  '',
  ...(lowLinkPages.length ? lowLinkPages.map((item) => `- ${item} (${inbound.get(item)?.size || 0})`) : ['None detected.']),
  '',
];
fs.writeFileSync(reportPath, `${lines.join('\n')}\n`);
process.stdout.write(`Internal link audit: ${pages.length} pages, ${broken.length} broken links.\n`);
process.stdout.write(`Report written to ${reportPath}\n`);
if (broken.length) process.exit(1);
