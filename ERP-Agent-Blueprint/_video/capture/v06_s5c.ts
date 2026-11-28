import {open, shot, peek} from './v06_util';
import {prep, byText} from './snap';
const LOGS = '[data-test-id=logs-overview], [data-test-id=logs-panel]';
const entries = (p: any) => p.evaluate(() => [...document.querySelectorAll('[data-test-id=logs-overview] [data-test-id*=entry], [data-test-id=logs-overview] [role=treeitem], [data-test-id=logs-overview] div')].filter((e: any) => e.children.length < 6 && /^(AI Agent|Anthropic Chat Model|get_supplier_info|get_products_and_stock|Simple Memory|When chat message received)$/.test((e.textContent || '').trim())).map((e: any) => { const r = e.getBoundingClientRect(); return {t: e.textContent.trim(), x: r.x + r.width / 2, y: r.y + r.height / 2}; }));
(async () => {
  const {p} = await open(); await prep(p);
  await p.locator('[data-test-id=execution-details-9]').click(); await p.waitForTimeout(6000);
  let es: any[] = await entries(p);
  const uniq: any[] = []; for (const e of es) if (!uniq.find(u => Math.abs(u.y - e.y) < 6)) uniq.push(e);
  console.log(uniq.map(u => `${u.t} ${Math.round(u.x)},${Math.round(u.y)}`).join('\n'));
  await shot(p, 's5_q2_run', {});
  await peek(p, 's5q2');
  require('fs').writeFileSync('work/v06/log_entries.json', JSON.stringify(uniq));
  process.exit(0);
})();
