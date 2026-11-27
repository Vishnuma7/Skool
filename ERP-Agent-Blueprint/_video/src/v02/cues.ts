import words from '../data/words02.json';
import vo from '../../vo02/timings.json';

type W = [string, number, number];
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const find = (list: {w: string; t: number}[], phrase: string, nth: number, label: string) => {
  const target = phrase.split(/\s+/).map(norm).filter(Boolean);
  const ws = list.map((x) => norm(x.w));
  let hits = 0;
  for (let i = 0; i <= ws.length - target.length; i++) {
    let ok = true;
    for (let j = 0; j < target.length; j++) {
      if (!(ws[i + j] === target[j] || (j === target.length - 1 && ws[i + j].startsWith(target[j])))) { ok = false; break; }
    }
    if (ok) { if (hits === nth) return list[i].t; hits++; }
  }
  throw new Error(`cue not found: "${phrase}" in ${label}`);
};
/** Clip-time seconds where `phrase` begins in V02 on-camera clip `clip`. */
export const cue = (clip: number, phrase: string, nth = 0): number =>
  find(((words as unknown as Record<string, W[]>)[String(clip)] ?? []).map(([w, t]) => ({w, t})), phrase, nth, `v02 clip ${clip}`);
type VoEntry = {text: string; duration: number; words: {w: string; t: number; d: number}[]};
export const voData = vo as unknown as Record<string, VoEntry>;
export const vcue = (key: string, phrase: string, nth = 0): number => find(voData[key].words, phrase, nth, `v02 ${key}`);
export const vdur = (key: string) => voData[key].duration;
