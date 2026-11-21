import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";
import { display } from "../../config/fonts";
import { CounterSurface } from "../../components/diagrams/CounterSurface";
import { PriceCard } from "../../components/diagrams/PriceCard";
import { Title } from "../../components/typography/Title";
import { Subtitle } from "../../components/typography/Subtitle";
import { useT } from "../../components/transitions/Scene";
import { EASE, EASE_IO, POP, ramp } from "../../utils/timing";

// Scene 7 (1:35 to end): return shot, reveal, end card.
export const Scene7: React.FC = () => {
  const T = useT();
  const cardIn = ramp(T, 95.5, 96.4);
  const pill = ramp(T, 98.7, 99.3, 0, 1, POP) * ramp(T, 100.2, 100.7, 1, 0);
  const push = ramp(T, 100.7, 102.6, 0, 1, EASE_IO) * ramp(T, 103.6, 104.5, 1, 0, EASE_IO);
  const zoom = 1 + 0.5 * push;
  const hot = ramp(T, 101.0, 102.0, 0, 1) * ramp(T, 104.2, 104.8, 1, 0.65);
  const gold = "#B8902F";
  const t1 = ramp(T, 103.71, 104.4);
  const t2 = ramp(T, 105.6, 106.3);
  const fade = ramp(T, 106.9, 107.5);
  const endCard = ramp(T, 107.4, 108.0);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: 1 - fade }}>
        <CounterSurface />
        <AbsoluteFill style={{ transform: `scale(${zoom}) translateX(${60 * push}px)`, transformOrigin: "50% 58%" }}>
          <PriceCard
            parts={[
              { text: "$", color: hot > 0.5 ? "#9A9487" : COLORS.charcoal, opacity: 1 - 0.4 * hot },
              { text: "9", color: hot > 0.3 ? gold : COLORS.charcoal },
              { text: ".99", color: "#9A9487", opacity: 1 - 0.55 * hot },
            ]}
            x={960}
            fontSize={150}
            opacity={cardIn}
            offsetY={(1 - cardIn) * -80}
          />
        </AbsoluteFill>
        <div style={{ position: "absolute", left: 960 + 260, top: 360, width: 160, height: 100, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontSize: 66, color: COLORS.gold, background: "rgba(28,29,32,0.7)", border: "1.5px solid rgba(201,162,75,0.8)", transform: `scale(${pill}) translateY(${(1 - pill) * 20}px)` }}>1¢</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 830, textAlign: "center" }}>
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
