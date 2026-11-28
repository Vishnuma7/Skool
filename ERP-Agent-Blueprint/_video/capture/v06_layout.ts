import {open} from './v06_util';
import {n8n} from './cdp';
(async () => {
  const {p} = await open();
  const id = p.url().match(/workflow\/([^/?]+)/)![1];
  const wf: any = (await n8n(p, 'GET', `/workflows/${id}`) as any).json.data;
  const pos: Record<string, [number, number]> = {'When chat message received': [0, 0], 'AI Agent': [260, 0],
    'Anthropic Chat Model': [80, 240], 'Simple Memory': [280, 240], 'get_products_and_stock': [500, 240], 'get_reorder_rules': [720, 240], 'get_supplier_info': [940, 240]};
  for (const n of wf.nodes) if (pos[n.name]) n.position = pos[n.name];
  const r: any = await n8n(p, 'PATCH', `/workflows/${id}`, {name: wf.name, nodes: wf.nodes, connections: wf.connections, settings: wf.settings, versionId: wf.versionId});
  console.log('patch', r.status);
  process.exit(0);
})();
