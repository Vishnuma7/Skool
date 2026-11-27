import vo from '../../vo04/timings.json';
type VoEntry = {text: string; duration: number; words: {w: string; t: number; d: number}[]};
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
export const voData = vo as unknown as Record<string, VoEntry>;
/** Seconds into VO paragraph `key` where `phrase` starts. */
export const vcue = (key: string, phrase: string, nth = 0): number => {
  const list = voData[key].words;
  const target = phrase.split(/\s+/).map(norm).filter(Boolean);
  const ws = list.map((x) => norm(x.w));
  let hits = 0;
  for (let i = 0; i <= ws.length - target.length; i++) {
    let ok = true;
    for (let j = 0; j < target.length; j++) if (!(ws[i + j] === target[j] || (j === target.length - 1 && ws[i + j].startsWith(target[j])))) { ok = false; break; }
    if (ok) { if (hits === nth) return list[i].t; hits++; }
  }
  throw new Error(`cue not found: "${phrase}" in v04 ${key}`);
};
export const vdur = (key: string) => voData[key].duration;

import words from '../data/words04.json';
type W = [string, number, number];
/** Clip-time seconds where `phrase` begins in V04 on-camera clip `clip`. */
export const cue = (clip: number, phrase: string, nth = 0): number => {
  const list = ((words as unknown as Record<string, W[]>)[String(clip)] ?? []).map(([w, t]) => ({w, t}));
  const target = phrase.split(/\s+/).map(norm).filter(Boolean);
  const ws = list.map((x) => norm(x.w));
  let hits = 0;
  for (let i = 0; i <= ws.length - target.length; i++) {
    let ok = true;
    for (let j = 0; j < target.length; j++) if (!(ws[i + j] === target[j] || (j === target.length - 1 && ws[i + j].startsWith(target[j])))) { ok = false; break; }
    if (ok) { if (hits === nth) return list[i].t; hits++; }
  }
  throw new Error(`cue not found: "${phrase}" in v04 clip ${clip}`);
};
