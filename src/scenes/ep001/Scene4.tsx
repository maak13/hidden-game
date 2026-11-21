import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";
import { display, sans } from "../../config/fonts";
import { Backdrop } from "../../components/diagrams/Backdrop";
import { GlassBar } from "../../components/diagrams/GlassBar";
import { Odometer } from "../../components/diagrams/Odometer";
import { useT } from "../../components/transitions/Scene";
import { EASE, EASE_IO, POP, ramp } from "../../utils/timing";

// Scene 4 (0:48 to 1:10): evidence from used-car prices.
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

export const Scene4: React.FC = () => {
  const T = useT();
  // phase A: real money
  const aOp = ramp(T, 48.3, 48.9) * ramp(T, 50.7, 51.2, 1, 0);
  // phase B: 22 million
  const bIn = ramp(T, 51.0, 51.6);
  const count = ramp(T, 51.3, 53.3, 0, 22000000, EASE_IO);
  const shrink = ramp(T, 54.0, 54.9, 0, 1, EASE_IO);
  const bOut = ramp(T, 56.9, 57.4, 1, 0);
  // phase C: odometer + bars
  const cIn = ramp(T, 57.1, 57.8);
  const odo = T < 59.5 ? ramp(T, 57.9, 59.5, 79800, 79999, EASE_IO) : ramp(T, 60.3, 60.8, 79999, 80000, EASE_IO);
  const dimBars = ramp(T, 67.4, 68.0, 1, 0.25);
  const odoScale = 1 + 0.2 * ramp(T, 67.4, 68.4, 0, 1, EASE_IO);
  const steps = [...Array(9).keys()];

  return (
    <AbsoluteFill>
      <Backdrop />
      {/* A */}
      <div style={{ opacity: aOp }}>
        {[0, 1, 2].map((k) => {
          const p = ((T - 48.3) * 0.5 + k / 3) % 1;
          return <div key={k} style={{ position: "absolute", left: 960 - 500 * p, top: 540 - 500 * p, width: 1000 * p, height: 1000 * p, borderRadius: "50%", border: `2px solid ${COLORS.gold}`, opacity: 0.5 * (1 - p) }} />;
        })}
        <div style={{ position: "absolute", left: 0, right: 0, top: 400, textAlign: "center", fontFamily: display, fontSize: 200, color: COLORS.cream, transform: `translateY(${(1 - ramp(T, 48.3, 49.2)) * 40}px)` }}>Real money.</div>
      </div>
      {/* B */}
      <div style={{ opacity: bIn * bOut }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 360 - 330 * shrink, textAlign: "center", transform: `scale(${1 - 0.5 * shrink})`, transformOrigin: "50% 0%" }}>
          <div style={{ fontFamily: display, fontSize: 230, color: COLORS.gold, lineHeight: 1.05 }}>{fmt(count)}</div>
          <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 56, color: COLORS.cream, opacity: 0.85 }}>used-car sales</div>
        </div>
        {steps.map((i) => {
          const p = ramp(T, 54.3 + i * 0.3, 54.9 + i * 0.3);
          return <GlassBar key={i} x={360 + i * 150} baseY={930} width={110} height={420 - i * 38} grow={p} caption={`${(i + 1) * 10}k`} gold={i === 7} />;
        })}
      </div>
      {/* C */}
      <div style={{ opacity: cIn }}>
        <div style={{ position: "absolute", left: 960 - 272, top: 120, transform: `scale(${odoScale})`, transformOrigin: "50% 50%" }}>
          <Odometer value={odo} highlightFirst={T > 67.4 ? 1 : 0} />
        </div>
        <div style={{ opacity: dimBars }}>
          <GlassBar x={560} baseY={900} width={300} height={380} grow={ramp(T, 64.0, 65.0)} caption="79,800–79,899" />
          <GlassBar x={960} baseY={900} width={300} height={366} grow={ramp(T, 58.6, 59.6)} caption="79,900–79,999" />
          <GlassBar x={1360} baseY={900} width={300} height={252} grow={ramp(T, 61.4, 62.4)} caption="80,000–80,100" gold />
          {/* $210 bracket */}
          <div style={{ opacity: ramp(T, 62.0, 62.7) }}>
            <div style={{ position: "absolute", left: 1158, top: 534, width: 4, height: 114, background: COLORS.gold, boxShadow: "0 0 20px rgba(201,162,75,0.6)" }} />
            <div style={{ position: "absolute", left: 1110, top: 480, width: 300, textAlign: "center", fontFamily: display, fontSize: 96, color: COLORS.gold, textShadow: "0 0 30px rgba(201,162,75,0.5)" }}>$210</div>
          </div>
          {/* $10 bracket */}
          <div style={{ opacity: ramp(T, 65.3, 66.0) }}>
            <div style={{ position: "absolute", left: 758, top: 520, width: 4, height: 14, background: COLORS.grey }} />
            <div style={{ position: "absolute", left: 610, top: 440, width: 300, textAlign: "center", fontFamily: display, fontSize: 72, color: COLORS.grey }}>$10</div>
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1020, textAlign: "center", fontFamily: sans, fontWeight: 500, fontSize: 24, color: COLORS.grey, opacity: ramp(T, 58.6, 59.2) * dimBars }}>Bars exaggerated for clarity</div>
      </div>
    </AbsoluteFill>
  );
};
