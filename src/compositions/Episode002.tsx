import React from "react";
import { AbsoluteFill, Audio } from "remotion";
import voiceover from "../../episodes/episode-002/voiceover.mp3";
import timing from "../../episodes/episode-002/timing.json";
import { MusicBed, Sfx, SfxName } from "../components/audio/Sfx";
import { Captions } from "../components/captions/Captions";
import { Scene } from "../components/transitions/Scene";
import { S1, S2, S3, S4, S5, S6, S7, S8, S9 } from "../scenes/ep002/Scenes";
import { sec } from "../utils/timing";

// Episode 002 (vertical short): "The first number you see". Times are seconds in the real voiceover (77.09 s).
export const EP002_DURATION = sec(78.6);

const SCENES = [
  { start: 0, end: 2.17, C: S1 },
  { start: 2.17, end: 11.4, C: S2 },
  { start: 11.4, end: 18.3, C: S3 },
  { start: 18.3, end: 28.16, C: S4 },
  { start: 28.16, end: 38.53, C: S5 },
  { start: 38.53, end: 48.93, C: S6 },
  { start: 48.93, end: 56.25, C: S7 },
  { start: 56.25, end: 64.95, C: S8 },
  { start: 64.95, end: 78.6, C: S9 },
];

const CUES: [SfxName, number, number?][] = [
  ["pop", 0.3, 0.3], ["tick", 1.0, 0.3], ["tick", 1.4, 0.3], ["whoosh", 1.95], ["tap", 4.3, 0.4], ["tick", 5.9, 0.4], ["whoosh", 7.0, 0.3],
  ["tick", 8.0, 0.3], ["tick", 8.4, 0.3], ["pop", 8.9, 0.4], ["whoosh", 9.55, 0.3], ["pop", 10.2], ["whoosh", 11.2], ["pop", 11.66], ["pop", 12.6], ["pop", 13.36],
  ["rise", 14.5, 0.4], ["pop", 15.5, 0.3], ["whoosh", 18.1], ["tick", 20.3], ["pop", 21.0], ["tick", 24.6], ["pop", 24.8], ["pop", 26.3], ["whoosh", 27.95],
  ["pop", 28.6], ["tick", 30.6], ["tick", 33.4], ["tick", 34.6], ["tap", 36.8], ["whoosh", 38.3], ["tap", 40.9], ["tap", 43.9], ["pop", 46.8], ["whoosh", 48.7],
  ["tick", 49.7], ["tick", 50.4], ["tick", 51.9], ["tick", 53.2], ["stamp", 54.9, 0.6], ["whoosh", 56.05], ["tick", 58.0, 0.3], ["tick", 60.0, 0.3], ["pop", 63.3, 0.4],
  ["whoosh", 64.75], ["tick", 66.1], ["tick", 69.0], ["rise", 69.9, 0.35], ["whoosh", 71.7], ["tap", 72.4], ["pop", 74.9], ["bell", 77.45, 0.3],
];

export const Episode002: React.FC = () => (
  <AbsoluteFill style={{ background: "#1C1D20" }}>
    {SCENES.map(({ start, end, C }) => (
      <Scene key={start} start={start} end={end}>
        <C />
      </Scene>
    ))}
    <Scene start={0} end={78.6}>
      <Captions cues={timing.segments.map((s) => ({ start: s.start, end: s.end, text: s.text }))} />
    </Scene>
    <Audio src={voiceover} volume={1} />
    <MusicBed volume={0.14} />
    {CUES.map(([name, at, vol], i) => (
      <Sfx key={i} name={name} at={at} volume={vol ?? 0.4} />
    ))}
  </AbsoluteFill>
);
