import React from 'react';
import {interpolate} from 'remotion';
import {C, INTER, shadow, softShadow} from '../theme';
import {pop, prog} from '../lib/anim';
import {GRAPHIC_AREA} from './OnCam';

const base: React.CSSProperties = {fontFamily: INTER, color: C.navy};

/** Big content area on the left when the presenter is in the side frame. */
/** Content area on the left of the side frame. The white card itself is drawn once by OnCamSegment (stable backdrop),
 *  so consecutive Stages crossfade their content instead of flashing the card. */
export const Stage: React.FC<{children: React.ReactNode; f: number; light?: boolean; style?: React.CSSProperties}> = ({
  children, f, light = false, style,
}) => {
  const p = prog(f, 0, 10);
  return (
    <div
      style={{
        ...base, position: 'absolute', left: GRAPHIC_AREA.x, top: GRAPHIC_AREA.y, width: GRAPHIC_AREA.w,
        height: GRAPHIC_AREA.h, borderRadius: 36, padding: '56px 64px', boxSizing: 'border-box',
        background: light ? 'rgba(255,255,255,0.97)' : 'transparent', boxShadow: light ? shadow : undefined,
        opacity: p, display: 'flex', flexDirection: 'column', justifyContent: 'center', ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Kicker: React.FC<{children: React.ReactNode; color?: string; f?: number}> = ({children, color = C.blue, f = 99}) => (
  <div
    style={{
      fontSize: 22, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color, marginBottom: 14,
      opacity: prog(f, 0, 10),
    }}
  >
    {children}
  </div>
);

export const Heading: React.FC<{children: React.ReactNode; size?: number; f?: number; delay?: number; color?: string}> = ({
  children, size = 54, f = 99, delay = 0, color = C.navy,
}) => {
  const p = pop(f, delay, 16);
  return (
    <div style={{fontSize: size, fontWeight: 800, lineHeight: 1.12, letterSpacing: -1, color, opacity: p, transform: `translateY(${(1 - p) * 18}px)`}}>
      {children}
    </div>
  );
};

/** One row of an animated list. `at` = frame (relative to the graphic) when it appears. */
export const Item: React.FC<{
  f: number; at: number; icon?: React.ReactNode; children: React.ReactNode; color?: string; size?: number; done?: number;
  tone?: 'light' | 'dark'; align?: 'center' | 'start';
}> = ({f, at, icon, children, color = C.blue, size = 36, done, tone = 'light', align = 'center'}) => {
  const p = pop(f, at, 15);
  const d = done !== undefined ? prog(f, done, done + 10) : 0;
  return (
    <div
      style={{
        display: 'flex', alignItems: align === 'start' ? 'flex-start' : 'center', gap: 22, padding: '16px 22px', borderRadius: 20, marginBottom: 14,
        background: tone === 'light' ? (d > 0 ? `rgba(22,163,74,${0.1 * d})` : '#F1F5F9') : 'rgba(255,255,255,0.08)',
        opacity: p, transform: `translateX(${(1 - p) * 40}px) scale(${0.96 + 0.04 * p})`,
        fontSize: size, fontWeight: 600, color: tone === 'light' ? C.navy : C.white,
      }}
    >
      {icon && (
        <div
          style={{
            width: size * 1.6, height: size * 1.6, borderRadius: 14, background: color, color: C.white, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {icon}
        </div>
      )}
      <div style={{flex: 1}}>{children}</div>
    </div>
  );
};

export const Counter: React.FC<{f: number; from?: number; to: number; at?: number; dur?: number; fmt?: (n: number) => string}> = ({
  f, from = 0, to, at = 0, dur = 24, fmt = (n) => Math.round(n).toLocaleString('en-US'),
}) => <>{fmt(interpolate(prog(f, at, at + dur), [0, 1], [from, to]))}</>;

export const Chip: React.FC<{children: React.ReactNode; color?: string; bg?: string; f?: number; at?: number; size?: number; style?: React.CSSProperties}> = ({
  children, color = C.navy, bg = C.slateSoft, f = 99, at = 0, size = 26, style,
}) => {
  const p = pop(f, at, 13);
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderRadius: 999, background: bg, color,
        fontSize: size, fontWeight: 700, opacity: p, transform: `scale(${0.7 + 0.3 * p})`, ...style,
      }}
    >
      {children}
    </span>
  );
};

/** ON-SCREEN TEXT lower third (navy pill). */
export const LowerThird: React.FC<{f: number; children: React.ReactNode; bottom?: number}> = ({f, children, bottom = 70}) => {
  const p = pop(f, 0, 16);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom, display: 'flex', justifyContent: 'center'}}>
      <div
        style={{
          ...base, background: C.navy, color: C.white, fontSize: 34, fontWeight: 600, padding: '20px 40px', borderRadius: 999,
          boxShadow: shadow, maxWidth: 1760, textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * 30}px)`,
          borderLeft: `8px solid ${C.hi}`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** Floating card beside the presenter while they stay full-frame. */
export const SideTag: React.FC<{f: number; side?: 'left' | 'right'; top?: number; width?: number; children: React.ReactNode; dark?: boolean}> = ({
  f, side = 'left', top = 300, width = 470, children, dark,
}) => {
  const p = pop(f, 0, 15);
  const pos = side === 'left' ? {left: 80} : {right: 80};
  return (
    <div
      style={{
        ...base, position: 'absolute', top, width, ...pos, padding: '30px 34px', borderRadius: 28, boxSizing: 'border-box',
        background: dark ? 'rgba(15,23,42,0.88)' : 'rgba(255,255,255,0.96)', color: dark ? C.white : C.navy,
        boxShadow: shadow, backdropFilter: 'blur(8px)',
        opacity: p, transform: `translateX(${(1 - p) * (side === 'left' ? -50 : 50)}px)`,
      }}
    >
      {children}
    </div>
  );
};

/** Title lower-left lower third for names/labels over the presenter. */
export const NameBar: React.FC<{f: number; title: string; sub?: string}> = ({f, title, sub}) => {
  const p = pop(f, 0, 16);
  const w = prog(f, 4, 18);
  return (
    <div style={{...base, position: 'absolute', left: 90, bottom: 110, opacity: p}}>
      <div style={{height: 6, width: 120 * w, background: C.hi, borderRadius: 3, marginBottom: 14}} />
      <div style={{background: 'rgba(15,23,42,0.9)', color: C.white, padding: '18px 30px', borderRadius: 18, boxShadow: softShadow}}>
        <div style={{fontSize: 38, fontWeight: 800}}>{title}</div>
        {sub && <div style={{fontSize: 24, fontWeight: 500, opacity: 0.8, marginTop: 4}}>{sub}</div>}
      </div>
    </div>
  );
};
