import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { COLORS } from "../../config/brand";
import { display, sans } from "../../config/fonts";
import { Backdrop } from "../../components/diagrams/Backdrop";
import { GlassBar } from "../../components/diagrams/GlassBar";
import { Odometer } from "../../components/diagrams/Odometer";
import { Car, CarKind } from "../../components/art/Car";
import { Title } from "../../components/typography/Title";
import { Subtitle } from "../../components/typography/Subtitle";
import { useT } from "../../components/transitions/Scene";
import { EASE_IO, POP, ramp } from "../../utils/timing";
import note from "../../../episodes/episode-001/assets/usd-100-note.png";

// Scene 4 (0:48 to 1:10): real money, a lot full of cars, a price staircase, then three different cars on price pedestals.
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const KINDS: CarKind[] = ["sedan", "suv", "hatch"];
const COLS = ["#3F6E8C", "#B5483A", "#5B8A5A", "#D0A23C", "#7A5C8E", "#C9B58A", "#2F7F7A", "#C46A2F"];

export const Scene4: React.FC = () => {
  const T = useT();
  // A: real money
  const aOp = ramp(T, 48.15, 48.5) * ramp(T, 50.7, 51.2, 1, 0);
  // B: lot and staircase
  const bIn = ramp(T, 51.0, 51.5);
  const count = ramp(T, 51.3, 53.3, 0, 22000000, EASE_IO);
  const shrink = ramp(T, 54.0, 54.9, 0, 1, EASE_IO);
  const lotOut = ramp(T, 54.0, 54.6, 1, 0);
  const bOut = ramp(T, 56.9, 57.4, 1, 0);
  // C: showroom
  const cIn = ramp(T, 57.1, 57.8);
  const odo = T < 59.5 ? ramp(T, 57.9, 59.5, 79800, 79999, EASE_IO) : ramp(T, 60.3, 60.8, 79999, 80000, EASE_IO);
  const dimBars = ramp(T, 67.4, 68.0, 1, 0.25);
  const odoScale = 1 + 0.2 * ramp(T, 67.4, 68.4, 0, 1, EASE_IO);
  const steps = [...Array(9).keys()];
  const base = 900;
  const ped = (grow: number, h: number, x: number, kind: CarKind, color: string, cap: string, gold?: boolean) => (
    <div>
      <GlassBar x={x} baseY={base} width={380} height={h} grow={grow} caption={cap} gold={gold} />
      <div style={{ position: "absolute", left: x - 250, top: base - h * grow - 214 - (1 - grow) * 220, opacity: grow }}>
        <Car kind={kind} color={color} width={500} />
      </div>
    </div>
  );
  return (
    <AbsoluteFill>
      <Backdrop />
      {/* A: real money */}
      <div style={{ opacity: aOp }}>
        {[-1, 0, 1].map((k, i) => {
          const p = ramp(T, 48.3 + i * 0.3, 48.9 + i * 0.3, 0, 1, POP);
          return (
            <div key={k} style={{ position: "absolute", left: 960 + k * 260 - 360, top: 320 + (1 - p) * 120 + Math.abs(k) * 20, width: 720, opacity: p, transform: `rotate(${k * 13 + (1 - p) * k * 10}deg)`, filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.6))" }}>
              <Img src={note} style={{ width: 720, display: "block", borderRadius: 10 }} />
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 0, right: 0, top: 110, textAlign: "center", opacity: ramp(T, 48.3, 49.0), transform: `translateY(${(1 - ramp(T, 48.3, 49.0)) * 30}px)` }}>
          <Title text="Real money." size={150} align="center" />
        </div>
      </div>
      {/* B: 22 million used-car sales */}
      <div style={{ opacity: bIn * bOut }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 40 - 40 * shrink, textAlign: "center", transform: `scale(${1 - 0.45 * shrink})`, transformOrigin: "50% 0%" }}>
          <div style={{ fontFamily: display, fontSize: 210, color: COLORS.gold, lineHeight: 1.05 }}>{fmt(count)}</div>
          <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 52, color: COLORS.cream, opacity: 0.85 }}>used-car sales</div>
        </div>
        <div style={{ opacity: lotOut }}>
          {[0, 1, 2].map((r) =>
            [...Array(10).keys()].map((c) => {
              const i = r * 10 + c;
              const p = ramp(T, 51.3 + i * 0.06, 51.9 + i * 0.06);
              return (
                <div key={i} style={{ position: "absolute", left: 40 + c * 186 + (1 - p) * 300 + (r % 2) * 40, top: 560 + r * 160 - 77, opacity: p }}>
                  <Car kind={KINDS[(c + r) % 3]} color={COLS[(c * 3 + r * 5) % COLS.length]} width={170} />
                </div>
              );
            }),
          )}
        </div>
        {steps.map((i) => {
          const p = ramp(T, 54.3 + i * 0.3, 54.9 + i * 0.3);
          const h = 420 - i * 38;
          return (
            <div key={i}>
              <GlassBar x={260 + i * 175} baseY={930} width={150} height={h} grow={p} caption={`${(i + 1) * 10}k mi`} gold={i === 7} />
              <div style={{ position: "absolute", left: 260 + i * 175 - 90, top: 930 - h * p - 76 - (1 - p) * 200, opacity: p }}>
                <Car kind={KINDS[i % 3]} color={COLS[(i * 3) % COLS.length]} width={180} />
              </div>
            </div>
          );
        })}
      </div>
      {/* C: three different cars, three price levels */}
      <div style={{ opacity: cIn }}>
        <div style={{ position: "absolute", left: 960 - 272, top: 70, transform: `scale(${odoScale})`, transformOrigin: "50% 50%" }}>
          <Odometer value={odo} highlightFirst={T > 67.4 ? 1 : 0} />
        </div>
        <div style={{ opacity: dimBars }}>
          {ped(ramp(T, 64.0, 65.0), 300, 380, "sedan", "#3F6E8C", "79,800–79,899")}
          {ped(ramp(T, 58.6, 59.6), 282, 960, "suv", "#B5483A", "79,900–79,999")}
          {ped(ramp(T, 61.4, 62.4), 150, 1540, "hatch", "#5B8A5A", "80,000–80,100", true)}
          {/* $210 gap: bracket between the pedestals, label above the cheaper car */}
          <div style={{ opacity: ramp(T, 62.0, 62.7) }}>
            <div style={{ position: "absolute", left: 1248, top: base - 282, width: 4, height: 132, background: COLORS.gold, boxShadow: "0 0 20px rgba(201,162,75,0.6)" }} />
            <div style={{ position: "absolute", left: 1540 - 150, top: base - 150 - 214 - 110, width: 300, textAlign: "center", fontFamily: display, fontSize: 96, color: COLORS.gold, textShadow: "0 0 30px rgba(201,162,75,0.5)" }}>−$210</div>
          </div>
          {/* $10 gap */}
          <div style={{ opacity: ramp(T, 65.3, 66.0) }}>
            <div style={{ position: "absolute", left: 668, top: base - 300, width: 4, height: 18, background: COLORS.grey }} />
            <div style={{ position: "absolute", left: 380 - 150, top: base - 300 - 214 - 90, width: 300, textAlign: "center", fontFamily: display, fontSize: 72, color: COLORS.grey }}>+$10</div>
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1030, textAlign: "center", opacity: ramp(T, 58.6, 59.2) * dimBars }}>
          <Subtitle text="Illustration: price levels exaggerated for clarity" size={24} align="center" />
        </div>
      </div>
    </AbsoluteFill>
  );
};
