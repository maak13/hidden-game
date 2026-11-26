import React from "react";
import { COLORS } from "../../config/brand";
import { display } from "../../config/fonts";

export const Keyboard: React.FC<{ width?: number }> = ({ width = 360 }) => (
  <svg width={width} height={width * 0.42} viewBox="0 0 420 176" style={{ overflow: "visible", display: "block" }}>
    <rect x={4} y={12} width={412} height={150} rx={18} fill="#2A2D33" stroke="#4A4F58" strokeWidth={3} />
    {[0, 1, 2, 3].map((r) =>
      Array.from({ length: r === 3 ? 1 : 12 }, (_, c) => (
        <rect key={`${r}${c}`} x={r === 3 ? 90 : 20 + c * 32.5} y={26 + r * 34} width={r === 3 ? 240 : 27} height={26} rx={5} fill={r === 3 ? "#E6DAC0" : "#CFC3A6"} />
      )),
    )}
  </svg>
);

export const ChocolateBox: React.FC<{ width?: number }> = ({ width = 220 }) => (
  <svg width={width} height={width * 0.8} viewBox="0 0 220 176" style={{ overflow: "visible", display: "block" }}>
    <rect x={6} y={10} width={208} height={156} rx={16} fill="#4B2A1F" stroke={COLORS.goldSoft} strokeWidth={4} />
    {[0, 1, 2].map((c) =>
      [0, 1].map((r) => (
        <g key={`${c}${r}`}>
          <circle cx={46 + c * 64} cy={56 + r * 68} r={26} fill={r === c % 2 ? COLORS.gold : "#2A1810"} />
          <circle cx={38 + c * 64} cy={48 + r * 68} r={7} fill="rgba(255,255,255,0.35)" />
        </g>
      )),
    )}
  </svg>
);

export const Jacket: React.FC<{ color?: string; width?: number }> = ({ color = "#3F6E8C", width = 300 }) => (
  <svg width={width} height={width * 1.2} viewBox="0 0 300 360" style={{ overflow: "visible", display: "block" }}>
    <path d="M150 62 V40 Q150 14 176 14 Q200 14 200 36" fill="none" stroke={COLORS.grey} strokeWidth={9} strokeLinecap="round" />
    <path d="M50 108 L150 64 L250 108" fill="none" stroke={COLORS.grey} strokeWidth={9} strokeLinecap="round" />
    <path d="M62 100 L150 76 L238 100 L268 340 Q268 350 258 350 H42 Q32 350 32 340 Z" fill={color} />
    <path d="M62 100 L22 160 L8 330 L48 340 L68 200 Z" fill={color} stroke="rgba(0,0,0,0.25)" strokeWidth={2} />
    <path d="M238 100 L278 160 L292 330 L252 340 L232 200 Z" fill={color} stroke="rgba(0,0,0,0.25)" strokeWidth={2} />
    <path d="M150 76 L118 140 L150 180 L182 140 Z" fill="rgba(255,255,255,0.18)" />
    <line x1={150} y1={180} x2={150} y2={346} stroke="rgba(0,0,0,0.35)" strokeWidth={4} />
    <rect x={76} y={260} width={52} height={14} rx={7} fill="rgba(0,0,0,0.3)" />
    <rect x={172} y={260} width={52} height={14} rx={7} fill="rgba(0,0,0,0.3)" />
  </svg>
);

export const AnchorIcon: React.FC<{ size?: number; color?: string }> = ({ size = 200, color = COLORS.gold }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 100 120" style={{ overflow: "visible", display: "block" }} fill="none" stroke={color} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx={50} cy={16} r={9} />
    <line x1={50} y1={25} x2={50} y2={106} />
    <line x1={30} y1={42} x2={70} y2={42} />
    <path d="M14 70 Q18 106 50 106 Q82 106 86 70" />
    <path d="M6 78 L14 66 L26 76" />
    <path d="M94 78 L86 66 L74 76" />
  </svg>
);

/** A mock ID card. Not a real number: the last two digits are shown in gold. */
export const IdCard: React.FC<{ digits: string; glow?: number; faded?: boolean; width?: number }> = ({ digits, glow = 0, faded = false, width = 800 }) => (
  <div style={{ width, height: width * 0.6, borderRadius: 34, background: "linear-gradient(160deg, #F6EEDD, #DCCFB0)", boxShadow: "0 40px 70px rgba(0,0,0,0.55)", position: "relative", overflow: "hidden", fontFamily: display, color: COLORS.charcoal }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: width * 0.1, background: COLORS.charcoal, opacity: 0.9 }} />
    <div style={{ position: "absolute", left: width * 0.06, top: width * 0.19, width: width * 0.22, height: width * 0.26, borderRadius: 18, background: "#B9AD90" }}>
      <div style={{ position: "absolute", left: "32%", top: "16%", width: "36%", height: "34%", borderRadius: "50%", background: "#8F846C" }} />
      <div style={{ position: "absolute", left: "16%", top: "56%", width: "68%", height: "50%", borderRadius: "50% 50% 0 0", background: "#8F846C" }} />
    </div>
    {[0.27, 0.335].map((y) => (
      <div key={y} style={{ position: "absolute", left: width * 0.34, top: width * y, width: width * (y === 0.27 ? 0.5 : 0.34), height: width * 0.03, borderRadius: 10, background: "rgba(28,29,32,0.22)" }} />
    ))}
    <div style={{ position: "absolute", left: width * 0.06, bottom: width * 0.07, display: "flex", alignItems: "center", fontSize: width * 0.12, letterSpacing: 4 }}>
      <span style={{ opacity: 0.45, fontFamily: "monospace", fontSize: width * 0.1, letterSpacing: 2 }}>XXX-XX-</span>
      <span style={{ marginLeft: 10, padding: "0 16px", borderRadius: 16, background: faded ? "rgba(138,147,160,0.5)" : COLORS.gold, color: COLORS.charcoal, boxShadow: glow ? `0 0 ${60 * glow}px ${14 * glow}px rgba(201,162,75,${0.7 * glow})` : "none" }}>{digits}</span>
    </div>
  </div>
);
