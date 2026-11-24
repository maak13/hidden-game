import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../config/brand";
import { display } from "../config/fonts";
import { Backdrop } from "../components/diagrams/Backdrop";
import { ShelfLabel } from "../components/art/Products";
import { IdCard, Jacket, Keyboard } from "../components/art/Items";

// Vertical thumbnails (1080 x 1920) for Episode 002. Three psychological angles, per the Rule of Three.
const Bg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: COLORS.charcoal }}>
    <Backdrop glow={1.7} />
    {children}
  </AbsoluteFill>
);
const Big: React.FC<{ children: React.ReactNode; top: number; size: number; color?: string; rot?: number }> = ({ children, top, size, color = COLORS.cream, rot = 0 }) => (
  <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center", fontFamily: display, fontSize: size, lineHeight: 0.98, color, transform: `rotate(${rot}deg)`, textShadow: "0 10px 0 rgba(0,0,0,0.4)" }}>{children}</div>
);

// A: same keyboard, two prices (Result + Novelty).
export const ThumbA: React.FC = () => (
  <Bg>
    <div style={{ position: "absolute", left: 220, top: 190 }}><ShelfLabel price="$56" width={640} fontSize={300} glow={1} /></div>
    <div style={{ position: "absolute", left: 160, top: 520 }}><Keyboard width={760} /></div>
    <Big top={880} size={150} color={COLORS.gold}>SAME<br />KEYBOARD</Big>
    <div style={{ position: "absolute", left: 220, top: 1250, filter: "grayscale(0.9)", opacity: 0.75 }}><ShelfLabel price="$16" width={640} fontSize={300} /></div>
    <div style={{ position: "absolute", left: 160, top: 1580, filter: "grayscale(0.9)", opacity: 0.6 }}><Keyboard width={760} /></div>
  </Bg>
);

// B: the random number behind the price (Story).
export const ThumbB: React.FC = () => (
  <Bg>
    <div style={{ position: "absolute", left: 90, top: 150, transform: "rotate(-5deg)" }}><IdCard digits="86" glow={1} width={900} /></div>
    <Big top={800} size={190} color={COLORS.gold}>RANDOM<br />NUMBER</Big>
    <div style={{ position: "absolute", left: 540 - 60, top: 1130, fontFamily: display, fontSize: 150, color: COLORS.cream, lineHeight: 1 }}>↓</div>
    <div style={{ position: "absolute", left: 220, top: 1280 }}><ShelfLabel price="$56" width={640} fontSize={300} glow={1} /></div>
    <Big top={1610} size={120}>THEIR BID</Big>
  </Bg>
);

// C: the anchor makes the second price feel cheap (Transformation).
export const ThumbC: React.FC = () => (
  <Bg>
    <div style={{ position: "absolute", left: 60, top: 280, opacity: 0.45, transform: "rotate(-6deg)" }}><Jacket color="#3F6E8C" width={560} /></div>
    <div style={{ position: "absolute", left: 480, top: 380 }}><Jacket color="#B5483A" width={560} /></div>
    <div style={{ position: "absolute", left: 90, top: 1010, opacity: 0.6 }}><ShelfLabel price="$300" width={400} fontSize={150} /></div>
    <div style={{ position: "absolute", left: 540, top: 1010 }}><ShelfLabel price="$120" width={460} fontSize={170} glow={1} /></div>
    <Big top={1290} size={170} color={COLORS.gold}>WHY $120<br />FEELS<br />CHEAP</Big>
  </Bg>
);
