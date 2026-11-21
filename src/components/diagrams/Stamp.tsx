import React from "react";
import { COLORS } from "../../config/brand";
import { display } from "../../config/fonts";

export const Stamp: React.FC<{ text: string; scale?: number; opacity?: number; rotate?: number }> = ({ text, scale = 1, opacity = 1, rotate = -8 }) => (
  <div
    style={{
      fontFamily: display,
      fontSize: 190,
      color: COLORS.gold,
      border: `10px solid ${COLORS.gold}`,
      borderRadius: 24,
      padding: "6px 44px",
      opacity,
      transform: `rotate(${rotate}deg) scale(${scale})`,
      letterSpacing: 6,
      textTransform: "uppercase",
      background: "rgba(28,29,32,0.55)",
    }}
  >
    {text}
  </div>
);
