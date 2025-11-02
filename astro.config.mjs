// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import solidJs from '@astrojs/solid-js';
import markdoc from '@astrojs/markdoc';

export default defineConfig({
  output: "static",
  site: 'https://vivarium-ai.com',
  base: '/',   // omit or leave as '/'

  integrations: [starlight({
    title: "Vivarium AI Docs",
    social: [{ icon: 'github', label: 'Vivarium', href: 'https://github.com/vivarium-ai' }],
    sidebar: [
      {
        label: "Tutorials",
        autogenerate: { directory: "docs/tutorials" },
      },
      {
        label: "How-tos",
        autogenerate: { directory: "docs/howtos" },
      },
      {
        label: "Explanations",
        autogenerate: { directory: "docs/explanations" },
      },
      {
        label: "Reference",
        autogenerate: { directory: "docs/reference" },
      },
    ],
  }), solidJs(), markdoc()],
});
