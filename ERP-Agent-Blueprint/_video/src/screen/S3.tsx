import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Brain, CalendarDays, ClipboardList, CloudSun, Database, DollarSign, Lock, Mail, NotebookPen, Sheet as SheetIcon, UserCheck, Wind, Wrench} from 'lucide-react';
import {C, FPS, INTER, shadow} from '../theme';
import {pop, prog} from '../lib/anim';
import {vcue, vdur} from '../lib/cues';
import {Bg} from '../components/Bg';
import {LowerThird} from '../components/Gfx';
import {StockyBot} from '../components/Art';
import {Logo, LogoName} from '../components/Logo';
import {GmailEmail, LOG_ROWS_APPROVED, Mark, Sheet} from './sims';
import {SYSTEM_PARTS} from './systemMessage';

type I = React.FC<{size?: number; color?: string; strokeWidth?: number}>;
const PARTS: {n: number; t: string; sub: string; I: I}[] = [
  {n: 1, t: 'Brain', sub: 'the AI model (LLM)', I: Brain},
  {n: 2, t: 'Instructions', sub: 'the day-one briefing', I: ClipboardList},
  {n: 3, t: 'Tools', sub: 'the doors it may open', I: Wrench},
  {n: 4, t: 'Memory', sub: 'its notebook', I: NotebookPen},
  {n: 5, t: 'Human Supervisor', sub: 'you approve', I: UserCheck},
];

export const S3: React.FC<{starts: Record<string, number>}> = ({starts}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const T = (k: string, phrase?: string, nth = 0) => starts[k] + (phrase ? vcue(k, phrase, nth) : 0);
  const E = (k: string) => starts[k] + vdur(k);
  const F = (s: number) => Math.round(s * FPS);
  const partStart = [starts.S3_02, starts.S3_03, starts.S3_04, starts.S3_05, starts.S3_06];
  const allOn = E('S3_06') - 2.6;
  const cur = t >= allOn ? -1 : partStart.reduce((a, s, i) => (t >= s - 0.1 ? i : a), -1);
  // one stable panel card from part 1 to the end (contents crossfade inside it — no flashing)
  const cardIn = prog(f, F(starts.S3_01 - 0.4), F(starts.S3_01 + 0.2));
  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      {/* the five parts, listed on the side */}
      <div style={{position: 'absolute', left: 80, top: 110, width: 560}}>
        <div style={{fontSize: 24, fontWeight: 800, letterSpacing: 3, color: C.hi, textTransform: 'uppercase', marginBottom: 22, opacity: prog(f, F(starts.S3_01 - 0.6), F(starts.S3_01))}}>The 5 parts of an agent</div>
        {PARTS.map((p, i) => {
          const pin = pop(f, F(starts.S3_01 + 0.5 + i * 0.6), 14);
          const on = cur === i || t >= allOn;
          const done = cur > i;
          return (
            <div key={p.n} style={{height: 128, marginBottom: 22, borderRadius: 26, background: on ? C.hi : done ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.14)', boxShadow: on ? shadow : undefined,
              display: 'flex', alignItems: 'center', gap: 20, padding: '0 26px', boxSizing: 'border-box', border: on ? 'none' : '2px solid rgba(255,255,255,0.18)',
              opacity: pin, transform: `translateX(${(1 - pin) * -50}px) scale(${on && t < allOn ? 1.04 : 1})`, transformOrigin: 'left center'}}>
              <div style={{width: 74, height: 74, borderRadius: 22, background: on || done ? C.navy : 'rgba(255,255,255,0.15)', color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><p.I size={40} /></div>
              <div style={{color: on || done ? C.navy : C.white}}>
                <div style={{fontSize: 36, fontWeight: 800, lineHeight: 1.05}}><span style={{color: on ? C.navy : done ? C.blue : C.hi}}>{p.n}</span> {p.t}</div>
                <div style={{fontSize: 22, fontWeight: 600, opacity: 0.75, marginTop: 4}}>{p.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
      {/* stable detail card */}
      <div style={{position: 'absolute', left: 700, top: 90, width: 1130, height: 880, borderRadius: 36, background: C.white, boxShadow: shadow, opacity: cardIn, transform: `translateX(${(1 - cardIn) * 50}px)`}} />
      <Panel f={f} a={starts.S3_01 - 0.2} b={starts.S3_02}><IntroPanel f={f} a={starts.S3_01} /></Panel>
      <Panel f={f} a={starts.S3_02} b={starts.S3_03}><BrainPanel f={f} T={T} /></Panel>
      <Panel f={f} a={starts.S3_03} b={starts.S3_04}><InstructionsPanel f={f} T={T} /></Panel>
      <Panel f={f} a={starts.S3_04} b={starts.S3_05}><ToolsPanel f={f} T={T} /></Panel>
      <Panel f={f} a={starts.S3_05} b={starts.S3_06}><MemoryPanel f={f} T={T} /></Panel>
      <Panel f={f} a={starts.S3_06} b={allOn}><HumanPanel f={f} T={T} /></Panel>
      <Panel f={f} a={allOn} b={999}><TrustPanel f={f} a={allOn} /></Panel>
      {t > T('S3_06', "It's like") && (
        <LowerThird f={f - F(T('S3_06', "It's like"))}>Brain + Instructions + Tools + Memory + Human = an agent you can trust.</LowerThird>
      )}
    </AbsoluteFill>
  );
};

const IntroPanel: React.FC<{f: number; a: number}> = ({f, a}) => (
  <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
    <StockyBot size={220} f={f} wave={f > a * FPS && f < a * FPS + 50} />
    <div style={{fontSize: 58, fontWeight: 800, marginTop: 24, letterSpacing: -1}}>Every agent has the same 5 parts</div>
    <div style={{fontSize: 30, fontWeight: 600, color: C.slate, marginTop: 12}}>Including Stocky. Let's go through them.</div>
  </div>
);
const TrustPanel: React.FC<{f: number; a: number}> = ({f, a}) => (
  <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
    <div style={{transform: `scale(${0.8 + 0.2 * pop(f, a * FPS)})`}}><StockyBot size={200} f={f} /></div>
    <div style={{fontSize: 56, fontWeight: 800, marginTop: 24, letterSpacing: -1}}>An agent you can trust</div>
    <div style={{fontSize: 28, fontWeight: 600, color: C.slate, marginTop: 10}}>All five parts, working together.</div>
  </div>
);

const Panel: React.FC<{f: number; a: number; b: number; children: React.ReactNode}> = ({f, a, b, children}) => {
  const t = f / FPS;
  if (t < a - 0.1 || t > b + 0.5) return null;
  const p = prog(f, Math.round(a * FPS), Math.round(a * FPS) + 9);
  const out = prog(f, Math.round(b * FPS) - 4, Math.round(b * FPS) + 5);
  return (
    <div style={{position: 'absolute', left: 700, top: 90, width: 1130, height: 880, borderRadius: 36, padding: '48px 56px', boxSizing: 'border-box',
      color: C.navy, opacity: Math.min(p, 1 - out), overflow: 'hidden'}}>
      {children}
    </div>
  );
};
type TF = (k: string, phrase?: string, nth?: number) => number;
const Kick: React.FC<{n: number; t: string}> = ({n, t}) => (
  <div style={{fontSize: 24, fontWeight: 800, letterSpacing: 3, color: C.blue, textTransform: 'uppercase', marginBottom: 10}}>Part {n} · {t}</div>
);

const BrainPanel: React.FC<{f: number; T: TF}> = ({f, T}) => {
  const F = (s: number) => Math.round(s * FPS);
  const verbs = [T('S3_02', 'reads', 1), T('S3_02', 'reasons'), T('S3_02', 'writes', 1)];
  const room = F(T('S3_02', 'On its own'));
  return (
    <>
      <Kick n={1} t="The brain" />
      <div style={{fontSize: 52, fontWeight: 800}}>The intern's brain</div>
      <div style={{display: 'flex', gap: 50, marginTop: 40, alignItems: 'center'}}>
        <div style={{position: 'relative', width: 340, height: 340, borderRadius: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.blueSoft,
          border: `${6 * prog(f, room, room + 10)}px dashed ${C.navy}`}}>
          <Brain size={200} color={C.blue} />
        </div>
        <div style={{flex: 1}}>
          <div style={{display: 'flex', gap: 14}}>
            {['Claude', 'ChatGPT'].map((n, i) => (
              <div key={n} style={{padding: '12px 22px', borderRadius: 16, background: '#F1F5F9', color: C.navy, fontSize: 32, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 12, opacity: pop(f, F(T('S3_02', i ? 'ChatGPT' : 'Claude')))}}><Logo name={i ? 'chatgpt' : 'claude_mark'} w={38} />{n}</div>
            ))}
          </div>
          <div style={{marginTop: 30, padding: '20px 26px', borderRadius: 20, background: C.amberSoft, fontSize: 32, fontWeight: 700, color: '#92400E', opacity: pop(f, F(T('S3_02', 'LLM')))}}>
            LLM = AI that reads and writes language
          </div>
          <div style={{display: 'flex', gap: 14, marginTop: 30}}>
            {['reads', 'reasons', 'writes'].map((v, i) => (
              <div key={v} style={{padding: '14px 24px', borderRadius: 999, background: C.greenSoft, color: C.green, fontSize: 32, fontWeight: 800, opacity: pop(f, F(verbs[i]))}}>{v}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{marginTop: 46, fontSize: 34, fontWeight: 700, color: C.slate, opacity: prog(f, room, room + 10)}}>On its own: stuck in a room with no doors.</div>
    </>
  );
};

const InstructionsPanel: React.FC<{f: number; T: TF}> = ({f, T}) => {
  const F = (s: number) => Math.round(s * FPS);
  const win = (a: number, b: number) => Math.min(prog(f, F(a), F(a) + 8), 1 - prog(f, F(b), F(b) + 8));
  const who = win(T('S3_03', 'Who you are'), T('S3_03', 'what your job'));
  const job = win(T('S3_03', 'what your job'), T('S3_03', 'what you must'));
  const never = win(T('S3_03', 'what you must'), T('S3_03', 'The clearer'));
  const vague = pop(f, F(T('S3_03', 'Vague')));
  return (
    <>
      <Kick n={2} t="Instructions" />
      <div style={{fontSize: 52, fontWeight: 800}}>The briefing on day one</div>
      <div style={{marginTop: 30, borderRadius: 18, border: '2px solid #D9D9D9', overflow: 'hidden'}}>
        <div style={{background: '#2D2E2E', color: C.white, padding: '14px 22px', fontSize: 22, fontWeight: 700}}>AI Agent · System Message</div>
        <div style={{padding: '24px 28px', fontSize: 32, lineHeight: 1.55, fontFamily: 'ui-monospace, Menlo, monospace', color: '#333'}}>
          <Mark on={who}>{SYSTEM_PARTS[0]}</Mark> {SYSTEM_PARTS[1]} <Mark on={job}>{SYSTEM_PARTS[2]}</Mark> {SYSTEM_PARTS[3]} <Mark on={never} color={C.red}>{SYSTEM_PARTS[4]}</Mark> {SYSTEM_PARTS[5]}
        </div>
      </div>
      <div style={{display: 'flex', gap: 14, marginTop: 30}}>
        {[{t: 'Who you are', o: who}, {t: 'Your job', o: job}, {t: 'Never do this', o: never}].map((x) => (
          <div key={x.t} style={{padding: '12px 22px', borderRadius: 999, background: x.o > 0.1 ? C.hi : '#F1F5F9', fontSize: 28, fontWeight: 800}}>{x.t}</div>
        ))}
      </div>
      <div style={{marginTop: 30, fontSize: 34, fontWeight: 800, color: C.red, opacity: vague}}>Vague instructions = a vague intern.</div>
    </>
  );
};

const ToolsPanel: React.FC<{f: number; T: TF}> = ({f, T}) => {
  const F = (s: number) => Math.round(s * FPS);
  const tiles: {t: string; I: I; c: string; at: number; logo?: LogoName}[] = [
    {t: 'Odoo', I: Database, c: C.odoo, at: T('S3_04', 'Odoo'), logo: 'odoo'},
    {t: 'Weather', I: CloudSun, c: '#0EA5E9', at: T('S3_04', 'weather')},
    {t: 'Currency', I: DollarSign, c: C.green, at: T('S3_04', 'exchange')},
    {t: 'Holidays', I: CalendarDays, c: C.amber, at: T('S3_04', 'holiday')},
    {t: 'Gmail', I: Mail, c: C.red, at: T('S3_04', 'Email'), logo: 'gmail'},
    {t: 'Google Sheets', I: SheetIcon, c: '#0F9D58', at: T('S3_04', 'Email') + 0.5, logo: 'sheets'},
  ];
  const lock = F(T('S3_04', "If you don't"));
  const shake = Math.sin((f - lock) / 1.6) * 8 * (1 - prog(f, lock + 6, lock + 22));
  return (
    <>
      <Kick n={3} t="Tools" />
      <div style={{fontSize: 52, fontWeight: 800}}>The doors we open for the intern</div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 34}}>
        {tiles.map((x) => {
          const p = pop(f, F(x.at), 13);
          return (
            <div key={x.t} style={{height: 170, borderRadius: 26, background: `${x.c}12`, border: `3px solid ${x.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
              opacity: p, transform: `perspective(600px) rotateY(${(1 - p) * -70}deg)`}}>
              {x.logo ? <Logo name={x.logo} w={x.logo === 'odoo' ? 130 : 70} h={64} /> : <x.I size={64} color={x.c} />}
              <div style={{fontSize: 30, fontWeight: 800}}>{x.t}</div>
            </div>
          );
        })}
      </div>
      <div style={{marginTop: 26, display: 'flex', alignItems: 'center', gap: 24, padding: '20px 28px', borderRadius: 24, background: '#F1F5F9', border: '3px dashed #CBD5E1', opacity: pop(f, lock, 13)}}>
        <div style={{transform: `rotate(${shake}deg)`}}><Lock size={56} color={C.slate} /></div>
        <div>
          <div style={{fontSize: 30, fontWeight: 800, color: C.slate}}>Purchase orders (not given)</div>
          <div style={{fontSize: 26, fontWeight: 600, color: C.slate, opacity: prog(f, F(T('S3_04', "That's how")), F(T('S3_04', "That's how")) + 8)}}>No tool = it simply can't do it. That's how you keep it safe.</div>
        </div>
      </div>
      <Wind size={0} />
    </>
  );
};

const MemoryPanel: React.FC<{f: number; T: TF}> = ({f, T}) => {
  const F = (s: number) => Math.round(s * FPS);
  const forget = F(T('S3_05', 'forgets'));
  const book = F(T('S3_05', 'notebook'));
  const flag = F(T('S3_05', 'I flagged'));
  const hl = prog(f, flag, flag + 8);
  return (
    <>
      <Kick n={4} t="Memory" />
      <div style={{fontSize: 52, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 20}}>
        A notebook: what it decided and why
      </div>
      <div style={{display: 'flex', gap: 18, marginTop: 20, alignItems: 'center'}}>
        <div style={{padding: '12px 20px', borderRadius: 16, background: C.redSoft, color: C.red, fontSize: 26, fontWeight: 800, opacity: pop(f, forget) * (1 - prog(f, book, book + 10))}}>💨 Conversation ended: brain forgets</div>
        <div style={{padding: '12px 20px', borderRadius: 16, background: C.greenSoft, color: C.green, fontSize: 26, fontWeight: 800, opacity: pop(f, book)}}>📓 So Stocky writes it down</div>
      </div>
      <div style={{position: 'relative', marginTop: 24, height: 430, borderRadius: 18, overflow: 'hidden', border: '2px solid #E2E8F0', opacity: pop(f, book)}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 760, transform: 'scale(0.53)', transformOrigin: '0 0'}}>
          <Sheet rows={LOG_ROWS_APPROVED} marks={{r1: hl, r4: hl}} />
        </div>
      </div>
      <div style={{position: 'absolute', right: 56, bottom: 40, display: 'flex', alignItems: 'flex-end', gap: 14, opacity: pop(f, flag)}}>
        <div style={{maxWidth: 560, padding: '18px 24px', borderRadius: 24, borderBottomRightRadius: 6, background: C.navy, color: C.white, fontSize: 28, fontWeight: 700}}>
          “I flagged the pallet jack wheels last week too. This is becoming a pattern.”
        </div>
        <StockyBot size={90} f={f} />
      </div>
    </>
  );
};

const HumanPanel: React.FC<{f: number; T: TF}> = ({f, T}) => {
  const F = (s: number) => Math.round(s * FPS);
  const sig = prog(f, F(T('S3_06', 'signature')), F(T('S3_06', 'signature')) + 30);
  const prep = pop(f, F(T('S3_06', 'The agent prepares')));
  const you = pop(f, F(T('S3_06', "That's you")));
  return (
    <>
      <Kick n={5} t="Human supervisor" />
      <div style={{fontSize: 52, fontWeight: 800}}>The one people forget: <span style={{color: C.blue, opacity: you}}>you</span></div>
      <div style={{position: 'relative', marginTop: 30, height: 330, borderRadius: 18, overflow: 'hidden', border: '2px solid #E2E8F0'}}>
        <div style={{position: 'absolute', left: -225, top: -525, width: 1920, height: 1080, transform: 'scale(0.75)', transformOrigin: '0 0'}}>
          <GmailEmail marks={{total: 1, approve: 0.6 + 0.4 * Math.sin(f / 6)}} />
        </div>
      </div>
      <svg width={520} height={90} viewBox="0 0 520 90" style={{marginTop: 20}}>
        <path d="M10 60 C 60 10, 90 80, 130 40 S 200 20, 230 55 S 300 70, 330 30 S 420 50, 500 40" stroke={C.navy} strokeWidth={5} fill="none" strokeLinecap="round"
          strokeDasharray={900} strokeDashoffset={900 * (1 - sig)} />
      </svg>
      <div style={{fontSize: 26, fontWeight: 600, color: C.slate, marginTop: -6, opacity: sig}}>The manager's signature before the check goes out</div>
      <div style={{marginTop: 24, fontSize: 40, fontWeight: 800, opacity: prep}}>The agent prepares. <span style={{color: C.green}}>The human approves.</span></div>
    </>
  );
};
