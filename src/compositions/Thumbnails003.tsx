import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { COLORS } from "../config/brand";
import { display } from "../config/fonts";
import { Backdrop } from "../components/diagrams/Backdrop";
import mug from "../../episodes/episode-003/assets/coffee-mug.jpeg";
import mugHand from "../../episodes/episode-003/assets/mug-holding.jpeg";
import closet from "../../episodes/episode-003/assets/closet-messy.jpeg";

// Vertical thumbnails (1080 x 1920) for Episode 003. Three angles: Result, Story, Contrast.
const Bg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: COLORS.charcoal }}>
    <Backdrop glow={1.7} />
    {children}
  </AbsoluteFill>
);
const Big: React.FC<{ children: React.ReactNode; top: number; size: number; color?: string; rot?: number }> = ({ children, top, size, color = COLORS.cream, rot = 0 }) => (
  <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center", fontFamily: display, fontSize: size, lineHeight: 0.98, color, transform: `rotate(${rot}deg)`, textShadow: "0 10px 0 rgba(0,0,0,0.4)" }}>{children}</div>
);
const Photo: React.FC<{ src: string; left: number; top: number; w: number; h: number; rot?: number; gray?: boolean; glow?: boolean }> = ({ src, left, top, w, h, rot = 0, gray, glow }) => (
  <div style={{ position: "absolute", left, top, width: w, height: h, borderRadius: 36, overflow: "hidden", transform: `rotate(${rot}deg)`, boxShadow: glow ? "0 0 90px rgba(201,162,75,0.6), 0 30px 80px rgba(0,0,0,0.6)" : "0 30px 80px rgba(0,0,0,0.6)", border: glow ? `6px solid ${COLORS.gold}` : "2px solid rgba(241,232,214,0.25)", filter: gray ? "grayscale(1) brightness(0.8)" : undefined }}>
    <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </div>
);
const Tag: React.FC<{ v: string; left: number; top: number; w: number; size: number; dim?: boolean; rot?: number }> = ({ v, left, top, w, size, dim, rot = 0 }) => (
  <div style={{ position: "absolute", left, top, width: w, height: size * 1.35, borderRadius: 40, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontSize: size, color: COLORS.charcoal, background: dim ? "#8A93A0" : COLORS.gold, boxShadow: dim ? "none" : "0 0 70px rgba(201,162,75,0.6)", transform: `rotate(${rot}deg)` }}>{v}</div>
);

// A: $3 becomes $7 just by holding it (Result).
export const ThumbA: React.FC = () => (
  <Bg>
    <Tag v="$3" left={90} top={150} w={400} size={220} dim rot={-6} />
    <svg width={140} height={120} viewBox="0 0 140 120" style={{ position: "absolute", left: 470, top: 200 }}><path d="M10 60 L120 60 M80 15 L125 60 L80 105" fill="none" stroke="#F1E8D6" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" /></svg>
    <Tag v="$7" left={610} top={130} w={400} size={260} rot={4} />
    <Photo src={mugHand} left={190} top={560} w={700} h={920} glow />
    <Big top={1560} size={130} color={COLORS.gold}>JUST BY<br />HOLDING IT</Big>
  </Bg>
);

// B: the item you would never buy again (Story).
export const ThumbB: React.FC = () => (
  <Bg>
    <Big top={140} size={140} color={COLORS.gold}>WOULD YOU<br />BUY IT<br />AGAIN?</Big>
    <Photo src={closet} left={190} top={640} w={700} h={960} rot={-2} glow />
    <Big top={1720} size={90}>YET YOU KEEP IT</Big>
  </Bg>
);

// C: buyer versus owner on the same mug (Contrast).
export const ThumbC: React.FC = () => (
  <Bg>
    <Big top={150} size={150} color={COLORS.gold}>BUYER<br />VS OWNER</Big>
    <Photo src={mug} left={50} top={620} w={470} h={700} gray />
    <Photo src={mug} left={560} top={620} w={470} h={700} glow />
    <Tag v="$2.87" left={70} top={1390} w={430} size={120} dim />
    <Tag v="$7.12" left={580} top={1390} w={430} size={120} />
    <Big top={1650} size={110}>SAME MUG</Big>
  </Bg>
);
