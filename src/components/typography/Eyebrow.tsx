import React from "react";
import { COLORS } from "../../config/brand";
import { sans } from "../../config/fonts";

// Small uppercase label. Used sparingly, minimal on-screen words (plan section 6).
export const Eyebrow: React.FC<{ text: string; opacity?: number }> = ({ text, opacity = 1 }) => (
  <div
    style={{
      fontFamily: sans,
      fontSize: 26,
      letterSpacing: 8,
      textTransform: "uppercase",
      color: COLORS.gold,
      opacity,
    }}
  >
    {text}
  </div>
);
