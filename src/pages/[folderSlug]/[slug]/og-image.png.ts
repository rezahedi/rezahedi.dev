import fs from "fs/promises";
import type { APIRoute } from "astro";
import OGImage from "@components/og-image";
import { ImageResponse } from '@vercel/og';
import { getCollection, getEntry, type ContentEntryMap } from "astro:content";

export const GET: APIRoute = async ({ params, request }) => {
  const { folderSlug, slug } = params;
  
  // Validate params
  if (
    typeof folderSlug !== "string" ||
    /[^a-z]/.test(folderSlug) ||
    typeof slug !== "string" ||
    /[^a-z0-9-]/.test(slug)
  ) {
    return new Response("Not Found", { status: 404 });
  }

  // Get post by slug
  const post = await getEntry(folderSlug as keyof ContentEntryMap, slug);
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
      title: post.data.title || "",
      date: post.data.pubDate || "",
      author: post.data.author.name || "",
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