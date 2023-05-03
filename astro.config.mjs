import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), preact()],
  output: 'server',
  adapter: vercel()
});