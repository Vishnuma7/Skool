/** About video timeline: jump-cut pieces (from keeps.json) laid end to end, and every word remapped to global time. */
import keepsJson from './keeps.json';
import wordsJson from './words.json';

export const FPS = 30;
export const TAKES = ['ab_1', 'ab_2', 'ab_3', 'ab_4', 'ab_5', 'ab_6', 'ab_7', 'ab_8'] as const;
export type Take = (typeof TAKES)[number];

const KEEPS = keepsJson as Record<Take, [number, number][]>;
const RAW_WORDS = wordsJson as Record<Take, [string, number, number][]>;

/** Spoken-word fixes for captions (Whisper mishearings). */
const FIX: Record<string, string> = {rotations: 'professionals', 'rotations,': 'professionals'};

export type Piece = {take: Take; ti: number; idx: number; a: number; b: number; f0: number; f1: number};

/** Extra seconds held after the last word of a take (a beat for a graphic to land). */
const TAIL: Partial<Record<Take, number>> = {ab_5: 0.35};

export const PIECES: Piece[] = (() => {
  const out: Piece[] = [];
  let acc = 0;
  TAKES.forEach((take, ti) => {
    const ks = KEEPS[take];
    ks.forEach(([a, b0], idx) => {
      const b = idx === ks.length - 1 ? b0 + (TAIL[take] ?? 0) : b0;
      const f0 = Math.round(acc * FPS);
      acc += b - a;
      out.push({take, ti, idx, a, b, f0, f1: Math.round(acc * FPS)});
    });
  });
  return out;
})();

export const SPEECH_END = PIECES[PIECES.length - 1].f1 / FPS;
export const END_CARD = 2.6;
export const TOTAL_FRAMES = PIECES[PIECES.length - 1].f1 + Math.round(END_CARD * FPS);

const piecesOf = (take: Take) => PIECES.filter((p) => p.take === take);
export const takeStart = (take: Take) => piecesOf(take)[0].f0 / FPS;
export const takeEnd = (take: Take) => {
  const ps = piecesOf(take);
  return ps[ps.length - 1].f1 / FPS;
};

/** Take-local seconds -> global seconds (times inside a cut snap to the next kept piece). */
export const G = (take: Take, t: number) => {
  const ps = piecesOf(take);
  for (const p of ps) {
    if (t < p.a) return p.f0 / FPS;
    if (t <= p.b) return p.f0 / FPS + (t - p.a);
  }
  return ps[ps.length - 1].f1 / FPS;
};

export type Word = {w: string; t: number; e: number; take: Take};
export const WORDS: Word[] = TAKES.flatMap((take) => {
  const onset = KEEPS[take][0][0] + 0.1; // keeps carry 0.1 s of pre-roll before speech
  return RAW_WORDS[take].map(([w, s, e], i) => {
    const start = i === 0 ? Math.max(s, onset) : s;
    return {w: FIX[w.toLowerCase()] ?? w, t: G(take, start), e: G(take, Math.max(e, start + 0.12)), take};
  });
});

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9']/g, '');
/** Global start time of the nth occurrence of `word` in `take`. Throws if missing so a script change can't silently break a cue. */
export const at = (take: Take, word: string, nth = 0) => {
  const hits = WORDS.filter((w) => w.take === take && norm(w.w) === norm(word));
  if (!hits[nth]) throw new Error(`cue word "${word}" (#${nth}) not found in ${take}`);
  return hits[nth].t;
};
export const endOf = (take: Take, word: string, nth = 0) => {
  const hits = WORDS.filter((w) => w.take === take && norm(w.w) === norm(word));
  if (!hits[nth]) throw new Error(`cue word "${word}" (#${nth}) not found in ${take}`);
  return hits[nth].e;
};
