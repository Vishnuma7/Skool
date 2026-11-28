import {connect, pageFor, n8n} from './cdp';
(async () => {
  const b = await connect();
  const p = await pageFor(b, 'n8n.cloud');
  const cr: any = await n8n(p, 'GET', '/credentials');
  for (const c of cr.json.data) console.log('CRED', c.id, c.name, c.type);
  const odoo = cr.json.data.find((c: any) => c.name === 'BrightLeaf Odoo');
  const d: any = await n8n(p, 'GET', `/credentials/${odoo.id}?includeData=true`);
  console.log('odoo data keys', Object.keys(d.json.data.data || {}));
  const an = cr.json.data.find((c: any) => c.type === 'anthropicApi');
  const d2: any = await n8n(p, 'GET', `/credentials/${an.id}?includeData=true`);
  console.log('anthropic data keys', Object.keys(d2.json.data.data || {}));
  const wf: any = await n8n(p, 'GET', '/workflows');
  for (const w of wf.json.data) console.log('WF', w.id, w.name, w.active);
  process.exit(0);
})();
