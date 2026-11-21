import React from "react";
import { Composition } from "remotion";
import { VIDEO } from "./config/brand";
import { SampleScenes } from "./compositions/SampleScenes";
import { EP001_DURATION, Episode001 } from "./compositions/Episode001";

// Each episode registers its composition here.
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Episode001" component={Episode001} durationInFrames={EP001_DURATION} fps={VIDEO.fps} {...VIDEO.horizontal} />
    <SampleScenes />
  </>
);
