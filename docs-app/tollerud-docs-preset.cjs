const tollerudPreset = require('../tollerud-preset.cjs')

/**
 * Docs-only preset: map tollerud Tailwind colors to CSS variables so
 * html[data-theme="light"] remaps in docs-app/styles/docs.css affect npm component previews.
 * The published @tollerud/ui preset keeps static hex (dark-first).
 */
const tollerudColors = tollerudPreset.theme.extend.colors.tollerud
const varColors = Object.fromEntries(
  Object.keys(tollerudColors).map((key) => [key, `var(--tollerud-${key})`]),
)

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tollerudPreset],
  theme: {
    extend: {
      colors: {
        tollerud: varColors,
      },
    },
  },
}
