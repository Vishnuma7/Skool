import vo from '../../vo06/timings.json';
import words from '../data/words06.json';

type VoEntry = {text: string; duration: number; words: {w: string; t: number; d: number}[]};
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
export const voData = vo as unknown as Record<string, VoEntry>;
const find = (ws: string[], phrase: string, nth: number) => {
  const target = phrase.split(/\s+/).map(norm).filter(Boolean);
  let hits = 0;
  for (let i = 0; i <= ws.length - target.length; i++) {
    let ok = true;
    for (let j = 0; j < target.length; j++) if (!(ws[i + j] === target[j] || (j === target.length - 1 && ws[i + j].startsWith(target[j])))) { ok = false; break; }
    if (ok) { if (hits === nth) return i; hits++; }
  }
  return -1;
};
/** Seconds into VO paragraph `key` where `phrase` starts. */
export const vcue = (key: string, phrase: string, nth = 0): number => {
  const list = voData[key].words;
  const i = find(list.map((x) => norm(x.w)), phrase, nth);
  if (i < 0) throw new Error(`cue not found: "${phrase}" in v06 ${key}`);
  return list[i].t;
};
export const vdur = (key: string) => voData[key].duration;

type W = [string, number, number];
/** Clip-time seconds where `phrase` begins in V06 on-camera clip `clip`. */
export const cue = (clip: number, phrase: string, nth = 0): number => {
  const list = (words as unknown as Record<string, W[]>)[String(clip)] ?? [];
  const i = find(list.map(([w]) => norm(w)), phrase, nth);
  if (i < 0) throw new Error(`cue not found: "${phrase}" in v06 clip ${clip}`);
  return list[i][1];
};
