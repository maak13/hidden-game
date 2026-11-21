import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { COLORS } from "../config/brand";
import { Eyebrow } from "../components/typography/Eyebrow";
import { Headline } from "../components/typography/Headline";
import { FlowNode } from "../components/diagrams/FlowNode";

// Sample scene B: "two-layer reveal" diagram (plan section 6, signature device 2).
const NODES = [
  { label: "Value signal", x: 280 },
  { label: "Trust", x: 750 },
  { label: "Repeat visits", x: 1220 },
  { label: "Membership", x: 1690 },
];
const Y = 600;

export const SampleSurfaceToSystem: React.FC = () => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.22, 1, 0.36, 1);
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

  const titleOp = interpolate(frame, [0, 20], [0, 1], clamp);
  const gridOp = interpolate(frame, [10, 40], [0, 0.5], clamp);

  return (
    <AbsoluteFill style={{ background: COLORS.charcoal }}>
      <AbsoluteFill
        style={{
          opacity: gridOp,
          backgroundImage: `linear-gradient(${COLORS.greyDark} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.greyDark} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 55%, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 55%, black, transparent 80%)",
        }}
      />
      <div style={{ position: "absolute", top: 130, left: 160, opacity: titleOp }}>
        <Eyebrow text="What the system sees" />
        <div style={{ height: 22 }} />
        <Headline text="A price is a promise." size={96} />
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {NODES.slice(0, -1).map((n, i) => {
          const start = 45 + i * 28;
          const p = interpolate(frame, [start, start + 24], [0, 1], { ...clamp, easing: ease });
          const x1 = n.x + 190;
          const x2 = NODES[i + 1].x - 190;
          return (
            <g key={n.label}>
              <line x1={x1} y1={Y} x2={x2} y2={Y} stroke={COLORS.gold} strokeWidth={3} strokeDasharray={x2 - x1} strokeDashoffset={(x2 - x1) * (1 - p)} />
              <polygon points={`${x2},${Y} ${x2 - 16},${Y - 10} ${x2 - 16},${Y + 10}`} fill={COLORS.gold} opacity={p} />
            </g>
          );
        })}
      </svg>
      {NODES.map((n, i) => {
        const start = 36 + i * 28;
        const p = interpolate(frame, [start, start + 22], [0, 1], { ...clamp, easing: ease });
        return <FlowNode key={n.label} label={n.label} x={n.x} y={Y + (1 - p) * 30} opacity={p} scale={0.92 + 0.08 * p} highlight={i === NODES.length - 1} />;
      })}
    </AbsoluteFill>
  );
};
