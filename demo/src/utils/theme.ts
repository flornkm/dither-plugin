import { useCallback, useEffect, useState } from "react";

export type Theme = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme !== "system") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/* Mirrors the inline script in index.html, which paints the first frame before
   React boots so there is no light-mode flash on a dark-mode reload. */
function applyTheme(resolved: ResolvedTheme) {
  const dark = resolved === "dark";
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = resolved;
  const favicon = document.querySelector<HTMLLinkElement>("link[rel='icon']");
  if (favicon) favicon.href = dark ? "/favicon-dark.svg" : "/favicon-light.svg";
  const themeColor = document.querySelector<HTMLMetaElement>("meta[name='theme-color']");
  if (themeColor) themeColor.content = dark ? "#000000" : "#ffffff";
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);
  const [resolved, setResolved] = useState<ResolvedTheme>(() => resolveTheme(readStoredTheme()));

  useEffect(() => {
    const sync = () => setResolved(resolveTheme(theme));
    sync();
    // Only matters while on "system", but the listener is cheap and this keeps
    // the effect free of a second dependency path.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [theme]);

  useEffect(() => {
    applyTheme(resolved);
  }, [resolved]);

  const setTheme = useCallback((next: Theme) => {
    try {
      if (next === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — the choice just won't survive a reload */
    }
    setThemeState(next);
  }, []);

  return { theme, resolved, setTheme };
}
