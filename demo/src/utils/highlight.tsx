import { Fragment, type ReactNode } from "react";

/*
 * A ~200 line tokenizer instead of a highlighter dependency. The snippets on
 * this page are a handful of one-liners plus two markdown files, so the goal is
 * a hint of color, not full language coverage: three accents (violet for
 * keywords and tags, emerald for strings and values, sky for identifiers) on a
 * neutral base, with punctuation dropped back so the code reads as one block.
 */

const KIND_CLASS = {
  punct: "text-neutral-300 dark:text-neutral-600",
  keyword: "text-violet-600 dark:text-violet-400",
  string: "text-emerald-700 dark:text-emerald-400",
  ident: "text-sky-700 dark:text-sky-400",
  heading: "font-medium text-neutral-900 dark:text-white",
  strong: "text-neutral-900 dark:text-neutral-100",
  muted: "text-neutral-400 dark:text-neutral-500",
} as const;

type Kind = keyof typeof KIND_CLASS;
type Token = { t: string; k?: Kind };

export type Language = "shell" | "css" | "html" | "markdown";

/* ------------------------------------------------------------------ */
/*  Scanner                                                            */
/* ------------------------------------------------------------------ */

/** Walks `src` with `re`, handing each match to `map` and passing the gaps through as plain text. */
function scan(src: string, re: RegExp, map: (m: RegExpExecArray) => Token[]): Token[] {
  const out: Token[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  re.lastIndex = 0;
  while ((m = re.exec(src))) {
    if (m.index > last) out.push({ t: src.slice(last, m.index) });
    out.push(...map(m));
    last = m.index + m[0].length;
    if (m[0] === "") re.lastIndex++; // guard against a zero-width match looping
  }
  if (last < src.length) out.push({ t: src.slice(last) });
  return out;
}

/* ------------------------------------------------------------------ */
/*  Languages                                                          */
/* ------------------------------------------------------------------ */

function tokenizeShell(src: string): Token[] {
  let word = 0;
  return src.split(/(\s+)/).map((part) => {
    if (!part.trim()) return { t: part };
    word++;
    // `npm i`, `bun add` — binary then subcommand, everything after is an argument.
    if (word === 1) return { t: part, k: "keyword" };
    if (word === 2 || part.startsWith("-")) return { t: part, k: "ident" };
    return { t: part };
  });
}

const CSS_RE =
  /(\/\*[\s\S]*?\*\/)|(@[\w-]+)|("[^"]*"|'[^']*')|(--[\w-]+)|(\bvar\b)|([{}();:,])|(\b\d+(?:\.\d+)?[a-z%]*)/g;

function tokenizeCss(src: string): Token[] {
  return scan(src, CSS_RE, (m) => {
    const [t, comment, atRule, string, customProp, varFn, punct] = m;
    if (comment) return [{ t, k: "muted" }];
    if (atRule) return [{ t, k: "keyword" }];
    if (string) return [{ t, k: "string" }];
    if (customProp) return [{ t, k: "ident" }];
    if (varFn) return [{ t, k: "keyword" }];
    if (punct) return [{ t, k: "punct" }];
    return [{ t, k: "string" }]; // number
  });
}

const HTML_RE = /(<\/?)([\w.-]+)|(\/?>)|([\w:.-]+)(?=\s*=)|(=)|("[^"]*"|'[^']*')/g;

function tokenizeHtml(src: string): Token[] {
  return scan(src, HTML_RE, (m) => {
    const [t, open, tag, close, attr, equals, string] = m;
    if (open)
      return [
        { t: open, k: "punct" },
        { t: tag, k: "keyword" },
      ];
    if (close) return [{ t, k: "punct" }];
    if (attr) return [{ t, k: "ident" }];
    if (equals) return [{ t, k: "punct" }];
    if (string) return [{ t, k: "string" }];
    return [{ t }];
  });
}

const MD_INLINE_RE = /(`[^`\n]+`)|(\*\*[^*\n]+\*\*)/g;

function tokenizeMarkdownInline(src: string): Token[] {
  return scan(src, MD_INLINE_RE, (m) => [{ t: m[0], k: m[1] ? "string" : "strong" }]);
}

function tokenizeMarkdown(src: string): Token[] {
  const out: Token[] = [];
  let inFrontmatter = false;

  src.split("\n").forEach((line, i) => {
    if (i) out.push({ t: "\n" });

    if (/^---\s*$/.test(line)) {
      // Opening fence only counts on the first line; the next `---` closes it.
      if (i === 0) inFrontmatter = true;
      else if (inFrontmatter) inFrontmatter = false;
      out.push({ t: line, k: "punct" });
      return;
    }

    if (inFrontmatter) {
      const kv = /^([\w-]+)(:)(.*)$/.exec(line);
      if (kv) {
        out.push({ t: kv[1], k: "ident" }, { t: kv[2], k: "punct" }, { t: kv[3] });
        return;
      }
      out.push({ t: line });
      return;
    }

    const heading = /^(#{1,6})(\s+)(.*)$/.exec(line);
    if (heading) {
      out.push({ t: heading[1], k: "punct" }, { t: heading[2] }, { t: heading[3], k: "heading" });
      return;
    }

    const bullet = /^(\s*)([-*])(\s+)(.*)$/.exec(line);
    if (bullet) {
      out.push({ t: bullet[1] }, { t: bullet[2], k: "punct" }, { t: bullet[3] });
      out.push(...tokenizeMarkdownInline(bullet[4]));
      return;
    }

    out.push(...tokenizeMarkdownInline(line));
  });

  return out;
}

const TOKENIZERS: Record<Language, (src: string) => Token[]> = {
  shell: tokenizeShell,
  css: tokenizeCss,
  html: tokenizeHtml,
  markdown: tokenizeMarkdown,
};

/* ------------------------------------------------------------------ */
/*  Render                                                             */
/* ------------------------------------------------------------------ */

export function highlight(code: string, language: Language): ReactNode {
  return TOKENIZERS[language](code).map((token, i) =>
    token.k ? (
      <span key={i} className={KIND_CLASS[token.k]}>
        {token.t}
      </span>
    ) : (
      <Fragment key={i}>{token.t}</Fragment>
    ),
  );
}

/** Picks a language from the snippet itself, so callers don't have to label every field. */
export function detectLanguage(code: string): Language {
  const trimmed = code.trim();
  if (trimmed.startsWith("<")) return "html";
  if (trimmed.startsWith("@") || trimmed.startsWith("--")) return "css";
  return "shell";
}
