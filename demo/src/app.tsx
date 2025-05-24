import Copier from "./components/copier";
import { CodeIcon, ComponentIcon } from "./components/icon";

function App() {
  return (
    <main className="min-h-screen px-4">
      <div className="w-full max-w-5xl mx-auto pb-24">
        <div className="overflow-hidden rounded-b-3xl w-full h-96 mb-8">
          <img src="/images/sky.webp" alt="Robot" className="w-full object-cover h-full dither" />
        </div>
        <h1 className="text-lg font-semibold mb-1.5 leading-tight">
          The easiest way to use dither effects in the web
        </h1>
        <p className="text-sm text-neutral-500 mb-6">
          The dither plugin for TailwindCSS is adding a dither effect to your elements by using
          simple SVG filters.
        </p>
        <div className="flex flex-col justify-between items-start gap-8 mb-12">
          <Copier packageManagers={["npm", "yarn", "pnpm"]} />
          <div>
            <p className="text-sm mb-2 text-neutral-500">
              …and then import into your <CodeIcon className="inline-block w-3 ml-1 mb-0.5" />{" "}
              stylesheet:
            </p>
            <div className="font-mono text-sm bg-neutral-100 py-4 px-6 rounded-lg">
              import "tailwindcss";
              <br /> import "dither-plugin";
            </div>
          </div>
          <div>
            <p className="text-sm mb-2 text-neutral-500">
              …and use in your <ComponentIcon className="inline-block w-3 ml-1 mb-0.5" /> components
              like this:
            </p>
            <div className="font-mono text-sm bg-neutral-100 py-4 px-6 rounded-lg">
              &lt;Component className="dither" /&gt;
            </div>
          </div>
        </div>
        <h2 className="font-semibold mb-2">Scroll for examples</h2>
        <div className="gap-4 flex flex-col">
          <div className="overflow-hidden rounded-xl w-full aspect-square">
            <img
              src="/images/flower.webp"
              alt="Flower"
              className="w-full h-full object-cover object-center dither"
            />
          </div>
          <div className="overflow-hidden rounded-xl w-full h-96">
            <video
              src="/videos/pot.mp4"
              autoPlay
              muted
              loop
              className="w-full h-full object-cover object-top dither"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
