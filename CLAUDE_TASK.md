# Claude Code task: BlueConduit demo video / Remotion direction

You are working on a BlueConduit marketing/demo video concept. Jake asked for Claude Code to take another pass because this CC setup has more integrations and codebase detail.

## Working directories

- Remotion seed project copied from Hermes prototype: `/home/jake/work/blueconduit-remotion-demo-cc`
- Positioning/strategy document from Jake: `/home/jake/work/blueconduit-remotion-demo-cc/context/BlueConduit_Positioning_2026-06-15.md`
- Canonical BlueConduit code/worktrees on this machine:
  - `/home/jake/work/bc_platform`
  - likely app repo/worktrees under `/home/jake/work/bc_platform/civic_intelligence_platform/...`

Start in `/home/jake/work/blueconduit-remotion-demo-cc`.

## Goal

Produce a stronger BlueConduit website/customer demo video concept in Remotion, grounded in the attached positioning doc and richer current product visuals.

The strategic message to encode:

- BlueConduit sells **the confidence to decide — every pipe, every year**.
- The one-line strategy: **The engine you buy for compliance becomes the engine that saves you money across your water distribution assets.**
- It should show one recurring decision engine: **Predict · Explain · Plan · Update**.
- Proof pillars: **Smart, Defensible, Clear**.
- Journey: compliance gets us in the door (service lines / LCRI / Nov 2027), ongoing decisions keep us in business (LSL replacements, water mains, dig-once coordination).
- Avoid making it feel like a one-time inventory vendor or spreadsheet/PDF deliverable. Position as an AI-powered decision platform for years of decisions.

## Important: get better screenshots than the Hermes prototype

Hermes' first pass only used recently-taken planner screenshots already lying around. Please do better:

1. Inspect the BlueConduit codebase/worktrees for current frontend routes, fixtures, Playwright tests, Storybook, mock data, demo accounts, screenshot tooling, or PR screenshot workflows.
2. Generate new robust screenshots if practical:
   - Run the frontend locally if there is a documented dev-server script.
   - Use existing Playwright/e2e helpers if available.
   - Capture views that support the positioning: service-line inventory, risk/prediction map, explanation/why panel, replacement/dispatch plan, filters/notices, mains/asset prioritization if present.
   - Prefer clean, deterministic demo data and browser sizes suitable for 16:9 video.
3. Make a contact sheet of candidate screenshots and visually inspect it before embedding.
4. If running the app is blocked, document the blocker and use the best existing assets from `.github/pr-screenshots`, `.playwright-mcp`, `browser_pr_eval/img`, `frontend/public/*guide*/img`, or similar.

## Seed project / known Remotion setup

The copied project already contains:

- `src/index.tsx` with `registerRoot(RemotionRoot)` — keep this pattern; Remotion CLI needs `registerRoot()`.
- `src/ConferenceBoothDemo.tsx` — 45s product-demo loop.
- `src/CreativeShowcase.tsx` — 84s moving moodboard with varied scenes.
- `public/assets/*` — older screenshots/logo assets.
- Prior rendered outputs in `out/` for reference.

Helpful commands from Hermes' working setup:

```bash
cd /home/jake/work/blueconduit-remotion-demo-cc
npm install
npx tsc --noEmit
npx remotion still src/index.tsx ConferenceBoothDemo out/still-hero.png --frame=90
npx remotion still src/index.tsx CreativeShowcase out/showcase-stills/title.png --frame=120
npx remotion render src/index.tsx <CompositionName> out/<name>.mp4 --codec=h264 --crf=23 --jpeg-quality=80 --concurrency=2
ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,r_frame_rate,nb_frames -show_entries format=duration,size -of json out/<name>.mp4
```

If `ffmpeg`/`ffprobe` are missing, install or use an available alternative; at minimum verify Remotion render output exists and is playable/valid.

## Design direction

You can either substantially revise `ConferenceBoothDemo`, create a new composition, or both. Recommended: add a new composition like `DecisionEngineDemo2026` so the old prototypes remain for comparison.

Suggested structure for a 45–60s silent website/customer video:

1. **Hook:** “The confidence to decide — every pipe, every year.”
2. **Compliance door-opener:** LCRI/Nov 2027 inventory and replacement plan are necessary, but not the end.
3. **Engine:** Predict · Explain · Plan · Update, shown as a reusable system rather than one report.
4. **Proofs:** Smart / Defensible / Clear with visual evidence.
5. **Expansion:** Point the engine at service lines, water mains, and coordinated dig-once decisions.
6. **Close:** “The engine you buy for compliance becomes the engine that saves money across your distribution assets.”

Keep text big enough for website video and booth viewing. Product screenshots should add credibility, but captions/graphics must carry the story.

## Verification checklist before reporting back

- `npm install` completed or existing deps are usable.
- `npx tsc --noEmit` passes.
- Render at least 4 representative stills and a contact sheet.
- Visually inspect stills/contact sheet for blank frames, cropping, tiny text, and off-screen elements.
- Render a preview MP4.
- Verify with `ffprobe` if available.
- Summarize exact output paths, what screenshots/assets were used, and any blockers.

## Reporting

When done, notify Jake in the originating Discord thread if your Hermes integration is available. If not, leave a concise `RESULT.md` in `/home/jake/work/blueconduit-remotion-demo-cc` with:

- what you built
- output paths
- verification output
- screenshot sourcing notes
- suggested next iteration
