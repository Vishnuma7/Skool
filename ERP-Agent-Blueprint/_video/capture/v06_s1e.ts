import {open, shot, peek} from './v06_util';
import {prep, byText, node} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  await shot(p, 's1_chat_ndv', {open: byText('Open chat', 'button'), title: '[data-test-id=node-title-container]'});
  await p.click('[data-test-id=ndv-close-button]'); await p.waitForTimeout(1500);
  await shot(p, 's1_chat_node', {node: node('When chat message received'), chatbtn: '[data-test-id=workflow-chat-button]'});
  await peek(p, 'chatnode');
  // the + on the right of the trigger
  const plus = await p.$('[data-test-id=canvas-handle-plus], [data-test-id=canvas-handle-plus-wrapper]');
  console.log('plus?', !!plus, await p.evaluate(() => [...document.querySelectorAll('[data-test-id*=handle]')].map(e => e.getAttribute('data-test-id') + ':' + (e.getAttribute('data-handle-type') || '')).join(' ')));
  process.exit(0);
})();
