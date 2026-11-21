import React from "react";
import { COLORS } from "../../config/brand";
import { serif } from "../../config/fonts";

export const Headline: React.FC<{ text: string; size?: number; opacity?: number }> = ({
  text,
  size = 84,
  opacity = 1,
}) => (
  <div
    style={{
      fontFamily: serif,
      fontSize: size,
      lineHeight: 1.08,
      color: COLORS.cream,
      opacity,
      letterSpacing: -1,
    }}
  >
    {text}
  </div>
);
