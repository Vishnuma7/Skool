import {vdur} from './cues';
import {FPS} from '../theme';
// Video 04 screen sections only (on-camera footage not shot yet). Each section renders on its own; when the
// footage arrives, on-camera segments slot in around these in a Main04 timeline (same pattern as Video 02).
export type ScreenSeg4 = {kind: 'screen'; id: string; section: 1 | 2 | 3 | 4; beats: string[]};
export const BEAT_GAP = 0.45;
export const SCREEN_LEAD_IN = 1.0;
export const SCREEN_TAIL = 0.8;
/** Extra silent hold before a beat (seconds): the Pause & Think question in Section 2 before its answer. */
export const EXTRA_BEFORE: Record<string, number> = {S2_09: 5};
const beats = (s: number, n: number) => Array.from({length: n}, (_, i) => `S${s}_${String(i + 1).padStart(2, '0')}`);
export const SEGMENTS: ScreenSeg4[] = [
  {kind: 'screen', id: 'S1', section: 1, beats: beats(1, 13)},
  // S2_08q = the spoken Pause & Think question (then a 5 s silent hold before the answer S2_09)
  {kind: 'screen', id: 'S2', section: 2, beats: [...beats(2, 8), 'S2_08q', ...beats(2, 12).slice(8)]},
  {kind: 'screen', id: 'S3', section: 3, beats: beats(3, 12)},
  {kind: 'screen', id: 'S4', section: 4, beats: beats(4, 10)},
];
export const beatLayout = (keys: string[]) => {
  let t = SCREEN_LEAD_IN;
  const starts: Record<string, number> = {};
  for (const k of keys) { t += EXTRA_BEFORE[k] ?? 0; starts[k] = t; t += vdur(k) + BEAT_GAP; }
  return {starts, total: t - BEAT_GAP + SCREEN_TAIL};
};
export const layout = () => {
  let f = 0;
  return SEGMENTS.map((s) => { const dur = Math.round(beatLayout(s.beats).total * FPS); const r = {seg: s, from: f, dur}; f += dur; return r; });
};
export const TOTAL_FRAMES = layout().reduce((a, b) => a + b.dur, 0);

// ---------------------------------------------------------------- full Video 04 (on-camera footage + screen sections)
import clips from '../../work/v04/clips.json';
import type {OnCamSeg, PauseSeg} from '../timeline';
export type Seg4 = OnCamSeg | PauseSeg | ScreenSeg4;
type ClipInfo = {duration: number; from: number; to: number; keeps?: [number, number][]};
export const clipInfo = (n: number) => (clips as unknown as Record<string, ClipInfo>)[String(n)];
export const THINK_HOLD = 8;
/** Mr. Harrison's quote: own voice, full-screen dialogue, presenter hidden (clip 7 is cut right before it). */
import harrison from '../../vo04/harrison.json';
export const HARRISON_LEAD = 0.5, HARRISON_TAIL = 1.0;
export const HARRISON_DUR = HARRISON_LEAD + harrison.duration + HARRISON_TAIL;
/** Per-clip end overrides (seconds, clip time). */
const CLIP_TO: Record<number, number> = {7: 14.62};
export const END_CARD = 5;
const oc = (clip: number, section: OnCamSeg['section']): OnCamSeg => {
  const c = {...clipInfo(clip)}; if (CLIP_TO[clip]) c.to = CLIP_TO[clip];
  const keeps = (c.keeps ?? [[c.from, c.to]]).map(([a, b]) => [Math.max(a, c.from), Math.min(b, c.to)] as [number, number]).filter(([a, b]) => b - a > 0.05);
  return {kind: 'oncam', id: `c${clip}`, clip, from: c.from, to: c.to, section, keeps: keeps.length ? keeps : [[c.from, c.to]]};
};
const scr = (id: string) => SEGMENTS.find((s) => s.id === id)!;
export const FULL_SEGMENTS: Seg4[] = [
  oc(1, 'intro'), oc(2, 'intro'), oc(3, 'intro'), oc(4, 'intro'), oc(5, 'intro'), oc(6, 'intro'),
  scr('S1'),
  oc(7, 'story'), {kind: 'pause', id: 'harrison', dur: HARRISON_DUR}, oc(8, 'story'), oc(9, 'story'), oc(10, 'story'), oc(11, 'story'),
  scr('S2'), scr('S3'),
  oc(12, 'pause'), oc(13, 'pause'), oc(14, 'pause'), oc(15, 'pause'), oc(16, 'pause'), oc(17, 'pause'),
  {kind: 'pause', id: 'think', dur: THINK_HOLD},
  scr('S4'),
  oc(18, 'outro'), oc(19, 'outro'), oc(20, 'outro'),
  oc(21, 'outro'), oc(22, 'outro'), oc(23, 'outro'), oc(24, 'outro'), oc(25, 'outro'), oc(26, 'outro'),
  {kind: 'pause', id: 'end', dur: END_CARD},
];
const kept = (k: [number, number][]) => k.reduce((x, [a, b]) => x + (b - a), 0);
export const segSeconds4 = (s: Seg4) => (s.kind === 'oncam' ? kept(s.keeps) : s.kind === 'pause' ? s.dur : beatLayout(s.beats).total);
export const fullLayout = () => {
  let f = 0;
  return FULL_SEGMENTS.map((s) => { const dur = Math.round(segSeconds4(s) * FPS); const r = {seg: s, from: f, dur}; f += dur; return r; });
};
export const FULL_TOTAL = fullLayout().reduce((a, b) => a + b.dur, 0);
