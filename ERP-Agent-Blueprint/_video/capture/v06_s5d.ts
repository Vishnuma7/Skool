import {open, shot, peek} from './v06_util';
import {prep, byText} from './snap';
const E = JSON.parse(require('fs').readFileSync('work/v06/log_entries.json', 'utf8'));
const at = (t: string, n = 0) => E.filter((e: any) => e.t === t)[n];
const R = (e: any) => 'r:(' + JSON.stringify({x: e.x - 140, y: e.y - 14, w: 300, h: 28}) + ')';
(async () => {
  const {p} = await open(); await prep(p);
  const m1 = at('Anthropic Chat Model', 0), tool = at('get_supplier_info'), m2 = at('Anthropic Chat Model', 1);
  await p.mouse.click(m1.x, m1.y); await p.waitForTimeout(3000);
  await shot(p, 's5_model1', {entry: R(m1), out: '[data-test-id=log-details], [data-test-id=logs-panel] [class*=details]'}); await peek(p, 's5m1');
  await p.mouse.click(tool.x, tool.y); await p.waitForTimeout(3000);
  await shot(p, 's5_tool_table', {entry: R(tool)}); await peek(p, 's5tt');
  // JSON view of the output
  const js = p.locator('[data-test-id=logs-panel] [data-test-id=radio-button-json], [data-test-id=logs-panel] label:has-text("JSON")').last();
  await js.click().catch(async () => { await p.getByText('JSON', {exact: true}).last().click(); }); await p.waitForTimeout(2500);
  await shot(p, 's5_tool_json', {entry: R(tool), rec: byText('Global Lift Parts')}); await peek(p, 's5tj');
  await p.mouse.click(m2.x, m2.y); await p.waitForTimeout(3000);
  await shot(p, 's5_model2', {entry: R(m2)}); await peek(p, 's5m2');
  process.exit(0);
})();
