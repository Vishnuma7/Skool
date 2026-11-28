import {open, shot, peek} from './v06_util';
import {prep} from './snap';
(async () => {
  const {p} = await open(); await prep(p);
  await p.mouse.click(949, 399); await p.waitForTimeout(2500);
  await peek(p, 'sysexp');
  const info = await p.evaluate(() => { const ts = [...document.querySelectorAll('textarea, .cm-content')].map(t => { const r = t.getBoundingClientRect(); return `${t.tagName} ${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`; }); return ts.join(' | '); });
  console.log(info);
  process.exit(0);
})();
