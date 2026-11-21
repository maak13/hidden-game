import React from "react";
import { COLORS } from "../../config/brand";
import { sans } from "../../config/fonts";

export const FlowNode: React.FC<{ label: string; x: number; y: number; scale?: number; opacity?: number; highlight?: boolean }> = ({
  label,
  x,
  y,
  scale = 1,
  opacity = 1,
  highlight = false,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity,
      width: 340,
      boxSizing: "border-box",
      textAlign: "center",
      padding: "26px 0",
      border: `2px solid ${highlight ? COLORS.gold : COLORS.greyDark}`,
      borderRadius: 18,
      background: highlight ? "rgba(201,162,75,0.12)" : "rgba(241,232,214,0.04)",
      fontFamily: sans,
      fontWeight: 600,
      fontSize: 34,
      letterSpacing: 3,
      textTransform: "uppercase",
      color: highlight ? COLORS.gold : COLORS.cream,
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </div>
);
