// Usage: npm run render -- <compositionId> [outName]
// 1) renders with Remotion to out/<name>.mp4  2) loudness-masters the audio (about -14 LUFS, -1.5 dBTP) to out/<name>-master.mp4
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const [id, name] = process.argv.slice(2);
if (!id) throw new Error("Usage: npm run render -- <compositionId> [outName]");
const base = name ?? id;
mkdirSync("out", { recursive: true });
execFileSync("npx", ["remotion", "render", "src/index.ts", id, `out/${base}.mp4`], { stdio: "inherit" });
execFileSync(
  "ffmpeg",
  ["-y", "-i", `out/${base}.mp4`, "-c:v", "copy", "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-c:a", "aac", "-b:a", "256k", `out/${base}-master.mp4`],
  { stdio: "inherit" },
);
console.log(`Done: out/${base}-master.mp4`);
