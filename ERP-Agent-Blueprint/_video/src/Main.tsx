import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {FPS} from './theme';
import {beatLayout, layout, Seg} from './timeline';
import {OnCamSegment, Graphic} from './components/OnCam';
import {introStoryGraphics} from './oncam/introStory';
import {pauseOutroGraphics} from './oncam/pauseOutro';
import {EndCard, ThinkHold, TomQuote} from './oncam/Holds';
import {TOM_LEAD} from './timeline';
import {ScreenSection} from './screen/ScreenSection';
import {BURN_CAPTIONS, SCREEN_INSET} from './config';
import {BurnedCaptions} from './components/BurnedCaptions';
import {Bg} from './components/Bg';
import capwords from './data/capwords.json';

/** Speech intervals (global s) for music ducking — words merged when gaps < 0.7 s. */
const SPEECH: [number, number][] = (() => {
  const out: [number, number][] = [];
  for (const [, t, e] of capwords as [string, number, number][]) {
    const last = out[out.length - 1];
    if (last && t - last[1] < 0.7) last[1] = Math.max(last[1], e); else out.push([t, e]);
  }
  return out;
})();
const speaking = (g: number) => {
  let lo = 0, hi = SPEECH.length - 1;
  while (lo <= hi) { const m = (lo + hi) >> 1; const [a, b] = SPEECH[m]; if (g < a - 0.3) hi = m - 1; else if (g > b + 0.3) lo = m + 1; else return true; }
  return false;
};

let G: Record<string, Graphic[]> | null = null;
const graphics = () => (G ??= {...introStoryGraphics(), ...pauseOutroGraphics()});

/** Clip-time where the presenter steps out of frame (gaze drifts at the end of the take). */
const HIDE_AT: Record<string, number> = {c15: 19.3};
const PUNCH: Record<number, number> = {};
// Alternate framing between consecutive clips so clip joins read as intentional cuts.
for (let i = 1; i <= 21; i++) PUNCH[i] = i % 2 === 0 ? 1.1 : 1.0;

export const SegmentView: React.FC<{seg: Seg}> = ({seg}) => {
  if (seg.kind === 'oncam') {
    return <OnCamSegment clip={seg.clip} from={seg.from} to={seg.to} keeps={seg.keeps} graphics={graphics()[seg.id] ?? []} punch={PUNCH[seg.clip]} hideAt={HIDE_AT[seg.id]} />;
  }
  if (seg.kind === 'pause' && seg.id === 'tom')
    return (
      <>
        <TomQuote />
        <Audio src={staticFile('sfx/whoosh.wav')} volume={0.35} />
        <Sequence from={Math.round(TOM_LEAD * FPS)} layout="none"><Audio src={staticFile('vo/TOM.mp3')} /></Sequence>
      </>
    );
  if (seg.kind === 'pause')
    return (
      <>
        {seg.id === 'think' ? <ThinkHold /> : <EndCard />}
        <Audio src={staticFile(seg.id === 'think' ? 'sfx/whoosh.wav' : 'sfx/ding.wav')} volume={0.35} />
      </>
    );
  const {starts} = beatLayout(seg.beats);
  return (
    <AbsoluteFill>
      {BURN_CAPTIONS ? (
        <>
          <Bg />
          <AbsoluteFill style={{transform: `translateY(${SCREEN_INSET.top}px) scale(${SCREEN_INSET.scale})`, transformOrigin: '50% 0%'}}>
            <ScreenSection section={seg.section} starts={starts} />
          </AbsoluteFill>
        </>
      ) : (
        <ScreenSection section={seg.section} starts={starts} />
      )}
      <Audio src={staticFile('sfx/whoosh.wav')} volume={0.35} />
      {seg.beats.map((k) => (
        <Sequence key={k} from={Math.round(starts[k] * FPS)} layout="none">
          <Audio src={staticFile(`vo/${k}.mp3`)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

/** Optional `only` = render just one segment id (for previews). */
export const Main: React.FC<{only?: string}> = ({only}) => {
  const items = layout();
  const base = only ? items.find((x) => x.seg.id === only)?.from ?? 0 : 0;
  const loud = items.filter((x) => x.seg.kind === 'pause').map((x) => [x.from - base, x.from - base + x.dur]);
  // Music: ~10 dB under the voice while anyone speaks, lifts in pauses, more in the countdown / end card.
  const musicVol = (f: number) => {
    if (loud.some(([a, b]) => f >= a - 10 && f <= b + 10)) return 0.75;
    return speaking((f + base) / FPS) ? 0.3 : 0.5;
  };
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {/* background music removed at the user's request (review notes, 20 Nov) */}
      {items
        .filter((x) => !only || x.seg.id === only)
        .map(({seg, from, dur}) => (
          <Sequence key={seg.id} from={from - base} durationInFrames={dur} name={seg.id}>
            <SegmentView seg={seg} />
          </Sequence>
        ))}
      {BURN_CAPTIONS && <BurnedCaptions offset={base / FPS} />}
    </AbsoluteFill>
  );
};
