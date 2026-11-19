## 0.0.1

### Added

- Initial release

## 0.0.2

### Added

- Add class "gallery" and an ID to the gallery container.
-

## 0.0.3

### Upgrade to Astro 5

- Covers changes to content collection to use Content Layer API, the config file is now content.config.ts

## 0.0.4

### Upgrade to Astro 5.10 Responsive images

- Use responsive images, constrained for thumbnails and full-width for slides.

## 0.0.5

### Changed

- Debug console logging now only appears in development mode, not in production builds

## 0.0.6

### Upgrade to Astro 6

- Upgraded to Astro 6 with new Content Layer API
- Removed `sharp` dependency - not required in Astro 6
- Updated `content.config.ts` to use new `glob()` loader from `astro/loaders`
- Schema now uses callback pattern: `schema: ({ image }) => z.object(...)`
- Imports Zod from `astro/zod` instead of external package
- Content collections auto-validate with new runtime validation

## 0.0.7

### Upgrade to Astro 7

- Upgraded to Astro 7 (7.4.13). No changes were needed to `Pandabox.astro`, `content.config.ts` or the pages
- Requires Node.js 22.23.4 or newer, which the current Astro 7.4 releases need
- Aligned `sharp` with the range Astro 7 bundles (`^0.35.5`); updated `@astrojs/check`, `astro-icon` and `@iconify-json/carbon`
- README: added upgrade notes for Astro 7, and fixed curly quotes in the Astro 6 code example that broke copy and paste
