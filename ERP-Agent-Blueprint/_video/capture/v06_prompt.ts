// Swap the AI Agent's system message (weak one-liner <-> full prompt) via REST.
import fs from 'fs';
import {open} from './v06_util';
import {n8n} from './cdp';
(async () => {
  const mode = process.argv[2];
  const msg = mode === 'weak' ? 'You are a helpful inventory assistant for BrightLeaf Supplies.' : fs.readFileSync('work/v06/system_prompt.txt', 'utf8').trim();
  const {p} = await open();
  const id = 'CnZDME5og3w9lC4Q';
  const wf: any = (await n8n(p, 'GET', `/workflows/${id}`) as any).json.data;
  const ag = wf.nodes.find((n: any) => n.name === 'AI Agent'); ag.parameters.options = {...(ag.parameters.options || {}), systemMessage: msg};
  const r: any = await n8n(p, 'PATCH', `/workflows/${id}`, {name: wf.name, nodes: wf.nodes, connections: wf.connections, settings: wf.settings, versionId: wf.versionId});
  console.log(mode, r.status);
  process.exit(0);
})();
