import {open} from './v06_util';
import {n8n} from './cdp';
import {prep, node} from './snap';
(async () => {
  const {p} = await open();
  const id = p.url().match(/workflow\/([^/?]+)/)![1];
  const wf: any = (await n8n(p, 'GET', `/workflows/${id}`) as any).json.data;
  const ag = wf.nodes.find((n: any) => n.name === 'AI Agent');
  console.log('system message starts:', JSON.stringify((ag.parameters.options?.systemMessage || '').slice(0, 40)), 'len', (ag.parameters.options?.systemMessage || '').length);
  await p.reload({waitUntil: 'domcontentloaded'}); await p.locator(node('get_supplier_info')).waitFor({timeout: 90000}); await prep(p); await p.waitForTimeout(1500);
  await p.locator(node('get_supplier_info')).dblclick(); await p.waitForTimeout(4000);
  await p.getByRole('button', {name: /Execute step/}).first().click(); await p.waitForTimeout(12000);
  const out = await p.evaluate(() => document.querySelector('[data-test-id=output-panel]')?.textContent?.replace(/\s+/g, ' ').slice(0, 600));
  console.log('OUTPUT:', out);
  await p.screenshot({path: 'work/v06/peek_toolexec.png', scale: 'css'});
  process.exit(0);
})();
