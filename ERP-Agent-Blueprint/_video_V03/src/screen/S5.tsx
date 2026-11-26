// Video 3 · Screen 5 — "API Keys: Your Hotel Key Card" (key-card slide + where Odoo keeps API keys; nothing is created)
import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {
  BookOpen, Check, CloudRain, DollarSign, Dumbbell, Hotel, KeyRound, Lock, MessageSquare, RefreshCcw, Trash2, UserRound, Users, X,
} from 'lucide-react';
import {C, FPS, INTER, shadow} from '../theme';
import {pop, prog} from '../lib/anim';
import {vcue} from '../lib/cues';
import {Bg} from '../components/Bg';
import {Sarah, StockyBot} from '../components/Art';
import {Logo} from '../components/Logo';
import {BrowserFrame, Box, CK, Cursor, FRAME, K, mid, Overlay, Rect, Shot} from './kit';
import {SideCard} from './S2';
import dev from '../../public/cap/odoo_settings_dev.json';
import dbg from '../../public/cap/odoo_settings_debug.json';
import menu from '../../public/cap/odoo_user_menu.json';
import prefs from '../../public/cap/odoo_prefs.json';
import sec from '../../public/cap/odoo_security.json';

const R = (o: unknown) => o as Record<string, Rect>;
const DEV = R(dev), DBG = R(dbg), MENU = R(menu), PREFS = R(prefs), SEC = R(sec);
type Ic = React.FC<{size?: number; color?: string}>;

export const S5: React.FC<{starts: Record<string, number>}> = ({starts}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const T = (k: string, phrase?: string, nth = 0) => starts[k] + (phrase ? vcue(k, phrase, nth) : 0);
  const F = (s: number) => Math.round(s * FPS);

  const toBrowser = T('S5_04') - 0.3;
  const toRules = T('S5_09') - 0.3;
  const slideO = 1 - prog(f, F(toBrowser), F(toBrowser + 0.5));
  const browserO = Math.min(prog(f, F(toBrowser), F(toBrowser + 0.5)), 1 - prog(f, F(toRules), F(toRules + 0.5)));

  // Odoo click path
  const clickDev = T('S5_05', 'Click it');
  const reload = T('S5_05', 'reloads');
  const clickAvatar = T('S5_06', 'profile picture') + 0.2;
  const clickPrefs = T('S5_06', 'My Preferences') + 0.3;
  const clickSec = T('S5_06', 'tab called') + 0.6;
  const shot = t < reload ? 'odoo_settings_dev' : t < clickAvatar + 0.15 ? 'odoo_settings_debug' : t < clickPrefs + 0.2 ? 'odoo_user_menu' : t < clickSec + 0.2 ? 'odoo_prefs' : 'odoo_security';
  const keys: CK[] = [
    {t: toBrowser, x: 1300, y: 600},
    {t: T('S5_05', 'Activate') + 0.3, x: mid(DEV.devLink).x, y: mid(DEV.devLink).y},
    {t: clickDev, x: mid(DEV.devLink).x, y: mid(DEV.devLink).y, click: true},
    {t: clickAvatar, x: mid(DBG.avatar).x - 60, y: mid(DBG.avatar).y, click: true},
    {t: clickPrefs, x: mid(MENU.prefs).x, y: mid(MENU.prefs).y, click: true},
    {t: clickSec, x: mid(PREFS.securityTab).x, y: mid(PREFS.securityTab).y, click: true},
    {t: T('S5_07', 'Create API Key'), x: mid(SEC.newKey).x + 20, y: mid(SEC.newKey).y + 6},
    {t: T('S5_08') + 1, x: 1500, y: 900},
  ];
  const debugUrl = t >= reload;

  // Camera: Odoo's UI text is small at full-page size, so push in (~1.6-1.75x) on the part being clicked.
  // The 4K captures keep it sharp. Side cards sit outside the camera, at the right edge, clear of the focus area.
  const devP = mid(DEV.devLink), avP = mid(DBG.avatar), dlgP = {x: 969, y: 560};
  const CAM: Cam[] = [
    {t: toBrowser, s: 1, p: {x: 960, y: 540}, q: {x: 960, y: 540}},
    {t: T('S5_05') - 0.8, s: 1, p: {x: 960, y: 540}, q: {x: 960, y: 540}},
    {t: T('S5_05') + 0.3, s: 1.75, p: devP, q: {x: 700, y: 600}},
    {t: reload + 0.3, s: 1.75, p: devP, q: {x: 700, y: 600}},
    {t: Math.min(reload + 1.3, clickAvatar - 0.7), s: 1.75, p: avP, q: {x: 1300, y: 260}},
    {t: clickPrefs + 0.2, s: 1.75, p: avP, q: {x: 1300, y: 260}},
    {t: clickPrefs + 1.1, s: 1.45, p: dlgP, q: {x: 690, y: 540}},
  ];
  const cam = camAt(CAM, t);

  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      {slideO > 0.01 && <KeySlide f={f} T={T} o={slideO} />}
      {browserO > 0.01 && (
        <AbsoluteFill style={{opacity: browserO}}>
          <AbsoluteFill style={{overflow: 'hidden', borderRadius: 18}}>
          <AbsoluteFill style={{transform: cam, transformOrigin: '0 0'}}>
          <BrowserFrame tabs={['meteo', 'fx', 'odooSet']} active="odooSet"
            url={<>🔒&nbsp;&nbsp;brightleaf-supplies.odoo.com/odoo/settings{debugUrl ? <b style={{color: C.odoo}}>?debug=1</b> : ''}</>}>
            <Shot name={shot} />
          </BrowserFrame>
          <Overlay>
            <Box r={DEV.devLink} a={T('S5_05', 'Activate')} b={reload - 0.1} />
            <Box r={MENU.prefs} a={T('S5_06', 'My Preferences')} b={clickPrefs} />
            <Box r={PREFS.securityTab} a={T('S5_06', 'tab called')} b={clickSec} />
            <Box r={{x: SEC.apiKeys.x, y: SEC.apiKeys.y - 8, w: 380, h: 56}} a={T('S5_07', 'API Keys')} b={T('S5_07', 'Create API Key') - 0.05} />
            <Box r={SEC.newKey} a={T('S5_07', 'Create API Key')} b={T('S5_08') - 0.1} />
            <Cursor keys={keys} />
          </Overlay>
          </AbsoluteFill>
          </AbsoluteFill>
          <SideCard f={f} at={F(T('S5_04', "won't create"))} out={F(T('S5_05'))} title="Just finding reception today" icon={<Hotel size={34} color={C.odoo} />} top={640} right={40} width={560}>
            <div style={{fontSize: 27, fontWeight: 600, color: C.slate}}>We'll create Stocky's key when we connect it to Odoo.</div>
          </SideCard>
          <SideCard f={f} at={F(T('S5_05', 'put off'))} out={F(reload + 0.4)} title='"Developer mode"' icon={<span style={{fontSize: 30}}>🐞</span>} top={300} right={40} width={560}>
            <div style={{fontSize: 27, fontWeight: 600, color: C.slate}}>Sounds scary, isn't. It just shows a few extra options.</div>
          </SideCard>
          <SideCard f={f} at={F(T('S5_06', 'some versions'))} out={F(clickSec + 0.6)} title="Names vary by version" icon={<UserRound size={34} color={C.blue} />} top={620} right={40} width={560}>
            <div style={{fontSize: 27, fontWeight: 600, color: C.slate}}>"My Preferences" or "My Profile" · tab "Security" or "Account Security"</div>
          </SideCard>
          {/* S5_07: shown exactly once */}
          <SideCard f={f} at={F(T('S5_07', 'exactly once'))} out={F(T('S5_08'))} title="Shown exactly once" icon={<KeyRound size={34} color={C.amber} />} top={720} right={40} width={560}>
            <div style={{fontFamily: "'DejaVu Sans Mono', monospace", fontSize: 26, fontWeight: 700, color: C.navy, background: '#F1F5F9', padding: '10px 14px', borderRadius: 12}}>
              7f3a9c••••••••••••••••••••2e81
            </div>
            <div style={{fontSize: 24, fontWeight: 600, color: C.slate, marginTop: 10, opacity: prog(f, F(T('S5_07', 'never shows')), F(T('S5_07', 'never shows')) + 8)}}>Paste it straight into a safe place. Odoo never shows it again.</div>
          </SideCard>
          {/* S5_08: the key belongs to a user */}
          {t >= T('S5_08') - 0.1 && <UserKey f={f} T={T} />}
        </AbsoluteFill>
      )}
      {t >= toRules - 0.1 && <Rules f={f} T={T} a={toRules} />}
    </AbsoluteFill>
  );
};

const KeySlide: React.FC<{f: number; T: (k: string, p?: string, n?: number) => number; o: number}> = ({f, T, o}) => {
  const F = (s: number) => Math.round(s * FPS);
  const card = F(T('S5_02', 'hotel room'));
  const doors: {t: string; I: Ic; ok: boolean; at: number}[] = [
    {t: 'Your room', I: KeyRound, ok: true, at: F(T('S5_02', 'opens your room'))},
    {t: 'The gym', I: Dumbbell, ok: true, at: F(T('S5_02', 'gym'))},
    {t: "Other guests' rooms", I: Users, ok: false, at: F(T('S5_02', 'other guests'))},
    {t: "The manager's office", I: Lock, ok: false, at: F(T('S5_02', "manager's"))},
  ];
  const facts: {t: string; at: number}[] = [
    {t: 'Opens only what it\'s allowed to', at: F(T('S5_03', 'only what'))},
    {t: 'Belongs to a specific user', at: F(T('S5_03', 'specific user'))},
    {t: 'Cancel any time; your password stays the same', at: F(T('S5_03', 'cancelled'))},
  ];
  const p1 = prog(f, F(T('S5_02')) - 10, F(T('S5_02')));
  return (
    <AbsoluteFill style={{opacity: o, padding: '80px 110px', boxSizing: 'border-box'}}>
      {/* S5_01: public vs private kitchens */}
      <div style={{display: 'flex', gap: 30, opacity: 1 - p1, position: 'absolute', left: 110, right: 110, top: 180}}>
        {[
          {h: 'Weather & currency APIs', s: 'Serve anyone. No key needed.', items: [[CloudRain, 'forecasts'], [DollarSign, 'exchange rates']], c: C.green, at: 0, lock: false},
          {h: "Odoo: BrightLeaf's kitchen", s: 'Private. Not for the whole world.', items: [[Lock, 'stock'], [Lock, 'costs'], [Lock, 'customers']], c: C.odoo, at: F(T('S5_01', 'Odoo holds')), lock: true},
        ].map((x, i) => {
          const p = pop(f, x.at, 14);
          return (
            <div key={i} style={{flex: 1, borderRadius: 30, background: C.white, boxShadow: shadow, padding: '36px 40px', borderTop: `12px solid ${x.c}`, opacity: p, transform: `translateY(${(1 - p) * 40}px)`}}>
              {x.lock ? <Logo name="odoo" w={160} h={60} /> : <div style={{fontSize: 50}}>🌍</div>}
              <div style={{fontSize: 42, fontWeight: 800, color: C.navy, marginTop: 14}}>{x.h}</div>
              <div style={{fontSize: 28, fontWeight: 600, color: C.slate, marginTop: 8}}>{x.s}</div>
              <div style={{display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap'}}>
                {x.items.map(([I, l], j) => {
                  const I2 = I as Ic;
                  return <span key={j} style={{display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 999, background: `${x.c}1A`, color: x.c, fontSize: 26, fontWeight: 800}}><I2 size={24} /> {l as string}</span>;
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/* S5_02–03: the hotel key card */}
      {p1 > 0.01 && (
        <div style={{opacity: p1}}>
          <div style={{fontSize: 30, fontWeight: 800, letterSpacing: 4, color: C.hi, textTransform: 'uppercase'}}>An API key = a hotel room key card</div>
          <div style={{display: 'flex', gap: 50, marginTop: 34, alignItems: 'flex-start'}}>
            <div style={{width: 560, height: 350, borderRadius: 30, background: `linear-gradient(135deg, ${C.blue}, #1E3A8A)`, boxShadow: shadow, padding: 36, boxSizing: 'border-box', color: C.white,
              transform: `rotate(${-6 + 6 * pop(f, card, 12)}deg) scale(${0.8 + 0.2 * pop(f, card, 12)})`, opacity: pop(f, card, 12), position: 'relative'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, fontWeight: 800}}><Hotel size={38} /> BrightLeaf Hotel</div>
              <div style={{fontSize: 76, fontWeight: 800, marginTop: 40, letterSpacing: -2}}>Room 412</div>
              <div style={{position: 'absolute', left: 36, bottom: 36, width: 90, height: 60, borderRadius: 10, background: 'linear-gradient(135deg, #FDE68A, #F59E0B)'}} />
              <div style={{position: 'absolute', right: 36, bottom: 40, fontSize: 22, fontWeight: 700, opacity: 0.8}}>Room · Gym · Pool</div>
            </div>
            <div style={{flex: 1}}>
              {doors.map((d, i) => {
                const p = pop(f, d.at, 13);
                return (
                  <div key={i} style={{display: 'flex', alignItems: 'center', gap: 18, padding: '16px 22px', borderRadius: 20, marginBottom: 14, background: C.white, opacity: p, transform: `translateX(${(1 - p) * 40}px)`}}>
                    <d.I size={34} color={d.ok ? C.green : C.red} />
                    <span style={{flex: 1, fontSize: 32, fontWeight: 700, color: C.navy}}>{d.t}</span>
                    {d.ok ? <Check size={36} color={C.green} /> : <X size={36} color={C.red} />}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{display: 'flex', gap: 20, marginTop: 30}}>
            <span style={{display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 24px', borderRadius: 999, background: C.amberSoft, color: '#92400E', fontSize: 28, fontWeight: 800,
              opacity: pop(f, F(T('S5_02', 'Lose')), 13)}}><RefreshCcw size={28} /> Lost? Reception cancels it and gives you a new one</span>
            <span style={{display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 24px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', color: C.white, fontSize: 28, fontWeight: 700,
              opacity: pop(f, F(T('S5_02', 'passport')), 13)}}><BookOpen size={28} /> Your passport (password) doesn't change</span>
          </div>
          <div style={{display: 'flex', gap: 18, marginTop: 26}}>
            {facts.map((x, i) => {
              const p = pop(f, x.at, 13);
              return <div key={i} style={{flex: 1, padding: '18px 22px', borderRadius: 20, background: C.white, borderLeft: `10px solid ${C.hi}`, fontSize: 27, fontWeight: 700, color: C.navy, opacity: p, transform: `translateY(${(1 - p) * 30}px)`}}>{x.t}</div>;
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

type Pt = {x: number; y: number};
type Cam = {t: number; s: number; p: Pt; q: Pt};
const stageOf = (p: Pt) => ({x: FRAME.x + p.x * K, y: FRAME.y + FRAME.chrome + p.y * K});
/** translate+scale (origin 0,0) that puts page point p at stage point q at zoom s, clamped so the browser always fills the frame. */
const camXform = (s: number, p: Pt, q: Pt) => {
  const sp = stageOf(p);
  const clamp = (v: number, lo: number, hi: number) => (lo > hi ? (lo + hi) / 2 : Math.min(hi, Math.max(lo, v)));
  const right = FRAME.x + FRAME.w, bottom = FRAME.y + FRAME.chrome + 1080 * K;
  const tx = clamp(q.x - sp.x * s, 1920 - right * s, -FRAME.x * s);
  const ty = clamp(q.y - sp.y * s, 1080 - bottom * s, -FRAME.y * s);
  return {tx, ty};
};
const camAt = (keys: Cam[], t: number) => {
  let i = 0;
  while (i < keys.length - 1 && t >= keys[i + 1].t) i++;
  const a = keys[i], b = keys[Math.min(i + 1, keys.length - 1)];
  const u = a === b || t <= a.t ? (t >= b.t ? 1 : 0) : interpolate(t, [a.t, b.t], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const A = camXform(a.s, a.p, a.q), B = camXform(b.s, b.p, b.q);
  const s = a.s + (b.s - a.s) * u;
  return `translate(${A.tx + (B.tx - A.tx) * u}px, ${A.ty + (B.ty - A.ty) * u}px) scale(${s})`;
};

const UserKey: React.FC<{f: number; T: (k: string, p?: string, n?: number) => number}> = ({f, T}) => {
  const F = (s: number) => Math.round(s * FPS);
  const a = F(T('S5_08', 'belongs'));
  const own = F(T('S5_08', 'its own user'));
  const p = pop(f, a, 14);
  const o = 1 - prog(f, F(T('S5_09')) - 12, F(T('S5_09')));
  return (
    <div style={{position: 'absolute', right: 36, top: 150, width: 560, padding: '30px 34px', borderRadius: 28, background: C.white, boxShadow: `0 0 0 5px ${C.hi}, ${shadow}`, color: C.navy,
      opacity: Math.min(p, o), transform: `translateX(${(1 - p) * 60}px)`}}>
      <div style={{fontSize: 32, fontWeight: 800}}>A key belongs to a user</div>
      <div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 22, opacity: prog(f, F(T('S5_08', "Sarah's key")), F(T('S5_08', "Sarah's key")) + 8)}}>
        <Sarah size={90} /><KeyRound size={40} color={C.amber} /><StockyBot size={90} f={f} />
        <div style={{fontSize: 26, fontWeight: 700}}>Stocky with Sarah's key = Sarah's permissions</div>
      </div>
      <div style={{marginTop: 24, padding: '18px 22px', borderRadius: 20, background: C.greenSoft, display: 'flex', alignItems: 'center', gap: 16, opacity: prog(f, own, own + 8)}}>
        <StockyBot size={70} f={f} />
        <div style={{fontSize: 27, fontWeight: 800, color: C.green}}>Going live: Stocky gets its own user and its own key card, not the master key</div>
      </div>
    </div>
  );
};

const Rules: React.FC<{f: number; T: (k: string, p?: string, n?: number) => number; a: number}> = ({f, T, a}) => {
  const F = (s: number) => Math.round(s * FPS);
  const rules: {t: string; s: string; I: Ic; at: number}[] = [
    {t: 'Never share a key', s: 'Not in email, WhatsApp chats or shared documents', I: MessageSquare, at: F(T('S5_09', 'One'))},
    {t: 'One key per tool', s: 'Cancelling one never breaks the others', I: KeyRound, at: F(T('S5_09', 'Two'))},
    {t: 'In doubt? Delete it, make a new one', s: 'Ten seconds, and nothing else breaks', I: Trash2, at: F(T('S5_09', 'Three', 1))},
  ];
  return (
    <AbsoluteFill style={{opacity: prog(f, F(a), F(a + 0.5)), padding: '110px 160px', boxSizing: 'border-box', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18}}><KeyRound size={56} color={C.hi} /><div style={{fontSize: 62, fontWeight: 800, color: C.white}}>Three key card rules</div></div>
      <div style={{marginTop: 40}}>
        {rules.map((r, i) => {
          const p = pop(f, r.at, 14);
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 28, padding: '28px 34px', borderRadius: 26, background: C.white, marginBottom: 22, boxShadow: shadow, opacity: p, transform: `translateX(${(1 - p) * 60}px)`}}>
              <div style={{width: 84, height: 84, borderRadius: 24, background: C.navy, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, fontWeight: 800}}>{i + 1}</div>
              <r.I size={46} color={i === 2 ? C.red : C.blue} />
              <div>
                <div style={{fontSize: 40, fontWeight: 800, color: C.navy}}>{r.t}</div>
                <div style={{fontSize: 27, fontWeight: 600, color: C.slate, marginTop: 4}}>{r.s}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
