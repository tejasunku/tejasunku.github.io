import { defineConfig, presetUno, presetWebFonts } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      fonts: {
        sans: "Inter:400,500,600,700",
        mono: "JetBrains Mono:400,500",
      },
    }),
  ],
  shortcuts: {
    "btn": "px-4 py-2 rounded-lg font-medium transition-colors",
    "btn-primary": "btn bg-blue-600 text-white hover:bg-blue-700",
    "btn-ghost": "btn hover:bg-gray-100",
  },
});