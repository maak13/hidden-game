import React from "react";
import { COLORS } from "../../config/brand";
import { sans } from "../../config/fonts";

export const Subtitle: React.FC<{ text: string; size?: number; opacity?: number; color?: string; align?: "left" | "center" }> = ({
  text,
  size = 40,
  opacity = 1,
  color = COLORS.grey,
  align = "left",
}) => (
  <div style={{ fontFamily: sans, fontWeight: 500, fontSize: size, lineHeight: 1.3, color, opacity, textAlign: align }}>{text}</div>
);
