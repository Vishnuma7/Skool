import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {getLength, getPointAtLength} from '@remotion/paths';
import {
  Bot, CalendarDays, CheckCircle2, CloudSun, Database, DollarSign, FileSpreadsheet, Flag, Mail, MessageSquare, Plug, Sheet as SheetIcon, UtensilsCrossed, Workflow, Wrench, Archive,
} from 'lucide-react';
import {C, FPS, INTER, shadow} from '../theme';
import {pop, prog} from '../lib/anim';
import {vcue, vdur} from '../lib/cues';
import {Bg} from '../components/Bg';
import {StockyBot} from '../components/Art';
import {Logo, LogoName} from '../components/Logo';

type I = React.FC<{size?: number; color?: string; strokeWidth?: number}>;
const ROAD = 'M 120 930 C 420 930, 520 760, 760 760 S 1080 900, 1300 820 S 1560 560, 1300 470 S 760 520, 620 380 S 820 150, 1120 170 S 1560 260, 1800 130';
const LABELS: {t: string; I?: I}[] = [
  {t: 'Why your ERP needs an AI agent'}, {t: 'ERP demystified: your own free Odoo', I: Archive}, {t: 'APIs, explained with a restaurant', I: UtensilsCrossed},
  {t: 'Databases: friendly, like Excel', I: FileSpreadsheet}, {t: 'Your no-code toolkit', I: Wrench}, {t: 'Stocky reads the ERP: "What\'s running low?"'},
  {t: 'Stocky drafts purchase orders (with approval)', I: CheckCircle2}, {t: 'Beyond the ERP: weather, currency, holidays', I: CloudSun},
  {t: "Memory + Mr. Harrison's Monday report", I: Mail}, {t: 'Going live safely + your capstone', I: Flag},
];
const FRAC = [0.0, 0.1, 0.19, 0.29, 0.39, 0.5, 0.6, 0.71, 0.84, 1.0];
const LPOS: [number, number][] = [[40, 830], [340, 900], [660, 640], [1040, 905], [1540, 610], [1010, 330], [440, 480], [380, 160], [1000, 40], [1590, 185]];

export const S4: React.FC<{starts: Record<string, number>}> = ({starts}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const T = (k: string, phrase?: string, nth = 0) => starts[k] + (phrase ? vcue(k, phrase, nth) : 0);
  const E = (k: string) => starts[k] + vdur(k);
  const F = (s: number) => Math.round(s * FPS);
  const toToolkit = starts.S4_04 - 0.2;
  const lit = [starts.S4_01 + 0.4, T('S4_02', 'video two'), T('S4_02', 'Video three'), T('S4_02', 'Video four'), T('S4_02', 'video five'),
    T('S4_03', 'Video six'), T('S4_03', 'Video seven'), T('S4_03', 'Video eight'), T('S4_03', 'Video nine'), T('S4_03', 'video ten')];
  const L = getLength(ROAD);
  const draw = prog(f, F(starts.S4_01 - 0.8), F(starts.S4_01 + 1.6));
  const curIdx = lit.reduce((a, s, i) => (t >= s ? i : a), 0);
  const prevIdx = Math.max(0, curIdx - 1);
  const mv = prog(f, F(lit[curIdx]), F(lit[curIdx] + 0.8));
  const banner = pop(f, F(starts.S4_03), 14) * (1 - prog(f, F(T('S4_03', 'Video six') + 0.8), F(T('S4_03', 'Video six') + 1.2)));
  const mapO = 1 - prog(f, F(toToolkit), F(toToolkit + 0.5));
  const glow = prog(f, F(T('S4_03', 'video ten')), F(T('S4_03', 'video ten') + 0.6));
  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      {mapO > 0.01 && (
        <AbsoluteFill style={{opacity: mapO}}>
          <div style={{position: 'absolute', top: 34, left: 70, fontSize: 46, fontWeight: 800, color: C.white, opacity: prog(f, F(starts.S4_01 - 0.6), F(starts.S4_01))}}>
            The road we'll travel together
          </div>
          <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
            <path d={ROAD} stroke={glow > 0 ? `rgba(255,216,77,${0.25 * glow})` : 'transparent'} strokeWidth={110} fill="none" strokeLinecap="round" />
            <path d={ROAD} stroke="#334155" strokeWidth={70} fill="none" strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - draw)} />
            <path d={ROAD} stroke="rgba(255,255,255,0.7)" strokeWidth={4} fill="none" strokeDasharray="22 22" opacity={draw > 0.98 ? 1 : 0} />
          </svg>
          {FRAC.map((fr, i) => {
            const p = getPointAtLength(ROAD, L * fr)!;
            const pin = pop(f, F(starts.S4_01 + 0.2 * i), 12);
            const on = t >= lit[i];
            const lp = pop(f, F(lit[i]), 13);
            const build = i >= 5;
            const Ic = LABELS[i].I;
            return (
              <React.Fragment key={i}>
                <div style={{position: 'absolute', left: p.x - 34, top: p.y - 34, width: 68, height: 68, borderRadius: 34, background: on ? C.blue : '#94A3B8', color: C.white,
                  fontSize: 30, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pin})`,
                  boxShadow: on ? `0 0 0 ${6 + 4 * Math.sin(f / 6)}px ${C.hi}` : '0 4px 10px rgba(0,0,0,0.3)'}}>
                  {i === curIdx ? <div style={{transform: 'translateY(2px)'}}><StockyBot size={46} f={f} /></div> : i + 1}
                </div>
                <div style={{position: 'absolute', left: LPOS[i][0], top: LPOS[i][1], width: 300, padding: '12px 16px', borderRadius: 16,
                  background: i === 0 ? C.hi : C.white, color: C.navy, fontSize: 21, fontWeight: 700, boxShadow: shadow, opacity: lp, transform: `scale(${0.7 + 0.3 * lp})`,
                  display: 'flex', alignItems: 'center', gap: 10}}>
                  {build && <Wrench size={20} color={C.amber} style={{flexShrink: 0}} />}
                  {Ic && !build && <Ic size={22} color={C.blue} />}
                  <span>{i === 0 ? 'You are here · ' : ''}{LABELS[i].t}</span>
                </div>
              </React.Fragment>
            );
          })}
          <div style={{position: 'absolute', left: 90, top: 560, padding: '18px 34px', borderRadius: 18, background: C.amber, color: C.navy, fontSize: 36, fontWeight: 800,
            boxShadow: shadow, opacity: banner, transform: `translateX(${(1 - banner) * -80}px) rotate(-3deg)`}}>Now the building starts</div>
          <div style={{position: 'absolute', left: 80, top: 660, padding: '16px 26px', borderRadius: 18, background: C.green, color: C.white, fontSize: 28, fontWeight: 800, boxShadow: shadow,
            opacity: pop(f, F(T('S4_03', 'your capstone')), 14)}}>Build a Stocky for your own company</div>
        </AbsoluteFill>
      )}
      {t > toToolkit - 0.1 && <Toolkit f={f} T={T} E={E} start={toToolkit} />}
    </AbsoluteFill>
  );
};

const Toolkit: React.FC<{f: number; T: (k: string, p?: string) => number; E: (k: string) => number; start: number}> = ({f, T, start}) => {
  const F = (s: number) => Math.round(s * FPS);
  const tiles: {t: string; r: string; I: I; c: string; at: number; logos: LogoName[]}[] = [
    {t: 'Odoo', r: 'our ERP · runs in your browser', I: Database, c: C.odoo, at: T('S4_04', 'Odoo'), logos: ['odoo']},
    {t: 'n8n', r: 'where we build the recipe', I: Workflow, c: '#EA4B71', at: T('S4_04', 'n8n'), logos: ['n8n']},
    {t: 'Claude / ChatGPT', r: 'the brain', I: Bot, c: '#D97757', at: T('S4_04', 'Claude'), logos: ['claude_mark', 'chatgpt']},
    {t: 'Google Sheets', r: 'the memory', I: SheetIcon, c: '#0F9D58', at: T('S4_04', 'Google Sheets'), logos: ['sheets']},
    {t: 'Gmail', r: 'sends the alerts', I: Mail, c: C.red, at: T('S4_04', 'Gmail'), logos: ['gmail']},
  ];
  const apis: {t: string; r: string; I: I}[] = [
    {t: 'Open-Meteo', r: 'weather', I: CloudSun}, {t: 'Frankfurter', r: 'exchange rates', I: DollarSign}, {t: 'Nager.Date', r: 'public holidays', I: CalendarDays},
  ];
  const free = F(T('S4_04', 'Every tool'));
  const inst = F(T('S4_04', 'install'));
  const erp = F(T('S4_05', 'Does your')) ;
  const dim = prog(f, erp, erp + 10);
  const chips = [T('S4_05', 'SAP'), T('S4_05', 'Oracle'), T('S4_05', 'Microsoft'), T('S4_05', 'NetSuite')];
  const same = F(T('S4_05', 'identical'));
  const brk = F(T('S4_05', "can't break"));
  const it = F(T('S4_05', 'Once you'));
  return (
    <AbsoluteFill style={{opacity: prog(f, F(start), F(start + 0.5)), padding: '80px 110px', boxSizing: 'border-box', justifyContent: 'center'}}>
      <div style={{opacity: 1 - dim}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{fontSize: 52, fontWeight: 800, color: C.white}}>Your toolkit</div>
          <div style={{padding: '12px 24px', borderRadius: 999, background: C.green, color: C.white, fontSize: 26, fontWeight: 800, opacity: pop(f, inst)}}>✓ Nothing to install</div>
        </div>
        <div style={{display: 'flex', gap: 22, marginTop: 34}}>
          {tiles.map((x) => {
            const p = pop(f, F(x.at), 13);
            return (
              <div key={x.t} style={{flex: 1, height: 400, borderRadius: 28, background: C.white, boxShadow: shadow, padding: 24, boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
                alignItems: 'center', textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * 40}px)`, position: 'relative'}}>
                <div style={{width: 230, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, marginTop: 20}}>
                  {x.logos.map((l) => <Logo key={l} name={l} w={x.logos.length > 1 ? 80 : ['odoo', 'n8n'].includes(l) ? 200 : 100} h={x.logos.length > 1 ? 80 : 100} />)}
                </div>
                <div style={{fontSize: 34, fontWeight: 800, color: C.navy, marginTop: 24}}>{x.t}</div>
                <div style={{fontSize: 25, fontWeight: 600, color: C.slate, marginTop: 10}}>{x.r}</div>
                <div style={{position: 'absolute', bottom: 18, fontSize: 18, fontWeight: 800, color: C.green, background: C.greenSoft, padding: '6px 14px', borderRadius: 999, opacity: pop(f, free + 4, 12)}}>Free tier / trial</div>
              </div>
            );
          })}
        </div>
        <div style={{marginTop: 30, fontSize: 26, fontWeight: 800, letterSpacing: 3, color: C.hi, textTransform: 'uppercase', opacity: pop(f, free)}}>Free outside APIs</div>
        <div style={{display: 'flex', gap: 22, marginTop: 14}}>
          {apis.map((x, i) => {
            const p = pop(f, free + 6 + i * 4, 13);
            return (
              <div key={x.t} style={{flex: 1, height: 140, borderRadius: 24, background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', gap: 18, padding: '0 26px',
                opacity: p, transform: `translateY(${(1 - p) * 30}px)`}}>
                <x.I size={44} color={C.blue} />
                <div><div style={{fontSize: 28, fontWeight: 800, color: C.navy}}>{x.t}</div><div style={{fontSize: 21, fontWeight: 600, color: C.slate}}>{x.r} · free, no key</div></div>
              </div>
            );
          })}
        </div>
      </div>
      {f > erp - 2 && (
        <div style={{position: 'absolute', left: 110, right: 110, top: 300, display: 'flex', alignItems: 'center', gap: 40}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            {([['SAP', 'sap', 110], ['Oracle', 'oracle', 170], ['Microsoft Dynamics', 'microsoft', 46], ['Oracle NetSuite', 'oracle', 120]] as [string, LogoName, number][]).map(([c, l, w], i) => {
              const p = pop(f, F(chips[i]), 13);
              return (
                <div key={c} style={{width: 470, height: 92, boxSizing: 'border-box', padding: '0 26px', borderRadius: 18, background: C.white, color: C.navy, fontSize: 30, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 18,
                  boxShadow: shadow, opacity: p, transform: `translateX(${(1 - p) * -60}px)`}}>
                  <Logo name={l} w={w} h={50} /> {c === 'SAP' || c === 'Oracle' ? '' : c.replace('Oracle ', '').replace('Microsoft ', '')}
                </div>
              );
            })}
          </div>
          <svg width={160} height={60} style={{opacity: pop(f, same)}}><path d="M5 30 H 140 M 120 10 L 145 30 L 120 50" stroke={C.hi} strokeWidth={8} fill="none" strokeLinecap="round" /></svg>
          <div style={{flex: 1, borderRadius: 30, background: C.navy, color: C.white, padding: '40px 46px', boxShadow: shadow, opacity: pop(f, same), border: `3px solid ${C.hi}`}}>
            <div style={{fontSize: 60, fontWeight: 800}}>Same ideas.</div>
            <div style={{fontSize: 36, fontWeight: 700, color: C.hi, marginTop: 12, opacity: pop(f, brk)}}>Odoo = a free test system you can't break.</div>
            <div style={{marginTop: 26, display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 600, opacity: pop(f, it)}}>
              <MessageSquare size={34} color={C.hi} /> Learn how Stocky talks to Odoo, and you'll know what to ask your IT team.
            </div>
          </div>
          <Plug size={0} />
        </div>
      )}
    </AbsoluteFill>
  );
};
