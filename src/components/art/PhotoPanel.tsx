import React from "react";
import { Img } from "remotion";
import { COLORS } from "../../config/brand";
import { ramp, EASE_IO } from "../../utils/timing";

export type Hl = { x: number; y: number; w: number; h: number; at: number; dur?: number };

/**
 * A real screenshot or page in a rounded frame. `zoom` eases in to the normalised focus rectangle; highlights
 * (normalised to the image) wipe in like a marker pen starting at time `at`.
 */
export const PhotoPanel: React.FC<{
  src: string;
  aspect: number; // image width / height
  width: number; // frame width
  height: number; // frame height
  t: number; // absolute time (s)
  focus?: { x: number; y: number; w: number; h: number };
  zoomAt?: [number, number];
  highlights?: Hl[];
  left: number;
  top: number;
  opacity?: number;
  rotate?: number;
}> = ({ src, aspect, width, height, t, focus, zoomAt = [0, 1], highlights = [], left, top, opacity = 1, rotate = 0 }) => {
  // base size: image covers the frame width (contain by width) unless it is taller than the frame
  const baseW = Math.min(width, height * aspect);
  const baseH = baseW / aspect;
  const z = focus ? ramp(t, zoomAt[0], zoomAt[1], 0, 1, EASE_IO) : 0;
  const targetScale = focus ? Math.min(width / (focus.w * baseW), height / (focus.h * baseH)) : 1;
  const s = 1 + (targetScale - 1) * z;
  const cx = focus ? (focus.x + focus.w / 2) * baseW : baseW / 2;
  const cy = focus ? (focus.y + focus.h / 2) * baseH : baseH / 2;
  // start centred, move toward the focus centre
  const sx = baseW / 2 + (cx - baseW / 2) * z;
  const sy = baseH / 2 + (cy - baseH / 2) * z;
  const tx = width / 2 - sx * s;
  const ty = height / 2 - sy * s;
  return (
    <div style={{ position: "absolute", left, top, width, height, opacity, transform: `rotate(${rotate}deg)`, borderRadius: 22, overflow: "hidden", background: "#fff", boxShadow: "0 40px 80px rgba(0,0,0,0.55), 0 0 0 2px rgba(241,232,214,0.25)" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: baseW, height: baseH, transform: `translate(${tx}px, ${ty}px) scale(${s})`, transformOrigin: "0 0" }}>
        <Img src={src} style={{ width: baseW, height: baseH, display: "block" }} />
        {highlights.map((h, i) => {
          const p = ramp(t, h.at, h.at + (h.dur ?? 0.7));
          return (
            <div key={i} style={{ position: "absolute", left: h.x * baseW - 4, top: h.y * baseH - 2, width: (h.w * baseW + 8) * p, height: h.h * baseH + 4, background: "rgba(201,162,75,0.42)", borderBottom: `4px solid ${COLORS.gold}`, borderRadius: 4, mixBlendMode: "multiply" }} />
          );
        })}
      </div>
    </div>
  );
};
