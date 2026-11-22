import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";
import { display } from "../../config/fonts";
import { Backdrop } from "../../components/diagrams/Backdrop";
import { Product } from "../../components/art/Products";
import { GrabHand } from "../../components/art/People";
import { Title } from "../../components/typography/Title";
import { Subtitle } from "../../components/typography/Subtitle";
import { useT } from "../../components/transitions/Scene";
import { EASE_IO, POP, ramp } from "../../utils/timing";

// Scene 7 (1:35 to end): a shopper grabs the product, the label stays, push in on the first digit, end card.
const BOARD = 570;
export const Scene7: React.FC = () => {
  const T = useT();
  const shelfIn = ramp(T, 95.5, 96.2);
  const labelIn = ramp(T, 95.6, 96.3, 0, 1, POP);
  const handIn = ramp(T, 96.1, 96.8, 0, 1, EASE_IO);
  const lift = ramp(T, 97.2, 98.3, 0, 1, EASE_IO);
  const pill = ramp(T, 98.7, 99.3, 0, 1, POP) * ramp(T, 100.2, 100.7, 1, 0);
  const push = ramp(T, 100.7, 102.6, 0, 1, EASE_IO) * ramp(T, 103.6, 104.5, 1, 0, EASE_IO);
  const zoom = 1 + 0.5 * push;
  const hot = ramp(T, 101.0, 102.0, 0, 1) * ramp(T, 104.2, 104.8, 1, 0.65);
  const gold = "#B8902F";
  const t1 = ramp(T, 103.71, 104.4);
  const t2 = ramp(T, 105.6, 106.3);
  const fade = ramp(T, 106.9, 107.5);
  const endCard = ramp(T, 107.4, 108.0);
  const handX = 1120 + (1 - handIn) * 700 + lift * 1300;
  const handY = 40 - lift * 160;
  const prodX = 960 - 150 + lift * 1300;
  const prodY = BOARD - 16 - 450 - lift * 160;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: 1 - fade }}>
        <Backdrop glow={0.7} />
        <AbsoluteFill style={{ transform: `scale(${zoom}) translateX(${60 * push}px)`, transformOrigin: "50% 66%" }}>
          <div style={{ position: "absolute", left: -100, right: -100, top: BOARD, bottom: -100, opacity: shelfIn, background: "linear-gradient(180deg, #3A3F47 0%, #23252B 60%)" }} />
          <div style={{ position: "absolute", left: -100, right: -100, top: BOARD - 16, height: 30, opacity: shelfIn, background: "linear-gradient(180deg, #A5ADB8, #5A606A)", boxShadow: "0 14px 20px rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", left: prodX, top: prodY - (1 - shelfIn) * 120, opacity: shelfIn }}>
            <Product kind="box" color="#B5483A" width={300} />
          </div>
          <div style={{ position: "absolute", left: handX, top: handY + 120 }}>
            <GrabHand width={420} />
          </div>
          {/* the label stays put */}
          <div style={{ position: "absolute", left: 960 - 380, top: BOARD + 36 - (1 - labelIn) * 100, width: 760, height: 340, borderRadius: 16, opacity: labelIn, background: "linear-gradient(180deg, #F6EEDD, #E2D5B8)", borderBottom: "6px solid rgba(0,0,0,0.25)", boxShadow: "0 24px 40px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontSize: 240, color: COLORS.charcoal }}>
            <span style={{ color: hot > 0.5 ? "#9A9487" : COLORS.charcoal, opacity: 1 - 0.4 * hot }}>$</span>
            <span style={{ color: hot > 0.3 ? gold : COLORS.charcoal, display: "inline-block", transform: `scale(${1 + 0.12 * hot})` }}>9</span>
            <span style={{ color: "#9A9487", opacity: 1 - 0.55 * hot }}>.99</span>
          </div>
        </AbsoluteFill>
        <div style={{ position: "absolute", left: 960 + 420, top: 640, width: 160, height: 100, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontSize: 66, color: COLORS.gold, background: "rgba(28,29,32,0.78)", border: "1.5px solid rgba(201,162,75,0.8)", transform: `scale(${pill}) translateY(${(1 - pill) * 20}px)` }}>1¢</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center" }}>
          <div style={{ opacity: t1, transform: `translateY(${(1 - t1) * 24}px)` }}>
            <Title text="The price tag hasn't changed." size={92} align="center" />
          </div>
          <div style={{ opacity: t2, transform: `translateY(${(1 - t2) * 24}px)`, marginTop: 6 }}>
            <Title text="The way you read it has." size={92} align="center" color={COLORS.gold} />
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: COLORS.charcoal, opacity: fade }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: endCard, transform: `scale(${0.96 + 0.04 * endCard})` }}>
        <Title text="The Hidden Game" size={170} align="center" />
        <div style={{ height: 24 }} />
        <Subtitle text="The visible story is rarely the whole story." size={44} align="center" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
