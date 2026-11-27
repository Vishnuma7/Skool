import {connect} from './cdp';
import {prep, shot} from './snap';
const ODOO = 'https://brightleaf-supplies.odoo.com';
const row = (re: string) => `js:[...document.querySelectorAll('.o_kanban_record, tr.o_data_row')].find(e=>/${re}/.test(e.textContent))`;
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages()[0];
    await p.goto(`${ODOO}/odoo/contacts`); await p.waitForTimeout(4000); await prep(p); await p.mouse.move(1900, 1070);
    await shot(p, 'c_list', {apex: row('Apex Fasteners'), company: row('BrightLeaf Supplies'), sarah: row('Sarah Mitchell')});
    await p.locator('.o_kanban_record, tr.o_data_row').filter({hasText: 'Apex Fasteners'}).first().click(); await p.waitForTimeout(3000); await p.mouse.move(1900, 1070);
    await shot(p, 'c_apex', {name: '.o_field_widget[name=name]', city: '.o_field_widget[name=city]', state: '.o_field_widget[name=state_id]', country: '.o_field_widget[name=country_id]', address: '.o_address_format'});
  } finally { await b.close(); }
})();
