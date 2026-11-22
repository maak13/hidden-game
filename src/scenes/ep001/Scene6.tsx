import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";
import { Backdrop } from "../../components/diagrams/Backdrop";
import { CashRegister } from "../../components/diagrams/CashRegister";
import { CounterSurface, CounterFront } from "../../components/diagrams/CounterSurface";
import { Stamp } from "../../components/diagrams/Stamp";
import { Product, ShelfLabel } from "../../components/art/Products";
import { Person } from "../../components/art/People";
import { Subtitle } from "../../components/typography/Subtitle";
import { useT } from "../../components/transitions/Scene";
import { EASE, EASE_IO, POP, ramp } from "../../utils/timing";

// Scene 6 (1:28 to 1:35): a male cashier opens the register, then the story spreads like gossip, then the LEGEND stamp.
const SHIRTS = ["#3F6E8C", "#B5483A", "#5B8A5A", "#7A5C8E", "#D0A23C", "#2F7F7A"];
const SKINS = ["#D9A87C", "#B98560", "#F0C9A2", "#8D5A3B"];
const HAIRS = ["#2A1F1A", "#5B3A22", "#111", "#9A7B4F"];

const Bubble: React.FC<{ p: number }> = ({ p }) => (
  <div style={{ transform: `scale(${p})`, transformOrigin: "50% 100%", opacity: p }}>
    <div style={{ width: 118, height: 92, borderRadius: 24, background: "#F6EEDD", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}>
      <CashRegister drawer={1} width={84} />
      <div style={{ position: "absolute", bottom: -14, left: 46, width: 0, height: 0, borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderTop: "16px solid #F6EEDD" }} />
    </div>
  </div>
);

export const Scene6: React.FC = () => {
  const T = useT();
  const cashierIn = ramp(T, 88.35, 89.2) * ramp(T, 91.85, 92.25, 1, 0);
  const press = ramp(T, 89.7, 90.35, 0, 1, EASE_IO) * ramp(T, 90.9, 91.5, 1, 0.12);
  const drawer = ramp(T, 90.5, 91.0, 0, 1, POP);
  const crowdIn = ramp(T, 91.9, 92.4);
  const grey = ramp(T, 93.95, 94.6);
  const stamp = ramp(T, 93.85, 94.1, 0, 1, EASE);
  const hit = T >= 93.9;
  const shake = hit ? Math.max(0, 1 - (T - 93.9) * 6) * Math.sin(T * 120) * 10 : 0;
  const people = [...Array(12).keys()].map((i) => ({ i, row: i < 6 ? 0 : 1, col: i % 6 }));
  return (
    <AbsoluteFill>
      <Backdrop />
      {/* cashier behind the counter */}
      <div style={{ opacity: cashierIn }}>
        <CounterSurface />
        <div style={{ position: "absolute", left: 760 - 178, top: 330 }}>
          <Person height={640} shirt="#B5483A" apron cap lArm={6} rArm={-8 - 70 * press} />
        </div>
        <div style={{ position: "absolute", left: 960, top: 330 }}>
          <CashRegister drawer={drawer} width={640} />
        </div>
        <div style={{ position: "absolute", left: 220, top: 760 - 232, opacity: ramp(T, 88.9, 89.4), transform: `translateY(${(1 - ramp(T, 88.9, 89.5, 0, 1, POP)) * -60}px)` }}>
          <Product kind="box" color="#3F6E8C" width={150} />
          <div style={{ position: "absolute", left: -10, top: 160 }}><ShelfLabel price="$0.99" width={170} /></div>
        </div>
        <CounterFront />
      </div>
      {/* the story spreads */}
      <div style={{ opacity: crowdIn, filter: `grayscale(${grey})`, position: "absolute", inset: 0 }}>
        <div style={{ opacity: 1 - 0.5 * grey, position: "absolute", inset: 0 }}>
          {people.map(({ i, row, col }) => {
            const x = 230 + col * 290 + (row ? 90 : 0);
            const h = row ? 400 : 330;
            const bottom = row ? 1040 : 720;
            const p = ramp(T, 92.0 + i * 0.1, 92.45 + i * 0.1, 0, 1, POP);
            return (
              <React.Fragment key={i}>
                <div style={{ position: "absolute", left: x - (h * 200) / 720, top: bottom - h, zIndex: row, opacity: ramp(T, 91.9 + i * 0.02, 92.3 + i * 0.02) }}>
                  <Person height={h} shirt={SHIRTS[i % SHIRTS.length]} skin={SKINS[i % SKINS.length]} hair={HAIRS[(i * 3) % HAIRS.length]} lArm={8} rArm={-8} />
                </div>
                <div style={{ position: "absolute", left: x - 59, top: bottom - h - 112, zIndex: 5 }}>
                  <Bubble p={p} />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 380, display: "flex", justifyContent: "center", opacity: stamp, transform: `scale(${1 + 1.4 * (1 - stamp)}) translateX(${shake}px)` }}>
        <Stamp text="Legend" />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 900, textAlign: "center", opacity: ramp(T, 94.4, 95.0) }}>
        <span style={{ display: "inline-block", padding: "14px 40px", borderRadius: 40, background: "rgba(28,29,32,0.85)", border: "1.5px solid rgba(201,162,75,0.5)" }}><Subtitle text="Often repeated, not documented" size={44} align="center" color={COLORS.cream} /></span>
      </div>
    </AbsoluteFill>
  );
};
