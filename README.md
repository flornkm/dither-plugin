![masked dither image of a flower](./demo/public/images/banner.webp)

# TailwindCSS Dither Plugin (Safari Compatible)

A TailwindCSS plugin that provides Safari-compatible dither effects without relying on SVG filters making dithering easy, performant, and accessible.

## Usage

To start using the `dither-plugin`, install with the following command:

```
npm install dither-plugin
```

Now add a `<div>` around the elements that should be dithered and add the `dither` class to it.

```tsx
<div className="dither">
  <Component />
</div>
```

Note that the class won't be applied when added directly to an img or video element, as these elements don't support `::after` pseudo-elements.

It's as easy as that! You can play around with it.

## Documentation and examples

A documentation and examples can be found [here](https://dither.floriankiem.com/).

---

Feel free to follow me on Twitter [@flornkm](https://twitter.com/flornkm) or on [GitHub](https://github.com/flornkm).

## License

MIT
