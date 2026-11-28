import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {C, FPS, INTER, shadow} from '../theme';
import {pop, prog} from '../lib/anim';
import {Shot} from '../screen/kit';
import {Logo} from '../components/Logo';

export type PR = {x: number; y: number; w: number; h: number};
export type Hl = {r: PR; at: number; until?: number; color?: string};
export const fr = (a: number, b: number) => Math.round((b - a) * FPS);

/** A real screenshot region at `scale`, with timed highlight boxes (page px of the shot). f = frames since shown. */
export const Crop: React.FC<{f: number; shot: string; r: PR; scale: number; hl?: Hl[]; radius?: number}> = ({f, shot, r, scale, hl = [], radius = 14}) => (
  <div style={{position: 'relative', width: r.w * scale, height: r.h * scale, overflow: 'hidden', borderRadius: radius, background: C.white,
    boxShadow: '0 0 0 2px #E2E8F0'}}>
    <Img src={staticFile(`cap06/${shot}.png`)} style={{position: 'absolute', left: -r.x * scale, top: -r.y * scale, width: 1920 * scale, height: 1080 * scale}} />
    {hl.map((h, k) => {
      const on = pop(f, h.at, 12) * (h.until === undefined ? 1 : 1 - prog(f, h.until, h.until + 8));
      if (on < 0.01) return null;
      const c = h.color ?? C.hi;
      return <div key={k} style={{position: 'absolute', left: (h.r.x - r.x) * scale - 5, top: (h.r.y - r.y) * scale - 4, width: h.r.w * scale + 10, height: h.r.h * scale + 8,
        borderRadius: 10, border: `4px solid ${c}`, background: `${c}26`, opacity: on, transform: `scale(${1.04 - 0.04 * on})`}} />;
    })}
  </div>
);

/** Full-screen focus on one part of the real screen (big, readable), with a title. */
export const FocusCrop: React.FC<{f: number; kicker?: string; title?: React.ReactNode; shot: string; r: PR; scale: number; hl?: Hl[]; side?: React.ReactNode; logo?: 'n8n_mark' | 'odoo_mark'}> = ({
  f, kicker, title, shot, r, scale, hl, side, logo = 'n8n_mark',
}) => (
  <AbsoluteFill style={{fontFamily: INTER, alignItems: 'center', justifyContent: 'center', paddingBottom: 110}}>
    {(kicker || title) && (
      <div style={{textAlign: 'center', marginBottom: 26, opacity: prog(f, 0, 10)}}>
        {kicker && <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 24, fontWeight: 800, letterSpacing: 4, color: C.hi, textTransform: 'uppercase'}}><Logo name={logo} w={30} />{kicker}</div>}
        {title && <div style={{fontSize: 46, fontWeight: 800, color: C.white, marginTop: 8, letterSpacing: -0.5}}>{title}</div>}
      </div>
    )}
    <div style={{display: 'flex', gap: 40, alignItems: 'center'}}>
      <div style={{padding: 14, borderRadius: 24, background: C.white, boxShadow: shadow, opacity: pop(f, 2, 14), transform: `scale(${0.96 + 0.04 * pop(f, 2, 14)})`}}>
        <Crop f={f} shot={shot} r={r} scale={scale} hl={hl} />
      </div>
      {side}
    </div>
  </AbsoluteFill>
);

/** Page-space patch drawn over a captured frame (e.g. hide a stray "Offline" badge). */
export const Patch: React.FC<{r: PR; bg?: string; children?: React.ReactNode; style?: React.CSSProperties}> = ({r, bg = '#FFFFFF', children, style}) => (
  <div style={{position: 'absolute', left: r.x, top: r.y, width: r.w, height: r.h, background: bg, overflow: 'hidden', ...style}}>{children}</div>
);
/** A captured shot plus patches. */
export const Patched: React.FC<{shot: string; children: React.ReactNode}> = ({shot, children}) => (
  <div style={{position: 'absolute', inset: 0}}><Shot name={shot} dir="cap06" />{children}</div>
);

// ---------------------------------------------------------------- Stocky chat, zoomed (n8n chat look, big and readable)
export type ChatBlock =
  | {k: 'user'; text: string}
  | {k: 'p'; text: React.ReactNode; hl?: [number, number?]; bold?: boolean}
  | {k: 'li'; items: React.ReactNode[]; hl?: ([number, number?] | null)[]}
  | {k: 'table'; head: string[]; rows: string[][]; hl?: ([number, number?] | null)[]; widths?: number[]}
  | {k: 'src'; text: string; hl?: [number, number?]};
const lit = (f: number, h?: [number, number?] | null) => (h ? pop(f, h[0], 12) * (h[1] === undefined ? 1 : 1 - prog(f, h[1], h[1] + 8)) : 0);
const mark = (on: number, children: React.ReactNode, block = false) => (
  <span style={{display: block ? 'block' : 'inline', background: `linear-gradient(transparent 8%, ${C.hi}${Math.round(on * 140).toString(16).padStart(2, '0')} 8%)`,
    borderRadius: 6, padding: block ? '2px 8px' : '0 4px', margin: block ? '0 -8px' : 0, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone'}}>{children}</span>
);
export const ChatZoom: React.FC<{f: number; blocks: ChatBlock[]; title?: string; width?: number; font?: number; tag?: React.ReactNode}> = ({f, blocks, title = 'Chat with Stocky', width = 1380, font = 27, tag}) => (
  <AbsoluteFill style={{fontFamily: INTER, alignItems: 'center', justifyContent: 'center', paddingBottom: 120}}>
    <div style={{width, borderRadius: 26, background: C.white, boxShadow: shadow, overflow: 'hidden', opacity: pop(f, 0, 14), transform: `translateY(${(1 - pop(f, 0, 14)) * 24}px)`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '16px 28px', borderBottom: '1px solid #E5E7EB', fontSize: 21, fontWeight: 600, color: '#555'}}>
        <Logo name="n8n_mark" w={26} /> {title}{tag && <div style={{marginLeft: 'auto'}}>{tag}</div>}
      </div>
      <div style={{padding: '26px 40px 30px', fontSize: font, lineHeight: 1.45, color: '#1F1F1F'}}>
        {blocks.map((b, i) => {
          if (b.k === 'user') return (
            <div key={i} style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 22}}>
              <div style={{maxWidth: '78%', padding: '14px 22px', borderRadius: 14, background: '#F0F0F2', boxShadow: '0 2px 5px rgba(0,0,0,0.12)'}}>{b.text}</div>
            </div>);
          if (b.k === 'p') return <div key={i} style={{marginBottom: 14, fontWeight: b.bold ? 700 : 400}}>{mark(lit(f, b.hl), b.text)}</div>;
          if (b.k === 'src') return <div key={i} style={{marginTop: 6, fontSize: font * 0.85, color: '#3F3F46'}}>{mark(lit(f, b.hl), b.text)}</div>;
          if (b.k === 'li') return (
            <ul key={i} style={{margin: '0 0 14px', paddingLeft: 34}}>
              {b.items.map((it, j) => <li key={j} style={{marginBottom: 4}}>{mark(lit(f, b.hl?.[j]), it)}</li>)}
            </ul>);
          const w = b.widths ?? b.head.map(() => 1);
          const cols = w.map((x) => `${x}fr`).join(' ');
          return (
            <div key={i} style={{border: '1px solid #E4E4E7', borderRadius: 12, overflow: 'hidden', marginBottom: 16, fontSize: font * 0.85}}>
              <div style={{display: 'grid', gridTemplateColumns: cols, fontWeight: 700, background: '#FAFAFA', borderBottom: '1px solid #E4E4E7'}}>
                {b.head.map((h) => <div key={h} style={{padding: '9px 16px'}}>{h}</div>)}
              </div>
              {b.rows.map((r, j) => {
                const on = lit(f, b.hl?.[j]);
                return (
                  <div key={j} style={{display: 'grid', gridTemplateColumns: cols, borderBottom: j < b.rows.length - 1 ? '1px solid #F0F0F2' : undefined,
                    background: on > 0.01 ? `${C.hi}${Math.round(on * 120).toString(16).padStart(2, '0')}` : undefined}}>
                    {r.map((c, k) => <div key={k} style={{padding: '8px 16px', fontWeight: on > 0.5 && k === r.length - 1 ? 700 : 400}}>{c}</div>)}
                  </div>);
              })}
            </div>);
        })}
      </div>
    </div>
  </AbsoluteFill>
);

/** Small tag shown on the zoomed chat header. */
export const RealTag: React.FC<{fake?: boolean}> = ({fake}) => (
  <span style={{fontSize: 17, fontWeight: 800, letterSpacing: 1, padding: '5px 12px', borderRadius: 8, color: C.white, background: fake ? C.red : C.green}}>
    {fake ? 'WEAK PROMPT' : 'REAL ANSWER · LIVE ODOO DATA'}
  </span>
);
