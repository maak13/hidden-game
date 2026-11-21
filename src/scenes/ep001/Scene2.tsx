import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";
import { display, sans } from "../../config/fonts";
import { Backdrop } from "../../components/diagrams/Backdrop";
import { useT } from "../../components/transitions/Scene";
import { EASE, EASE_IO, ramp } from "../../utils/timing";

// Scene 2 (0:11 to 0:27): the stakes. A wall of prices; about a third end in .99; one tag becomes the focus.
const PRICES = [
  "$4.49", "$2.99", "$12.00", "$7.95", "$9.99", "$3.75",
  "$5.99", "$1.29", "$8.49", "$19.99", "$6.00", "$2.50",
  "$14.99", "$3.99", "$10.00", "$5.25", "$11.49", "$24.50",
];
const FOCUS = 1; // $2.99
const isNine = (p: string) => p.endsWith(".99");

export const Scene2: React.FC = () => {
  const T = useT();
  const nineIdx = PRICES.map((p, i) => (isNine(p) ? i : -1)).filter((i) => i >= 0);
  const drift = Math.sin(T * 0.5) * 6;
  const panel = ramp(T, 18.5, 19.2) * ramp(T, 22.4, 23.0, 1, 0);
  const dimOthers = ramp(T, 18.3, 18.9, 1, 0.22);
  const dimAll = ramp(T, 23.09, 23.7, 1, 0.1);
  const toFocus = ramp(T, 24.37, 25.7, 0, 1, EASE_IO);
  const scan = ramp(T, 25.6, 26.9, 0, 1, EASE_IO);

  return (
    <AbsoluteFill>
      <Backdrop />
      {PRICES.map((p, i) => {
        const c = i % 6;
        const r = Math.floor(i / 6);
        const baseX = 330 + c * 252;
        const baseY = 330 + r * 190;
        const nine = isNine(p);
        const appear = ramp(T, 10.98 + (c + r) * 0.1, 11.6 + (c + r) * 0.1);
        const glow = nine ? ramp(T, 12.4 + nineIdx.indexOf(i) * 0.18, 12.9 + nineIdx.indexOf(i) * 0.18) : 0;
        const focus = i === FOCUS;
        const dim = nine ? 1 : dimOthers;
        const op = appear * dim * (focus ? 1 : dimAll) * (focus ? 1 : ramp(T, 24.4, 25.2, 1, 0) + 0);
        const x = focus ? baseX + (960 - baseX) * toFocus : baseX;
        const y = focus ? baseY + (540 - baseY) * toFocus : baseY + (1 - appear) * 50 + drift * (c % 2 ? 1 : -1);
        const s = focus ? 1 + 2.1 * toFocus : 1;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - 120,
              top: y - 70,
              width: 240,
              height: 140,
              transform: `scale(${s})`,
              opacity: focus ? Math.max(op, appear * (T > 23 ? 1 : dim)) : op,
              borderRadius: 22,
              boxSizing: "border-box",
              background: nine && glow > 0 ? `linear-gradient(160deg, rgba(201,162,75,${0.12 + 0.3 * glow}), rgba(201,162,75,0.05))` : "linear-gradient(160deg, rgba(241,232,214,0.12), rgba(241,232,214,0.03))",
              border: `1.5px solid ${nine && glow > 0 ? `rgba(201,162,75,${0.35 + 0.5 * glow})` : "rgba(241,232,214,0.2)"}`,
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: display,
              fontSize: 58,
              color: nine && glow > 0.5 ? COLORS.gold : COLORS.cream,
              boxShadow: nine ? `0 0 ${50 * glow}px rgba(201,162,75,${0.35 * glow})` : "0 14px 30px rgba(0,0,0,0.35)",
            }}
          >
            {p}
          </div>
        );
      })}
      {/* scan line across the focus tag */}
      <div style={{ position: "absolute", top: 540 - 230, height: 460, left: 960 - 380 + 760 * scan, width: 5, background: COLORS.gold, boxShadow: "0 0 36px 10px rgba(201,162,75,0.5)", opacity: scan > 0 && scan < 1 ? 1 : 0 }} />
      {/* share panel */}
      <div
        style={{
          position: "absolute",
          left: 960 - 520,
          top: 540 - 190,
          width: 1040,
          height: 380,
          borderRadius: 40,
          opacity: panel,
          transform: `scale(${0.94 + 0.06 * panel})`,
          background: "linear-gradient(160deg, rgba(28,29,32,0.78), rgba(28,29,32,0.55))",
          border: "1.5px solid rgba(201,162,75,0.6)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.55)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontFamily: display, fontSize: 190, color: COLORS.gold, lineHeight: 1 }}>25–33%</div>
        <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 38, color: COLORS.cream, marginTop: 16, opacity: 0.85 }}>of prices in one retail dataset ended in .99</div>
      </div>
    </AbsoluteFill>
  );
};
