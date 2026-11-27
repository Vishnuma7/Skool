// V04 S3 part A: Stock_Log tab, headers, bold+freeze, three log rows.
import fs from 'fs';
import {connect} from './cdp';
import {prepSheets, snapSheet, domRect, goto, measure, selRect, setWidth, typeRow, clickMenu, clickItem, menuItem, topMenu} from './sheets';
const H = ['Log_ID', 'Log_Date', 'SKU', 'Qty_On_Hand', 'Unit', 'Reorder_Point', 'Status', 'Supplier_ID', 'Logged_By', 'Note'];
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages().find((x) => x.url().includes(JSON.parse(fs.readFileSync('work/v04/docs.json', 'utf8')).stocky))!;
    await prepSheets(p);
    await goto(p, 'A9');
    const add = await domRect(p, `document.querySelector('.docs-sheet-add-button')`);
    await snapSheet(p, 's3_start', {add});
    await p.mouse.click(add!.x + add!.w / 2, add!.y + add!.h / 2); await p.waitForTimeout(1500);
    const tab = () => domRect(p, `document.querySelector('.docs-sheet-active-tab')`);
    await snapSheet(p, 's3_new_tab', {tab: await tab(), add});
    const t = (await tab())!; await p.mouse.dblclick(t.x + t.w / 2 - 10, t.y + t.h / 2); await p.waitForTimeout(700);
    await p.keyboard.press('Meta+A'); await p.keyboard.type('Stock_Log', {delay: 30}); await p.keyboard.press('Enter'); await p.waitForTimeout(800);
    const W: [string, number][] = [['A', 88], ['B', 92], ['C', 78], ['D', 100], ['E', 56], ['F', 106], ['G', 84], ['H', 92], ['I', 84], ['J', 226], ['K', 158]];
    for (const [c, w] of W) await setWidth(p, c, w);
    await goto(p, 'A1');
    await snapSheet(p, 's3_tab_named', {tab: await tab()});
    await typeRow(p, 'A1', H); await goto(p, '1:1'); await p.keyboard.press('Meta+B'); await p.waitForTimeout(400);
    await clickMenu(p, 'View'); const fr = await clickItem(p, 'Freeze', true); await p.waitForTimeout(600);
    await snapSheet(p, 's3_view_freeze', {freeze: fr, oneRow: await domRect(p, menuItem('1 row')), view: await domRect(p, topMenu('View'))}, true);
    await clickItem(p, '1 row'); await p.waitForTimeout(800); await goto(p, 'A2');
    const hr = await measure(p, {row1: 'A1:J1'}); await goto(p, 'A2');
    await snapSheet(p, 's3_headers', hr);
    await typeRow(p, 'A2', ['LOG-0001', '2026-11-16', 'BL-1005', '18', 'set', '25']); await goto(p, 'H2');
    await snapSheet(p, 's3_row2_half', {});
    await typeRow(p, 'H2', ['SUP-004', 'Sarah', '3 pallet jacks waiting for wheels']); await goto(p, 'A3');
    const m2 = await measure(p, {j2: 'J2', d2: 'D2', e2: 'E2', r2: 'A2:J2'}); await goto(p, 'A3');
    await snapSheet(p, 's3_row2', m2);
    await typeRow(p, 'A3', ['LOG-0002', '2026-11-16', 'BL-1002', '1180', 'each', '1500', '', 'SUP-002', 'Sarah', '']);
    await typeRow(p, 'A4', ['LOG-0003', '2026-11-16', 'BL-1001', '145', 'box', '80', '', 'SUP-001', 'Sarah', '']);
    const m = await measure(p, {d2: 'D2', e2: 'E2', j2: 'J2', b: 'B2:B4', bcol: 'B1:B4', d: 'D2:D4', a: 'A2:A4', i: 'I2:I4', g2: 'G2', f2: 'F2', g: 'G2:G4', h: 'H2:H4', k1: 'K1', k2: 'K2', k: 'K2:K4', r3: 'A3:J3', r4: 'A4:J4', table: 'A1:J4'});
    fs.writeFileSync('work/v04/s3_rects.json', JSON.stringify(m));
    await goto(p, 'A6');
    await snapSheet(p, 's3_rows', m);
  } catch (e) { console.error('ERR', e); } finally { process.exit(0); }
})();
