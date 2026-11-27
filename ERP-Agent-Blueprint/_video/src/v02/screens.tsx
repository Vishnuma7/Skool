import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {ArrowRight, BookOpen, Calculator, Calendar, Check, Clock, Database, FastForward, FileSpreadsheet, Hash, Mail, Receipt, ShoppingCart, Truck, Users, Warehouse, X} from 'lucide-react';
import {C, FPS, INTER} from '../theme';
import {pop, prog} from '../lib/anim';
import {vcue, vdur} from './cues';
import {Chip} from '../components/Gfx';
import {Face, StockyBot} from '../components/Art';
import {ACTIVATE_RECT, ActivationMail, ExcelSim, FloatCard, LoadingSim, R, SectionView, StageBox, URL_BAR} from './engine';
import {Shot} from '../screen/kit';

type Starts = Record<string, number>;
const mk = (starts: Starts) => ({
  T: (k: string, phrase?: string, nth = 0) => starts[k] + (phrase ? vcue(k, phrase, nth) : 0),
  E: (k: string) => starts[k] + vdur(k),
});
const ODOO_URL = (p = '') => `brightleaf-supplies.odoo.com/odoo${p}`;
const card = (x: number, y: number, w: number, body: React.ReactNode, accent?: string, dark?: boolean) => (f: number) => <FloatCard f={f} x={x} y={y} w={w} accent={accent} dark={dark}>{body}</FloatCard>;
const big = (t: string, sub?: string) => (<><div style={{fontSize: 30, fontWeight: 800}}>{t}</div>{sub && <div style={{fontSize: 22, fontWeight: 600, color: C.slate, marginTop: 6}}>{sub}</div>}</>);
/** Hook-free animated body for a card (f = frames since the card appeared). */
const Live: React.FC<{render: (f: number) => React.ReactNode}> = ({render}) => <>{render(useCurrentFrame())}</>;
/** A real Odoo dropdown (captured) laid over the page the user is on, so the background stays consistent. */
const MENU_CLIP = {products: {x: 294, y: 4, w: 168, h: 76}, ops: {x: 200, y: 4, w: 192, h: 272}};
const MenuOver: React.FC<{base: string; menu: string; clip: {x: number; y: number; w: number; h: number}}> = ({base, menu, clip}) => (
  <><Shot name={base} dir="cap02" />
    <div style={{position: 'absolute', left: clip.x, top: clip.y, width: clip.w, height: clip.h, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -clip.x, top: -clip.y, width: 1920, height: 1080}}><Shot name={menu} dir="cap02" /></div>
    </div></>
);


// ================================================================ S1_02 full-frame: what an ERP really is
type ErpCues = {erp: number; bad: number; here: number; cab: number; rule: number; dept: number; enforce: number; wh: number; stock: number; inst: number; noMail: number};
const ErpExplainer: React.FC<{f: number; c: ErpCues}> = ({f, c}) => {
  const p = (at: number, d = 12) => prog(f, at, at + d);
  const ease = (x: number) => 1 - Math.pow(1 - x, 3);
  // phase 1: the acronym, centred, then it shrinks to a heading
  const up = ease(p(c.here, 18));
  const letters = [['E', 'nterprise'], ['R', 'esource'], ['P', 'lanning']];
  const depts = [
    {t: 'Warehouse', I: Warehouse, col: C.amber, x: 110, y: 330}, {t: 'Purchasing', I: ShoppingCart, col: C.odoo, x: 110, y: 580},
    {t: 'Sales', I: Users, col: C.green, x: 1480, y: 330}, {t: 'Finance', I: Calculator, col: C.blue, x: 1480, y: 580},
  ];
  const GX = 560, GY = 290, GW = 800, GH = 470;
  const flow = ease(p(c.wh + 6, 30));
  const counted = Math.round(1130 + 50 * ease(p(c.stock, 18)));
  const flash = f >= c.stock && f < c.inst + 40;
  return (
    <AbsoluteFill style={{fontFamily: INTER, color: C.white}}>
      {/* acronym → heading */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 380 - 300 * up, textAlign: 'center', transform: `scale(${1 - 0.45 * up})`, transformOrigin: '50% 0%', opacity: p(c.erp - 6)}}>
        <div style={{display: 'inline-flex', gap: 34, fontSize: 92, fontWeight: 800, position: 'relative'}}>
          {letters.map(([L, rest], i) => (
            <span key={L}><span style={{color: C.hi}}>{L}</span><span style={{opacity: p(c.erp + 14 + i * 8), color: 'rgba(255,255,255,0.92)'}}>{rest}</span></span>
          ))}
          <div style={{position: 'absolute', left: -10, right: -10, top: '54%', height: 8, borderRadius: 4, background: C.red, transformOrigin: '0 50%', transform: `scaleX(${ease(p(c.bad, 14))})`}} />
        </div>
        <div style={{marginTop: 18, fontSize: 38, fontWeight: 800, color: C.red, opacity: p(c.bad + 6) * (1 - up)}}>A terrible name. Forget it.</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 168, textAlign: 'center', fontSize: 44, fontWeight: 800, opacity: p(c.cab)}}>
        What it really is: a <span style={{color: C.hi}}>central filing cabinet</span><span style={{opacity: p(c.rule)}}> + a <span style={{color: C.hi}}>rulebook</span></span>
      </div>
      {/* the ERP: cabinet + rulebook */}
      <div style={{position: 'absolute', left: GX, top: GY, width: GW, height: GH, borderRadius: 34, border: `3px solid rgba(255,216,77,${0.25 + 0.5 * p(c.enforce)})`, background: 'rgba(255,255,255,0.04)', opacity: p(c.cab)}}>
        <div style={{position: 'absolute', left: 40, top: 40, width: 330, padding: 22, borderRadius: 24, background: '#334155', boxShadow: 'inset 0 0 0 6px #475569', transform: `scale(${0.9 + 0.1 * pop(f, c.cab)})`}}>
          <div style={{fontSize: 18, fontWeight: 800, letterSpacing: 3, color: C.hi, textTransform: 'uppercase', marginBottom: 12}}>Filing cabinet</div>
          {[['Stock', C.amber], ['Suppliers & orders', C.odoo], ['Customers & sales', C.green], ['Invoices', C.blue]].map(([t, col], i) => {
            const lit = (i === 0 && flash) || (f >= c.dept + i * 6 && f < c.dept + 40);
            return (
              <div key={t} style={{height: 66, borderRadius: 12, background: lit ? '#FFF7D6' : '#E2E8F0', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', opacity: pop(f, c.cab + 4 + i * 4)}}>
                <div style={{width: 40, height: 9, borderRadius: 5, background: '#64748B'}} />
                <div style={{fontSize: 22, fontWeight: 800, color: col, flex: 1}}>{t}</div>
                {i === 0 && f >= c.wh && <div style={{fontSize: 22, fontWeight: 800, color: flash ? C.green : C.navy}}>{counted.toLocaleString('en-US')}</div>}
              </div>
            );
          })}
        </div>
        <div style={{position: 'absolute', right: 40, top: 40, width: 330, padding: 24, borderRadius: 24, background: C.white, color: C.navy, opacity: pop(f, c.rule), transform: `translateY(${(1 - pop(f, c.rule)) * 30}px)`,
          boxShadow: f >= c.enforce ? `0 0 0 ${4 * p(c.enforce)}px ${C.hi}, 0 0 30px ${C.hi}88` : undefined}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, fontWeight: 800}}><BookOpen size={32} color={C.odoo} /> Rulebook</div>
          {['Every product has one code', 'Stock never goes below zero', 'Every order has a supplier'].map((r, i) => (
            <div key={r} style={{display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 21, fontWeight: 700, marginTop: 16, opacity: pop(f, c.rule + 6 + i * 5)}}><Check size={24} color={C.green} style={{flexShrink: 0, marginTop: 2}} />{r}</div>
          ))}
          <div style={{marginTop: 18, fontSize: 18, fontWeight: 800, color: C.odoo, opacity: p(c.enforce)}}>The system enforces these.</div>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 16, textAlign: 'center', fontSize: 20, fontWeight: 800, letterSpacing: 4, color: C.hi, textTransform: 'uppercase', opacity: p(c.dept)}}>One place · ERP</div>
      </div>
      {/* departments */}
      {depts.map((d, i) => {
        const on = pop(f, c.dept + i * 5);
        const left = d.x < 960;
        return (
          <React.Fragment key={d.t}>
            <div style={{position: 'absolute', top: d.y + 58, left: left ? d.x + 330 : GX + GW, width: left ? GX - d.x - 330 : d.x - GX - GW, height: 4, borderRadius: 2,
              background: `linear-gradient(90deg, ${d.col}, ${C.hi})`, transformOrigin: left ? '0 50%' : '100% 50%', transform: `scaleX(${ease(prog(f, c.dept + i * 5 + 4, c.dept + i * 5 + 16))})`}} />
            <div style={{position: 'absolute', left: d.x, top: d.y, width: 330, height: 120, borderRadius: 22, background: C.white, color: C.navy, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px', boxSizing: 'border-box',
              opacity: on, transform: `scale(${0.9 + 0.1 * on})`, boxShadow: i === 0 && f >= c.wh && f < c.stock + 20 ? `0 0 0 4px ${C.amber}` : undefined}}>
              <div style={{width: 64, height: 64, borderRadius: 18, background: `${d.col}22`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><d.I size={36} color={d.col} /></div>
              <div style={{flex: 1}}>
                <div style={{fontSize: 28, fontWeight: 800}}>{d.t}</div>
                <div style={{fontSize: 19, fontWeight: 700, color: flash ? C.green : C.slate, opacity: prog(f, c.stock, c.stock + 8)}}>Boxes: {counted.toLocaleString('en-US')}{flash ? ' ✓' : ''}</div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
      {/* +50 boxes travels from the warehouse into the cabinet */}
      {f >= c.wh && f < c.stock + 12 && (
        <div style={{position: 'absolute', left: 300 + (GX + 120 - 300) * flow, top: 300 + 120 * Math.sin(Math.PI * flow) * -0.3, padding: '12px 20px', borderRadius: 16, background: C.amber, color: C.navy, fontSize: 28, fontWeight: 800,
          display: 'flex', alignItems: 'center', gap: 10, opacity: pop(f, c.wh) * (1 - prog(f, c.stock, c.stock + 12))}}><Truck size={30} /> +50 boxes</div>
      )}
      <div style={{position: 'absolute', left: 0, right: 0, top: 790, textAlign: 'center', fontSize: 34, fontWeight: 800, color: C.green, opacity: p(c.inst) * (1 - p(c.noMail))}}>Everyone sees the new number, instantly.</div>
      {/* no emailing spreadsheets */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 780, display: 'flex', justifyContent: 'center', opacity: pop(f, c.noMail)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22, padding: '18px 30px', borderRadius: 22, background: 'rgba(220,38,38,0.14)', border: `2px solid ${C.red}`}}>
          <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, fontWeight: 700, color: 'rgba(255,255,255,0.85)'}}>
            <Mail size={34} /> <FileSpreadsheet size={34} color="#22C55E" /> stock_count_FINAL_v7.xlsx
            <div style={{position: 'absolute', left: -6, right: -6, top: '50%', height: 5, background: C.red, transformOrigin: '0 50%', transform: `scaleX(${ease(prog(f, c.noMail + 8, c.noMail + 20))})`}} />
          </div>
          <div style={{fontSize: 30, fontWeight: 800}}>No emailing spreadsheets around.</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ================================================================ S1 Creating your free Odoo trial
export const V2S1: React.FC<{starts: Starts}> = ({starts}) => {
  const {T, E} = mk(starts);
  const tabs = ['odoocom', 'mail2'];
  const clickStart = T('S1_03', 'Click') + 0.6;
  const tInv = T('S1_04', 'Inventory') + 0.3, tPur = T('S1_04', 'Purchase') + 0.3, tSal = T('S1_04', 'Sales') + 0.3;
  const sideA = T('S1_04', 'Tick those'), sideB = E('S1_04') + 0.4;
  const loadAt = T('S1_06', 'click Start now') + 0.7;
  const tabs2 = ['odoocom', 'odoo2', 'mail2'];
  return (
    <SectionView tabs={tabs2}
      views={[
        {at: 0, tab: 'odoocom', shot: 'com_home', url: 'www.odoo.com', title: 'Odoo: All your business on one platform'},
        {at: clickStart, tab: 'odoocom', shot: 'com_trial_1', url: 'www.odoo.com/trial', title: 'Choose your Apps | Odoo'},
        {at: T('S1_04', 'For supply') - 0.2, tab: 'odoocom', shot: 'trial_a0', url: 'www.odoo.com/trial'},
        {at: tInv + 0.1, tab: 'odoocom', shot: 'trial_a1', url: 'www.odoo.com/trial'},
        {at: tPur + 0.1, tab: 'odoocom', shot: 'trial_a2', url: 'www.odoo.com/trial'},
        {at: T('S1_04', 'And Sales') - 0.3, tab: 'odoocom', shot: 'trial_b0', url: 'www.odoo.com/trial'},
        {at: tSal + 0.1, tab: 'odoocom', shot: 'trial_b1', url: 'www.odoo.com/trial'},
        {at: T('S1_05', 'Continue') + 0.4, tab: 'odoocom', shot: 'com_form_1', url: 'www.odoo.com/trial', title: 'Get Started | Odoo'},
        {at: T('S1_06', "I'm filling") + 0.6, tab: 'odoocom', shot: 'com_form_2', url: 'www.odoo.com/trial'},
        {at: loadAt, tab: 'odoocom', el: <Live render={(f) => <LoadingSim f={f - Math.round(loadAt * FPS)} />} />, url: 'www.odoo.com/trial/creating-database'},
        {at: starts.S1_08, tab: 'odoo2', shot: 'odoo_home', url: ODOO_URL(), title: 'Odoo'},
        {at: starts.S1_10, tab: 'mail2', el: <ActivationMail />, url: 'mail.google.com/mail/u/0/#inbox', title: 'Activate your Odoo account - Gmail'},
        {at: starts.S1_11, tab: 'odoo2', shot: 'odoo_home', url: ODOO_URL()},
        {at: T('S1_12', 'Go to the Settings') + 0.4, tab: 'odoo2', shot: 'odoo_settings_currency', url: ODOO_URL('/settings'), title: 'Settings - Odoo'},
      ]}
      boxes={[
        {shot: 'com_home', key: 'start', a: T('S1_03', 'Click') - 0.6, b: clickStart},
        {shot: 'trial_a1', key: 'inventory', a: tInv - 0.5, b: T('S1_04', 'And Sales') - 0.4},
        {shot: 'trial_a2', key: 'purchase', a: tPur - 0.5, b: T('S1_04', 'And Sales') - 0.4},
        {shot: 'trial_b1', key: 'sales', a: tSal - 0.5, b: sideA - 0.1},
        {shot: 'trial_b1', key: 'sSales', a: sideA, b: sideB, pad: 4, radius: 8},
        {shot: 'trial_b1', key: 'sInventory', a: sideA + 0.25, b: sideB, pad: 4, radius: 8},
        {shot: 'trial_b1', key: 'sPurchase', a: sideA + 0.5, b: sideB, pad: 4, radius: 8},
        {shot: 'trial_b1', key: 'cont', a: starts.S1_05 - 0.2, b: T('S1_05', 'Continue') + 0.4},
        {shot: 'com_form_2', key: 'name', a: T('S1_06', "I'm filling") + 0.6, b: T('S1_06', 'For company')},
        {shot: 'com_form_2', key: 'company', a: T('S1_06', 'For company'), b: T('S1_06', 'Pick your')},
        {shot: 'com_form_2', key: 'country', a: T('S1_06', 'Pick your'), b: T('S1_06', 'click Start now')},
        {shot: 'com_form_2', key: 'start', a: T('S1_06', 'click Start now'), b: loadAt},
        {shot: 'odoo_settings_currency', key: 'search', a: T('S1_12', 'Go to the Settings') + 0.5, b: T('S1_12', 'check that')},
        {shot: 'odoo_settings_currency', key: 'field', a: T('S1_12', 'check that'), b: T('S1_12', 'click Save')},
        {shot: 'odoo_settings_currency', key: 'save', a: T('S1_12', 'click Save'), b: E('S1_12') + 0.4},
      ]}
      keys={[
        {t: 0.5, x: 1500, y: 760},
        {t: clickStart - 0.1, shot: 'com_home', key: 'start', click: true},
        {t: clickStart + 1.2, x: 1500, y: 900},
        {t: tInv, shot: 'trial_a1', key: 'inventory', click: true},
        {t: tPur, shot: 'trial_a2', key: 'purchase', click: true},
        {t: T('S1_04', 'And Sales') - 0.3, x: 1150, y: 520},
        {t: tSal, shot: 'trial_b1', key: 'sales', click: true},
        {t: sideA + 0.6, x: 1250, y: 520},
        {t: T('S1_05', 'Continue') + 0.2, shot: 'trial_b1', key: 'cont', click: true},
        {t: T('S1_05', 'Continue') + 1.4, x: 1600, y: 900},
        {t: loadAt - 0.15, shot: 'com_form_2', key: 'start', click: true},
        {t: loadAt + 1.5, x: 1600, y: 950},
        {t: T('S1_10', 'Do that now'), x: ACTIVATE_RECT.x + ACTIVATE_RECT.w / 2, y: ACTIVATE_RECT.y + ACTIVATE_RECT.h / 2},
        {t: starts.S1_11 - 0.3, x: ACTIVATE_RECT.x + ACTIVATE_RECT.w / 2, y: ACTIVATE_RECT.y + ACTIVATE_RECT.h / 2, click: true},
        {t: starts.S1_11 + 1.2, x: 1600, y: 900},
        {t: T('S1_12', 'Go to the Settings') + 0.3, shot: 'odoo_home', key: 'Settings', click: true},
        {t: T('S1_12', 'Go to the Settings') + 1.2, shot: 'odoo_settings_currency', key: 'search'},
        {t: T('S1_12', 'check that') + 0.3, shot: 'odoo_settings_currency', key: 'field'},
        {t: T('S1_12', 'click Save') + 0.4, shot: 'odoo_settings_currency', key: 'save', click: true},
        {t: E('S1_12') + 1, x: 1500, y: 800},
      ]}
      overlays={[
        {a: T('S1_01', 'runs entirely') - 0.2, b: E('S1_01') + 0.5, el: card(1300, 640, 480, big('Runs in your browser', 'Nothing to install'), C.green)},
        {a: T('S1_04', 'Think of each'), b: T('S1_04', 'Inventory') - 0.4, el: card(1280, 640, 500, big("Each app = a department's drawer"), C.blue)},
        {a: T('S1_04', 'Odoo will quietly'), b: E('S1_04') + 0.3, el: card(160, 760, 560, big('+ Contacts, added automatically', 'Sales & Purchase both need a list of companies'), C.blue)},
        {a: T('S1_08', 'look at the address'), b: E('S1_08') + 0.3, stage: true, el: (f) => <StageBox f={f} r={URL_BAR} />},
        {a: T('S1_08', 'And the first part'), b: E('S1_08') + 0.3, el: card(220, 150, 760, (
          <div style={{fontSize: 28, fontWeight: 700}}><span style={{background: `${C.hi}88`, padding: '2px 8px', borderRadius: 6}}>brightleaf-supplies</span>.odoo.com<div style={{fontSize: 22, color: C.slate, marginTop: 8}}>The first part is your database name</div></div>
        ), C.hi)},
        {a: T('S1_11', 'The free trial'), b: E('S1_11') + 0.3, el: (f) => (
          <FloatCard f={f} x={1180} y={520} w={600}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}><Calendar size={44} color={C.odoo} /><div style={{fontSize: 32, fontWeight: 800}}>Free trial: 15 days</div></div>
            <div style={{fontSize: 23, fontWeight: 600, color: C.slate, marginTop: 12, opacity: prog(f, (T('S1_11', 'You can start') - T('S1_11', 'The free trial')) * FPS, (T('S1_11', 'You can start') - T('S1_11', 'The free trial')) * FPS + 8)}}>
              Ran out? New trial + re-import from Excel ≈ 5 minutes
            </div>
            <div style={{marginTop: 14, padding: '10px 14px', borderRadius: 12, background: C.amberSoft, color: '#92400E', fontSize: 20, fontWeight: 700}}>Pro tip: bookmark your Odoo URL now</div>
          </FloatCard>
        )},
        {a: starts.S1_13, b: E('S1_13') + 0.3, el: card(1200, 700, 580, big("Can't change it?", 'Just treat the numbers as dollars'), C.amber)},
      ]}
      lowers={[{a: starts.S1_09 + 0.2, b: E('S1_09') + 0.3, text: 'Write down: (1) your Odoo URL, (2) your database name, (3) the email you log in with.'}]}
      full={[{a: starts.S1_02 + 0.2, b: E('S1_02') + 0.4, el: (f) => {
        const fr = (ph: string) => Math.round((T('S1_02', ph) - starts.S1_02 - 0.2) * FPS);
        return <ErpExplainer f={f} c={{erp: fr('ERP stands'), bad: fr('terrible name'), here: fr("Here's what"), cab: fr('central filing'), rule: fr('plus its rulebook'),
          dept: fr('Every department'), enforce: fr('the system enforces'), wh: fr('When the warehouse'), stock: fr('the stock number'), inst: fr('instantly'), noMail: fr('No emailing')}} />;
      }}]}
    />
  );
};

// ================================================================ S2 Touring the apps
type FlowCues = {title: number; po: number; poRes: number; so: number; soRes: number; one: number; sheets: number; stocky: number};
const CabinetFlow: React.FC<{f: number; c: FlowCues}> = ({f, c}) => {
  const drawers = [{t: 'Inventory', c: C.amber}, {t: 'Purchase', c: C.odoo}, {t: 'Sales', c: C.green}, {t: 'Contacts', c: C.blue}];
  const lit = (t: string) => (t === 'Purchase' && f >= c.po && f < c.so) || (t === 'Sales' && f >= c.so && f < c.one) || (t === 'Inventory' && ((f >= c.poRes && f < c.so) || (f >= c.soRes && f < c.one))) || (f >= c.one && f < c.one + 45);
  const rows = [{a: 'Purchase confirmed', b: 'Inventory expects a receipt', I: Receipt, col: C.odoo, at: c.po, res: c.poRes}, {a: 'Sales order confirmed', b: 'Inventory prepares a delivery', I: Truck, col: C.green, at: c.so, res: c.soRes}];
  return (
    <AbsoluteFill style={{fontFamily: INTER, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'absolute', top: 70, width: '100%', textAlign: 'center', fontSize: 30, fontWeight: 800, letterSpacing: 4, color: C.hi, textTransform: 'uppercase', opacity: prog(f, 0, 10) * (1 - prog(f, c.title, c.title + 8))}}>Why this matters</div>
      <div style={{position: 'absolute', top: 70, width: '100%', textAlign: 'center', fontSize: 54, fontWeight: 800, color: C.white, opacity: prog(f, c.title, c.title + 12)}}>The drawers talk to each other</div>
      <div style={{display: 'flex', alignItems: 'center', gap: 70, marginTop: 40}}>
        <div style={{width: 420, padding: 26, borderRadius: 30, background: '#334155', boxShadow: 'inset 0 0 0 8px #475569', opacity: pop(f, c.title)}}>
          <div style={{fontSize: 22, fontWeight: 800, color: C.hi, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14}}>Odoo database</div>
          {drawers.map((d, i) => (
            <div key={d.t} style={{height: 84, borderRadius: 16, background: lit(d.t) ? '#FFF7D6' : '#E2E8F0', boxShadow: lit(d.t) ? `0 0 0 4px ${C.hi}` : undefined, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px', opacity: pop(f, c.title + 4 + i * 5)}}>
              <div style={{width: 60, height: 12, borderRadius: 6, background: '#64748B'}} /><div style={{fontSize: 30, fontWeight: 800, color: d.c}}>{d.t}</div>
            </div>
          ))}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 40, width: 900}}>
          {rows.map((x) => {
            const p = pop(f, x.at, 14), q = pop(f, x.res, 14);
            return (
              <div key={x.a} style={{display: 'flex', alignItems: 'center', gap: 20}}>
                <div style={{padding: '18px 22px', borderRadius: 18, background: C.white, fontSize: 28, fontWeight: 800, color: x.col, display: 'flex', alignItems: 'center', gap: 12, opacity: p, transform: `translateX(${(1 - p) * 40}px)`}}><ShoppingCart size={30} />{x.a}</div>
                <ArrowRight size={44} color={C.hi} style={{opacity: q}} />
                <div style={{padding: '18px 22px', borderRadius: 18, background: C.white, fontSize: 28, fontWeight: 800, color: C.navy, display: 'flex', alignItems: 'center', gap: 12, opacity: q, transform: `translateX(${(1 - q) * 40}px)`}}><x.I size={30} />{x.b}</div>
              </div>
            );
          })}
          <div style={{fontSize: 34, fontWeight: 800, color: C.hi, opacity: prog(f, c.one, c.one + 10)}}>One action, every department updated.</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, fontWeight: 700, color: 'rgba(255,255,255,0.8)', opacity: prog(f, c.sheets, c.sheets + 10) * (1 - prog(f, c.stocky, c.stocky + 8))}}>
            <FileSpreadsheet size={34} color="#22C55E" /> A pile of spreadsheets = many versions of the truth
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, opacity: pop(f, c.stocky), marginTop: -84}}>
            <StockyBot size={90} f={f} /><div style={{fontSize: 30, fontWeight: 800, color: C.white}}>Stocky reads one place and sees the whole truth.</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export const V2S2: React.FC<{starts: Starts}> = ({starts}) => {
  const {T, E} = mk(starts);
  const toInv = T('S2_03', 'supply chain') + 0.4;
  const apps = ['Discuss', 'Sales', 'Invoicing', 'Purchase', 'Inventory', 'Contacts', 'Apps', 'Settings'];
  const hops = [
    {at: starts.S2_06, app: 'Purchase', shot: 'odoo_purchase', path: '/purchase', title: 'Requests for Quotation - Odoo'},
    {at: starts.S2_07, app: 'Sales', shot: 'odoo_sales', path: '/sales', title: 'Quotations - Odoo'},
    {at: starts.S2_08, app: 'Contacts', shot: 'odoo_contacts', path: '/contacts', title: 'Contacts - Odoo'},
  ];
  const menus: [string, string][] = [['Operations', 'Operations'], ['Products', 'Products'], ['Reporting', 'Reporting'], ['Configuration', 'Configuration']];
  return (
    <SectionView tabs={['odoo2']}
      views={[
        {at: 0, tab: 'odoo2', shot: 'odoo_home', url: ODOO_URL(), title: 'Odoo'},
        {at: toInv, tab: 'odoo2', shot: 'odoo_inventory', url: ODOO_URL('/inventory'), title: 'Inventory Overview - Odoo'},
        ...hops.flatMap((h) => [
          {at: h.at - 0.6, tab: 'odoo2', shot: 'odoo_home', url: ODOO_URL(), title: 'Odoo'},
          {at: h.at + 0.1, tab: 'odoo2', shot: h.shot, url: ODOO_URL(h.path), title: h.title},
        ]),
      ]}
      boxes={[
        ...apps.map((n, i) => ({shot: 'odoo_home', key: n, a: T('S2_01', 'every icon') + i * 0.12, b: T('S2_01', 'A module')})),
        {shot: 'odoo_home', key: 'Invoicing', a: T('S2_02', 'Invoicing'), b: T('S2_02', 'Discuss')},
        {shot: 'odoo_home', key: 'Discuss', a: T('S2_02', 'Discuss'), b: E('S2_02')},
        ...['Inventory', 'Purchase', 'Sales'].map((n) => ({shot: 'odoo_home', key: n, a: starts.S2_03, b: toInv - 0.2})),
        {shot: 'odoo_inventory', key: 'receipts', a: T('S2_04', 'Receipts'), b: T('S2_04', 'and Delivery')},
        {shot: 'odoo_inventory', key: 'delivery', a: T('S2_04', 'and Delivery'), b: E('S2_04') + 0.3},
        ...menus.map(([k, p], i) => ({shot: 'odoo_inventory', key: k, a: T('S2_05', p), b: (i < 3 ? T('S2_05', menus[i + 1][1]) : T('S2_05', 'Remember that')) - 0.1})),
        {shot: 'odoo_inventory', key: 'menuBar', a: T('S2_05', 'Remember that'), b: E('S2_05') - 0.4},
        {shot: 'odoo_purchase', key: 'title', a: T('S2_06', 'Requests for'), b: T('S2_06', 'In Odoo')},
        {shot: 'odoo_sales', key: 'title', a: T('S2_07', 'Quotations'), b: E('S2_07') - 0.4},
        {shot: 'odoo_contacts', key: 'company', a: T('S2_08', 'even your own'), b: E('S2_08')},
        {shot: 'odoo_contacts', key: 'sarah', a: T('S2_08', 'even your own'), b: E('S2_08')},
      ]}
      keys={[
        {t: 0.4, x: 1500, y: 800},
        {t: toInv - 0.1, shot: 'odoo_home', key: 'Inventory', click: true},
        {t: toInv + 1.2, x: 1600, y: 900},
        ...hops.flatMap((h) => [
          {t: h.at - 0.7, x: 26, y: 23, click: true},
          {t: h.at, shot: 'odoo_home', key: h.app, click: true},
          {t: h.at + 1.2, x: 1600, y: 900},
        ]),
      ]}
      overlays={[
        {a: T('S2_01', 'A module is just'), b: E('S2_01') + 0.3, el: card(1240, 620, 540, big('Module = a department\'s drawer', 'Same cabinet, same data underneath'), C.blue)},
        {a: T('S2_04', "Tom's world"), b: T('S2_04', 'These cards') + 0.2, el: (f) => (
          <FloatCard f={f} x={1280} y={600} w={500}><div style={{display: 'flex', alignItems: 'center', gap: 16}}><Face name="tom" size={90} /><div>{big("Tom's world", 'the warehouse')}</div></div></FloatCard>)},
        {a: T('S2_05', 'Operations') - 0.2, b: E('S2_05') + 0.3, el: (f) => {
          const terms: [string, string, string][] = [['Operations', 'Operations', 'where the day-to-day work happens'], ['Products', 'Products', 'your catalogue'],
            ['Reporting', 'Reporting', 'where you get numbers out'], ['Configuration', 'Configuration', 'the rulebook settings']];
          const at = (ph: string) => Math.round((T('S2_05', ph) - T('S2_05', 'Operations') + 0.2) * FPS);
          const rem = at('Remember that');
          return (
            <FloatCard f={f} x={0} y={0} w={600}>
              <div style={{fontSize: 20, fontWeight: 800, letterSpacing: 2, color: C.slate, textTransform: 'uppercase'}}>The top menu</div>
              {terms.map(([k, ph, d], i) => {
                const s0 = at(ph), s1 = i < 3 ? at(terms[i + 1][1]) : rem;
                const act = f >= s0 && f < s1;
                return (
                  <div key={k} style={{marginTop: 12, padding: '12px 16px', borderRadius: 14, background: act ? '#FFF7D6' : '#F1F5F9', boxShadow: act ? `inset 0 0 0 3px ${C.hi}` : undefined, opacity: pop(f, s0, 12)}}>
                    <div style={{fontSize: 27, fontWeight: 800, color: C.odoo}}>{k}</div>
                    <div style={{fontSize: 21, fontWeight: 600, color: C.slate}}>{d}</div>
                  </div>
                );
              })}
              <div style={{marginTop: 14, fontSize: 21, fontWeight: 800, color: C.green, opacity: prog(f, rem, rem + 8)}}>Same pattern in nearly every Odoo app</div>
            </FloatCard>
          );
        }},
        {a: T('S2_06', 'every purchase'), b: E('S2_06') + 0.3, el: (f) => {
          const conf = Math.round((T('S2_06', 'When the supplier') - T('S2_06', 'every purchase')) * FPS);
          return (
            <FloatCard f={f} x={600} y={620} w={1000}>
              <div style={{display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap'}}>
                <div style={{padding: '16px 22px', borderRadius: 16, background: '#E0E7FF', fontSize: 28, fontWeight: 800}}>RFQ <span style={{fontSize: 20, color: C.slate}}>(a draft)</span></div>
                <div style={{display: 'flex', alignItems: 'center', gap: 10, opacity: prog(f, conf, conf + 8)}}><Face name="sarah" size={56} /><ArrowRight size={36} color={C.slate} /></div>
                <div style={{padding: '16px 22px', borderRadius: 16, background: C.greenSoft, color: C.green, fontSize: 28, fontWeight: 800, opacity: prog(f, conf + 10, conf + 18)}}>Purchase Order</div>
              </div>
              <div style={{fontSize: 22, color: C.slate, fontWeight: 600, marginTop: 12, opacity: prog(f, conf + 20, conf + 28)}}>Same folder, new status · Video 7: Stocky drafts these for Sarah</div>
            </FloatCard>
          );
        }},
        {a: T('S2_07', 'Quotations'), b: E('S2_07') + 0.3, el: card(1200, 640, 560, big('Quotation → Sales Order', 'same idea, other direction'), C.green)},
        {a: T('S2_08', 'A company is just'), b: E('S2_08') + 0.3, el: card(1180, 620, 600, big('A company is just a contact', 'Supplier or customer? Depends on what you do with it'), C.blue)},
      ]}
      full={[{a: starts.S2_09 - 0.1, b: E('S2_10') + 0.5, el: (f) => {
        const fr = (k: string, ph: string, nth = 0) => Math.round((T(k, ph, nth) - starts.S2_09 + 0.1) * FPS);
        return <CabinetFlow f={f} c={{title: fr('S2_09', 'These drawers'), po: fr('S2_09', 'When Sarah'), poRes: fr('S2_09', 'Inventory'), so: fr('S2_09', 'When a salesperson'),
          soRes: fr('S2_09', 'Inventory', 1), one: fr('S2_09', 'One action'), sheets: fr('S2_10', 'pile of'), stocky: fr('S2_10', 'Stocky reads')}} />;
      }}]}
    />
  );
};

// ================================================================ S3 Creating BL-1001 by hand
export const V2S3: React.FC<{starts: Starts}> = ({starts}) => {
  const {T, E} = mk(starts);
  const toNew = T('S3_01', 'click New') + 0.5;
  const tick = T('S3_04', 'tick') + 0.3;
  const create = T('S3_09', 'Click Create') + 0.4;
  const save = T('S3_11', 'Save') + 0.5;
  const toApex = T('S3_13', 'Let me add') + 0.3;
  const PURL = ODOO_URL('/action-stock.product_template_action_product');
  return (
    <SectionView tabs={['odoo2']}
      views={[
        {at: 0, tab: 'odoo2', shot: 'p_list', url: PURL, title: 'Products - Odoo'},
        {at: toNew, tab: 'odoo2', shot: 'p_new', url: PURL + '/new', title: 'New - Odoo'},
        {at: starts.S3_03, tab: 'odoo2', shot: 'p_name', url: PURL + '/new'},
        {at: tick, tab: 'odoo2', shot: 'p_type', url: PURL + '/new'},
        {at: starts.S3_07, tab: 'odoo2', shot: 'p_prices', url: PURL + '/new'},
        {at: starts.S3_09 - 0.1, tab: 'odoo2', shot: 'p_vendor_create', url: PURL + '/new'},
        {at: create, tab: 'odoo2', shot: 'p_vendor_line', url: PURL + '/new'},
        {at: save, tab: 'odoo2', shot: 'p_saved', url: PURL + '/14', title: '[BL-1001] Steel Hex Bolts M10 (box of 100) - Odoo'},
        {at: starts.S3_13 - 0.4, tab: 'odoo2', shot: 'odoo_home', url: ODOO_URL(), title: 'Odoo'},
        {at: starts.S3_13 + 0.2, tab: 'odoo2', shot: 'c_list', url: ODOO_URL('/contacts'), title: 'Contacts - Odoo'},
        {at: toApex, tab: 'odoo2', shot: 'c_apex', url: ODOO_URL('/contacts/15'), title: 'Apex Fasteners - Odoo'},
      ]}
      boxes={[
        {shot: 'p_list', key: 'menuProducts', a: T('S3_01', 'then Products'), b: T('S3_01', 'click New')},
        {shot: 'p_list', key: 'newBtn', a: T('S3_01', 'click New') - 0.3, b: toNew},
        {shot: 'p_new', key: 'name', a: T('S3_02', 'blank form'), b: E('S3_02') + 0.3},
        {shot: 'p_name', key: 'name', a: starts.S3_03, b: T('S3_03', 'Just under')},
        {shot: 'p_name', key: 'sale', a: T('S3_03', 'Just under'), b: E('S3_03')},
        {shot: 'p_name', key: 'purchase', a: T('S3_03', 'Just under'), b: E('S3_03')},
        {shot: 'p_type', key: 'type', a: T('S3_04', 'Product Type') - 0.3, b: tick},
        {shot: 'p_type', key: 'storable', a: tick, b: E('S3_06') + 0.3},
        {shot: 'p_prices', key: 'list', a: T('S3_07', 'Sales Price'), b: T('S3_07', 'Cost')},
        {shot: 'p_prices', key: 'cost', a: T('S3_07', 'Cost'), b: E('S3_07') + 0.2},
        {shot: 'p_prices', key: 'ref', a: starts.S3_08, b: E('S3_08') + 0.2},
        {shot: 'p_vendor_create', key: 'tab', a: starts.S3_09, b: T('S3_09', 'Add a line')},
        {shot: 'p_vendor_create', key: 'vendors', a: T('S3_09', 'Add a line'), b: T('S3_09', 'offers to create')},
        {shot: 'p_vendor_create', key: 'create', a: T('S3_09', 'offers to create'), b: create},
        {shot: 'p_vendor_line', key: 'priceCell', a: starts.S3_10, b: T('S3_10', 'lead time')},
        {shot: 'p_vendor_line', key: 'delayCell', a: T('S3_10', 'lead time'), b: E('S3_10') + 0.3},
        {shot: 'p_saved', key: 'breadcrumb', a: T('S3_11', 'our first record'), b: E('S3_11') + 0.3},
        {shot: 'p_saved', key: 'buttons', a: T('S3_12', 'smart buttons'), b: T('S3_12', 'On Hand')},
        {shot: 'p_saved', key: 'onhand', a: T('S3_12', 'On Hand'), b: E('S3_12') + 0.3},
        {shot: 'c_list', key: 'apex', a: starts.S3_13 + 0.3, b: toApex},
        {shot: 'c_apex', key: 'address', a: toApex + 0.3, b: E('S3_13') + 0.3},
      ]}
      keys={[
        {t: 0.4, x: 1500, y: 800},
        {t: toNew - 0.1, shot: 'p_list', key: 'newBtn', click: true},
        {t: toNew + 1.2, x: 1600, y: 900},
        {t: tick - 0.1, shot: 'p_type', key: 'storable', dx: -206, click: true},
        {t: tick + 1.2, x: 1600, y: 900},
        {t: starts.S3_09 - 0.2, shot: 'p_vendor_create', key: 'tab', click: true},
        {t: create - 0.1, shot: 'p_vendor_create', key: 'create', click: true},
        {t: create + 1.2, x: 1600, y: 900},
        {t: save - 0.1, x: 165, y: 77, click: true},
        {t: save + 1.2, x: 1600, y: 900},
        {t: starts.S3_13 - 0.5, x: 26, y: 23, click: true},
        {t: starts.S3_13 + 0.1, shot: 'odoo_home', key: 'Contacts', click: true},
        {t: toApex - 0.1, shot: 'c_list', key: 'apex', click: true},
        {t: toApex + 1.2, x: 1600, y: 900},
      ]}
      overlays={[
        {a: T('S3_02', 'blank form'), b: E('S3_02') + 0.3, el: card(1200, 680, 560, big('Blank form = one empty folder'), C.amber)},
        {a: starts.S3_05, b: E('S3_05') + 0.3, el: (f) => {
          const no = Math.round((T('S3_05', 'the answer will be') - starts.S3_05) * FPS);
          return (
            <FloatCard f={f} x={1080} y={560} w={700} accent={C.red}>
              <div style={{fontSize: 22, fontWeight: 800, color: C.red, letterSpacing: 2, textTransform: 'uppercase'}}>Track Inventory OFF</div>
              <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 12}}>
                <StockyBot size={70} f={f} /><div style={{fontSize: 26, fontWeight: 800}}>“How many bolts do we have?”</div>
              </div>
              <div style={{marginTop: 12, fontSize: 30, fontWeight: 800, color: C.red, opacity: prog(f, no, no + 8)}}><X size={28} style={{verticalAlign: 'middle'}} /> No stock number at all</div>
            </FloatCard>
          );
        }},
        {a: starts.S3_06, b: E('S3_06') + 0.3, el: card(1200, 700, 580, big("Older Odoo? Choose 'Storable Product'", 'Same thing'), C.slate)},
        {a: T('S3_07', "That's a thirty-five"), b: E('S3_07') + 0.3, el: card(1220, 640, 560, big('$12.50 × 1.35 = $16.88', '35% mark-up (see your workbook)'), C.green)},
        {a: T('S3_08', 'someone writes'), b: E('S3_08') + 0.3, el: (f) => (
          <FloatCard f={f} x={1140} y={600} w={640}>
            <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
              <Chip size={24} bg={C.redSoft} color={C.red} style={{textDecoration: 'line-through'}}>"M10 bolts"</Chip>
              <Chip size={24} bg={C.redSoft} color={C.red} style={{textDecoration: 'line-through'}}>"Hex Bolt M10"</Chip>
              <Chip f={f} at={Math.round((T('S3_08', 'But BL-1001') - T('S3_08', 'someone writes')) * FPS)} size={26} bg={C.greenSoft} color={C.green}><Hash size={22} /> BL-1001 = always BL-1001</Chip>
            </div>
          </FloatCard>
        )},
        {a: T('S3_10', 'Lead time is gold'), b: E('S3_10') + 0.3, el: (f) => (
          <FloatCard f={f} x={1060} y={600} w={720} dark>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, fontWeight: 700}}><Clock size={34} color={C.hi} /> Lead time turns</div>
            <div style={{fontSize: 30, fontWeight: 800, marginTop: 10}}>“you're low” → <span style={{color: C.hi}}>“you're low and have 7 days”</span></div>
          </FloatCard>
        )},
        {a: T('S3_13', 'In video eight'), b: E('S3_13') + 0.3, el: card(1200, 680, 580, big('Video 8: supplier city → local weather'), C.blue)},
      ]}
    />
  );
};

// ================================================================ S4 Importing the other nine products
export const V2S4: React.FC<{starts: Starts}> = ({starts}) => {
  const {T, E} = mk(starts);
  const PURL = ODOO_URL('/action-stock.product_template_action_product');
  const gear = T('S4_04', 'menu icon') + 0.4;
  const toImp = E('S4_04') - 0.3;
  const up = T('S4_05', 'choose') + 0.2;
  const test = T('S4_08', 'click Test') + 0.4;
  const imp = T('S4_09', 'click Import') + 0.4;
  const back = T('S4_11', 'something'), srch = T('S4_11', 'search bar') + 0.3, typeA = T('S4_11', 'type') + 0.3, enter = typeA + 6 * 0.13 + 0.5;
  return (
    <SectionView tabs={['odoo2', 'excel']}
      views={[
        {at: 0, tab: 'odoo2', shot: 'i_list', url: PURL, title: 'Products - Odoo'},
        {at: starts.S4_02, tab: 'excel', el: <Live render={(f) => <ExcelSim headOn={prog(f, (T('S4_02', 'Look at the column') - starts.S4_02) * FPS, (T('S4_02', 'Look at the column') - starts.S4_02) * FPS + 8)}
          rowOn={prog(f, (starts.S4_03 - starts.S4_02) * FPS, (starts.S4_03 - starts.S4_02) * FPS + 8)} />} />},
        {at: starts.S4_04, tab: 'odoo2', shot: 'i_list', url: PURL},
        {at: gear, tab: 'odoo2', shot: 'i_gear', url: PURL},
        {at: toImp, tab: 'odoo2', shot: 'i_upload', url: PURL + '/import', title: 'Import - Odoo'},
        {at: up, tab: 'odoo2', shot: 'i_map', url: PURL + '/import'},
        {at: test, tab: 'odoo2', shot: 'i_test', url: PURL + '/import'},
        {at: imp, tab: 'odoo2', shot: 'i_done', url: PURL, title: 'Imported records - Odoo'},
        {at: T('S4_09', 'Ten products') - 0.9, tab: 'odoo2', url: PURL, el: <MenuOver base="i_done" menu="prod_menu_st" clip={MENU_CLIP.products} />},
        {at: T('S4_09', 'Ten products') - 0.2, tab: 'odoo2', shot: 'i_all', url: PURL, title: 'Products - Odoo'},
        {at: starts.S4_10, tab: 'odoo2', shot: 'i_1005', url: PURL + '/45', title: '[BL-1005] Pallet Jack Wheels (set) - Odoo'},
        {at: back + 0.1, tab: 'odoo2', url: PURL, title: 'Products - Odoo', el: <Live render={(f) => {
          const n = Math.max(0, Math.min(6, Math.floor((f / FPS - typeA) / 0.13) + 1));
          const focused = f / FPS >= srch + 0.05;
          return (<><Shot name="i_all" dir="cap02" />
            {focused && <div style={{position: 'absolute', left: 798, top: 61, width: 420, height: 23, background: '#fff', display: 'flex', alignItems: 'center', fontSize: 14, color: '#212529', fontFamily: 'Roboto, Inter, sans-serif'}}>
              {'BL-100'.slice(0, n)}<span style={{width: 1.5, height: 17, background: '#212529', marginLeft: 1, opacity: Math.floor(f / 15) % 2 ? 0 : 1}} /></div>}</>);
        }} />},
        {at: enter, tab: 'odoo2', shot: 'i_search', url: PURL, title: 'Products - Odoo'},
      ]}
      boxes={[
        {shot: 'i_gear', key: 'gear', a: gear - 0.6, b: T('S4_04', 'choose')},
        {shot: 'i_gear', key: 'item', a: T('S4_04', 'choose'), b: toImp},
        {shot: 'i_upload', key: 'upload', a: starts.S4_05, b: up},
        {shot: 'i_map', key: 'fileCol', a: T('S4_06', 'On the left'), b: T('S4_06', 'On the right')},
        {shot: 'i_map', key: 'odooCol', a: T('S4_06', 'On the right'), b: T('S4_06', 'Odoo has matched')},
        {shot: 'i_map', key: 'table', a: T('S4_06', 'Odoo has matched'), b: E('S4_06') + 0.2},
        {shot: 'i_test', key: 'test', a: T('S4_08', 'click Test') - 0.5, b: T('S4_08', 'Test checks')},
        {shot: 'i_test', key: 'banner', a: T('S4_08', 'Green banner'), b: E('S4_08') + 0.3},
        {shot: 'i_test', key: 'imp', a: starts.S4_09, b: imp},
        {shot: 'i_all', key: 'pager', a: T('S4_09', 'Ten products'), b: E('S4_09') + 0.3},
        {shot: 'i_1005', key: 'type', a: T('S4_10', 'Goods'), b: T('S4_10', 'inventory tracked')},
        {shot: 'i_1005', key: 'storable', a: T('S4_10', 'inventory tracked'), b: T('S4_10', 'cost')},
        {shot: 'i_1005', key: 'cost', a: T('S4_10', 'cost'), b: T('S4_10', 'sales price')},
        {shot: 'i_1005', key: 'price', a: T('S4_10', 'sales price'), b: E('S4_10') + 0.3},
        {shot: 'i_1005', key: 'crumb', a: back - 0.6, b: back + 0.1},
        {shot: 'i_search', key: 'search', a: T('S4_11', 'Use the') , b: T('S4_11', 'Every product')},
        {shot: 'i_search', key: 'rows', a: T('S4_11', 'Every product'), b: E('S4_11') + 0.3, pad: 2, radius: 8},
      ]}
      keys={[
        {t: 0.4, x: 1500, y: 800},
        {t: gear - 0.1, shot: 'i_gear', key: 'gear', click: true},
        {t: toImp - 0.1, shot: 'i_gear', key: 'item', click: true},
        {t: up - 0.1, shot: 'i_upload', key: 'upload', click: true},
        {t: up + 1.2, x: 1600, y: 900},
        {t: test - 0.1, shot: 'i_test', key: 'test', click: true},
        {t: imp - 0.1, shot: 'i_test', key: 'imp', click: true},
        {t: imp + 1.2, x: 1600, y: 900},
        {t: T('S4_09', 'Ten products') - 1.0, shot: 'prod_menu_st', key: 'menu', click: true},
        {t: T('S4_09', 'Ten products') - 0.3, shot: 'prod_menu_st', key: 'item', click: true},
        {t: starts.S4_10 - 0.1, shot: 'i_all', key: 'r1005', dx: -760, click: true},
        {t: back, shot: 'i_1005', key: 'crumb', click: true},
        {t: srch, shot: 'i_search', key: 'search', dx: 0, click: true},
        {t: E('S4_11'), x: 1600, y: 900},
      ]}
      overlays={[
        {a: starts.S4_01, b: E('S4_01') + 0.3, el: (f) => (
          <FloatCard f={f} x={1040} y={520} w={740} dark>
            {[{t: '1 product by hand', s: '≈ 3 minutes', at: 0}, {t: 'BrightLeaf', s: '10 products', at: Math.round((T('S4_01', 'BrightLeaf has') - starts.S4_01) * FPS)},
              {t: 'Your company', s: '10,000 products', at: Math.round((T('S4_01', 'Your company') - starts.S4_01) * FPS)}].map((x) => (
              <div key={x.t} style={{display: 'flex', justifyContent: 'space-between', fontSize: 30, fontWeight: 800, padding: '8px 0', opacity: pop(f, x.at, 13)}}><span>{x.t}</span><span style={{color: C.hi}}>{x.s}</span></div>
            ))}
            <div style={{marginTop: 10, fontSize: 28, fontWeight: 800, color: C.hi, opacity: prog(f, Math.round((T('S4_01', 'We import') - starts.S4_01) * FPS), Math.round((T('S4_01', 'We import') - starts.S4_01) * FPS) + 8)}}>→ We import them.</div>
          </FloatCard>
        )},
        {a: starts.S4_03, b: E('S4_03') + 0.3, el: card(1120, 640, 660, big('BL-1001 is not in the file', 'Already created by hand → no duplicate'), C.amber)},
        {a: starts.S4_07, b: E('S4_07') + 0.3, el: (f) => (
          <FloatCard f={f} x={1000} y={580} w={780}>
            <div style={{fontSize: 22, fontWeight: 800, color: C.amber, letterSpacing: 2, textTransform: 'uppercase'}}>If a column isn't matched</div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10, marginTop: 14}}>
              <div style={{padding: '12px 16px', borderRadius: 10, border: '2px solid #F59E0B', color: '#B45309', fontSize: 22, fontWeight: 600, background: '#FFFBEB'}}>To import, select a field…</div>
              <ArrowRight size={30} color={C.slate} style={{transform: 'rotate(90deg)', marginLeft: 20}} />
              <div style={{padding: '12px 16px', borderRadius: 10, border: `2px solid ${C.green}`, fontSize: 22, fontWeight: 700}}><Check size={20} color={C.green} style={{verticalAlign: 'middle'}} /> Pick it from the dropdown</div>
            </div>
          </FloatCard>
        )},
        {a: T('S4_09', 'BL-1001 that we typed'), b: E('S4_09') + 0.3, el: card(1220, 700, 560, big('10 = 1 typed + 9 imported', 'in about four seconds'), C.green)},
      ]}
    />
  );
};

// ================================================================ S5 Stock, reorder rules and the paper trail
export const V2S5: React.FC<{starts: Starts}> = ({starts}) => {
  const {T, E} = mk(starts);
  const INV = ODOO_URL('/physical-inventory');
  const new1 = T('S5_02', 'Click New') + 0.4;
  const apply1 = T('S5_02', 'Then Apply') + 0.4;
  const done5 = T('S5_03', 'eighteen') + 0.8;
  const toAll = T('S5_03', 'speed through') + 0.8;
  const rr = T('S5_05', 'version') + 0.4;
  const rrNew = T('S5_05', 'Then New') + 0.4;
  const rep = T('S5_08', 'Replenishment') + 0.3;
  const io = T('S5_10', 'In slash Out') + 0.6;
  const PURL = ODOO_URL('/action-stock.product_template_action_product');
  const four = [['BL-1002 Shipping Box', '1,180 / 1,500'], ['BL-1004 Safety Gloves', '420 / 600'], ['BL-1005 Pallet Jack Wheels', '18 / 25'], ['BL-1007 Hydraulic Oil', '31 / 40']];
  return (
    <SectionView tabs={['odoo2']}
      views={[
        {at: 0, tab: 'odoo2', shot: 'st_list', url: INV, title: 'Physical Inventory - Odoo'},
        {at: new1, tab: 'odoo2', shot: 'st_1001_row', url: INV},
        {at: apply1, tab: 'odoo2', shot: 'st_1001_done', url: INV},
        {at: starts.S5_03, tab: 'odoo2', shot: 'st_1005_row', url: INV},
        {at: done5, tab: 'odoo2', shot: 'st_1005_done', url: INV},
        {at: toAll, tab: 'odoo2', shot: 'st_all', url: INV},
        {at: T('S5_05', 'Open the pallet') - 1.2, tab: 'odoo2', url: INV, el: <MenuOver base="st_all" menu="prod_menu_st" clip={MENU_CLIP.products} />},
        {at: T('S5_05', 'Open the pallet') - 0.5, tab: 'odoo2', shot: 'p_list_now', url: PURL, title: 'Products - Odoo'},
        {at: T('S5_05', 'Open the pallet') + 0.2, tab: 'odoo2', shot: 'rr_product', url: PURL + '/45', title: '[BL-1005] Pallet Jack Wheels (set) - Odoo'},
        {at: rr + 0.1, tab: 'odoo2', shot: 'rr_list', url: ODOO_URL('/action-stock.action_orderpoint'), title: 'Reordering Rules - Odoo'},
        {at: rrNew + 0.1, tab: 'odoo2', shot: 'rr_row', url: ODOO_URL('/action-stock.action_orderpoint'), title: 'Reordering Rules - Odoo'},
        {at: starts.S5_07, tab: 'odoo2', shot: 'rr_saved', url: ODOO_URL('/action-stock.action_orderpoint')},
        {at: rep - 0.7, tab: 'odoo2', url: ODOO_URL('/action-stock.action_orderpoint'), el: <MenuOver base="rr_saved" menu="ops_menu_rr" clip={MENU_CLIP.ops} />},
        {at: rep, tab: 'odoo2', shot: 'rp_list', url: ODOO_URL('/replenishment'), title: 'Replenishment - Odoo'},
        {at: starts.S5_10 - 1.4, tab: 'odoo2', url: ODOO_URL('/replenishment'), el: <MenuOver base="rp_list" menu="prod_menu_st" clip={MENU_CLIP.products} />},
        {at: starts.S5_10 - 0.7, tab: 'odoo2', shot: 'p_list_now', url: PURL, title: 'Products - Odoo'},
        {at: starts.S5_10, tab: 'odoo2', shot: 'mv_product', url: PURL + '/14', title: '[BL-1001] Steel Hex Bolts M10 (box of 100) - Odoo'},
        {at: io, tab: 'odoo2', shot: 'mv_list', url: ODOO_URL('/moves-history'), title: 'Moves History - Odoo'},
      ]}
      boxes={[
        {shot: 'st_list', key: 'menuOps', a: T('S5_01', 'Operations'), b: T('S5_01', 'This is the screen')},
        {shot: 'st_list', key: 'newBtn', a: starts.S5_02, b: new1},
        {shot: 'st_1001_row', key: 'product', a: T('S5_02', 'Product'), b: T('S5_02', 'Counted')},
        {shot: 'st_1001_row', key: 'counted', a: T('S5_02', 'Counted'), b: T('S5_02', 'Then Apply')},
        {shot: 'st_1001_row', key: 'apply', a: T('S5_02', 'Then Apply') - 0.2, b: apply1},
        {shot: 'st_1005_row', key: 'row', a: starts.S5_03, b: done5, pad: 2, radius: 8},
        {shot: 'rr_product', key: 'rr', a: T('S5_05', 'Click the smart'), b: rr + 0.1},
        {shot: 'rr_list', key: 'newBtn', a: T('S5_05', 'Then New') - 0.3, b: rrNew + 0.1},
        {shot: 'rr_row', key: 'min', a: T('S5_06', 'Min quantity'), b: T('S5_06', 'Max quantity')},
        {shot: 'rr_row', key: 'max', a: T('S5_06', 'Max quantity'), b: E('S5_06') + 0.3},
        {shot: 'rr_saved', key: 'row', a: starts.S5_07, b: E('S5_07') + 0.3, pad: 2, radius: 8},
        {shot: 'rp_list', key: 'row', a: T('S5_08', 'Odoo already'), b: T('S5_08', 'To Order'), pad: 2, radius: 8},
        {shot: 'rp_list', key: 'toOrder', a: T('S5_08', 'To Order'), b: T('S5_08', "Don't click")},
        {shot: 'rp_list', key: 'order', a: T('S5_08', "Don't click"), b: E('S5_08') + 0.3},
        {shot: 'mv_product', key: 'inout', a: T('S5_10', 'In slash Out') - 0.6, b: io},
        {shot: 'mv_list', key: 'row', a: T('S5_10', 'paper trail'), b: E('S5_11') + 0.3, pad: 2, radius: 8},
      ]}
      keys={[
        {t: 0.4, x: 1500, y: 800},
        {t: new1 - 0.1, shot: 'st_list', key: 'newBtn', click: true},
        {t: apply1 - 0.1, shot: 'st_1001_row', key: 'apply', click: true},
        {t: apply1 + 1.2, x: 1600, y: 900},
        {t: done5 - 0.1, shot: 'st_1005_row', key: 'apply', click: true},
        {t: done5 + 1.0, x: 1600, y: 900},
        {t: T('S5_05', 'Open the pallet') - 1.3, shot: 'prod_menu_st', key: 'menu', click: true},
        {t: T('S5_05', 'Open the pallet') - 0.6, shot: 'prod_menu_st', key: 'item', click: true},
        {t: T('S5_05', 'Open the pallet') + 0.1, shot: 'p_list_now', key: 'r1005', dx: -760, click: true},
        {t: rep - 0.8, shot: 'ops_menu_rr', key: 'menu', click: true},
        {t: rep - 0.1, shot: 'ops_menu_rr', key: 'item', click: true},
        {t: rep + 1.0, x: 1600, y: 900},
        {t: starts.S5_10 - 1.5, shot: 'prod_menu_st', key: 'menu', click: true},
        {t: starts.S5_10 - 0.8, shot: 'prod_menu_st', key: 'item', click: true},
        {t: starts.S5_10 - 0.1, shot: 'p_list_now', key: 'r1001', dx: -760, click: true},
        {t: rr - 0.1, shot: 'rr_product', key: 'rr', click: true},
        {t: rrNew, shot: 'rr_list', key: 'newBtn', click: true},
        {t: rrNew + 1.2, x: 1600, y: 900},
        {t: starts.S5_07 - 0.1, x: 42, y: 74, click: true},
        {t: starts.S5_07 + 1.2, x: 1600, y: 900},
        {t: T('S5_08', "Don't click") + 0.2, shot: 'rp_list', key: 'order', dx: -60, dy: 40},
        {t: io - 0.1, shot: 'mv_product', key: 'inout', click: true},
        {t: io + 1.2, x: 1600, y: 900},
      ]}
      overlays={[
        {a: T('S5_01', 'the shelves are empty'), b: T('S5_01', 'Go to') + 0.2, el: card(1200, 640, 560, big('Products exist…', '…but the shelves are empty'), C.amber)},
        {a: T('S5_03', 'speed through'), b: T('S5_03', 'speed through') + 2.4, el: (f) => (
          <FloatCard f={f} x={760} y={480} w={400} dark><div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 32, fontWeight: 800}}><FastForward size={40} color={C.hi} /> 8 more</div></FloatCard>)},
        {a: starts.S5_04, b: E('S5_04') + 0.3, el: (f) => (
          <FloatCard f={f} x={1120} y={420} w={660} accent={C.red}>
            <div style={{fontSize: 22, fontWeight: 800, color: C.red, letterSpacing: 2, textTransform: 'uppercase'}}>Below reorder point (on hand / reorder point)</div>
            {four.map(([n, v], i) => (
              <div key={n} style={{display: 'flex', justifyContent: 'space-between', fontSize: 26, fontWeight: 700, marginTop: 10, opacity: pop(f, 8 + i * 6, 13)}}><span>{n}</span><span style={{color: C.red}}>{v}</span></div>
            ))}
            <div style={{marginTop: 14, fontSize: 22, fontWeight: 700, color: C.slate, opacity: prog(f, 40, 50)}}>Don't fix them: they're Stocky's first job in Video 6</div>
          </FloatCard>
        )},
        {a: T('S5_06', 'the Max is simply'), b: E('S5_06') + 0.3, el: card(1220, 660, 560, big('Max = 2 × reorder point', '25 → 50'), C.blue)},
        {a: T('S5_07', 'We have eighteen'), b: E('S5_07') + 0.3, el: (f) => (
          <FloatCard f={f} x={1060} y={560} w={720} dark>
            <div style={{fontSize: 36, fontWeight: 800}}>50 − 18 = <span style={{color: C.hi}}>32 to order</span></div>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 14, opacity: prog(f, Math.round((T('S5_07', 'these come from') - T('S5_07', 'We have eighteen')) * FPS), Math.round((T('S5_07', 'these come from') - T('S5_07', 'We have eighteen')) * FPS) + 8)}}>
              <Face name="sarah" size={60} /><div style={{fontSize: 24, fontWeight: 700}}>Shenzhen · 21-day lead time</div>
            </div>
          </FloatCard>
        )},
        {a: T('S5_08', "Don't click"), b: E('S5_08') + 0.3, el: card(1320, 480, 440, big("Don't click Order", 'That decision is for Stocky + Sarah'), C.red)},
        {a: T('S5_09', 'three more'), b: E('S5_09') + 0.3, el: (f) => (
          <FloatCard f={f} x={1120} y={560} w={660}>
            <div style={{fontSize: 24, fontWeight: 800, color: C.slate}}>After the other nine rules, joining the wheels:</div>
            {['Shipping boxes · BL-1002', 'Safety gloves · BL-1004', 'Hydraulic oil · BL-1007'].map((x, i) => (
              <div key={x} style={{fontSize: 28, fontWeight: 800, marginTop: 10, color: C.red, opacity: pop(f, 8 + i * 8, 13)}}>{x}</div>
            ))}
          </FloatCard>
        )},
        {a: T('S5_11', 'Once BrightLeaf'), b: E('S5_11') + 0.3, el: card(1120, 620, 660, (
          <div style={{fontSize: 26, fontWeight: 700}}>Coming later: <span style={{color: C.green}}>Receipt from Apex</span> · <span style={{color: C.blue}}>Delivery to Toronto</span><div style={{fontSize: 22, color: C.slate, marginTop: 6}}>Every move, forever.</div></div>
        ), C.green)},
        {a: T('S5_12', "It's how Stocky"), b: E('S5_12') + 0.3, el: (f) => (
          <FloatCard f={f} x={980} y={480} w={800} dark>
            <div style={{display: 'flex', gap: 18, alignItems: 'flex-start'}}>
              <StockyBot size={90} f={f} />
              <div style={{fontSize: 28, fontWeight: 700, lineHeight: 1.35}}>“~40 boxes of bolts a week for the last month → 145 will last under 4 weeks. <span style={{color: C.hi}}>Fine for now, but watch it.</span>”</div>
            </div>
          </FloatCard>
        )},
      ]}
      lowers={[
        {a: T('S5_03', 'All ten numbers'), b: E('S5_03') + 1.5, text: "Use the \"Starting Stock & Reorder\" sheet in your workbook for all 10 quantities."},
        {a: T('S5_12', 'Nobody can') , b: T('S5_12', "It's how Stocky") - 0.2, text: 'Your Odoo now has: 10 products, 1 supplier, starting stock, a reorder rule, and a full paper trail.'},
      ]}
    />
  );
};
