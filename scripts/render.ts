// Usage: npm run render -- <compositionId> [outFile]
import { execFileSync } from "node:child_process";

const [id, out] = process.argv.slice(2);
if (!id) throw new Error("Usage: npm run render -- <compositionId> [outFile]");
execFileSync("npx", ["remotion", "render", "src/index.ts", id, out ?? `out/${id}.mp4`], { stdio: "inherit" });
