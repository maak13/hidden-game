import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";
import { display } from "../../config/fonts";
import { Backdrop } from "../../components/diagrams/Backdrop";
import { GlassCard } from "../../components/diagrams/GlassCard";
import { PhotoPanel, Hl } from "../../components/art/PhotoPanel";
import { Title } from "../../components/typography/Title";
import { Subtitle } from "../../components/typography/Subtitle";
import { useT } from "../../components/transitions/Scene";
import { POP, ramp } from "../../utils/timing";
import mug from "../../../episodes/episode-003/assets/coffee-mug.jpeg";
import mugHand from "../../../episodes/episode-003/assets/mug-holding.jpeg";
import lab from "../../../episodes/episode-003/assets/lab.jpeg";
import labStudents from "../../../episodes/episode-003/assets/lab-students.jpeg";
import abstract from "../../../episodes/episode-003/assets/paper-abstract.png";
import table2 from "../../../episodes/episode-003/assets/paper-table2.png";
import trial from "../../../episodes/episode-003/assets/free-trial.jpg";
import closetMessy from "../../../episodes/episode-003/assets/closet-messy.jpeg";
import LOGO from "../../../episodes/episode-003/assets/channel-logo.png";

// Vertical 1080 x 1920. Title block top (right padding leaves room for the corner logo), content 380 to 1340, captions 1390.
const Head: React.FC<{ title: string; sub?: string; from: number; to?: number; color?: string; size?: number }> = ({ title, sub, from, to = 999, color, size = 100 }) => {
  const T = useT();
  const o = ramp(T, from, from + 0.5) * ramp(T, to - 0.3, to, 1, 0);
  return (
    <div style={{ position: "absolute", left: 70, right: 170, top: 110, opacity: o, transform: `translateY(${(1 - o) * 24}px)` }}>
      <Title text={title} size={size} color={color} />
      {sub && <div style={{ marginTop: 14 }}><Subtitle text={sub} size={36} /></div>}
    </div>
  );
};

// Portrait photo, centred, sized by height.
const Pic: React.FC<{ src: string; aspect: number; h: number; top: number; t: number; opacity: number; hl?: Hl[]; focus?: { x: number; y: number; w: number; h: number }; zoomAt?: [number, number] }> = ({ src, aspect, h, top, t, opacity, hl, focus, zoomAt }) => {
  const w = Math.min(960, h * aspect);
  return <PhotoPanel src={src} aspect={aspect} left={(1080 - w) / 2} top={top} width={w} height={h} t={t} opacity={opacity} highlights={hl} focus={focus} zoomAt={zoomAt} />;
};

const Tag: React.FC<{ value: string; left: number; top: number; p: number; w?: number }> = ({ value, left, top, p, w = 270 }) => (
  <div style={{ position: "absolute", left, top, width: w, height: 160, borderRadius: 36, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontSize: 124, color: COLORS.charcoal, background: COLORS.gold, boxShadow: "0 0 60px rgba(201,162,75,0.55), 0 20px 50px rgba(0,0,0,0.5)", transform: `scale(${p}) rotate(${(1 - p) * -8}deg)`, opacity: Math.min(1, p * 1.5) }}>{value}</div>
);

// 1. Hook: a $3 mug, handed over, now worth more
export const S1: React.FC = () => {
  const T = useT();
  const a = ramp(T, 0.1, 0.6) * ramp(T, 3.3, 3.6, 1, 0);
  const b = ramp(T, 3.4, 4.0);
  const tag = ramp(T, 1.65, 2.2, 0, 1, POP);
  const seven = ramp(T, 6.5, 7.0, 0, 1, POP);
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="A $3 mug" from={0.1} to={3.4} />
      <Head title="Now it's yours." from={3.5} to={6.4} />
      <Head title="Worth more?" from={6.5} color={COLORS.gold} size={112} />
      <Pic src={mug} aspect={736 / 920} h={900} top={400} t={T} opacity={a} />
      <Pic src={mugHand} aspect={736 / 966} h={900} top={400} t={T} opacity={b} />
      {T < 6.5 ? <Tag value="$3" left={650} top={1180} p={tag} /> : <Tag value="$7" left={650} top={1180} p={seven} />}
    </AbsoluteFill>
  );
};

// 2. It's an experiment
export const S2: React.FC = () => {
  const T = useT();
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="Not a trick." from={8.4} to={10.0} />
      <Head title="An experiment." from={10.05} color={COLORS.gold} />
      <Pic src={lab} aspect={736 / 1177} h={900} top={400} t={T} opacity={ramp(T, 8.5, 9.0)} />
    </AbsoluteFill>
  );
};

// 3. 1990: the paper, then the market
export const S3: React.FC = () => {
  const T = useT();
  const p = ramp(T, 11.8, 12.3) * ramp(T, 16.4, 16.8, 1, 0);
  const s = ramp(T, 16.7, 17.2);
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="1990" sub="Kahneman, Knetsch & Thaler" from={11.7} to={16.5} />
      <Head title="Then, a market" from={16.7} color={COLORS.gold} />
      <PhotoPanel src={abstract} aspect={1391 / 1502} left={60} top={470} width={960} height={600} t={T} opacity={p} focus={{ x: 0.12, y: 0.77, w: 0.76, h: 0.18 }} zoomAt={[12.0, 13.0]} highlights={[
        { x: 0.15, y: 0.785, w: 0.7, h: 0.024, at: 13.2, dur: 0.8 },
        { x: 0.15, y: 0.808, w: 0.3, h: 0.024, at: 14.5, dur: 0.6 },
      ]} />
      <Pic src={labStudents} aspect={736 / 985} h={900} top={400} t={T} opacity={s} />
    </AbsoluteFill>
  );
};

// 4. Two questions: owners sell, buyers pay
export const S4: React.FC = () => {
  const T = useT();
  const a = ramp(T, 18.95, 19.5, 0, 1, POP);
  const b = ramp(T, 22.65, 23.2, 0, 1, POP);
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="Owners and buyers" from={18.7} />
      <GlassCard label="Owners sell for" index="$?" x={300} y={870 + (1 - a) * 50} width={440} height={640} indexSize={190} labelSize={44} opacity={a} highlight />
      <GlassCard label="Buyers pay" index="$?" x={780} y={870 + (1 - b) * 50} width={440} height={640} indexSize={190} labelSize={44} opacity={b} />
    </AbsoluteFill>
  );
};

// 5. The real table, then the medians
export const S5: React.FC = () => {
  const T = useT();
  const tb = ramp(T, 25.7, 26.2) * ramp(T, 28.1, 28.5, 1, 0);
  const a = ramp(T, 28.55, 29.1, 0, 1, POP);
  const b = ramp(T, 32.05, 32.6, 0, 1, POP);
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="More than twice" from={25.65} to={28.4} color={COLORS.gold} />
      <Head title="In one run" sub="Median of 77 students" from={28.5} />
      <PhotoPanel src={table2} aspect={1396 / 1689} left={60} top={560} width={960} height={330} t={T} opacity={tb} focus={{ x: 0.06, y: 0.345, w: 0.88, h: 0.17 }} zoomAt={[25.8, 26.4]} highlights={[
        { x: 0.5, y: 0.43, w: 0.1, h: 0.078, at: 26.6, dur: 0.6 },
        { x: 0.74, y: 0.43, w: 0.105, h: 0.078, at: 27.2, dur: 0.6 },
      ]} />
      <GlassCard label="Owners asked" index="$7.12" x={300} y={920 + (1 - a) * 50} width={440} height={620} indexSize={120} labelSize={42} opacity={a} highlight />
      <GlassCard label="Buyers offered" index="$2.87" x={780} y={920 + (1 - b) * 50} width={440} height={620} indexSize={120} labelSize={42} opacity={b} />
    </AbsoluteFill>
  );
};

// 6. Same mug, same room
export const S6: React.FC = () => {
  const T = useT();
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="Same mug." from={34.6} to={35.6} />
      <Head title="Same room." from={35.65} to={36.8} />
      <Head title="Who held it." from={36.85} color={COLORS.gold} />
      <Pic src={mugHand} aspect={736 / 966} h={900} top={400} t={T} opacity={ramp(T, 34.6, 35.1)} />
    </AbsoluteFill>
  );
};

// 7. The prediction: about half should trade
export const S7: React.FC = () => {
  const T = useT();
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="It kills the trade" from={39.3} to={41.5} />
      <Head title="Half should trade" from={41.55} color={COLORS.gold} />
      <PhotoPanel src={abstract} aspect={1391 / 1502} left={60} top={460} width={960} height={640} t={T} opacity={ramp(T, 39.5, 40.0)} focus={{ x: 0.1, y: 0.65, w: 0.8, h: 0.29 }} zoomAt={[39.6, 40.6]} highlights={[
        { x: 0.15, y: 0.833, w: 0.7, h: 0.024, at: 41.7, dur: 0.8 },
        { x: 0.15, y: 0.856, w: 0.7, h: 0.024, at: 43.7, dur: 1.2 },
      ]} />
    </AbsoluteFill>
  );
};

// 8. Expected 11, actual a handful, one in five
export const S8: React.FC = () => {
  const T = useT();
  const a = ramp(T, 46.1, 46.7, 0, 1, POP);
  const b = ramp(T, 46.95, 47.5, 0, 1, POP);
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="Only a handful" sub="Cornell class, 44 students" from={46.1} to={49.8} />
      <Head title="One in five" sub="Experiment 1, mugs" from={49.9} color={COLORS.gold} />
      <GlassCard label="Expected trades" index="11" x={300} y={900 + (1 - a) * 50} width={440} height={620} indexSize={220} labelSize={42} opacity={a} />
      <GlassCard label="Actual trades" index="1 to 4" x={780} y={900 + (1 - b) * 50} width={440} height={620} indexSize={110} labelSize={42} opacity={b} highlight />
    </AbsoluteFill>
  );
};

// 9. Not greed
export const S9: React.FC = () => {
  const T = useT();
  const s = ramp(T, 53.4, 53.9, 0, 1, POP);
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="Not greed." from={51.2} to={53.1} />
      <Head title="Owning it changed the price." from={53.2} color={COLORS.gold} size={92} />
      <Pic src={mug} aspect={736 / 920} h={760} top={560} t={T} opacity={ramp(T, 51.3, 51.8)} />
      {T < 53.4 ? <Tag value="$3" left={660} top={1150} p={1} /> : <Tag value="$7" left={660} top={1150} p={s} />}
    </AbsoluteFill>
  );
};

const Arrow: React.FC<{ down?: boolean; size: number; color: string }> = ({ down, size, color }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 100 120" style={{ transform: down ? "none" : "rotate(180deg)" }}>
    <path d="M50 8 L50 88 M16 58 L50 98 L84 58" fill="none" stroke={color} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 10. The endowment effect, loss vs gain
export const S10: React.FC = () => {
  const T = useT();
  const pa = ramp(T, 55.3, 55.8) * ramp(T, 57.9, 58.3, 1, 0);
  const own = ramp(T, 58.4, 58.9) * ramp(T, 59.9, 60.2, 1, 0);
  const loss = ramp(T, 60.15, 60.7, 0, 1, POP);
  const mv = ramp(T, 62.1, 62.8);
  const gain = ramp(T, 62.2, 62.8, 0, 1, POP);
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="The endowment effect" from={55.3} to={58.2} size={96} />
      <Head title="Yours" from={58.4} to={60.0} color={COLORS.gold} size={120} />
      <Head title="Losses weigh more" from={60.1} size={96} />
      <PhotoPanel src={abstract} aspect={1391 / 1502} left={60} top={520} width={960} height={380} t={T} opacity={pa} focus={{ x: 0.08, y: 0.05, w: 0.84, h: 0.16 }} zoomAt={[55.5, 56.4]} highlights={[{ x: 0.62, y: 0.07, w: 0.25, h: 0.035, at: 56.6, dur: 0.7 }]} />
      <Pic src={mug} aspect={736 / 920} h={760} top={480} t={T} opacity={own} />
      <GlassCard label="Loss" x={540 - 240 * mv} y={960 + (1 - loss) * 50} width={440} height={700} labelSize={52} opacity={loss} highlight>
        <div style={{ display: "flex", justifyContent: "center" }}><Arrow down size={230} color={COLORS.gold} /></div>
      </GlassCard>
      <GlassCard label="Gain" x={780} y={960} width={440} height={520} labelSize={44} opacity={gain}>
        <div style={{ display: "flex", justifyContent: "center" }}><Arrow size={130} color={COLORS.cream} /></div>
      </GlassCard>
    </AbsoluteFill>
  );
};

// 11. Free trials, the jacket you never wear
export const S11: React.FC = () => {
  const T = useT();
  const a = ramp(T, 64.5, 65.0) * ramp(T, 66.4, 66.8, 1, 0);
  const b = ramp(T, 66.7, 67.2);
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="Free trials" from={64.5} to={66.5} />
      <Head title="The jacket you never wear" from={66.7} color={COLORS.gold} size={92} />
      <PhotoPanel src={trial} aspect={1470 / 980} left={60} top={560} width={960} height={640} t={T} opacity={a} highlights={[{ x: 0.22, y: 0.35, w: 0.53, h: 0.18, at: 65.3, dur: 0.7 }]} />
      <Pic src={closetMessy} aspect={736 / 987} h={880} top={430} t={T} opacity={b} />
    </AbsoluteFill>
  );
};

// 12. The question to ask
export const S12: React.FC = () => {
  const T = useT();
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="Ask yourself" from={69.5} to={70.7} />
      <Head title="Would you buy it today?" sub="At the price you're asking" from={70.8} color={COLORS.gold} size={92} />
      <Pic src={mug} aspect={736 / 920} h={760} top={560} t={T} opacity={ramp(T, 70.8, 71.3)} />
      <Tag value="$?" left={660} top={1150} p={ramp(T, 71.4, 71.9, 0, 1, POP)} />
    </AbsoluteFill>
  );
};

// 13. End card: logo and brand name only
export const S13: React.FC = () => {
  const T = useT();
  const e = ramp(T, 73.9, 74.6);
  return (
    <AbsoluteFill style={{ background: COLORS.charcoal }}>
      <Backdrop />
      <AbsoluteFill style={{ background: COLORS.charcoal, opacity: ramp(T, 73.7, 74.1, 0, 0.9) }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: e, transform: `scale(${0.96 + 0.04 * e})` }}>
        <div style={{ width: 420, height: 420, borderRadius: 90, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.6)", background: "#FFF6E6" }}>
          <img src={LOGO} style={{ width: 420, height: 420, display: "block" }} />
        </div>
        <div style={{ height: 50 }} />
        <Title text="AhadInsights" size={130} align="center" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
