// Generates the original, licence-free sound library (music bed + sound effects) by synthesis.
// Output: public/assets/music/*.mp3 and public/assets/sound-effects/*.mp3. Requires ffmpeg.
// Usage: npm run sound
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SR = 44100;
const TAU = Math.PI * 2;
let seed = 1234567;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
const buf = (sec: number) => new Float32Array(Math.floor(sec * SR));

function lowpass(x: Float32Array, cutoffAt: (t: number) => number): Float32Array {
  const y = new Float32Array(x.length);
  let s = 0;
  for (let i = 0; i < x.length; i++) {
    const a = 1 - Math.exp((-TAU * cutoffAt(i / SR)) / SR);
    s += a * (x[i] - s);
    y[i] = s;
  }
  return y;
}
function normalize(x: Float32Array, peak: number) {
  let m = 0;
  for (const v of x) m = Math.max(m, Math.abs(v));
  const g = m ? peak / m : 1;
  for (let i = 0; i < x.length; i++) x[i] *= g;
  return x;
}
function wavBytes(x: Float32Array): Buffer {
  const b = Buffer.alloc(44 + x.length * 2);
  b.write("RIFF", 0); b.writeUInt32LE(36 + x.length * 2, 4); b.write("WAVEfmt ", 8);
  b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
  b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34);
  b.write("data", 36); b.writeUInt32LE(x.length * 2, 40);
  for (let i = 0; i < x.length; i++) b.writeInt16LE(Math.max(-1, Math.min(1, x[i])) * 32767, 44 + i * 2);
  return b;
}
function addClick(x: Float32Array, at: number, amp = 1, freq = 2400) {
  const n = Math.floor(0.03 * SR), o = Math.floor(at * SR);
  for (let i = 0; i < n && o + i < x.length; i++) {
    const t = i / SR;
    x[o + i] += amp * Math.exp(-t * 180) * (0.6 * Math.sin(TAU * freq * t) + 0.4 * rnd());
  }
}

const out: Record<string, { dir: string; data: Float32Array }> = {};
const sfx = (name: string, data: Float32Array) => (out[name] = { dir: "sound-effects", data });

// tap: soft counter tap
{ const x = buf(0.35);
  for (let i = 0; i < x.length; i++) { const t = i / SR; x[i] = Math.exp(-t * 22) * Math.sin(TAU * (150 - 60 * t) * t) + Math.exp(-t * 90) * rnd() * 0.5; }
  sfx("tap", normalize(lowpass(x, () => 2500), 0.8)); }
// tick
{ const x = buf(0.08); addClick(x, 0, 1); sfx("tick", normalize(x, 0.6)); }
// pop
{ const x = buf(0.35);
  for (let i = 0; i < x.length; i++) { const t = i / SR; x[i] = Math.exp(-t * 14) * Math.sin(TAU * (420 + 700 * Math.min(1, t * 20)) * t); }
  sfx("pop", normalize(x, 0.7)); }
// whoosh: filtered noise sweep
{ const d = 0.9, x = buf(d);
  for (let i = 0; i < x.length; i++) { const t = i / SR; x[i] = rnd() * Math.sin(Math.PI * Math.min(1, t / d)) ** 2; }
  sfx("whoosh", normalize(lowpass(x, (t) => 300 + 5500 * Math.sin((Math.PI * t) / d)), 0.7)); }
// rise: rising tone resolving
{ const d = 2.2, x = buf(d);
  for (let i = 0; i < x.length; i++) { const t = i / SR; const f = 220 * Math.pow(4, t / d); const env = Math.min(1, t / 1.8) ** 2 * (t < 1.9 ? 1 : Math.exp(-(t - 1.9) * 9));
    x[i] = env * (Math.sin(TAU * f * t) * 0.6 + Math.sin(TAU * f * 2 * t) * 0.2); }
  sfx("rise", normalize(lowpass(x, () => 3000), 0.55)); }
// bell (register ka-ching)
{ const x = buf(2.2);
  for (const [off, f] of [[0, 1760], [0.12, 2637]] as const) for (let i = 0; i < x.length - off * SR; i++) { const t = i / SR;
    x[i + Math.floor(off * SR)] += Math.exp(-t * 3.2) * (Math.sin(TAU * f * t) * 0.5 + Math.sin(TAU * f * 2.76 * t) * 0.2 + Math.sin(TAU * f * 5.4 * t) * 0.08); }
  sfx("bell", normalize(x, 0.6)); }
// stamp thud
{ const x = buf(0.9);
  for (let i = 0; i < x.length; i++) { const t = i / SR; x[i] = Math.exp(-t * 9) * Math.sin(TAU * (75 - 20 * t) * t) + Math.exp(-t * 70) * rnd() * 0.7; }
  sfx("stamp", normalize(lowpass(x, () => 1800), 0.95)); }
// swell: low rising swell
{ const d = 2.4, x = buf(d);
  for (let i = 0; i < x.length; i++) { const t = i / SR; const env = Math.sin((Math.PI / 2) * Math.min(1, t / (d * 0.8))) ** 2 * (t > d * 0.8 ? Math.exp(-(t - d * 0.8) * 6) : 1);
    x[i] = env * (Math.sin(TAU * 82 * t) * 0.6 + Math.sin(TAU * 123 * t) * 0.3 + rnd() * 0.15); }
  sfx("swell", normalize(lowpass(x, (t) => 200 + 900 * (t / d)), 0.6)); }
// odometer roll: decelerating clicks over 1.6s
{ const x = buf(1.7); let t = 0, gap = 0.035;
  while (t < 1.55) { addClick(x, t, 0.8, 1800 + rnd() * 300); t += gap; gap *= 1.09; }
  sfx("odo-roll", normalize(x, 0.6)); }
// single odometer click (heavier)
{ const x = buf(0.12); addClick(x, 0, 1, 1200); sfx("odo-click", normalize(lowpass(x, () => 4000), 0.8)); }

// music bed: warm slow pad, 112 s
{ const d = 112, x = buf(d);
  const notes = [55, 110, 164.81, 220, 277.18, 329.63];
  notes.forEach((f, k) => {
    const lfoF = 0.05 + k * 0.017, ph = k * 1.3;
    for (let i = 0; i < x.length; i++) { const t = i / SR; const amp = 0.55 + 0.45 * Math.sin(TAU * lfoF * t + ph);
      x[i] += amp * (Math.sin(TAU * f * t) + 0.5 * Math.sin(TAU * f * 1.003 * t + 1)) / (1 + k * 0.35); }
  });
  for (let i = 0; i < x.length; i++) { const t = i / SR; x[i] *= Math.min(1, t / 3) * Math.min(1, (d - t) / 4); }
  out["pad"] = { dir: "music", data: normalize(lowpass(x, () => 1400), 0.5) }; }

const root = process.cwd();
for (const [name, { dir, data }] of Object.entries(out)) {
  const folder = join(root, "public/assets", dir);
  mkdirSync(folder, { recursive: true });
  const wav = join(folder, `${name}.wav`);
  writeFileSync(wav, wavBytes(data));
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", wav, "-codec:a", "libmp3lame", "-b:a", "128k", join(folder, `${name}.mp3`)]);
  rmSync(wav);
  console.log(`${dir}/${name}.mp3`);
}
