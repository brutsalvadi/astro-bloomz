import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import { remarkWikiRefs } from 'remark-wikirefs';
import { remarkCaml } from 'remark-caml';
import {
  resolveHtmlHref,
  resolveHtmlText,
  createResolveEmbedContent,
  generateForeRefsRemarkPlugin,
} from './src/wikibonsai/wikirefs';

const remarkPlugins = [
  remarkCaml,
  [
    remarkWikiRefs,
    {
      resolveHtmlHref,
      resolveHtmlText,
      resolveEmbedContent: null,
    },
  ],
  generateForeRefsRemarkPlugin,
];

const resolveEmbedContent = createResolveEmbedContent(remarkPlugins);
remarkPlugins[1][1].resolveEmbedContent = resolveEmbedContent;

export default defineConfig({
  site: 'https://wiki.bincio.com',
  integrations: [sitemap(), tailwind(), svelte()],
  markdown: { remarkPlugins },
});
