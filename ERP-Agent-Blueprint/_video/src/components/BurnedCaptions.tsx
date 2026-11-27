import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import capwords from '../data/capwords.json';
import {C, FPS, INTER} from '../theme';
import {pop} from '../lib/anim';

type W = {w: string; t: number; e: number};
const MAX = 22;
/** Chunks of ≤ MAX chars, never across sentence ends or long pauses. */
const chunk = (raw: [string, number, number][]): W[][] => {
  const WORDS: W[] = raw.map(([w, t, e]) => ({w: w.replace(/["“”]/g, ''), t, e}));
  const out: W[][] = [];
  let cur: W[] = [];
  for (const w of WORDS) {
    const len = [...cur, w].map((x) => x.w).join(' ').length;
    if (cur.length && (len > MAX || w.t - cur[cur.length - 1].e > 0.6)) { out.push(cur); cur = []; }
    cur.push(w);
    if (/[.?!]$/.test(w.w)) { out.push(cur); cur = []; }
  }
  if (cur.length) out.push(cur);
  return out;
};
const DEFAULT = chunk(capwords as [string, number, number][]);
const cache = new WeakMap<object, W[][]>();

/** Style B (approved): bold word-pop, smaller, in the bottom caption band only. `offset` = global seconds at frame 0. */
export const BurnedCaptions: React.FC<{offset?: number; words?: [string, number, number][]}> = ({offset = 0, words}) => {
  const f = useCurrentFrame();
  let CHUNKS = DEFAULT;
  if (words) { CHUNKS = cache.get(words) ?? chunk(words); cache.set(words, CHUNKS); }
  const STARTS = CHUNKS.map((c) => c[0].t);
  const g = offset + f / FPS;
  // binary search for the active chunk
  let lo = 0, hi = STARTS.length - 1, i = -1;
  while (lo <= hi) { const m = (lo + hi) >> 1; if (STARTS[m] - 0.05 <= g) { i = m; lo = m + 1; } else hi = m - 1; }
  if (i < 0) return null;
  const c = CHUNKS[i];
  const endT = Math.min(CHUNKS[i + 1]?.[0].t ?? Infinity, c[c.length - 1].e + 0.35);
  if (g > endT) return null;
  const local = (g - (c[0].t - 0.05)) * FPS;
  const p = pop(local, 0, 12);
  const active = c.findIndex((w, k) => g >= w.t && g < (c[k + 1]?.t ?? w.e + 0.3));
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 190, background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.45))'}} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 28, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: INTER,
        transform: `scale(${0.88 + 0.12 * p})`}}>
        <div style={{display: 'flex', gap: 16, fontSize: 50, fontWeight: 900, letterSpacing: -0.5, textTransform: 'uppercase'}}>
          {c.map((w, k) => {
            const on = k === active;
            return (
              <span key={k} style={{display: 'inline-block', color: on ? C.hi : C.white, transform: on ? 'scale(1.08) translateY(-2px)' : undefined,
                WebkitTextStroke: '8px #0B1220', paintOrder: 'stroke fill', textShadow: '0 5px 14px rgba(0,0,0,0.55)'}}>{w.w}</span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
