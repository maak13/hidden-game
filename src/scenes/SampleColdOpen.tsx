import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { COLORS } from "../config/brand";
import { display } from "../config/fonts";
import { Subtitle } from "../components/typography/Subtitle";
import { HotDog } from "../components/diagrams/HotDog";

// Sample scene A: "object cold open" (plan section 6, signature device 1).
export const SampleColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const ease = Easing.bezier(0.22, 1, 0.36, 1);

  const pull = interpolate(frame, [0, durationInFrames], [1.28, 1], { easing: ease, extrapolateRight: "clamp" });
  const dogIn = interpolate(frame, [0, 22], [-60, 0], { easing: ease, extrapolateRight: "clamp" });
  const dogOp = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: "clamp" });
  const priceOp = interpolate(frame, [40, 62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const priceY = interpolate(frame, [40, 70], [24, 0], { easing: ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const eyeOp = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.charcoalDeep }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 60% 55% at 50% 52%, rgba(201,162,75,0.22), transparent 70%), radial-gradient(ellipse 120% 90% at 50% 50%, ${COLORS.charcoal}, ${COLORS.charcoalDeep} 80%)`,
        }}
      />
      <AbsoluteFill style={{ transform: `scale(${pull})`, transformOrigin: "50% 62%" }}>
        {/* stainless counter */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 700,
            bottom: 0,
            background: `linear-gradient(180deg, #6C737D 0%, ${COLORS.greyDark} 18%, ${COLORS.charcoal} 100%)`,
            borderTop: `2px solid ${COLORS.grey}`,
          }}
        />
        <div style={{ position: "absolute", left: 0, right: 0, top: 706, height: 2, background: "rgba(255,255,255,0.35)" }} />
        {/* object */}
        <div
          style={{
            position: "absolute",
            left: 960 - 280,
            top: 700 - 190 + dogIn,
            opacity: dogOp,
            filter: "drop-shadow(0 30px 28px rgba(0,0,0,0.55))",
          }}
        >
          <HotDog width={560} />
        </div>
        {/* reflection */}
        <div
          style={{
            position: "absolute",
            left: 960 - 280,
            top: 722,
            opacity: dogOp * 0.18,
            transform: "scaleY(-0.5)",
            transformOrigin: "top",
            maskImage: "linear-gradient(to bottom, black, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 80%)",
          }}
        >
          <HotDog width={560} />
        </div>
      </AbsoluteFill>
      {/* price */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: priceOp,
          transform: `translateY(${priceY}px)`,
        }}
      >
        <div style={{ fontFamily: display, fontSize: 230, color: COLORS.cream, letterSpacing: -3 }}>$1.50</div>
      </div>
      <div style={{ position: "absolute", bottom: 90, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Subtitle text="The visible story is rarely the whole story." size={44} color={COLORS.cream} opacity={eyeOp * 0.85} align="center" />
      </div>
    </AbsoluteFill>
  );
};
