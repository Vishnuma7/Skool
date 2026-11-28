import React from 'react';
import {AbsoluteFill} from 'remotion';
import {AlertTriangle, Check, FileText, Keyboard, Lightbulb, Lock, Save, ShieldCheck, Wrench, X} from 'lucide-react';
import {C, FPS, INTER} from '../theme';
import {pop, prog} from '../lib/anim';
import {vcue, vdur} from './cues';
import {Chip} from '../components/Gfx';
import {Face} from '../components/Art';
import {Logo} from '../components/Logo';
import {FloatCard, SectionView, View} from './engine';
import {Shot} from '../screen/kit';
import {ChatBlock, ChatZoom, Crop, FocusCrop, fr, Patch, Patched, PR, RealTag} from './kit6';
import {AgentLoop, BeforeAfter, Drawers, Goldfish, PartsList, PauseCard, QuoteBubble, ReduceHallucination} from './gfx6';
import {EXTRA_AFTER} from './timeline';
import caprects from './caprects.json';

type Starts = Record<string, number>;
const mk = (starts: Starts) => ({
  T: (k: string, phrase?: string, nth = 0) => starts[k] + (phrase ? vcue(k, phrase, nth) : 0),
  E: (k: string) => starts[k] + vdur(k),
});
const N8N = 'brightleaf.app.n8n.cloud/workflow/CnZDME5og3w9lC4Q';
const ODOO_P = 'brightleaf-supplies.odoo.com/odoo/action-stock.product_template_action_product/45';
const ODOO_L = 'brightleaf-supplies.odoo.com/odoo/action-stock.product_template_action_product?view_type=list';
const card = (body: React.ReactNode, accent?: string) => (f: number) => <FloatCard f={f} x={0} y={0} w={500} accent={accent}>{body}</FloatCard>;
const big = (t: React.ReactNode, sub?: React.ReactNode) => (<><div style={{fontSize: 29, fontWeight: 800, lineHeight: 1.22}}>{t}</div>{sub && <div style={{fontSize: 21, fontWeight: 600, color: C.slate, marginTop: 8, lineHeight: 1.35}}>{sub}</div>}</>);
const kicker = (t: string, c: string = C.blue) => <div style={{fontSize: 19, fontWeight: 800, letterSpacing: 2.5, color: c, textTransform: 'uppercase', marginBottom: 10}}>{t}</div>;
const mono = (t: string) => <span style={{fontFamily: 'monospace', fontWeight: 700, color: C.blue}}>{t}</span>;
/** Panel card holding a real-screen crop (readable zoom of the field being talked about). */
const zoom = (k: string, shot: string, r: PR, hl: {r: PR; at: number; until?: number}[] = [], note?: React.ReactNode) => (f: number) => (
  <FloatCard f={f} x={0} y={0} w={500}>
    {kicker(k)}
    <Crop f={f} shot={shot} r={r} scale={440 / r.w} hl={hl} radius={10} />
    {note && <div style={{fontSize: 21, fontWeight: 700, color: C.slate, marginTop: 12, lineHeight: 1.35}}>{note}</div>}
  </FloatCard>
);
const tipCard = (label: string, body: React.ReactNode, mistake?: boolean) => card(<>
  <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 19, fontWeight: 800, letterSpacing: 2.5, color: mistake ? C.red : C.amber, textTransform: 'uppercase'}}>
    {mistake ? <AlertTriangle size={22} /> : <Lightbulb size={22} />}{label}</div>
  <div style={{fontSize: 23, fontWeight: 700, lineHeight: 1.38}}>{body}</div></>, mistake ? C.red : C.amber);

// ---------------------------------------------------------------- shared page rects (measured on the 2x captures)
const NDV = { // Odoo tool panel (same layout for all three tools)
  title: {x: 60, y: 30, w: 200, h: 30}, cred: {x: 767, y: 138, w: 366, h: 30}, toolDesc: {x: 767, y: 205, w: 380, h: 31}, desc: {x: 767, y: 274, w: 382, h: 60},
  resource: {x: 767, y: 372, w: 380, h: 30}, op: {x: 767, y: 440, w: 380, h: 30}, resname: {x: 767, y: 508, w: 360, h: 30}, returnAll: {x: 767, y: 552, w: 160, h: 28},
  fieldsval: {x: 767, y: 666, w: 355, h: 31}, all: {x: 758, y: 116, w: 400, h: 590},
};
const ANTH = {cred: {x: 767, y: 138, w: 380, h: 30}, model: {x: 859, y: 206, w: 271, h: 30}, list: {x: 767, y: 240, w: 380, h: 250}, sonnet: {x: 767, y: 279, w: 380, h: 26}};
const AGENT = {source: {x: 767, y: 104, w: 390, h: 22}, connected: {x: 767, y: 146, w: 388, h: 30}};
const OFFLINE: PR = {x: 1830, y: 14, w: 86, h: 38};
const off = (shot: string) => <Patched shot={shot}><Patch r={OFFLINE} /></Patched>;
const OD = {onhandBtn: {x: 614, y: 56, w: 134, h: 34}, minmax: {x: 1090, y: 57, w: 110, h: 32}, qty: {x: 40, y: 405, w: 180, h: 26}, purchaseTab: {x: 342, y: 238, w: 94, h: 39},
  vendor: {x: 46, y: 322, w: 120, h: 30}, price: {x: 1062, y: 322, w: 70, h: 30}, lead: {x: 1170, y: 322, w: 40, h: 30}, vrow: {x: 17, y: 282, w: 1230, h: 76}, header: {x: 0, y: 40, w: 1260, h: 420}};
const JSON6 = {rec: {x: 1540, y: 450, w: 375, h: 295}, partner: {x: 1586, y: 527, w: 170, h: 24}, product: {x: 1586, y: 608, w: 280, h: 24}, price: {x: 1572, y: 659, w: 110, h: 22},
  min: {x: 1572, y: 680, w: 120, h: 22}, delay: {x: 1572, y: 700, w: 100, h: 22}};

// ---------------------------------------------------------------- the real answers (verbatim from the n8n runs) + the one weak-prompt look-alike
const Q1 = "What's running low?";
const A1 = (hl: {rows: ([number, number?] | null)[]; first?: [number, number?]; watch?: [number, number?]; src?: [number, number?]}): ChatBlock[] => [
  {k: 'user', text: Q1},
  {k: 'p', text: 'Four products are running low, and one more is on the watch list.', hl: hl.first},
  {k: 'table', head: ['SKU', 'Product', 'On hand', 'Reorder point', 'Gap'], widths: [1, 2.6, 1, 1.3, 1.5], hl: hl.rows,
    rows: [['BL-1004', 'Industrial Safety Gloves (pair)', '420', '600', '-180 (-30.0%)'], ['BL-1005', 'Pallet Jack Wheels (set)', '18', '25', '-7 (-28.0%)'],
      ['BL-1007', 'Hydraulic Oil 20L', '31', '40', '-9 (-22.5%)'], ['BL-1002', 'Corrugated Shipping Box 18x12x10', '1,180', '1,500', '-320 (-21.3%)']]},
  {k: 'p', text: <><b>Watch list</b> (above the reorder point by 15% or less):</>},
  {k: 'table', head: ['SKU', 'Product', 'On hand', 'Reorder point', 'Gap'], widths: [1, 2.6, 1, 1.3, 1.5], hl: [hl.watch ?? null], rows: [['BL-1008', 'LED Warehouse Light 150W', '34', '30', '+4 (+13.3%)']]},
  {k: 'src', text: 'Source: Odoo (live) – get_products_and_stock, get_reorder_rules', hl: hl.src},
];
const Q2 = "Which supplier provides BL-1005 and what's the lead time?";
const A2 = (h: Record<string, [number, number?]>): ChatBlock[] => [
  {k: 'user', text: Q2},
  {k: 'p', text: <>BL-1005 Pallet Jack Wheels (set) comes from <b>Global Lift Parts</b>, and the lead time is <b>21 days</b>.</>, hl: h.first},
  {k: 'li', items: ['Purchase price: $38.00 per set', 'Minimum order quantity: 10 sets'], hl: [h.price, h.price]},
  {k: 'p', text: 'The item is running low, with 18 on hand against a reorder point of 25. A new order would take 21 days to arrive, so stock could run short before then.', hl: h.dots},
  {k: 'src', text: 'Source: Odoo (live) – get_supplier_info'},
];
const Q3 = 'And what about the hydraulic oil?';
const A3 = (h: Record<string, [number, number?]>): ChatBlock[] => [
  {k: 'user', text: Q3},
  {k: 'p', text: <>BL-1007 Hydraulic Oil 20L comes from <b>Gulf Lubricants</b>, and the lead time is <b>14 days</b>.</>, hl: h.first},
  {k: 'li', items: ['Purchase price: $54.00 per unit', 'Minimum order quantity: 1']},
  {k: 'p', text: 'The item is running low, with 31 on hand against a reorder point of 40 (a gap of -9).'},
  {k: 'src', text: 'Source: Odoo (live) – get_supplier_info'},
];
const QP = 'When will purchase order P00027 from Global Lift Parts arrive?';
const WEAK = 'Purchase order P00027 from Global Lift Parts is expected to arrive in about 3 weeks, since their lead time is 21 days. You should receive it around the end of the month.';
const AWEAK = (h: [number, number?]): ChatBlock[] => [
  {k: 'user', text: QP},
  {k: 'p', text: WEAK, hl: h},
];
const AFULL = (h: Record<string, [number, number?]>): ChatBlock[] => [
  {k: 'user', text: QP},
  {k: 'p', text: "I don't know. That information isn't in the Odoo data I can see.", hl: h.idk, bold: true},
  {k: 'p', text: "I can't see purchase orders, so I have no order dates, confirmation dates or expected receipt dates for P00027.", hl: h.cant},
  {k: 'p', text: <>To check, open <b>Purchase › Orders › P00027</b> in Odoo. The expected arrival is in the "Receipt Date" or "Expected Arrival" field.</>, hl: h.where},
  {k: 'p', text: "Global Lift Parts' standard lead times are listed below. They are defaults, not a promised date for this order.", hl: h.std},
  {k: 'table', head: ['SKU', 'Product', 'Lead time (days)'], widths: [1, 2.4, 1.3], rows: [['BL-1005', 'Pallet Jack Wheels (set)', '21'], ['BL-1010', 'Forklift Battery Water Kit', '12']]},
  {k: 'src', text: 'Source: Odoo (live) – get_supplier_info'},
];
const ATRAP1 = (h: [number, number?]): ChatBlock[] => [
  {k: 'user', text: 'How many BL-1011 do we have?'},
  {k: 'p', text: "I don't know. BL-1011 isn't in the Odoo data I can see. The product list only goes from BL-1001 to BL-1010.", hl: h, bold: true},
  {k: 'p', text: 'The SKU may be mistyped, or the product may not exist in Odoo yet, or it may be archived. To check, search Inventory › Products in Odoo for BL-1011.'},
  {k: 'src', text: 'Source: Odoo (live) – get_products_and_stock, get_reorder_rules'},
];
const ATRAP2 = (h: [number, number?]): ChatBlock[] => [
  {k: 'user', text: 'Order 50 more pallet jack wheels.'},
  {k: 'p', text: "I can't create or change anything in Odoo yet, so I can't place this order. You'll need to create the purchase order yourself, or ask someone with purchasing access to do it.", hl: h, bold: true},
  {k: 'li', items: ['Vendor: Global Lift Parts', 'Unit price: $38.00 · minimum order quantity: 10, so 50 meets it', 'Estimated cost for 50: $1,900.00 · standard lead time: 21 days']},
  {k: 'p', text: <>You can create the order in Odoo under <b>Purchase › Orders › New</b>.</>},
  {k: 'src', text: 'Source: Odoo (live) – get_products_and_stock, get_reorder_rules, get_supplier_info'},
];
/** The weak-prompt answer drawn into the real chat panel (n8n chat text style). */
const WeakBubble: React.FC<{r: PR; size?: number}> = ({r, size = 16}) => (
  <Patch r={r} style={{padding: '18px 20px', boxSizing: 'border-box', fontFamily: INTER, fontSize: size, lineHeight: 1.5, color: '#2B2B2B'}}>{WEAK}</Patch>
);
const weakAnswer = <Patched shot="s6_weak_answer"><WeakBubble r={{x: 56, y: 425, w: 520, h: 540}} />
  <Patch r={{x: 1012, y: 405, w: 900, h: 130}} style={{padding: '10px 6px', boxSizing: 'border-box', fontFamily: INTER, fontSize: 13, lineHeight: 1.45, color: '#333'}}>{WEAK}</Patch></Patched>;
const weakLogs = <Patched shot="s6_weak_logs"><WeakBubble r={{x: 378, y: 770, w: 432, h: 172}} />
  <Patch r={{x: 1158, y: 842, w: 756, h: 150}} style={{padding: '6px 8px', boxSizing: 'border-box', fontFamily: INTER, fontSize: 13, lineHeight: 1.45, color: '#333'}}>{WEAK}</Patch></Patched>;

/** Typing + running frames for one chat question. Returns views from `typed` to the answer. */
const runViews = (base: string, typed: number, send: number, runs: string[], doneAt: number, answer?: string | React.ReactNode): View[] => {
  const step = runs.length ? (doneAt - send) / runs.length : 0;
  const v: View[] = [{at: typed, tab: 'n8n6', shot: `${base}_typed`}];
  runs.forEach((r, i) => v.push({at: send + i * step, tab: 'n8n6', shot: r}));
  if (answer) v.push(typeof answer === 'string' ? {at: doneAt, tab: 'n8n6', shot: answer} : {at: doneAt, tab: 'n8n6', el: answer});
  return v;
};

// ================================================================ S1 Build Stocky's skeleton: chat, brain and memory
export const V6S1: React.FC<{starts: Starts}> = ({starts}) => {
  const {T, E} = mk(starts);
  const toCanvas = T('S1_01', 'Name it') - 0.5;
  const editName = T('S1_01', 'Name it') + 0.2, typedName = T('S1_01', 'Stocky') , named = T('S1_01', 'This is the');
  const toTrig = T('S1_02', 'and choose') - 0.3, toChatNdv = T('S1_02', 'Last video') - 0.6, toNode = T('S1_02', 'Every time') - 0.3;
  const toCreator = T('S1_03', 'search') - 0.4, toSearch = T('S1_03', 'search') + 0.5, toAgentNdv = T('S1_03', 'and add it') + 0.4, toAgentCanvas = T('S1_03', 'Close the panel') + 0.5;
  const toModelList = T('S1_04', 'Click the plus') + 1.0, toAnth = T('S1_04', 'choose Anthropic') + 1.2, toDrop = T('S1_04', 'and choose the newest') + 0.2, toSel = T('S1_04', 'Claude Sonnet') + 0.9, toModelCanvas = T('S1_04', 'Sonnet is') + 0.3;
  const toMemList = T('S1_05', 'Click the plus') + 0.9, toMemNdv = T('S1_05', 'choose Simple') + 1.0, toMem10 = T('S1_05', "I'll set it") + 0.6, toSkel = T('S1_05', "That's plenty") + 0.2;
  const toChat = T('S1_06', 'Click') + 0.4, typed = T('S1_06', 'and ask') + 0.2, send = T('S1_06', 'Look at the answer') - 1.2, ans = T('S1_06', 'Look at the answer') - 0.1;
  const partsOn = {trigger: fr(toNode - 0.2, toNode), agent: fr(toNode - 0.2, toAgentNdv), brain: fr(toNode - 0.2, toSel), memory: fr(toNode - 0.2, toMemNdv)};
  return (
    <SectionView tabs={['n8n6']}
      views={[
        {at: 0, tab: 'n8n6', shot: 's1_overview', url: 'brightleaf.app.n8n.cloud/home/workflows', title: 'Overview - n8n'},
        {at: toCanvas, tab: 'n8n6', el: off('s1_canvas_empty'), url: 'brightleaf.app.n8n.cloud/workflow/new', title: 'My workflow - n8n'},
        {at: editName, tab: 'n8n6', el: off('s1_name_edit')},
        {at: typedName, tab: 'n8n6', el: off('s1_name_typed')},
        {at: named, tab: 'n8n6', el: off('s1_named'), url: N8N, title: 'Stocky v1 – Reads the ERP - n8n'},
        {at: toTrig, tab: 'n8n6', shot: 's1_trigger_list'},
        {at: toChatNdv, tab: 'n8n6', shot: 's1_chat_ndv'},
        {at: toNode, tab: 'n8n6', shot: 's1_chat_node'},
        {at: toCreator, tab: 'n8n6', shot: 's1_creator_open'},
        {at: toSearch, tab: 'n8n6', shot: 's1_agent_search'},
        {at: toAgentNdv, tab: 'n8n6', shot: 's1_agent_ndv'},
        {at: toAgentCanvas, tab: 'n8n6', shot: 's1_agent_canvas'},
        {at: toModelList, tab: 'n8n6', shot: 's1_model_list'},
        {at: toAnth, tab: 'n8n6', shot: 's1_anthropic_ndv'},
        {at: toDrop, tab: 'n8n6', shot: 's1_model_dropdown'},
        {at: toSel, tab: 'n8n6', shot: 's1_model_selected'},
        {at: toModelCanvas, tab: 'n8n6', shot: 's1_model_canvas'},
        {at: toMemList, tab: 'n8n6', shot: 's1_memory_list'},
        {at: toMemNdv, tab: 'n8n6', shot: 's1_memory_ndv'},
        {at: toMem10, tab: 'n8n6', shot: 's1_memory_10'},
        {at: toSkel, tab: 'n8n6', shot: 's1_skeleton'},
        {at: toChat, tab: 'n8n6', shot: 's1_chat_empty'},
        {at: typed, tab: 'n8n6', shot: 's1_chat_typed'},
        {at: send, tab: 'n8n6', shot: 's1_chat_running'},
        {at: ans, tab: 'n8n6', shot: 's1_chat_answer'},
      ]}
      boxes={[
        {shot: 's1_overview', key: 'create', a: T('S1_01', 'click') - 0.2, b: toCanvas},
        {shot: 's1_named', key: 'name', a: named, b: E('S1_01') + 0.3},
        {shot: 's1_named', key: 'first', a: T('S1_02', 'Click') - 0.2, b: toTrig},
        {shot: 's1_trigger_list', key: 'chat', a: toTrig + 0.3, b: toChatNdv, pad: 6},
        {shot: 's1_chat_node', key: 'node', a: T('S1_02', 'Every time'), b: T('S1_02', 'See the new')},
        {shot: 's1_chat_node', key: 'chatbtn', a: T('S1_02', 'See the new'), b: E('S1_02') + 0.3},
        {shot: 's1_agent_search', key: 'item', a: toSearch + 0.3, b: toAgentNdv, pad: 4},
        {shot: 's1_agent_ndv', key: 'title', a: toAgentNdv + 0.1, b: T('S1_03', 'Look at'), pad: 6},
        {shot: 's1_model_list', key: 'anthropic', a: toModelList + 0.3, b: toAnth, pad: 6},
        {shot: 's1_memory_list', key: 'simple', a: toMemList + 0.3, b: toMemNdv, pad: 6},
        {shot: 's1_memory_10', key: 'ctx', a: toMem10, b: toSkel},
        {shot: 's1_chat_empty', key: 'input', a: toChat + 0.2, b: typed},
      ]}
      keys={[
        {t: 0.4, x: 1500, y: 700},
        {t: toCanvas - 0.1, shot: 's1_overview', key: 'create', click: true},
        {t: editName - 0.1, shot: 's1_canvas_empty', key: 'name', click: true},
        {t: toTrig - 0.1, shot: 's1_named', key: 'first', dy: -20, click: true},
        {t: toChatNdv - 0.1, shot: 's1_trigger_list', key: 'chat', dx: -80, click: true},
        {t: toNode - 0.1, x: 1500, y: 140, click: true},
        {t: toCreator - 0.1, shot: 's1_chat_node', key: 'node', dx: 60, click: true},
        {t: toAgentNdv - 0.1, shot: 's1_agent_search', key: 'item', dx: -80, click: true},
        {t: toAgentCanvas - 0.1, x: 1900, y: 36, click: true},
        {t: toModelList - 0.1, shot: 's1_agent_canvas', key: 'agent', dx: -80, dy: 92, click: true},
        {t: toAnth - 0.1, shot: 's1_model_list', key: 'anthropic', dx: -20, click: true},
        {t: toDrop - 0.1, x: ANTH.model.x + 120, y: ANTH.model.y + 15, click: true},
        {t: toSel - 0.1, x: ANTH.sonnet.x + 120, y: ANTH.sonnet.y + 13, click: true},
        {t: toModelCanvas - 0.1, x: 1900, y: 36, click: true},
        {t: toMemList - 0.1, shot: 's1_model_canvas', key: 'agent', dx: 0, dy: 92, click: true},
        {t: toMemNdv - 0.1, shot: 's1_memory_list', key: 'simple', dx: -40, click: true},
        {t: toMem10 - 0.1, shot: 's1_memory_10', key: 'ctx', dx: -120, click: true},
        {t: toSkel - 0.1, x: 1900, y: 36, click: true},
        {t: toChat - 0.1, shot: 's1_skeleton', key: 'chatbtn', click: true},
        {t: typed - 0.1, shot: 's1_chat_empty', key: 'input', click: true},
        {t: send - 0.1, x: 470, y: 1029, click: true},
        {t: ans + 1, x: 1300, y: 560},
      ]}
      overlays={[
        {a: named + 0.2, b: E('S1_01') + 0.3, el: card(big('Name it straight away', <>“Stocky v1 – Reads the ERP”<br />You'll keep improving this workflow for the rest of the course.</>), C.blue)},
        {a: T('S1_02', 'Last video'), b: T('S1_02', 'Every time') - 0.2, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={500} accent={C.amber}>
            {kicker('The doorbell', C.amber)}
            <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, fontWeight: 700, color: C.slate}}><span style={{textDecoration: 'line-through'}}>Video 5: a button</span></div>
            <div style={{fontSize: 30, fontWeight: 800, marginTop: 8, opacity: pop(f, fr(T('S1_02', 'Last video'), T('S1_02', 'Today')))}}>Today: a chat message</div>
          </FloatCard>)},
        {a: toNode, b: T('S1_03', 'Now click') - 0.1, el: (f) => <PartsList f={f} on={{trigger: 0}} />},
        {a: T('S1_03', 'Look at'), b: T('S1_03', 'Close the panel') + 0.3, el: zoom('Source for Prompt', 's1_agent_ndv', {x: 760, y: 96, w: 400, h: 86}, [{r: AGENT.connected, at: fr(T('S1_03', 'Look at'), T('S1_03', 'It already says'))}],
          'Whatever we type in the chat becomes Stocky\'s task.')},
        {a: T('S1_04', 'Underneath'), b: toModelList - 0.3, el: (f) => <PartsList f={f} on={{trigger: 0, agent: 0, brain: fr(T('S1_04', 'Underneath'), T('S1_04', 'First, the brain'))}} title="Three plugs under the agent" />},
        {a: T('S1_04', 'pick the credential'), b: toDrop - 0.1, el: zoom('Credential', 's1_anthropic_ndv', {x: 760, y: 112, w: 400, h: 130}, [{r: ANTH.cred, at: 4}], 'Anthropic – BrightLeaf, saved in Video 5')},
        {a: toSel + 0.1, b: E('S1_04') + 0.3, el: zoom('Model', 's1_model_selected', {x: 760, y: 112, w: 400, h: 130}, [{r: ANTH.model, at: 4}], 'The newest Claude Sonnet: good at deciding which tool to use.')},
        {a: T('S1_05', 'The Context'), b: toSkel, el: zoom('Context Window Length', 's1_memory_10', {x: 760, y: 440, w: 400, h: 60}, [{r: {x: 767, y: 464, w: 387, h: 28}, at: 4}], 'How many back-and-forth messages Stocky remembers.')},
        {a: toSkel + 0.1, b: E('S1_05') + 0.3, el: (f) => <PartsList f={f} on={{trigger: 0, agent: 0, brain: 0, memory: 4}} />},
        {a: ans + 0.3, b: T('S1_06', 'A brain without') - 0.2, el: zoom("Stocky's reply", 's1_chat_answer', {x: 56, y: 596, w: 520, h: 150}, [], 'No access to inventory data yet. Good: it has a brain and memory, but no hands.')},
        {a: T('S1_06', 'A brain without'), b: E('S1_06') + 0.4, el: (f) => <PartsList f={f} on={{...partsOn, trigger: 0, agent: 0, brain: 0, memory: 0, tools: fr(T('S1_06', 'A brain without'), T('S1_06', "Let's give"))}} done={{tools: 1e9}} title="Missing: the hands" />},
      ]}
      lowers={[{a: toMemNdv + 0.2, b: toMemNdv + 5.2, text: "Simple Memory = the intern's notepad for this conversation. It does NOT remember forever."}]}
      full={[
        {a: T('S1_05', 'Why do we need'), b: T('S1_05', 'The Context') - 0.3, el: (f) => <Goldfish f={f} second={fr(T('S1_05', 'Why do we need'), T('S1_05', 'then ask'))} reply={fr(T('S1_05', 'Why do we need'), T('S1_05', 'and Stocky says'))} fix={fr(T('S1_05', 'Why do we need'), T('S1_05', 'Like an intern')) + 30} />},
      ]}
    />
  );
};

// ================================================================ S2 Give Stocky hands: three Odoo tools
export const V6S2: React.FC<{starts: Starts}> = ({starts}) => {
  const {T, E} = mk(starts);
  const toPurch = T('S2_01', 'And on the Purchase') + 0.6;
  const dr = T('S2_01', 'Three kinds') - 0.2;
  const toN8n = starts.S2_02 - 0.2, toNdv0 = T('S2_02', 'and choose') + 0.6, toNdv1 = starts.S2_03 + 0.2;
  const toDup = starts.S2_05 - 0.2, toT2 = T('S2_05', 'The name') - 0.1, toT3 = starts.S2_06 + 0.2, toFull = starts.S2_07 - 0.2;
  const z = (a: number) => fr(starts.S2_03, a);
  return (
    <SectionView tabs={['odoo6', 'n8n6']}
      views={[
        {at: 0, tab: 'odoo6', shot: 's2_odoo_product', url: ODOO_P, title: '[BL-1005] Pallet Jack Wheels (set) - Odoo'},
        {at: toPurch, tab: 'odoo6', shot: 's2_odoo_purchase'},
        {at: toN8n, tab: 'n8n6', shot: 's1_skeleton', url: N8N, title: 'Stocky v1 – Reads the ERP - n8n'},
        {at: toN8n + 0.9, tab: 'n8n6', shot: 's2_tool_search'},
        {at: toNdv0, tab: 'n8n6', shot: 's2_tool_ndv_default'},
        {at: toNdv1, tab: 'n8n6', shot: 's2_tool1_ndv'},
        {at: toDup, tab: 'n8n6', shot: 's2_duplicate_menu'},
        {at: toT2, tab: 'n8n6', shot: 's2_tool2_ndv'},
        {at: toT3, tab: 'n8n6', shot: 's2_tool3_ndv'},
        {at: toFull, tab: 'n8n6', shot: 's2_full_canvas'},
      ]}
      boxes={[
        {shot: 's2_odoo_product', key: 'onhandBtn', a: T('S2_01', 'On hand'), b: T('S2_01', 'The reorder rule')},
        {shot: 's2_odoo_product', key: 'minmax', a: T('S2_01', 'The reorder rule'), b: toPurch - 0.2},
        {shot: 's2_odoo_product', key: 'purchaseTab', a: T('S2_01', 'And on the Purchase') - 0.2, b: toPurch},
        {shot: 's2_odoo_purchase', key: 'vrow', a: toPurch + 0.2, b: dr - 0.1, pad: 4},
        {shot: 's2_tool_search', key: 'item', a: T('S2_02', 'Search'), b: toNdv0, pad: 6},
        {shot: 's2_duplicate_menu', key: 'dup', a: toDup + 0.2, b: toT2, pad: 8},
        {shot: 's2_full_canvas', key: 'trigger', a: T('S2_07', 'A doorbell'), b: T('S2_07', 'an intern')},
        {shot: 's2_full_canvas', key: 'agent', a: T('S2_07', 'an intern'), b: T('S2_07', 'a brain')},
        {shot: 's2_full_canvas', key: 'model', a: T('S2_07', 'a brain'), b: T('S2_07', 'a notepad')},
        {shot: 's2_full_canvas', key: 'memory', a: T('S2_07', 'a notepad'), b: T('S2_07', 'and three hands')},
        {shot: 's2_full_canvas', key: 't1', a: T('S2_07', 'and three hands'), b: T('S2_07', 'And notice')},
        {shot: 's2_full_canvas', key: 't2', a: T('S2_07', 'and three hands') + 0.3, b: T('S2_07', 'And notice')},
        {shot: 's2_full_canvas', key: 't3', a: T('S2_07', 'and three hands') + 0.6, b: T('S2_07', 'And notice')},
      ]}
      keys={[
        {t: 0.4, x: 1500, y: 700},
        {t: toPurch - 0.1, x: OD.purchaseTab.x + 47, y: OD.purchaseTab.y + 20, click: true},
        {t: toN8n - 0.1, tab: 'n8n6', click: true},
        {t: toN8n + 0.8, x: 1268, y: 612, click: true},
        {t: toNdv0 - 0.1, shot: 's2_tool_search', key: 'item', click: true},
        {t: toNdv1 + 0.4, x: NDV.title.x + 60, y: NDV.title.y + 15, click: true},
        {t: T('S2_03', 'Credential') - 0.1, x: NDV.cred.x + 180, y: NDV.cred.y + 15, click: true},
        {t: T('S2_03', 'Set it manually') - 0.1, x: NDV.toolDesc.x + 180, y: NDV.toolDesc.y + 15, click: true},
        {t: T('S2_04', 'Resource') - 0.1, x: NDV.resource.x + 180, y: NDV.resource.y + 15, click: true},
        {t: T('S2_04', 'For the name') - 0.1, x: NDV.resname.x + 220, y: NDV.resname.y + 15, click: true},
        {t: T('S2_04', 'Operation') - 0.1, x: NDV.op.x + 180, y: NDV.op.y + 15, click: true},
        {t: T('S2_04', 'Switch on') - 0.1, x: NDV.returnAll.x + 18, y: NDV.returnAll.y + 14, click: true},
        {t: T('S2_04', 'Fields to Include') - 0.1, x: NDV.fieldsval.x + 200, y: NDV.fieldsval.y + 15, click: true},
        {t: toDup - 0.4, shot: 's2_duplicate_menu', key: 'tool'},
        {t: toT2 - 0.1, shot: 's2_duplicate_menu', key: 'dup', click: true},
        {t: toT3 + 1, x: NDV.title.x + 60, y: NDV.title.y + 15, click: true},
        {t: toFull - 0.1, x: 1900, y: 36, click: true},
        {t: T('S2_07', 'Save it') + 0.2, x: 1500, y: 860},
      ]}
      overlays={[
        {a: T('S2_01', 'On hand'), b: T('S2_01', 'The reorder rule') - 0.1, el: zoom('On hand', 's2_odoo_product', {x: 600, y: 48, w: 620, h: 50}, [{r: OD.onhandBtn, at: 4}])},
        {a: T('S2_01', 'The reorder rule'), b: toPurch - 0.1, el: zoom('Reorder rule (Min / Max)', 's2_odoo_product', {x: 600, y: 48, w: 620, h: 50}, [{r: OD.minmax, at: 4}], 'Minimum 25 = the reorder point')},
        {a: toPurch + 0.3, b: dr - 0.2, el: zoom('Purchase tab: vendor line', 's2_odoo_purchase', {x: 30, y: 282, w: 1210, h: 76}, [
          {r: OD.vendor, at: fr(toPurch + 0.3, T('S2_01', 'Global Lift'))}, {r: OD.price, at: fr(toPurch + 0.3, T('S2_01', 'thirty-eight'))}, {r: OD.lead, at: fr(toPurch + 0.3, T('S2_01', 'delivery lead time'))}],
          'Global Lift Parts · $38.00 · lead time 21 days')},
        {a: T('S2_01', 'If one of your'), b: E('S2_01') + 0.3, el: card(big('Garbage in, garbage out', 'Missing a reorder rule or a vendor line? Add it now.'), C.amber)},
        {a: T('S2_02', 'This is the same'), b: E('S2_02') + 0.3, el: card(<><div style={{display: 'flex', alignItems: 'center', gap: 14}}><Logo name="odoo_mark" w={44} />{big('The same Odoo waiter from Video 3')}</div>
          <div style={{fontSize: 21, fontWeight: 600, color: C.slate, marginTop: 10}}>…but now it works for the agent. Stocky calls it whenever it decides it needs data.</div></>, C.odoo)},
        {a: T('S2_03', 'First, rename'), b: T('S2_03', 'Credential') - 0.1, el: zoom('Tool name', 's2_tool1_ndv', {x: 56, y: 26, w: 300, h: 38}, [{r: NDV.title, at: 4}], 'Stocky reads the name to decide when to use the tool.')},
        {a: T('S2_03', 'Credential'), b: T('S2_03', 'Next') - 0.1, el: zoom('Credential', 's2_tool1_ndv', {x: 760, y: 112, w: 400, h: 62}, [{r: NDV.cred, at: 4}])},
        {a: T('S2_03', 'This sentence'), b: E('S2_03') + 0.3, el: card(big('The label on the drawer', 'A clear label means Stocky opens the right drawer.'), C.blue)},
        {a: T('S2_04', 'Resource'), b: T('S2_04', 'And finally') - 0.1, el: zoom('Which drawer', 's2_tool1_ndv', {x: 760, y: 350, w: 400, h: 236}, [
          {r: NDV.resource, at: 4, until: fr(T('S2_04', 'Resource'), T('S2_04', 'For the name'))},
          {r: NDV.resname, at: fr(T('S2_04', 'Resource'), T('S2_04', 'For the name')), until: fr(T('S2_04', 'Resource'), T('S2_04', 'Operation'))},
          {r: NDV.op, at: fr(T('S2_04', 'Resource'), T('S2_04', 'Operation')), until: fr(T('S2_04', 'Resource'), T('S2_04', 'Switch on'))},
          {r: NDV.returnAll, at: fr(T('S2_04', 'Resource'), T('S2_04', 'Switch on'))}])},
        {a: T('S2_04', 'And finally'), b: T('S2_04', 'Why only four') - 0.1, el: zoom('Fields to Include', 's2_tool1_ndv', {x: 760, y: 640, w: 400, h: 64}, [{r: NDV.fieldsval, at: 4}],
          <>{mono('default_code')} = the SKU</>)},
        {a: T('S2_04', 'Why only four'), b: E('S2_04') + 0.4, el: tipCard('Beginner mistake', <>Leaving “Fields to Include” empty: Odoo sends back dozens of fields per product, and every question costs several times more for no better answer.</>, true)},
        {a: toT2 + 0.2, b: E('S2_05') + 0.3, el: zoom('Tool 2: get_reorder_rules', 's2_tool2_ndv', {x: 760, y: 490, w: 400, h: 214}, [
          {r: NDV.resname, at: fr(toT2 + 0.2, T('S2_05', 'The drawer'))}, {r: NDV.fieldsval, at: fr(toT2 + 0.2, T('S2_05', 'And the fields'))}], 'Minimum quantity = your reorder point')},
        {a: toT3 + 0.2, b: T('S2_06', 'In Odoo') - 0.1, el: zoom('Tool 3: get_supplier_info', 's2_tool3_ndv', {x: 760, y: 490, w: 400, h: 214}, [
          {r: NDV.resname, at: fr(toT3 + 0.2, T('S2_06', 'The drawer'))}, {r: NDV.fieldsval, at: fr(toT3 + 0.2, T('S2_06', 'The fields'))}])},
        {a: T('S2_06', 'In Odoo'), b: E('S2_06') + 0.3, el: zoom('Description', 's2_tool3_ndv', {x: 760, y: 252, w: 400, h: 90}, [{r: NDV.desc, at: 4}],
          <>{mono('delay')} = delivery lead time in days, <span style={{color: C.red}}>not</span> "the shipment is late"</>)},
        {a: T('S2_07', 'A doorbell'), b: T('S2_07', 'And notice') - 0.1, el: (f) => {
          const at = (p: string) => fr(T('S2_07', 'A doorbell'), T('S2_07', p));
          return <PartsList f={f} on={{trigger: 0, agent: at('an intern'), brain: at('a brain'), memory: at('a notepad'), tools: at('and three hands')}} title="Stocky v1, complete" />;
        }},
        {a: T('S2_07', 'And notice'), b: E('S2_07') + 0.5, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={500} accent={C.green}>
            {kicker('Every tool: Get Many', C.green)}
            {['get_products_and_stock', 'get_reorder_rules', 'get_supplier_info'].map((t, i) => (
              <div key={t} style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 21, fontWeight: 700, marginTop: 6, opacity: pop(f, 6 + i * 5)}}><Wrench size={20} color={C.slate} />{mono(t)}</div>))}
            <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 25, fontWeight: 800, marginTop: 14}}><ShieldCheck size={28} color={C.green} /> Reads only. Changes nothing.</div>
            <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 16, padding: '8px 14px', borderRadius: 12, background: C.greenSoft, color: '#14532D', fontSize: 22, fontWeight: 800,
              opacity: pop(f, fr(T('S2_07', 'And notice'), T('S2_07', 'Save it')))}}><Keyboard size={22} /> Cmd / Ctrl + S <Save size={22} /> Saved</div>
          </FloatCard>)},
      ]}
      lowers={[
        {a: dr + 0.4, b: dr + 5.4, text: 'Drawer 1: products & stock | Drawer 2: reorder rules | Drawer 3: suppliers & lead times'},
        {a: T('S2_07', "That's on purpose"), b: E('S2_07') + 0.8, text: 'Stocky v1 is READ-ONLY. Safe to experiment.'},
      ]}
      full={[
        {a: dr, b: T('S2_01', 'If one of your') - 0.2, el: (f) => <Drawers f={f} ats={[6, 22, 38]} tools={fr(dr, T('S2_01', 'So we'))} />},
      ]}
    />
  );
};

// ================================================================ S3 Write Stocky's system prompt
const PT = 's3_prompt_top', PB = 's3_prompt_bottom';
export const V6S3: React.FC<{starts: Starts}> = ({starts}) => {
  const {T, E} = mk(starts);
  const toAdd = T('S3_01', 'go to Options') + 0.3, toDef = T('S3_01', 'delete the default') - 0.2, toClr = T('S3_01', 'and paste') - 0.4, toFull = T('S3_01', 'and paste') + 0.4, toTop = T('S3_01', "Let's walk") - 0.2;
  const q = starts.S3_06q, qEnd = E('S3_06q') + EXTRA_AFTER.S3_06q;
    const promptFocus = (a: number, b: number, title: string, shot: string, r: PR, hl: {k: string; at: number}[], side?: React.ReactNode, scale = 2.05) => ({
    a, b, el: (f: number) => {
      const rects = (caprects as unknown as Record<string, Record<string, PR>>)[shot];
      return <FocusCrop f={f} kicker="Stocky's system prompt" title={title} shot={shot} r={r} scale={scale} hl={hl.map((h) => ({r: rects[h.k], at: h.at}))} side={side} />;
    },
  });
  return (
    <SectionView tabs={['n8n6']}
      views={[
        {at: 0, tab: 'n8n6', shot: 's2_full_canvas', url: N8N, title: 'Stocky v1 – Reads the ERP - n8n'},
        {at: 1.0, tab: 'n8n6', shot: 's1_agent_ndv'},
        {at: toAdd, tab: 'n8n6', shot: 's3_add_option'},
        {at: toDef, tab: 'n8n6', shot: 's3_sys_default'},
        {at: toClr, tab: 'n8n6', shot: 's3_sys_cleared'},
        {at: toFull, tab: 'n8n6', shot: 's3_sys_full'},
        {at: toTop, tab: 'n8n6', shot: PT},
        {at: starts.S3_05 - 0.2, tab: 'n8n6', shot: PB},
      ]}
      boxes={[
        {shot: 's3_add_option', key: 'sys', a: toAdd + 0.2, b: toDef, pad: 6},
        {shot: 's3_sys_default', key: 'sys', a: toDef + 0.1, b: toClr},
        {shot: 's3_sys_full', key: 'field', a: toFull + 0.1, b: toTop},
      ]}
      keys={[
        {t: 0.4, x: 1500, y: 700},
        {t: 0.9, shot: 's2_full_canvas', key: 'agent', click: true},
        {t: toAdd - 0.1, x: 1186, y: 296, click: true},
        {t: toDef - 0.1, shot: 's3_add_option', key: 'sys', click: true},
        {t: toClr - 0.1, shot: 's3_sys_default', key: 'sys', click: true},
        {t: toTop - 0.1, x: 1150, y: 420, click: true},
        {t: toTop + 0.8, x: 1300, y: 900},
      ]}
      overlays={[
        {a: T('S3_01', "You'll find"), b: toTop - 0.1, el: card(<><div style={{display: 'flex', alignItems: 'center', gap: 14}}><FileText size={40} color={C.blue} />
          <div><div style={{fontSize: 26, fontWeight: 800}}>Stocky Prompt Builder</div><div style={{fontSize: 18, color: C.slate, fontWeight: 600}}>V06_Activity_Stocky_Prompt_Builder.docx</div></div></div>
          <div style={{fontSize: 22, fontWeight: 700, color: C.slate, marginTop: 12}}>The full prompt is in the activity file. No need to pause and type.</div></>, C.blue)},
        {a: T('S3_05', 'The source line'), b: E('S3_05') + 0.4, el: tipCard('Pro tip', <>Save every prompt version in a document, with the date and what you changed (v1, v1.1, v1.2…). When an answer gets worse, you'll know what changed.</>)},
      ]}
      full={[
        promptFocus(starts.S3_02 - 0.1, E('S3_02') + 0.2, 'Role and Goal', PT, {x: 1413, y: 192, w: 482, h: 204}, [
          {k: 'role', at: 6}, {k: 'goal', at: fr(starts.S3_02 - 0.1, T('S3_02', 'and what success'))}],
          <div style={{width: 420, opacity: 1}}>{['# ROLE', '# GOAL'].map((h) => <div key={h} style={{fontSize: 40, fontWeight: 800, fontFamily: 'monospace', color: C.hi}}>{h}</div>)}
            <div style={{fontSize: 26, fontWeight: 700, color: C.white, marginTop: 16, lineHeight: 1.35}}>Capital letters + a hash sign: not code, just tidy headings for you and the AI.</div></div>, 2.0),
        promptFocus(starts.S3_03 - 0.1, E('S3_03') + 0.2, 'Tools', PT, {x: 1413, y: 392, w: 482, h: 240}, [
          {k: 'tools', at: 6}, {k: 'always', at: fr(starts.S3_03 - 0.1, T('S3_03', 'And one important'))}], undefined, 1.95),
        promptFocus(starts.S3_04 - 0.1, E('S3_04') + 0.2, 'Rules', PT, {x: 1413, y: 630, w: 482, h: 330}, [
          {k: 'only', at: fr(starts.S3_04 - 0.1, T('S3_04', 'Only answer'))}, {k: 'never', at: fr(starts.S3_04 - 0.1, T('S3_04', 'And if the data'))},
          {k: 'low', at: fr(starts.S3_04 - 0.1, T('S3_04', 'running low means'))}, {k: 'watch', at: fr(starts.S3_04 - 0.1, T('S3_04', 'and the watch list'))}],
          <div style={{width: 400, opacity: 1}}><div style={{fontSize: 26, fontWeight: 800, color: C.hi, letterSpacing: 2}}>A SUPPLY CHAIN DECISION</div>
            <div style={{fontSize: 30, fontWeight: 800, color: C.white, marginTop: 10, lineHeight: 1.3}}>Change the 15% to whatever your company uses.</div></div>, 1.7),
        promptFocus(starts.S3_05 - 0.1, T('S3_05', 'The source line') - 0.2, 'Output format', PB, {x: 1413, y: 836, w: 482, h: 160}, [
          {k: 'output_format', at: 6}, {k: 'source', at: fr(starts.S3_05 - 0.1, T('S3_05', 'and a source line'))}], undefined, 2.3),
        {a: q - 0.1, b: qEnd, el: (f) => <PauseCard f={f} total={fr(q - 0.1, qEnd)} question={'What is YOUR company\'s definition of "running low"?'}
          hintAt={fr(q - 0.1, T('S3_06q', 'Write it down'))} hint={<div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
            {['At the reorder point?', 'Below safety stock?', 'Fewer than X days of cover?'].map((t) => <Chip key={t} size={28} bg="rgba(255,255,255,0.12)" color={C.white}>{t}</Chip>)}
            <Chip size={28} bg={C.amberSoft} color="#92400E">Write ONE sentence a new intern could follow</Chip></div>} />},
      ]}
    />
  );
};

// ================================================================ S4 Stocky's first real conversation
export const V6S4: React.FC<{starts: Starts}> = ({starts}) => {
  const {T, E} = mk(starts);
  const typed1 = T('S4_01', 'Press Enter') - 1.4, send1 = T('S4_01', 'Press Enter') + 0.4, done1 = T('S4_01', "And here's the answer") - 0.3;
  const z1 = done1 + 0.2, z1End = E('S4_02') + 0.2;
  const toOdoo = starts.S4_03 + 0.3, back = starts.S4_04 - 0.3;
  const typed2 = back + 0.2, send2 = T('S4_04', 'Global Lift') - 1.6, done2 = T('S4_04', 'Global Lift') - 0.4;
  const typed3 = T('S4_05', "I'll just say") + 0.1, send3 = T('S4_05', "I didn't say") - 0.5, done3 = T('S4_05', 'But Stocky') - 0.2;
  const q = starts.S4_06q, qEnd = E('S4_06q') + EXTRA_AFTER.S4_06q;
  const r1 = (p: string, k = 'S4_01') => fr(z1, T(k, p));
  return (
    <SectionView tabs={['n8n6', 'odoo6']}
      views={[
        {at: 0, tab: 'n8n6', shot: 's4_chat_new', url: N8N, title: 'Stocky v1 – Reads the ERP - n8n'},
        ...runViews('s4_q1', typed1, send1, ['s4_q1_run00', 's4_q1_run01', 's4_q1_run02', 's4_q1_run04', 's4_q1_run06'], done1, 's4_q1_done'),
        {at: toOdoo, tab: 'odoo6', shot: 's4_odoo_list', url: ODOO_L, title: 'Products - Odoo'},
        ...runViews('s4_q2', typed2, send2, ['s4_q2_run00', 's4_q2_run01', 's4_q2_run02'], done2, 's4_q2_done'),
        ...runViews('s4_q3', typed3, send3, ['s4_q3_run00', 's4_q3_run01'], done3, 's4_q3_done'),
      ].map((v) => ({...v, tab: v.tab ?? 'n8n6'}))}
      boxes={[
        {shot: 's4_q1_typed', key: 'input', a: typed1, b: send1},
        {shot: 's4_q1_run02', key: 'Anthropic Chat Model', a: T('S4_01', 'The brain lights') - 0.1, b: T('S4_01', 'then the stock'), pad: 10},
        {shot: 's4_q1_run02', key: 'get_products_and_stock', a: T('S4_01', 'then the stock'), b: T('S4_01', 'then the reorder'), pad: 10},
        {shot: 's4_q1_run02', key: 'get_reorder_rules', a: T('S4_01', 'then the reorder'), b: done1, pad: 10},
        {shot: 's4_odoo_list', key: 'gloves', a: T('S4_03', 'Gloves'), b: T('S4_03', 'Wheels'), pad: 2, radius: 8},
        {shot: 's4_odoo_list', key: 'wheels', a: T('S4_03', 'Wheels'), b: E('S4_03') + 0.3, pad: 2, radius: 8},
        {shot: 's4_q2_typed', key: 'input', a: typed2, b: send2},
        {shot: 's4_q3_typed', key: 'input', a: typed3, b: send3},
      ]}
      keys={[
        {t: 0.4, x: 1300, y: 700},
        {t: typed1 - 0.2, shot: 's4_q1_typed', key: 'input', click: true},
        {t: send1 - 0.1, x: 470, y: 1029, click: true},
        {t: send1 + 0.8, x: 1300, y: 600},
        {t: toOdoo - 0.1, tab: 'odoo6', click: true},
        {t: T('S4_03', 'Gloves') - 0.1, x: 1540, y: 286},
        {t: T('S4_03', 'Wheels') - 0.1, x: 1540, y: 446},
        {t: back - 0.1, tab: 'n8n6', click: true},
        {t: typed2 - 0.1, shot: 's4_q2_typed', key: 'input', click: true},
        {t: send2 - 0.1, x: 470, y: 1029, click: true},
        {t: send2 + 0.8, x: 1300, y: 600},
        {t: typed3 - 0.1, shot: 's4_q3_typed', key: 'input', click: true},
        {t: send3 - 0.1, x: 470, y: 1029, click: true},
        {t: send3 + 0.8, x: 1300, y: 600},
      ]}
      overlays={[
        {a: T('S4_01', 'Stocky is opening'), b: done1 - 0.1, el: card(big('Stocky is opening the drawers', <>Brain → {mono('get_products_and_stock')} → {mono('get_reorder_rules')}</>), C.blue)},
        {a: T('S4_03', 'Gloves'), b: E('S4_03') + 0.3, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={500} accent={C.green}>
            {kicker('Check it in Odoo', C.green)}
            <Crop f={f} shot="s4_odoo_list" r={{x: 1180, y: 100, w: 420, h: 370}} scale={440 / 420} radius={10} hl={[
              {r: {x: 1492, y: 266, w: 102, h: 40}, at: 4, color: C.green}, {r: {x: 1492, y: 426, w: 102, h: 40}, at: fr(T('S4_03', 'Gloves'), T('S4_03', 'Wheels')), color: C.green}]} />
            <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 25, fontWeight: 800, color: C.green, marginTop: 12, opacity: pop(f, fr(T('S4_03', 'Gloves'), T('S4_03', 'The numbers')))}}><Check size={28} /> 420 and 18: the numbers match</div>
            <div style={{marginTop: 14, opacity: pop(f, fr(T('S4_03', 'Gloves'), T('S4_03', 'Ten seconds')))}}><BeforeAfter f={f - fr(T('S4_03', 'Gloves'), T('S4_03', 'Ten seconds'))} /></div>
          </FloatCard>)},
        {a: T('S4_05', 'thanks to Simple'), b: E('S4_05') + 0.4, el: card(big('The notepad at work', <>“And what about the hydraulic oil?” No supplier, no lead time in the question. Simple Memory filled in the rest.</>), C.blue)},
      ]}
      lowers={[{a: T('S4_03', 'The numbers match'), b: E('S4_03') + 3.0, text: 'Before: ~40 minutes (export, VLOOKUP, colour, email). After: ~10 seconds.'}]}
      full={[
        {a: z1, b: z1End, el: (f) => <ChatZoom f={f} tag={<RealTag />} font={25} blocks={A1({
          first: [r1("And here's the answer"), r1('Safety gloves')],
          rows: [[r1('Safety gloves'), r1('Pallet jack')], [r1('Pallet jack'), r1('Hydraulic oil')], [r1('Hydraulic oil'), r1('And shipping')], [r1('And shipping'), r1('Look at the order', 'S4_02')]],
          watch: [r1('It even flagged', 'S4_02')],
          src: undefined,
        }).map((b, i) => (b.k === 'table' && i === 2 && f >= r1('Look at the order', 'S4_02') ? {...b, hl: [[r1('Gloves are', 'S4_02'), r1("That's the rule", 'S4_02')], null, null,
          [r1('The boxes have', 'S4_02'), r1('Gloves are', 'S4_02')]] as ([number, number?] | null)[]} : b))} />},
        {a: done2 + 0.2, b: E('S4_04') + 0.2, el: (f) => {
          const r = (p: string) => fr(done2 + 0.2, T('S4_04', p));
          return <ChatZoom f={f} tag={<RealTag />} blocks={A2({first: [r('Global Lift'), r('Thirty-eight')], price: [r('Thirty-eight'), r('And without')], dots: [r('And without')]})} />;
        }},
        {a: done3 + 0.2, b: T('S4_05', 'thanks to Simple') - 0.2, el: (f) => <ChatZoom f={f} tag={<RealTag />} blocks={A3({first: [fr(done3 + 0.2, T('S4_05', 'and gave me'))]})} />},
        {a: q - 0.1, b: qEnd, el: (f) => <PauseCard f={f} total={fr(q - 0.1, qEnd)} question="If you were Sarah, which product would you order FIRST, and why?"
          hintAt={fr(q - 0.1, T('S4_06q', 'Hint'))} hint={
            <div style={{display: 'flex', gap: 22}}>
              {[{t: 'BL-1005 Pallet Jack Wheels', g: '7 below', l: '21-day lead time', c: C.red}, {t: 'BL-1002 Shipping Boxes', g: '320 below', l: '5-day lead time', c: C.amber}].map((x) => (
                <div key={x.t} style={{flex: 1, padding: '20px 26px', borderRadius: 20, background: C.white, borderLeft: `8px solid ${x.c}`}}>
                  <div style={{fontSize: 28, fontWeight: 800, color: C.navy}}>{x.t}</div>
                  <div style={{fontSize: 26, fontWeight: 700, color: C.slate, marginTop: 6}}>Gap: <b style={{color: x.c}}>{x.g}</b> · {x.l}</div>
                </div>))}
            </div>} />},
      ]}
    />
  );
};

// ================================================================ S5 Watch the agent think: the execution log
export const V6S5: React.FC<{starts: Starts}> = ({starts}) => {
  const {T, E} = mk(starts);
  const toM1 = starts.S5_02 + 0.2, toTool = T('S5_03', 'Click it') + 0.3, toJson = T('S5_03', "I'll switch") + 0.6, toM2 = starts.S5_04 + 0.2, toEx = T('S5_05', 'Executions tab') - 0.2;
  const loopA = T('S5_04', 'So the pattern') - 0.2;
  const jz = T('S5_03', 'Partner') - 0.2;
  const j = (p: string) => fr(jz, T('S5_03', p));
  return (
    <SectionView tabs={['n8n6']}
      views={[
        {at: 0, tab: 'n8n6', shot: 's4_q3_done', url: N8N, title: 'Stocky v1 – Reads the ERP - n8n'},
        {at: T('S5_01', 'Open the') + 0.6, tab: 'n8n6', shot: 's5_q2_run'},
        {at: T('S5_01', 'This is the step') , tab: 'n8n6', shot: 's5_logs'},
        {at: toM1, tab: 'n8n6', shot: 's5_model1'},
        {at: toTool, tab: 'n8n6', shot: 's5_tool_table'},
        {at: toJson, tab: 'n8n6', shot: 's5_tool_json'},
        {at: toM2, tab: 'n8n6', shot: 's5_model2'},
        {at: toEx, tab: 'n8n6', shot: 's5_executions', url: 'brightleaf.app.n8n.cloud/workflow/CnZDME5og3w9lC4Q/executions'},
      ]}
      boxes={[
        {shot: 's5_model1', key: 'entry', a: toM1, b: T('S5_02', 'It doesn'), pad: 4},
        {shot: 's5_tool_table', key: 'entry', a: toTool, b: toJson, pad: 4},
        {shot: 's5_model2', key: 'entry', a: toM2, b: loopA, pad: 4},
        {shot: 's5_executions', key: 'tab', a: toEx - 0.3, b: toEx + 1.6, pad: 6},
      ]}
      keys={[
        {t: 0.4, x: 1300, y: 700},
        {t: T('S5_01', 'Open the') + 0.5, x: 760, y: 528, click: true},
        {t: toM1 - 0.1, shot: 's5_model1', key: 'entry', dx: -60, click: true},
        {t: toTool - 0.1, shot: 's5_tool_table', key: 'entry', dx: -60, click: true},
        {t: toJson - 0.1, x: 1832, y: 405, click: true},
        {t: toM2 - 0.1, shot: 's5_model2', key: 'entry', dx: -60, click: true},
        {t: toEx - 0.1, shot: 's5_executions', key: 'tab', click: true},
        {t: toEx + 1.5, x: 1300, y: 700},
      ]}
      overlays={[
        {a: T('S5_01', 'Read it from'), b: toM1 - 0.1, el: card(big('Read it like a diary', 'AI Agent → Simple Memory → Anthropic Chat Model → get_supplier_info → Simple Memory → Anthropic Chat Model'), C.blue)},
        {a: toM1 + 0.3, b: E('S5_02') + 0.3, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={500} accent={C.blue}>
            {kicker('Step 1 · the brain decides')}
            <div style={{fontSize: 27, fontWeight: 800, lineHeight: 1.3}}>“To answer this, I need the supplier info.”</div>
            <div style={{display: 'flex', gap: 12, marginTop: 18, opacity: pop(f, fr(toM1 + 0.3, T('S5_02', "That's the big")))}}>
              <div style={{flex: 1, padding: '12px 14px', borderRadius: 14, background: '#F1F5F9', fontSize: 20, fontWeight: 700}}>Chatbot<div style={{color: C.slate, fontWeight: 600}}>answers from what it knows</div></div>
              <div style={{flex: 1, padding: '12px 14px', borderRadius: 14, background: C.blueSoft, fontSize: 20, fontWeight: 700}}>Agent<div style={{color: C.blue, fontWeight: 600}}>first decides what to find out</div></div>
            </div>
          </FloatCard>)},
        {a: toTool + 0.2, b: jz - 0.1, el: card(big('Step 2 · the Odoo tool runs', 'Exactly what Odoo sent back: 10 supplier lines.'), C.amber)},
        {a: toM2 + 0.2, b: loopA - 0.1, el: card(big('Step 3 · the brain writes the answer', 'It reads the shopping lists and answers in our format.'), C.green)},
        {a: toEx + 0.3, b: T('S5_05', "That's traceability") - 0.1, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={500}>
            {kicker('The logbook')}
            <QuoteBubble f={f} who="harrison" name="Mr. Harrison" text="Where did Stocky get that number on Tuesday?" />
            <div style={{fontSize: 22, fontWeight: 700, color: C.slate, marginTop: 14, opacity: pop(f, fr(toEx + 0.3, T('S5_05', 'you can open')))}}>Open the run and show him the exact data Odoo returned.</div>
          </FloatCard>)},
        {a: T('S5_05', "That's traceability"), b: E('S5_05') + EXTRA_AFTER.S5_05 + 0.3, el: tipCard('Pro tip', <>Answer looks wrong? Don't argue in the chat: open the log.<br />• Wrong data → fix Odoo<br />• Wrong drawer → fix the tool description<br />• Right data, wrong answer → fix the rules</>)},
      ]}
      lowers={[{a: loopA + 0.6, b: loopA + 5.6, text: 'The agent loop: Think → Use a tool → Read the result → (repeat) → Answer'}]}
      full={[
        {a: jz, b: E('S5_03') + 0.2, el: (f) => <FocusCrop f={f} kicker="get_supplier_info · JSON" title="What Odoo sent back" shot="s5_tool_json" r={JSON6.rec} scale={2.25} hl={[
          {r: JSON6.partner, at: j('Partner')}, {r: JSON6.product, at: j('Product')}, {r: JSON6.price, at: j('Price')}, {r: JSON6.min, at: j('Minimum')}, {r: JSON6.delay, at: j('Delay')}]}
          side={<div style={{width: 520}}>
            {[['Partner', 'Global Lift Parts', 'Partner'], ['Product', 'BL-1005 Pallet Jack Wheels', 'Product'], ['Price', '38', 'Price'], ['Min. quantity', '10', 'Minimum'], ['Delay = lead time', '21 days', 'Delay']].map(([a, b, p]) => (
              <div key={a} style={{display: 'flex', justifyContent: 'space-between', gap: 20, padding: '14px 20px', marginBottom: 10, borderRadius: 16, background: 'rgba(255,255,255,0.1)', opacity: pop(f, j(p))}}>
                <span style={{fontSize: 24, fontWeight: 700, color: 'rgba(255,255,255,0.75)'}}>{a}</span><span style={{fontSize: 26, fontWeight: 800, color: C.white}}>{b}</span></div>))}
            <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 26, fontWeight: 800, color: C.hi, marginTop: 10, opacity: pop(f, j('Every number'))}}><Check size={28} /> Nothing was made up</div>
          </div>} />},
        {a: loopA, b: E('S5_04') + 0.2, el: (f) => <AgentLoop f={f} start={8} />},
      ]}
    />
  );
};

// ================================================================ S6 Catch a hallucination, then fix it
export const V6S6: React.FC<{starts: Starts}> = ({starts}) => {
  const {T, E} = mk(starts);
  const fresh = T('S6_01', "Now I'll start") + 0.4;
  const typedW = T('S6_02', 'When will') - 0.2, sendW = T('S6_02', 'And look') - 1.6, doneW = T('S6_02', 'And look') - 0.3;
  const zW = doneW + 0.3, zWEnd = T('S6_02', 'Stocky never saw') - 0.2;
  const toLogs = starts.S6_03 + 0.2;
  const typedF = T('S6_04', 'and ask the exact') + 0.2, sendF = T('S6_04', '"I don\'t know') - 1.8, doneF = T('S6_04', '"I don\'t know') - 0.3;
  const typedT1 = T('S6_05', 'A product') - 0.1, sendT1 = T('S6_05', 'BL-1011') + 0.6, doneT1 = T('S6_05', 'Stocky says it can') - 0.3;
  const typedT2 = T('S6_05', 'And an action') + 0.1, sendT2 = T('S6_05', '"Order fifty') + 1.6, doneT2 = T('S6_05', 'Stocky says it can only') - 0.3;
  const hz = E('S6_05') + 0.3, hzEnd = hz + (EXTRA_AFTER.S6_05 ?? 0) + 0.3;
  const zf = (a: number, p: string, k = 'S6_04') => fr(a, T(k, p));
  return (
    <SectionView tabs={['n8n6']}
      views={[
        {at: 0, tab: 'n8n6', shot: 's6_weak_prompt', url: N8N, title: 'Stocky v1 – Reads the ERP - n8n'},
        {at: fresh, tab: 'n8n6', shot: 's4_chat_new'},
        ...runViews('s6_weak', typedW, sendW, ['s6_weak_run00', 's6_weak_run01', 's6_weak_run03'], doneW, weakAnswer),
        {at: toLogs, tab: 'n8n6', el: weakLogs, url: 'brightleaf.app.n8n.cloud/workflow/CnZDME5og3w9lC4Q/executions'},
        {at: starts.S6_04 + 0.3, tab: 'n8n6', shot: 's3_sys_full', url: N8N},
        {at: typedF - 1.2, tab: 'n8n6', shot: 's4_chat_new'},
        ...runViews('s6_full', typedF, sendF, ['s6_full_run00', 's6_full_run02', 's6_full_run04'], doneF, 's6_full_done'),
        ...runViews('s6_trap1', typedT1, sendT1, ['s6_trap1_run00', 's6_trap1_run02'], doneT1, 's6_trap1_done'),
        ...runViews('s6_trap2', typedT2, sendT2, ['s6_trap2_run00', 's6_trap2_run02'], doneT2, 's6_trap2_done'),
      ]}
      boxes={[
        {shot: 's6_weak_prompt', key: 'sys', a: T('S6_01', 'with a lazy') - 0.1, b: fresh},
        {shot: 's6_weak_typed', key: 'input', a: typedW, b: sendW},
        {shot: 's3_sys_full', key: 'field', a: starts.S6_04 + 0.5, b: typedF - 1.2},
        {shot: 's6_full_typed', key: 'input', a: typedF, b: sendF},
        {shot: 's6_trap1_typed', key: 'input', a: typedT1, b: sendT1},
        {shot: 's6_trap2_typed', key: 'input', a: typedT2, b: sendT2},
      ]}
      keys={[
        {t: 0.4, x: 1300, y: 700},
        {t: fresh - 0.1, x: 584, y: 291, click: true},
        {t: typedW - 0.1, shot: 's6_weak_typed', key: 'input', click: true},
        {t: sendW - 0.1, x: 470, y: 1029, click: true},
        {t: sendW + 0.8, x: 1300, y: 600},
        {t: toLogs - 0.1, x: 964, y: 63, click: true},
        {t: T('S6_03', 'Only supplier') - 0.2, x: 960, y: 957},
        {t: starts.S6_04 + 0.2, x: 1300, y: 600},
        {t: typedF - 0.1, shot: 's6_full_typed', key: 'input', click: true},
        {t: sendF - 0.1, x: 470, y: 1029, click: true},
        {t: sendF + 0.8, x: 1300, y: 600},
        {t: typedT1 - 0.1, shot: 's6_trap1_typed', key: 'input', click: true},
        {t: sendT1 - 0.1, x: 470, y: 1029, click: true},
        {t: typedT2 - 0.1, shot: 's6_trap2_typed', key: 'input', click: true},
        {t: sendT2 - 0.1, x: 470, y: 1029, click: true},
        {t: sendT2 + 0.8, x: 1300, y: 600},
      ]}
      overlays={[
        {a: T('S6_01', 'with a lazy') + 0.2, b: fresh - 0.1, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={500} accent={C.red}>
            {kicker('Experiment: a weak prompt', C.red)}
            <Crop f={f} shot="s6_weak_prompt" r={{x: 636, y: 322, w: 530, h: 150}} scale={440 / 530} radius={10} />
            <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 21, fontWeight: 700, color: C.green, marginTop: 12, opacity: pop(f, fr(T('S6_01', 'with a lazy') + 0.2, T('S6_01', "I've saved")))}}><Lock size={22} /> Good version saved safely</div>
          </FloatCard>)},
        {a: zWEnd, b: E('S6_02') + 0.3, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={500} accent={C.red}>
            {kicker('Completely made up', C.red)}
            <div style={{fontSize: 23, fontWeight: 700, lineHeight: 1.35}}>Stocky never saw P00027. It took the 21-day lead time and invented a delivery date.</div>
            <div style={{marginTop: 16, opacity: pop(f, fr(zWEnd, T('S6_02', "That's Jake")))}}><QuoteBubble f={f} who="jake" name="Jake, the confident intern" text="Tuesday, sir." /></div>
          </FloatCard>)},
        {a: toLogs + 0.4, b: E('S6_03') + 0.3, el: (f) => (
          <FloatCard f={f} x={0} y={0} w={500} accent={C.amber}>
            {kicker('The log tells the truth', C.amber)}
            <Crop f={f} shot="s6_weak_logs" r={{x: 826, y: 818, w: 320, h: 160}} scale={440 / 320} radius={10} hl={[{r: {x: 856, y: 944, w: 150, h: 26}, at: fr(toLogs + 0.4, T('S6_03', 'Only supplier'))}]} />
            <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 23, fontWeight: 800, color: C.red, marginTop: 12, opacity: pop(f, fr(toLogs + 0.4, T('S6_03', "There's no")))}}><X size={24} /> No purchase order data anywhere</div>
            <div style={{fontSize: 21, fontWeight: 700, color: C.slate, marginTop: 6, opacity: pop(f, fr(toLogs + 0.4, T('S6_03', 'The answer can')))}}>Can't be traced → can't be trusted.</div>
          </FloatCard>)},
        {a: starts.S6_04 + 0.6, b: typedF - 1.3, el: card(big('The real job description is back', 'Saved, chat reset, same question.'), C.green)},
        {a: E('S6_05') - 3.2, b: hz - 0.1, el: tipCard('Beginner mistake', <>Testing only the questions you know will work. Always add traps: things that don't exist, things the agent can't see, and things it isn't allowed to do.</>, true)},
      ]}
      full={[
        {a: zW, b: zWEnd, el: (f) => <ChatZoom f={f} title="Chat with Stocky (weak one-line prompt)" tag={<RealTag fake />} blocks={AWEAK([fr(zW, T('S6_02', 'It sounds great'))])}
          font={34} width={1300} />},
        {a: doneF + 0.2, b: E('S6_04') + 0.2, el: (f) => <ChatZoom f={f} tag={<RealTag />} font={24} blocks={AFULL({idk: [zf(doneF + 0.2, '"I don\'t know')], cant: [zf(doneF + 0.2, 'It explains')],
          std: [zf(doneF + 0.2, 'gives the useful')], where: [zf(doneF + 0.2, 'And it tells')]})} />},
        {a: doneT1 + 0.2, b: typedT2 - 0.2, el: (f) => <ChatZoom f={f} tag={<RealTag />} blocks={ATRAP1([fr(doneT1 + 0.2, T('S6_05', 'Stocky says it can'))])} />},
        {a: doneT2 + 0.2, b: E('S6_05') - 3.3, el: (f) => <ChatZoom f={f} tag={<RealTag />} font={24} blocks={ATRAP2([fr(doneT2 + 0.2, T('S6_05', 'Stocky says it can only'))])} />},
        {a: hz, b: hzEnd, el: (f) => <ReduceHallucination f={f} ats={[6, 16, 26, 36, 46]} />},
      ]}
    />
  );
};

export const SECTIONS6 = {1: V6S1, 2: V6S2, 3: V6S3, 4: V6S4, 5: V6S5, 6: V6S6};
export {AbsoluteFill, Face, Shot, FPS, prog};
