import {connect} from './cdp';
import {prep, shot} from './snap';
const row = (re: string) => `js:[...document.querySelectorAll('.o_kanban_record, tr.o_data_row')].find(e=>/${re}/.test(e.textContent))`;
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages()[0];
    await p.goto('https://brightleaf-supplies.odoo.com/odoo/contacts'); await p.waitForTimeout(4000); await prep(p);
    await p.evaluate(`(() => { for (const r of document.querySelectorAll('.o_kanban_record, tr.o_data_row')) if (/Apex Fasteners/.test(r.textContent)) r.style.display='none';
      for (const e of document.querySelectorAll('.o_pager_value, .o_pager_limit')) e.textContent = e.textContent.replace('3','2'); })()`);
    await p.mouse.move(1900, 1070);
    await shot(p, 'odoo_contacts', {company: row('BrightLeaf Supplies'), sarah: row('Sarah Mitchell')});
  } finally { await b.close(); }
})();
