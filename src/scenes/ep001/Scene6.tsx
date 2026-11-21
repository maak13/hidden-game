import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../config/brand";
import { display } from "../../config/fonts";
import { Backdrop } from "../../components/diagrams/Backdrop";
import { CashRegister } from "../../components/diagrams/CashRegister";
import { Stamp } from "../../components/diagrams/Stamp";
import { Subtitle } from "../../components/typography/Subtitle";
import { useT } from "../../components/transitions/Scene";
import { EASE, POP, ramp } from "../../utils/timing";

// Scene 6 (1:28 to 1:35): the cash-register legend, labelled as a legend.
export const Scene6: React.FC = () => {
  const T = useT();
  const slide = ramp(T, 88.4, 89.4);
  const drawer = ramp(T, 90.5, 91.0, 0, 1, POP);
  const quote = ramp(T, 92.0, 92.7);
  const stamp = ramp(T, 93.85, 94.1, 0, 1, EASE);
  const hit = T >= 93.9;
  const shake = hit ? Math.max(0, 1 - (T - 93.9) * 6) * Math.sin(T * 120) * 10 : 0;
  const grey = ramp(T, 93.95, 94.6);

  return (
    <AbsoluteFill>
      <Backdrop />
      <div style={{ position: "absolute", left: 960 - 380 + shake, top: 330 + (1 - slide) * 400, opacity: slide * (1 - 0.55 * grey), filter: `grayscale(${grey})`, transform: `rotate(${(1 - slide) * -4}deg)` }}>
        <CashRegister drawer={drawer} />
      </div>
      <div style={{ position: "absolute", left: 960 + 280, top: 90, fontFamily: display, fontSize: 420, color: COLORS.gold, opacity: quote * (1 - grey) * 0.9, transform: `translateY(${(1 - quote) * 30}px)` }}>“</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center", opacity: stamp, transform: `scale(${1 + 1.4 * (1 - stamp)}) translateX(${shake}px)` }}>
        <Stamp text="Legend" />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 900, textAlign: "center", opacity: ramp(T, 94.4, 95.0) }}>
        <Subtitle text="Often repeated, not documented" size={44} align="center" color={COLORS.cream} />
      </div>
    </AbsoluteFill>
  );
};
