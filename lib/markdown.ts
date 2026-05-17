import fs from "node:fs";
import path from "node:path";

/**
 * Lightweight, dependency-free markdown renderer for our two static legal
 * pages. Supports: # / ## / ### headings, paragraphs, bullet lists, **bold**,
 * `inline code`, italics via *_*_*, links [text](href). Anything fancier and
 * we'd reach for a real markdown library — but for /privacy and /terms we
 * keep it tight.
 */
export function loadMarkdown(file: string): string {
  const filePath = path.join(process.cwd(), "content", file);
  return fs.readFileSync(filePath, "utf8");
}

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(s: string) {
  // bold
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // italics
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  // code
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  // links
  s = s.replace(
    /\[([^\]]+)\]\((https?:[^)]+|mailto:[^)]+|tel:[^)]+|\/[^)]+)\)/g,
    (_, text, href) =>
      `<a href="${href}" ${
        /^https?:/.test(href) ? 'target="_blank" rel="noreferrer noopener"' : ""
      }>${text}</a>`,
  );
  return s;
}

export function renderMarkdown(md: string): string {
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  let inUl = false;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(escape(para.join(" ")))}</p>`);
      para = [];
    }
  };
  const closeUl = () => {
    if (inUl) {
      out.push("</ul>");
      inUl = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line === "") {
      flushPara();
      closeUl();
      continue;
    }
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushPara();
      closeUl();
      const level = heading[1].length;
      out.push(
        `<h${level}>${inline(escape(heading[2]))}</h${level}>`,
      );
      continue;
    }
    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      flushPara();
      if (!inUl) {
        out.push("<ul>");
        inUl = true;
      }
      out.push(`<li>${inline(escape(bullet[1]))}</li>`);
      continue;
    }
    closeUl();
    para.push(line);
  }
  flushPara();
  closeUl();
  return out.join("\n");
}
