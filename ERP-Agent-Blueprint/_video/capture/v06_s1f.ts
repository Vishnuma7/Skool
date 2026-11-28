import {open, shot, peek} from './v06_util';
import {prep, byText, node} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  await p.click('[data-test-id=canvas-handle-plus]'); await p.waitForTimeout(2500);
  await shot(p, 's1_creator_open', {search: '[data-test-id=node-creator-search-bar] input, [data-test-id=node-creator] input'});
  await p.keyboard.type('AI Agent', {delay: 60}); await p.waitForTimeout(2500);
  await shot(p, 's1_agent_search', {item: byText('AI Agent', '[data-test-id=node-creator] *'), search: '[data-test-id=node-creator] input'});
  await peek(p, 'agentsearch');
  process.exit(0);
})();
