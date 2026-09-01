# Al Rehman Garden Phase 2 Lahore — Production Deployment Guide

This guide outlines the end-to-end steps to connect, deploy, and operate the **Al Rehman Garden Phase 2 Lahore Real Estate Authority Website** on **GitHub** and **Vercel Edge Network**.

---

## 1. GitHub Repository Setup

### Step 1.1: Verify Clean Working Directory
Ensure your `.gitignore` excludes `node_modules/`, `dist/`, `.env`, and temporary staging data:
```bash
git status
```

### Step 1.2: Commit and Push to GitHub
```bash
# Initialize git if not already tracked
git init

# Stage all production assets and code
git add .

# Commit with version tag
git commit -m "feat(release): v1.0.0 production release with 100 properties, admin suite, and SEO authority hub"

# Link to your remote GitHub repository
git remote add origin https://github.com/YOUR_ORGANIZATION/al-rehman-garden-phase-2.git
git branch -M main
git push -u origin main
```

---

## 2. Vercel Hosting Connection

### Step 2.1: Import Project to Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **"Add New..."** → **"Project"**.
3. Select your repository `al-rehman-garden-phase-2` and click **"Import"**.

### Step 2.2: Configure Build Settings
Vercel will automatically detect `vercel.json` and the **Astro** framework:
- **Framework Preset**: `Astro`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 2.3: Add Environment Variables
In Vercel **Settings → Environment Variables**, add the following:

| Variable Name | Value | Description |
|---|---|---|
| `PUBLIC_SITE_URL` | `https://alrehmangarden.pk` | Production canonical URL |
| `PUBLIC_SITE_NAME` | `Al Rehman Garden Phase 2 Lahore` | Platform brand title |
| `PUBLIC_WHATSAPP_NUMBER` | `+923000000000` | Lead generation WhatsApp receiver |
| `ADMIN_SECRET_KEY` | `your_generated_64_character_random_hex_secret` | Internal admin operations key |
| `PUBLIC_GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Google Analytics 4 tracking |

Click **"Deploy"**. Vercel will build and deploy all 149 static routes in ~15-25 seconds on their global edge CDN.

---

## 3. Custom Domain Connection (`alrehmangarden.pk`)

1. In Vercel Project Dashboard, navigate to **Settings → Domains**.
2. Enter your domain: `alrehmangarden.pk` and `www.alrehmangarden.pk`.
3. Configure your DNS provider (Cloudflare / PKNIC registrar) with these records:

| Type | Name | Target / Value | Proxy Status |
|---|---|---|---|
| **A** | `@` | `76.76.21.21` | DNS Only / Proxied |
| **CNAME** | `www` | `cname.vercel-dns.com` | DNS Only / Proxied |

4. Vercel will automatically provision a free, auto-renewing **Let's Encrypt SSL/TLS Certificate** within 5 minutes.

---

## 4. Admin Security & Privacy Controls

- All `/admin/*` routes enforce:
  ```html
  <meta name="robots" content="noindex, nofollow" />
  ```
- Public search engines (Google, Bing) are blocked from crawling admin endpoints while public directory and authority pages are 100% indexed in `sitemap-0.xml`.
- Security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`) are enforced via `vercel.json`.

---

## 5. Image Storage Architecture & Scaling Review (Task 7)

| Solution | Best For | Pros | Cons | Recommendation |
|---|---|---|---|---|
| **Option A: Vercel Static Storage** *(Current)* | **100 – 500 properties** | Zero extra cost, instant zero-latency edge delivery, zero 3rd-party dependencies. | Requires git commits for new images. | **Recommended for Phase 1-8 Launch.** |
| **Option B: Cloudinary CDN** | **500 – 2,500 properties** | Dynamic watermarking on the fly, automated face/property framing, WebP/AVIF auto-negotiation. | Monthly subscription after free quota (25 GB). | **Recommended for Phase 9 Auto-Scraping.** |
| **Option C: AWS S3 + CloudFront** | **2,500+ properties** | Lowest cost per gigabyte, enterprise access control, unlimited storage volume. | Requires IAM configuration and custom bucket watermarking Lambda. | **Recommended for multi-city national portals.** |

---

## 6. Instant Rollback & CI/CD Process

- **Automatic Previews**: Every pull request or branch push generates an isolated preview URL (`https://rahman-gardens-git-feat-xxx.vercel.app`).
- **Instant Rollback**: If an erroneous data import occurs in production:
  1. Go to Vercel **Deployments**.
  2. Find the previous successful deployment.
  3. Click **"Instant Rollback"** → Live in &lt; 3 seconds without rebuilding.

---

## 7. Post-Deployment Verification Checklist

1. [ ] Check homepage loads with HTTPS: `https://alrehmangarden.pk/`
2. [ ] Verify `/sitemap-index.xml` and `/robots.txt` respond with 200 OK.
3. [ ] Verify `/properties/` displays 100 listings with working search and block filters.
4. [ ] Test WhatsApp lead triggers on 3 different property listings.
5. [ ] Submit test inquiry on `/find-my-property`.
6. [ ] Verify `/admin` opens with active KPIs and leads CRM.
