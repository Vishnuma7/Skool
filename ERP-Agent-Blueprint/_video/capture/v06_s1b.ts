import {open, shot, peek} from './v06_util';
import {prep, byText} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open();
  await p.getByRole('button', {name: 'Create workflow'}).first().click();
  await p.getByText('Add first step').first().waitFor({timeout: 90000});
  await prep(p); await p.waitForTimeout(2000);
  console.log('url', p.url());
  await shot(p, 's1_canvas_empty', {name: '[data-test-id=workflow-name-input], [data-test-id=inline-edit-preview]', first: byText('Add first step')});
  await peek(p, 'empty');
  const html = await p.evaluate(() => [...document.querySelectorAll('[data-test-id]')].map(e => e.getAttribute('data-test-id')).filter((v, i, a) => a.indexOf(v) === i).slice(0, 80).join(' '));
  console.log(html);
  process.exit(0);
})();
