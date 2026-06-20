Please execute this end-to-end from the BlueConduit repo context.

You are now intentionally running Claude Code with cwd `/home/jake/work/bc_platform` so you get the repo's `CLAUDE.md`, project context, worktrees, screenshots, scripts, and frontend conventions. Do not switch your main working context away from this repo unless needed for rendering.

## Task

Build a stronger BlueConduit customer/website/demo video concept using Remotion, grounded in Jake's positioning document and better product screenshots than the earlier Hermes prototype.

## Key files / directories

- Current repo/context root: `/home/jake/work/bc_platform`
- Existing Remotion seed project copied from Hermes prototype: `/home/jake/work/blueconduit-remotion-demo-cc`
- Positioning document from Jake: `/home/jake/work/blueconduit-remotion-demo-cc/context/BlueConduit_Positioning_2026-06-15.md`
- Prior detailed task brief: `/home/jake/work/blueconduit-remotion-demo-cc/CLAUDE_TASK.md`

Start by reading:
1. `/home/jake/work/bc_platform/CLAUDE.md`
2. `/home/jake/work/blueconduit-remotion-demo-cc/context/BlueConduit_Positioning_2026-06-15.md`
3. `/home/jake/work/blueconduit-remotion-demo-cc/CLAUDE_TASK.md`

Use the Remotion seed as a starting point, but your repo context should drive asset sourcing and screenshot generation.

## Positioning to encode

- BlueConduit sells **the confidence to decide — every pipe, every year**.
- One-line strategy: **The engine you buy for compliance becomes the engine that saves you money across your water distribution assets.**
- The recurring engine: **Predict · Explain · Plan · Update**.
- Proof pillars: **Smart, Defensible, Clear**.
- Journey: compliance gets us in the door (service lines / LCRI / Nov 2027), ongoing decisions keep us in business (LSL replacements, water mains, dig-once coordination).
- Do not make it feel like a one-time inventory vendor or a spreadsheet/PDF deliverable. Show an AI-powered decision platform for years of water infrastructure decisions.

## Screenshot requirement

The earlier Hermes prototype only used recent planner screenshots already lying around. Please do better from this repo context:

1. Inspect the repo/worktrees for frontend routes, fixtures, Playwright tests, Storybook, mock/demo data, screenshot tooling, and PR screenshot workflows.
2. Generate new robust screenshots if practical by running the frontend locally or using existing Playwright/e2e helpers.
3. Capture views that support: service-line inventory, risk/prediction map, explanation/why panel, replacement/dispatch plan, filters/notices, mains/asset prioritization, and coordinated dig-once strategy if present.
4. Prefer clean deterministic demo data and 16:9-friendly browser captures.
5. Make a contact sheet of candidate screenshots and visually inspect it before embedding.
6. If running the app is blocked, document the blocker and source best existing assets from repo locations like `.github/pr-screenshots`, `.playwright-mcp`, `browser_pr_eval/img`, `frontend/public/*guide*/img`, root screenshot PNGs, or similar.

## Remotion guidance

The seed project already has working Remotion setup:

- `src/index.tsx` calls `registerRoot(RemotionRoot)` — keep this pattern.
- Existing compositions: `ConferenceBoothDemo` and `CreativeShowcase`.
- Older assets in `public/assets/*`.
- Prior renders in `out/` for comparison.

Recommended: create a new composition such as `DecisionEngineDemo2026` rather than overwriting the old demos. It can live in the seed project or a new project under an appropriate working directory, but make the result easy for Jake/Hermes to find.

Suggested 45–60s silent structure:

1. Hook: “The confidence to decide — every pipe, every year.”
2. Compliance door-opener: LCRI/Nov 2027 inventory and replacement plan are necessary, but not the end.
3. Engine: Predict · Explain · Plan · Update, shown as recurring platform mechanics rather than a one-time report.
4. Proofs: Smart / Defensible / Clear with visual evidence.
5. Expansion: point the engine at service lines, water mains, and coordinated dig-once decisions.
6. Close: “The engine you buy for compliance becomes the engine that saves money across your distribution assets.”

Keep text large enough for website video and booth viewing. Screenshots add credibility, but captions/graphics should carry the story.

## Known commands from working Hermes setup

```bash
cd /home/jake/work/blueconduit-remotion-demo-cc
npm install
npx tsc --noEmit
npx remotion still src/index.tsx ConferenceBoothDemo out/still-hero.png --frame=90
npx remotion render src/index.tsx <CompositionName> out/<name>.mp4 --codec=h264 --crf=23 --jpeg-quality=80 --concurrency=2
ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,r_frame_rate,nb_frames -show_entries format=duration,size -of json out/<name>.mp4
```

If ffmpeg/ffprobe are missing, install/use an available alternative or at minimum verify Remotion output exists and is valid.

## Verification before reporting done

- Dependencies installed or existing deps usable.
- `npx tsc --noEmit` passes.
- At least 4 representative stills rendered.
- A still/contact sheet created and visually inspected for blank frames, cropping, tiny text, off-screen elements.
- Preview MP4 rendered.
- `ffprobe` verification if available.
- Write `/home/jake/work/blueconduit-remotion-demo-cc/RESULT.md` with:
  - what you built
  - output paths
  - verification output
  - screenshot sourcing/generation notes
  - blockers, if any
  - suggested next iteration

Then stop or wait for further feedback.
