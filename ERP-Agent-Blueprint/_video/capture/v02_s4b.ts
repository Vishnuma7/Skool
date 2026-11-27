import {connect} from './cdp';
import {prep, shot, byText} from './snap';
const ODOO = 'https://brightleaf-supplies.odoo.com';
const F = (n: string) => `.o_field_widget[name=${n}]`;
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages()[0];
    const park = () => p.mouse.move(1900, 1070);
    await p.goto(`${ODOO}/odoo/action-stock.product_template_action_product?view_type=list`); await p.waitForTimeout(4500); await prep(p);
    const sw = p.locator('.o_switch_view.o_list').first(); if (await sw.isVisible().catch(() => false)) { await sw.click(); await p.waitForTimeout(1500); }
    await p.locator('.o_list_table th').filter({hasText: 'Internal Reference'}).first().click(); await p.waitForTimeout(1500); await park();
    await shot(p, 'i_all', {rows: '.o_list_table tbody', refHead: byText('Internal Reference', '.o_list_table th'), pager: '.o_pager_counter, .o_pager_value',
      r1005: `js:[...document.querySelectorAll('.o_list_table tbody tr.o_data_row')].find(e=>/BL-1005/.test(e.textContent))`});
    await p.locator('.o_list_table tbody tr.o_data_row').filter({hasText: 'BL-1005'}).first().click(); await p.waitForTimeout(3000); await park();
    await shot(p, 'i_1005', {type: F('type'), storable: F('is_storable'), cost: F('standard_price'), price: F('list_price'), ref: F('default_code'), name: F('name')});
    await p.goBack(); await p.waitForTimeout(2500);
    const sb = p.locator('.o_searchview_input').first(); await sb.click(); await sb.pressSequentially('BL-100', {delay: 60}); await p.waitForTimeout(600); await p.keyboard.press('Enter'); await p.waitForTimeout(2500);
    await p.mouse.click(1700, 900); await p.waitForTimeout(800); await park();
    await shot(p, 'i_search', {search: '.o_searchview', rows: '.o_list_table tbody', pager: '.o_pager_counter, .o_pager_value'});
  } finally { await b.close(); }
})();
