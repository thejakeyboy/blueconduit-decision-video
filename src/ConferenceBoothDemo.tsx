import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const navy = '#0B1F3A';
const blue = '#1F77B4';
const cyan = '#49C6E5';
const green = '#3FB950';
const yellow = '#F2C94C';
const coral = '#FF6B5A';
const offWhite = '#F7FBFF';
const muted = '#A9B9CC';
const panel = 'rgba(255,255,255,0.92)';

const useLocalFrame = (start: number) => useCurrentFrame() - start;

const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 18, end - 18, end], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const pop = (frame: number, delay = 0) =>
  spring({frame: frame - delay, fps: 30, config: {damping: 14, stiffness: 110, mass: 0.75}});

const Logo: React.FC<{compact?: boolean}> = ({compact}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: compact ? 10 : 14}}>
    <div
      style={{
        width: compact ? 34 : 46,
        height: compact ? 34 : 46,
        borderRadius: 12,
        background: `linear-gradient(135deg, ${blue}, ${cyan})`,
        position: 'relative',
        boxShadow: '0 12px 30px rgba(73,198,229,.25)',
      }}
    >
      <div style={{position: 'absolute', width: 9, height: 9, borderRadius: 99, background: offWhite, left: 8, top: 8}} />
      <div style={{position: 'absolute', width: 9, height: 9, borderRadius: 99, background: offWhite, right: 8, top: 10}} />
      <div style={{position: 'absolute', width: 9, height: 9, borderRadius: 99, background: offWhite, left: 17, bottom: 8}} />
      <div style={{position: 'absolute', height: 3, width: 23, background: offWhite, left: 11, top: 15, transform: 'rotate(8deg)', opacity: .9}} />
      <div style={{position: 'absolute', height: 3, width: 20, background: offWhite, left: 14, top: 25, transform: 'rotate(-30deg)', opacity: .9}} />
    </div>
    <div>
      <div style={{fontWeight: 900, letterSpacing: -1.5, fontSize: compact ? 24 : 34, color: offWhite}}>BlueConduit</div>
      {!compact && <div style={{fontSize: 14, color: muted, letterSpacing: 2, textTransform: 'uppercase'}}>Service line intelligence</div>}
    </div>
  </div>
);

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 95) * 22;
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 70% 18%, rgba(73,198,229,.35), transparent 28%), radial-gradient(circle at 18% 80%, rgba(63,185,80,.22), transparent 34%), linear-gradient(135deg, #07172B 0%, ${navy} 52%, #06111F 100%)`}}>
      <div style={{position: 'absolute', inset: 0, opacity: .13, backgroundImage: 'linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)', backgroundSize: '48px 48px', transform: `translate(${drift}px, ${-drift/2}px)`}} />
      <div style={{position: 'absolute', width: 620, height: 620, borderRadius: 999, border: '1px solid rgba(73,198,229,.18)', right: -140, top: -120}} />
      <div style={{position: 'absolute', width: 420, height: 420, borderRadius: 999, border: '1px solid rgba(63,185,80,.16)', left: -90, bottom: -120}} />
    </AbsoluteFill>
  );
};

const Kpi: React.FC<{label: string; value: string; color: string; delay: number}> = ({label, value, color, delay}) => {
  const frame = useCurrentFrame();
  const s = pop(frame, delay);
  return (
    <div style={{transform: `scale(${s})`, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 22, padding: '18px 20px', width: 185}}>
      <div style={{fontSize: 34, fontWeight: 900, color}}>{value}</div>
      <div style={{fontSize: 14, color: muted, marginTop: 4}}>{label}</div>
    </div>
  );
};

const Hero: React.FC = () => {
  const frame = useLocalFrame(0);
  const titleY = interpolate(frame, [0, 45], [38, 0], {extrapolateRight: 'clamp'});
  const titleOpacity = interpolate(frame, [0, 35], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: fade(useCurrentFrame(), 0, 245)}}>
      <div style={{position: 'absolute', top: 54, left: 70}}><Logo /></div>
      <div style={{position: 'absolute', left: 82, top: 190, width: 690, transform: `translateY(${titleY}px)`, opacity: titleOpacity}}>
        <div style={{fontSize: 70, lineHeight: .95, fontWeight: 950, letterSpacing: -4, color: offWhite}}>Find lead service lines faster.</div>
        <div style={{marginTop: 28, fontSize: 29, lineHeight: 1.25, color: '#DDEBFA'}}>Turn messy utility records into prioritized, field-ready action plans.</div>
      </div>
      <div style={{position: 'absolute', left: 82, bottom: 70, display: 'flex', gap: 18}}>
        <Kpi label="records unified" value="1.2M+" color={cyan} delay={45} />
        <Kpi label="inspection plans" value="GIS" color={green} delay={60} />
        <Kpi label="customer ready" value="Reports" color={yellow} delay={75} />
      </div>
      <PipelineGraphic start={35} />
    </AbsoluteFill>
  );
};

const PipelineGraphic: React.FC<{start: number}> = ({start}) => {
  const frame = useCurrentFrame();
  const s = pop(frame, start);
  const flow = interpolate((frame - start) % 90, [0, 90], [0, 1]);
  const nodes = [
    {x: 895, y: 180, t: 'Records', c: cyan},
    {x: 1040, y: 315, t: 'Model', c: yellow},
    {x: 900, y: 470, t: 'Plan', c: green},
  ];
  return (
    <div style={{position: 'absolute', right: 72, top: 120, width: 390, height: 450, transform: `scale(${s})`}}>
      <svg width="390" height="450" viewBox="0 0 390 450">
        <path d="M88 70 C250 45 325 160 265 245 C215 318 90 280 84 376" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="18" strokeLinecap="round"/>
        <path d="M88 70 C250 45 325 160 265 245 C215 318 90 280 84 376" fill="none" stroke={cyan} strokeWidth="6" strokeLinecap="round" strokeDasharray="34 190" strokeDashoffset={-flow*224}/>
        {nodes.map((n, i) => <g key={n.t} transform={`translate(${n.x-800}, ${n.y-80})`}>
          <circle r="54" fill="rgba(255,255,255,.10)" stroke={n.c} strokeWidth="3" />
          <circle r="8" fill={n.c} />
          <text y="88" textAnchor="middle" fill="#EAF4FF" fontSize="20" fontWeight="800">{n.t}</text>
        </g>)}
      </svg>
    </div>
  );
};

const BrowserFrame: React.FC<{children: React.ReactNode; title: string}> = ({children, title}) => (
  <div style={{width: 865, height: 510, background: panel, borderRadius: 26, boxShadow: '0 35px 90px rgba(0,0,0,.35)', overflow: 'hidden', border: '1px solid rgba(255,255,255,.45)'}}>
    <div style={{height: 48, background: '#E8F0F8', display: 'flex', alignItems: 'center', padding: '0 18px', gap: 10, color: '#567'}}>
      <span style={{width: 12, height: 12, borderRadius: 99, background: '#FF5F57'}} />
      <span style={{width: 12, height: 12, borderRadius: 99, background: '#FFBD2E'}} />
      <span style={{width: 12, height: 12, borderRadius: 99, background: '#28C840'}} />
      <div style={{marginLeft: 18, background: '#F7FAFD', borderRadius: 12, height: 28, display: 'flex', alignItems: 'center', padding: '0 18px', fontSize: 14, color: '#6B7C8F', flex: 1}}>{title}</div>
    </div>
    {children}
  </div>
);

const ScreenshotZoom: React.FC<{src: string; frame: number; from?: number; to?: number; x?: number; y?: number}> = ({src, frame, from = 1.02, to = 1.12, x = 0, y = 0}) => {
  const zoom = interpolate(frame, [0, 220], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const driftX = interpolate(frame, [0, 220], [0, x], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const driftY = interpolate(frame, [0, 220], [0, y], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{position: 'relative', height: 462, overflow: 'hidden', background: '#F6FAFD'}}>
    <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transform: `translate(${driftX}px, ${driftY}px) scale(${zoom})`, transformOrigin: 'center top'}} />
    <div style={{position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 1px rgba(11,31,58,.08)'}} />
  </div>;
};

const RecordsScene: React.FC = () => {
  const frame = useLocalFrame(245);
  const rows = ['parcel records', 'tap cards', 'meter data', 'work orders', 'inspection notes'];
  return (
    <AbsoluteFill style={{opacity: fade(useCurrentFrame(), 245, 505), padding: '70px 74px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <div><Logo compact /><div style={{marginTop: 26, fontSize: 46, fontWeight: 900, color: offWhite, letterSpacing: -2}}>Unify every clue.</div><div style={{fontSize: 24, color: muted, marginTop: 10}}>Records, locations, inspections, and history in one workspace.</div></div>
        <StepBadge step="01" text="Ingest" />
      </div>
      <div style={{display: 'flex', gap: 34, marginTop: 48, alignItems: 'center'}}>
        <div style={{display: 'grid', gap: 13}}>
          {rows.map((r, i) => {
            const x = interpolate(pop(frame, 20 + i * 9), [0, 1], [-60, 0]);
            return <div key={r} style={{transform: `translateX(${x}px)`, opacity: interpolate(frame, [10 + i * 9, 30 + i * 9], [0, 1], {extrapolateRight: 'clamp'}), width: 285, background: 'rgba(255,255,255,.10)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 18, padding: '16px 20px', color: offWhite, fontWeight: 800, fontSize: 21}}>{r}</div>;
          })}
        </div>
        <div style={{fontSize: 58, color: cyan, fontWeight: 900}}>→</div>
        <div style={{transform: 'scale(0.82)', transformOrigin: 'left center'}}>
          <BrowserFrame title="blueconduit.app / data workspace">
            <ScreenshotZoom src="assets/workspace.png" frame={frame} from={1.00} to={1.10} x={-24} y={-18} />
          </BrowserFrame>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const DashboardMini: React.FC<{frame: number}> = ({frame}) => {
  const fill = interpolate(frame, [60, 160], [8, 91], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{padding: 26, color: navy, height: '100%', background: 'linear-gradient(180deg, #FFFFFF, #F1F7FC)'}}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><b style={{fontSize: 24}}>Data Quality Monitor</b><span style={{background: '#DFF7E5', color: '#157A31', padding: '8px 13px', borderRadius: 999, fontWeight: 900}}>Synced</span></div>
    <div style={{display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 18, marginTop: 22}}>
      <div style={{background: '#F7FAFE', borderRadius: 18, padding: 18, border: '1px solid #DDE8F2'}}>
        <div style={{fontSize: 13, color: '#5C7288', fontWeight: 800}}>MATCHED RECORDS</div>
        <div style={{height: 18, background: '#DCEBF5', borderRadius: 99, marginTop: 14, overflow: 'hidden'}}><div style={{height: '100%', width: `${fill}%`, background: `linear-gradient(90deg, ${blue}, ${cyan})`, borderRadius: 99}} /></div>
        <div style={{fontSize: 54, fontWeight: 950, color: blue, marginTop: 22}}>{Math.round(fill)}%</div>
      </div>
      <div style={{background: '#F7FAFE', borderRadius: 18, padding: 18, border: '1px solid #DDE8F2'}}>
        <div style={{fontSize: 13, color: '#5C7288', fontWeight: 800}}>NEXT BEST ACTION</div>
        <div style={{fontSize: 31, fontWeight: 950, marginTop: 16}}>312</div><div style={{color: '#5C7288'}}>high-value inspections</div>
      </div>
    </div>
    <div style={{marginTop: 18, display: 'grid', gap: 9}}>{[82, 55, 76, 34].map((w, i)=><div key={i} style={{display:'flex', alignItems:'center', gap:10}}><span style={{width: 80, color:'#6B7C8F', fontSize: 13}}>Zone {i+1}</span><div style={{height: 14, width: `${w}%`, background: i===3 ? coral : cyan, borderRadius: 99, opacity:.8}} /></div>)}</div>
  </div>;
};

const StepBadge: React.FC<{step: string; text: string}> = ({step, text}) => <div style={{border: '1px solid rgba(255,255,255,.22)', background: 'rgba(255,255,255,.08)', borderRadius: 999, padding: '13px 20px', color: offWhite, fontWeight: 900, fontSize: 18}}><span style={{color: cyan}}>{step}</span> / {text}</div>;

const RiskScene: React.FC = () => {
  const frame = useLocalFrame(505);
  return <AbsoluteFill style={{opacity: fade(useCurrentFrame(), 505, 780), padding: '68px 74px'}}>
    <div style={{display:'flex', justifyContent:'space-between'}}><div><Logo compact /><div style={{marginTop: 26, fontSize: 46, fontWeight: 900, color: offWhite, letterSpacing:-2}}>Prioritize where it matters.</div><div style={{fontSize:24, color:muted, marginTop:10}}>Predictive scoring focuses field teams on the most informative visits.</div></div><StepBadge step="02" text="Model" /></div>
    <div style={{display:'flex', marginTop:44, gap:36, alignItems:'center'}}>
      <div style={{transform: `scale(${interpolate(pop(frame, 18), [0, 1], [.72, .78])})`, transformOrigin: 'left center'}}>
        <BrowserFrame title="blueconduit.app / planner filters">
          <ScreenshotZoom src="assets/filters.png" frame={frame} from={1.00} to={1.09} x={18} y={-12} />
        </BrowserFrame>
      </div>
      <div style={{display:'grid', gap:18, flex:1}}>
        <Insight title="High confidence segments" value="847" color={green} frame={frame} delay={40}/>
        <Insight title="Unknowns worth resolving" value="312" color={yellow} frame={frame} delay={58}/>
        <Insight title="Avoided low-value digs" value="41%" color={cyan} frame={frame} delay={76}/>
      </div>
    </div>
  </AbsoluteFill>;
};

const MapCard: React.FC<{frame:number}> = ({frame}) => <div style={{width:730, height:430, background:'rgba(255,255,255,.93)', borderRadius:28, padding:22, boxShadow:'0 35px 90px rgba(0,0,0,.34)'}}>
  <svg width="686" height="386" viewBox="0 0 686 386">
    <rect width="686" height="386" rx="18" fill="#EAF3F8"/>
    {Array.from({length: 10}).map((_,i)=><path key={i} d={`M${20+i*70} 0 C${80+i*35} 90 ${-20+i*90} 170 ${60+i*55} 386`} stroke="#C9DCE8" strokeWidth="8" fill="none" opacity=".9"/>)}
    {Array.from({length: 8}).map((_,i)=><path key={'h'+i} d={`M0 ${30+i*47} C160 ${70+i*25} 300 ${-10+i*70} 686 ${40+i*43}`} stroke="#D4E4EE" strokeWidth="6" fill="none"/>)}
    {[
      [120,95,coral,0],[205,145,yellow,16],[310,118,green,32],[428,210,coral,48],[540,150,yellow,64],[250,285,green,80],[585,292,coral,96],[92,255,yellow,112]
    ].map(([x,y,c,d],i)=>{const s=pop(frame, Number(d)); return <g key={i} transform={`translate(${x},${y}) scale(${s})`}><circle r="23" fill={String(c)} opacity=".22"/><circle r="10" fill={String(c)}/></g>})}
    <rect x="24" y="24" width="218" height="58" rx="14" fill="white" opacity=".94"/><text x="44" y="60" fontSize="21" fontWeight="900" fill="#0B1F3A">Risk-ranked service map</text>
  </svg>
</div>;

const Insight: React.FC<{title:string; value:string; color:string; frame:number; delay:number}> = ({title,value,color,frame,delay}) => {
  const x = interpolate(pop(frame, delay), [0,1], [45,0]);
  return <div style={{transform:`translateX(${x}px)`, background:'rgba(255,255,255,.10)', border:'1px solid rgba(255,255,255,.18)', borderRadius:22, padding:'22px 24px'}}><div style={{fontSize:42, color, fontWeight:950}}>{value}</div><div style={{fontSize:18, color:offWhite, fontWeight:800}}>{title}</div></div>;
};

const FieldScene: React.FC = () => {
  const frame = useLocalFrame(780);
  return <AbsoluteFill style={{opacity: fade(useCurrentFrame(),780,1050), padding:'68px 74px'}}>
    <div style={{display:'flex', justifyContent:'space-between'}}><div><Logo compact/><div style={{marginTop:26, fontSize:46, fontWeight:900, color:offWhite, letterSpacing:-2}}>Move from model to action.</div><div style={{fontSize:24, color:muted, marginTop:10}}>Dispatch, inspect, update, and report from the same source of truth.</div></div><StepBadge step="03" text="Execute"/></div>
    <div style={{marginTop:46, display:'flex', gap:38, alignItems:'center'}}>
      <PhoneMock frame={frame}/>
      <div style={{flex:1, transform:'scale(0.94)', transformOrigin:'left center'}}><BrowserFrame title="blueconduit.app / recommended proposals"><ScreenshotZoom src="assets/proposals.png" frame={frame} from={1.02} to={1.12} x={-16} y={-20}/></BrowserFrame></div>
    </div>
  </AbsoluteFill>;
};

const PhoneMock: React.FC<{frame:number}> = ({frame}) => <div style={{width:270, height:500, borderRadius:38, background:'#111827', padding:12, boxShadow:'0 30px 80px rgba(0,0,0,.4)'}}>
  <div style={{height:'100%', borderRadius:28, background:'#F8FBFE', padding:18, color:navy, overflow:'hidden'}}>
    <div style={{fontWeight:950, fontSize:20}}>Today’s route</div><div style={{fontSize:13, color:'#667', marginTop:4}}>Crew A · 7 inspections</div>
    <div style={{marginTop:18, display:'grid', gap:12}}>{['Oak St & 3rd','Maple Ave','Jefferson Ct','Pine Terrace'].map((t,i)=> <div key={t} style={{opacity: interpolate(frame,[20+i*15,40+i*15],[0,1],{extrapolateRight:'clamp'}), transform:`translateY(${interpolate(pop(frame,20+i*15),[0,1],[25,0])}px)`, border:'1px solid #DAE7F0', borderRadius:16, padding:12, background:i===1?'#FFF8DE':'white'}}><div style={{fontWeight:900, fontSize:15}}>{t}</div><div style={{fontSize:12, color:'#687888', marginTop:4}}>{i===1?'Priority: verify unknown':'Likely non-lead'}</div></div>)}</div>
    <div style={{position:'absolute', width:220, bottom:44, background:green, color:'white', borderRadius:16, padding:'13px 0', textAlign:'center', fontWeight:950}}>Complete inspection</div>
  </div>
</div>;

const ReportMini: React.FC<{frame:number}> = ({frame}) => <div style={{padding:26, height:'100%', color:navy, background:'linear-gradient(180deg,#FFFFFF,#F5F9FC)'}}>
  <div style={{display:'flex', justifyContent:'space-between'}}><b style={{fontSize:24}}>Replacement Program Snapshot</b><span style={{background:'#E9F7FF', color:blue, padding:'8px 13px', borderRadius:999, fontWeight:900}}>Board-ready</span></div>
  <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginTop:22}}>{[['Verified non-lead','2,418',green],['Needs inspection','312',yellow],['Priority replacements','68',coral]].map(([l,v,c],i)=><div key={String(l)} style={{background:'#F7FAFE', border:'1px solid #DDE8F2', borderRadius:18, padding:18, transform:`scale(${pop(frame,50+i*12)})`}}><div style={{fontSize:12, color:'#5C7288', fontWeight:800}}>{l}</div><div style={{fontSize:36, fontWeight:950, color:String(c), marginTop:8}}>{v}</div></div>)}</div>
  <div style={{marginTop:22, background:'#F7FAFE', border:'1px solid #DDE8F2', borderRadius:18, padding:18}}><div style={{fontSize:14, fontWeight:900, color:'#5C7288'}}>MONTHLY PROGRESS</div><svg width="760" height="170" viewBox="0 0 760 170"><polyline points="20,130 140,112 260,98 380,72 500,55 620,35 740,22" fill="none" stroke={blue} strokeWidth="8" strokeLinecap="round"/><path d="M20 130 L140 112 L260 98 L380 72 L500 55 L620 35 L740 22 L740 150 L20 150 Z" fill={cyan} opacity=".14"/>{[20,140,260,380,500,620,740].map((x,i)=><circle key={x} cx={x} cy={[130,112,98,72,55,35,22][i]} r="8" fill={blue}/>)}</svg></div>
</div>;

const LoopClose: React.FC = () => {
  const frame = useLocalFrame(1050);
  const words = ['Clean data', 'Smarter inspections', 'Faster replacement plans'];
  return <AbsoluteFill style={{opacity: fade(useCurrentFrame(),1050,1350), padding:'68px 78px'}}>
    <div style={{position:'absolute', top:54, left:70}}><Logo/></div>
    <div style={{position:'absolute', top:192, left:86, width:700}}><div style={{fontSize:62, lineHeight:1.02, letterSpacing:-3, fontWeight:950, color:offWhite}}>A clear path from uncertainty to action.</div><div style={{fontSize:25, color:muted, marginTop:22}}>BlueConduit helps communities decide where to look first, what to fix next, and how to show progress.</div></div>
    <div style={{position:'absolute', right:84, top:155, width:390, display:'grid', gap:20}}>{words.map((w,i)=><div key={w} style={{transform:`translateX(${interpolate(pop(frame,50+i*18),[0,1],[70,0])}px)`, background:'rgba(255,255,255,.11)', border:'1px solid rgba(255,255,255,.20)', borderRadius:24, padding:'22px 24px', color:offWhite, fontSize:28, fontWeight:900}}><span style={{color:[cyan,green,yellow][i], marginRight:14}}>✓</span>{w}</div>)}</div>
    <div style={{position:'absolute', left:86, bottom:78, fontSize:27, color:offWhite, fontWeight:900}}>Conference-loop prototype · no audio required</div>
    <div style={{position:'absolute', right:86, bottom:74, color:cyan, fontSize:24, fontWeight:900}}>blueconduit.com</div>
  </AbsoluteFill>;
};

export const ConferenceBoothDemo: React.FC = () => {
  return <AbsoluteFill style={{fontFamily: 'Inter, Avenir Next, Helvetica Neue, Arial, sans-serif'}}>
    <Background />
    <Hero />
    <RecordsScene />
    <RiskScene />
    <FieldScene />
    <LoopClose />
  </AbsoluteFill>;
};
