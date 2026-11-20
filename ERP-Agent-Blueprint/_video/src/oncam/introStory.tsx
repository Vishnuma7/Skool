import React from 'react';
import {
  AlertTriangle, BarChart3, Boxes, Check, ClipboardList, Clock as ClockIcon, CloudSun, Code2, Database, FileSpreadsheet,
  FileText, ListChecks, Quote, Mail, MapPin, NotebookPen, PackageSearch, Phone, RefreshCcw, ShoppingCart, Sparkles, Truck, X,
} from 'lucide-react';
import {C, FPS, INTER} from '../theme';
import {pop, prog} from '../lib/anim';
import {cue} from '../lib/cues';
import {clipInfo} from '../timeline';
import {Graphic} from '../components/OnCam';
import {Chip, Counter, Heading, Item, Kicker, NameBar, SideTag, Stage} from '../components/Gfx';
import {Clock, Harrison, MonthBar, Sarah, StockyBot, Tom} from '../components/Art';

const ic = (I: React.FC<{size?: number; strokeWidth?: number}>, s = 30) => <I size={s} strokeWidth={2.4} />;
/** frames from graphic start `a` to clip time `t` */
const rel = (a: number, t: number) => Math.round((t - a) * FPS);
const end = (clip: number) => clipInfo(clip).to + 1;
const start = (clip: number) => clipInfo(clip).from - 1;

// ---------- INTRO -------------------------------------------------------------------------------
const c1 = (): Graphic[] => {
  const q = cue(1, 'How much time');
  const twelve = cue(1, '12 hours');
  return [
    {a: 0.9, b: 3.2, el: ({f}) => <NameBar f={f} title="Why Your ERP Needs an AI Agent" sub="The ERP Agent Blueprint · Video 1" />},
    {
      a: q, b: twelve - 0.6, side: true,
      el: ({f}) => (
        <Stage f={f}>
          <Kicker f={f}>A simple question</Kicker>
          <Heading f={f} size={46}>How much time does a procurement manager spend every week just moving data around?</Heading>
          <div style={{marginTop: 36}}>
            <Item f={f} at={rel(q, cue(1, 'opening an ERP'))} icon={ic(Database)}>Opening the ERP</Item>
            <Item f={f} at={rel(q, cue(1, 'copying numbers'))} icon={ic(FileSpreadsheet)} color={C.green}>Copying numbers into Excel</Item>
            <Item f={f} at={rel(q, cue(1, 'checking stock'))} icon={ic(PackageSearch)} color={C.amber}>Checking stock levels</Item>
            <Item f={f} at={rel(q, cue(1, 'following up'))} icon={ic(Phone)} color={C.odoo}>Following up with suppliers</Item>
            <Item f={f} at={rel(q, cue(1, 'preparing the same'))} icon={ic(RefreshCcw)} color={C.red}>The same reports, again and again</Item>
          </div>
        </Stage>
      ),
    },
    {
      a: twelve - 0.3, b: end(1), side: true,
      el: ({f}) => <HoursCard f={f} yearAt={rel(twelve - 0.3, cue(1, "that's"))} />,
    },
  ];
};

const HoursCard: React.FC<{f: number; yearAt: number; monthsAt?: number; repAt?: number}> = ({f, yearAt, monthsAt, repAt}) => (
  <Stage f={monthsAt === undefined ? f : 99}>
    <Kicker>Time spent moving data</Kicker>
    <div style={{display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 6}}>
      <div style={{fontSize: 130, fontWeight: 800, color: C.blue, letterSpacing: -4}}>
        <Counter f={f} to={12} at={4} dur={18} />
      </div>
      <div style={{fontSize: 40, fontWeight: 700, color: C.slate}}>hours / week</div>
    </div>
    <div style={{fontSize: 34, fontWeight: 600, color: C.slate, opacity: prog(f, yearAt - 6, yearAt), margin: '4px 0 6px'}}>× 48 working weeks =</div>
    <div style={{display: 'flex', alignItems: 'baseline', gap: 18, opacity: prog(f, yearAt, yearAt + 6)}}>
      <div style={{fontSize: 150, fontWeight: 800, color: C.red, letterSpacing: -5}}>
        <Counter f={f} from={12} to={576} at={yearAt} dur={26} />
      </div>
      <div style={{fontSize: 40, fontWeight: 700, color: C.slate}}>hours / year</div>
    </div>
    {monthsAt !== undefined && (
      <div style={{marginTop: 24, opacity: prog(f, monthsAt, monthsAt + 8)}}>
        <MonthBar fill={3.5 * prog(f, monthsAt, monthsAt + 30)} />
        <div style={{marginTop: 22, fontSize: 36, fontWeight: 700}}>
          ≈ 3½ months of working time
          <span style={{color: C.slate, fontWeight: 600, opacity: prog(f, repAt ?? 0, (repAt ?? 0) + 8)}}> on repetitive tasks</span>
        </div>
      </div>
    )}
  </Stage>
);

const c2 = (): Graphic[] => {
  const a0 = start(2);
  const sarah = cue(2, 'follow someone') - 0.2;
  return [
    {
      a: a0, b: cue(2, 'Now, throughout') - 0.3, side: true,
      el: ({f}) => <HoursCard f={f + 200} yearAt={0} monthsAt={rel(a0, cue(2, 'almost')) + 200} repAt={rel(a0, cue(2, 'mostly')) + 200} />,
    },
    {a: sarah, b: end(2), side: true, el: ({f}) => <SarahCard f={f} a={sarah} clip={2} />},
  ];
};

const SarahCard: React.FC<{f: number; a: number; clip: 2 | 3}> = ({f, a, clip}) => {
  const k = clip === 2;
  const at = (phrase: string) => (k ? rel(a, cue(2, phrase)) : -999);
  const fict = clip === 3 ? rel(a, cue(3, 'fictional')) : 9999;
  return (
    <Stage f={k ? f : 99}>
      <Kicker>Meet our case study</Kicker>
      <div style={{display: 'flex', gap: 40, alignItems: 'center', marginTop: 10}}>
        <div style={{transform: `scale(${pop(k ? f : 99, 4)})`}}>
          <Sarah size={230} />
        </div>
        <div>
          <Heading f={k ? f : 99} delay={6} size={64}>Sarah Mitchell</Heading>
          <div style={{fontSize: 32, fontWeight: 600, color: C.slate, marginTop: 10, opacity: prog(f, at('manages'), at('manages') + 8)}}>
            Procurement & Inventory Manager
          </div>
          <div style={{marginTop: 18, transform: `scale(${pop(f, fict)})`, transformOrigin: 'left center', opacity: prog(f, fict, fict + 4)}}>
            <Chip bg={C.amberSoft} color="#92400E">Fictional character</Chip>
          </div>
        </div>
      </div>
      <div style={{marginTop: 44, padding: 34, borderRadius: 26, background: '#F1F5F9', opacity: prog(f, at('company called'), at('company called') + 8)}}>
        <div style={{fontSize: 46, fontWeight: 800, color: C.green}}>BrightLeaf Supplies</div>
        <div style={{display: 'flex', gap: 14, marginTop: 18, flexWrap: 'wrap'}}>
          <Chip f={f} at={at('industrial')} bg={C.white}>{ic(Boxes, 26)} Industrial supplies</Chip>
          <Chip f={f} at={at('packaging')} bg={C.white}>{ic(Truck, 26)} Packaging supplies</Chip>
          <Chip f={f} at={at('Columbus')} bg={C.redSoft} color={C.red}>{ic(MapPin, 26)} Columbus, Ohio</Chip>
        </div>
      </div>
    </Stage>
  );
};

const c3 = (): Graphic[] => {
  const a0 = start(3);
  const build = cue(3, 'Over the next') - 0.2;
  const call = cue(3, 'We are going to call') - 0.2;
  return [
    {a: a0, b: cue(3, 'In fact') - 0.2, side: true, el: ({f}) => <SarahCard f={f} a={a0} clip={3} />},
    {
      a: cue(3, 'some of you') - 0.1, b: cue(3, 'change') + 0.6,
      el: ({f}) => (
        <SideTag f={f} side="left" top={360} width={440}>
          <div style={{fontSize: 30, fontWeight: 800}}>Sound familiar?</div>
          <div style={{fontSize: 24, color: C.slate, marginTop: 8, fontWeight: 500}}>The same weekly routine, in thousands of supply chain teams.</div>
        </SideTag>
      ),
    },
    {
      a: build, b: call - 0.15, side: true,
      el: ({f}) => (
        <Stage f={f}>
          <Kicker f={f}>Over the next 10 videos</Kicker>
          <Heading f={f} size={46}>We'll build an AI agent that can…</Heading>
          <div style={{marginTop: 30}}>
            <Item f={f} at={rel(build, cue(3, 'connect'))} icon={ic(Database)}>Connect to your ERP</Item>
            <Item f={f} at={rel(build, cue(3, 'check the'))} icon={ic(PackageSearch)} color={C.amber}>Check inventory</Item>
            <Item f={f} at={rel(build, cue(3, 'look at external'))} icon={ic(CloudSun)} color="#0EA5E9">Check weather & exchange rates</Item>
            <Item f={f} at={rel(build, cue(3, 'record'))} icon={ic(NotebookPen)} color={C.green}>Record its decisions</Item>
            <Item f={f} at={rel(build, cue(3, 'prepare purchase'))} icon={ic(ShoppingCart)} color={C.odoo}>Prepare purchase requests</Item>
          </div>
        </Stage>
      ),
    },
    {a: call, b: end(3), side: true, el: ({f}) => <StockyCard f={f} nameAt={rel(call, cue(3, 'Stocky'))} />},
  ];
};

const StockyCard: React.FC<{f: number; nameAt: number; codeAt?: number}> = ({f, nameAt, codeAt}) => {
  const n = pop(f, nameAt, 11);
  return (
    <Stage f={codeAt === undefined ? f : 99} style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <div style={{transform: `scale(${0.6 + 0.4 * pop(f, 2)})`}}>
        <StockyBot size={250} f={f} wave={f > nameAt && f < nameAt + 40} />
      </div>
      <div style={{fontSize: 110, fontWeight: 800, color: C.navy, letterSpacing: -3, opacity: n, transform: `scale(${0.8 + 0.2 * n})`, marginTop: 12}}>
        Stocky
      </div>
      <div style={{fontSize: 32, fontWeight: 600, color: C.slate, opacity: prog(f, nameAt + 8, nameAt + 18)}}>
        BrightLeaf's inventory & procurement agent
      </div>
      {codeAt !== undefined && (
        <div style={{marginTop: 34, transform: `scale(${pop(f, codeAt, 10)})`}}>
          <Chip bg={C.greenSoft} color={C.green} size={36} f={f} at={codeAt}>
            {ic(Code2, 34)} 0 lines of code
          </Chip>
        </div>
      )}
    </Stage>
  );
};

const c4 = (): Graphic[] => {
  const a0 = start(4);
  const three = cue(4, 'Before we get') - 0.1;
  return [
    {a: a0, b: three - 0.3, side: true, el: ({f}) => <StockyCard f={f + 300} nameAt={0} codeAt={rel(a0, cue(4, 'without writing')) + 300} />},
    {
      a: three, b: end(4), side: true,
      el: ({f}) => (
        <Stage f={f}>
          <Kicker f={f}>Before we build</Kicker>
          <Heading f={f}>3 things to understand first</Heading>
          <div style={{marginTop: 40}}>
            <Item f={f} at={rel(three, cue(4, 'First'))} icon={<b style={{fontSize: 34}}>1</b>} size={36}>Chatbot vs automation vs AI agent</Item>
            <Item f={f} at={rel(three, cue(4, 'Second'))} icon={<b style={{fontSize: 34}}>2</b>} size={36} color={C.green}>What goes into an AI agent</Item>
            <Item f={f} at={rel(three, cue(4, 'And finally'))} icon={<b style={{fontSize: 34}}>3</b>} size={36} color={C.amber}>How we'll build it in this course</Item>
          </div>
        </Stage>
      ),
    },
  ];
};

const Reassure: React.FC<{f: number; second: number; third: number}> = ({f, second, third}) => (
  <SideTag f={f} side="left" top={260} width={470}>
    {[
      {at: 0, t: 'No coding background needed', I: Code2},
      {at: second, t: 'You already know your business', I: BarChart3},
      {at: third, t: 'Every idea explained with supply chain examples', I: Truck},
    ].map(({at, t, I}, i) => {
      const p = pop(f, at, 14);
      return (
        <div key={i} style={{display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20, opacity: p, transform: `translateX(${(1 - p) * -20}px)`}}>
          <div style={{width: 52, height: 52, borderRadius: 14, background: C.greenSoft, color: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
            <Check size={30} strokeWidth={3} />
          </div>
          <div style={{fontSize: 28, fontWeight: 700, lineHeight: 1.2}}>{t}</div>
          <I size={0} />
        </div>
      );
    })}
  </SideTag>
);

const c5 = (): Graphic[] => {
  const a = cue(5, 'technical background') - 0.4;
  const meet = cue(5, "let's meet") - 0.1;
  return [
    {a, b: cue(5, 'So, rather') - 0.3, el: ({f}) => <Reassure f={f} second={rel(a, cue(5, 'you already'))} third={rel(a, cue(5, 'using examples'))} />},
    {a: meet, b: end(5), el: ({f}) => <NameBar f={f} title="Up next: meet Stocky" sub="The finished agent, in action" />},
  ];
};

// ---------- STORY -------------------------------------------------------------------------------
type Task = {at: number; t: string; I: React.FC<{size?: number; strokeWidth?: number}>; c: string};
const MondayBoard: React.FC<{f: number; tasks: Task[]; clockAt: number; toH: number; fromH?: number; note?: React.ReactNode}> = ({
  f, tasks, clockAt, toH, fromH = 8.5, note,
}) => (
  <Stage f={f}>
    <Kicker f={f}>Sarah's Monday · before Stocky</Kicker>
    <div style={{display: 'flex', gap: 40, marginTop: 10}}>
      <div style={{paddingTop: 10}}>
        <Clock size={190} f={f} fromH={fromH} toH={toH} at={clockAt} dur={36} />
      </div>
      <div style={{flex: 1}}>
        {tasks.map((k, i) => (
          <Item key={i} f={f} at={k.at} icon={ic(k.I, 26)} color={k.c} size={28}>
            {k.t}
          </Item>
        ))}
        {note}
      </div>
    </div>
  </Stage>
);

const c6 = (): Graphic[] => {
  const a = cue(6, 'She comes into') - 0.2;
  return [
    {a: cue(6, 'Now,') + 0.2, b: cue(6, 'But what did') - 0.2, el: ({f}) => <NameBar f={f} title="Real-world story" sub="Sarah's Monday morning" />},
    {
      a, b: end(6), side: true,
      el: ({f}) => (
        <MondayBoard f={f} clockAt={rel(a, cue(6, 'around'))} fromH={7.9} toH={8.5} tasks={[
          {at: rel(a, cue(6, 'First')), t: 'Open Odoo, export inventory to Excel', I: Database, c: C.odoo},
          {at: rel(a, cue(6, 'Then she')), t: "Update last week's spreadsheet", I: FileSpreadsheet, c: C.green},
          {at: rel(a, cue(6, 'check the formulas')), t: 'Check formulas, fix what broke', I: AlertTriangle, c: C.amber},
        ]} />
      ),
    },
  ];
};

const c7 = (): Graphic[] => {
  const a = start(7);
  const tom = cue(7, 'But then') - 0.1;
  return [
    {
      a, b: tom - 0.3, side: true,
      el: ({f}) => (
        <MondayBoard f={f + 300} clockAt={rel(a, cue(7, 'By around')) + 300} fromH={8.5} toH={11} tasks={[
          {at: 0, t: 'Open Odoo, export inventory to Excel', I: Database, c: C.odoo},
          {at: 0, t: "Update last week's spreadsheet", I: FileSpreadsheet, c: C.green},
          {at: 0, t: 'Check formulas, fix what broke', I: AlertTriangle, c: C.amber},
          {at: rel(a, cue(7, 'identifies')) + 300, t: 'Find items below reorder point', I: ListChecks, c: C.red},
          {at: rel(a, cue(7, 'starts following')) + 300, t: 'Chase suppliers on delivery dates', I: Mail, c: C.blue},
          {at: rel(a, cue(7, 'preparing the weekly')) + 300, t: "Build Mr. Harrison's weekly report", I: FileText, c: C.navy},
        ]} note={
          <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 6, opacity: prog(f + 300, rel(a, cue(7, 'Harrison')) + 300, rel(a, cue(7, 'Harrison')) + 310)}}>
            <Harrison size={64} />
            <div style={{fontSize: 24, fontWeight: 700}}>Mr. Harrison <span style={{color: C.slate, fontWeight: 500}}>· Operations Director</span></div>
          </div>
        } />
      ),
    },
    {
      a: cue(7, 'Tom,'), b: end(7),
      el: ({f}) => (
        <SideTag f={f} side="left" top={380} width={440}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
            <Tom size={86} />
            <div>
              <div style={{fontSize: 34, fontWeight: 800}}>Tom</div>
              <div style={{fontSize: 24, color: C.slate, fontWeight: 600}}>Warehouse lead</div>
            </div>
          </div>
        </SideTag>
      ),
    },
  ];
};

const SHEET_ROWS = 60;
const MissedRow: React.FC<{f: number; scrollAt: number; redAt: number; missAt: number}> = ({f, scrollAt, redAt, missAt}) => {
  const rowH = 46;
  const scroll = prog(f, scrollAt, scrollAt + 60) * (41 - 6) * rowH;
  const red = prog(f, redAt, redAt + 8);
  const names = ['BL-1001 Steel Hex Bolts M10', 'BL-1002 Corrugated Box 18x12x10', 'BL-1004 Industrial Safety Gloves', 'BL-1005 Pallet Jack Wheels', 'BL-1006 Packing Tape 48mm', 'BL-1007 Hydraulic Oil 20L', 'BL-1008 LED Warehouse Light 150W', 'BL-1009 Nylon Cable Ties', 'BL-1010 Forklift Battery Water Kit'];
  return (
    <Stage f={f}>
      <Kicker f={f}>Monday inventory report</Kicker>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Heading f={f} size={44}>The warning was there…</Heading>
        <Chip f={f} at={scrollAt + 50} bg={C.navy} color={C.white}>Row 41 of {SHEET_ROWS}</Chip>
      </div>
      <div style={{marginTop: 24, borderRadius: 18, border: `2px solid ${C.slateSoft}`, overflow: 'hidden', height: 560, position: 'relative', fontSize: 24}}>
        <div style={{display: 'flex', background: '#E8F5E9', fontWeight: 800, height: rowH, alignItems: 'center', position: 'relative', zIndex: 2}}>
          <div style={{width: 80, textAlign: 'center', color: C.slate}}>#</div>
          <div style={{flex: 1}}>Product</div>
          <div style={{width: 150, textAlign: 'right', paddingRight: 30}}>On hand</div>
        </div>
        <div style={{transform: `translateY(${-scroll}px)`}}>
          {Array.from({length: SHEET_ROWS}).map((_, i) => {
            const n = i + 1;
            const hit = n === 41;
            return (
              <div key={i} style={{
                display: 'flex', height: rowH, alignItems: 'center', borderTop: `1px solid ${C.slateSoft}`,
                background: hit ? `rgba(220,38,38,${0.16 + 0.1 * red})` : n % 2 ? C.white : '#FAFAFA',
                color: hit ? C.red : C.navy, fontWeight: hit ? 800 : 500,
                outline: hit && red > 0 ? `${4 * red}px solid ${C.red}` : undefined, outlineOffset: -4,
              }}>
                <div style={{width: 80, textAlign: 'center', color: hit ? C.red : C.slate}}>{n}</div>
                <div style={{flex: 1}}>{hit ? 'BL-1003 Stretch Wrap Film 500mm' : names[i % names.length]}</div>
                <div style={{width: 150, textAlign: 'right', paddingRight: 30}}>{hit ? 'LOW' : ((i * 37) % 900) + 60}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{marginTop: 22, fontSize: 32, fontWeight: 700, color: C.red, opacity: prog(f, missAt, missAt + 8)}}>
        …but it was easy to miss.
      </div>
    </Stage>
  );
};

const c8 = (): Graphic[] => {
  const a = cue(8, 'The stretch wrap') - 0.2;
  return [
    {
      a, b: cue(8, 'and that') - 0.1, side: true,
      el: ({f}) => <MissedRow f={f} redAt={rel(a, cue(8, 'highlighted'))} scrollAt={rel(a, cue(8, 'somewhere'))} missAt={rel(a, cue(8, 'simply missed'))} />,
    },
    {
      a: cue(8, 'Sarah is not'), b: end(8) - 1.2,
      el: ({f}) => (
        <SideTag f={f} side="left" top={400} width={420}>
          <div style={{fontSize: 32, fontWeight: 800}}>Not a people problem.</div>
          <div style={{fontSize: 24, color: C.slate, fontWeight: 600, marginTop: 8}}>Sarah is good at her job.</div>
        </SideTag>
      ),
    },
  ];
};

const c9 = (): Graphic[] => {
  const a = cue(9, 'The problem') - 0.2;
  const r = cue(9, 'We are not trying') - 0.2;
  return [
    {
      a, b: cue(9, "And that's where") + 1.6, side: true,
      el: ({f}) => {
        const less = rel(a, cue(9, 'less time'));
        return (
          <Stage f={f}>
            <Kicker f={f}>Where Sarah's time goes</Kicker>
            <Heading f={f} size={46}>Busy collecting. Too little time to think.</Heading>
            <div style={{marginTop: 34}}>
              <Item f={f} at={rel(a, cue(9, 'collecting'))} icon={ic(ClipboardList, 26)} color={C.slate} size={30}>Collecting information</Item>
              <Item f={f} at={rel(a, cue(9, 'updating'))} icon={ic(FileSpreadsheet, 26)} color={C.slate} size={30}>Updating spreadsheets</Item>
              <Item f={f} at={rel(a, cue(9, 'checking numbers'))} icon={ic(ListChecks, 26)} color={C.slate} size={30}>Checking numbers</Item>
            </div>
            <div style={{marginTop: 20, padding: '22px 26px', borderRadius: 20, border: `3px dashed ${C.blue}`, opacity: prog(f, less, less + 8), display: 'flex', alignItems: 'center', gap: 18}}>
              <BarChart3 size={36} color={C.blue} />
              <div style={{fontSize: 30, fontWeight: 700}}>Analysing what's happening</div>
              <div style={{marginLeft: 'auto'}}>
                <Chip bg={C.redSoft} color={C.red}>less time</Chip>
              </div>
            </div>
            <div style={{marginTop: 26, opacity: prog(f, rel(a, cue(9, 'AI agent can help')), rel(a, cue(9, 'AI agent can help')) + 8)}}>
              <Chip bg={C.blueSoft} color={C.blue} size={30}>
                <Sparkles size={28} /> That's where an AI agent helps
              </Chip>
            </div>
          </Stage>
        );
      },
    },
    {
      a: r, b: cue(9, "That's the idea") + 1.2, side: true,
      el: ({f}) => {
        const yes = rel(r, cue(9, 'We are trying'));
        return (
          <Stage f={f} style={{justifyContent: 'center'}}>
            <Kicker f={f}>The goal of Stocky</Kicker>
            <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: 30, borderRadius: 24, background: C.redSoft, marginTop: 10, opacity: pop(f, 6)}}>
              <div style={{width: 74, height: 74, borderRadius: 37, background: C.red, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><X size={44} strokeWidth={3} /></div>
              <div style={{fontSize: 38, fontWeight: 800, color: '#7F1D1D'}}>Replace Sarah or her decisions</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: 30, borderRadius: 24, background: C.greenSoft, marginTop: 26, opacity: pop(f, yes), transform: `scale(${0.9 + 0.1 * pop(f, yes)})`}}>
              <div style={{width: 74, height: 74, borderRadius: 37, background: C.green, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Check size={44} strokeWidth={3} /></div>
              <div style={{fontSize: 38, fontWeight: 800, color: '#14532D'}}>Remove the repetitive work, so she can focus on what matters</div>
            </div>
          </Stage>
        );
      },
    },
  ];
};

export const introStoryGraphics = (): Record<string, Graphic[]> => ({
  c1: c1(), c2: c2(), c3: c3(), c4: c4(), c5: c5(), c6: c6(), c7: c7(), c8: c8(), c9: c9(),
});

