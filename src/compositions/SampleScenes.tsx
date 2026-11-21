import React from "react";
import { Composition } from "remotion";
import { VIDEO } from "../config/brand";
import { SampleColdOpen } from "../scenes/SampleColdOpen";
import { SampleSurfaceToSystem } from "../scenes/SampleSurfaceToSystem";

export const SampleScenes: React.FC = () => (
  <>
    <Composition id="SampleColdOpen" component={SampleColdOpen} durationInFrames={150} fps={VIDEO.fps} {...VIDEO.horizontal} />
    <Composition id="SampleSurfaceToSystem" component={SampleSurfaceToSystem} durationInFrames={210} fps={VIDEO.fps} {...VIDEO.horizontal} />
  </>
);
