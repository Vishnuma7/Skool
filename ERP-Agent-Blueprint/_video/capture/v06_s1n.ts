import {open, shot, peek} from './v06_util';
import {prep} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  const box = {x: 767, y: 464, w: 387, h: 28};
  const R = 'r:(' + JSON.stringify(box) + ')';
  await shot(p, 's1_memory_ndv', {ctx: R});
  await p.mouse.click(box.x + box.w / 2, box.y + box.h / 2, {clickCount: 3}); await p.keyboard.type('10'); await p.keyboard.press('Tab'); await p.waitForTimeout(1200);
  await shot(p, 's1_memory_10', {ctx: R});
  await peek(p, 'mem10');
  process.exit(0);
})();
