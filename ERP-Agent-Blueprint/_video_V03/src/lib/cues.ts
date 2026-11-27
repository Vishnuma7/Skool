import words from '../data/words.json';
import vo from '../../vo/timings.json';

type W = [string, number, number];
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const find = (list: {w: string; t: number}[], phrase: string, nth: number, label: string) => {
  const target = phrase.split(/\s+/).map(norm).filter(Boolean);
  const ws = list.map((x) => norm(x.w));
  let hits = 0;
  for (let i = 0; i <= ws.length - target.length; i++) {
    let ok = true;
    for (let j = 0; j < target.length; j++) {
      // allow prefix match on the last token (e.g. "remember" vs "remember,")
      if (!(ws[i + j] === target[j] || (j === target.length - 1 && ws[i + j].startsWith(target[j])))) {
        ok = false;
        break;
      }
    }
    if (ok) {
      if (hits === nth) return list[i].t;
      hits++;
    }
  }
  throw new Error(`cue not found: "${phrase}" in ${label}`);
};

/** Seconds (relative to processed clip start) where `phrase` begins in on-camera clip `clip`. */
export const cue = (clip: number, phrase: string, nth = 0): number => {
  const list = ((words as unknown as Record<string, W[]>)[String(clip)] ?? []).map(([w, t]) => ({w, t}));
  return find(list, phrase, nth, `clip ${clip}`);
};

export type VoKey = keyof typeof vo;
type VoEntry = {text: string; duration: number; words: {w: string; t: number; d: number}[]};
export const voData = vo as unknown as Record<string, VoEntry>;

/** Seconds (relative to the VO paragraph start) where `phrase` begins in VO paragraph `key`. */
export const vcue = (key: string, phrase: string, nth = 0): number => find(voData[key].words, phrase, nth, key);
export const vdur = (key: string) => voData[key].duration;
