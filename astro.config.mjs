// @ts-check
import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import markdoc from '@astrojs/markdoc';

export default defineConfig({
  output: "static",
  site: 'https://vivarium-ai.com',
  base: '/',

  integrations: [solidJs(), markdoc()],
});
