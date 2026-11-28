import {open, shot, peek} from './v06_util';
import {prep, byText, node} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  await shot(p, 's1_agent_search', {item: byText('Generates an action plan'), search: '[data-test-id=node-creator] input'});
  await p.getByText('AI Agent', {exact: true}).first().click(); await p.waitForTimeout(5000);
  await shot(p, 's1_agent_ndv', {source: byText('Source for Prompt'), connected: byText('Connected Chat Trigger Node'), title: '[data-test-id=node-title-container]'});
  await peek(p, 'agentndv');
  process.exit(0);
})();
