// Video 3 on-camera graphics (same building blocks and look as Video 1's introStory / pauseOutro).
// Times are clip seconds from cue(clip, phrase) on the aligned words (src/data/words.json).
import React from 'react';
import {
  AlertTriangle, ArrowDownToLine, ArrowRight, ArrowUpFromLine, Ban, Check, CircleDollarSign, ClipboardList, CloudRain,
  Code2, Download, FileSpreadsheet, Globe, KeyRound, Link2, ListChecks, LogIn, Mail, MapPin, MessageSquareWarning, PackageCheck,
  Ruler, Search, Ship, Timer, Truck, Users, X,
} from 'lucide-react';
import {C, FPS} from '../theme';
import {pop, prog} from '../lib/anim';
import {cue} from '../lib/cues';
import {clipInfo, C18A_END, C18B_START} from '../timeline';
import {Graphic} from '../components/OnCam';
import {Chip, Counter, Heading, Item, Kicker, NameBar, Stage} from '../components/Gfx';
import {Harrison, Sarah, StockyBot, Tom} from '../components/Art';
import {Logo} from '../components/Logo';
import {RW, TASKS, TaskRow} from './Holds';

type I = React.FC<{size?: number; strokeWidth?: number; color?: string}>;
const ic = (Ic: I, s = 30) => <Ic size={s} strokeWidth={2.4} />;
/** frames from graphic start `a` to clip time `t` */
const rel = (a: number, t: number) => Math.round((t - a) * FPS);
const end = (clip: number) => clipInfo(clip).to + 1;
const start = (clip: number) => clipInfo(clip).from - 1;
const SKIP = 400; // frames: makes already-shown items appear settled when a card continues into the next clip

// ================================================================================================ INTRO
const c1 = (): Graphic[] => {
  const a = cue(1, 'You probably') - 0.2;
  return [
    {a: 0.9, b: 4.6, el: ({f}) => <NameBar f={f} title="APIs Explained Like You're Ordering at a Restaurant" sub="The ERP Agent Blueprint · Video 3" />},
    {
      a, b: end(1), side: true,
      el: ({f}) => (
        <Stage f={f}>
          <Kicker f={f}>The weekly copy-paste routine</Kicker>
          <Heading f={f} size={50}>Exchange rates, shipment updates, weather…</Heading>
          <div style={{marginTop: 34}}>
            <Item f={f} at={rel(a, cue(1, 'opened a website'))} icon={ic(Globe)}>Open a website</Item>
            <Item f={f} at={rel(a, cue(1, 'found the number'))} icon={ic(Search)} color={C.amber}>Find the number</Item>
            <Item f={f} at={rel(a, cue(1, 'copied it'))} icon={ic(FileSpreadsheet)} color={C.green}>Copy it into Excel</Item>
            <Item f={f} at={rel(a, cue(1, 'every week'))} icon={ic(Timer)} color={C.red}>…every single week</Item>
          </div>
        </Stage>
      ),
    },
  ];
};

const SarahChecks: React.FC<{f: number; a: number}> = ({f, a}) => {
  const at = (p: string) => rel(a, cue(2, p));
  return (
    <Stage f={f}>
      <Kicker>Sarah's look-ups</Kicker>
      <div style={{display: 'flex', gap: 34, alignItems: 'center'}}>
        <div style={{transform: `scale(${pop(f, 2)})`}}><Sarah size={170} /></div>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 14}}>
          <Chip f={f} at={at('Chinese')} bg={C.redSoft} color={C.red}>{ic(CircleDollarSign, 26)} USD → Chinese yuan</Chip>
          <Chip f={f} at={at('Mexican')} bg={C.greenSoft} color={C.green}>{ic(CircleDollarSign, 26)} USD → Mexican peso</Chip>
          <Chip f={f} at={at('weather in')} bg={C.blueSoft} color={C.blue}>{ic(CloudRain, 26)} Weather in Shenzhen</Chip>
        </div>
      </div>
      <div style={{marginTop: 40, padding: '30px 34px', borderRadius: 26, background: '#F1F5F9', opacity: prog(f, at('Over a month'), at('Over a month') + 8)}}>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 16}}>
          <div style={{fontSize: 96, fontWeight: 800, color: C.blue, letterSpacing: -3}}><Counter f={f} to={31} at={at('31')} dur={16} /></div>
          <div style={{fontSize: 34, fontWeight: 700, color: C.slate}}>checks a month</div>
          <div style={{fontSize: 34, fontWeight: 700, color: C.slate, opacity: prog(f, at('At 4'), at('At 4') + 6)}}>× 4–5 min</div>
        </div>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 6, opacity: prog(f, at("that's more"), at("that's more") + 6)}}>
          <div style={{fontSize: 96, fontWeight: 800, color: C.red, letterSpacing: -3}}>2+</div>
          <div style={{fontSize: 34, fontWeight: 700, color: C.slate}}>hours of copy-paste</div>
        </div>
      </div>
    </Stage>
  );
};
const c2 = (): Graphic[] => {
  const a = start(2);
  return [{a, b: end(2), side: true, el: ({f}) => <SarahChecks f={f} a={a} />}];
};

const c3 = (): Graphic[] => {
  const a = start(3);
  return [{
    a, b: end(3), side: true,
    el: ({f}) => {
      const at = (p: string) => rel(a, cue(3, p));
      const today = at('Today');
      return (
        <Stage f={f}>
          <Kicker f={f}>What an API gives us</Kicker>
          <Heading f={f} size={48}>Information straight from the system that holds it</Heading>
          <div style={{display: 'flex', alignItems: 'center', gap: 30, marginTop: 36, opacity: prog(f, at('Stocky'), at('Stocky') + 8)}}>
            <StockyBot size={120} f={f} />
            <ArrowRight size={60} color={C.blue} />
            <div style={{padding: '18px 26px', borderRadius: 20, background: '#F1F5F9'}}><Logo name="odoo" w={150} h={60} /></div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 10, opacity: prog(f, at('outside'), at('outside') + 8)}}>
              <Chip bg={C.blueSoft} color={C.blue} size={22}>{ic(CloudRain, 22)} weather</Chip>
              <Chip bg={C.greenSoft} color={C.green} size={22}>{ic(CircleDollarSign, 22)} exchange rates</Chip>
            </div>
          </div>
          <div style={{marginTop: 40, fontSize: 34, fontWeight: 800, color: C.navy, opacity: prog(f, today, today + 8)}}>Today: 2 live APIs, straight from your browser</div>
          <div style={{display: 'flex', gap: 14, marginTop: 18}}>
            <Chip f={f} at={at('install')} bg={C.redSoft} color={C.red}>{ic(Download, 24)} No install</Chip>
            <Chip f={f} at={at('sign in')} bg={C.redSoft} color={C.red}>{ic(LogIn, 24)} No sign-in</Chip>
            <Chip f={f} at={at('write code')} bg={C.redSoft} color={C.red}>{ic(Code2, 24)} No code</Chip>
          </div>
        </Stage>
      );
    },
  }];
};

const AGENDA: {t: string; I: I; c: string}[] = [
  {t: 'The restaurant example', I: Users, c: C.amber},
  {t: 'Live weather in Shenzhen', I: CloudRain, c: C.blue},
  {t: 'Exchange rates: yuan, peso, dirham', I: CircleDollarSign, c: C.green},
  {t: 'Reading the response', I: ListChecks, c: C.navy},
  {t: 'Asking vs submitting (GET / POST)', I: ArrowUpFromLine, c: C.odoo},
  {t: 'Status codes: did it work?', I: Check, c: C.red},
  {t: 'API keys', I: KeyRound, c: C.amber},
];
const Agenda: React.FC<{f: number; ats: number[]}> = ({f, ats}) => (
  <Stage f={f}>
    <Kicker>In this video</Kicker>
    <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: 0, marginTop: 6}}>
      {AGENDA.map((x, i) => (
        <Item key={i} f={f} at={ats[i] ?? 1e9} icon={ic(x.I, 26)} color={x.c} size={30}>{x.t}</Item>
      ))}
    </div>
  </Stage>
);
const c4 = (): Graphic[] => {
  const a = start(4);
  const at = (p: string) => rel(a, cue(4, p));
  return [{a, b: end(4), side: true, el: ({f}) => <Agenda f={f} ats={[at('restaurant'), at('check the weather'), at('exchange rates'), at('read the responses')]} />}];
};
const c5 = (): Graphic[] => {
  const a = start(5);
  const at = (p: string) => rel(a, cue(5, p)) + SKIP;
  return [{a, b: cue(5, "Let's start") + 0.6, side: true, el: ({f}) => <Agenda f={f + SKIP} ats={[0, 0, 0, 0, at('asking'), at('the numbers'), at('API keys')]} />}];
};

// ================================================================================================ STORY
const OrderCard: React.FC<{f: number; at: (p: string) => number; clip7?: boolean}> = ({f, at, clip7}) => (
  <Stage f={f}>
    <Kicker f={f} color={C.red}>Last September</Kicker>
    <Heading f={f} size={50}>The pallet jack wheels order</Heading>
    <div style={{marginTop: 30, padding: '28px 32px', borderRadius: 24, background: '#F1F5F9'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, fontSize: 36, fontWeight: 800, color: C.navy, opacity: prog(f, at('60'), at('60') + 8)}}>
        {ic(Truck, 36)} 60 sets · BL-1005
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 12, fontSize: 30, fontWeight: 600, color: C.slate, opacity: prog(f, at('Global'), at('Global') + 8)}}>
        {ic(MapPin, 28)} Global Lift Parts · Shenzhen, China
      </div>
      <div style={{display: 'flex', gap: 14, marginTop: 22}}>
        <Chip f={f} at={clip7 ? at('$38') : 1e9} bg={C.white}>$38 / set</Chip>
        <Chip f={f} at={clip7 ? at('21-day') : 1e9} bg={C.white}>21-day lead time</Chip>
      </div>
    </div>
    {clip7 && (
      <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 30, opacity: prog(f, at("Tom's"), at("Tom's") + 8)}}>
        <Tom size={110} />
        <div style={{fontSize: 30, fontWeight: 700, color: C.navy}}>Tom's team in Columbus: <span style={{color: C.red}}>3 of 5 pallet jacks</span> on worn-out wheels</div>
      </div>
    )}
  </Stage>
);
const c6 = (): Graphic[] => {
  const a = cue(6, 'Last September') - 0.3;
  return [
    {a: start(6) + 0.6, b: a - 0.2, el: ({f}) => <NameBar f={f} title="Real-World Story" sub="The Shenzhen Rainstorm" />},
    {a, b: end(6), side: true, el: ({f}) => <OrderCard f={f} at={(p) => rel(a, cue(6, p))} />},
  ];
};

type Ev = {day: string; t: string; I: I; c: string; at: number};
const Timeline: React.FC<{f: number; title: string; kicker: string; evs: Ev[]; foot?: React.ReactNode}> = ({f, title, kicker, evs, foot}) => (
  <Stage f={f}>
    <Kicker f={f} color={C.red}>{kicker}</Kicker>
    <Heading f={f} size={48}>{title}</Heading>
    <div style={{position: 'relative', marginTop: 30, paddingLeft: 46}}>
      <div style={{position: 'absolute', left: 18, top: 20, bottom: 20, width: 6, borderRadius: 3, background: C.slateSoft}} />
      {evs.map((e, i) => {
        const p = pop(f, e.at, 14);
        return (
          <div key={i} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 20, marginBottom: 18, opacity: p, transform: `translateX(${(1 - p) * 40}px)`}}>
            <div style={{position: 'absolute', left: -40, width: 30, height: 30, borderRadius: 15, background: e.c, boxShadow: `0 0 0 6px ${e.c}33`}} />
            <div style={{width: 160, fontSize: 26, fontWeight: 800, color: e.c, textTransform: 'uppercase', letterSpacing: 1}}>{e.day}</div>
            <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 16, padding: '16px 22px', borderRadius: 18, background: '#F1F5F9', fontSize: 30, fontWeight: 650, color: C.navy}}>
              <e.I size={30} color={e.c} /> {e.t}
            </div>
          </div>
        );
      })}
    </div>
    {foot}
  </Stage>
);
const c7 = (): Graphic[] => {
  const a = start(7);
  const storm = cue(7, 'On a Tuesday') - 0.3;
  const at = (p: string) => rel(storm, cue(7, p));
  return [
    {a, b: storm - 0.1, side: true, el: ({f}) => <OrderCard f={f + SKIP} at={(p) => (['60', 'Global'].includes(p) ? 0 : rel(a, cue(7, p)) + SKIP)} clip7 />},
    {
      a: storm, b: end(7), side: true,
      el: ({f}) => (
        <Timeline f={f} kicker="What happened" title="A rainstorm in southern China" evs={[
          {day: 'Tuesday', t: 'Rainstorm hits southern China', I: CloudRain, c: C.blue, at: at('rainstorm')},
          {day: '3 days', t: 'The port slows down', I: Ship, c: C.amber, at: at('The port')},
          {day: 'Missed', t: 'The container misses its vessel', I: X, c: C.red, at: at('the container')},
          {day: '+9 days', t: 'The wheels arrive nine days late', I: AlertTriangle, c: C.red, at: at('nine days')},
        ]} />
      ),
    },
  ];
};
const c8 = (): Graphic[] => {
  const a = start(8);
  const at = (p: string) => rel(a, cue(8, p));
  return [{
    a, b: end(8), side: true,
    el: ({f}) => (
      <Timeline f={f} kicker="The warning was there" title="…but nobody saw it in time" evs={[
        {day: 'Sunday', t: 'Weather warning already available', I: CloudRain, c: C.green, at: at('weather warning')},
        {day: 'Monday', t: 'Sarah finds out from a supplier email', I: Mail, c: C.red, at: at('until a supplier')},
      ]} foot={
        <div style={{marginTop: 24, opacity: prog(f, at('nobody'), at('nobody') + 8)}}>
          <Chip bg={C.redSoft} color={C.red} size={28}>{ic(Ban, 28)} Nobody was checking Shenzhen's weather every morning</Chip>
        </div>
      } />
    ),
  }];
};
const c9 = (): Graphic[] => {
  const a = start(9);
  const im = cue(9, 'Now imagine') - 0.3;
  const at = (p: string) => rel(a, cue(9, p));
  return [
    {
      a, b: im - 0.1, side: true,
      el: ({f}) => (
        <Stage f={f}>
          <Kicker f={f} color={C.red}>The cost of 9 days</Kicker>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 18}}>
            <div style={{fontSize: 120, fontWeight: 800, color: C.red, letterSpacing: -4}}>2<span style={{color: C.slate, fontSize: 70}}> / 5</span></div>
            <div style={{fontSize: 36, fontWeight: 700, color: C.slate}}>pallet jacks working</div>
          </div>
          <div style={{marginTop: 24}}>
            <Item f={f} at={at('overtime')} icon={ic(Timer)} color={C.amber}>Overtime</Item>
            <Item f={f} at={at('late customer')} icon={ic(Truck)} color={C.red}>A late customer shipment</Item>
            <Item f={f} at={at('difficult')} icon={<Harrison size={44} />} color={C.navy}>A difficult talk with Mr. Harrison</Item>
          </div>
        </Stage>
      ),
    },
    {a: im, b: end(9), side: true, el: ({f}) => <StockyMorning f={f} />},
  ];
};
const StockyMorning: React.FC<{f: number; alertAt?: number; follow?: number; discuss?: number}> = ({f, alertAt = 1e9, follow = 1e9, discuss = 1e9}) => (
  <Stage f={f}>
    <Kicker f={f} color={C.green}>Now imagine…</Kicker>
    <div style={{display: 'flex', alignItems: 'center', gap: 28}}>
      <StockyBot size={140} f={f} />
      <Heading f={f} size={46}>Stocky checks a weather API every morning</Heading>
    </div>
    <div style={{marginTop: 34, padding: '26px 30px', borderRadius: 24, background: C.amberSoft, border: `4px solid ${C.amber}`,
      opacity: pop(f, alertAt, 13), transform: `scale(${0.9 + 0.1 * pop(f, alertAt, 13)})`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, fontWeight: 800, color: '#92400E', textTransform: 'uppercase', letterSpacing: 2}}>
        {ic(MessageSquareWarning, 28)} Sunday · Stocky to Sarah
      </div>
      <div style={{fontSize: 34, fontWeight: 700, color: C.navy, marginTop: 10, lineHeight: 1.25}}>
        Heavy rain expected in Shenzhen, Tuesday to Thursday. <b>2 open orders</b> may be affected.
      </div>
    </div>
    <div style={{marginTop: 22}}>
      <Item f={f} at={follow} icon={ic(Mail)} color={C.blue} size={30}>Follow up with the supplier early</Item>
      <Item f={f} at={discuss} icon={<Tom size={40} />} color={C.navy} size={30}>Plan options with Tom</Item>
    </div>
  </Stage>
);
const c10 = (): Graphic[] => {
  const a = start(10);
  const at = (p: string) => rel(a, cue(10, p)) + SKIP;
  return [{a, b: end(10), side: true, el: ({f}) => <StockyMorning f={f + SKIP} alertAt={at('flag')} follow={at('follow up')} discuss={at('discuss')} />}];
};
const c11 = (): Graphic[] => {
  const a = start(11);
  const tr = cue(11, "Let's try") - 0.2;
  return [
    {a, b: tr - 0.1, side: true, el: ({f}) => <StockyMorning f={f + 2 * SKIP} alertAt={0} follow={0} discuss={0} />},
    {a: tr, b: end(11), el: ({f}) => <NameBar f={f} title="Let's try it" sub="A live weather API, in your browser" />},
  ];
};

// ================================================================================================ GET vs POST
const GetPost: React.FC<{f: number; at: (p: string) => number; post: boolean; ex?: boolean}> = ({f, at, post, ex}) => {
  const col = (k: 'read' | 'submit', title: string, line: string, eg: React.ReactNode, show: number) => {
    const p = pop(f, show, 14);
    const c = RW[k].color;
    const Ic = RW[k].I;
    return (
      <div style={{flex: 1, borderRadius: 26, overflow: 'hidden', background: C.white, boxShadow: `0 0 0 3px ${c}`, opacity: p, transform: `translateY(${(1 - p) * 30}px)`}}>
        <div style={{background: c, color: C.white, padding: '20px 26px', display: 'flex', alignItems: 'center', gap: 16}}>
          <Ic size={44} /><div style={{fontSize: 44, fontWeight: 800}}>{title}</div>
        </div>
        <div style={{padding: '20px 26px'}}>
          <div style={{fontSize: 29, fontWeight: 700, color: C.navy, lineHeight: 1.25}}>{line}</div>
          <div style={{marginTop: 16}}>{eg}</div>
        </div>
      </div>
    );
  };
  const exP = ex ? 1 : 0;
  return (
    <Stage f={f}>
      <Kicker f={f} color={C.odoo}>Asking vs submitting</Kicker>
      <div style={{display: 'flex', gap: 24}}>
        {col('read', 'GET', 'Asking the waiter to bring you information', (
          <div style={{fontSize: 25, fontWeight: 600, color: C.slate, lineHeight: 1.4}}>
            <div style={{opacity: prog(f, at('weather forecast'), at('weather forecast') + 8)}}>☁ weather forecast</div>
            <div style={{opacity: prog(f, at('exchange rates'), at('exchange rates') + 8)}}>$ exchange rates</div>
            <div style={{marginTop: 10, color: C.blue, fontWeight: 700, opacity: exP * prog(f, at('checking how'), at('checking how') + 8)}}>How many boxes of BL-1002 are in stock?</div>
          </div>
        ), at('GET requests'))}
        {col('submit', 'POST', 'Handing over an order slip for the kitchen to act on', (
          <div style={{fontSize: 25, fontWeight: 600, color: C.slate, lineHeight: 1.4}}>
            <div style={{color: C.amber, fontWeight: 700, opacity: exP * prog(f, at('Creating'), at('Creating') + 8)}}>Create a PO: 1,820 boxes from PackRight Industries</div>
            <div style={{marginTop: 8, opacity: exP * prog(f, at('new record'), at('new record') + 8)}}>→ a new record exists in Odoo</div>
          </div>
        ), post ? at('POST') : 1e9)}
      </div>
    </Stage>
  );
};
const c12 = (): Graphic[] => {
  const a = cue(12, 'So far') + 1.2;
  return [
    {a: start(12) + 0.6, b: a - 0.2, el: ({f}) => <NameBar f={f} title="Asking vs Submitting" sub="GET and POST" />},
    {a, b: end(12), side: true, el: ({f}) => <GetPost f={f} at={(p) => (['weather forecast', 'exchange rates', 'GET requests'].includes(p) ? rel(a, cue(12, p)) : 1e9)} post={false} />},
  ];
};
const c14 = (): Graphic[] => {
  const a = start(14);
  return [{
    a, b: end(14), side: true,
    el: ({f}) => <GetPost f={f + SKIP} ex post at={(p) => (['weather forecast', 'exchange rates', 'GET requests'].includes(p) ? 0 : rel(a, cue(14, p)) + SKIP)} />,
  }];
};
const c15 = (): Graphic[] => {
  const a = start(15);
  const at = (p: string) => rel(a, cue(15, p));
  return [{
    a, b: end(15), side: true,
    el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f} color={C.odoo}>The distinction to remember</Kicker>
        <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
          <Chip f={f} at={at('updates')} bg={C.slateSoft}>+ methods for updates</Chip>
          <Chip f={f} at={at('deletions')} bg={C.slateSoft}>+ deletions</Chip>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 34, opacity: prog(f, at('reading information'), at('reading information') + 8)}}>
          <Chip bg={RW.read.color} color={C.white} size={34}><ArrowDownToLine size={34} /> Reading</Chip>
          <div style={{fontSize: 36, fontWeight: 800, color: C.slate}}>vs</div>
          <Chip bg={RW.submit.color} color={C.white} size={34}><ArrowUpFromLine size={34} /> Submitting</Chip>
        </div>
        <div style={{marginTop: 40, display: 'flex', alignItems: 'center', gap: 26, opacity: prog(f, at('give Stocky'), at('give Stocky') + 8)}}>
          <StockyBot size={110} f={f} />
          <div style={{flex: 1}}>
            <Item f={f} at={at('check information')} icon={ic(Check)} color={C.green} size={30}>Checks information on its own</Item>
            <Item f={f} at={at('important changes')} icon={<Sarah size={44} />} color={C.amber} size={30}>Important changes need Sarah's approval first</Item>
          </div>
        </div>
      </Stage>
    ),
  }];
};
const Board: React.FC<{f: number; ats: number[]; reveals?: number[]; kicker?: string}> = ({f, ats, reveals = [], kicker = 'Pause & Think'}) => (
  <Stage f={f} style={{padding: '48px 50px'}}>
    <Kicker color={C.amber}>{kicker}</Kicker>
    <Heading size={44}>Reading, or submitting?</Heading>
    <div style={{marginTop: 26}}>
      {TASKS.map((_, i) => <TaskRow key={i} f={f} n={i} at={ats[i]} reveal={reveals[i]} />)}
    </div>
  </Stage>
);
const c16 = (): Graphic[] => {
  const a = start(16);
  return [{a, b: end(16), el: ({f}) => <NameBar f={f} title="Pause & Think" sub="Four tasks: GET or POST?" />}];
};
const c17 = (): Graphic[] => {
  const a = start(17);
  const at = (p: string) => rel(a, cue(17, p));
  return [{a, b: end(17), side: true, el: ({f}) => <Board f={f} ats={[at('First'), at('Second'), at('Third'), at('fourth')]} />}];
};
const c18a = (): Graphic[] => {
  const a = clipInfo(18).from - 1;
  return [{
    a, b: C18A_END + 1, side: true,
    el: ({f}) => (
      <>
        <Board f={f + SKIP} ats={[0, 0, 0, 0]} />
        <div style={{position: 'absolute', left: 96, width: 1020, bottom: 130, display: 'flex', justifyContent: 'center'}}>
          <Chip f={f} at={rel(a, cue(18, 'Pause here'))} bg={C.amber} color={C.navy} size={30}>⏸ Pause the video and decide</Chip>
        </div>
      </>
    ),
  }];
};
const c18b = (): Graphic[] => {
  const a = C18B_START - 1;
  const r = rel(a, cue(18, 'Checking the lead')) + SKIP;
  return [{a, b: end(18), side: true, el: ({f}) => <Board f={f + SKIP} ats={[0, 0, 0, 0]} reveals={[r, 1e9, 1e9, rel(a, cue(18, 'reading sales')) + SKIP]} kicker="The answers" />}];
};
const c19 = (): Graphic[] => {
  const a = start(19);
  const r = rel(a, cue(19, 'Changing')) + SKIP;
  return [{a, b: end(19), side: true, el: ({f}) => <Board f={f + SKIP} ats={[0, 0, 0, 0]} reveals={[0, r, rel(a, cue(19, 'sending the email')) + SKIP, 0]} kicker="The answers" />}];
};

// ================================================================================================ MISTAKES
const CHECKS: {t: string; d: string; I: I; c: string}[] = [
  {t: 'Check the address', d: 'One missing letter → 404', I: Link2, c: C.blue},
  {t: 'Check the units', d: 'Millimetres or inches?', I: Ruler, c: C.green},
  {t: 'Check you got everything', d: 'Asked for 3 currencies, got 2 (no dirham)', I: ListChecks, c: C.amber},
  {t: 'Protect your API keys', d: 'Exposed? Cancel it and create a new one', I: KeyRound, c: C.red},
];
const Checklist: React.FC<{f: number; ats: number[]; ds: number[]}> = ({f, ats, ds}) => (
  <Stage f={f}>
    <Kicker color={C.red}>Common beginner mistakes</Kicker>
    <Heading size={46}>4 things to check, every time</Heading>
    <div style={{marginTop: 28}}>
      {CHECKS.map((x, i) => (
        <Item key={i} f={f} at={ats[i] ?? 1e9} icon={ic(x.I)} color={x.c} size={32} align="start">
          <div>{x.t}</div>
          <div style={{fontSize: 24, fontWeight: 600, color: C.slate, marginTop: 4, opacity: prog(f, ds[i] ?? 1e9, (ds[i] ?? 1e9) + 8)}}>{x.d}</div>
        </Item>
      ))}
    </div>
  </Stage>
);
const c20 = (): Graphic[] => {
  const a = cue(20, 'First, check') - 0.3;
  const at = (p: string) => rel(a, cue(20, p));
  return [
    {a: start(20) + 0.6, b: a - 0.2, el: ({f}) => <NameBar f={f} title="Common Beginner Mistakes" sub="Four things to check whenever you use an API" />},
    {a, b: end(20), side: true, el: ({f}) => <Checklist f={f} ats={[at('First')]} ds={[at('404')]} />},
  ];
};
const chk = (clip: number, i: number, head: string, detail: string): Graphic[] => {
  const a = start(clip);
  const at = (p: string) => rel(a, cue(clip, p)) + SKIP;
  const ats = [0, 0, 0, 0].map((_, k) => (k < i ? 0 : k === i ? at(head) : 1e9));
  const ds = [0, 0, 0, 0].map((_, k) => (k < i ? 0 : k === i ? at(detail) : 1e9));
  return [{a, b: end(clip), side: true, el: ({f}) => <Checklist f={f + SKIP} ats={ats} ds={ds} />}];
};
const c24 = (): Graphic[] => {
  const a = start(24);
  const at = (p: string) => rel(a, cue(24, p));
  return [{
    a, b: end(24), side: true,
    el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f} color={C.green}>You've already…</Kicker>
        <div style={{marginTop: 6}}>
          <Item f={f} at={at('made two')} icon={ic(Check)} color={C.green}>Made two live API calls</Item>
          <Item f={f} at={at('read the')} icon={ic(Check)} color={C.green}>Read the responses</Item>
          <Item f={f} at={at('worked through')} icon={ic(Check)} color={C.green}>Worked through errors on purpose</Item>
        </div>
        <div style={{marginTop: 26, display: 'flex', alignItems: 'center', gap: 22, opacity: prog(f, at('When we connect'), at('When we connect') + 8)}}>
          <StockyBot size={100} f={f} />
          <div style={{fontSize: 32, fontWeight: 700, color: C.navy}}>You'll recognise the same requests, responses and errors in Stocky's workflow.</div>
        </div>
      </Stage>
    ),
  }];
};

// ================================================================================================ OUTRO
const Takeaways: React.FC<{f: number; one: number; oneSub: number; two: number; codes: number[]; three: number; threeSub: number[]}> = ({f, one, oneSub, two, codes, three, threeSub}) => {
  const box = (n: number, at: number, title: string, body: React.ReactNode, c: string) => {
    const p = pop(f, at, 14);
    return (
      <div style={{display: 'flex', gap: 22, padding: '20px 24px', borderRadius: 22, background: '#F1F5F9', marginBottom: 16, opacity: p, transform: `translateX(${(1 - p) * 40}px)`}}>
        <div style={{width: 60, height: 60, borderRadius: 18, background: c, color: C.white, fontSize: 32, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{n}</div>
        <div style={{flex: 1}}>
          <div style={{fontSize: 33, fontWeight: 800, color: C.navy}}>{title}</div>
          <div style={{fontSize: 24, fontWeight: 600, color: C.slate, marginTop: 6}}>{body}</div>
        </div>
      </div>
    );
  };
  const codeChip = (code: string, txt: string, c: string, at: number) => (
    <Chip f={f} at={at} bg={`${c}1F`} color={c} size={21} style={{marginRight: 8, marginTop: 8}}><b>{code}</b> {txt}</Chip>
  );
  return (
    <Stage f={f} style={{padding: '44px 54px'}}>
      <Kicker color={C.green}>3 things to remember</Kicker>
      {box(1, one, 'An API is the waiter', <span style={{opacity: prog(f, oneSub, oneSub + 8)}}>Stocky sends a <b>request</b> to an <b>endpoint</b>, with <b>parameters</b>, and gets a <b>response</b> back</span>, C.amber)}
      {box(2, two, 'The response is a labelled shopping list (JSON)', (
        <div>
          <div>Label + value · lists line up like Excel columns</div>
          <div>
            {codeChip('200', 'OK', C.green, codes[0])}{codeChip('401', 'key problem', C.red, codes[1])}
            {codeChip('404', 'not found', C.red, codes[2])}{codeChip('429', 'too often', C.amber, codes[3])}
          </div>
        </div>
      ), C.blue)}
      {box(3, three, 'Reading vs taking action', (
        <span>
          <span style={{opacity: prog(f, threeSub[0], threeSub[0] + 8)}}>GET asks, POST submits · </span>
          <span style={{opacity: prog(f, threeSub[1], threeSub[1] + 8)}}>important changes need Sarah's approval · </span>
          <span style={{opacity: prog(f, threeSub[2], threeSub[2] + 8)}}>Odoo needs an API key</span>
        </span>
      ), C.odoo)}
    </Stage>
  );
};
const c25 = (): Graphic[] => {
  const a = cue(25, "Let's go over") - 0.2;
  return [{a, b: end(25), el: ({f}) => <NameBar f={f} title="Recap" sub="Three things to remember" />}];
};
const NEVER = 1e9;
const take = (clip: number, which: 'one' | 'two' | 'codes' | 'three'): Graphic[] => {
  const a = start(clip);
  const at = (p: string) => rel(a, cue(clip, p)) + SKIP;
  return [{
    a, b: end(clip), side: true,
    el: ({f}) => {
      const done = 0;
      const p = {
        one: which === 'one' ? at('First') : done, oneSub: which === 'one' ? at('sends a request') : done,
        two: which === 'one' ? NEVER : which === 'two' ? at('Second') : done,
        codes: which === 'codes' ? [at('200'), at('401'), at('404'), at('429')] : which === 'three' ? [0, 0, 0, 0] : [NEVER, NEVER, NEVER, NEVER],
        three: which === 'three' ? at('And third') : NEVER,
        threeSub: which === 'three' ? [at('GET and POST'), at('Important'), at('private systems')] : [NEVER, NEVER, NEVER],
      };
      return <Takeaways f={f + SKIP} {...p} />;
    },
  }];
};

const ACT = [
  {t: 'Weather, currency & Mexico holiday APIs', I: Globe, k: 'try weather'},
  {t: 'Turn a stormy-week response into a table', I: CloudRain, k: 'stormy-week'},
  {t: 'Match status codes to their meanings', I: Check, k: 'match status'},
  {t: 'Sort GET and POST tasks', I: ArrowUpFromLine, k: 'sorting'},
  {t: 'Build links for your own suppliers', I: Link2, k: 'last tab'},
];
const Activity: React.FC<{f: number; ats: number[]; quiz: number}> = ({f, ats, quiz}) => (
  <Stage f={f} style={{padding: '46px 54px'}}>
    <Kicker color={C.green}>Your activity</Kicker>
    <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
      <Logo name="sheets" w={54} h={54} />
      <Heading size={40}>V03_Activity_API_Treasure_Hunt.xlsx</Heading>
    </div>
    <div style={{marginTop: 22}}>
      {ACT.map((x, i) => <Item key={i} f={f} at={ats[i] ?? NEVER} icon={ic(x.I, 26)} color={C.green} size={28}>{x.t}</Item>)}
    </div>
    <div style={{display: 'flex', gap: 14, marginTop: 10, opacity: prog(f, quiz, quiz + 8)}}>
      <Chip bg={C.blueSoft} color={C.blue} size={26}>{ic(Timer, 26)} ~30 minutes</Chip>
      <Chip bg={C.amberSoft} color="#92400E" size={26}>{ic(ClipboardList, 26)} then the 10-question quiz</Chip>
    </div>
  </Stage>
);
const act = (clip: number, from: number, upto: number, quizPhrase?: string): Graphic[] => {
  const a = start(clip);
  const at = (p: string) => rel(a, cue(clip, p)) + SKIP;
  return [{
    a, b: end(clip), side: true,
    el: ({f}) => <Activity f={f + SKIP} ats={ACT.map((x, i) => (i < from ? 0 : i < upto ? at(x.k) : NEVER))} quiz={quizPhrase ? at(quizPhrase) : NEVER} />,
  }];
};
const NextVideo: React.FC<{f: number; at: (p: string) => number; clip34?: boolean}> = ({f, at, clip34}) => (
  <Stage f={f}>
    <Kicker f={f} color={C.blue}>Next: Video 4</Kicker>
    <Heading f={f} size={52}>Databases Without Fear: Your Data's Home</Heading>
    <div style={{marginTop: 30}}>
      <Item f={f} at={clip34 ? 0 : at('stores')} icon={ic(PackageCheck)} color={C.blue} size={30}>Where Stocky stores what it found</Item>
      <Item f={f} at={clip34 ? 0 : at('why it made')} icon={ic(Search)} color={C.navy} size={30}>…and why it made each decision</Item>
      <Item f={f} at={clip34 ? at('Google Sheets') : NEVER} icon={<Logo name="sheets" w={36} h={36} />} color={C.white} size={30}>Google Sheets as Stocky's memory</Item>
    </div>
    <div style={{display: 'flex', gap: 12, marginTop: 14, flexWrap: 'wrap'}}>
      <Chip f={f} at={clip34 ? at('merged') : NEVER} bg={C.redSoft} color={C.red}>merged cells</Chip>
      <Chip f={f} at={clip34 ? at('duplicates') : NEVER} bg={C.redSoft} color={C.red}>duplicates</Chip>
      <Chip f={f} at={clip34 ? at('approx') : NEVER} bg={C.redSoft} color={C.red}>"approx 300"</Chip>
    </div>
  </Stage>
);
const c33 = (): Graphic[] => {
  const a = start(33);
  return [{a, b: end(33), side: true, el: ({f}) => <NextVideo f={f} at={(p) => rel(a, cue(33, p))} />}];
};
const c34 = (): Graphic[] => {
  const a = start(34);
  const bye = cue(34, "I'll see you") - 0.2;
  return [{a, b: bye, side: true, el: ({f}) => <NextVideo f={f + SKIP} clip34 at={(p) => rel(a, cue(34, p)) + SKIP} />}];
};

export const v3Graphics = (): Record<string, Graphic[]> => ({
  c1: c1(), c2: c2(), c3: c3(), c4: c4(), c5: c5(),
  c6: c6(), c7: c7(), c8: c8(), c9: c9(), c10: c10(), c11: c11(),
  c12: c12(), c14: c14(), c15: c15(), c16: c16(), c17: c17(), c18a: c18a(), c18b: c18b(), c19: c19(),
  c20: c20(), c21: chk(21, 1, 'Second', 'inches'), c22: chk(22, 2, 'Third', 'dirham'), c23: chk(23, 3, 'Fourth', 'cancel'), c24: c24(),
  c25: c25(), c26: take(26, 'one'), c27: take(27, 'two'), c28: take(28, 'codes'), c29: take(29, 'three'),
  c30: act(30, 0, 1), c31: act(31, 1, 4), c32: act(32, 4, 5, 'Allow'), c33: c33(), c34: c34(),
});
