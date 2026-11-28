// Configure Stocky v1's Odoo tools through n8n's REST API (same values the script types in the UI).
import {open} from './v06_util';
import {n8n} from './cdp';
const rl = (v: string) => ({__rl: true, mode: 'id', value: v});
export const TOOLS: Record<string, {model: string; fields: string[]; desc: string}> = {
  get_products_and_stock: {model: 'product.product', fields: ['default_code', 'name', 'qty_available', 'standard_price'],
    desc: 'Returns every product with its SKU (default_code), name, quantity on hand (qty_available) and unit cost (standard_price). Use this for any question about stock levels.'},
  get_reorder_rules: {model: 'stock.warehouse.orderpoint', fields: ['product_id', 'product_min_qty', 'product_max_qty'],
    desc: 'Returns the reorder point (product_min_qty) and maximum quantity for each product. Use this to decide whether stock is running low.'},
  get_supplier_info: {model: 'product.supplierinfo', fields: ['partner_id', 'product_tmpl_id', 'price', 'min_qty', 'delay'],
    desc: 'Returns the vendor (partner_id), purchase price, minimum order quantity and delivery lead time in days (delay) for each product. Use this for questions about suppliers, prices and lead times.'},
};
const params = (k: string) => ({descriptionType: 'manual', toolDescription: TOOLS[k].desc, resource: 'custom', customResource: rl(TOOLS[k].model),
  operation: 'getAll', returnAll: true, options: {fieldsList: TOOLS[k].fields.join(',')}});
(async () => {
  const which = process.argv.slice(2); // tool names to ensure exist
  const {p} = await open();
  const id = p.url().match(/workflow\/([^/?]+)/)![1];
  const wf: any = (await n8n(p, 'GET', `/workflows/${id}`) as any).json.data;
  const first = wf.nodes.find((n: any) => n.type === 'n8n-nodes-base.odooTool');
  const rename = (from: string, to: string) => { const n = wf.nodes.find((x: any) => x.name === from); n.name = to; if (wf.connections[from]) { wf.connections[to] = wf.connections[from]; delete wf.connections[from]; } };
  if (first && first.name !== 'get_products_and_stock' && !wf.nodes.find((n: any) => n.name === 'get_products_and_stock')) rename(first.name, 'get_products_and_stock');
  which.forEach((k, i) => {
    let n = wf.nodes.find((x: any) => x.name === k);
    if (!n) { const base = wf.nodes.find((x: any) => x.name === 'get_products_and_stock'); n = {...JSON.parse(JSON.stringify(base)), id: crypto.randomUUID(), name: k, position: [base.position[0] + 160 * i, base.position[1]]};
      wf.nodes.push(n); wf.connections[k] = {ai_tool: [[{node: 'AI Agent', type: 'ai_tool', index: 0}]]}; }
    n.parameters = params(k);
  });
  const r: any = await n8n(p, 'PATCH', `/workflows/${id}`, {name: wf.name, nodes: wf.nodes, connections: wf.connections, settings: wf.settings, versionId: wf.versionId});
  console.log('patch', r.status, r.json?.message ?? '', (r.json?.data?.nodes || []).map((n: any) => n.name).join(', '));
  const mem = wf.nodes.find((n: any) => n.name === 'Simple Memory'); console.log('memory params', JSON.stringify(mem.parameters));
  process.exit(0);
})();
