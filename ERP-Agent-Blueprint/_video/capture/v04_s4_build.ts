// V04 S4: build the messy "BrightLeaf Messy Export" sheet (pre-state; not shown being built).
import fs from 'fs';
import {Page} from 'playwright-core';
import {connect} from './cdp';
import {prepSheets, tidy, snapSheet, domRect, goto, setWidth, typeRow, clickMenu, clickItem} from './sheets';
export const fill = async (p: Page, color: string) => {
  await p.locator('#t-cell-color').click(); await p.waitForTimeout(700);
  const r = await domRect(p, `[...document.querySelectorAll('[aria-label]')].filter(e => e.offsetParent && e.getAttribute('aria-label') === ${JSON.stringify(color)})[0]`);
  if (!r) { console.log('palette labels:', await p.evaluate(`[...document.querySelectorAll('.docs-material-colorpalette-cell, [role=gridcell]')].filter(e=>e.offsetParent).map(e=>e.getAttribute('aria-label')).slice(0,80).join(',')`)); throw new Error('no color ' + color); }
  await p.mouse.click(r.x + r.w / 2, r.y + r.h / 2); await p.waitForTimeout(500);
};
const ROWS = [
  ['BL-1001', 'Steel Hex Bolts M10 (box of 100)', 'Apex Fasteners', '145 boxes', '80', "'16/11/2026", '$12.50', ''],
  ['BL-1009', 'Nylon Cable Ties 500pk', '', '410', '150', "'Nov 16", '6.3', ''],
  ['BL-1001', 'Steel Hex Bolts M10', '', '145 boxes', '80', "'16/11/2026", '$12.50', ''],
  ['BL-1002', 'Corrugated Box 18x12x10', 'PackRight Industries', '1,180 pcs', '1500', "'2026-11-16", '0.85', ''],
  ['BL 1002 ', 'Corrugated Shipping Box 18x12x10', '', '1180', '1,500', "'16-Nov-26", '0.85', ''],
  ['BL-1003', 'Stretch Wrap Film 500mm', '', '21 cartons (12 rolls each) + 8 loose', '200', "'15/11/2026", '9.2', ''],
  ['BL-1006', 'Packing Tape 48mm', '', 'approx 1,850', '1000', "'14/11/2026", '1.1', ''],
  ['', 'Industrial Safety Gloves (pair)', 'Safe Hands Co', '420 pairs', '600', "'16/11/2026", '2.4', ''],
  ['BL-1005', 'Pallet Jack Wheels (set)', 'Global Lift Parts, Shenzhen', '18 - urgent!!', '25', "'16.11.2026", 'USD 38', '3 jacks waiting'],
  ['BL-1010', 'Forklift Battery Water Kit', '', '26', '20', "'16/11/2026", '19.75', ''],
  ['BL-1007', 'Hydraulic Oil 20L', 'Gulf Lubricants', '31 (check w/ Tom)', '40', "'16/11/2026", '54', ''],
  ['BL-1008', 'LED Warehouse Light 150W', 'Shenzhen BrightTech', '34 nos', '30', "'13/11/2026", '72', ''],
];
if (process.argv[1]?.includes("v04_s4_build")) (async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages().find((x) => x.url().includes('docs.google.com'))!;
    await p.goto('https://sheets.new'); await p.waitForTimeout(7000); await prepSheets(p); await tidy(p);
    const id = p.url().split('/d/')[1].split('/')[0];
    const docs = JSON.parse(fs.readFileSync('work/v04/docs.json', 'utf8')); docs.messy = id; fs.writeFileSync('work/v04/docs.json', JSON.stringify(docs, null, 1));
    // autocomplete off (it "completes" the duplicate product name otherwise)
    await clickMenu(p, 'Tools'); await clickItem(p, 'Suggestion controls', true); await p.waitForTimeout(600);
    const on = await p.evaluate(`[...document.querySelectorAll('.goog-menuitem')].find(e => e.offsetParent && e.textContent.trim().startsWith('Enable autocomplete'))?.getAttribute('aria-checked')`);
    if (on === 'true') await clickItem(p, 'Enable autocomplete', false, true); else await p.keyboard.press('Escape');
    await p.locator('.docs-title-input').click(); await p.keyboard.press('Meta+A'); await p.keyboard.type('BrightLeaf Messy Export'); await p.keyboard.press('Enter'); await p.waitForTimeout(1500);
    for (const [c, w] of [['A', 78], ['B', 215], ['C', 172], ['D', 218], ['E', 88], ['F', 108], ['G', 66], ['H', 130]] as [string, number][]) await setWidth(p, c, w);
    await typeRow(p, 'A1', ['BRIGHTLEAF SUPPLIES – STOCK REPORT (Nov) – DO NOT EDIT!!']);
    await typeRow(p, 'A2', ['Prepared by Tom / updated by Sarah / numbers as of last count']);
    await typeRow(p, 'A4', ['Item Code', 'Product', 'Supplier', 'Qty', 'Reorder Lvl', 'Last Count Date', 'Cost', 'Remarks']);
    for (let i = 0; i < ROWS.length; i++) await typeRow(p, `A${i + 5}`, ROWS[i]);
    await typeRow(p, 'A17', ['TOTAL', '', '', 'lots', '', '', '', "see Tom's email"]);
    // title rows: merge + centre + bold/size
    for (const r of ['A1:H1', 'A2:H2']) { await goto(p, r); await clickMenu(p, 'Format'); await clickItem(p, 'Merge cells', true); await clickItem(p, 'Merge all', false, true); await p.keyboard.press('Meta+Shift+E'); }
    await goto(p, 'A1'); await p.keyboard.press('Meta+B'); for (let i = 0; i < 3; i++) { await p.keyboard.press('Meta+Shift+Period'); await p.waitForTimeout(200); }
    // supplier merges
    for (const r of ['C5:C7', 'C8:C11', 'C13:C14']) { await goto(p, r); await clickMenu(p, 'Format'); await clickItem(p, 'Merge cells', true); await clickItem(p, 'Merge all', false, true);
      const ok = p.locator('.modal-dialog button, [role=dialog] button').filter({hasText: 'OK'}).first(); if (await ok.isVisible().catch(() => false)) await ok.click(); await p.waitForTimeout(400); }
    await goto(p, 'C5:C16'); await p.keyboard.press('Meta+Shift+E'); // centre (looks "tidy")
    await clickMenu(p, 'Format'); await clickItem(p, 'Alignment', true); await clickItem(p, 'Middle', false, true);
    await goto(p, 'A4:H4'); await p.keyboard.press('Meta+B'); await fill(p, 'light gray 2');
    await goto(p, 'D11'); await fill(p, 'light red 3'); await goto(p, 'D13'); await fill(p, 'light red 3');
    await goto(p, 'A17:H17'); await p.keyboard.press('Meta+B');
    await goto(p, 'A19');
    await snapSheet(p, 's4_built', {});
    console.log('messy doc', id);
  } catch (e) { console.error('ERR', e); process.exit(1); } finally { process.exit(0); }
})();
