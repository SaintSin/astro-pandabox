// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader(s)
import { glob } from "astro/loaders";

// 3. Define your collection(s)
const galleries = defineCollection({
  loader: glob({ pattern: "*.json", base: "src/content/galleries" }),
  schema: ({ image }) =>
    z.object({
      images: z.array(
        z.object({
          src: image(),
          alt: z.string(),
          title: z.string(),
          description: z.string(),
        }),
      ),
    }),
});

export const collections = { galleries: galleries };
