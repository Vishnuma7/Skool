// Video 3 · Screen 4 — "Status Codes: The Receipts" (receipt cards + breaking the weather order on purpose)
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Hourglass, KeyRound, Receipt, SearchX, ServerCrash, ThumbsUp, Wrench} from 'lucide-react';
import {C, FPS, INTER, shadow} from '../theme';
import {pop, prog} from '../lib/anim';
import {vcue} from '../lib/cues';
import {Bg} from '../components/Bg';
import {LowerThird} from '../components/Gfx';
import {ADDR_Y, addrX, BrowserFrame, Box, CK, Cursor, JsonPage, Overlay, Rect, StatusBadge, zr} from './kit';
import e404 from '../../public/cap/api_err404.json';
import e400 from '../../public/cap/api_err400.json';

const R = (o: unknown) => o as Record<string, Rect>;
const E404 = R(e404), E400 = R(e400);
const LH = 28.5;
/** unzoomed rect (for Magnify, which crops the 4K source) */
const lineRaw = (r: Rect | undefined, w: number, n = 1): Rect | null => (r ? {x: r.x, y: r.y, w, h: LH * n} : null);
/** rect on the zoomed page (for Box overlays) */
const line = (r: Rect | undefined, w: number, n = 1): Rect | null => zr(lineRaw(r, w, n));

type Ic = React.FC<{size?: number; color?: string}>;
const CODES: {code: string; name: string; plain: string; I: Ic; c: string; beat: string}[] = [
  {code: '200', name: 'OK', plain: 'Order went perfectly. Here\'s your food.', I: ThumbsUp, c: C.green, beat: 'S4_03'},
  {code: '401', name: 'Wrong key card', plain: '"I don\'t know who you are." Key missing, mistyped or cancelled.', I: KeyRound, c: C.red, beat: 'S4_04'},
  {code: '404', name: 'Wrong address', plain: 'Not Found. Usually a typo in the web address.', I: SearchX, c: C.red, beat: 'S4_05'},
  {code: '429', name: 'Too many orders', plain: 'Slow down. Wait and try again, or ask less often.', I: Hourglass, c: C.amber, beat: 'S4_06'},
];

const URL = (endpoint: React.ReactNode, daily: React.ReactNode, caret?: boolean) => (
  <span style={{fontFamily: INTER}}>
    <span style={{color: '#334155'}}>api.open-meteo.com/v1/</span>{endpoint}
    <span style={{color: '#334155'}}>?latitude=22.54&longitude=114.06&daily=</span>{daily}
    <span style={{color: '#334155'}}>&timezone=auto</span>
    {caret && <span style={{display: 'inline-block', width: 2, height: 17, background: C.navy, verticalAlign: 'middle', marginLeft: 1}} />}
  </span>
);

export const S4: React.FC<{starts: Record<string, number>}> = ({starts}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const T = (k: string, phrase?: string, nth = 0) => starts[k] + (phrase ? vcue(k, phrase, nth) : 0);
  const F = (s: number) => Math.round(s * FPS);

  const toBrowser = T('S4_09') - 0.4;
  const slideO = 1 - prog(f, F(toBrowser), F(toBrowser + 0.5));
  // the broken orders
  const typo = T('S4_09', 'take out');
  const enter404 = T('S4_09', 'Enter') + 0.15;
  const fix = T('S4_11') + 0.3;
  const banana = T('S4_11', 'banana');
  const enter400 = T('S4_12') - 0.25;
  const back = T('S4_13') + 0.1;
  const shot = t < enter404 ? 'api_meteo_sz' : t < enter400 ? 'api_err404' : t < back ? 'api_err400' : 'api_meteo_sz';
  const ep = t >= typo && t < fix ? <span style={{color: C.red, fontWeight: 800}}>forecst</span> : <span style={{color: '#334155'}}>forecast</span>;
  const daily = t >= banana && t < back ? <span style={{color: C.red, fontWeight: 800}}>banana</span> : <span style={{color: '#334155'}}>precipitation_sum,wind_speed_10m_max</span>;
  const focus = (t >= typo - 0.6 && t < enter404) || (t >= fix - 0.4 && t < enter400) || (t >= back - 0.6 && t < back + 0.3);
  const keys: CK[] = [
    {t: toBrowser, x: 1500, y: 600},
    {t: typo - 0.3, x: addrX(30), y: ADDR_Y, click: true},
    {t: enter404 + 0.4, x: 1500, y: 560},
    {t: fix - 0.2, x: addrX(70), y: ADDR_Y, click: true},
    {t: enter400 + 0.4, x: 1500, y: 560},
    {t: back - 0.4, x: addrX(70), y: ADDR_Y, click: true},
    {t: back + 0.8, x: 1500, y: 560},
  ];

  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      {slideO > 0.01 && (
        <AbsoluteFill style={{opacity: slideO, padding: '80px 110px', boxSizing: 'border-box'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 20, opacity: prog(f, 0, 14)}}>
            <Receipt size={54} color={C.hi} />
            <div style={{fontSize: 56, fontWeight: 800, color: C.white}}>Every response comes with a receipt</div>
          </div>
          <div style={{fontSize: 30, fontWeight: 600, color: 'rgba(255,255,255,0.75)', marginTop: 10, opacity: pop(f, F(T('S4_01', 'status code')), 14)}}>
            The number on it is the <b style={{color: C.hi}}>status code</b>: how the order went, before you look at the plate.
          </div>
          <div style={{display: 'flex', gap: 26, marginTop: 44}}>
            {CODES.map((x) => {
              const p = pop(f, F(T(x.beat)), 13);
              return (
                <div key={x.code} style={{flex: 1, borderRadius: 24, background: C.white, boxShadow: shadow, overflow: 'hidden', opacity: p, transform: `translateY(${(1 - p) * 50}px) rotate(${(1 - p) * -4}deg)`}}>
                  <div style={{height: 14, background: `repeating-linear-gradient(90deg, ${x.c} 0 18px, transparent 18px 30px)`}} />
                  <div style={{padding: '26px 28px'}}>
                    <x.I size={46} color={x.c} />
                    <div style={{fontSize: 92, fontWeight: 800, color: x.c, letterSpacing: -2, lineHeight: 1, marginTop: 14}}>{x.code}</div>
                    <div style={{fontSize: 32, fontWeight: 800, color: C.navy, marginTop: 10}}>{x.name}</div>
                    <div style={{fontSize: 23, fontWeight: 600, color: C.slate, marginTop: 10, lineHeight: 1.35}}>{x.plain}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{display: 'flex', gap: 18, marginTop: 34}}>
            <span style={{padding: '12px 22px', borderRadius: 999, background: C.greenSoft, color: C.green, fontSize: 26, fontWeight: 800, opacity: pop(f, F(T('S4_03', 'Both')), 13)}}>✓ Both our calls today: 200</span>
            <span style={{padding: '12px 22px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', color: C.white, fontSize: 26, fontWeight: 700, opacity: pop(f, F(T('S4_02', 'Four')), 13)}}>4 codes cover almost everything</span>
          </div>
          {/* S4_07: the shortcut */}
          <div style={{display: 'flex', gap: 18, marginTop: 30}}>
            {[['2xx', 'good news', C.green, T('S4_07', '2')], ['4xx', 'something wrong with your order', C.red, T('S4_07', '4')], ['5xx', "the kitchen's problem: wait, try again", C.amber, T('S4_07', '5')]].map(([k, v, c, at]) => {
              const p = pop(f, F(at as number), 13);
              return (
                <div key={k as string} style={{flex: 1, display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px', borderRadius: 20, background: C.white, borderLeft: `12px solid ${c}`,
                  opacity: p, transform: `translateY(${(1 - p) * 30}px)`}}>
                  {k === '5xx' ? <ServerCrash size={36} color={c as string} /> : null}
                  <span style={{fontSize: 40, fontWeight: 800, color: c as string}}>{k as string}</span>
                  <span style={{fontSize: 26, fontWeight: 700, color: C.navy}}>{v as string}</span>
                </div>
              );
            })}
          </div>
          {/* S4_08: break something on purpose */}
          {t >= T('S4_08') - 0.1 && (
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 70, display: 'flex', justifyContent: 'center', gap: 18}}>
              <span style={{padding: '18px 30px', borderRadius: 999, background: C.hi, color: C.navy, fontSize: 32, fontWeight: 800, opacity: pop(f, F(T('S4_08')), 13)}}>
                <Wrench size={30} style={{verticalAlign: 'middle'}} /> Let's break something on purpose
              </span>
              <span style={{padding: '18px 30px', borderRadius: 999, background: C.greenSoft, color: C.green, fontSize: 30, fontWeight: 800, opacity: pop(f, F(T('S4_08', "can't break")), 13)}}>
                You can't break anything here
              </span>
            </div>
          )}
        </AbsoluteFill>
      )}
      {t >= toBrowser - 0.1 && (
        <AbsoluteFill style={{opacity: prog(f, F(toBrowser), F(toBrowser + 0.5))}}>
          <BrowserFrame tabs={['meteo', 'fx']} active="meteo" url={URL(ep, daily, focus)} urlFocus={focus}
            titles={{meteo: shot === 'api_meteo_sz' ? 'api.open-meteo.com/v1/forecast' : shot === 'api_err404' ? 'api.open-meteo.com/v1/forecst' : 'api.open-meteo.com/v1/forecast?…banana'}}>
            <JsonPage name={shot} />
          </BrowserFrame>
          <Overlay>
            <Box tight r={line(E404['"reason"'], 440)} a={T('S4_10', 'Not Found')} b={T('S4_11') - 0.1} color={C.red} />
            <Box tight r={line(E400['"reason"'], 1460)} a={T('S4_12', 'order')} b={T('S4_12', 'read the message') - 0.1} color={C.red} />
            <Box tight r={line(E400['banana'], 90)} a={T('S4_12', 'which word')} b={T('S4_13') - 0.1} color={C.hi} />
            <StatusBadge code="404" text="Not Found" color={C.red} at={T('S4_10', '404')} b={T('S4_11') - 0.1} y={260} />
            <StatusBadge code="400" text="Bad request" color={C.red} at={T('S4_12', '400')} b={T('S4_13') - 0.1} y={260} />
            <StatusBadge code="200" text="OK · fixed" color={C.green} at={back + 0.3} y={260} />
            <Cursor keys={keys} />
          </Overlay>
          {t >= T('S4_10', 'most common') && t < T('S4_11') && (
            <LowerThird f={f - F(T('S4_10', 'most common'))} bottom={40}>One missing letter = 404 · the most common beginner error</LowerThird>
          )}
          {t >= T('S4_12', 'read the message') && t < T('S4_13') && (
            <LowerThird f={f - F(T('S4_12', 'read the message'))} bottom={40}>When something goes wrong, read the message. It tells you what to fix.</LowerThird>
          )}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
