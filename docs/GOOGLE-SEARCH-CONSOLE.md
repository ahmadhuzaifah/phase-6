# Google Search Console Launch Guide

## 1. Verify the domain

1. Open Google Search Console and choose **Domain property**.
2. Enter `alrehmangarden.pk`.
3. Add the TXT verification record supplied by Google to the DNS provider.
4. Wait for DNS propagation, then select **Verify**.

The production site URL is configured as `https://alrehmangarden.pk`. Keep HTTPS and the preferred host consistent in Vercel, DNS, and Search Console.

## 2. Submit the sitemap

After the first production deploy, submit:

`https://alrehmangarden.pk/sitemap-index.xml`

The sitemap integration excludes `/admin/` and `/private/` routes. `public/robots.txt` also disallows internal and staging paths.

## 3. Inspect priority URLs

Use URL Inspection for the homepage, map, prices, blocks, properties index, a representative property, places index, and the blog index. Request indexing only after the production URL returns `200`, has one canonical, and is not blocked by robots.

## 4. Monitor weekly

Review indexing pages, excluded pages, Core Web Vitals, mobile usability, manual actions, and enhancement reports. Treat price and availability pages as freshness-sensitive and update their visible “last checked” date when source data changes.

## 5. Analytics handoff

Set `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` in Vercel Production environment variables. The site does not send analytics until this variable exists. The existing event utility supports property views, searches, phone, WhatsApp, map, brochure, filter, and inquiry events.

## Important distinction

This is an independent property information portal. Search Console ownership verifies the website domain only; it does not establish affiliation with Al Rehman Garden management or any government authority.
