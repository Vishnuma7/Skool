import {connect, pageFor} from './cdp';
const JS = `(async () => {
  const all = await (await fetch('/types/nodes.json')).json();
  const creds = await (await fetch('/types/credentials.json')).json();
  const pick = (name, v) => all.find((n) => n.name === name && (Array.isArray(n.version) ? n.version.includes(v) : n.version === v));
  const brief = (n) => n.properties.map((p) => p.name + ':' + p.type + (p.options ? '[' + p.options.map((o) => o.value ?? o.name).slice(0, 14).join('|') + ']' : '') + (p.displayOptions ? ' when ' + JSON.stringify(p.displayOptions.show || {}).slice(0, 100) : ''));
  return {
    odoo: brief(pick('n8n-nodes-base.odoo', 2)),
    cred: creds.filter((c) => ['odooApiKeyApi', 'openRouterApi', 'gmailOAuth2', 'googleSheetsOAuth2Api'].includes(c.name)).map((c) => [c.name, c.properties.map((p) => p.name)]),
  };
})()`;
(async () => {
  const b = await connect();
  try {
    const p = await pageFor(b, 'n8n.cloud');
    const res: any = await p.evaluate(JS);
    console.log(res.odoo.join('\n'));
    console.log(JSON.stringify(res.cred));
  } finally { await b.close(); }
})();
