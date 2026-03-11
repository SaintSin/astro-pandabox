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

### Astro 6 Preparation

- Removed `sharp` dependency - not required in Astro 6 and causes upgrade issues
- Updated `content.config.ts` to use new Content Layer API with `glob()` loader
- Uses `astro/loaders` for file-based content loading
- Schema pattern updated for Astro 6 compatibility
- Prepared for upcoming Astro 6 migration
