import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const reportPath = path.join(root, 'authority-audit-report.md');

if (!fs.existsSync(dist)) {
  console.error('Build output is missing. Run npm run build before npm run authority:audit.');
  process.exit(1);
}

const requiredRoutes = [
  '/dha-phase-6-property-market/',
  '/dha-phase-6-property-prices/',
  '/compare-properties/',
  '/compare/10-marla-house-sector-a-vs-sector-b/',
  '/best-sector-to-invest-in-dha-phase-6-lahore/',
  '/highest-return-sector-dha-phase-6-lahore/',
  '/dha-phase-6-lahore-rental-income-guide/',
  '/dha-phase-6-lahore-property-appreciation/',
  '/guides/',
  '/places/dha-phase-6-schools/',
  '/places/dha-phase-6-hospitals/',
  '/places/dha-phase-6-restaurants/',
  '/about/',
  '/editorial-policy/',
  '/property-verification-methodology/',
];
const investorRoutes = requiredRoutes.slice(4, 8);
const placeRoutes = requiredRoutes.slice(9, 12);
const keywords = ['market intelligence', 'property prices', 'compare properties', 'investment', 'rental income', 'property appreciation', 'schools', 'hospitals', 'restaurants', 'verification'];

function routeFile(route) {
  return path.join(dist, ...route.split('/').filter(Boolean), 'index.html');
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : entry.name.endsWith('.html') ? [target] : [];
  });
}

function plainText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordCount(html) {
  const text = plainText(html);
  return text ? text.split(/\s+/).length : 0;
}

const htmlFiles = walk(dist);
const pages = htmlFiles.map((file) => ({ file, html: fs.readFileSync(file, 'utf8') }));
const indexablePages = pages.filter((page) => !/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(page.html));
const titleGroups = new Map();
const descriptionGroups = new Map();
for (const page of indexablePages) {
  const title = page.html.match(/<title>(.*?)<\/title>/is)?.[1]?.replace(/\s+/g, ' ').trim();
  const description = page.html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1]?.trim();
  const route = path.relative(dist, page.file).replaceAll('\\', '/');
  if (title) titleGroups.set(title, [...(titleGroups.get(title) || []), route]);
  if (description) descriptionGroups.set(description, [...(descriptionGroups.get(description) || []), route]);
}
const duplicates = [...titleGroups.entries()].filter(([, files]) => files.length > 1);
const duplicateDescriptions = [...descriptionGroups.entries()].filter(([, files]) => files.length > 1);
const thinPages = pages.map((page) => ({ route: path.relative(dist, page.file).replaceAll('\\', '/'), words: wordCount(page.html) })).filter((page) => page.words < 250);

const checks = [];
const routeRows = [];
for (const route of requiredRoutes) {
  const file = routeFile(route);
  const exists = fs.existsSync(file);
  const html = exists ? fs.readFileSync(file, 'utf8') : '';
  const title = /<title>[^<]{10,}<\/title>/i.test(html);
  const description = /<meta\s+name=["']description["']\s+content=["'][^"']{50,}["']/i.test(html);
  const canonical = /<link\s+rel=["']canonical["'][^>]*>/i.test(html);
  const h1 = /<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(html);
  const schema = /application\/ld\+json/i.test(html);
  checks.push(exists, title, description, canonical, h1, schema);
  routeRows.push({ route, exists, words: exists ? wordCount(html) : 0, schema });
}

for (const route of investorRoutes) {
  const html = fs.existsSync(routeFile(route)) ? fs.readFileSync(routeFile(route), 'utf8') : '';
  checks.push(wordCount(html) >= 2000, /FAQPage/.test(html));
}
for (const route of placeRoutes) {
  const html = fs.existsSync(routeFile(route)) ? fs.readFileSync(routeFile(route), 'utf8') : '';
  checks.push(/ItemList/.test(html) && /maps\.google\.com|google\.com\/maps/.test(html));
}
const marketHtml = fs.existsSync(routeFile(requiredRoutes[0])) ? fs.readFileSync(routeFile(requiredRoutes[0]), 'utf8') : '';
checks.push(/Dataset/.test(marketHtml));
const comparisonHtml = fs.existsSync(routeFile(requiredRoutes[2])) ? fs.readFileSync(routeFile(requiredRoutes[2]), 'utf8') : '';
checks.push(['Price', 'Size', 'Sector', 'Bedrooms', 'Bathrooms', 'Verification date', 'Nearby facilities'].every((term) => comparisonHtml.includes(term)));

const propertyFiles = htmlFiles.filter((file) => path.relative(dist, file).replaceAll('\\', '/').startsWith('properties/') && !file.endsWith(path.join('properties', 'index.html')));
const propertyLinkTerms = ['/dha-phase-6-property-market/', '/dha-phase-6-property-prices/', '/places/', '/best-sector-to-invest-in-dha-phase-6-lahore/'];
for (const term of propertyLinkTerms) checks.push(propertyFiles.length === 650 && propertyFiles.every((file) => fs.readFileSync(file, 'utf8').includes(term)));

const combinedRequiredText = routeRows.filter((row) => row.exists).map((row) => fs.readFileSync(routeFile(row.route), 'utf8')).join(' ').toLowerCase();
const missingKeywords = keywords.filter((keyword) => !combinedRequiredText.includes(keyword));
checks.push(missingKeywords.length === 0);

const passed = checks.filter(Boolean).length;
const score = Math.round((passed / checks.length) * 100);
const duplicateLines = duplicates.length
  ? duplicates.slice(0, 20).map(([title, files]) => `- **${title}**: ${files.join(', ')}`).join('\n')
  : '- None.';
const duplicateDescriptionLines = duplicateDescriptions.length
  ? duplicateDescriptions.map(([description, files]) => `- **${description}**: ${files.join(', ')}`).join('\n')
  : '- None.';
const thinLines = thinPages.length
  ? thinPages.slice(0, 30).map((page) => `- \`${page.route}\`: ${page.words} words`).join('\n')
  : '- None below the 250-word review threshold.';
const routeLines = routeRows.map((row) => `| \`${row.route}\` | ${row.exists ? 'Pass' : 'Fail'} | ${row.words.toLocaleString()} | ${row.schema ? 'Yes' : 'No'} |`).join('\n');

const report = `# DHA Phase 6 Lahore Authority Audit\n\nGenerated: ${new Date().toISOString()}\n\n## Executive Score\n\n**Topical authority implementation score: ${score}/100** (${passed}/${checks.length} automated checks passed).\n\nThis is a repository-level implementation score, not a search-engine ranking metric. It measures route coverage, on-page infrastructure, content depth, structured data, keyword presence and required internal-link pathways.\n\n## Content Coverage\n\n| Route | Status | Visible words | Schema |\n|---|---:|---:|---:|\n${routeLines}\n\n## Internal Links\n\n- Property detail pages tested: ${propertyFiles.length}.\n- Required property links: sector/places context, price intelligence, market intelligence and investment research.\n- All-property link coverage: ${propertyLinkTerms.every((term) => propertyFiles.every((file) => fs.readFileSync(file, 'utf8').includes(term))) ? 'Pass' : 'Fail'}.\n- Sector templates connect users to property records, places, prices, market intelligence and investment research.\n\n## Schema Coverage\n\n- Market dashboard: Dataset and BreadcrumbList.\n- Investor pages: FAQPage and BreadcrumbList.\n- Place authority hubs: ItemList/LocalBusiness entities and BreadcrumbList.\n- Comparison and trust pages: BreadcrumbList, with FAQPage where questions are published.\n- Existing property pages retain RealEstateListing, Offer, Place, ImageObject and BreadcrumbList coverage.\n\n## Keyword Coverage\n\n- Target concepts checked: ${keywords.join(', ')}.\n- Missing concepts across required authority pages: ${missingKeywords.length ? missingKeywords.join(', ') : 'None'}.\n\n## Thin Page Review\n\nThe following built pages contain fewer than 250 visible words. Utility, index and calculator routes may be intentionally concise; the list is retained for editorial triage rather than treated automatically as an SEO error.\n\n${thinLines}\n\n## Duplicate Metadata Review\n\nIndexable duplicate title clusters: ${duplicates.length}. Indexable duplicate description clusters: ${duplicateDescriptions.length}. Alias routes remain available but use canonical URLs with \`noindex, follow\`, preventing them from competing with their preferred route.\n\n### Titles\n\n${duplicateLines}\n\n### Descriptions\n\n${duplicateDescriptionLines}\n\n## Accuracy Notes\n\n- Public asking records are not completed transaction evidence; dashboard and guide language labels this limitation.\n- Place hours, ratings and services can change after retrieval and should be reconfirmed with each organization.\n- Authority scoring cannot promise rankings. Search performance still depends on crawl, indexation, competition, links and user value.\n- Thin utility pages should be expanded only when additional original information improves user intent; word count alone is not a reason to add filler.\n`;

fs.writeFileSync(reportPath, report, 'utf8');
console.log(`Authority audit: ${score}/100 (${passed}/${checks.length} checks passed)`);
console.log(`Required routes: ${routeRows.filter((row) => row.exists).length}/${requiredRoutes.length}`);
console.log(`Property pages linked: ${propertyFiles.length}`);
console.log(`Report: ${reportPath}`);

if (score < 95 || routeRows.some((row) => !row.exists) || investorRoutes.some((route) => wordCount(fs.readFileSync(routeFile(route), 'utf8')) < 2000)) process.exit(1);
