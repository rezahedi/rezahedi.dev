import fs from "fs/promises";
import type { APIRoute } from "astro";
import OGImage from "@components/og-image";
import { ImageResponse } from '@vercel/og';

export const GET: APIRoute = async ({ params, request }) => {
  const { folderSlug, slug } = params;
  
  // Validate slug param
  if (typeof slug !== "string" || /[^a-z0-9-]/.test(slug)) {
    return new Response("Not Found", { status: 404 });
  }

  // Get all posts
  const allPosts = import.meta.glob("../../*/*.{md, mdx}", { eager: true });

  // Get post by slug
  const post = allPosts[`../../${folderSlug}/${slug}.md`];
  if (!post) {
    return new Response("Not Found", { status: 404 });
  }
  
  // Load fonts
  const fontBoldData = await fs.readFile(
    "./public/fonts/MonaSans-Bold.ttf"
  );
  const fontRegularData = await fs.readFile(
    "./public/fonts/MonaSans-Regular.ttf"
  );

  return new ImageResponse(
    await OGImage({
      title: post.frontmatter.title || "",
      date: post.frontmatter.pubDate || "",
      author: post.frontmatter.author.name || "",
    }),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Mona-Sans-Bold",
          data: fontBoldData,
        },
        {
          name: "Mona-Sans-Regular",
          data: fontRegularData,
        },
      ],
    }
  );
};