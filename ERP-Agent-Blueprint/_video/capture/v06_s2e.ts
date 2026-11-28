import {open} from './v06_util';
import {n8n} from './cdp';
(async () => {
  const {p} = await open();
  await p.click('[data-test-id=ndv-close-button]').catch(() => {}); await p.waitForTimeout(1000);
  await p.keyboard.press('Meta+s'); await p.waitForTimeout(5000);
  const id = p.url().match(/workflow\/([^/?]+)/)![1];
  const w: any = await n8n(p, 'GET', `/workflows/${id}`);
  const wf = w.json.data;
  console.log('id', id, 'nodes', wf.nodes.map((n: any) => `${n.name} | ${n.type} v${n.typeVersion}`));
  const t = wf.nodes.find((n: any) => n.type.includes('odoo'));
  console.log(JSON.stringify(t, null, 1));
  console.log(JSON.stringify(wf.connections, null, 1).slice(0, 1500));
  process.exit(0);
})();
