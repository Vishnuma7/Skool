import {open, shot, peek} from './v06_util';
import {prep, byText} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  const off = await p.evaluate(() => { const e = [...document.querySelectorAll('*')].find(x => x.children.length < 3 && x.textContent?.trim() === 'Offline'); return e ? (e.closest('[data-test-id]')?.getAttribute('data-test-id') || e.className) : null; });
  console.log('offline el', off);
  await p.click('[data-test-id=inline-edit-preview]'); await p.waitForTimeout(500);
  await shot(p, 's1_name_edit', {name: '[data-test-id=inline-edit-input]'});
  await p.keyboard.press('Meta+A'); await p.keyboard.type('Stocky v1 – Reads the ERP', {delay: 40}); await p.waitForTimeout(400);
  await shot(p, 's1_name_typed', {name: '[data-test-id=inline-edit-input]'});
  await p.keyboard.press('Enter'); await p.waitForTimeout(2500);
  await shot(p, 's1_named', {name: '[data-test-id=workflow-name-input]', first: '[data-test-id=canvas-add-first-step-button]'});
  await p.click('[data-test-id=canvas-add-first-step-button]'); await p.waitForTimeout(2500);
  await shot(p, 's1_trigger_list', {chat: byText('On chat message'), panel: '[data-test-id=node-creator]'});
  await peek(p, 'trig');
  process.exit(0);
})();
