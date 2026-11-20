import clips from '../work/clips.json';
import {vdur} from './lib/cues';
import tom from '../vo/tom.json';
import {FPS} from './theme';

export type OnCamSeg = {kind: 'oncam'; id: string; clip: number; from: number; to: number; section: OnCamSection; keeps: [number, number][]};
export type PauseSeg = {kind: 'pause'; id: string; dur: number};
export type ScreenSeg = {kind: 'screen'; id: string; section: 1 | 2 | 3 | 4; beats: string[]};
export type Seg = OnCamSeg | PauseSeg | ScreenSeg;
export type OnCamSection = 'intro' | 'story' | 'pause' | 'outro';

/** Seconds of air between VO paragraphs, and before/after each screen section. */
export const BEAT_GAP = 0.45;
export const SCREEN_LEAD_IN = 1.0;
export const SCREEN_TAIL = 0.8;
export const PAUSE_HOLD = 6;
export const END_CARD = 5;
/** Clip 7 ends right before Sarah's quote; Tom's own voice then says the line on a full-screen card. */
export const C7_END = 26.05;
export const TOM_LEAD = 0.35;
export const TOM_HOLD = (tom as {duration: number}).duration + TOM_LEAD + 0.75;

type ClipInfo = {duration: number; from: number; to: number; keeps?: [number, number][]};
export const clipInfo = (n: number) => (clips as unknown as Record<string, ClipInfo>)[String(n)];
/** Jump cuts: the clip's speech ranges (pauses/breaths removed), clipped to [from, to]. */
const keepsIn = (clip: number, from: number, to: number): [number, number][] => {
  const k = clipInfo(clip).keeps ?? [[from, to]];
  const out = k.map(([a, b]) => [Math.max(a, from), Math.min(b, to)] as [number, number]).filter(([a, b]) => b - a > 0.05);
  return out.length ? out : [[from, to]];
};
const oc = (clip: number, section: OnCamSection, from?: number, to?: number, id?: string): OnCamSeg => {
  const f = from ?? clipInfo(clip).from, t = to ?? clipInfo(clip).to;
  return {kind: 'oncam', id: id ?? `c${clip}`, clip, from: f, to: t, section, keeps: keepsIn(clip, f, t)};
};
/** Edited (segment) seconds → original clip seconds. */
export const segToClip = (keeps: [number, number][], s: number) => {
  let acc = 0;
  for (const [a, b] of keeps) {
    if (s < acc + (b - a)) return a + (s - acc);
    acc += b - a;
  }
  const [, lb] = keeps[keeps.length - 1];
  return lb + (s - acc);
};
/** Original clip seconds → edited seconds (null if that moment was cut out; snaps to the next kept moment if `snap`). */
export const clipToSeg = (keeps: [number, number][], t: number, snap = false): number | null => {
  let acc = 0;
  for (const [a, b] of keeps) {
    if (t < a) return snap ? acc : null;
    if (t <= b) return acc + (t - a);
    acc += b - a;
  }
  return snap ? acc : null;
};
export const keptSeconds = (keeps: [number, number][]) => keeps.reduce((x, [a, b]) => x + (b - a), 0);
const beats = (s: number, n: number) => Array.from({length: n}, (_, i) => `S${s}_${String(i + 1).padStart(2, '0')}`);

/** Clip 12 contains the "[PAUSE & THINK]" moment in the 6.45–8.13 s silence. */
export const C12A_END = 6.75;
export const C12B_START = 7.85;

export const SEGMENTS: Seg[] = [
  oc(1, 'intro'), oc(2, 'intro'), oc(3, 'intro'), oc(4, 'intro'), oc(5, 'intro'),
  {kind: 'screen', id: 'S1', section: 1, beats: beats(1, 10)},
  oc(6, 'story'), oc(7, 'story', undefined, C7_END), {kind: 'pause', id: 'tom', dur: TOM_HOLD}, oc(8, 'story'), oc(9, 'story'),
  {kind: 'screen', id: 'S2', section: 2, beats: beats(2, 14)},
  oc(10, 'pause'), oc(11, 'pause'), oc(12, 'pause', undefined, C12A_END, 'c12a'),
  {kind: 'pause', id: 'think', dur: PAUSE_HOLD},
  oc(12, 'pause', C12B_START, undefined, 'c12b'), oc(13, 'pause'), oc(14, 'pause'), oc(15, 'pause'),
  {kind: 'screen', id: 'S3', section: 3, beats: beats(3, 6)},
  {kind: 'screen', id: 'S4', section: 4, beats: beats(4, 5)},
  oc(16, 'outro'), oc(17, 'outro'), oc(18, 'outro'), oc(19, 'outro'), oc(20, 'outro'), oc(21, 'outro'),
  {kind: 'pause', id: 'end', dur: END_CARD},
];

/** Start (s, relative to section) of every VO beat, and the section's total length (s). */
export const beatLayout = (keys: string[]) => {
  let t = SCREEN_LEAD_IN;
  const starts: Record<string, number> = {};
  for (const k of keys) {
    starts[k] = t;
    t += vdur(k) + BEAT_GAP;
  }
  return {starts, total: t - BEAT_GAP + SCREEN_TAIL};
};

export const segSeconds = (s: Seg) =>
  s.kind === 'oncam' ? keptSeconds(s.keeps) : s.kind === 'pause' ? s.dur : beatLayout(s.beats).total;

export const layout = () => {
  let f = 0;
  return SEGMENTS.map((s) => {
    const dur = Math.round(segSeconds(s) * FPS);
    const r = {seg: s, from: f, dur};
    f += dur;
    return r;
  });
};

export const TOTAL_FRAMES = layout().reduce((a, b) => a + b.dur, 0);
