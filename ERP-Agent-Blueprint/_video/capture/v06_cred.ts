import fs from 'fs';
import {connect, pageFor, n8n} from './cdp';
const env = Object.fromEntries(fs.readFileSync('.env', 'utf8').split('\n').filter((l) => l.includes('=')).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).replace(/^"|"$/g, '')]));
(async () => {
  const b = await connect(); const p = await pageFor(b, 'n8n.cloud');
  const cr: any = await n8n(p, 'GET', '/credentials');
  if (cr.json.data.find((c: any) => c.name === 'Odoo – BrightLeaf')) { console.log('exists'); process.exit(0); }
  const proj = ((await n8n(p, 'GET', '/projects/personal')) as any).json.data.id;
  const r: any = await n8n(p, 'POST', '/credentials', {name: 'Odoo – BrightLeaf', type: 'odooApiKeyApi', data: {url: env.ODOO_URL, db: env.ODOO_DB, apiKey: env.ODOO_API_KEY}, projectId: proj});
  console.log('created', r.status, r.json?.data?.id);
  process.exit(0);
})();
