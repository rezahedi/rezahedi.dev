import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    layout: z.string(),
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    category: z.string(),
    author: z.object({
      name: z.string(),
      handler: z.string(),
      avatar: z.string(),
      link: z.string(),
    }),
  })
});

export const collections = { blog };