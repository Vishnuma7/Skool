import {connect} from './cdp';
import {prep, shot, byText} from './snap';
import {HIDE_V01} from './v02_s5a_hide';
const ODOO = 'https://brightleaf-supplies.odoo.com';
const F = (n: string) => `.o_field_widget[name=${n}]`;
const rowOf = (code: string) => `js:[...document.querySelectorAll('tr.o_data_row')].find(e=>/${code}/.test(e.textContent) && !/V01-/.test(e.textContent) && e.offsetParent)`;
const statBtn = (re: string) => `js:[...document.querySelectorAll('.oe_stat_button, .o-form-buttonbox button')].find(e=>/${re}/.test(e.textContent))`;
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages()[0];
    const park = () => p.mouse.move(1900, 1070);
    await p.goto(`${ODOO}/odoo/action-stock.action_view_inventory_tree`); await p.waitForTimeout(4500); await prep(p); await p.evaluate(HIDE_V01); await park();
    await shot(p, 'st_all', {rows: '.o_list_table tbody', r1005: rowOf('BL-1005')});
    // open BL-1005 product
    await p.goto(`${ODOO}/odoo/action-stock.product_template_action_product?view_type=list`); await p.waitForTimeout(4000); await prep(p);
    const sw = p.locator('.o_switch_view.o_list').first(); if (await sw.isVisible().catch(() => false)) { await sw.click(); await p.waitForTimeout(1500); }
    await p.locator('tr.o_data_row').filter({hasText: 'BL-1005'}).first().click(); await p.waitForTimeout(3000); await park();
    await shot(p, 'rr_product', {rr: statBtn('Reordering|Min'), onhand: statBtn('On Hand'), buttons: '.o-form-buttonbox'});
    await p.locator('.oe_stat_button, .o-form-buttonbox button').filter({hasText: /Reordering|Min/}).first().click(); await p.waitForTimeout(3000);
    await p.locator('.o_list_button_add').first().click(); await p.waitForTimeout(1500);
    const sel = 'tr.o_selected_row';
    const prodIn = p.locator(`${sel} ${F('product_id')} input`);
    if (await prodIn.count() && !(await prodIn.inputValue())) { await prodIn.fill('BL-1005'); await p.waitForTimeout(1200); await p.locator('.o-autocomplete--dropdown-item').filter({hasText: 'BL-1005'}).filter({hasNotText: 'V01-'}).first().click(); await p.waitForTimeout(800); }
    await p.locator(`${sel} ${F('product_min_qty')} input`).fill('25');
    await p.locator(`${sel} ${F('product_max_qty')} input`).fill('50'); await p.waitForTimeout(600); await park();
    await shot(p, 'rr_row', {row: sel, min: `${sel} ${F('product_min_qty')}`, max: `${sel} ${F('product_max_qty')}`, loc: `${sel} ${F('location_id')}`});
    await p.locator('.o_list_button_save').first().click(); await p.waitForTimeout(2000); await park();
    await shot(p, 'rr_saved', {row: rowOf('BL-1005')});
    // Replenishment
    await p.goto(`${ODOO}/odoo/action-stock.action_orderpoint_replenish`); await p.waitForTimeout(5000); await prep(p); await p.evaluate(HIDE_V01); await park();
    const cell = (n: string) => `js:(${rowOf('BL-1005').slice(3)})?.querySelector('[name=${n}]')`;
    await shot(p, 'rp_list', {row: rowOf('BL-1005'), toOrder: cell('qty_to_order'), onhand: cell('qty_on_hand'), min: cell('product_min_qty'), max: cell('product_max_qty'),
      order: `js:(${rowOf('BL-1005').slice(3)})?.querySelector('button[name=action_replenish]')`});
    // BL-1001 paper trail
    await p.goto(`${ODOO}/odoo/action-stock.product_template_action_product?view_type=list`); await p.waitForTimeout(4000); await prep(p);
    await p.locator('tr.o_data_row').filter({hasText: 'BL-1001'}).first().click(); await p.waitForTimeout(3000); await park();
    await shot(p, 'mv_product', {inout: statBtn('In:'), buttons: '.o-form-buttonbox'});
    await p.locator('.oe_stat_button, .o-form-buttonbox button').filter({hasText: 'In:'}).first().click(); await p.waitForTimeout(3500); await park();
    await shot(p, 'mv_list', {row: `js:[...document.querySelectorAll('tr.o_data_row')].find(e=>e.offsetParent)`, table: '.o_list_table'});
  } finally { await b.close(); }
})();
