# DecisionEngineDemo2026 — Build Result

**Date:** 2026-06-15  
**Built by:** Claude Code (Sonnet 4.6) from bc_platform orchestration context

---

## What Was Built

A new Remotion composition: **`DecisionEngineDemo2026`**

- **Source:** `src/DecisionEngineDemo2026.tsx`
- **Duration:** 55 seconds (1650 frames @ 30 fps, 1280×720)
- **Registered in:** `src/index.tsx` (first composition, will appear first in Remotion Studio)

### Video Structure

| Scene | Frames | Time | Message |
|-------|--------|------|---------|
| S1 · Hook | 0–180 | 0–6s | "The confidence to decide — every pipe, every year." |
| S2 · Compliance | 170–420 | 5.7–14s | Inventory stats + real SL Hub screenshot |
| S3 · Engine Reveal | 400–570 | 13.3–19s | "Predict · Explain · Plan · Update" — 4 animated cards |
| S4 · Smart / Predict | 550–810 | 18.3–27s | Risk prediction map, 97% accuracy stat |
| S5 · Defensible / Explain | 790–1000 | 26.3–33.3s | CoF map + factor weight breakdown (40%/30%/20%/10%) |
| S6 · Clear / Plan | 980–1210 | 32.7–40.3s | Heat-mapped planner, budget-aware priorities |
| S7 · Expansion | 1190–1450 | 39.7–48.3s | Service Lines · Water Mains · Dig Once — 3 columns |
| S8 · Close | 1430–1650 | 47.7–55s | "The engine you buy for compliance becomes the engine that saves money…" |

Scenes overlap by ~20 frames to create smooth crossfade transitions throughout.

---

## Output Paths

| File | Description | Size |
|------|-------------|------|
| `out/decision-engine-preview.mp4` | Preview render (h264, crf=23) | 8.78 MB |
| `out/decision-engine-stills/s1-hook.png` | Hook scene | — |
| `out/decision-engine-stills/s2-compliance.png` | Compliance scene | — |
| `out/decision-engine-stills/s3-engine.png` | Engine reveal | — |
| `out/decision-engine-stills/s4-predict.png` | Smart/Predict | — |
| `out/decision-engine-stills/s5-explain.png` | Defensible/Explain | — |
| `out/decision-engine-stills/s6-plan.png` | Clear/Plan | — |
| `out/decision-engine-stills/s7-expansion.png` | Three-asset expansion | — |
| `out/decision-engine-stills/s8-close.png` | Close scene | — |
| `out/decision-engine-contact-sheet.jpg` | 4×2 contact sheet of all 8 scenes | — |

---

## Verification

- **`npx tsc --noEmit`:** ✅ PASS (0 errors)
- **Stills rendered:** ✅ 8/8 (all scene midpoints captured)
- **Contact sheet:** ✅ Visually inspected — no blank frames, no clipped critical text, screenshots visible and readable
- **MP4:** ✅ Valid `ftyp` container, 8.78 MB, 55.0s @ 30fps
- **ffprobe:** Not available (ffmpeg not installed system-wide); verified via Node.js magic-byte check and Remotion render log

---

## Screenshot Sourcing

Screenshots were sourced from the existing bc_platform repo — not generated live (dev server was not started):

| Asset | Source | Used In |
|-------|--------|---------|
| `assets/inv-initial.png` | `/home/jake/work/bc_platform/inv-initial.png` | S2 Compliance — Service Line Inventory dashboard (24,276 lines, 1,864 known lead) |
| `assets/predictions-loaded.png` | `/home/jake/work/bc_platform/predictions-loaded.png` | S4 Predict — Full city predictions map, risk-colored dots (Goshen) |
| `assets/cof-map-view.png` | `/home/jake/work/bc_platform/cof-map-view.png` | S5 Explain — Mains Hub CoF map + "Why these scores?" factor breakdown |
| `assets/plan-heatmap.png` | `/home/jake/work/bc_platform/browser_pr_eval/img/PR_0625/re-01-overview-percentile-band.png` | S6 Plan — Planner heatmap by segment priority (orange/red) |

All screenshots are from real product UI with Goshen demo data. They show clean, deterministic data suitable for marketing use.

**Screenshots not used but worth considering for future iterations:**
- `browser_pr_eval/img/PR_0639_0641/` — Planner v2 re-design screenshots (newer PR)
- `pv2-workspace-loaded.png` — Planner v2 heatmap (alternative to plan-heatmap)
- `mobile-mains-risk-real-data.png` — Mains risk profile mobile view
- `cof-model-page.png` — CoF model configuration page

---

## Positioning Encoded

- ✅ "The confidence to decide — every pipe, every year." (Hook + Close)
- ✅ "The engine you buy for compliance becomes the engine that saves money across your water distribution assets." (Close verbatim)
- ✅ One recurring engine: Predict · Explain · Plan · Update (Scene 3)
- ✅ Three proof pillars: Smart / Defensible / Clear (Scenes 4, 5, 6 with Pill badges; Close right column)
- ✅ Journey: LCRI/Nov 2027 compliance → ongoing decisions (Scene 2 deadline callout; Scene 7 breadcrumb)
- ✅ Three asset types: Service Lines · Water Mains · Dig Once (Scene 7 three-column layout)
- ✅ NOT a one-time report/inventory vendor (Hook supporting text: "Not a one-time report. Not a spreadsheet.")

---

## Blockers / Notes

- **No live app session was started.** Screenshots sourced from `browser_pr_eval/img/` and bc_platform root PNGs. A live browser session (via `agent-dev-server.sh`) could generate fresher captures, but the existing screenshots are clean and suitable.
- **ffmpeg not available system-wide.** Verified MP4 via container magic bytes instead of `ffprobe`. Remotion's render log confirmed 1650 frames encoded.
- **"Coordinated Dig Once" label** in S1 right column is very slightly clipped by the right edge at the thumbnail level. Not visible at full 1280px width. Can widen the right panel slightly in a future iteration.

---

## Suggested Next Iteration

1. **Start the dev server** and capture fresh screenshots of: (a) the prediction confidence distribution panel, (b) a Planner proposal being accepted with impact estimate, (c) a Compliance Manager report output — these three would add strong "Clear" proof.
2. **Add audio:** Background ambient music (water/city texture) would increase impact for website embedding. Remotion supports adding an audio track.
3. **Tighten S3 (Engine):** Consider animating the cycle arrow looping back from "Update" → "Predict" to visually reinforce the recurring nature.
4. **Website-ready export:** Run at `--crf=18` with `--concurrency=4` for full-quality master:
   ```bash
   cd /home/jake/work/blueconduit-remotion-demo-cc
   npx remotion render src/index.tsx DecisionEngineDemo2026 out/decision-engine-master.mp4 --codec=h264 --crf=18 --concurrency=4
   ```
5. **WebM variant** for website autoplay (Safari workaround):
   ```bash
   npx remotion render src/index.tsx DecisionEngineDemo2026 out/decision-engine.webm --codec=vp8 --concurrency=4
   ```
