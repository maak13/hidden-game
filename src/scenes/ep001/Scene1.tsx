import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";
import { display } from "../../config/fonts";
import { CounterSurface } from "../../components/diagrams/CounterSurface";
import { PriceCard } from "../../components/diagrams/PriceCard";
import { useT } from "../../components/transitions/Scene";
import { EASE, EASE_IO, POP, ramp } from "../../utils/timing";

// Scene 1 (0:00 to 0:11): object cold open. Two cards, one cent apart.
export const Scene1: React.FC = () => {
  const T = useT();
  const cam = ramp(T, 0, 4.5, 1.14, 1.0) * ramp(T, 8, 10.98, 1, 0.9, EASE_IO);
  const sep = ramp(T, 8.0, 9.7, 0, 150, EASE_IO);
  const ax = 650 - sep;
  const bx = 1270 + sep;
  const lineL = ax + 220;
  const lineR = bx - 220;
  const linkGrow = ramp(T, 5.87, 6.5);
  const linkMid = (lineL + lineR) / 2;
  const half = ((lineR - lineL) / 2) * linkGrow;
  const pill = ramp(T, 6.3, 6.85, 0, 1, POP) * ramp(T, 8.2, 8.8, 1, 0);
  const q = ramp(T, 8.7, 9.5);

  return (
    <AbsoluteFill>
      <CounterSurface />
      <AbsoluteFill style={{ transform: `scale(${cam})`, transformOrigin: "50% 70%" }}>
        <PriceCard parts={[]} x={ax} ghost opacity={ramp(T, 0.1, 0.8, 0, 0.55) * ramp(T, 1.6, 2.0, 1, 0)} />
        <PriceCard parts={[]} x={bx} ghost opacity={ramp(T, 0.3, 1.0, 0, 0.55) * ramp(T, 3.79, 4.2, 1, 0)} />
        <PriceCard parts={[{ text: "$9.99" }]} x={ax} fontSize={132} opacity={ramp(T, 1.6, 2.0)} offsetY={ramp(T, 1.6, 2.3, -150, 0, POP)} />
        <PriceCard parts={[{ text: "$10" }]} x={bx} fontSize={190} opacity={ramp(T, 3.79, 4.2)} offsetY={ramp(T, 3.79, 4.5, -150, 0, POP)} />
        {/* the one-cent link */}
        <div style={{ position: "absolute", left: linkMid - half, width: half * 2, top: 468, height: 4, background: COLORS.gold, boxShadow: "0 0 24px rgba(201,162,75,0.7)", opacity: ramp(T, 8.0, 9.0, 1, 0.35) }} />
        <div
          style={{
            position: "absolute",
            left: linkMid - 90,
            top: 468 - 54,
            width: 180,
            height: 108,
            borderRadius: 54,
            transform: `scale(${pill})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: display,
            fontSize: 74,
            color: COLORS.gold,
            background: "rgba(28,29,32,0.7)",
            border: "1.5px solid rgba(201,162,75,0.8)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 0 40px rgba(201,162,75,0.35)",
          }}
        >
          1¢
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: display, fontSize: 260, color: COLORS.gold, opacity: q, transform: `translateY(${(1 - q) * 30}px)` }}>?</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
