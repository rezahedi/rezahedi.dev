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

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    layout: z.string(),
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    image: z.string(),
    link: z.string(),
    github: z.string(),
    category: z.string(),
    author: z.object({
      name: z.string(),
      handler: z.string(),
      avatar: z.string(),
      link: z.string(),
    }),
    tags: z.array(z.string())
  })
});


export const collections = { blog, projects };