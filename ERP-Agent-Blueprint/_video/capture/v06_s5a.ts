import {open, shot, peek} from './v06_util';
import {prep, byText} from './snap';
import {setPanel} from './v06_chat';
(async () => {
  const {p} = await open(); await prep(p);
  await setPanel(p, 300);
  const items = await p.evaluate(() => [...document.querySelectorAll('[data-test-id=logs-panel] *')].filter(e => e.children.length === 0 && /Anthropic Chat Model|get_supplier_info|AI Agent|Simple Memory/.test(e.textContent || '')).map(e => { const r = e.getBoundingClientRect(); return `${e.textContent?.trim()} @${Math.round(r.x)},${Math.round(r.y)}`; }));
  console.log(items.join('\n'));
  await shot(p, 's5_logs', {});
  await peek(p, 's5logs');
  process.exit(0);
})();
