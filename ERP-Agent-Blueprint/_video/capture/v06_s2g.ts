import {open, shot, peek} from './v06_util';
import {prep, byText, node} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  await p.click('[data-test-id=ndv-close-button]'); await p.waitForTimeout(1500);
  const n = p.locator(node('get_products_and_stock'));
  await n.click({button: 'right'}); await p.waitForTimeout(1500);
  await shot(p, 's2_duplicate_menu', {dup: byText('Duplicate', '[role=menuitem], li, button, span'), tool: node('get_products_and_stock')}, true);
  await peek(p, 'dupmenu');
  await p.keyboard.press('Escape'); await p.waitForTimeout(800);
  process.exit(0);
})();
