import { defineConfig, presetWind, presetIcons, presetAttributify } from 'unocss';

export default defineConfig({
  presets: [presetWind(), presetIcons(), presetAttributify()],
  shortcuts: {
    // Example: soft vignette “veil” + light blur
    'veil-mask': '[mask-image:radial-gradient(circle_at_60%_40%,black_28%,transparent_30%)] backdrop-blur-sm'
  },
  rules: [
    // e.g. mood-15 => subtle hue shift
    [/^mood-(\d+)$/, ([, d]) => ({ filter: `hue-rotate(${d}deg) saturate(1.05)` })]
  ]
});