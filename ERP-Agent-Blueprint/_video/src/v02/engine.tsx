import React from 'react';
import {AbsoluteFill, Audio, Easing, Img, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {C, FPS, INTER, shadow} from '../theme';
import {pop, prog} from '../lib/anim';
import {Bg} from '../components/Bg';
import {LowerThird} from '../components/Gfx';
import {Archive, ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock, EllipsisVertical, ExternalLink, File, Forward, Inbox, LayoutGrid, MailOpen, Menu, OctagonAlert, Pencil, Plus, Printer, Reply, Search, Send, Settings, SlidersHorizontal, Smile, Star, Tag, Trash2} from 'lucide-react';
import {BrowserFrame, Box, CK, Cursor, FRAME, K, mid, Overlay, Rect, Shot, TABS, tabPoint, vis} from '../screen/kit';
import caprects from './caprects.json';

/** Extra browser tabs used in Video 02. */
Object.assign(TABS, {
  odoocom: {id: 'odoocom', title: 'Odoo · Start your free trial', url: 'www.odoo.com', color: C.odoo, letter: 'O', logo: 'odoo_mark'},
  odoo2: {id: 'odoo2', title: 'Odoo', url: 'brightleaf-supplies.odoo.com/odoo', color: C.odoo, letter: 'O', logo: 'odoo_mark'},
  mail2: {id: 'mail2', title: 'Inbox - Gmail', url: 'mail.google.com/mail/u/0/#inbox', color: '#EA4335', letter: 'M', logo: 'gmail'},
  excel: {id: 'excel', title: 'V02_Activity_BrightLeaf_Product_Import.xlsx', url: 'excel.cloud.microsoft/open/brightleaf-product-import', color: '#107C41', letter: 'X'},
});

const RECTS = caprects as unknown as Record<string, Record<string, Rect | null>>;
export const R = (shot: string, key: string): Rect | null => RECTS[shot]?.[key] ?? null;

export type View = {at: number; tab: string; shot?: string; el?: React.ReactNode; url?: string; title?: string};
export type BoxSpec = {shot: string; key: string; a: number; b: number; pad?: number; radius?: number};
export type KeySpec = {t: number; shot?: string; key?: string; x?: number; y?: number; dx?: number; dy?: number; click?: boolean; tab?: string};
/** stage: drawn on top of the browser in stage coords (moves with it, e.g. URL highlight). Otherwise a callout card shown in the side panel. */
export type OverlaySpec = {a: number; b: number; el: (f: number) => React.ReactNode; stage?: boolean};

/** Split layout for callouts: the browser glides left and shrinks, the card gets its own panel on the right, so nothing covers the app. */
const SPLIT = {s: 0.69, left: 30, panelX: 1225, panelW: 665};
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
  const ck: CK[] = [...keys].sort((p, q) => p.t - q.t).map((k) => {
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
        <BrowserFrame tabs={tabs} active={cur.tab} url={cur.url} titles={titles}>
          {views.map((v, i) => {
            const nextAt = views[i + 1]?.at ?? 1e9;
            if (t < v.at - 0.4 || t > nextAt + 0.4) return null;
            return (
              <div key={i} style={{position: 'absolute', inset: 0, opacity: vis(t, i === 0 ? -1 : v.at, nextAt, 0.22)}}>
                {v.shot ? <Shot name={v.shot} dir="cap02" /> : v.el}
              </div>
            );
          })}
        </BrowserFrame>
        <Overlay>
          {boxes.map((b, i) => <Box key={i} r={R(b.shot, b.key)} a={b.a} b={b.b} pad={b.pad} radius={b.radius} />)}
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
      {[...overlays.filter((o) => !o.stage), ...full].map((o, i) => (
        <Sequence key={`sfx${i}`} from={Math.max(0, Math.round(o.a * FPS))} durationInFrames={20} layout="none"><Audio src={staticFile('sfx/pop.wav')} volume={0.22} /></Sequence>
      ))}
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

// ---------------------------------------------------------------- simulated screens (page space 1920x1080)
export const LoadingSim: React.FC<{f: number}> = ({f}) => {
  const p = Math.min(1, f / (FPS * 4.5));
  return (
    <div style={{position: 'absolute', inset: 0, background: '#F9FAFB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: INTER}}>
      <Img src={staticFile('logos/odoo.svg')} style={{width: 260, height: 90, objectFit: 'contain'}} />
      <div style={{fontSize: 40, fontWeight: 700, color: '#111827', marginTop: 40}}>Your database is being created…</div>
      <div style={{fontSize: 24, color: '#6B7280', marginTop: 12}}>brightleaf-supplies.odoo.com · Inventory, Purchase, Sales</div>
      <div style={{width: 640, height: 14, borderRadius: 7, background: '#E5E7EB', marginTop: 44, overflow: 'hidden'}}>
        <div style={{width: `${8 + 88 * p}%`, height: '100%', background: C.odoo, borderRadius: 7}} />
      </div>
      <div style={{fontSize: 20, color: '#9CA3AF', marginTop: 18}}>{p < 0.35 ? 'Installing Inventory…' : p < 0.7 ? 'Installing Purchase…' : 'Installing Sales…'}</div>
    </div>
  );
};

const GFONT = '"Google Sans", Roboto, Inter, Arial, sans-serif';
/** Page-space rect of the "Activate my account" button in ActivationMail. */
export const ACTIVATE_RECT = {x: 697, y: 497, w: 290, h: 58};
const GI = {size: 22, color: '#444746', strokeWidth: 1.8};
export const ActivationMail: React.FC<{pressed?: boolean}> = ({pressed}) => {
  const nav: [React.FC<any>, string, string?][] = [[Inbox, 'Inbox', '1'], [Star, 'Starred'], [Clock, 'Snoozed'], [Send, 'Sent'], [File, 'Drafts'], [ChevronDown, 'More']];
  return (
    <div style={{position: 'absolute', inset: 0, background: '#F6F8FC', fontFamily: GFONT, color: '#1F1F1F'}}>
      {/* top bar */}
      <div style={{height: 64, display: 'flex', alignItems: 'center', padding: '0 16px 0 20px'}}>
        <Menu {...GI} size={24} />
        <Img src={staticFile('logos/gmail.svg')} style={{width: 36, height: 28, objectFit: 'contain', marginLeft: 24}} />
        <span style={{fontSize: 22, color: '#5F6368', marginLeft: 8, width: 150}}>Gmail</span>
        <div style={{width: 720, height: 48, borderRadius: 24, background: '#E9EEF6', display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px', color: '#5F6368', fontSize: 17}}>
          <Search {...GI} /><span style={{flex: 1}}>Search mail</span><SlidersHorizontal {...GI} />
        </div>
        <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 22}}>
          <CircleHelp {...GI} /><Settings {...GI} /><LayoutGrid {...GI} />
          <div style={{width: 34, height: 34, borderRadius: 17, background: '#0B8043', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600}}>S</div>
        </div>
      </div>
      {/* left nav */}
      <div style={{position: 'absolute', left: 8, top: 72, width: 240}}>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 14, padding: '18px 24px', borderRadius: 16, background: '#C2E7FF', fontSize: 15, fontWeight: 500, marginLeft: 8}}><Pencil size={22} color="#001D35" /> Compose</div>
        <div style={{marginTop: 14}}>
          {nav.map(([I, t, n], i) => (
            <div key={t} style={{display: 'flex', alignItems: 'center', gap: 18, height: 34, padding: '0 14px 0 26px', borderRadius: '0 17px 17px 0', background: i === 0 ? '#D3E3FD' : undefined, fontSize: 14.5, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#001D35' : '#1F1F1F'}}>
              <I size={19} color={i === 0 ? '#001D35' : '#444746'} strokeWidth={1.8} /><span style={{flex: 1}}>{t}</span>{n && <span style={{fontSize: 13}}>{n}</span>}
            </div>
          ))}
        </div>
        <div style={{display: 'flex', alignItems: 'center', padding: '22px 14px 6px 26px', fontSize: 16, fontWeight: 500}}><span style={{flex: 1}}>Labels</span><Plus size={20} color="#444746" /></div>
        {['Suppliers', 'Odoo'].map((t) => (<div key={t} style={{display: 'flex', alignItems: 'center', gap: 18, height: 32, paddingLeft: 26, fontSize: 14.5}}><Tag size={18} color="#444746" />{t}</div>))}
      </div>
      {/* message panel */}
      <div style={{position: 'absolute', left: 256, right: 16, top: 72, bottom: 16, background: '#fff', borderRadius: 16, overflow: 'hidden'}}>
        <div style={{height: 52, display: 'flex', alignItems: 'center', gap: 26, padding: '0 22px', borderBottom: '1px solid #F1F3F4'}}>
          <ArrowLeft {...GI} size={20} /><Archive {...GI} size={20} /><OctagonAlert {...GI} size={20} /><Trash2 {...GI} size={20} />
          <div style={{width: 1, height: 22, background: '#DADCE0'}} /><MailOpen {...GI} size={20} /><Clock {...GI} size={20} /><EllipsisVertical {...GI} size={20} />
          <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 18, fontSize: 13, color: '#5F6368'}}>1 of 1<ChevronLeft size={20} color="#C4C7C5" /><ChevronRight size={20} color="#C4C7C5" /></div>
        </div>
        <div style={{padding: '20px 0 0 72px', display: 'flex', alignItems: 'center', gap: 12}}>
          <span style={{fontSize: 24}}>Activate your Odoo account</span>
          <span style={{fontSize: 12.5, background: '#DDE3EA', color: '#444746', borderRadius: 4, padding: '2px 6px'}}>Inbox ×</span>
          <span style={{marginLeft: 'auto', marginRight: 26, display: 'flex', gap: 22}}><Printer {...GI} size={20} /><ExternalLink {...GI} size={20} /></span>
        </div>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 16, padding: '22px 26px 0 20px'}}>
          <div style={{width: 40, height: 40, borderRadius: 20, background: C.odoo, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 18}}>O</div>
          <div style={{flex: 1, fontSize: 14}}>
            <div><b>Odoo</b> <span style={{color: '#5F6368', fontSize: 12.5}}>&lt;noreply@odoo.com&gt;</span></div>
            <div style={{color: '#5F6368', fontSize: 12.5, marginTop: 2, display: 'flex', alignItems: 'center', gap: 2}}>to me <ChevronDown size={14} color="#5F6368" /></div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 20, fontSize: 12.5, color: '#5F6368'}}>9:41 AM (1 minute ago)<Star {...GI} size={19} /><Smile {...GI} size={19} /><Reply {...GI} size={19} /><EllipsisVertical {...GI} size={19} /></div>
        </div>
        <div style={{position: 'absolute', left: 156, top: 196, width: 860, padding: '36px 40px 40px', borderRadius: 10, border: '1px solid #E5E7EB', textAlign: 'center', boxSizing: 'border-box'}}>
          <Img src={staticFile('logos/odoo.svg')} style={{width: 140, height: 48, objectFit: 'contain'}} />
          <div style={{fontSize: 24, marginTop: 20, fontWeight: 500}}>Hello Sarah Mitchell,</div>
          <div style={{fontSize: 17, color: '#4B5563', marginTop: 12, lineHeight: 1.55}}>Your database <b>brightleaf-supplies.odoo.com</b> is ready.<br />Confirm your email and choose a password to log in.</div>
          <div style={{height: 58, marginTop: 30}} />
          <div style={{fontSize: 13, color: '#9CA3AF', marginTop: 26}}>This link is valid for 7 days. Didn't sign up? You can ignore this email.</div>
        </div>
        <div style={{position: 'absolute', left: 156, top: 640, display: 'flex', gap: 12}}>
          {[[Reply, 'Reply'], [Forward, 'Forward']].map(([I, t]: any) => (
            <div key={t} style={{display: 'flex', alignItems: 'center', gap: 10, padding: '9px 22px', borderRadius: 18, border: '1px solid #747775', fontSize: 14, fontWeight: 500, color: '#444746'}}><I size={18} color="#444746" />{t}</div>
          ))}
        </div>
      </div>
      {/* button in page space so the cursor can hit it exactly */}
      <div style={{position: 'absolute', left: ACTIVATE_RECT.x, top: ACTIVATE_RECT.y, width: ACTIVATE_RECT.w, height: ACTIVATE_RECT.h, borderRadius: 8, background: C.odoo, color: '#fff',
        fontSize: 19, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: GFONT, transform: pressed ? 'scale(0.95)' : undefined}}>Activate my account</div>
    </div>
  );
};

const XL_HEAD = ['Internal Reference', 'Name', 'Product Type', 'Track Inventory', 'Sales', 'Purchase', 'Sales Price', 'Cost', 'Product Category'];
const XL_ROWS = [
  ['BL-1002', 'Corrugated Shipping Box 18x12x10', '1.15', '0.85'], ['BL-1003', 'Stretch Wrap Film 500mm', '12.42', '9.2'], ['BL-1004', 'Industrial Safety Gloves (pair)', '3.24', '2.4'],
  ['BL-1005', 'Pallet Jack Wheels (set)', '51.3', '38'], ['BL-1006', 'Packing Tape 48mm (roll)', '1.49', '1.1'], ['BL-1007', 'Hydraulic Oil 20L', '72.9', '54'],
  ['BL-1008', 'LED Warehouse Light 150W', '97.2', '72'], ['BL-1009', 'Nylon Cable Ties (pack of 500)', '8.51', '6.3'], ['BL-1010', 'Forklift Battery Water Kit', '26.66', '19.75'],
];
const XL_W = [200, 400, 150, 160, 90, 110, 120, 90, 180];
export const ExcelSim: React.FC<{headOn?: number; rowOn?: number}> = ({headOn = 0, rowOn = 0}) => (
  <div style={{position: 'absolute', inset: 0, background: '#fff', fontFamily: '"Segoe UI", Inter, Arial, sans-serif', color: '#222'}}>
    <div style={{height: 54, background: '#107C41', color: '#fff', display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', fontSize: 20}}>
      <b style={{fontSize: 22}}>Excel</b><span style={{opacity: 0.9}}>V02_Activity_BrightLeaf_Product_Import.xlsx</span><span style={{marginLeft: 'auto', opacity: 0.85}}>Saved</span>
    </div>
    <div style={{height: 44, display: 'flex', alignItems: 'center', gap: 26, padding: '0 22px', fontSize: 17, borderBottom: '1px solid #E1E1E1'}}>
      {['File', 'Home', 'Insert', 'Draw', 'Page Layout', 'Formulas', 'Data', 'Review', 'View'].map((x, i) => <span key={x} style={{fontWeight: i === 1 ? 700 : 400, color: i === 1 ? '#107C41' : '#333'}}>{x}</span>)}
    </div>
    <div style={{height: 40, display: 'flex', alignItems: 'center', gap: 14, padding: '0 16px', fontSize: 16, borderBottom: '1px solid #E1E1E1', color: '#555'}}>
      <span style={{width: 60}}>A1</span><i>fx</i><span style={{color: '#222'}}>Internal Reference</span>
    </div>
    <div style={{display: 'flex'}}>
      <div style={{width: 48}} />
      {XL_W.map((w, i) => <div key={i} style={{width: w, height: 28, background: '#F3F3F3', borderRight: '1px solid #DDD', borderBottom: '1px solid #DDD', fontSize: 15, textAlign: 'center', lineHeight: '28px', color: '#666'}}>{String.fromCharCode(65 + i)}</div>)}
    </div>
    {[XL_HEAD, ...XL_ROWS.map((r) => [r[0], r[1], 'Goods', 'True', 'True', 'True', r[2], r[3], 'Goods'])].map((row, ri) => {
      const on = ri === 0 ? headOn : ri === 1 ? rowOn : 0;
      return (
        <div key={ri} style={{display: 'flex', width: 'fit-content', position: 'relative', boxShadow: on > 0.01 ? `0 0 0 ${4 * on}px ${C.hi}, 0 0 24px ${C.hi}88` : undefined, zIndex: on > 0.01 ? 2 : 1}}>
          <div style={{width: 48, height: 46, background: '#F3F3F3', borderRight: '1px solid #DDD', borderBottom: '1px solid #DDD', fontSize: 15, textAlign: 'center', lineHeight: '46px', color: '#666'}}>{ri + 1}</div>
          {row.map((c, ci) => (
            <div key={ci} style={{width: XL_W[ci], height: 46, padding: '0 10px', boxSizing: 'border-box', borderRight: '1px solid #E5E5E5', borderBottom: '1px solid #E5E5E5', fontSize: 18,
              fontWeight: ri === 0 ? 700 : 400, background: ri === 0 ? '#E2EFDA' : '#fff', display: 'flex', alignItems: 'center', justifyContent: ci >= 6 && ci <= 7 && ri ? 'flex-end' : 'flex-start',
              whiteSpace: 'nowrap', overflow: 'hidden'}}>{c}</div>
          ))}
        </div>
      );
    })}
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 40, background: '#F3F3F3', borderTop: '1px solid #DDD', display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px'}}>
      <div style={{padding: '6px 18px', background: '#fff', color: '#107C41', fontWeight: 700, borderBottom: '3px solid #107C41', fontSize: 15}}>Products</div>
      <div style={{padding: '6px 18px', fontSize: 15, color: '#555'}}>Read_Me</div>
    </div>
  </div>
);
