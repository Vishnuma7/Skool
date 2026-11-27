import fs from 'fs';
import {CDPSession, Page} from 'playwright-core';
export const OUT = 'public/cap';
fs.mkdirSync(OUT, {recursive: true});

const HIDE: Record<string, string> = {
  'n8n.cloud': `[data-test-id=banner-stack]{display:none!important}`,
  'odoo.com': `.o_database_expiration_panel,.database_expiration_panel,.o_main_navbar .o_menu_systray .o_trial_banner{display:none!important}`,
  'claude.ai': ``,
};
/**
 * Continuity with Video 1 (captured on macOS): off a Mac, web apps fall back to Segoe UI and show
 * classic scrollbars. Swap the system font for Inter (closest free match to San Francisco, and the
 * font our own frame uses) and hide scrollbars. Icon fonts (Odoo `oi`/`fa`, Material Symbols) are left alone.
 */
const ICON = ':not(.oi):not(.fa):not([class*="material"]):not([class*="icon"])';
const MAC_LOOK = process.platform === 'darwin' ? '' : `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=block');
body, input${ICON}, button${ICON}, select${ICON}, textarea${ICON} { font-family: 'Inter', -apple-system, sans-serif !important; }
body { letter-spacing: -0.006em; }
@font-face { font-family: 'MacMono'; src: url('https://cdn.jsdelivr.net/npm/dejavu-fonts-ttf@2.37.3/ttf/DejaVuSansMono.ttf') format('truetype'); }
pre, code, kbd, samp, tt { font-family: 'MacMono', monospace !important; }
::-webkit-scrollbar { width: 0 !important; height: 0 !important; }
* { scrollbar-width: none !important; }`;
export const macLook = async (page: Page) => {
  if (!MAC_LOOK) return;
  await page.addStyleTag({content: MAC_LOOK});
  await page.evaluate(() => document.fonts.ready);
};
export const prep = async (page: Page) => {
  const s = await emulate(page);
  const host = Object.keys(HIDE).find((h) => page.url().includes(h));
  if (host && HIDE[host]) await page.addStyleTag({content: HIDE[host]});
  await macLook(page);
  return s;
};
/**
 * Screenshot at the *emulated* device scale. Playwright's page.screenshot() follows the real monitor's
 * pixel ratio (2x on the Retina Mac that shot Video 1, 1x on a normal Windows screen), so on Windows it
 * silently gave 1920x1080. Chrome's own Page.captureScreenshot honours the emulated DPR -> 3840x2160 everywhere.
 */
// Device-metrics emulation belongs to the CDP session that set it, so screenshots must go through that same session.
const SESS = new WeakMap<Page, CDPSession>();
export const emulate = async (page: Page, width = 1920, height = 1080, deviceScaleFactor = 2) => {
  const s = SESS.get(page) ?? (await page.context().newCDPSession(page));
  SESS.set(page, s);
  await s.send('Emulation.setDeviceMetricsOverride', {width, height, deviceScaleFactor, mobile: false});
  return s;
};
export const grab = async (page: Page, path: string) => {
  const s = SESS.get(page) ?? (await emulate(page));
  const {data} = await s.send('Page.captureScreenshot', {format: 'png'});
  fs.writeFileSync(path, Buffer.from(data, 'base64'));
};
export type Rect = {x: number; y: number; w: number; h: number};
/** Screenshot (3840x2160) + rects (CSS px, 1920x1080 space). `targets` = label -> CSS selector or JS expression returning an Element. */
export const shot = async (page: Page, name: string, targets: Record<string, string> = {}) => {
  await page.waitForTimeout(400);
  await grab(page, `${OUT}/${name}.png`);
  const rects: Record<string, Rect | null> = {};
  for (const [label, t] of Object.entries(targets)) {
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
