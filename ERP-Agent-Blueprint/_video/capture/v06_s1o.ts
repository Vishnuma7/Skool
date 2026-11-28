import {open, shot, peek} from './v06_util';
import {prep, byText, node} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  await p.click('[data-test-id=ndv-close-button]'); await p.waitForTimeout(1500);
  await p.keyboard.press('Meta+s'); await p.waitForTimeout(4000);
  await shot(p, 's1_skeleton', {agent: node('AI Agent'), model: node('Anthropic Chat Model'), memory: node('Simple Memory'), chatbtn: '[data-test-id=workflow-chat-button]'});
  await peek(p, 'skeleton');
  process.exit(0);
})();
