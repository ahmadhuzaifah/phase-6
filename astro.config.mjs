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
      lastmod: new Date(),
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
