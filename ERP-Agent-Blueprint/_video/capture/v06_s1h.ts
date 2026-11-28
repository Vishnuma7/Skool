import {open, shot, peek} from './v06_util';
import {prep, byText, node} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  await p.click('[data-test-id=ndv-close-button]'); await p.waitForTimeout(2000);
  await shot(p, 's1_agent_canvas', {agent: node('AI Agent'), trigger: node('When chat message received')});
  await peek(p, 'agentcanvas');
  console.log(await p.evaluate(() => [...document.querySelectorAll('[data-test-id=canvas-handle-plus-wrapper],[data-test-id=canvas-handle-plus]')].map(e => { const h = e.closest('[data-handleid],[data-handle-type]') as HTMLElement | null; const r = e.getBoundingClientRect(); return `${e.getAttribute('data-test-id')} ${h?.getAttribute('data-handleid') ?? ''} ${h?.getAttribute('data-handle-type') ?? ''} ${Math.round(r.x)},${Math.round(r.y)}`; }).join('\n')));
  process.exit(0);
})();
