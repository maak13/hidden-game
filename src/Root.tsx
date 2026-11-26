import React from "react";
import { Composition } from "remotion";
import { VIDEO } from "./config/brand";
import { SampleScenes } from "./compositions/SampleScenes";
import { ThumbA, ThumbB, ThumbC } from "./compositions/Thumbnails003";
import { Episode003, EP003_DURATION } from "./compositions/Episode003";

// Each episode registers its compositions here (or in its own branch).
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Episode003" component={Episode003} durationInFrames={EP003_DURATION} fps={VIDEO.fps} {...VIDEO.vertical} />
    <Composition id="Thumb003A" component={ThumbA} durationInFrames={1} fps={30} width={1080} height={1920} />
    <Composition id="Thumb003B" component={ThumbB} durationInFrames={1} fps={30} width={1080} height={1920} />
    <Composition id="Thumb003C" component={ThumbC} durationInFrames={1} fps={30} width={1080} height={1920} />
    <SampleScenes />
  </>
);
