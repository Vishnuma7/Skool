import {open, shot, peek} from './v06_util';
import {prep, byText, node} from './snap';
(async () => {
  const {p} = await open(); await prep(p);
  await p.locator(node('AI Agent')).dblclick(); await p.waitForTimeout(5000);
  await p.getByText('Add Option', {exact: true}).first().click(); await p.waitForTimeout(1500);
  await shot(p, 's3_add_option', {sys: byText('System Message', 'li *, [role=option] *, li'), btn: byText('Add Option', 'button')}, true);
  await peek(p, 'addopt');
  await p.getByText('System Message', {exact: true}).first().click(); await p.waitForTimeout(2000);
  await shot(p, 's3_sys_default', {sys: byText('System Message', 'label, span, div')});
  await peek(p, 'sysdef');
  process.exit(0);
})();
