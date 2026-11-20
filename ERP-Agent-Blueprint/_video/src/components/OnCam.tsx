import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FPS, shadow} from '../theme';
import {lerp} from '../lib/anim';
import {clipToSeg, segToClip} from '../timeline';
import {Bg} from './Bg';

export type GProps = {
  /** frames since the graphic started */
  f: number;
  /** total visible frames (a→b) */
  dur: number;
  /** 0→1 exit progress (after b) */
  out: number;
  /** clip time in seconds */
  t: number;
};
export type Graphic = {
  a: number;
  b: number;
  /** 'side' = presenter moves into a rounded frame on the right, graphic gets the left 60%. */
  side?: boolean;
  el: (p: GProps) => React.ReactNode;
};

const RAMP = 0.55; // seconds for presenter to move in/out of the side frame
const ease = Easing.inOut(Easing.cubic);
/** Side-frame amount. Side graphics closer than MERGE s are treated as one block so the presenter
 *  never bounces out and back between consecutive cards (that read as a "flash"). */
const MERGE = 1.2;
const sideBlocks = (gs: Graphic[]) => {
  const iv = gs.filter((g) => g.side).map((g) => [g.a, g.b] as [number, number]).sort((x, y) => x[0] - y[0]);
  const out: [number, number][] = [];
  for (const [a, b] of iv) {
    const last = out[out.length - 1];
    if (last && a - last[1] < MERGE) last[1] = Math.max(last[1], b);
    else out.push([a, b]);
  }
  return out;
};
const sideAmount = (t: number, gs: Graphic[]) =>
  sideBlocks(gs).reduce((m, [a, b]) => {
    const v = Math.min(
      interpolate(t, [a - RAMP * 0.3, a + RAMP * 0.7], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease}),
      interpolate(t, [b - RAMP * 0.2, b + RAMP * 0.8], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease}),
    );
    return Math.max(m, v);
  }, 0);

export const SIDE_RECT = {x: 1196, y: 150, w: 640, h: 780};
export const GRAPHIC_AREA = {x: 96, y: 110, w: 1020, h: 860};

export const OnCamSegment: React.FC<{clip: number; from: number; to: number; keeps: [number, number][]; graphics: Graphic[]; punch?: number; hideAt?: number}> = ({
  clip, from, to, keeps, graphics, punch = 1, hideAt,
}) => {
  const frame = useCurrentFrame();
  const t = segToClip(keeps, frame / FPS);
  // piece boundaries in frames (cumulative rounding keeps the total exact)
  let acc = 0;
  const pieces = keeps.map(([a, b]) => {
    const f0 = Math.round(acc * FPS);
    acc += b - a;
    return {a, f0, f1: Math.round(acc * FPS)};
  });
  const s = sideAmount(t, graphics);
  const r = {
    x: lerp(0, SIDE_RECT.x, s),
    y: lerp(0, SIDE_RECT.y, s),
    w: lerp(1920, SIDE_RECT.w, s),
    h: lerp(1080, SIDE_RECT.h, s),
    rad: lerp(0, 36, s),
  };
  const zoom = lerp(punch, 1.04, s);
  // hideAt: presenter steps out (e.g. eyes drift at the end of a take) — card slides to the centre, full focus
  const h = hideAt === undefined ? 0 : interpolate(t, [hideAt, hideAt + 0.35], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const shiftX = h * (960 - (GRAPHIC_AREA.x + GRAPHIC_AREA.w / 2));
  return (
    <AbsoluteFill>
      <Bg />
      <div
        style={{
          position: 'absolute', left: r.x, top: r.y, width: r.w, height: r.h, borderRadius: r.rad, overflow: 'hidden', opacity: 1 - h,
          boxShadow: s > 0.01 ? shadow : undefined,
          outline: s > 0.01 ? `${4 * s}px solid rgba(255,255,255,${0.85 * s})` : undefined,
        }}
      >
        {pieces.map((p, i) => (
          <Sequence key={i} from={p.f0} durationInFrames={Math.max(1, p.f1 - p.f0)} layout="none">
            <OffthreadVideo
              src={staticFile(`oncam/${clip}.mp4`)}
              startFrom={Math.round(p.a * FPS)}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 18%',
                transform: `scale(${zoom})`, transformOrigin: '50% 18%',
              }}
            />
          </Sequence>
        ))}
      </div>
      <AbsoluteFill style={{transform: `translateX(${shiftX}px)`}}>
      {s > 0.01 && (
        <div style={{position: 'absolute', left: GRAPHIC_AREA.x, top: GRAPHIC_AREA.y, width: GRAPHIC_AREA.w, height: GRAPHIC_AREA.h, borderRadius: 36,
          background: 'rgba(255,255,255,0.97)', boxShadow: shadow, opacity: s, transform: `translateX(${(1 - s) * -40}px)`}} />
      )}
      {/* SFX: whoosh only when a side block starts (not on every card), soft pop for small tags */}
      {[...sideBlocks(graphics).map(([a]) => ({a, kind: 'whoosh'})), ...graphics.filter((g) => !g.side).map((g) => ({a: g.a, kind: 'pop'}))]
        .filter((x) => x.a >= from + 0.05 && x.a < to - 0.3).map((x, i) => (
          <Sequence key={`sfx${i}`} from={Math.round((clipToSeg(keeps, x.a, true) ?? 0) * FPS)} durationInFrames={30} layout="none">
            <Audio src={staticFile(`sfx/${x.kind}.wav`)} volume={x.kind === 'whoosh' ? 0.35 : 0.3} />
          </Sequence>
        ))}
      {graphics.map((g, i) => {
        if (t < g.a - 0.05 || t > g.b + 0.6) return null;
        const f = Math.round((t - g.a) * FPS);
        const out = interpolate(t, [g.b, g.b + 0.35], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
        return (
          <AbsoluteFill key={i} style={{opacity: 1 - out, transform: g.side ? undefined : `translateY(${out * -14}px)`}}>
            {g.el({f, dur: Math.round((g.b - g.a) * FPS), out, t})}
          </AbsoluteFill>
        );
      })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
