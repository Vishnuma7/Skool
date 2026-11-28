/**
 * Agentic SCM — About page video (16:9).
 * Keyed presenter over a light brand backdrop, jump cuts with alternating punch-ins, word-synced graphics,
 * word-by-word captions, SFX and a ducked music bed. Timing comes from keeps.json + words.json (see timeline.ts).
 */
import React from 'react';
import {AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {AlertTriangle, BadgeCheck, Bot, Check, Code2, Database, FileSpreadsheet, FileText, LineChart, Mail, MousePointer2, Package,
  PackageSearch, RefreshCw, ShoppingCart} from 'lucide-react';
import {C, INTER, shadow, softShadow} from '../theme';
import {lerp, pop, prog} from '../lib/anim';
import {Bg} from '../components/Bg';
import {Logo, LogoName} from '../components/Logo';
import {FPS, PIECES, Piece, SPEECH_END, TOTAL_FRAMES, Take, WORDS, at, endOf, takeEnd, takeStart} from './timeline';

const BLUE_LIGHT = '#60A5FA';
const ease = Easing.inOut(Easing.cubic);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ---------- cue times (global seconds) ----------
const T = {
  check: at('ab_1', 'Check'), copy: at('ab_1', 'copy'), send: at('ab_1', 'send'), then: at('ab_1', 'then'),
  ai2: at('ab_2', 'AI'), routine: at('ab_2', 'routine'),
  name: at('ab_3', 'Adithyan'), talking: at('ab_3', 'talking'), aiEnd3: endOf('ab_3', 'AI'), build3: at('ab_3', 'build'),
  create: at('ab_4', 'create'), connect: at('ab_4', 'connect'), practical: at('ab_4', 'practical'),
  proc: at('ab_4', 'procurement'), inv: at('ab_4', 'inventory'), plan: at('ab_4', 'planning'),
  bp: at('ab_5', 'ERP'), build5: at('ab_5', 'build'), checks: at('ab_5', 'checks'), low: at('ab_5', "what's"),
  prepares: at('ab_5', 'prepares'), human: at('ab_5', 'human'),
  started: at('ab_6', 'started'),
  stop: at('ab_7', 'Stop'), just: at('ab_7', 'just'), learning: at('ab_7', 'learning'), about7: at('ab_7', 'about'), start7: at('ab_7', 'start'),
  join: at('ab_8', 'Join'), inside: at('ab_8', 'inside'),
};
const SIDE_A = takeStart('ab_4');
const SIDE_B = takeEnd('ab_5');
const KIN_A = takeStart('ab_7');
const KIN_B = T.start7 - 0.06;

// ---------- small helpers ----------
const useT = () => useCurrentFrame() / FPS;
/** Spring 0→1 from time a (s). */
const popAt = (t: number, a: number, damping = 14) => pop(Math.round((t - a) * FPS), 0, damping);
/** Exit 0→1 starting at b (s). */
const outAt = (t: number, b: number, d = 0.3) => interpolate(t, [b, b + d], [0, 1], {...clamp, easing: ease});

const sideAmount = (t: number) =>
  Math.min(
    interpolate(t, [SIDE_A - 0.12, SIDE_A + 0.45], [0, 1], {...clamp, easing: ease}),
    interpolate(t, [SIDE_B - 0.28, SIDE_B + 0.18], [1, 0], {...clamp, easing: ease}),
  );
const SIDE_RECT = {x: 1180, y: 130, w: 660, h: 800};
const CARD = {x: 80, y: 130, w: 1040, h: 800};

// ---------- backdrop ----------
const LightBg: React.FC = () => {
  const f = useCurrentFrame();
  const dx = Math.sin(f / 220) * 50;
  const dy = Math.cos(f / 260) * 30;
  return (
    <AbsoluteFill style={{background: 'linear-gradient(165deg, #F8FAFF 0%, #EEF3FC 55%, #E2EAF8 100%)'}}>
      <AbsoluteFill style={{background: `radial-gradient(800px 520px at ${420 + dx}px ${200 + dy}px, rgba(37,99,235,0.13), transparent 70%)`}} />
      <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(15,23,42,0.07) 1.6px, transparent 1.6px)', backgroundSize: '36px 36px',
        backgroundPosition: `${(f * 0.12) % 36}px 0px`}} />
      {/* brand diagonal, echoing the course thumbnail */}
      <AbsoluteFill style={{clipPath: 'polygon(72.5% 0, 75% 0, 59% 100%, 56.5% 100%)', background: 'rgba(37,99,235,0.18)'}} />
      <AbsoluteFill style={{clipPath: 'polygon(77% 0, 100% 0, 100% 100%, 61% 100%)', background: 'linear-gradient(160deg, #2563EB 0%, #1E3A8A 100%)'}} />
    </AbsoluteFill>
  );
};

// ---------- presenter ----------
const PUNCH: Record<Take, number[]> = {
  ab_1: [1.0, 1.12], ab_2: [1.16], ab_3: [1.02, 1.13], ab_4: [1.0, 1.08], ab_5: [1.0, 1.08, 1.0], ab_6: [1.14], ab_7: [1.22], ab_8: [1.06],
};
/** Quick zoom-settle ("whip") at these global times: scale overshoot + motion blur for ~7 frames. */
const WHIPS = [takeStart('ab_2'), takeStart('ab_6'), T.start7, takeStart('ab_8')];

const PieceVideo: React.FC<{p: Piece}> = ({p}) => {
  const lf = useCurrentFrame();
  const g = (p.f0 + lf) / FPS;
  const list = PUNCH[p.take];
  let s = list[p.idx % list.length] * (1 + 0.03 * (lf / Math.max(1, p.f1 - p.f0)));
  let blur = 0;
  for (const w of WHIPS) {
    if (g >= w && g < w + 0.3) {
      const k = interpolate(g, [w, w + 0.24], [1, 0], {...clamp, easing: Easing.out(Easing.cubic)});
      s *= 1 + 0.14 * k;
      blur = 7 * k;
    }
  }
  const dur = p.f1 - p.f0;
  return (
    <>
      <OffthreadVideo
        transparent
        muted
        src={staticFile(`about/${p.take}.webm`)}
        startFrom={Math.round(p.a * FPS)}
        style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 22%',
          transform: `scale(${s})`, transformOrigin: '48% 30%', filter: blur > 0.2 ? `blur(${blur}px)` : undefined}}
      />
      <Audio src={staticFile(`about/${p.take}.wav`)} startFrom={Math.round(p.a * FPS)}
        volume={(f) => Math.min(1, (f + 1) / 3, (dur - f) / 3)} />
    </>
  );
};

const Presenter: React.FC = () => {
  const t = useT();
  const s = sideAmount(t);
  const r = {x: lerp(0, SIDE_RECT.x, s), y: lerp(0, SIDE_RECT.y, s), w: lerp(1920, SIDE_RECT.w, s), h: lerp(1080, SIDE_RECT.h, s), rad: lerp(0, 36, s)};
  return (
    <div style={{position: 'absolute', left: r.x, top: r.y, width: r.w, height: r.h, borderRadius: r.rad, overflow: 'hidden',
      boxShadow: s > 0.01 ? shadow : undefined, outline: s > 0.01 ? `${5 * s}px solid rgba(255,255,255,${0.9 * s})` : undefined}}>
      <AbsoluteFill style={{opacity: s, background: 'linear-gradient(160deg, #2563EB 0%, #1E3A8A 100%)'}} />
      {PIECES.map((p) => (
        <Sequence key={`${p.take}-${p.idx}`} from={p.f0} durationInFrames={Math.max(1, p.f1 - p.f0)} layout="none">
          <PieceVideo p={p} />
        </Sequence>
      ))}
    </div>
  );
};

// ---------- reusable graphic bits ----------
const base: React.CSSProperties = {fontFamily: INTER, color: C.navy};

/** Floating card that springs in at a and lifts out at b. */
const Tag: React.FC<{a: number; b: number; x?: number; y: number; w: number; dark?: boolean; blue?: boolean; children: React.ReactNode; pad?: string}> = ({
  a, b, x = 90, y, w, dark, blue, children, pad = '26px 30px',
}) => {
  const t = useT();
  if (t < a - 0.02 || t > b + 0.4) return null;
  const p = popAt(t, a, 15);
  const o = outAt(t, b);
  return (
    <div style={{...base, position: 'absolute', left: x, top: y, width: w, boxSizing: 'border-box', padding: pad, borderRadius: 26,
      background: blue ? 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)' : dark ? 'rgba(15,23,42,0.92)' : 'rgba(255,255,255,0.97)',
      color: dark || blue ? C.white : C.navy, boxShadow: shadow,
      opacity: Math.min(p, 1 - o), transform: `translateX(${(1 - p) * -60}px) translateY(${o * -16}px) scale(${0.94 + 0.06 * p})`}}>
      {children}
    </div>
  );
};

const IconBox: React.FC<{color: string; size?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({color, size = 72, children, style}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.26, background: color, color: C.white, flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center', ...style}}>{children}</div>
);

/** Fades children in at a (s) with a small rise. */
const Rise: React.FC<{a: number; children: React.ReactNode; style?: React.CSSProperties; dx?: number}> = ({a, children, style, dx = 0}) => {
  const t = useT();
  const p = popAt(t, a, 15);
  return <div style={{opacity: p, transform: `translate(${(1 - p) * dx}px, ${(1 - p) * 18}px)`, ...style}}>{children}</div>;
};

// ---------- section graphics ----------
const HOOK_END = takeEnd('ab_1') - 0.12;
const HookChip: React.FC<{i: number; a: number; color: string; icon: React.ReactNode; label: string; extra?: React.ReactNode}> = ({i, a, color, icon, label, extra}) => (
  <Tag a={a} b={HOOK_END} y={190 + i * 128} w={540} pad="18px 22px">
    <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
      <IconBox color={color}>{icon}</IconBox>
      <div style={{fontSize: 38, fontWeight: 800, letterSpacing: -0.5, flex: 1}}>{label}</div>
      {extra}
    </div>
  </Tag>
);
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const Hook: React.FC = () => {
  const t = useT();
  const spin = Math.max(0, t - T.then) * 300;
  const day = DAYS[Math.min(DAYS.length - 1, Math.floor(Math.max(0, t - T.then) * 4.5))];
  return (
    <>
      <HookChip i={0} a={T.check} color={C.navy} icon={<Database size={38} strokeWidth={2.4} />} label="Check the ERP" />
      <HookChip i={1} a={T.copy} color={C.green} icon={<FileSpreadsheet size={38} strokeWidth={2.4} />} label="Copy to Excel" />
      <HookChip i={2} a={T.send} color={C.red} icon={<Mail size={38} strokeWidth={2.4} />} label="Email the team" />
      <HookChip i={3} a={T.then} color={C.amber} icon={<RefreshCw size={38} strokeWidth={2.6} style={{transform: `rotate(${spin}deg)`}} />} label="Repeat."
        extra={<div style={{fontSize: 24, fontWeight: 800, color: C.amber, background: C.amberSoft, padding: '8px 14px', borderRadius: 12, letterSpacing: 2}}>{day}</div>} />
    </>
  );
};

const AgentTag: React.FC = () => (
  <Tag a={T.ai2} b={takeEnd('ab_2') - 0.1} y={330} w={600} dark>
    <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
      <IconBox color={C.blue} size={88}><Bot size={52} strokeWidth={2.2} /></IconBox>
      <div>
        <div style={{fontSize: 60, fontWeight: 800, letterSpacing: -1}}>AI agent</div>
        <Rise a={T.routine}><div style={{fontSize: 30, fontWeight: 600, color: BLUE_LIGHT}}>does the routine for you</div></Rise>
      </div>
    </div>
  </Tag>
);

const NameBar: React.FC = () => {
  const t = useT();
  const a = T.name - 0.1;
  const b = Math.min(a + 2.8, T.talking - 0.5);
  if (t < a || t > b + 0.4) return null;
  const p = popAt(t, a, 16);
  const o = outAt(t, b);
  const w = interpolate(t, [a + 0.1, a + 0.5], [0, 1], {...clamp, easing: ease});
  return (
    <div style={{...base, position: 'absolute', left: 90, bottom: 190, opacity: Math.min(p, 1 - o), transform: `translateX(${(1 - p) * -40}px)`}}>
      <div style={{height: 7, width: 140 * w, background: C.blue, borderRadius: 4, marginBottom: 14}} />
      <div style={{background: 'rgba(15,23,42,0.93)', color: C.white, padding: '20px 32px', borderRadius: 20, boxShadow: softShadow}}>
        <div style={{fontSize: 46, fontWeight: 800, letterSpacing: -0.5}}>Adithyan</div>
        <div style={{fontSize: 26, fontWeight: 500, opacity: 0.82, marginTop: 4}}>Co-founder, Experidium</div>
      </div>
    </div>
  );
};

const TalkBuild: React.FC = () => {
  const t = useT();
  const strike = interpolate(t, [T.aiEnd3 - 0.05, T.aiEnd3 + 0.25], [0, 1], {...clamp, easing: ease});
  return (
    <Tag a={T.talking - 0.1} b={takeEnd('ab_3') - 0.1} y={300} w={600}>
      <div style={{position: 'relative', display: 'inline-block', fontSize: 44, fontWeight: 700, color: C.slate}}>
        Talking about AI
        <div style={{position: 'absolute', left: -6, top: '52%', height: 6, width: `calc(${strike * 100}% + 12px)`, background: C.red, borderRadius: 3}} />
      </div>
      <Rise a={T.build3} dx={-20} style={{marginTop: 18}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <IconBox color={C.green} size={60}><Check size={38} strokeWidth={3} /></IconBox>
          <div style={{fontSize: 50, fontWeight: 800, color: C.blue, letterSpacing: -0.5}}>Building with AI</div>
        </div>
      </Rise>
    </Tag>
  );
};

const LOGOS: LogoName[] = ['odoo', 'sap', 'oracle', 'sheets', 'gmail'];
const TASKS: {at: number; label: string; color: string; icon: React.ReactNode}[] = [
  {at: T.proc, label: 'Procurement', color: C.blue, icon: <ShoppingCart size={44} strokeWidth={2.2} />},
  {at: T.inv, label: 'Inventory', color: C.green, icon: <Package size={44} strokeWidth={2.2} />},
  {at: T.plan, label: 'Planning', color: C.amber, icon: <LineChart size={44} strokeWidth={2.2} />},
];
const STEPS: {at: number; label: string; color: string; icon: React.ReactNode}[] = [
  {at: T.checks, label: 'Checks stock', color: C.blue, icon: <PackageSearch size={34} strokeWidth={2.3} />},
  {at: T.low, label: "Flags what's running low", color: C.amber, icon: <AlertTriangle size={34} strokeWidth={2.3} />},
  {at: T.prepares, label: 'Drafts the purchase order', color: C.navy, icon: <FileText size={34} strokeWidth={2.3} />},
  {at: T.human, label: 'Waits for your approval', color: C.green, icon: <BadgeCheck size={34} strokeWidth={2.3} />},
];
const Kick: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{fontSize: 22, fontWeight: 800, letterSpacing: 4, color: C.blue, textTransform: 'uppercase', marginBottom: 18}}>{children}</div>
);

const SideCard: React.FC = () => {
  const t = useT();
  const s = sideAmount(t);
  if (s < 0.01) return null;
  const mid = takeStart('ab_5');
  const a1 = 1 - interpolate(t, [mid - 0.15, mid + 0.1], [0, 1], clamp);
  const a2 = 1 - a1;
  const approved = interpolate(t, [T.human - 0.05, T.human + 0.2], [0, 1], clamp);
  return (
    <div style={{...base, position: 'absolute', left: CARD.x, top: CARD.y, width: CARD.w, height: CARD.h, borderRadius: 36, background: 'rgba(255,255,255,0.98)',
      boxShadow: shadow, opacity: s, transform: `translateX(${(1 - s) * -50}px)`, overflow: 'hidden'}}>
      {/* part 1: what you learn */}
      <div style={{position: 'absolute', inset: 0, padding: '50px 64px', opacity: a1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Rise a={SIDE_A + 0.25}><Kick>Inside Agentic SCM</Kick></Rise>
        <Rise a={T.create - 0.05}>
          <div style={{fontSize: 88, fontWeight: 800, letterSpacing: -2.5, lineHeight: 1.05}}>Create <span style={{color: C.blue}}>AI agents</span></div>
        </Rise>
        <Rise a={T.connect - 0.05} style={{marginTop: 40}}>
          <div style={{fontSize: 34, fontWeight: 600, color: C.slate, marginBottom: 18}}>that connect to business systems</div>
          <div style={{display: 'flex', gap: 18}}>
            {LOGOS.map((l, i) => (
              <Rise key={l} a={T.connect + 0.12 + i * 0.1}>
                <div style={{width: 168, height: 100, borderRadius: 20, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Logo name={l} w={112} h={52} />
                </div>
              </Rise>
            ))}
          </div>
        </Rise>
        <Rise a={T.practical - 0.05} style={{marginTop: 40}}>
          <div style={{fontSize: 34, fontWeight: 600, color: C.slate, marginBottom: 18}}>and take on practical work in</div>
          <div style={{display: 'flex', gap: 24}}>
            {TASKS.map((k) => {
              const p = popAt(t, k.at - 0.05, 13);
              return (
                <div key={k.label} style={{width: 288, height: 210, borderRadius: 26, background: '#F8FAFC', border: `3px solid ${k.color}`, opacity: p,
                  transform: `scale(${0.8 + 0.2 * p})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18}}>
                  <IconBox color={k.color} size={88}>{k.icon}</IconBox>
                  <div style={{fontSize: 36, fontWeight: 800}}>{k.label}</div>
                </div>
              );
            })}
          </div>
        </Rise>
      </div>
      {/* part 2: the first agent you build */}
      <div style={{position: 'absolute', inset: 0, opacity: a2}}>
        {/* course banner: big when the course is named, then docks top-left so the agent steps fit below */}
        {(() => {
          const k = interpolate(t, [T.build5 - 0.15, T.build5 + 0.35], [0, 1], {...clamp, easing: ease});
          const bw = lerp(912, 400, k);
          const bh = bw * (1272 / 2461);
          const top = lerp(170, 104, k);
          const bp = popAt(t, T.bp - 0.15, 15);
          return (
            <>
              <div style={{position: 'absolute', left: 64, top: lerp(110, 48, k), fontSize: 22, fontWeight: 800, letterSpacing: 4, color: C.blue, opacity: popAt(t, mid + 0.05)}}>
                START HERE
              </div>
              <div style={{position: 'absolute', left: 64, top, width: bw, height: bh, borderRadius: lerp(22, 16, k), overflow: 'hidden', boxShadow: softShadow,
                opacity: bp, transform: `scale(${0.92 + 0.08 * bp})`, transformOrigin: '0 0', outline: '1px solid rgba(15,23,42,0.08)'}}>
                <Img src={staticFile('about_assets/blueprint_banner.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <div style={{position: 'absolute', left: 64 + 400 + 34, top: 112, width: 410, opacity: k, transform: `translateX(${(1 - k) * 30}px)`}}>
                <div style={{fontSize: 40, fontWeight: 800, letterSpacing: -1, lineHeight: 1.1}}>The ERP Agent Blueprint</div>
                <div style={{fontSize: 24, fontWeight: 500, color: C.slate, marginTop: 10}}>Your first AI agent, step by step</div>
                <div style={{display: 'flex', gap: 10, marginTop: 16}}>
                  {(['n8n_mark', 'odoo_mark'] as LogoName[]).map((l) => (
                    <div key={l} style={{width: 56, height: 56, borderRadius: 14, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <Logo name={l} w={36} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        })()}
        <div style={{position: 'absolute', left: 64, right: 64, top: 340}}>
        <Rise a={T.build5 + 0.1}>
          <div style={{fontSize: 30, fontWeight: 700, color: C.slate, marginBottom: 14}}>Build an inventory agent that:</div>
        </Rise>
        {STEPS.map((k, i) => {
          const p = popAt(t, k.at - 0.05, 15);
          const last = i === STEPS.length - 1;
          return (
            <div key={k.label} style={{display: 'flex', alignItems: 'center', gap: 20, padding: '12px 18px', marginBottom: 12, borderRadius: 18,
              background: last ? `rgba(22,163,74,${0.06 + 0.12 * approved})` : '#F1F5F9', border: last ? `3px solid rgba(22,163,74,${approved})` : '3px solid transparent',
              opacity: p, transform: `translateX(${(1 - p) * 40}px)`}}>
              <IconBox color={k.color} size={58}>{k.icon}</IconBox>
              <div style={{fontSize: 34, fontWeight: 700, flex: 1}}>{k.label}</div>
              {last && approved > 0 && (
                <div style={{fontSize: 24, fontWeight: 800, color: C.white, background: C.green, padding: '8px 16px', borderRadius: 999,
                  transform: `scale(${0.6 + 0.4 * popAt(t, T.human - 0.05, 12)})`}}>APPROVED</div>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

const NoCode: React.FC = () => (
  <Tag a={takeStart('ab_6') + 0.2} b={takeEnd('ab_6') - 0.08} y={320} w={580}>
    <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
      <IconBox color={C.redSoft} size={70} style={{color: C.red, position: 'relative'}}>
        <Code2 size={42} strokeWidth={2.4} />
        <div style={{position: 'absolute', width: 86, height: 6, background: C.red, borderRadius: 3, transform: 'rotate(-35deg)'}} />
      </IconBox>
      <div style={{fontSize: 44, fontWeight: 800, letterSpacing: -0.5}}>Not a developer?</div>
    </div>
    <Rise a={T.started - 0.15} dx={-20} style={{marginTop: 16}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
        <IconBox color={C.green} size={70}><Check size={42} strokeWidth={3} /></IconBox>
        <div style={{fontSize: 44, fontWeight: 800, color: C.green, letterSpacing: -0.5}}>No code needed</div>
      </div>
    </Rise>
  </Tag>
);

/** "Stop just learning about AI." as full-screen kinetic type. */
const Kinetic: React.FC = () => {
  const t = useT();
  if (t < KIN_A || t >= KIN_B) return null;
  const zoom = interpolate(t, [KIN_A, KIN_B], [1.06, 1.0], clamp);
  const word = (txt: string, a: number, color: string = C.white) => {
    const p = popAt(t, a - 0.04, 12);
    return <span style={{display: 'inline-block', opacity: p, transform: `scale(${1.35 - 0.35 * p})`, color, margin: '0 18px'}}>{txt}</span>;
  };
  return (
    <AbsoluteFill>
      <Bg />
      <AbsoluteFill style={{...base, color: C.white, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontSize: 150, fontWeight: 900, letterSpacing: -4, lineHeight: 1.05, textTransform: 'uppercase', transform: `scale(${zoom})`}}>
        <div>{word('Stop', T.stop, '#F87171')}{word('just', T.just)}</div>
        <div>{word('learning', T.learning)}{word('about AI.', T.about7, BLUE_LIGHT)}</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const StartBuilding: React.FC = () => (
  <Tag a={T.start7} b={takeEnd('ab_7') - 0.06} y={290} w={600} blue pad="30px 38px">
    <div style={{fontSize: 92, fontWeight: 900, letterSpacing: -3, lineHeight: 1, textTransform: 'uppercase'}}>Start<br />building.</div>
  </Tag>
);

const JoinTag: React.FC = () => (
  <Tag a={T.join} b={SPEECH_END - 0.05} y={340} w={600}>
    <div style={{fontSize: 24, fontWeight: 800, letterSpacing: 4, color: C.blue}}>JOIN</div>
    <div style={{fontSize: 64, fontWeight: 900, letterSpacing: -2, marginTop: 4}}>AGENTIC <span style={{color: C.blue}}>SCM</span></div>
    <Rise a={T.inside - 0.1}><div style={{fontSize: 30, fontWeight: 600, color: C.slate, marginTop: 6}}>See you inside →</div></Rise>
  </Tag>
);

const Wordmark: React.FC<{size: number; dark?: boolean}> = ({size, dark}) => (
  <div style={{fontSize: size, fontWeight: 900, letterSpacing: -size * 0.03, color: dark ? C.white : C.navyDeep}}>
    AGENTIC <span style={{color: dark ? BLUE_LIGHT : C.blue}}>SCM</span>
  </div>
);

const EndCard: React.FC = () => {
  const t = useT();
  if (t < SPEECH_END) return null;
  const e = t - SPEECH_END;
  const reveal = interpolate(e, [0, 0.4], [0, 160], {...clamp, easing: Easing.out(Easing.cubic)});
  const click = 1.35;
  const cur = interpolate(e, [0.7, click], [0, 1], {...clamp, easing: ease});
  const press = e > click && e < click + 0.18 ? 0.93 : 1;
  const glow = e > click ? interpolate(e, [click, click + 0.5], [0, 1], clamp) : 0;
  return (
    <AbsoluteFill style={{clipPath: `circle(${reveal}% at 50% 50%)`}}>
      <Bg />
      <AbsoluteFill style={{...base, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.white}}>
        <Rise a={SPEECH_END + 0.15}>
          <div style={{display: 'inline-block', background: C.blue, color: C.white, fontSize: 28, fontWeight: 800, fontStyle: 'italic', letterSpacing: 1,
            padding: '8px 22px', transform: 'skewX(-10deg)', marginBottom: 26}}>AI AGENTS FOR SCM</div>
        </Rise>
        <Rise a={SPEECH_END + 0.22}><Wordmark size={140} dark /></Rise>
        <Rise a={SPEECH_END + 0.35}><div style={{fontSize: 42, fontWeight: 500, opacity: 0.88, marginTop: 14}}>Build AI agents for your supply chain</div></Rise>
        <Rise a={SPEECH_END + 0.5} style={{marginTop: 54, position: 'relative'}}>
          <div style={{background: C.blue, color: C.white, fontSize: 46, fontWeight: 800, padding: '22px 78px', borderRadius: 999, transform: `scale(${press})`,
            boxShadow: `0 0 0 ${glow * 18}px rgba(96,165,250,${0.35 * (1 - glow)}), 0 18px 40px rgba(37,99,235,0.45)`}}>Join</div>
          <MousePointer2 size={62} fill={C.white} color={C.navyDeep} strokeWidth={1.5}
            style={{position: 'absolute', left: lerp(420, 170, cur), top: lerp(170, 58, cur), opacity: interpolate(e, [0.6, 0.8], [0, 1], clamp)}} />
        </Rise>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Small brand bug, top left. */
const Bug: React.FC = () => {
  const t = useT();
  const hide = (t >= KIN_A && t < KIN_B) || t >= SPEECH_END;
  if (hide) return null;
  const p = interpolate(t, [0.2, 0.7], [0, 1], clamp);
  return (
    <div style={{...base, position: 'absolute', left: 62, top: 42, display: 'flex', alignItems: 'center', gap: 14, opacity: 0.92 * p}}>
      <Wordmark size={30} />
      <div style={{background: C.blue, color: C.white, fontSize: 18, fontWeight: 800, fontStyle: 'italic', padding: '5px 12px', transform: 'skewX(-10deg)'}}>AI AGENTS FOR SCM</div>
    </div>
  );
};

// ---------- captions (word-by-word, active word on a brand-blue pill) ----------
const HIDE: [number, number][] = [[KIN_A, takeEnd('ab_7')], [SPEECH_END - 0.02, 999]];
type CW = {w: string; t: number; e: number};
const CHUNKS: CW[][] = (() => {
  const out: CW[][] = [];
  let cur: CW[] = [];
  for (const x of WORDS) {
    const w = {w: x.w.replace(/[,.;:"“”]/g, ''), t: x.t, e: x.e};
    const len = [...cur, w].map((y) => y.w).join(' ').length;
    if (cur.length && (cur.length >= 3 || len > 20 || w.t - cur[cur.length - 1].e > 0.5)) { out.push(cur); cur = []; }
    cur.push(w);
    if (/[.?!,]$/.test(x.w)) { out.push(cur); cur = []; }
  }
  if (cur.length) out.push(cur);
  return out;
})();

const Captions: React.FC = () => {
  const t = useT();
  if (HIDE.some(([a, b]) => t >= a && t < b)) return null;
  let i = -1;
  for (let k = 0; k < CHUNKS.length; k++) if (CHUNKS[k][0].t - 0.05 <= t) i = k;
  if (i < 0) return null;
  const c = CHUNKS[i];
  const endT = Math.min(CHUNKS[i + 1]?.[0].t ?? Infinity, c[c.length - 1].e + 0.3);
  if (t > endT) return null;
  const p = popAt(t, c[0].t - 0.05, 13);
  const active = c.findIndex((w, k) => t >= w.t - 0.03 && t < (c[k + 1]?.t ?? w.e + 0.3));
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 230, background: 'linear-gradient(to bottom, rgba(2,6,23,0), rgba(2,6,23,0.5))'}} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 46, display: 'flex', justifyContent: 'center', fontFamily: INTER,
        transform: `scale(${0.86 + 0.14 * p})`, opacity: Math.min(1, p * 1.5)}}>
        <div style={{display: 'flex', gap: 10, fontSize: 54, fontWeight: 900, letterSpacing: -0.5, textTransform: 'uppercase'}}>
          {c.map((w, k) => {
            const on = k === active;
            return (
              <span key={k} style={{display: 'inline-block', padding: '2px 14px', borderRadius: 14, color: C.white,
                background: on ? C.blue : 'transparent', transform: on ? 'scale(1.06)' : undefined,
                WebkitTextStroke: on ? undefined : '7px #0B1220', paintOrder: 'stroke fill',
                textShadow: on ? undefined : '0 4px 14px rgba(0,0,0,0.5)', boxShadow: on ? '0 8px 22px rgba(37,99,235,0.45)' : undefined}}>{w.w}</span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- sound ----------
type Sfx = {at: number; kind: 'pop' | 'whoosh' | 'click' | 'ding'; vol?: number};
const SFX: Sfx[] = [
  {at: T.check, kind: 'pop'}, {at: T.copy, kind: 'pop'}, {at: T.send, kind: 'pop'}, {at: T.then, kind: 'pop'},
  {at: takeStart('ab_2'), kind: 'whoosh', vol: 0.22}, {at: T.ai2, kind: 'pop'},
  {at: T.name - 0.1, kind: 'pop'}, {at: T.talking - 0.1, kind: 'pop'}, {at: T.build3, kind: 'click'},
  {at: SIDE_A - 0.1, kind: 'whoosh'}, {at: T.create, kind: 'pop'}, {at: T.connect + 0.1, kind: 'click'},
  {at: T.proc - 0.05, kind: 'click'}, {at: T.inv - 0.05, kind: 'click'}, {at: T.plan - 0.05, kind: 'click'},
  {at: T.bp - 0.1, kind: 'pop'}, {at: T.checks - 0.05, kind: 'click'}, {at: T.low - 0.05, kind: 'click'}, {at: T.prepares - 0.05, kind: 'click'},
  {at: T.human - 0.05, kind: 'ding'},
  {at: SIDE_B - 0.25, kind: 'whoosh', vol: 0.22}, {at: takeStart('ab_6') + 0.2, kind: 'pop'},
  {at: KIN_A, kind: 'whoosh'}, {at: T.start7, kind: 'whoosh', vol: 0.25}, {at: T.join, kind: 'pop'},
  {at: SPEECH_END, kind: 'whoosh'}, {at: SPEECH_END + 1.35, kind: 'click', vol: 0.45},
];
const VOL = {pop: 0.28, whoosh: 0.3, click: 0.35, ding: 0.32};

const MUSIC_END = TOTAL_FRAMES / FPS;
const musicVol = (f: number) => {
  const t = f / FPS;
  const kin = t >= KIN_A && t < KIN_B ? 1 : 0;
  const end = interpolate(t, [SPEECH_END - 0.2, SPEECH_END + 0.3], [0, 1], clamp);
  let v = 0.085 + 0.08 * kin + (0.3 - 0.085) * end;
  v *= interpolate(t, [0, 0.6], [0, 1], clamp) * interpolate(t, [MUSIC_END - 1.2, MUSIC_END], [1, 0], clamp);
  return v;
};

// ---------- composition ----------
export const About: React.FC = () => (
  <AbsoluteFill style={{background: C.paper}}>
    <LightBg />
    <Presenter />
    <Bug />
    <Hook />
    <AgentTag />
    <NameBar />
    <TalkBuild />
    <SideCard />
    <NoCode />
    <StartBuilding />
    <JoinTag />
    <Captions />
    <Kinetic />
    <EndCard />
    <Audio src={staticFile('about/bed.wav')} volume={musicVol} />
    {SFX.map((s, i) => (
      <Sequence key={i} from={Math.max(0, Math.round(s.at * FPS))} durationInFrames={45} layout="none">
        <Audio src={staticFile(`sfx/${s.kind}.wav`)} volume={s.vol ?? VOL[s.kind]} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
