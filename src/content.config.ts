import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const entries = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/entries',
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const index = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/index',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { blog, entries, index };
