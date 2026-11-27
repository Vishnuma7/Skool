import {connect} from './cdp';
import {prep, shot} from './snap';
import {HIDE_V01} from './v02_s5a_hide';
const ODOO = 'https://brightleaf-supplies.odoo.com';
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages()[0];
    const park = () => p.mouse.move(1900, 1070);
    await p.goto(`${ODOO}/odoo/action-stock.product_template_action_product?view_type=list`); await p.waitForTimeout(5000);
    console.log('url', p.url());
    if (/login/.test(p.url())) { console.log('LOGIN NEEDED'); return; }
    await prep(p);
    await p.locator('tr.o_data_row').filter({hasText: 'BL-1005'}).filter({hasNotText: 'V01-'}).first().click(); await p.waitForTimeout(3000);
    await p.locator('.oe_stat_button, .o-form-buttonbox button').filter({hasText: /Reordering|Min/}).first().click(); await p.waitForTimeout(3500);
    await p.evaluate(HIDE_V01);
    // Show the list as it looks before any rule exists: hide existing rows and totals (visual only, no data change).
    await p.evaluate(`(() => { for (const r of document.querySelectorAll('tr.o_data_row')) r.style.display='none';
      for (const t of document.querySelectorAll('tfoot td')) t.style.visibility='hidden';
      const pg = document.querySelector('.o_pager'); if (pg) pg.style.visibility='hidden'; })()`);
    await park();
    await shot(p, 'rr_list', {newBtn: '.o_list_button_add', title: '.o_breadcrumb'});
  } finally { await b.close(); }
})();
