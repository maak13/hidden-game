import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { COLORS } from "../config/brand";
import { Title } from "../components/typography/Title";
import { Subtitle } from "../components/typography/Subtitle";
import { GlassCard } from "../components/diagrams/GlassCard";

// Sample scene B: "two-layer reveal" with vertical glass cards (plan section 6, signature device 2).
const STEPS = [
  { label: "Value signal", x: 300 },
  { label: "Trust", x: 740 },
  { label: "Repeat visits", x: 1180 },
  { label: "Membership", x: 1620 },
];
const Y = 690;

export const SampleSurfaceToSystem: React.FC = () => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.22, 1, 0.36, 1);
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const titleOp = interpolate(frame, [0, 20], [0, 1], clamp);
  const subOp = interpolate(frame, [14, 36], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ background: COLORS.charcoal }}>
      {/* light behind the glass so the blur reads */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle 420px at 300px 560px, rgba(201,162,75,0.35), transparent 70%), radial-gradient(circle 520px at 1250px 880px, rgba(138,147,160,0.30), transparent 70%), radial-gradient(circle 380px at 1650px 520px, rgba(201,162,75,0.30), transparent 70%)`,
        }}
      />
      <div style={{ position: "absolute", top: 90, left: 140 }}>
        <Title text="A price is a promise." size={128} opacity={titleOp} />
        <div style={{ height: 18 }} />
        <Subtitle text="What the system sees beneath the surface" opacity={subOp} />
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {STEPS.slice(0, -1).map((s, i) => {
          const p = interpolate(frame, [58 + i * 26, 80 + i * 26], [0, 1], { ...clamp, easing: ease });
          const cx = (s.x + STEPS[i + 1].x) / 2;
          return <polygon key={s.label} points={`${cx - 12},${Y - 22} ${cx + 16},${Y} ${cx - 12},${Y + 22}`} fill={COLORS.gold} opacity={p} />;
        })}
      </svg>
      {STEPS.map((s, i) => {
        const start = 36 + i * 26;
        const p = interpolate(frame, [start, start + 24], [0, 1], { ...clamp, easing: ease });
        return <GlassCard key={s.label} label={s.label} index={i + 1} x={s.x} y={Y + (1 - p) * 40} opacity={p} scale={0.94 + 0.06 * p} highlight={i === STEPS.length - 1} />;
      })}
    </AbsoluteFill>
  );
};
