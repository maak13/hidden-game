// Checks every episode folder has the files the plan requires (section 11).
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const REQUIRED = ["brief.md", "research.md", "sources.json", "script.md", "scenes.json"];
const root = join(process.cwd(), "episodes");
const episodes = existsSync(root) ? readdirSync(root).filter((d) => d.startsWith("episode-")) : [];

let problems = 0;
for (const ep of episodes) {
  for (const f of REQUIRED) {
    if (!existsSync(join(root, ep, f))) {
      console.error(`${ep}: missing ${f}`);
      problems++;
    }
  }
  if (!existsSync(join(root, ep, "voiceover.wav"))) console.warn(`${ep}: voiceover.wav not added yet`);
}
console.log(`${episodes.length} episode(s) checked, ${problems} problem(s).`);
process.exit(problems ? 1 : 0);
