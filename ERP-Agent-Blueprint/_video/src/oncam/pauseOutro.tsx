import React from 'react';
import {
  Bot, Brain, CalendarClock, Check, ClipboardList, Download, FileSpreadsheet, GraduationCap, HelpCircle, ListChecks,
  MessageSquare, NotebookPen, Rocket, Sparkles, Target, UserCheck, Workflow, Wrench,
} from 'lucide-react';
import {C, FPS} from '../theme';
import {pop, prog} from '../lib/anim';
import {cue} from '../lib/cues';
import {clipInfo, C12A_END, C12B_START} from '../timeline';
import {Graphic} from '../components/OnCam';
import {Chip, Heading, Item, Kicker, NameBar, Stage} from '../components/Gfx';
import {Sarah} from '../components/Art';

const rel = (a: number, t: number) => Math.round((t - a) * FPS);
const end = (clip: number) => clipInfo(clip).to + 1;
const start = (clip: number) => clipInfo(clip).from - 1;
type I = React.FC<{size?: number; strokeWidth?: number; color?: string}>;

export const KINDS = {
  chatbot: {label: 'Chatbot', color: C.slate, I: MessageSquare as I},
  automation: {label: 'Automation', color: C.blue, I: Workflow as I},
  agent: {label: 'AI Agent', color: C.green, I: Bot as I},
};
type Kind = keyof typeof KINDS;

export const SCENARIOS: {t: string; ans: Kind; why: string}[] = [
  {t: "Every night, copy yesterday's sales orders from Odoo into a Google Sheet", ans: 'automation', why: 'Same steps, every single day'},
  {t: '40 supplier emails: which shipments are delayed, and how will it hit next week’s stock?', ans: 'agent', why: 'Messy messages + judgement'},
  {t: 'Rewrite an email to a late supplier: polite, but firm', ans: 'chatbot', why: 'Just a draft, no systems needed'},
];

/** Scenario card: appears at `at`, answer badge pops at `reveal`. */
export const Scenario: React.FC<{f: number; n: number; at: number; reveal?: number; compact?: boolean; dim?: boolean; big?: boolean}> = ({
  f, n, at, reveal = 1e9, compact, dim, big,
}) => {
  const s = SCENARIOS[n];
  const k = KINDS[s.ans];
  const p = pop(f, at, 15);
  const r = pop(f, reveal, 11);
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 22, padding: compact ? '18px 22px' : '24px 28px', borderRadius: 22, marginBottom: 16,
        background: r > 0.02 ? `${k.color}14` : '#F1F5F9', border: `3px solid ${r > 0.02 ? k.color : 'transparent'}`,
        opacity: p * (dim ? 0.45 : 1), transform: `translateY(${(1 - p) * 30}px)`,
      }}
    >
      <div style={{width: 58, height: 58, borderRadius: 16, background: C.navy, color: C.white, fontSize: 32, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
        {n + 1}
      </div>
      <div style={{flex: 1}}>
        <div style={{fontSize: big ? 38 : compact ? 27 : 30, fontWeight: 650, lineHeight: 1.25}}>{s.t}</div>
        {r > 0.02 && !compact && <div style={{fontSize: 24, fontWeight: 600, color: k.color, marginTop: 6, opacity: r}}>{s.why}</div>}
      </div>
      <div style={{width: 210, display: 'flex', justifyContent: 'flex-end'}}>
        {r > 0.02 ? (
          <span style={{display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderRadius: 999, background: k.color, color: C.white, fontSize: 26, fontWeight: 800, transform: `scale(${r})`}}>
            <k.I size={26} /> {k.label}
          </span>
        ) : (
          <HelpCircle size={44} color={C.slate} strokeWidth={2} />
        )}
      </div>
    </div>
  );
};

const Options: React.FC<{f: number; ats: number[]}> = ({f, ats}) => (
  <div style={{display: 'flex', gap: 16, marginTop: 10}}>
    {(Object.keys(KINDS) as Kind[]).map((key, i) => {
      const k = KINDS[key];
      const p = pop(f, ats[i], 13);
      return (
        <div key={key} style={{flex: 1, padding: '22px 10px', borderRadius: 22, background: `${k.color}14`, border: `3px solid ${k.color}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: p, transform: `scale(${0.8 + 0.2 * p})`}}>
          <k.I size={48} color={k.color} />
          <div style={{fontSize: 28, fontWeight: 800, color: k.color}}>{k.label}</div>
        </div>
      );
    })}
  </div>
);

const PT = 'Pause & Think';

const c10 = (): Graphic[] => {
  const a = cue(10, 'I want to see') - 0.3;
  return [
    {a: cue(10, 'All right') - 0.1, b: a - 0.2, el: ({f}) => <NameBar f={f} title={PT} sub="Agent or not?" />},
    {
      a, b: end(10), side: true,
      el: ({f}) => (
        <Stage f={f}>
          <Kicker f={f} color={C.amber}>{PT}</Kicker>
          <Heading f={f} size={50}>Which tool fits which job?</Heading>
          <div style={{fontSize: 30, color: C.slate, fontWeight: 600, marginTop: 14, opacity: prog(f, rel(a, cue(10, 'three situation')), rel(a, cue(10, 'three situation')) + 8)}}>
            3 situations from BrightLeaf. For each one, pick:
          </div>
          <div style={{marginTop: 30}}>
            <Options f={f} ats={[rel(a, cue(10, 'a chatbot')), rel(a, cue(10, 'simple automation')), rel(a, cue(10, 'or an AI agent'))]} />
          </div>
        </Stage>
      ),
    },
  ];
};

const Board: React.FC<{f: number; ats: number[]; reveals?: number[]; kicker?: React.ReactNode; title?: string}> = ({f, ats, reveals = [], kicker, title = 'Chatbot, automation or AI agent?'}) => (
  <Stage f={f}>
    <Kicker color={C.amber}>{kicker ?? PT}</Kicker>
    <Heading size={44}>{title}</Heading>
    <div style={{marginTop: 30}}>
      {SCENARIOS.map((_, i) => (
        <Scenario key={i} f={f} n={i} at={ats[i]} reveal={reveals[i]} />
      ))}
    </div>
  </Stage>
);

const SKIP = 400; // frames: makes already-shown items appear settled
const c11 = (): Graphic[] => {
  const a = start(11);
  return [{
    a, b: end(11), side: true,
    el: ({f}) => <Board f={f} ats={[rel(a, cue(11, 'Every night')), rel(a, cue(11, 'Second situation')), rel(a, cue(11, 'third one'))]} />,
  }];
};
const c12a = (): Graphic[] => {
  const a = clipInfo(12).from - 1;
  return [{
    a, b: C12A_END + 1, side: true,
    el: ({f}) => (
      <>
        <Board f={f + SKIP} ats={[0, 0, 0]} />
        <div style={{position: 'absolute', left: 96, right: 760, bottom: 150, display: 'flex', justifyContent: 'center'}}>
          <Chip f={f} at={rel(a, cue(12, 'pause this video'))} bg={C.amber} color={C.navy} size={30}>⏸ Pause the video and decide</Chip>
        </div>
      </>
    ),
  }];
};
const c12b = (): Graphic[] => {
  const a = C12B_START - 1;
  return [{
    a, b: end(12), side: true,
    el: ({f}) => <Board f={f + SKIP} ats={[0, 0, 0]} reveals={[rel(a, cue(12, 'simple automation')) + SKIP]} kicker="The answers" />,
  }];
};
const c13 = (): Graphic[] => {
  const a = start(13);
  return [{
    a, b: end(13), side: true,
    el: ({f}) => <Board f={f + SKIP} ats={[0, 0, 0]} reveals={[0, rel(a, cue(13, 'AI agent')) + SKIP]} kicker="The answers" />,
  }];
};
const c14 = (): Graphic[] => {
  const a = start(14);
  return [{
    a, b: end(14), side: true,
    el: ({f}) => <Board f={f + SKIP} ats={[0, 0, 0]} reveals={[0, 0, rel(a, cue(14, 'chatbot')) + SKIP]} kicker="The answers" />,
  }];
};
const c15 = (): Graphic[] => {
  const a = cue(15, 'So the important') - 0.2;
  return [{
    a, b: end(15), side: true,
    el: ({f}) => {
      const skill = rel(a, cue(15, 'The real skill'));
      const act = rel(a, cue(15, 'activity'));
      return (
        <Stage f={f}>
          <Kicker f={f}>The takeaway</Kicker>
          <Heading f={f} size={48}>You don't need an AI agent for everything</Heading>
          <div style={{marginTop: 30}}>
            <Item f={f} at={rel(a, cue(15, 'Sometimes a simple'))} icon={<Workflow size={30} />} color={C.blue}>Clear rule, same steps → <b>Automation</b></Item>
            <Item f={f} at={rel(a, cue(15, 'Sometimes a chatbot'))} icon={<MessageSquare size={30} />} color={C.slate}>Just words to draft → <b>Chatbot</b></Item>
            <Item f={f} at={skill} icon={<Bot size={30} />} color={C.green}>Needs judgement + tools → <b>AI Agent</b></Item>
          </div>
          <div style={{marginTop: 24, fontSize: 36, fontWeight: 800, color: C.navy, opacity: prog(f, skill, skill + 8)}}>
            The real skill: knowing which one to use.
          </div>
          <div style={{marginTop: 24, opacity: prog(f, act, act + 8)}}>
            <Chip bg={C.greenSoft} color={C.green} size={28}><FileSpreadsheet size={28} /> Practise in this video's activity</Chip>
          </div>
        </Stage>
      );
    },
  }];
};

// ---------- OUTRO -------------------------------------------------------------------------------
const PARTS: {t: string; I: I; c: string}[] = [
  {t: 'Brain', I: Brain, c: C.blue},
  {t: 'Instructions', I: ClipboardList, c: C.navy},
  {t: 'Tools', I: Wrench, c: C.amber},
  {t: 'Memory', I: NotebookPen, c: C.green},
  {t: 'Human', I: UserCheck, c: C.red},
];

const Takeaways: React.FC<{f: number; one: number; oneSub: number[]; two: number; parts: number[]; three: number; threeSub: number}> = ({
  f, one, oneSub, two, parts, three, threeSub,
}) => (
  <Stage f={f}>
    <Kicker f={f}>Recap</Kicker>
    <Heading f={f}>3 key takeaways</Heading>
    <div style={{marginTop: 26}}>
      <Item f={f} at={one} icon={<b style={{fontSize: 30}}>1</b>} size={30} align="start">
        <div>Chatbot vs automation vs agent</div>
        <div style={{display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap'}}>
          <Chip f={f} at={oneSub[0]} size={22} bg={C.white}><MessageSquare size={22} /> responds</Chip>
          <Chip f={f} at={oneSub[1]} size={22} bg={C.white}><Workflow size={22} /> follows steps</Chip>
          <Chip f={f} at={oneSub[2]} size={22} bg={C.greenSoft} color={C.green}><Bot size={22} /> reasons & acts</Chip>
        </div>
      </Item>
      <Item f={f} at={two} icon={<b style={{fontSize: 30}}>2</b>} size={30} align="start" color={C.green}>
        <div>The 5 parts of an AI agent</div>
        <div style={{display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap'}}>
          {PARTS.map((p, i) => (
            <Chip key={p.t} f={f} at={parts[i]} size={22} bg={C.white} color={p.c}><p.I size={22} /> {p.t}</Chip>
          ))}
        </div>
      </Item>
      <Item f={f} at={three} icon={<b style={{fontSize: 30}}>3</b>} size={30} align="start" color={C.amber}>
        <div>Why we build it</div>
        <div style={{fontSize: 24, color: C.slate, fontWeight: 600, marginTop: 6, opacity: prog(f, threeSub, threeSub + 8)}}>
          Not to replace Sarah: to give her time for real decisions.
        </div>
      </Item>
    </div>
  </Stage>
);

const c16 = (): Graphic[] => {
  const a = cue(16, 'three main') - 0.6;
  return [
    {a: cue(16, 'All right') - 0.1, b: cue(16, 'Before we wrap') - 0.1, el: ({f}) => <NameBar f={f} title="Recap" sub="What to remember from Video 1" />},
    {
      a, b: end(16), side: true,
      el: ({f}) => (
        <Takeaways f={f} one={rel(a, cue(16, 'First,'))} oneSub={[rel(a, cue(16, 'responds')), rel(a, cue(16, 'automation follows')), rel(a, cue(16, 'AI agents'))]}
          two={rel(a, cue(16, 'Second,'))} parts={[9e3, 9e3, 9e3, 9e3, 9e3]} three={9e3} threeSub={9e3} />
      ),
    },
  ];
};
const c17 = (): Graphic[] => {
  const a = start(17);
  return [{
    a, b: end(17), side: true,
    el: ({f}) => (
      <Takeaways f={f + SKIP} one={0} oneSub={[0, 0, 0]} two={0}
        parts={[cue(17, 'brain'), cue(17, 'instructions'), cue(17, 'tools'), cue(17, 'memory'), cue(17, 'human')].map((t) => rel(a, t) + SKIP)}
        three={rel(a, cue(17, 'And third')) + SKIP} threeSub={rel(a, cue(17, 'The goal')) + SKIP} />
    ),
  }];
};

const Homework: React.FC<{f: number; file: number; p1: number; cats: number[]; check: number; p2: number; hours: number; keep: number; quiz: number}> = ({
  f, file, p1, cats, check, p2, hours, keep, quiz,
}) => (
  <Stage f={f}>
    <Kicker f={f}>Before Video 2</Kicker>
    <Heading f={f} size={48}>Two small activities</Heading>
    <div style={{marginTop: 24, padding: '24px 28px', borderRadius: 24, background: '#F0FDF4', border: `2px solid ${C.green}40`, opacity: pop(f, file), transform: `translateY(${(1 - pop(f, file)) * 24}px)`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
        <div style={{width: 64, height: 64, borderRadius: 16, background: C.green, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><FileSpreadsheet size={36} /></div>
        <div>
          <div style={{fontSize: 30, fontWeight: 800}}>V01 Activity: Agent or Not?</div>
          <div style={{fontSize: 22, color: C.slate, fontWeight: 600}}>V01_Activity_Agent_or_Not.xlsx</div>
        </div>
        <Download size={34} color={C.green} style={{marginLeft: 'auto'}} />
      </div>
      <div style={{marginTop: 18, opacity: prog(f, p1, p1 + 8)}}>
        <div style={{fontSize: 26, fontWeight: 700}}>Part 1 · Classify 20 supply chain tasks</div>
        <div style={{display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap'}}>
          <Chip f={f} at={cats[0]} size={21} bg={C.white}><MessageSquare size={20} /> Chatbot</Chip>
          <Chip f={f} at={cats[1]} size={21} bg={C.white} color={C.blue}><Workflow size={20} /> Automation</Chip>
          <Chip f={f} at={cats[2]} size={21} bg={C.white} color={C.green}><Bot size={20} /> Agent</Chip>
          <Chip f={f} at={cats[3]} size={21} bg={C.white} color={C.slate}>No automation</Chip>
          <Chip f={f} at={check} size={21} bg={C.green} color={C.white}><Check size={20} /> auto-checked</Chip>
        </div>
      </div>
      <div style={{marginTop: 18, opacity: prog(f, p2, p2 + 8)}}>
        <div style={{fontSize: 26, fontWeight: 700}}>Part 2 · Your Automation Wishlist</div>
        <div style={{display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap'}}>
          <Chip f={f} at={hours} size={21} bg={C.white}><CalendarClock size={20} /> hours spent per year</Chip>
          <Chip f={f} at={keep} size={21} bg={C.amberSoft} color="#92400E"><Target size={20} /> keep it for the Video 10 capstone</Chip>
        </div>
      </div>
    </div>
    <div style={{marginTop: 18, padding: '20px 28px', borderRadius: 24, background: C.blueSoft, display: 'flex', alignItems: 'center', gap: 16, opacity: pop(f, quiz), transform: `translateY(${(1 - pop(f, quiz)) * 24}px)`}}>
      <div style={{width: 64, height: 64, borderRadius: 16, background: C.blue, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><ListChecks size={36} /></div>
      <div style={{fontSize: 30, fontWeight: 800}}>Quick 10-question quiz</div>
    </div>
  </Stage>
);

const c18 = (): Graphic[] => {
  const a = cue(18, 'I want you') - 0.3;
  return [{a, b: end(18), side: true, el: ({f}) => <Homework f={f} file={9e3} p1={9e3} cats={[9e3, 9e3, 9e3, 9e3]} check={9e3} p2={9e3} hours={9e3} keep={9e3} quiz={9e3} />}];
};
const c19 = (): Graphic[] => {
  const a = start(19);
  const r = (p: string) => rel(a, cue(19, p)) + SKIP;
  return [{
    a, b: end(19), side: true,
    el: ({f}) => <Homework f={f + SKIP} file={r('download')} p1={r('first part')} cats={[r('chatbot task'), r('automation task'), r('agent task'), r('something that')]} check={r('check your')} p2={r('second part')} hours={9e3} keep={9e3} quiz={9e3} />,
  }];
};
const c20 = (): Graphic[] => {
  const a = start(20);
  const r = (p: string) => rel(a, cue(20, p)) + SKIP;
  const next = cue(20, 'Now in the next') - 0.2;
  return [
    {
      a, b: next - 0.2, side: true,
      el: ({f}) => <Homework f={f + SKIP} file={0} p1={0} cats={[0, 0, 0, 0]} check={0} p2={0} hours={r('calculate')} keep={r('capstone')} quiz={r('quick')} />,
    },
    {a: next, b: end(20), side: true, el: ({f}) => <NextUp f={f} ats={[9e3, 9e3, 9e3, 9e3]} />},
  ];
};
const NextUp: React.FC<{f: number; ats: number[]}> = ({f, ats}) => (
  <Stage f={f}>
    <Kicker f={f}>Next · Video 2</Kicker>
    <Heading f={f} size={50}>ERP Demystified: A Supply Chain Pro's Tour of Odoo</Heading>
    <div style={{marginTop: 30}}>
      <Item f={f} at={ats[0]} icon={<Sparkles size={28} />} color={C.odoo} size={30}>What an ERP really looks like</Item>
      <Item f={f} at={ats[1]} icon={<Rocket size={28} />} color={C.blue} size={30}>Set up your own free Odoo account</Item>
      <Item f={f} at={ats[2]} icon={<FileSpreadsheet size={28} />} color={C.green} size={30}>Load BrightLeaf's 10 products</Item>
      <Item f={f} at={ats[3]} icon={<GraduationCap size={28} />} color={C.amber} size={30}>Your own ERP to build Stocky on</Item>
    </div>
    <div style={{position: 'absolute', right: 50, bottom: 40, opacity: 0.9}}>
      <Sarah size={110} />
    </div>
  </Stage>
);
const c21 = (): Graphic[] => {
  const a = start(21);
  const r = (p: string) => rel(a, cue(21, p)) + SKIP;
  return [{
    a, b: cue(21, "I'll see you") - 0.3, side: true,
    el: ({f}) => <NextUp f={f + SKIP} ats={[r('explore'), r('help you set'), r('load'), r('By the end')]} />,
  }];
};

export const pauseOutroGraphics = (): Record<string, Graphic[]> => ({
  c10: c10(), c11: c11(), c12a: c12a(), c12b: c12b(), c13: c13(), c14: c14(), c15: c15(),
  c16: c16(), c17: c17(), c18: c18(), c19: c19(), c20: c20(), c21: c21(),
});
