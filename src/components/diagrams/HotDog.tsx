import React from "react";
import { COLORS } from "../../config/brand";

// Simple flat-illustration object used for sample scenes only.
export const HotDog: React.FC<{ width?: number }> = ({ width = 560 }) => (
  <svg width={width} viewBox="0 0 560 220" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id="bun" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E0BC6A" />
        <stop offset="1" stopColor={COLORS.goldSoft} />
      </linearGradient>
      <linearGradient id="sausage" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#9A5B3E" />
        <stop offset="1" stopColor="#5E3320" />
      </linearGradient>
    </defs>
    <rect x="20" y="84" width="520" height="110" rx="55" fill="url(#bun)" opacity="0.78" />
    <rect x="0" y="60" width="560" height="64" rx="32" fill="url(#sausage)" />
    <rect x="22" y="70" width="516" height="12" rx="6" fill="rgba(255,255,255,0.16)" />
    <rect x="20" y="104" width="520" height="96" rx="48" fill="url(#bun)" />
    <rect x="44" y="116" width="472" height="10" rx="5" fill="rgba(255,255,255,0.2)" />
  </svg>
);
