import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Timer} from 'lucide-react';
import {C, FPS, INTER, shadow} from '../theme';
import {pop, prog} from '../lib/anim';
import {vcue, vdur} from '../lib/cues';
import {Bg} from '../components/Bg';
import {LowerThird} from '../components/Gfx';
import {StockyBot} from '../components/Art';
import {BrowserFrame, Box, CK, Cursor, mid, Overlay, Rect, Shot, tabPoint, vis} from './kit';
import {EMAIL_POS, GmailEmail, GmailInbox, INBOX_ROW, Sheet} from './sims';
import n8nStocky from '../../public/cap/n8n_stocky.json';
import odooEmpty from '../../public/cap/odoo_rfq_empty.json';
import odooMenu from '../../public/cap/odoo_orders_menu.json';
import odooList from '../../public/cap/odoo_rfq_list.json';

const R = (o: unknown) => o as Record<string, Rect>;
const NS = R(n8nStocky), OE = R(odooEmpty), OM = R(odooMenu), OL = R(odooList);
const TABS = ['gmail', 'n8n', 'sheets', 'odoo'];

export const S1: React.FC<{starts: Record<string, number>}> = ({starts}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const T = (k: string, phrase?: string, nth = 0) => starts[k] + (phrase ? vcue(k, phrase, nth) : 0);
  const E = (k: string) => starts[k] + vdur(k);
  const win = (a: number, b: number) => Math.min(prog(f, a * FPS, a * FPS + 8), 1 - prog(f, b * FPS, b * FPS + 8));

  // ---- view switches
  const open = T('S1_01', 'open it') + 0.45;
  const toN8n = starts.S1_06 + 0.2;
  const toSheets = starts.S1_08 + 0.1;
  const toGmail2 = starts.S1_09 + 0.05;
  const approveAt = T('S1_09', 'clicks Approve') + 0.2;
  const toOdoo = T('S1_09', 'over in Odoo') - 0.1;
  const menuAt = T('S1_09', 'under Purchase');
  const rfqClick = T('S1_09', 'Requests for') + 0.5;
  const listAt = T('S1_09', 'there they are') - 0.2;

  const active = t < toN8n ? 'gmail' : t < toSheets ? 'n8n' : t < toGmail2 ? 'sheets' : t < toOdoo ? 'gmail' : 'odoo';

  // ---- email marks
  const m: Record<string, number> = {
    q_checked: win(T('S1_03', 'checked all') - 0.1, T('S1_03', 'It found') - 0.1),
    q_four: win(T('S1_03', 'found four') - 0.1, T('S1_03', 'For each one') - 0.1),
    q_onhand: win(T('S1_03', 'how many'), T('S1_03', 'what the reorder')),
    q_rp: win(T('S1_03', 'what the reorder'), T('S1_03', 'who the supplier')),
    q_sup: win(T('S1_03', 'who the supplier'), T('S1_03', 'how much to')),
    q_qty: win(T('S1_03', 'how much to'), T('S1_03', 'roughly')),
    q_cost: win(T('S1_03', 'roughly'), E('S1_03') + 0.3),
    q_wheels: win(starts.S1_04, T('S1_04', 'noticed') - 0.2),
    shenzhen: win(T('S1_04', 'supplier is in'), T('S1_04', 'checked the weather')),
    storms: win(T('S1_04', 'heavy storms'), T('S1_04', 'checked the calendar')),
    thanks: win(T('S1_04', 'Thanksgiving'), T('S1_04', 'and it knows')),
    lead: win(T('S1_04', 'lead time'), T('S1_04', 'So it says')),
    today: win(T('S1_04', 'order this one'), E('S1_04') + 0.3) * (0.75 + 0.25 * Math.sin(t * 6)),
    approve: Math.max(win(T('S1_05', 'Approve') - 0.2, T('S1_05', 'Stocky has')), win(T('S1_05', 'until Sarah'), E('S1_05'))),
    decline: Math.max(win(T('S1_05', 'Decline') - 0.2, T('S1_05', 'Stocky has')), win(T('S1_05', 'until Sarah'), E('S1_05'))),
    total: win(T('S1_05', 'prepared'), T('S1_05', 'but it will')),
  };


  // ---- cursor path (page px)
  const node = (n: string, dy = 0) => mid(NS[n], 0, dy);
  const keys: CK[] = [
    {t: 0, x: 1500, y: 700},
    {t: T('S1_01', "It's from"), x: INBOX_ROW.x, y: INBOX_ROW.y - 12},
    {t: open - 0.35, x: INBOX_ROW.x, y: INBOX_ROW.y, click: true},
    {t: open + 1.0, x: 1560, y: 880},
    {t: T('S1_05', 'Approve') + 0.4, x: EMAIL_POS.approve.x + 120, y: EMAIL_POS.approve.y + 90},
    {t: toN8n - 0.15, ...tabPoint(TABS, 'n8n'), click: true},
    {t: T('S1_07', 'a timer') + 0.1, ...node('Every Monday 6:55 AM', 10)},
    {t: T('S1_07', 'pulls stock'), ...node('Get Products (Odoo)', 10)},
    {t: T('S1_07', 'big box'), ...node('Stocky (AI Agent)', 10)},
    {t: T('S1_07', 'These three') + 0.2, ...node('Weather (Open-Meteo)', 10)},
    {t: T('S1_07', 'exchange'), ...node('Exchange Rates (Frankfurter)', 10)},
    {t: T('S1_07', 'public holidays'), ...node('Holidays (Nager.Date)', 10)},
    {t: T('S1_07', 'writes every'), ...node('Log Decision (Google Sheets)', 10)},
    {t: T('S1_07', 'emails Sarah'), ...node('Ask Sarah (Gmail)', 10)},
    {t: T('S1_07', 'waits for'), ...node('Create RFQs (Odoo)', 10)},
    {t: toSheets - 0.15, ...tabPoint(TABS, 'sheets'), click: true},
    {t: T('S1_08', 'why did we'), x: 1250, y: 480},
    {t: toGmail2 - 0.1, ...tabPoint(TABS, 'gmail'), click: true},
    {t: approveAt - 0.05, ...EMAIL_POS.approve, click: true},
    {t: approveAt + 0.9, x: 640, y: 900},
    {t: toOdoo - 0.1, ...tabPoint(TABS, 'odoo'), click: true},
    {t: menuAt - 0.05, ...mid(OE.orders), click: true},
    {t: rfqClick, ...mid(OM.rfqItem), click: true},
    {t: listAt + 1.2, x: 1500, y: 760},
  ];

  const allMain = ['Every Monday 6:55 AM', 'Get Products (Odoo)', 'Stocky (AI Agent)', 'Log Decision (Google Sheets)', 'Ask Sarah (Gmail)', 'Create RFQs (Odoo)'];
  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      <ClockBadge f={f} at={0.2} until={open + 4} />
      <BrowserFrame tabs={TABS} active={active}>
        {t < open + 0.3 && <div style={{position: 'absolute', inset: 0, opacity: vis(t, -1, open)}}><GmailInbox rowOn={win(T('S1_01', 'already an email'), open - 0.3)} hover={t > open - 1} /></div>}
        {t >= open - 0.3 && t < toN8n + 0.3 && <div style={{position: 'absolute', inset: 0, opacity: vis(t, open, toN8n)}}><GmailEmail marks={m} /></div>}
        {t >= toN8n - 0.3 && t < toSheets + 0.3 && <div style={{position: 'absolute', inset: 0, opacity: vis(t, toN8n, toSheets)}}><Shot name="n8n_stocky" /></div>}
        {t >= toSheets - 0.3 && t < toGmail2 + 0.3 && (
          <div style={{position: 'absolute', inset: 0, opacity: vis(t, toSheets, toGmail2)}}>
            <Sheet marks={{
              col_0: win(T('S1_08', 'Every Monday'), T('S1_08', 'every product')),
              col_1: win(T('S1_08', 'every product'), T('S1_08', 'what it suggested')),
              col_4: win(T('S1_08', 'what it suggested'), T('S1_08', 'who approved')),
              col_6: win(T('S1_08', 'who approved'), T('S1_08', 'When Mr')),
              r1: win(T('S1_08', 'why did we'), E('S1_08') + 0.3), r5: win(T('S1_08', 'why did we'), E('S1_08') + 0.3),
              c5_5: win(T('S1_08', 'written down') - 0.3, E('S1_08') + 0.3),
            }} />
          </div>
        )}
        {t >= toGmail2 - 0.3 && t < toOdoo + 0.3 && <div style={{position: 'absolute', inset: 0, opacity: vis(t, toGmail2, toOdoo)}}><GmailEmail approved={t > approveAt + 0.15 ? 1 : 0} pressed={t > approveAt - 0.1 && t < approveAt + 0.15} /></div>}
        {t >= toOdoo - 0.3 && t < listAt + 0.3 && <div style={{position: 'absolute', inset: 0, opacity: vis(t, toOdoo, menuAt + 0.05, 0.05)}}><Shot name="odoo_rfq_empty" /></div>}
        {t >= menuAt - 0.1 && t < listAt + 0.3 && <div style={{position: 'absolute', inset: 0, opacity: vis(t, menuAt + 0.05, listAt, 0.05)}}><Shot name="odoo_orders_menu" /></div>}
        {t >= listAt - 0.3 && <div style={{position: 'absolute', inset: 0, opacity: vis(t, listAt, 999)}}><Shot name="odoo_rfq_list" /></div>}
      </BrowserFrame>
      <Overlay>
        {allMain.map((n) => <Box key={n} r={NS[n]} a={T('S1_06', 'every box')} b={T('S1_06', 'no code') - 0.3} />)}
        <Box r={NS['Every Monday 6:55 AM']} a={T('S1_07', 'a timer')} b={T('S1_07', 'Then a box') - 0.2} />
        <Box r={NS['Get Products (Odoo)']} a={T('S1_07', 'pulls stock') - 0.3} b={T('S1_07', 'big box') - 0.3} />
        <Box r={NS['Stocky (AI Agent)']} a={T('S1_07', 'big box') - 0.2} b={T('S1_07', 'These three') - 0.2} />
        {['Weather (Open-Meteo)', 'Exchange Rates (Frankfurter)', 'Holidays (Nager.Date)'].map((n, i) => (
          <Box key={n} r={NS[n]} a={T('S1_07', 'These three') + i * 0.25} b={T('S1_07', 'This one writes') - 0.2} />
        ))}
        <Box r={NS['Log Decision (Google Sheets)']} a={T('S1_07', 'writes every') - 0.3} b={T('S1_07', 'And the last') - 0.2} />
        <Box r={NS['Ask Sarah (Gmail)']} a={T('S1_07', 'emails Sarah') - 0.4} b={E('S1_07') + 0.3} />
        <Box r={NS['Create RFQs (Odoo)']} a={T('S1_07', 'waits for')} b={E('S1_07') + 0.3} />
        {[0, 1, 2, 3].map((i) => <Box key={i} r={OL[`r${i}`]} a={T('S1_09', 'Four draft') + i * 0.3} b={T('S1_09', 'one for each') - 0.2} pad={2} radius={6} />)}
        <Box r={OL.vendorCol} a={T('S1_09', 'one for each')} b={T('S1_09', 'already filled') - 0.1} pad={4} radius={8} />
        <Box r={OL.totalCol} a={T('S1_09', 'already filled')} b={E('S1_09') + 0.4} pad={4} radius={8} />
        <Cursor keys={keys} />
      </Overlay>
      {t > starts.S1_02 && t < starts.S1_02 + 6 && (
        <LowerThird f={f - Math.round((starts.S1_02 + 0.2) * FPS)}>Stocky checked 10 products, found 4 problems, and drafted 4 orders. Before 7:00 AM.</LowerThird>
      )}
      <Outro f={f} starts={starts} T={T} />
    </AbsoluteFill>
  );
};

const ClockBadge: React.FC<{f: number; at: number; until: number}> = ({f, at, until}) => {
  const p = pop(f, at * FPS, 14);
  const o = 1 - prog(f, until * FPS, until * FPS + 10);
  return (
    <div style={{position: 'absolute', right: 40, top: 150, padding: '16px 24px', borderRadius: 18, background: C.navy, color: C.white, fontSize: 28, fontWeight: 800,
      boxShadow: shadow, opacity: p * o, transform: `scale(${0.7 + 0.3 * p})`, display: 'flex', alignItems: 'center', gap: 12, zIndex: 5}}>
      ☕ Monday 7:00 AM
    </div>
  );
};

const Outro: React.FC<{f: number; starts: Record<string, number>; T: (k: string, p?: string) => number}> = ({f, T}) => {
  const sw = T('S1_10', 'ninety seconds') - 0.3;
  const build = T('S1_10', 'going to build') - 0.3;
  const nine = T('S1_10', 'By video nine') - 0.2;
  const ps = pop(f, sw * FPS, 12);
  const pb = pop(f, build * FPS, 16);
  const pn = pop(f, nine * FPS, 14);
  return (
    <>
      <Sequence from={Math.round(sw * FPS)} durationInFrames={40} layout="none"><Audio src={staticFile('sfx/ding.wav')} volume={0.35} /></Sequence>
      {f >= sw * FPS - 2 && <>
      <div style={{position: 'absolute', right: 150, top: 470, padding: '20px 30px', borderRadius: 22, background: C.green, color: C.white, fontSize: 40, fontWeight: 800, boxShadow: shadow,
        opacity: ps, transform: `scale(${0.6 + 0.4 * ps}) rotate(${(1 - ps) * -8}deg)`, display: 'flex', alignItems: 'center', gap: 14}}>
        <Timer size={44} /> 90 seconds
      </div>
      {f > build * FPS - 2 && (
        <div style={{position: 'absolute', left: 260, right: 260, bottom: 70, padding: '34px 44px', borderRadius: 30, background: 'rgba(15,23,42,0.96)', color: C.white, boxShadow: shadow,
          opacity: pb, transform: `translateY(${(1 - pb) * 60}px)`, display: 'flex', alignItems: 'center', gap: 34}}>
          <StockyBot size={120} f={f} />
          <div>
            <div style={{fontSize: 54, fontWeight: 800, letterSpacing: -1}}>You will build this.</div>
            <div style={{fontSize: 34, fontWeight: 600, color: C.hi, marginTop: 6}}>One piece per video.</div>
            <div style={{fontSize: 26, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginTop: 12, opacity: pn}}>By Video 9, your Stocky sends this exact email.</div>
          </div>
        </div>
      )}
      </>}
    </>
  );
};
