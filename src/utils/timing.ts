import { Easing, interpolate } from "remotion";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const EASE = Easing.bezier(0.22, 1, 0.36, 1); // smooth out
export const EASE_IO = Easing.bezier(0.65, 0, 0.35, 1); // smooth in-out
export const POP = Easing.bezier(0.34, 1.56, 0.64, 1); // gentle overshoot

/** Clamped eased ramp of time t from a..b mapped to from..to. */
export const ramp = (t: number, a: number, b: number, from = 0, to = 1, easing: (x: number) => number = EASE) =>
  interpolate(t, [a, b], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });
