// Video 3 · Screen 3 — "Second Live Call: The Currency Waiter" (real Frankfurter capture, rates dated 20 Nov 2026)
import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {ArrowRight, Calculator, HelpCircle, Landmark, Signpost, TrendingUp} from 'lucide-react';
import {C, FPS, INTER, shadow} from '../theme';
import {pop, prog} from '../lib/anim';
import {vcue} from '../lib/cues';
import {Bg} from '../components/Bg';
import {LowerThird} from '../components/Gfx';
import {StockyBot} from '../components/Art';
import {ADDR_Y, addrX, BrowserFrame, Box, CK, ColorUrl, Cursor, JsonPage, Overlay, Rect, zr} from './kit';
import {SideCard} from './S2';
import fx from '../../public/cap/api_fx.json';
import meta from '../../public/cap/api_capture_meta.json';

const R = (o: unknown) => o as Record<string, Rect>;
const FX = R(fx);
const LH = 28.5;
/** unzoomed rect (for Magnify, which crops the 4K source) */
const lineRaw = (r: Rect | undefined, w: number, n = 1): Rect | null => (r ? {x: r.x, y: r.y, w, h: LH * n} : null);
/** rect on the zoomed page (for Box overlays) */
const line = (r: Rect | undefined, w: number, n = 1): Rect | null => zr(lineRaw(r, w, n));
const BODY = JSON.parse((meta as {pages: Record<string, {body: string}>}).pages.api_fx.body) as {date: string; rates: {CNY: number; MXN: number}};
const CNY = BODY.rates.CNY;
const BLUE = '#2563EB', GREEN = '#16A34A', ORANGE = '#EA580C';

export const S3: React.FC<{starts: Record<string, number>}> = ({starts}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const T = (k: string, phrase?: string, nth = 0) => starts[k] + (phrase ? vcue(k, phrase, nth) : 0);
  const F = (s: number) => Math.round(s * FPS);

  const paste = T('S3_01', 'second restaurant') + 0.6;
  const epAt = T('S3_02', 'endpoint'), fromAt = T('S3_02', 'from'), toAt = T('S3_02', 'to equals');
  const enter = T('S3_02', 'Enter') + 0.15;
  const moved = T('S3_03', 'changed by itself');
  const loaded = t >= enter;
  const newUrl = t >= enter + 0.5;

  const url = !loaded && t < paste ? <span style={{color: '#94A3B8'}}>Search Google or type a URL</span>
    : newUrl ? (
      <ColorUrl parts={[['api.frankfurter.'], ['dev/v1', t >= moved ? C.red : undefined], ['/latest?from=USD&to=CNY,MXN,AED']]} />
    ) : (
      <ColorUrl caret={!loaded} parts={[['api.frankfurter.app', t >= epAt ? BLUE : undefined], ['/latest', t >= epAt ? GREEN : undefined],
        ['?from=USD', t >= fromAt ? ORANGE : undefined], ['&to=CNY,MXN,AED', t >= toAt ? ORANGE : undefined]]} />
    );

  const keys: CK[] = [
    {t: 0, x: 960, y: 640},
    {t: paste - 0.6, x: addrX(25), y: ADDR_Y, click: true},
    {t: enter + 0.5, x: 1500, y: 600},
  ];
  // stage-space box around the address bar's changed part (for "it changed by itself")
  const addrBox: Rect = {x: addrX(11), y: ADDR_Y - 22, w: (24 * 8.1) / 0.881, h: 44};

  return (
    <AbsoluteFill style={{fontFamily: INTER}}>
      <Bg />
      <BrowserFrame tabs={['meteo', 'newtab']} active={loaded ? 'fx' : 'newtab'} titles={{newtab: loaded ? 'api.frankfurter.dev/v1/latest' : 'New Tab'}}
        url={url} urlFocus={t >= paste - 0.6 && t < enter}>
        {!loaded ? (
          <AbsoluteFill style={{background: C.white, alignItems: 'center', justifyContent: 'center'}}>
            <Img src={staticFile('logos/chrome.svg')} style={{width: 150, height: 150, opacity: 0.9 * (1 - prog(f, F(epAt) - 6, F(epAt)))}} />
          </AbsoluteFill>
        ) : (
<JsonPage name="api_fx" />
        )}
      </BrowserFrame>

      <Overlay>
        <Box r={addrBox} a={moved} b={T('S3_04') - 0.2} color={C.red} />
        <Box tight r={line(FX['"amount"'], 230)} a={T('S3_04', 'Amount')} b={T('S3_04', 'Base') - 0.05} />
        <Box tight r={line(FX['"base"'], 250)} a={T('S3_04', 'Base')} b={T('S3_04', 'Date') - 0.05} />
        <Box tight r={line(FX['"date"'], 370)} a={T('S3_04', 'Date')} b={T('S3_04', 'rates') - 0.05} />
        <Box tight r={line(FX['"rates"'], 330, 4)} a={T('S3_04', 'rates')} b={T('S3_04', 'CNY') - 0.05} />
        <Box tight r={line(FX['"CNY"'], 290)} a={T('S3_04', 'CNY')} b={T('S3_05') + 3} color={C.green} />
        <Box tight r={line(FX['"MXN"'], 290)} a={T('S3_04', 'MXN')} b={T('S3_05') + 3} color={C.green} />
        <Box tight r={line(FX['"rates"'], 330, 4)} a={T('S3_07', 'two')} b={T('S3_09', 'always check') + 2} color={C.red} />
        <Cursor keys={keys} />
      </Overlay>

      {/* S3_01: restaurant number two */}
      <SideCard f={f} at={F(T('S3_01', 'Frankfurter'))} out={F(T('S3_02', 'endpoint'))} title="Restaurant #2: Frankfurter" icon={<span style={{fontSize: 34}}>💱</span>} top={420}>
        <div style={{fontSize: 28, fontWeight: 600, color: C.slate}}>Serves exchange rates · free · no key card</div>
      </SideCard>
      {/* S3_02: reading the order */}
      {t >= epAt - 0.1 && t < enter + 0.6 && (
        <div style={{position: 'absolute', left: 150, right: 150, top: 380, display: 'flex', gap: 22, opacity: 1 - prog(f, F(enter), F(enter + 0.6))}}>
          {[['Endpoint', '/latest', 'the latest rates', GREEN, epAt], ['from', 'USD', 'the US dollar', ORANGE, fromAt], ['to', 'CNY · MXN · AED', 'yuan · peso · dirham', ORANGE, toAt]].map(([k, v, s, c, at], i) => {
            const p = pop(f, F(at as number), 13);
            return (
              <div key={i} style={{flex: 1, padding: '24px 28px', borderRadius: 24, background: C.white, borderTop: `10px solid ${c}`, boxShadow: shadow, opacity: p, transform: `translateY(${(1 - p) * 30}px)`}}>
                <div style={{fontSize: 24, fontWeight: 800, color: c as string, textTransform: 'uppercase', letterSpacing: 2}}>{k as string}</div>
                <div style={{fontSize: 40, fontWeight: 800, color: C.navy, marginTop: 6, fontFamily: "'DejaVu Sans Mono', monospace"}}>{v as string}</div>
                <div style={{fontSize: 24, fontWeight: 600, color: C.slate, marginTop: 6}}>{s as string}</div>
              </div>
            );
          })}
        </div>
      )}
      {/* S3_03: forwarding note */}
      <SideCard f={f} at={F(T('S3_03', 'forwarding note'))} out={F(T('S3_04'))} title="Moved! New address:" icon={<Signpost size={36} color={C.red} />} top={420}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, fontFamily: "'DejaVu Sans Mono', monospace", fontSize: 26, fontWeight: 700}}>
          <span style={{color: C.slate, textDecoration: 'line-through'}}>frankfurter.app</span><ArrowRight size={28} color={C.red} /><span style={{color: C.red}}>frankfurter.dev/v1</span>
        </div>
        <div style={{fontSize: 24, fontWeight: 600, color: C.slate, marginTop: 10}}>Good APIs leave a forwarding address.</div>
      </SideCard>
      {/* S3_04/05: a list inside a list; live numbers */}
      <SideCard f={f} at={F(T('S3_04', 'list inside'))} out={F(T('S3_05', 'different'))} title="A list inside a list" icon={<span style={{fontSize: 30, fontWeight: 800, color: C.blue}}>{'{ }'}</span>} top={560}>
        <div style={{fontSize: 27, fontWeight: 600, color: C.slate}}>Like a shopping list with a "Dairy" section that has its own items.</div>
      </SideCard>
      <SideCard f={f} at={F(T('S3_05', 'different'))} out={F(T('S3_06'))} title="It's live" icon={<TrendingUp size={34} color={C.green} />} top={560}>
        <div style={{fontSize: 27, fontWeight: 600, color: C.slate}}>$1 = {CNY.toFixed(2)} yuan · {BODY.rates.MXN.toFixed(2)} pesos on {new Date(`${BODY.date}T12:00:00Z`).toLocaleDateString('en-US', {month: 'short', day: 'numeric', timeZone: 'UTC'})}. Yours will be different.</div>
      </SideCard>
      {/* S3_06: the invoice maths */}
      {t >= T('S3_06') - 0.1 && t < T('S3_07') + 0.3 && <Invoice f={f} T={T} />}
      {/* S3_07–09: the missing dirham */}
      <SideCard f={f} at={F(T('S3_07', 'dirham'))} out={F(T('S3_08'))} title="Asked for 3. Got 2." icon={<HelpCircle size={36} color={C.red} />} top={420}>
        <div style={{display: 'flex', gap: 12}}>
          {[['CNY', true], ['MXN', true], ['AED', false]].map(([c, ok]) => (
            <span key={c as string} style={{padding: '10px 18px', borderRadius: 14, fontSize: 28, fontWeight: 800, background: ok ? C.greenSoft : C.redSoft, color: ok ? C.green : C.red}}>{ok ? '✓' : '✗'} {c as string}</span>
          ))}
        </div>
      </SideCard>
      <SideCard f={f} at={F(T('S3_08', 'European'))} out={F(T('S3_09'))} title="The kitchen: European Central Bank" icon={<Landmark size={36} color={C.blue} />} top={420}>
        <div style={{fontSize: 27, fontWeight: 600, color: C.slate}}>It doesn't stock the dirham. The waiter didn't crash: it brought what the kitchen had.</div>
      </SideCard>
      <SideCard f={f} at={F(T('S3_09', 'pegged'))} out={F(T('S3_09', 'always check')) + 60} title="AED ≈ 3.67 per dollar" icon={<span style={{fontSize: 32}}>🇦🇪</span>} top={420}>
        <div style={{fontSize: 27, fontWeight: 600, color: C.slate}}>Pegged to the dollar, so it barely moves.</div>
      </SideCard>
      {t >= T('S3_09', 'always check') - 0.1 && (
        <AbsoluteFill>
          <LowerThird f={f - F(T('S3_09', 'always check'))} bottom={40}>Always check: did I get everything I asked for?</LowerThird>
          {t >= T('S3_09', 'teach Stocky') && (
            <div style={{position: 'absolute', right: 150, bottom: 150, opacity: pop(f, F(T('S3_09', 'teach Stocky')), 13)}}><StockyBot size={120} f={f} /></div>
          )}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

const Invoice: React.FC<{f: number; T: (k: string, p?: string, n?: number) => number}> = ({f, T}) => {
  const F = (s: number) => Math.round(s * FPS);
  const a = F(T('S3_06'));
  const p = pop(f, a, 15);
  const o = 1 - prog(f, F(T('S3_07')), F(T('S3_07')) + 10);
  const usd = 60 * 38;
  const yuan = usd * CNY;
  const strong = CNY / 1.03;
  const newUsd = yuan / strong;
  const step = (at: number, l: React.ReactNode, v: React.ReactNode, c = C.navy) => (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 0', borderBottom: '1px solid #E2E8F0', opacity: prog(f, at, at + 8)}}>
      <div style={{fontSize: 28, fontWeight: 600, color: C.slate}}>{l}</div><div style={{fontSize: 38, fontWeight: 800, color: c}}>{v}</div>
    </div>
  );
  const n0 = (x: number) => Math.round(x).toLocaleString('en-US');
  return (
    <div style={{position: 'absolute', right: 130, top: 150, width: 760, padding: '30px 38px', borderRadius: 28, background: C.white, boxShadow: `0 0 0 5px ${C.hi}, ${shadow}`,
      opacity: Math.min(p, o), transform: `translateX(${(1 - p) * 60}px)`, color: C.navy}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 32, fontWeight: 800}}><Calculator size={34} color={C.blue} /> Global Lift Parts bills in yuan</div>
      {step(F(T('S3_06', 'Sixty')), '60 sets × $38', `$${n0(usd)}`)}
      {step(F(T('S3_06', 'which at')), `× ${CNY.toFixed(2)} yuan per $`, `¥${n0(yuan)}`)}
      {step(F(T('S3_06', 'three percent')), 'Yuan 3% stronger → $1 buys', `${strong.toFixed(2)} yuan`, C.amber)}
      {step(F(T('S3_06', 'now costs')), 'Same yuan invoice now costs', `$${n0(newUsd)}`, C.red)}
      <div style={{marginTop: 18, display: 'flex', gap: 14, alignItems: 'center', opacity: prog(f, F(T('S3_06', 'Sixty-eight')), F(T('S3_06', 'Sixty-eight')) + 8)}}>
        <span style={{padding: '10px 20px', borderRadius: 14, background: C.redSoft, color: C.red, fontSize: 30, fontWeight: 800}}>+${n0(newUsd - usd)}, same price</span>
        <span style={{fontSize: 24, fontWeight: 600, color: C.slate, opacity: prog(f, F(T('S3_06', 'SafeHands')), F(T('S3_06', 'SafeHands')) + 8)}}>Same story: SafeHands gloves in pesos</span>
      </div>
    </div>
  );
};
