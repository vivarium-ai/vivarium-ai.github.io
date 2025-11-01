import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const docs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    kind: z.enum(["tutorial", "howto", "explanation", "reference"]),
    order: z.number().optional(),
  }),
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    author: z.string(),
    published: z.boolean().default(true),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    kind: z.enum(["tutorial", "howto", "explanation", "reference"]),
    order: z.number().optional(),
  }),
});

const newsletters = defineCollection({
  type: "content",
  schema: z.object({
    issue: z.number().optional(),
  }),
});

const papers = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    authors: z.array(string()),
    emails: z.array(string()),
    date: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog: blog,
  newsletter: newsletters,
  docs: docs,
  papers: papers,
};
