import { defineCollection, z } from "astro:content";

const galleries = defineCollection({
  type: "data",
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

export const collections = {
  galleries: galleries,
};
