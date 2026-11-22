import React from "react";
import { COLORS } from "../../config/brand";

// Simple flat avatar, 200 x 360 box. Arms are drawn from the shoulder with an angle (0 = hanging, +90 = forward/up).
export const Person: React.FC<{
  shirt?: string;
  skin?: string;
  hair?: string;
  apron?: boolean;
  cap?: boolean;
  lArm?: number;
  rArm?: number;
  height?: number;
  trousers?: string;
  legSwing?: number;
}> = ({ shirt = "#3F6E8C", skin = "#D9A87C", hair = "#2A1F1A", apron = false, cap = false, lArm = 8, rArm = -8, height = 360, trousers = "#2F3138", legSwing = 0 }) => {
  const arm = (x: number, ang: number) => (
    <g transform={`rotate(${ang} ${x} 138)`}>
      <rect x={x - 15} y={132} width={30} height={118} rx={15} fill={shirt} />
      <circle cx={x} cy={256} r={17} fill={skin} />
    </g>
  );
  return (
    <svg width={(height * 200) / 360} height={height} viewBox="0 0 200 360" style={{ overflow: "visible", display: "block" }}>
      <ellipse cx={100} cy={350} rx={62} ry={8} fill="rgba(0,0,0,0.35)" />
      <g transform={`rotate(${-legSwing} 84 230)`}><rect x={70} y={225} width={30} height={118} rx={12} fill={trousers} /><rect x={62} y={332} width={44} height={16} rx={8} fill="#17181B" /></g>
      <g transform={`rotate(${legSwing} 116 230)`}><rect x={100} y={225} width={30} height={118} rx={12} fill={trousers} /><rect x={94} y={332} width={44} height={16} rx={8} fill="#17181B" /></g>
      {arm(52, lArm)}
      <rect x={52} y={118} width={96} height={126} rx={26} fill={shirt} />
      {apron && <path d="M66 140 H134 V240 Q134 246 128 246 H72 Q66 246 66 240 Z" fill={COLORS.gold} opacity={0.95} />}
      {apron && <path d="M78 118 L92 140 H108 L122 118" fill="none" stroke={COLORS.gold} strokeWidth={6} />}
      {arm(148, rArm)}
      <rect x={88} y={96} width={24} height={26} fill={skin} />
      <circle cx={100} cy={68} r={36} fill={skin} />
      <path d="M64 66 Q64 30 100 30 Q136 30 136 66 Q124 52 100 52 Q76 52 64 66 Z" fill={hair} />
      {cap && <path d="M60 52 Q62 24 100 24 Q138 24 140 52 Z M60 52 H168 Q168 58 140 58 H60 Z" fill={COLORS.gold} />}
      <circle cx={88} cy={72} r={3.5} fill="#1C1D20" />
      <circle cx={112} cy={72} r={3.5} fill="#1C1D20" />
      <path d="M90 88 Q100 96 110 88" fill="none" stroke="#7A4A33" strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
};

// A hand and sleeve reaching in from the right, fingers wrapped around a product. 260 x 220 box.
export const GrabHand: React.FC<{ width?: number; skin?: string; sleeve?: string }> = ({ width = 330, skin = "#D9A87C", sleeve = "#3F6E8C" }) => (
  <svg width={width} height={(width * 220) / 260} viewBox="0 0 260 220" style={{ overflow: "visible", display: "block" }}>
    <rect x={120} y={60} width={200} height={100} rx={40} fill={sleeve} />
    <rect x={92} y={70} width={44} height={80} rx={14} fill="#E6DAC0" />
    <rect x={40} y={74} width={100} height={72} rx={30} fill={skin} />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={0} y={70 + i * 19} width={92} height={20} rx={10} fill={skin} stroke="rgba(0,0,0,0.12)" strokeWidth={1.5} />
    ))}
    <rect x={52} y={40} width={80} height={26} rx={13} fill={skin} transform="rotate(-18 92 53)" />
  </svg>
);
