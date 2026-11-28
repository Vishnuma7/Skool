import {open, shot, peek} from './v06_util';
import {prep, byText} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  for (let i = 0; i < 12; i++) {
    const items = await p.evaluate(() => [...document.querySelectorAll('[class*=resourceLocator] li, [class*=dropdown] li, li')].map(e => e.textContent?.trim()).filter(t => t && /Claude/.test(t)));
    if (items.length > 2) { console.log(items.slice(0, 20)); break; }
    await p.waitForTimeout(5000);
  }
  await peek(p, 'modeldd2');
  process.exit(0);
})();
