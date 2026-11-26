import React from "react";
import { AbsoluteFill, Audio, Img } from "remotion";
import voiceover from "../../episodes/episode-003/voiceover.mp3";
import timing from "../../episodes/episode-003/timing.json";
import logo from "../../episodes/episode-003/assets/channel-logo.png";
import { MusicBed, Sfx, SfxName } from "../components/audio/Sfx";
import { Captions } from "../components/captions/Captions";
import { Scene, Variant } from "../components/transitions/Scene";
import { S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13 } from "../scenes/ep003/Scenes";
import { sec } from "../utils/timing";

// Episode 003 (vertical short): "Why a mug you own is worth double". Voiceover is 77.87 s.
export const EP003_DURATION = sec(79.3);

const SCENES: { start: number; C: React.FC; v: Variant }[] = [
  { start: 0, C: S1, v: "wipe" }, { start: 8.3, C: S2, v: "slideL" }, { start: 11.6, C: S3, v: "zoomIn" }, { start: 18.6, C: S4, v: "iris" },
  { start: 25.6, C: S5, v: "slideUp" }, { start: 34.5, C: S6, v: "zoomOut" }, { start: 39.2, C: S7, v: "slideR" }, { start: 46.0, C: S8, v: "wipe" },
  { start: 51.1, C: S9, v: "zoomIn" }, { start: 55.2, C: S10, v: "iris" }, { start: 64.4, C: S11, v: "slideL" }, { start: 69.4, C: S12, v: "slideUp" },
  { start: 73.6, C: S13, v: "zoomOut" },
];

// Captions: at most 4 words, one line. Split each spoken phrase into even chunks timed by character count.
const CAPS = timing.segments.flatMap((seg) => {
  const words = seg.text.split(" ");
  const n = Math.ceil(words.length / 4);
  const size = Math.ceil(words.length / n);
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += size) chunks.push(words.slice(i, i + size).join(" "));
  const total = chunks.reduce((a, c) => a + c.length, 0);
  let t = seg.start;
  return chunks.map((text) => {
    const d = ((seg.end - seg.start) * text.length) / total;
    const cue = { start: t, end: t + d, text };
    t += d;
    return cue;
  });
});

const CUES: [SfxName, number, number?][] = [
  ["pop", 0.3, 0.3], ["pop", 1.7, 0.4], ["whoosh", 3.35], ["tap", 5.3, 0.3], ["stamp", 6.6, 0.6], ["whoosh", 8.15], ["pop", 8.6, 0.3], ["whoosh", 11.45],
  ["tick", 12.3, 0.3], ["tick", 13.4, 0.3], ["whoosh", 16.5], ["whoosh", 18.45], ["pop", 18.95, 0.4], ["pop", 22.65, 0.4], ["whoosh", 25.45],
  ["tick", 26.3, 0.3], ["tick", 27.0, 0.3], ["whoosh", 28.3], ["pop", 28.55, 0.4], ["pop", 32.05, 0.4], ["whoosh", 34.35], ["tap", 36.95, 0.4],
  ["whoosh", 39.05], ["tick", 42.0, 0.3], ["tick", 44.3, 0.3], ["whoosh", 45.85], ["pop", 47.0, 0.4], ["stamp", 49.95, 0.5], ["whoosh", 50.95],
  ["tap", 53.2, 0.4], ["stamp", 53.5, 0.5], ["whoosh", 55.05], ["tick", 56.1, 0.3], ["pop", 58.5, 0.3], ["rise", 59.9, 0.3], ["pop", 60.2, 0.4], ["pop", 62.3, 0.4],
  ["whoosh", 64.25], ["tick", 65.1, 0.3], ["whoosh", 66.5], ["whoosh", 69.25], ["pop", 70.9, 0.4], ["whoosh", 73.4], ["bell", 74.1, 0.3],
];

export const Episode003: React.FC = () => (
  <AbsoluteFill style={{ background: "#1C1D20" }}>
    {SCENES.map(({ start, C, v }, i) => (
      <Scene key={start} variant={v} start={start} end={SCENES[i + 1]?.start ?? 79.3}>
        <C />
      </Scene>
    ))}
    <Scene start={0} end={73.5}>
      <Captions cues={CAPS} top={1430} />
    </Scene>
    {/* tiny corner watermark, whole video */}
    <Img src={logo} style={{ position: "absolute", top: 64, right: 44, width: 76, height: 76, borderRadius: 16, opacity: 0.5 }} />
    <Audio src={voiceover} volume={1} />
    <MusicBed volume={0.14} />
    {CUES.map(([name, at, vol], i) => (
      <Sfx key={i} name={name} at={at} volume={vol ?? 0.4} />
    ))}
  </AbsoluteFill>
);
