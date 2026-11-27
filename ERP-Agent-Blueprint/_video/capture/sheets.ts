// Helpers for driving + measuring the real Google Sheets UI (capture Chrome, CDP).
import fs from 'fs';
import {Page} from 'playwright-core';
import {OUT} from './snap';
export type Rect = {x: number; y: number; w: number; h: number};
/** Sheets is captured at a 1280x720 CSS viewport (x3 = 3840x2160) so the grid reads clearly; rects are saved in 1920x1080 page px. */
export const VW = 1280, VH = 720, SC = 1920 / VW;

const HIDE_CSS = `a.gb_C, a[aria-label^="Google Account"], .gb_Bd, #docs-gemini-button, .docs-gm3-gemini-button, [aria-label="Ask Gemini"],
  .appsElementsSidekickEntryPointButton, .appsElementsSidekickEntryPointRoot, .docs-titlebar-badges, .docs-explore-widget, .waffle-assistant-entry, #docs-butterbar-container .docs-butterbar-wrap {display:none!important}`;

export const prepSheets = async (page: Page) => {
  const s = await page.context().newCDPSession(page);
  await s.send('Emulation.setDeviceMetricsOverride', {width: VW, height: VH, deviceScaleFactor: 3840 / VW, mobile: false});
  await s.send('Emulation.setFocusEmulationEnabled', {enabled: true}).catch(() => {});
  await page.bringToFront().catch(() => {});
  await page.waitForTimeout(800);
  await tidy(page);
  return s;
};
/** Hide account avatar, Upgrade/Gemini buttons, close the Tables side panel and tip pop-ups. */
export const tidy = async (page: Page) => {
  await page.addStyleTag({content: HIDE_CSS}).catch(() => {});
  await page.evaluate(`(() => {
    for (const e of document.querySelectorAll('div[role=button], button, span')) {
      const t = (e.textContent || '').trim();
      if (t === 'Upgrade' && e.getBoundingClientRect().y < 70) (e.closest('[role=button],button') || e).style.setProperty('display', 'none', 'important');
    }
  })()`);
  for (const sel of ['button:has-text("Got it")', 'div[role=button]:has-text("Got it")', '.building-blocks-sidebar .docs-sidebar-gm-close-button']) {
    const el = page.locator(sel).first();
    if (await el.isVisible().catch(() => false)) { await el.click().catch(() => {}); await page.waitForTimeout(500); }
  }
};
/** Go to a cell or range via the Name box (selects it). */
export const goto = async (page: Page, ref: string) => {
  await page.locator('#t-name-box').click(); await page.keyboard.press('Meta+A');
  await page.keyboard.type(ref); await page.keyboard.press('Enter'); await page.waitForTimeout(350);
};
/** Rect of the current selection (union of visible selection borders). */
export const selRect = async (page: Page): Promise<Rect | null> => page.evaluate(`(() => {
  const els = [...document.querySelectorAll('.active-cell-border, .range-border')].filter(e => !/clipboard|autofill/.test(e.className));
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, n = 0;
  for (const e of els) { const r = e.getBoundingClientRect(); if (r.width === 0 && r.height === 0) continue; if (getComputedStyle(e).display === 'none' || getComputedStyle(e).visibility === 'hidden') continue;
    x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); n++; }
  return n ? {x: x0, y: y0, w: x1 - x0, h: y1 - y0} : null;
})()`) as Promise<Rect | null>;
/** Measure several refs (moves the selection; restore afterwards with `goto`). */
export const measure = async (page: Page, refs: Record<string, string>) => {
  const out: Record<string, Rect | null> = {};
  for (const [k, ref] of Object.entries(refs)) { await goto(page, ref); out[k] = await selRect(page); }
  return out;
};
export const domRect = async (page: Page, expr: string): Promise<Rect | null> => page.evaluate(`(() => {
  const el = ${expr}; if (!el) return null; const r = el.getBoundingClientRect(); return {x: r.x, y: r.y, w: r.width, h: r.height};
})()`) as Promise<Rect | null>;
export const byTextExpr = (txt: string, within = '*') =>
  `[...document.querySelectorAll(${JSON.stringify(within)})].filter(e => e.offsetParent !== null && (e.textContent||'').trim() === ${JSON.stringify(txt)}).sort((a,b)=>a.textContent.length-b.textContent.length)[0]`;
/** Screenshot + write rects json (rects measured BEFORE the shot are passed in). */
export const snapSheet = async (page: Page, name: string, rects: Record<string, Rect | null> = {}, keepMouse = false) => {
  // hide the floating "Convert to table" suggestion chip (whole chip, not just its text)
  await page.evaluate(`(() => { for (const e of document.querySelectorAll('div,span')) { if ((e.textContent||'').trim() === 'Convert to table' && e.getBoundingClientRect().y > 150 && !e.closest('.goog-menu')) {
    let c = e, best = e; for (let i = 0; i < 12 && c; i++, c = c.parentElement) { const r = c.getBoundingClientRect(); if (r.width > 420 || r.height > 120) break; best = c; }
    best.style.setProperty('visibility', 'hidden', 'important'); } } })()`).catch(() => {});
  if (!keepMouse) {
    const modal = await page.evaluate(`[...document.querySelectorAll('.modal-dialog')].some(d => d.getBoundingClientRect().width > 0 && getComputedStyle(d).visibility !== 'hidden')`);
    if (!modal) await page.keyboard.press('Escape');
    await page.mouse.move(VW - 3, VH - 3);
  }
  await page.waitForTimeout(500);
  const cdp = await page.context().newCDPSession(page);
  const shotData = await cdp.send('Page.captureScreenshot', {format: 'png', captureBeyondViewport: false, clip: {x: 0, y: 0, width: VW, height: VH, scale: 1.5} /* window raster is 2x -> 3840x2160 */});
  fs.writeFileSync(`${OUT}/${name}.png`, Buffer.from(shotData.data, 'base64'));
  await cdp.detach();
  const scaled = Object.fromEntries(Object.entries(rects).map(([k, r]) => [k, r ? {x: r.x * SC, y: r.y * SC, w: r.w * SC, h: r.h * SC} : null]));
  fs.writeFileSync(`${OUT}/${name}.json`, JSON.stringify(scaled, null, 1));
  console.log('shot', name, Object.entries(rects).map(([k, v]) => k + (v ? '' : '(MISSING)')).join(', '));
};
/** Open a top menu (e.g. 'Data') and optionally hover/click a chain of items; returns rects of the opened items. */
export const menuItem = (label: string) =>
  `[...document.querySelectorAll('.goog-menuitem, .goog-menuitem-content, [role=menuitem], [role=menuitemcheckbox]')].filter(e => e.offsetParent !== null && (e.textContent||'').replace(/\\s+/g,' ').trim().startsWith(${JSON.stringify(label)})).map(e => e.closest('.goog-menuitem,[role=menuitem],[role=menuitemcheckbox]') || e)[0]`;
export const topMenu = (top: string) => `[...document.querySelectorAll('#docs-menubar > *')].find(e => e.textContent.trim() === ${JSON.stringify(top)})`;
export const clickMenu = async (page: Page, top: string) => {
  await page.locator('#docs-menubar > *').filter({hasText: new RegExp(`^${top}$`)}).first().click(); await page.waitForTimeout(600);
};
export const clickItem = async (page: Page, label: string, hover = false, last = false) => {
  const r = await domRect(page, last ? menuItem(label).replace(/\)\[0\]$/, ').slice(-1)[0]') : menuItem(label));
  if (!r) throw new Error('menu item not found: ' + label);
  await page.mouse.move(r.x + r.w / 2, r.y + r.h / 2); await page.waitForTimeout(500);
  if (!hover) { await page.mouse.click(r.x + r.w / 2, r.y + r.h / 2); await page.waitForTimeout(700); }
  return r;
};
/** Column header rect (letter strip) for column letter, from cell row-1 rect. */
export const headerRect = async (page: Page, colLetter: string): Promise<Rect | null> => {
  await goto(page, `${colLetter}1`); const r = await selRect(page); return r ? {x: r.x, y: r.y - 24, w: r.w, h: 24} : null;
};
/** Set a column width via right-click > Resize column. */
export const setWidth = async (page: Page, colLetter: string, px: number) => {
  const h = await headerRect(page, colLetter); if (!h) throw new Error('no header ' + colLetter);
  await page.mouse.click(h.x + h.w / 2, h.y + h.h / 2); await page.waitForTimeout(300);
  await page.mouse.click(h.x + h.w / 2, h.y + h.h / 2, {button: 'right'}); await page.waitForTimeout(700);
  await clickItem(page, 'Resize column');
  const inp = page.locator('.modal-dialog input[type=text], .modal-dialog input:not([type])').first();
  await inp.fill(String(px)); await page.keyboard.press('Enter'); await page.waitForTimeout(700);
};
/** Type a row of values starting at the current cell (Tab between, Enter at end). */
export const typeRow = async (page: Page, start: string, vals: string[], delay = 0) => {
  await goto(page, start);
  for (let i = 0; i < vals.length; i++) {
    if (vals[i] !== '') await page.keyboard.type(vals[i], {delay});
    await page.keyboard.press(i === vals.length - 1 ? 'Enter' : 'Tab');
  }
  await page.waitForTimeout(400);
};
/** File > Move to trash (for throwaway test docs). */
export const trashDoc = async (page: Page) => {
  await clickMenu(page, 'File'); await clickItem(page, 'Move to trash'); await page.waitForTimeout(1200);
  const ok = page.locator('[role=dialog] button, .modal-dialog button').filter({hasText: /Move to trash|OK/}).first();
  if (await ok.isVisible().catch(() => false)) await ok.click();
  await page.waitForTimeout(1500);
};
