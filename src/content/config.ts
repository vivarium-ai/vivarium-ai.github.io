import { defineCollection, z } from 'astro:content';
import { glob } from "astro/loaders";

const docsSchema = z.object({
  title: z.string(),
  tags: z.array(z.string()).optional(),
  order: z.number().optional(),
});

const docs = defineCollection({
  loader: glob({ pattern: "*.mdoc", base: "./src/content/docs/" }),
  schema: docsSchema,
});

const ecosystem = defineCollection({
  loader: glob({
    base: "./src/content/docs",
    pattern: [
      "ai-ecosystem.mdoc",
      "ai-ecosystem/**/*.mdoc",
    ],
  }),
  schema: docsSchema,
});

const models = defineCollection({
  loader: glob({
    base: "./src/content/docs",
    pattern: [
      "ai-models.mdoc",
      "ai-models/**/*.mdoc",
    ],
  }),
  schema: docsSchema,
});

const architecture = defineCollection({
  loader: glob({
    base: "./src/content/docs",
    pattern: [
      "vivarium-architecture.mdoc",
      "vivarium-architecture/**/*.mdoc",
    ],
  }),
  schema: docsSchema,
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/docs/articles" }),
  schema: docsSchema,
});

const tutorials = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/docs/tutorials" }),
  schema: docsSchema,
});

const howtos = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/docs/howtos" }),
  schema: docsSchema,
});

const reference = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/docs/reference" }),
  schema: docsSchema,
});

const news = z.object({
  title: z.string(),
  author: z.string(),
  date: z.coerce.date(),
  published: z.boolean().default(true),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/blog" }),
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

const time = z.string().regex(
  /^([01]\d|2[0-3]):[0-5]\d$/,
  "Use HH:MM, e.g. 10:00"
);

const timeZone = z.string().regex(
  /^[A-Za-z_]+\/[A-Za-z_]+(?:\/[A-Za-z_]+)?$/,
  "Use an IANA zone, e.g. America/Los_Angeles"
);

const events = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    location: z.string(),
    event_online_url: z.string().optional(),
    location_url: z.string().optional(),
    event_url: z.string().optional(),
    rsvp_url: z.string().optional(),
    start_date: z.date(),
    end_date: z.date().optional(),
    time_zone: timeZone,
    start_time: time,
    end_time: time,
    duration: time.optional(),
    recurring: z.string().optional(),
  }),
});

export const collections = {
  blog,
  newsletters,
  papers,
  events,
  docs,
  ecosystem,
  models,
  architecture,
  articles,
  tutorials,
  howtos,
  reference,
};
