// src/lib/mermaid-server.ts
import { createHash } from "node:crypto";
import { mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFile } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// where we will drop generated SVGs
const OUT_DIR = join(__dirname, "..", "..", "public", "_mermaid");

export async function renderMermaidToSvg(code: string): Promise<string> {
  if (!code) return "";

  const hash = createHash("sha1").update(code).digest("hex").slice(0, 12);
  const outFile = join(OUT_DIR, `${hash}.svg`);

  mkdirSync(OUT_DIR, { recursive: true });

  if (!existsSync(outFile)) {
    await new Promise<void>((resolve, reject) => {
      // use the official CLI — reliable in CI
      // requires: npm i -D @mermaid-js/mermaid-cli
      execFile(
        "npx",
        ["mmdc", "-i", "stdin", "-o", outFile],
        {
          env: { ...process.env, MERMAID_INPUT: code },
        },
        (err, _stdout, stderr) => {
          if (err) {
            console.error("Mermaid render failed:", stderr);
            reject(err);
          } else {
            resolve();
          }
        }
      ).stdin?.end(code);
    });
  }

  // public/ is served from /
  return `/_mermaid/${hash}.svg`;
}
