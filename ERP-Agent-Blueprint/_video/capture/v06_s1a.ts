import {open, goto, shot, peek} from './v06_util';
import {byText} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open();
  await goto(p, 'https://brightleaf.app.n8n.cloud/home/workflows', 'V05 Hello World');
  await shot(p, 's1_overview', {create: byText('Create workflow', 'button'), list: byText('V05 Hello World')});
  await peek(p, 'overview');
  process.exit(0);
})();
