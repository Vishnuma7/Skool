import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {C, FPS, INTER, shadow} from '../theme';
import {pop, prog} from '../lib/anim';
import {Bg} from '../components/Bg';
import {LowerThird} from '../components/Gfx';
import {BrowserFrame, Box, CK, Cursor, FRAME, K, mid, Overlay, Rect, Shot, TABS, tabPoint, vis} from '../screen/kit';
import caprects from './caprects.json';

/** Extra browser tabs used in Video 06. */
Object.assign(TABS, {
  n8n6: {id: 'n8n6', title: 'Stocky v1 – Reads the ERP - n8n', url: 'brightleaf.app.n8n.cloud/workflow/CnZDME5og3w9lC4Q', color: '#EA4B71', letter: 'n', logo: 'n8n_mark'},
  odoo6: {id: 'odoo6', title: 'Pallet Jack Wheels (set) - Odoo', url: 'brightleaf-supplies.odoo.com/odoo/action-703', color: C.odoo, letter: 'O', logo: 'odoo_mark'},
});

const RECTS = caprects as unknown as Record<string, Record<string, Rect | null>>;
/** Rect in page px, clamped to the visible page (whole-row / whole-column selections measure past the edge). */
export const R = (shot: string, key: string): Rect | null => {
  const r = RECTS[shot]?.[key]; if (!r) return null;
  const x0 = Math.max(0, r.x), y0 = Math.max(0, r.y), x1 = Math.min(1910, r.x + r.w), y1 = Math.min(1070, r.y + r.h);
  return x1 > x0 && y1 > y0 ? {x: x0, y: y0, w: x1 - x0, h: y1 - y0} : null;
};

export type View = {at: number; tab: string; shot?: string; el?: React.ReactNode; url?: React.ReactNode | ((t: number) => React.ReactNode); title?: string};
export type BoxSpec = {shot: string; key: string; a: number; b: number; pad?: number; radius?: number; color?: string};
export type KeySpec = {t: number; shot?: string; key?: string; x?: number; y?: number; dx?: number; dy?: number; click?: boolean; tab?: string};
/** stage: drawn on top of the browser in stage coords (moves with it, e.g. URL highlight). Otherwise a callout card shown in the side panel. */
export type OverlaySpec = {a: number; b: number; el: (f: number) => React.ReactNode; stage?: boolean};

/** Split layout for callouts: the browser glides left and shrinks, the card gets its own panel on the right, so nothing covers the app. */
const SPLIT = {s: 0.8, left: 20, panelX: 1392, panelW: 500};
const SPLIT_TOP = (1080 - (FRAME.chrome + 1080 * K) * SPLIT.s) / 2;
const SPLIT_TX = SPLIT.left - FRAME.x * SPLIT.s, SPLIT_TY = SPLIT_TOP - FRAME.y * SPLIT.s;
const MERGE = 1.4, RAMP = 0.5;
const ease = Easing.inOut(Easing.cubic);
const splitAmount = (t: number, os: OverlaySpec[]) => {
  const iv = os.filter((o) => !o.stage).map((o) => [o.a, o.b] as [number, number]).sort((x, y) => x[0] - y[0]);
  const blocks: [number, number][] = [];
  for (const [a, b] of iv) { const l = blocks[blocks.length - 1]; if (l && a - l[1] < MERGE) l[1] = Math.max(l[1], b); else blocks.push([a, b]); }
  return blocks.reduce((m, [a, b]) => Math.max(m, Math.min(
    interpolate(t, [a - RAMP * 0.4, a + RAMP * 0.6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease}),
    interpolate(t, [b, b + RAMP], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease}))), 0);
};
/** True inside the side panel: FloatCard ignores its x/y and flows in the panel column. */
const PanelCtx = React.createContext(false);
export type LowerSpec = {a: number; b: number; text: string};

/** One screen section: views cross-fade at their `at` times; boxes, cursor and overlays are timed in section seconds. */
export const SectionView: React.FC<{tabs: string[]; views: View[]; boxes?: BoxSpec[]; keys?: KeySpec[]; overlays?: OverlaySpec[]; lowers?: LowerSpec[]; full?: OverlaySpec[]}> = ({
  tabs, views, boxes = [], keys = [], overlays = [], lowers = [], full = [],
}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const idx = views.reduce((a, v, i) => (t >= v.at - 0.01 ? i : a), 0);
  const cur = views[idx];
  const titles: Record<string, string> = {};
  for (let i = 0; i <= idx; i++) if (views[i].title) titles[views[i].tab] = views[i].title!;
  const ck: CK[] = keys.map((k) => {
    if (k.tab) return {t: k.t, ...tabPoint(tabs, k.tab), click: k.click};
    if (k.shot && k.key) { const m = mid(R(k.shot, k.key), k.dx ?? 0, k.dy ?? 0); return {t: k.t, x: m.x, y: m.y, click: k.click}; }
    return {t: k.t, x: k.x ?? 1500, y: k.y ?? 800, click: k.click};
  });
  const sp = splitAmount(t, overlays);
  const fullO = full.reduce((m, o) => Math.max(m, vis(t, o.a, o.b, 0.35)), 0);
  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      <div style={{position: 'absolute', inset: 0, opacity: 1 - fullO}}>
        <div style={{position: 'absolute', inset: 0, transformOrigin: '0 0',
          transform: `translate(${SPLIT_TX * sp}px, ${SPLIT_TY * sp}px) scale(${1 + (SPLIT.s - 1) * sp})`}}>
        <BrowserFrame tabs={tabs} active={cur.tab} url={typeof cur.url === 'function' ? cur.url(t) : cur.url} titles={titles}>
          {views.map((v, i) => {
            const nextAt = views[i + 1]?.at ?? 1e9;
            if (t < v.at - 0.4 || t > nextAt + 0.4) return null;
            return (
              <div key={i} style={{position: 'absolute', inset: 0, opacity: vis(t, i === 0 ? -1 : v.at, nextAt, 0.22)}}>
                {v.shot ? <Shot name={v.shot} dir="cap06" /> : v.el}
              </div>
            );
          })}
        </BrowserFrame>
        <Overlay>
          {boxes.map((b, i) => <Box key={i} r={R(b.shot, b.key)} a={b.a} b={b.b} pad={b.pad} radius={b.radius} color={b.color} />)}
          <Cursor keys={ck} />
        </Overlay>
        {overlays.map((o, i) => (o.stage && t > o.a - 0.05 && t < o.b + 0.5 ? (
          <AbsoluteFill key={i} style={{opacity: 1 - prog(f, o.b * FPS, (o.b + 0.4) * FPS), pointerEvents: 'none'}}>{o.el(f - Math.round(o.a * FPS))}</AbsoluteFill>
        ) : null))}
        </div>
        <PanelCtx.Provider value={true}>
          <div style={{position: 'absolute', left: SPLIT.panelX, top: 0, width: SPLIT.panelW, height: 1080, display: 'flex', flexDirection: 'column',
            justifyContent: 'center', gap: 24}}>
            {overlays.map((o, i) => (!o.stage && t > o.a - 0.05 && t < o.b + 0.5 ? (
              <div key={i} style={{opacity: 1 - prog(f, o.b * FPS, (o.b + 0.4) * FPS), transform: `translateX(${(1 - sp) * 60}px)`}}>{o.el(f - Math.round(o.a * FPS))}</div>
            ) : null))}
          </div>
        </PanelCtx.Provider>
        {lowers.map((l, i) => (t > l.a && t < l.b ? <LowerThird key={i} f={f - Math.round(l.a * FPS)}>{l.text}</LowerThird> : null))}
      </div>
      {full.map((o, i) => (t > o.a - 0.4 && t < o.b + 0.4 ? (
        <AbsoluteFill key={`full${i}`} style={{opacity: vis(t, o.a, o.b, 0.35)}}><Bg />{o.el(f - Math.round(o.a * FPS))}</AbsoluteFill>
      ) : null))}
    </AbsoluteFill>
  );
};

/** Stage-positioned floating card (for callouts beside the browser content). */
export const FloatCard: React.FC<{f: number; x: number; y: number; w: number; children: React.ReactNode; dark?: boolean; accent?: string}> = ({f, x, y, w, children, dark, accent}) => {
  const p = pop(f, 0, 15);
  const inPanel = React.useContext(PanelCtx);
  const pos: React.CSSProperties = inPanel ? {position: 'relative', width: '100%'} : {position: 'absolute', left: x, top: y, width: w};
  return (
    <div style={{...pos, padding: '26px 30px', borderRadius: 24, boxSizing: 'border-box', fontFamily: INTER,
      background: dark ? 'rgba(15,23,42,0.96)' : C.white, color: dark ? C.white : C.navy, boxShadow: dark ? `${shadow}, inset 0 0 0 2px rgba(255,255,255,0.14)` : shadow, borderLeft: accent ? `8px solid ${accent}` : undefined,
      opacity: p, transform: `translateY(${(1 - p) * 20}px) scale(${0.94 + 0.06 * p})`}}>
      {children}
    </div>
  );
};

/** Stage rect of the browser address bar (for highlighting the URL). */
export const URL_BAR = {x: FRAME.x + 82, y: FRAME.y + 54, w: FRAME.w - 110, h: 32};
export const StageBox: React.FC<{f: number; r: {x: number; y: number; w: number; h: number}}> = ({f, r}) => {
  const p = pop(f, 0, 14);
  return <div style={{position: 'absolute', left: r.x - 6, top: r.y - 6, width: r.w + 12, height: r.h + 12, borderRadius: 14, border: `5px solid ${C.hi}`,
    boxShadow: `0 0 0 6px ${C.hi}33, 0 0 28px ${C.hi}66`, opacity: p, transform: `scale(${1.06 - 0.06 * p})`}} />;
};
export {K};

// ---------------------------------------------------------------- V04 helpers
/** Chrome-style empty new tab. */
export const NewTabSim: React.FC = () => (
  <div style={{position: 'absolute', inset: 0, background: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: INTER}}>
    <div style={{width: 760, height: 64, borderRadius: 32, background: '#F1F3F4', display: 'flex', alignItems: 'center', padding: '0 30px', fontSize: 24, color: '#5F6368'}}>Search or type a URL</div>
  </div>
);
/** URL text with the record id circled (draws itself). */
export const UrlWithId: React.FC<{base: string; id: string; on: number}> = ({base, id, on}) => (
  <span>{base}<span style={{position: 'relative', fontWeight: on > 0.01 ? 700 : 400, color: on > 0.01 ? C.navy : undefined}}>{id}
    {on > 0.01 && (
      <svg width={54} height={38} viewBox="0 0 54 38" style={{position: 'absolute', left: -14, top: -10, overflow: 'visible'}}>
        <ellipse cx={27} cy={19} rx={24} ry={16} fill="none" stroke={C.hi} strokeWidth={4} strokeDasharray={130} strokeDashoffset={130 * (1 - on)} />
      </svg>
    )}
  </span></span>
);
/** Typed URL (caret blinks while typing). */
export const TypedUrl: React.FC<{text: string; t: number; a: number; cps?: number}> = ({text, t, a, cps = 9}) => {
  const n = Math.max(0, Math.min(text.length, Math.floor((t - a) * cps)));
  const caret = n < text.length || Math.floor(t * 2) % 2 === 0;
  return <span>{text.slice(0, n)}<span style={{opacity: caret ? 1 : 0, color: C.blue}}>|</span></span>;
};
