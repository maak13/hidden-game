import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";
import { Backdrop } from "../../components/diagrams/Backdrop";
import { GlassCard } from "../../components/diagrams/GlassCard";
import { Product, ShelfLabel, ShelfUnit } from "../../components/art/Products";
import { Subtitle } from "../../components/typography/Subtitle";
import { useT } from "../../components/transitions/Scene";
import { EASE_IO, POP, ramp } from "../../utils/timing";

// Scene 2 (0:11 to 0:27): a real shelf, the nine is everywhere, then the study share, then one label up close.
const NINES = [1, 4, 6, 9, 13, 16];
const PRICES = ["$4.25", "$2.99", "$3.50", "$8.00", "$5.99", "$6.75", "$1.99", "$2.40", "$5.10", "$9.99", "$9.20", "$3.10", "$7.00", "$4.99", "$1.85", "$4.60", "$7.99", "$6.30"];

export const Scene2: React.FC = () => {
  const T = useT();
  const shrink = ramp(T, 14.72, 15.8, 0, 1, EASE_IO);
  const s = 1 - 0.38 * shrink;
  const tx = -51.2 * shrink;
  const ty = 184.2 * shrink;
  const dimOthers = ramp(T, 14.8, 15.6, 1, 0.4);
  const shelfOut = ramp(T, 23.0, 23.5, 1, 0);
  const stat = ramp(T, 17.8, 18.7);
  const close = ramp(T, 23.4, 24.1, 0, 1, POP);
  const scan = ramp(T, 24.9, 26.4, 0, 1, EASE_IO);
  return (
    <AbsoluteFill>
      <Backdrop glow={0.8} />
      <div style={{ opacity: shelfOut }}>
        <div style={{ transform: `translate(${tx}px, ${ty}px) scale(${s})`, transformOrigin: "0 0" }}>
          <ShelfUnit
            x={260}
            y={90}
            width={1400}
            rows={3}
            cols={6}
            rowHeight={300}
            prices={PRICES}
            appear={(i) => ramp(T, 11.0 + i * 0.1, 11.6 + i * 0.1, 0, 1, POP)}
            glow={(i) => (NINES.includes(i) ? ramp(T, 12.9 + NINES.indexOf(i) * 0.22, 13.3 + NINES.indexOf(i) * 0.22) : 0)}
            dim={(i) => (NINES.includes(i) ? 1 : dimOthers)}
          />
        </div>
        {/* study share */}
        <div style={{ position: "absolute", left: 110, top: 130, opacity: ramp(T, 14.8, 15.6) }}>
          <Subtitle text="Price data from one US retailer" size={40} color={COLORS.cream} />
        </div>
        <GlassCard label="of all prices ended in 99 cents" index="25–33%" x={1440} y={540 + (1 - stat) * 40} width={600} height={720} opacity={stat} highlight indexSize={120} labelSize={50} caption="Economics study, US retailer data" />
      </div>
      {/* close-up of one label */}
      <div style={{ opacity: close, transform: `scale(${0.8 + 0.2 * close})`, position: "absolute", inset: 0, transformOrigin: "50% 50%" }}>
        <div style={{ position: "absolute", left: 960 - 130, top: 150, opacity: 0.95 }}>
          <Product kind="jar" color="#5B8A5A" width={260} />
        </div>
        <div style={{ position: "absolute", left: 960 - 330, top: 520, width: 660 }}>
          <ShelfLabel price="$2.99" width={660} glow={ramp(T, 25.0, 26.2, 0, 1)} fontSize={230} />
          <div style={{ position: "absolute", left: 660 * scan - 4, top: -20, width: 8, height: 340, background: COLORS.gold, boxShadow: "0 0 40px 12px rgba(201,162,75,0.55)", opacity: scan > 0 && scan < 1 ? 1 : 0, borderRadius: 4 }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
