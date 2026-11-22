import React from "react";
import { COLORS } from "../../config/brand";

// Storefront: scalloped awning, display window with shelves, glowing door. 1000 x 640 box.
export const StoreFront: React.FC<{ width?: number; open?: number }> = ({ width = 1000, open = 0 }) => (
  <svg width={width} height={(width * 640) / 1000} viewBox="0 0 1000 640" style={{ overflow: "visible", display: "block" }}>
    <rect x={40} y={150} width={920} height={470} fill="#2B2E35" stroke={COLORS.greyDark} strokeWidth={4} />
    {/* window */}
    <rect x={80} y={230} width={520} height={330} rx={10} fill="#15161A" stroke={COLORS.grey} strokeWidth={4} />
    <rect x={92} y={242} width={496} height={306} rx={6} fill="rgba(201,162,75,0.16)" />
    {[330, 430, 530].map((y) => (
      <g key={y}>
        <rect x={110} y={y} width={440} height={8} fill={COLORS.grey} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={124 + i * 70} y={y - 52} width={44} height={52} rx={6} fill={["#B5483A", "#3F6E8C", "#5B8A5A", "#D0A23C", "#7A5C8E", "#C9B58A"][(i + y / 100) % 6 | 0]} />
        ))}
      </g>
    ))}
    {/* door */}
    <rect x={660} y={230} width={250} height={390} rx={10} fill="#15161A" stroke={COLORS.grey} strokeWidth={4} />
    <rect x={672 + open * 6} y={242} width={226 - open * 12} height={378} fill={`rgba(201,162,75,${0.22 + 0.3 * open})`} />
    <rect x={880} y={400} width={8} height={90} rx={4} fill={COLORS.cream} />
    {/* awning */}
    {Array.from({ length: 12 }, (_, i) => (
      <path key={i} d={`M${40 + i * 76.6} 70 H${40 + (i + 1) * 76.6} V150 Q${40 + (i + 0.5) * 76.6} 190 ${40 + i * 76.6} 150 Z`} fill={i % 2 ? COLORS.cream : COLORS.gold} />
    ))}
    <rect x={30} y={50} width={940} height={26} rx={6} fill={COLORS.charcoalDeep} stroke={COLORS.grey} strokeWidth={3} />
    <rect x={20} y={612} width={960} height={26} fill={COLORS.greyDark} />
  </svg>
);

// A wall of 1,710 boxes (57 x 30). `lit` boxes glow gold, the rest are plain cardboard.
export const BoxWall: React.FC<{ lit: number; width?: number; cols?: number; rows?: number }> = ({ lit, width = 1800, cols = 57, rows = 30 }) => {
  const cw = width / cols;
  const h = cw * rows;
  const rects: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const on = i < lit;
      const tone = ["#7C6A4C", "#8A7656", "#6F5E43"][(c * 7 + r * 3) % 3];
      rects.push(<rect key={i} x={c * cw + 2} y={r * cw + 2} width={cw - 4} height={cw - 4} rx={2} fill={on ? COLORS.gold : tone} opacity={on ? 1 : 0.85} />);
    }
  }
  const beams = [];
  for (let r = 0; r <= rows; r += 5) beams.push(<rect key={`b${r}`} x={0} y={r * cw - 1} width={width} height={4} fill={COLORS.grey} opacity={0.7} />);
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} style={{ display: "block" }}>
      <rect width={width} height={h} fill="#17181B" />
      {rects}
      {beams}
    </svg>
  );
};
