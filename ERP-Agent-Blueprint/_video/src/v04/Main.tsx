import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {ListChecks} from 'lucide-react';
import {C, INTER} from '../theme';
import {pop, prog} from '../lib/anim';
import {StockyBot} from '../components/Art';
import {OnCamSegment, Graphic} from '../components/OnCam';
import {v04Graphics, HarrisonScene} from './oncam';
import capwords04full from '../data/capwords04full.json';
import {FPS} from '../theme';
/** Video 04: screen recordings drawn larger (review feedback); the browser's bottom edge may sit just behind the caption band. */
const SCREEN_INSET = {scale: 0.97, top: 2};
import {Bg} from '../components/Bg';
import {BurnedCaptions} from '../components/BurnedCaptions';
import {beatLayout, fullLayout, HARRISON_LEAD, layout, Seg4, ScreenSeg4, THINK_HOLD} from './timeline';
import {V4S1, V4S2, V4S3, V4S4} from './screens';
import capwords04 from '../data/capwords04.json';

const SECTIONS = {1: V4S1, 2: V4S2, 3: V4S3, 4: V4S4};

export const ScreenSegment4: React.FC<{seg: ScreenSeg4}> = ({seg}) => {
  const {starts} = beatLayout(seg.beats);
  const S = SECTIONS[seg.section];
  return (
    <AbsoluteFill>
      <Bg />
      <AbsoluteFill style={{transform: `translateY(${SCREEN_INSET.top}px) scale(${SCREEN_INSET.scale})`, transformOrigin: '50% 0%'}}><S starts={starts} /></AbsoluteFill>
      <Audio src={staticFile('sfx/whoosh.wav')} volume={0.35} />
      {seg.beats.map((k) => (
        <Sequence key={k} from={Math.round(starts[k] * FPS)} layout="none"><Audio src={staticFile(`vo04/${k}.mp3`)} /></Sequence>
      ))}
    </AbsoluteFill>
  );
};

/** Video 04 screen sections. `only` renders one section on its own (for the per-section review files). */
export const Main04: React.FC<{only?: string}> = ({only}) => {
  const items = layout();
  const base = only ? items.find((x) => x.seg.id === only)?.from ?? 0 : 0;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {items.filter((x) => !only || x.seg.id === only).map(({seg, from, dur}) => (
        <Sequence key={seg.id} from={from - base} durationInFrames={dur} name={seg.id}><ScreenSegment4 seg={seg} /></Sequence>
      ))}
      <BurnedCaptions offset={base / FPS} words={capwords04 as [string, number, number][]} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- full Video 04
let G: Record<string, Graphic[]> | null = null;
const graphics = () => (G ??= v04Graphics());
const PUNCH: Record<number, number> = {};
for (let i = 1; i <= 26; i++) PUNCH[i] = i % 2 === 0 ? 1.1 : 1.0;

const ThinkHold4: React.FC = () => {
  const f = useCurrentFrame();
  const total = THINK_HOLD * FPS;
  const left = Math.max(0, Math.ceil((total - f) / FPS) - 1);
  const R = 70, L = 2 * Math.PI * R;
  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      <div style={{position: 'absolute', left: 160, right: 160, top: 0, bottom: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: pop(f, 0, 18)}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div>
            <div style={{fontSize: 26, fontWeight: 800, letterSpacing: 4, color: C.amber, textTransform: 'uppercase'}}>Pause & Think</div>
            <div style={{fontSize: 58, fontWeight: 800, color: C.white, letterSpacing: -1, marginTop: 8, maxWidth: 1250}}>The spreadsheet you use most at work: which of the five rules does it break?</div>
          </div>
          <svg width={180} height={180} viewBox="0 0 180 180">
            <circle cx={90} cy={90} r={R} stroke="rgba(255,255,255,0.15)" strokeWidth={14} fill="none" />
            <circle cx={90} cy={90} r={R} stroke={C.hi} strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * Math.min(1, f / (total - 18))} transform="rotate(-90 90 90)" />
            <text x={90} y={108} textAnchor="middle" fontSize={56} fontWeight={800} fill={C.white} fontFamily={INTER}>{left || '✓'}</text>
          </svg>
        </div>
        <div style={{marginTop: 34, display: 'flex', gap: 12, flexWrap: 'wrap', opacity: prog(f, 14, 26)}}>
          {['1 One table per thing', '2 One header row', '3 One fact per cell', '4 Unique ID on every row', '5 Consistent types & units'].map((t) => (
            <div key={t} style={{padding: '12px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.1)', color: C.white, fontSize: 26, fontWeight: 700}}>{t}</div>
          ))}
        </div>
        <div style={{marginTop: 30, display: 'inline-flex', alignItems: 'center', gap: 14, alignSelf: 'flex-start', padding: '16px 26px', borderRadius: 18, background: C.amberSoft, color: '#92400E', fontSize: 30, fontWeight: 800, opacity: pop(f, 40)}}>
          <ListChecks size={32} /> Note the biggest issue: you'll fix it in the activity
        </div>
      </div>
    </AbsoluteFill>
  );
};
const EndCard4: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <div style={{transform: `scale(${0.7 + 0.3 * pop(f, 0)})`}}><StockyBot size={200} f={f} wave={f < 50} /></div>
        <div style={{fontSize: 30, fontWeight: 800, letterSpacing: 5, color: C.hi, textTransform: 'uppercase', marginTop: 20, opacity: prog(f, 6, 16)}}>The ERP Agent Blueprint</div>
        <div style={{fontSize: 70, fontWeight: 800, color: C.white, marginTop: 12, opacity: prog(f, 10, 22)}}>See you in Video 5</div>
        <div style={{fontSize: 32, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: 12, opacity: prog(f, 16, 28)}}>Your No-Code Toolkit: Setting Up n8n and Your AI Brain</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
const HarrisonBeat: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <HarrisonScene f={f} />
      <Audio src={staticFile('sfx/whoosh.wav')} volume={0.3} />
      <Sequence from={Math.round(HARRISON_LEAD * FPS)} layout="none"><Audio src={staticFile('vo04/HARRISON.mp3')} /></Sequence>
    </AbsoluteFill>
  );
};
export const SegmentView4: React.FC<{seg: Seg4}> = ({seg}) => {
  if (seg.kind === 'oncam') return <OnCamSegment clip={seg.clip} from={seg.from} to={seg.to} keeps={seg.keeps} graphics={graphics()[seg.id] ?? []} punch={PUNCH[seg.clip]} srcDir="oncam04" />;
  if (seg.kind === 'pause' && seg.id === 'harrison') return <HarrisonBeat />;
  if (seg.kind === 'pause') return (<>{seg.id === 'think' ? <ThinkHold4 /> : <EndCard4 />}<Audio src={staticFile(seg.id === 'think' ? 'sfx/whoosh.wav' : 'sfx/ding.wav')} volume={0.35} /></>);
  return <ScreenSegment4 seg={seg} />;
};
/** The whole of Video 04. `only` renders one segment (for checks). */
export const Main04Full: React.FC<{only?: string}> = ({only}) => {
  const items = fullLayout();
  const base = only ? items.find((x) => x.seg.id === only)?.from ?? 0 : 0;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {items.filter((x) => !only || x.seg.id === only).map(({seg, from, dur}) => (
        <Sequence key={seg.id} from={from - base} durationInFrames={dur} name={seg.id}><SegmentView4 seg={seg} /></Sequence>
      ))}
      <BurnedCaptions offset={base / FPS} words={capwords04full as [string, number, number][]} />
    </AbsoluteFill>
  );
};
