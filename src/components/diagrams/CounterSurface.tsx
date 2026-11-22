import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";

export const COUNTER_Y = 760;

// Stainless counter used for the object cold open and the return shot.
export const CounterSurface: React.FC = () => (
  <AbsoluteFill>
    <AbsoluteFill style={{ background: `radial-gradient(ellipse 60% 55% at 50% 46%, rgba(201,162,75,0.2), transparent 70%), ${COLORS.charcoalDeep}` }} />
    <div
      style={{
        position: "absolute",
        left: -200,
        right: -200,
        top: COUNTER_Y,
        bottom: -200,
        background: `linear-gradient(180deg, #6C737D 0%, ${COLORS.greyDark} 16%, ${COLORS.charcoal} 100%)`,
        borderTop: `2px solid ${COLORS.grey}`,
      }}
    />
    <div style={{ position: "absolute", left: -200, right: -200, top: COUNTER_Y + 6, height: 2, background: "rgba(255,255,255,0.35)" }} />
  </AbsoluteFill>
);

/** Front face of the counter, drawn over people standing behind it. */
export const CounterFront: React.FC = () => (
  <div style={{ position: "absolute", left: -200, right: -200, top: COUNTER_Y, bottom: -200, background: `linear-gradient(180deg, #6C737D 0%, ${COLORS.greyDark} 16%, ${COLORS.charcoal} 100%)`, borderTop: `2px solid ${COLORS.grey}` }} />
);
