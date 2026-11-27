import clips from '../../work/v02/clips.json';
import {vdur} from './cues';
import {FPS} from '../theme';
import type {OnCamSeg, PauseSeg} from '../timeline';

export type ScreenSeg2 = {kind: 'screen'; id: string; section: 1 | 2 | 3 | 4 | 5; beats: string[]};
export type Seg2 = OnCamSeg | PauseSeg | ScreenSeg2;

export const BEAT_GAP = 0.45;
export const SCREEN_LEAD_IN = 1.0;
export const SCREEN_TAIL = 0.8;
export const THINK_HOLD = 8;
export const END_CARD = 5;

type ClipInfo = {duration: number; from: number; to: number; keeps?: [number, number][]};
export const clipInfo = (n: number) => (clips as unknown as Record<string, ClipInfo>)[String(n)];
const keepsIn = (clip: number, from: number, to: number): [number, number][] => {
  const k = clipInfo(clip).keeps ?? [[from, to]];
  const out = k.map(([a, b]) => [Math.max(a, from), Math.min(b, to)] as [number, number]).filter(([a, b]) => b - a > 0.05);
  return out.length ? out : [[from, to]];
};
const oc = (clip: number, section: OnCamSeg['section']): OnCamSeg => {
  const f = clipInfo(clip).from, t = clipInfo(clip).to;
  return {kind: 'oncam', id: `c${clip}`, clip, from: f, to: t, section, keeps: keepsIn(clip, f, t)};
};
const beats = (s: number, n: number) => Array.from({length: n}, (_, i) => `S${s}_${String(i + 1).padStart(2, '0')}`);

export const SEGMENTS: Seg2[] = [
  oc(1, 'intro'), oc(2, 'intro'), oc(3, 'intro'), oc(4, 'intro'),
  {kind: 'screen', id: 'S1', section: 1, beats: beats(1, 13)},
  {kind: 'screen', id: 'S2', section: 2, beats: beats(2, 10)},
  {kind: 'pause', id: 'think', dur: THINK_HOLD},
  oc(5, 'story'), oc(6, 'story'), oc(7, 'story'), oc(8, 'story'),
  {kind: 'screen', id: 'S3', section: 3, beats: beats(3, 13)},
  {kind: 'screen', id: 'S4', section: 4, beats: beats(4, 11)},
  oc(9, 'pause'), oc(10, 'pause'), oc(11, 'pause'), oc(12, 'pause'),
  {kind: 'screen', id: 'S5', section: 5, beats: beats(5, 12)},
  oc(13, 'outro'), oc(14, 'outro'), oc(15, 'outro'), oc(16, 'outro'), oc(17, 'outro'),
  {kind: 'pause', id: 'end', dur: END_CARD},
];

export const beatLayout = (keys: string[]) => {
  let t = SCREEN_LEAD_IN;
  const starts: Record<string, number> = {};
  for (const k of keys) { starts[k] = t; t += vdur(k) + BEAT_GAP; }
  return {starts, total: t - BEAT_GAP + SCREEN_TAIL};
};
const kept = (k: [number, number][]) => k.reduce((x, [a, b]) => x + (b - a), 0);
export const segSeconds = (s: Seg2) => (s.kind === 'oncam' ? kept(s.keeps) : s.kind === 'pause' ? s.dur : beatLayout(s.beats).total);
export const layout = () => {
  let f = 0;
  return SEGMENTS.map((s) => { const dur = Math.round(segSeconds(s) * FPS); const r = {seg: s, from: f, dur}; f += dur; return r; });
};
export const TOTAL_FRAMES = layout().reduce((a, b) => a + b.dur, 0);
