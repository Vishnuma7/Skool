import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Bg} from '../components/Bg';
import {StockyBot, Tom} from '../components/Art';
import {Quote} from 'lucide-react';
import tom from '../../vo/tom.json';
import {C, FPS, INTER} from '../theme';
import {pop, prog} from '../lib/anim';
import {PAUSE_HOLD, TOM_LEAD} from '../timeline';
import {SCENARIOS, Scenario} from './pauseOutro';

/** The "[PAUSE & THINK]" hold: full-screen scenarios + countdown ring. */
export const ThinkHold: React.FC = () => {
  const f = useCurrentFrame();
  const total = PAUSE_HOLD * FPS;
  const left = Math.max(0, Math.ceil((total - f) / FPS) - 1);
  const ringP = Math.min(1, f / (total - FPS * 0.6));
  const R = 70;
  const L = 2 * Math.PI * R;
  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      <div style={{position: 'absolute', left: 140, right: 140, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: pop(f, 0, 18)}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40}}>
          <div>
            <div style={{fontSize: 26, fontWeight: 800, letterSpacing: 4, color: C.amber, textTransform: 'uppercase'}}>Pause & Think</div>
            <div style={{fontSize: 64, fontWeight: 800, color: C.white, letterSpacing: -1, marginTop: 8}}>Chatbot, automation or AI agent?</div>
          </div>
          <svg width={180} height={180} viewBox="0 0 180 180">
            <circle cx={90} cy={90} r={R} stroke="rgba(255,255,255,0.15)" strokeWidth={14} fill="none" />
            <circle cx={90} cy={90} r={R} stroke={C.hi} strokeWidth={14} fill="none" strokeLinecap="round"
              strokeDasharray={L} strokeDashoffset={L * ringP} transform="rotate(-90 90 90)" />
            <text x={90} y={108} textAnchor="middle" fontSize={56} fontWeight={800} fill={C.white} fontFamily={INTER}>{left || '✓'}</text>
          </svg>
        </div>
        <div style={{background: 'rgba(255,255,255,0.97)', borderRadius: 32, padding: '36px 40px', color: C.navy}}>
          {SCENARIOS.map((_, i) => (
            <Scenario key={i} f={f + 400} n={i} at={0} big />
          ))}
        </div>
        <div style={{marginTop: 34, textAlign: 'center', fontSize: 34, fontWeight: 700, color: 'rgba(255,255,255,0.85)'}}>
          ⏸ Pause the video and pick one for each
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const EndCard: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <div style={{transform: `scale(${0.7 + 0.3 * pop(f, 0)})`}}>
        <StockyBot size={200} f={f} wave={f < 50} />
      </div>
      <div style={{fontSize: 30, fontWeight: 800, letterSpacing: 5, color: C.hi, textTransform: 'uppercase', marginTop: 20, opacity: prog(f, 6, 16)}}>
        The ERP Agent Blueprint
      </div>
      <div style={{fontSize: 70, fontWeight: 800, color: C.white, marginTop: 12, opacity: prog(f, 10, 22)}}>See you in Video 2</div>
      <div style={{fontSize: 32, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: 12, opacity: prog(f, 16, 28)}}>
        ERP Demystified: A Supply Chain Pro's Tour of Odoo
      </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Tom's line, in Tom's own voice, on a full-screen quote card (replaces the presenter saying it). */
export const TomQuote: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS - TOM_LEAD;
  const ws = (tom as {words: {w: string; t: number}[]}).words;
  const dubai = ws.find((w) => w.w.startsWith('The'))?.t ?? 2.4;
  const line = (text: string, at: number, color: string) => {
    const p = pop(f, Math.round((at + TOM_LEAD) * FPS) - 3, 15);
    return <div style={{fontSize: 74, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.12, color, opacity: p, transform: `translateY(${(1 - p) * 24}px)`}}>{text}</div>;
  };
  const p = pop(f, 0, 18);
  const talking = t > 0 && t < (tom as {duration: number}).duration;
  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{width: 1460, background: 'rgba(255,255,255,0.97)', borderRadius: 40, padding: '64px 80px', display: 'flex', gap: 64, alignItems: 'center',
          boxShadow: '0 30px 80px rgba(2,6,23,0.5)', opacity: p, transform: `scale(${0.94 + 0.06 * p})`, color: C.navy}}>
          <div style={{textAlign: 'center', flexShrink: 0}}>
            <div style={{transform: `scale(${talking ? 1 + 0.015 * Math.sin(f / 2.2) : 1})`}}><Tom size={280} /></div>
            <div style={{fontSize: 40, fontWeight: 800, marginTop: 24}}>Tom</div>
            <div style={{fontSize: 26, fontWeight: 600, color: C.slate}}>Warehouse lead · 11:00 AM</div>
          </div>
          <div style={{flex: 1}}>
            <Quote size={70} color={C.red} fill={C.red} style={{marginBottom: 16}} />
            {line("Sarah, we're out of stretch wrap.", -0.1, C.navy)}
            <div style={{height: 18}} />
            {line("The Dubai order can't ship.", dubai, C.red)}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
