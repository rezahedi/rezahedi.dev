import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import sectionize from '@hbsnow/rehype-sectionize';
import { githubCard } from './src/utils/github';

import vercelServerless from "@astrojs/vercel/serverless";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: 'https://rezahedi.dev',
  integrations: [mdx(), sitemap(), preact()],
  markdown:{
    rehypePlugins: [
      sectionize,
      githubCard
    ],
  },
  output: 'server',
  adapter: vercelServerless()
});