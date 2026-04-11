import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./utils/cn";

const INSTALL_COMMANDS = [
  { label: "npm", command: "npm i dither-plugin" },
  { label: "pnpm", command: "pnpm add dither-plugin" },
  { label: "yarn", command: "yarn add dither-plugin" },
  { label: "bun", command: "bun add dither-plugin" },
];

function CodeField({ code, prefix }: { code: string; prefix?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-start justify-between gap-3 w-full rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 overflow-hidden">
      <div className="min-w-0 flex-1 relative">
        <pre className="tabular-nums font-normal text-sm whitespace-pre overflow-x-auto scrollbar-none">
          {prefix && <span className="text-neutral-300 dark:text-neutral-600 mr-2">{prefix}</span>}
          {code}
        </pre>
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-black to-transparent" />
      </div>
      <button
        onClick={copy}
        className="relative text-sm cursor-pointer text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 font-medium h-5 w-12 shrink-0"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{ opacity: 0, filter: "blur(2px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(2px)", scale: 0.9 }}
            transition={{ duration: 0.12 }}
            className="block origin-right"
          >
            {copied ? "Copied" : "Copy"}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}

function App() {
  const [pm, setPm] = useState(0);

  return (
    <main className="min-h-screen px-4 pt-4 pb-16">
      <div className="w-full max-w-3xl flex space-y-8 flex-col items-start mx-auto">
        <div className="space-y-2">
          <h1 className="text-base font-semibold leading-tight">Dither Plugin</h1>
          <p className="text-sm mb-1.5 leading-tight text-neutral-400">
            A CSS-only Tailwind plugin that adds dither effects to your elements.
          </p>
        </div>

        {/* Example */}
        <div className="w-full">
          <h2 className="font-semibold mb-4 leading-tight">Example</h2>
          <div className="relative size-72 overflow-hidden rounded-2xl">
            <div className="dark:invert">
              <div className="w-full dither">
                <img
                  src="/images/cat.webp"
                  alt="Cat"
                  className="w-full h-full object-cover object-top dark:invert"
                />
              </div>
            </div>
            <img
              src="/images/cat.webp"
              alt="Cat"
              className="w-full h-full absolute inset-0 object-cover object-top mask mask-r-to-65% mask-r-from-0%"
            />
          </div>
        </div>

        {/* Install */}
        <div className="w-full space-y-3">
          <h2 className="font-semibold leading-tight">Install</h2>
          <div className="flex items-center gap-3">
            {INSTALL_COMMANDS.map((p, i) => (
              <button
                key={p.label}
                onClick={() => setPm(i)}
                className={cn(
                  "text-sm cursor-pointer font-medium transition-colors",
                  pm === i
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-400 hover:text-neutral-500",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
          <CodeField code={INSTALL_COMMANDS[pm].command} prefix="$" />
        </div>

        {/* Usage */}
        <div className="w-full space-y-3">
          <h2 className="font-semibold leading-tight">Usage</h2>
          <div>
            <h3 className="text-sm mb-1.5 leading-tight text-neutral-400">
              Tailwind stylesheet
            </h3>
            <CodeField code="@import 'dither-plugin';" />
          </div>
          <div>
            <h3 className="text-sm mb-1.5 leading-tight text-neutral-400">
              Element classes
            </h3>
            <CodeField code={`<div className='dither-sm'>\n  <img src='...' />\n</div>`} />
          </div>
        </div>

        <p className="text-sm text-neutral-400 pt-4">
          Created by{" "}
          <a
            href="https://x.com/flornkm"
            target="_blank"
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Florian Kiem
          </a>
        </p>
      </div>
    </main>
  );
}

export default App;
