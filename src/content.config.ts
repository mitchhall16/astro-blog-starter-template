import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    // Optional hero image shown on the post + featured hero cards
    heroImage: z.string().optional(),

    // Premium features
    featured: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional().default([]),

    // Optional: hide unfinished posts from lists
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
