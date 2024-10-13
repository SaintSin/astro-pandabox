# Pandabox: A Lightbox and Gallery Component for Astro

This is intended to be a added to your exisiting Astro site.

- Uses Content Collections for galleries, including alt text, and optional titles and descriptions.
- Astro’s Image component for optimisation
- Dependency free
- Modern CSS
- Customised transition easings and timings, via CSS
- Slide transitions can be either fade or slide.
- Touch enabled swiping of slides

## Usage

Place `Pandabox.astro` in the components folder

If you have an existing content config file update it to include the content definiton.

```typescript
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
```

and include it in your export

```typescript
export const collections = {
  <!-- other collections here -->
  galleries: galleries,
};
```

If you do not have any content collections, then add `config.ts` to a folder `src/content`

The galleries are stored in JSON files within `content/galleries`

```json
{
  "images": [
    {
      "src": "@images/pandas/panda-01.jpg",
      "alt": "A cute panda munching on bamboo",
      "title": "Bamboo Lover",
      "description": "Pandas can eat up to 38 kilograms (84 pounds) of bamboo a day!"
    },
    {
      "src": "@images/pandas/panda-02.jpg",
      "alt": "A panda resting peacefully",
      "title": "Sleepy Panda",
      "description": "Pandas spend 12-16 hours a day eating, and the rest of the time they are usually sleeping."
    },
    {
      "src": "@images/pandas/panda-03.jpg",
      "alt": "A curious panda exploring its surroundings",
      "title": "Exploring Panda",
      "description": "Pandas have a great sense of smell, which helps them detect food and other pandas."
    }
  ]
}
```

Note: @images this is an [alias](https://docs.astro.build/en/guides/imports/#aliases) used for the image folder.

Import the `Pandabox.astro` component in your page, and then on the place it on the page `<Pandabox galleryid="panda" transitionType="fade" />`

`galleryid` references the name of the JSON file in the `content/galleries/` folder. The transitionType can be either _fade_ or _slide_.

# Lazy vs eager loading in component; css options, use grid or whatever you like for 

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/X8X714JIO0)
