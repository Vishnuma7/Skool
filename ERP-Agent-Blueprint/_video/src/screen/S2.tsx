import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {
  Bot, Brain, CalendarDays, Check, CheckCircle2, ClipboardList, CloudRain, Database, DoorClosed, Eye, Lightbulb, ListOrdered, Lock, MapPin, MessageSquare, MousePointerClick, Target, UserRound, Workflow, Wrench, X,
} from 'lucide-react';
import {Logo} from '../components/Logo';
import {C, FPS, INTER, shadow} from '../theme';
import {pop, prog} from '../lib/anim';
import {vcue, vdur} from '../lib/cues';
import {Bg} from '../components/Bg';
import {LowerThird} from '../components/Gfx';
import {Intern as InternFace, StockyBot} from '../components/Art';
import {BrowserFrame, Box, CK, Cursor, Magnify, mid, Overlay, Rect, Shot, tabPoint, vis} from './kit';
import {CLAUDE_INPUT, CLAUDE_Q, CLAUDE_SEND, ClaudeChat, Mark} from './sims';
import {SYSTEM_PARTS} from './systemMessage';
import n8nStocky from '../../public/cap/n8n_stocky.json';
import n8nOld from '../../public/cap/n8n_old.json';
import n8nIf from '../../public/cap/n8n_old_if.json';
import n8nAgent from '../../public/cap/n8n_agent_panel.json';

const R = (o: unknown) => o as Record<string, Rect>;
const NS = R(n8nStocky), NO = R(n8nOld), NI = R(n8nIf), NA = R(n8nAgent);
const TABS = ['claude', 'n8nOld', 'n8n'];

// ------------------------------------------------------------------ comparison table
type Ic = React.FC<{size?: number; color?: string}>;
const COLS: {k: string; c: string; I: Ic; eg: React.ReactNode; rows: {t: string; I: Ic}[]}[] = [
  {k: 'Chatbot', c: C.slate, I: MessageSquare,
    eg: <><Logo name="claude_mark" w={26} /><Logo name="openai_mark" w={26} /> e.g. Claude, ChatGPT</>,
    rows: [{t: 'talks', I: MessageSquare}, {t: 'no access', I: Lock}, {t: 'you do the work', I: UserRound}]},
  {k: 'Automation', c: C.blue, I: Workflow,
    eg: <><Logo name="n8n_mark" w={30} /> e.g. an n8n IF rule</>,
    rows: [{t: 'follows fixed steps', I: ListOrdered}, {t: 'reads and writes', I: Database}, {t: 'no judgement', I: X}]},
  {k: 'AI Agent', c: C.green, I: Bot,
    eg: <><StockyBot size={26} /> e.g. Stocky</>,
    rows: [{t: 'reasons toward a goal', I: Target}, {t: 'uses tools', I: Wrench}, {t: 'acts with approval', I: CheckCircle2}]},
];
const VERDICTS = [
  {t: 'Just words to draft or explain → chatbot', c: C.slate},
  {t: 'Same every time + a clear rule → automation: cheaper, faster, predictable', c: C.blue},
  {t: 'Needs judgement: messy info, several factors, explaining why → agent', c: C.green},
];
export const CompareTable: React.FC<{f: number; heads: number[]; fill?: number[]; hl?: number[]; cards?: number[]}> = ({f, heads, fill = [], hl = [], cards = []}) => (
  <AbsoluteFill style={{fontFamily: INTER, padding: '0 100px', boxSizing: 'border-box', justifyContent: 'center'}}>
    <div style={{fontSize: 62, fontWeight: 800, color: C.white, textAlign: 'center', opacity: prog(f, 0, 12), letterSpacing: -1}}>Chatbot vs Automation vs AI Agent</div>
    <div style={{display: 'flex', gap: 32, marginTop: 36}}>
      {COLS.map((col, ci) => {
        const p = pop(f, heads[ci], 12);
        return (
          <div key={col.k} style={{flex: 1, borderRadius: 30, background: C.white, overflow: 'hidden', boxShadow: shadow, opacity: p, transform: `translateY(${(1 - p) * -50}px)`}}>
            <div style={{background: `linear-gradient(135deg, ${col.c}, ${col.c}CC)`, color: C.white, padding: '26px 30px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
                <div style={{width: 72, height: 72, borderRadius: 20, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><col.I size={42} /></div>
                <div style={{fontSize: 44, fontWeight: 800}}>{col.k}</div>
              </div>
              <div style={{marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.92)', color: C.navy, fontSize: 20, fontWeight: 700}}>{col.eg}</div>
            </div>
            <div style={{padding: '22px 24px 10px'}}>
              {col.rows.map((r, ri) => {
                const n = Math.floor(r.t.length * Math.max(0, Math.min(1, (fill[ci] ?? 0) * 3 - ri)));
                const on = ri === 0 && (hl[ci] ?? 0) > 0;
                return (
                  <div key={ri} style={{height: 88, borderRadius: 18, border: n ? 'none' : `3px dashed ${C.slateSoft}`, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px',
                    background: on ? `${C.hi}55` : n ? `${col.c}12` : 'transparent', fontSize: 34, fontWeight: 700, color: C.navy, boxShadow: on ? `0 0 0 4px ${C.hi}` : undefined}}>
                    {n > 0 && <div style={{width: 48, height: 48, borderRadius: 14, background: col.c, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><r.I size={26} /></div>}
                    {r.t.slice(0, n)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
    <div style={{display: 'flex', gap: 32, marginTop: 26}}>
      {VERDICTS.map((x, i) => {
        const p = pop(f, cards[i] ?? 1e9, 14);
        return (
          <div key={i} style={{flex: 1, borderRadius: 22, background: C.white, borderLeft: `10px solid ${x.c}`, padding: '20px 24px', fontSize: 25, fontWeight: 700, color: C.navy,
            boxShadow: shadow, opacity: p, transform: `translateY(${(1 - p) * 40}px)`}}>{x.t}</div>
        );
      })}
    </div>
  </AbsoluteFill>
);

// ------------------------------------------------------------------ small motion-graphic cards
const Card: React.FC<{f: number; at: number; style: React.CSSProperties; children: React.ReactNode; dark?: boolean}> = ({f, at, style, children, dark}) => {
  const p = pop(f, at, 15);
  return (
    <div style={{position: 'absolute', borderRadius: 28, padding: '28px 32px', boxShadow: shadow, fontFamily: INTER, background: dark ? 'rgba(15,23,42,0.96)' : C.white, color: dark ? C.white : C.navy,
      opacity: p, transform: `scale(${0.85 + 0.15 * p})`, ...style}}>
      {children}
    </div>
  );
};

export const S2: React.FC<{starts: Record<string, number>}> = ({starts}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const T = (k: string, phrase?: string, nth = 0) => starts[k] + (phrase ? vcue(k, phrase, nth) : 0);
  const E = (k: string) => starts[k] + vdur(k);
  const F = (s: number) => Math.round(s * FPS);

  const browserIn = starts.S2_02 - 0.1;
  const tableBack = starts.S2_13 - 0.1;
  const typeStart = T('S2_02', "I'll ask it") + 0.2;
  const CPS = 17;
  const typed = Math.max(0, (t - typeStart) * CPS);
  const sendAt = Math.max(typeStart + CLAUDE_Q.length / CPS + 0.4, E('S2_02') - 0.1);
  const streamAt = sendAt + 1.0;
  const toOld = starts.S2_05 + 0.1;
  const ifOpen = T('S2_06', 'checks one rule') - 0.1;
  const ifClose = T('S2_06', 'If yes') - 0.25;
  const toStocky = starts.S2_08 + 0.1;
  const agentOpen = T('S2_08', 'brain') + 0.3;
  const agentClose = starts.S2_11 + 0.1;
  const split = starts.S2_12;

  const active = t < toOld ? 'claude' : t < toStocky ? 'n8nOld' : 'n8n';
  const IF = NO.IF;
  const falseOut: Rect | null = IF ? {x: IF.x + IF.w - 4, y: IF.y + IF.h * 0.62, w: 96, h: 32} : null;
  const keys: CK[] = [
    {t: browserIn, x: 1400, y: 800},
    {t: typeStart - 0.3, ...CLAUDE_INPUT, click: true},
    {t: sendAt, ...CLAUDE_SEND, click: true},
    {t: sendAt + 1.2, x: 1560, y: 860},
    {t: toOld - 0.1, ...tabPoint(TABS, 'n8nOld'), click: true},
    {t: T('S2_06', 'every morning'), ...mid(NO['Every Morning 7 AM'], 0, 20)},
    {t: T('S2_06', 'read the stock'), ...mid(NO['Get Stock Levels (Odoo)'], 0, 20)},
    {t: ifOpen - 0.25, ...mid(IF, 0, 10)},
    {t: ifOpen, ...mid(IF, 0, 10), click: true},
    {t: ifOpen + 0.08, ...mid(IF, 0, 10), click: true},
    {t: ifClose + 0.6, x: 1500, y: 780},
    {t: toStocky - 0.1, ...tabPoint(TABS, 'n8n'), click: true},
    {t: agentOpen - 0.2, ...mid(NS['Stocky (AI Agent)'], 0, 0)},
    {t: agentOpen, ...mid(NS['Stocky (AI Agent)'], 0, 0), click: true},
    {t: agentOpen + 0.08, ...mid(NS['Stocky (AI Agent)'], 0, 0), click: true},
    {t: agentOpen + 1.0, x: 1700, y: 900},
  ];

  const showTable = t < browserIn + 0.4 || t > tableBack - 0.4;
  const tableO = Math.max(vis(t, -1, browserIn), vis(t, tableBack, 999));
  const browserO = vis(t, browserIn, tableBack);
  const splitO = vis(t, split, tableBack, 0.35);
  const internO = vis(t, starts.S2_09, starts.S2_10 - 0.1, 0.35);
  // 8:03 'what if' — n8n window steps aside into a smaller frame; the cards get their own column
  const wiA = T('S2_07', 'If the pallet') - 0.5, wiB = E('S2_07') + 0.2;
  const wi = Math.min(prog(f, F(wiA), F(wiA + 0.6)), 1 - prog(f, F(wiB), F(wiB + 0.6)));

  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      {showTable && (
        <div style={{position: 'absolute', inset: 0, opacity: tableO}}>
          <CompareTable f={f} heads={[F(T('S2_01', 'chatbot')), F(T('S2_01', 'automation')), F(T('S2_01', 'and agent'))]}
            fill={t > tableBack ? [prog(f, F(tableBack), F(tableBack + 1.4)), prog(f, F(tableBack + 1.4), F(tableBack + 2.8)), prog(f, F(tableBack + 2.8), F(tableBack + 4.2))] : []}
            hl={t > tableBack ? [t > T('S2_13', 'A chatbot') ? 1 : 0, t > T('S2_13', 'An automation') ? 1 : 0, t > T('S2_13', 'An agent') ? 1 : 0] : []}
            cards={[F(T('S2_14', 'not always')), F(T('S2_14', 'If a task')), F(T('S2_14', 'Use an agent'))]} />
        </div>
      )}
      {browserO > 0.01 && (
        <div style={{position: 'absolute', inset: 0, opacity: browserO}}>
          <div style={{position: 'absolute', inset: 0, transformOrigin: '0 0', transform: `translate(${-16 * wi}px, ${224 * wi}px) scale(${1 - 0.42 * wi})`}}>
          <BrowserFrame tabs={TABS} active={active}>
            {t < toOld + 0.3 && (
              <div style={{position: 'absolute', inset: 0, opacity: vis(t, -1, toOld)}}>
                <ClaudeChat typed={typed} caret={t < sendAt && t > typeStart - 0.4 && Math.floor(t * 2) % 2 === 0} sent={t > sendAt + 0.15} thinking={t > sendAt + 0.15}
                  words={Math.max(0, (t - streamAt) * 9)} mark={prog(f, F(T('S2_03', 'it says')), F(T('S2_03', 'it says')) + 8) * (1 - prog(f, F(T('S2_04', 'It talks') + 1.5), F(T('S2_04', 'It talks') + 1.5) + 8))} />
              </div>
            )}
            {t >= toOld - 0.3 && t < toStocky + 0.3 && (
              <>
                <div style={{position: 'absolute', inset: 0, opacity: vis(t, toOld, toStocky)}}><Shot name="n8n_old" /></div>
                <div style={{position: 'absolute', inset: 0, opacity: vis(t, ifOpen + 0.15, ifClose, 0.2)}}><Shot name="n8n_old_if" /></div>
              </>
            )}
            {t >= toStocky - 0.3 && (
              <>
                <div style={{position: 'absolute', inset: 0, opacity: vis(t, toStocky, 999)}}><Shot name="n8n_stocky" /></div>
                <div style={{position: 'absolute', inset: 0, opacity: vis(t, agentOpen + 0.15, agentClose, 0.2)}}><Shot name="n8n_agent_panel" /></div>
              </>
            )}
          </BrowserFrame>
          <Overlay>
            <Box r={NO['Every Morning 7 AM']} a={T('S2_06', 'every morning')} b={T('S2_06', 'read the stock') - 0.1} />
            <Box r={NO['Get Stock Levels (Odoo)']} a={T('S2_06', 'read the stock')} b={T('S2_06', 'Then this box') - 0.1} />
            <Box r={IF} a={T('S2_06', 'Then this box')} b={ifOpen} />
            <Box r={NI.condition} a={T('S2_06', 'Is the quantity') - 0.2} b={ifClose - 0.1} pad={6} />
            <Box r={NO['Send Low Stock Email (Gmail)']} a={T('S2_06', 'If yes') + 0.1} b={T('S2_06', 'If no') - 0.1} />
            <Box r={falseOut} a={T('S2_06', 'If no')} b={E('S2_06') + 0.3} pad={4} radius={10} />
            <Box r={NA.sysmsg} a={T('S2_10', 'Here are')} b={E('S2_10') + 0.2} pad={10} />
            <Box r={NS['Get Products (Odoo)']} a={T('S2_11', 'look things up')} b={E('S2_11') + 0.3} />
            <Box r={NS['Weather (Open-Meteo)']} a={T('S2_11', 'check the weather')} b={E('S2_11') + 0.3} />
            <Box r={NS['Exchange Rates (Frankfurter)']} a={T('S2_11', 'exchange rates')} b={E('S2_11') + 0.3} />
            <Box r={NS['Holidays (Nager.Date)']} a={T('S2_11', 'and holidays')} b={E('S2_11') + 0.3} />
            <Box r={NS['Log Decision (Google Sheets)']} a={T('S2_11', 'write to the log')} b={E('S2_11') + 0.3} />
            <Cursor keys={keys} />
          </Overlay>
          </div>
          <Magnify name="n8n_old_if" r={NI.conditions} a={T('S2_06', 'Is the quantity')} b={ifClose - 0.1} left={300} top={560} width={1180} pad={10} />
          <SysMsgCard f={f} a={T('S2_10', 'Here are') + 0.6} b={E('S2_10') + 0.2} cues={[T('S2_10', 'You are Stocky'), T('S2_10', 'Check every'), T('S2_10', 'For suppliers'), T('S2_10', 'Never send'), T('S2_10', 'Explain your'), E('S2_10')]} />
          {t > T('S2_04', 'brilliant') - 0.2 && t < E('S2_04') + 0.6 && <BrainRoom f={f - F(T('S2_04', 'brilliant') - 0.2)} out={prog(f, F(E('S2_04')), F(E('S2_04') + 0.5))}
            cantAt={[F(T('S2_04', "It can't open") - T('S2_04', 'brilliant')), F(T('S2_04', "It can't send") - T('S2_04', 'brilliant')), F(T('S2_04', 'It talks') - T('S2_04', 'brilliant'))]} />}
          {t > T('S2_05', 'recipe card') - 0.3 && t < E('S2_06') && (
            <Recipe f={f} at={F(T('S2_05', 'recipe card') - 0.3)} steps={[F(T('S2_05', 'Step one')), F(T('S2_05', 'step two')), F(T('S2_05', 'step three'))]} out={prog(f, F(E('S2_06') - 0.5), F(E('S2_06')))} />
          )}
          {t > T('S2_07', 'If the pallet') - 0.3 && t < E('S2_07') + 0.5 && (
            <WhatIf f={f} at={F(T('S2_07', 'If the pallet') - 0.3)} falseAt={F(T('S2_07', 'stays quiet'))} chips={[F(T('S2_07', 'Shenzhen')), F(T('S2_07', 'raining')), F(T('S2_07', 'holiday'))]}
              blind={F(T('S2_07', "It can't think"))} IF={IF} out={prog(f, F(E('S2_07')), F(E('S2_07') + 0.5))} />
          )}
        </div>
      )}
      {internO > 0.01 && <div style={{position: 'absolute', inset: 0, opacity: internO}}><Intern f={f} s={starts.S2_09} T={T} /></div>}
      {splitO > 0.01 && <div style={{position: 'absolute', inset: 0, opacity: splitO}}><Split f={f} T={T} /></div>}
      {t > T('S2_04', 'It talks') - 2 && t < T('S2_04', 'It talks') + 3.2 && (
        <LowerThird f={f - F(T('S2_04', 'It talks') - 2)}>Chatbot = a brain that talks. No access to your systems. Can't act.</LowerThird>
      )}
      {t > T('S2_07', 'It only knows') - 1.8 && t < T('S2_07', 'It only knows') + 3.5 && (
        <LowerThird f={f - F(T('S2_07', 'It only knows') - 1.8)}>Automation = a recipe card. Same steps, every time. Fast and reliable, but no judgement.</LowerThird>
      )}
    </AbsoluteFill>
  );
};

const BrainRoom: React.FC<{f: number; out: number; cantAt: number[]}> = ({f, out, cantAt}) => (
  <div style={{opacity: 1 - out}}>
    <Card f={f} at={0} style={{left: 1475, top: 330, width: 330, padding: '24px 26px'}}>
      <div style={{position: 'relative', height: 230, borderRadius: 18, border: `6px solid ${C.navy}`, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Brain size={110} color={C.blue} style={{filter: `drop-shadow(0 0 ${18 + 8 * Math.sin(f / 8)}px ${C.blue}88)`}} />
        <DoorClosed size={0} />
      </div>
      <div style={{fontSize: 26, fontWeight: 800, marginTop: 16}}>A brain in a room with no doors</div>
      {['Can’t open Odoo', 'Can’t send an email', 'It only talks'].map((x, i) => {
        const p = pop(f, cantAt[i], 13);
        return (
          <div key={x} style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 23, fontWeight: 700, color: i === 2 ? C.slate : C.red, opacity: p}}>
            {i < 2 ? <X size={24} strokeWidth={3} /> : <MessageSquare size={22} />} {x}
          </div>
        );
      })}
    </Card>
  </div>
);

const Recipe: React.FC<{f: number; at: number; steps: number[]; out: number}> = ({f, at, steps, out}) => (
  <div style={{opacity: 1 - out}}>
    <Card f={f} at={at} style={{right: 160, top: 170, width: 360, background: '#FFFBEB', border: `2px solid ${C.amber}55`}}>
      <div style={{fontSize: 24, fontWeight: 800, color: '#92400E', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10}}><ClipboardList size={26} /> Recipe card</div>
      {['Read stock', 'Check one rule', 'Send email'].map((s, i) => {
        const p = pop(f, steps[i], 13);
        return (
          <div key={s} style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 10, fontSize: 26, fontWeight: 700, opacity: 0.35 + 0.65 * p}}>
            <div style={{width: 40, height: 40, borderRadius: 20, background: C.amber, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800}}>{i + 1}</div>{s}
          </div>
        );
      })}
    </Card>
  </div>
);

const WhatIf: React.FC<{f: number; at: number; falseAt: number; chips: number[]; blind: number; IF: Rect; out: number}> = ({f, at, falseAt, chips, blind, out}) => {
  const st = pop(f, falseAt, 10);
  return (
    <div style={{opacity: 1 - out}}>
      <Card f={f} at={at} style={{left: 1080, top: 200, width: 790, padding: '26px 32px'}}>
        <div style={{fontSize: 22, fontWeight: 800, color: C.amber, letterSpacing: 2, textTransform: 'uppercase'}}>What if…</div>
        <div style={{fontSize: 30, fontWeight: 800, marginTop: 6}}>BL-1005 Pallet Jack Wheels</div>
        <div style={{display: 'flex', gap: 30, marginTop: 14, fontSize: 28}}>
          <div>On hand <b>26</b></div><div>Reorder point <b>25</b></div>
        </div>
        <div style={{marginTop: 16, display: 'flex', alignItems: 'center', gap: 16, opacity: st, transform: `scale(${1.4 - 0.4 * st}) rotate(-4deg)`, transformOrigin: 'left center'}}>
          <div style={{border: `5px solid ${C.red}`, color: C.red, fontWeight: 900, fontSize: 34, padding: '4px 18px', borderRadius: 10, letterSpacing: 2}}>FALSE</div>
          <div style={{fontSize: 26, fontWeight: 700, color: C.red}}>No email. Stays quiet.</div>
        </div>
      </Card>
      {[{t: 'Supplier in Shenzhen', I: MapPin}, {t: 'Heavy rain', I: CloudRain}, {t: 'Holiday coming', I: CalendarDays}].map((c, i) => {
        const p = pop(f, chips[i], 13);
        const b = prog(f, blind, blind + 10);
        return (
          <div key={c.t} style={{position: 'absolute', left: 1080, top: 560 + i * 96, width: 790, boxSizing: 'border-box', padding: '16px 24px', borderRadius: 20, background: C.amberSoft, border: `3px solid ${C.amber}`,
            fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 14, fontSize: 25, fontWeight: 800, color: '#92400E', opacity: p * (1 - 0.35 * b), transform: `translateX(${(1 - p) * 40}px)`}}>
            <c.I size={30} /> {c.t}
            <span style={{marginLeft: 'auto', fontSize: 19, fontWeight: 700, color: C.slate, background: C.white, padding: '6px 12px', borderRadius: 999, opacity: b}}>IF can't see this</span>
          </div>
        );
      })}
    </div>
  );
};

const Intern: React.FC<{f: number; s: number; T: (k: string, p?: string, n?: number) => number}> = ({f, s, T}) => {
  const F = (x: number) => Math.round(x * FPS);
  const items = [
    {t: 'reads', I: Eye, at: T('S2_09', 'read')}, {t: 'thinks', I: Lightbulb, at: T('S2_09', 'think', 1)},
    {t: 'uses tools', I: Wrench, at: T('S2_09', 'use the tools')}, {t: 'takes action', I: MousePointerClick, at: T('S2_09', 'take action')},
  ];
  const sup = F(T('S2_09', 'clear instructions'));
  return (
    <AbsoluteFill style={{fontFamily: INTER, background: 'rgba(15,23,42,0.82)', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 80, opacity: pop(f, F(s), 18)}}>
        <div style={{position: 'relative', background: C.white, borderRadius: 40, padding: 40, boxShadow: shadow, textAlign: 'center'}}>
          <InternFace size={300} />
          <div style={{marginTop: 18, display: 'inline-block', padding: '12px 26px', borderRadius: 14, background: C.navy, color: C.white, fontSize: 30, fontWeight: 800}}>Stocky · Intern</div>
          <div style={{fontSize: 30, fontWeight: 800, color: C.navy, marginTop: 18}}>An AI agent = a smart new intern</div>
        </div>
        <div>
          {items.map((it) => {
            const p = pop(f, F(it.at), 13);
            return (
              <div key={it.t} style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 22, opacity: p, transform: `translateX(${(1 - p) * 40}px)`}}>
                <div style={{width: 84, height: 84, borderRadius: 24, background: C.blue, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><it.I size={44} /></div>
                <div style={{fontSize: 44, fontWeight: 800, color: C.white}}>{it.t}</div>
              </div>
            );
          })}
          <div style={{marginTop: 20, padding: '20px 26px', borderRadius: 22, background: C.amberSoft, color: '#92400E', fontSize: 30, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14,
            opacity: pop(f, sup, 13)}}>
            <ClipboardList size={36} /> Needs clear instructions + supervision
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Split: React.FC<{f: number; T: (k: string, p?: string) => number}> = ({f, T}) => {
  const F = (x: number) => Math.round(x * FPS);
  const auto = F(T('S2_12', 'The automation'));
  const agent = F(T('S2_12', 'The agent'));
  const chain = F(T('S2_12', "That's why"));
  const nobody = F(T('S2_12', 'Nobody wrote'));
  const steps = [{t: 'Odoo', I: Database}, {t: 'Weather', I: CloudRain}, {t: 'Holidays', I: CalendarDays}];
  return (
    <AbsoluteFill style={{fontFamily: INTER, background: 'rgba(15,23,42,0.86)', padding: '110px 120px', boxSizing: 'border-box', flexDirection: 'row', gap: 50}}>
      <div style={{flex: 1, background: C.white, borderRadius: 34, padding: 44, boxShadow: shadow, opacity: pop(f, auto, 15)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, fontSize: 40, fontWeight: 800, color: C.blue}}><Workflow size={46} /> Automation</div>
        <div style={{fontSize: 30, fontWeight: 600, color: C.slate, marginTop: 8}}>A fixed recipe</div>
        {['Read stock', 'Check one rule', 'Send email'].map((s, i) => (
          <div key={s} style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 30, fontSize: 34, fontWeight: 700, color: C.navy}}>
            <div style={{width: 56, height: 56, borderRadius: 28, background: C.blue, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800}}>{i + 1}</div>{s}
          </div>
        ))}
        <div style={{marginTop: 34, fontSize: 28, fontWeight: 700, color: C.slate}}>Same order. Every time.</div>
      </div>
      <div style={{flex: 1.25, background: C.white, borderRadius: 34, padding: 44, boxShadow: shadow, opacity: pop(f, agent, 15)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, fontSize: 40, fontWeight: 800, color: C.green}}><Bot size={46} /> AI Agent</div>
        <div style={{fontSize: 30, fontWeight: 600, color: C.slate, marginTop: 8}}>Goal + tools + rules → decides the order</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 44, flexWrap: 'wrap'}}>
          {steps.map((s, i) => {
            const p = pop(f, chain + i * 12, 13);
            return (
              <React.Fragment key={s.t}>
                <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '16px 22px', borderRadius: 18, background: C.greenSoft, color: C.green, fontSize: 30, fontWeight: 800, opacity: p, transform: `scale(${0.7 + 0.3 * p})`}}>
                  <s.I size={30} /> {s.t}
                </div>
                <div style={{fontSize: 36, color: C.slate, opacity: p}}>→</div>
              </React.Fragment>
            );
          })}
        </div>
        <div style={{marginTop: 22, padding: '20px 24px', borderRadius: 20, background: C.amberSoft, border: `3px solid ${C.amber}`, color: '#92400E', fontSize: 32, fontWeight: 800,
          opacity: pop(f, chain + 40, 13), display: 'flex', alignItems: 'center', gap: 14}}>
          <StockyBot size={54} f={f} /> Risk on BL-1005: order today
        </div>
        <div style={{marginTop: 30, display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, fontWeight: 700, color: C.navy, opacity: pop(f, nobody, 13)}}>
          <div style={{textDecoration: 'line-through', color: C.slate}}>if Shenzhen + rain + holiday → warn</div>
          <Check size={30} color={C.green} strokeWidth={3} /> It worked that out
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** 8:39 — the real System Message, re-set large and readable; each sentence lights up as it is read. */
const SysMsgCard: React.FC<{f: number; a: number; b: number; cues: number[]}> = ({f, a, b, cues}) => {
  const t = f / FPS;
  if (t < a - 0.05 || t > b + 0.4) return null;
  const p = pop(f, Math.round(a * FPS), 15);
  const out = 1 - prog(f, Math.round(b * FPS), Math.round((b + 0.3) * FPS));
  const on = (i: number) => (t >= cues[i] - 0.1 && t < cues[i + 1] - 0.05 ? 1 : 0);
  // sentence groups: [You are Stocky, + assistant], [Check...], [For suppliers...], [Never send...], [Explain...]
  const parts = [[SYSTEM_PARTS[0] + ' ' + SYSTEM_PARTS[1], 0], [SYSTEM_PARTS[2], 1], [SYSTEM_PARTS[3], 2], [SYSTEM_PARTS[4], 3], [SYSTEM_PARTS[5], 4]] as [string, number][];
  return (
    <div style={{position: 'absolute', left: 990, top: 130, width: 850, borderRadius: 18, overflow: 'hidden', background: C.white, fontFamily: INTER,
      boxShadow: `0 0 0 6px ${C.hi}, 0 24px 60px rgba(2,6,23,0.45)`, opacity: Math.min(p, out), transform: `scale(${0.92 + 0.08 * p})`}}>
      <div style={{background: '#2D2E2E', color: C.white, padding: '14px 22px', fontSize: 22, fontWeight: 700}}>AI Agent · System Message</div>
      <div style={{padding: '22px 26px', fontSize: 30, lineHeight: 1.55, fontFamily: 'ui-monospace, Menlo, monospace', color: '#333'}}>
        {parts.map(([txt, i]) => <span key={i}><Mark on={on(i)} color={i === 3 ? C.red : C.hi}>{txt}</Mark> </span>)}
      </div>
    </div>
  );
};
