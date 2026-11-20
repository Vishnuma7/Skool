import {connect, pageFor, n8n} from './cdp';
(async () => {
  const b = await connect();
  const p = await pageFor(b, 'n8n.cloud');
  console.log('url', p.url());
  const s = await n8n(p, 'GET', '/settings');
  console.log('version', (s as any).json?.data?.versionCli, 'status', s.status);
  const w = await n8n(p, 'GET', '/workflows');
  console.log('workflows', w.status, JSON.stringify((w as any).json?.data?.map?.((x: any) => x.name) ?? w).slice(0, 300));
  const c = await n8n(p, 'GET', '/credentials');
  console.log('creds', c.status, JSON.stringify((c as any).json?.data?.map?.((x: any) => [x.name, x.type]) ?? c).slice(0, 300));
  const pr = await n8n(p, 'GET', '/projects/personal');
  console.log('project', pr.status, JSON.stringify((pr as any).json?.data?.id ?? pr).slice(0, 200));
  await b.close();
})();
