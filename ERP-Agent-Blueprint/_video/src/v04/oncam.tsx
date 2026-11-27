import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import harrisonVo from '../../vo04/harrison.json';
import {HARRISON_LEAD} from './timeline';
import {
  AlertTriangle, ArrowRight, Check, Clock, Copy, Database, FileSpreadsheet, Fingerprint, Hash, Layers, ListChecks, Paintbrush, Presentation,
  Rows3, ShoppingCart, Sparkles, Table2, Tags, Timer, X,
} from 'lucide-react';
import {C, FPS, INTER} from '../theme';
import {pop, prog} from '../lib/anim';
import {cue} from './cues';
import {clipInfo} from './timeline';
import {Graphic} from '../components/OnCam';
import {Chip, Counter, Heading, Item, Kicker, NameBar, Stage} from '../components/Gfx';
import {Face, StockyBot} from '../components/Art';

type I = React.FC<{size?: number; color?: string; strokeWidth?: number}>;
const ic = (Ic: I, s = 30) => <Ic size={s} strokeWidth={2.4} />;
const rel = (a: number, t: number) => Math.round((t - a) * FPS);
const end = (clip: number) => clipInfo(clip).to + 1;
const start = (clip: number) => clipInfo(clip).from - 1;
/** Continuation offset: a graphic that carries on from the previous clip renders as if already fully built. */
const SKIP = 400;

// ================================================================ INTRO: the stretch-wrap story
const StretchStory: React.FC<{f: number; money: number}> = ({f, money}) => (
  <Stage f={f}>
    <Kicker f={f}>A real BrightLeaf story</Kicker>
    <Heading f={f} size={52}>200 rolls of stretch wrap they didn't need</Heading>
    <div style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 40, opacity: pop(f, money)}}>
      <div style={{fontSize: 96, fontWeight: 800, color: C.red, letterSpacing: -2}}>$<Counter f={f} to={1840} at={money} dur={30} /></div>
      <div style={{fontSize: 30, fontWeight: 700, color: C.slate, lineHeight: 1.3}}>of film sitting in the<br />Columbus warehouse</div>
    </div>
  </Stage>
);
const SheetRow: React.FC<{f: number; low: number; po: number; problem: number}> = ({f, low, po, problem}) => (
  <Stage f={f}>
    <Kicker f={f}>What the stock sheet said</Kicker>
    <div style={{display: 'grid', gridTemplateColumns: '150px 1fr 120px 170px', fontSize: 28, marginTop: 10, borderRadius: 18, overflow: 'hidden', border: '2px solid #E2E8F0', opacity: pop(f, 4)}}>
      {['SKU', 'Product', 'Qty', 'Reorder pt'].map((h) => <div key={h} style={{padding: '14px 18px', background: '#F1F5F9', fontWeight: 800}}>{h}</div>)}
      {['BL-1003', 'Stretch Wrap Film', '21', '200'].map((c, i) => <div key={i} style={{padding: '16px 18px', fontWeight: i === 2 ? 800 : 600, color: i === 2 ? C.red : C.navy, background: i === 2 ? C.redSoft : C.white}}>{c}</div>)}
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 32}}>
      <Chip f={f} at={low} bg={C.redSoft} color={C.red} size={28}>{ic(AlertTriangle, 26)} Flagged LOW</Chip>
      <ArrowRight size={34} color={C.slate} style={{opacity: pop(f, po)}} />
      <Chip f={f} at={po} bg={C.blueSoft} color={C.blue} size={28}>{ic(ShoppingCart, 26)} Purchase order sent</Chip>
    </div>
    <div style={{marginTop: 34, fontSize: 36, fontWeight: 800, color: C.amber, opacity: prog(f, problem, problem + 8)}}>But there was one problem…</div>
  </Stage>
);
const Cartons: React.FC<{f: number; c: number; loose: number; total: number; unit: number}> = ({f, c, loose, total, unit}) => (
  <Stage f={f}>
    <Kicker f={f}>What the warehouse actually counted</Kicker>
    <div style={{display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', fontSize: 44, fontWeight: 800, marginTop: 16}}>
      <span style={{opacity: pop(f, c)}}><span style={{color: C.blue}}>21</span> cartons × 12</span>
      <span style={{opacity: pop(f, loose)}}>+ <span style={{color: C.blue}}>8</span> loose</span>
      <span style={{opacity: pop(f, total)}}>= <span style={{color: C.green}}>260 rolls</span></span>
    </div>
    <div style={{display: 'flex', gap: 10, marginTop: 30, flexWrap: 'wrap', opacity: pop(f, c)}}>
      {Array.from({length: 21}, (_, i) => <div key={i} style={{width: 34, height: 34, borderRadius: 7, background: '#D6B98C', border: '2px solid #A47E4B', opacity: pop(f, c + i, 8)}} />)}
      {Array.from({length: 8}, (_, i) => <div key={`l${i}`} style={{width: 16, height: 34, borderRadius: 8, background: '#93C5FD', opacity: pop(f, loose + i * 2, 8)}} />)}
    </div>
    <div style={{marginTop: 34, display: 'flex', gap: 14, flexWrap: 'wrap'}}>
      <Chip f={f} at={total + 10} bg={C.greenSoft} color={C.green} size={28}>{ic(Check, 26)} Plenty of stock</Chip>
      <Chip f={f} at={unit} bg={C.amberSoft} color="#92400E" size={28}>{ic(Tags, 26)} The number was right. The unit was missing.</Chip>
    </div>
  </Stage>
);
const AgentReads: React.FC<{f: number; hour: number; po: number; wrong: number}> = ({f, hour, po, wrong}) => (
  <Stage f={f}>
    <Kicker f={f}>Now give that sheet to an AI agent</Kicker>
    <div style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 10}}>
      <StockyBot size={150} f={f} />
      <div style={{fontSize: 34, fontWeight: 800, lineHeight: 1.3}}>It doesn't stop<br />to ask what "21" means.</div>
    </div>
    <div style={{display: 'flex', gap: 14, marginTop: 30, flexWrap: 'wrap'}}>
      <Chip f={f} at={hour} bg={C.blueSoft} color={C.blue} size={28}>{ic(Clock, 26)} Reads it every hour</Chip>
      <Chip f={f} at={po} bg={C.blueSoft} color={C.blue} size={28}>{ic(Timer, 26)} Raises a PO in seconds</Chip>
    </div>
    <div style={{marginTop: 30, padding: '20px 26px', borderRadius: 20, background: C.redSoft, color: '#7F1D1D', fontSize: 30, fontWeight: 800, opacity: pop(f, wrong)}}>
      Messy data → the wrong decision, very confidently and very quickly
    </div>
  </Stage>
);
const ThisVideo: React.FC<{f: number; ats: number[]; messy: number[]; nocode: number}> = ({f, ats, messy, nocode}) => (
  <Stage f={f}>
    <Kicker f={f}>In this video</Kicker>
    <Item f={f} at={ats[0]} icon={ic(FileSpreadsheet, 30)} color={C.green} size={30}>Two tables for Stocky: <b>Suppliers</b> + <b>Stock_Log</b></Item>
    <Item f={f} at={ats[1]} icon={ic(ListChecks, 30)} size={30}>Five rules for agent-safe data</Item>
    <Item f={f} at={ats[2]} icon={ic(Sparkles, 30)} color={C.amber} size={30}>Clean up a messy BrightLeaf export</Item>
    <div style={{display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 6, marginLeft: 80}}>
      {['merged cells', 'duplicates', 'mixed units', '"approx 300"'].map((t, i) => <Chip key={t} f={f} at={messy[i]} size={22} bg={C.redSoft} color={C.red}>{t}</Chip>)}
    </div>
    <div style={{display: 'flex', gap: 10, marginTop: 26, opacity: pop(f, nocode)}}>
      {['No coding', 'No SQL', 'Nothing to install'].map((t) => <Chip key={t} size={24} bg={C.greenSoft} color={C.green}>{ic(Check, 22)} {t}</Chip>)}
    </div>
  </Stage>
);

const c1 = (): Graphic[] => {
  const a = cue(1, 'Last month') - 0.2;
  return [
    {a: 1.4, b: a - 0.4, el: ({f}) => <NameBar f={f} title="Databases Without Fear: Your Data's Home" sub="The ERP Agent Blueprint · Video 4" />},
    {a, b: end(1), side: true, el: ({f}) => <StretchStory f={f} money={rel(a, cue(1, "That's about"))} />},
  ];
};
const c2 = (): Graphic[] => {
  const a = start(2);
  const r = (p: string) => rel(a, cue(2, p));
  return [{a, b: end(2), side: true, el: ({f}) => <SheetRow f={f} low={r('flagged')} po={r('purchase order')} problem={r('But there was')} />}];
};
const c3 = (): Graphic[] => {
  const a = start(3);
  const r = (p: string) => rel(a, cue(3, p));
  return [{a, b: end(3), side: true, el: ({f}) => <Cartons f={f} c={r('Each carton')} loose={r('there were 8')} total={r("That's 260")} unit={r('The unit')} />}];
};
const c4 = (): Graphic[] => {
  const a = cue(4, 'AI agent') - 0.6;
  const r = (p: string) => rel(a, cue(4, p));
  return [{a, b: end(4), side: true, el: ({f}) => <AgentReads f={f} hour={r('every hour')} po={r('raise a purchase')} wrong={r('So if the data')} />}];
};
const c5 = (): Graphic[] => {
  const a = cue(5, 'We will use') - 0.3;
  const r = (p: string) => rel(a, cue(5, p));
  return [
    {a: cue(5, "That's why") - 0.1, b: a - 0.4, el: ({f}) => <NameBar f={f} title="Databases & data quality" sub="Not as technical as it sounds" />},
    {a, b: end(5), side: true, el: ({f}) => <ThisVideo f={f} ats={[0, r('five simple'), 1e9]} messy={[1e9, 1e9, 1e9, 1e9]} nocode={1e9} />},
  ];
};
const c6 = (): Graphic[] => {
  const a = start(6);
  const r = (p: string) => rel(a, cue(6, p)) + SKIP;
  return [{a, b: cue(6, 'Alright') - 0.2, side: true, el: ({f}) => (
    <ThisVideo f={f + SKIP} ats={[0, 0, r('messy stock')]} messy={[r('merged'), r('duplicate'), r('mixed'), r('approximately')]} nocode={r('No coding')} />
  )}];
};

// ================================================================ STORY: the supplier who existed three times
const Quote: React.FC<{f: number}> = ({f}) => (
  <Stage f={f}>
    <Kicker f={f}>The supplier who existed three times</Kicker>
    <div style={{display: 'flex', gap: 24, alignItems: 'flex-start', marginTop: 10, opacity: pop(f, 4)}}>
      <Face name="harrison" size={120} />
      <div style={{padding: '24px 28px', borderRadius: 24, background: C.blueSoft, fontSize: 32, fontWeight: 700, lineHeight: 1.35}}>
        “How much are we spending with <span style={{color: C.blue}}>PackRight Industries</span>? I want to see if we can negotiate a volume discount.”
        <div style={{fontSize: 22, color: C.slate, marginTop: 10}}>Mr. Harrison</div>
      </div>
    </div>
  </Stage>
);
const Share: React.FC<{f: number; to: number; at: number; grow?: number; dropped?: number; label: string}> = ({f, to, at, grow = 1e9, dropped = 1e9, label}) => {
  const v = grow < 1e8 ? 18 + (41 - 18) * prog(f, grow, grow + 30) : to * prog(f, at, at + 24);
  return (
    <div style={{marginTop: 22, opacity: pop(f, at)}}>
      <div style={{fontSize: 24, fontWeight: 700, color: C.slate}}>{label}</div>
      <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 10}}>
        <div style={{flex: 1, height: 46, borderRadius: 12, background: '#F1F5F9', overflow: 'hidden'}}>
          <div style={{width: `${v}%`, height: '100%', background: v > 30 ? C.green : C.amber, borderRadius: 12}} />
        </div>
        <div style={{width: 110, fontSize: 44, fontWeight: 800, color: v > 30 ? C.green : C.amber}}>{Math.round(v)}%</div>
      </div>
      {dropped < 1e8 && <div style={{marginTop: 12, fontSize: 26, fontWeight: 700, color: C.slate, opacity: prog(f, dropped, dropped + 8)}}>“Not enough for a discount.” Idea dropped.</div>}
    </div>
  );
};
const Names: React.FC<{f: number; ats: number[]; same: number; pct: number; power: number}> = ({f, ats, same, pct, power}) => (
  <Stage f={f}>
    <Kicker f={f}>Six months later…</Kicker>
    <Heading f={f} size={44}>PackRight was listed three ways</Heading>
    <div style={{display: 'flex', flexDirection: 'column', gap: 12, marginTop: 22}}>
      {['PackRight Industries', 'Pack Right Ind.', 'PACKRIGHT (Chicago)'].map((n, i) => (
        <div key={n} style={{padding: '14px 22px', borderRadius: 16, background: C.amberSoft, fontSize: 30, fontWeight: 800, fontFamily: 'monospace', opacity: pop(f, ats[i]),
          transform: `translateX(${(1 - pop(f, ats[i])) * 40}px)`}}>{n}</div>
      ))}
    </div>
    <div style={{fontSize: 26, fontWeight: 700, color: C.red, marginTop: 14, opacity: prog(f, same, same + 8)}}>Same supplier, treated as three companies</div>
    <Share f={f} to={41} at={pct} grow={pct} label="Real share of packaging spend" />
    <div style={{fontSize: 28, fontWeight: 800, color: C.green, marginTop: 14, opacity: prog(f, power, power + 8)}}>Much more negotiating power than they realised</div>
  </Stage>
);
const Passport: React.FC<{f: number; pass: number; sup: number; every: number}> = ({f, pass, sup, every}) => (
  <Stage f={f}>
    <Kicker f={f}>A unique ID is like a passport number</Kicker>
    <div style={{display: 'flex', gap: 18, marginTop: 10}}>
      {['P 4471 920', 'P 8830 115'].map((n, i) => (
        <div key={n} style={{flex: 1, padding: '20px 22px', borderRadius: 20, background: '#1E3A5F', color: C.white, opacity: pop(f, pass + i * 6)}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}><Face name="sarah" size={56} /><div style={{fontSize: 26, fontWeight: 800}}>Sarah Mitchell</div></div>
          <div style={{fontSize: 24, fontFamily: 'monospace', color: C.hi, marginTop: 12}}>{n}</div>
        </div>
      ))}
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 34, opacity: pop(f, sup)}}>
      <div style={{fontSize: 30, fontWeight: 800}}>PackRight Industries</div>
      <ArrowRight size={36} color={C.slate} />
      <div style={{padding: '14px 24px', borderRadius: 16, background: C.navy, color: C.hi, fontSize: 40, fontWeight: 800, fontFamily: 'monospace'}}>SUP-002</div>
    </div>
    <div style={{fontSize: 26, fontWeight: 700, color: C.slate, marginTop: 18, opacity: prog(f, every, every + 8)}}>Every PO and stock record points to the same ID</div>
  </Stage>
);

const HarrisonIntro: React.FC<{f: number; q: number}> = ({f, q}) => (
  <Stage f={f}>
    <Kicker f={f}>The supplier who existed three times</Kicker>
    <div style={{display: 'flex', alignItems: 'center', gap: 28, marginTop: 14, opacity: pop(f, 4)}}>
      <Face name="harrison" size={150} />
      <div>
        <div style={{fontSize: 44, fontWeight: 800}}>Mr. Harrison</div>
        <div style={{fontSize: 26, fontWeight: 600, color: C.slate, marginTop: 6}}>Operations Director, BrightLeaf</div>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 40, opacity: pop(f, q)}}>
      <Face name="sarah" size={70} />
      <div style={{fontSize: 32, fontWeight: 700}}>…asked Sarah a simple question.</div>
    </div>
  </Stage>
);

/** Full-screen dialogue while Mr. Harrison's own voice plays (presenter hidden, raw audio muted). f = frames since the beat began. */
type HW = {w: string; t: number; d: number};
export const HarrisonScene: React.FC<{f: number}> = ({f}) => {
  const t = f / FPS - HARRISON_LEAD;
  const words = (harrisonVo as {words: HW[]}).words;
  const toks = harrisonVo.text.split(/\s+/);
  const speaking = t > -0.1 && t < harrisonVo.duration - 0.2;
  const pulse = speaking ? 0.5 + 0.5 * Math.sin(f / 3.2) : 0;
  const shown = (i: number) => (words[i] ? t >= words[i].t - 0.05 : t >= harrisonVo.duration - 0.6);
  return (
    <AbsoluteFill style={{fontFamily: INTER, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: prog(f, 0, 12)}}>
        <div style={{fontSize: 26, fontWeight: 800, letterSpacing: 4, color: C.hi, textTransform: 'uppercase'}}>The supplier who existed three times</div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 60, marginTop: 20, padding: '0 150px'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, opacity: pop(f, 0, 16)}}>
          <div style={{position: 'relative', width: 240, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{position: 'absolute', inset: -14 - 10 * pulse, borderRadius: '50%', border: `4px solid ${C.hi}`, opacity: speaking ? 0.35 + 0.4 * pulse : 0}} />
            <Face name="harrison" size={240} />
          </div>
          <div style={{fontSize: 38, fontWeight: 800, color: C.white, marginTop: 26}}>Mr. Harrison</div>
          <div style={{fontSize: 24, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: 6}}>Operations Director</div>
        </div>
        <div style={{position: 'relative', maxWidth: 1080, padding: '44px 52px', borderRadius: 34, background: C.white, boxShadow: '0 30px 80px rgba(2,6,23,0.5)',
          opacity: pop(f, 6, 16), transform: `translateX(${(1 - pop(f, 6, 16)) * 40}px)`}}>
          <div style={{position: 'absolute', left: -26, top: '50%', marginTop: -26, width: 0, height: 0, borderTop: '26px solid transparent', borderBottom: '26px solid transparent', borderRight: `28px solid ${C.white}`}} />
          <div style={{fontSize: 54, fontWeight: 800, lineHeight: 1.3, color: C.navy, letterSpacing: -0.5}}>
            {toks.map((w, i) => {
              const pr = /PackRight|Industries/.test(w);
              return <span key={i} style={{opacity: shown(i) ? 1 : 0.18, color: pr && shown(i) ? C.blue : undefined}}>{i === 0 ? '“' : ''}{w}{i === toks.length - 1 ? '”' : ''} </span>;
            })}
          </div>
          <div style={{fontSize: 26, fontWeight: 700, color: C.slate, marginTop: 18, opacity: prog(f, 10, 20)}}>Mr. Harrison, asking Sarah</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
const c7 = (): Graphic[] => {
  const a = cue(7, 'Mr. Harrison') - 0.3;
  return [
    {a: cue(7, 'Before we start') - 0.1, b: a - 0.4, el: ({f}) => <NameBar f={f} title="Why do we need unique IDs?" sub="A real-world story from BrightLeaf" />},
    {a, b: end(7), side: true, el: ({f}) => <HarrisonIntro f={f} q={rel(a, cue(7, 'a simple question'))} />},
  ];
};
const c8 = (): Graphic[] => {
  const a = start(8);
  const r = (p: string) => rel(a, cue(8, p));
  const six = cue(8, 'But six months') - 0.2;
  return [
    {a, b: six - 0.3, side: true, el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f}>Sarah searched for “PackRight Industries”</Kicker>
        <Share f={f} to={18} at={r('The results')} dropped={r('So Mr. Harrison')} label="Share of BrightLeaf's packaging spend" />
      </Stage>
    )},
    {a: six, b: end(8), side: true, el: ({f}) => <Names f={f} ats={[rel(six, cue(8, 'three different')), 1e9, 1e9]} same={1e9} pct={1e9} power={1e9} />},
  ];
};
const c9 = (): Graphic[] => {
  const a = start(9);
  const r = (p: string, n = 0) => rel(a, cue(9, p, n)) + SKIP;
  return [{a, b: end(9), side: true, el: ({f}) => (
    <Names f={f + SKIP} ats={[0, r('IND'), r('Chicago')]} same={r('They were all')} pct={r('Once Sarah')} power={r("That's a big")} />
  )}];
};
const c10 = (): Graphic[] => {
  const a = cue(10, 'A unique') - 0.3;
  const r = (p: string) => rel(a, cue(10, p));
  return [
    {a: start(10), b: a - 0.3, side: true, el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f}>Why names cause problems</Kicker>
        <Item f={f} at={rel(start(10), cue(10, 'People type'))} icon={ic(X, 28)} color={C.red} size={30}>People type names differently</Item>
        <Item f={f} at={rel(start(10), cue(10, 'companies changes'))} icon={ic(X, 28)} color={C.red} size={30}>Companies change their names</Item>
        <Item f={f} at={rel(start(10), cue(10, 'sometimes two'))} icon={ic(X, 28)} color={C.red} size={30}>Different businesses, similar names</Item>
      </Stage>
    )},
    {a, b: end(10), side: true, el: ({f}) => <Passport f={f} pass={r('Think of it')} sup={r('So in your')} every={r('Every purchase')} />},
  ];
};
const c11 = (): Graphic[] => {
  const a = start(11);
  const r = (p: string) => rel(a, cue(11, p));
  return [{a, b: end(11), side: true, el: ({f}) => (
    <Stage f={f}>
      <Kicker f={f}>The ID stays the same</Kicker>
      <div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 6}}>
        <div style={{padding: '16px 26px', borderRadius: 16, background: C.navy, color: C.hi, fontSize: 52, fontWeight: 800, fontFamily: 'monospace'}}>SUP-002</div>
        <Fingerprint size={64} color={C.blue} />
      </div>
      <div style={{marginTop: 28}}>
        <Item f={f} at={4} icon={ic(Check, 28)} color={C.green} size={30}>Name changes or typos: the ID doesn't</Item>
        <Item f={f} at={r('especially important')} icon={ic(Check, 28)} color={C.green} size={30}>The agent never has to guess</Item>
        <Item f={f} at={r('Give a record')} icon={ic(Hash, 28)} color={C.blue} size={30}>A clear, unique ID on every record</Item>
      </div>
    </Stage>
  )}];
};

// ================================================================ FIVE GOLDEN RULES
const RULES: {t: string; s: string; I: I; c: string}[] = [
  {t: 'One table for one kind of thing', s: 'Suppliers in Suppliers, stock checks in Stock_Log', I: Table2, c: C.blue},
  {t: 'One header row, right at the top', s: 'No titles, blank rows or notes above it', I: Rows3, c: C.blue},
  {t: 'One fact per cell', s: '18 | set | urgent, not “18 sets - urgent”', I: Layers, c: C.green},
  {t: 'A unique ID on every row', s: 'SUP-002 · LOG-0001', I: Fingerprint, c: C.amber},
  {t: 'Consistent types and units', s: 'Real dates · numbers · units in their own column', I: Hash, c: C.red},
];
const Rules: React.FC<{f: number; ats: number[]; extra?: number; done?: number}> = ({f, ats, extra = 1e9, done}) => (
  <Stage f={f} style={{padding: '40px 54px'}}>
    <Kicker f={f}>The five golden rules of agent-ready data</Kicker>
    {RULES.map((r, i) => (
      <Item key={r.t} f={f} at={ats[i]} done={done} icon={<b style={{fontSize: 26}}>{i + 1}</b>} color={r.c} size={27}>
        <div style={{fontWeight: 800}}>{r.t}</div><div style={{fontSize: 20, color: C.slate, fontWeight: 600}}>{r.s}</div>
      </Item>
    ))}
    <div style={{display: 'flex', gap: 10, marginTop: 4, opacity: pop(f, extra)}}>
      <Chip size={22} bg={C.redSoft} color={C.red}>{ic(X, 20)} Merged cells</Chip>
      <Chip size={22} bg={C.redSoft} color={C.red}>{ic(Paintbrush, 20)} Colour as the only meaning</Chip>
    </div>
  </Stage>
);
// ---- real sheet crops for each rule (from the captured Google Sheets, page px)
type PR = {x: number; y: number; w: number; h: number};
type Hl = {r: PR; at: number; color?: string};
/** One or more horizontal pieces of a captured sheet, shown as one strip at `scale`. Highlights are in page px of their piece. */
const SheetCrop: React.FC<{f: number; at: number; scale: number; pieces: {shot: string; r: PR; hl?: Hl[]}[]; label?: React.ReactNode; tone?: 'bad' | 'good'}> = ({f, at, scale, pieces, label, tone}) => {
  const p = pop(f, at, 14);
  const col = tone === 'bad' ? C.red : tone === 'good' ? C.green : C.slate;
  return (
    <div style={{opacity: p, transform: `translateY(${(1 - p) * 16}px)`, marginTop: 16}}>
      {label && <div style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 21, fontWeight: 800, color: col, marginBottom: 8}}>
        {tone === 'bad' ? ic(X, 22) : tone === 'good' ? ic(Check, 22) : null}{label}</div>}
      <div style={{display: 'inline-flex', gap: 10, alignItems: 'flex-start'}}>
        {pieces.map((pc, i) => (
          <div key={i} style={{position: 'relative', width: pc.r.w * scale, height: pc.r.h * scale, overflow: 'hidden', borderRadius: 10,
            border: `2px solid ${tone === 'bad' ? '#FCA5A5' : tone === 'good' ? '#86EFAC' : '#E2E8F0'}`, boxShadow: '0 6px 18px rgba(15,23,42,0.12)', background: C.white}}>
            <Img src={staticFile(`cap04/${pc.shot}.png`)} style={{position: 'absolute', left: -pc.r.x * scale, top: -pc.r.y * scale, width: 1920 * scale, height: 1080 * scale}} />
            {(pc.hl ?? []).map((h, k) => {
              const q = pop(f, h.at, 12);
              const c = h.color ?? (tone === 'bad' ? C.red : C.green);
              return <div key={k} style={{position: 'absolute', left: (h.r.x - pc.r.x) * scale - 3, top: (h.r.y - pc.r.y) * scale - 3, width: h.r.w * scale + 6, height: h.r.h * scale + 6,
                borderRadius: 6, border: `4px solid ${c}`, background: `${c}1F`, opacity: q, transform: `scale(${1.08 - 0.08 * q})`}} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
const RuleHead: React.FC<{f: number; n: number; t: string; sub?: React.ReactNode}> = ({f, n, t, sub}) => (
  <>
    <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: pop(f, 0, 12)}}>
      <div style={{width: 58, height: 58, borderRadius: 16, background: RULES[n - 1]?.c ?? C.blue, color: C.white, fontSize: 32, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{n}</div>
      <div style={{fontSize: 20, fontWeight: 800, letterSpacing: 3, color: C.slate, textTransform: 'uppercase'}}>Golden rule {n} of 5</div>
    </div>
    <div style={{fontSize: 40, fontWeight: 800, marginTop: 14, lineHeight: 1.15, opacity: prog(f, 4, 14)}}>{t}</div>
    {sub && <div style={{fontSize: 22, fontWeight: 600, color: C.slate, marginTop: 6, opacity: prog(f, 8, 18)}}>{sub}</div>}
  </>
);
// sheet geometry: rows are 31.6 px from y 248 (row 1); column header strip y 212–248
const ROW = (n: number, k = 1) => ({y: 248 + (n - 1) * 31.6, h: 31.6 * k}); // cleaned messy export (rows already deleted)
const ft = (n: number) => (n === 1 ? 248 : 285 + (n - 2) * 31.6); // Stocky database tabs (frozen, taller header row)
const FR = (n: number, k = 1) => ({y: ft(n), h: ft(n + k) - ft(n)});
const mt = (n: number) => (n === 1 ? 248 : n === 2 ? 284 : n === 3 ? 320 : 349.5 + (n - 4) * 31.5); // original messy export
const MR = (n: number, k = 1) => ({y: mt(n), h: mt(n + k) - mt(n)});
const RuleIntro: React.FC<{f: number; worth: number}> = ({f, worth}) => (
  <Stage f={f}>
    <Kicker f={f}>The five golden rules</Kicker>
    <Heading f={f} size={50}>What makes a table easy for an agent?</Heading>
    <div style={{display: 'flex', gap: 16, marginTop: 34}}>
      {RULES.map((r, i) => (
        <div key={i} style={{width: 120, height: 120, borderRadius: 26, background: `${r.c}18`, border: `3px solid ${r.c}55`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 52, fontWeight: 800, color: r.c, opacity: pop(f, 6 + i * 5), transform: `translateY(${(1 - pop(f, 6 + i * 5)) * 20}px)`}}>{i + 1}</div>
      ))}
    </div>
    <div style={{fontSize: 28, fontWeight: 700, color: C.slate, marginTop: 30, opacity: prog(f, worth, worth + 10)}}>Worth remembering: they apply to almost any business spreadsheet.</div>
  </Stage>
);
const Rule1: React.FC<{f: number; sup: number; log: number; mix: number}> = ({f, sup, log, mix}) => (
  <Stage f={f} style={{padding: '44px 56px', justifyContent: 'flex-start'}}>
    <RuleHead f={f} n={1} t="One table for one kind of thing" />
    <SheetCrop f={f} at={sup} scale={1.35} tone="good" label="Suppliers tab: suppliers only" pieces={[{shot: 's2_rows_all', r: {x: 20, ...FR(1, 7), w: 478}}]} />
    <SheetCrop f={f} at={log} scale={1.35} tone="good" label="Stock_Log tab: stock checks only" pieces={[{shot: 's3_final', r: {x: 20, ...FR(1, 4), w: 591}}]} />
    <div style={{position: 'absolute', right: 56, bottom: 48, opacity: pop(f, mix)}}><Chip size={24} bg={C.redSoft} color={C.red}>{ic(X, 22)} Not one giant sheet</Chip></div>
  </Stage>
);
const Rule2: React.FC<{f: number; good: number; title: number; blank: number; notes: number; row2: number}> = ({f, good, title, blank, notes, row2}) => (
  <Stage f={f} style={{padding: '44px 56px', justifyContent: 'flex-start'}}>
    <RuleHead f={f} n={2} t="One header row, right at the top" />
    <SheetCrop f={f} at={good} scale={1.18} tone="good" label="Headers in row 1, data from row 2"
      pieces={[{shot: 's4_fix1_done', r: {x: 20, ...ROW(1, 3), w: 740}, hl: [{r: {x: 22, ...ROW(1), w: 736}, at: good + 8}, {r: {x: 22, ...ROW(2), w: 736}, at: row2, color: C.blue}]}]} />
    <SheetCrop f={f} at={title} scale={1.18} tone="bad" label="Messy export: a title, notes and a blank row on top"
      pieces={[{shot: 's4_messy', r: {x: 20, ...MR(1, 5), w: 740}, hl: [{r: {x: 22, ...MR(1), w: 736}, at: title + 6}, {r: {x: 22, ...MR(3), w: 736}, at: blank}, {r: {x: 22, ...MR(2), w: 736}, at: notes}]}]} />
  </Stage>
);
const Rule3: React.FC<{f: number; bad: number; q: number; u: number; n: number; why: number}> = ({f, bad, q, u, n, why}) => (
  <Stage f={f} style={{padding: '44px 56px', justifyContent: 'flex-start'}}>
    <RuleHead f={f} n={3} t="One fact per cell" />
    <SheetCrop f={f} at={bad} scale={1.6} tone="bad" label="Messy export: several facts squeezed into one cell"
      pieces={[{shot: 's4_messy', r: {x: 20, ...MR(10, 4), w: 167}}, {shot: 's4_messy', r: {x: 770, ...MR(10, 4), w: 330}, hl: [{r: {x: 772, ...MR(13), w: 326}, at: bad + 10}, {r: {x: 772, ...MR(10), w: 326}, at: bad + 18, color: C.amber}]}]} />
    <SheetCrop f={f} at={q - 6} scale={1.45} tone="good" label="Stock_Log: 18 | set | note, each in its own column"
      pieces={[
        {shot: 's3_rows', r: {x: 459, y: 248, w: 238, h: 69}, hl: [{r: {x: 461, y: 286, w: 149, h: 30}, at: q}, {r: {x: 612, y: 286, w: 83, h: 30}, at: u}]},
        {shot: 's3_rows', r: {x: 1251, y: 248, w: 342, h: 69}, hl: [{r: {x: 1253, y: 286, w: 338, h: 30}, at: n}]},
      ]} />
    <div style={{fontSize: 26, fontWeight: 700, marginTop: 18, opacity: prog(f, why, why + 8)}}>Formulas and agents both understand each value.</div>
  </Stage>
);
const Rule4: React.FC<{f: number; ids: number; names: number; sup: number; log: number; rel: number}> = ({f, ids, names, sup, log, rel: rl}) => (
  <Stage f={f} style={{padding: '44px 56px', justifyContent: 'flex-start'}}>
    <RuleHead f={f} n={4} t="A unique ID on every row" />
    <div style={{display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap', opacity: pop(f, names)}}>
      {['PackRight Industries', 'Pack Right Ind.', 'PACKRIGHT (Chicago)'].map((t) => <Chip key={t} size={20} bg={C.amberSoft} color="#92400E">{t}</Chip>)}
      <span style={{fontSize: 20, fontWeight: 700, color: C.slate, alignSelf: 'center'}}>names drift…</span>
    </div>
    <div style={{display: 'flex', gap: 22, alignItems: 'flex-start'}}>
      <SheetCrop f={f} at={ids} scale={1.2} tone="good" label="Suppliers"
        pieces={[{shot: 's2_rows_all', r: {x: 20, ...FR(1, 7), w: 478}, hl: [{r: {x: 70, y: 286, w: 156, h: 188}, at: ids + 8}, {r: {x: 22, ...FR(3), w: 474}, at: sup, color: C.blue}]}]} />
      <SheetCrop f={f} at={ids + 6} scale={1.2} tone="good" label="Stock_Log"
        pieces={[{shot: 's3_final', r: {x: 20, ...FR(1, 4), w: 321}, hl: [{r: {x: 70, y: 286, w: 131, h: 94}, at: ids + 14}, {r: {x: 22, ...FR(2), w: 317}, at: log, color: C.blue}]}]} />
    </div>
    <div style={{fontSize: 26, fontWeight: 700, marginTop: 20, opacity: prog(f, rl, rl + 8)}}>SUP-002 · LOG-0001: a reliable reference for every record.</div>
  </Stage>
);
const Rule5: React.FC<{f: number; dates: number; qty: number; units: number; guess: number}> = ({f, dates, qty, units, guess}) => (
  <Stage f={f} style={{padding: '44px 56px', justifyContent: 'flex-start'}}>
    <RuleHead f={f} n={5} t="Consistent types and units" />
    <SheetCrop f={f} at={10} scale={1.55} tone="bad" label="Messy: units typed into numbers, five date formats"
      pieces={[{shot: 's4_messy', r: {x: 770, ...MR(4, 6), w: 330}, hl: [{r: {x: 772, ...MR(5, 5), w: 326}, at: qty}]},
        {shot: 's4_messy', r: {x: 1232, ...MR(4, 6), w: 165}, hl: [{r: {x: 1234, ...MR(5, 5), w: 161}, at: dates}]}]} />
    <SheetCrop f={f} at={18} scale={1.45} tone="good" label={<>Clean: one date format, plain numbers, units apart <span style={{color: C.slate, opacity: prog(f, guess, guess + 8)}}>· nothing to guess</span></>}
      pieces={[{shot: 's3_final', r: {x: 202, ...FR(1, 4), w: 495}, hl: [{r: {x: 204, y: 286, w: 135, h: 94}, at: dates + 4}, {r: {x: 462, y: 286, w: 147, h: 94}, at: qty + 4}, {r: {x: 613, y: 286, w: 82, h: 94}, at: units}]}]} />
  </Stage>
);
const RuleExtra: React.FC<{f: number; merged: number; colour: number; urgent: number}> = ({f, merged, colour, urgent}) => (
  <Stage f={f} style={{padding: '44px 56px', justifyContent: 'flex-start'}}>
    <div style={{fontSize: 20, fontWeight: 800, letterSpacing: 3, color: C.amber, textTransform: 'uppercase', opacity: pop(f, 0, 12)}}>One extra rule</div>
    <div style={{fontSize: 34, fontWeight: 800, marginTop: 8, lineHeight: 1.15, opacity: prog(f, 4, 14)}}>No merged cells. No colour as the only meaning.</div>
    <SheetCrop f={f} at={6} scale={1.3} tone="bad" label="Merged supplier cells · red = “urgent” (an agent can't see colour)"
      pieces={[{shot: 's4_messy', r: {x: 511, ...MR(5, 10), w: 589}, hl: [{r: {x: 513, ...MR(5, 3), w: 255}, at: merged, color: C.amber}, {r: {x: 513, ...MR(8, 4), w: 255}, at: merged + 6, color: C.amber},
        {r: {x: 772, ...MR(11), w: 326}, at: colour}, {r: {x: 772, ...MR(13), w: 326}, at: colour + 6}]}]} />
    <SheetCrop f={f} at={urgent} scale={1.35} tone="good" label="Write it in a Remarks field instead"
      pieces={[{shot: 's4_fix7_remarks', r: {x: 1500, ...ROW(5, 4), w: 410}, hl: [{r: {x: 1605, ...ROW(6), w: 300}, at: urgent + 8}, {r: {x: 1605, ...ROW(8), w: 300}, at: urgent + 12}]}]} />
  </Stage>
);
const c12 = (): Graphic[] => {
  const a = cue(12, 'There are five') - 0.3;
  const r1 = cue(12, 'The first rule') - 0.2;
  return [
    {a: cue(12, 'We have now') - 0.1, b: a - 0.3, el: ({f}) => <NameBar f={f} title="The five golden rules" sub="of agent-ready data" />},
    {a, b: r1 - 0.25, side: true, el: ({f}) => <RuleIntro f={f} worth={rel(a, cue(12, 'These are worth'))} />},
    {a: r1, b: end(12), side: true, el: ({f}) => <Rule1 f={f} sup={1e9} log={1e9} mix={1e9} />},
  ];
};
const c13 = (): Graphic[] => {
  const a = start(13);
  const r2 = cue(13, 'The second rule') - 0.2;
  const r = (p: string) => rel(r2, cue(13, p));
  return [
    {a, b: r2 - 0.25, side: true, el: ({f}) => <Rule1 f={f + SKIP} sup={rel(a, cue(13, 'Keep supplier')) + SKIP} log={rel(a, cue(13, 'and stock')) + SKIP} mix={rel(a, cue(13, "Don't mix")) + SKIP} />},
    {a: r2, b: end(13), side: true, el: ({f}) => <Rule2 f={f} good={r('keep just')} title={r('No big')} blank={r('no blank')} notes={r('no extra')} row2={r('Your data')} />},
  ];
};
const c14 = (): Graphic[] => {
  const a = start(14);
  const r = (p: string, n = 0) => rel(a, cue(14, p, n));
  return [{a, b: end(14), side: true, el: ({f}) => <Rule3 f={f} bad={r('For example')} q={r('put 18', 1)} u={r('set in')} n={r('and urgent')} why={r('That way')} />}];
};
const c15 = (): Graphic[] => {
  const a = start(15);
  const r5 = cue(15, 'And 5') - 0.2;
  const r = (p: string) => rel(a, cue(15, p));
  return [
    {a, b: r5 - 0.25, side: true, el: ({f}) => <Rule4 f={f} ids={r('Give every')} names={r('As you saw')} sup={r('An ID')} log={r('or LOG0001')} rel={r('gives each')} />},
    {a: r5, b: end(15), side: true, el: ({f}) => <Rule5 f={f} dates={1e9} qty={1e9} units={1e9} guess={1e9} />},
  ];
};
const c16 = (): Graphic[] => {
  const a = start(16);
  const ex = cue(16, "That's one extra") - 0.2;
  const r = (p: string) => rel(a, cue(16, p)) + SKIP;
  const e = (p: string) => rel(ex, cue(16, p));
  return [
    {a, b: ex - 0.25, side: true, el: ({f}) => <Rule5 f={f + SKIP} dates={r('Dates should')} qty={r('quantities should')} units={r('and the units')} guess={r('not left')} />},
    {a: ex, b: end(16), side: true, el: ({f}) => <RuleExtra f={f} merged={e('avoid merged')} colour={e("don't use colors")} urgent={e('put the word')} />},
  ];
};
const c17 = (): Graphic[] => {
  const a = start(17);
  const th = cue(17, 'Now, think') - 0.2;
  return [
    {a, b: th - 0.3, side: true, el: ({f}) => <Rules f={f + SKIP} ats={[0, 0, 0, 0, 0]} extra={0} done={rel(a, cue(17, 'So, those')) + SKIP} />},
    {a: th, b: end(17), side: true, el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f} color={C.amber}>Pause & think</Kicker>
        <Heading f={f} size={50}>Your most-used spreadsheet at work: which rule does it break?</Heading>
        <div style={{marginTop: 30, opacity: prog(f, rel(th, cue(17, 'Post the')), rel(th, cue(17, 'Post the')) + 8)}}>
          <Chip bg={C.amberSoft} color="#92400E" size={28}>{ic(ListChecks, 26)} Note the biggest issue: you'll fix it in the activity</Chip>
        </div>
      </Stage>
    )},
  ];
};

// ================================================================ COMMON MISTAKES
const Mistakes: React.FC<{f: number; ats: number[]; subs: number[]}> = ({f, ats, subs}) => (
  <Stage f={f}>
    <Kicker f={f} color={C.red}>Three common mistakes</Kicker>
    {[{t: 'Cleaning once and calling it done', s: 'Prevent mess at entry: dropdowns, checkboxes', I: Copy},
      {t: 'Making the database look like a presentation', s: 'No merged headings, colours or logos. Style your reports instead', I: Presentation},
      {t: 'One giant sheet for everything', s: 'Separate tables, connected by unique IDs', I: Database}].map((m, i) => (
      <Item key={m.t} f={f} at={ats[i]} icon={ic(m.I, 28)} color={C.red} size={29}>
        <div style={{fontWeight: 800}}>{m.t}</div>
        <div style={{fontSize: 21, color: C.green, fontWeight: 700, opacity: prog(f, subs[i], subs[i] + 8)}}>{ic(Check, 18)} {m.s}</div>
      </Item>
    ))}
  </Stage>
);
const c18 = (): Graphic[] => {
  const a = cue(18, 'The first one') - 0.3;
  const r = (p: string) => rel(a, cue(18, p));
  return [
    {a: cue(18, 'Before we wrap') - 0.1, b: a - 0.3, el: ({f}) => <NameBar f={f} title="Common mistakes" sub="Three to avoid when you set up a database" />},
    {a, b: end(18), side: true, el: ({f}) => <Mistakes f={f} ats={[0, 1e9, 1e9]} subs={[r("That's why"), 1e9, 1e9]} />},
  ];
};
const c19 = (): Graphic[] => {
  const a = start(19);
  const r = (p: string) => rel(a, cue(19, p)) + SKIP;
  return [{a, b: end(19), side: true, el: ({f}) => <Mistakes f={f + SKIP} ats={[0, r('The second'), 1e9]} subs={[0, r('Keep the visual'), 1e9]} />}];
};
const c20 = (): Graphic[] => {
  const a = start(20);
  const r = (p: string) => rel(a, cue(20, p)) + SKIP;
  return [{a, b: end(20), side: true, el: ({f}) => <Mistakes f={f + SKIP} ats={[0, 0, r('third mistake')]} subs={[0, 0, r('Keep separate')]} />}];
};

// ================================================================ OUTRO
const Takeaways: React.FC<{f: number; ats: number[]}> = ({f, ats}) => (
  <Stage f={f}>
    <Kicker f={f}>Recap</Kicker>
    <Heading f={f}>3 key takeaways</Heading>
    <div style={{marginTop: 26}}>
      <Item f={f} at={ats[0]} icon={<b style={{fontSize: 30}}>1</b>} size={29}>A database = a well-organised workbook<div style={{fontSize: 20, color: C.slate}}>table = sheet · row = record · column = field</div></Item>
      <Item f={f} at={ats[1]} icon={<b style={{fontSize: 30}}>2</b>} size={29} color={C.green}>Every record needs a unique ID<div style={{fontSize: 20, color: C.slate}}>it's also how tables connect</div></Item>
      <Item f={f} at={ats[2]} icon={<b style={{fontSize: 30}}>3</b>} size={29} color={C.amber}>Data quality matters<div style={{fontSize: 20, color: C.slate}}>the five golden rules · no merged cells · no colour codes</div></Item>
    </div>
  </Stage>
);
const Homework: React.FC<{f: number; wb: number; chips: number[]; own: number; quiz: number}> = ({f, wb, chips, own, quiz}) => (
  <Stage f={f}>
    <Kicker f={f}>Before Video 5</Kicker>
    <Heading f={f} size={46}>Messy Data Makeover</Heading>
    <div style={{marginTop: 20, padding: '20px 24px', borderRadius: 22, background: '#F0FDF4', border: `2px solid ${C.green}40`, opacity: pop(f, wb)}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
        <div style={{width: 58, height: 58, borderRadius: 16, background: C.green, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><FileSpreadsheet size={32} /></div>
        <div><div style={{fontSize: 28, fontWeight: 800}}>V04 Activity workbook</div><div style={{fontSize: 20, color: C.slate, fontWeight: 600}}>V04_Activity_Messy_Data_Makeover.xlsx</div></div>
      </div>
      <div style={{display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap'}}>
        {['Rebuild the clean Stock_Log', 'Complete Suppliers', 'Check your formulas', 'Clean-data checklist'].map((t, i) => <Chip key={t} f={f} at={chips[i]} size={21} bg={C.white}>{t}</Chip>)}
        <Chip f={f} at={own} size={21} bg={C.amberSoft} color="#92400E">Your own company's sheet · ~30 min</Chip>
      </div>
    </div>
    <div style={{marginTop: 18, padding: '18px 24px', borderRadius: 22, background: C.blueSoft, display: 'flex', alignItems: 'center', gap: 16, opacity: pop(f, quiz)}}>
      <ListChecks size={34} color={C.blue} /><div style={{fontSize: 28, fontWeight: 800}}>10-question quiz</div>
    </div>
  </Stage>
);
const Next5: React.FC<{f: number; ats: number[]; join: number}> = ({f, ats, join}) => (
  <Stage f={f}>
    <Kicker f={f}>Next · Video 5</Kicker>
    <Heading f={f} size={46}>Your No-Code Toolkit: Setting Up n8n and Your AI Brain</Heading>
    <div style={{marginTop: 24}}>
      {['Create your n8n account', 'Claude or ChatGPT as the AI brain', 'API keys stored safely', 'Your very first workflow'].map((t, i) => (
        <Item key={t} f={f} at={ats[i]} icon={ic(Check, 26)} color={C.blue} size={27}>{t}</Item>
      ))}
    </div>
    <div style={{fontSize: 24, fontWeight: 700, color: C.slate, marginTop: 6, opacity: prog(f, join, join + 8)}}>The waiter + the shopping list + these clean tables, together.</div>
  </Stage>
);
const c21 = (): Graphic[] => {
  const a = cue(21, 'There are three') - 0.3;
  return [
    {a: cue(21, 'All right') - 0.1, b: a - 0.3, el: ({f}) => <NameBar f={f} title="Recap" sub="Video 4 · Databases Without Fear" />},
    {a, b: end(21), side: true, el: ({f}) => <Takeaways f={f} ats={[rel(a, cue(21, 'First,')), 1e9, 1e9]} />},
  ];
};
const c22 = (): Graphic[] => {
  const a = start(22);
  return [{a, b: end(22), side: true, el: ({f}) => <Takeaways f={f + SKIP} ats={[0, rel(a, cue(22, 'Second')) + SKIP, 1e9]} />}];
};
const c23 = (): Graphic[] => {
  const a = start(23);
  return [{a, b: end(23), side: true, el: ({f}) => <Takeaways f={f + SKIP} ats={[0, 0, rel(a, cue(23, 'and third')) + SKIP]} />}];
};
const c24 = (): Graphic[] => {
  const a = start(24);
  const r = (p: string) => rel(a, cue(24, p));
  return [{a, b: end(24), side: true, el: ({f}) => <Homework f={f} wb={r('Download')} chips={[r('rebuild'), r('complete'), r('check your'), r('use the clean')]} own={1e9} quiz={1e9} />}];
};
const c25 = (): Graphic[] => {
  const a = start(25);
  const nx = cue(25, 'And in the next') - 0.2;
  const r = (p: string) => rel(a, cue(25, p)) + SKIP;
  return [
    {a, b: nx - 0.3, side: true, el: ({f}) => <Homework f={f + SKIP} wb={0} chips={[0, 0, 0, 0]} own={r('There is a final')} quiz={r('Once you have')} />},
    {a: nx, b: end(25), side: true, el: ({f}) => <Next5 f={f} ats={[1e9, 1e9, 1e9, 1e9]} join={1e9} />},
  ];
};
const c26 = (): Graphic[] => {
  const a = start(26);
  const r = (p: string) => rel(a, cue(26, p)) + SKIP;
  return [{a, b: cue(26, 'I will see') - 0.2, side: true, el: ({f}) => <Next5 f={f + SKIP} ats={[r('We will create'), r('set up'), r('make sure'), r('Then we will')]} join={r('All the pieces')} />}];
};

export const v04Graphics = (): Record<string, Graphic[]> => ({
  c1: c1(), c2: c2(), c3: c3(), c4: c4(), c5: c5(), c6: c6(), c7: c7(), c8: c8(), c9: c9(), c10: c10(), c11: c11(), c12: c12(), c13: c13(),
  c14: c14(), c15: c15(), c16: c16(), c17: c17(), c18: c18(), c19: c19(), c20: c20(), c21: c21(), c22: c22(), c23: c23(), c24: c24(), c25: c25(), c26: c26(),
});
