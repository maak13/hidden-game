import React from "react";
import { COLORS } from "../../config/brand";
import { display, sans } from "../../config/fonts";

// Tall vertical glassmorphism card used for flow steps. Needs something colourful behind it to blur.
export const GlassCard: React.FC<{
  label: string;
  index?: number | string;
  caption?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  opacity?: number;
  scale?: number;
  highlight?: boolean;
  labelSize?: number;
  indexSize?: number;
  children?: React.ReactNode;
}> = ({ label, index, caption, x, y, width = 340, height = 540, opacity = 1, scale = 1, highlight = false, labelSize = 46, indexSize = 150, children }) => (
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
      padding: 32,
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
    <div style={{ fontFamily: display, fontSize: indexSize, lineHeight: 1, color: highlight ? COLORS.gold : "rgba(241,232,214,0.28)" }}>{index ?? ""}</div>
    {children && <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>}
    <div>
      <div style={{ fontFamily: display, fontSize: labelSize, lineHeight: 1.08, color: highlight ? COLORS.gold : COLORS.cream }}>{label}</div>
      {caption && <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 26, lineHeight: 1.25, color: COLORS.grey, marginTop: 10 }}>{caption}</div>}
    </div>
  </div>
);
