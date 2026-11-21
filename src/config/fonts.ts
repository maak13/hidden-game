// Title face: Abril Fatface (bold, high-contrast display serif). Subtitle face: Inter.
import { loadFont as loadDisplay } from "@remotion/google-fonts/AbrilFatface";
import { loadFont as loadSans } from "@remotion/google-fonts/Inter";

export const display = loadDisplay().fontFamily;
export const sans = loadSans().fontFamily;
