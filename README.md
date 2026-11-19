# Pandabox: A Lightbox and Gallery Component for Astro

This is intended to be added to an existing Astro site.

- Astro version 6 or 7 (currently tested with Astro 7.4)
- Uses Content Collections with new Content Layer API for galleries
- Astro’s Image component for optimisation
- Dependency free
- Modern CSS
- Customised transition easings and timings, via CSS
- Slide transitions can be either fade or slide-in.
- Touch-enabled swiping of slides

## Upgrading to Astro 7

Pandabox needs no code changes for Astro 7: `Pandabox.astro`, `content.config.ts` and the galleries work as they are. This was checked on Astro 7.4.13 by type-checking, building, and opening, navigating and closing the lightbox in a browser.

### Key Changes

1. **Node.js 22.23.4 or newer** - what the current Astro 7.4 releases require (Astro 7.0 needed 22.12)
2. **Upgrade the Astro packages together** - for example `@astrojs/check`, and if you deploy to Netlify, `@astrojs/netlify` 8, the adapter line that supports Astro 7
3. **Align `sharp`** - Astro 7 installs its own copy (`^0.35`). If you pin `sharp` yourself, use 0.35 or remove the pin

Astro 7 also changes some defaults that can affect a site: Vite 8, a Rust-based compiler, `compressHTML: 'jsx'`, Sätteri as the default Markdown processor, advanced routing enabled by default, and the removal of deprecated `astro:transitions` APIs. See the [Astro changelog](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md) for details.

## Upgrading to Astro 6

### Key Changes

1. **Remove `sharp` dependency** - Not needed in Astro 6 clean installs

```bash
npm remove sharp
```

1. **Update `src/content/config.ts`** - Use new Content Layer API with `glob()` loader:
   - Import `glob` from `astro/loaders` (not `astro/content`)
   - Import Zod from `astro/zod`
   - Use callback pattern for schema: `schema: ({ image }) => z.object(...)`

### Migration Example

Before (Astro 5):
```typescript
import { defineCollection, z } from "astro:content";
```

After (Astro 6):
```typescript
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
```

The schema definition now uses a callback:
```typescript
const galleries = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/galleries' }),
  schema: ({ image }) => z.object({
    images: z.array(z.object({
      src: image(),
      alt: z.string(),
      title: z.string(),
      description: z.string(),
    })),
  }),
});
```

## Usage

Place `Pandabox.astro` in the components folder

If you have an existing content config file update it to include the content definition.

```typescript
const galleries = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/galleries' }),
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
