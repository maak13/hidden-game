# The Hidden Game

Programmatic documentary videos about the hidden systems behind business, money and behaviour.
Stack: Remotion 4 + React + TypeScript, Three.js (when 3D helps), FFmpeg. Free tools only. Voiceover supplied by the channel owner.

Full plan: see the channel strategy document (section 11 defines this layout).

## Layout
- `public/assets/*`, `public/fonts` : 3D, textures, images, music, sound effects, fonts
- `src/components/*` : reusable camera, typography, transitions, diagrams, captions, audio
- `src/scenes`, `src/compositions`, `src/series`, `src/config`, `src/utils`
- `episodes/episode-NNN/` : brief.md, research.md, sources.json, script.md, scenes.json, voiceover.wav, assets/, exports/
- `prompts/` : research, scriptwriting, fact-check, scene-planning
- `scripts/` : validate, generate-voice, render

## Git workflow
- `main` holds core engine, components, config and tooling.
- Each video gets a branch `episode/NNN-short-topic` and a PR. Merge once the final render is approved.

## Commands
```
npm install
npm run dev                       # Remotion Studio
npm run validate                  # check episode folders
npm run voice -- episode-001      # voiceover duration -> frames
npm run render -- <compositionId> # render MP4 + loudness-mastered copy to out/
npm run sound                     # regenerate the synthesized music bed and sound effects
```
Sample scenes: `SampleColdOpen`, `SampleSurfaceToSystem` (brand palette check).

## Brand
Charcoal `#1C1D20`, warm cream `#F1E8D6`, muted gold `#C9A24B`, cool grey `#8A93A0` (see `src/config/brand.ts`). Fonts: Abril Fatface (titles) + Inter (subtitles). No eyebrow/kicker labels anywhere: on-screen words are a Title or a Subtitle only.
