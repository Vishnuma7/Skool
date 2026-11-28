import {open, shot, peek} from './v06_util';
import {prep, byText, node} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open();
  await p.reload({waitUntil: 'domcontentloaded'}); await p.locator(node('get_products_and_stock')).waitFor({timeout: 90000});
  await prep(p); await p.waitForTimeout(2500);
  await shot(p, 's2_tool1_canvas', {tool: node('get_products_and_stock'), agent: node('AI Agent')});
  await peek(p, 'tool1canvas');
  await p.locator(node('get_products_and_stock')).dblclick(); await p.waitForTimeout(5000);
  await shot(p, 's2_tool1_ndv', {title: '[data-test-id=node-title-container]', cred: byText('Odoo – BrightLeaf'), desc: byText('Returns every product'), resource: byText('Custom Resource'), model: byText('product.product'), op: byText('Get Many'), returnAll: byText('Return All'), fields: byText('Fields to Include')});
  await peek(p, 'tool1ndv');
  process.exit(0);
})();
