import { IconDevices } from "@central-icons-react/round-outlined-radius-1-stroke-2/IconDevices";
import { IconMoon } from "@central-icons-react/round-outlined-radius-1-stroke-2/IconMoon";
import { IconSun } from "@central-icons-react/round-outlined-radius-1-stroke-2/IconSun";
import { motion } from "motion/react";
import { cn } from "../utils/cn";
import type { Theme } from "../utils/theme";

const OPTIONS: { value: Theme; label: string; Icon: typeof IconSun }[] = [
  { value: "system", label: "System theme", Icon: IconDevices },
  { value: "light", label: "Light theme", Icon: IconSun },
  { value: "dark", label: "Dark theme", Icon: IconMoon },
];

export function ThemeToggle({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (theme: Theme) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex shrink-0 items-center gap-0.5 rounded-full p-0.5 bg-neutral-100 dark:bg-neutral-900"
    >
      {OPTIONS.map(({ value, label, Icon }) => (
        <button
          key={value}
          role="radio"
          aria-checked={theme === value}
          aria-label={label}
          title={label}
          onClick={() => onChange(value)}
          className={cn(
            "relative grid size-7 cursor-pointer place-items-center rounded-full transition-colors",
            theme === value
              ? "text-neutral-900 dark:text-white"
              : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200",
          )}
        >
          {theme === value && (
            <motion.span
              layoutId="theme-toggle"
              className="absolute inset-0 rounded-full bg-white dark:bg-neutral-800 shadow-sm shadow-black/5 dark:shadow-black/40"
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            />
          )}
          <Icon size={14} className="relative z-10" />
        </button>
      ))}
    </div>
  );
}
