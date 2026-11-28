import {open, shot, peek} from './v06_util';
import {prep, byText, node} from './snap';
import {n8n} from './cdp';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  // collapse the bottom panel back down so the canvas is visible
  await p.mouse.move(800, 470); await p.mouse.down(); await p.mouse.move(800, 760, {steps: 10}); await p.mouse.up(); await p.waitForTimeout(800);
  await p.click('[data-test-id=workflow-chat-button]').catch(() => {}); await p.waitForTimeout(1200);
  await peek(p, 's2canvas');
  const plus = p.locator('[data-test-id=canvas-handle-plus]').last();
  await plus.click(); await p.waitForTimeout(2500);
  await p.keyboard.type('Odoo', {delay: 60}); await p.waitForTimeout(2500);
  await shot(p, 's2_tool_search', {item: byText('Odoo Tool', '[data-test-id=node-creator] *'), search: '[data-test-id=node-creator] input'});
  await peek(p, 'toolsearch');
  process.exit(0);
})();
