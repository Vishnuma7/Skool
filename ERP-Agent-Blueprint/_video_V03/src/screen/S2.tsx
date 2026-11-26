// Video 3 · Screen 2 — "Your First Live API Call: Weather in Shenzhen" (real Open-Meteo captures, 22 Nov 2026)
import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {Ban, CloudRain, Download, KeyRound, MapPin, Phone, ShoppingBasket, Timer} from 'lucide-react';
import {C, FPS, INTER, shadow} from '../theme';
import {pop, prog} from '../lib/anim';
import {vcue} from '../lib/cues';
import {Bg} from '../components/Bg';
import {LowerThird} from '../components/Gfx';
import {Sarah} from '../components/Art';
import {ADDR_Y, addrX, BrowserFrame, Box, CK, ColorUrl, Cursor, JsonPage, Magnify, Overlay, PRETTY_BOX, Rect, zr} from './kit';
import sz from '../../public/cap/api_meteo_sz.json';
import dubai from '../../public/cap/api_meteo_dubai.json';
import meta from '../../public/cap/api_capture_meta.json';

const R = (o: unknown) => o as Record<string, Rect>;
const SZ = R(sz), DXB = R(dubai);
const LH = 28.5; // one JSON line (page px)
/** unzoomed rect (for Magnify, which crops the 4K source) */
const lineRaw = (r: Rect | undefined, w: number, n = 1): Rect | null => (r ? {x: r.x, y: r.y, w, h: LH * n} : null);
/** rect on the zoomed page (for Box overlays) */
const line = (r: Rect | undefined, w: number, n = 1): Rect | null => zr(lineRaw(r, w, n));

// the real response (from the capture), for the "read it like columns" table
const SZ_BODY = JSON.parse((meta as {pages: Record<string, {body: string}>}).pages.api_meteo_sz.body) as {daily: {time: string[]; precipitation_sum: number[]; wind_speed_10m_max: number[]}};
const DAYS = SZ_BODY.daily.time.map((d, i) => ({d, rain: SZ_BODY.daily.precipitation_sum[i], wind: SZ_BODY.daily.wind_speed_10m_max[i]}));
const dayName = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC'});

const URL0 = 'api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto';

export const S2: React.FC<{starts: Record<string, number>}> = ({starts}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const T = (k: string, phrase?: string, nth = 0) => starts[k] + (phrase ? vcue(k, phrase, nth) : 0);
  const F = (s: number) => Math.round(s * FPS);

  const click1 = T('S2_01', 'pasting') - 0.6;
  const paste = T('S2_01', 'pasting') + 0.3;
  const enter1 = T('S2_02', 'press Enter') + 0.2;
  const pretty = T('S2_04', 'shopping list');
  const change = T('S2_14', 'I change');
  const enter2 = T('S2_14', 'press Enter') + 0.2;
  const tabletime = T('S2_13');
  const tableOut = T('S2_14') - 0.2;

  const loaded = t >= enter1;
  const isPretty = t >= pretty + 0.15;
  const dxb = t >= enter2;
  const shot = !loaded ? null : dxb ? 'api_meteo_dubai' : isPretty ? 'api_meteo_sz' : 'api_meteo_raw';

  // address bar text
  const editing = t >= change - 0.8 && t < enter2;
  const url = !loaded && t < paste ? (t >= click1 ? <ColorUrl parts={[['']]} caret /> : <span style={{color: '#94A3B8'}}>Search Google or type a URL</span>)
    : t >= change - 0.8 ? (
      <ColorUrl caret={editing} parts={[['api.open-meteo.com/v1/forecast?latitude='], [t >= change ? '25.20' : '22.54', t >= change ? C.red : undefined], ['&longitude='],
        [t >= change + 0.5 ? '55.27' : '114.06', t >= change + 0.5 ? C.red : undefined], ['&daily=precipitation_sum,wind_speed_10m_max&timezone=auto']]} />
    ) : <ColorUrl parts={[[URL0]]} caret={!loaded} />;

  const keys: CK[] = [
    {t: 0, x: 960, y: 620},
    {t: click1, x: addrX(30), y: ADDR_Y, click: true},
    {t: enter1 - 0.1, x: addrX(40), y: ADDR_Y + 40},
    {t: pretty, x: PRETTY_BOX.x, y: PRETTY_BOX.y, click: true},
    {t: pretty + 1.2, x: 1500, y: 560},
    {t: change - 0.2, x: addrX(42), y: ADDR_Y, click: true},
    {t: enter2 + 0.6, x: 1500, y: 560},
  ];

  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      <BrowserFrame tabs={['newtab']} active={loaded ? 'meteo' : 'newtab'} titles={{newtab: loaded ? (dxb ? 'api.open-meteo.com/v1/forecast?latitude=25.20' : 'api.open-meteo.com/v1/forecast') : 'New Tab'}}
        url={url} urlFocus={(t >= click1 && t < enter1) || editing}>
        {!shot ? (
          <AbsoluteFill style={{background: C.white, alignItems: 'center', justifyContent: 'center'}}>
            <Img src={staticFile('logos/chrome.svg')} style={{width: 150, height: 150, opacity: 0.9}} />
          </AbsoluteFill>
        ) : (
<JsonPage name={shot} pretty={shot !== 'api_meteo_raw'} />
        )}
      </BrowserFrame>

      <Overlay>
        {/* S2_06 – S2_12: reading the shopping list, line by line */}
        <Box tight r={line(SZ['"latitude"'], 360)} a={T('S2_06', 'latitude')} b={T('S2_06', 'timezone') - 0.1} />
        <Box tight r={line(SZ['"timezone"'], 430)} a={T('S2_06', 'timezone')} b={T('S2_07') - 0.2} />
        <Box tight r={line(SZ['"daily_units"'], 620, 5)} a={T('S2_08', 'Daily units')} b={T('S2_08', 'millimetres') - 0.1} />
        <Box tight r={line(SZ['"precipitation_sum": "mm"'], 380)} a={T('S2_08', 'millimetres')} b={T('S2_08', 'kilometres') - 0.1} />
        <Box tight r={line(SZ['"wind_speed_10m_max": "km/h"'], 420)} a={T('S2_08', 'kilometres')} b={T('S2_09') - 0.2} />
        <Box tight r={line(SZ['"daily"'], 960, 13)} a={T('S2_09', 'actual forecast')} b={T('S2_10') - 0.2} />
        <Box tight r={line(SZ['"time": ['], 300, 9)} a={T('S2_10')} b={T('S2_11') - 0.15} />
        <Box tight r={line(SZ['"precipitation_sum": ['], 770)} a={T('S2_11')} b={T('S2_12') - 0.15} />
        <Box tight r={line(SZ['"wind_speed_10m_max": ['], 880)} a={T('S2_12')} b={tabletime - 0.1} />
        {/* S2_15: Dubai */}
        <Box tight r={line(DXB['"timezone"'], 400)} a={T('S2_15', 'timezone')} b={T('S2_15', 'rainfall') - 0.1} color={C.green} />
        <Box tight r={line(DXB['"precipitation_sum": ['], 640)} a={T('S2_15', 'rainfall')} b={T('S2_15', 'No surprise') + 1.5} color={C.green} />
        <Cursor keys={keys} />
      </Overlay>

      {/* S2_02: no sign-up, no download, no key */}
      <Chips f={f} items={[
        {I: Ban, t: 'No sign-up', at: F(T('S2_02', 'signing up'))},
        {I: Download, t: 'No download', at: F(T('S2_02', 'downloading'))},
        {I: KeyRound, t: 'No key card needed', at: F(T('S2_02', 'No key'))},
      ]} out={F(enter1 + 0.8)} />
      {/* S2_03: real response, under a second */}
      <Chips f={f} items={[{I: Timer, t: 'Real response · less than a second', at: F(T('S2_03', 'real response'))}]} out={F(T('S2_04'))} color={C.green} />

      {/* S2_05: JSON = labelled shopping list */}
      {t >= T('S2_05', 'JSON') - 0.1 && t < T('S2_06') && (
        <AbsoluteFill style={{opacity: 1 - prog(f, F(T('S2_06')) - 8, F(T('S2_06')))}}>
          <LowerThird f={f - F(T('S2_05', 'JSON'))} bottom={40}>JSON ("Jason") = a labelled shopping list · "label": value</LowerThird>
        </AbsoluteFill>
      )}
      {/* S2_06: shopping-list analogy card */}
      <SideCard f={f} at={F(T('S2_06', 'shopping list'))} out={F(T('S2_07'))} title="Same idea" icon={<ShoppingBasket size={34} color={C.green} />}>
        <div style={{fontFamily: "'DejaVu Sans Mono', monospace", fontSize: 30, lineHeight: 1.6}}>
          <div>"Milk": "2 litres",</div><div>"Eggs": 12</div>
        </div>
      </SideCard>
      {/* S2_07: the nearest grid point */}
      <Magnify name="api_meteo_sz" r={lineRaw(SZ['"latitude"'], 380, 2)} a={T('S2_07', 'latitude')} b={T('S2_08') - 0.2} left={980} top={260} width={760} padY={3} />
      <SideCard f={f} at={F(T('S2_07', 'grid point'))} out={F(T('S2_08'))} title="Asked 22.54 · got 22.53" icon={<MapPin size={34} color={C.red} />} top={560}>
        <div style={{fontSize: 28, fontWeight: 600, color: C.slate}}>The weather service's nearest grid point. Close enough for a city.</div>
      </SideCard>
      {/* S2_08: units */}
      <SideCard f={f} at={F(T('S2_08', 'good API'))} out={F(T('S2_09'))} title="A good API tells you its units" icon={<CloudRain size={34} color={C.blue} />}>
        <div style={{display: 'flex', gap: 14}}>
          <span style={{padding: '8px 16px', borderRadius: 12, background: C.blueSoft, color: C.blue, fontSize: 28, fontWeight: 800}}>rain: mm</span>
          <span style={{padding: '8px 16px', borderRadius: 12, background: C.greenSoft, color: C.green, fontSize: 28, fontWeight: 800}}>wind: km/h</span>
        </div>
      </SideCard>
      {/* S2_09: square brackets */}
      <SideCard f={f} at={F(T('S2_09', 'Square brackets'))} out={F(T('S2_10'))} title="[ … ] = a list" icon={<span style={{fontSize: 34, fontWeight: 800, color: C.blue}}>[ ]</span>}>
        <div style={{fontSize: 28, fontWeight: 600, color: C.slate}}>Several items, like a column in Excel.</div>
      </SideCard>

      {/* S2_13: read it like columns that line up */}
      {t >= tabletime - 0.2 && t < tableOut + 0.4 && <ColumnTable f={f} T={T} a={tabletime} b={tableOut} />}
      {/* S2_14: Dubai */}
      <SideCard f={f} at={F(T('S2_14', 'Gulf'))} out={F(enter2 + 0.5)} title="Gulf Lubricants · Dubai" icon={<MapPin size={34} color={C.red} />} top={640}>
        <div style={{fontSize: 28, fontWeight: 600, color: C.slate}}>Hydraulic oil, BL-1007 · latitude 25.20, longitude 55.27</div>
      </SideCard>
      {/* S2_15: same request, five sets of order details */}
      {/* right-hand panel, in the empty space beside the JSON, so no data line is covered */}
      {t >= T('S2_15', 'five supplier') - 0.1 && (() => {
        const a0 = F(T('S2_15', 'five supplier'));
        const pp = pop(f, a0, 14);
        return (
          <div style={{position: 'absolute', right: 150, top: 250, width: 600, padding: '26px 30px', borderRadius: 26, background: C.white, boxShadow: `0 0 0 5px ${C.hi}, ${shadow}`,
            color: C.navy, opacity: pp, transform: `translateX(${(1 - pp) * 60}px)`}}>
            <div style={{fontSize: 30, fontWeight: 800, marginBottom: 14}}>Five suppliers, one request</div>
            {['Columbus', 'Chicago', 'Monterrey', 'Shenzhen', 'Dubai'].map((c, i) => {
              const p = pop(f, a0 + 4 + i * 4, 13);
              return (
                <div key={c} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '10px 4px', borderTop: i ? '1px solid #E2E8F0' : undefined, fontSize: 28, fontWeight: 750,
                  opacity: p, transform: `translateX(${(1 - p) * 30}px)`}}><MapPin size={28} color={C.red} /> {c}</div>
              );
            })}
            <div style={{marginTop: 14, padding: '12px 18px', borderRadius: 16, background: C.hi, fontSize: 26, fontWeight: 800, opacity: pop(f, F(T('S2_15', 'Same request')), 13)}}>Same request · 5 sets of order details</div>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};

type Ic = React.FC<{size?: number; color?: string}>;
const Chips: React.FC<{f: number; items: {I: Ic; t: string; at: number}[]; out: number; color?: string}> = ({f, items, out, color = C.red}) => {
  const o = 1 - prog(f, out, out + 8);
  if (o <= 0.01 || f < items[0].at - 2) return null;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 60, display: 'flex', justifyContent: 'center', gap: 18, opacity: o}}>
      {items.map((x, i) => {
        const p = pop(f, x.at, 13);
        return (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '16px 26px', borderRadius: 999, background: C.white, boxShadow: `0 0 0 4px ${color}, ${shadow}`,
            fontSize: 30, fontWeight: 800, color: C.navy, opacity: p, transform: `scale(${0.7 + 0.3 * p})`}}><x.I size={32} color={color} /> {x.t}</div>
        );
      })}
    </div>
  );
};

export const SideCard: React.FC<{f: number; at: number; out: number; title: string; icon: React.ReactNode; children: React.ReactNode; top?: number; right?: number; width?: number}> = ({f, at, out, title, icon, children, top = 300, right = 150, width = 640}) => {
  const p = pop(f, at, 14);
  const o = 1 - prog(f, out, out + 8);
  if (f < at - 2 || o <= 0.01) return null;
  return (
    <div style={{position: 'absolute', right, top, width, padding: '28px 32px', borderRadius: 26, background: C.white, boxShadow: `0 0 0 5px ${C.hi}, ${shadow}`,
      color: C.navy, opacity: Math.min(p, o), transform: `translateX(${(1 - p) * 60}px)`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 32, fontWeight: 800, marginBottom: 14}}>{icon}{title}</div>
      {children}
    </div>
  );
};

const ColumnTable: React.FC<{f: number; T: (k: string, p?: string, n?: number) => number; a: number; b: number}> = ({f, T, a, b}) => {
  const F = (s: number) => Math.round(s * FPS);
  const p = pop(f, F(a), 15);
  const o = 1 - prog(f, F(b), F(b) + 10);
  const first = F(T('S2_13', '22nd')), wet = F(T('S2_13', '24th')), call = F(T('S2_13', 'call'));
  return (
    <div style={{position: 'absolute', right: 120, top: 130, width: 820, borderRadius: 28, background: C.white, boxShadow: shadow, overflow: 'hidden', color: C.navy,
      opacity: Math.min(p, o), transform: `translateX(${(1 - p) * 60}px)`}}>
      <div style={{padding: '22px 30px', background: C.navy, color: C.white, fontSize: 30, fontWeight: 800}}>Read it like Excel columns · Shenzhen</div>
      <div style={{display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', fontSize: 27, fontWeight: 700}}>
        {['Date', 'Rain (mm)', 'Wind (km/h)'].map((h) => <div key={h} style={{padding: '14px 30px', background: '#F1F5F9', color: C.slate}}>{h}</div>)}
        {DAYS.map((d, i) => {
          const hl = i === 0 ? prog(f, first, first + 6) * (1 - prog(f, wet - 6, wet)) : i === 2 ? prog(f, wet, wet + 6) : 0;
          const bg = i === 2 && hl > 0 ? `rgba(220,38,38,${0.16 * hl})` : hl > 0 ? `rgba(255,216,77,${0.5 * hl})` : 'transparent';
          return (
            <React.Fragment key={d.d}>
              {[dayName(d.d), d.rain.toFixed(1), d.wind.toFixed(1)].map((v, j) => (
                <div key={j} style={{padding: '11px 30px', background: bg, borderTop: '1px solid #E2E8F0', color: i === 2 && j === 1 && hl > 0 ? C.red : C.navy, fontWeight: i === 2 && j === 1 && hl > 0 ? 800 : 650,
                  opacity: prog(f, F(a) + 4 + i * 2, F(a) + 10 + i * 2)}}>{v}</div>
              ))}
            </React.Fragment>
          );
        })}
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '18px 30px', background: C.redSoft, opacity: prog(f, call, call + 8)}}>
        <Sarah size={60} /><Phone size={30} color={C.red} />
        <div style={{fontSize: 25, fontWeight: 700}}>48.4 mm: Sarah calls Global Lift Parts about the pallet jack wheels</div>
      </div>
    </div>
  );
};
