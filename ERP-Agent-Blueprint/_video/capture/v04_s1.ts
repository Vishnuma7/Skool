// V04 Section 1: real Odoo products (kanban, list, BL-1005 form) + real sheets.new + rename.
import {connect} from './cdp';
import {prep, shot, byText} from './snap';
import {prepSheets, snapSheet, domRect, tidy} from './sheets';
const ODOO = 'https://brightleaf-supplies.odoo.com';
const PURL = `${ODOO}/odoo/action-stock.product_template_action_product`;
const F = (n: string) => `.o_field_widget[name=${n}]`;
const col = (name: string) => `r:(() => { const els = [...document.querySelectorAll('th[data-name=${name}], td[name=${name}]')].filter(e => e.offsetParent); if (!els.length) return null;
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9; for (const e of els) { const r = e.getBoundingClientRect(); x0=Math.min(x0,r.left); y0=Math.min(y0,r.top); x1=Math.max(x1,r.right); y1=Math.max(y1,r.bottom); } return {x:x0,y:y0,w:x1-x0,h:y1-y0}; })()`;
const row = (sku: string) => `js:[...document.querySelectorAll('tr.o_data_row')].find(e => e.textContent.includes('${sku}'))`;
(async () => {
  const b = await connect();
  try {
    const ctx = b.contexts()[0];
    const p = ctx.pages().find((x) => x.url().includes('odoo.com')) ?? await ctx.newPage();
    await p.goto(PURL); await p.waitForTimeout(4000); await prep(p);
    // make sure we start in kanban
    const kb = p.locator('.o_switch_view.o_kanban').first(); if (await kb.isVisible().catch(() => false)) { await kb.click(); await p.waitForTimeout(2500); }
    await p.mouse.move(1900, 1070);
    await shot(p, 's1_kanban', {breadcrumb: '.o_breadcrumb', listIcon: '.o_switch_view.o_list', kanbanIcon: '.o_switch_view.o_kanban', switcher: '.o_cp_switch_buttons', cards: '.o_kanban_renderer',
      menuProducts: `js:[...document.querySelectorAll('.o_menu_sections > *')].find(e=>(e.textContent||'').trim()==='Products')`});
    await p.locator('.o_switch_view.o_list').first().click(); await p.waitForTimeout(3000); await p.mouse.move(1900, 1070);
    const heads = await p.evaluate(`[...document.querySelectorAll('thead th[data-name]')].map(e => e.dataset.name + '=' + e.textContent.trim()).join(' | ')`);
    console.log('list columns:', heads);
    await shot(p, 's1_list', {listIcon: '.o_switch_view.o_list', table: '.o_list_table', r1005: row('BL-1005'), r1003: row('BL-1003'),
      h_ref: 'th[data-name=default_code]', h_name: 'th[data-name=name]', h_price: 'th[data-name=list_price]', h_cost: 'th[data-name=standard_price]', h_qty: 'th[data-name=qty_available]',
      c_ref: col('default_code'), c_name: col('name'), c_price: col('list_price'), c_cost: col('standard_price'), c_qty: col('qty_available')});
    await p.locator('tr.o_data_row').filter({hasText: 'BL-1005'}).first().locator('td[name=name]').click(); await p.waitForTimeout(3000); await p.mouse.move(1900, 1070);
    console.log('form url', p.url());
    await shot(p, 's1_form', {name: F('name'), price: F('list_price'), cost: F('standard_price'), ref: F('default_code'),
      onhand: `js:[...document.querySelectorAll('.oe_stat_button, .o-form-buttonbox button')].find(e=>/On Hand/.test(e.textContent))`});
    // example edit: rename + reprice WITHOUT saving, then discard
    await p.locator(`${F('name')} textarea, ${F('name')} input`).first().fill('PJ Wheels Set');
    await p.locator(`${F('standard_price')} input`).fill('39.00'); await p.locator(`${F('default_code')} input`).click(); await p.waitForTimeout(600); await p.mouse.move(1900, 1070);
    await shot(p, 's1_form_edit', {name: F('name'), cost: F('standard_price')});
    await p.locator('.o_form_button_cancel').first().click(); await p.waitForTimeout(1500);
    const st = await p.evaluate(`document.querySelector('.o_field_widget[name=name]').textContent || document.querySelector('.o_field_widget[name=name] textarea')?.value`);
    console.log('after discard name:', st);
    // ---- Google Sheets: sheets.new
    const s = await ctx.newPage();
    await s.goto('https://sheets.new'); await s.waitForTimeout(7000); await prepSheets(s); await tidy(s); await s.waitForTimeout(800);
    console.log('sheet url', s.url());
    await snapSheet(s, 's1_sheet_new', {title: await domRect(s, `document.querySelector('.docs-title-input')`), grid: await domRect(s, `document.querySelector('#waffle-grid-container')`)});
    await s.locator('.docs-title-input').click(); await s.waitForTimeout(500); await s.keyboard.press('Meta+A'); await s.waitForTimeout(300);
    await snapSheet(s, 's1_sheet_title_sel', {title: await domRect(s, `document.querySelector('.docs-title-input')`)});
    await s.keyboard.type('BrightLeaf Stocky Database', {delay: 40}); await s.waitForTimeout(400);
    await snapSheet(s, 's1_sheet_title_typed', {title: await domRect(s, `document.querySelector('.docs-title-input')`)});
    await s.keyboard.press('Enter'); await s.waitForTimeout(2500); await tidy(s);
    console.log('title now', await s.title());
    await snapSheet(s, 's1_sheet_named', {title: await domRect(s, `document.querySelector('.docs-title-input')`), tab: await domRect(s, `document.querySelector('.docs-sheet-tab')`)});
  } catch (e) { console.error("ERR", e); } finally { process.exit(0); }
})();
