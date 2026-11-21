import React from "react";
import { COLORS } from "../../config/brand";
import { display, sans } from "../../config/fonts";

// Vertical glass bar that grows from a baseline.
export const GlassBar: React.FC<{
  x: number;
  baseY: number;
  width: number;
  height: number;
  grow?: number;
  gold?: boolean;
  value?: string;
  caption?: string;
  valueSize?: number;
  opacity?: number;
}> = ({ x, baseY, width, height, grow = 1, gold = false, value, caption, valueSize = 64, opacity = 1 }) => {
  const h = height * grow;
  return (
    <div style={{ position: "absolute", left: x - width / 2, top: baseY - h, width, height: h, opacity }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 26,
          background: gold ? "linear-gradient(170deg, rgba(201,162,75,0.55), rgba(201,162,75,0.12))" : "linear-gradient(170deg, rgba(241,232,214,0.2), rgba(241,232,214,0.04))",
          border: `1.5px solid ${gold ? "rgba(201,162,75,0.8)" : "rgba(241,232,214,0.25)"}`,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "0 24px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)",
        }}
      />
      {value && (
        <div style={{ position: "absolute", top: 22, left: 0, right: 0, textAlign: "center", fontFamily: display, fontSize: valueSize, color: gold ? COLORS.gold : COLORS.cream, opacity: grow > 0.85 ? 1 : 0 }}>
          {value}
        </div>
      )}
      {caption && (
        <div style={{ position: "absolute", top: height * grow + 18, left: -40, right: -40, textAlign: "center", fontFamily: sans, fontWeight: 500, fontSize: 28, color: COLORS.grey }}>{caption}</div>
      )}
    </div>
  );
};
