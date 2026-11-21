import React from "react";
import { COLORS } from "../../config/brand";
import { display } from "../../config/fonts";

// Tall vertical glassmorphism card used for flow steps. Needs something colourful behind it to blur.
export const GlassCard: React.FC<{
  label: string;
  index?: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  opacity?: number;
  scale?: number;
  highlight?: boolean;
}> = ({ label, index, x, y, width = 340, height = 540, opacity = 1, scale = 1, highlight = false }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity,
      borderRadius: 36,
      boxSizing: "border-box",
      padding: 36,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: highlight
        ? "linear-gradient(160deg, rgba(201,162,75,0.34), rgba(201,162,75,0.08))"
        : "linear-gradient(160deg, rgba(241,232,214,0.16), rgba(241,232,214,0.03))",
      border: `1.5px solid ${highlight ? "rgba(201,162,75,0.75)" : "rgba(241,232,214,0.22)"}`,
      backdropFilter: "blur(22px) saturate(140%)",
      WebkitBackdropFilter: "blur(22px) saturate(140%)",
      boxShadow: "0 30px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.22)",
    }}
  >
    <div style={{ fontFamily: display, fontSize: 150, lineHeight: 1, color: highlight ? COLORS.gold : "rgba(241,232,214,0.28)" }}>
      {index ?? ""}
    </div>
    <div style={{ fontFamily: display, fontSize: 46, lineHeight: 1.08, color: highlight ? COLORS.gold : COLORS.cream }}>{label}</div>
  </div>
);
