import {open, shot, peek} from './v06_util';
import {prep, byText, node} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  await shot(p, 's1_memory_list', {simple: byText('Simple Memory', '[data-test-id=node-creator] *'), panel: '[data-test-id=node-creator]'});
  await p.getByText('Simple Memory', {exact: true}).first().click(); await p.waitForTimeout(5000);
  const box = await p.evaluate(() => { const l = [...document.querySelectorAll('label, span, div')].find(e => e.children.length < 2 && e.textContent?.trim().startsWith('Context Window Length')); if (!l) return null; const row = l.closest('[data-test-id=parameter-item], .parameter-item') || l.parentElement?.parentElement; const inp = row?.querySelector('input'); const r = inp?.getBoundingClientRect(); return r ? {x: r.x, y: r.y, w: r.width, h: r.height, v: (inp as HTMLInputElement).value} : null; });
  console.log('ctx', box);
  await shot(p, 's1_memory_ndv', {ctx: 'r:' + JSON.stringify(box)});
  if (box) { await p.mouse.click(box.x + box.w / 2, box.y + box.h / 2, {clickCount: 3}); await p.keyboard.type('10'); await p.keyboard.press('Tab'); await p.waitForTimeout(1200); }
  await shot(p, 's1_memory_10', {ctx: 'r:' + JSON.stringify(box)});
  await peek(p, 'mem10');
  process.exit(0);
})();
