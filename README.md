# Pandabox: A Lightbox and Gallery Component for Astro

This is intended to be added to an exisiting Astro site.

- Uses Content Collections for galleries, including alt text, and optional titles and descriptions.
- Astro’s Image component for optimisation
- Dependency free
- Modern CSS
- Customised transition easings and timings, via CSS
- Slide transitions can be either fade or slide-in.
- Touch-enabled swiping of slides

## Usage

Place `Pandabox.astro` in the components folder

If you have an existing content config file update it to include the content definition.

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

Import the `Pandabox.astro` component, and place it on the page:
`<Pandabox galleryid="panda" transitionType="fade" />`

`galleryid` references the name of the JSON file in the `content/galleries/` folder. The transitionType can be either _fade_ or _slide-in_.

CSS custom properties control some of the lightbox behaviour, allowing for easy customisation.

```css
.lightbox-dialog {
  /* Adjust these custom properties if you like */
  --duration-zoom-in: 1.2s; /* Duration of the zoom effect */
  --duration-background-transition: 0.5s; /* Duration of lightbox background transition*/
  --duration-slide-transition: 0.5s; /* Duration of slide transition*/
  --duration-close-transition: 0.75s; /* close*/
  --caption-height: 5lh; /* use line height units for size of caption area */
  --ease-zoom: cubic-bezier(0.5, -0.5, 0.1, 1.5);
  --ease-slide-transition: cubic-bezier(0.9, 0, 0.1, 1);
}
```

If you find this useful please give me the repo a star, or consider supporting my caffeine habbit.
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/X8X714JIO0)
