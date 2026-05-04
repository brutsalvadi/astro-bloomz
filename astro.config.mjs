import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import { remarkWikiRefs } from 'remark-wikirefs';
import { remarkCaml } from 'remark-caml';
import { unlinkSync } from 'fs';
import { fileURLToPath } from 'url';
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

// Astro's glob loader doesn't trigger a full re-scan on unlink events, and
// its persisted data-store.json survives server.restart() — so deleted entries
// linger. Fix: on unlink, clear data-store.json then restart so Astro does a
// full re-scan from scratch instead of loading the stale persisted store.
// Vite reuses the same FSWatcher instance across restarts, so we keep a
// module-level handler reference and remove it before re-adding to avoid
// listener accumulation.
let _unlinkHandler = null;
function contentDeleteWatcher() {
  return {
    name: 'content-delete-watcher',
    hooks: {
      'astro:server:setup': ({ server }) => {
        const siteRoot = new URL('.', import.meta.url).pathname;
        const dataStore = fileURLToPath(new URL('.astro/data-store.json', import.meta.url));
        const pagesRoot = fileURLToPath(new URL('../pages/', import.meta.url));
        const blogRoot = fileURLToPath(new URL('../blog/', import.meta.url));
        const watched = [
          pagesRoot,
          blogRoot,
        ];
        if (_unlinkHandler) server.watcher.off('unlink', _unlinkHandler);
        let restarting = false;
        _unlinkHandler = (filePath) => {
          if (restarting || !filePath.endsWith('.md')) return;
          if (watched.some(dir => filePath.startsWith(dir))) {
            restarting = true;
            try { unlinkSync(dataStore); } catch {}
            server.restart();
          }
        };
        server.watcher.on('unlink', _unlinkHandler);
      },
    },
  };
}

export default defineConfig({
  site: 'https://wiki.bincio.com',
  integrations: [sitemap(), tailwind(), svelte(), contentDeleteWatcher()],
  markdown: { remarkPlugins },
  vite: {
    server: {
      fs: {
        allow: ['..'],
      },
      proxy: {
        '/api': 'http://localhost:8001',
        '/pages': 'http://localhost:8001',
        '/stories': 'http://localhost:8001',
        '/rebuild': 'http://localhost:8001',
      },
    },
  },
});
