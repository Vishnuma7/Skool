import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import capwords from './data/capwords.json';
import {Main} from './Main';
import {Bg} from './components/Bg';
import {C, FPS, INTER} from './theme';
import {pop, prog} from './lib/anim';
import {beatLayout, clipToSeg, layout, OnCamSeg, ScreenSeg} from './timeline';

type W = {w: string; t: number; e: number};
const WORDS: W[] = (capwords as [string, number, number][]).map(([w, t, e]) => ({w, t, e}));

// ---------------------------------------------------------------- excerpts (global seconds)
const L = layout();
const segOf = (id: string) => L.find((x) => x.seg.id === id)!;
const c3 = segOf('c3');
const c3seg = c3.seg as OnCamSeg;
const EX_CAM = {a: c3.from / FPS + clipToSeg(c3seg.keeps, 5.95, true)!, b: c3.from / FPS + clipToSeg(c3seg.keeps, 12.15, true)!};
const s1 = segOf('S1');
const s1starts = beatLayout((s1.seg as ScreenSeg).beats).starts;
const EX_SCR = {a: s1.from / FPS + s1starts.S1_07 - 0.3, b: s1.from / FPS + s1starts.S1_07 + 8.3};
const TITLE = 1.3;
const CAM_LEN = EX_CAM.b - EX_CAM.a;
const SCR_LEN = EX_SCR.b - EX_SCR.a;
export const BLOCK = TITLE + CAM_LEN + SCR_LEN;

type StyleId = 'A' | 'B' | 'C' | 'D';
const STYLES: {id: StyleId; name: string; desc: string; max: number}[] = [
  {id: 'A', name: 'Classic subtitle', desc: 'Two lines · white on a soft dark box', max: 84},
  {id: 'B', name: 'Bold word-pop', desc: 'Big bold words · spoken word turns yellow', max: 18},
  {id: 'C', name: 'Brand karaoke pill', desc: 'One line · navy pill · current word in brand blue', max: 34},
  {id: 'D', name: 'Minimal clean', desc: 'One quiet line · soft shadow · no box', max: 46},
];
export const SAMPLE_FRAMES = Math.round(BLOCK * STYLES.length * FPS);

/** Group words (within [a,b]) into chunks of ≤ max chars; never across sentence ends. */
const chunks = (a: number, b: number, max: number) => {
  const ws = WORDS.filter((w) => w.t >= a - 0.05 && w.t < b);
  const out: W[][] = [];
  let cur: W[] = [];
  for (const w of ws) {
    const len = [...cur, w].map((x) => x.w).join(' ').length;
    if (cur.length && (len > max || w.t - cur[cur.length - 1].e > 0.6)) { out.push(cur); cur = []; }
    cur.push(w);
    if (/[.?!]["”]?$/.test(w.w)) { out.push(cur); cur = []; }
  }
  if (cur.length) out.push(cur);
  return out;
};

const Caption: React.FC<{style: StyleId; g: number; range: {a: number; b: number}; max: number}> = ({style, g, range, max}) => {
  const cs = chunks(range.a, range.b, max);
  const i = cs.findIndex((c, k) => g >= c[0].t - 0.05 && g < (cs[k + 1]?.[0].t ?? c[c.length - 1].e + 0.4) - 0.02);
  if (i < 0) return null;
  const c = cs[i];
  const local = (g - (c[0].t - 0.05)) * FPS;
  const active = c.findIndex((w, k) => g >= w.t && g < (c[k + 1]?.t ?? w.e + 0.3));
  const band: React.CSSProperties = {position: 'absolute', left: 0, right: 0, bottom: 0, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: INTER};

  if (style === 'A') {
    const text = c.map((w) => w.w).join(' ');
    // balance into ≤2 lines
    let lines = [text];
    if (text.length > 44) {
      let best = 1, bd = 1e9;
      for (let k = 1; k < c.length; k++) {
        const l1 = c.slice(0, k).map((w) => w.w).join(' '), l2 = c.slice(k).map((w) => w.w).join(' ');
        const d = Math.abs(l1.length - l2.length);
        if (d < bd) { bd = d; best = k; }
      }
      lines = [c.slice(0, best).map((w) => w.w).join(' '), c.slice(best).map((w) => w.w).join(' ')];
    }
    return (
      <div style={{...band, opacity: prog(local, 0, 4)}}>
        <div style={{background: 'rgba(8,12,22,0.72)', borderRadius: 12, padding: '10px 22px', textAlign: 'center', color: C.white, fontSize: 38, fontWeight: 600, lineHeight: 1.3}}>
          {lines.map((l, k) => <div key={k}>{l}</div>)}
        </div>
      </div>
    );
  }
  const clean = (w: string) => w.replace(/["“”]/g, '');
  const scrim = <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 280, background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.6))'}} />;
  if (style === 'B') {
    const p = pop(local, 0, 11);
    return (
      <>{scrim}
      <div style={{...band, transform: `scale(${0.85 + 0.15 * p})`}}>
        <div style={{display: 'flex', gap: 22, fontSize: 70, fontWeight: 900, letterSpacing: -1, textTransform: 'uppercase'}}>
          {c.map((w, k) => {
            const on = k === active;
            return (
              <span key={k} style={{color: on ? C.hi : C.white, transform: on ? 'scale(1.1) translateY(-3px)' : undefined, display: 'inline-block',
                WebkitTextStroke: '10px #0B1220', paintOrder: 'stroke fill', textShadow: '0 6px 16px rgba(0,0,0,0.55)'}}>{clean(w.w)}</span>
            );
          })}
        </div>
      </div></>
    );
  }
  if (style === 'C') {
    const p = pop(local, 0, 14);
    return (
      <div style={{...band, opacity: p, transform: `translateY(${(1 - p) * 16}px)`}}>
        <div style={{display: 'flex', gap: 6, background: 'rgba(31,42,68,0.94)', borderRadius: 999, padding: '14px 26px', boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          border: '2px solid rgba(255,255,255,0.12)', fontSize: 42, fontWeight: 700}}>
          {c.map((w, k) => {
            const done = k < active || (active < 0 && g > w.t);
            const on = k === active;
            return (
              <span key={k} style={{padding: '2px 10px', borderRadius: 12, background: on ? C.blue : 'transparent', color: on || done ? C.white : 'rgba(255,255,255,0.55)'}}>{clean(w.w)}</span>
            );
          })}
        </div>
      </div>
    );
  }
  // D
  return (
    <>{scrim}
    <div style={{...band, justifyContent: 'flex-start', paddingLeft: 110, opacity: prog(local, 0, 6)}}>
      <div style={{color: C.white, fontSize: 40, fontWeight: 500, letterSpacing: 0.2, textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 0 18px rgba(0,0,0,0.6)', borderLeft: `4px solid ${C.hi}`, paddingLeft: 18}}>
        {c.map((w) => w.w).join(' ')}
      </div>
    </div></>
  );
};

/** Plays the real edit from global second `g0` for `len` seconds. `inset` shrinks the picture to leave a caption band. */
const Excerpt: React.FC<{g0: number; inset?: boolean}> = ({g0, inset}) => (
  <AbsoluteFill>
    <Bg />
    <AbsoluteFill style={inset ? {transform: 'translateY(14px) scale(0.855)', transformOrigin: '50% 0%'} : undefined}>
      <Sequence from={-Math.round(g0 * FPS)} layout="absolute-fill">
        <Main />
      </Sequence>
    </AbsoluteFill>
  </AbsoluteFill>
);

const TitleCard: React.FC<{s: (typeof STYLES)[number]; n: number}> = ({s, n}) => {
  const f = useCurrentFrame();
  const p = pop(f, 0, 16);
  return (
    <AbsoluteFill style={{fontFamily: INTER, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <Bg />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: p, transform: `scale(${0.92 + 0.08 * p})`}}>
        <div style={{fontSize: 30, fontWeight: 800, letterSpacing: 6, color: C.hi}}>CAPTION STYLE {n} OF 4</div>
        <div style={{fontSize: 96, fontWeight: 800, color: C.white, marginTop: 10}}>Style {s.id} · {s.name}</div>
        <div style={{fontSize: 36, fontWeight: 600, color: 'rgba(255,255,255,0.75)', marginTop: 12}}>{s.desc}</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Labeled: React.FC<{text: string}> = ({text}) => (
  <div style={{position: 'absolute', top: 18, right: 22, padding: '8px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.55)', color: C.white, fontFamily: INTER, fontSize: 22, fontWeight: 700}}>{text}</div>
);

const CaptionLayer: React.FC<{style: StyleId; g0: number; range: {a: number; b: number}; max: number}> = ({style, g0, range, max}) => {
  const f = useCurrentFrame();
  return <Caption style={style} g={g0 + f / FPS} range={range} max={max} />;
};

export const CaptionSamples: React.FC = () => {
  const F = (s: number) => Math.round(s * FPS);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {STYLES.map((s, i) => {
        const b0 = i * BLOCK;
        return (
          <React.Fragment key={s.id}>
            <Sequence from={F(b0)} durationInFrames={F(TITLE)}><TitleCard s={s} n={i + 1} /></Sequence>
            <Sequence from={F(b0 + TITLE)} durationInFrames={F(CAM_LEN)}>
              <Excerpt g0={EX_CAM.a} />
              <CaptionLayer style={s.id} g0={EX_CAM.a} range={EX_CAM} max={s.max} />
              <Labeled text={`Style ${s.id} · on camera`} />
            </Sequence>
            <Sequence from={F(b0 + TITLE + CAM_LEN)} durationInFrames={F(SCR_LEN)}>
              <Excerpt g0={EX_SCR.a} inset />
              <CaptionLayer style={s.id} g0={EX_SCR.a} range={EX_SCR} max={s.max} />
              <Labeled text={`Style ${s.id} · screen recording`} />
            </Sequence>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
