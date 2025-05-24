# TailwindCSS Dither Plugin (Safari Compatible)

A TailwindCSS plugin that provides Safari-compatible dither effects without relying on SVG filters.

## Why This Version?

The original implementation used SVG filters in data URIs, which Safari doesn't support reliably. This version provides multiple Safari-compatible alternatives using CSS background patterns and blend modes.

## Installation

### Option 1: Use as Complete CSS File

The `src/index.css` file includes all TailwindCSS directives and can be used as your main CSS file:

```bash
# Build the CSS
pnpm tailwindcss -i ./src/index.css -o ./dist/dither-plugin.css -m

# Or include directly in your build process
```

### Option 2: Import into Existing TailwindCSS Setup

If you already have TailwindCSS set up, you can extract just the `@layer utilities` block and add it to your existing CSS.

## Usage

You now have three dither effect options:

### 1. `.dither` (Recommended)

The main Safari-compatible dither effect using pseudo-elements and blend modes:

```html
<div class="dither">
  <img src="your-image.jpg" alt="Dithered image" />
</div>
```

### 2. `.dither-backdrop`

Uses backdrop-filter for modern Safari versions:

```html
<div class="dither-backdrop">
  <img src="your-image.jpg" alt="Dithered image" />
</div>
```

### 3. `.dither-simple`

A simple background-based approach:

```html
<img src="your-image.jpg" alt="Dithered image" class="dither-simple" />
```

## Browser Support

- ✅ Safari (all versions)
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Mobile browsers

## How It Works

Instead of SVG filters, this implementation uses:

- **4x4 Bayer matrix** as a background pattern (base64 encoded PNG)
- **CSS blend modes** to apply the dithering effect
- **CSS filters** for desaturation and contrast adjustment
- **Pseudo-elements** for layering effects

## Technical Details

The dither patterns are embedded as tiny base64-encoded PNG images:

- 4x4 Bayer matrix (59 bytes)
- 8x8 ordered dither pattern (318 bytes)

These patterns are tiled across the element and blended with the content to create the dithering effect.

## Build Commands

```bash
# Development build
pnpm tailwindcss -i ./src/index.css -o ./dist/dither-plugin.css --watch

# Production build (minified)
pnpm tailwindcss -i ./src/index.css -o ./dist/dither-plugin.css -m
```

## Troubleshooting

If the effect isn't working:

1. Make sure the element has content/background
2. Check that the element isn't transparent
3. Try adjusting the opacity values in the CSS
4. For images, ensure they're not using `object-fit` that might interfere

## Customization

You can adjust the dither intensity by modifying:

- `opacity` values in the pseudo-elements
- `contrast()` and `brightness()` filter values
- The dither pattern by replacing the base64 image data

## License

MIT
