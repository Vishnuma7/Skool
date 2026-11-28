import {connect, pageFor} from './cdp';
import {prep, shot, byText} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const b = await connect(); const p = await pageFor(b, 'odoo.com');
  await p.goto('https://brightleaf-supplies.odoo.com/odoo/action-stock.product_template_action_product/45', {waitUntil: 'domcontentloaded'});
  await p.getByText('Pallet Jack Wheels', {exact: false}).first().waitFor({timeout: 90000});
  await prep(p); await p.waitForTimeout(2500);
  await shot(p, 's2_odoo_product', {onhand: byText('On Hand', '.oe_stat_button *'), minmax: byText('Min', '.oe_stat_button *'), title: '.oe_title, [name=name]', purchaseTab: byText('Purchase', '.nav-link')});
  await p.screenshot({path: 'work/v06/peek_odoo1.png', scale: 'css'});
  await p.locator('.nav-link', {hasText: 'Purchase'}).first().click(); await p.waitForTimeout(2500);
  await shot(p, 's2_odoo_purchase', {vendor: byText('Global Lift Parts', 'td'), row: 'js:[...document.querySelectorAll("tr")].find(r=>r.textContent.includes("Global Lift Parts"))', onhand: byText('On Hand', '.oe_stat_button *'), minmax: byText('Min', '.oe_stat_button *')});
  await p.screenshot({path: 'work/v06/peek_odoo2.png', scale: 'css'});
  process.exit(0);
})();
