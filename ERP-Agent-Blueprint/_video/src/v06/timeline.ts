import {vdur} from './cues';
import {FPS} from '../theme';
import clips from '../../work/v06/clips.json';
import harrison from '../../vo06/harrison06.json';
import jake from '../../vo06/jake.json';
import type {OnCamSeg, PauseSeg} from '../timeline';

export type ScreenSeg6 = {kind: 'screen'; id: string; section: 1 | 2 | 3 | 4 | 5 | 6; beats: string[]};
export type Seg6 = OnCamSeg | PauseSeg | ScreenSeg6;
export const BEAT_GAP = 0.45;
export const SCREEN_LEAD_IN = 1.0;
export const SCREEN_TAIL = 0.8;
/** Silent hold after a beat (s): the spoken Pause & Think questions stay on screen for 5 s. */
export const EXTRA_AFTER: Record<string, number> = {S3_06q: 5, S4_06q: 5, S5_05: 2.5, S6_05: 6};
const beats = (s: number, n: number) => Array.from({length: n}, (_, i) => `S${s}_${String(i + 1).padStart(2, '0')}`);
export const SEGMENTS: ScreenSeg6[] = [
  {kind: 'screen', id: 'S1', section: 1, beats: beats(1, 6)},
  {kind: 'screen', id: 'S2', section: 2, beats: beats(2, 7)},
  {kind: 'screen', id: 'S3', section: 3, beats: [...beats(3, 5), 'S3_06q']},
  {kind: 'screen', id: 'S4', section: 4, beats: [...beats(4, 5), 'S4_06q']},
  {kind: 'screen', id: 'S5', section: 5, beats: beats(5, 5)},
  {kind: 'screen', id: 'S6', section: 6, beats: beats(6, 5)},
];
export const beatLayout = (keys: string[]) => {
  let t = SCREEN_LEAD_IN;
  const starts: Record<string, number> = {};
  for (const k of keys) { starts[k] = t; t += vdur(k) + (EXTRA_AFTER[k] ?? 0) + BEAT_GAP; }
  return {starts, total: t - BEAT_GAP + SCREEN_TAIL};
};

type ClipInfo = {duration: number; from: number; to: number; keeps?: [number, number][]};
export const clipInfo = (n: number) => (clips as unknown as Record<string, ClipInfo>)[String(n)];
/** Per-clip end overrides (clip seconds): 12 = cut before the unfinished "Now here's something"; 10 = before the end-of-take blink. */
const CLIP_TO: Record<number, number> = {12: 18.25, 10: 23.25};
export const THINK_HOLD = 0; // pause holds live inside the screen sections (S3_06q, S4_06q)
export const END_CARD = 5;
/** Third-party voices in the Confident Intern story: presenter hidden and muted, the character speaks on a full-screen card. */
export const QUOTE_LEAD = 0.45, QUOTE_TAIL = 0.9;
export const HARRISON_DUR = QUOTE_LEAD + harrison.duration + QUOTE_TAIL;
export const JAKE_DUR = QUOTE_LEAD + jake.duration + 1.4;
const oc = (clip: number, section: OnCamSeg['section'], from?: number, to?: number, id?: string): OnCamSeg => {
  const c = {...clipInfo(clip)};
  if (CLIP_TO[clip]) c.to = CLIP_TO[clip];
  const f = from ?? c.from, t = to ?? c.to;
  const keeps = (c.keeps ?? [[f, t]]).map(([a, b]) => [Math.max(a, f), Math.min(b, t)] as [number, number]).filter(([a, b]) => b - a > 0.05);
  return {kind: 'oncam', id: id ?? `c${clip}`, clip, from: f, to: t, section, keeps: keeps.length ? keeps : [[f, t]]};
};
const scr = (id: string) => SEGMENTS.find((s) => s.id === id)!;
/** Clip 16 is split around the two quotes: "...asks him," | Harrison | "Jake doesn't actually know ... So he says," | Jake. */
export const C16A_END = 4.55, C16B_START = 7.95, C16B_END = 18.42;
export const FULL_SEGMENTS: Seg6[] = [
  oc(1, 'intro'), oc(2, 'intro'), oc(3, 'intro'), oc(4, 'intro'), oc(5, 'intro'), oc(6, 'intro'), oc(7, 'intro'),
  scr('S1'), scr('S2'),
  oc(8, 'story'), oc(9, 'story'), oc(10, 'story'), oc(11, 'story'), oc(12, 'story'), oc(13, 'story'), oc(14, 'story'),
  scr('S3'), scr('S4'), scr('S5'),
  oc(15, 'pause'), oc(16, 'pause', undefined, C16A_END, 'c16a'), {kind: 'pause', id: 'harrison', dur: HARRISON_DUR},
  oc(16, 'pause', C16B_START, C16B_END, 'c16b'), {kind: 'pause', id: 'jake', dur: JAKE_DUR},
  oc(17, 'pause'), oc(18, 'pause'), oc(19, 'pause'), oc(20, 'pause'), oc(21, 'pause'), oc(22, 'pause'),
  scr('S6'),
  oc(23, 'outro'), oc(24, 'outro'), oc(25, 'outro'), oc(26, 'outro'), oc(27, 'outro'), oc(28, 'outro'), oc(29, 'outro'), oc(30, 'outro'), oc(31, 'outro'), oc(32, 'outro'),
  {kind: 'pause', id: 'end', dur: END_CARD},
];
const kept = (k: [number, number][]) => k.reduce((x, [a, b]) => x + (b - a), 0);
export const segSeconds6 = (s: Seg6) => (s.kind === 'oncam' ? kept(s.keeps) : s.kind === 'pause' ? s.dur : beatLayout(s.beats).total);
export const fullLayout = () => {
  let f = 0;
  return FULL_SEGMENTS.map((s) => { const dur = Math.round(segSeconds6(s) * FPS); const r = {seg: s, from: f, dur}; f += dur; return r; });
};
export const FULL_TOTAL = fullLayout().reduce((a, b) => a + b.dur, 0);
