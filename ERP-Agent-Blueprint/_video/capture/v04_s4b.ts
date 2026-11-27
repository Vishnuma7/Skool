// V04 S4 part B: Fix 4 (duplicates), Fix 5 (unit column), Fix 6 (blank ID), Fix 7 (colours + TOTAL).
import fs from 'fs';
import {Page} from 'playwright-core';
import {connect} from './cdp';
import {setWidth, prepSheets, snapSheet, domRect, goto, measure, selRect, clickMenu, clickItem, menuItem, topMenu, Rect} from './sheets';
import {colHeader, ctxClick, rowCtx} from './v04_s4a';
const dlgBtn = (t: string) => `[...document.querySelectorAll('.modal-dialog [role=button], .modal-dialog button')].find(e => e.getBoundingClientRect().width > 0 && e.textContent.trim() === ${JSON.stringify(t)})`;
const chk = (label: string) => `[...document.querySelectorAll('.modal-dialog .docs-material-gm-labeled-checkbox')].filter(e => e.getBoundingClientRect().width > 0 && (e.textContent||'').trim().startsWith(${JSON.stringify(label)})).map(e => e.querySelector('[role=checkbox]'))[0]`;
const click = async (p: Page, expr: string) => { const r = await domRect(p, expr); if (!r) throw new Error('missing ' + expr); await p.mouse.click(r.x + r.w / 2, r.y + r.h / 2); await p.waitForTimeout(600); return r; };
const set = async (p: Page, ref: string, v: string) => { await goto(p, ref); await p.keyboard.type(v); await p.keyboard.press('Enter'); await p.waitForTimeout(250); };
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages().find((x) => x.url().includes(JSON.parse(fs.readFileSync('work/v04/docs.json', 'utf8')).messy))!;
    await prepSheets(p);
    for (const t of ['OK', 'Cancel']) { const r = await domRect(p, dlgBtn(t)); if (r) await click(p, dlgBtn(t)); }
    const x = await domRect(p, `[...document.querySelectorAll('.modal-dialog-title-close')].find(e => e.offsetParent)`); if (x) await click(p, `[...document.querySelectorAll('.modal-dialog-title-close')].find(e => e.offsetParent)`);
    // ---- Fix 4
    await goto(p, 'A1:H14'); const all = await selRect(p);
    await clickMenu(p, 'Data'); const dc = await clickItem(p, 'Data cleanup', true); await p.waitForTimeout(600);
    const rd = await domRect(p, menuItem('Remove duplicates'));
    await snapSheet(p, 's4_dup_menu', {data: await domRect(p, topMenu('Data')), cleanup: dc, rd, all}, true);
    await p.keyboard.press('Escape'); await p.keyboard.press('Escape'); await p.waitForTimeout(400);
    await clickMenu(p, 'Data'); await clickItem(p, 'Data cleanup', true); await p.waitForTimeout(700);
    await clickItem(p, 'Remove duplicates', false, true);
    for (let i = 0; i < 30; i++) {
      const n = await p.evaluate(`[...document.querySelectorAll('.modal-dialog .docs-material-gm-labeled-checkbox')].filter(e => e.getBoundingClientRect().width > 0).length`) as number;
      if (n > 0) break; if (i === 29) throw new Error('dedupe dialog never appeared'); await p.waitForTimeout(500);
    }
    await p.waitForTimeout(800);
    await click(p, chk('Data has header row')); await click(p, chk('Select all')); await p.waitForTimeout(400);
    await click(p, chk('Column A')); await click(p, chk('Column F'));
    const btn = await domRect(p, dlgBtn('Remove duplicates'));
    await snapSheet(p, 's4_dup_dialog', {header: await domRect(p, chk('Data has header row')), colA: await domRect(p, chk('Column A')), colF: await domRect(p, chk('Column F')), btn});
    await click(p, dlgBtn('Remove duplicates')); await p.waitForTimeout(1800);
    const res = await p.evaluate(`[...document.querySelectorAll('.modal-dialog *')].filter(e=>e.offsetParent && e.children.length===0 && /duplicate|unique/i.test(e.textContent)).map(e=>e.textContent.trim()).join(' / ')`);
    console.log('dup result:', res);
    await snapSheet(p, 's4_dup_result', {msg: await domRect(p, `[...document.querySelectorAll('.modal-dialog')].filter(e => e.getBoundingClientRect().width > 0 && /unique/i.test(e.textContent))[0]`)});
    const ok = await domRect(p, dlgBtn('OK')); if (ok) await click(p, dlgBtn('OK'));
    await goto(p, 'A16');
    const pair = await measure(p, {r4: 'A4:H4', r5: 'A5:H5', f4: 'F4', f5: 'F5', a2: 'A2:H2'}); await goto(p, 'A16');
    await snapSheet(p, 's4_dup_done', pair);
    await rowCtx(p, '5:5');
    const delRow = await domRect(p, menuItem('Delete row'));
    await snapSheet(p, 's4_dup_ctx', {...pair, del: delRow}, true);
    await click(p, menuItem('Delete row')); await p.waitForTimeout(900); await goto(p, 'A16');
    const a5 = await p.evaluate(`document.querySelector('#t-formula-bar-input')?.textContent`);
    await goto(p, 'F5'); const f5 = await p.locator('#t-formula-bar-input').textContent(); console.log('row5 date after delete:', f5); if (!/15\/11/.test(f5 || '')) throw new Error('unexpected row 5 after delete: ' + f5);
    await goto(p, 'A16');
    await snapSheet(p, 's4_dup_deleted', {r4: pair.r4});
    // ---- Fix 5
    const hD = await colHeader(p, 'D'); await goto(p, 'D:D'); await ctxClick(p, hD);
    const ins = await domRect(p, menuItem('Insert 1 column right'));
    await snapSheet(p, 's4_ins_ctx', {d: hD, ins}, true);
    await click(p, menuItem('Insert 1 column right')); await p.waitForTimeout(900);
    await setWidth(p, 'E', 70); await set(p, 'E1', 'Unit'); await goto(p, 'A16');
    const U = await measure(p, {e1: 'E1', e: 'E1:E11', d: 'D2:D11'}); await goto(p, 'A16');
    await snapSheet(p, 's4_unit_col', U);
    const Q: [number, string, string, string?][] = [[2, '145', 'box'], [3, '410', 'pack'], [4, '1180', 'each'], [5, '260', 'roll'], [6, '1850', 'roll', 'estimate, recount'],
      [7, '420', 'pair'], [8, '18', 'set'], [9, '26', 'kit'], [10, '31', 'drum', 'check w/ Tom'], [11, '34', 'each']];
    const qr = await measure(p, {q2: 'D2:E2', q5: 'D5:E5', q6: 'D6:E6', i6: 'I6', q8: 'D8:E8', q10: 'D10:E10', i10: 'I10', de: 'D2:E11', r5: 'A5:I5'});
    for (const [r, n, u, rem] of Q) {
      await set(p, `D${r}`, n); await set(p, `E${r}`, u); if (rem) await set(p, `I${r}`, rem);
      if (r === 2 || r === 5 || r === 6 || r === 8) { await goto(p, 'A16'); await snapSheet(p, `s4_q${r}`, qr); }
    }
    await goto(p, 'A16'); await snapSheet(p, 's4_q_all', qr);
    // ---- Fix 6
    const a7 = (await measure(p, {a7: 'A7'})).a7; const r7 = (await measure(p, {r7: 'A7:I7'})).r7;
    await goto(p, 'A7'); await snapSheet(p, 's4_fix6_before', {a7, r7});
    await p.keyboard.type('BL-1004'); await p.keyboard.press('Enter'); await p.waitForTimeout(500); await goto(p, 'A16');
    await snapSheet(p, 's4_fix6_done', {a7, r7});
    // ---- Fix 7
    await set(p, 'I6', 'estimate, recount; urgent per Tom'); await set(p, 'I8', '3 jacks waiting; urgent per Tom'); await goto(p, 'A16');
    const f7 = await measure(p, {i6: 'I6', i8: 'I8', d6: 'D6:E6', d8: 'D8:E8', red: 'D6:E8'}); await goto(p, 'A16');
    await snapSheet(p, 's4_fix7_remarks', f7);
    const RESET = `[...document.querySelectorAll('div,span')].filter(e => e.getBoundingClientRect().width > 0 && (e.textContent||'').trim() === 'Reset').sort((a, b) => a.getBoundingClientRect().width * a.getBoundingClientRect().height - b.getBoundingClientRect().width * b.getBoundingClientRect().height)[0]`;
    const red = await measure(p, {red: 'D6:E8', d6: 'D6:E6', d8: 'D8:E8'});
    await goto(p, 'D6:E8'); await p.locator('#t-cell-color').click(); await p.waitForTimeout(800);
    const reset = await domRect(p, RESET);
    await snapSheet(p, 's4_fill_menu', {fill: await domRect(p, `document.querySelector('#t-cell-color')`), reset, d6: red.red}, true);
    await p.mouse.click(reset!.x + reset!.w / 2, reset!.y + reset!.h / 2); await p.waitForTimeout(700); await goto(p, 'A16');
    await snapSheet(p, 's4_fix7_reset', {...f7, ...red});
  } catch (e) { console.error('ERR', e); process.exit(1); } finally { process.exit(0); }
})();
