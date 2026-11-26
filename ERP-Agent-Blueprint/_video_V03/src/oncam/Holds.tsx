import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {ArrowDownToLine, ArrowUpFromLine, HelpCircle} from 'lucide-react';
import {Bg} from '../components/Bg';
import {StockyBot} from '../components/Art';
import {C, FPS, INTER} from '../theme';
import {pop, prog} from '../lib/anim';
import {PAUSE_HOLD} from '../timeline';

// ---------- GET vs POST: the four practice tasks (Video 3, PAUSE & THINK) -------------------------
export const RW = {
  read: {label: 'GET · reading', color: C.blue, I: ArrowDownToLine},
  submit: {label: 'POST · submitting', color: C.amber, I: ArrowUpFromLine},
};
export type RWKind = keyof typeof RW;
export const TASKS: {t: string; ans: RWKind; why: string}[] = [
  {t: "Checking a supplier's lead time", ans: 'read', why: 'Just asking for information'},
  {t: 'Updating the reorder point for BL-1004 to 700', ans: 'submit', why: 'Changes a record in Odoo'},
  {t: 'Sending a delivery reminder email to SafeHands Co.', ans: 'submit', why: 'An action someone will see'},
  {t: "Reading this week's sales orders", ans: 'read', why: 'Just asking for information'},
];

/** One task row: appears at `at`, answer badge pops at `reveal` (frames). */
export const TaskRow: React.FC<{f: number; n: number; at: number; reveal?: number; big?: boolean}> = ({f, n, at, reveal = 1e9, big}) => {
  const s = TASKS[n];
  const k = RW[s.ans];
  const p = pop(f, at, 15);
  const r = pop(f, reveal, 11);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 22, padding: big ? '22px 28px' : '18px 24px', borderRadius: 22, marginBottom: 14,
      background: r > 0.02 ? `${k.color}14` : '#F1F5F9', border: `3px solid ${r > 0.02 ? k.color : 'transparent'}`,
      opacity: p, transform: `translateY(${(1 - p) * 30}px)`}}>
      <div style={{width: 56, height: 56, borderRadius: 16, background: C.navy, color: C.white, fontSize: 30, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
        {n + 1}
      </div>
      <div style={{flex: 1}}>
        <div style={{fontSize: big ? 38 : 29, fontWeight: 650, lineHeight: 1.25, color: C.navy}}>{s.t}</div>
        {r > 0.02 && <div style={{fontSize: 23, fontWeight: 600, color: k.color, marginTop: 4, opacity: r}}>{s.why}</div>}
      </div>
      <div style={{width: 300, display: 'flex', justifyContent: 'flex-end'}}>
        {r > 0.02 ? (
          <span style={{display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderRadius: 999, background: k.color, color: C.white, fontSize: 25, fontWeight: 800, transform: `scale(${r})`}}>
            <k.I size={26} /> {k.label}
          </span>
        ) : (
          <HelpCircle size={44} color={C.slate} strokeWidth={2} />
        )}
      </div>
    </div>
  );
};

/** The "PAUSE & THINK" hold: full-screen tasks + countdown ring. */
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
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 34}}>
          <div>
            <div style={{fontSize: 26, fontWeight: 800, letterSpacing: 4, color: C.amber, textTransform: 'uppercase'}}>Pause & Think</div>
            <div style={{fontSize: 62, fontWeight: 800, color: C.white, letterSpacing: -1, marginTop: 8}}>Reading information, or submitting something?</div>
          </div>
          <svg width={180} height={180} viewBox="0 0 180 180" style={{flexShrink: 0}}>
            <circle cx={90} cy={90} r={R} stroke="rgba(255,255,255,0.15)" strokeWidth={14} fill="none" />
            <circle cx={90} cy={90} r={R} stroke={C.hi} strokeWidth={14} fill="none" strokeLinecap="round"
              strokeDasharray={L} strokeDashoffset={L * ringP} transform="rotate(-90 90 90)" />
            <text x={90} y={108} textAnchor="middle" fontSize={56} fontWeight={800} fill={C.white} fontFamily={INTER}>{left || '✓'}</text>
          </svg>
        </div>
        <div style={{background: 'rgba(255,255,255,0.97)', borderRadius: 32, padding: '32px 36px 18px'}}>
          {TASKS.map((_, i) => <TaskRow key={i} f={f + 400} n={i} at={0} big />)}
        </div>
        <div style={{marginTop: 30, textAlign: 'center', fontSize: 34, fontWeight: 700, color: 'rgba(255,255,255,0.85)'}}>
          ⏸ Pause the video and sort each one: GET or POST?
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
        <div style={{fontSize: 70, fontWeight: 800, color: C.white, marginTop: 12, opacity: prog(f, 10, 22)}}>See you in Video 4</div>
        <div style={{fontSize: 32, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: 12, opacity: prog(f, 16, 28)}}>
          Databases Without Fear: Your Data's Home
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
