import React from 'react';
import {AbsoluteFill} from 'remotion';
import {
  AlertTriangle, Bell, Brain, CalendarX, Check, ClipboardList, Download, FileSpreadsheet, FileText, Hand, HelpCircle, ListChecks, Mail, MessageSquare, NotebookPen,
  Paintbrush, Search, ShieldCheck, Table2, Target, Timer, Truck, UserCheck, Wrench, X,
} from 'lucide-react';
import {C, FPS, INTER} from '../theme';
import {pop, prog} from '../lib/anim';
import {cue} from './cues';
import {clipInfo, C16A_END, C16B_START, C16B_END, QUOTE_LEAD} from './timeline';
import {Graphic} from '../components/OnCam';
import {Chip, Counter, Heading, Item, Kicker, NameBar, Stage as BaseStage} from '../components/Gfx';
/** Stage with bigger content (V06: less empty space in the side cards). */
const Stage: React.FC<{f: number; children: React.ReactNode; style?: React.CSSProperties; z?: number}> = ({f, children, style, z = 1.45}) => (
  <BaseStage f={f} style={style}><div style={{zoom: z}}>{children}</div></BaseStage>
);
import {Face, StockyBot} from '../components/Art';
import {Logo} from '../components/Logo';
import harrisonVo from '../../vo06/harrison06.json';
import jakeVo from '../../vo06/jake.json';

type I = React.FC<{size?: number; color?: string; strokeWidth?: number}>;
const ic = (Ic: I, s = 28) => <Ic size={s} strokeWidth={2.4} />;
const rel = (a: number, t: number) => Math.round((t - a) * FPS);
const end = (clip: number) => clipInfo(clip).to + 1;
const start = (clip: number) => clipInfo(clip).from - 1;
const SKIP = 400;
const NEVER = 1e9;

// ================================================================ INTRO
const STEPS = ['Opens Odoo, exports the stock list', "Finds last week's Excel with reorder points", 'Runs a VLOOKUP, fixes rows that don\'t match', 'Highlights what\'s running low', 'Sends Tom a list'];
const Morning: React.FC<{f: number; mins: number; steps: number[]; boxes: number; week: number; secs: number}> = ({f, mins, steps, boxes, week, secs}) => (
  <Stage f={f} style={{padding: '40px 50px'}} z={1.3}>
    <Kicker f={f}>Every morning</Kicker>
    <div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 4}}>
      <Face name="sarah" size={84} />
      <div style={{padding: '14px 24px', borderRadius: 20, background: C.blueSoft, fontSize: 40, fontWeight: 800}}>“What's running low?”</div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 22, opacity: pop(f, mins)}}>
      <Timer size={40} color={C.red} /><div style={{fontSize: 44, fontWeight: 800, color: C.red}}>~<Counter f={f} to={40} at={mins} dur={24} /> minutes</div>
    </div>
    <div style={{marginTop: 14}}>
      {STEPS.map((s, i) => (
        <div key={s} style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 25, fontWeight: 700, padding: '7px 0', opacity: pop(f, steps[i]), transform: `translateX(${(1 - pop(f, steps[i])) * 30}px)`}}>
          <div style={{width: 34, height: 34, borderRadius: 17, background: '#F1F5F9', fontSize: 18, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>{s}
        </div>
      ))}
    </div>
    <div style={{display: 'flex', gap: 12, marginTop: 14, flexWrap: 'wrap'}}>
      <Chip f={f} at={boxes} size={23} bg={C.amberSoft} color="#92400E">{ic(Truck, 22)} Meanwhile: 200 more boxes ship</Chip>
      <Chip f={f} at={week} size={23} bg={C.redSoft} color={C.red}>{ic(Timer, 22)} 3+ hours every week</Chip>
      <Chip f={f} at={secs} size={23} bg={C.greenSoft} color={C.green}>{ic(MessageSquare, 22)} What if: an answer in seconds?</Chip>
    </div>
  </Stage>
);
const Journey: React.FC<{f: number; ats: number[]; now: number}> = ({f, ats, now}) => (
  <Stage f={f}>
    <Kicker f={f}>Today: Stocky v1</Kicker>
    <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
      <StockyBot size={150} f={f} wave={f < 60} />
      <Heading f={f} size={46}>Our AI intern finally starts work</Heading>
    </div>
    <div style={{marginTop: 26}}>
      {[['Video 1', 'What Stocky should do'], ['Videos 2–4', 'ERP prepared, data organised'], ['Video 5', 'Tools set up: n8n + Claude']].map(([v, t], i) => (
        <Item key={v} f={f} at={ats[i]} icon={ic(Check, 26)} color={C.green} size={26}><b>{v}</b> · {t}</Item>
      ))}
      <Item f={f} at={now} icon={ic(Wrench, 26)} color={C.blue} size={28}><b>Video 6</b> · Connect everything</Item>
    </div>
  </Stage>
);
const Parts: React.FC<{f: number; ats: number[]; table: number}> = ({f, ats, table}) => (
  <Stage f={f} style={{padding: '40px 50px'}} z={1.25}>
    <Kicker f={f}>What Stocky gets today</Kicker>
    {[{t: 'A chat window', s: 'Sarah asks questions', I: MessageSquare as I, c: C.blue},
      {t: 'A brain powered by Claude', s: 'Anthropic Chat Model', logo: 'claude_mark' as const, c: '#D97757'},
      {t: 'A little memory', s: 'follows the conversation', I: NotebookPen as I, c: C.amber},
      {t: 'Tools that read live Odoo data', s: 'the most important part', logo: 'odoo_mark' as const, c: C.green}].map((p, i) => (
      <Item key={p.t} f={f} at={ats[i]} size={27} color={p.c} icon={p.logo ? <div style={{background: C.white, borderRadius: 10, padding: 6, display: 'flex'}}><Logo name={p.logo} w={30} /></div> : p.I ? ic(p.I, 28) : null}>
        <div style={{fontWeight: 800}}>{p.t}</div><div style={{fontSize: 19, color: C.slate}}>{p.s}</div>
      </Item>
    ))}
    <div style={{marginTop: 4, display: 'grid', gridTemplateColumns: '120px 1fr 110px 140px', fontSize: 19, borderRadius: 12, overflow: 'hidden', border: '2px solid #E2E8F0', opacity: pop(f, table)}}>
      {['SKU', 'Product', 'On hand', 'Reorder pt'].map((h) => <div key={h} style={{padding: '6px 12px', background: '#F1F5F9', fontWeight: 800}}>{h}</div>)}
      {['BL-1004', 'Safety Gloves', '420', '600', 'BL-1005', 'Pallet Jack Wheels', '18', '25'].map((c, i) => <div key={i} style={{padding: '6px 12px', fontWeight: 600, color: i % 4 === 2 ? C.red : C.navy}}>{c}</div>)}
    </div>
  </Stage>
);
const Trace: React.FC<{f: number; ats: number[]; src: number; hall: number}> = ({f, ats, src, hall}) => (
  <Stage f={f} z={1.3}>
    <Kicker f={f}>Don't take it on trust</Kicker>
    <Heading f={f} size={44}>Open the execution log</Heading>
    <div style={{marginTop: 22}}>
      {[{t: 'Which tool it called', I: Wrench}, {t: 'What came back from Odoo', I: Download}, {t: 'How it used that to answer', I: Brain}].map((x, i) => (
        <Item key={x.t} f={f} at={ats[i]} icon={ic(x.I as I, 28)} size={28}>{x.t}</Item>
      ))}
    </div>
    <div style={{marginTop: 8, opacity: pop(f, src)}}><Chip size={25} bg={C.greenSoft} color={C.green}>{ic(Search, 24)} Trace every number back to its source</Chip></div>
    <div style={{marginTop: 22, padding: '18px 24px', borderRadius: 20, background: C.redSoft, opacity: pop(f, hall)}}>
      <div style={{fontSize: 30, fontWeight: 800, color: C.red}}>Hallucination</div>
      <div style={{fontSize: 24, fontWeight: 700, color: '#7F1D1D', marginTop: 4}}>An answer that sounds convincing but isn't supported by the facts</div>
    </div>
  </Stage>
);
const CatchFix: React.FC<{f: number; fix: number; idk: number; desk: number; day: number}> = ({f, fix, idk, desk, day}) => (
  <Stage f={f}>
    <Kicker f={f}>We'll catch it on purpose</Kicker>
    <div style={{display: 'flex', gap: 16, marginTop: 6}}>
      <div style={{flex: 1, padding: '18px 20px', borderRadius: 20, background: C.redSoft}}>
        <div style={{fontSize: 20, fontWeight: 800, color: C.red, letterSpacing: 2}}>WEAK PROMPT</div>
        <div style={{fontSize: 24, fontWeight: 700, marginTop: 8}}>“Arrives in about 3 weeks”</div>
        <div style={{fontSize: 19, color: '#7F1D1D', fontWeight: 600, marginTop: 6}}>made up</div>
      </div>
      <div style={{flex: 1, padding: '18px 20px', borderRadius: 20, background: C.greenSoft, opacity: pop(f, fix)}}>
        <div style={{fontSize: 20, fontWeight: 800, color: C.green, letterSpacing: 2}}>BETTER INSTRUCTIONS</div>
        <div style={{fontSize: 24, fontWeight: 700, marginTop: 8, opacity: pop(f, idk)}}>“I don't know.”</div>
        <div style={{fontSize: 19, color: '#14532D', fontWeight: 600, marginTop: 6, opacity: pop(f, idk)}}>honest, with where to check</div>
      </div>
    </div>
    <div style={{marginTop: 30, display: 'flex', alignItems: 'center', gap: 16, opacity: pop(f, desk)}}>
      <Chip size={24} bg="#F1F5F9">Video 5: the desk and the keys</Chip>
      <span style={{fontSize: 30, color: C.slate}}>→</span>
      <Chip size={24} bg={C.blueSoft} color={C.blue} style={{opacity: pop(f, day)}}>Video 6: first day at work</Chip>
    </div>
  </Stage>
);

const c1 = (): Graphic[] => {
  const a = cue(1, 'It sounds') - 0.3;
  const r = (p: string) => rel(a, cue(1, p));
  return [
    {a: 1.4, b: a - 0.4, el: ({f}) => <NameBar f={f} title="Your First Agent: Stocky Reads the ERP" sub="The ERP Agent Blueprint · Video 6" />},
    {a, b: end(1), side: true, el: ({f}) => <Morning f={f} mins={r('answering')} steps={[r('She opens'), r('finds last'), r('runs a'), r('highlights'), r('and finally')]} boxes={NEVER} week={NEVER} secs={NEVER} />},
  ];
};
const c2 = (): Graphic[] => {
  const a = start(2);
  const r = (p: string) => rel(a, cue(2, p)) + SKIP;
  return [{a, b: cue(2, "That's what we") + 0.1, side: true, el: ({f}) => <Morning f={f + SKIP} mins={0} steps={[0, 0, 0, 0, 0]} boxes={r('another 200')} week={r('40 minutes a day')} secs={r('So what if')} />}];
};
const c3 = (): Graphic[] => {
  const a = start(3);
  const r = (p: string) => rel(a, cue(3, p));
  return [{a, b: end(3), side: true, el: ({f}) => <Journey f={f} ats={[r('If you have been'), r('We have prepared'), r('set up the tools')]} now={r('Now we are')} />}];
};
const c4 = (): Graphic[] => {
  const a = start(4);
  const r = (p: string) => rel(a, cue(4, p));
  return [{a, b: end(4), side: true, el: ({f}) => <Parts f={f} ats={[r('a chat window'), r('a brain'), r('a little memory'), r('tools that')]} table={r('and return the')} />}];
};
const c5 = (): Graphic[] => {
  const a = start(5);
  const r = (p: string) => rel(a, cue(5, p));
  return [{a, b: end(5), side: true, el: ({f}) => <Trace f={f} ats={[r('which tool'), r('what information'), r('and how')]} src={NEVER} hall={NEVER} />}];
};
const c6 = (): Graphic[] => {
  const a = start(6);
  const r = (p: string) => rel(a, cue(6, p)) + SKIP;
  return [{a, b: end(6), side: true, el: ({f}) => <Trace f={f + SKIP} ats={[0, 0, 0]} src={r('trace a number')} hall={r('Hallucinations')} />}];
};
const c7 = (): Graphic[] => {
  const a = start(7);
  const r = (p: string) => rel(a, cue(7, p));
  return [{a, b: cue(7, "Let's build") - 0.2, side: true, el: ({f}) => <CatchFix f={f} fix={r('then improve')} idk={r('when to say')} desk={r('If video 5')} day={r('this is the day')} />}];
};

// ================================================================ PROMPT ANATOMY
const PART5 = [
  {t: 'Role', s: 'Who is Stocky?', ex: 'Inventory & procurement assistant for BrightLeaf, working with Sarah and her team', c: C.blue},
  {t: 'Goal', s: 'What should it achieve?', ex: 'Help the team understand stock levels quickly and accurately, so nothing runs out', c: C.green},
  {t: 'Tools', s: 'What can it use, and when?', ex: 'A supplier or lead-time question → get_supplier_info', c: C.amber},
  {t: 'Rules', s: 'How your business works', ex: 'Running low = on hand at or below the reorder point · Never guess a number or invent a delivery date', c: C.red},
  {t: 'Output format', s: 'How the answer looks', ex: 'One-line answer → table (SKU · Product · On hand · Reorder point · Gap), sorted by urgency → Source', c: '#7C3AED'},
];
const Anatomy: React.FC<{f: number; ats: number[]; active: number}> = ({f, ats, active}) => (
  <Stage f={f} style={{padding: '38px 46px'}} z={1.3}>
    <Kicker f={f}>The five-part prompt anatomy</Kicker>
    {PART5.map((p, i) => {
      const on = i === active;
      const vis = pop(f, ats[i]);
      return (
        <div key={p.t} style={{display: 'flex', gap: 18, alignItems: 'flex-start', padding: on ? '14px 18px' : '8px 18px', marginBottom: 8, borderRadius: 18,
          background: on ? `${p.c}14` : 'transparent', border: on ? `3px solid ${p.c}` : '3px solid transparent', opacity: vis * (on || active < 0 ? 1 : 0.55)}}>
          <div style={{width: 46, height: 46, borderRadius: 13, background: p.c, color: C.white, fontSize: 24, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{i + 1}</div>
          <div style={{flex: 1}}>
            <div style={{fontSize: 28, fontWeight: 800}}>{p.t} <span style={{fontSize: 21, fontWeight: 600, color: C.slate}}>· {p.s}</span></div>
            {on && <div style={{fontSize: 22, fontWeight: 700, color: C.navy, marginTop: 6, lineHeight: 1.35, fontFamily: 'monospace'}}>{p.ex}</div>}
          </div>
        </div>
      );
    })}
  </Stage>
);
const c8 = (): Graphic[] => {
  const a = start(8);
  const miss = cue(8, 'But there is') - 0.2;
  const think = cue(8, 'Think about') - 0.2;
  return [
    {a, b: miss - 0.3, side: true, el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f}>Stocky so far</Kicker>
        {[{t: 'Chat window', I: MessageSquare}, {t: 'Brain', I: Brain}, {t: 'Memory', I: NotebookPen}, {t: '3 tools that read Odoo', I: Hand}].map((x, i) => (
          <Item key={x.t} f={f} at={6 + i * 6} icon={ic(x.I as I)} color={C.green} size={28}>{x.t}</Item>))}
      </Stage>)},
    {a: miss, b: think - 0.3, side: true, el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f} color={C.amber}>One thing missing</Kicker>
        <div style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 10}}>
          <HelpCircle size={110} color={C.amber} />
          <Heading f={f} size={52}>It doesn't know what its job is</Heading>
        </div>
      </Stage>)},
    {a: think, b: end(8), side: true, el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f}>A new person joins procurement</Kicker>
        <div style={{display: 'flex', gap: 18, alignItems: 'flex-start', marginTop: 10, opacity: pop(f, rel(think, cue(8, 'You wouldn')))}}>
          <Face name="harrison" size={90} />
          <div style={{padding: '18px 24px', borderRadius: 20, background: C.redSoft, fontSize: 32, fontWeight: 800, color: '#7F1D1D'}}>“Welcome. Go and do inventory stuff.”</div>
        </div>
        <div style={{marginTop: 22, opacity: pop(f, rel(think, cue(8, 'You wouldn')) + 20)}}><Chip size={26} bg={C.redSoft} color={C.red}>{ic(X, 24)} Nobody would onboard like this</Chip></div>
      </Stage>)},
  ];
};
const c9 = (): Graphic[] => {
  const a = start(9);
  const sp = cue(9, "That's exactly") - 0.2;
  const r = (p: string) => rel(a, cue(9, p));
  return [
    {a, b: sp - 0.3, side: true, el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f} color={C.green}>What a good manager explains</Kicker>
        {[['Their role', 'their role'], ["What they're responsible for", 'responsible'], ['Which systems they can use', 'which system'], ['What they must not do', 'and what they'], ['How to report back', 'and how']].map(([t, p]) => (
          <Item key={t} f={f} at={r(p)} icon={ic(Check, 24)} color={C.green} size={27}>{t}</Item>))}
      </Stage>)},
    {a: sp, b: end(9), side: true, el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f}>System prompt</Kicker>
        <div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 6}}><FileText size={70} color={C.blue} /><Heading f={f} size={46}>= Stocky's job description</Heading></div>
        <div style={{display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 34}}>
          {PART5.map((p, i) => <Chip key={p.t} f={f} at={rel(sp, cue(9, '5 parts')) + i * 5} size={26} bg={`${p.c}1F`} color={p.c}>{i + 1} {p.t}</Chip>)}
        </div>
        <div style={{fontSize: 26, fontWeight: 700, color: C.slate, marginTop: 26, opacity: pop(f, rel(sp, cue(9, 'I call this')))}}>The five-part prompt anatomy</div>
      </Stage>)},
  ];
};
const c10 = (): Graphic[] => {
  const g = cue(10, 'Second is') - 0.2;
  return [{a: start(10), b: end(10), side: true, el: ({f, t}) => <Anatomy f={f} ats={[0, rel(start(10), g), NEVER, NEVER, NEVER]} active={t < g ? 0 : 1} />}];
};
const c11 = (): Graphic[] => {
  const ru = cue(11, 'Fourth is') - 0.2;
  return [{a: start(11), b: end(11), side: true, el: ({f, t}) => <Anatomy f={f + SKIP} ats={[0, 0, SKIP, rel(start(11), ru) + SKIP, NEVER]} active={t < ru ? 2 : 3} />}];
};
const c12 = (): Graphic[] => {
  const a = start(12);
  return [{a, b: clipInfo(12).to + 0.5, side: true, el: ({f}) => <Anatomy f={f + SKIP} ats={[0, 0, 0, 0, SKIP]} active={4} />}];
};
const c13 = (): Graphic[] => {
  const a = start(13);
  const r = (p: string) => rel(a, cue(13, p));
  return [{a, b: end(13), side: true, el: ({f}) => (
    <Stage f={f}>
      <Kicker f={f} color={C.amber}>The AI doesn't know your company</Kicker>
      <Item f={f} at={r('It doesn')} icon={ic(Paintbrush, 26)} color={C.red} size={28}>Your team calls the reorder point <b>“the red line”</b></Item>
      <Item f={f} at={r('or that Mr.')} icon={<Face name="harrison" size={44} />} color={C.white} size={28}>Mr. Harrison prefers <b>short, practical updates</b></Item>
      <div style={{marginTop: 18, opacity: pop(f, r('You know'))}}><Chip size={28} bg={C.greenSoft} color={C.green}>{ic(UserCheck, 26)} You know these things. You understand the business.</Chip></div>
    </Stage>
  )}];
};
const c14 = (): Graphic[] => {
  const a = start(14);
  const r = (p: string) => rel(a, cue(14, p));
  return [{a, b: end(14), side: true, el: ({f}) => (
    <Stage f={f}>
      <Kicker f={f}>Writing a good prompt</Kicker>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 34, fontWeight: 800, color: C.slate, textDecoration: 'line-through', marginTop: 6}}>A programming task</div>
      <div style={{fontSize: 44, fontWeight: 800, color: C.navy, marginTop: 14, lineHeight: 1.2, opacity: pop(f, r("it's you"))}}>You, as the manager, explaining the job clearly enough for a new team member</div>
      <div style={{marginTop: 28, opacity: pop(f, r('And that'))}}><Chip size={26} bg={C.blueSoft} color={C.blue}>{ic(FileText, 24)} Next: we put it into Stocky</Chip></div>
    </Stage>
  )}];
};

// ================================================================ THE CONFIDENT INTERN
const JakeCard: React.FC<{f: number; traits: number[]}> = ({f, traits}) => (
  <Stage f={f}>
    <Kicker f={f}>A quick story</Kicker>
    <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
      <Face name="jake" size={140} />
      <div><div style={{fontSize: 48, fontWeight: 800}}>Jake</div><div style={{fontSize: 24, fontWeight: 600, color: C.slate}}>New intern at BrightLeaf</div></div>
    </div>
    <div style={{display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 26}}>
      {['Smart', 'Keen to learn', 'Wants to make a good impression'].map((t, i) => <Chip key={t} f={f} at={traits[i]} size={26} bg={C.blueSoft} color={C.blue}>{t}</Chip>)}
    </div>
  </Stage>
);
const c15 = (): Graphic[] => {
  const a = cue(15, 'Imagine') - 0.3;
  const r = (p: string) => rel(a, cue(15, p));
  return [
    {a: 1.4, b: a - 0.4, el: ({f}) => <NameBar f={f} title="The Confident Intern" sub="What hallucination really is" />},
    {a, b: end(15), side: true, el: ({f}) => <JakeCard f={f} traits={[r('Jake is smart'), r('keen'), r('really wants')]} />},
  ];
};
const c16a = (): Graphic[] => [{a: start(16), b: C16A_END + 0.6, side: true, el: ({f}) => (
  <Stage f={f}>
    <Kicker f={f}>One day…</Kicker>
    <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
      <Face name="harrison" size={130} />
      <div><div style={{fontSize: 42, fontWeight: 800}}>Mr. Harrison</div><div style={{fontSize: 24, fontWeight: 600, color: C.slate}}>walks over and asks Jake…</div></div>
    </div>
  </Stage>
)}];
const c16b = (): Graphic[] => {
  const a = C16B_START - 0.6;
  const r = (p: string) => rel(a, cue(16, p));
  return [{a, b: C16B_END + 0.6, side: true, el: ({f}) => (
    <Stage f={f} z={1.35}>
      <div style={{display: 'flex', alignItems: 'center', gap: 20}}><Face name="jake" size={100} /><Heading f={f} size={44}>Jake doesn't actually know</Heading></div>
      <div style={{marginTop: 24}}>
        <Item f={f} at={r('He hasn')} icon={ic(X, 26)} color={C.red} size={27}>Hasn't checked the purchase order</Item>
        <Item f={f} at={r('and he doesn')} icon={ic(CalendarX, 26)} color={C.red} size={27}>No confirmed delivery date</Item>
        <Item f={f} at={r('But he also')} icon={ic(AlertTriangle, 26)} color={C.amber} size={27}>Doesn't want to disappoint Mr. Harrison</Item>
      </div>
    </Stage>
  )}];
};
const c17 = (): Graphic[] => {
  const a = start(17);
  const r = (p: string) => rel(a, cue(17, p));
  return [{a, b: end(17), side: true, el: ({f}) => (
    <Stage f={f} z={1.3}>
      <Kicker f={f}>It sounds confident</Kicker>
      {[{d: 'Tuesday', t: '“Tuesday, sir.” (a guess)', c: C.amber, at: 4}, {d: 'Wednesday', t: 'Installation promised to a customer', c: C.blue, at: r('promises')}].map((x) => (
        <div key={x.d} style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 14, opacity: pop(f, x.at)}}>
          <div style={{width: 150, padding: '10px 0', textAlign: 'center', borderRadius: 14, background: x.c, color: C.white, fontSize: 24, fontWeight: 800}}>{x.d}</div>
          <div style={{fontSize: 27, fontWeight: 700}}>{x.t}</div>
        </div>))}
      <div style={{marginTop: 12, padding: '18px 22px', borderRadius: 20, background: C.redSoft, opacity: pop(f, r("But there's"))}}>
        <div style={{fontSize: 30, fontWeight: 800, color: C.red}}>Reality</div>
        <div style={{fontSize: 25, fontWeight: 700, color: '#7F1D1D', marginTop: 4}}>The lights haven't left the factory. <span style={{opacity: pop(f, r('The supply'))}}>Lead time: <b>28 days</b>.</span></div>
      </div>
      <div style={{marginTop: 20, opacity: pop(f, r('He simply'))}}><Chip size={26} bg={C.amberSoft} color="#92400E">Plausible ≠ true. He just didn't have the facts.</Chip></div>
    </Stage>
  )}];
};
const NextWord: React.FC<{f: number; at: number}> = ({f, at}) => {
  const opts = [['Tuesday', 41], ['next week', 27], ['Friday', 18], ['in 28 days', 9]] as const;
  return (
    <div style={{marginTop: 22, padding: '18px 22px', borderRadius: 18, background: '#F8FAFC', opacity: pop(f, at)}}>
      <div style={{fontSize: 26, fontWeight: 700}}>“The LED lights arrive <span style={{color: C.blue}}>___</span>”</div>
      {opts.map(([w, p], i) => (
        <div key={w} style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 10}}>
          <div style={{width: 160, fontSize: 22, fontWeight: 700}}>{w}</div>
          <div style={{flex: 1, height: 24, borderRadius: 8, background: '#E2E8F0', overflow: 'hidden'}}><div style={{width: `${p * 2 * prog(f, at + 6 + i * 4, at + 26 + i * 4)}%`, height: '100%', background: i === 0 ? C.amber : '#94A3B8'}} /></div>
          <div style={{width: 60, fontSize: 20, fontWeight: 700, color: C.slate}}>{p}%</div>
        </div>))}
      <div style={{fontSize: 18, fontWeight: 600, color: C.slate, marginTop: 8}}>Illustration: the most likely-sounding words win</div>
    </div>
  );
};
const c18 = (): Graphic[] => {
  const a = start(18);
  const r = (p: string) => rel(a, cue(18, p));
  return [{a, b: end(18), side: true, el: ({f}) => (
    <Stage f={f} style={{padding: '40px 50px'}} z={1.2}>
      <Kicker f={f} color={C.red}>AI hallucination</Kicker>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: pop(f, r('Models like'))}}>
        <Logo name="claude_mark" w={46} /><Logo name="openai_mark" w={46} />
        <div style={{fontSize: 30, fontWeight: 800}}>Predict the next likely words</div>
      </div>
      <NextWord f={f} at={r('generate')} />
      <div style={{marginTop: 18, opacity: pop(f, r('but when'))}}><Chip size={24} bg={C.redSoft} color={C.red}>{ic(AlertTriangle, 22)} No information → still a very convincing answer</Chip></div>
    </Stage>
  )}];
};
const c19 = (): Graphic[] => {
  const a = start(19);
  const r = (p: string) => rel(a, cue(19, p));
  return [{a, b: end(19), side: true, el: ({f}) => (
    <Stage f={f}>
      <Kicker f={f} color={C.red}>It might invent…</Kicker>
      <Item f={f} at={r('a delivery')} icon={ic(CalendarX, 26)} color={C.red} size={28}>A delivery date</Item>
      <Item f={f} at={r('a store')} icon={ic(Table2, 26)} color={C.red} size={28}>A stock quantity</Item>
      <Item f={f} at={r('or even')} icon={ic(Truck, 26)} color={C.red} size={28}>A supplier name</Item>
      <div style={{marginTop: 12, opacity: pop(f, r('And it can'))}}><Chip size={26} bg={C.amberSoft} color="#92400E">…in the same confident tone as a correct answer</Chip></div>
    </Stage>
  )}];
};
const c20 = (): Graphic[] => {
  const a = start(20);
  const h = cue(20, 'So how') - 0.2;
  const r = (p: string) => rel(a, cue(20, p));
  return [
    {a, b: h - 0.3, side: true, el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f} color={C.red}>In supply chain</Kicker>
        {[{x: 'Made-up delivery date', y: 'Broken promise to a customer', at: 4, y2: r('can become')}, {x: 'Made-up stock number', y: 'Stock-out or an unnecessary rush order', at: r('A made-up stock'), y2: r('can lead')}].map((v) => (
          <div key={v.x} style={{marginBottom: 22, opacity: pop(f, v.at)}}>
            <div style={{fontSize: 30, fontWeight: 800}}>{v.x}</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, fontWeight: 700, color: C.red, marginTop: 6, opacity: pop(f, v.y2)}}>→ {v.y}</div>
          </div>))}
      </Stage>)},
    {a: h, b: end(20), side: true, el: ({f}) => <Habits f={f} ats={[NEVER, NEVER, NEVER]} />},
  ];
};
const Habits: React.FC<{f: number; ats: number[]}> = ({f, ats}) => (
  <Stage f={f}>
    <Kicker f={f} color={C.green}>Reduce the risk</Kicker>
    <Heading f={f} size={48}>Three habits</Heading>
    <div style={{marginTop: 22}}>
      <Item f={f} at={ats[0]} icon={<b style={{fontSize: 26}}>1</b>} color={C.blue} size={27}>Give the agent the <b>real information</b> through its tools</Item>
      <Item f={f} at={ats[1]} icon={<b style={{fontSize: 26}}>2</b>} color={C.amber} size={27}>Instructions: answer <b>only from the data the tools return</b></Item>
      <Item f={f} at={ats[2]} icon={<b style={{fontSize: 26}}>3</b>} color={C.green} size={27}>Make it OK to say <b>“I don't know”</b></Item>
    </div>
  </Stage>
);
const c21 = (): Graphic[] => {
  const a = start(21);
  const r = (p: string) => rel(a, cue(21, p)) + SKIP;
  return [{a, b: end(21), side: true, el: ({f}) => <Habits f={f + SKIP} ats={[r('First'), r('Second'), r('And third')]} />}];
};
const c22 = (): Graphic[] => {
  const a = start(22);
  const t = cue(22, "Let's put") - 0.2;
  const r = (p: string) => rel(t, cue(22, p));
  return [
    {a, b: t - 0.3, side: true, el: ({f}) => (
      <Stage f={f}>
        <div style={{display: 'flex', gap: 16}}>
          <div style={{flex: 1, padding: '24px 22px', borderRadius: 22, background: C.greenSoft}}>
            <ShieldCheck size={44} color={C.green} />
            <div style={{fontSize: 34, fontWeight: 800, marginTop: 10}}>“I don't know.”</div>
            <div style={{fontSize: 22, fontWeight: 700, color: '#14532D', marginTop: 6}}>Much more useful</div>
          </div>
          <div style={{flex: 1, padding: '24px 22px', borderRadius: 22, background: C.redSoft, opacity: pop(f, 20)}}>
            <AlertTriangle size={44} color={C.red} />
            <div style={{fontSize: 34, fontWeight: 800, marginTop: 10}}>A confident guess</div>
            <div style={{fontSize: 22, fontWeight: 700, color: '#7F1D1D', marginTop: 6}}>Makes something up</div>
          </div>
        </div>
      </Stage>)},
    {a: t, b: end(22), side: true, el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f}>Let's put it to the test</Kicker>
        <Item f={f} at={r('We will')} icon={ic(FileText, 26)} color={C.red} size={28}>Give Stocky a weak instruction</Item>
        <Item f={f} at={r('see what')} icon={ic(Search, 26)} color={C.amber} size={28}>See what it invents</Item>
        <Item f={f} at={r('then fix')} icon={ic(Wrench, 26)} color={C.green} size={28}>Then fix it</Item>
      </Stage>)},
  ];
};

/** Full-screen quote in the character's own voice (presenter hidden, raw audio muted). */
type HW = {w: string; t: number; d: number};
export const QuoteScene: React.FC<{f: number; who: 'harrison' | 'jake'; name: string; role: string; vo: {text: string; duration: number; words: HW[]}; kicker: string; to: string}> = ({f, who, name, role, vo, kicker, to}) => {
  const t = f / FPS - QUOTE_LEAD;
  const toks = vo.text.split(/\s+/);
  const speaking = t > -0.1 && t < vo.duration - 0.15;
  const pulse = speaking ? 0.5 + 0.5 * Math.sin(f / 3.2) : 0;
  const shown = (i: number) => (vo.words[i] ? t >= vo.words[i].t - 0.05 : t >= vo.duration - 0.5);
  return (
    <AbsoluteFill style={{fontFamily: INTER, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: prog(f, 0, 12)}}>
        <div style={{fontSize: 26, fontWeight: 800, letterSpacing: 4, color: C.hi, textTransform: 'uppercase'}}>{kicker}</div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 60, marginTop: 10, padding: '0 150px'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, opacity: pop(f, 0, 16)}}>
          <div style={{position: 'relative', width: 240, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{position: 'absolute', inset: -14 - 10 * pulse, borderRadius: '50%', border: `4px solid ${C.hi}`, opacity: speaking ? 0.35 + 0.4 * pulse : 0}} />
            <Face name={who} size={240} />
          </div>
          <div style={{fontSize: 38, fontWeight: 800, color: C.white, marginTop: 26}}>{name}</div>
          <div style={{fontSize: 24, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: 6}}>{role}</div>
        </div>
        <div style={{position: 'relative', maxWidth: 1000, padding: '44px 52px', borderRadius: 34, background: C.white, boxShadow: '0 30px 80px rgba(2,6,23,0.5)',
          opacity: pop(f, 6, 16), transform: `translateX(${(1 - pop(f, 6, 16)) * 40}px)`}}>
          <div style={{position: 'absolute', left: -26, top: '50%', marginTop: -26, width: 0, height: 0, borderTop: '26px solid transparent', borderBottom: '26px solid transparent', borderRight: `28px solid ${C.white}`}} />
          <div style={{fontSize: 58, fontWeight: 800, lineHeight: 1.28, color: C.navy, letterSpacing: -0.5}}>
            {toks.map((w, i) => <span key={i} style={{opacity: shown(i) ? 1 : 0.18}}>{i === 0 ? '“' : ''}{w}{i === toks.length - 1 ? '”' : ''} </span>)}
          </div>
          <div style={{fontSize: 26, fontWeight: 700, color: C.slate, marginTop: 18, opacity: prog(f, 10, 20)}}>{to}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export const HarrisonQuote: React.FC<{f: number}> = ({f}) => <QuoteScene f={f} who="harrison" name="Mr. Harrison" role="Operations Director" vo={harrisonVo as never} kicker="The Confident Intern" to="Mr. Harrison, asking Jake" />;
export const JakeQuote: React.FC<{f: number}> = ({f}) => <QuoteScene f={f} who="jake" name="Jake" role="The confident intern" vo={jakeVo as never} kicker="The Confident Intern" to="Jake, without checking anything" />;

// ================================================================ OUTRO
const CAN = ['Connect to Odoo', 'Read live inventory', 'Compare stock to reorder points', 'Look up supplier details', 'Answer in plain English', 'Show where answers came from', "Admit when it doesn't know"];
const Recap: React.FC<{f: number; ats: number[]; code: number}> = ({f, ats, code}) => (
  <Stage f={f} style={{padding: '38px 48px'}} z={1.3}>
    <Kicker f={f}>What we built</Kicker>
    <div style={{display: 'flex', alignItems: 'center', gap: 18}}><StockyBot size={90} f={f} /><Heading f={f} size={42}>Stocky can now…</Heading></div>
    <div style={{marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 18px'}}>
      {CAN.map((t, i) => (
        <div key={t} style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 23, fontWeight: 700, padding: '10px 14px', borderRadius: 14, background: i > 4 ? C.greenSoft : '#F1F5F9', opacity: pop(f, ats[i])}}>
          <Check size={22} color={C.green} />{t}</div>))}
    </div>
    <div style={{marginTop: 20, opacity: pop(f, code)}}><Chip size={28} bg={C.blueSoft} color={C.blue}>0 lines of code</Chip></div>
  </Stage>
);
const Takeaways: React.FC<{f: number; ats: number[]; active: number; subs?: number[]}> = ({f, ats, active, subs = [NEVER, NEVER, NEVER]}) => {
  const T3 = [
    {t: 'An agent needs more than a brain', s: ['Chat Trigger · Claude · Simple Memory · 3 Odoo tools', 'Each tool: clear name, clear description, only the fields it needs']},
    {t: 'The system prompt is the job description', s: ['Role · Goal · Tools · Rules · Output format', 'Rules = how your business works ("running low")']},
    {t: 'Trust, but verify', s: ['Check the execution log · compare with Odoo', 'Test with questions it shouldn\'t be able to answer']},
  ];
  return (
    <Stage f={f} style={{padding: '40px 48px'}} z={1.4}>
      <Kicker f={f}>3 things to remember</Kicker>
      {T3.map((x, i) => (
        <div key={x.t} style={{display: 'flex', gap: 18, padding: '16px 18px', marginBottom: 12, borderRadius: 20, background: i === active ? C.blueSoft : '#F8FAFC',
          border: `3px solid ${i === active ? C.blue : 'transparent'}`, opacity: pop(f, ats[i]) * (i === active ? 1 : 0.6)}}>
          <div style={{width: 48, height: 48, borderRadius: 14, background: C.blue, color: C.white, fontSize: 26, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{i + 1}</div>
          <div>
            <div style={{fontSize: 28, fontWeight: 800}}>{x.t}</div>
            {i === active && x.s.map((s, k) => <div key={s} style={{fontSize: 21, fontWeight: 700, color: C.slate, marginTop: 6, opacity: pop(f, k === 0 ? subs[0] : subs[1])}}>{s}</div>)}
          </div>
        </div>
      ))}
    </Stage>
  );
};
const Activity: React.FC<{f: number; a1: number; a2: number; chips: number[]; goal: number; quiz: number}> = ({f, a1, a2, chips, goal, quiz}) => (
  <Stage f={f} style={{padding: '40px 48px'}} z={1.35}>
    <Kicker f={f}>Put it into practice</Kicker>
    <div style={{padding: '18px 22px', borderRadius: 20, background: C.blueSoft, opacity: pop(f, a1)}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}><div style={{width: 54, height: 54, borderRadius: 14, background: '#2B579A', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><FileText size={30} color={C.white} /></div>
        <div><div style={{fontSize: 26, fontWeight: 800}}>Stocky Prompt Builder</div><div style={{fontSize: 18, color: C.slate, fontWeight: 600}}>V06_Activity_Stocky_Prompt_Builder.docx</div></div></div>
      <div style={{fontSize: 20, fontWeight: 700, color: C.navy, marginTop: 10}}>Stocky's prompt as an example + your own. Define “running low”.</div>
    </div>
    <div style={{padding: '18px 22px', borderRadius: 20, background: C.greenSoft, marginTop: 14, opacity: pop(f, a2)}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}><div style={{width: 54, height: 54, borderRadius: 14, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><FileSpreadsheet size={30} color={C.white} /></div>
        <div><div style={{fontSize: 26, fontWeight: 800}}>Test Question Bank</div><div style={{fontSize: 18, color: C.slate, fontWeight: 600}}>V06_Activity_Test_Question_Bank.xlsx</div></div></div>
      <div style={{display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap'}}>
        {['Ask all 20 questions', 'Mark pass / fail', 'Sheet calculates the pass rate'].map((t, i) => <Chip key={t} f={f} at={chips[i]} size={19} bg={C.white}>{t}</Chip>)}
      </div>
    </div>
    <div style={{display: 'flex', gap: 12, marginTop: 14}}>
      <Chip f={f} at={goal} size={24} bg={C.amberSoft} color="#92400E">{ic(Target, 22)} Aim: 18 / 20 or better</Chip>
      <Chip f={f} at={quiz} size={24} bg={C.blueSoft} color={C.blue}>{ic(ListChecks, 22)} Then: Video 6 quiz</Chip>
    </div>
  </Stage>
);
const Next7: React.FC<{f: number; read: number; act: number; prep: number; human: number; step: number}> = ({f, read, act, prep, human, step}) => (
  <Stage f={f} z={1.3}>
    <Kicker f={f}>Next · Video 7</Kicker>
    <Heading f={f} size={44}>Agents That Take Action</Heading>
    <div style={{fontSize: 24, fontWeight: 700, color: C.slate, marginTop: 4}}>Draft purchase orders with human approval</div>
    <div style={{marginTop: 22}}>
      <Item f={f} at={read} icon={ic(Check, 24)} color={C.green} size={26}>Today: Stocky can <b>read</b> the ERP</Item>
      <Item f={f} at={act} icon={ic(X, 24)} color={C.red} size={26}>It can't take action yet: Sarah creates the PO</Item>
      <Item f={f} at={prep} icon={ic(ClipboardList, 24)} color={C.blue} size={26}>Next: Stocky prepares the PO in Odoo</Item>
      <Item f={f} at={human} icon={ic(UserCheck, 24)} color={C.amber} size={26}>…and stops for your approval first</Item>
    </div>
    <div style={{fontSize: 24, fontWeight: 800, color: C.blue, marginTop: 6, opacity: pop(f, step)}}>From an agent that reads → to one that acts responsibly</div>
  </Stage>
);
const c23 = (): Graphic[] => {
  const a = cue(23, 'Stocky can') - 0.2;
  const r = (p: string) => rel(a, cue(23, p));
  return [
    {a: 1.2, b: a - 0.1, el: ({f}) => <NameBar f={f} title="Recap: Stocky can read" sub="Video 6 · Your First Agent" />},
    {a, b: end(23), side: true, el: ({f}) => <Recap f={f} ats={[0, r('read live'), r('compare'), r('look up'), r('and answer'), NEVER, NEVER]} code={NEVER} />},
  ];
};
const c24 = (): Graphic[] => {
  const a = start(24);
  const b = cue(24, 'Before we') - 0.2;
  const r = (p: string) => rel(a, cue(24, p)) + SKIP;
  return [
    {a, b: b - 0.3, side: true, el: ({f}) => <Recap f={f + SKIP} ats={[0, 0, 0, 0, 0, r('it can show'), r('and admit')]} code={r('We did')} />},
    {a: b, b: end(24), side: true, el: ({f}) => <Takeaways f={f} ats={[6, 12, 18]} active={-1} />},
  ];
};
const c25 = (): Graphic[] => {
  const a = start(25);
  const r = (p: string) => rel(a, cue(25, p));
  return [{a, b: end(25), side: true, el: ({f}) => <Takeaways f={f + SKIP} ats={[0, 0, 0]} active={0} subs={[r('Stocky has') + SKIP, r('Each tool') + SKIP]} />}];
};
const c26 = (): Graphic[] => {
  const a = start(26);
  const r = (p: string) => rel(a, cue(26, p));
  return [{a, b: end(26), side: true, el: ({f}) => <Takeaways f={f + SKIP} ats={[0, 0, 0]} active={1} subs={[r('Remember') + SKIP, r('The rules') + SKIP]} />}];
};
const c27 = (): Graphic[] => {
  const a = start(27);
  const p = cue(27, 'Now let') - 0.2;
  const r = (x: string) => rel(a, cue(27, x));
  return [
    {a, b: p - 0.3, side: true, el: ({f}) => <Takeaways f={f + SKIP} ats={[0, 0, 0]} active={2} subs={[r('check the') + SKIP, r('and trust') + SKIP]} />},
    {a: p, b: end(27), side: true, el: ({f}) => <Activity f={f} a1={NEVER} a2={NEVER} chips={[NEVER, NEVER, NEVER]} goal={NEVER} quiz={NEVER} />},
  ];
};
const c28 = (): Graphic[] => {
  const a = start(28);
  return [{a, b: end(28), side: true, el: ({f}) => <Activity f={f + SKIP} a1={rel(a, cue(28, 'First')) + SKIP} a2={NEVER} chips={[NEVER, NEVER, NEVER]} goal={NEVER} quiz={NEVER} />}];
};
const c29 = (): Graphic[] => {
  const a = start(29);
  const r = (p: string) => rel(a, cue(29, p)) + SKIP;
  return [{a, b: end(29), side: true, el: ({f}) => <Activity f={f + SKIP} a1={0} a2={r('Next')} chips={[r('ask'), r('mark each'), r('and let')]} goal={NEVER} quiz={NEVER} />}];
};
const c30 = (): Graphic[] => {
  const a = start(30);
  const r = (p: string) => rel(a, cue(30, p)) + SKIP;
  return [{a, b: cue(30, 'And here') - 0.2, side: true, el: ({f}) => <Activity f={f + SKIP} a1={0} a2={0} chips={[0, 0, 0]} goal={r('Aim')} quiz={r('then take')} />}];
};
const c31 = (): Graphic[] => {
  const a = start(31);
  const r = (p: string) => rel(a, cue(31, p));
  return [{a, b: end(31), side: true, el: ({f}) => <Next7 f={f} read={r('Right now')} act={r('but it can')} prep={r('In the next')} human={r('It will stop')} step={NEVER} />}];
};
const c32 = (): Graphic[] => {
  const a = start(32);
  const r = (p: string) => rel(a, cue(32, p)) + SKIP;
  return [{a, b: cue(32, "I'll see") - 0.2, side: true, el: ({f}) => <Next7 f={f + SKIP} read={0} act={0} prep={0} human={0} step={r('moving from')} />}];
};

export const v06Graphics = (): Record<string, Graphic[]> => ({
  c1: c1(), c2: c2(), c3: c3(), c4: c4(), c5: c5(), c6: c6(), c7: c7(), c8: c8(), c9: c9(), c10: c10(), c11: c11(), c12: c12(), c13: c13(), c14: c14(),
  c15: c15(), c16a: c16a(), c16b: c16b(), c17: c17(), c18: c18(), c19: c19(), c20: c20(), c21: c21(), c22: c22(),
  c23: c23(), c24: c24(), c25: c25(), c26: c26(), c27: c27(), c28: c28(), c29: c29(), c30: c30(), c31: c31(), c32: c32(),
});
export {Bell, Mail};
