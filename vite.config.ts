import { defineConfig } from "vite";
import cloudflare from "@cloudflare/vite-plugin";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [
    UnoCSS(),
    cloudflare(),
  ],
  build: {
    target: "es2022",
  },
});