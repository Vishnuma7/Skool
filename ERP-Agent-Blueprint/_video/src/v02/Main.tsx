import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Map as MapIcon} from 'lucide-react';
import {C, FPS, INTER} from '../theme';
import {pop, prog} from '../lib/anim';
import {SCREEN_INSET} from '../config';
import {Bg} from '../components/Bg';
import {StockyBot} from '../components/Art';
import {BurnedCaptions} from '../components/BurnedCaptions';
import {OnCamSegment, Graphic} from '../components/OnCam';
import {beatLayout, layout, Seg2, THINK_HOLD} from './timeline';
import {v02Graphics} from './oncam';
import {V2S1, V2S2, V2S3, V2S4, V2S5} from './screens';
import capwords02 from '../data/capwords02.json';

let G: Record<string, Graphic[]> | null = null;
const graphics = () => (G ??= v02Graphics());
const SECTIONS = {1: V2S1, 2: V2S2, 3: V2S3, 4: V2S4, 5: V2S5};

const ThinkHold2: React.FC = () => {
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
            <div style={{fontSize: 58, fontWeight: 800, color: C.white, letterSpacing: -1, marginTop: 8, maxWidth: 1250}}>Your company's ERP (or mix of systems): which “drawers” do you open most in a normal week?</div>
          </div>
          <svg width={180} height={180} viewBox="0 0 180 180">
            <circle cx={90} cy={90} r={R} stroke="rgba(255,255,255,0.15)" strokeWidth={14} fill="none" />
            <circle cx={90} cy={90} r={R} stroke={C.hi} strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * Math.min(1, f / (total - 18))} transform="rotate(-90 90 90)" />
            <text x={90} y={108} textAnchor="middle" fontSize={56} fontWeight={800} fill={C.white} fontFamily={INTER}>{left || '✓'}</text>
          </svg>
        </div>
        <div style={{marginTop: 36, fontSize: 36, fontWeight: 700, color: 'rgba(255,255,255,0.85)', opacity: prog(f, 20, 32)}}>…and which ones do you never open, but probably should?</div>
        <div style={{marginTop: 34, display: 'inline-flex', alignItems: 'center', gap: 14, alignSelf: 'flex-start', padding: '16px 26px', borderRadius: 18, background: C.amberSoft, color: '#92400E', fontSize: 30, fontWeight: 800, opacity: pop(f, 40)}}>
          <MapIcon size={32} /> Jot them on the “Map My ERP” sheet in your workbook
        </div>
      </div>
    </AbsoluteFill>
  );
};
const EndCard2: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <div style={{transform: `scale(${0.7 + 0.3 * pop(f, 0)})`}}><StockyBot size={200} f={f} wave={f < 50} /></div>
        <div style={{fontSize: 30, fontWeight: 800, letterSpacing: 5, color: C.hi, textTransform: 'uppercase', marginTop: 20, opacity: prog(f, 6, 16)}}>The ERP Agent Blueprint</div>
        <div style={{fontSize: 70, fontWeight: 800, color: C.white, marginTop: 12, opacity: prog(f, 10, 22)}}>See you in Video 3</div>
        <div style={{fontSize: 32, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: 12, opacity: prog(f, 16, 28)}}>APIs Explained Like You're Ordering at a Restaurant</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const PUNCH: Record<number, number> = {};
for (let i = 1; i <= 17; i++) PUNCH[i] = i % 2 === 0 ? 1.1 : 1.0;

export const SegmentView2: React.FC<{seg: Seg2}> = ({seg}) => {
  if (seg.kind === 'oncam') return <OnCamSegment clip={seg.clip} from={seg.from} to={seg.to} keeps={seg.keeps} graphics={graphics()[seg.id] ?? []} punch={PUNCH[seg.clip]} srcDir="oncam02" />;
  if (seg.kind === 'pause')
    return (<>{seg.id === 'think' ? <ThinkHold2 /> : <EndCard2 />}<Audio src={staticFile(seg.id === 'think' ? 'sfx/whoosh.wav' : 'sfx/ding.wav')} volume={0.35} /></>);
  const {starts} = beatLayout(seg.beats);
  const S = SECTIONS[seg.section];
  return (
    <AbsoluteFill>
      <Bg />
      <AbsoluteFill style={{transform: `translateY(${SCREEN_INSET.top}px) scale(${SCREEN_INSET.scale})`, transformOrigin: '50% 0%'}}><S starts={starts} /></AbsoluteFill>
      <Audio src={staticFile('sfx/whoosh.wav')} volume={0.35} />
      {seg.beats.map((k) => (
        <Sequence key={k} from={Math.round(starts[k] * FPS)} layout="none"><Audio src={staticFile(`vo02/${k}.mp3`)} /></Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const Main02: React.FC<{only?: string}> = ({only}) => {
  const items = layout();
  const base = only ? items.find((x) => x.seg.id === only)?.from ?? 0 : 0;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {items.filter((x) => !only || x.seg.id === only).map(({seg, from, dur}) => (
        <Sequence key={seg.id} from={from - base} durationInFrames={dur} name={seg.id}><SegmentView2 seg={seg} /></Sequence>
      ))}
      <BurnedCaptions offset={base / FPS} words={capwords02 as [string, number, number][]} />
    </AbsoluteFill>
  );
};
