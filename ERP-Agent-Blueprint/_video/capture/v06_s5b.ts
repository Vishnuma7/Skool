import {open, shot, peek} from './v06_util';
import {prep, byText} from './snap';
(async () => {
  const {p} = await open(); await prep(p);
  await p.getByText('Executions', {exact: true}).first().click(); await p.waitForTimeout(6000);
  await shot(p, 's5_executions', {tab: byText('Executions', '[data-test-id=radio-button-executions], label, span')});
  await peek(p, 's5exec');
  const rows = await p.evaluate(() => [...document.querySelectorAll('[data-test-id=execution-list-item], [data-test-id*=execution]')].slice(0, 8).map(e => { const r = e.getBoundingClientRect(); return `${e.getAttribute('data-test-id')} ${Math.round(r.x)},${Math.round(r.y)} ${(e.textContent || '').replace(/\s+/g, ' ').slice(0, 80)}`; }));
  console.log(rows.join('\n'));
  process.exit(0);
})();
