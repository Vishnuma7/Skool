import {open} from './v06_util';
import {n8n} from './cdp';
(async () => {
  const {p} = await open();
  const id = p.url().match(/workflow\/([^/?]+)/)![1];
  const ex: any = await n8n(p, 'GET', `/executions?filter=${encodeURIComponent(JSON.stringify({workflowId: id}))}&limit=3`);
  const list = ex.json.data.results ?? ex.json.data;
  for (const e of list.slice(0, 2)) console.log('exec', e.id, e.status, e.startedAt);
  const d: any = await n8n(p, 'GET', `/executions/${list[0].id}`);
  const raw = d.json.data.data; const s = typeof raw === 'string' ? raw : JSON.stringify(raw);
  let k = 0, n = 0; while ((k = s.indexOf('rror', k + 1)) > 0 && n < 8) { console.log('...', s.slice(Math.max(0, k - 150), k + 250).replace(/\\n/g, ' ')); n++; k += 200; }
  const last = s.lastIndexOf('output'); console.log('LAST', s.slice(Math.max(0, s.length - 1500)));
  process.exit(0);
})();
