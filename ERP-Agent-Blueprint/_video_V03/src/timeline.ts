import clips from '../work/clips.json';
import {vdur} from './lib/cues';
import {FPS} from './theme';

export type OnCamSeg = {kind: 'oncam'; id: string; clip: number; from: number; to: number; section: OnCamSection; keeps: [number, number][]};
export type PauseSeg = {kind: 'pause'; id: string; dur: number};
export type ScreenSeg = {kind: 'screen'; id: string; section: 1 | 2 | 3 | 4 | 5; beats: string[]};
export type Seg = OnCamSeg | PauseSeg | ScreenSeg;
export type OnCamSection = 'intro' | 'story' | 'getpost' | 'mistakes' | 'outro';

/** Seconds of air between VO paragraphs, and before/after each screen section. */
export const BEAT_GAP = 0.45;
export const SCREEN_LEAD_IN = 1.0;
export const SCREEN_TAIL = 0.8;
export const PAUSE_HOLD = 8;
export const END_CARD = 5;

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

/** Clip 18: "Pause here and think through your answers." | silence 4.05–5.24 s | "Alright. Checking the lead time…".
 *  The full-screen PAUSE & THINK hold sits in that gap (same pattern as Video 1's clip 12). */
export const C18A_END = 4.42;
export const C18B_START = 5.12;

export const SEGMENTS: Seg[] = [
  oc(1, 'intro'), oc(2, 'intro'), oc(3, 'intro'), oc(4, 'intro'), oc(5, 'intro'),
  {kind: 'screen', id: 'S1', section: 1, beats: beats(1, 12)},
  oc(6, 'story'), oc(7, 'story'), oc(8, 'story'), oc(9, 'story'), oc(10, 'story'), oc(11, 'story'),
  {kind: 'screen', id: 'S2', section: 2, beats: beats(2, 15)},
  {kind: 'screen', id: 'S3', section: 3, beats: beats(3, 9)},
  oc(12, 'getpost'), oc(14, 'getpost'), oc(15, 'getpost'), oc(16, 'getpost'), oc(17, 'getpost'),
  oc(18, 'getpost', undefined, C18A_END, 'c18a'),
  {kind: 'pause', id: 'think', dur: PAUSE_HOLD},
  oc(18, 'getpost', C18B_START, undefined, 'c18b'), oc(19, 'getpost'),
  {kind: 'screen', id: 'S4', section: 4, beats: beats(4, 13)},
  {kind: 'screen', id: 'S5', section: 5, beats: beats(5, 9)},
  oc(20, 'mistakes'), oc(21, 'mistakes'), oc(22, 'mistakes'), oc(23, 'mistakes'), oc(24, 'mistakes'),
  oc(25, 'outro'), oc(26, 'outro'), oc(27, 'outro'), oc(28, 'outro'), oc(29, 'outro'),
  oc(30, 'outro'), oc(31, 'outro'), oc(32, 'outro'), oc(33, 'outro'), oc(34, 'outro'),
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
