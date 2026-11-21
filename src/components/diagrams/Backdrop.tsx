import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";
import { useT } from "../transitions/Scene";

// Charcoal field with slowly drifting warm light, so even still moments keep moving.
export const Backdrop: React.FC<{ glow?: number; tint?: string }> = ({ glow = 1, tint = "201,162,75" }) => {
  const T = useT();
  const x1 = 28 + 10 * Math.sin(T * 0.35);
  const y1 = 30 + 8 * Math.cos(T * 0.28);
  const x2 = 74 + 9 * Math.cos(T * 0.31);
  const y2 = 72 + 8 * Math.sin(T * 0.4);
  return (
    <AbsoluteFill style={{ background: COLORS.charcoal }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${x1}% ${y1}%, rgba(${tint},${0.2 * glow}), transparent 46%), radial-gradient(circle at ${x2}% ${y2}%, rgba(138,147,160,${0.2 * glow}), transparent 50%)`,
        }}
      />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 100% 85% at 50% 50%, transparent 55%, rgba(0,0,0,0.5))" }} />
    </AbsoluteFill>
  );
};
