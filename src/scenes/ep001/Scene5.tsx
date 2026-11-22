import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";
import { display } from "../../config/fonts";
import { Backdrop } from "../../components/diagrams/Backdrop";
import { GlassBar } from "../../components/diagrams/GlassBar";
import { Product, ShelfUnit } from "../../components/art/Products";
import { Person } from "../../components/art/People";
import { StoreFront, BoxWall } from "../../components/art/Places";
import { Title } from "../../components/typography/Title";
import { Subtitle } from "../../components/typography/Subtitle";
import { useT } from "../../components/transitions/Scene";
import { EASE_IO, POP, ramp } from "../../utils/timing";

// Scene 5 (1:10 to 1:28): a storefront, a field experiment you can watch, a warehouse of 1,710 products, then shoppers vs stores.
const SHIRTS = ["#3F6E8C", "#B5483A", "#5B8A5A", "#7A5C8E", "#D0A23C", "#2F7F7A"];
const SKINS = ["#D9A87C", "#B98560", "#F0C9A2", "#8D5A3B"];
const HAIRS = ["#2A1F1A", "#5B3A22", "#111", "#9A7B4F"];

// Three rounds of four shoppers each; one goes to the plain-price shelf, three go to the nine-ending shelf.
const SHOPPERS = [0, 1, 2].flatMap((round) => [0, 1, 2, 3].map((k) => ({ round, k, side: k === 0 ? "L" : "R", id: round * 4 + k })));
const ROUND_T = [73.5, 74.95, 76.4];

export const Scene5: React.FC = () => {
  const T = useT();
  // storefront
  const storeIn = ramp(T, 70.2, 70.9);
  const storeOut = ramp(T, 72.0, 72.5, 1, 0);
  const walkP = ramp(T, 70.4, 71.8, 0, 1, EASE_IO);
  // field experiment
  const fIn = ramp(T, 72.4, 73.0) * ramp(T, 77.9, 78.3, 1, 0);
  const sold = (side: "L" | "R") => SHOPPERS.filter((s) => s.side === side && T >= ROUND_T[s.round] + s.k * 0.18 + 0.95).length;
  const newBadge = ramp(T, 75.6, 76.1, 0, 1, POP);
  // warehouse
  const wIn = ramp(T, 78.0, 78.5);
  const lit = Math.round(ramp(T, 78.4, 80.7, 0, 1710, EASE_IO));
  const wDim = ramp(T, 80.7, 81.3, 1, 0.22);
  const center = ramp(T, 80.5, 81.0, 1, 0);
  const top = ramp(T, 81.0, 81.6);
  const marker = ramp(T, 80.9, 81.5);
  const wOut = 1;
  return (
    <AbsoluteFill>
      <Backdrop />
      {/* storefront */}
      <div style={{ opacity: storeIn * storeOut }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 40, textAlign: "center", transform: `translateY(${(1 - ramp(T, 70.2, 71.0)) * 40}px)` }}>
          <Title text="Retail" size={170} align="center" />
        </div>
        <div style={{ position: "absolute", left: 410, top: 250 }}>
          <StoreFront width={1100} open={ramp(T, 71.4, 71.9)} />
        </div>
        <div style={{ position: "absolute", left: 1750 - 480 * walkP - 105, top: 640, opacity: 1 - ramp(T, 71.7, 72.0), transform: `translateY(${Math.sin(T * 14) * 5}px)` }}>
          <Person height={320} shirt="#D0A23C" skin="#B98560" legSwing={Math.sin(T * 14) * 14} lArm={Math.sin(T * 14) * 14} rArm={-Math.sin(T * 14) * 14} />
        </div>
      </div>
      {/* field experiment */}
      <div style={{ opacity: fIn }}>
        <div style={{ position: "absolute", left: 120, top: 50 }}>
          <Title text="Field experiment" size={96} />
        </div>
        <ShelfUnit x={150} y={230} width={760} rows={1} cols={3} rowHeight={400} prices={["$10.00", "$10.00", "$10.00"]} appear={(i) => ramp(T, 72.5 + i * 0.12, 73.0 + i * 0.12, 0, 1, POP)} />
        <ShelfUnit x={1010} y={230} width={760} rows={1} cols={3} rowHeight={400} prices={["$9.99", "$9.99", "$9.99"]} appear={(i) => ramp(T, 72.6 + i * 0.12, 73.1 + i * 0.12, 0, 1, POP)} glow={() => ramp(T, 73.2, 73.8) * 0.6} />
        {/* NEW badges */}
        <div style={{ position: "absolute", left: 1010 + 640, top: 200, transform: `scale(${newBadge}) rotate(8deg)`, padding: "6px 22px", borderRadius: 30, background: COLORS.gold, color: COLORS.charcoal, fontFamily: display, fontSize: 52, boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}>NEW</div>
        <div style={{ position: "absolute", left: 150 + 640, top: 200, transform: `scale(${newBadge}) rotate(8deg)`, padding: "6px 22px", borderRadius: 30, background: COLORS.cream, color: COLORS.charcoal, fontFamily: display, fontSize: 52, boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}>NEW</div>
        {/* sold tallies */}
        {(["L", "R"] as const).map((side) => (
          <div key={side} style={{ position: "absolute", left: side === "L" ? 150 : 1010, top: 650, width: 760, display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[...Array(sold(side)).keys()].map((n) => (
              <div key={n} style={{ transform: "scale(1)" }}>
                <Product kind="box" color={side === "R" ? COLORS.gold : COLORS.grey} width={54} />
              </div>
            ))}
          </div>
        ))}
        <div style={{ position: "absolute", left: 150, top: 160, width: 760, textAlign: "center" }}><Subtitle text="No nine ending" size={34} align="center" /></div>
        <div style={{ position: "absolute", left: 1010, top: 160, width: 760, textAlign: "center" }}><Subtitle text="Nine ending" size={34} align="center" color={COLORS.gold} /></div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1042, textAlign: "center" }}><Subtitle text="Illustration of Anderson & Simester, 2003" size={26} align="center" /></div>
        {/* shoppers */}
        {SHOPPERS.map((s) => {
          const t0 = ROUND_T[s.round] + s.k * 0.18;
          const p = ramp(T, t0, t0 + 0.9, 0, 1, EASE_IO);
          const sx = 960 + (s.k - 1.5) * 70;
          const ex = s.side === "L" ? 530 + (s.id % 3) * 40 - 40 : 1390 + ((s.id % 3) - 1) * 80;
          const x = sx + (ex - sx) * p;
          const vis = T >= t0 && T < t0 + 1.0 ? 1 : 0;
          const wob = Math.sin(T * 16 + s.id) * 6;
          return (
            <div key={s.id} style={{ position: "absolute", left: x - 85, top: 740 - wob * 0.4, opacity: vis * ramp(T, t0, t0 + 0.15) * (1 - ramp(T, t0 + 0.85, t0 + 1.0)) }}>
              <Person height={300} shirt={SHIRTS[s.id % SHIRTS.length]} skin={SKINS[s.id % SKINS.length]} hair={HAIRS[s.id % HAIRS.length]} legSwing={wob * 2} lArm={wob} rArm={-wob} />
            </div>
          );
        })}
      </div>
      {/* warehouse of products */}
      <div style={{ opacity: wIn }}>
        <div style={{ position: "absolute", left: 48, top: 60, filter: `brightness(${0.4 + 0.6 * wDim / 1}) `, opacity: wDim, transform: `scale(${1 + 0.05 * ramp(T, 78, 84, 0, 1, EASE_IO)})`, transformOrigin: "50% 50%" }}>
          <BoxWall lit={lit} width={1824} />
        </div>
        <div style={{ position: "absolute", left: 960 - 520, top: 330, width: 1040, height: 330, borderRadius: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg, rgba(28,29,32,0.82), rgba(28,29,32,0.6))", border: "1.5px solid rgba(201,162,75,0.6)", backdropFilter: "blur(20px)", opacity: center, boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
          <div style={{ fontFamily: display, fontSize: 150, color: COLORS.gold, lineHeight: 1 }}>{lit.toLocaleString("en-US")}</div>
          <div style={{ fontFamily: display, fontSize: 70, color: COLORS.cream }}>products</div>
          <div style={{ opacity: ramp(T, 79.6, 80.2) }}><Subtitle text="in 248 stores of one US retailer" size={38} align="center" /></div>
        </div>
      </div>
      {/* shoppers vs stores */}
      <div style={{ opacity: top }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 50, textAlign: "center" }}>
          <Title text="1,710 products" size={96} align="center" />
          <Subtitle text="in 248 stores of one US retailer" size={34} align="center" />
        </div>
      </div>
      <div style={{ opacity: ramp(T, 80.8, 81.2) }}>
        <GlassBar x={760} baseY={930} width={300} height={560} grow={ramp(T, 81.4, 84.3, 0, 1, EASE_IO)} gold caption="How shoppers reacted" />
        <GlassBar x={1160} baseY={930} width={300} height={72} grow={ramp(T, 85.3, 86.5)} caption="How stores priced" />
        <div style={{ position: "absolute", left: 760 - 150, width: 300, textAlign: "center", top: 930 - 560 * ramp(T, 81.4, 84.3, 0, 1, EASE_IO) - 100, fontFamily: display, fontSize: 84, color: COLORS.gold, opacity: ramp(T, 83.2, 83.9) }}>15–25¢</div>
        <div style={{ position: "absolute", left: 1160 - 150, width: 300, textAlign: "center", top: 930 - 72 * ramp(T, 85.3, 86.5) - 100, fontFamily: display, fontSize: 84, color: COLORS.cream, opacity: ramp(T, 86.0, 86.7) }}>2–3¢</div>
        <div style={{ position: "absolute", left: 560, width: 800, top: 906, height: 0, borderTop: `3px dashed ${COLORS.cream}`, opacity: 0.6 * marker }} />
        <div style={{ position: "absolute", left: 1385, top: 884, fontFamily: display, fontSize: 44, color: COLORS.cream, opacity: marker }}>1¢</div>
      </div>
    </AbsoluteFill>
  );
};
