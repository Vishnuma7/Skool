// V04 S4 part A: tour + Fix 1 (delete title rows), Fix 2 (unmerge + copy down), Fix 3 (find/replace + trim).
import fs from 'fs';
import {Page} from 'playwright-core';
import {connect} from './cdp';
import {prepSheets, snapSheet, domRect, goto, measure, selRect, clickMenu, clickItem, menuItem, topMenu, Rect} from './sheets';
export const rowHeader = async (p: Page, row: number): Promise<Rect> => { await goto(p, `A${row}`); const r = (await selRect(p))!; return {x: r.x - 46, y: r.y, w: 46, h: r.h}; };
export const colHeader = async (p: Page, col: string): Promise<Rect> => { await goto(p, `${col}1`); const r = (await selRect(p))!; return {x: r.x, y: r.y - 24, w: r.w, h: 24}; };
export const ctxClick = async (p: Page, r: Rect) => { await p.mouse.click(r.x + r.w / 2, r.y + r.h / 2, {button: 'right'}); await p.waitForTimeout(800); };
/** Select whole row(s), right-click inside the selection, and verify the name box before the caller picks a menu item. */
export const rowCtx = async (p: Page, rows: string) => {
  await goto(p, rows); const r = (await selRect(p))!;
  await p.mouse.click(r.x + 30, r.y + r.h / 2, {button: 'right'}); await p.waitForTimeout(900);
  const nb = await p.locator('#t-name-box').inputValue();
  if (nb !== rows) throw new Error(`context menu on wrong rows: ${nb} (wanted ${rows})`);
  return r;
};
if (process.argv[1]?.includes("v04_s4a")) (async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages().find((x) => x.url().includes(JSON.parse(fs.readFileSync('work/v04/docs.json', 'utf8')).messy))!;
    await prepSheets(p); await p.keyboard.press('Escape');
    // ---- the "crimes" tour: rects on the untouched sheet
    const crimes = await measure(p, {title: 'A1:H2', sup: 'C5:C14', q145: 'D5', q1850: 'D11', q18: 'D13', bl1002: 'A9', bl1002b: 'A8', blank: 'A12', dates: 'F5:F16',
      d1: 'F5', d2: 'F6', d3: 'F8', d4: 'F9', d5: 'F13', red1: 'D11', red2: 'D13', total: 'A17:H17', table: 'A1:H17'});
    await goto(p, 'A19');
    await snapSheet(p, 's4_messy', crimes);
    // ---- Fix 1
    const rows13 = await rowCtx(p, '1:3');
    const del = await domRect(p, menuItem('Delete rows 1 - 3'));
    await snapSheet(p, 's4_fix1_menu', {rows: rows13, del}, true);
    if (!del) throw new Error('no delete rows item');
    await p.mouse.click(del.x + del.w / 2, del.y + del.h / 2); await p.waitForTimeout(1000);
    await goto(p, 'A16');
    const h1 = await measure(p, {row1: 'A1:H1'}); await goto(p, 'A16');
    await snapSheet(p, 's4_fix1_done', h1);
    // ---- Fix 2
    await goto(p, 'C2:C13'); const ccol = await selRect(p);
    await clickMenu(p, 'Format'); const fm = await domRect(p, topMenu('Format'));
    const mc = await clickItem(p, 'Merge cells', true); await p.waitForTimeout(600);
    const un = await domRect(p, menuItem('Unmerge'));
    await snapSheet(p, 's4_fix2_menu', {format: fm, merge: mc, unmerge: un, c: ccol}, true);
    await clickItem(p, 'Unmerge', false, true); await p.waitForTimeout(800); await goto(p, 'A16');
    const blanks = await measure(p, {b1: 'C3:C4', b2: 'C6:C8', b3: 'C11', c: 'C2:C11'}); await goto(p, 'A16');
    await snapSheet(p, 's4_fix2_unmerged', blanks);
    await goto(p, 'C2:C4'); await p.keyboard.press('Meta+D'); await p.waitForTimeout(500); await goto(p, 'A16');
    await snapSheet(p, 's4_fix2_fill1', {f: (await measure(p, {f: 'C2:C4'})).f}); await goto(p, 'A16');
    await goto(p, 'C5:C8'); await p.keyboard.press('Meta+D'); await p.waitForTimeout(400);
    await goto(p, 'C10:C11'); await p.keyboard.press('Meta+D'); await p.waitForTimeout(400); await goto(p, 'A16');
    const filled = await measure(p, {c: 'C2:C11', f2: 'C5:C8', f3: 'C10:C11'}); await goto(p, 'A16');
    await snapSheet(p, 's4_fix2_done', filled);
    // ---- Fix 3: find & replace
    await goto(p, 'A:A'); const acol = await selRect(p);
    await clickMenu(p, 'Edit'); const fr = await clickItem(p, 'Find and replace', true);
    await snapSheet(p, 's4_fix3_menu', {edit: await domRect(p, topMenu('Edit')), fr, a: acol}, true);
    await clickItem(p, 'Find and replace'); await p.waitForTimeout(1200);
    const inputs = await p.evaluate(`[...document.querySelectorAll('.modal-dialog input[type=text], .modal-dialog input:not([type])')].filter(e=>e.offsetParent).map(e => { const r = e.getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height}; })`) as Rect[];
    console.log('F&R inputs', inputs.length);
    await p.mouse.click(inputs[0].x + 20, inputs[0].y + inputs[0].h / 2); await p.keyboard.type('BL ');
    await p.mouse.click(inputs[1].x + 20, inputs[1].y + inputs[1].h / 2); await p.keyboard.type('BL-');
    const rall = await domRect(p, `[...document.querySelectorAll('.modal-dialog [role=button], .modal-dialog button')].find(e => e.offsetParent && e.textContent.trim() === 'Replace all')`);
    await snapSheet(p, 's4_fix3_dialog', {find: inputs[0], repl: inputs[1], rall});
    await p.mouse.click(rall!.x + rall!.w / 2, rall!.y + rall!.h / 2); await p.waitForTimeout(1500);
    const msg = await p.evaluate(`[...document.querySelectorAll('.modal-dialog *')].filter(e=>e.offsetParent && e.children.length===0 && /Replaced|instance/.test(e.textContent)).map(e=>e.textContent.trim()).join(' / ')`);
    console.log('F&R message:', msg);
    const msgR = await domRect(p, `[...document.querySelectorAll('.modal-dialog *')].filter(e=>e.offsetParent && e.children.length===0 && /Replaced|instance/.test(e.textContent))[0]`);
    await snapSheet(p, 's4_fix3_replaced', {msg: msgR, a6: (await (async () => null)())});
    await p.keyboard.press('Escape'); await p.waitForTimeout(600);
    const done = p.locator('.modal-dialog [role=button], .modal-dialog button').filter({hasText: /^Done$/}).first(); if (await done.isVisible().catch(() => false)) await done.click();
    await goto(p, 'A16');
    const a6 = (await measure(p, {a6: 'A6'})).a6; await goto(p, 'A16');
    await snapSheet(p, 's4_fix3_done', {a6});
    // ---- trim whitespace
    await goto(p, 'A:A');
    await clickMenu(p, 'Data'); const dc = await clickItem(p, 'Data cleanup', true); await p.waitForTimeout(600);
    const tw = await domRect(p, menuItem('Trim whitespace'));
    await snapSheet(p, 's4_trim_menu', {data: await domRect(p, topMenu('Data')), cleanup: dc, trim: tw, a: acol}, true);
    await clickItem(p, 'Trim whitespace', false, true); await p.waitForTimeout(900);
    const toast = await p.evaluate(`[...document.querySelectorAll('div,span')].filter(e=>e.offsetParent && e.children.length===0 && /trimmed|whitespace/i.test(e.textContent) && e.getBoundingClientRect().y > 400).map(e=>e.textContent.trim()).join(' / ')`);
    console.log('trim toast:', toast);
    const toastR = await domRect(p, `[...document.querySelectorAll('div,span')].filter(e=>e.offsetParent && e.children.length===0 && /trimmed/i.test(e.textContent) && e.getBoundingClientRect().y > 400)[0]`);
    await snapSheet(p, 's4_trim_done', {toast: toastR, a6});
  } catch (e) { console.error('ERR', e); process.exit(1); } finally { process.exit(0); }
})();
