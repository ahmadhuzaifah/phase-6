// @ts-check
import { defineConfig } from 'astro/config';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://dhaphase6lahore.pk',

  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      filter: (page) => !page.includes('/admin/') && !page.includes('/private/'),
      serialize: (item) => {
        // Pillar Master Guides & Primary Dashboards get highest priority (1.0)
        if (
          item.url === 'https://dhaphase6lahore.pk/' ||
          item.url.endsWith('/dha-phase-6-lahore/') ||
          item.url.endsWith('/dha-phase-6-lahore-guide/') ||
          item.url.endsWith('/dha-phase-6-property-market-dashboard/') ||
          item.url.endsWith('/dha-phase-6-market-updates/') ||
          item.url.endsWith('/dha-phase-6-faq/')
        ) {
          item.priority = 1.0;
          item.changefreq = ChangeFreqEnum.DAILY;
        }
        // Sector Entity Profiles & Key Comparison / Intent Pages (0.8)
        else if (
          item.url.includes('/entities/') ||
          item.url.includes('/dha-phase-6-sector-') ||
          item.url.includes('/dha-phase-6-sector-ranking/') ||
          item.url.includes('/dha-phase-6-commercial-areas/') ||
          item.url.includes('/search-property/') ||
          item.url.includes('/property-advisor/') ||
          item.url.includes('/houses-for-sale-dha-phase-6-lahore/') ||
          item.url.includes('/plots-for-sale-dha-phase-6-lahore/')
        ) {
          item.priority = 0.8;
          item.changefreq = ChangeFreqEnum.WEEKLY;
        }
        // Facility hubs, blog posts & calculators (0.7)
        else if (
          item.url.includes('/schools-in-') ||
          item.url.includes('/hospitals-in-') ||
          item.url.includes('/blog/') ||
          item.url.includes('/calculator')
        ) {
          item.priority = 0.7;
          item.changefreq = ChangeFreqEnum.WEEKLY;
        }
        // Specific property snapshots and places directory (0.6)
        else if (item.url.includes('/properties/') || item.url.includes('/places/')) {
          item.priority = 0.6;
          item.changefreq = ChangeFreqEnum.MONTHLY;
        }
        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    domains: [],
    remotePatterns: [],
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  compressHTML: true,

  build: {
    inlineStylesheets: 'auto',
  },
});
