import Copier from "./components/copier";
import { CodeIcon, ComponentIcon } from "./components/icon";
import DitherHover from "./components/dither-hover";

function App() {
  return (
    <main className="min-h-screen px-4 py-4">
      <div className="w-full max-w-3xl flex flex-col items-center mx-auto pb-24">
        <div className="relative h-72 overflow-hidden mb-12 rounded-sm border border-neutral-200">
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
            <div className="font-mono text-sm bg-neutral-100 py-4 px-6 rounded-sm">
              @import "tailwindcss";
              <br /> @import "dither-plugin";
            </div>
          </div>
          <div>
            <p className="text-sm mb-2 text-neutral-500">
              …and use in your <ComponentIcon className="inline-block w-3 ml-1 mb-0.5" /> components
              like this:
            </p>
            <div className="font-mono text-sm bg-neutral-100 py-4 px-6 rounded-sm mb-2">
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
          <div className="gap-2 flex flex-col">
            <div className="rounded-sm overflow-hidden bg-white border border-neutral-200">
              <div className="overflow-hidden w-full h-96 dither transition-all active:dither-xl">
                <img
                  src="/images/cat.webp"
                  alt="Cat"
                  className="w-full h-full object-cover select-none"
                />
              </div>
            </div>
            <p className="text-xs mb-2 text-neutral-500">
              Add on top of images, combine pseudo-classes (keep the image pressed)
            </p>
          </div>
          <div className="gap-2 flex flex-col">
            <div className="rounded-sm overflow-hidden bg-white border border-neutral-200">
              <div className="overflow-hidden w-full h-96 dither">
                <img
                  src="/videos/granny-memoji.webp"
                  alt="Cat"
                  className="w-full h-full object-contain bg-white"
                />
              </div>
            </div>
            <p className="text-xs mb-2 text-neutral-500">
              Apply dither on top of videos and animations
            </p>
          </div>
          <div className="gap-2 flex flex-col">
            <div className="rounded-sm overflow-hidden bg-white border border-neutral-200">
              <div className="flex items-center justify-center w-full dither-lg">
                <h2 className="text-center text-6xl font-bold bg-gradient-to-b from-white/10 py-8 to-white">
                  You can apply dither everywhere!
                </h2>
              </div>
            </div>
            <p className="text-xs mb-2 text-neutral-500">
              Make your text and custom styles dithered
            </p>
          </div>
          <div className="gap-2 flex flex-col">
            <div className="rounded-sm overflow-hidden">
              <DitherHover
                src="/videos/flowers.webm"
                alt="Flower hover reveal"
                className="w-full h-96 rounded-sm border border-neutral-200"
                imgClassName="object-cover object-top"
                invert
                feather={24}
              />
            </div>
            <p className="text-xs mb-2 text-neutral-500">
              Use it with advanced effects and CSS filters
            </p>
          </div>
        </div>
        <p className="text-sm text-neutral-500 mb-24">
          The best thing is, it is fully compatible with Tailwind CSS and runs in every browser
          (which makes it unique to other plugins as Safari doesn't support SVG URI data in css
          filters). You can mix it up with other classes and customize it to your needs.
        </p>
        {/*<Avatar />*/}
        <div className="sticky gap-6 text-balance bottom-4 lg:bottom-8 bg-black text-neutral-300 rounded-full shadow-xl p-2 w-auto max-w-lg flex items-center justify-center mx-auto">
          <div className="flex items-center gap-2">
            <a
              target="_blank"
              href="https://github.com/flornkm/dither-plugin"
              className="text-white text-sm font-medium bg-neutral-800 hover:bg-neutral-700 transition-all rounded-full px-2 py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="size-4 inline-block mr-2 mb-0.5"
              >
                <path
                  d="M12 1.95068C17.525 1.95068 22 6.42568 22 11.9507C21.9995 14.0459 21.3419 16.0883 20.1198 17.7902C18.8977 19.4922 17.1727 20.768 15.1875 21.4382C14.6875 21.5382 14.5 21.2257 14.5 20.9632C14.5 20.6257 14.5125 19.5507 14.5125 18.2132C14.5125 17.2757 14.2 16.6757 13.8375 16.3632C16.0625 16.1132 18.4 15.2632 18.4 11.4257C18.4 10.3257 18.0125 9.43818 17.375 8.73818C17.475 8.48818 17.825 7.46318 17.275 6.08818C17.275 6.08818 16.4375 5.81318 14.525 7.11318C13.725 6.88818 12.875 6.77568 12.025 6.77568C11.175 6.77568 10.325 6.88818 9.525 7.11318C7.6125 5.82568 6.775 6.08818 6.775 6.08818C6.225 7.46318 6.575 8.48818 6.675 8.73818C6.0375 9.43818 5.65 10.3382 5.65 11.4257C5.65 15.2507 7.975 16.1132 10.2 16.3632C9.9125 16.6132 9.65 17.0507 9.5625 17.7007C8.9875 17.9632 7.55 18.3882 6.65 16.8757C6.4625 16.5757 5.9 15.8382 5.1125 15.8507C4.275 15.8632 4.775 16.3257 5.125 16.5132C5.55 16.7507 6.0375 17.6382 6.15 17.9257C6.35 18.4882 7 19.5632 9.5125 19.1007C9.5125 19.9382 9.525 20.7257 9.525 20.9632C9.525 21.2257 9.3375 21.5257 8.8375 21.4382C6.8458 20.7752 5.11342 19.502 3.88611 17.799C2.65881 16.096 1.9989 14.0498 2 11.9507C2 6.42568 6.475 1.95068 12 1.95068Z"
                  fill="currentColor"
                />
              </svg>
              <span className="hidden md:inline">Star it on</span> GitHub
            </a>
            <a
              target="_blank"
              href="https://twitter.com/flornkm"
              className="text-white text-sm font-medium bg-neutral-800 hover:bg-neutral-700 transition-all rounded-full px-2 py-1"
            >
              <svg
                className="size-4 inline-block mr-2 mb-0.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M17.5652 3.25H20.5319L14.0505 10.6628L21.6753 20.75H15.7052L11.0291 14.6322L5.67867 20.75H2.71017L9.64264 12.8212L2.32812 3.25H8.44986L12.6766 8.84192L17.5652 3.25ZM16.524 18.9731H18.1679L7.55662 4.93359H5.79256L16.524 18.9731Z"
                  fill="currentColor"
                />
              </svg>
              X <span className="hidden min-[390px]:inline">(Twitter)</span>
            </a>
          </div>
          <a
            href="https://www.npmjs.com/package/dither-plugin"
            className="text-black text-sm cursor-pointer font-medium bg-white hover:bg-neutral-200 transition-all rounded-full px-2 py-1"
          >
            Download
          </a>
        </div>
      </div>
    </main>
  );
}

export default App;
