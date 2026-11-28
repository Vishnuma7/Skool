import {open, shot, peek} from './v06_util';
import {prep, byText} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  const inp = p.locator('[data-test-id=node-creator] input').first();
  await inp.fill(''); await inp.type('Odoo', {delay: 80});
  for (let i = 0; i < 10; i++) { await p.waitForTimeout(2000); if (await p.getByText('Odoo Tool', {exact: true}).count()) break; }
  await p.waitForTimeout(1000);
  await shot(p, 's2_tool_search', {item: byText('Odoo Tool', '[data-test-id=node-creator] *'), search: '[data-test-id=node-creator] input'});
  await peek(p, 'toolsearch2');
  process.exit(0);
})();
