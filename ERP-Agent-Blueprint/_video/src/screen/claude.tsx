import React from 'react';
import {ArrowUp, ChevronDown, Code2, FolderClosed, Layers, MessageSquare, PanelLeft, Plus, Search, Settings2} from 'lucide-react';
import {Img, staticFile} from 'remotion';
import {Mark} from './mark';

/** claude.ai-style UI (dark theme). Layout modelled on the real app; content is our own story data. */
const SERIF = '"Tiempos Text", Georgia, "Times New Roman", serif';
const SANS = 'Inter, "Styrene B", Arial, sans-serif';
const K = {bg: '#262624', side: '#1F1E1D', line: '#3A3936', text: '#E8E6E3', dim: '#9C9A92', box: '#30302E', bubble: '#141413', orange: '#C6613F'};

export const CLAUDE_Q = 'How many Steel Hex Bolts M10 do we have in stock at BrightLeaf right now, and should I reorder?';
export const CLAUDE_A1 = "I don't have access to BrightLeaf's inventory system,";
export const CLAUDE_A2 = " so I can't see how many Steel Hex Bolts M10 you have right now. If you share your current stock level and your reorder point, I'm happy to help you decide whether to reorder.";

const SIDE_W = 300;
const MAIN_CX = SIDE_W + (1920 - SIDE_W) / 2;
/** Input box and send button centres (page px) on the empty-chat screen. */
export const CLAUDE_INPUT = {x: MAIN_CX - 120, y: 520};
export const CLAUDE_SEND = {x: MAIN_CX + 380 - 34, y: 566};

const Sidebar: React.FC = () => (
  <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: SIDE_W, background: K.side, borderRight: `1px solid ${K.line}`, fontFamily: SANS, color: K.text, padding: '18px 14px', boxSizing: 'border-box'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '0 8px', height: 40}}>
      <PanelLeft size={20} color={K.dim} />
      <span style={{fontFamily: SERIF, fontSize: 26}}>Claude</span>
    </div>
    <div style={{marginTop: 18}}>
      {[{I: Plus, t: 'New chat', hl: true}, {I: Search, t: 'Search'}, {I: MessageSquare, t: 'Chats'}, {I: FolderClosed, t: 'Projects'}, {I: Layers, t: 'Artifacts'}, {I: Code2, t: 'Code'}].map(({I, t, hl}) => (
        <div key={t} style={{display: 'flex', alignItems: 'center', gap: 14, height: 40, padding: '0 10px', borderRadius: 10, background: hl ? '#2E2D2B' : 'transparent', fontSize: 16}}>
          {hl ? <div style={{width: 24, height: 24, borderRadius: 12, background: K.orange, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Plus size={16} color="#fff" /></div> : <I size={19} color={K.dim} />}
          {t}
        </div>
      ))}
    </div>
    <div style={{marginTop: 26, padding: '0 10px', fontSize: 13, color: K.dim}}>Recents</div>
    {['Supplier lead-time summary', 'Rewrite late-delivery email', 'Safety stock formula', 'Freight quote comparison', 'Excel VLOOKUP help', 'Q4 reorder planning'].map((t) => (
      <div key={t} style={{height: 34, display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: 15, color: '#D4D2CC', whiteSpace: 'nowrap', overflow: 'hidden'}}>{t}</div>
    ))}
    <div style={{position: 'absolute', left: 14, right: 14, bottom: 16, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 10px', borderTop: `1px solid ${K.line}`}}>
      <div style={{width: 34, height: 34, borderRadius: 17, background: '#D4D2CC', color: K.side, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700}}>S</div>
      <div style={{fontSize: 15}}>Sarah Mitchell<div style={{fontSize: 13, color: K.dim}}>Pro plan</div></div>
    </div>
  </div>
);

export const ClaudeChat: React.FC<{typed: number; sent: boolean; words: number; thinking?: boolean; mark?: number; caret?: boolean}> = ({typed, sent, words, thinking, mark = 0, caret}) => {
  const q = CLAUDE_Q.slice(0, Math.floor(typed));
  const all = (CLAUDE_A1 + CLAUDE_A2).split(' ');
  const shownN = Math.floor(words);
  const a1n = CLAUDE_A1.split(' ').length;
  const a1 = all.slice(0, Math.min(shownN, a1n)).join(' ');
  const a2 = shownN > a1n ? ' ' + all.slice(a1n, shownN).join(' ') : '';
  return (
    <div style={{position: 'absolute', inset: 0, background: K.bg, fontFamily: SANS, color: K.text}}>
      <Sidebar />
      {!sent ? (
        <div style={{position: 'absolute', left: SIDE_W, right: 0, top: 330, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, fontFamily: SERIF, fontSize: 48, marginBottom: 40, color: K.text}}>
            <Img src={staticFile('logos/claude_mark.svg')} style={{width: 44, height: 44}} /> Good morning, Sarah
          </div>
          <div style={{width: 760, height: 130, borderRadius: 20, background: K.box, border: `1px solid ${K.line}`, boxShadow: '0 6px 24px rgba(0,0,0,0.25)', padding: '22px 24px', boxSizing: 'border-box', position: 'relative'}}>
            <div style={{fontSize: 20, lineHeight: 1.45, color: q ? K.text : K.dim, minHeight: 30}}>
              {q || 'How can I help you today?'}{caret && <span style={{display: 'inline-block', width: 2, height: 24, background: K.text, marginLeft: 2, verticalAlign: 'middle'}} />}
            </div>
            <div style={{position: 'absolute', left: 24, right: 20, bottom: 16, display: 'flex', alignItems: 'center', gap: 14, color: K.dim}}>
              <Plus size={20} /><Settings2 size={20} />
              <span style={{marginLeft: 'auto', fontSize: 15, display: 'flex', alignItems: 'center', gap: 4}}>Sonnet 5.5 <ChevronDown size={14} /></span>
              <div style={{width: 36, height: 36, borderRadius: 10, background: q ? K.orange : '#5A3A2E', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><ArrowUp size={20} color="#fff" /></div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{position: 'absolute', left: SIDE_W, right: 0, top: 0, bottom: 0}}>
          <div style={{height: 56, display: 'flex', alignItems: 'center', padding: '0 28px', fontSize: 16, color: K.text, borderBottom: `1px solid ${K.line}`}}>Steel Hex Bolts M10 stock <ChevronDown size={16} style={{marginLeft: 6}} color={K.dim} /></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 110, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{width: 820, display: 'flex', justifyContent: 'flex-end'}}>
              <div style={{maxWidth: 620, background: K.bubble, borderRadius: 18, padding: '16px 22px', fontSize: 22, lineHeight: 1.5}}>{CLAUDE_Q}</div>
            </div>
            <div style={{width: 820, marginTop: 40, fontFamily: SERIF, fontSize: 28, lineHeight: 1.6, color: K.text}}>
              {thinking && !shownN ? <span style={{color: K.dim}}>Thinking…</span> : null}
              <Mark on={mark}>{a1}</Mark>{a2}
              {shownN > 3 && <div style={{marginTop: 24}}><Img src={staticFile('logos/claude_mark.svg')} style={{width: 30, height: 30}} /></div>}
            </div>
          </div>
          <div style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 40, width: 820, height: 90, borderRadius: 20, background: K.box, border: `1px solid ${K.line}`, padding: '0 24px', display: 'flex', alignItems: 'center', fontSize: 19, color: K.dim}}>Reply to Claude…</div>
        </div>
      )}
    </div>
  );
};
