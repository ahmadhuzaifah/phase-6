import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.env.SEO_AUDIT_DIR || 'dist');
const files = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.name === 'index.html') files.push(fullPath);
  }
}

if (!fs.existsSync(root)) {
  console.error(`SEO audit directory does not exist: ${root}`);
  process.exit(1);
}

walk(root);
const publicPages = files.filter((file) => !file.includes(`${path.sep}admin${path.sep}`));
const issues = [];
const titles = new Map();
const descriptions = new Map();
const routes = new Set(['/']);

for (const file of files) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  const route = relative === 'index.html' ? '/' : `/${relative.replace(/\/index\.html$/, '')}`;
  routes.add(route);
}

function capture(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || '';
}

for (const file of publicPages) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  const route = relative === 'index.html' ? '/' : `/${relative.replace(/\/index\.html$/, '')}`;
  const html = fs.readFileSync(file, 'utf8');
  const title = capture(html, /<title>([^<]+)<\/title>/i);
  const description = capture(html, /<meta\s+name="description"\s+content="([^"]+)"/i);
  const canonical = capture(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const h2Count = (html.match(/<h2\b/gi) || []).length;
  const ogCount = (html.match(/<meta\s+property="og:title"/gi) || []).length;
  const schemaCount = (html.match(/application\/ld\+json/gi) || []).length;
  const isIndexable = !/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);

  if (!title) issues.push(`${route}: missing title`);
  if (!description) issues.push(`${route}: missing meta description`);
  if (!canonical) issues.push(`${route}: missing canonical`);
  if (h1Count !== 1) issues.push(`${route}: expected 1 H1, found ${h1Count}`);
  if (ogCount !== 1) issues.push(`${route}: expected 1 og:title, found ${ogCount}`);
  if (!schemaCount) issues.push(`${route}: missing JSON-LD schema`);
  if (isIndexable && title) titles.set(title, [...(titles.get(title) || []), route]);
  if (isIndexable && description) descriptions.set(description, [...(descriptions.get(description) || []), route]);

  for (const href of html.matchAll(/href="(\/[^"#?]+)(?:[?#][^"]*)?"/gi)) {
    const target = href[1].replace(/\/$/, '') || '/';
    if (target.startsWith('/_astro/') || target.startsWith('/images/') || target === '/site.webmanifest' || /\.[a-z0-9]+$/i.test(target)) continue;
    if (target.startsWith('/admin')) continue;
    if (!routes.has(target) && !routes.has(`${target}/`)) issues.push(`${route}: broken internal link ${target}`);
  }
}

for (const [value, pages] of titles) if (pages.length > 1) issues.push(`duplicate title (${pages.length}): ${value}`);
for (const [value, pages] of descriptions) if (pages.length > 1) issues.push(`duplicate description (${pages.length}): ${value}`);

console.log(`SEO audit: ${publicPages.length} public pages, ${files.length} total HTML pages`);
console.log(`Routes: ${routes.size} | Titles: ${titles.size} | Descriptions: ${descriptions.size}`);
if (issues.length) {
  console.error(`Issues found: ${issues.length}`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}
console.log('SEO audit passed: metadata, headings, schemas, and internal links are present.');
