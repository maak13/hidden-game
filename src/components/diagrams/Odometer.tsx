import React from "react";
import { COLORS } from "../../config/brand";
import { display } from "../../config/fonts";

// Mechanical-style odometer: each digit rolls only when the digit below it wraps 9 -> 0.
export const Odometer: React.FC<{ value: number; digits?: number; digitHeight?: number; highlightFirst?: number }> = ({
  value,
  digits = 5,
  digitHeight = 150,
  highlightFirst = 0,
}) => {
  const cols = [];
  for (let k = digits - 1; k >= 0; k--) {
    const m = Math.pow(10, k);
    // digit k only rolls during the final unit before every lower digit wraps (like a mechanical odometer)
    const roll = k === 0 ? 0 : Math.max(0, (value % m) - (m - 1));
    const pos = (k === 0 ? value : Math.floor(value / m) + roll) % 10;
    const idx = digits - 1 - k;
    const hot = idx < highlightFirst;
    cols.push(
      <div
        key={k}
        style={{
          width: digitHeight * 0.66,
          height: digitHeight,
          overflow: "hidden",
          borderRadius: 14,
          background: "rgba(0,0,0,0.35)",
          border: `1.5px solid ${hot ? COLORS.gold : "rgba(241,232,214,0.25)"}`,
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: 0, right: 0, transform: `translateY(${-pos * digitHeight}px)` }}>
          {[...Array(11).keys()].map((n) => (
            <div key={n} style={{ height: digitHeight, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontSize: digitHeight * 0.78, color: hot ? COLORS.gold : COLORS.cream }}>
              {n % 10}
            </div>
          ))}
        </div>
      </div>,
    );
  }
  return <div style={{ display: "flex", gap: 10 }}>{cols}</div>;
};
