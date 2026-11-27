import React from 'react';
import {AbsoluteFill, Audio, Easing, Img, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {C, FPS, INTER, shadow} from '../theme';
import {pop} from '../lib/anim';
import {Logo, LogoName} from '../components/Logo';

/** Browser window geometry on the 1920x1080 stage. Page content is 1920x1080 "page px", scaled by K. */
export const FRAME = {x: 114, y: 22, w: 1692, chrome: 92};
export const K = FRAME.w / 1920;
export const PAGE_H = 1080 * K;

export type Tab = {id: string; title: string; url: string; color: string; letter: string; logo?: LogoName};
export const TABS: Record<string, Tab> = {
  gmail: {id: 'gmail', title: 'Inbox - Gmail', url: 'mail.google.com/mail/u/0/#inbox', color: '#EA4335', letter: 'M', logo: 'gmail'},
  n8n: {id: 'n8n', title: 'Stocky - n8n', url: 'brightleaf.app.n8n.cloud/workflow/stocky', color: '#EA4B71', letter: 'n', logo: 'n8n_mark'},
  n8nOld: {id: 'n8nOld', title: 'Old-style alert - n8n', url: 'brightleaf.app.n8n.cloud/workflow/old-style-alert', color: '#EA4B71', letter: 'n', logo: 'n8n_mark'},
  sheets: {id: 'sheets', title: 'Stocky_Decision_Log - Google Sheets', url: 'docs.google.com/spreadsheets/d/stocky-decision-log', color: '#0F9D58', letter: 'S', logo: 'sheets'},
  odoo: {id: 'odoo', title: 'Requests for Quotation - Odoo', url: 'brightleaf-supplies.odoo.com/odoo/purchase', color: C.odoo, letter: 'O'},
  claude: {id: 'claude', title: 'New chat - Claude', url: 'claude.ai/new', color: '#D97757', letter: '✳', logo: 'claude_mark'},
  // Video 3
  newtab: {id: 'newtab', title: 'New Tab', url: '', color: '#94A3B8', letter: '+', logo: 'chrome'},
  meteo: {id: 'meteo', title: 'api.open-meteo.com/v1/forecast', url: 'api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto', color: '#F59E0B', letter: '☁'},
  fx: {id: 'fx', title: 'api.frankfurter.dev/v1/latest', url: 'api.frankfurter.dev/v1/latest?from=USD&to=CNY,MXN,AED', color: '#16A34A', letter: '$'},
  odooSet: {id: 'odooSet', title: 'Settings - Odoo', url: 'brightleaf-supplies.odoo.com/odoo/settings', color: C.odoo, letter: 'O', logo: 'odoo_mark'},
};

/** Seconds → frame helpers bound to the section's current frame. */
export const useT = () => useCurrentFrame() / FPS;

export const BrowserFrame: React.FC<{tabs: string[]; active: string; children: React.ReactNode; enter?: number; url?: React.ReactNode; titles?: Record<string, string>; urlFocus?: boolean}> = ({tabs, active, children, enter = 0, url, titles = {}, urlFocus}) => {
  const f = useCurrentFrame();
  const p = pop(f, enter * FPS, 20);
  const tab = TABS[active];
  return (
    <div style={{position: 'absolute', left: FRAME.x, top: FRAME.y, width: FRAME.w, height: FRAME.chrome + PAGE_H, borderRadius: 18, overflow: 'hidden',
      boxShadow: shadow, background: C.white, fontFamily: INTER, opacity: p, transform: `translateY(${(1 - p) * 30}px) scale(${0.98 + 0.02 * p})`}}>
      <div style={{height: 46, background: '#E5E7EB', display: 'flex', alignItems: 'flex-end', paddingLeft: 86, gap: 2}}>
        <div style={{position: 'absolute', left: 20, top: 17, display: 'flex', gap: 9}}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <div key={c} style={{width: 13, height: 13, borderRadius: 7, background: c}} />)}
        </div>
        {tabs.map((id) => {
          const t = TABS[id];
          const on = id === active;
          return (
            <div key={id} style={{height: 36, width: 250, borderRadius: '10px 10px 0 0', background: on ? C.white : 'transparent', display: 'flex', alignItems: 'center',
              gap: 10, padding: '0 14px', fontSize: 15, color: on ? C.navy : C.slate, fontWeight: on ? 600 : 500, whiteSpace: 'nowrap', overflow: 'hidden'}}>
              {t.logo ? <Logo name={t.logo} w={18} /> : (
                <div style={{width: 18, height: 18, borderRadius: 5, background: t.color, color: C.white, fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{t.letter}</div>
              )}
              <span style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{titles[id] ?? t.title}</span>
            </div>
          );
        })}
      </div>
      <div style={{height: 46, display: 'flex', alignItems: 'center', gap: 14, padding: '0 18px', borderBottom: '1px solid #E5E7EB'}}>
        <div style={{display: 'flex', gap: 14, color: '#9CA3AF', fontSize: 20}}>‹ › ↻</div>
        <div style={{flex: 1, height: 30, borderRadius: 15, background: urlFocus ? C.white : '#F1F5F9', boxShadow: urlFocus ? `0 0 0 2px ${C.blue}` : undefined,
          display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: 15, color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden'}}>
          {url === undefined ? <>🔒&nbsp;&nbsp;{tab.url}</> : url}
        </div>
      </div>
      <div style={{position: 'relative', width: FRAME.w, height: PAGE_H, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: `scale(${K})`, transformOrigin: '0 0'}}>{children}</div>
      </div>
    </div>
  );
};

/** Stage position (1920x1080) of a tab's centre, for cursor clicks on tabs. Tabs are drawn in page space? No: in frame chrome. */
export const tabPoint = (tabs: string[], id: string) => {
  const i = tabs.indexOf(id);
  return {x: (FRAME.x + 86 + i * 252 + 125 - FRAME.x) / K, y: (FRAME.y + 26 - FRAME.y - FRAME.chrome) / K};
};

/** A real capture (3840x2160 png) filling the page. */
export const Shot: React.FC<{name: string; opacity?: number}> = ({name, opacity = 1}) => (
  <Img src={staticFile(`cap/${name}.png`)} style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, opacity}} />
);

export type Rect = {x: number; y: number; w: number; h: number};
/** Unlabeled highlight box (page px). Visible between a and b (seconds). */
export const Box: React.FC<{r: Rect | null | undefined; a: number; b: number; pad?: number; color?: string; radius?: number; tight?: boolean}> = ({r, a, b, pad = 8, color = C.hi, radius = 14, tight}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (!r || t < a - 0.05 || t > b + 0.4) return null;
  const pin = pop(f, a * FPS, 14);
  const out = interpolate(t, [b, b + 0.3], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // tight = a highlight on JSON text lines: stays inside the line's own height (never covers the lines above/below),
  // thin outline + soft marker fill, and never runs past the right edge of the page.
  const px = tight ? 10 : pad, py = tight ? -1 : pad;
  const left = r.x - px;
  const width = Math.min(r.w + px * 2, 1906 - left);
  const s = tight ? 1.02 - 0.02 * pin : 1.06 - 0.06 * pin;
  return (
    <div style={{position: 'absolute', left, top: r.y - py, width, height: r.h + py * 2, borderRadius: tight ? 8 : radius, boxSizing: tight ? 'border-box' : undefined,
      border: `${tight ? 3 : 5}px solid ${color}`, background: tight ? `${color}26` : undefined,
      boxShadow: tight ? `0 0 14px ${color}55` : `0 0 0 6px ${color}33, 0 0 28px ${color}66`, opacity: Math.min(pin, out), transform: `scale(${s})`, pointerEvents: 'none'}} />
  );
};

/** Smooth cursor from keyframes (page px). `click` adds a ripple at that keyframe time. */
export type CK = {t: number; x: number; y: number; click?: boolean};
export const Cursor: React.FC<{keys: CK[]; hideBefore?: number}> = ({keys, hideBefore = 0}) => {
  const t = useT();
  if (!keys.length) return null;
  const MOVE = 0.65;
  let x = keys[0].x, y = keys[0].y;
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i];
    const prev = keys[i - 1];
    const p = interpolate(t, [k.t - MOVE, k.t], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
    if (t >= k.t - MOVE) {
      x = prev.x + (k.x - prev.x) * p;
      y = prev.y + (k.y - prev.y) * p;
    }
  }
  const click = keys.find((k) => k.click && t >= k.t && t < k.t + 0.6);
  const cp = click ? (t - click.t) / 0.6 : 0;
  const press = click && t - click.t < 0.12 ? 0.88 : 1;
  return (
    <>
      {keys.filter((k) => k.click).map((k, i) => (
        <Sequence key={i} from={Math.round(k.t * FPS)} durationInFrames={10} layout="none"><Audio src={staticFile('sfx/click.wav')} volume={0.4} /></Sequence>
      ))}
      {click && (
        <div style={{position: 'absolute', left: click.x - 40 * cp, top: click.y - 40 * cp, width: 80 * cp, height: 80 * cp, borderRadius: '50%',
          border: `4px solid ${C.blue}`, opacity: 1 - cp, pointerEvents: 'none'}} />
      )}
      <svg width={38} height={46} viewBox="0 0 28 34" style={{position: 'absolute', left: x - 4, top: y - 2, transform: `scale(${press})`, transformOrigin: '4px 2px', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.35))'}}>
        <path d="M4 2 L4 26 L10 20 L14.5 30 L18.5 28.2 L14 18.5 L22 18.5 Z" fill="#fff" stroke="#111827" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </>
  );
};

/** Centre of a rect. */
export const mid = (r: Rect | null | undefined, dx = 0, dy = 0) => (r ? {x: r.x + r.w / 2 + dx, y: r.y + r.h / 2 + dy} : {x: 960, y: 540});

/** Cross-fade helper: opacity of a view visible between a and b. */
export const vis = (t: number, a: number, b: number, fade = 0.25) =>
  Math.min(interpolate(t, [a - fade, a], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    interpolate(t, [b, b + fade], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));

export const Full: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => <AbsoluteFill style={style}>{children}</AbsoluteFill>;

/** Stage-level layer using page coordinates (not clipped): put Boxes and the Cursor here so the cursor can reach the tab strip. */
export const Overlay: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{position: 'absolute', left: FRAME.x, top: FRAME.y + FRAME.chrome, width: 1920, height: 1080, transform: `scale(${K})`, transformOrigin: '0 0', pointerEvents: 'none'}}>
    {children}
  </div>
);

/** Readable close-up of a region of a real capture (crops the 4K screenshot, so text stays sharp). Stage-positioned. */
export const Magnify: React.FC<{name: string; r: Rect | null | undefined; a: number; b: number; left: number; top: number; width: number; pad?: number; padY?: number}> = ({
  name, r, a, b, left, top, width, pad = 14, padY = pad,
}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (!r || t < a - 0.05 || t > b + 0.4) return null;
  const p = pop(f, a * FPS, 15);
  const out = interpolate(t, [b, b + 0.3], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const rw = r.w + pad * 2, rh = r.h + padY * 2;
  const sc = width / rw;
  return (
    <div style={{position: 'absolute', left, top, width, height: rh * sc, borderRadius: 18, overflow: 'hidden', background: C.white,
      boxShadow: `0 0 0 6px ${C.hi}, 0 24px 60px rgba(2,6,23,0.45)`, opacity: Math.min(p, out), transform: `scale(${0.9 + 0.1 * p})`, transformOrigin: 'center'}}>
      <Img src={staticFile(`cap/${name}.png`)} style={{position: 'absolute', width: 1920 * sc, height: 1080 * sc, left: -(r.x - pad) * sc, top: -(r.y - padY) * sc}} />
    </div>
  );
};

// ------------------------------------------------------------------------------------------------ Video 3 helpers
/** Stage→page conversion for points in the browser chrome (address bar lives above the page, so y is negative). */
export const ADDR_Y = (FRAME.y + 46 + 23 - FRAME.y - FRAME.chrome) / K;
export const addrX = (chars: number) => (18 + 16 + 30 + chars * 8.1) / K;

/** Text typed at ~cps characters/second from time t0 (seconds). */
export const typed = (text: string, t0: number, t: number, cps = 32) => text.slice(0, Math.max(0, Math.floor((t - t0) * cps)));

/** Chrome draws its JSON "Pretty print" bar itself (Windows label + checkbox). Cover the 30-px strip of the 150 %-zoom
 *  capture with the same bar in the Mac look (Inter label, rounded blue checkbox), so it matches Video 1's Mac screens. */
export const PrettyBar: React.FC<{on: boolean}> = ({on}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 30, background: '#F1F1F1', borderBottom: '1.5px solid #C9C9C9',
    display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 3, fontFamily: INTER, fontSize: 19, color: '#111'}}>
    Pretty print
    <div style={{width: 19, height: 19, borderRadius: 5, background: on ? '#1A73E8' : C.white, border: on ? 'none' : '1.5px solid #8E8E8E', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {on && <svg width={13} height={13} viewBox="0 0 12 12"><path d="M2.5 6.2 L5 8.6 L9.6 3.6" stroke="#fff" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
    </div>
  </div>
);
/** Page-space position of the Pretty print checkbox (for cursor clicks). */
export const PRETTY_BOX = {x: 133 * 4 / 3, y: 15 * 4 / 3};

/** A coloured, monospace URL for the address bar. parts = [text, colour?][] */
export const ColorUrl: React.FC<{parts: [string, string?][]; caret?: boolean}> = ({parts, caret}) => {
  const f = useCurrentFrame();
  return (
    <span style={{fontFamily: INTER}}>
      {parts.map(([t, c], i) => <span key={i} style={{color: c ?? '#334155', fontWeight: c ? 700 : 500}}>{t}</span>)}
      {caret && <span style={{display: 'inline-block', width: 2, height: 17, background: C.navy, marginLeft: 1, verticalAlign: 'middle', opacity: Math.floor(f / 15) % 2 ? 0 : 1}} />}
    </span>
  );
};

/** Big status-code badge that pops onto the page (page px). */
export const StatusBadge: React.FC<{code: string; text: string; color: string; at: number; b?: number; x?: number; y?: number}> = ({code, text, color, at, b = 1e9, x = 1380, y = 120}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (t < at - 0.05 || t > b + 0.4) return null;
  const p = pop(f, at * FPS, 12);
  const out = interpolate(t, [b, b + 0.3], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', left: x, top: y, padding: '20px 30px', borderRadius: 24, background: C.white, boxShadow: `0 0 0 5px ${color}, ${shadow}`,
      fontFamily: INTER, opacity: Math.min(p, out), transform: `scale(${0.6 + 0.4 * p}) rotate(${(1 - p) * -6}deg)`, transformOrigin: 'center'}}>
      <div style={{fontSize: 64, fontWeight: 800, color, lineHeight: 1}}>{code}</div>
      <div style={{fontSize: 26, fontWeight: 700, color: C.navy, marginTop: 6}}>{text}</div>
    </div>
  );
};

/** JSON pages were captured at 150 % browser zoom; show them at 200 % (Z = 4/3) by zooming the 4K screenshot from the
 *  top-left corner (stays sharp), so the JSON is readable in the final 1080p/4K frame. Callout rects must use zr(). */
export const JZ = 4 / 3;
export const zr = (r: Rect | null | undefined): Rect | null => (r ? {x: r.x * JZ, y: r.y * JZ, w: r.w * JZ, h: r.h * JZ} : null);
export const JsonPage: React.FC<{name: string; pretty?: boolean}> = ({name, pretty = true}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: `scale(${JZ})`, transformOrigin: '0 0'}}>
    <Shot name={name} />
    <PrettyBar on={pretty} />
  </div>
);
