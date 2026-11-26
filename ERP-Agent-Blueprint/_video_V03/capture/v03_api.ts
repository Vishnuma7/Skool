// Video 3 — live API pages (Open-Meteo, Frankfurter) captured through the capture Chrome.
// usage: npx tsx capture/v03_api.ts
// Browser zoom 150 % (as the script asks): 1280x720 CSS px at DPR 3 -> 3840x2160 PNG.
// Rects in public/cap/<name>.json are in 1920x1080 space (CSS px x 1.5), like the Video 1 captures.
import fs from 'fs';
import {Page} from 'playwright-core';
import {connect} from './cdp';
import {emulate, grab, macLook, OUT} from './snap';

const Q = 'latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto';
const PAGES: {name: string; url: string; pretty?: boolean; marks?: string[]}[] = [
  {name: 'api_meteo_raw', url: `https://api.open-meteo.com/v1/forecast?${Q}`, pretty: false},
  {name: 'api_meteo_sz', url: `https://api.open-meteo.com/v1/forecast?${Q}`,
    marks: ['"latitude"', '"timezone"', '"daily_units"', '"precipitation_sum": "mm"', '"wind_speed_10m_max": "km/h"', '"daily"', '"time": [', '"precipitation_sum": [', '"wind_speed_10m_max": [']},
  {name: 'api_meteo_dubai', url: 'https://api.open-meteo.com/v1/forecast?latitude=25.20&longitude=55.27&daily=precipitation_sum,wind_speed_10m_max&timezone=auto',
    marks: ['"timezone"', '"precipitation_sum": [']},
  {name: 'api_fx', url: 'https://api.frankfurter.app/latest?from=USD&to=CNY,MXN,AED',
    marks: ['"amount"', '"base"', '"date"', '"rates"', '"CNY"', '"MXN"']},
  {name: 'api_err404', url: `https://api.open-meteo.com/v1/forecst?${Q}`, marks: ['"reason"', '"error"']},
  {name: 'api_err400', url: 'https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=banana,wind_speed_10m_max&timezone=auto',
    marks: ['"reason"', 'banana']},
];

/** Chrome's built-in "Pretty print" checkbox lives in a user-agent shadow root that selectors can't reach,
 *  so click it by position (top-left bar) and verify via the <pre> text, which is re-rendered indented. */
const isPretty = (p: Page) => p.evaluate(() => (document.querySelector('pre')?.textContent ?? '').includes('\n  '));
const setPretty = async (p: Page, on: boolean) => {
  for (let i = 0; i < 2 && (await isPretty(p)) !== on; i++) { await p.mouse.click(95, 9); await p.waitForTimeout(400); }
  if ((await isPretty(p)) !== on) throw new Error(`could not set pretty print=${on} on ${p.url()}`);
};
/** The checkbox label inherits its font from the container host; give it the Mac UI font too. */
const LABEL_CSS = `.json-formatter-container { font-family: 'Inter', -apple-system, sans-serif !important; }`;

/** Bounding box (1920x1080 space) of the first occurrence of `txt` inside the JSON text. */
const rectOf = (p: Page, txt: string) =>
  p.evaluate(({txt}) => {
    const roots: Node[] = [document.body];
    const c = document.querySelector('.json-formatter-container') as HTMLElement | null;
    if (c?.shadowRoot) roots.unshift(c.shadowRoot);
    for (const root of roots) {
      const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let n: Node | null;
      while ((n = w.nextNode())) {
        const el = (n as Text).parentElement;
        if (!el || el.offsetParent === null) continue;
        const i = n.textContent!.indexOf(txt);
        if (i < 0) continue;
        const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + txt.length);
        const b = r.getBoundingClientRect();
        return {x: b.x * 1.5, y: b.y * 1.5, w: b.width * 1.5, h: b.height * 1.5};
      }
    }
    return null;
  }, {txt});

(async () => {
  const b = await connect();
  const ctx = b.contexts()[0];
  const p = await ctx.newPage();
  await emulate(p, 1280, 720, 3);
  const meta: Record<string, unknown> = {};
  for (const pg of PAGES) {
    const resp = await p.goto(pg.url, {waitUntil: 'load'});
    await p.waitForTimeout(800);
    await setPretty(p, pg.pretty !== false);
    await macLook(p);
    if (process.platform !== 'darwin') await p.addStyleTag({content: LABEL_CSS});
    await p.mouse.move(1270, 710);
    await p.waitForTimeout(400);
    await grab(p, `${OUT}/${pg.name}.png`);
    const rects: Record<string, unknown> = {};
    for (const m of pg.marks ?? []) rects[m] = await rectOf(p, m);
    fs.writeFileSync(`${OUT}/${pg.name}.json`, JSON.stringify(rects, null, 1));
    const body = await p.evaluate(() => document.querySelector('pre')?.textContent ?? '');
    meta[pg.name] = {requested: pg.url, final: p.url(), status: resp?.status(), body};
    const missing = Object.entries(rects).filter(([, v]) => !v).map(([k]) => k);
    console.log(pg.name, resp?.status(), p.url() !== pg.url ? `-> ${p.url()}` : '', missing.length ? `MISSING ${missing.join(', ')}` : '');
  }
  fs.writeFileSync(`${OUT}/api_capture_meta.json`, JSON.stringify({capturedAt: new Date().toISOString(), pages: meta}, null, 1));
  await p.close();
  process.exit(0);
})();
