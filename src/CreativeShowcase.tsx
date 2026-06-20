import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';

const W = 1280;
const H = 720;
const fps = 30;
const navy = '#07182D';
const ink = '#0B1F3A';
const blue = '#1F77B4';
const cyan = '#49C6E5';
const green = '#3FB950';
const yellow = '#F2C94C';
const orange = '#FF9F1C';
const coral = '#FF5F57';
const purple = '#8B5CF6';
const white = '#F7FBFF';
const muted = '#A9B9CC';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const local = (frame: number, start: number) => frame - start;
const appear = (f: number, d = 0) => spring({frame: f - d, fps, config: {damping: 16, stiffness: 120}});
const fadeScene = (frame: number, start: number, end: number) => interpolate(frame, [start, start + 18, end - 20, end], [0, 1, 1, 0], clamp);
const ease = (f: number, input: [number, number], output: [number, number]) => interpolate(f, input, output, {...clamp, easing: (t) => 1 - Math.pow(1 - t, 3)});

const Logo = ({dark = false}: {dark?: boolean}) => <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
  <div style={{width: 42, height: 42, borderRadius: 13, background: `linear-gradient(135deg, ${blue}, ${cyan})`, position: 'relative', boxShadow: '0 15px 38px rgba(73,198,229,.28)'}}>
    <i style={{position: 'absolute', width: 8, height: 8, borderRadius: 99, background: white, left: 9, top: 9}} />
    <i style={{position: 'absolute', width: 8, height: 8, borderRadius: 99, background: white, right: 9, top: 11}} />
    <i style={{position: 'absolute', width: 8, height: 8, borderRadius: 99, background: white, left: 18, bottom: 9}} />
    <i style={{position: 'absolute', height: 3, width: 23, background: white, left: 10, top: 16, transform: 'rotate(8deg)'}} />
    <i style={{position: 'absolute', height: 3, width: 20, background: white, left: 15, top: 25, transform: 'rotate(-30deg)'}} />
  </div>
  <b style={{fontSize: 28, letterSpacing: -1, color: dark ? ink : white}}>BlueConduit</b>
</div>;

const Shell = ({children, light = false}: {children: React.ReactNode; light?: boolean}) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{fontFamily: 'Inter, Avenir Next, Helvetica Neue, Arial, sans-serif', background: light ? '#F4F8FC' : `radial-gradient(circle at 75% 12%, rgba(73,198,229,.28), transparent 30%), radial-gradient(circle at 12% 85%, rgba(63,185,80,.18), transparent 32%), linear-gradient(135deg, #061426, ${navy})`, overflow: 'hidden'}}>
    {!light && <div style={{position: 'absolute', inset: 0, opacity: .12, backgroundImage: 'linear-gradient(rgba(255,255,255,.17) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.17) 1px, transparent 1px)', backgroundSize: '42px 42px', transform: `translate(${Math.sin(f / 90) * 18}px, ${Math.cos(f / 120) * 14}px)`}} />}
    {children}
  </AbsoluteFill>;
};

const SceneLabel = ({n, title, dark = false}: {n: string; title: string; dark?: boolean}) => <div style={{position: 'absolute', top: 38, right: 54, color: dark ? '#52657A' : muted, fontSize: 16, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 900}}>{n} / {title}</div>;

const TitleScene = ({start, end}: {start: number; end: number}) => {
  const frame = useCurrentFrame(); const f = local(frame, start);
  return <AbsoluteFill style={{opacity: fadeScene(frame, start, end)}}><Shell>
    <div style={{position: 'absolute', top: 58, left: 70}}><Logo /></div>
    <div style={{position: 'absolute', left: 82, top: 188, width: 880}}>
      <div style={{fontSize: 92, lineHeight: .88, color: white, fontWeight: 950, letterSpacing: -6, transform: `translateY(${ease(f, [0, 50], [50, 0])}px)`, opacity: interpolate(f, [0, 36], [0, 1], clamp)}}>Visualization directions for a better demo.</div>
      <div style={{marginTop: 32, color: '#DDEBFA', fontSize: 28, width: 680, lineHeight: 1.25, opacity: interpolate(f, [38, 78], [0, 1], clamp)}}>A rough creative reel: different ways BlueConduit could explain uncertainty, prioritization, and action.</div>
    </div>
    <div style={{position: 'absolute', right: 80, bottom: 70, color: cyan, fontSize: 24, fontWeight: 900}}>Silent loop / conference booth / pick-and-choose</div>
  </Shell></AbsoluteFill>;
};

const MessyToClean = ({start, end}: {start: number; end: number}) => {
  const frame = useCurrentFrame(); const f = local(frame, start);
  const files = ['Tap card scan', 'Parcel CSV', 'Meter install', 'Work order', 'Inspection PDF', 'GIS layer', 'Notes', 'Permit'];
  return <AbsoluteFill style={{opacity: fadeScene(frame, start, end)}}><Shell>
    <div style={{position: 'absolute', top: 52, left: 64}}><Logo /></div><SceneLabel n="01" title="Messy records become signal" />
    <div style={{position: 'absolute', left: 70, top: 150, color: white, fontWeight: 950, fontSize: 54, letterSpacing: -2}}>Messy municipal records</div>
    {files.map((name, i) => {
      const x0 = 70 + (i % 4) * 160; const y0 = 250 + Math.floor(i / 4) * 135;
      const p = appear(f, i * 6); const tx = interpolate(f, [65, 155], [0, 515 - x0 + (i % 2) * 25], clamp); const ty = interpolate(f, [65, 155], [0, 355 - y0 + (i - 4) * 12], clamp);
      return <div key={name} style={{position: 'absolute', left: x0, top: y0, width: 132, height: 92, borderRadius: 16, background: 'rgba(255,255,255,.10)', border: '1px solid rgba(255,255,255,.18)', transform: `translate(${tx}px, ${ty}px) rotate(${interpolate(f, [0, 120], [i % 2 ? -5 : 4, 0], clamp)}deg) scale(${p})`, color: white, padding: 14, fontWeight: 900, boxShadow: '0 20px 60px rgba(0,0,0,.18)'}}><div style={{fontSize: 26}}>▦</div><div style={{fontSize: 15, marginTop: 10}}>{name}</div></div>;
    })}
    <div style={{position: 'absolute', right: 92, top: 190, width: 400, height: 390, borderRadius: 34, background: 'rgba(255,255,255,.95)', boxShadow: '0 38px 100px rgba(0,0,0,.35)', padding: 28, color: ink, opacity: interpolate(f, [110, 150], [0, 1], clamp)}}>
      <b style={{fontSize: 28}}>Unified service-line record</b>
      {['Address matched', 'Material inferred', 'Confidence scored', 'Field task created'].map((t, i) => <div key={t} style={{marginTop: 24, display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, fontWeight: 850, opacity: interpolate(f, [145 + i * 14, 165 + i * 14], [0, 1], clamp)}}><span style={{color: green, fontSize: 30}}>✓</span>{t}</div>)}
    </div>
  </Shell></AbsoluteFill>;
};

const DataRiver = ({start, end}: {start: number; end: number}) => {
  const frame = useCurrentFrame(); const f = local(frame, start);
  return <AbsoluteFill style={{opacity: fadeScene(frame, start, end)}}><Shell>
    <div style={{position: 'absolute', top: 52, left: 64}}><Logo /></div><SceneLabel n="02" title="Data river" />
    <div style={{position: 'absolute', left: 70, top: 135, color: white, fontWeight: 950, fontSize: 56, letterSpacing: -2}}>Show the data flow.</div>
    <svg style={{position: 'absolute', left: 0, top: 215}} width={W} height={430} viewBox={`0 0 ${W} 430`}>
      {[0, 1, 2].map((j) => <path key={j} d={`M-60 ${92 + j * 78} C220 ${10 + j * 45} 370 ${230 - j * 30} 610 ${128 + j * 60} S1030 ${50 + j * 95} 1350 ${130 + j * 52}`} fill="none" stroke={[cyan, green, yellow][j]} strokeWidth={j === 1 ? 28 : 18} strokeOpacity={.22} />)}
      {Array.from({length: 46}).map((_, i) => {
        const t = ((f * (1.1 + (i % 5) * .08) + i * 37) % 1180) - 40;
        const y = 104 + Math.sin((t + i * 20) / 85) * 75 + (i % 3) * 74;
        const c = [cyan, green, yellow, coral][i % 4];
        return <circle key={i} cx={t} cy={y} r={5 + (i % 4) * 2} fill={c} opacity={.35 + (i % 4) * .13} />;
      })}
    </svg>
    <div style={{position: 'absolute', right: 76, top: 250, width: 360, borderRadius: 30, background: 'rgba(5,14,27,.78)', border: '1px solid rgba(255,255,255,.16)', padding: 26}}>
      {['ingest', 'match', 'score', 'plan'].map((t, i) => <div key={t} style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22, color: white, fontSize: 26, fontWeight: 900, opacity: interpolate(f, [30 + i * 24, 60 + i * 24], [.2, 1], clamp)}}><span style={{width: 42, height: 42, borderRadius: 99, background: [cyan, green, yellow, coral][i], color: ink, display: 'grid', placeItems: 'center'}}>{i+1}</span>{t}</div>)}
    </div>
  </Shell></AbsoluteFill>;
};

const RiskConstellation = ({start, end}: {start: number; end: number}) => {
  const frame = useCurrentFrame(); const f = local(frame, start);
  const pts = Array.from({length: 36}).map((_, i) => ({x: 180 + ((i * 137) % 760), y: 170 + ((i * 83) % 380), r: (i * 47) % 100}));
  return <AbsoluteFill style={{opacity: fadeScene(frame, start, end)}}><Shell light>
    <div style={{position: 'absolute', top: 52, left: 64}}><Logo dark /></div><SceneLabel n="03" title="Risk constellation" dark />
    <div style={{position: 'absolute', left: 70, top: 130, color: ink, fontWeight: 950, fontSize: 54, letterSpacing: -2}}>Uncertainty has shape.</div>
    <svg style={{position: 'absolute', left: 0, top: 0}} width={W} height={H}>
      {pts.slice(0, 22).map((p, i) => <line key={i} x1={p.x} y1={p.y} x2={pts[(i * 7 + 5) % pts.length].x} y2={pts[(i * 7 + 5) % pts.length].y} stroke="#AFC6D8" strokeWidth="2" opacity={interpolate(f, [20, 90], [0, .35], clamp)} />)}
      {pts.map((p, i) => {
        const risk = p.r; const color = risk > 70 ? coral : risk > 42 ? yellow : green; const s = appear(f, i * 3);
        return <g key={i} transform={`translate(${p.x}, ${p.y}) scale(${s})`}><circle r={10 + risk / 8} fill={color} opacity={.16}/><circle r={5 + risk / 26} fill={color}/></g>;
      })}
    </svg>
    <div style={{position: 'absolute', right: 88, top: 216, width: 335, background: 'white', borderRadius: 28, padding: 26, boxShadow: '0 30px 80px rgba(11,31,58,.18)'}}>
      <div style={{fontSize: 18, color: '#63778C', fontWeight: 900}}>VISUAL IDEA</div><div style={{fontSize: 36, color: ink, fontWeight: 950, lineHeight: 1.05, marginTop: 8}}>Each dot is a decision, not just a pipe.</div><div style={{fontSize: 20, color: '#52657A', lineHeight: 1.3, marginTop: 20}}>Animate confidence, cost, equity, and field value as competing forces.</div>
    </div>
  </Shell></AbsoluteFill>;
};

const MapMorph = ({start, end}: {start: number; end: number}) => {
  const frame = useCurrentFrame(); const f = local(frame, start);
  return <AbsoluteFill style={{opacity: fadeScene(frame, start, end)}}><Shell>
    <div style={{position: 'absolute', top: 52, left: 64}}><Logo /></div><SceneLabel n="04" title="Map strategy" />
    <div style={{position: 'absolute', left: 72, top: 132, color: white, fontSize: 54, fontWeight: 950, letterSpacing: -2}}>From map to route.</div>
    <div style={{position: 'absolute', left: 72, top: 226, width: 770, height: 420, background: 'rgba(255,255,255,.94)', borderRadius: 34, overflow: 'hidden', boxShadow: '0 38px 100px rgba(0,0,0,.34)'}}>
      <svg width="770" height="420">
        <rect width="770" height="420" fill="#EAF3F8" />
        {Array.from({length: 14}).map((_, i) => <path key={i} d={`M${-20+i*62} 0 C${80+i*35} 130 ${-50+i*78} 240 ${70+i*45} 430`} stroke="#C8DAE8" strokeWidth="7" fill="none" />)}
        {Array.from({length: 9}).map((_, i) => <path key={'h'+i} d={`M0 ${20+i*48} C180 ${70+i*16} 370 ${-20+i*65} 790 ${45+i*44}`} stroke="#D5E5EF" strokeWidth="6" fill="none" />)}
        <path d="M84 337 C160 275 240 286 310 224 S455 160 550 116 S670 90 725 48" fill="none" stroke={coral} strokeWidth="12" strokeLinecap="round" strokeDasharray="34 20" strokeDashoffset={-f*1.5} opacity={interpolate(f, [70, 110], [0, 1], clamp)} />
        {[[84,337,coral],[210,285,yellow],[310,224,coral],[455,160,green],[550,116,yellow],[725,48,coral]].map(([x,y,c],i) => <g key={i} transform={`translate(${x},${y}) scale(${appear(f, i*10)})`}><circle r="25" fill={String(c)} opacity=".20"/><circle r="10" fill={String(c)}/></g>)}
      </svg>
    </div>
    <div style={{position: 'absolute', right: 82, top: 244, display: 'grid', gap: 18}}>{['Minimize truck rolls', 'Maximize learning', 'Report progress'].map((t, i) => <div key={t} style={{width: 330, padding: 22, borderRadius: 24, background: 'rgba(255,255,255,.10)', border: '1px solid rgba(255,255,255,.18)', color: white, fontSize: 25, fontWeight: 900, transform: `translateX(${ease(f, [50+i*18, 90+i*18], [70, 0])}px)`, opacity: interpolate(f, [40+i*18, 80+i*18], [0, 1], clamp)}}>{t}</div>)}</div>
  </Shell></AbsoluteFill>;
};

const ProductTheater = ({start, end}: {start: number; end: number}) => {
  const frame = useCurrentFrame(); const f = local(frame, start);
  const shots = ['assets/workspace.png', 'assets/filters.png', 'assets/proposals.png'];
  return <AbsoluteFill style={{opacity: fadeScene(frame, start, end)}}><Shell>
    <div style={{position: 'absolute', top: 52, left: 64}}><Logo /></div><SceneLabel n="05" title="Product theater" />
    <div style={{position: 'absolute', left: 72, top: 130, color: white, fontSize: 54, fontWeight: 950, letterSpacing: -2}}>Make the product feel cinematic.</div>
    {shots.map((src, i) => {
      const x = 150 + i * 275; const y = 260 + (i % 2) * 42; const rot = [-7, 2, 8][i]; const z = appear(f, 20 + i * 24);
      return <div key={src} style={{position: 'absolute', left: x, top: y, width: 430, height: 262, borderRadius: 24, overflow: 'hidden', background: 'white', border: '8px solid white', boxShadow: '0 35px 90px rgba(0,0,0,.35)', transform: `rotate(${rot}deg) scale(${interpolate(z, [0,1], [.55,1])}) translateY(${Math.sin((f+i*30)/50)*8}px)`}}><Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center'}} /></div>;
    })}
    <div style={{position: 'absolute', left: 88, bottom: 62, color: cyan, fontSize: 28, fontWeight: 950}}>Idea: cut between real screens like a product film, not a screen recording.</div>
  </Shell></AbsoluteFill>;
};

const BeforeAfter = ({start, end}: {start: number; end: number}) => {
  const frame = useCurrentFrame(); const f = local(frame, start); const split = ease(f, [45, 135], [140, 1135]);
  return <AbsoluteFill style={{opacity: fadeScene(frame, start, end)}}><Shell light>
    <div style={{position: 'absolute', top: 52, left: 64, zIndex: 5}}><Logo dark /></div><SceneLabel n="06" title="Before / after" dark />
    <div style={{position: 'absolute', inset: 0, background: '#F3F6FA'}} />
    <div style={{position: 'absolute', left: 70, top: 145, color: ink, fontWeight: 950, fontSize: 52, zIndex: 5}}>Slide from uncertainty to action.</div>
    <div style={{position: 'absolute', left: 70, top: 250, width: 520, height: 330, borderRadius: 28, background: '#FFFFFF', boxShadow: '0 20px 60px rgba(11,31,58,.14)', padding: 24}}>
      <b style={{fontSize: 28, color: ink}}>Before</b>{['Conflicting spreadsheets', 'Unknown materials', 'Unclear next visit', 'Hard to explain progress'].map((t,i)=><div key={t} style={{fontSize:23, marginTop:22, color:'#697C8F', fontWeight:800}}>✕ {t}</div>)}
    </div>
    <div style={{position: 'absolute', right: 70, top: 250, width: 520, height: 330, borderRadius: 28, background: `linear-gradient(135deg, ${ink}, #123D66)`, boxShadow: '0 25px 70px rgba(11,31,58,.23)', padding: 24, color: white}}>
      <b style={{fontSize: 28}}>After</b>{['One explainable record', 'Risk-ranked plan', 'Field-ready route', 'Customer-ready report'].map((t,i)=><div key={t} style={{fontSize:23, marginTop:22, color:'#E9F7FF', fontWeight:900}}>✓ {t}</div>)}
    </div>
    <div style={{position: 'absolute', left: split, top: 220, width: 6, height: 430, borderRadius: 99, background: cyan, boxShadow: '0 0 35px rgba(73,198,229,.75)'}} />
  </Shell></AbsoluteFill>;
};

const MetricBloom = ({start, end}: {start: number; end: number}) => {
  const frame = useCurrentFrame(); const f = local(frame, start);
  return <AbsoluteFill style={{opacity: fadeScene(frame, start, end)}}><Shell>
    <div style={{position: 'absolute', top: 52, left: 64}}><Logo /></div><SceneLabel n="07" title="Metric bloom" />
    <div style={{position: 'absolute', left: 72, top: 128, color: white, fontSize: 54, fontWeight: 950, letterSpacing: -2}}>Animate tradeoffs, not just KPIs.</div>
    <svg style={{position: 'absolute', left: 140, top: 195}} width="600" height="470">
      <g transform="translate(300,240)">
        {['cost','equity','confidence','speed','coverage','risk'].map((t,i)=>{const a = i*Math.PI*2/6 - Math.PI/2; const len = ease(f, [25+i*8, 90+i*8], [50, 185 + (i%3)*28]); const x=Math.cos(a)*len, y=Math.sin(a)*len; return <g key={t}><line x1="0" y1="0" x2={x} y2={y} stroke="rgba(255,255,255,.22)" strokeWidth="3"/><circle cx={x} cy={y} r="18" fill={[cyan,green,yellow,coral,purple,orange][i]}/><text x={Math.cos(a)*(len+58)} y={Math.sin(a)*(len+58)} fill={white} fontSize="22" fontWeight="800" textAnchor="middle">{t}</text></g>})}
        <circle r={ease(f,[70,150],[20,96])} fill="none" stroke={cyan} strokeWidth="6" opacity=".65"/>
        <circle r="54" fill="rgba(73,198,229,.2)"/><text y="8" fill={white} fontSize="24" fontWeight="950" textAnchor="middle">PLAN</text>
      </g>
    </svg>
    <div style={{position: 'absolute', right: 90, top: 250, width: 410, color: '#DDEBFA', fontSize: 30, lineHeight: 1.25, fontWeight: 800}}>A good booth loop could show BlueConduit balancing public-facing constraints in motion.</div>
  </Shell></AbsoluteFill>;
};

const ClosingGrid = ({start, end}: {start: number; end: number}) => {
  const frame = useCurrentFrame(); const f = local(frame, start); const ideas = ['Data river', 'Risk constellation', 'Cinematic product cards', 'Before / after slider', 'Route animation', 'Metric bloom'];
  return <AbsoluteFill style={{opacity: fadeScene(frame, start, end)}}><Shell>
    <div style={{position: 'absolute', top: 52, left: 64}}><Logo /></div><SceneLabel n="08" title="Menu of directions" />
    <div style={{position: 'absolute', left: 72, top: 132, color: white, fontSize: 58, fontWeight: 950, letterSpacing: -2}}>Pick the visual language.</div>
    <div style={{position: 'absolute', left: 72, top: 238, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, width: 1130}}>
      {ideas.map((t,i)=><div key={t} style={{height: 132, borderRadius: 26, background: 'rgba(255,255,255,.10)', border: '1px solid rgba(255,255,255,.18)', padding: 24, color: white, fontSize: 27, fontWeight: 950, transform: `translateY(${ease(f,[20+i*8,58+i*8],[45,0])}px)`, opacity: interpolate(f,[15+i*8,55+i*8],[0,1],clamp)}}><div style={{fontSize:18,color:[cyan,green,yellow,coral,purple,orange][i],marginBottom:14}}>0{i+1}</div>{t}</div>)}
    </div>
    <div style={{position: 'absolute', left: 76, bottom: 58, color: cyan, fontSize: 28, fontWeight: 950}}>Next pass: combine 2–3 of these into one polished story.</div>
  </Shell></AbsoluteFill>;
};

export const CreativeShowcase: React.FC = () => {
  return <AbsoluteFill>
    <TitleScene start={0} end={240} />
    <MessyToClean start={220} end={520} />
    <DataRiver start={500} end={780} />
    <RiskConstellation start={760} end={1060} />
    <MapMorph start={1040} end={1340} />
    <ProductTheater start={1320} end={1620} />
    <BeforeAfter start={1600} end={1900} />
    <MetricBloom start={1880} end={2180} />
    <ClosingGrid start={2160} end={2520} />
  </AbsoluteFill>;
};
