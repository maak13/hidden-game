import React from "react";
import { AbsoluteFill, Audio } from "remotion";
import voiceover from "../../episodes/episode-001/voiceover.mp3";
import { MusicBed, Sfx, SfxName } from "../components/audio/Sfx";
import { Scene } from "../components/transitions/Scene";
import { Scene1 } from "../scenes/ep001/Scene1";
import { Scene2 } from "../scenes/ep001/Scene2";
import { Scene3 } from "../scenes/ep001/Scene3";
import { Scene4 } from "../scenes/ep001/Scene4";
import { Scene5 } from "../scenes/ep001/Scene5";
import { Scene6 } from "../scenes/ep001/Scene6";
import { Scene7 } from "../scenes/ep001/Scene7";
import { sec } from "../utils/timing";

// Episode 001: "Why a $9.99 price feels different from $10". Times are seconds in the real voiceover
// (see episodes/episode-001/timing.json). Voiceover is 107.31 s; a 1.2 s end card follows.
export const EP001_DURATION = sec(108.5);

const SCENES = [
  { start: 0, end: 10.98, C: Scene1 },
  { start: 10.98, end: 27.38, C: Scene2 },
  { start: 27.38, end: 48.12, C: Scene3 },
  { start: 48.12, end: 70.14, C: Scene4 },
  { start: 70.14, end: 88.33, C: Scene5 },
  { start: 88.33, end: 95.45, C: Scene6 },
  { start: 95.45, end: 108.5, C: Scene7 },
];

const CUES: [SfxName, number, number?][] = [
  ["tap", 1.6], ["tap", 3.79], ["tick", 5.87], ["pop", 6.3], ["whoosh", 7.99],
  ["whoosh", 10.78], ["pop", 12.4, 0.3], ["pop", 18.5, 0.4], ["rise", 25.0, 0.4],
  ["whoosh", 27.18], ["tick", 28.8], ["pop", 30.85], ["pop", 33.3, 0.4], ["tick", 39.8], ["pop", 41.2], ["tap", 44.7], ["tap", 45.2],
  ["whoosh", 47.92], ["swell", 48.3], ["tick", 51.3],
  ...[...Array(9).keys()].map((i): [SfxName, number, number] => ["tick", 54.3 + i * 0.3, 0.3]),
  ["odo-roll", 57.9], ["pop", 58.7, 0.35], ["odo-click", 60.4], ["pop", 61.5, 0.35], ["pop", 62.1], ["pop", 64.1, 0.3], ["pop", 65.3, 0.35],
  ["whoosh", 69.92], ["pop", 73.3, 0.4], ["pop", 74.5, 0.4], ["pop", 75.7, 0.4], ["pop", 77.0, 0.35], ["swell", 81.2], ["pop", 84.3], ["pop", 85.5, 0.35],
  ["whoosh", 88.13], ["bell", 90.55, 0.45], ["pop", 92.0, 0.35], ["stamp", 93.9, 0.8],
  ["whoosh", 95.25], ["pop", 98.8, 0.35], ["rise", 100.7, 0.4], ["tap", 103.8], ["tap", 105.7],
];

export const Episode001: React.FC = () => (
  <AbsoluteFill style={{ background: "#1C1D20" }}>
    {SCENES.map(({ start, end, C }) => (
      <Scene key={start} start={start} end={end}>
        <C />
      </Scene>
    ))}
    <Audio src={voiceover} volume={1} />
    <MusicBed volume={0.16} />
    {CUES.map(([name, at, vol], i) => (
      <Sfx key={i} name={name} at={at} volume={vol ?? 0.45} />
    ))}
  </AbsoluteFill>
);
