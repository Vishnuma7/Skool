import {open, shot, peek} from './v06_util';
import {prep, byText, node} from './snap';
(async () => {
  const {p} = await open();
  await p.reload({waitUntil: 'domcontentloaded'}); await p.locator(node('get_supplier_info')).waitFor({timeout: 90000});
  await prep(p); await p.waitForTimeout(2000);
  await p.mouse.click(600, 300); await p.keyboard.press('Shift+Alt+t'); await p.waitForTimeout(1500);
  await p.click('[data-test-id=zoom-to-fit]').catch(() => {}); await p.waitForTimeout(1200);
  await p.keyboard.press('Meta+s'); await p.waitForTimeout(4000);
  await shot(p, 's2_full_canvas', {trigger: node('When chat message received'), agent: node('AI Agent'), model: node('Anthropic Chat Model'), memory: node('Simple Memory'), t1: node('get_products_and_stock'), t2: node('get_reorder_rules'), t3: node('get_supplier_info')});
  await peek(p, 'fullcanvas');
  for (const [k, tag] of [['get_reorder_rules', 'tool2'], ['get_supplier_info', 'tool3']]) {
    await p.locator(node(k)).dblclick(); await p.waitForTimeout(5000);
    await shot(p, `s2_${tag}_ndv`, {title: '[data-test-id=node-title-container]', resource: byText('Custom Resource'), op: byText('Get Many'), fields: byText('Fields to Include')});
    await peek(p, tag);
    await p.click('[data-test-id=ndv-close-button]'); await p.waitForTimeout(1500);
  }
  process.exit(0);
})();
