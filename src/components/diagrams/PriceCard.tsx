import React from "react";
import { COLORS } from "../../config/brand";
import { display } from "../../config/fonts";
import { COUNTER_Y } from "./CounterSurface";

export type Part = { text: string; color?: string; opacity?: number };

// Standing cream price card with its reflection on the counter.
export const PriceCard: React.FC<{
  parts: Part[];
  x: number;
  width?: number;
  height?: number;
  fontSize?: number;
  opacity?: number;
  offsetY?: number;
  scale?: number;
  ghost?: boolean;
}> = ({ parts, x, width = 440, height = 560, fontSize = 138, opacity = 1, offsetY = 0, scale = 1, ghost = false }) => {
  const card = (
    <div
      style={{
        width,
        height,
        borderRadius: 30,
        boxSizing: "border-box",
        background: ghost ? "transparent" : "linear-gradient(170deg, #F6EEDD 0%, #E6DAC0 100%)",
        border: ghost ? `2px dashed ${COLORS.grey}` : "none",
        boxShadow: ghost ? "none" : "0 40px 50px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: display,
        fontSize,
        color: COLORS.charcoal,
        whiteSpace: "nowrap",
      }}
    >
      {!ghost &&
        parts.map((p, i) => (
          <span key={i} style={{ color: p.color ?? COLORS.charcoal, opacity: p.opacity ?? 1 }}>
            {p.text}
          </span>
        ))}
    </div>
  );
  return (
    <div style={{ position: "absolute", left: x - width / 2, top: COUNTER_Y - height + offsetY, width, height, opacity, transform: `scale(${scale})`, transformOrigin: "50% 100%" }}>
      {card}
      {!ghost && (
        <div
          style={{
            position: "absolute",
            top: height + 6,
            left: 0,
            opacity: 0.16,
            transform: "scaleY(-0.45)",
            transformOrigin: "top",
            maskImage: "linear-gradient(to bottom, black, transparent 70%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 70%)",
          }}
        >
          {card}
        </div>
      )}
    </div>
  );
};
