// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://dhaphase6lahore.pk',

  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      filter: (page) => !page.includes('/admin/') && !page.includes('/private/'),
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
