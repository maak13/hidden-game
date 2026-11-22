import React from "react";
import { COLORS } from "../../config/brand";
import { display } from "../../config/fonts";

export type ProductKind = "box" | "bottle" | "can" | "jar" | "bag" | "carton";
export const PRODUCT_COLORS = ["#B5483A", "#3F6E8C", "#5B8A5A", "#D0A23C", "#7A5C8E", "#C9B58A", "#2F7F7A", "#C46A2F"];
const KINDS: ProductKind[] = ["box", "bottle", "can", "jar", "bag", "carton"];
export const kindAt = (i: number): ProductKind => KINDS[(i * 5 + 1) % KINDS.length];
export const colorAt = (i: number) => PRODUCT_COLORS[(i * 3 + 2) % PRODUCT_COLORS.length];

// Flat grocery product, drawn in a 100 x 150 box. The cream label panel is where a brand would sit.
export const Product: React.FC<{ kind?: ProductKind; color?: string; width?: number }> = ({ kind = "box", color = "#B5483A", width = 100 }) => {
  const shade = "rgba(0,0,0,0.22)";
  const shine = "rgba(255,255,255,0.22)";
  const label = <rect x={20} y={62} width={60} height={40} rx={6} fill="#F1E8D6" opacity={0.92} />;
  const stripe = <rect x={28} y={72} width={44} height={6} rx={3} fill={color} opacity={0.75} />;
  return (
    <svg width={width} height={width * 1.5} viewBox="0 0 100 150" style={{ overflow: "visible", display: "block" }}>
      {kind === "box" && (
        <>
          <rect x={10} y={10} width={80} height={138} rx={6} fill={color} />
          <rect x={10} y={10} width={80} height={14} rx={6} fill={shade} />
          <rect x={10} y={10} width={14} height={138} rx={6} fill={shine} />
          {label}
          {stripe}
        </>
      )}
      {kind === "bottle" && (
        <>
          <rect x={38} y={2} width={24} height={16} rx={4} fill="#E6DAC0" />
          <path d="M38 18 H62 V38 Q82 48 82 70 V140 Q82 148 74 148 H26 Q18 148 18 140 V70 Q18 48 38 38 Z" fill={color} />
          <path d="M26 70 Q26 54 40 46 V140 H26 Z" fill={shine} />
          {label}
          {stripe}
        </>
      )}
      {kind === "can" && (
        <>
          <rect x={16} y={14} width={68} height={130} rx={8} fill={color} />
          <ellipse cx={50} cy={14} rx={34} ry={7} fill="#C9CDD3" />
          <rect x={16} y={136} width={68} height={10} rx={5} fill={shade} />
          <rect x={16} y={14} width={12} height={130} rx={6} fill={shine} />
          {label}
          {stripe}
        </>
      )}
      {kind === "jar" && (
        <>
          <rect x={14} y={14} width={72} height={22} rx={6} fill="#E6DAC0" />
          <rect x={12} y={34} width={76} height={114} rx={16} fill={color} />
          <rect x={20} y={40} width={12} height={100} rx={6} fill={shine} />
          {label}
          {stripe}
        </>
      )}
      {kind === "bag" && (
        <>
          <path d="M14 18 L30 8 L40 18 L50 8 L60 18 L70 8 L86 18 L92 146 Q92 150 86 150 H14 Q8 150 8 146 Z" fill={color} />
          <path d="M14 18 H86 L87 30 H13 Z" fill={shade} />
          <rect x={8} y={18} width={14} height={130} fill={shine} />
          {label}
          {stripe}
        </>
      )}
      {kind === "carton" && (
        <>
          <path d="M16 36 L50 4 L84 36 V146 Q84 150 80 150 H20 Q16 150 16 146 Z" fill={color} />
          <path d="M16 36 L50 4 L84 36 Z" fill={shade} />
          <rect x={16} y={36} width={14} height={112} fill={shine} />
          {label}
          {stripe}
        </>
      )}
    </svg>
  );
};

// Shelf-edge price label. Shows how a price really sits on a retail shelf.
export const ShelfLabel: React.FC<{ price: string; width?: number; glow?: number; dim?: number; fontSize?: number }> = ({ price, width = 150, glow = 0, dim = 1, fontSize }) => (
  <div
    style={{
      width,
      height: width * 0.46,
      borderRadius: 6,
      background: glow > 0.02 ? `linear-gradient(180deg, #E8C569, ${COLORS.gold})` : "linear-gradient(180deg, #F6EEDD, #E2D5B8)",
      boxShadow: glow > 0.02 ? `0 0 ${50 * glow}px ${10 * glow}px rgba(201,162,75,${0.75 * glow}), 0 4px 6px rgba(0,0,0,0.4)` : "0 4px 6px rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: display,
      fontSize: fontSize ?? width * 0.3,
      color: COLORS.charcoal,
      opacity: dim,
      whiteSpace: "nowrap",
      borderBottom: "3px solid rgba(0,0,0,0.25)",
    }}
  >
    {price}
  </div>
);

/** A retail shelf unit: boards, products standing on them and a price label on each board edge. */
export const ShelfUnit: React.FC<{
  x: number;
  y: number;
  width: number;
  rows: number;
  cols: number;
  rowHeight: number;
  prices: string[];
  appear?: (i: number) => number;
  glow?: (i: number) => number;
  dim?: (i: number) => number;
}> = ({ x, y, width, rows, cols, rowHeight, prices, appear = () => 1, glow = () => 0, dim = () => 1 }) => {
  const cw = width / cols;
  const pw = Math.min(cw * 0.56, rowHeight * 0.42);
  const labelW = Math.min(cw * 0.78, 190);
  return (
    <div style={{ position: "absolute", left: x, top: y, width, height: rows * rowHeight }}>
      {/* back panel */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: "linear-gradient(180deg, #2B2E35, #202228)", border: `2px solid ${COLORS.greyDark}` }} />
      {Array.from({ length: rows }, (_, r) => {
        const boardY = (r + 1) * rowHeight - labelW * 0.46 - 30;
        return (
          <React.Fragment key={r}>
            <div style={{ position: "absolute", left: 0, right: 0, top: boardY, height: 20, background: "linear-gradient(180deg, #8A93A0, #4A4F58)", borderRadius: 4, boxShadow: "0 8px 12px rgba(0,0,0,0.45)" }} />
            {Array.from({ length: cols }, (_, c) => {
              const i = r * cols + c;
              const a = appear(i);
              const cx = c * cw + cw / 2;
              return (
                <React.Fragment key={c}>
                  <div style={{ position: "absolute", left: cx - pw / 2, top: boardY - pw * 1.5 + 4 - (1 - a) * 40, opacity: a * dim(i), transform: `scale(${0.85 + 0.15 * a})`, transformOrigin: "50% 100%" }}>
                    <Product kind={kindAt(i)} color={colorAt(i)} width={pw} />
                  </div>
                  <div style={{ position: "absolute", left: cx - labelW / 2, top: boardY + 22, opacity: a, transform: `scale(${1 + 0.12 * glow(i)})` }}>
                    <ShelfLabel price={prices[i] ?? ""} width={labelW} glow={glow(i)} dim={dim(i)} />
                  </div>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};
