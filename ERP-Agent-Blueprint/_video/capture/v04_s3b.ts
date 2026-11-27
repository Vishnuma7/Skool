// V04 S3 part B: date format, IF formula, ghost text demo, XLOOKUP, rename demo.
import fs from 'fs';
import {Page} from 'playwright-core';
import {connect} from './cdp';
import {prepSheets, snapSheet, domRect, goto, measure, selRect, clickMenu, clickItem, menuItem, topMenu} from './sheets';
const click = async (p: Page, expr: string) => { const r = await domRect(p, expr); if (!r) throw new Error('missing ' + expr); await p.mouse.click(r.x + r.w / 2, r.y + r.h / 2); await p.waitForTimeout(700); return r; };
const tabByName = (n: string) => `[...document.querySelectorAll('.docs-sheet-tab')].find(e => e.textContent.includes(${JSON.stringify(n)}))`;
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages().find((x) => x.url().includes(JSON.parse(fs.readFileSync('work/v04/docs.json', 'utf8')).stocky))!;
    await prepSheets(p);
    await p.keyboard.press('Escape'); await p.waitForTimeout(500);
    const M = JSON.parse(fs.readFileSync('work/v04/s3_rects.json', 'utf8'));
    // ---- date format
    await goto(p, 'B:B'); const bsel = await selRect(p);
    await snapSheet(p, 's3_sel_b', {b: bsel});
    await clickMenu(p, 'Format'); const fm = await domRect(p, topMenu('Format'));
    const num = await clickItem(p, 'Number', true); await p.waitForTimeout(600);
    const cdt = await clickItem(p, 'Custom date and time', true);
    await snapSheet(p, 's3_number_menu', {format: fm, number: num, custom: cdt}, true);
    await clickItem(p, 'Custom date and time'); await p.waitForTimeout(1500);
    const iso = `[...document.querySelectorAll('.nfd-format-display')].find(e => e.textContent.trim() === '1930-08-05')`;
    const isoRow = await domRect(p, `(${iso}).parentElement`);
    const apply = await domRect(p, `[...document.querySelectorAll('.modal-dialog .jfk-button')].find(e => e.textContent.trim() === 'Apply')`);
    await click(p, iso); await p.waitForTimeout(500);
    await snapSheet(p, 's3_date_dialog', {iso: isoRow, apply});
    await click(p, `[...document.querySelectorAll('.modal-dialog .jfk-button')].find(e => e.textContent.trim() === 'Apply')`); await p.waitForTimeout(1000);
    await goto(p, 'A6');
    await snapSheet(p, 's3_date_applied', {b: M.b});
    // ---- IF formula
    await goto(p, 'G2'); await p.keyboard.type('=IF(D2<=F2,"REORDER","OK")', {delay: 25}); await p.waitForTimeout(900);
    await snapSheet(p, 's3_if_typing', {g2: M.g2, d2: M.d2, f2: M.f2, fbar: await domRect(p, `document.querySelector('#t-formula-bar-input')`)});
    await p.keyboard.press('Enter'); await p.waitForTimeout(800); await goto(p, 'A6');
    await snapSheet(p, 's3_if_done', {g2: M.g2, d2: M.d2, f2: M.f2});
    await goto(p, 'G2:G4'); await p.keyboard.press('Meta+D'); await p.waitForTimeout(900); await goto(p, 'A6');
    await snapSheet(p, 's3_if_filled', {g: M.g, r3: M.r3, r4: M.r4});
    // ---- ghost: "18 sets" breaks the formula (real result), then restore
    await goto(p, 'D2'); await p.keyboard.type('18 sets'); await p.keyboard.press('Enter'); await p.waitForTimeout(900); await goto(p, 'A6');
    await snapSheet(p, 's3_ghost_text', {d2: M.d2, g2: M.g2});
    console.log('G2 with text =', await p.evaluate(`document.querySelector('#t-formula-bar-input')?.textContent`));
    await goto(p, 'D2'); await p.keyboard.type('18'); await p.keyboard.press('Enter'); await p.waitForTimeout(800);
    // ---- XLOOKUP
    await goto(p, 'K1'); await p.keyboard.type('Supplier_Name'); await p.keyboard.press('Enter'); await goto(p, 'K1'); await p.keyboard.press('Meta+B');
    await goto(p, 'K2'); await p.keyboard.type('=XLOOKUP(H2,Suppliers!A:A,Suppliers!B:B)', {delay: 20}); await p.waitForTimeout(900);
    await snapSheet(p, 's3_xl_typing', {k2: M.k2, h2: M.h, fbar: await domRect(p, `document.querySelector('#t-formula-bar-input')`)});
    await p.keyboard.press('Enter'); await p.waitForTimeout(1200); await goto(p, 'A6');
    await snapSheet(p, 's3_xl_done', {k2: M.k2, k1: M.k1});
    await goto(p, 'K2:K4'); await p.keyboard.press('Meta+D'); await p.waitForTimeout(1200); await goto(p, 'A6');
    await snapSheet(p, 's3_xl_filled', {k: M.k, h: M.h, k1: M.k1});
    // ---- relationship demo: rename PackRight in Suppliers, see Stock_Log update, revert
    await click(p, tabByName('Suppliers')); await p.waitForTimeout(1200);
    await goto(p, 'B3'); const b3 = await selRect(p);
    await p.keyboard.type('PackRight Industries Inc.'); await p.keyboard.press('Enter'); await p.waitForTimeout(800); await goto(p, 'A9');
    await snapSheet(p, 's3_sup_renamed', {b3});
    await click(p, tabByName('Stock_Log')); await p.waitForTimeout(1500); await goto(p, 'A6');
    const k3 = (await measure(p, {k3: 'K3'})).k3; await goto(p, 'A6');
    await snapSheet(p, 's3_log_renamed', {k3, k: M.k, h: M.h});
    await click(p, tabByName('Suppliers')); await p.waitForTimeout(1200);
    await goto(p, 'B3'); await p.keyboard.type('PackRight Industries'); await p.keyboard.press('Enter'); await p.waitForTimeout(800); await goto(p, 'A9');
    await snapSheet(p, 's3_sup_view', {b3, ab: (await measure(p, {ab: 'A1:B7'})).ab});
    await goto(p, 'A9');
    await click(p, tabByName('Stock_Log')); await p.waitForTimeout(1500); await goto(p, 'A6');
    await snapSheet(p, 's3_final', {k: M.k, h: M.h});
  } catch (e) { console.error('ERR', e); } finally { process.exit(0); }
})();
