// Voiceover is recorded/provided by the channel owner (no paid TTS).
// This script reads episodes/<episode>/voiceover.wav and prints its exact duration
// so scenes can be timed to the real audio (plan: "use actual voiceover duration").
// Usage: npm run voice -- episode-001
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const ep = process.argv[2];
if (!ep) throw new Error("Usage: npm run voice -- <episode-folder>");
const file = join(process.cwd(), "episodes", ep, "voiceover.wav");
const out = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString().trim();
const seconds = parseFloat(out);
console.log(`${ep}: ${seconds.toFixed(2)}s = ${Math.ceil(seconds * 30)} frames @30fps`);
