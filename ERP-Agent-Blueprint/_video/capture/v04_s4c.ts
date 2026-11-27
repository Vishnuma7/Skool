// V04 S4 part C: finish Fix 7 (reset red in D and the copied red in E), delete TOTAL row, final state.
import fs from 'fs';
import {connect} from './cdp';
import {prepSheets, snapSheet, domRect, goto, measure, selRect, menuItem} from './sheets';
const RESET = `[...document.querySelectorAll('div,span')].filter(e => e.getBoundingClientRect().width > 0 && (e.textContent||'').trim() === 'Reset').sort((a, b) => a.getBoundingClientRect().width * a.getBoundingClientRect().height - b.getBoundingClientRect().width * b.getBoundingClientRect().height)[0]`;
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages().find((x) => x.url().includes(JSON.parse(fs.readFileSync('work/v04/docs.json', 'utf8')).messy))!;
    await prepSheets(p); await p.keyboard.press('Escape');
    await p.keyboard.press('Escape'); await p.keyboard.press('Escape'); await p.waitForTimeout(500);
    const fs2 = JSON.parse(fs.readFileSync('public/cap04/s4_fix7_reset.json', 'utf8'));
    const SC = 1.5; const i6 = fs2.i6; const rowH = (fs2.d8.y - fs2.d6.y) / 2 / SC;
    const tot = {x: 46, y: fs2.d6.y / SC + rowH * 6, w: (i6.x + i6.w) / SC - 46, h: rowH};
    await p.mouse.click(tot.x + 25, tot.y + tot.h / 2); await p.waitForTimeout(600);
    let fb = await p.locator('#t-formula-bar-input').textContent(); console.log('cell text:', fb);
    if (!/TOTAL/.test(fb || '')) throw new Error('not on TOTAL: ' + fb);
    await p.keyboard.press('Shift+Space'); await p.waitForTimeout(600);
    await p.mouse.click(tot.x + 25, tot.y + tot.h / 2, {button: 'right'}); await p.waitForTimeout(1000);
    const del = await domRect(p, menuItem('Delete row')); if (!del) throw new Error('no Delete row');
    await snapSheet(p, 's4_total_ctx', {tot, del}, true);
    await p.mouse.click(del.x + del.w / 2, del.y + del.h / 2); await p.waitForTimeout(1000); await goto(p, 'A14');
    const fin = await measure(p, {table: 'A1:I11', r6: 'A6:I6', r10: 'A10:I10'}); await goto(p, 'A14');
    await snapSheet(p, 's4_final', fin);
  } catch (e) { console.error('ERR', e); process.exit(1); } finally { process.exit(0); }
})();
