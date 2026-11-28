import {open, shot, peek} from './v06_util';
import {prep, byText} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  await p.mouse.click(1000, 221); await p.waitForTimeout(4000);
  const items = await p.evaluate(() => [...document.querySelectorAll('[data-test-id=rlc-item], .el-select-dropdown__item, [role=option]')].map(e => e.textContent?.trim()).filter(Boolean).slice(0, 30));
  console.log(items);
  await peek(p, 'modeldd');
  process.exit(0);
})();
