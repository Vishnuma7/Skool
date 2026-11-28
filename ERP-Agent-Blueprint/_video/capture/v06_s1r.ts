import {open, shot, peek} from './v06_util';
import {prep} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  await p.mouse.move(800, 758); await p.mouse.down(); await p.mouse.move(800, 600, {steps: 8}); await p.mouse.move(800, 470, {steps: 8}); await p.mouse.up(); await p.waitForTimeout(1200);
  await p.evaluate(() => { document.querySelector('[data-test-id=chat-message-user], .chat-message-from-user')?.scrollIntoView({block: 'start'}); });
  await p.waitForTimeout(800);
  await shot(p, 's1_chat_answer', {bot: '[data-test-id=chat-message-bot], .chat-message-from-bot', user: '[data-test-id=chat-message-user], .chat-message-from-user'});
  await peek(p, 'answer1c');
  process.exit(0);
})();
