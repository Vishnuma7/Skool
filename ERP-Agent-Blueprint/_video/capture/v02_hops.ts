import {connect} from './cdp';
import {prep, shot} from './snap';
import {HIDE_V01} from './v02_s5a_hide';
const ODOO = 'https://brightleaf-supplies.odoo.com';
const menu = (t: string) => `js:[...document.querySelectorAll('.o_menu_sections > *')].find(e=>(e.textContent||'').trim()===${JSON.stringify(t)})`;
const item = (t: string) => `js:[...document.querySelectorAll('.dropdown-menu .dropdown-item, .o-dropdown--menu .dropdown-item')].find(e=>(e.textContent||'').trim()===${JSON.stringify(t)} && e.offsetParent)`;
const rowOf = (code: string) => `js:[...document.querySelectorAll('tr.o_data_row')].find(e=>/${code}/.test(e.textContent) && !/V01-/.test(e.textContent) && e.offsetParent)`;
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages()[0];
    const park = () => p.mouse.move(1900, 1070);
    const openMenu = async (t: string) => { await p.locator('.o_menu_sections > *').filter({hasText: new RegExp(`^${t}$`)}).first().click(); await p.waitForTimeout(1000); await park(); };
    // 1. Products menu open over Physical Inventory
    await p.goto(`${ODOO}/odoo/action-stock.action_view_inventory_tree`); await p.waitForTimeout(4500); await prep(p); await p.evaluate(HIDE_V01);
    await openMenu('Products');
    await shot(p, 'prod_menu_st', {menu: menu('Products'), item: item('Products')});
    // 2. Product list (current stock)
    await p.goto(`${ODOO}/odoo/action-stock.product_template_action_product?view_type=list`); await p.waitForTimeout(4500); await prep(p);
    const sw = p.locator('.o_switch_view.o_list').first(); if (await sw.isVisible().catch(() => false)) { await sw.click(); await p.waitForTimeout(1500); }
    await p.evaluate(HIDE_V01); await park();
    await shot(p, 'p_list_now', {r1005: rowOf('BL-1005'), r1001: rowOf('BL-1001')});
    // 3. Operations menu over the BL-1005 reordering rules
    await p.locator('tr.o_data_row').filter({hasText: 'BL-1005'}).filter({hasNotText: 'V01-'}).first().click(); await p.waitForTimeout(3000);
    await p.locator('.oe_stat_button, .o-form-buttonbox button').filter({hasText: /Reordering|Min/}).first().click(); await p.waitForTimeout(3500);
    await p.evaluate(HIDE_V01);
    await openMenu('Operations');
    await shot(p, 'ops_menu_rr', {menu: menu('Operations'), item: item('Replenishment')});
    // 4. Products menu over Replenishment
    await p.goto(`${ODOO}/odoo/action-stock.action_orderpoint_replenish`); await p.waitForTimeout(5000); await prep(p); await p.evaluate(HIDE_V01);
    await openMenu('Products');
    await shot(p, 'prod_menu_rp', {menu: menu('Products'), item: item('Products')});
    await p.keyboard.press('Escape');
  } finally { await b.close(); }
})();
