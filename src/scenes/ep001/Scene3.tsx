import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";
import { display } from "../../config/fonts";
import { Backdrop } from "../../components/diagrams/Backdrop";
import { GlassCard } from "../../components/diagrams/GlassCard";
import { Title } from "../../components/typography/Title";
import { Subtitle } from "../../components/typography/Subtitle";
import { useT } from "../../components/transitions/Scene";
import { EASE, EASE_IO, POP, ramp } from "../../utils/timing";

// Scene 3 (0:27 to 0:48): the mechanism, the left-digit effect.
export const Scene3: React.FC = () => {
  const T = useT();
  const intro = ramp(T, 27.38, 28.1, 0, 1, POP);
  const read = ramp(T, 28.75, 30.5, 0, 1, EASE_IO);
  const hot = ramp(T, 30.78, 31.6);
  const moveLeft = ramp(T, 33.2, 34.3, 0, 1, EASE_IO);
  const cx = 960 + (540 - 960) * moveLeft;
  const cy = 520 + (590 - 520) * moveLeft;
  const sc = (0.85 + 0.15 * intro) * (1 - 0.3 * moveLeft);
  const pulse = ramp(T, 30.8, 31.9, 0, 1);
  const ring = pulse * (1 - pulse) * 4;
  const cards = ["First digit", "Read as lower", "Feels cheaper"];
  const cardsOut = ramp(T, 39.3, 39.9, 1, 0);
  const line = ramp(T, 39.8, 40.6);
  const perceived = ramp(T, 41.1, 42.7, 0, 1, EASE_IO);
  const lineOut = ramp(T, 44.1, 44.6, 1, 0);
  const A = 1010, B = 1780;
  const actualX = A + (B - A) * 0.99;
  const perceivedX = actualX + (A + (B - A) * 0.36 - actualX) * perceived;
  const pair = ramp(T, 44.63, 45.3);

  return (
    <AbsoluteFill>
      <Backdrop />
      {/* reading sweep */}
      <div style={{ position: "absolute", left: 960 - 400 + 800 * read, top: 330, width: 6, height: 380, background: COLORS.gold, boxShadow: "0 0 40px 12px rgba(201,162,75,0.5)", opacity: read > 0 && read < 1 && T < 33 ? 1 : 0 }} />
      {/* the number */}
      <div style={{ position: "absolute", left: cx - 500, top: cy - 200, width: 1000, height: 400, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${sc})`, fontFamily: display, fontSize: 330, lineHeight: 1 }}>
        <span style={{ color: COLORS.cream, opacity: 1 - 0.65 * hot }}>$</span>
        <span style={{ position: "relative", color: hot > 0.5 ? COLORS.gold : COLORS.cream, transform: `scale(${1 + 0.14 * hot})`, display: "inline-block", textShadow: `0 0 ${50 * hot}px rgba(201,162,75,${0.6 * hot})` }}>
          2
          <span style={{ position: "absolute", inset: -30, borderRadius: 40, border: `3px solid ${COLORS.gold}`, opacity: ring, transform: `scale(${1 + pulse * 0.5})` }} />
        </span>
        <span style={{ color: COLORS.cream, opacity: 1 - 0.65 * hot }}>.99</span>
      </div>
      {/* title and source */}
      <div style={{ position: "absolute", left: 120, top: 80, opacity: ramp(T, 33.22, 33.9), transform: `translateX(${(1 - ramp(T, 33.22, 33.9)) * -40}px)` }}>
        <Title text="The left-digit effect" size={104} />
      </div>
      <div style={{ position: "absolute", left: 124, top: 205, opacity: ramp(T, 37.2, 37.9) }}>
        <Subtitle text="Thomas & Morwitz, 2005" />
      </div>
      {/* three steps */}
      {cards.map((c, i) => {
        const p = ramp(T, 33.9 + i * 0.7, 34.6 + i * 0.7) * cardsOut;
        return <GlassCard key={c} label={c} index={i + 1} x={1010 + i * 300} y={650 + (1 - p) * 50 + (1 - cardsOut) * 60} width={260} height={400} labelSize={40} indexSize={110} opacity={p} highlight={i === 2} />;
      })}
      {/* number line */}
      <div style={{ opacity: line * lineOut }}>
        <div style={{ position: "absolute", left: A, width: (B - A) * line, top: 650, height: 5, background: COLORS.grey, borderRadius: 3 }} />
        {[["$2", A], ["$3", B]].map(([t, x]) => (
          <div key={t as string} style={{ position: "absolute", left: (x as number) - 60, top: 690, width: 120, textAlign: "center", fontFamily: display, fontSize: 70, color: COLORS.cream }}>{t}</div>
        ))}
        {/* actual */}
        <div style={{ position: "absolute", left: actualX - 17, top: 635, width: 34, height: 34, borderRadius: 17, border: `3px solid ${COLORS.grey}` }} />
        <div style={{ position: "absolute", left: actualX - 100, top: 560, width: 200, textAlign: "center", fontFamily: display, fontSize: 40, color: COLORS.grey }}>$2.99</div>
        {/* perceived */}
        <div style={{ position: "absolute", left: perceivedX - 22, top: 628, width: 44, height: 44, borderRadius: 22, background: COLORS.gold, boxShadow: "0 0 40px rgba(201,162,75,0.7)", opacity: ramp(T, 41.0, 41.3) }} />
        <div style={{ position: "absolute", left: perceivedX - 160, top: 800, width: 320, textAlign: "center", fontFamily: display, fontSize: 40, color: COLORS.gold, opacity: ramp(T, 41.3, 41.9) }}>How it feels</div>
      </div>
      {/* when it kicks in */}
      <GlassCard label="$3.00 vs $2.99" index="✓" caption="First digit changes" x={1150} y={650 + (1 - pair) * 50} width={400} height={440} highlight labelSize={50} indexSize={120} opacity={pair} />
      <GlassCard label="$3.29 vs $3.30" index="=" caption="Same first digit, no jump" x={1600} y={650 + (1 - ramp(T, 45.1, 45.8)) * 50} width={400} height={440} labelSize={50} indexSize={120} opacity={ramp(T, 45.1, 45.8)} />
    </AbsoluteFill>
  );
};
