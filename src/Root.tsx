import React from "react";
import { Composition } from "remotion";
import { VIDEO } from "./config/brand";
import { ThumbA, ThumbB, ThumbC } from "./compositions/Thumbnails002";
import { SampleScenes } from "./compositions/SampleScenes";
import { Episode002, EP002_DURATION } from "./compositions/Episode002";

// Each episode registers its compositions here (or in its own branch).
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Episode002" component={Episode002} durationInFrames={EP002_DURATION} fps={VIDEO.fps} {...VIDEO.vertical} />
    <Composition id="Thumb002A" component={ThumbA} durationInFrames={1} fps={30} width={1080} height={1920} />
    <Composition id="Thumb002B" component={ThumbB} durationInFrames={1} fps={30} width={1080} height={1920} />
    <Composition id="Thumb002C" component={ThumbC} durationInFrames={1} fps={30} width={1080} height={1920} />
    <SampleScenes />
  </>
);
