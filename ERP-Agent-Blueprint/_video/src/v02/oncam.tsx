import React from 'react';
import {
  AlertTriangle, ArrowRight, Boxes, Check, ClipboardCheck, Clock, Database, FileSpreadsheet, FolderOpen, Hash, ListChecks, Mail, Map, Phone,
  ShieldCheck, ShoppingCart, Sparkles, Timer, ToggleLeft, ToggleRight, Truck, UtensilsCrossed, Warehouse, X,
} from 'lucide-react';
import {C, FPS, INTER} from '../theme';
import {pop, prog} from '../lib/anim';
import {cue} from './cues';
import {clipInfo} from './timeline';
import {Graphic} from '../components/OnCam';
import {Chip, Heading, Item, Kicker, NameBar, SideTag, Stage} from '../components/Gfx';
import {Face, StockyBot} from '../components/Art';
import {Logo} from '../components/Logo';

type I = React.FC<{size?: number; color?: string; strokeWidth?: number}>;
const ic = (Ic: I, s = 30) => <Ic size={s} strokeWidth={2.4} />;
const rel = (a: number, t: number) => Math.round((t - a) * FPS);
const end = (clip: number) => clipInfo(clip).to + 1;
const start = (clip: number) => clipInfo(clip).from - 1;
const SKIP = 400;

// ---------------------------------------------------------------- shared art
/** Filing cabinet: ERP = cabinet, drawers = modules, folders = records. `drawers` 0..3 shown, `open` index of open drawer. */
const Cabinet: React.FC<{f: number; labels: {t: string; at: number; c: string}[]; openAt?: number; folders?: {t: string; at: number}[]; size?: number}> = ({
  f, labels, openAt = 1e9, folders = [], size = 1,
}) => {
  const o = prog(f, openAt, openAt + 14);
  return (
    <div style={{position: 'relative', width: 360 * size, height: 470 * size, transform: `scale(${size})`, transformOrigin: 'top left'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 360, height: 470, borderRadius: 26, background: '#334155', boxShadow: 'inset 0 0 0 8px #475569'}} />
      {labels.map((d, i) => {
        const p = pop(f, d.at, 13);
        const isOpen = i === 0;
        const dx = isOpen ? o * 70 : 0;
        return (
          <div key={i} style={{position: 'absolute', left: 22 + dx, top: 26 + i * 110, width: 316, height: 96, borderRadius: 16, background: '#E2E8F0',
            boxShadow: isOpen && o > 0 ? '0 18px 30px rgba(0,0,0,0.35)' : '0 3px 0 #94A3B8', display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px',
            fontFamily: INTER, opacity: 0.35 + 0.65 * p, zIndex: isOpen ? 2 : 1}}>
            <div style={{width: 70, height: 14, borderRadius: 7, background: '#64748B'}} />
            <div style={{fontSize: 28, fontWeight: 800, color: d.c, opacity: p}}>{d.t}</div>
          </div>
        );
      })}
      {folders.map((fo, i) => {
        const p = pop(f, fo.at, 12);
        return (
          <div key={i} style={{position: 'absolute', left: 400 + i * 30, top: 10 + i * 64, width: 290, height: 58, borderRadius: '10px 10px 12px 12px',
            background: '#FDE68A', border: '2px solid #F59E0B', fontFamily: INTER, fontSize: 24, fontWeight: 800, color: '#92400E', display: 'flex',
            alignItems: 'center', gap: 10, padding: '0 16px', opacity: p, transform: `translateX(${(1 - p) * -60}px)`}}>
            <FolderOpen size={26} /> {fo.t}
          </div>
        );
      })}
    </div>
  );
};

// ---------------------------------------------------------------- INTRO
const c1 = (): Graphic[] => {
  const a = cue(1, 'A customer calls') - 0.2;
  return [
    {a: 1.6, b: 4.0, el: ({f}) => <NameBar f={f} title="ERP Demystified: A Supply Chain Pro's Tour of Odoo" sub="The ERP Agent Blueprint · Video 2" />},
    {a, b: end(1), side: true, el: ({f}) => <ScatterCard f={f} a={a} clip={1} />},
  ];
};
const ScatterCard: React.FC<{f: number; a: number; clip: 1 | 2}> = ({f, a, clip}) => {
  const k = clip === 1;
  const at = (p: string) => (k ? rel(a, cue(1, p)) : -999);
  const waits = clip === 2 ? rel(a, cue(2, 'while the customer')) : 1e9;
  return (
    <Stage f={k ? f : 99}>
      <Kicker f={k ? f : 99}>A situation you'll recognise</Kicker>
      <div style={{display: 'flex', gap: 22, alignItems: 'center', padding: '22px 26px', borderRadius: 24, background: C.blueSoft, opacity: pop(k ? f : 99, 4)}}>
        <div style={{width: 70, height: 70, borderRadius: 35, background: C.blue, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><Phone size={36} /></div>
        <div style={{fontSize: 34, fontWeight: 800, lineHeight: 1.25}}>“Do you have <span style={{color: C.blue}}>200 rolls of stretch wrap</span> I can collect tomorrow?”</div>
      </div>
      <div style={{marginTop: 22, opacity: prog(f, at('reliable stock'), at('reliable stock') + 8)}}>
        <Chip bg={C.amberSoft} color="#92400E" size={28}>{ic(Hash, 26)} You need one reliable stock number</Chip>
      </div>
      <div style={{display: 'flex', gap: 18, marginTop: 30}}>
        {[{t: 'Sales', s: 'a spreadsheet', I: FileSpreadsheet, c: C.green, p: 'Sales has'}, {t: 'Warehouse', s: "what's on the shelf", I: Warehouse, c: C.amber, p: 'The warehouse team'},
          {t: 'Procurement', s: 'POs in email', I: Mail, c: C.red, p: 'Procurement has'}].map((x, i) => {
          const p = pop(f, at(x.p), 13);
          return (
            <div key={x.t} style={{flex: 1, padding: '22px 18px', borderRadius: 22, background: '#F1F5F9', textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * 30}px) rotate(${(i - 1) * 2}deg)`}}>
              <x.I size={44} color={x.c} />
              <div style={{fontSize: 28, fontWeight: 800, marginTop: 8}}>{x.t}</div>
              <div style={{fontSize: 22, fontWeight: 600, color: C.slate}}>{x.s}</div>
            </div>
          );
        })}
      </div>
      <div style={{marginTop: 22, opacity: prog(f, waits, waits + 8)}}>
        <Chip bg={C.redSoft} color={C.red} size={28}>{ic(Timer, 26)} …while the customer waits</Chip>
      </div>
    </Stage>
  );
};
const c2 = (): Graphic[] => {
  const a0 = start(2);
  const erp = cue(2, 'ERP give') - 0.4;
  const wrong = cue(2, 'If the stock') - 0.2;
  const odoo = cue(2, 'So in this video') - 0.1;
  return [
    {a: a0, b: erp - 0.3, side: true, el: ({f}) => <ScatterCard f={f + SKIP} a={a0} clip={2} />},
    {a: erp, b: wrong - 0.2, side: true, el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f}>What an ERP does</Kicker>
        <Heading f={f} size={50}>One shared system for every team</Heading>
        <div style={{display: 'flex', alignItems: 'center', gap: 30, marginTop: 40}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            {[{t: 'Sales', c: C.green}, {t: 'Warehouse', c: C.amber}, {t: 'Procurement', c: C.red}].map((x, i) => (
              <div key={x.t} style={{padding: '16px 24px', borderRadius: 18, background: `${x.c}18`, color: x.c, fontSize: 30, fontWeight: 800, opacity: pop(f, 6 + i * 6)}}>{x.t}</div>
            ))}
          </div>
          <ArrowRight size={60} color={C.slate} style={{opacity: prog(f, 22, 30)}} />
          <div style={{flex: 1, padding: '34px 30px', borderRadius: 28, background: C.navy, color: C.white, textAlign: 'center', opacity: pop(f, 26), transform: `scale(${0.85 + 0.15 * pop(f, 26)})`}}>
            <Database size={64} color={C.hi} />
            <div style={{fontSize: 42, fontWeight: 800, marginTop: 10}}>ERP</div>
            <div style={{fontSize: 24, fontWeight: 600, opacity: 0.8}}>one source of truth</div>
          </div>
        </div>
        <div style={{marginTop: 30, display: 'flex', alignItems: 'center', gap: 16, opacity: prog(f, rel(erp, cue(2, 'start with Stocky')), rel(erp, cue(2, 'start with Stocky')) + 8)}}>
          <StockyBot size={70} f={f} /> <div style={{fontSize: 30, fontWeight: 800}}>…and where Stocky starts</div>
        </div>
      </Stage>
    )},
    {a: wrong, b: odoo - 0.2, side: true, el: ({f}) => (
      <Stage f={f} style={{alignItems: 'center', textAlign: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
          <div style={{padding: '22px 30px', borderRadius: 24, background: C.redSoft, color: C.red, fontSize: 40, fontWeight: 800, opacity: pop(f, 4)}}>Wrong stock number</div>
          <ArrowRight size={54} color={C.slate} style={{opacity: prog(f, 14, 22)}} />
          <div style={{opacity: pop(f, 18)}}><StockyBot size={130} f={f} /></div>
        </div>
        <div style={{marginTop: 34, fontSize: 44, fontWeight: 800, color: C.navy, opacity: prog(f, rel(wrong, cue(2, 'Stocky could')), rel(wrong, cue(2, 'Stocky could')) + 8)}}>= wrong advice for Sarah</div>
        <div style={{marginTop: 14, fontSize: 30, fontWeight: 600, color: C.slate, opacity: prog(f, rel(wrong, cue(2, 'even if')), rel(wrong, cue(2, 'even if')) + 8)}}>…even when it sounds convincing.</div>
        <div style={{marginTop: 30, opacity: prog(f, rel(wrong, cue(2, 'Sarah')), rel(wrong, cue(2, 'Sarah')) + 8)}}><Face name="sarah" size={120} /></div>
      </Stage>
    )},
    {a: odoo, b: end(2), side: true, el: ({f}) => (
      <Stage f={f} style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <div style={{transform: `scale(${0.8 + 0.2 * pop(f, 4)})`, opacity: pop(f, 4)}}><Logo name="odoo" w={380} h={130} /></div>
        <div style={{fontSize: 40, fontWeight: 800, marginTop: 30, opacity: prog(f, rel(odoo, cue(2, 'walk you through')), rel(odoo, cue(2, 'walk you through')) + 8)}}>The ERP we use all course</div>
        <div style={{fontSize: 28, fontWeight: 600, color: C.slate, marginTop: 10, opacity: prog(f, rel(odoo, cue(2, 'throughout')), rel(odoo, cue(2, 'throughout')) + 8)}}>Free trial · runs in your browser</div>
      </Stage>
    )},
  ];
};
const c3 = (): Graphic[] => {
  const a = start(3);
  const r = (p: string) => rel(a, cue(3, p));
  return [{
    a, b: end(3), side: true,
    el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f}>In this video</Kicker>
        <Heading f={f} size={50}>Your own Odoo, set up together</Heading>
        <div style={{marginTop: 30}}>
          <Item f={f} at={r('set up')} icon={ic(Sparkles)} color={C.odoo}>Create your own free Odoo trial</Item>
          <Item f={f} at={r('look around')} icon={ic(Boxes)} color={C.blue}>Tour the apps</Item>
          <Item f={f} at={r('three terms')} icon={ic(Database)} color={C.navy}>
            <div style={{display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap'}}>3 terms:
              <Chip f={f} at={r('module')} size={24} bg={C.blueSoft} color={C.blue}>module</Chip>
              <Chip f={f} at={r('record')} size={24} bg={C.amberSoft} color="#92400E">record</Chip>
              <Chip f={f} at={r('field')} size={24} bg={C.greenSoft} color={C.green}>field</Chip>
            </div>
          </Item>
          <Item f={f} at={r('Then we will add')} icon={ic(ListChecks)} color={C.green}>BrightLeaf's 10 products, stock & reorder points</Item>
        </div>
        <div style={{marginTop: 16, display: 'flex', alignItems: 'center', gap: 14, opacity: prog(f, r("That's the information"), r("That's the information") + 8)}}>
          <StockyBot size={60} f={f} /><div style={{fontSize: 28, fontWeight: 700}}>The data Stocky will work with</div>
        </div>
      </Stage>
    ),
  }];
};
const c4 = (): Graphic[] => {
  const a = cue(4, 'own test system') - 0.6;
  return [
    {a, b: cue(4, "Let's go") - 0.3, el: ({f}) => (
      <SideTag f={f} side="left" top={250} width={470}>
        {[{at: 0, t: 'Your own test system: explore without affecting your company', I: ShieldCheck},
          {at: rel(a, cue(4, 'never used')), t: 'New to ERPs? We go one step at a time', I: Check}].map(({at, t, I: Ic}, i) => {
          const p = pop(f, at, 14);
          return (
            <div key={i} style={{display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20, opacity: p}}>
              <div style={{width: 54, height: 54, borderRadius: 14, background: C.greenSoft, color: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><Ic size={30} strokeWidth={2.6} /></div>
              <div style={{fontSize: 27, fontWeight: 700, lineHeight: 1.2}}>{t}</div>
            </div>
          );
        })}
      </SideTag>
    )},
    {a: cue(4, "Let's go") - 0.1, b: end(4), el: ({f}) => <NameBar f={f} title="Up next: your free Odoo trial" sub="Sign-up takes about a minute" />},
  ];
};

// ---------------------------------------------------------------- RECORDS & FIELDS
const DRAWERS = (f0: (p: string) => number) => [
  {t: 'Inventory', at: f0('inventory'), c: C.amber}, {t: 'Purchase', at: f0('purchase'), c: C.odoo}, {t: 'Sales', at: f0('sales'), c: C.green}, {t: 'Contacts', at: f0('sales') + 10, c: C.blue},
];
const c5 = (): Graphic[] => {
  const cab = cue(5, 'Think of the ERP') - 0.2;
  return [
    {a: cue(5, 'Now that you') - 0.1, b: cue(5, 'You will hear') - 0.3, el: ({f}) => <NameBar f={f} title="Module · Record · Field" sub="The filing cabinet explained" />},
    {a: cue(5, 'You will hear') - 0.1, b: cab - 0.3, el: ({f}) => {
      const a = cue(5, 'You will hear') - 0.1;
      const items: {n: 'odoo' | 'sap' | 'oracle' | 'microsoft'; p: string; label?: string}[] = [{n: 'odoo', p: 'Odoo'}, {n: 'sap', p: 'SAP'}, {n: 'oracle', p: 'Oracle'}, {n: 'microsoft', p: 'Microsoft', label: 'Dynamics'}];
      return (
        <SideTag f={f} side="left" top={300} width={430}>
          <div style={{fontSize: 26, fontWeight: 800, marginBottom: 16}}>Same ideas in every ERP</div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}}>
            {items.map((x) => (
              <div key={x.n} style={{height: 80, borderRadius: 16, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: pop(f, rel(a, cue(5, x.p)), 13)}}>
                <Logo name={x.n} w={x.label ? 90 : 130} h={46} />{x.label && <span style={{fontSize: 18, fontWeight: 700}}>{x.label}</span>}
              </div>
            ))}
          </div>
        </SideTag>
      );
    }},
    {a: cab, b: end(5), side: true, el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f}>The big picture</Kicker>
        <Heading f={f} size={52}>An ERP is a filing cabinet</Heading>
        <div style={{marginTop: 34, display: 'flex', alignItems: 'flex-start', gap: 30}}>
          <div style={{opacity: pop(f, 8)}}><Cabinet f={f} labels={[]} size={0.9} /></div>
          <div style={{fontSize: 32, fontWeight: 700, color: C.slate, marginTop: 40, opacity: prog(f, 14, 24)}}>One cabinet.<br />Every department's records inside.</div>
        </div>
      </Stage>
    )},
  ];
};
const c6 = (): Graphic[] => {
  const a = start(6);
  const r = (p: string) => rel(a, cue(6, p));
  return [{
    a, b: end(6), side: true,
    el: ({f}) => (
      <Stage f={f + SKIP}>
        <Kicker>The big picture</Kicker>
        <Heading size={52}>An ERP is a filing cabinet</Heading>
        <div style={{marginTop: 34, display: 'flex', alignItems: 'flex-start', gap: 20}}>
          <Cabinet f={f} labels={DRAWERS(r)} openAt={r('Inside each drawer')} size={0.9}
            folders={[{t: 'One product', at: r('one product')}, {t: 'One supplier', at: r('one supplier')}, {t: 'A purchase order', at: r('a purchase order')}]} />
        </div>
        <div style={{display: 'flex', gap: 14, marginTop: 24}}>
          <Chip f={f} at={r('Each drawer')} bg={C.blueSoft} color={C.blue} size={26}>Drawer = module</Chip>
          <Chip f={f} at={r('Each folder')} bg={C.amberSoft} color="#92400E" size={26}>Folder = record</Chip>
        </div>
      </Stage>
    ),
  }];
};
const FormCard: React.FC<{f: number; ats: number[]; fieldAt: number}> = ({f, ats, fieldAt}) => (
  <div style={{width: 520, borderRadius: 22, background: '#FFFBEB', border: '3px solid #F59E0B', padding: '22px 26px'}}>
    <div style={{fontSize: 22, fontWeight: 800, color: '#92400E', marginBottom: 12, display: 'flex', gap: 10, alignItems: 'center'}}><FolderOpen size={24} /> One record (folder)</div>
    {[['Product name', 'Steel Hex Bolts M10'], ['Cost', '$12.50'], ['Supplier', 'Apex Fasteners'], ['Reorder point', '80']].map(([k, v], i) => {
      const p = pop(f, ats[i], 13);
      const hl = prog(f, fieldAt, fieldAt + 8);
      return (
        <div key={k} style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 10, opacity: p}}>
          <div style={{width: 170, fontSize: 22, fontWeight: 700, color: C.slate}}>{k}</div>
          <div style={{flex: 1, padding: '10px 14px', borderRadius: 10, background: C.white, border: `2px solid ${hl > 0.5 ? C.green : '#E2E8F0'}`, fontSize: 24, fontWeight: 700}}>{v}</div>
        </div>
      );
    })}
  </div>
);
const c7 = (): Graphic[] => {
  const a = start(7);
  const r = (p: string) => rel(a, cue(7, p));
  const xl = cue(7, 'If you are used') - 0.2;
  return [
    {a, b: xl - 0.3, side: true, el: ({f}) => (
      <Stage f={f + SKIP}>
        <Kicker>Inside each folder</Kicker>
        <Heading size={50}>A form with labelled boxes</Heading>
        <div style={{marginTop: 30}}><FormCard f={f} ats={[r('product name'), r('cost'), r('supplier'), r('reorder point')]} fieldAt={r('is a field')} /></div>
        <div style={{marginTop: 22, opacity: prog(f, r('is a field'), r('is a field') + 8)}}><Chip bg={C.greenSoft} color={C.green} size={28}>Each labelled box = a field</Chip></div>
      </Stage>
    )},
    {a: xl, b: end(7), side: true, el: ({f}) => {
      const rr = (p: string) => rel(xl, cue(7, p));
      return (
        <Stage f={f}>
          <Kicker f={f}>If you know Excel…</Kicker>
          <div style={{display: 'flex', gap: 30, marginTop: 10, alignItems: 'center'}}>
            <div style={{borderRadius: 14, border: '2px solid #CBD5E1', overflow: 'hidden', fontSize: 20, fontWeight: 600, opacity: pop(f, 4)}}>
              {[['SKU', 'Name', 'Cost', 'Reorder'], ['BL-1001', 'Bolts M10', '12.50', '80'], ['BL-1002', 'Box 18x12', '0.85', '1500'], ['BL-1005', 'Wheels', '38.00', '25']].map((row, ri) => (
                <div key={ri} style={{display: 'flex', background: ri === 0 ? '#D9EAD3' : ri === 2 && prog(f, rr('a record is like'), rr('a record is like') + 6) > 0.5 ? `${C.hi}66` : C.white}}>
                  {row.map((c, ci) => (
                    <div key={ci} style={{width: 120, padding: '12px 10px', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', fontWeight: ri === 0 ? 800 : 600,
                      background: ci === 2 && ri > 0 && prog(f, rr('a field is like'), rr('a field is like') + 6) > 0.5 ? `${C.green}33` : undefined}}>{c}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{marginTop: 30}}>
            <Item f={f} at={rr('a record is like')} icon={ic(FolderOpen, 26)} color={C.amber} size={30}>Record = a row</Item>
            <Item f={f} at={rr('a field is like')} icon={ic(Hash, 26)} color={C.green} size={30}>Field = a column</Item>
            <Item f={f} at={rr('A module is more')} icon={ic(Database, 26)} color={C.blue} size={30}>Module = a group of related sheets</Item>
          </div>
        </Stage>
      );
    }},
  ];
};
const c8 = (): Graphic[] => {
  const a = start(8);
  const r = (p: string) => rel(a, cue(8, p));
  return [
    {a, b: cue(8, "Let's create") - 0.3, side: true, el: ({f}) => (
      <Stage f={f + SKIP}>
        <Kicker>How Stocky reads Odoo</Kicker>
        <div style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 10}}>
          <StockyBot size={120} f={f} />
          <div style={{padding: '22px 26px', borderRadius: 24, borderTopLeftRadius: 6, background: C.navy, color: C.white, fontSize: 32, fontWeight: 800, opacity: pop(f, r('quantity on hand'))}}>
            How many BL-1005 on hand?
          </div>
        </div>
        <div style={{marginTop: 36}}>
          <Item f={f} at={r('which record')} icon={ic(FolderOpen, 28)} color={C.amber} size={32}>Which record? <b>&nbsp;BL-1005 Pallet Jack Wheels</b></Item>
          <Item f={f} at={r('which field')} icon={ic(Hash, 28)} color={C.green} size={32}>Which field? <b>&nbsp;Quantity On Hand</b></Item>
        </div>
        <div style={{marginTop: 20, opacity: prog(f, r('Once you understand'), r('Once you understand') + 8)}}>
          <Chip bg={C.blueSoft} color={C.blue} size={28}>{ic(Check, 24)} Know the terms → tell the agent exactly what to read</Chip>
        </div>
      </Stage>
    )},
    {a: cue(8, "Let's create") - 0.1, b: end(8), el: ({f}) => <NameBar f={f} title="Up next: create BL-1001 by hand" sub="See every field on the form" />},
  ];
};

// ---------------------------------------------------------------- COMMON MISTAKES
const c9 = (): Graphic[] => {
  const a = cue(9, 'A distributor') - 0.2;
  return [
    {a: cue(9, 'Before we add') - 0.1, b: a - 0.3, el: ({f}) => <NameBar f={f} title="Common mistakes" sub="Garbage in, garbage out" />},
    {a, b: end(9), side: true, el: ({f}) => <Story f={f} a={a} clip={9} />},
  ];
};
const Story: React.FC<{f: number; a: number; clip: 9 | 10}> = ({f, a, clip}) => {
  const k = clip === 9;
  const r9 = (p: string) => (k ? rel(a, cue(9, p)) : -999);
  const r10 = (p: string) => (k ? 1e9 : rel(a, cue(10, p)));
  return (
    <Stage f={k ? f : 99}>
      <Kicker f={k ? f : 99} color={C.red}>A real story</Kicker>
      <Heading f={k ? f : 99} size={46}>The alert that never fired</Heading>
      <div style={{marginTop: 26}}>
        <Item f={f} at={r9('set up an alert')} icon={ic(AlertTriangle, 26)} color={C.amber} size={28}>Alert: products below reorder point</Item>
        <Item f={f} at={r9('It ran for')} icon={ic(Clock, 26)} color={C.slate} size={28}>Ran 3 months · biggest product never flagged</Item>
        <Item f={f} at={r9('They discovered')} icon={ic(Truck, 26)} color={C.red} size={28}>Found out when a major order couldn't ship</Item>
      </div>
      <div style={{marginTop: 18, padding: '18px 22px', borderRadius: 20, background: C.redSoft, display: 'flex', alignItems: 'center', gap: 16, opacity: prog(f, r10('inventory tracking'), r10('inventory tracking') + 8)}}>
        <ToggleLeft size={54} color={C.red} />
        <div style={{fontSize: 28, fontWeight: 800, color: '#7F1D1D'}}>Cause: Track Inventory was OFF<div style={{fontSize: 22, fontWeight: 600, opacity: prog(f, r10('the ERP was not'), r10('the ERP was not') + 8)}}>The ERP wasn't counting it, so the alert had no number to check.</div></div>
      </div>
    </Stage>
  );
};
const c10 = (): Graphic[] => {
  const a = start(10);
  return [
    {a, b: cue(10, "that's an easy") - 0.3, side: true, el: ({f}) => <Story f={f + SKIP} a={a} clip={10} />},
    {a: cue(10, "that's an easy") - 0.1, b: cue(10, 'so there are three') - 0.2, el: ({f}) => (
      <SideTag f={f} side="left" top={360} width={440}>
        <div style={{fontSize: 30, fontWeight: 800}}>Easy to miss</div>
        <div style={{fontSize: 24, fontWeight: 600, color: C.slate, marginTop: 8}}>The product still works on orders. It just isn't being counted.</div>
      </SideTag>
    )},
    {a: cue(10, 'so there are three') - 0.1, b: end(10), side: true, el: ({f}) => <Checks f={f} ats={[1e9, 1e9, 1e9]} subs={[1e9, 1e9]} />},
  ];
};
const Checks: React.FC<{f: number; ats: number[]; subs: number[]}> = ({f, ats, subs}) => (
  <Stage f={f}>
    <Kicker f={f}>Before Stocky reads your data</Kicker>
    <Heading f={f} size={50}>3 things to check</Heading>
    <div style={{marginTop: 30}}>
      <Item f={f} at={ats[0]} icon={<ToggleRight size={34} />} color={C.green} size={32}>Inventory tracking is ON</Item>
      <Item f={f} at={ats[1]} icon={ic(Hash, 28)} color={C.blue} size={32}>
        <div>One consistent SKU per product</div>
        <div style={{display: 'flex', gap: 10, marginTop: 8, opacity: prog(f, subs[0], subs[0] + 8)}}>
          <Chip size={20} bg={C.greenSoft} color={C.green}>BL-1001 ✓</Chip>
          <Chip size={20} bg={C.redSoft} color={C.red} style={{textDecoration: 'line-through'}}>"M10 bolts"</Chip>
          <Chip size={20} bg={C.redSoft} color={C.red} style={{textDecoration: 'line-through'}}>"Hex Bolt M10"</Chip>
        </div>
      </Item>
      <Item f={f} at={ats[2]} icon={ic(Clock, 28)} color={C.amber} size={32}>
        <div>Supplier lead time entered</div>
        <div style={{fontSize: 22, fontWeight: 600, color: C.slate, marginTop: 6, opacity: prog(f, subs[1], subs[1] + 8)}}>How long until a replacement order arrives</div>
      </Item>
    </div>
  </Stage>
);
const c11 = (): Graphic[] => {
  const a = start(11);
  const r = (p: string) => rel(a, cue(11, p)) + SKIP;
  return [{a, b: end(11), side: true, el: ({f}) => <Checks f={f + SKIP} ats={[r('First,'), r('Second,'), r('And third')]} subs={[r('If the same item'), r('You need to know')]} />}];
};
const c12 = (): Graphic[] => {
  const a = start(12);
  const r = (p: string) => rel(a, cue(12, p));
  return [{
    a, b: end(12), side: true,
    el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f}>Why it matters for Stocky</Kicker>
        <div style={{display: 'flex', flexDirection: 'column', gap: 18, marginTop: 14}}>
          {[{t: 'Wrong or incomplete data', c: C.red, at: r('it could give'), I: X}, {t: 'A convincing but wrong answer', c: C.amber, at: r('convincing'), I: AlertTriangle},
            {t: 'A bad purchasing decision', c: C.red, at: r('She might then'), I: ShoppingCart}].map((x, i) => (
            <React.Fragment key={x.t}>
              {i > 0 && <div style={{marginLeft: 40, height: 22, borderLeft: `4px dashed ${C.slate}`, opacity: pop(f, x.at, 13)}} />}
              <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '20px 24px', borderRadius: 20, background: `${x.c}14`, opacity: pop(f, x.at, 13)}}>
                <x.I size={36} color={x.c} /><div style={{fontSize: 32, fontWeight: 800}}>{x.t}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={{marginTop: 26, opacity: prog(f, r('Getting these details'), r('Getting these details') + 8)}}>
          <Chip bg={C.greenSoft} color={C.green} size={30}>{ic(ShieldCheck, 28)} Get the details right now</Chip>
        </div>
      </Stage>
    ),
  }];
};

// ---------------------------------------------------------------- OUTRO
const c13 = (): Graphic[] => {
  const a = cue(13, 'You have set up') - 0.3;
  const r = (p: string) => rel(a, cue(13, p));
  return [
    {a: cue(13, 'All right') - 0.1, b: a - 0.3, el: ({f}) => <NameBar f={f} title="Recap" sub="What you built in Video 2" />},
    {a, b: cue(13, 'Before we finish') - 0.2, side: true, el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f}>Your Odoo now has</Kicker>
        <div style={{marginTop: 14}}>
          <Item f={f} at={0} icon={ic(Check, 28)} color={C.green} size={30}>Your own Odoo system</Item>
          <Item f={f} at={r('added')} icon={ic(Check, 28)} color={C.green} size={30}>BrightLeaf's 10 products</Item>
          <Item f={f} at={r('entered starting')} icon={ic(Check, 28)} color={C.green} size={30}>Starting stock</Item>
          <Item f={f} at={r('worked with')} icon={ic(Check, 28)} color={C.green} size={30}>Reorder rules</Item>
          <Item f={f} at={r('You have also seen')} icon={ic(Check, 28)} color={C.green} size={30}>A paper trail of every stock move</Item>
        </div>
      </Stage>
    )},
    {a: cue(13, 'Before we finish') - 0.1, b: end(13), side: true, el: ({f}) => <Takeaways f={f} ats={[1e9, 1e9, 1e9]} />},
  ];
};
const Takeaways: React.FC<{f: number; ats: number[]}> = ({f, ats}) => (
  <Stage f={f}>
    <Kicker f={f}>Recap</Kicker>
    <Heading f={f}>3 key takeaways</Heading>
    <div style={{marginTop: 26}}>
      <Item f={f} at={ats[0]} icon={<b style={{fontSize: 30}}>1</b>} size={30}>An ERP = one shared filing cabinet + rulebook</Item>
      <Item f={f} at={ats[1]} icon={<b style={{fontSize: 30}}>2</b>} size={30} color={C.green}>
        <div style={{display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap'}}>Module · Record · Field</div>
      </Item>
      <Item f={f} at={ats[2]} icon={<b style={{fontSize: 30}}>3</b>} size={30} color={C.amber}>Check your data: tracking, SKUs, lead times</Item>
    </div>
  </Stage>
);
const c14 = (): Graphic[] => {
  const a = start(14);
  const r = (p: string) => rel(a, cue(14, p)) + SKIP;
  return [{a, b: end(14), side: true, el: ({f}) => <Takeaways f={f + SKIP} ats={[r('First,'), r('Second,'), 1e9]} />}];
};
const c15 = (): Graphic[] => {
  const a = start(15);
  const hw = cue(15, 'To finish this lesson') - 0.2;
  return [
    {a, b: hw - 0.3, side: true, el: ({f}) => <Takeaways f={f + SKIP} ats={[0, 0, rel(a, cue(15, 'And third')) + SKIP]} />},
    {a: hw, b: end(15), side: true, el: ({f}) => <Homework f={f} imp={rel(hw, cue(15, 'Use the'))} wb={1e9} sheets={[1e9, 1e9, 1e9, 1e9]} quiz={1e9} />},
  ];
};
const Homework: React.FC<{f: number; imp: number; wb: number; sheets: number[]; quiz: number}> = ({f, imp, wb, sheets, quiz}) => (
  <Stage f={f}>
    <Kicker f={f}>Before Video 3</Kicker>
    <Heading f={f} size={48}>Two activity files</Heading>
    {[{at: imp, t: 'BrightLeaf Product Import', s: 'V02_Activity_BrightLeaf_Product_Import.xlsx · load the 9 products'},
      {at: wb, t: 'Odoo Setup Workbook', s: 'V02_Activity_Odoo_Setup_Workbook.xlsx'}].map((x) => (
      <div key={x.t} style={{marginTop: 20, padding: '20px 24px', borderRadius: 22, background: '#F0FDF4', border: `2px solid ${C.green}40`, opacity: pop(f, x.at), transform: `translateY(${(1 - pop(f, x.at)) * 24}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
          <div style={{width: 58, height: 58, borderRadius: 16, background: C.green, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><FileSpreadsheet size={32} /></div>
          <div><div style={{fontSize: 28, fontWeight: 800}}>{x.t}</div><div style={{fontSize: 20, color: C.slate, fontWeight: 600}}>{x.s}</div></div>
        </div>
        {x.at === wb && (
          <div style={{display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap'}}>
            <Chip f={f} at={sheets[0]} size={21} bg={C.white}>{ic(ClipboardCheck, 20)} Setup checklist</Chip>
            <Chip f={f} at={sheets[1]} size={21} bg={C.white}>Progress tracker</Chip>
            <Chip f={f} at={sheets[2]} size={21} bg={C.white}>Stock & reorder values</Chip>
            <Chip f={f} at={sheets[3]} size={21} bg={C.amberSoft} color="#92400E">{ic(Map, 20)} Map My ERP</Chip>
          </div>
        )}
      </div>
    ))}
    <div style={{marginTop: 18, padding: '18px 24px', borderRadius: 22, background: C.blueSoft, display: 'flex', alignItems: 'center', gap: 16, opacity: pop(f, quiz)}}>
      <ListChecks size={34} color={C.blue} /><div style={{fontSize: 28, fontWeight: 800}}>Quick 10-question quiz</div>
    </div>
  </Stage>
);
const c16 = (): Graphic[] => {
  const a = start(16);
  const r = (p: string) => rel(a, cue(16, p)) + SKIP;
  return [{a, b: end(16), side: true, el: ({f}) => <Homework f={f + SKIP} imp={0} wb={r('The Odoo setup')} sheets={[r('checklist'), r('progress'), r('starting stock'), r('It also has')]} quiz={1e9} />}];
};
const c17 = (): Graphic[] => {
  const a = start(17);
  const nx = cue(17, 'In video 3') - 0.2;
  return [
    {a, b: nx - 0.3, side: true, el: ({f}) => <Homework f={f + SKIP} imp={0} wb={0} sheets={[0, 0, 0, 0]} quiz={rel(a, cue(17, 'Then take')) + SKIP} />},
    {a: nx, b: cue(17, 'I will see you') - 0.2, side: true, el: ({f}) => (
      <Stage f={f}>
        <Kicker f={f}>Next · Video 3</Kicker>
        <Heading f={f} size={52}>APIs Explained Like You're Ordering at a Restaurant</Heading>
        <div style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 40, opacity: pop(f, rel(nx, cue(17, 'restaurant')))}}>
          <div style={{width: 120, height: 120, borderRadius: 60, background: C.amberSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><UtensilsCrossed size={64} color={C.amber} /></div>
          <div style={{fontSize: 32, fontWeight: 700}}>How Stocky talks to Odoo<br /><span style={{color: C.slate, fontSize: 26}}>no technical background needed</span></div>
        </div>
      </Stage>
    )},
  ];
};

export const v02Graphics = (): Record<string, Graphic[]> => ({
  c1: c1(), c2: c2(), c3: c3(), c4: c4(), c5: c5(), c6: c6(), c7: c7(), c8: c8(), c9: c9(), c10: c10(), c11: c11(), c12: c12(),
  c13: c13(), c14: c14(), c15: c15(), c16: c16(), c17: c17(),
});
