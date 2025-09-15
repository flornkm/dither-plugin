import Copier from "./components/copier";
import { CodeIcon, ComponentIcon } from "./components/icon";

function App() {
  return (
    <main className="min-h-screen px-4 py-4">
      <div className="w-full max-w-3xl flex flex-col items-center mx-auto pb-24">
        <div className="relative h-72 overflow-hidden mb-12 rounded-2xl ">
          <div className="w-full dither">
            <img
              src="/images/flower.webp"
              alt="Flower"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <img
            src="/images/flower.webp"
            alt="Flower"
            className="w-full h-full absolute inset-0 object-cover object-top mask mask-r-to-75% mask-r-from-0%"
          />
        </div>
        <h1 className="text-lg text-center font-semibold mb-1.5 leading-tight">
          Dither Plugin - The easiest way to add dither effects in the web
        </h1>
        <p className="text-sm text-center text-neutral-500 mb-6 max-w-lg mx-auto">
          The dither plugin for TailwindCSS is adding a dither effect to your elements by using
          simple CSS filters. The plugin is free to use and open-source.
        </p>
        <div className="flex flex-col justify-between items-center gap-8 mb-12">
          <Copier packageManagers={["npm", "yarn", "pnpm", "bun"]} />
        </div>
        <div className="mb-16 w-full">
          <div className="mb-6">
            <p className="text-sm mb-2 text-neutral-500">
              Import into your <CodeIcon className="inline-block w-3 ml-1 mb-0.5" /> stylesheet:
            </p>
            <div className="font-mono text-sm bg-neutral-100 py-4 px-6 rounded-lg">
              @import "tailwindcss";
              <br /> @import "dither-plugin";
            </div>
          </div>
          <div>
            <p className="text-sm mb-2 text-neutral-500">
              …and use in your <ComponentIcon className="inline-block w-3 ml-1 mb-0.5" /> components
              like this:
            </p>
            <div className="font-mono text-sm bg-neutral-100 py-4 px-6 rounded-lg mb-2">
              &lt;div className="dither"&gt; <br /> ㅤㅤ&lt;Component /&gt; <br />
              &lt;/div /&gt;
            </div>
            <p className="text-xs mb-2 text-neutral-500">
              It is strongly recommended to use div-wrappers as images don't support ::after
              pseudo-elements.
            </p>
          </div>
        </div>
        <h2 className="font-semibold mb-4 w-full">What is it capable of?</h2>
        <div className="space-y-8 mb-24">
          <div className="gap-4 flex flex-col">
            <div className="overflow-hidden rounded-2xl w-full h-96 dither hover:dither-none">
              <img src="/images/cat.webp" alt="Cat" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm mb-2 text-neutral-500">
              Apply effects on images (and add hover effects, hover the image)
            </p>
          </div>
          <div className="gap-4 flex flex-col">
            <div className="overflow-hidden rounded-2xl w-full h-96 dither">
              <img
                src="/videos/granny-memoji.webp"
                alt="Cat"
                className="w-full h-full object-contain bg-white"
              />
            </div>
            <p className="text-sm mb-2 text-neutral-500">Apply effects on videos</p>
          </div>
          <div className="gap-4 flex flex-col">
            <div className="flex items-center justify-center rounded-2xl w-full dither">
              <h2 className="text-center text-6xl font-bold bg-gradient-to-b from-white/10 py-8 to-white">
                You can apply dither everywhere!
              </h2>
            </div>
            <p className="text-sm mb-2 text-neutral-500">And basically everywhere else…</p>
          </div>
        </div>
        <p className="text-sm mb-2 text-neutral-500 mb-8">
          The best thing is, it is fully compatible with Tailwind CSS and runs in every browser
          (which makes it unique to other plugins as Safari doesn't support SVG URI data in css
          filters). You can mix it up with other classes and customize it to your needs.
        </p>
        <div className="sticky bottom-8 bg-black text-neutral-300 rounded-full shadow-xl py-2 px-4 w-auto max-w-lg flex items-center justify-center mx-auto">
          <p>
            Like it?{" "}
            <a
              target="_blank"
              href="https://github.com/flornkm/dither-plugin"
              className="text-white font-medium"
            >
              Star it on GitHub
            </a>{" "}
            and follow me on{" "}
            <a
              target="_blank"
              href="https://twitter.com/flornkm"
              className="text-white font-medium"
            >
              X (Twitter)
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
