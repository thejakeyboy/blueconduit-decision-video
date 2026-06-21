import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const navyBg = '#071829';
const navy = '#0A2452';
const brandBlue = '#164E87';
const brandLightBlue = '#5CA3EB';
const brandSand = '#F7D795';
const green = '#3FB950';
const orange = '#FF9F1C';
const white = '#F4F9FF';
const muted = '#A9B9CC';
const ink = '#102235';
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const asset = (name: string) => staticFile(`assets/live-clips/${name}`);

const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 18, end - 18, end], [0, 1, 1, 0], clamp);

const Background: React.FC = () => {
  const f = useCurrentFrame();
  const drift = Math.sin(f / 110) * 18;
  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        background: `radial-gradient(circle at 75% 12%, rgba(92,163,235,.24), transparent 30%), radial-gradient(circle at 14% 85%, rgba(63,185,80,.16), transparent 32%), linear-gradient(135deg, #040E1C, ${navyBg})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          transform: `translate(${drift}px, ${-drift * 0.45}px)`,
        }}
      />
      <div style={{position: 'absolute', width: 540, height: 540, borderRadius: 999, border: `1px solid ${brandLightBlue}22`, right: -100, top: -100}} />
      <div style={{position: 'absolute', width: 360, height: 360, borderRadius: 999, border: `1px solid ${brandBlue}18`, left: -80, bottom: -100}} />
    </AbsoluteFill>
  );
};

const Logo: React.FC<{small?: boolean}> = ({small}) => {
  const r = small ? 17 : 24;
  const fontSize = small ? 19 : 26;
  const clipId = small ? 'bc-logo-clip-small' : 'bc-logo-clip-large';
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: small ? 9 : 12}}>
      <svg width={r * 2} height={r * 2} viewBox="0 0 60 60">
        <defs>
          <clipPath id={clipId}>
            <circle cx="30" cy="30" r="26.5" />
          </clipPath>
        </defs>
        <circle cx="30" cy="30" r="27.5" fill="white" stroke={navy} strokeWidth="3" />
        <g clipPath={`url(#${clipId})`}>
          <path d="M0 28 Q15 18 30 24 Q45 30 60 22 L60 0 L0 0 Z" fill={brandSand} opacity="0.9" />
          <path d="M0 34 Q15 26 30 31 Q45 36 60 28 L60 50 Q45 44 30 38 Q15 32 0 40 Z" fill={brandBlue} />
          <path d="M0 42 Q15 36 30 40 Q45 44 60 38 L60 60 L0 60 Z" fill={brandLightBlue} opacity="0.85" />
        </g>
        <circle cx="30" cy="30" r="27.5" fill="none" stroke={navy} strokeWidth="3" />
      </svg>
      <div style={{fontWeight: 700, fontSize, letterSpacing: -0.5}}>
        <span style={{color: brandLightBlue}}>Blue</span><span style={{color: white}}>Conduit</span>
      </div>
    </div>
  );
};

const BrowserVideo: React.FC<{
  src: string;
  objectPosition?: string;
  zoomFrom?: number;
  zoomTo?: number;
  panX?: number;
  panY?: number;
}> = ({src, objectPosition = 'center 22%', zoomFrom = 1, zoomTo = 1.06, panX = 0, panY = 0}) => {
  const f = useCurrentFrame();
  const scale = interpolate(f, [0, 160], [zoomFrom, zoomTo], clamp);
  const x = interpolate(f, [0, 160], [0, panX], clamp);
  const y = interpolate(f, [0, 160], [0, panY], clamp);
  return (
    <div style={{background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 34px 90px rgba(0,0,0,.38)', border: `1px solid ${brandLightBlue}40`}}>
      <div style={{height: 36, background: '#E3EDF6', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 7}}>
        <span style={{width: 10, height: 10, borderRadius: 99, background: '#FF5F57'}} />
        <span style={{width: 10, height: 10, borderRadius: 99, background: '#FFBD2E'}} />
        <span style={{width: 10, height: 10, borderRadius: 99, background: '#28C840'}} />
        <div style={{marginLeft: 12, flex: 1, background: '#F5F9FD', height: 22, borderRadius: 8, color: '#68829C', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 11}}>app.blueconduit.com</div>
      </div>
      <div style={{height: 474, overflow: 'hidden', background: '#EFF5FA'}}>
        <div style={{width: '100%', height: '100%', transform: `translate(${x}px, ${y}px) scale(${scale})`, transformOrigin: 'center top'}}>
          <OffthreadVideo
            src={asset(src)}
            muted
            style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition}}
          />
        </div>
      </div>
    </div>
  );
};

const Callout: React.FC<{label: string; detail: string; color?: string}> = ({label, detail, color = brandLightBlue}) => (
  <div style={{background: 'rgba(5,14,28,.74)', border: `1px solid ${color}80`, borderRadius: 18, padding: '16px 18px', boxShadow: '0 20px 60px rgba(0,0,0,.22)'}}>
  <div style={{color, fontSize: 15, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase'}}>{label}</div>
  <div style={{color: white, fontSize: 24, fontWeight: 650, marginTop: 6, lineHeight: 1.05}}>{detail}</div>
  </div>
);

const LoopShot: React.FC<{
  start: number;
  end: number;
  src: string;
  kicker: string;
  headline: string;
  body: string;
  color?: string;
  objectPosition?: string;
}> = ({start, end, src, kicker, headline, body, color = brandLightBlue, objectPosition}) => {
  const frame = useCurrentFrame();
  const op = fade(frame, start, end);
  const local = frame - start;
  const textY = interpolate(local, [0, 28], [24, 0], clamp);
  return (
    <AbsoluteFill style={{opacity: op, padding: '54px 64px'}}>
      <div style={{position: 'absolute', left: 64, top: 44}}><Logo small /></div>
      <div style={{position: 'absolute', right: 64, top: 58, color: muted, fontSize: 16, fontWeight: 650}}>Live product footage draft</div>
      <div style={{position: 'absolute', left: 72, bottom: 76, width: 380, transform: `translateY(${textY}px)`}}>
        <div style={{fontSize: 14, letterSpacing: 3, textTransform: 'uppercase', color, fontWeight: 750, marginBottom: 13}}>{kicker}</div>
        <div style={{fontSize: 40, lineHeight: 1.05, letterSpacing: -1.3, color: white, fontWeight: 650}}>{headline}</div>
        <div style={{marginTop: 16, fontSize: 18, lineHeight: 1.38, color: muted}}>{body}</div>
      </div>
      <div style={{position: 'absolute', right: 60, top: 128, width: 720}}>
        <Sequence from={start} durationInFrames={end - start} layout="none">
          <BrowserVideo src={src} objectPosition={objectPosition} zoomTo={1.08} />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};

const Intro: React.FC<{end: number; title: string; subtitle: string}> = ({end, title, subtitle}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity: fade(frame, 0, end), padding: '74px 82px'}}>
      <Logo />
      <div style={{position: 'absolute', left: 82, top: 198, width: 950}}>
        <div style={{fontSize: 68, lineHeight: .98, color: white, fontWeight: 650, letterSpacing: -2.5}}>{title}</div>
        <div style={{marginTop: 28, width: 720, fontSize: 25, lineHeight: 1.35, color: muted}}>{subtitle}</div>
      </div>
    </AbsoluteFill>
  );
};

const Close: React.FC<{start: number; end: number}> = ({start, end}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity: fade(frame, start, end), padding: '74px 82px'}}>
      <Logo />
      <div style={{position: 'absolute', top: 204, left: 82, width: 780}}>
        <div style={{fontSize: 44, lineHeight: 1.07, color: white, fontWeight: 650, letterSpacing: -1.5}}>
          The engine you buy for compliance becomes the engine that saves money across your distribution assets.
        </div>
        <div style={{marginTop: 28, fontSize: 24, color: muted}}>Smart predictions. Defensible explanations. Clear action plans.</div>
      </div>
      <div style={{position: 'absolute', right: 86, top: 220, display: 'grid', gap: 16, width: 290}}>
        <Callout label="Predict" detail="Every pipe" color={brandLightBlue} />
        <Callout label="Explain" detail="Every score" color={green} />
        <Callout label="Plan" detail="Every dollar" color={orange} />
      </div>
    </AbsoluteFill>
  );
};

export const DecisionEngineLiveLoopDraft: React.FC = () => (
  <AbsoluteFill style={{fontFamily: 'Inter, Avenir Next, Helvetica Neue, Arial, sans-serif'}}>
    <Background />
    <Intro end={150} title="Live proof inside the decision engine." subtitle="A draft loop that blends the current brand story with real app motion from the screen recording." />
    <LoopShot start={130} end={350} src="v2_01_inventory_compliance_0013_0024.mp4" kicker="Compliance foundation" headline="Inventory progress becomes a living map." body="Start with LCRI readiness, then keep the data moving." objectPosition="center 18%" />
    <LoopShot start={330} end={570} src="v3_02_prediction_risk_map_0141_0159.mp4" kicker="Predict" headline="Risk shows up street by street." body="Colored predictions and confidence bands turn unknowns into priorities." color={brandLightBlue} objectPosition="center 15%" />
    <LoopShot start={550} end={760} src="v2_03_water_main_explain_0348_0355.mp4" kicker="Explain" headline="Every score has a reason." body="Water main risk is tied to visible, defensible factor evidence." color={green} objectPosition="center 12%" />
    <LoopShot start={740} end={900} src="v2_04_mains_expand_0421_0426.mp4" kicker="Expand" headline="The same engine works beyond service lines." body="The platform extends the decision workflow from service lines into mains and other assets." color={brandSand} objectPosition="center 12%" />
    <LoopShot start={880} end={1240} src="v2_05_plan_setup_0618_0630.mp4" kicker="Plan · Set constraints" headline="Start with budget and decision goals." body="Scenario controls let teams express trade-offs before choosing work." color={orange} objectPosition="center 18%" />
    <LoopShot start={1220} end={1460} src="v2_06_plan_recommendation_0824_0832.mp4" kicker="Plan · Compare options" headline="Recommendations stay explainable." body="Suggested replacement areas connect cost, risk, and selected segments." color={orange} objectPosition="center 18%" />
    <LoopShot start={1440} end={1830} src="v2_07_plan_selected_1156_1209.mp4" kicker="Plan · Act" headline="Turn priorities into a defensible work plan." body="Selected areas, costs, and impact stay connected on the map and in the table." color={orange} objectPosition="center 18%" />
    <Close start={1800} end={2250} />
  </AbsoluteFill>
);

const Chapter: React.FC<{
  start: number;
  end: number;
  title: string;
  eyebrow: string;
  bullets: string[];
  src: string;
  color?: string;
  objectPosition?: string;
}> = ({start, end, title, eyebrow, bullets, src, color = brandLightBlue, objectPosition = 'center 16%'}) => {
  const frame = useCurrentFrame();
  const op = fade(frame, start, end);
  const local = frame - start;
  return (
    <AbsoluteFill style={{opacity: op, padding: '44px 54px'}}>
      <div style={{position: 'absolute', left: 54, top: 36}}><Logo small /></div>
      <div style={{position: 'absolute', left: 58, top: 104, width: 380}}>
        <div style={{fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color, fontWeight: 750}}>{eyebrow}</div>
        <div style={{fontSize: 36, lineHeight: 1.05, color: white, fontWeight: 650, letterSpacing: -1.1, marginTop: 12}}>{title}</div>
        <div style={{display: 'grid', gap: 12, marginTop: 28}}>
          {bullets.map((b, i) => (
            <div key={b} style={{opacity: interpolate(local, [40 + i * 18, 64 + i * 18], [0, 1], clamp), transform: `translateX(${interpolate(local, [40 + i * 18, 64 + i * 18], [-18, 0], clamp)}px)`, color: white, fontSize: 18, lineHeight: 1.25, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 16, padding: '12px 14px'}}>
              <span style={{color, fontWeight: 750, marginRight: 8}}>→</span>{b}
            </div>
          ))}
        </div>
      </div>
      <div style={{position: 'absolute', right: 48, top: 72, width: 760}}>
        <Sequence from={start} durationInFrames={end - start} layout="none">
          <BrowserVideo src={src} objectPosition={objectPosition} zoomTo={1.05} />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};

export const ProductDemoAnnotatedDraft: React.FC = () => (
  <AbsoluteFill style={{fontFamily: 'Inter, Avenir Next, Helvetica Neue, Arial, sans-serif'}}>
    <Background />
    <Intro end={180} title="BlueConduit product demo." subtitle="An annotated draft structure using Jake’s screen recording as live product footage." />
    <Chapter start={165} end={1155} eyebrow="1 / Foundation" title="Start with a complete service-line operating picture." src="demo_A_inventory_chapter_0000_0124.mp4" color={brandLightBlue} bullets={["Track inventory resolution progress.", "Move from summary metrics to map evidence.", "Open record-level detail when a decision needs support."]} />
    <Chapter start={1125} end={1800} eyebrow="2 / Predict" title="Convert uncertainty into prioritized risk." src="demo_B_prediction_chapter_0130_0212.mp4" color={brandLightBlue} bullets={["Filter by risk and material likelihood.", "See citywide and neighborhood-level patterns.", "Use confidence to focus field work and replacements."]} />
    <Chapter start={1770} end={2925} eyebrow="3 / Explain" title="Show why each asset is scored the way it is." src="demo_C_asset_risk_chapter_0315_0503.mp4" color={green} bullets={["Scorecards expose the factors behind risk.", "Maps connect asset condition to geography.", "Defensible logic supports council, regulator, and customer conversations."]} />
    <Chapter start={2895} end={4770} eyebrow="4 / Plan" title="Build budget-aware replacement scenarios." src="demo_D_planner_setup_0524_0830.mp4" color={orange} bullets={["Set constraints and planning goals.", "Generate candidate replacement areas.", "Compare service, risk, and cost trade-offs."]} />
    <Chapter start={4740} end={6600} eyebrow="5 / Act" title="Tie selected work areas to costs and segment evidence." src="demo_E_planner_selected_0900_1306.mp4" color={brandSand} bullets={["Selected areas remain visible on the map.", "Tables preserve the project-level evidence.", "Teams can move from strategy to dispatchable work."]} />
    <Close start={6570} end={7200} />
  </AbsoluteFill>
);
