import { useState } from "react";

import Button from "./button";
import { ChevronDownIcon, CopyIcon } from "./icon";

const Copier = ({ packageManagers }: { packageManagers: string[] }) => {
  const [copied, setCopied] = useState(false);
  const [packageManager, setPackageManager] = useState(packageManagers[0]);

  const buildCommand = (pm: string) => {
    switch (pm) {
      case "npm":
        return "install";
      case "yarn":
        return "add";
      case "pnpm":
        return "add";
      case "bun":
        return "add";
      default:
        return "install";
    }
  };

  const command = `${buildCommand(packageManager)} dither-plugin`;

  return (
    <div className="flex w-full md:w-auto justify-between items-center gap-4 p-1 pr-[5px] pl-2 rounded-full border bg-neutral-50 border-neutral-200 text-sm">
      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            className="font-mono appearance-none rounded-full px-2 h-8 pr-5 outline-none focus:ring-1 focus:ring-neutral-200 transition-all cursor-pointer"
            value={packageManager}
            onChange={(e) => setPackageManager(e.target.value)}
          >
            {packageManagers.map((packageManager) => (
              <option key={packageManager} value={packageManager}>
                {packageManager}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
            <ChevronDownIcon className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-mono line-clamp-1">{command}</p>
        </div>
      </div>
      <Button
        className="py-2 pl-2"
        onClick={() => {
          navigator.clipboard.writeText(packageManager + " " + command);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        <CopyIcon className="w-4 h-4" />
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
};

export default Copier;
