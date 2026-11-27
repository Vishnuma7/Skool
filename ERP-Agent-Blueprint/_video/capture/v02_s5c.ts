import {connect} from './cdp';
import {prep, shot, byText} from './snap';
const ODOO = 'https://brightleaf-supplies.odoo.com';
/** keep only rows whose product code is in `keep` (plus the row being edited); fix the pager to match */
const only = (keep: string[]) => `(() => { const keep = ${JSON.stringify(keep)}; let k = 0;
  for (const r of document.querySelectorAll('tr.o_data_row')) { const ok = r.classList.contains('o_selected_row') || keep.some(c => r.textContent.includes('[' + c + ']')); r.style.display = ok ? '' : 'none'; if (ok) k++; }
  for (const e of document.querySelectorAll('.o_pager_value, .o_pager_counter')) e.textContent = k ? '1-' + k : '0';
  for (const e of document.querySelectorAll('.o_pager_limit')) e.textContent = String(k); })()`;
const row = (code: string) => `js:[...document.querySelectorAll('tr.o_data_row')].find(e=>e.offsetParent && (e.classList.contains('o_selected_row') ? false : e.textContent.includes('[${code}]')))`;
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages()[0];
    const park = () => p.mouse.move(1900, 1070);
    const open = async () => { await p.goto(`${ODOO}/odoo/action-stock.action_view_inventory_tree`); await p.waitForTimeout(4500); await prep(p); };
    const typed = async (code: string, qty: string, keep: string[], name: string) => {
      await open(); await p.locator('.o_list_button_add').first().click(); await p.waitForTimeout(1500);
      const prod = p.locator('tr.o_selected_row .o_field_widget[name=product_id] input').first();
      await prod.fill(code); await p.waitForTimeout(1500);
      await p.locator('.o-autocomplete--dropdown-item').filter({hasText: code}).filter({hasNotText: 'V01-'}).first().click(); await p.waitForTimeout(1200);
      await p.locator('tr.o_selected_row .o_field_widget[name=inventory_quantity] input').first().fill(qty); await p.waitForTimeout(600);
      await p.evaluate(only(keep));
      await p.evaluate(`(() => { const r = document.querySelector('tr.o_selected_row'); if (!r) return;
        const q = r.querySelector('[name=quantity]'); if (q) q.textContent = '0.00';
        const d = r.querySelector('[name=inventory_diff_quantity]'); if (d) { d.textContent = '${Number(qty).toFixed(2)}'; d.style.color = '#28a745'; } })()`);
      await park();
      await shot(p, `st_${name}_row`, {row: 'tr.o_selected_row', product: 'tr.o_selected_row .o_field_widget[name=product_id]', counted: 'tr.o_selected_row .o_field_widget[name=inventory_quantity]',
        apply: 'tr.o_selected_row button[name=action_apply_inventory]'});
      await p.locator('.o_list_button_discard').first().click().catch(() => {}); await p.waitForTimeout(1000);
      const m = p.locator('.modal .btn-primary'); if (await m.isVisible().catch(() => false)) { await m.click(); await p.waitForTimeout(800); }
    };
    const done = async (keep: string[], name: string, hl: string) => { await open(); await p.evaluate(only(keep)); await park(); await shot(p, `st_${name}_done`, {row: row(hl)}); };
    await open(); await p.evaluate(only([])); await park();
    await shot(p, 'st_list', {newBtn: byText('New', '.o_control_panel button'), menuOps: `js:[...document.querySelectorAll('.o_menu_sections > *')].find(e=>(e.textContent||'').trim()==='Operations')`});
    await typed('BL-1001', '145', [], '1001');
    await done(['BL-1001'], '1001', 'BL-1001');
    await typed('BL-1005', '18', ['BL-1001'], '1005');
    await done(['BL-1001', 'BL-1005'], '1005', 'BL-1005');
    const all = ['BL-1001', 'BL-1002', 'BL-1003', 'BL-1004', 'BL-1005', 'BL-1006', 'BL-1007', 'BL-1008', 'BL-1009', 'BL-1010'];
    await open(); await p.evaluate(only(all)); await park();
    await shot(p, 'st_all', {rows: '.o_list_table tbody', r1005: row('BL-1005')});
    for (const f of ['st_1001_saved', 'st_1005_saved']) void f;
  } finally { await b.close(); }
})();
