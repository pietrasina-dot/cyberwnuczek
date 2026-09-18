import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().max(48).optional(),
    description: z.string().min(140).max(170),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    topic: z.enum([
      'oszustwa-internetowe',
      'hasla-i-konta',
      'bankowosc-online',
      'smartfon',
    ]),
    related: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageKind: z.enum(['photo', 'illustration']).default('photo'),
    draft: z.boolean().default(false),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .default([]),
    glossary: z
      .array(
        z.object({
          term: z.string(),
          definition: z.string(),
        }),
      )
      .default([]),
  }),
});

export const collections = { articles };
