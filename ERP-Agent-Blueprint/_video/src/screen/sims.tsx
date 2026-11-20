import React from 'react';
import {Plus} from 'lucide-react';
import {C, INTER} from '../theme';

export {Mark} from './mark';
import {Mark} from './mark';
export {GmailInbox, GmailEmail, EMAIL_POS, INBOX_ROW, EMAIL_SUBJECT} from './gmail';
export {ClaudeChat, CLAUDE_Q, CLAUDE_INPUT, CLAUDE_SEND} from './claude';

// ------------------------------------------------------------------ Sheets-style
export type LogRow = string[];
export const LOG_HEAD = ['Date', 'SKU', 'On Hand', 'Reorder Point', 'Action Suggested', 'Risk Notes', 'Approved By', 'Approved At'];
export const LOG_ROWS_PENDING: LogRow[] = [
  ['11/09/2026', 'BL-1005', '22', '25', 'Order 28 sets from Global Lift Parts', 'Lead time 21 days', 'Sarah Mitchell', '11/09/2026 7:41 AM'],
  ['11/09/2026', 'BL-1003', '210', '200', 'Watch: close to reorder point', '-', 'Sarah Mitchell', '11/09/2026 7:41 AM'],
  ['11/16/2026', 'BL-1002', '1,180', '1,500', 'Order 1,820 boxes from PackRight Industries', '-', '(pending)', ''],
  ['11/16/2026', 'BL-1004', '420', '600', 'Order 780 pairs from SafeHands Co.', '-', '(pending)', ''],
  ['11/16/2026', 'BL-1005', '18', '25', 'Order 32 sets from Global Lift Parts', 'Storms in Shenzhen; Thanksgiving next week; order today', '(pending)', ''],
  ['11/16/2026', 'BL-1007', '31', '40', 'Order 49 drums from Gulf Lubricants', '-', '(pending)', ''],
];
export const LOG_ROWS_APPROVED: LogRow[] = LOG_ROWS_PENDING.filter((r) => r[1] !== 'BL-1004' && r[1] !== 'BL-1007').map((r) =>
  r[6] === '(pending)' ? [...r.slice(0, 6), 'Sarah Mitchell', '11/16/2026 7:12 AM'] : r);
const COLW = [150, 120, 120, 160, 430, 470, 190, 230];

export const Sheet: React.FC<{rows?: LogRow[]; reveal?: number; marks?: Record<string, number>}> = ({rows = LOG_ROWS_PENDING, reveal = 99, marks = {}}) => {
  const m = (k: string) => marks[k] ?? 0;
  return (
    <div style={{position: 'absolute', inset: 0, background: C.white, fontFamily: INTER, color: '#1F1F1F'}}>
      <div style={{height: 70, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px'}}>
        <div style={{width: 36, height: 46, borderRadius: 5, background: '#0F9D58', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{width: 20, height: 22, border: '2px solid #fff', borderRadius: 2}} />
        </div>
        <div>
          <div style={{fontSize: 22}}>Stocky_Decision_Log</div>
          <div style={{fontSize: 15, color: '#444', display: 'flex', gap: 16, marginTop: 2}}>{['File', 'Edit', 'View', 'Insert', 'Format', 'Data', 'Tools', 'Extensions', 'Help'].map((x) => <span key={x}>{x}</span>)}</div>
        </div>
        <div style={{marginLeft: 'auto', height: 42, padding: '0 22px', borderRadius: 21, background: '#C2E7FF', display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 16}}>Share</div>
      </div>
      <div style={{height: 40, background: '#F0F4F9', margin: '0 12px', borderRadius: 20}} />
      <div style={{height: 36, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', borderBottom: '1px solid #E1E3E1', fontSize: 15, color: '#5F6368'}}>
        <span style={{width: 70}}>A1</span> <span style={{fontStyle: 'italic'}}>fx</span> <span style={{color: '#1F1F1F'}}>Date</span>
      </div>
      <div style={{display: 'flex', marginLeft: 0}}>
        <div style={{width: 46}} />
        {COLW.map((w, i) => <div key={i} style={{width: w, height: 28, borderRight: '1px solid #E1E3E1', borderBottom: '1px solid #E1E3E1', background: '#F8F9FA', fontSize: 14, color: '#5F6368', textAlign: 'center', lineHeight: '28px'}}>{String.fromCharCode(65 + i)}</div>)}
      </div>
      {[LOG_HEAD, ...rows].map((r, ri) => {
        const head = ri === 0;
        const o = head ? 1 : Math.max(0, Math.min(1, reveal - (ri - 1)));
        const rowKey = head ? 'header' : `r${ri}`;
        return (
          <div key={ri} style={{display: 'flex', opacity: o, position: 'relative', boxShadow: m(rowKey) > 0.01 ? `0 0 0 ${4 * m(rowKey)}px ${C.hi}, 0 0 24px ${C.hi}88` : undefined, zIndex: m(rowKey) > 0.01 ? 2 : 1}}>
            <div style={{width: 46, minHeight: 56, background: '#F8F9FA', borderRight: '1px solid #E1E3E1', borderBottom: '1px solid #E1E3E1', fontSize: 14, color: '#5F6368', textAlign: 'center', paddingTop: 18}}>{ri + 1}</div>
            {r.map((c, ci) => {
              const ck = `c${ri}_${ci}`;
              return (
                <div key={ci} style={{width: COLW[ci], minHeight: 56, padding: '8px 10px', boxSizing: 'border-box', borderRight: '1px solid #E1E3E1', borderBottom: '1px solid #E1E3E1',
                  fontSize: 17, fontWeight: head ? 700 : 400, background: head ? '#D9EAD3' : c === '(pending)' ? '#FFF7E0' : C.white, display: 'flex', alignItems: 'center',
                  color: c === '(pending)' ? '#B45309' : '#1F1F1F',
                  boxShadow: m(ck) > 0.01 ? `inset 0 0 0 ${4 * m(ck)}px ${C.hi}` : m(`col_${ci}`) > 0.01 ? `inset 0 0 0 999px rgba(255,216,77,${0.38 * m(`col_${ci}`)})` : undefined}}>
                  {c}
                </div>
              );
            })}
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 44, background: '#F8F9FA', borderTop: '1px solid #E1E3E1', display: 'flex', alignItems: 'center', gap: 16, padding: '0 16px'}}>
        <Plus size={18} /> <div style={{padding: '6px 18px', background: '#E1F0E6', color: '#0F9D58', fontWeight: 700, borderRadius: 6, fontSize: 15}}>Log</div>
      </div>
    </div>
  );
};

