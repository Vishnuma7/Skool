import {open, shot, peek} from './v06_util';
import {prep, node} from './snap';
(async () => {
  const {p} = await open();
  await p.reload({waitUntil: 'domcontentloaded'}); await p.locator(node('get_supplier_info')).waitFor({timeout: 90000});
  await prep(p); await p.waitForTimeout(2000);
  await p.click('[data-test-id=zoom-to-fit]').catch(() => {}); await p.waitForTimeout(1500);
  await shot(p, 's2_full_canvas', {trigger: node('When chat message received'), agent: node('AI Agent'), model: node('Anthropic Chat Model'), memory: node('Simple Memory'), t1: node('get_products_and_stock'), t2: node('get_reorder_rules'), t3: node('get_supplier_info')});
  await peek(p, 'fullcanvas2');
  process.exit(0);
})();
