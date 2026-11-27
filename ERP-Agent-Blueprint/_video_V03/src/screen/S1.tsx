// Video 3 · Screen 1 — "The Restaurant: How an API Really Works" (diagram + anatomy of a real request URL)
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  Ban, Check, ChefHat, LayoutGrid, LogIn, MousePointer2, ConciergeBell, CookingPot, Lock, MapPin, MousePointerClick, Refrigerator, ScrollText, Soup, UserRound, Utensils, X,
} from 'lucide-react';
import {C, FPS, INTER, shadow} from '../theme';
import {pop, prog} from '../lib/anim';
import {vcue} from '../lib/cues';
import {Bg} from '../components/Bg';
import {StockyBot, Sarah} from '../components/Art';
import {Logo} from '../components/Logo';
import {LowerThird} from '../components/Gfx';

const MONO = "'DejaVu Sans Mono', Menlo, Consolas, monospace";
const BLUE = '#2563EB', GREEN = '#16A34A', ORANGE = '#EA580C';

const Bubble: React.FC<{f: number; at: number; out?: number; x: number; y: number; w?: number; tail?: 'left' | 'right'; children: React.ReactNode; color?: string}> = ({
  f, at, out = 1e9, x, y, w = 420, tail = 'left', children, color = C.white,
}) => {
  const p = pop(f, at, 13);
  const o = 1 - prog(f, out, out + 8);
  if (p < 0.01 || o < 0.01) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, padding: '18px 22px', borderRadius: 22, background: color, color: C.navy, fontSize: 27, fontWeight: 700,
      lineHeight: 1.25, boxShadow: shadow, opacity: Math.min(p, o), transform: `scale(${0.7 + 0.3 * p})`, transformOrigin: tail === 'left' ? '0% 100%' : '100% 100%'}}>
      {children}
      <div style={{position: 'absolute', bottom: -14, [tail]: 34, width: 28, height: 28, background: color, transform: 'rotate(45deg)'}} />
    </div>
  );
};

const Station: React.FC<{x: number; w: number; label: React.ReactNode; sub?: React.ReactNode; f: number; at: number; hl?: number; children: React.ReactNode; shake?: number}> = ({
  x, w, label, sub, f, at, hl = 0, children, shake = 0,
}) => {
  const p = pop(f, at, 14);
  const dx = shake ? Math.sin(f * 1.7) * 9 * shake : 0;
  return (
    <div style={{position: 'absolute', left: x + dx, top: ST_TOP, width: w, opacity: p, transform: `translateY(${(1 - p) * 40}px)`}}>
      <div style={{height: ST_H, borderRadius: 34, background: 'rgba(255,255,255,0.97)', boxShadow: hl ? `0 0 0 ${6 * hl}px ${C.hi}, ${shadow}` : shadow,
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden'}}>
        {children}
      </div>
      <div style={{marginTop: 22, textAlign: 'center', fontSize: 40, fontWeight: 800, color: C.white}}>{label}</div>
      {sub && <div style={{textAlign: 'center', fontSize: 24, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: 4}}>{sub}</div>}
    </div>
  );
};

/** Crossfade between two contents inside a station. */
const Swap: React.FC<{f: number; at: number; a: React.ReactNode; b: React.ReactNode}> = ({f, at, a, b}) => {
  const p = prog(f, at, at + 12);
  return (
    <>
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 1 - p, transform: `scale(${1 - 0.2 * p})`}}>{a}</div>
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: p, transform: `scale(${0.8 + 0.2 * p})`}}>{b}</div>
    </>
  );
};

/** A token that travels along a lane between x0 and x1 (stage px) during [a, b] frames. */
const Traveler: React.FC<{f: number; a: number; b: number; x0: number; x1: number; y: number; children: React.ReactNode}> = ({f, a, b, x0, x1, y, children}) => {
  if (f < a - 2 || f > b + 10) return null;
  const p = prog(f, a, b);
  const o = Math.min(prog(f, a - 2, a + 4), 1 - prog(f, b, b + 10));
  return <div style={{position: 'absolute', left: x0 + (x1 - x0) * p - 34, top: y - 34 - Math.sin(p * Math.PI) * 26, opacity: o}}>{children}</div>;
};
const Tok: React.FC<{I: React.FC<{size?: number; color?: string}>; c: string}> = ({I, c}) => (
  <div style={{width: 68, height: 68, borderRadius: 20, background: C.white, boxShadow: `0 0 0 4px ${c}, ${shadow}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><I size={38} color={c} /></div>
);

// stations (stage px)
const ST_TOP = 290, ST_H = 330; // leaves a clear gap under the section title for the speech bubbles
const CUST = {x: 120, w: 440}, WAIT = {x: 740, w: 440}, KIT = {x: 1360, w: 440};
const cx = (s: {x: number; w: number}) => s.x + s.w / 2;

export const S1: React.FC<{starts: Record<string, number>}> = ({starts}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const T = (k: string, phrase?: string, nth = 0) => starts[k] + (phrase ? vcue(k, phrase, nth) : 0);
  const F = (s: number) => Math.round(s * FPS);
  const sceneB = T('S1_09') - 0.3; // URL anatomy
  const aO = 1 - prog(f, F(sceneB), F(sceneB + 0.5));

  // S1_01 — don't walk into the kitchen
  const walk = F(T('S1_01', "don't", 0));
  const fridge = F(T('S1_01', 'fridge')), knives = F(T('S1_01', 'knives')), cook = F(T('S1_01', 'cook'));
  const chaos = T('S1_01', 'chaos');
  const shake = interpolate(t, [chaos - 0.1, chaos + 0.1, chaos + 0.9], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const noWalk = Math.min(pop(f, walk, 14), 1 - prog(f, F(T('S1_02')) - 6, F(T('S1_02'))));
  // S1_02 — the waiter
  const waiter = F(T('S1_02', 'waiter'));
  const order = F(T('S1_02', 'One chicken'));
  const takes = F(T('S1_02', 'takes'));
  const prep = F(T('S1_02', 'prepares'));
  const back = F(T('S1_02', 'brings'));
  // S1_03 — waiter = API
  const isApi = F(T('S1_03', 'is an API'));
  const apiLong = F(T('S1_03', 'Application'));
  const forget = F(T('S1_03', 'forget'));
  const remember = T('S1_03', 'Just remember');
  // S1_04 — BrightLeaf
  const toOdoo = F(T('S1_04', 'is Odoo'));
  const toStocky = F(T('S1_04', 'is Stocky'));
  const noClick = F(T('S1_04', 'never logs'));
  const noMenu = F(T('S1_04', "doesn't click"));
  const sends = F(T('S1_04', 'sends'));
  const ncIn = prog(f, noClick - 8, noClick + 4), ncOut = prog(f, sends - 10, sends);
  const ncO = Math.min(ncIn, 1 - ncOut);
  const please = F(T('S1_04', 'Please'));
  const goBL = F(T('S1_04', 'Please') + 1.5);
  const eighteen = F(T('S1_04', 'Eighteen'));
  // S1_05 — the kitchen stays safe
  const safe = F(T('S1_05', 'kitchen stays'));
  const cust = F(T('S1_05', 'customer list')), acct = F(T('S1_05', 'accounting')), only = F(T('S1_05', 'only what'));
  // S1_07 / S1_08 — request, response, menu, endpoint
  const req = F(T('S1_07', 'request')), resp = F(T('S1_07', 'response'));
  const menu = F(T('S1_08', 'menu'));
  const ep = F(T('S1_08', 'endpoint'));
  const ep1 = F(T('S1_08', "today's weather")), ep2 = F(T('S1_08', 'latest exchange')), dish = F(T('S1_08', 'one dish'));
  const bl = (s: number) => s >= toStocky;

  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      {aO > 0.01 && (
        <AbsoluteFill style={{opacity: aO * (1 - ncO)}}>
          <div style={{position: 'absolute', left: 120, top: 70, fontSize: 30, fontWeight: 800, letterSpacing: 4, color: C.hi, textTransform: 'uppercase', opacity: prog(f, 0, 14)}}>
            {f >= toOdoo ? 'The restaurant, BrightLeaf edition' : 'Picture a restaurant'}
          </div>
          {/* request / response lanes */}
          {(() => {
            const lp = prog(f, waiter, waiter + 14);
            const lane = (y: number, dir: 1 | -1, label: string, at: number, c: string) => (
              <div style={{position: 'absolute', left: cx(CUST) + 120, width: cx(KIT) - cx(CUST) - 240, top: y, height: 6, borderRadius: 3, background: `rgba(255,255,255,${0.25 * lp})`}}>
                <div style={{position: 'absolute', [dir === 1 ? 'right' : 'left']: -6, top: -11, width: 0, height: 0, borderTop: '14px solid transparent', borderBottom: '14px solid transparent',
                  [dir === 1 ? 'borderLeft' : 'borderRight']: `20px solid rgba(255,255,255,${0.25 * lp})`}} />
                <div style={{position: 'absolute', left: '50%', top: dir === 1 ? -62 : 18, transform: `translateX(-50%) scale(${pop(f, at, 12)})`, padding: '8px 20px', borderRadius: 999,
                  background: c, color: C.white, fontSize: 28, fontWeight: 800, whiteSpace: 'nowrap'}}>{label}</div>
              </div>
            );
            return <>{lane(200, 1, 'Request →', req, BLUE)}{lane(760, -1, '← Response', resp, GREEN)}</>;
          })()}

          <Station x={CUST.x} w={CUST.w} f={f} at={0} label={bl(f) ? 'Stocky' : 'You'} sub={bl(f) ? 'the customer' : 'the customer'}>
            <Swap f={f} at={toStocky}
              a={<div style={{width: 190, height: 190, borderRadius: 95, background: C.blueSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><UserRound size={120} color={C.blue} /></div>}
              b={<StockyBot size={230} f={f} />} />
            <div style={{position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 14, color: C.slate}}><Utensils size={34} /></div>
            {/* the menu card on the table */}
            {f >= menu - 2 && (
              <div style={{position: 'absolute', right: 18, top: 18, width: 170, padding: '12px 14px', borderRadius: 14, background: C.amberSoft, border: `3px solid ${C.amber}`,
                transform: `scale(${pop(f, menu, 12)}) rotate(4deg)`, fontSize: 16, fontWeight: 700, color: '#92400E'}}>
                <div style={{fontSize: 20, fontWeight: 800, letterSpacing: 2}}>MENU</div>
                <div style={{opacity: prog(f, ep1, ep1 + 8)}}>· weather forecast</div>
                <div style={{opacity: prog(f, ep2, ep2 + 8)}}>· exchange rates</div>
              </div>
            )}
          </Station>

          <Station x={WAIT.x} w={WAIT.w} f={f} at={waiter} hl={pop(f, isApi, 12) * (1 - prog(f, F(T('S1_04')), F(T('S1_04')) + 10))}
            label={f >= isApi ? <span>The waiter = <span style={{color: C.hi}}>API</span></span> : 'The waiter'}
            sub={f >= apiLong && f < forget + 40 ? <span style={{textDecoration: f >= forget ? 'line-through' : 'none'}}>Application Programming Interface</span> : 'takes orders, brings food'}>
            <ConciergeBell size={150} color={C.navy} />
          </Station>

          <Station x={KIT.x} w={KIT.w} f={f} at={F(T('S1_01', 'kitchen'))} shake={shake}
            label={f >= toOdoo ? 'Odoo, the kitchen' : 'The kitchen'} sub={f >= toOdoo ? "BrightLeaf's ERP" : 'not yours'}>
            <Swap f={f} at={toOdoo}
              a={<div style={{display: 'flex', gap: 22, alignItems: 'flex-end'}}><Refrigerator size={110} color={C.slate} /><ChefHat size={130} color={C.navy} /><CookingPot size={96} color={C.amber} /></div>}
              b={<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}><Logo name="odoo" w={230} h={90} />
                {f >= safe - 2 && (
                  <div style={{display: 'flex', flexDirection: 'column', gap: 8, opacity: prog(f, safe, safe + 8)}}>
                    {[['Stock levels', Check, GREEN, only], ['Customer list', Lock, C.red, cust], ['Accounting', Lock, C.red, acct]].map(([lab, Ic, c, at], i) => {
                      const I2 = Ic as React.FC<{size?: number; color?: string}>;
                      return (
                        <div key={i} style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 24, fontWeight: 700, color: C.navy, opacity: 0.35 + 0.65 * prog(f, at as number, (at as number) + 8)}}>
                          <I2 size={24} color={c as string} /> {lab as string}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>} />
          </Station>

          {/* S1_01: the three "don'ts" (in the empty middle column, so they never sit on the kitchen icons) */}
          {f < toOdoo && [[fridge, "Don't open the fridge"], [knives, "Don't touch the knives"], [cook, "Don't cook"]].map(([at, txt], i) => {
            const p = pop(f, at as number, 13) * (1 - prog(f, waiter, waiter + 10));
            if (p < 0.01) return null;
            return (
              <div key={i} style={{position: 'absolute', left: WAIT.x + 10, width: WAIT.w - 20, top: ST_TOP + 40 + i * 86, padding: '14px 20px', borderRadius: 18, background: C.redSoft, color: C.red,
                fontSize: 29, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 12, boxShadow: shadow, opacity: p, transform: `translateX(${(1 - p) * 30}px)`}}>
                <X size={30} /> {txt}
              </div>
            );
          })}

          {/* S1_01: you never walk into the kitchen */}
          {noWalk > 0.01 && (
            <div style={{position: 'absolute', left: cx(CUST), width: cx(KIT) - cx(CUST), top: 880, opacity: noWalk}}>
              <div style={{height: 0, borderTop: `6px dashed ${C.red}`}} />
              <div style={{position: 'absolute', left: '50%', top: -44, transform: 'translateX(-50%)', width: 88, height: 88, borderRadius: 44, background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: shadow}}>
                <Ban size={56} color={C.white} />
              </div>
              <div style={{position: 'absolute', left: '50%', top: 54, transform: 'translateX(-50%)', fontSize: 28, fontWeight: 800, color: C.white, whiteSpace: 'nowrap'}}>You never walk into the kitchen</div>
            </div>
          )}

          {/* S1_02: the burrito order */}
          <Bubble f={f} at={order} out={takes + 10} x={CUST.x + 40} y={142} w={460}>"One chicken burrito, please, not too spicy."</Bubble>
          <Traveler f={f} a={takes} b={takes + 22} x0={cx(CUST) + 120} x1={cx(WAIT)} y={203}><Tok I={ScrollText} c={BLUE} /></Traveler>
          <Traveler f={f} a={takes + 24} b={prep} x0={cx(WAIT)} x1={cx(KIT) - 120} y={203}><Tok I={ScrollText} c={BLUE} /></Traveler>
          <Traveler f={f} a={back} b={back + 22} x0={cx(KIT) - 120} x1={cx(WAIT)} y={763}><Tok I={Soup} c={GREEN} /></Traveler>
          <Traveler f={f} a={back + 24} b={back + 46} x0={cx(WAIT)} x1={cx(CUST) + 120} y={763}><Tok I={Soup} c={GREEN} /></Traveler>

          <Bubble f={f} at={please} out={eighteen + 30} x={CUST.x + 30} y={136} w={560}>"Please bring me the on-hand quantity for <b>BL-1005</b>, the pallet jack wheels."</Bubble>
          <Traveler f={f} a={goBL} b={goBL + 30} x0={cx(CUST) + 120} x1={cx(KIT) - 120} y={203}><Tok I={ScrollText} c={BLUE} /></Traveler>
          <Traveler f={f} a={eighteen - 30} b={eighteen} x0={cx(KIT) - 120} x1={cx(CUST) + 120} y={763}><Tok I={Check} c={GREEN} /></Traveler>
          <Bubble f={f} at={eighteen} out={safe} x={WAIT.x + 60} y={800} w={330} tail="right" color={C.greenSoft}>"Eighteen sets."</Bubble>

          {/* S1_08: endpoint = one dish on the menu */}
          {f >= ep - 2 && (
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 150, display: 'flex', justifyContent: 'center', gap: 22, opacity: pop(f, ep, 14)}}>
              {[["Today's weather forecast", '/v1/forecast', ep1], ['Latest exchange rates', '/latest', ep2]].map(([a, b, at], i) => (
                <div key={i} style={{padding: '16px 24px', borderRadius: 20, background: C.white, boxShadow: shadow, display: 'flex', alignItems: 'center', gap: 16, opacity: pop(f, at as number, 13)}}>
                  <span style={{fontSize: 26, fontWeight: 700, color: C.navy}}>{a}</span>
                  <span style={{fontFamily: MONO, fontSize: 26, fontWeight: 700, color: GREEN, background: C.greenSoft, padding: '4px 12px', borderRadius: 10}}>{b}</span>
                </div>
              ))}
              <div style={{padding: '16px 24px', borderRadius: 20, background: C.hi, color: C.navy, fontSize: 26, fontWeight: 800, opacity: pop(f, dish, 13)}}>Endpoint = one dish on the menu</div>
            </div>
          )}
        </AbsoluteFill>
      )}
      {t > remember - 0.1 && t < T('S1_04') && (
        <AbsoluteFill style={{opacity: 1 - prog(f, F(T('S1_04')) - 8, F(T('S1_04')))}}>
          <LowerThird f={f - F(remember)} bottom={60}>API = the waiter. You never walk into the kitchen.</LowerThird>
        </AbsoluteFill>
      )}
      {ncO > 0.01 && <NoClickScene f={f} o={ncO} login={noClick} menu={noMenu} />}
      {t > sceneB - 0.1 && <UrlAnatomy f={f} T={T} start={sceneB} />}
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------------------------------------ URL anatomy
const UrlAnatomy: React.FC<{f: number; T: (k: string, p?: string, n?: number) => number; start: number}> = ({f, T, start}) => {
  const F = (s: number) => Math.round(s * FPS);
  const blue = F(T('S1_10', 'blue')), green = F(T('S1_11', 'green')), orange = F(T('S1_12', 'orange'));
  const lat = F(T('S1_12', 'Latitude')), shz = F(T('S1_12', 'Shenzhen')), rain = F(T('S1_12', 'rainfall'));
  const q = F(T('S1_12', 'question', 1)), amp = F(T('S1_12', 'ampersand'));
  const burrito = F(T('S1_12', 'chicken'));
  const dimTo = (on: number) => (f < blue ? 1 : f >= on ? 1 : 0.25);
  const seg = (txt: string, c: string, on: number, extra?: React.CSSProperties) => (
    <span style={{color: c, opacity: dimTo(on), background: f >= on ? `${c}1A` : 'transparent', borderRadius: 10, padding: '2px 4px', ...extra}}>{txt}</span>
  );
  const sym = (s: string, on: number) => (
    <span style={{color: ORANGE, background: f >= on ? C.hi : 'transparent', borderRadius: 8, padding: '0 4px', boxShadow: f >= on ? `0 0 0 4px ${C.hi}` : undefined}}>{s}</span>
  );
  const label = (txt: string, sub: string, c: string, at: number) => (
    <div style={{flex: 1, padding: '20px 24px', borderRadius: 22, background: C.white, borderTop: `10px solid ${c}`, boxShadow: shadow, opacity: pop(f, at, 13), transform: `translateY(${(1 - pop(f, at, 13)) * 30}px)`}}>
      <div style={{fontSize: 32, fontWeight: 800, color: c}}>{txt}</div>
      <div style={{fontSize: 24, fontWeight: 600, color: C.slate, marginTop: 6}}>{sub}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{opacity: prog(f, F(start), F(start + 0.5)), padding: '90px 110px', boxSizing: 'border-box'}}>
      <div style={{fontSize: 30, fontWeight: 800, letterSpacing: 4, color: C.hi, textTransform: 'uppercase'}}>A real order</div>
      <div style={{marginTop: 22, padding: '34px 40px', borderRadius: 28, background: C.white, boxShadow: shadow, fontFamily: MONO, fontSize: 44, fontWeight: 700, lineHeight: 1.5, wordBreak: 'break-all'}}>
        {seg('https://api.open-meteo.com', BLUE, blue)}
        {seg('/v1/forecast', GREEN, green)}
        <span style={{opacity: dimTo(orange), background: f >= orange ? `${ORANGE}14` : 'transparent', borderRadius: 10}}>
          {sym('?', q)}<span style={{color: ORANGE, background: f >= lat && f < rain ? `${C.hi}88` : 'transparent'}}>latitude=22.54</span>{sym('&', amp)}
          <span style={{color: ORANGE, background: f >= lat && f < rain ? `${C.hi}88` : 'transparent'}}>longitude=114.06</span>{sym('&', amp)}
          <span style={{color: ORANGE, background: f >= rain && f < q ? `${C.hi}88` : 'transparent'}}>daily=precipitation_sum,wind_speed_10m_max</span>{sym('&', amp)}
          <span style={{color: ORANGE}}>timezone=auto</span>
        </span>
      </div>
      <div style={{display: 'flex', gap: 24, marginTop: 30}}>
        {label('Restaurant address', 'Which building? api.open-meteo.com', BLUE, blue)}
        {label('Endpoint', 'Which dish? The forecast', GREEN, green)}
        {label('Order details', 'Everything after the ?', ORANGE, orange)}
      </div>
      <div style={{display: 'flex', gap: 20, marginTop: 26, alignItems: 'stretch'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '16px 24px', borderRadius: 20, background: 'rgba(255,255,255,0.95)', fontSize: 28, fontWeight: 700, color: C.navy, opacity: pop(f, shz, 13)}}>
          <MapPin size={34} color={C.red} /> 22.54, 114.06 = Shenzhen
        </div>
        <div style={{padding: '16px 24px', borderRadius: 20, background: 'rgba(255,255,255,0.95)', fontSize: 28, fontWeight: 700, color: C.navy, opacity: pop(f, rain, 13)}}>☔ rainfall + 💨 wind</div>
        <div style={{padding: '16px 24px', borderRadius: 20, background: C.hi, fontSize: 28, fontWeight: 800, color: C.navy, opacity: pop(f, q, 13)}}>? = "here come my order details"</div>
        <div style={{padding: '16px 24px', borderRadius: 20, background: C.hi, fontSize: 28, fontWeight: 800, color: C.navy, opacity: pop(f, amp, 13)}}>& = "and also"</div>
      </div>
      <div style={{marginTop: 28, alignSelf: 'center', padding: '20px 34px', borderRadius: 24, background: C.navy, border: `3px solid ${C.hi}`, color: C.white, fontSize: 34, fontWeight: 700,
        opacity: pop(f, burrito, 14), transform: `scale(${0.85 + 0.15 * pop(f, burrito, 14)})`}}>
        One chicken burrito <span style={{color: C.hi}}>?</span> not too spicy <span style={{color: C.hi}}>&</span> extra guacamole 🌯
      </div>
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------------------------------------ S1_04: Stocky never logs in, never clicks menus
const Strike: React.FC<{f: number; at: number}> = ({f, at}) => {
  const p = pop(f, at, 12);
  if (p < 0.01) return null;
  return (
    <div style={{position: 'absolute', inset: 0, borderRadius: 30, background: `rgba(220,38,38,${0.10 * p})`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <svg width={300} height={300} viewBox="0 0 100 100" style={{opacity: p, transform: `scale(${0.6 + 0.4 * p})`}}>
        <path d="M18 18 L82 82 M82 18 L18 82" stroke={C.red} strokeWidth={11} strokeLinecap="round" />
      </svg>
    </div>
  );
};
const NoClickScene: React.FC<{f: number; o: number; login: number; menu: number}> = ({f, o, login, menu}) => {
  const card: React.CSSProperties = {position: 'relative', width: 440, height: 430, borderRadius: 30, background: C.white, boxShadow: shadow, padding: '30px 34px', boxSizing: 'border-box', color: C.navy};
  const field = (label: string) => (
    <div style={{marginTop: 18}}>
      <div style={{fontSize: 20, fontWeight: 700, color: C.slate}}>{label}</div>
      <div style={{marginTop: 6, height: 46, borderRadius: 10, border: '2px solid #CBD5E1', background: '#F8FAFC'}} />
    </div>
  );
  const pL = pop(f, login - 6, 14), pM = pop(f, menu - 6, 14);
  return (
    <AbsoluteFill style={{opacity: o, fontFamily: INTER}}>
      <div style={{position: 'absolute', left: 120, top: 70, fontSize: 30, fontWeight: 800, letterSpacing: 4, color: C.hi, textTransform: 'uppercase'}}>How Stocky orders</div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
          <div style={{width: 340, height: 340, borderRadius: 40, background: 'rgba(255,255,255,0.97)', boxShadow: shadow, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <StockyBot size={250} f={f} />
          </div>
          <div style={{fontSize: 40, fontWeight: 800, color: C.white}}>Stocky</div>
        </div>
        {/* Odoo login screen */}
        <div style={{...card, opacity: pL, transform: `translateY(${(1 - pL) * 40}px)`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}><Logo name="odoo" w={120} h={46} /><LogIn size={30} color={C.slate} /></div>
          {field('Email')}
          {field('Password')}
          <div style={{marginTop: 24, height: 54, borderRadius: 12, background: C.odoo, color: C.white, fontSize: 24, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Log in</div>
          <Strike f={f} at={login + 4} />
        </div>
        {/* clicking through menus */}
        <div style={{...card, opacity: pM, transform: `translateY(${(1 - pM) * 40}px)`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 28, fontWeight: 800}}><LayoutGrid size={32} color={C.odoo} /> Menu</div>
          {['Inventory', 'Sales', 'Purchase', 'Invoicing'].map((m, i) => (
            <div key={m} style={{marginTop: i ? 10 : 22, padding: '12px 18px', borderRadius: 12, fontSize: 24, fontWeight: 700, background: i === 0 ? C.blueSoft : '#F8FAFC', color: i === 0 ? C.blue : C.navy}}>{m}</div>
          ))}
          <MousePointer2 size={46} color={C.navy} fill={C.white} style={{position: 'absolute', left: 250, top: 118}} />
          <Strike f={f} at={menu + 4} />
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 790, textAlign: 'center', fontSize: 46, fontWeight: 800, color: C.white, opacity: pop(f, login, 14)}}>
        Stocky never <span style={{color: C.hi}}>logs in</span> and never <span style={{color: C.hi}}>clicks menus</span>
      </div>
    </AbsoluteFill>
  );
};
