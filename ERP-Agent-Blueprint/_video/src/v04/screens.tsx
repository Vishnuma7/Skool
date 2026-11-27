import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {ArrowRight, BookOpen, Check, Cloud, FastForward, Hash, Laptop, Link2, Lock, Search, Shield, Sparkles, X} from 'lucide-react';
import {C, FPS, INTER} from '../theme';
import {pop, prog} from '../lib/anim';
import {vcue, vdur} from './cues';
import {Chip} from '../components/Gfx';
import {Face, StockyBot} from '../components/Art';
import {FloatCard, NewTabSim, SectionView, TypedUrl, UrlWithId} from './engine';

type Starts = Record<string, number>;
const mk = (starts: Starts) => ({
  T: (k: string, phrase?: string, nth = 0) => starts[k] + (phrase ? vcue(k, phrase, nth) : 0),
  E: (k: string) => starts[k] + vdur(k),
});
const ODOO = (p = '') => `brightleaf-supplies.odoo.com/odoo/action-703${p}`;
const SHEET = 'docs.google.com/spreadsheets/d/1YWA…GOWo/edit';
const MESSY = 'docs.google.com/spreadsheets/d/1Rpe…8OU/edit';
const card = (body: React.ReactNode, accent?: string, dark?: boolean) => (f: number) => <FloatCard f={f} x={0} y={0} w={600} accent={accent} dark={dark}>{body}</FloatCard>;
const big = (t: string, sub?: string) => (<><div style={{fontSize: 30, fontWeight: 800, lineHeight: 1.2}}>{t}</div>{sub && <div style={{fontSize: 22, fontWeight: 600, color: C.slate, marginTop: 8, lineHeight: 1.35}}>{sub}</div>}</>);
const kicker = (t: string, c: string = C.blue) => <div style={{fontSize: 20, fontWeight: 800, letterSpacing: 2.5, color: c, textTransform: 'uppercase', marginBottom: 10}}>{t}</div>;
const fr = (a: number, b: number) => Math.round((b - a) * FPS);
/** Hook-free animated body (f = frames since the view/overlay appeared). */
const Live: React.FC<{render: (f: number) => React.ReactNode}> = ({render}) => <>{render(useCurrentFrame())}</>;
const Example = () => <span style={{fontSize: 16, fontWeight: 800, letterSpacing: 1.5, color: C.white, background: '#64748B', borderRadius: 8, padding: '3px 10px', marginLeft: 10, verticalAlign: 'middle'}}>EXAMPLE</span>;
const FixTag: React.FC<{n: number; done?: boolean}> = ({n, done}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 20, fontWeight: 800, color: done ? C.green : C.blue, background: done ? C.greenSoft : C.blueSoft, borderRadius: 10, padding: '4px 12px', marginBottom: 12}}>
    {done && <Check size={20} />}Fix {n}/7
  </div>
);

// ================================================================ full-stage graphics
/** Workbook = database: stacked sheets with tabs. stage: 0 intro, 1 tabs fan (Products glows), 2 dashed outline (whole workbook). */
const Workbook: React.FC<{f: number; stage: number; tabsAt?: number; outlineAt?: number}> = ({f, stage, tabsAt = 1e9, outlineAt = 1e9}) => {
  const tabs = [{t: 'Products', c: C.blue}, {t: 'Suppliers', c: C.green}, {t: 'Purchase Orders', c: C.amber}];
  const fan = prog(f, tabsAt, tabsAt + 18);
  const outline = prog(f, outlineAt, outlineAt + 20);
  return (
    <AbsoluteFill style={{fontFamily: INTER, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'absolute', top: 80, width: '100%', textAlign: 'center', opacity: prog(f, 0, 12)}}>
        <div style={{fontSize: 24, fontWeight: 800, letterSpacing: 4, color: C.hi, textTransform: 'uppercase'}}>Underneath</div>
        <div style={{fontSize: 56, fontWeight: 800, color: C.white, marginTop: 8}}>A database = a super-organised Excel workbook</div>
      </div>
      <div style={{position: 'relative', width: 980, height: 520, marginTop: 120}}>
        {[2, 1, 0].map((i) => (
          <div key={i} style={{position: 'absolute', left: i * 26 * (1 + fan), top: -i * 22 * (1 + fan), width: 900, height: 470, borderRadius: 22, background: i ? '#E2E8F0' : C.white,
            boxShadow: '0 24px 60px rgba(2,6,23,0.45)', opacity: pop(f, 4 + i * 4)}}>
            {i === 0 && (
              <div style={{padding: 26}}>
                <div style={{display: 'grid', gridTemplateColumns: '150px 1fr 120px 120px 150px', gap: 0, fontSize: 22, color: C.navy}}>
                  {['Internal Ref', 'Name', 'Price', 'Cost', 'On Hand'].map((h) => <div key={h} style={{fontWeight: 800, padding: '10px 12px', background: '#F1F5F9', borderBottom: '2px solid #CBD5E1'}}>{h}</div>)}
                  {[['BL-1001', 'Steel Hex Bolts', '$16.88', '$12.50', '145'], ['BL-1002', 'Shipping Box', '$1.15', '$0.85', '1,180'], ['BL-1003', 'Stretch Wrap', '$12.42', '$9.20', '260'],
                    ['BL-1004', 'Safety Gloves', '$3.24', '$2.40', '420'], ['BL-1005', 'Pallet Jack Wheels', '$51.30', '$38.00', '18']].flatMap((r, ri) => r.map((c, ci) => (
                    <div key={`${ri}-${ci}`} style={{padding: '10px 12px', borderBottom: '1px solid #E2E8F0', fontWeight: 500}}>{c}</div>
                  )))}
                </div>
              </div>
            )}
          </div>
        ))}
        {/* sheet tabs */}
        <div style={{position: 'absolute', left: 30, top: 486, display: 'flex', gap: 10, opacity: fan}}>
          {tabs.map((t, i) => (
            <div key={t.t} style={{padding: '10px 20px', borderRadius: '0 0 12px 12px', background: i === 0 ? C.hi : 'rgba(255,255,255,0.9)', color: C.navy, fontSize: 24, fontWeight: 800,
              boxShadow: i === 0 ? `0 0 24px ${C.hi}` : undefined, transform: `translateY(${(1 - pop(f, tabsAt + i * 5)) * 20}px)`}}>{t.t}</div>
          ))}
        </div>
        {outline > 0 && (
          <div style={{position: 'absolute', left: -30, top: -100, width: 1040, height: 660, borderRadius: 30, border: `5px dashed ${C.hi}`, opacity: outline}} />
        )}
      </div>
      <div style={{position: 'absolute', bottom: 60, display: 'flex', gap: 18, opacity: stage >= 1 ? fan : 0}}>
        {[['Table', 'one sheet'], ['Row', 'one record'], ['Column', 'one field'], ['Database', 'the whole workbook']].map(([a, b], i) => (
          <div key={a} style={{padding: '12px 22px', borderRadius: 16, background: 'rgba(255,255,255,0.1)', color: C.white, fontSize: 26, fontWeight: 700, opacity: pop(f, tabsAt + 6 + i * 6)}}>
            <span style={{color: C.hi, fontWeight: 800}}>{a}</span> = {b}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const CLEAN: [string, number, string, number][] = [['BL-1001', 145, 'box', 80], ['BL-1009', 410, 'pack', 150], ['BL-1002', 1180, 'each', 1500], ['BL-1003', 260, 'roll', 200],
  ['BL-1006', 1850, 'roll', 1000], ['BL-1004', 420, 'pair', 600], ['BL-1005', 18, 'set', 25], ['BL-1010', 26, 'kit', 20], ['BL-1007', 31, 'drum', 40], ['BL-1008', 34, 'each', 30]];
/** The real messy export (Item Code · Qty · Reorder Lvl), as Sarah received it. */
const MESSY_ROWS: [string, string, string, string?][] = [
  ['', 'BRIGHTLEAF SUPPLIES – STOCK REPORT (Nov) – DO NOT EDIT!!', '', 'title'], ['', 'Prepared by Tom / updated by Sarah / numbers as of last count', '', 'title'], ['', '', ''],
  ['BL-1001', '145 boxes', '80'], ['BL-1009', '410', '150'], ['BL-1001', '145 boxes', '80'], ['BL-1002', '1,180 pcs', '1500'], ['BL 1002', '1180', '1,500'],
  ['BL-1003', '21 cartons (12 rolls each) + 8 loose', '200'], ['BL-1006', 'approx 1,850', '1000', 'red'], ['', '420 pairs', '600'], ['BL-1005', '18 - urgent!!', '25', 'red'],
  ['BL-1010', '26', '20'], ['BL-1007', '31 (check w/ Tom)', '40'], ['BL-1008', '34 nos', '30'], ['TOTAL', 'lots', '', 'total'],
];
const BeforeAfter: React.FC<{f: number; s1: number; s2: number}> = ({f, s1, s2}) => {
  const n = (v: number, a: number) => Math.round(v * prog(f, a, a + 24));
  return (
    <AbsoluteFill style={{fontFamily: INTER, padding: '44px 70px'}}>
      <div style={{fontSize: 50, fontWeight: 800, color: C.white, textAlign: 'center', opacity: prog(f, 0, 10)}}>Before and after</div>
      <div style={{display: 'flex', gap: 34, marginTop: 30, alignItems: 'flex-start'}}>
        <div style={{width: 700, padding: '22px 24px 20px', borderRadius: 26, background: '#FFF7F7', opacity: pop(f, 4), flexShrink: 0}}>
          <div style={{fontSize: 26, fontWeight: 800, color: C.red, letterSpacing: 3, textTransform: 'uppercase'}}>Messy · 17 rows</div>
          <div style={{display: 'grid', gridTemplateColumns: '120px 1fr 110px', marginTop: 10, fontSize: 20, color: C.navy}}>
            {['Item Code', 'Qty', 'Reorder Lvl'].map((h) => <div key={h} style={{fontWeight: 800, padding: '4px 8px', borderBottom: '2px solid #FCA5A5', whiteSpace: 'nowrap'}}>{h}</div>)}
            {MESSY_ROWS.map(([id, q, rp, kind], i) => {
              const bg = kind === 'red' ? '#F8D7DA' : kind === 'title' ? '#F1F5F9' : undefined;
              const cells = kind === 'title' ? [<div key="t" style={{gridColumn: '1 / span 3', padding: '3px 8px', fontWeight: 800, textAlign: 'center', background: bg, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{q}</div>]
                : [id, q, rp].map((c, ci) => (
                  <div key={ci} style={{padding: '3px 8px', borderBottom: '1px solid #F1D4D4', background: ci === 1 ? bg : undefined, fontWeight: kind === 'total' || (ci === 1 && kind === 'red') ? 800 : 500,
                    color: ci === 0 && /^BL /.test(c) ? C.red : C.navy, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: ci === 2 ? 'right' : 'left'}}>{c || '\u00A0'}</div>
                ));
              return <React.Fragment key={i}>{cells.map((c) => <div key={`${i}-${(c as React.ReactElement).key}`} style={{display: 'contents', opacity: pop(f, 6 + i * 2)}}>{c}</div>)}</React.Fragment>;
            })}
          </div>
          <div style={{display: 'flex', gap: 12, marginTop: 14}}>
            <Chip size={22} bg={C.white} color={C.navy}>{n(17, 10)} rows</Chip>
            <Chip size={22} bg={C.redSoft} color={C.red}>{n(2, 10)} red cells</Chip>
          </div>
        </div>
        <ArrowRight size={60} color={C.hi} style={{marginTop: 250, opacity: pop(f, 14), flexShrink: 0}} />
        <div style={{flex: 1, padding: 26, borderRadius: 26, background: C.white, opacity: pop(f, 18)}}>
          <div style={{fontSize: 26, fontWeight: 800, color: C.green, letterSpacing: 3, textTransform: 'uppercase'}}>Clean · 10 rows</div>
          <div style={{display: 'grid', gridTemplateColumns: '140px 120px 100px 150px 1fr', marginTop: 12, fontSize: 23, color: C.navy}}>
            {['Item Code', 'Qty', 'Unit', 'Reorder Lvl', 'Status'].map((h) => <div key={h} style={{fontWeight: 800, padding: '6px 10px', borderBottom: '2px solid #CBD5E1'}}>{h}</div>)}
            {CLEAN.map(([id, q, u, rp], i) => {
              const re = q <= rp;
              const hl = (id === 'BL-1006' && f >= s1) ? C.greenSoft : (id === 'BL-1007' && f >= s2) ? (Math.floor((f - s2) / 12) % 2 ? '#FECACA' : C.redSoft) : undefined;
              return [id, String(q), u, String(rp), re ? 'REORDER' : 'OK'].map((c, ci) => (
                <div key={`${i}-${ci}`} style={{padding: '5px 10px', borderBottom: '1px solid #E2E8F0', background: hl, fontWeight: ci === 4 ? 800 : 500, color: ci === 4 ? (re ? C.red : C.green) : C.navy,
                  opacity: pop(f, 22 + i * 3)}}>{c}</div>
              ));
            })}
          </div>
          <div style={{display: 'flex', gap: 12, marginTop: 16, opacity: pop(f, 60)}}>
            <Chip size={24} bg={C.redSoft} color={C.red}>4 REORDER</Chip><Chip size={24} bg={C.greenSoft} color={C.green}>6 OK</Chip>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 70, right: 70, bottom: 150, display: 'flex', gap: 24}}>
        <div style={{flex: 1, padding: '18px 24px', borderRadius: 18, background: C.greenSoft, color: '#14532D', fontSize: 24, fontWeight: 700, opacity: pop(f, s1)}}>
          Surprise 1 · Packing tape (coloured "urgent"): 1,850 rolls vs reorder point 1,000. <b>Fine.</b>
        </div>
        <div style={{flex: 1, padding: '18px 24px', borderRadius: 18, background: C.redSoft, color: '#7F1D1D', fontSize: 24, fontWeight: 700, opacity: pop(f, s2)}}>
          Surprise 2 · Hydraulic oil (nobody flagged it): 31 drums vs 40, 14-day lead time from Dubai. <b>A real emergency.</b>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** S3_11: XLOOKUP, step by step. f = frames since the card appeared. */
const LookupCard: React.FC<{f: number}> = ({f}) => {
  const step = (at: number, body: React.ReactNode, bg: string) => (
    <div style={{padding: '12px 16px', borderRadius: 14, background: bg, fontSize: 23, fontWeight: 800, opacity: pop(f, at, 12), transform: `translateX(${(1 - pop(f, at, 12)) * 24}px)`}}>{body}</div>
  );
  const arrow = (at: number) => <div style={{height: 26, marginLeft: 26, borderLeft: `4px solid ${C.hi}`, transform: `scaleY(${prog(f, at, at + 8)})`, transformOrigin: 'top'}} />;
  return (
    <FloatCard f={f} x={0} y={0} w={500}>
      {kicker('Looked up by ID')}
      {step(4, <>Stock_Log <span style={{fontFamily: 'monospace', color: C.blue}}>H2 = SUP-004</span></>, C.blueSoft)}
      {arrow(14)}
      {step(20, <><Search size={22} style={{verticalAlign: 'middle'}} /> Suppliers: find <span style={{fontFamily: 'monospace'}}>SUP-004</span></>, '#F1F5F9')}
      {arrow(30)}
      {step(36, <>K2 = <span style={{color: C.green}}>Global Lift Parts</span></>, C.greenSoft)}
    </FloatCard>
  );
};
const SUPS: [string, string][] = [['SUP-001', 'Apex Fasteners'], ['SUP-002', 'PackRight Industries'], ['SUP-004', 'Global Lift Parts']];
const LOGS: [string, string][] = [['LOG-0001', 'SUP-004'], ['LOG-0002', 'SUP-002'], ['LOG-0003', 'SUP-001']];
/** S3_12 full-stage: the name lives once in Suppliers; Stock_Log rows point at it by ID; rename once → every row follows. */
const Relationship: React.FC<{f: number; once: number; rename: number; sarah: number; flow: number; rel: number; built: number}> = ({f, once, rename, sarah, flow, rel, built}) => {
  const ROW_H = 88, TOP = 330, LX = 120, LW = 680, RX = 1040, RW = 760;
  const newName = 'PackRight Group';
  const typed = Math.max(0, Math.min(newName.length, Math.floor((f - rename - 10) / 2.2)));
  const renamed = f >= rename + 10;
  const supName = (n: string) => (n === 'PackRight Industries' && renamed ? newName.slice(0, typed) : n);
  const arrived = f >= flow + 22;
  const relOn = prog(f, rel, rel + 14);
  const cell = (txt: React.ReactNode, w: number, st: React.CSSProperties = {}) => <div style={{width: w, padding: '0 18px', boxSizing: 'border-box', whiteSpace: 'nowrap', overflow: 'hidden', ...st}}>{txt}</div>;
  const yOf = (i: number) => TOP + 62 + i * ROW_H + ROW_H / 2;
  const supIdx = (id: string) => SUPS.findIndex(([s]) => s === id);
  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <div style={{position: 'absolute', top: 96, width: '100%', textAlign: 'center', opacity: prog(f, 0, 12)}}>
        <div style={{fontSize: 24, fontWeight: 800, letterSpacing: 4, color: C.hi, textTransform: 'uppercase'}}>What makes it a real database</div>
        <div style={{fontSize: 50, fontWeight: 800, color: C.white, marginTop: 8}}>{f < rel ? 'The name lives in one place only' : 'This ID connection is a relationship'}</div>
      </div>
      {/* links */}
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        {LOGS.map(([, sid], i) => {
          const j = supIdx(sid); const y1 = yOf(i), y0 = yOf(j);
          const x0 = LX + LW, x1 = RX;
          const d = `M ${x1} ${y1} C ${x1 - 150} ${y1}, ${x0 + 150} ${y0}, ${x0} ${y0}`;
          const hot = sid === 'SUP-002';
          const draw = prog(f, once + 6 + i * 4, once + 26 + i * 4);
          return <path key={i} d={d} fill="none" stroke={relOn > 0 ? C.hi : hot && f >= flow ? C.green : 'rgba(255,255,255,0.45)'} strokeWidth={relOn > 0 ? 6 : hot && f >= flow ? 6 : 4}
            strokeDasharray={600} strokeDashoffset={600 * (1 - draw)} strokeLinecap="round" />;
        })}
        {f >= flow && f < flow + 24 && (() => {
          // pulse travels Suppliers → Stock_Log along the SUP-002 link
          const p = Math.min(1, (f - flow) / 22); const y0 = yOf(1), y1 = yOf(1); const x0 = LX + LW, x1 = RX;
          const x = x0 + (x1 - x0) * p, y = y0 + (y1 - y0) * p;
          return <circle cx={x} cy={y} r={14} fill={C.green} opacity={0.95} />;
        })()}
      </svg>
      {/* Suppliers */}
      <div style={{position: 'absolute', left: LX, top: TOP, width: LW, borderRadius: 22, background: C.white, boxShadow: '0 24px 60px rgba(2,6,23,0.45)', overflow: 'hidden', opacity: pop(f, 2, 14)}}>
        <div style={{display: 'flex', alignItems: 'center', height: 62, background: C.greenSoft, fontSize: 24, fontWeight: 800, color: '#14532D'}}>{cell('Suppliers', 250)}{cell('Supplier_Name', 430, {fontSize: 21, color: C.slate})}</div>
        {SUPS.map(([id, nm], i) => {
          const hot = nm === 'PackRight Industries';
          return (
            <div key={id} style={{display: 'flex', alignItems: 'center', height: ROW_H, borderTop: '1px solid #E2E8F0', fontSize: 31, fontWeight: 700, color: C.navy}}>
              {cell(id, 250, {fontFamily: 'monospace', color: C.blue, fontWeight: 800})}
              {cell(<span style={{padding: '6px 10px', borderRadius: 10, background: f >= once && f < rel ? `${C.hi}55` : hot && renamed ? C.greenSoft : 'transparent',
                boxShadow: hot && renamed && f < flow + 30 ? `0 0 0 3px ${C.green}` : undefined}}>{supName(nm)}{hot && renamed && typed < newName.length ? <span style={{color: C.blue}}>|</span> : null}</span>, 430)}
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: LX, top: TOP + 62 + 3 * ROW_H + 22, display: 'flex', gap: 12, opacity: pop(f, once + 8)}}>
        <div style={{padding: '10px 18px', borderRadius: 12, background: `${C.hi}`, color: C.navy, fontSize: 22, fontWeight: 800}}>Stored once</div>
        {f >= rename && <div style={{padding: '10px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.12)', color: C.white, fontSize: 22, fontWeight: 700, opacity: pop(f, rename)}}>Example: PackRight renames itself</div>}
        {f >= sarah && <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '4px 14px 4px 4px', borderRadius: 30, background: C.white, opacity: pop(f, sarah)}}><Face name="sarah" size={40} /><span style={{fontSize: 21, fontWeight: 800, color: C.navy}}>Sarah changes it once</span></div>}
      </div>
      {/* Stock_Log */}
      <div style={{position: 'absolute', left: RX, top: TOP, width: RW, borderRadius: 22, background: C.white, boxShadow: '0 24px 60px rgba(2,6,23,0.45)', overflow: 'hidden', opacity: pop(f, 6, 14)}}>
        <div style={{display: 'flex', alignItems: 'center', height: 62, background: C.blueSoft, fontSize: 24, fontWeight: 800, color: '#1E3A8A'}}>{cell('Stock_Log', 220)}{cell('Supplier_ID', 200, {fontSize: 21, color: C.slate})}{cell('Supplier_Name', 340, {fontSize: 21, color: C.slate})}</div>
        {LOGS.map(([lid, sid], i) => {
          const nm = SUPS[supIdx(sid)][1];
          const hot = sid === 'SUP-002';
          const show = hot && arrived ? newName : nm;
          return (
            <div key={lid} style={{display: 'flex', alignItems: 'center', height: ROW_H, borderTop: '1px solid #E2E8F0', fontSize: 29, fontWeight: 700, color: C.navy}}>
              {cell(lid, 220, {fontFamily: 'monospace'})}
              {cell(sid, 200, {fontFamily: 'monospace', color: C.blue, fontWeight: 800})}
              {cell(<span style={{padding: '6px 10px', borderRadius: 10, background: hot && arrived ? (f < flow + 50 ? '#BBF7D0' : C.greenSoft) : 'transparent', color: C.slate}}>{show}</span>, 340)}
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: RX, top: TOP + 62 + 3 * ROW_H + 22, fontSize: 22, fontWeight: 700, color: 'rgba(255,255,255,0.75)', opacity: pop(f, once + 14)}}>Supplier_Name is looked up by ID, never typed again</div>
      {/* relationship badge */}
      <div style={{position: 'absolute', left: (LX + LW + RX) / 2 - 150, top: TOP - 70, width: 300, display: 'flex', justifyContent: 'center', opacity: relOn, transform: `scale(${0.8 + 0.2 * relOn})`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '12px 22px', borderRadius: 16, background: C.hi, color: C.navy, fontSize: 28, fontWeight: 800}}><Link2 size={30} /> Relationship</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: TOP + 62 + 3 * ROW_H + 110, display: 'flex', justifyContent: 'center', opacity: pop(f, built)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '16px 28px', borderRadius: 18, background: C.greenSoft, color: '#14532D', fontSize: 30, fontWeight: 800}}><Check size={32} /> You've just built one</div>
      </div>
    </AbsoluteFill>
  );
};

// ================================================================ S1 What a database really is
export const V4S1: React.FC<{starts: Starts}> = ({starts}) => {
  const {T, E} = mk(starts);
  const toList = T('S1_01', 'the icon with') + 0.9;
  const toForm = T('S1_09', "I'll open") + 1.0;
  const idOn = T('S1_09', 'Look at the very');
  const toEdit = T('S1_09', 'You can rename') - 0.2;
  const backForm = T('S1_09', 'Hold on') - 0.3;
  const toNewTab = starts.S1_10 - 0.3;
  const typeA = starts.S1_10 + 0.5;
  const toSheet = typeA + 'sheets.new'.length / 9 + 1.0;
  const sel = T('S1_13', "I'll click the title") + 0.6;
  const typed = T('S1_13', 'and rename it') + 0.4;
  const named = E('S1_13') - 0.3;
  const tabs = ['odoo4', 'newtab'];
  return (
    <SectionView tabs={tabs}
      views={[
        {at: 0, tab: 'odoo4', shot: 's1_kanban', url: ODOO(), title: 'Products - Odoo'},
        {at: toList, tab: 'odoo4', shot: 's1_list', url: ODOO()},
        {at: toForm, tab: 'odoo4', shot: 's1_form', title: '[BL-1005] Pallet Jack Wheels (set) - Odoo',
          url: (t: number) => <UrlWithId base={ODOO('/')} id="45" on={prog(Math.round(t * FPS), Math.round(idOn * FPS), Math.round((idOn + 0.8) * FPS))} />},
        {at: toEdit, tab: 'odoo4', shot: 's1_form_edit', url: <UrlWithId base={ODOO('/')} id="45" on={1} />},
        {at: backForm, tab: 'odoo4', shot: 's1_form', url: <UrlWithId base={ODOO('/')} id="45" on={1} />},
        {at: toNewTab, tab: 'newtab', el: <NewTabSim />, title: 'New Tab', url: (t: number) => (t >= typeA ? <TypedUrl text="sheets.new" t={t} a={typeA} /> : '')},
        {at: toSheet, tab: 'newtab', shot: 's1_sheet_new', url: SHEET, title: 'Untitled spreadsheet - Google Sheets'},
        {at: sel, tab: 'newtab', shot: 's1_sheet_title_sel', url: SHEET},
        {at: typed, tab: 'newtab', shot: 's1_sheet_title_typed', url: SHEET},
        {at: named, tab: 'newtab', shot: 's1_sheet_named', url: SHEET, title: 'BrightLeaf Stocky Database - Google Sheets'},
      ]}
      boxes={[
        {shot: 's1_kanban', key: 'breadcrumb', a: T('S1_01', "I'm in Inventory"), b: T('S1_01', 'and I\'m switching')},
        {shot: 's1_kanban', key: 'listIcon', a: T('S1_01', 'the icon with') - 0.4, b: toList},
        {shot: 's1_list', key: 'r1005', a: T('S1_02', 'Each row'), b: T('S1_02', 'Each column'), pad: 2, radius: 8},
        {shot: 's1_list', key: 'c_ref', a: T('S1_02', 'the reference'), b: T('S1_02', 'the name') - 0.05, pad: 2, radius: 8},
        {shot: 's1_list', key: 'c_name', a: T('S1_02', 'the name'), b: T('S1_02', 'the sales') - 0.05, pad: 2, radius: 8},
        {shot: 's1_list', key: 'c_price', a: T('S1_02', 'the sales'), b: T('S1_02', 'the cost') - 0.05, pad: 2, radius: 8},
        {shot: 's1_list', key: 'c_cost', a: T('S1_02', 'the cost'), b: T('S1_02', 'the quantity') - 0.05, pad: 2, radius: 8},
        {shot: 's1_list', key: 'c_qty', a: T('S1_02', 'the quantity'), b: E('S1_02') + 0.3, pad: 2, radius: 8},
        {shot: 's1_list', key: 'r1003', a: starts.S1_06, b: E('S1_06') + 0.2, pad: 2, radius: 8},
        {shot: 's1_list', key: 'c_cost', a: starts.S1_07, b: E('S1_07') + 0.2, pad: 2, radius: 8},
        {shot: 's1_list', key: 'r1005', a: T('S1_09', "I'll open") - 0.2, b: toForm, pad: 2, radius: 8},
        {shot: 's1_form_edit', key: 'name', a: toEdit + 0.2, b: backForm},
        {shot: 's1_form_edit', key: 'cost', a: toEdit + 0.2, b: backForm},
        {shot: 's1_sheet_title_sel', key: 'title', a: sel - 0.3, b: named + 1.2},
      ]}
      keys={[
        {t: 0.4, x: 1500, y: 800},
        {t: toList - 0.1, shot: 's1_kanban', key: 'listIcon', click: true},
        {t: toList + 1.2, x: 1600, y: 900},
        {t: toForm - 0.1, shot: 's1_list', key: 'r1005', dx: -300, click: true},
        {t: toForm + 1.2, x: 1600, y: 900},
        {t: toEdit - 0.1, shot: 's1_form_edit', key: 'name', dx: -300, click: true},
        {t: backForm - 0.6, x: 1600, y: 900},
        {t: toNewTab - 0.1, tab: 'newtab', click: true},
        {t: typeA - 0.1, x: 400, y: -40, click: true},
        {t: toSheet + 1, x: 1600, y: 900},
        {t: sel - 0.1, shot: 's1_sheet_title_sel', key: 'title', click: true},
        {t: named + 1, x: 1600, y: 900},
      ]}
      overlays={[
        {a: T('S1_02', 'Rows and columns'), b: T('S1_02', 'Each column') - 0.1, el: card(big('Row = one product'), C.blue)},
        {a: T('S1_02', 'Each column'), b: E('S1_02') + 0.3, el: card(big('Column = one piece of information', 'reference · name · sales price · cost · quantity on hand'), C.blue)},
        {a: starts.S1_06, b: E('S1_06') + 0.2, el: card(big('Row = one record', 'One product. One supplier. One stock count.'), C.blue)},
        {a: starts.S1_07, b: E('S1_07') + 0.2, el: card(big('Column = one field', 'Every record has it: name, cost, lead time…'), C.blue)},
        {a: idOn + 0.6, b: toEdit - 0.2, el: card(big("Odoo's internal ID for this product", 'It never changes.'), C.hi)},
        {a: toEdit, b: backForm + 0.6, el: card(<><div style={{fontSize: 30, fontWeight: 800}}>Rename it, reprice it <Example /></div>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 24, fontWeight: 700, color: C.slate, marginTop: 10}}><Lock size={24} color={C.green} /> …the ID stays <b style={{color: C.navy}}>45</b></div>
          <div style={{fontSize: 18, color: C.slate, marginTop: 8}}>(changes not saved)</div></>, C.amber)},
        {a: T('S1_11', 'One'), b: E('S1_11') + 0.3, el: (f) => {
          const a2 = fr(T('S1_11', 'One'), T('S1_11', 'Two')), a3 = fr(T('S1_11', 'One'), T('S1_11', 'And three'));
          const row = (n: number, at: number, body: React.ReactNode) => (
            <div style={{display: 'flex', gap: 14, alignItems: 'flex-start', marginTop: n > 1 ? 18 : 0, opacity: pop(f, at, 13)}}>
              <div style={{width: 44, height: 44, borderRadius: 22, background: C.blue, color: C.white, fontSize: 24, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{n}</div>
              <div style={{fontSize: 25, fontWeight: 700, lineHeight: 1.3}}>{body}</div>
            </div>
          );
          return (
            <FloatCard f={f} x={0} y={0} w={600}>
              {kicker('Why Google Sheets?')}
              {row(1, 0, 'Free, and you already know it')}
              {row(2, a2, <>Lives online: n8n can reach it from anywhere <span style={{display: 'inline-flex', gap: 6, verticalAlign: 'middle', color: C.slate}}><Cloud size={24} color={C.blue} /> vs <Laptop size={24} /><Lock size={18} /></span><div style={{fontSize: 20, color: C.slate, fontWeight: 600}}>(a laptop Excel file can't)</div></>)}
              {row(3, a3, 'You can see exactly what Stocky wrote. No black box.')}
            </FloatCard>
          );
        }},
        {a: starts.S1_12, b: E('S1_12') + 0.3, el: card(big('Airtable does the same job with a few more features.', 'For learning: Google Sheets.'), C.slate)},
        {a: starts.S1_13, b: E('S1_13') + 0.8, el: card(<>{kicker('Pro tip', C.amber)}<div style={{fontSize: 28, fontWeight: 800}}><Sparkles size={26} color={C.amber} style={{verticalAlign: 'middle'}} /> sheets.new creates a new Google Sheet in one step</div></>, C.amber)},
      ]}
      lowers={[{a: starts.S1_04 - 0.2, b: E('S1_04') + 2.2, text: 'Database = a super-organised workbook · Table = a sheet · Row = a record · Column = a field'}]}
      full={[
        {a: starts.S1_03 - 0.1, b: E('S1_05') + 0.2, el: (f) => <Workbook f={f} stage={1} tabsAt={fr(starts.S1_03 - 0.1, starts.S1_05)} />},
        {a: starts.S1_08 - 0.1, b: E('S1_08') + 0.4, el: (f) => <Workbook f={f + 400} stage={2} tabsAt={0} outlineAt={400 + 6} />},
      ]}
    />
  );
};

// ================================================================ S2 Building the Suppliers table
export const V4S2: React.FC<{starts: Starts}> = ({starts}) => {
  const {T, E} = mk(starts);
  const think = starts.S2_08q;
  const hold = starts.S2_09 - 5; // 5 s silent thinking time after the question
  return (
    <SectionView tabs={['sheets4']}
      views={[
        {at: 0, tab: 'sheets4', shot: 's2_start', url: SHEET, title: 'BrightLeaf Stocky Database - Google Sheets'},
        {at: T('S2_01', 'I double-click'), tab: 'sheets4', shot: 's2_tab_edit', url: SHEET},
        {at: T('S2_01', 'and rename it') + 0.6, tab: 'sheets4', shot: 's2_tab_named', url: SHEET},
        {at: T('S2_02', 'Supplier ID'), tab: 'sheets4', shot: 's2_head_half', url: SHEET},
        {at: T('S2_02', 'currency'), tab: 'sheets4', shot: 's2_headers', url: SHEET},
        {at: starts.S2_05, tab: 'sheets4', shot: 's2_row_sel', url: SHEET},
        {at: T('S2_05', 'bold') + 0.3, tab: 'sheets4', shot: 's2_bold', url: SHEET},
        {at: T('S2_05', 'then View'), tab: 'sheets4', shot: 's2_view_freeze', url: SHEET},
        {at: T('S2_05', 'one row') + 0.2, tab: 'sheets4', shot: 's2_frozen', url: SHEET},
        {at: T('S2_05', 'Now when'), tab: 'sheets4', shot: 's2_frozen_scrolled', url: SHEET},
        {at: E('S2_05') - 0.4, tab: 'sheets4', shot: 's2_frozen', url: SHEET},
        {at: T('S2_06', 'SUP dash'), tab: 'sheets4', shot: 's2_row2_half', url: SHEET},
        {at: T('S2_06', 'Apex Fasteners') + 0.6, tab: 'sheets4', shot: 's2_row2', url: SHEET},
        {at: T('S2_06', 'SUP-002'), tab: 'sheets4', shot: 's2_row3', url: SHEET},
        {at: T('S2_06', 'All the way'), tab: 'sheets4', shot: 's2_rows_all', url: SHEET},
        {at: starts.S2_10, tab: 'sheets4', shot: 's2_sel_d', url: SHEET},
        {at: T('S2_10', 'then Data'), tab: 'sheets4', shot: 's2_data_menu', url: SHEET},
        {at: T('S2_10', 'Add rule') - 0.5, tab: 'sheets4', shot: 's2_dv_side', url: SHEET},
        {at: T('S2_10', 'Add rule') + 0.5, tab: 'sheets4', shot: 's2_dv_rule', url: SHEET},
        {at: T('S2_10', 'For criteria'), tab: 'sheets4', shot: 's2_dv_criteria', url: SHEET},
        {at: T('S2_10', 'Dropdown') + 0.1, tab: 'sheets4', shot: 's2_dv_options', url: SHEET},
        {at: T('S2_10', 'Done') + 0.3, tab: 'sheets4', shot: 's2_dv_done', url: SHEET},
        {at: T('S2_11', 'They pick'), tab: 'sheets4', shot: 's2_dd_open', url: SHEET},
        {at: T('S2_11', "I'll do the same"), tab: 'sheets4', shot: 's2_cur_options', url: SHEET},
        {at: E('S2_11') - 0.2, tab: 'sheets4', shot: 's2_cur_done', url: SHEET},
        {at: T('S2_12', 'I select it'), tab: 'sheets4', shot: 's2_sel_i', url: SHEET},
        {at: T('S2_12', 'click Insert'), tab: 'sheets4', shot: 's2_insert_menu', url: SHEET},
        {at: T('S2_12', 'TRUE becomes'), tab: 'sheets4', shot: 's2_checks', url: SHEET},
        {at: T('S2_12', 'Sarah unticks'), tab: 'sheets4', shot: 's2_untick', url: SHEET},
        {at: T('S2_12', 'We just mark') + 1.2, tab: 'sheets4', shot: 's2_retick', url: SHEET},
      ]}
      boxes={[
        {shot: 's2_tab_edit', key: 'tab', a: T('S2_01', 'I double-click'), b: T('S2_01', 'and rename it') + 1.4, radius: 10},
        {shot: 's2_headers', key: 'row1', a: starts.S2_03, b: E('S2_03') + 0.2, pad: 2, radius: 6},
        {shot: 's2_headers', key: 'a1', a: starts.S2_04, b: E('S2_04') + 0.2, pad: 4, radius: 8},
        {shot: 's2_view_freeze', key: 'oneRow', a: T('S2_05', 'one row') - 0.3, b: T('S2_05', 'one row') + 0.2, pad: 4, radius: 8},
        {shot: 's2_frozen_scrolled', key: 'row1', a: T('S2_05', 'Now when') + 0.3, b: E('S2_05') - 0.4, pad: 2, radius: 6},
        {shot: 's2_row2_half', key: 'a2', a: T('S2_06', 'SUP dash'), b: T('S2_06', 'Apex Fasteners') + 0.6, pad: 4, radius: 8},
        {shot: 's2_rows_all', key: 'ids', a: starts.S2_07, b: E('S2_07') + 0.2, pad: 4, radius: 8},
        {shot: 's2_rows_all', key: 'latlong5', a: T('S2_08', 'Recognise'), b: T('S2_08', 'Same with the currency'), pad: 4, radius: 8},
        {shot: 's2_rows_all', key: 'cur', a: T('S2_08', 'Same with the currency'), b: E('S2_08') + 0.2, pad: 4, radius: 8},
        {shot: 's2_rows_all', key: 'r5', a: think, b: E('S2_09') + 0.2, pad: 2, radius: 6, color: C.amber},
        {shot: 's2_rows_all', key: 'r7', a: think, b: E('S2_09') + 0.2, pad: 2, radius: 6, color: C.amber},
        {shot: 's2_sel_d', key: 'd', a: starts.S2_10, b: T('S2_10', 'then Data'), pad: 2, radius: 6},
        {shot: 's2_data_menu', key: 'dv', a: T('S2_10', 'Data validation') - 0.2, b: T('S2_10', 'Add rule') - 0.5, pad: 2, radius: 8},
        {shot: 's2_dv_side', key: 'add', a: T('S2_10', 'Add rule') - 0.5, b: T('S2_10', 'Add rule') + 0.5, pad: 4, radius: 10},
        {shot: 's2_dv_criteria', key: 'dropdown', a: T('S2_10', 'For criteria') + 0.3, b: T('S2_10', 'Dropdown') + 0.1, pad: 2, radius: 8},
        {shot: 's2_dv_options', key: 'options', a: T('S2_10', 'and I type') + 0.2, b: T('S2_10', 'Done'), pad: 2, radius: 10},
        {shot: 's2_dv_options', key: 'done', a: T('S2_10', 'Done') - 0.3, b: T('S2_10', 'Done') + 0.3, pad: 4, radius: 10},
        {shot: 's2_dv_done', key: 'd', a: T('S2_10', 'Done') + 0.5, b: E('S2_10') + 0.4, pad: 2, radius: 6},
        {shot: 's2_cur_done', key: 'e', a: E('S2_11') - 0.2, b: E('S2_11') + 0.4, pad: 2, radius: 6},
        {shot: 's2_insert_menu', key: 'checkbox', a: T('S2_12', 'click Insert') + 0.2, b: T('S2_12', 'TRUE becomes'), pad: 2, radius: 8},
        {shot: 's2_checks', key: 'i', a: T('S2_12', 'TRUE becomes'), b: T('S2_12', 'Sarah unticks'), pad: 4, radius: 8},
        {shot: 's2_untick', key: 'r6', a: T('S2_12', 'Sarah unticks'), b: T('S2_12', 'We just mark') + 1.2, pad: 2, radius: 6, color: C.amber},
      ]}
      keys={[
        {t: 0.4, x: 1500, y: 800},
        {t: T('S2_01', 'I double-click') - 0.1, shot: 's2_tab_edit', key: 'tab', click: true},
        {t: T('S2_01', 'I double-click') + 1.4, x: 1600, y: 900},
        {t: starts.S2_05 - 0.1, x: 34, y: 264, click: true},
        {t: T('S2_05', 'bold') - 0.15, shot: 's2_bold', key: 'bold', click: true},
        {t: T('S2_05', 'then View') - 0.1, shot: 's2_view_freeze', key: 'view', click: true},
        {t: T('S2_05', 'Freeze') + 0.1, shot: 's2_view_freeze', key: 'freeze', dx: -120},
        {t: T('S2_05', 'one row') + 0.1, shot: 's2_view_freeze', key: 'oneRow', click: true},
        {t: T('S2_05', 'Now when') + 0.8, x: 1600, y: 900},
        {t: T('S2_06', 'SUP dash') - 0.1, shot: 's2_row2_half', key: 'a2', click: true},
        {t: T('S2_06', 'SUP dash') + 1.2, x: 1600, y: 900},
        {t: starts.S2_10 - 0.1, x: 449, y: 230, click: true},
        {t: T('S2_10', 'then Data') - 0.1, shot: 's2_data_menu', key: 'data', click: true},
        {t: T('S2_10', 'Add rule') - 0.6, shot: 's2_data_menu', key: 'dv', click: true},
        {t: T('S2_10', 'Add rule') + 0.3, shot: 's2_dv_side', key: 'add', click: true},
        {t: T('S2_10', 'For criteria') - 0.1, shot: 's2_dv_rule', key: 'criteria', click: true},
        {t: T('S2_10', 'Dropdown'), shot: 's2_dv_criteria', key: 'dropdown', click: true},
        {t: T('S2_10', 'Done') + 0.2, shot: 's2_dv_options', key: 'done', click: true},
        {t: T('S2_10', 'Done') + 1.5, x: 1600, y: 900},
        {t: T('S2_11', 'They pick') - 0.1, shot: 's2_dd_open', key: 'd2', dx: 60, click: true},
        {t: T('S2_11', "I'll do the same") + 1, x: 1600, y: 900},
        {t: T('S2_12', 'I select it') - 0.1, x: 1605, y: 301, click: true},
        {t: T('S2_12', 'I select it') + 0.5, x: 1605, y: 459},
        {t: T('S2_12', 'click Insert') - 0.1, shot: 's2_insert_menu', key: 'insert', click: true},
        {t: T('S2_12', 'TRUE becomes') - 0.2, shot: 's2_insert_menu', key: 'checkbox', click: true},
        {t: T('S2_12', 'Sarah unticks') - 0.1, shot: 's2_checks', key: 'i6', click: true},
        {t: T('S2_12', 'We just mark') + 1.1, shot: 's2_checks', key: 'i6', click: true},
        {t: E('S2_12'), x: 1600, y: 900},
      ]}
      overlays={[
        {a: T('S2_01', 'One table'), b: T('S2_01', 'I double-click') - 0.2, el: card(big('One table for one kind of thing', 'This one: suppliers, and only suppliers'), C.blue)},
        {a: T('S2_03', 'No title'), b: E('S2_03') + 0.3, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={600}>
            <div style={{position: 'relative', padding: '14px 18px', borderRadius: 12, background: '#F1F5F9', fontSize: 24, fontWeight: 700, color: C.slate, textAlign: 'center'}}>
              BrightLeaf supplier list, updated by Sarah
              <div style={{position: 'absolute', left: 10, right: 10, top: '50%', height: 4, background: C.red, transform: `scaleX(${prog(f, 20, 34)})`, transformOrigin: 'left'}} />
            </div>
            <div style={{marginTop: 16, opacity: prog(f, 30, 40)}}>{big('Exactly one header row.', 'Data starts in row 2.')}</div>
          </FloatCard>
        )},
        {a: T('S2_04', 'like'), b: E('S2_04') + 0.3, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={600}>
            {kicker('Underscores, not spaces')}
            <div style={{display: 'flex', gap: 14}}>
              <div style={{flex: 1, padding: 16, borderRadius: 14, background: C.amberSoft}}><div style={{fontSize: 28, fontWeight: 800, fontFamily: 'monospace'}}>Supplier ID</div><div style={{fontSize: 19, fontWeight: 600, color: '#92400E', marginTop: 6}}>small annoyances in automation tools later</div></div>
              <div style={{flex: 1, padding: 16, borderRadius: 14, background: C.greenSoft, opacity: pop(f, 14)}}><div style={{fontSize: 28, fontWeight: 800, fontFamily: 'monospace'}}>Supplier_ID</div><div style={{fontSize: 19, fontWeight: 600, color: '#14532D', marginTop: 6}}>never a problem</div></div>
            </div>
            <div style={{fontSize: 22, fontWeight: 700, color: C.slate, marginTop: 14, opacity: prog(f, 40, 50)}}>A two-second habit.</div>
          </FloatCard>
        )},
        {a: T('S2_05', 'Now when'), b: E('S2_05') + 0.2, el: card(big('Headers stay on screen'), C.green)},
        {a: T('S2_06', 'SUP-002') + 1, b: E('S2_06') + 0.3, el: (f) => <FloatCard f={f} x={0} y={0} w={600} dark><div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, fontWeight: 800}}><FastForward size={36} color={C.hi} /> Fast-forward: rows 4 to 7</div></FloatCard>},
        {a: starts.S2_07, b: E('S2_07') + 0.3, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={600}>
            {kicker('See the ID pattern?')}
            <div style={{display: 'flex', alignItems: 'flex-end', gap: 6, fontFamily: 'monospace', fontWeight: 800}}>
              {[['SUP', 'what kind of thing', C.blue], ['-', '', C.slate], ['004', 'number, leading zeros', C.green]].map(([t, s, c], i) => (
                <div key={i} style={{textAlign: 'center', opacity: pop(f, 6 + i * 8)}}>
                  <div style={{fontSize: 52, color: c as string}}>{t}</div>
                  <div style={{fontSize: 17, fontFamily: INTER, color: C.slate, fontWeight: 700, maxWidth: 190}}>{s}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop: 14, display: 'inline-block', padding: '6px 14px', borderRadius: 10, background: '#F1F5F9', fontSize: 21, fontWeight: 700, color: C.slate, opacity: prog(f, fr(starts.S2_07, T('S2_07', 'LOG')), fr(starts.S2_07, T('S2_07', 'LOG')) + 8)}}>Next table: LOG-0001</div>
          </FloatCard>
        )},
        {a: T('S2_08', 'Recognise'), b: T('S2_08', 'Same with the currency') - 0.1, el: card(<>{kicker('Video 3 weather call')}<div style={{fontSize: 22, fontFamily: 'monospace', fontWeight: 700, wordBreak: 'break-all'}}>api.open-meteo.com/v1/forecast?<span style={{background: `${C.hi}99`}}>latitude=22.54&longitude=114.06</span></div><div style={{fontSize: 21, color: C.slate, fontWeight: 600, marginTop: 8}}>Shenzhen</div></>, C.blue)},
        {a: T('S2_08', 'Same with the currency'), b: E('S2_08') + 0.3, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={600}>
            {kicker('Video 3 currency call')}
            <div style={{fontSize: 22, fontFamily: 'monospace', fontWeight: 700}}>api.frankfurter.dev/v1/latest?<span style={{background: `${C.hi}99`}}>from=USD&to=CNY,MXN</span></div>
            <div style={{marginTop: 14, fontSize: 26, fontWeight: 800, opacity: prog(f, fr(T('S2_08', 'Same with the currency'), T('S2_08', 'Your database')), fr(T('S2_08', 'Same with the currency'), T('S2_08', 'Your database')) + 8)}}>Your database becomes the agent's to-do list.</div>
          </FloatCard>
        )},
        {a: think, b: starts.S2_09 - 0.1, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={600} accent={C.amber}>
            {kicker('Pause & think', C.amber)}
            <div style={{fontSize: 30, fontWeight: 800, lineHeight: 1.25}}>Same city and coordinates, different Supplier_IDs. Why?</div>
            {(() => {
              const hf = fr(think, hold), tot = 5 * FPS, k = Math.max(0, f - hf);
              const left = Math.max(0, Math.ceil((tot - k) / FPS));
              const R = 26, L = 2 * Math.PI * R;
              return (
                <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 16, opacity: prog(f, hf - 6, hf + 6)}}>
                  <svg width={64} height={64} viewBox="0 0 64 64">
                    <circle cx={32} cy={32} r={R} stroke="#E2E8F0" strokeWidth={7} fill="none" />
                    <circle cx={32} cy={32} r={R} stroke={C.amber} strokeWidth={7} fill="none" strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * Math.min(1, k / tot)} transform="rotate(-90 32 32)" />
                    <text x={32} y={42} textAnchor="middle" fontSize={26} fontWeight={800} fill={C.navy} fontFamily={INTER}>{left || '✓'}</text>
                  </svg>
                  <div style={{fontSize: 22, fontWeight: 700, color: C.slate}}>Have a think…</div>
                </div>
              );
            })()}
          </FloatCard>
        )},
        {a: starts.S2_09, b: E('S2_09') + 0.3, el: card(big('Different companies', 'Different contracts, products and people to call. The ID identifies the supplier, not the city.'), C.green)},
        {a: starts.S2_10, b: T('S2_10', 'Done'), el: card(big('Prevent mess before it happens'), C.blue)},
        {a: T('S2_11', 'Now nobody'), b: T('S2_11', "I'll do the same") - 0.1, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={600}>
            <div style={{display: 'flex', gap: 10}}>
              {['Mexico', 'MEX', 'mx'].map((t, i) => (
                <div key={t} style={{position: 'relative', padding: '8px 16px', borderRadius: 10, background: C.redSoft, color: C.red, fontSize: 26, fontWeight: 800, opacity: pop(f, i * 6)}}>{t}
                  <div style={{position: 'absolute', left: 6, right: 6, top: '50%', height: 3, background: C.red, transform: `scaleX(${prog(f, 20 + i * 4, 30 + i * 4)})`, transformOrigin: 'left'}} /></div>
              ))}
              <ArrowRight size={30} color={C.slate} style={{alignSelf: 'center'}} />
              <div style={{padding: '8px 16px', borderRadius: 10, background: C.greenSoft, color: C.green, fontSize: 26, fontWeight: 800, opacity: pop(f, 34)}}>MX</div>
            </div>
            <div style={{marginTop: 16, display: 'flex', alignItems: 'center', gap: 10, fontSize: 26, fontWeight: 800, opacity: prog(f, 44, 54)}}><Shield size={28} color={C.green} /> A tiny guard dog for your data</div>
          </FloatCard>
        )},
        {a: T('S2_11', "I'll do the same"), b: E('S2_11') + 0.3, el: (f) => <FloatCard f={f} x={0} y={0} w={600} dark><div style={{fontSize: 28, fontWeight: 800}}><FastForward size={30} color={C.hi} style={{verticalAlign: 'middle'}} /> Same for Currency</div><div style={{fontSize: 24, marginTop: 8, opacity: 0.85}}>USD · MXN · CNY · AED</div></FloatCard>},
        {a: T('S2_12', 'TRUE becomes'), b: T('S2_12', 'Sarah unticks') - 0.1, el: card(big('TRUE = ticked'), C.green)},
        {a: T('S2_12', 'Sarah unticks'), b: E('S2_12') + 0.4, el: card(big("Don't delete. Mark inactive.", 'Old POs still point to the ID. Stocky skips inactive rows.'), C.amber)},
      ]}
      lowers={[{a: T('S2_12', 'We don\'t delete'), b: E('S2_12') + 0.6, text: 'Beginner mistake: deleting old suppliers or products breaks the history that still points to their IDs. Mark them inactive instead.'}]}
    />
  );
};

// ================================================================ S3 Building the stock log
export const V4S3: React.FC<{starts: Starts}> = ({starts}) => {
  const {T, E} = mk(starts);
  return (
    <SectionView tabs={['sheets4']}
      views={[
        {at: 0, tab: 'sheets4', shot: 's3_start', url: SHEET, title: 'BrightLeaf Stocky Database - Google Sheets'},
        {at: T('S3_01', 'I click the plus') + 0.8, tab: 'sheets4', shot: 's3_new_tab', url: SHEET},
        {at: T('S3_01', 'rename the tab') + 0.8, tab: 'sheets4', shot: 's3_tab_named', url: SHEET},
        {at: T('S3_01', 'and add the headers') + 0.5, tab: 'sheets4', shot: 's3_headers', url: SHEET},
        {at: T('S3_01', 'Bold and freeze'), tab: 'sheets4', shot: 's3_view_freeze', url: SHEET},
        {at: T('S3_01', 'Bold and freeze') + 1.3, tab: 'sheets4', shot: 's3_headers', url: SHEET},
        {at: T('S3_03', 'LOG-0001') - 0.2, tab: 'sheets4', shot: 's3_row2_half', url: SHEET},
        {at: T('S3_03', 'Logged by'), tab: 'sheets4', shot: 's3_row2', url: SHEET},
        {at: starts.S3_04, tab: 'sheets4', shot: 's3_rows', url: SHEET},
        {at: T('S3_07', 'I select the date'), tab: 'sheets4', shot: 's3_sel_b', url: SHEET},
        {at: T('S3_07', 'then Format'), tab: 'sheets4', shot: 's3_number_menu', url: SHEET},
        {at: T('S3_07', 'Custom date') + 0.1, tab: 'sheets4', shot: 's3_date_dialog', url: SHEET},
        {at: T('S3_07', 'Why?') , tab: 'sheets4', shot: 's3_date_applied', url: SHEET},
        {at: T('S3_08', 'In the status'), tab: 'sheets4', shot: 's3_if_typing', url: SHEET},
        {at: starts.S3_09, tab: 'sheets4', shot: 's3_if_done', url: SHEET},
        {at: starts.S3_09 + 1.0, tab: 'sheets4', shot: 's3_if_filled', url: SHEET},
        {at: T('S3_10', 'If D2 said'), tab: 'sheets4', shot: 's3_ghost_text', url: SHEET},
        {at: T('S3_10', 'Clean data'), tab: 'sheets4', shot: 's3_if_filled', url: SHEET},
        {at: T('S3_11', 'In K2'), tab: 'sheets4', shot: 's3_xl_typing', url: SHEET},
        {at: T('S3_11', 'Drag down'), tab: 'sheets4', shot: 's3_xl_done', url: SHEET},
        {at: T('S3_11', 'Drag down') + 1.0, tab: 'sheets4', shot: 's3_xl_filled', url: SHEET},
        {at: T('S3_12', 'If PackRight'), tab: 'sheets4', shot: 's3_sup_renamed', url: SHEET},
        {at: T('S3_12', 'and every stock'), tab: 'sheets4', shot: 's3_log_renamed', url: SHEET},
        {at: T('S3_12', 'In database language'), tab: 'sheets4', shot: 's3_final', url: SHEET},
      ]}
      boxes={[
        {shot: 's3_start', key: 'add', a: T('S3_01', 'I click the plus') - 0.3, b: T('S3_01', 'I click the plus') + 0.8, pad: 4, radius: 10},
        {shot: 's3_tab_named', key: 'tab', a: T('S3_01', 'rename the tab') + 0.8, b: T('S3_01', 'and add the headers') + 0.5, radius: 10},
        {shot: 's3_view_freeze', key: 'oneRow', a: T('S3_01', 'Bold and freeze') + 0.5, b: T('S3_01', 'Bold and freeze') + 1.3, pad: 4, radius: 8},
        {shot: 's3_row2', key: 'j2', a: T('S3_03', 'And in the note'), b: E('S3_03') + 0.3, pad: 4, radius: 8},
        {shot: 's3_rows', key: 'd2', a: T('S3_04', 'I typed'), b: E('S3_05') + 0.2, pad: 4, radius: 8},
        {shot: 's3_rows', key: 'e2', a: T('S3_04', 'The unit'), b: T('S3_04', 'The comment'), pad: 4, radius: 8},
        {shot: 's3_rows', key: 'j2', a: T('S3_04', 'The comment'), b: T('S3_04', 'This is the most'), pad: 4, radius: 8},
        {shot: 's3_sel_b', key: 'b', a: T('S3_07', 'I select the date'), b: T('S3_07', 'then Format'), pad: 2, radius: 6},
        {shot: 's3_number_menu', key: 'custom', a: T('S3_07', 'Custom date') - 0.4, b: T('S3_07', 'Custom date') + 0.1, pad: 2, radius: 8},
        {shot: 's3_date_dialog', key: 'iso', a: T('S3_07', 'and pick'), b: T('S3_07', 'Why?'), pad: 2, radius: 8},
        {shot: 's3_date_applied', key: 'b', a: T('S3_07', 'Why?'), b: E('S3_07') + 0.3, pad: 2, radius: 6},
        {shot: 's3_if_typing', key: 'fbar', a: T('S3_08', 'equals IF'), b: E('S3_08') + 0.3, pad: 2, radius: 8},
        {shot: 's3_if_done', key: 'g2', a: starts.S3_09 - 0.2, b: starts.S3_09 + 1.0, pad: 4, radius: 8},
        {shot: 's3_if_filled', key: 'g', a: starts.S3_09 + 1.0, b: E('S3_09') + 0.3, pad: 4, radius: 8},
        {shot: 's3_ghost_text', key: 'd2', a: T('S3_10', 'If D2 said'), b: T('S3_10', 'Clean data'), pad: 4, radius: 8, color: C.red},
        {shot: 's3_ghost_text', key: 'g2', a: T('S3_10', 'If D2 said') + 0.4, b: T('S3_10', 'Clean data'), pad: 4, radius: 8, color: C.red},
        {shot: 's3_xl_typing', key: 'fbar', a: T('S3_11', 'In K2'), b: T('S3_11', 'Drag down'), pad: 2, radius: 8},
        {shot: 's3_xl_filled', key: 'k', a: T('S3_11', 'Drag down') + 1.0, b: E('S3_11') + 0.3, pad: 4, radius: 8},
        {shot: 's3_xl_filled', key: 'h', a: T('S3_11', 'There they are') + 0.3, b: E('S3_11') + 0.3, pad: 4, radius: 8},
        {shot: 's3_sup_renamed', key: 'b3', a: T('S3_12', 'If PackRight') + 0.3, b: T('S3_12', 'and every stock'), pad: 4, radius: 8},
        {shot: 's3_log_renamed', key: 'k3', a: T('S3_12', 'and every stock'), b: T('S3_12', 'In database language'), pad: 4, radius: 8},
      ]}
      keys={[
        {t: 0.4, x: 1500, y: 800},
        {t: T('S3_01', 'I click the plus') + 0.6, shot: 's3_start', key: 'add', click: true},
        {t: T('S3_01', 'rename the tab') + 0.7, shot: 's3_new_tab', key: 'tab', click: true},
        {t: T('S3_01', 'and add the headers') + 0.4, x: 135, y: 264, click: true},
        {t: T('S3_01', 'and add the headers') + 1.4, x: 1600, y: 900},
        {t: T('S3_01', 'Bold and freeze') - 0.1, shot: 's3_view_freeze', key: 'view', click: true},
        {t: T('S3_01', 'Bold and freeze') + 0.6, shot: 's3_view_freeze', key: 'freeze', dx: -120},
        {t: T('S3_01', 'Bold and freeze') + 1.2, shot: 's3_view_freeze', key: 'oneRow', click: true},
        {t: E('S3_01') + 0.6, x: 1600, y: 900},
        {t: T('S3_03', 'LOG-0001') - 0.3, x: 135, y: 296, click: true},
        {t: T('S3_03', 'LOG-0001') + 1.0, x: 1600, y: 900},
        {t: T('S3_07', 'I select the date') - 0.1, x: 271, y: 230, click: true},
        {t: T('S3_07', 'then Format') - 0.1, shot: 's3_number_menu', key: 'format', click: true},
        {t: T('S3_07', 'Number') + 0.1, shot: 's3_number_menu', key: 'number', dx: -120},
        {t: T('S3_07', 'Custom date'), shot: 's3_number_menu', key: 'custom', click: true},
        {t: T('S3_07', 'and pick') + 0.2, shot: 's3_date_dialog', key: 'iso', click: true},
        {t: T('S3_07', 'Why?') - 0.2, shot: 's3_date_dialog', key: 'apply', click: true},
        {t: T('S3_07', 'Why?') + 1, x: 1600, y: 900},
        {t: T('S3_08', 'In the status') - 0.1, shot: 's3_if_typing', key: 'g2', click: true},
        {t: T('S3_08', 'In the status') + 1.0, x: 1600, y: 900},
        {t: starts.S3_09 + 0.1, x: 983, y: 314, click: true},
        {t: starts.S3_09 + 0.95, x: 983, y: 378},
        {t: starts.S3_09 + 2.2, x: 1600, y: 900},
        {t: T('S3_10', 'If D2 said') - 0.1, shot: 's3_ghost_text', key: 'd2', click: true},
        {t: T('S3_10', 'Clean data') + 0.6, x: 1600, y: 900},
        {t: T('S3_11', 'In K2') - 0.1, shot: 's3_xl_typing', key: 'k2', click: true},
        {t: T('S3_11', 'Drag down') + 0.15, x: 1830, y: 314, click: true},
        {t: T('S3_11', 'Drag down') + 0.95, x: 1830, y: 378},
        {t: T('S3_11', 'There they are') + 0.8, x: 1600, y: 900},
      ]}
      overlays={[
        {a: starts.S3_02, b: E('S3_02') + 0.3, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={600}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}><BookOpen size={40} color={C.amber} />{kicker('A log = a diary', C.amber)}</div>
            <div style={{fontSize: 28, fontWeight: 700, fontStyle: 'italic', lineHeight: 1.35}}>Never rub out yesterday's entry. Every check gets a new row.</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 18, opacity: prog(f, fr(starts.S3_02, T('S3_02', 'That way')), fr(starts.S3_02, T('S3_02', 'That way')) + 10)}}>
              <Face name="sarah" size={64} />
              <div style={{padding: '12px 16px', borderRadius: 16, background: C.blueSoft, fontSize: 22, fontWeight: 700}}>“How fast were we burning through safety gloves in October?”</div>
            </div>
          </FloatCard>
        )},
        {a: T('S3_03', 'And in the note'), b: E('S3_03') + 0.3, el: card(big('Comments get their own column'), C.blue)},
        {a: starts.S3_04, b: T('S3_04', 'I typed') - 0.1, el: (f) => <FloatCard f={f} x={0} y={0} w={600} dark><div style={{fontSize: 28, fontWeight: 800}}><FastForward size={30} color={C.hi} style={{verticalAlign: 'middle'}} /> Fast-forward: LOG-0002, LOG-0003</div></FloatCard>},
        {a: T('S3_04', 'I typed'), b: E('S3_05') + 0.3, el: (f) => {
          const why = fr(T('S3_04', 'I typed'), starts.S3_05);
          return (
            <FloatCard f={f} x={0} y={0} w={600}>
              {kicker('Just the number')}
              <div style={{display: 'flex', gap: 14}}>
                <div style={{flex: 1, padding: 16, borderRadius: 14, background: C.greenSoft}}><div style={{fontSize: 34, fontWeight: 800, color: C.green}}><Check size={28} style={{verticalAlign: 'middle'}} /> 18</div>
                  <div style={{fontSize: 19, fontWeight: 600, color: '#14532D', marginTop: 6, opacity: prog(f, why, why + 8)}}>a number: add it, compare it, is it below 25?</div></div>
                <div style={{flex: 1, padding: 16, borderRadius: 14, background: C.redSoft}}><div style={{fontSize: 26, fontWeight: 800, color: C.red}}><X size={26} style={{verticalAlign: 'middle'}} /> 18 sets - urgent!</div>
                  <div style={{fontSize: 19, fontWeight: 600, color: '#7F1D1D', marginTop: 6, opacity: prog(f, why, why + 8)}}>just text: formulas can't do maths with it</div></div>
              </div>
            </FloatCard>
          );
        }},
        {a: starts.S3_06, b: E('S3_06') + 0.3, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={600}>
            {kicker('Data types')}
            {[['Qty', 'number', 'Quantity holds'], ['Name', 'text', 'Names hold'], ['Active', 'true/false', 'Active holds'], ['Date', 'a real date', 'And dates']].map(([a, b, p]) => (
              <div key={a} style={{fontSize: 27, fontWeight: 700, padding: '6px 0', opacity: pop(f, fr(starts.S3_06, T('S3_06', p)), 13)}}><span style={{color: C.blue, fontWeight: 800}}>{a}</span> = {b}</div>
            ))}
          </FloatCard>
        )},
        {a: T('S3_07', 'Why?'), b: E('S3_07') + 0.3, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={600}>
            {kicker('Year-month-day')}
            {[['03/04 = 3 April in Mexico (SafeHands)', C.amber, 0], ['03/04 = March 4 in the US', C.amber, 10], ['2026-11-16: can\'t be misread, sorts correctly', C.green, fr(T('S3_07', 'Why?'), T('S3_07', '2026'))]].map(([t, c, at]) => (
              <div key={t as string} style={{fontSize: 24, fontWeight: 700, padding: '8px 12px', marginTop: 8, borderRadius: 10, background: c === C.green ? C.greenSoft : C.amberSoft, opacity: pop(f, at as number, 13)}}>{t as string}</div>
            ))}
          </FloatCard>
        )},
        {a: T('S3_08', 'In English'), b: E('S3_08') + 0.3, el: card(<>{kicker('In plain English')}<div style={{fontSize: 26, fontWeight: 700, lineHeight: 1.35}}>If on hand is at or below the reorder point, say <b style={{color: C.red}}>REORDER</b>, otherwise <b style={{color: C.green}}>OK</b></div></>, C.blue)},
        {a: T('S3_09', 'Pallet jack'), b: E('S3_09') + 0.3, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={600}>
            {[['Wheels', '18 vs 25', 'REORDER', 'Pallet jack'], ['Boxes', '1,180 vs 1,500', 'REORDER', 'Corrugated'], ['Bolts', '145 vs 80', 'OK', 'Hex bolts']].map(([n, v, s, p]) => (
              <div key={n} style={{display: 'flex', justifyContent: 'space-between', fontSize: 27, fontWeight: 700, padding: '6px 0', opacity: pop(f, fr(T('S3_09', 'Pallet jack'), T('S3_09', p)), 13)}}>
                <span>{n} · {v}</span><span style={{color: s === 'OK' ? C.green : C.red, fontWeight: 800}}>{s}</span></div>
            ))}
          </FloatCard>
        )},
        {a: T('S3_10', 'If D2 said'), b: E('S3_10') + 0.3, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={600} accent={C.red}>
            {kicker('Real result in Sheets', C.red)}
            <div style={{fontSize: 27, fontWeight: 800}}>D2 = “18 sets” → Status says <span style={{color: C.green}}>OK</span></div>
            <div style={{fontSize: 22, fontWeight: 700, color: C.red, marginTop: 8}}>Wrong answer: the formula can't read text</div>
            <div style={{fontSize: 24, fontWeight: 800, marginTop: 14, opacity: prog(f, fr(T('S3_10', 'If D2 said'), T('S3_10', 'Clean data')), fr(T('S3_10', 'If D2 said'), T('S3_10', 'Clean data')) + 8)}}>Clean data makes the smart stuff possible.</div>
          </FloatCard>
        )},
        {a: T('S3_11', 'There they are') - 0.3, b: E('S3_11') + 0.3, el: (f) => <LookupCard f={f} />},
      ]}
      lowers={[{a: T('S3_04', 'one fact per cell'), b: T('S3_04', 'one fact per cell') + 4, text: 'ONE FACT PER CELL'}]}
      full={[{a: starts.S3_12 - 0.1, b: E('S3_12') + 0.5, el: (f) => {
        const r = (p: string) => fr(starts.S3_12 - 0.1, T('S3_12', p));
        return <Relationship f={f} once={r('The name lives')} rename={r('If PackRight')} sarah={r('Sarah changes')} flow={r('and every stock')} rel={r('In database language')} built={r("You've just")} />;
      }}]}
    />
  );
};

// ================================================================ S4 The messy data makeover
export const V4S4: React.FC<{starts: Starts}> = ({starts}) => {
  const {T, E} = mk(starts);
  const ba = starts.S4_10 - 0.1;
  const crimes: [string, string][] = [['title', 'Merged title'], ['sup', 'Supplier names'], ['q145', '145 boxes'], ['bl1002', 'BL 1002'], ['blank', 'A blank SKU'], ['dates', 'Dates in five'], ['red1', 'Red cells'], ['total', 'And a TOTAL']];
  const fixCard = (n: number, t: string, sub?: string, done?: boolean) => (f: number) => <FloatCard f={f} x={0} y={0} w={600}><FixTag n={n} done={done} />{big(t, sub)}</FloatCard>;
  return (
    <SectionView tabs={['messy4']}
      views={[
        {at: 0, tab: 'messy4', shot: 's4_messy', url: MESSY, title: 'BrightLeaf Messy Export - Google Sheets'},
        {at: T('S4_03', 'I delete'), tab: 'messy4', shot: 's4_fix1_menu', url: MESSY},
        {at: T('S4_03', 'Now row 1'), tab: 'messy4', shot: 's4_fix1_done', url: MESSY},
        {at: T('S4_04', 'Format'), tab: 'messy4', shot: 's4_fix2_menu', url: MESSY},
        {at: T('S4_04', 'Unmerge') + 0.1, tab: 'messy4', shot: 's4_fix2_unmerged', url: MESSY},
        {at: T('S4_04', 'I copy'), tab: 'messy4', shot: 's4_fix2_fill1', url: MESSY},
        {at: T('S4_04', 'Every row'), tab: 'messy4', shot: 's4_fix2_done', url: MESSY},
        {at: T('S4_05', 'Edit'), tab: 'messy4', shot: 's4_fix3_menu', url: MESSY},
        {at: T('S4_05', 'BL space'), tab: 'messy4', shot: 's4_fix3_dialog', url: MESSY},
        {at: T('S4_05', 'Replace all'), tab: 'messy4', shot: 's4_fix3_replaced', url: MESSY},
        {at: T('S4_05', 'Then Data'), tab: 'messy4', shot: 's4_trim_menu', url: MESSY},
        {at: T('S4_05', 'Trim') + 0.1, tab: 'messy4', shot: 's4_trim_done', url: MESSY},
        {at: T('S4_05', 'the number one') , tab: 'messy4', shot: 's4_fix3_done', url: MESSY},
        {at: starts.S4_06, tab: 'messy4', shot: 's4_dup_menu', url: MESSY},
        {at: T('S4_06', 'Remove duplicates') + 0.4, tab: 'messy4', shot: 's4_dup_dialog', url: MESSY},
        {at: T('S4_06', 'The duplicate hex'), tab: 'messy4', shot: 's4_dup_result', url: MESSY},
        {at: T('S4_06', 'The two corrugated'), tab: 'messy4', shot: 's4_dup_done', url: MESSY},
        {at: T('S4_06', 'so I delete'), tab: 'messy4', shot: 's4_dup_ctx', url: MESSY},
        {at: T('S4_06', 'Before this'), tab: 'messy4', shot: 's4_dup_deleted', url: MESSY},
        {at: T('S4_07', 'I insert'), tab: 'messy4', shot: 's4_ins_ctx', url: MESSY},
        {at: T('S4_07', 'and split'), tab: 'messy4', shot: 's4_unit_col', url: MESSY},
        {at: T('S4_07', '145 boxes') + 0.8, tab: 'messy4', shot: 's4_q2', url: MESSY},
        {at: T('S4_07', 'approx'), tab: 'messy4', shot: 's4_q6', url: MESSY},
        {at: T('S4_07', 'The eighteen'), tab: 'messy4', shot: 's4_q_all', url: MESSY},
        {at: starts.S4_08, tab: 'messy4', shot: 's4_fix6_before', url: MESSY},
        {at: T('S4_08', 'The product list'), tab: 'messy4', shot: 's4_fix6_done', url: MESSY},
        {at: starts.S4_09, tab: 'messy4', shot: 's4_fix7_remarks', url: MESSY},
        {at: T('S4_09', 'reset the colour') - 0.4, tab: 'messy4', shot: 's4_fill_menu', url: MESSY},
        {at: T('S4_09', 'And the TOTAL') - 0.3, tab: 'messy4', shot: 's4_fix7_reset', url: MESSY},
        {at: T('S4_09', 'row goes') , tab: 'messy4', shot: 's4_total_ctx', url: MESSY},
        {at: T('S4_09', 'Totals belong'), tab: 'messy4', shot: 's4_final', url: MESSY},
      ]}
      boxes={[
        ...crimes.map(([k, p], i) => ({shot: 's4_messy', key: k, a: T('S4_02', p), b: (i < crimes.length - 1 ? T('S4_02', crimes[i + 1][1]) : T('S4_02', 'A human')) - 0.05, pad: 2, radius: 8})),
        {shot: 's4_messy', key: 'q1850', a: T('S4_02', 'approx'), b: T('S4_02', 'BL 1002') - 0.05, pad: 2, radius: 8},
        {shot: 's4_messy', key: 'q18', a: T('S4_02', '18'), b: T('S4_02', 'BL 1002') - 0.05, pad: 2, radius: 8},
        {shot: 's4_messy', key: 'bl1002b', a: T('S4_02', 'BL 1002'), b: T('S4_02', 'A blank SKU') - 0.05, pad: 2, radius: 8},
        {shot: 's4_messy', key: 'red2', a: T('S4_02', 'Red cells'), b: T('S4_02', 'And a TOTAL') - 0.05, pad: 2, radius: 8},
        {shot: 's4_fix1_done', key: 'row1', a: T('S4_03', 'Now row 1'), b: E('S4_03') + 0.3, pad: 2, radius: 6},
        {shot: 's4_fix2_menu', key: 'unmerge', a: T('S4_04', 'Unmerge') - 0.4, b: T('S4_04', 'Unmerge') + 0.1, pad: 2, radius: 8},
        {shot: 's4_fix2_unmerged', key: 'b1', a: T('S4_04', 'See the blanks'), b: T('S4_04', 'I copy'), pad: 2, radius: 6, color: C.amber},
        {shot: 's4_fix2_unmerged', key: 'b2', a: T('S4_04', 'See the blanks'), b: T('S4_04', 'I copy'), pad: 2, radius: 6, color: C.amber},
        {shot: 's4_fix2_unmerged', key: 'b3', a: T('S4_04', 'See the blanks'), b: T('S4_04', 'I copy'), pad: 2, radius: 6, color: C.amber},
        {shot: 's4_fix2_done', key: 'c', a: T('S4_04', 'Every row'), b: E('S4_04') + 0.3, pad: 2, radius: 6},
        {shot: 's4_fix3_dialog', key: 'find', a: T('S4_05', 'BL space'), b: T('S4_05', 'Replace all'), pad: 2, radius: 8},
        {shot: 's4_fix3_dialog', key: 'repl', a: T('S4_05', 'with'), b: T('S4_05', 'Replace all'), pad: 2, radius: 8},
        {shot: 's4_fix3_replaced', key: 'msg', a: T('S4_05', 'Replace all') + 0.4, b: T('S4_05', 'Then Data'), pad: 4, radius: 8},
        {shot: 's4_trim_menu', key: 'trim', a: T('S4_05', 'Trim') - 0.4, b: T('S4_05', 'Trim') + 0.1, pad: 2, radius: 8},
        {shot: 's4_dup_dialog', key: 'header', a: T('S4_06', 'data has a header'), b: T('S4_06', 'The duplicate hex'), pad: 6, radius: 8},
        {shot: 's4_dup_result', key: 'msg', a: T('S4_06', 'The duplicate hex') + 0.3, b: T('S4_06', 'The two corrugated'), pad: 2, radius: 12},
        {shot: 's4_dup_done', key: 'r4', a: T('S4_06', 'The two corrugated'), b: T('S4_06', 'Before this'), pad: 2, radius: 6},
        {shot: 's4_dup_done', key: 'r5', a: T('S4_06', 'The two corrugated'), b: T('S4_06', 'so I delete'), pad: 2, radius: 6, color: C.amber},
        {shot: 's4_unit_col', key: 'e1', a: T('S4_07', 'and split') - 0.2, b: T('S4_07', '145 boxes') + 0.8, pad: 4, radius: 8},
        {shot: 's4_q2', key: 'q2', a: T('S4_07', '145 boxes') + 0.8, b: T('S4_07', 'approx'), pad: 4, radius: 8},
        {shot: 's4_q6', key: 'q6', a: T('S4_07', 'approx'), b: T('S4_07', 'And our stretch'), pad: 4, radius: 8},
        {shot: 's4_q6', key: 'i6', a: T('S4_07', 'estimate'), b: T('S4_07', 'And our stretch'), pad: 4, radius: 8},
        {shot: 's4_q6', key: 'q5', a: T('S4_07', 'And our stretch'), b: T('S4_07', 'The eighteen'), pad: 4, radius: 8},
        {shot: 's4_q_all', key: 'de', a: T('S4_07', 'The eighteen'), b: E('S4_07') + 0.3, pad: 4, radius: 8},
        {shot: 's4_fix6_before', key: 'a7', a: starts.S4_08, b: T('S4_08', 'The product list'), pad: 4, radius: 8, color: C.amber},
        {shot: 's4_fix6_done', key: 'a7', a: T('S4_08', 'The product list'), b: E('S4_08') + 0.3, pad: 4, radius: 8},
        {shot: 's4_fix7_remarks', key: 'i6', a: starts.S4_09, b: T('S4_09', 'reset the colour') - 0.4, pad: 4, radius: 8},
        {shot: 's4_fix7_remarks', key: 'i8', a: starts.S4_09, b: T('S4_09', 'reset the colour') - 0.4, pad: 4, radius: 8},
        {shot: 's4_fill_menu', key: 'reset', a: T('S4_09', 'reset the colour') - 0.2, b: T('S4_09', 'And the TOTAL') - 0.3, pad: 4, radius: 8},
      ]}
      keys={[
        {t: 0.4, x: 1500, y: 800},
        {t: T('S4_03', 'I delete') - 0.1, x: 34, y: 296, click: true},
        {t: T('S4_03', 'Now row 1') - 0.1, shot: 's4_fix1_menu', key: 'del', click: true},
        {t: T('S4_03', 'Now row 1') + 1, x: 1600, y: 900},
        {t: T('S4_04', 'Format') - 0.1, shot: 's4_fix2_menu', key: 'format', click: true},
        {t: T('S4_04', 'Merge cells'), shot: 's4_fix2_menu', key: 'merge', dx: -120},
        {t: T('S4_04', 'Unmerge'), shot: 's4_fix2_menu', key: 'unmerge', click: true},
        {t: T('S4_04', 'See the blanks') + 0.6, x: 1600, y: 900},
        {t: T('S4_04', 'I copy') - 0.7, x: 640, y: 296, click: true},
        {t: T('S4_04', 'I copy') - 0.1, x: 640, y: 358},
        {t: T('S4_04', 'Every row') + 0.6, x: 1600, y: 900},
        {t: T('S4_05', 'Edit') - 0.9, x: 127, y: 230, click: true},
        {t: T('S4_05', 'Edit') - 0.1, shot: 's4_fix3_menu', key: 'edit', click: true},
        {t: T('S4_05', 'BL space') - 0.1, shot: 's4_fix3_menu', key: 'fr', dx: -120, click: true},
        {t: T('S4_05', 'Replace all') - 0.1, shot: 's4_fix3_dialog', key: 'rall', click: true},
        {t: T('S4_05', 'Then Data') - 0.1, shot: 's4_trim_menu', key: 'data', click: true},
        {t: T('S4_05', 'Data cleanup') + 0.2, shot: 's4_trim_menu', key: 'cleanup', dx: -120},
        {t: T('S4_05', 'Trim'), shot: 's4_trim_menu', key: 'trim', click: true},
        {t: T('S4_05', 'to remove') + 1, x: 1600, y: 900},
        {t: starts.S4_06 - 0.9, x: 34, y: 230, click: true},
        {t: starts.S4_06 - 0.1, shot: 's4_dup_menu', key: 'data', click: true},
        {t: T('S4_06', 'Data cleanup') + 0.2, shot: 's4_dup_menu', key: 'cleanup', dx: -120},
        {t: T('S4_06', 'Remove duplicates') + 0.3, shot: 's4_dup_menu', key: 'rd', click: true},
        {t: T('S4_06', 'data has a header') + 0.2, shot: 's4_dup_dialog', key: 'header', click: true},
        {t: T('S4_06', 'The duplicate hex') - 0.2, shot: 's4_dup_dialog', key: 'btn', click: true},
        {t: T('S4_06', 'The two corrugated') - 0.1, x: 1290, y: 634, click: true},
        {t: T('S4_06', 'so I delete') - 0.1, x: 34, y: 390, click: true},
        {t: T('S4_06', 'Before this') - 0.2, shot: 's4_dup_ctx', key: 'del', click: true},
        {t: T('S4_06', 'Before this') + 1, x: 1600, y: 900},
        {t: T('S4_07', 'I insert') - 0.1, x: 935, y: 230, click: true},
        {t: T('S4_07', 'and split') - 0.3, shot: 's4_ins_ctx', key: 'ins', click: true},
        {t: T('S4_07', 'and split') + 1, x: 1600, y: 900},
        {t: T('S4_07', '145 boxes') + 0.4, x: 935, y: 296, click: true},
        {t: T('S4_07', '145 boxes') + 1.6, x: 1600, y: 900},
        {t: T('S4_07', 'approx') - 0.1, x: 935, y: 422, click: true},
        {t: T('S4_07', 'approx') + 1.2, x: 1600, y: 900},
        {t: starts.S4_08 - 0.1, x: 127, y: 453, click: true},
        {t: starts.S4_08 + 1.2, x: 1600, y: 900},
        {t: starts.S4_09 - 0.1, x: 1700, y: 422, click: true},
        {t: T('S4_09', 'reset the colour') - 1.3, x: 935, y: 422, click: true},
        {t: T('S4_09', 'reset the colour') - 0.75, x: 1150, y: 485},
        {t: T('S4_09', 'reset the colour') - 0.5, shot: 's4_fill_menu', key: 'fill', click: true},
        {t: T('S4_09', 'And the TOTAL') - 0.4, shot: 's4_fill_menu', key: 'reset', click: true},
        {t: T('S4_09', 'row goes') - 0.1, x: 34, y: 596, click: true},
        {t: T('S4_09', 'Totals belong') - 0.2, shot: 's4_total_ctx', key: 'del', click: true},
        {t: T('S4_09', 'Totals belong') + 1, x: 1600, y: 900},
      ]}
      overlays={[
        {a: T('S4_02', 'A human'), b: E('S4_02') + 0.3, el: card(big('A human can muddle through.', 'An agent will stumble on every one.'), C.red)},
        {a: starts.S4_03, b: E('S4_03') + 0.3, el: fixCard(1, 'Row 1 = headers', 'Delete the title, the "prepared by" line and the blank row')},
        {a: starts.S4_04, b: E('S4_04') + 0.3, el: fixCard(2, 'Only the top cell of a merge holds the name', 'Unmerge, then copy each name down')},
        {a: starts.S4_05, b: T('S4_05', 'Then Data') - 0.1, el: fixCard(3, 'BL 1002 ≠ BL-1002', 'To a computer: apple and banana')},
        {a: T('S4_05', 'Then Data'), b: E('S4_05') + 0.3, el: fixCard(3, 'Invisible spaces', 'The #1 reason a VLOOKUP says "not found"')},
        {a: starts.S4_06, b: T('S4_06', 'Before this') - 0.1, el: fixCard(4, 'Duplicates', 'Columns checked: Item Code + Last Count Date')},
        {a: T('S4_06', 'Before this'), b: E('S4_06') + 0.3, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={600} accent={C.red}>
            <FixTag n={4} />
            <div style={{fontSize: 27, fontWeight: 800}}>Before: 1,180 + 1,180 = 2,360 boxes</div>
            <div style={{fontSize: 22, fontWeight: 700, color: C.slate, marginTop: 8}}>Above the reorder point of 1,500, so the reorder alert would never have fired.</div>
          </FloatCard>
        )},
        {a: starts.S4_07, b: T('S4_07', 'And our stretch') - 0.1, el: fixCard(5, 'One fact per cell', 'Qty = the number · Unit = its own column')},
        {a: T('S4_07', 'And our stretch'), b: E('S4_07') + 0.3, el: card(<><FixTag n={5} /><div style={{fontSize: 28, fontWeight: 800}}>21 × 12 + 8 = <span style={{color: C.green}}>260 rolls</span></div><div style={{fontSize: 22, fontWeight: 700, color: C.slate, marginTop: 8}}>Reorder point is in rolls (200). Not a stock-out.</div></>, C.green)},
        {a: starts.S4_08, b: E('S4_08') + 0.3, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={600}>
            <FixTag n={6} />
            <div style={{padding: '10px 14px', borderRadius: 12, border: '2px solid #E2E8F0', fontSize: 22, opacity: prog(f, fr(starts.S4_08, T('S4_08', 'The product list')), fr(starts.S4_08, T('S4_08', 'The product list')) + 8)}}>
              <div style={{fontSize: 16, fontWeight: 800, color: C.slate, letterSpacing: 1.5}}>PRODUCT LIST</div>
              <div style={{fontWeight: 800, background: `${C.hi}88`, borderRadius: 6, padding: '2px 6px', marginTop: 4}}>BL-1004 · Industrial Safety Gloves (pair)</div>
            </div>
            <div style={{marginTop: 12}}>{big('A row without an ID is a parcel without a label')}</div>
          </FloatCard>
        )},
        {a: starts.S4_09, b: T('S4_09', 'And the TOTAL') - 0.1, el: fixCard(7, 'Agents read values, not colours', 'Red meant "urgent", so write it in Remarks')},
        {a: T('S4_09', 'And the TOTAL'), b: E('S4_09') + 0.3, el: fixCard(7, 'Totals belong in reports, not data tables', 'or the agent counts TOTAL as a product', true)},
      ]}
      full={[{a: ba, b: E('S4_10') + 0.4, el: (f) => <BeforeAfter f={f} s1={fr(ba, T('S4_10', 'The packing tape'))} s2={fr(ba, T('S4_10', 'And the hydraulic'))} />}]}
    />
  );
};
