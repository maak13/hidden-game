import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../config/brand";
import { display } from "../config/fonts";
import { Backdrop } from "../components/diagrams/Backdrop";
import { Product } from "../components/art/Products";
import { useT } from "../components/transitions/Scene";

// YouTube thumbnails (1280 x 720) for Episode 001. Two title options, same shelf-label visual language as the video.
const Shelf: React.FC = () => (
  <>
    <div style={{ position: "absolute", left: 0, right: 0, top: 520, bottom: 0, background: "linear-gradient(180deg, #3A3F47, #1C1D20)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 506, height: 22, background: "linear-gradient(180deg, #A5ADB8, #5A606A)", boxShadow: "0 12px 18px rgba(0,0,0,0.5)" }} />
  </>
);

const Tag: React.FC<{ children: React.ReactNode; w?: number; h?: number; rot?: number; left: number; top: number }> = ({ children, w = 560, h = 260, rot = 0, left, top }) => (
  <div style={{ position: "absolute", left, top, width: w, height: h, borderRadius: 16, background: "linear-gradient(180deg, #F6EEDD, #E2D5B8)", borderBottom: "8px solid rgba(0,0,0,0.25)", boxShadow: "0 30px 50px rgba(0,0,0,0.6)", transform: `rotate(${rot}deg)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontSize: 200, color: COLORS.charcoal, whiteSpace: "nowrap" }}>
    {children}
  </div>
);

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useT();
  return (
    <AbsoluteFill style={{ background: COLORS.charcoal }}>
      <Backdrop glow={1.6} />
      <Shelf />
      {children}
    </AbsoluteFill>
  );
};

// A: "1¢ Tricks Your Brain" - tiny cost, huge effect.
export const ThumbnailA: React.FC = () => (
  <Wrap>
    <div style={{ position: "absolute", left: 60, top: 10, fontFamily: display, fontSize: 400, lineHeight: 1, color: COLORS.gold, textShadow: "0 0 80px rgba(201,162,75,0.55), 0 12px 0 rgba(0,0,0,0.35)" }}>1¢</div>
    <div style={{ position: "absolute", left: 66, top: 395, fontFamily: display, fontSize: 118, lineHeight: 0.98, color: COLORS.cream, textShadow: "0 8px 0 rgba(0,0,0,0.4)" }}>
      Tricks Your<br />Brain
    </div>
    <div style={{ position: "absolute", left: 800, top: 70 }}>
      <Product kind="box" color="#B5483A" width={250} />
    </div>
    <Tag left={700} top={440} w={540} h={220} rot={-5}>
      <span style={{ fontSize: 150 }}>$</span>
      <span style={{ position: "relative", color: "#B8902F", fontSize: 200 }}>
        9
        <span style={{ position: "absolute", inset: -14, borderRadius: "50%", border: `7px solid ${COLORS.gold}`, boxShadow: "0 0 40px rgba(201,162,75,0.9)" }} />
      </span>
      <span style={{ color: "#A59E8C", fontSize: 150 }}>.99</span>
    </Tag>
  </Wrap>
);

// B: "The $9.99 Lie" - the price tag contradicts itself.
export const ThumbnailB: React.FC = () => (
  <Wrap>
    <div style={{ position: "absolute", left: 60, top: 18, fontFamily: display, fontSize: 150, lineHeight: 1, color: COLORS.cream, textShadow: "0 8px 0 rgba(0,0,0,0.4)" }}>The $9.99</div>
    <div style={{ position: "absolute", left: 56, top: 150, fontFamily: display, fontSize: 330, lineHeight: 1, color: COLORS.gold, textShadow: "0 0 80px rgba(201,162,75,0.5), 0 12px 0 rgba(0,0,0,0.35)" }}>Lie</div>
    <div style={{ position: "absolute", left: 800, top: 100 }}>
      <Product kind="bottle" color="#3F6E8C" width={230} />
    </div>
    {/* the real price peeks from behind the tag */}
    <Tag left={960} top={470} w={300} h={200} rot={6}>
      <span style={{ fontSize: 120 }}>$10</span>
    </Tag>
    <Tag left={440} top={410} w={540} h={240} rot={-6}>
      <span style={{ fontSize: 170 }}>$9</span>
      <span style={{ fontSize: 170, color: "#A59E8C", textDecoration: "line-through", textDecorationColor: COLORS.gold, textDecorationThickness: 14 }}>.99</span>
    </Tag>
  </Wrap>
);
