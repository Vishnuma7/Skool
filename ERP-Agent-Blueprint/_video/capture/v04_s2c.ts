// V04 S2 part C: dropdown validation (country, currency) + checkboxes.
import fs from 'fs';
import {Page} from 'playwright-core';
import {connect} from './cdp';
import {prepSheets, snapSheet, goto, selRect, measure, clickMenu, clickItem, domRect, menuItem, topMenu, Rect} from './sheets';
const q = (label: string, nth = 0) => `[...document.querySelectorAll('[aria-label=${JSON.stringify(label)}]')].filter(e => e.offsetParent)[${nth}]`;
const txt = (t: string) => `[...document.querySelectorAll('div,span')].filter(e => e.offsetParent && e.children.length === 0 && (e.textContent||'').trim() === ${JSON.stringify(t)}).map(e => e.closest('[role=button],.docs-material-button-fill-primary,.docs-material-button-hairline-primary,.jfk-button') || e)[0]`;
const CLOSE = `[...document.querySelectorAll('.docs-sidebar-gm-close-button')].filter(e => e.offsetParent && e.getBoundingClientRect().width > 0)[0]`;
const click = async (p: Page, expr: string) => { const r = await domRect(p, expr); if (!r) throw new Error('missing ' + expr); await p.mouse.click(r.x + r.w / 2, r.y + r.h / 2); await p.waitForTimeout(800); return r; };
const setOptions = async (p: Page, vals: string[]) => {
  for (const pass of [vals.map((_, i) => `tmp${i}`), vals]) for (let i = 0; i < vals.length; i++) {
    const v = pass[i];
    const r = await domRect(p, q('Value', i)); if (!r) throw new Error('no option input ' + i);
    await p.mouse.click(r.x + r.w / 2, r.y + r.h / 2); await p.keyboard.press('Meta+A'); await p.keyboard.type(v, {delay: 30}); await p.waitForTimeout(200);
  }
  await p.mouse.click(1100, 700); await p.waitForTimeout(4500); // let any toast clear
};
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages().find((x) => x.url().includes(JSON.parse(fs.readFileSync('work/v04/docs.json', 'utf8')).stocky))!;
    await prepSheets(p);
    // reset any half-made rule
    if (process.argv.includes('--reset')) {
      await goto(p, 'A1'); await clickMenu(p, 'Data'); await clickItem(p, 'Data validation'); await p.waitForTimeout(1500);
      const ra = await domRect(p, txt('Remove all')); if (ra) await click(p, txt('Remove all'));
      await goto(p, 'I2'); for (let i = 0; i < 6; i++) { await p.keyboard.type('TRUE'); await p.keyboard.press('Enter'); }
      await p.waitForTimeout(800);
    }
    const cl = await domRect(p, CLOSE); if (cl) await click(p, CLOSE);
    // ---- country
    await goto(p, 'D2:D100'); const dsel = await selRect(p);
    await snapSheet(p, 's2_sel_d', {d: dsel});
    await clickMenu(p, 'Data'); const dataTop = await domRect(p, topMenu('Data'));
    const dvItem = await clickItem(p, 'Data validation', true);
    await snapSheet(p, 's2_data_menu', {data: dataTop, dv: dvItem, d: dsel}, true);
    await clickItem(p, 'Data validation'); await p.waitForTimeout(1500);
    await snapSheet(p, 's2_dv_side', {add: await domRect(p, txt('Add rule')), d: dsel});
    await click(p, txt('Add rule')); await p.waitForTimeout(1500);
    const crit = await domRect(p, q('Criteria'));
    await snapSheet(p, 's2_dv_rule', {range: await domRect(p, `document.querySelector('.waffle-range-selection-input')`), criteria: crit});
    await click(p, q('Criteria')); await p.waitForTimeout(700);
    const ddItem = await domRect(p, menuItem('Dropdown'));
    await snapSheet(p, 's2_dv_criteria', {criteria: crit, dropdown: ddItem}, true);
    await click(p, menuItem('Dropdown')); await p.waitForTimeout(800);
    await setOptions(p, ['US', 'MX', 'CN', 'AE']);
    const opts = {o1: await domRect(p, q('Value', 0)), o4: await domRect(p, q('Value', 3)), done: await domRect(p, txt('Done'))};
    const optAll = opts.o1 && opts.o4 ? {x: opts.o1.x - 90, y: opts.o1.y - 6, w: opts.o1.w + 100, h: opts.o4.y + opts.o4.h - opts.o1.y + 12} as Rect : null;
    await snapSheet(p, 's2_dv_options', {...opts, options: optAll});
    await click(p, txt('Done')); await p.waitForTimeout(1200);
    await click(p, CLOSE); await p.waitForTimeout(800);
    await goto(p, 'A9');
    const m = await measure(p, {d2: 'D2', d: 'D2:D7', e: 'E2:E7', i: 'I2:I7', i6: 'I6', r6: 'A6:I6'}); await goto(p, 'A9');
    await snapSheet(p, 's2_dv_done', m);
    // open D2 dropdown
    await goto(p, 'D2'); const d2 = (await selRect(p))!;
    await p.mouse.click(d2.x + d2.w - 18, d2.y + d2.h / 2); await p.waitForTimeout(900);
    await snapSheet(p, 's2_dd_open', {d2}, true);
    await p.keyboard.press('Escape'); await p.waitForTimeout(500);
    // ---- currency (fast repeat)
    await goto(p, 'E2:E100'); await clickMenu(p, 'Data'); await clickItem(p, 'Data validation'); await p.waitForTimeout(1300);
    await click(p, txt('Add rule')); await p.waitForTimeout(1300);
    await setOptions(p, ['USD', 'MXN', 'CNY', 'AED']);
    await snapSheet(p, 's2_cur_options', {options: await domRect(p, q('Value', 0)), e: m.e});
    await click(p, txt('Done')); await p.waitForTimeout(1200);
    await click(p, CLOSE); await p.waitForTimeout(800);
    await goto(p, 'A9');
    await snapSheet(p, 's2_cur_done', m);
    // ---- checkboxes
    await goto(p, 'I2:I7'); const isel = await selRect(p);
    await snapSheet(p, 's2_sel_i', {i: isel});
    await clickMenu(p, 'Insert'); const ins = await domRect(p, topMenu('Insert'));
    const cb = await clickItem(p, 'Checkbox', true);
    await snapSheet(p, 's2_insert_menu', {insert: ins, checkbox: cb, i: isel}, true);
    await clickItem(p, 'Checkbox'); await p.waitForTimeout(1000);
    await goto(p, 'A9');
    await snapSheet(p, 's2_checks', m);
    const i6 = m.i6!; await p.mouse.click(i6.x + i6.w / 2, i6.y + i6.h / 2); await p.waitForTimeout(800); await goto(p, 'A9');
    await snapSheet(p, 's2_untick', m);
    await p.mouse.click(i6.x + i6.w / 2, i6.y + i6.h / 2); await p.waitForTimeout(800); await goto(p, 'A9');
    await snapSheet(p, 's2_retick', m);
  } catch (e) { console.error('ERR', e); } finally { process.exit(0); }
})();
