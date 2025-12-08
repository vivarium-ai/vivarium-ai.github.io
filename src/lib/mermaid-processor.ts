// src/lib/mermaid-processor.ts
import { createHash } from "node:crypto";
import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const dir = dirname(fileURLToPath(import.meta.url));
const svgDir = "mermaid";

const outDir = join(dir, "..", "..", "public", svgDir);
const cacheDir = join(dir, "..", "..", ".mermaid-cache");

export function extractMermaidCode(node: any): string {
  const paragraph = node.children?.[0];
  const inline = paragraph?.children?.[0];
  if (!inline || !Array.isArray(inline.children)) return "";

  const parts: string[] = [];

  for (const child of inline.children) {
    if (child.type === "text" && typeof child.attributes?.content === "string") {
      parts.push(child.attributes.content);
    } else if (child.type === "softbreak") {
      parts.push("\n");
    }
  }

  return parts.join("").trim();
}

export function renderMermaidToSvg(code: string): string {
  const trimmed = code.trim();
  if (!trimmed) return "";

  const hash = createHash("sha1").update(trimmed).digest("hex").slice(0, 12);
  const outFile = join(outDir, `${hash}.svg`);
  const cacheFile = join(cacheDir, `${hash}.mmd`);

  mkdirSync(outDir, { recursive: true });
  mkdirSync(cacheDir, { recursive: true });

  if (!existsSync(outFile)) {
    writeFileSync(cacheFile, trimmed, "utf8");

    execFileSync(
      "npx",
      [
        "mmdc",
        "-i",
        cacheFile,
        "-o",
        outFile,
        "--backgroundColor",
        "transparent",
        "--quiet",
      ],
      { stdio: "inherit" }
    );
  }

  return `/${svgDir}/${hash}.svg`;
}
