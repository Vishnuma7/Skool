import React from 'react';
import {
  Archive, ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, Clock, File, HelpCircle, Inbox, LayoutGrid, Mail, MailOpen, Menu, MoreVertical,
  Paperclip, Pencil, Reply, Forward, RefreshCw, Search, Send, Settings, ShoppingBag, SlidersHorizontal, Star, Tag, Trash2, Users, Info, Calendar,
  Lightbulb, CheckCircle2, User,
} from 'lucide-react';
import {Img, staticFile} from 'remotion';
import {C} from '../theme';
import {Mark} from './mark';

/** Gmail-style UI (light). Layout modelled on the real Gmail web app; content is our own story data. */
const FONT = '"Google Sans", Roboto, Inter, Arial, sans-serif';
const G = {bg: '#F6F8FC', text: '#1F1F1F', grey: '#5F6368', sel: '#D3E3FD', row: '#F2F6FC', blue: '#0B57D0'};
export const EMAIL_SUBJECT = 'Stocky: Monday Stock Check - 4 items need attention';

export const GmailChrome: React.FC<{children: React.ReactNode; unread?: boolean}> = ({children, unread = true}) => (
  <div style={{position: 'absolute', inset: 0, background: G.bg, fontFamily: FONT, color: G.text}}>
    {/* header */}
    <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 72, display: 'flex', alignItems: 'center', padding: '0 20px'}}>
      <div style={{width: 48, display: 'flex', justifyContent: 'center'}}><Menu size={26} color={G.grey} /></div>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, width: 220, marginLeft: 8}}>
        <Img src={staticFile('logos/gmail.svg')} style={{width: 40, height: 30, objectFit: 'contain'}} />
        <span style={{fontSize: 26, color: G.grey, letterSpacing: -0.2}}>Gmail</span>
      </div>
      <div style={{width: 760, height: 52, borderRadius: 26, background: '#E9EEF6', display: 'flex', alignItems: 'center', gap: 18, padding: '0 20px', color: G.grey, fontSize: 19}}>
        <Search size={22} /> <span style={{flex: 1}}>Search mail</span> <SlidersHorizontal size={22} />
      </div>
      <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 26, color: G.grey}}>
        <HelpCircle size={24} /><Settings size={24} /><LayoutGrid size={24} />
        <div style={{width: 40, height: 40, borderRadius: 20, background: '#7B1FA2', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 500}}>S</div>
      </div>
    </div>
    {/* left nav */}
    <div style={{position: 'absolute', top: 72, left: 0, width: 268, bottom: 0, padding: '6px 8px 0 8px'}}>
      <div style={{height: 58, width: 148, borderRadius: 16, background: '#C2E7FF', display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px', fontSize: 18, fontWeight: 500, marginBottom: 14, marginLeft: 8}}>
        <Pencil size={22} /> Compose
      </div>
      {[
        {I: Inbox, t: 'Inbox', n: unread ? '1' : '', on: true}, {I: Star, t: 'Starred'}, {I: Clock, t: 'Snoozed'}, {I: Send, t: 'Sent'},
        {I: File, t: 'Drafts', n: '2'}, {I: ShoppingBag, t: 'Purchases'}, {I: ChevronDown, t: 'More'},
      ].map(({I, t, n, on}) => (
        <div key={t} style={{height: 36, display: 'flex', alignItems: 'center', gap: 18, padding: '0 14px 0 26px', borderRadius: '0 18px 18px 0', background: on ? G.sel : 'transparent',
          fontSize: 17, fontWeight: on ? 700 : 400, color: on ? '#001D35' : G.text}}>
          <I size={20} /> {t} <span style={{marginLeft: 'auto', fontSize: 14, fontWeight: 700}}>{n}</span>
        </div>
      ))}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 14px 0 26px', fontSize: 18, fontWeight: 500}}>Labels <span style={{fontSize: 24, color: G.grey}}>+</span></div>
      <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '10px 14px 0 26px', fontSize: 17}}><Tag size={18} color="#16A34A" /> Suppliers</div>
      <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '8px 14px 0 26px', fontSize: 17}}><Tag size={18} color="#F59E0B" /> Ops reports</div>
    </div>
    {/* main card */}
    <div style={{position: 'absolute', top: 72, left: 268, right: 64, bottom: 16, background: '#fff', borderRadius: 18, overflow: 'hidden'}}>{children}</div>
    {/* right app rail */}
    <div style={{position: 'absolute', top: 96, right: 14, width: 36, display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center'}}>
      <Calendar size={22} color="#1A73E8" /><Lightbulb size={22} color="#F9AB00" /><CheckCircle2 size={22} color="#1A73E8" /><User size={22} color="#1A73E8" />
    </div>
  </div>
);

const ROWS = [
  {from: 'Stocky', subj: EMAIL_SUBJECT, prev: 'Good morning Sarah. I checked all 10 active products in Odoo at 6:55 AM. 4 are below their reorder point…', time: '7:00 AM', unread: true},
  {from: 'PackRight Industries', subj: 'Shipment confirmation PR-88213', prev: 'Your order has shipped from Chicago, IL. Expected delivery Wednesday…', time: 'Nov 13'},
  {from: 'Tom (Warehouse)', subj: 'Dock 2 schedule', prev: 'Hi Sarah, two trucks are booked for Dock 2 on Tuesday morning…', time: 'Nov 12'},
  {from: 'Mr. Harrison', subj: 'Q4 planning', prev: "Let's review the Q4 stock targets in Thursday's ops meeting…", time: 'Nov 11'},
  {from: 'SafeHands Co.', subj: 'Updated price list 2027', prev: 'Please find attached our glove pricing for next year…', time: 'Nov 10'},
];
/** Inbox row 1 centre (page px) — for cursor clicks. */
export const INBOX_ROW = {x: 860, y: 210};

export const GmailInbox: React.FC<{rowOn?: number; hover?: boolean}> = ({rowOn = 0, hover}) => (
  <GmailChrome>
    <div style={{height: 52, display: 'flex', alignItems: 'center', gap: 28, padding: '0 20px', color: G.grey}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 4}}><div style={{width: 18, height: 18, border: `2px solid ${G.grey}`, borderRadius: 3}} /><ChevronDown size={14} /></div>
      <RefreshCw size={20} /><MoreVertical size={20} />
      <span style={{marginLeft: 'auto', fontSize: 15}}>1–5 of 5</span><ChevronLeft size={20} /><ChevronRight size={20} />
    </div>
    <div style={{height: 60, display: 'flex', borderBottom: '1px solid #ECEDEF'}}>
      {[{I: Inbox, t: 'Primary', on: true}, {I: Tag, t: 'Promotions'}, {I: Users, t: 'Social'}, {I: Info, t: 'Updates'}].map(({I, t, on}) => (
        <div key={t} style={{width: 280, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', fontSize: 17, fontWeight: on ? 500 : 400, color: on ? G.blue : G.grey,
          borderBottom: on ? `3px solid ${G.blue}` : '3px solid transparent'}}>
          <I size={20} /> {t}
        </div>
      ))}
    </div>
    {ROWS.map((r, i) => (
      <div key={i} style={{position: 'relative', height: 52, display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', borderBottom: '1px solid #F1F3F4',
        background: i === 0 ? (rowOn > 0.01 ? `rgba(255,216,77,${0.22 * rowOn})` : hover ? '#F2F6FC' : '#fff') : G.row, fontSize: 17,
        color: r.unread ? G.text : '#444746', fontWeight: r.unread ? 700 : 400,
        boxShadow: i === 0 && rowOn > 0.01 ? `inset 0 0 0 ${4 * rowOn}px ${C.hi}` : hover && i === 0 ? '0 1px 3px rgba(60,64,67,0.3)' : undefined}}>
        <div style={{width: 18, height: 18, border: '2px solid #9AA0A6', borderRadius: 3}} />
        <Star size={20} color="#9AA0A6" />
        <div style={{width: 210}}>{r.from}</div>
        <div style={{flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
          {r.subj} <span style={{fontWeight: 400, color: G.grey}}> - {r.prev}</span>
        </div>
        <div style={{width: 90, textAlign: 'right', fontSize: 15}}>{r.time}</div>
      </div>
    ))}
  </GmailChrome>
);

type MailProps = {marks?: Record<string, number>; approved?: number; pressed?: boolean};
const ITEMS: {k: string; t: React.ReactNode}[] = [
  {k: 'i1', t: null},
  {k: 'i2', t: <>BL-1004 Industrial Safety Gloves: <b>420 pairs</b> on hand, reorder point <b>600</b>. Suggest <b>780 pairs</b> from <b>SafeHands Co.</b> (Monterrey). Est. <b>USD 1,872</b>.</>},
  {k: 'i3', t: null},
  {k: 'i4', t: <>BL-1007 Hydraulic Oil 20L: <b>31 drums</b> on hand, reorder point <b>40</b>. Suggest <b>49 drums</b> from <b>Gulf Lubricants</b> (Dubai). Est. <b>USD 2,646</b>.</>},
];
/** Approve / Decline button centres (page px) — the email body is laid out with fixed heights so these are exact. */
export const EMAIL_POS = {approve: {x: 425, y: 798}, decline: {x: 617, y: 798}};

export const GmailEmail: React.FC<MailProps> = ({marks = {}, approved = 0, pressed}) => {
  const m = (k: string) => marks[k] ?? 0;
  // phrase-level highlights follow the narration (item 1 is the walkthrough example)
  const item1 = (
    <>
      BL-1002 Corrugated Shipping Box 18x12x10: <Mark on={m('q_onhand')}><b>1,180</b> on hand</Mark>, <Mark on={m('q_rp')}>reorder point <b>1,500</b></Mark>.{' '}
      Suggest <Mark on={m('q_qty')}><b>1,820 boxes</b></Mark> from <Mark on={m('q_sup')}><b>PackRight Industries</b></Mark> (Chicago). Est. <Mark on={m('q_cost')}><b>USD 1,547</b></Mark>.
    </>
  );
  const item3 = (
    <>
      <Mark on={m('q_wheels')}>BL-1005 Pallet Jack Wheels</Mark>: <b>18</b> on hand, reorder point <b>25</b>. Suggest <b>32 sets</b> from <Mark on={m('shenzhen')}><b>Global Lift Parts (Shenzhen)</b></Mark>. Est. <b>USD 1,216</b>.{' '}
      <span style={{color: C.red, fontWeight: 700}}>RISK:</span> <Mark on={m('storms')}>heavy storms hit Shenzhen over the weekend</Mark> and{' '}
      <Mark on={m('thanks')}>US Thanksgiving next week will slow freight bookings</Mark>. <Mark on={m('lead')}>Lead time is already 21 days.</Mark>{' '}
      <Mark on={m('today')} color={C.amber}><b>Recommend ordering today.</b></Mark>
    </>
  );
  return (
    <GmailChrome unread={false}>
      <div style={{height: 52, display: 'flex', alignItems: 'center', gap: 28, padding: '0 20px', color: G.grey}}>
        <ArrowLeft size={21} /><Archive size={20} /><Info size={20} /><Trash2 size={20} /><MailOpen size={20} /><Clock size={20} /><MoreVertical size={20} />
        <span style={{marginLeft: 'auto', fontSize: 15}}>1 of 5</span><ChevronLeft size={20} /><ChevronRight size={20} />
      </div>
      <div style={{padding: '14px 72px 0 72px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, height: 46}}>
          <div style={{fontSize: 26}}>{EMAIL_SUBJECT}</div>
          <span style={{fontSize: 13, padding: '3px 8px', background: '#DDE3EA', borderRadius: 4, color: '#444746'}}>Inbox ×</span>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 14, marginLeft: -56, height: 52}}>
          <div style={{width: 42, height: 42, borderRadius: 21, background: C.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700}}>S</div>
          <div style={{fontSize: 16}}>
            <b>Stocky</b> <span style={{color: G.grey, fontSize: 14}}>&lt;stocky@brightleafsupplies.com&gt;</span>
            <div style={{color: G.grey, fontSize: 14}}>to me ▾</div>
          </div>
          <div style={{marginLeft: 'auto', color: G.grey, fontSize: 14, display: 'flex', gap: 18, alignItems: 'center'}}>Mon, Nov 16, 7:00 AM <Star size={18} /><Reply size={18} /><MoreVertical size={18} /></div>
        </div>
        <div style={{fontSize: 25, lineHeight: '38px', maxWidth: 1460, marginTop: 18, color: '#222'}}>
          <div style={{height: 38}}>Good morning Sarah. I <Mark on={m('q_checked')}>checked all 10 active products</Mark> in Odoo at 6:55 AM. <Mark on={m('q_four')}>4 are below their reorder point</Mark>:</div>
          <div style={{marginTop: 12}}>
            {ITEMS.map((it, i) => (
              <div key={it.k} style={{display: 'flex', gap: 10, height: it.k === 'i3' ? 124 : 86}}>
                <div style={{width: 30, flexShrink: 0, fontWeight: 700}}>{i + 1}.</div>
                <div style={{flex: 1}}><Mark on={m(it.k)} block>{it.k === 'i3' ? item3 : it.k === 'i1' ? item1 : it.t}</Mark></div>
              </div>
            ))}
          </div>
          <div style={{height: 38, marginTop: 4}}>Total suggested spend: <b>USD 7,281</b>. <Mark on={m('total')}>Draft RFQs are ready in Odoo.</Mark></div>
          <div style={{display: 'flex', gap: 22, marginTop: 26, alignItems: 'center', height: 60}}>
            {approved > 0.5 ? (
              <div style={{height: 60, padding: '0 30px', borderRadius: 30, background: C.greenSoft, color: C.green, fontWeight: 700, fontSize: 24, display: 'flex', alignItems: 'center', gap: 12}}>✓ Approved by Sarah Mitchell</div>
            ) : (
              <>
                <Mark on={m('approve')}><span style={{display: 'inline-block', width: 170, height: 60, lineHeight: '60px', textAlign: 'center', borderRadius: 10, background: C.green, color: '#fff', fontWeight: 700, fontSize: 24, transform: pressed ? 'scale(0.95)' : undefined}}>Approve</span></Mark>
                <Mark on={m('decline')}><span style={{display: 'inline-block', width: 170, height: 60, lineHeight: '60px', textAlign: 'center', borderRadius: 10, background: C.red, color: '#fff', fontWeight: 700, fontSize: 24}}>Decline</span></Mark>
              </>
            )}
          </div>
          <div style={{marginTop: 30, display: 'flex', gap: 14}}>
            {[{I: Reply, t: 'Reply'}, {I: Forward, t: 'Forward'}, {I: Paperclip, t: 'Stocky_RFQ_drafts.pdf'}].map(({I, t}) => (
              <div key={t} style={{height: 42, padding: '0 22px', borderRadius: 21, border: '1px solid #747775', display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, color: '#444746'}}><I size={18} /> {t}</div>
            ))}
          </div>
        </div>
      </div>
    </GmailChrome>
  );
};
export {Mail};
