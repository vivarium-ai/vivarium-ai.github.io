// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import solidJs from '@astrojs/solid-js';
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  site: 'https://vivarium-ai.com',
  base: '/',   // omit or leave as '/'

  integrations: [starlight({
    title: 'My Docs',
    social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
    sidebar: [
      {
        label: 'Guides',
        items: [
          // Each item here is one entry in the navigation menu.
          { label: 'Example Guide', slug: 'guides/example' },
        ],
      },
      {
        label: 'Reference',
        autogenerate: { directory: 'reference' },
      },
    ],
  }), solidJs(), markdoc()],
});
