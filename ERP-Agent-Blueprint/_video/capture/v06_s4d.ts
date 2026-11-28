import {open, shot, peek} from './v06_util';
import {prep} from './snap';
import {setPanel, BOT} from './v06_chat';
(async () => {
  const {p} = await open(); await prep(p);
  
  for (const [i, tag] of ['s4_q1', 's4_q2', 's4_q3'].entries()) {
    await p.evaluate((i) => { const u = document.querySelectorAll('[data-test-id=chat-message-user], .chat-message-from-user'); u[i]?.scrollIntoView({block: 'start'}); }, i);
    await p.waitForTimeout(800);
    await shot(p, `${tag}_answer`, {user: `js:document.querySelectorAll('[data-test-id=chat-message-user], .chat-message-from-user')[${i}]`, bot: `js:document.querySelectorAll('${BOT}')[${i}]`});
    await peek(p, `${tag}_answer`);
  }
  process.exit(0);
})();
