// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";

import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-lightbox.netlify.app",
  devToolbar: {
    enabled: false,
  },
  integrations: [
    icon(),
    (await import("@playform/compress")).default({
      CSS: false,
      HTML: true,
      Image: false,
      JavaScript: true,
      SVG: true,
    }),
  ],
});
