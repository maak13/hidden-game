import React from "react";
import { COLORS } from "../../config/brand";
import { display } from "../../config/fonts";

// Bold artistic title. Brand rule: use a Title or a Subtitle for on-screen words, never an eyebrow/kicker label.
export const Title: React.FC<{ text: string; size?: number; opacity?: number; color?: string; align?: "left" | "center" }> = ({
  text,
  size = 120,
  opacity = 1,
  color = COLORS.cream,
  align = "left",
}) => (
  <div style={{ fontFamily: display, fontSize: size, lineHeight: 1.02, color, opacity, textAlign: align, letterSpacing: -1 }}>{text}</div>
);
