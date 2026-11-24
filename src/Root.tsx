import React from "react";
import { Composition } from "remotion";
import { VIDEO } from "./config/brand";
import { SampleScenes } from "./compositions/SampleScenes";
import { Episode002, EP002_DURATION } from "./compositions/Episode002";

// Each episode registers its compositions here (or in its own branch).
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Episode002" component={Episode002} durationInFrames={EP002_DURATION} fps={VIDEO.fps} {...VIDEO.vertical} />
    <SampleScenes />
  </>
);
