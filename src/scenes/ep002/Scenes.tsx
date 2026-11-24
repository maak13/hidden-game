import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";
import { display, sans } from "../../config/fonts";
import { Backdrop } from "../../components/diagrams/Backdrop";
import { GlassCard } from "../../components/diagrams/GlassCard";
import { PhotoPanel } from "../../components/art/PhotoPanel";
import { Product, ShelfLabel } from "../../components/art/Products";
import { AnchorIcon, ChocolateBox, IdCard, Jacket, Keyboard } from "../../components/art/Items";
import { Title } from "../../components/typography/Title";
import { Subtitle } from "../../components/typography/Subtitle";
import { useT } from "../../components/transitions/Scene";
import { EASE, EASE_IO, POP, ramp } from "../../utils/timing";
import paper from "../../../episodes/episode-002/assets/coherent-arbitrariness-2003.png";
import table from "../../../episodes/episode-002/assets/table-1-wtp-2003.png";
import priceReg from "../../../episodes/episode-002/assets/price-sale-reg.jpeg";
import priceWasNow from "../../../episodes/episode-002/assets/price-was-now.jpeg";
import priceLow from "../../../episodes/episode-002/assets/price-everyday-low.jpeg";
import menu from "../../../episodes/episode-002/assets/food-menu.jpeg";

// Vertical 1080 x 1920. Title block top, content 330 to 1340, captions 1390 and below.
const frac = (x: number) => x - Math.floor(x);
const rnd = (n: number) => String(10 + Math.floor(frac(Math.sin(n * 91.7 + 3.1) * 43758.5453) * 90));
const Head: React.FC<{ title: string; sub?: string; from: number; to?: number; color?: string; size?: number }> = ({ title, sub, from, to = 999, color, size = 100 }) => {
  const T = useT();
  const o = ramp(T, from, from + 0.5) * ramp(T, to - 0.3, to, 1, 0);
  return (
    <div style={{ position: "absolute", left: 70, right: 70, top: 110, opacity: o, transform: `translateY(${(1 - o) * 24}px)` }}>
      <Title text={title} size={size} color={color} />
      {sub && <div style={{ marginTop: 14 }}><Subtitle text={sub} size={36} /></div>}
    </div>
  );
};

// 1. Hook
export const S1: React.FC = () => {
  const T = useT();
  const digits = T < 1.7 ? rnd(Math.floor(T * 16)) : "86";
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="A strange experiment" from={0.1} size={110} />
      <GlassCard label="a random number" index={digits} x={540} y={860} width={560} height={640} indexSize={290} labelSize={46} highlight opacity={ramp(T, 0.2, 0.7)} scale={0.9 + 0.1 * ramp(T, 0.2, 0.9, 0, 1, POP)} />
    </AbsoluteFill>
  );
};

// 2. Students, social security number, random number, bid
export const S2: React.FC = () => {
  const T = useT();
  const panel = ramp(T, 2.3, 2.9) * ramp(T, 7.2, 7.6, 1, 0);
  const card = ramp(T, 7.0, 7.7, 0, 1, EASE) * ramp(T, 9.6, 10.2, 1, 0);
  const cardY = 860 + (1 - card) * 700;
  const flick = T >= 7.85 && T < 8.9;
  const digits = flick ? rnd(Math.floor(T * 14)) : "86";
  const glow = ramp(T, 8.9, 9.4);
  const bid = ramp(T, 9.8, 10.5, 0, 1, POP);
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="MIT students, 2003" sub="Ariely, Loewenstein & Prelec" from={2.2} to={7.5} />
      <Head title="A random number" from={7.85} to={9.6} />
      <Head title="Then, a bid" from={9.75} />
      <PhotoPanel src={paper} aspect={1651 / 1519} left={60} top={420} width={960} height={620} t={T} opacity={panel} focus={{ x: 0.105, y: 0.325, w: 0.808, h: 0.351 }} zoomAt={[3.0, 4.2]} highlights={[
        { x: 0.545, y: 0.369, w: 0.299, h: 0.024, at: 4.3, dur: 0.6 },
        { x: 0.327, y: 0.393, w: 0.295, h: 0.024, at: 5.9, dur: 0.8 },
      ]} />
      <div style={{ position: "absolute", left: 540 - 410, top: cardY - 246, opacity: card }}>
        <IdCard digits={digits} glow={glow} width={820} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1150, textAlign: "center", opacity: ramp(T, 7.4, 8.0) * ramp(T, 9.5, 9.8, 1, 0) }}>
        <Subtitle text="Sample card, not a real number" size={30} align="center" />
      </div>
      <GlassCard label="Your maximum bid" index="$?" x={540} y={880} width={640} height={520} indexSize={220} labelSize={50} opacity={bid} scale={0.85 + 0.15 * bid} highlight />
    </AbsoluteFill>
  );
};

// 3. Three products, same goods, different bids
export const S3: React.FC = () => {
  const T = useT();
  const items = [
    { x: 190, label: "Keyboard", t: 11.66, node: <Keyboard width={230} /> },
    { x: 540, label: "Wine", t: 12.6, node: <Product kind="bottle" color="#6B1F2A" width={150} /> },
    { x: 890, label: "Chocolate", t: 13.36, node: <ChocolateBox width={210} /> },
  ];
  const hot = ramp(T, 15.2, 15.9);
  const chip = ramp(T, 14.5, 15.1, 0, 1, POP);
  const ring = ((T - 14.6) * 0.9) % 1;
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="What would you pay?" from={11.45} to={14.35} />
      <Head title="Same goods. Different bids." from={14.45} color={COLORS.gold} size={92} />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: chip }}>
        {items.map((it) => (
          <line key={it.x} x1={540} y1={600} x2={it.x} y2={720} stroke={COLORS.gold} strokeWidth={4} strokeDasharray="10 10" />
        ))}
      </svg>
      <div style={{ position: "absolute", left: 540 - 110, top: 480, width: 220, height: 160, borderRadius: 36, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontSize: 120, color: COLORS.charcoal, background: COLORS.gold, boxShadow: "0 0 60px rgba(201,162,75,0.6)", transform: `scale(${chip})`, opacity: chip }}>86</div>
      {T > 14.6 && <div style={{ position: "absolute", left: 540 - 110, top: 480, width: 220, height: 160, borderRadius: 36, border: `3px solid ${COLORS.gold}`, opacity: 0.6 * (1 - ring), transform: `scale(${1 + ring * 0.6})` }} />}
      {items.map((it) => {
        const p = ramp(T, it.t, it.t + 0.5, 0, 1, POP);
        return (
          <GlassCard key={it.label} label={it.label} x={it.x} y={990 + (1 - p) * 40} width={300} height={520} labelSize={44} opacity={p} highlight={hot > 0.5}>
            {it.node}
          </GlassCard>
        );
      })}
    </AbsoluteFill>
  );
};

// 4. Table I and the two keyboard prices
export const S4: React.FC = () => {
  const T = useT();
  const a = ramp(T, 21.0, 21.6, 0, 1, POP);
  const b = ramp(T, 24.8, 25.4, 0, 1, POP);
  const same = ramp(T, 26.3, 26.8, 0, 1, POP);
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="One keyboard" sub="Average stated willingness to pay, Table I" from={18.4} />
      <PhotoPanel src={table} aspect={1845 / 1120} left={60} top={400} width={960} height={440} t={T} opacity={ramp(T, 18.5, 19.1)} focus={{ x: 0.215, y: 0.4, w: 0.37, h: 0.36 }} zoomAt={[18.7, 19.9]} highlights={[
        { x: 0.372, y: 0.71, w: 0.067, h: 0.033, at: 20.3, dur: 0.5 },
        { x: 0.372, y: 0.531, w: 0.067, h: 0.035, at: 24.6, dur: 0.5 },
      ]} />
      <GlassCard label="Highest numbers" index="$56" x={300} y={1130 + (1 - a) * 50} width={450} height={440} indexSize={130} labelSize={42} highlight opacity={a}>
        <Keyboard width={250} />
      </GlassCard>
      <GlassCard label="Lowest numbers" index="$16" x={780} y={1130 + (1 - b) * 50} width={450} height={440} indexSize={130} labelSize={42} opacity={b}>
        <Keyboard width={250} />
      </GlassCard>
      <div style={{ position: "absolute", left: 540 - 150, top: 1130 - 40, width: 300, height: 80, borderRadius: 40, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontSize: 40, color: COLORS.charcoal, background: COLORS.gold, boxShadow: "0 10px 30px rgba(0,0,0,0.5)", transform: `scale(${same})`, opacity: same }}>Same keyboard</div>
    </AbsoluteFill>
  );
};

// 5. Anchoring and insufficient adjustment
export const S5: React.FC = () => {
  const T = useT();
  const drop = ramp(T, 28.4, 29.3, 0, 1, POP);
  const dotIn = ramp(T, 30.5, 31.0);
  const move = ramp(T, 33.3, 36.1, 0, 1, EASE_IO);
  const real = ramp(T, 33.0, 33.7);
  const gap = ramp(T, 36.7, 37.4);
  const A = 520, R = 1120, STOP = A + (R - A) * 0.52;
  const dotY = A + (STOP - A) * move;
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="Anchoring" from={28.25} color={COLORS.gold} size={140} />
      <div style={{ position: "absolute", left: 296, top: 440, width: 8, height: 760, borderRadius: 4, background: "linear-gradient(180deg, rgba(201,162,75,0.9), rgba(138,147,160,0.5))" }} />
      <div style={{ position: "absolute", left: 300 - 80, top: A - 130 - (1 - drop) * 300, opacity: drop }}>
        <AnchorIcon size={160} />
      </div>
      <div style={{ position: "absolute", left: 430, top: A - 40, opacity: ramp(T, 30.6, 31.2) }}><Title text="Starting point" size={64} color={COLORS.cream} /></div>
      <div style={{ position: "absolute", left: 300 - 20, top: dotY - 20, width: 40, height: 40, borderRadius: 20, background: COLORS.gold, boxShadow: "0 0 40px rgba(201,162,75,0.8)", opacity: dotIn }} />
      <div style={{ position: "absolute", left: 430, top: dotY + 40, opacity: ramp(T, 33.4, 34.0) * ramp(T, 36.1, 36.6, 1, 0) }}><Subtitle text="adjusted from there" size={40} color={COLORS.cream} /></div>
      <div style={{ position: "absolute", left: 300 - 26, top: R - 26, width: 52, height: 52, borderRadius: 26, border: `5px solid ${COLORS.grey}`, opacity: real }} />
      <div style={{ position: "absolute", left: 430, top: R - 36, opacity: real }}><Title text="Real value" size={64} color={COLORS.grey} /></div>
      <div style={{ position: "absolute", left: 200, top: STOP, width: 6, height: (R - STOP) * gap, background: COLORS.gold, opacity: 0.9 }} />
      <div style={{ position: "absolute", left: 430, top: (STOP + R) / 2 - 70, opacity: gap }}><Title text="Not enough" size={84} color={COLORS.gold} /></div>
    </AbsoluteFill>
  );
};

// 6. Jackets in a store (illustration)
export const S6: React.FC = () => {
  const T = useT();
  const rack = ramp(T, 38.6, 39.3);
  const a = ramp(T, 40.4, 41.1, 0, 1, POP);
  const b = ramp(T, 43.4, 44.1, 0, 1, POP);
  const hot = ramp(T, 46.75, 47.4);
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="Inside a store" from={38.6} />
      <div style={{ position: "absolute", left: 60, right: 60, top: 560, height: 16, borderRadius: 8, background: "linear-gradient(180deg, #A5ADB8, #5A606A)", opacity: rack, boxShadow: "0 14px 20px rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: 300 - 170, top: 520 - (1 - a) * 400, opacity: a * (1 - 0.55 * hot) }}><Jacket color="#3F6E8C" width={340} /></div>
      <div style={{ position: "absolute", left: 780 - 170, top: 520 - (1 - b) * 400, opacity: b }}><Jacket color="#B5483A" width={340} /></div>
      <div style={{ position: "absolute", left: 300 - 130, top: 960, opacity: a * (1 - 0.55 * hot) }}><ShelfLabel price="$300" width={260} fontSize={96} /></div>
      <div style={{ position: "absolute", left: 780 - 130, top: 960, opacity: b }}><ShelfLabel price="$120" width={260} fontSize={96} glow={hot} /></div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1130, textAlign: "center", opacity: hot, transform: `translateY(${(1 - hot) * 20}px)` }}><Title text="Feels reasonable" size={84} color={COLORS.gold} align="center" /></div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1260, textAlign: "center", opacity: ramp(T, 40.5, 41.1) }}><Subtitle text="Illustration" size={30} align="center" /></div>
    </AbsoluteFill>
  );
};

// 7. Real was / now shelf tags
export const S7: React.FC = () => {
  const T = useT();
  const p1 = ramp(T, 49.0, 49.5) * ramp(T, 51.35, 51.7, 1, 0);
  const p2 = ramp(T, 51.45, 51.9);
  const stamp = ramp(T, 54.83, 55.2, 0, 1, POP);
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="Was. Now." sub="Real shelf tags" from={49.0} to={54.7} />
      <Head title="An anchor" from={54.85} color={COLORS.gold} />
      <PhotoPanel src={priceReg} aspect={736 / 981} left={140} top={400} width={800} height={920} t={T} opacity={p1} focus={{ x: 0.27, y: 0.2, w: 0.45, h: 0.38 }} zoomAt={[49.1, 50.1]} highlights={[
        { x: 0.306, y: 0.389, w: 0.09, h: 0.02, at: 49.7, dur: 0.4 },
        { x: 0.323, y: 0.311, w: 0.275, h: 0.08, at: 50.4, dur: 0.5 },
      ]} />
      <PhotoPanel src={priceWasNow} aspect={736 / 981} left={140} top={400} width={800} height={920} t={T} opacity={p2} focus={{ x: 0.27, y: 0.14, w: 0.46, h: 0.46 }} zoomAt={[51.5, 52.4]} highlights={[
        { x: 0.405, y: 0.199, w: 0.17, h: 0.09, at: 51.9, dur: 0.5 },
        { x: 0.397, y: 0.471, w: 0.21, h: 0.09, at: 53.2, dur: 0.5 },
      ]} />
      <div style={{ position: "absolute", left: 700, top: 360, transform: `scale(${stamp}) rotate(10deg)`, opacity: stamp, filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.6))" }}><AnchorIcon size={230} /></div>
    </AbsoluteFill>
  );
};

// 8. The anchor was random, and it still worked
export const S8: React.FC = () => {
  const T = useT();
  const flick = T >= 56.4 && T < 61.8;
  const digits = flick ? rnd(Math.floor(T * 12)) : "86";
  const nothing = ramp(T, 61.8, 62.4);
  const a = ramp(T, 63.3, 63.9, 0, 1, POP);
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="A completely random anchor" from={56.3} to={63.1} size={92} />
      <Head title="It still worked" from={63.25} color={COLORS.gold} size={110} />
      <div style={{ position: "absolute", left: 540 - 330, top: 400 + (1 - ramp(T, 56.3, 57.0)) * 60, opacity: ramp(T, 56.3, 57.0) * (1 - 0.5 * nothing) }}>
        <IdCard digits={digits} faded={nothing > 0.5} width={660} glow={0} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 800, textAlign: "center", opacity: nothing * ramp(T, 63.1, 63.4, 1, 0) }}><Title text="It meant nothing." size={90} align="center" color={COLORS.grey} /></div>
      <GlassCard label="Highest numbers" index="$56" x={300} y={1100 + (1 - a) * 50} width={440} height={400} indexSize={120} labelSize={40} highlight opacity={a}><Keyboard width={230} /></GlassCard>
      <GlassCard label="Lowest numbers" index="$16" x={780} y={1100 + (1 - a) * 50} width={440} height={400} indexSize={120} labelSize={40} opacity={a}><Keyboard width={230} /></GlassCard>
    </AbsoluteFill>
  );
};

// 9. Close: first number you see, ask where it came from, end card
export const S9: React.FC = () => {
  const T = useT();
  const pa = ramp(T, 65.0, 65.5) * ramp(T, 67.9, 68.25, 1, 0);
  const pb = ramp(T, 68.1, 68.6) * ramp(T, 71.5, 71.85, 1, 0);
  const q = ramp(T, 69.84, 70.4, 0, 1, POP);
  const t1 = ramp(T, 71.9, 72.6);
  const t2 = ramp(T, 74.85, 75.5);
  const ghost = ramp(T, 71.9, 73.0, 0, 0.14);
  const fade = ramp(T, 77.2, 77.5);
  const endCard = ramp(T, 77.4, 77.9);
  return (
    <AbsoluteFill>
      <Backdrop />
      <Head title="The first number" from={65.0} to={68.0} color={COLORS.cream} />
      <Head title="One question" from={68.1} to={71.5} color={COLORS.gold} />
      <PhotoPanel src={priceLow} aspect={736 / 981} left={140} top={400} width={800} height={920} t={T} opacity={pa} focus={{ x: 0.12, y: 0.06, w: 0.76, h: 0.6 }} zoomAt={[65.1, 66.0]} highlights={[{ x: 0.29, y: 0.392, w: 0.41, h: 0.164, at: 66.1, dur: 0.6 }]} />
      <PhotoPanel src={menu} aspect={736 / 1041} left={190} top={400} width={700} height={920} t={T} opacity={pb} focus={{ x: 0.45, y: 0.5, w: 0.5, h: 0.3 }} zoomAt={[68.3, 69.3]} highlights={[{ x: 0.856, y: 0.557, w: 0.09, h: 0.023, at: 69.0, dur: 0.4 }]} />
      <div style={{ position: "absolute", left: 640, top: 330, fontFamily: display, fontSize: 320, lineHeight: 1, color: COLORS.gold, transform: `scale(${q})`, opacity: q * pb, textShadow: "0 0 60px rgba(201,162,75,0.6)" }}>?</div>
      <div style={{ position: "absolute", left: 80, top: 200, fontFamily: display, fontSize: 1500, lineHeight: 1, color: COLORS.gold, opacity: ghost }}>1</div>
      <div style={{ position: "absolute", left: 70, right: 70, top: 480, opacity: t1, transform: `translateY(${(1 - t1) * 24}px)` }}>
        <Title text="The first number isn't always the right one." size={112} />
      </div>
      <div style={{ position: "absolute", left: 70, right: 70, top: 960, opacity: t2, transform: `translateY(${(1 - t2) * 24}px)` }}>
        <Title text="It's just the one that got there first." size={96} color={COLORS.gold} />
      </div>
      <AbsoluteFill style={{ background: COLORS.charcoal, opacity: fade }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: endCard, transform: `scale(${0.96 + 0.04 * endCard})` }}>
        <div style={{ width: 420, height: 420, borderRadius: 90, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.6)", background: "#FFF6E6" }}>
          <img src={LOGO} style={{ width: 420, height: 420, display: "block" }} />
        </div>
        <div style={{ height: 50 }} />
        <Title text="AhadInsights" size={130} align="center" />
        <div style={{ height: 18 }} />
        <Subtitle text="The visible story is rarely the whole story." size={42} align="center" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
import LOGO from "../../../episodes/episode-002/assets/channel-logo.png";
