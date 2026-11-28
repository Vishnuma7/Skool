import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {C, FPS, INTER} from '../theme';
import {pop, prog} from '../lib/anim';
import {StockyBot} from '../components/Art';
import {OnCamSegment, Graphic} from '../components/OnCam';
import {Bg} from '../components/Bg';
import {BurnedCaptions} from '../components/BurnedCaptions';
import {beatLayout, fullLayout, QUOTE_LEAD, ScreenSeg6, Seg6} from './timeline';
import {SECTIONS6} from './screens';
import {HarrisonQuote, JakeQuote, v06Graphics} from './oncam';
import capwords06 from '../data/capwords06.json';

/** Screen recordings drawn large (V04 review feedback). */
const SCREEN_INSET = {scale: 0.97, top: 2};
export const ScreenSegment6: React.FC<{seg: ScreenSeg6}> = ({seg}) => {
  const {starts} = beatLayout(seg.beats);
  const S = SECTIONS6[seg.section];
  return (
    <AbsoluteFill>
      <Bg />
      <AbsoluteFill style={{transform: `translateY(${SCREEN_INSET.top}px) scale(${SCREEN_INSET.scale})`, transformOrigin: '50% 0%'}}><S starts={starts} /></AbsoluteFill>
      <Audio src={staticFile('sfx/whoosh.wav')} volume={0.35} />
      {seg.beats.map((k) => (
        <Sequence key={k} from={Math.round(starts[k] * FPS)} layout="none"><Audio src={staticFile(`vo06/${k}.mp3`)} /></Sequence>
      ))}
    </AbsoluteFill>
  );
};
let G: Record<string, Graphic[]> | null = null;
const graphics = () => (G ??= v06Graphics());
const PUNCH: Record<string, number> = {};
for (let i = 1; i <= 32; i++) PUNCH[`c${i}`] = i % 2 === 0 ? 1.1 : 1.0;
PUNCH.c16a = 1.0; PUNCH.c16b = 1.1;

const EndCard6: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <div style={{transform: `scale(${0.7 + 0.3 * pop(f, 0)})`}}><StockyBot size={200} f={f} wave={f < 50} /></div>
        <div style={{fontSize: 30, fontWeight: 800, letterSpacing: 5, color: C.hi, textTransform: 'uppercase', marginTop: 20, opacity: prog(f, 6, 16)}}>The ERP Agent Blueprint</div>
        <div style={{fontSize: 70, fontWeight: 800, color: C.white, marginTop: 12, opacity: prog(f, 10, 22)}}>See you in Video 7</div>
        <div style={{fontSize: 32, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: 12, opacity: prog(f, 16, 28)}}>Agents That Take Action: Draft Purchase Orders with Human Approval</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
const Quote: React.FC<{who: 'harrison' | 'jake'}> = ({who}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      {who === 'harrison' ? <HarrisonQuote f={f} /> : <JakeQuote f={f} />}
      <Audio src={staticFile('sfx/whoosh.wav')} volume={0.3} />
      <Sequence from={Math.round(QUOTE_LEAD * FPS)} layout="none"><Audio src={staticFile(who === 'harrison' ? 'vo06/HARRISON06.mp3' : 'vo06/JAKE.mp3')} /></Sequence>
    </AbsoluteFill>
  );
};
export const SegmentView6: React.FC<{seg: Seg6}> = ({seg}) => {
  if (seg.kind === 'oncam') return <OnCamSegment clip={seg.clip} from={seg.from} to={seg.to} keeps={seg.keeps} graphics={graphics()[seg.id] ?? []} punch={PUNCH[seg.id]} srcDir="oncam06" />;
  if (seg.kind === 'pause' && (seg.id === 'harrison' || seg.id === 'jake')) return <Quote who={seg.id} />;
  if (seg.kind === 'pause') return (<><EndCard6 /><Audio src={staticFile('sfx/ding.wav')} volume={0.35} /></>);
  return <ScreenSegment6 seg={seg} />;
};
/** The whole of Video 06. `only` renders one segment (for checks). */
export const Main06: React.FC<{only?: string}> = ({only}) => {
  const items = fullLayout();
  const base = only ? items.find((x) => x.seg.id === only)?.from ?? 0 : 0;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {items.filter((x) => !only || x.seg.id === only).map(({seg, from, dur}) => (
        <Sequence key={seg.id} from={from - base} durationInFrames={dur} name={seg.id}><SegmentView6 seg={seg} /></Sequence>
      ))}
      <BurnedCaptions offset={base / FPS} words={capwords06 as [string, number, number][]} />
    </AbsoluteFill>
  );
};
