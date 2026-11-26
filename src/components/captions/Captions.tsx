import React from "react";
import { COLORS } from "../../config/brand";
import { sans } from "../../config/fonts";
import { useT } from "../transitions/Scene";
import { ramp } from "../../utils/timing";

export type CaptionCue = { start: number; end: number; text: string };

// Phrase captions in the bottom third (above the Shorts UI). Uses absolute video time.
export const Captions: React.FC<{ cues: CaptionCue[]; top?: number }> = ({ cues, top = 1390 }) => {
  const T = useT();
  const c = cues.find((q) => T >= q.start - 0.05 && T < q.end + 0.12);
  if (!c) return null;
  const op = ramp(T, c.start - 0.05, c.start + 0.1) * ramp(T, c.end, c.end + 0.12, 1, 0);
  return (
    <div style={{ position: "absolute", left: 50, right: 50, top, display: "flex", justifyContent: "center", opacity: op, transform: `translateY(${(1 - op) * 10}px)` }}>
      <div style={{ padding: "18px 34px", borderRadius: 36, background: "rgba(19,20,23,0.82)", border: "1.5px solid rgba(241,232,214,0.18)", fontFamily: sans, fontWeight: 700, fontSize: 56, lineHeight: 1.22, color: COLORS.cream, textAlign: "center", maxWidth: 980 }}>{c.text}</div>
    </div>
  );
};
