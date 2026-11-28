import {open, shot, peek} from './v06_util';
import {prep, byText} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  await shot(p, 's1_trigger_list', {chat: byText('On chat message'), panel: '[data-test-id=node-creator]'});
  await p.getByText('On chat message', {exact: true}).first().click(); await p.waitForTimeout(4000);
  await peek(p, 'after_chat');
  console.log(await p.evaluate(() => [...document.querySelectorAll('[data-test-id]')].map(e => e.getAttribute('data-test-id')).filter((v, i, a) => a.indexOf(v) === i && /ndv|chat|node|panel|close/i.test(v!)).join(' ')));
  process.exit(0);
})();
