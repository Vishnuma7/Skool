import {open} from './v06_util';
(async () => {
  const {p} = await open();
  await p.click('[data-test-id=node-execute-button]'); await p.waitForTimeout(15000);
  const out = await p.evaluate(() => document.querySelector('[data-test-id=output-panel]')?.textContent?.replace(/\s+/g, ' ').slice(0, 700));
  console.log('OUTPUT:', out);
  await p.screenshot({path: 'work/v06/peek_toolexec.png', scale: 'css'});
  process.exit(0);
})();
