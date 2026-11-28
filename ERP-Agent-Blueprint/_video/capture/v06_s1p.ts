import {open, shot, peek} from './v06_util';
import {prep, byText, node} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  await p.click('[data-test-id=workflow-chat-button]'); await p.waitForTimeout(3000);
  await peek(p, 'chatopen');
  const ta = p.locator('[data-test-id=canvas-chat] textarea, [data-test-id=chat-input] textarea, textarea').first();
  await ta.click(); await shot(p, 's1_chat_empty', {input: '[data-test-id=canvas-chat] textarea'}, true);
  await ta.type('Hi Stocky, how many Pallet Jack Wheels do we have?', {delay: 35}); await p.waitForTimeout(500);
  await shot(p, 's1_chat_typed', {input: '[data-test-id=canvas-chat] textarea'}, true);
  await p.keyboard.press('Enter');
  await p.waitForTimeout(2500); await shot(p, 's1_chat_running', {});
  for (let i = 0; i < 30; i++) { await p.waitForTimeout(3000); const n = await p.evaluate(() => document.querySelectorAll('[data-test-id=chat-message-bot], .chat-message-from-bot').length); if (n > 0) break; }
  await p.waitForTimeout(2000);
  await shot(p, 's1_chat_answer', {bot: '[data-test-id=chat-message-bot], .chat-message-from-bot'});
  console.log(await p.evaluate(() => [...document.querySelectorAll('[data-test-id=chat-message-bot], .chat-message-from-bot')].map(e => e.textContent?.trim()).join('\n---\n')));
  await peek(p, 'answer1');
  process.exit(0);
})();
