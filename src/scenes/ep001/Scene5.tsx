import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";
import { display, sans } from "../../config/fonts";
import { Backdrop } from "../../components/diagrams/Backdrop";
import { GlassBar } from "../../components/diagrams/GlassBar";
import { GlassCard } from "../../components/diagrams/GlassCard";
import { useT } from "../../components/transitions/Scene";
import { EASE, EASE_IO, POP, ramp } from "../../utils/timing";

// Scene 5 (1:10 to 1:28): field experiments, then shoppers vs stores.
const Arrow: React.FC = () => (
  <svg width="120" height="140" viewBox="0 0 120 140">
    <path d="M60 130 V30 M20 66 L60 24 L100 66" fill="none" stroke={COLORS.gold} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Scene5: React.FC = () => {
  const T = useT();
  const retail = ramp(T, 70.2, 70.9) * ramp(T, 71.9, 72.4, 1, 0);
  const cardsOut = ramp(T, 77.9, 78.5, 1, 0);
  const prod = ramp(T, 78.2, 78.9);
  const prodCount = ramp(T, 78.4, 80.0, 0, 1710, EASE_IO);
  const marker = ramp(T, 80.9, 81.5);

  return (
    <AbsoluteFill>
      <Backdrop />
      {/* retail title */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center", opacity: retail, transform: `translateY(${(1 - ramp(T, 70.2, 71.0)) * 40}px)` }}>
        <div style={{ fontFamily: display, fontSize: 230, color: COLORS.cream }}>Retail</div>
        <div style={{ margin: "10px auto 0", height: 6, width: 560 * ramp(T, 70.9, 71.7), background: COLORS.gold, borderRadius: 3, boxShadow: "0 0 24px rgba(201,162,75,0.7)" }} />
      </div>
      {/* three experiments */}
      <div style={{ opacity: cardsOut }}>
        {[0, 1, 2].map((i) => {
          const p = ramp(T, 73.2 + i * 1.2, 73.9 + i * 1.2);
          return (
            <GlassCard key={i} label="Demand up" index={i + 1} x={560 + i * 400} y={560 + (1 - p) * 60} width={340} height={470} opacity={p} labelSize={52} indexSize={120} highlight>
              <div style={{ transform: `translateY(${(1 - p) * 30}px)` }}>
                <Arrow />
              </div>
            </GlassCard>
          );
        })}
        <div style={{ position: "absolute", left: 960 - 330, top: 860, width: 660, height: 96, borderRadius: 48, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sans, fontWeight: 600, fontSize: 38, color: COLORS.cream, background: "rgba(201,162,75,0.18)", border: "1.5px solid rgba(201,162,75,0.7)", backdropFilter: "blur(16px)", opacity: ramp(T, 76.9, 77.5), transform: `scale(${0.9 + 0.1 * ramp(T, 76.9, 77.5, 0, 1, POP)})` }}>
          Strongest for new items
        </div>
      </div>
      {/* products and columns */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center", opacity: prod }}>
        <div style={{ fontFamily: display, fontSize: 120, color: COLORS.cream, lineHeight: 1 }}>{Math.round(prodCount).toLocaleString("en-US")} products</div>
        <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 36, color: COLORS.grey, marginTop: 8 }}>in 248 stores of one US retailer</div>
      </div>
      <div style={{ opacity: ramp(T, 80.8, 81.2) }}>
        <GlassBar x={760} baseY={930} width={300} height={560} grow={ramp(T, 81.4, 84.3, 0, 1, EASE_IO)} gold caption="How shoppers reacted" />
        <GlassBar x={1160} baseY={930} width={300} height={72} grow={ramp(T, 85.3, 86.5)} caption="How stores priced" />
        <div style={{ position: "absolute", left: 760 - 150, width: 300, textAlign: "center", top: 930 - 560 * ramp(T, 81.4, 84.3, 0, 1, EASE_IO) - 100, fontFamily: display, fontSize: 84, color: COLORS.gold, opacity: ramp(T, 83.2, 83.9) }}>15–25¢</div>
        <div style={{ position: "absolute", left: 1160 - 150, width: 300, textAlign: "center", top: 930 - 72 * ramp(T, 85.3, 86.5) - 100, fontFamily: display, fontSize: 84, color: COLORS.cream, opacity: ramp(T, 86.0, 86.7) }}>2–3¢</div>
        {/* one cent baseline */}
        <div style={{ position: "absolute", left: 560, width: 800, top: 906, height: 0, borderTop: `3px dashed ${COLORS.cream}`, opacity: 0.6 * marker }} />
        <div style={{ position: "absolute", left: 1385, top: 884, fontFamily: display, fontSize: 44, color: COLORS.cream, opacity: marker }}>1¢</div>
      </div>
    </AbsoluteFill>
  );
};
