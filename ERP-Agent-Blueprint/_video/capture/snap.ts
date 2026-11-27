import fs from 'fs';
import {Page} from 'playwright-core';
export const OUT = process.env.CAP_OUT ?? 'public/cap';
fs.mkdirSync(OUT, {recursive: true});

const HIDE: Record<string, string> = {
  'n8n.cloud': `[data-test-id=banner-stack]{display:none!important}`,
  'odoo.com': `.o_database_expiration_panel,.database_expiration_panel,.o_main_navbar .o_menu_systray .o_trial_banner{display:none!important}`,
  'claude.ai': ``,
};
export const prep = async (page: Page) => {
  const s = await page.context().newCDPSession(page);
  await s.send('Emulation.setDeviceMetricsOverride', {width: 1920, height: 1080, deviceScaleFactor: 2, mobile: false});
  const host = Object.keys(HIDE).find((h) => page.url().includes(h));
  if (host && HIDE[host]) await page.addStyleTag({content: HIDE[host]});
  return s;
};
export type Rect = {x: number; y: number; w: number; h: number};
/** Screenshot (3840x2160) + rects (CSS px, 1920x1080 space). `targets` = label -> CSS selector or JS expression returning an Element. */
export const shot = async (page: Page, name: string, targets: Record<string, string> = {}) => {
  await page.waitForTimeout(400);
  await page.screenshot({path: `${OUT}/${name}.png`});
  const rects: Record<string, Rect | null> = {};
  for (const [label, t] of Object.entries(targets)) {
    if (t.startsWith('r:')) { rects[label] = await page.evaluate(t.slice(2)) as Rect | null; continue; }
    rects[label] = await page.evaluate(`(() => {
      const el = ${t.startsWith('js:') ? t.slice(3) : `document.querySelector(${JSON.stringify(t)})`};
      if (!el) return null; const r = el.getBoundingClientRect(); return {x: r.x, y: r.y, w: r.width, h: r.height};
    })()`) as Rect | null;
  }
  fs.writeFileSync(`${OUT}/${name}.json`, JSON.stringify(rects, null, 1));
  console.log('shot', name, Object.entries(rects).map(([k, v]) => k + (v ? '' : '(MISSING)')).join(', '));
  return rects;
};
/** JS expression: first element whose own text contains `txt` (optionally within selector). */
export const byText = (txt: string, within = '*') =>
  `js:[...document.querySelectorAll(${JSON.stringify(within)})].filter(e => e.textContent && e.textContent.includes(${JSON.stringify(txt)})).sort((a,b)=>a.textContent.length-b.textContent.length)[0]`;
export const node = (name: string) => `[data-test-id=canvas-node][data-node-name=${JSON.stringify(name)}]`;
