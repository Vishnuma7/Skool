import {open, shot, peek} from './v06_util';
import {prep, byText} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  const item = p.getByText('Odoo Tool', {exact: true}).first();
  await item.scrollIntoViewIfNeeded(); await p.evaluate(() => { const e = [...document.querySelectorAll('[data-test-id=node-creator] *')].find(x => x.textContent?.trim() === 'Odoo Tool'); e?.scrollIntoView({block: 'center'}); });
  await p.waitForTimeout(800);
  await shot(p, 's2_tool_search', {item: byText('Odoo Tool', '[data-test-id=node-creator] *'), search: '[data-test-id=node-creator] input'});
  await peek(p, 'toolsearch3');
  await item.click(); await p.waitForTimeout(6000);
  await shot(p, 's2_tool_ndv_default', {title: '[data-test-id=node-title-container]'});
  await peek(p, 'toolndv0');
  process.exit(0);
})();
