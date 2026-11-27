// V04 S1 (Sheets part): sheets.new, rename. Saves doc id to work/v04/docs.json
import fs from 'fs';
import {connect} from './cdp';
import {prepSheets, snapSheet, domRect, tidy} from './sheets';
(async () => {
  const b = await connect();
  try {
    const s = b.contexts()[0].pages().find((x) => x.url().includes('docs.google.com'))!;
    await s.goto('https://sheets.new'); await s.waitForTimeout(7000); await prepSheets(s); await tidy(s); await s.waitForTimeout(800);
    const id = s.url().split('/d/')[1].split('/')[0];
    fs.writeFileSync('work/v04/docs.json', JSON.stringify({stocky: id}, null, 1));
    const T = () => domRect(s, `document.querySelector('.docs-title-input')`);
    await snapSheet(s, 's1_sheet_new', {title: await T(), grid: await domRect(s, `document.querySelector('#waffle-grid-container')`)});
    await s.locator('.docs-title-input').click(); await s.waitForTimeout(500); await s.keyboard.press('Meta+A'); await s.waitForTimeout(300);
    await snapSheet(s, 's1_sheet_title_sel', {title: await T()});
    await s.keyboard.type('BrightLeaf Stocky Database', {delay: 40}); await s.waitForTimeout(400);
    await snapSheet(s, 's1_sheet_title_typed', {title: await T()});
    await s.keyboard.press('Enter'); await s.waitForTimeout(2500); await tidy(s);
    await snapSheet(s, 's1_sheet_named', {title: await T(), tab: await domRect(s, `document.querySelector('.docs-sheet-tab')`)});
    console.log('doc', id, await s.title());
  } catch (e) { console.error('ERR', e); } finally { process.exit(0); }
})();
