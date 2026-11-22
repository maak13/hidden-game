import React from "react";

export type CarKind = "sedan" | "suv" | "hatch";

// Generic flat cars (no real brand marks). Side view in a 400 x 180 box.
export const Car: React.FC<{ kind: CarKind; color: string; width?: number }> = ({ kind, color, width = 400 }) => {
  const glass = "#BFD3E0";
  const body =
    kind === "sedan"
      ? "M10 120 L14 96 Q18 86 40 84 L102 78 Q128 44 170 42 H236 Q268 44 292 76 L360 84 Q386 88 390 106 L392 122 Q392 130 384 130 H16 Q10 130 10 120 Z"
      : kind === "suv"
        ? "M10 122 V84 Q10 70 30 68 L72 64 L92 22 Q96 14 108 14 H316 Q328 14 334 24 L350 62 L372 68 Q392 72 392 94 V122 Q392 130 384 130 H18 Q10 130 10 122 Z"
        : "M10 122 V100 Q12 90 34 86 L84 80 Q112 44 150 42 H248 Q282 42 292 60 L306 86 Q330 88 352 92 Q366 96 366 110 V122 Q366 130 358 130 H18 Q10 130 10 122 Z";
  const wins =
    kind === "sedan"
      ? ["M112 78 Q132 52 172 50 H232 Q256 52 274 76 Z"]
      : kind === "suv"
        ? ["M102 60 L112 26 H200 V60 Z", "M208 26 H312 L330 60 H208 Z"]
        : ["M98 78 Q120 52 156 50 H206 V78 Z", "M214 50 H246 Q270 50 282 66 L290 78 H214 Z"];
  const wr = kind === "suv" ? 34 : kind === "hatch" ? 27 : 30;
  return (
    <svg width={width} height={width * 0.45} viewBox="0 0 400 180" style={{ overflow: "visible", display: "block" }}>
      <ellipse cx={200} cy={158} rx={190} ry={10} fill="rgba(0,0,0,0.35)" />
      <path d={body} fill={color} />
      {wins.map((w) => (
        <path key={w} d={w} fill={glass} opacity={0.92} />
      ))}
      {kind === "suv" && <rect x={110} y={6} width={200} height={8} rx={4} fill="#2A2D33" />}
      <path d={body} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth={2} />
      <rect x={14} y={104} width={26} height={12} rx={4} fill="#F6E7A9" />
      <rect x={kind === "hatch" ? 344 : 366} y={100} width={22} height={12} rx={4} fill="#D86A5A" />
      <rect x={14} y={122} width={kind === "hatch" ? 348 : 372} height={8} fill="rgba(0,0,0,0.3)" />
      {(kind === "hatch" ? [90, 292] : [96, 306]).map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={132} r={wr} fill="#17181B" />
          <circle cx={cx} cy={132} r={wr / 2} fill="#8A93A0" />
          <circle cx={cx} cy={132} r={5} fill="#3A3F47" />
        </g>
      ))}
    </svg>
  );
};
