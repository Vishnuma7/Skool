import {connect, pageFor} from './cdp';
import {prep, shot, byText} from './snap';
import {open, shot as nshot, peek} from './v06_util';
(async () => {
  const {p} = await open(); await prep(p);
  // logs view of the weak-prompt run: only supplier info, no PO data
  await p.getByText('Executions', {exact: true}).first().click(); await p.waitForTimeout(5000);
  const rows = await p.evaluate(() => [...document.querySelectorAll('[data-test-id^=execution-details-]')].map(e => e.getAttribute('data-test-id')));
  console.log(rows.slice(0, 5));
  await p.locator(`[data-test-id=${rows[3]}]`).click(); await p.waitForTimeout(6000);
  await nshot(p, 's6_weak_logs', {});
  await peek(p, 's6weaklogs');
  await p.getByText('Editor', {exact: true}).first().click(); await p.waitForTimeout(3000);
  // Odoo fact-check list
  const b = await connect(); const o = await pageFor(b, 'odoo.com');
  await o.goto('https://brightleaf-supplies.odoo.com/odoo/action-stock.product_template_action_product?view_type=list', {waitUntil: 'domcontentloaded'});
  await o.getByText('Pallet Jack Wheels').first().waitFor({timeout: 90000}); await prep(o); await o.waitForTimeout(2000);
  await shot(o, 's4_odoo_list', {gloves: 'js:[...document.querySelectorAll("tr")].find(r=>r.textContent.includes("Industrial Safety Gloves"))', wheels: 'js:[...document.querySelectorAll("tr")].find(r=>r.textContent.includes("Pallet Jack Wheels"))', onhand: byText('On Hand', 'th')});
  await o.screenshot({path: 'work/v06/peek_odoolist.png', scale: 'css'});
  process.exit(0);
})();
