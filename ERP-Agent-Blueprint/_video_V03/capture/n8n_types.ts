import {connect, pageFor} from './cdp';
(async () => {
  const b = await connect();
  const p = await pageFor(b, 'n8n.cloud');
  const want = ['n8n-nodes-base.scheduleTrigger','n8n-nodes-base.odoo','@n8n/n8n-nodes-langchain.agent','@n8n/n8n-nodes-langchain.lmChatOpenRouter',
    'n8n-nodes-base.httpRequestTool','n8n-nodes-base.googleSheets','n8n-nodes-base.gmail','n8n-nodes-base.if','n8n-nodes-base.googleSheetsTool'];
  const res = await p.evaluate(async (want) => {
    const r = await fetch('/types/nodes.json'); const all = await r.json();
    return all.filter((n: any) => want.includes(n.name)).map((n: any) => ({name: n.name, version: n.version, defaultVersion: n.defaultVersion, creds: (n.credentials||[]).map((c: any)=>c.name)}));
  }, want);
  console.log(JSON.stringify(res, null, 0));
})();
