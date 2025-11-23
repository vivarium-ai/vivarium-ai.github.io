import { defineCollection, z } from 'astro:content';

const news = z.object({
  title: z.string(),
  author: z.string(),
  date: z.coerce.date(),
  published: z.boolean().default(true),
});

const docs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    order: z.number().optional(),
  }),
});

const blog = defineCollection({
  type: "content",
  schema: news.extend({
    subtitle: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const newsletters = defineCollection({
  type: "content",
  schema: news.extend({
    week: z.number(),
  }),
});

const papers = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    authors: z.array(z.string()),
    emails: z.array(z.string()),
    date: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog: blog,
  newsletters: newsletters,
  docs: docs,
  papers: papers,
};
