import React from "react";
import { COLORS } from "../../config/brand";

// Flat cash-register drawing in the brand palette. drawer: 0 closed .. 1 open.
export const CashRegister: React.FC<{ drawer: number; width?: number }> = ({ drawer, width = 760 }) => (
  <svg width={width} viewBox="0 0 760 560" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id="reg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4A4F58" />
        <stop offset="1" stopColor="#2A2D33" />
      </linearGradient>
    </defs>
    {/* drawer */}
    <rect x={90} y={380 + drawer * 70} width={580} height={110} rx={14} fill="#E6DAC0" stroke={COLORS.goldSoft} strokeWidth={4} />
    <rect x={120} y={400 + drawer * 70} width={520} height={50} rx={8} fill="#CDBF9F" />
    {/* body */}
    <path d="M60 330 L110 200 H650 L700 330 V400 Q700 420 680 420 H80 Q60 420 60 400 Z" fill="url(#reg)" stroke={COLORS.grey} strokeWidth={3} />
    {/* display */}
    <rect x={190} y={90} width={380} height={100} rx={14} fill={COLORS.charcoalDeep} stroke={COLORS.gold} strokeWidth={4} />
    <text x={540} y={160} textAnchor="end" fontSize={64} fill={COLORS.gold} fontFamily="monospace">0.99</text>
    <rect x={340} y={190} width={80} height={14} fill={COLORS.grey} />
    {/* keys */}
    {[0, 1, 2, 3, 4].map((c) =>
      [0, 1].map((r) => <rect key={`${c}${r}`} x={150 + c * 100} y={236 + r * 56} width={78} height={40} rx={9} fill={c === 4 && r === 1 ? COLORS.gold : "#6B717C"} />),
    )}
  </svg>
);
