import React, { createContext, useContext } from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { COLORS } from "../../config/brand";
import { EASE_IO, FPS, ramp, sec } from "../../utils/timing";

// Scenes overlap by LEAD frames; the incoming scene is revealed by a gold wipe (Surface-to-System transition).
export const LEAD = 14;

const TimeCtx = createContext(0);
/** Absolute video time in seconds (not scene-local), so cues can be read straight from the voiceover timing. */
export const useT = () => useContext(TimeCtx);

export type Variant = "wipe" | "wipeL" | "slideL" | "slideR" | "slideUp" | "zoomIn" | "zoomOut" | "iris";

const Inner: React.FC<{ from: number; first: boolean; variant: Variant; children: React.ReactNode }> = ({ from, first, variant, children }) => {
  const frame = useCurrentFrame();
  const T = (from + frame) / FPS;
  const r = first ? 1 : ramp(frame, 0, LEAD, 0, 1, EASE_IO);
  const reveal = r * 100;
  let style: React.CSSProperties = {};
  let line: React.CSSProperties | null = null;
  const edge = { position: "absolute" as const, background: COLORS.gold, boxShadow: "0 0 60px 18px rgba(201,162,75,0.55)" };
  if (!first && r < 1) {
    if (variant === "wipe") { style = { clipPath: `inset(0 ${100 - reveal}% 0 0)` }; line = { ...edge, top: 0, bottom: 0, left: `${reveal}%`, width: 6 }; }
    if (variant === "wipeL") { style = { clipPath: `inset(0 0 0 ${100 - reveal}%)` }; line = { ...edge, top: 0, bottom: 0, right: `${reveal}%`, width: 6 }; }
    if (variant === "slideL") { style = { transform: `translateX(${(1 - r) * 100}%)` }; line = { ...edge, top: 0, bottom: 0, left: `${(1 - r) * 100}%`, width: 6 }; }
    if (variant === "slideR") { style = { transform: `translateX(${-(1 - r) * 100}%)` }; line = { ...edge, top: 0, bottom: 0, right: `${(1 - r) * 100}%`, width: 6 }; }
    if (variant === "slideUp") { style = { transform: `translateY(${(1 - r) * 100}%)` }; line = { ...edge, left: 0, right: 0, top: `${(1 - r) * 100}%`, height: 6 }; }
    if (variant === "zoomIn") style = { transform: `scale(${1.5 - 0.5 * r})`, opacity: Math.min(1, r * 1.6) };
    if (variant === "zoomOut") style = { transform: `scale(${0.6 + 0.4 * r})`, opacity: Math.min(1, r * 1.6) };
    if (variant === "iris") style = { clipPath: `circle(${r * 80}% at 50% 50%)` };
  }
  return (
    <TimeCtx.Provider value={T}>
      <AbsoluteFill style={style}>{children}</AbsoluteFill>
      {line && <div style={line} />}
    </TimeCtx.Provider>
  );
};

export const Scene: React.FC<{ start: number; end: number; variant?: Variant; children: React.ReactNode }> = ({ start, end, variant = "wipe", children }) => {
  const first = start === 0;
  const from = first ? 0 : sec(start) - LEAD;
  return (
    <Sequence from={from} durationInFrames={sec(end) - from}>
      <Inner from={from} first={first} variant={variant}>
        {children}
      </Inner>
    </Sequence>
  );
};
