import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";
import { display } from "../../config/fonts";
import { Backdrop } from "../../components/diagrams/Backdrop";
import { Product } from "../../components/art/Products";
import { useT } from "../../components/transitions/Scene";
import { EASE_IO, POP, ramp } from "../../utils/timing";

// Scene 1 (0:00 to 0:11): two identical products on a store shelf, one cent apart on their shelf labels.
const BOARD = 640;
const LabelBig: React.FC<{ text: string; x: number; opacity: number; drop: number; size: number }> = ({ text, x, opacity, drop, size }) => (
  <div style={{ position: "absolute", left: x - 230, top: BOARD + 40 - drop, width: 460, height: 230, borderRadius: 14, background: "linear-gradient(180deg, #F6EEDD, #E2D5B8)", borderBottom: "6px solid rgba(0,0,0,0.25)", boxShadow: "0 24px 40px rgba(0,0,0,0.5)", opacity, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontSize: size, color: COLORS.charcoal }}>
    {text}
  </div>
);

export const Scene1: React.FC = () => {
  const T = useT();
  const cam = ramp(T, 0, 4.5, 1.14, 1.0) * ramp(T, 8, 10.98, 1, 0.9, EASE_IO);
  const sep = ramp(T, 8.0, 9.7, 0, 170, EASE_IO);
  const ax = 680 - sep;
  const bx = 1240 + sep;
  const pA = ramp(T, 0.15, 0.9, 0, 1, POP);
  const pB = ramp(T, 0.45, 1.2, 0, 1, POP);
  const lA = ramp(T, 1.6, 2.2, 0, 1, POP);
  const lB = ramp(T, 3.79, 4.4, 0, 1, POP);
  const linkGrow = ramp(T, 5.87, 6.5);
  const pill = ramp(T, 6.3, 6.85, 0, 1, POP) * ramp(T, 8.2, 8.8, 1, 0);
  const q = ramp(T, 8.7, 9.5);
  const half = ((bx - ax - 460) / 2) * linkGrow;
  const mid = (ax + bx) / 2;
  const linkY = BOARD + 155;
  return (
    <AbsoluteFill>
      <Backdrop glow={0.7} />
      <AbsoluteFill style={{ transform: `scale(${cam})`, transformOrigin: "50% 62%" }}>
        {/* shelf face and board */}
        <div style={{ position: "absolute", left: -100, right: -100, top: BOARD, bottom: -100, background: "linear-gradient(180deg, #3A3F47 0%, #23252B 60%)" }} />
        <div style={{ position: "absolute", left: -100, right: -100, top: BOARD - 16, height: 30, background: "linear-gradient(180deg, #A5ADB8, #5A606A)", boxShadow: "0 14px 20px rgba(0,0,0,0.5)" }} />
        {[ax, bx].map((x, i) => (
          <div key={i} style={{ position: "absolute", left: x - 150, top: BOARD - 16 - 450 - (1 - (i ? pB : pA)) * 160, opacity: i ? pB : pA }}>
            <Product kind="box" color="#B5483A" width={300} />
          </div>
        ))}
        <LabelBig text="$9.99" x={ax} opacity={lA} drop={(1 - lA) * 120} size={150} />
        <LabelBig text="$10" x={bx} opacity={lB} drop={(1 - lB) * 120} size={190} />
        {/* one-cent link */}
        <div style={{ position: "absolute", left: mid - half, width: half * 2, top: linkY, height: 5, background: COLORS.gold, boxShadow: "0 0 24px rgba(201,162,75,0.7)", opacity: ramp(T, 8.0, 9.0, 1, 0.35) }} />
        <div style={{ position: "absolute", left: mid - 90, top: linkY - 54, width: 180, height: 108, borderRadius: 54, transform: `scale(${pill})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontSize: 74, color: COLORS.gold, background: "rgba(28,29,32,0.78)", border: "1.5px solid rgba(201,162,75,0.8)", backdropFilter: "blur(14px)", boxShadow: "0 0 40px rgba(201,162,75,0.35)" }}>
          1¢
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 150, textAlign: "center", fontFamily: display, fontSize: 260, color: COLORS.gold, opacity: q, transform: `translateY(${(1 - q) * 30}px)` }}>?</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
