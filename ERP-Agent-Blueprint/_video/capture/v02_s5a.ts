import {connect} from './cdp';
import {prep, shot, byText} from './snap';
const ODOO = 'https://brightleaf-supplies.odoo.com';
export const HIDE_V01 = `(() => { let n=0; for (const r of document.querySelectorAll('tr.o_data_row')) if (/V01-BL-/.test(r.textContent)) { r.style.display='none'; n++; }
  for (const e of document.querySelectorAll('.o_pager_value, .o_pager_limit, .o_pager_counter span')) { if (n) e.textContent = e.textContent.replace(/(\\d+)/g, (m)=> String(Math.max(0, +m - n))); } })()`;
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages()[0];
    const park = () => p.mouse.move(1900, 1070);
    const inv = async () => { await p.goto(`${ODOO}/odoo/action-stock.action_view_inventory_tree`); await p.waitForTimeout(4500); await prep(p); await p.evaluate(HIDE_V01); await park(); };
    await inv();
    await shot(p, 'st_list', {newBtn: byText('New', '.o_control_panel button'), menuOps: `js:[...document.querySelectorAll('.o_menu_sections > *')].find(e=>(e.textContent||'').trim()==='Operations')`});
    const addRow = async (code: string, qty: string, name: string) => {
      await p.locator('.o_list_button_add').first().click(); await p.waitForTimeout(1500);
      const prod = p.locator('tr.o_selected_row .o_field_widget[name=product_id] input').first();
      await prod.fill(code); await p.waitForTimeout(1500);
      await p.locator('.o-autocomplete--dropdown-item').filter({hasText: code}).filter({hasNotText: 'V01-'}).first().click(); await p.waitForTimeout(1200);
      await p.locator('tr.o_selected_row .o_field_widget[name=inventory_quantity] input').first().fill(qty); await p.waitForTimeout(600); await park();
      await p.evaluate(HIDE_V01);
      await shot(p, `st_${name}_row`, {row: 'tr.o_selected_row', product: 'tr.o_selected_row .o_field_widget[name=product_id]', counted: 'tr.o_selected_row .o_field_widget[name=inventory_quantity]'});
      // save the row, then Apply
      await p.locator('.o_list_button_save').first().click(); await p.waitForTimeout(1800);
      await p.evaluate(HIDE_V01); await park();
      const row = p.locator('tr.o_data_row').filter({hasText: code}).filter({hasNotText: 'V01-'}).first();
      await shot(p, `st_${name}_saved`, {row: `js:[...document.querySelectorAll('tr.o_data_row')].find(e=>/${code}/.test(e.textContent) && !/V01-/.test(e.textContent))`,
        apply: `js:[...document.querySelectorAll('tr.o_data_row')].find(e=>/${code}/.test(e.textContent) && !/V01-/.test(e.textContent))?.querySelector('button[name=action_apply_inventory]')`});
      await row.locator('button[name=action_apply_inventory]').click(); await p.waitForTimeout(1800); await park();
      const modal = p.locator('.modal');
      if (await modal.isVisible().catch(() => false)) {
        await shot(p, `st_${name}_dialog`, {dialog: '.modal .modal-content', applyBtn: byText('Apply', '.modal button')});
        await p.locator('.modal button').filter({hasText: 'Apply'}).first().click(); await p.waitForTimeout(2000);
      }
      await p.evaluate(HIDE_V01); await park();
      await shot(p, `st_${name}_done`, {row: `js:[...document.querySelectorAll('tr.o_data_row')].find(e=>/${code}/.test(e.textContent) && !/V01-/.test(e.textContent))`});
    };
    await addRow('BL-1001', '145', '1001');
    await addRow('BL-1005', '18', '1005');
  } finally { await b.close(); }
})();
