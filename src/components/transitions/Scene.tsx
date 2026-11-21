import React, { createContext, useContext } from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { COLORS } from "../../config/brand";
import { EASE_IO, FPS, ramp, sec } from "../../utils/timing";

// Scenes overlap by LEAD frames; the incoming scene is revealed by a gold wipe (Surface-to-System transition).
export const LEAD = 14;

const TimeCtx = createContext(0);
/** Absolute video time in seconds (not scene-local), so cues can be read straight from the voiceover timing. */
export const useT = () => useContext(TimeCtx);

const Inner: React.FC<{ from: number; first: boolean; children: React.ReactNode }> = ({ from, first, children }) => {
  const frame = useCurrentFrame();
  const T = (from + frame) / FPS;
  const reveal = first ? 100 : ramp(frame, 0, LEAD, 0, 100, EASE_IO);
  return (
    <TimeCtx.Provider value={T}>
      <AbsoluteFill style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}>{children}</AbsoluteFill>
      {!first && reveal < 100 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${reveal}%`,
            width: 6,
            background: COLORS.gold,
            boxShadow: `0 0 60px 18px rgba(201,162,75,0.55)`,
          }}
        />
      )}
    </TimeCtx.Provider>
  );
};

export const Scene: React.FC<{ start: number; end: number; children: React.ReactNode }> = ({ start, end, children }) => {
  const first = start === 0;
  const from = first ? 0 : sec(start) - LEAD;
  return (
    <Sequence from={from} durationInFrames={sec(end) - from}>
      <Inner from={from} first={first}>
        {children}
      </Inner>
    </Sequence>
  );
};
