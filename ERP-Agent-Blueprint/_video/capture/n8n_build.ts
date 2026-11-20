import fs from 'fs';
import {connect, pageFor, n8n} from './cdp';
const env = Object.fromEntries(fs.readFileSync('.env', 'utf8').split('\n').filter((l) => l.includes('=')).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1)]));

export const SYSTEM_MESSAGE = "You are Stocky, BrightLeaf Supplies' inventory and procurement assistant. Check every product against its reorder point. For suppliers outside the US, consider weather, currency and holidays. Never send a purchase order without Sarah's approval. Explain your reasoning in plain English.";

const rl = (value: string, name?: string) => ({__rl: true, mode: 'id', value, ...(name ? {cachedResultName: name} : {})});
const odoo = (name: string, pos: [number, number], model: string, op: string, cred: any, extra: any = {}) => ({
  name, type: 'n8n-nodes-base.odoo', typeVersion: 2, position: pos,
  parameters: {authentication: 'odooApiKeyApi', resource: 'custom', customResource: rl(model, model), operation: op, ...extra},
  credentials: {odooApiKeyApi: cred},
});

(async () => {
  const b = await connect();
  try {
    const p = await pageFor(b, 'n8n.cloud');
    const proj = ((await n8n(p, 'GET', '/projects/personal')) as any).json.data.id;
    const existing = ((await n8n(p, 'GET', '/credentials')) as any).json.data as any[];
    const cred = async (name: string, type: string, data: any) => {
      const e = existing.find((c) => c.name === name);
      if (e) return {id: e.id, name};
      const r: any = await n8n(p, 'POST', '/credentials', {name, type, data, projectId: proj});
      if (!r.json?.data?.id) throw new Error('cred ' + name + ' ' + JSON.stringify(r).slice(0, 300));
      return {id: r.json.data.id, name};
    };
    const cOdoo = await cred('BrightLeaf Odoo', 'odooApiKeyApi', {url: env.ODOO_URL, db: env.ODOO_DB, apiKey: env.ODOO_API_KEY});
    const cOR = await cred('OpenRouter', 'openRouterApi', {apiKey: env.OPENROUTER_API_KEY, url: 'https://openrouter.ai/api/v1'});
    const cGmail = await cred("Sarah's Gmail", 'gmailOAuth2', {});
    const cSheets = await cred('BrightLeaf Google Sheets', 'googleSheetsOAuth2Api', {});

    const schedule = (name: string, pos: [number, number], rule: any) => ({name, type: 'n8n-nodes-base.scheduleTrigger', typeVersion: 1.2, position: pos, parameters: {rule: {interval: [rule]}}});
    const httpTool = (name: string, pos: [number, number], desc: string, url: string) => ({
      name, type: 'n8n-nodes-base.httpRequestTool', typeVersion: 4.5, position: pos, parameters: {toolDescription: desc, url, options: {}},
    });

    // ---------------- Stocky ----------------
    const stocky = {
      name: 'Stocky',
      nodes: [
        schedule('Every Monday 6:55 AM', [0, 0], {field: 'weeks', triggerAtDay: [1], triggerAtHour: 6, triggerAtMinute: 55}),
        odoo('Get Products (Odoo)', [240, 0], 'product.product', 'getAll', cOdoo, {returnAll: true, options: {fieldsList: ['default_code', 'name', 'qty_available', 'seller_ids']}}),
        {
          name: 'Stocky (AI Agent)', type: '@n8n/n8n-nodes-langchain.agent', typeVersion: 3.1, position: [520, 0],
          parameters: {
            promptType: 'define',
            text: "=Here are this week's products from Odoo, with stock on hand and reorder points:\n{{ JSON.stringify($input.all().map(i => i.json)) }}\n\nCheck every product, flag anything below its reorder point, suggest an order quantity (reorder point x 2 minus on hand) and explain any supplier risks.",
            options: {systemMessage: SYSTEM_MESSAGE},
          },
        },
        {name: 'Claude (via OpenRouter)', type: '@n8n/n8n-nodes-langchain.lmChatOpenRouter', typeVersion: 1, position: [400, 240],
          parameters: {model: 'anthropic/claude-sonnet-5.5', options: {}}, credentials: {openRouterApi: cOR}},
        httpTool('Weather (Open-Meteo)', [560, 240], 'Get the 7-day weather forecast for a supplier city. Provide latitude and longitude.',
          "=https://api.open-meteo.com/v1/forecast?latitude={{ $fromAI('latitude') }}&longitude={{ $fromAI('longitude') }}&daily=precipitation_sum,weather_code,wind_speed_10m_max&forecast_days=7"),
        httpTool('Exchange Rates (Frankfurter)', [700, 240], 'Get the latest USD exchange rates for supplier currencies (CNY, MXN, AED).',
          'https://api.frankfurter.dev/v1/latest?from=USD&to=CNY,MXN,AED'),
        httpTool('Holidays (Nager.Date)', [840, 240], 'Get public holidays for a country. Provide the 2-letter country code (US, CN, MX).',
          "=https://date.nager.at/api/v3/PublicHolidays/2026/{{ $fromAI('countryCode') }}"),
        {name: 'Log Decision (Google Sheets)', type: 'n8n-nodes-base.googleSheets', typeVersion: 4.7, position: [900, 0],
          parameters: {operation: 'append',
            documentId: {__rl: true, mode: 'list', value: '1StockyDecisionLogBrightLeaf', cachedResultName: 'Stocky_Decision_Log', cachedResultUrl: 'https://docs.google.com/spreadsheets/d/1StockyDecisionLogBrightLeaf/edit'},
            sheetName: {__rl: true, mode: 'list', value: 'gid=0', cachedResultName: 'Log', cachedResultUrl: 'https://docs.google.com/spreadsheets/d/1StockyDecisionLogBrightLeaf/edit#gid=0'},
            columns: {mappingMode: 'autoMapInputData', value: {}, matchingColumns: [], schema: [], attemptToConvertTypes: false, convertFieldsToString: false}, options: {}},
          credentials: {googleSheetsOAuth2Api: cSheets}},
        {name: 'Ask Sarah (Gmail)', type: 'n8n-nodes-base.gmail', typeVersion: 2.2, position: [1140, 0],
          parameters: {operation: 'sendAndWait', sendTo: 'sarah.mitchell@brightleafsupplies.com', subject: 'Stocky: Monday Stock Check - 4 items need attention',
            message: '={{ $json.output }}', approvalOptions: {values: {approvalType: 'double'}}, options: {}},
          credentials: {gmailOAuth2: cGmail}, webhookId: 'stocky-approval'},
        odoo('Create RFQs (Odoo)', [1380, 0], 'purchase.order', 'create', cOdoo, {
          fieldsToSend: {mappingMode: 'defineBelow', value: {partner_id: '={{ $json.partner_id }}'}, matchingColumns: [], schema: []}}),
      ],
      connections: {
        'Every Monday 6:55 AM': {main: [[{node: 'Get Products (Odoo)', type: 'main', index: 0}]]},
        'Get Products (Odoo)': {main: [[{node: 'Stocky (AI Agent)', type: 'main', index: 0}]]},
        'Stocky (AI Agent)': {main: [[{node: 'Log Decision (Google Sheets)', type: 'main', index: 0}]]},
        'Log Decision (Google Sheets)': {main: [[{node: 'Ask Sarah (Gmail)', type: 'main', index: 0}]]},
        'Ask Sarah (Gmail)': {main: [[{node: 'Create RFQs (Odoo)', type: 'main', index: 0}]]},
        'Claude (via OpenRouter)': {ai_languageModel: [[{node: 'Stocky (AI Agent)', type: 'ai_languageModel', index: 0}]]},
        'Weather (Open-Meteo)': {ai_tool: [[{node: 'Stocky (AI Agent)', type: 'ai_tool', index: 0}]]},
        'Exchange Rates (Frankfurter)': {ai_tool: [[{node: 'Stocky (AI Agent)', type: 'ai_tool', index: 0}]]},
        'Holidays (Nager.Date)': {ai_tool: [[{node: 'Stocky (AI Agent)', type: 'ai_tool', index: 0}]]},
      },
      settings: {executionOrder: 'v1'},
    };

    // ---------------- Old-style alert ----------------
    const old = {
      name: 'Old-style alert',
      nodes: [
        schedule('Every Morning 7 AM', [0, 0], {field: 'days', triggerAtHour: 7}),
        odoo('Get Stock Levels (Odoo)', [260, 0], 'stock.warehouse.orderpoint', 'getAll', cOdoo, {returnAll: true, options: {fieldsList: ['product_id', 'qty_on_hand', 'product_min_qty']}}),
        {name: 'IF', type: 'n8n-nodes-base.if', typeVersion: 2.2, position: [520, 0], parameters: {
          conditions: {options: {caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2},
            conditions: [{id: 'c1', leftValue: '={{ $json.qty_on_hand }}', rightValue: '={{ $json.product_min_qty }}', operator: {type: 'number', operation: 'lt'}}],
            combinator: 'and'},
          looseTypeValidation: true, options: {}}},
        {name: 'Send Low Stock Email (Gmail)', type: 'n8n-nodes-base.gmail', typeVersion: 2.2, position: [800, -100],
          parameters: {sendTo: 'sarah.mitchell@brightleafsupplies.com', subject: '=Low stock: {{ $json.product_id[1] }}', message: '=On hand {{ $json.qty_on_hand }}, reorder point {{ $json.product_min_qty }}.', options: {}},
          credentials: {gmailOAuth2: cGmail}, webhookId: 'old-alert'},
      ],
      connections: {
        'Every Morning 7 AM': {main: [[{node: 'Get Stock Levels (Odoo)', type: 'main', index: 0}]]},
        'Get Stock Levels (Odoo)': {main: [[{node: 'IF', type: 'main', index: 0}]]},
        'IF': {main: [[{node: 'Send Low Stock Email (Gmail)', type: 'main', index: 0}], []]},
      },
      settings: {executionOrder: 'v1'},
    };

    const wfs = ((await n8n(p, 'GET', '/workflows')) as any).json.data as any[];
    for (const wf of [old, stocky]) {
      const e = wfs.find((w) => w.name === wf.name);
      const r: any = e
        ? await n8n(p, 'PATCH', `/workflows/${e.id}`, {...wf, versionId: e.versionId})
        : await n8n(p, 'POST', '/workflows', {...wf, projectId: proj});
      console.log(wf.name, r.status, r.json?.data?.id ?? JSON.stringify(r).slice(0, 400));
    }
  } finally { await b.close(); }
})();
