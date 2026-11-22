import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";
import { display } from "../../config/fonts";
import { Backdrop } from "../../components/diagrams/Backdrop";
import { GlassCard } from "../../components/diagrams/GlassCard";
import { ShelfLabel } from "../../components/art/Products";
import { PhotoPanel } from "../../components/art/PhotoPanel";
import { Title } from "../../components/typography/Title";
import { Subtitle } from "../../components/typography/Subtitle";
import { useT } from "../../components/transitions/Scene";
import { EASE_IO, POP, ramp } from "../../utils/timing";
import journal from "../../../episodes/episode-001/assets/journal-left-digit-bias-2020.png";
import paper from "../../../episodes/episode-001/assets/thomas-morwitz-2005.png";

// Scene 3 (0:27 to 0:48): the mechanism. Real sources on screen, then the number line, then when it kicks in.
export const Scene3: React.FC = () => {
  const T = useT();
  const intro = ramp(T, 27.38, 28.1, 0, 1, POP);
  const read = ramp(T, 28.75, 30.5, 0, 1, EASE_IO);
  const hot = ramp(T, 30.78, 31.6);
  const bigOut = ramp(T, 33.0, 33.5, 1, 0);
  const pulse = ramp(T, 30.8, 31.9, 0, 1);
  const ring = pulse * (1 - pulse) * 4;

  const jIn = ramp(T, 33.2, 33.8) * ramp(T, 35.9, 36.3, 1, 0);
  const pIn = ramp(T, 36.0, 36.6) * ramp(T, 39.7, 40.1, 1, 0);

  const line = ramp(T, 40.0, 40.7);
  const perceived = ramp(T, 41.5, 43.1, 0, 1, EASE_IO);
  const lineOut = ramp(T, 44.1, 44.6, 1, 0);
  const A = 1010, B = 1780;
  const actualX = A + (B - A) * 0.99;
  const perceivedX = actualX + (A + (B - A) * 0.36 - actualX) * perceived;
  const pair = ramp(T, 44.63, 45.3);
  const pair2 = ramp(T, 45.1, 45.8);

  return (
    <AbsoluteFill>
      <Backdrop />
      {/* the number and reading sweep */}
      <div style={{ opacity: bigOut }}>
        <div style={{ position: "absolute", left: 960 - 400 + 800 * read, top: 330, width: 6, height: 380, background: COLORS.gold, boxShadow: "0 0 40px 12px rgba(201,162,75,0.5)", opacity: read > 0 && read < 1 && T < 33 ? 1 : 0 }} />
        <div style={{ position: "absolute", left: 460, top: 320, width: 1000, height: 400, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.85 + 0.15 * intro})`, fontFamily: display, fontSize: 330, lineHeight: 1 }}>
          <span style={{ color: COLORS.cream, opacity: 1 - 0.65 * hot }}>$</span>
          <span style={{ position: "relative", color: hot > 0.5 ? COLORS.gold : COLORS.cream, transform: `scale(${1 + 0.14 * hot})`, display: "inline-block", textShadow: `0 0 ${50 * hot}px rgba(201,162,75,${0.6 * hot})` }}>
            2
            <span style={{ position: "absolute", inset: -30, borderRadius: 40, border: `3px solid ${COLORS.gold}`, opacity: ring, transform: `scale(${1 + pulse * 0.5})` }} />
          </span>
          <span style={{ color: COLORS.cream, opacity: 1 - 0.65 * hot }}>.99</span>
        </div>
      </div>
      {/* persistent title */}
      <div style={{ position: "absolute", left: 120, top: 60, opacity: ramp(T, 33.22, 33.9), transform: `translateX(${(1 - ramp(T, 33.22, 33.9)) * -40}px)` }}>
        <Title text="The left-digit effect" size={100} />
      </div>
      {/* journal screenshot, highlighted */}
      <PhotoPanel src={journal} aspect={3163 / 1773} left={260} top={260} width={1400} height={700} t={T} opacity={jIn} focus={{ x: 0.1, y: 0.36, w: 0.56, h: 0.46 }} zoomAt={[33.5, 34.7]} highlights={[
        { x: 0.313, y: 0.626, w: 0.311, h: 0.025, at: 34.2, dur: 0.5 },
        { x: 0.124, y: 0.658, w: 0.467, h: 0.025, at: 34.6, dur: 0.7 },
        { x: 0.124, y: 0.69, w: 0.097, h: 0.025, at: 35.3, dur: 0.3 },
      ]} />
      <div style={{ position: "absolute", left: 124, top: 175, opacity: jIn }}>
        <Subtitle text="Sokolova, Seenivasan & Thomas · Journal of Marketing Research, 2020" size={34} />
      </div>
      {/* Thomas & Morwitz page */}
      <PhotoPanel src={paper} aspect={760 / 984} left={420} top={260} width={1080} height={700} t={T} opacity={pIn} focus={{ x: 0.4, y: 0.255, w: 0.54, h: 0.14 }} zoomAt={[37.0, 38.5]} highlights={[
        { x: 0.873, y: 0.273, w: 0.038, h: 0.013, at: 38.7, dur: 0.25 },
        { x: 0.435, y: 0.284, w: 0.362, h: 0.014, at: 39.0, dur: 0.8 },
      ]} />
      <div style={{ position: "absolute", left: 124, top: 175, opacity: pIn }}>
        <Subtitle text="Thomas & Morwitz · Journal of Consumer Research, 2005" size={34} />
      </div>
      {/* the same label, on a shelf */}
      <div style={{ position: "absolute", left: 150, top: 470, opacity: ramp(T, 40.0, 40.7) * ramp(T, 47.5, 47.9, 1, 0) }}>
        <ShelfLabel price="$2.99" width={620} fontSize={210} glow={ramp(T, 41.4, 42.4) * 0.5} />
      </div>
      {/* number line */}
      <div style={{ opacity: line * lineOut }}>
        <div style={{ position: "absolute", left: A, width: (B - A) * line, top: 650, height: 5, background: COLORS.grey, borderRadius: 3 }} />
        {[["$2", A], ["$3", B]].map(([t, x]) => (
          <div key={t as string} style={{ position: "absolute", left: (x as number) - 60, top: 690, width: 120, textAlign: "center", fontFamily: display, fontSize: 70, color: COLORS.cream }}>{t}</div>
        ))}
        <div style={{ position: "absolute", left: actualX - 17, top: 635, width: 34, height: 34, borderRadius: 17, border: `3px solid ${COLORS.grey}` }} />
        <div style={{ position: "absolute", left: actualX - 100, top: 560, width: 200, textAlign: "center", fontFamily: display, fontSize: 40, color: COLORS.grey }}>$2.99</div>
        <div style={{ position: "absolute", left: perceivedX - 22, top: 628, width: 44, height: 44, borderRadius: 22, background: COLORS.gold, boxShadow: "0 0 40px rgba(201,162,75,0.7)", opacity: ramp(T, 41.4, 41.7) }} />
        <div style={{ position: "absolute", left: perceivedX - 160, top: 800, width: 320, textAlign: "center", fontFamily: display, fontSize: 40, color: COLORS.gold, opacity: ramp(T, 41.9, 42.5) }}>How it feels</div>
        <div style={{ position: "absolute", left: 124, top: 175, opacity: ramp(T, 40.2, 40.8) }}>
          <Subtitle text="$2.99 registers closer to $2 than to $3" size={40} color={COLORS.cream} />
        </div>
      </div>
      {/* when it kicks in */}
      <GlassCard label="$3.00 vs $2.99" index="✓" caption="First digit changes" x={1150} y={650 + (1 - pair) * 50} width={400} height={440} highlight labelSize={50} indexSize={120} opacity={pair} />
      <GlassCard label="$3.29 vs $3.30" index="=" caption="Same first digit, no jump" x={1600} y={650 + (1 - pair2) * 50} width={400} height={440} labelSize={50} indexSize={120} opacity={pair2} />
    </AbsoluteFill>
  );
};
