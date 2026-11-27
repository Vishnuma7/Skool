// V04 S2 part A: rename tab, column widths, headers, bold, freeze.
import fs from 'fs';
import {connect} from './cdp';
import {prepSheets, snapSheet, domRect, goto, measure, selRect, setWidth, typeRow, clickMenu, clickItem, menuItem, topMenu, tidy, headerRect} from './sheets';
const H = ['Supplier_ID', 'Supplier_Name', 'City', 'Country_Code', 'Currency', 'Latitude', 'Longitude', 'Contact_Email', 'Active'];
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages().find((x) => x.url().includes(JSON.parse(fs.readFileSync('work/v04/docs.json', 'utf8')).stocky))!;
    await prepSheets(p);
    // invisible prep: widths + number format for lat/long
    const W: [string, number][] = [['A', 105], ['B', 180], ['C', 100], ['D', 112], ['E', 82], ['F', 82], ['G', 92], ['H', 228], ['I', 70]];
    for (const [c, w] of W) await setWidth(p, c, w);
    await goto(p, 'F2:G100'); await clickMenu(p, 'Format'); await clickItem(p, 'Number', true); await clickItem(p, 'Number'); await p.waitForTimeout(500);
    await goto(p, 'A1');
    const tab = () => domRect(p, `document.querySelector('.docs-sheet-active-tab, .docs-sheet-tab')`);
    await snapSheet(p, 's2_start', {tab: await tab()});
    const t = await tab(); await p.mouse.dblclick(t!.x + t!.w / 2 - 10, t!.y + t!.h / 2); await p.waitForTimeout(700);
    await snapSheet(p, 's2_tab_edit', {tab: await tab()});
    await p.keyboard.press('Meta+A'); await p.keyboard.type('Suppliers', {delay: 30}); await p.keyboard.press('Enter'); await p.waitForTimeout(800);
    await goto(p, 'A1');
    await snapSheet(p, 's2_tab_named', {tab: await tab()});
    await typeRow(p, 'A1', H.slice(0, 4)); await goto(p, 'E1');
    await snapSheet(p, 's2_head_half', {});
    await typeRow(p, 'E1', H.slice(4)); await goto(p, 'A2');
    const m1 = await measure(p, {row1: 'A1:I1', a1: 'A1', table: 'A1:I1'}); await goto(p, 'A2');
    await snapSheet(p, 's2_headers', {...m1});
    // bold + freeze
    await goto(p, '1:1'); const rowHead = await selRect(p);
    await snapSheet(p, 's2_row_sel', {row1: rowHead, bold: await domRect(p, `document.querySelector('#boldButton, [aria-label^="Bold"]')`)});
    await p.keyboard.press('Meta+B'); await p.waitForTimeout(500);
    await snapSheet(p, 's2_bold', {row1: rowHead, bold: await domRect(p, `document.querySelector('#boldButton, [aria-label^="Bold"]')`)});
    await clickMenu(p, 'View'); const view = await domRect(p, topMenu('View'));
    const fr = await clickItem(p, 'Freeze', true); await p.waitForTimeout(700);
    const one = await domRect(p, menuItem('1 row'));
    await snapSheet(p, 's2_view_freeze', {view, freeze: fr, oneRow: one}, true);
    await clickItem(p, '1 row'); await p.waitForTimeout(800);
    await goto(p, 'A45'); await p.waitForTimeout(600);
    await snapSheet(p, 's2_frozen_scrolled', {row1: rowHead});
    await goto(p, 'A2'); await p.waitForTimeout(600);
    await snapSheet(p, 's2_frozen', {row1: rowHead});
  } catch (e) { console.error("ERR", e); } finally { process.exit(0); }
})();
