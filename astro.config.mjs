// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://alrehmangarden.pk',

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
