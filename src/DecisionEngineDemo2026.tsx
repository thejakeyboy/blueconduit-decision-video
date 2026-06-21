import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';

// ── Real BlueConduit brand palette (extracted from official logo) ───────────
const navyBg = '#071829';       // video background dark
const navy = '#0A2452';         // logo border / deepest navy
const brandBlue = '#164E87';    // logo dark water wave
const brandLightBlue = '#5CA3EB'; // logo "Blue" wordmark text / light wave
const brandSand = '#F7D795';    // logo sand wave accent
const green = '#3FB950';        // Explain / Defensible accent
const orange = '#FF9F1C';       // Update accent
const white = '#F4F9FF';
const muted = '#A9B9CC';

const FPS = 30;
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const appear = (f: number, delay = 0) =>
  spring({frame: f - delay, fps: FPS, config: {damping: 16, stiffness: 120}});

const fadeScene = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 22, end - 20, end], [0, 1, 1, 0], clamp);

const slideIn = (f: number, delay = 0) =>
  interpolate(appear(f, delay), [0, 1], [50, 0]);

// ── Shared background ─────────────────────────────────────────────────────
const Background: React.FC = () => {
  const f = useCurrentFrame();
  const drift = Math.sin(f / 100) * 18;
  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(circle at 72% 12%, rgba(92,163,235,.22), transparent 30%),
          radial-gradient(circle at 14% 84%, rgba(22,78,135,.20), transparent 32%),
          linear-gradient(135deg, #040E1C, ${navyBg})
        `,
      }}
    >
      <div
        style={{
          position: 'absolute', inset: 0, opacity: 0.09,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          transform: `translate(${drift}px, ${-drift * 0.5}px)`,
        }}
      />
      <div style={{position:'absolute', width:540, height:540, borderRadius:999, border:`1px solid ${brandLightBlue}22`, right:-100, top:-100}} />
      <div style={{position:'absolute', width:360, height:360, borderRadius:999, border:`1px solid ${brandBlue}18`, left:-80, bottom:-100}} />
    </AbsoluteFill>
  );
};

// ── Real BlueConduit logo (SVG, transparent bg, works on dark) ────────────
const BCLogo: React.FC<{compact?: boolean; small?: boolean}> = ({compact, small}) => {
  const r = small ? 17 : (compact ? 20 : 28);
  const fontSize = small ? 19 : (compact ? 22 : 30);
  const gap = small ? 9 : (compact ? 10 : 14);
  const clipId = small ? 'bc-logo-clip-small' : (compact ? 'bc-logo-clip-compact' : 'bc-logo-clip-large');
  return (
    <div style={{display: 'flex', alignItems: 'center', gap}}>
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

// ── Browser chrome wrapper ────────────────────────────────────────────────
const Chrome: React.FC<{url?: string; children: React.ReactNode}> = ({url, children}) => (
  <div style={{
    background:'#fff', borderRadius:20, overflow:'hidden',
    boxShadow:'0 28px 70px rgba(0,0,0,.32)', border:`1px solid ${brandLightBlue}33`,
  }}>
    <div style={{height:40, background:'#E3EDF6', display:'flex', alignItems:'center', padding:'0 14px', gap:7}}>
      <span style={{width:11, height:11, borderRadius:99, background:'#FF5F57', flexShrink:0}} />
      <span style={{width:11, height:11, borderRadius:99, background:'#FFBD2E', flexShrink:0}} />
      <span style={{width:11, height:11, borderRadius:99, background:'#28C840', flexShrink:0}} />
      {url && (
        <div style={{marginLeft:12, background:'#F3F8FD', borderRadius:9, height:25, display:'flex', alignItems:'center', padding:'0 12px', fontSize:12, color:'#5A7189', flex:1, overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis'}}>
          {url}
        </div>
      )}
    </div>
    {children}
  </div>
);

// ── Screenshot with slow Ken Burns zoom ──────────────────────────────────
const Shot: React.FC<{src: string; localFrame: number; h?: number; dx?: number; dy?: number; toScale?: number; isVideo?: boolean; objectPosition?: string}> = (
  {src, localFrame: f, h = 440, dx = 0, dy = 0, toScale = 1.07, isVideo = false, objectPosition = 'top center'}
) => {
  const scale = interpolate(f, [0, 300], [1.00, toScale], clamp);
  const x = interpolate(f, [0, 300], [0, dx], clamp);
  const y = interpolate(f, [0, 300], [0, dy], clamp);
  const assetPath = isVideo ? `assets/live-clips/${src}` : src;
  return (
    <div style={{height:h, overflow:'hidden', background:'#EDF4FA'}}>
      <div style={{
        width:'100%', height:'100%',
        transform:`translate(${x}px,${y}px) scale(${scale})`,
        transformOrigin:'top center',
      }}>
        {isVideo ? (
          <OffthreadVideo
            src={staticFile(assetPath)}
            muted
            style={{width:'100%', height:'100%', objectFit:'cover', objectPosition}}
          />
        ) : (
          <Img
            src={staticFile(assetPath)}
            style={{width:'100%', height:'100%', objectFit:'cover', objectPosition}}
          />
        )}
      </div>
    </div>
  );
};

// ── Placeholder image box ─────────────────────────────────────────────────
const PlaceholderShot: React.FC<{label: string; h?: number}> = ({label, h = 200}) => (
  <div style={{
    height:h, background:'rgba(92,163,235,.06)',
    border:`2px dashed ${brandLightBlue}55`,
    borderRadius:16, display:'flex', flexDirection:'column',
    alignItems:'center', justifyContent:'center', gap:12,
  }}>
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="2" y="8" width="40" height="28" rx="5" stroke={brandLightBlue} strokeWidth="2.5" strokeDasharray="5 3"/>
      <circle cx="22" cy="22" r="6" stroke={brandLightBlue} strokeWidth="2.5"/>
      <path d="M2 18 l8-6 6 8 6-5 8 6" stroke={brandLightBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <div style={{color:brandLightBlue, fontSize:16, fontWeight:700, textAlign:'center', opacity:.8}}>{label}</div>
  </div>
);

// ── Proof pill badge ──────────────────────────────────────────────────────
const Pill: React.FC<{label: string; color: string}> = ({label, color}) => (
  <span style={{
    background:`${color}22`, border:`1px solid ${color}66`, borderRadius:999,
    padding:'7px 16px', color, fontWeight:900, fontSize:14, letterSpacing:2,
    textTransform:'uppercase', display:'inline-block',
  }}>
    {label}
  </span>
);

// ══════════════════════════════════════════════════════════════════════════
// SCENE 1 — HOOK (frames 0–180, 6 s)
// ══════════════════════════════════════════════════════════════════════════
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const op = fadeScene(frame, 0, 240);
  const titleY = interpolate(frame, [0, 50], [40, 0], clamp);
  const titleOp = interpolate(frame, [0, 38], [0, 1], clamp);
  const subOp = interpolate(frame, [42, 72], [0, 1], clamp);

  const assets = [
    {label:'Service Lines', color:brandLightBlue, delay:55},
    {label:'Water Mains', color:green, delay:68},
    {label:'Goosenecks', color:brandSand, delay:81},
    {label:'Valves', color:orange, delay:94},
    {label:'Hydrants', color:`#C47AE8`, delay:107},
  ];

  return (
    <AbsoluteFill style={{opacity: op}}>
      {/* Decorative pipe arc */}
      <svg style={{position:'absolute', inset:0, width:1280, height:720, opacity:.14}} viewBox="0 0 1280 720">
        <path d="M100 360 Q320 200 640 340 Q960 480 1180 340" stroke={brandLightBlue} strokeWidth="2.5" fill="none" strokeDasharray="10 10"/>
        <path d="M100 430 Q320 570 640 420 Q960 270 1180 430" stroke={green} strokeWidth="2" fill="none" strokeDasharray="8 14"/>
        {[130, 320, 510, 700, 870, 1060, 1140].map((x, i) => (
          <circle key={x} cx={x} cy={360 + Math.sin(i * 1.1) * 80} r={5 + (i % 3) * 3}
            fill={[brandLightBlue, green, brandSand][i % 3]} opacity={.8}/>
        ))}
      </svg>

      <div style={{
        position:'absolute', top:'50%', left:82,
        transform:`translateY(calc(-50% + ${titleY}px))`,
        width:830, opacity:titleOp,
      }}>
        <div style={{fontSize:15, letterSpacing:4, textTransform:'uppercase', color:brandLightBlue, fontWeight:900, marginBottom:20}}>
          AI-Powered Water Infrastructure Platform
        </div>
        <div style={{fontSize:72, lineHeight:.96, fontWeight:950, letterSpacing:-4, color:white}}>
          The confidence<br />to decide —<br />
          <span style={{color:brandLightBlue}}>every distribution</span><br/>asset, every year.
        </div>
        <div style={{marginTop:28, fontSize:23, color:muted, opacity:subOp, lineHeight:1.45}}>
          Not a one-time report. Not a spreadsheet.<br/>
          A platform that gives your utility confidence<br/>
          for every infrastructure decision — for years.
        </div>
      </div>

      {/* Right: asset type list */}
      <div style={{position:'absolute', right:72, top:'50%', transform:'translateY(-50%)', display:'grid', gap:13, width:258}}>
        {assets.map(({label, color, delay}) => (
          <div key={label} style={{
            opacity: interpolate(frame, [delay, delay + 20], [0, 1], clamp),
            transform: `translateX(${slideIn(frame, delay)}px)`,
            background:'rgba(255,255,255,.08)', border:`1px solid ${color}44`,
            borderRadius:16, padding:'14px 20px',
            color:white, fontSize:19, fontWeight:800,
          }}>
            <span style={{color, marginRight:10}}>●</span>{label}
          </div>
        ))}
      </div>

      <div style={{position:'absolute', top:52, left:68}}><BCLogo /></div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// SCENE 2 — COMPLIANCE (frames 170–420, 8.3 s)
// ══════════════════════════════════════════════════════════════════════════
const SceneCompliance: React.FC = () => {
  const frame = useCurrentFrame();
  const start = 210;
  const f = frame - start;
  const op = fadeScene(frame, start, 560);
  const ph1S = appear(f, 22);
  const ph2S = appear(f, 38);

  return (
    <AbsoluteFill style={{opacity:op, padding:'58px 70px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:28}}>
        <div>
          <BCLogo compact />
          <div style={{marginTop:18, fontSize:52, fontWeight:750, letterSpacing:-2.5, color:white, lineHeight:1.0}}>
            From compliance to<br/>smart decision making.
          </div>
          <div style={{fontSize:22, color:muted, marginTop:14, lineHeight:1.45}}>
            LCRI · Nov 2027 requires your inventory and replacement plan.<br/>
            <span style={{color:brandSand, fontWeight:750}}>That's the start — not the end.</span>
          </div>
        </div>
        <div style={{
          background:`${brandSand}18`, border:`1px solid ${brandSand}55`,
          borderRadius:18, padding:'16px 22px', textAlign:'center', flexShrink:0,
          transform:`scale(${appear(f, 8)})`,
        }}>
          <div style={{fontSize:12, color:muted, letterSpacing:2.5, textTransform:'uppercase'}}>Deadline</div>
          <div style={{fontSize:38, fontWeight:750, color:brandSand, lineHeight:1}}>Nov 2027</div>
          <div style={{fontSize:13, color:muted, marginTop:4}}>LCRR / LCRI</div>
        </div>
      </div>

      <div style={{display:'flex', gap:22}}>
        <div style={{flex:1, transform:`scale(${ph1S})`, transformOrigin:'left top'}}>
          <Chrome url="app.blueconduit.com · SL Hub">
            <Sequence from={start + 10} durationInFrames={300} layout="none">
              <Shot src="v2_01_inventory_compliance_0013_0024.mp4" isVideo localFrame={f} h={308} objectPosition="center 18%" />
            </Sequence>
          </Chrome>
        </div>
        <div style={{flex:1, transform:`scale(${ph2S})`, transformOrigin:'right top'}}>
          <Chrome url="app.blueconduit.com · Compliance Manager">
            <Sequence from={start + 20} durationInFrames={300} layout="none">
              <Shot src="v3_compliance_report_0303_0312.mp4" isVideo localFrame={f} h={308} objectPosition="center 10%" />
            </Sequence>
          </Chrome>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// SCENE 3 — ENGINE REVEAL (frames 400–570, 5.7 s)
// ══════════════════════════════════════════════════════════════════════════
const ENGINE = [
  {key:'Predict', color:brandLightBlue, desc:'AI ranks every asset by risk'},
  {key:'Explain', color:green, desc:'Every score is justified by quantitative data'},
  {key:'Plan', color:brandSand, desc:'Dispatch-ready priority plans'},
  {key:'Update', color:orange, desc:'Field data improves models'},
];

const SceneEngine: React.FC = () => {
  const frame = useCurrentFrame();
  const start = 530;
  const f = frame - start;
  const op = fadeScene(frame, start, 760);

  return (
    <AbsoluteFill style={{opacity:op}}>
      <div style={{
        position:'absolute', top:'50%', left:'50%',
        transform:'translate(-50%,-50%)',
        textAlign:'center', width:1160,
      }}>
        <div style={{
          fontSize:17, letterSpacing:4, textTransform:'uppercase', color:brandLightBlue,
          fontWeight:900, marginBottom:18,
          transform:`scale(${appear(f, 0)})`,
        }}>
          An Ongoing Decision Engine
        </div>
        <div style={{fontSize:60, fontWeight:950, letterSpacing:-3.5, color:white, marginBottom:48}}>
          Predict · Explain · Plan · Update
        </div>

        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          {ENGINE.map(({key, color, desc}, i) => {
            const s = appear(f, 28 + i * 16);
            const last = i === ENGINE.length - 1;
            return (
              <React.Fragment key={key}>
                <div style={{
                  transform:`scale(${s})`,
                  background:'rgba(255,255,255,.08)', border:`2px solid ${color}55`,
                  borderRadius:26, padding:'28px 22px', width:196, textAlign:'center',
                }}>
                  <div style={{fontSize:32, fontWeight:950, color, marginBottom:10}}>{key}</div>
                  <div style={{fontSize:15, color:muted, lineHeight:1.4}}>{desc}</div>
                </div>
                {!last && (
                  <div style={{
                    fontSize:30, color:muted, padding:'0 6px',
                    opacity: interpolate(f, [44+i*16, 62+i*16], [0, 1], clamp),
                    transform:`translateX(${interpolate(appear(f, 40+i*16),[0,1],[16,0])}px)`,
                    flexShrink:0,
                  }}>→</div>
                )}
              </React.Fragment>
            );
          })}
          <div style={{fontSize:24, color:muted, padding:'0 6px', opacity:interpolate(f,[85,105],[0,1],clamp)}}>⟳</div>
        </div>

        <div style={{marginTop:38, fontSize:20, color:muted, opacity:interpolate(f,[80,105],[0,1],clamp)}}>
          The engine runs every update cycle — not once at project end.
          Confidence compounds year over year.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// SCENE 4 — SMART / PREDICT (frames 550–810, 8.7 s)
// ══════════════════════════════════════════════════════════════════════════
const ScenePredict: React.FC = () => {
  const frame = useCurrentFrame();
  const start = 730;
  const f = frame - start;
  const op = fadeScene(frame, start, 1060);
  const screenS = interpolate(appear(f, 16), [0, 1], [0.80, 0.81]);

  const bullets = [
    {text:'Methods developed from experience across 100s of utilities', color:brandLightBlue, delay:25},
    {text:'Models fully optimized to adapt to your water system\'s data', color:green, delay:38},
    {text:'Identify Unknown SLs to investigate, saving millions in dig costs', color:brandSand, delay:51},
    {text:'Water main failure accuracy validated on real outcomes', color:orange, delay:64},
  ];

  return (
    <AbsoluteFill style={{opacity:op, padding:'60px 70px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20}}>
        <div>
          <BCLogo compact />
          <div style={{marginTop:16}}><Pill label="Smart" color={brandLightBlue} /></div>
          <div style={{marginTop:14, fontSize:50, fontWeight:950, letterSpacing:-2.5, color:white, lineHeight:1.0}}>
            Predict which assets are at risk.
          </div>
          <div style={{fontSize:21, color:muted, marginTop:12, lineHeight:1.45}}>
            Our AI models rank every service line and water main<br/>
            by risk — updated every cycle as field data comes in.
          </div>
        </div>
      </div>

      <div style={{display:'flex', gap:26, alignItems:'flex-start'}}>
        <div style={{flex:1, transform:`scale(${screenS})`, transformOrigin:'left top'}}>
          <Chrome url="app.blueconduit.com · Predictions">
            <Sequence from={start + 15} durationInFrames={300} layout="none">
              <Shot src="v3_02_prediction_risk_map_0141_0159.mp4" isVideo localFrame={f} dx={-6} dy={-8} h={418} objectPosition="center 15%" />
            </Sequence>
          </Chrome>
        </div>

        <div style={{display:'grid', gap:13, width:290}}>
          {bullets.map(({text, color, delay}) => (
            <div key={text} style={{
              opacity:interpolate(f, [delay, delay+20], [0,1], clamp),
              transform:`translateX(${slideIn(f, delay)}px)`,
              background:'rgba(255,255,255,.08)', border:`1px solid ${color}40`,
              borderRadius:16, padding:'14px 16px',
              color:white, fontSize:16, fontWeight:700, lineHeight:1.35,
            }}>
              <span style={{color, marginRight:10}}>✓</span>{text}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// SCENE 5 — DEFENSIBLE / EXPLAIN (frames 790–1000, 7 s)
// ══════════════════════════════════════════════════════════════════════════
const SceneExplain: React.FC = () => {
  const frame = useCurrentFrame();
  const start = 1030;
  const f = frame - start;
  const op = fadeScene(frame, start, 1360);
  const screenS = interpolate(appear(f, 16), [0, 1], [0.80, 0.81]);

  const factors = [
    {factor:'Pipe size impact', weight:'40%', color:brandLightBlue, delay:24},
    {factor:'Medical facility proximity', weight:'30%', color:green, delay:37},
    {factor:'Educational proximity', weight:'20%', color:brandSand, delay:50},
    {factor:'Age of installation', weight:'10%', color:orange, delay:63},
  ];

  return (
    <AbsoluteFill style={{opacity:op, padding:'60px 70px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20}}>
        <div>
          <BCLogo compact />
          <div style={{marginTop:16}}><Pill label="Defensible" color={green} /></div>
          <div style={{marginTop:14, fontSize:50, fontWeight:950, letterSpacing:-2.5, color:white, lineHeight:1.0}}>
            Every decision comes with the why.
          </div>
          <div style={{fontSize:21, color:muted, marginTop:12, lineHeight:1.45}}>
            Defend every prioritization to your state regulator,<br/>
            your board, and your customers — with confidence.
          </div>
        </div>
      </div>

      <div style={{display:'flex', gap:26, alignItems:'flex-start'}}>
        <div style={{flex:1, transform:`scale(${screenS})`, transformOrigin:'left top'}}>
          <Chrome url="app.blueconduit.com · Mains Hub — Risk & Predictions">
            <Sequence from={start + 15} durationInFrames={300} layout="none">
              <Shot src="v2_03_water_main_explain_0348_0355.mp4" isVideo localFrame={f} dy={-12} h={418} objectPosition="center 12%" />
            </Sequence>
          </Chrome>
        </div>
        <div style={{display:'grid', gap:13, width:290}}>
          <div style={{color:white, fontSize:18, fontWeight:900, marginBottom:2}}>Scored because:</div>
          {factors.map(({factor, weight, color, delay}) => (
            <div key={factor} style={{
              opacity:interpolate(f, [delay, delay+20], [0,1], clamp),
              transform:`translateX(${slideIn(f, delay)}px)`,
              background:'rgba(255,255,255,.08)', border:`1px solid ${color}44`,
              borderRadius:16, padding:'12px 15px',
            }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{color:white, fontWeight:700, fontSize:15}}>{factor}</div>
                <div style={{color, fontWeight:950, fontSize:20}}>{weight}</div>
              </div>
              <div style={{height:5, background:'rgba(255,255,255,.12)', borderRadius:99, marginTop:7, overflow:'hidden'}}>
                <div style={{height:'100%', width:weight, background:color, borderRadius:99}} />
              </div>
            </div>
          ))}
          <div style={{opacity:interpolate(f,[80,100],[0,1],clamp), color:muted, fontSize:14, marginTop:2, lineHeight:1.5}}>
            Factor breakdown visible for every asset —<br/>not a black box.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// SCENE 6 — CLEAR / PLAN (frames 980–1210, 7.7 s)
// ══════════════════════════════════════════════════════════════════════════
const ScenePlan: React.FC = () => {
  const frame = useCurrentFrame();
  const start = 1330;
  const f = frame - start;
  const op = fadeScene(frame, start, 1660);
  const screenS = interpolate(appear(f, 16), [0, 1], [0.82, 0.83]);

  const stats = [
    {value:'Heat-ranked', label:'Priority by block', color:orange, delay:20},
    {value:'$2.9M', label:'Budget-aware planning', color:brandLightBlue, delay:33},
    {value:'36 segs', label:'In current plan', color:green, delay:46},
    {value:'41%', label:'Dig-once savings found', color:brandSand, delay:59},
  ];

  return (
    <AbsoluteFill style={{opacity:op, padding:'60px 70px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20}}>
        <div>
          <BCLogo compact />
          <div style={{marginTop:16}}><Pill label="Clear" color={brandSand} /></div>
          <div style={{marginTop:14, fontSize:50, fontWeight:950, letterSpacing:-2.5, color:white, lineHeight:1.0}}>
            Prioritized action plans — not PDFs.
          </div>
          <div style={{fontSize:21, color:muted, marginTop:12, lineHeight:1.45}}>
            Heat-mapped priorities, budget controls, and dispatch-ready<br/>
            plans that integrate with your GIS and work orders.
          </div>
        </div>
      </div>

      <div style={{display:'flex', gap:26, alignItems:'flex-start'}}>
        <div style={{flex:1, transform:`scale(${screenS})`, transformOrigin:'left top'}}>
          <Chrome url="app.blueconduit.com · Planner — Workspace">
            <Sequence from={start + 15} durationInFrames={300} layout="none">
              <Shot src="05_planner_selected_areas_1127_1148.mp4" isVideo localFrame={f} dx={-8} dy={-6} h={418} objectPosition="center 18%" />
            </Sequence>
          </Chrome>
        </div>
        <div style={{display:'grid', gap:14, width:260}}>
          {stats.map(({value, label, color, delay}) => (
            <div key={label} style={{
              transform:`scale(${appear(f, delay)})`,
              background:'rgba(255,255,255,.09)', border:`1px solid ${color}44`,
              borderRadius:18, padding:'16px 20px',
            }}>
              <div style={{fontSize:30, fontWeight:950, color}}>{value}</div>
              <div style={{fontSize:14, color:muted, marginTop:4}}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// SCENE 7 — DECISION MENU (frames 1190–1450, 8.7 s)
// ══════════════════════════════════════════════════════════════════════════
const SL_ITEMS = [
  {n:'1', title:'Lead Service Lines', desc:'Predictive lead classification for every service line, with or without records.'},
  {n:'2', title:'Resolving Unknowns without digging', desc:'Identifies which unknown lines are most likely to contain lead. Prioritizes investigation.'},
  {n:'3', title:'Galvanized lines and goosenecks', desc:'Scores which galvanized lines are most likely needing replacement. Finding goosenecks. Not all carry the same risk.'},
  {n:'4', title:'Lead Replacement Plan', desc:'Structured inventory and multi-year replacement plan. Defensible to any state regulator.'},
];

const MAINS_ITEMS = [
  {n:'1', title:'Risk Assessment', desc:'LOF and COF scores for every main. Finds first-time breaks a basic model misses.'},
  {n:'2', title:'CIP Planning', desc:'Risk-ranked replacement list. Multi-year budget scenarios. Defensible to council.'},
  {n:'3', title:'Proactive vs. Reactive Approach', desc:'Stops the emergency break cycle. Every decision backed by a score, not a gut call.'},
  {n:'4', title:'Maintenance', desc:'Priority scoring per segment. Coordinates with road projects. Reduces non-revenue water loss.'},
];

const MenuItem: React.FC<{n: string; title: string; desc: string; color: string; f: number; delay: number}> = ({n, title, desc, color, f, delay}) => (
  <div style={{
    opacity:interpolate(f,[delay, delay+18],[0,1],clamp),
    transform:`translateY(${interpolate(appear(f,delay),[0,1],[14,0])}px)`,
    marginBottom:10,
  }}>
    <div style={{display:'flex', alignItems:'baseline', gap:8, marginBottom:3}}>
      <span style={{fontSize:13, fontWeight:900, color, opacity:.8}}>{n}.</span>
      <span style={{fontSize:16, fontWeight:900, color:white}}>{title}</span>
    </div>
    <div style={{fontSize:13, color:muted, lineHeight:1.4, paddingLeft:20}}>{desc}</div>
  </div>
);

const SceneDecisionMenu: React.FC = () => {
  const frame = useCurrentFrame();
  const start = 1930;
  const f = frame - start;
  const op = fadeScene(frame, start, 2260);

  return (
    <AbsoluteFill style={{opacity:op, padding:'46px 62px'}}>
      {/* Header */}
      <div style={{textAlign:'center', marginBottom:24}}>
        <div style={{display:'flex', justifyContent:'center', marginBottom:12}}><BCLogo compact /></div>
        <div style={{fontSize:40, fontWeight:950, letterSpacing:-2, color:white, lineHeight:1.05,
          transform:`scale(${appear(f,0)})`,
        }}>
          BlueConduit: The Decision Menu
        </div>
        <div style={{fontSize:18, color:muted, marginTop:8, opacity:interpolate(f,[18,38],[0,1],clamp)}}>
          Where do you want to start? Pick a challenge and let's talk.
        </div>
      </div>

      {/* Two-column table */}
      <div style={{display:'flex', gap:20}}>
        {/* Left column — Service Lines */}
        <div style={{
          flex:1, background:'rgba(92,163,235,.07)', border:`1px solid ${brandLightBlue}33`,
          borderRadius:22, padding:'20px 22px',
          transform:`translateY(${interpolate(appear(f,20),[0,1],[20,0])}px)`,
          opacity:interpolate(f,[20,40],[0,1],clamp),
        }}>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:12, letterSpacing:2.5, fontWeight:900, color:brandLightBlue, textTransform:'uppercase'}}>
              Service Lines
            </div>
            <div style={{fontSize:12, color:muted, marginTop:2}}>Compliance + beyond</div>
          </div>
          {SL_ITEMS.map((item, i) => (
            <MenuItem key={item.n} {...item} color={brandLightBlue} f={f} delay={34+i*14} />
          ))}
        </div>

        {/* Right column — Water Mains */}
        <div style={{
          flex:1, background:'rgba(63,185,80,.07)', border:`1px solid ${green}33`,
          borderRadius:22, padding:'20px 22px',
          transform:`translateY(${interpolate(appear(f,30),[0,1],[20,0])}px)`,
          opacity:interpolate(f,[30,50],[0,1],clamp),
        }}>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:12, letterSpacing:2.5, fontWeight:900, color:green, textTransform:'uppercase'}}>
              Water Mains
            </div>
            <div style={{fontSize:12, color:muted, marginTop:2}}>Capital savings through predictive intelligence</div>
          </div>
          {MAINS_ITEMS.map((item, i) => (
            <MenuItem key={item.n} {...item} color={green} f={f} delay={44+i*14} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// SCENE 8 — CLOSE (frames 1430–1650, 7.3 s)
// ══════════════════════════════════════════════════════════════════════════
const SceneUpdate: React.FC = () => {
  const frame = useCurrentFrame();
  const start = 1630;
  const f = frame - start;
  const op = fadeScene(frame, start, 1960);
  const screenS = interpolate(appear(f, 16), [0, 1], [0.80, 0.81]);

  const items = [
    {t:'Field verification', sub:'Survey data loops back to models', color:orange, delay:22},
    {t:'Continuous learning', sub:'Map updates as assets are resolved', color:brandLightBlue, delay:35},
  ];

  return (
    <AbsoluteFill style={{opacity:op, padding:'60px 70px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20}}>
        <div>
          <BCLogo compact />
          <div style={{marginTop:16}}><Pill label="Update" color={orange} /></div>
          <div style={{marginTop:14, fontSize:50, fontWeight:750, letterSpacing:-2.5, color:white, lineHeight:1.0}}>
            Infrastructure data stays alive.
          </div>
          <div style={{fontSize:21, color:muted, marginTop:12, lineHeight:1.45}}>
            Field outcomes shouldn't just sit in a folder.<br/>
            Sync findings back to the engine to improve next year's scores.
          </div>
        </div>
      </div>
      <div style={{display:'flex', gap:26, alignItems:'flex-start'}}>
        <div style={{flex:1, transform:`scale(${screenS})`, transformOrigin:'left top'}}>
          <Chrome url="app.blueconduit.com · SL Hub — Edit Record">
            <Sequence from={start + 15} durationInFrames={400} layout="none">
              <Shot src="v3_update_operational_0240.mp4" isVideo localFrame={f} h={418} objectPosition="center 20%" />
            </Sequence>
          </Chrome>
        </div>
        <div style={{display:'grid', gap:16, width:290}}>
          {items.map(({t, sub, color, delay}) => (
            <div key={t} style={{
              opacity:interpolate(f,[delay, delay+20],[0,1],clamp),
              background:'rgba(255,255,255,.08)', border:`1px solid ${color}44`,
              borderRadius:22, padding:'18px 20px',
            }}>
              <div style={{fontSize:22, fontWeight:750, color}}>{t}</div>
              <div style={{fontSize:14, color:muted, marginTop:5, lineHeight:1.4}}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneClose: React.FC = () => {
  const frame = useCurrentFrame();
  const start = 2230;
  const f = frame - start;
  const op = fadeScene(frame, start, 2550);
  const titleY = interpolate(f, [0, 50], [36, 0], clamp);
  const titleOp = interpolate(f, [0, 40], [0, 1], clamp);

  const proofs = [
    {label:'Smart', sub:'Predictive AI that evolves with every field update', color:brandLightBlue, delay:50},
    {label:'Defensible', sub:'Every score has a traceable reason', color:green, delay:65},
    {label:'Clear', sub:'Dispatch-ready plans, not 22-page PDFs', color:brandSand, delay:80},
  ];

  return (
    <AbsoluteFill style={{opacity:op}}>
      <div style={{position:'absolute', top:52, left:68}}><BCLogo /></div>

      <div style={{
        position:'absolute', top:'50%', left:82,
        transform:`translateY(calc(-50% + ${titleY}px))`,
        width:830, opacity:titleOp,
      }}>
        <div style={{fontSize:15, color:brandLightBlue, fontWeight:900, letterSpacing:3, textTransform:'uppercase', marginBottom:20}}>
          The bottom line
        </div>
        <div style={{fontSize:48, lineHeight:1.06, fontWeight:950, letterSpacing:-2.5, color:white}}>
          The tool enabling your water system for full LCRR/LCRI compliance becomes the engine saving money across your water distribution assets.
        </div>
        <div style={{marginTop:30, fontSize:22, color:muted, lineHeight:1.5, opacity:interpolate(f,[50,78],[0,1],clamp)}}>
          Smart predictions. Defensible decisions. Clear action plans.<br/>
          For every pipe. Every asset. Every year.
        </div>
        <div style={{marginTop:24, fontSize:20, color:brandLightBlue, fontWeight:900, opacity:interpolate(f,[80,100],[0,1],clamp)}}>
          blueconduit.com
        </div>
      </div>

      {/* Proof pillars */}
      <div style={{position:'absolute', right:72, top:'50%', transform:'translateY(-50%)', display:'grid', gap:16, width:288}}>
        {proofs.map(({label, sub, color, delay}) => (
          <div key={label} style={{
            opacity:interpolate(f,[delay, delay+20],[0,1],clamp),
            transform:`translateX(${slideIn(f, delay)}px)`,
            background:`${color}18`, border:`1px solid ${color}66`,
            borderRadius:22, padding:'20px 22px',
          }}>
            <div style={{fontSize:26, fontWeight:950, color}}>{label}</div>
            <div style={{fontSize:14, color:muted, marginTop:5, lineHeight:1.4}}>{sub}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// ROOT COMPOSITION
// ══════════════════════════════════════════════════════════════════════════
export const DecisionEngineDemo2026: React.FC = () => (
  <AbsoluteFill style={{fontFamily:'Inter, Avenir Next, Helvetica Neue, Arial, sans-serif'}}>
    <Background />
    <SceneHook />
    <SceneCompliance />
    <SceneEngine />
    <ScenePredict />
    <SceneExplain />
    <ScenePlan />
    <SceneUpdate />
    <SceneDecisionMenu />
    <SceneClose />
  </AbsoluteFill>
);
