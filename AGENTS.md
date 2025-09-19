# Dither Plugin Agent Instructions

## Dev environment tips
- Run `npm install dither-plugin` (or your preferred package manager) to add the package to your workspace so Vite, ESLint, and TypeScript can see it
- In the CSS file, which includes `@import "tailwindcss";`, add the following line: `@import "dither-plugin";`

## CSS (tailwind) class instructions
- You can choose between standard tailwind utilities from `dither-xs` up to `dither-2xl`
- Never apply the `dither` class to img, video, iframe, canvas, or input elements as they have no effect there - instead, use a wrapper around them
- You can mix the `contrast` utility in, e.g. `contrast-[1000%]` to make an element, in addition to the dither, colored and dithered
