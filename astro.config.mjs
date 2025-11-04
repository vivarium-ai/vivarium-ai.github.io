// @ts-check
import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import markdoc from '@astrojs/markdoc';
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  output: "static",
  site: 'https://vivarium-ai.com',
  base: '/',

  vite: { plugins: [tailwind()] },
  integrations: [solidJs(), markdoc()],
});
