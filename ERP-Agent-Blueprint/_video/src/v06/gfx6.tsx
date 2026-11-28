import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Bell, Brain, Check, Database, Hand, ListChecks, NotebookPen, Package, RefreshCw, Search, Truck, UserRound, Wrench} from 'lucide-react';
import {C, INTER} from '../theme';
import {pop, prog} from '../lib/anim';
import {Logo} from '../components/Logo';
import {Face, StockyBot} from '../components/Art';

const Title: React.FC<{f: number; kicker: string; title: React.ReactNode; color?: string}> = ({f, kicker, title, color = C.hi}) => (
  <div style={{textAlign: 'center', opacity: prog(f, 0, 12)}}>
    <div style={{fontSize: 24, fontWeight: 800, letterSpacing: 4, color, textTransform: 'uppercase'}}>{kicker}</div>
    <div style={{fontSize: 52, fontWeight: 800, color: C.white, marginTop: 8, letterSpacing: -0.5}}>{title}</div>
  </div>
);

/** S2_01: three kinds of information = three drawers, each with BL-1005's real value. ats = frames each drawer opens. */
export const Drawers: React.FC<{f: number; ats: number[]; tools?: number}> = ({f, ats, tools = 1e9}) => {
  const D = [
    {n: 1, t: 'Products & stock', v: 'BL-1005 · On hand: 18', I: Package, c: C.blue, tool: 'get_products_and_stock'},
    {n: 2, t: 'Reorder rules', v: 'Min 25 · Max 50', I: RefreshCw, c: C.amber, tool: 'get_reorder_rules'},
    {n: 3, t: 'Suppliers & lead times', v: 'Global Lift Parts · $38 · 21 days', I: Truck, c: C.green, tool: 'get_supplier_info'},
  ];
  return (
    <AbsoluteFill style={{fontFamily: INTER, padding: '70px 0 0'}}>
      <Title f={f} kicker="Odoo = a filing cabinet" title="Three kinds of information, three drawers" />
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 70, marginTop: 46}}>
        <div style={{width: 520, padding: 26, borderRadius: 30, background: '#CBD5E1', boxShadow: '0 30px 70px rgba(2,6,23,0.5)'}}>
          {D.map((d, i) => {
            const o = prog(f, ats[i], ats[i] + 14);
            return (
              <div key={d.n} style={{position: 'relative', height: 150, marginBottom: i < 2 ? 18 : 0, borderRadius: 16, background: '#94A3B8'}}>
                <div style={{position: 'absolute', inset: 0, borderRadius: 16, background: C.white, transform: `translateX(${o * 90}px)`, boxShadow: o > 0.05 ? '0 16px 30px rgba(2,6,23,0.35)' : undefined,
                  display: 'flex', alignItems: 'center', gap: 20, padding: '0 26px'}}>
                  <div style={{width: 74, height: 74, borderRadius: 18, background: `${d.c}22`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><d.I size={40} color={d.c} /></div>
                  <div>
                    <div style={{fontSize: 18, fontWeight: 800, color: C.slate, letterSpacing: 2}}>DRAWER {d.n}</div>
                    <div style={{fontSize: 30, fontWeight: 800, color: C.navy}}>{d.t}</div>
                  </div>
                  <div style={{position: 'absolute', left: '50%', bottom: 14, width: 90, height: 10, marginLeft: -45, borderRadius: 5, background: '#CBD5E1'}} />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{width: 640}}>
          {D.map((d, i) => (
            <div key={d.n} style={{height: 150, marginBottom: i < 2 ? 18 : 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: pop(f, ats[i] + 8), transform: `translateX(${(1 - pop(f, ats[i] + 8)) * 30}px)`}}>
              <div style={{fontSize: 34, fontWeight: 800, color: C.white}}>{d.v}</div>
              <div style={{display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 10, marginTop: 12, padding: '8px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.1)',
                fontSize: 24, fontWeight: 700, color: C.hi, fontFamily: 'monospace', opacity: pop(f, tools + i * 8)}}><Wrench size={22} /> {d.tool}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Stocky's parts as a list at the side (S1 / S2): items light up as they are added. */
export const PARTS = [
  {k: 'trigger', t: 'Doorbell', s: 'When chat message received', I: Bell},
  {k: 'agent', t: 'The intern', s: 'AI Agent', I: UserRound},
  {k: 'brain', t: 'Brain', s: 'Anthropic Chat Model · Claude', I: Brain, logo: 'claude_mark' as const},
  {k: 'memory', t: 'Notepad', s: 'Simple Memory · 10 messages', I: NotebookPen},
  {k: 'tools', t: 'Three hands', s: '3 read-only Odoo tools', I: Hand, logo: 'odoo_mark' as const},
];
export const PartsList: React.FC<{f: number; on: Record<string, number>; done?: Record<string, number>; title?: string}> = ({f, on, done = {}, title = "Stocky's parts"}) => (
  <div style={{padding: '24px 26px', borderRadius: 24, background: C.white, fontFamily: INTER, boxShadow: '0 24px 60px rgba(2,6,23,0.35)'}}>
    <div style={{fontSize: 19, fontWeight: 800, letterSpacing: 2.5, color: C.blue, textTransform: 'uppercase', marginBottom: 10}}>{title}</div>
    {PARTS.map((p) => {
      const a = on[p.k] ?? 1e9;
      const lit = prog(f, a, a + 10);
      const ok = (done[p.k] ?? a) <= f;
      return (
        <div key={p.k} style={{display: 'flex', alignItems: 'center', gap: 14, padding: '10px 12px', margin: '0 -12px', borderRadius: 14,
          background: lit > 0.01 && f < a + 50 ? `${C.hi}${Math.round(lit * 90).toString(16).padStart(2, '0')}` : 'transparent', opacity: 0.35 + 0.65 * lit}}>
          <div style={{width: 48, height: 48, borderRadius: 14, background: ok && lit > 0.5 ? C.greenSoft : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
            {p.logo ? <Logo name={p.logo} w={28} /> : <p.I size={26} color={ok && lit > 0.5 ? C.green : C.slate} />}
          </div>
          <div style={{flex: 1}}>
            <div style={{fontSize: 24, fontWeight: 800, color: C.navy}}>{p.t}</div>
            <div style={{fontSize: 18, fontWeight: 600, color: C.slate}}>{p.s}</div>
          </div>
          {lit > 0.5 && <Check size={26} color={C.green} />}
        </div>
      );
    })}
  </div>
);

/** S1_05: why memory matters (a goldfish-brain conversation). */
export const Goldfish: React.FC<{f: number; second: number; reply: number; fix: number}> = ({f, second, reply, fix}) => {
  const bub = (at: number, me: boolean, text: string, red?: boolean) => (
    <div style={{display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start', marginTop: 16, opacity: pop(f, at), transform: `translateY(${(1 - pop(f, at)) * 14}px)`}}>
      <div style={{maxWidth: 560, padding: '16px 24px', borderRadius: 20, fontSize: 30, fontWeight: 700, background: me ? '#E0E7FF' : red ? C.redSoft : '#F1F5F9', color: red ? '#7F1D1D' : C.navy}}>{text}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{fontFamily: INTER, padding: '70px 0 0', alignItems: 'center'}}>
      <Title f={f} kicker="Why memory?" title="Without memory, every message is a fresh start" />
      <div style={{display: 'flex', gap: 60, marginTop: 50}}>
        <div style={{width: 720, padding: '24px 32px 32px', borderRadius: 28, background: C.white}}>
          <div style={{fontSize: 22, fontWeight: 800, color: C.red, letterSpacing: 2}}>NO MEMORY</div>
          {bub(4, true, 'Tell me about BL-1005.')}
          {bub(12, false, 'BL-1005 is Pallet Jack Wheels…')}
          {bub(second, true, '…and who supplies it?')}
          {bub(reply, false, 'Supplies what? 🐠', true)}
        </div>
        <div style={{width: 520, padding: '24px 32px 32px', borderRadius: 28, background: C.white, opacity: pop(f, fix)}}>
          <div style={{fontSize: 22, fontWeight: 800, color: C.green, letterSpacing: 2}}>SIMPLE MEMORY</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 20}}>
            <NotebookPen size={60} color={C.blue} />
            <div style={{fontSize: 30, fontWeight: 800, color: C.navy, lineHeight: 1.25}}>Context Window<br />Length = <span style={{color: C.blue}}>10</span></div>
          </div>
          <div style={{fontSize: 24, fontWeight: 600, color: C.slate, marginTop: 18, lineHeight: 1.35}}>The last 10 back-and-forth messages. Plenty for a normal conversation.</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** S5_04: the agent loop. A dot travels Think → Tool → Read twice, then exits to Answer. */
export const AgentLoop: React.FC<{f: number; start: number}> = ({f, start}) => {
  const cx = 760, cy = 520, R = 230;
  const nodes = [
    {t: 'Think', I: Brain, a: -90, c: C.blue},
    {t: 'Use a tool', I: Wrench, a: 30, c: C.amber},
    {t: 'Read the result', I: Search, a: 150, c: C.green},
  ];
  const p = Math.max(0, (f - start) / 75);
  const loops = Math.min(p, 2);
  const ang = (-90 + 360 * loops) * (Math.PI / 180);
  const exit = prog(f, start + 150, start + 175);
  const dot = exit > 0 ? {x: cx + (1 - exit) * 0 + exit * 560, y: cy - R + exit * R} : {x: cx + R * Math.cos(ang), y: cy + R * Math.sin(ang)};
  return (
    <AbsoluteFill style={{fontFamily: INTER, paddingTop: 70}}>
      <Title f={f} kicker="Watch the agent think" title="The agent loop" />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={6} strokeDasharray="14 12" />
        <path d={`M ${cx} ${cy - R} C ${cx + 300} ${cy - R}, ${cx + 400} ${cy}, ${cx + 560} ${cy}`} fill="none" stroke={C.hi} strokeWidth={6} opacity={0.3 + 0.7 * prog(f, start + 140, start + 160)} />
        <circle cx={dot.x} cy={dot.y} r={18} fill={C.hi} opacity={pop(f, start)} />
      </svg>
      {nodes.map((n, i) => {
        const a = (n.a * Math.PI) / 180;
        return (
          <div key={n.t} style={{position: 'absolute', left: cx + R * Math.cos(a) - 120, top: cy + R * Math.sin(a) - 60, width: 240, height: 120, borderRadius: 24, background: C.white,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 28, fontWeight: 800, color: C.navy, opacity: pop(f, 6 + i * 6), boxShadow: '0 20px 50px rgba(2,6,23,0.45)'}}>
            <n.I size={34} color={n.c} />{n.t}
          </div>
        );
      })}
      <div style={{position: 'absolute', left: cx + 560, top: cy - 60, width: 260, height: 120, borderRadius: 24, background: C.green, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 12, fontSize: 32, fontWeight: 800, opacity: pop(f, 20), boxShadow: '0 20px 50px rgba(2,6,23,0.45)'}}><Check size={36} /> Answer</div>
      <div style={{position: 'absolute', left: cx - 70, top: cy - 30, width: 140, textAlign: 'center', fontSize: 22, fontWeight: 800, color: 'rgba(255,255,255,0.7)', opacity: pop(f, start)}}>
        repeat ×{Math.min(2, Math.floor(p) + 1)}
      </div>
    </AbsoluteFill>
  );
};

/** Spoken Pause & Think: the question stays on screen through the 5 s hold. */
export const PauseCard: React.FC<{f: number; total: number; question: string; hint?: React.ReactNode; hintAt?: number}> = ({f, total, question, hint, hintAt = 0}) => {
  const left = Math.max(0, Math.ceil((total - f) / 30));
  const R = 64, L = 2 * Math.PI * R;
  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <div style={{position: 'absolute', left: 150, right: 150, top: 0, bottom: 130, display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: pop(f, 0, 18)}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40}}>
          <div>
            <div style={{fontSize: 26, fontWeight: 800, letterSpacing: 4, color: C.amber, textTransform: 'uppercase'}}>Pause & Think</div>
            <div style={{fontSize: 54, fontWeight: 800, color: C.white, letterSpacing: -1, marginTop: 10, lineHeight: 1.15, maxWidth: 1300}}>{question}</div>
          </div>
          <svg width={170} height={170} viewBox="0 0 170 170" style={{flexShrink: 0}}>
            <circle cx={85} cy={85} r={R} stroke="rgba(255,255,255,0.15)" strokeWidth={13} fill="none" />
            <circle cx={85} cy={85} r={R} stroke={C.hi} strokeWidth={13} fill="none" strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * Math.min(1, f / total)} transform="rotate(-90 85 85)" />
            <text x={85} y={103} textAnchor="middle" fontSize={52} fontWeight={800} fill={C.white} fontFamily={INTER}>{left || '✓'}</text>
          </svg>
        </div>
        {hint && <div style={{marginTop: 36, opacity: pop(f, hintAt)}}>{hint}</div>}
      </div>
    </AbsoluteFill>
  );
};

/** S6_05: five ways to reduce hallucination (read along). */
export const ReduceHallucination: React.FC<{f: number; ats: number[]}> = ({f, ats}) => {
  const items = ['Give real data through tools', '"Only answer from tool data"', '"Say I don\'t know"', 'Ask for the source', 'Test with trap questions'];
  return (
    <AbsoluteFill style={{fontFamily: INTER, alignItems: 'center', paddingTop: 80}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 34, opacity: prog(f, 0, 12)}}>
        <StockyBot size={150} f={f} />
        <div>
          <div style={{fontSize: 24, fontWeight: 800, letterSpacing: 4, color: C.hi, textTransform: 'uppercase'}}>Reduce hallucination</div>
          <div style={{fontSize: 54, fontWeight: 800, color: C.white, marginTop: 6}}>Five habits for a trustworthy agent</div>
        </div>
      </div>
      <div style={{marginTop: 40, width: 1150}}>
        {items.map((t, i) => (
          <div key={t} style={{display: 'flex', alignItems: 'center', gap: 22, padding: '18px 28px', marginBottom: 14, borderRadius: 20, background: C.white, opacity: pop(f, ats[i]),
            transform: `translateX(${(1 - pop(f, ats[i])) * 40}px)`}}>
            <div style={{width: 52, height: 52, borderRadius: 26, background: C.blue, color: C.white, fontSize: 28, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
            <div style={{fontSize: 34, fontWeight: 800, color: C.navy}}>{t}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/** Before / after: 40 minutes vs 10 seconds. */
export const BeforeAfter: React.FC<{f: number}> = ({f}) => (
  <div style={{display: 'flex', gap: 16, fontFamily: INTER}}>
    {[{t: 'Before', v: '~40 min', s: 'export · VLOOKUP · colour · email', c: C.red, bg: C.redSoft}, {t: 'After', v: '~10 sec', s: 'ask Stocky, check Odoo', c: C.green, bg: C.greenSoft}].map((x, i) => (
      <div key={x.t} style={{flex: 1, padding: '18px 20px', borderRadius: 18, background: x.bg, opacity: pop(f, i * 10)}}>
        <div style={{fontSize: 18, fontWeight: 800, letterSpacing: 2, color: x.c, textTransform: 'uppercase'}}>{x.t}</div>
        <div style={{fontSize: 44, fontWeight: 800, color: C.navy}}>{x.v}</div>
        <div style={{fontSize: 18, fontWeight: 600, color: C.slate}}>{x.s}</div>
      </div>
    ))}
  </div>
);

export const QuoteBubble: React.FC<{f: number; who: 'harrison' | 'jake'; name: string; text: string}> = ({f, who, name, text}) => (
  <div style={{display: 'flex', gap: 18, alignItems: 'flex-start', fontFamily: INTER}}>
    <Face name={who} size={84} />
    <div style={{flex: 1, padding: '16px 20px', borderRadius: 18, background: C.blueSoft, fontSize: 25, fontWeight: 700, color: C.navy, lineHeight: 1.3, opacity: pop(f, 4)}}>
      “{text}”<div style={{fontSize: 18, color: C.slate, marginTop: 6}}>{name}</div>
    </div>
  </div>
);
export {Database, ListChecks};
