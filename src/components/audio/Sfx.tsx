import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { sec } from "../../utils/timing";

export type SfxName = "tap" | "tick" | "pop" | "whoosh" | "rise" | "bell" | "stamp" | "swell" | "odo-roll" | "odo-click";

/** Plays one sound effect at an absolute video time (seconds). */
export const Sfx: React.FC<{ name: SfxName; at: number; volume?: number }> = ({ name, at, volume = 0.5 }) => (
  <Sequence from={sec(at)} layout="none">
    <Audio src={staticFile(`assets/sound-effects/${name}.mp3`)} volume={volume} />
  </Sequence>
);

/** Quiet music bed under the narration. */
export const MusicBed: React.FC<{ volume?: number }> = ({ volume = 0.18 }) => (
  <Audio src={staticFile("assets/music/pad.mp3")} volume={volume} />
);
