import {connect} from './cdp';
import {prep, shot, node, byText} from './snap';
const BASE = 'https://brightleaf.app.n8n.cloud/workflow/';
const STOCKY = 'kY7MgLLzqM76D3lP', OLD = 'CWCYjeR8eNwIMJIt';
const STOCKY_NODES = ['Every Monday 6:55 AM', 'Get Products (Odoo)', 'Stocky (AI Agent)', 'Claude (via OpenRouter)', 'Weather (Open-Meteo)',
  'Exchange Rates (Frankfurter)', 'Holidays (Nager.Date)', 'Log Decision (Google Sheets)', 'Ask Sarah (Gmail)', 'Create RFQs (Odoo)'];
const OLD_NODES = ['Every Morning 7 AM', 'Get Stock Levels (Odoo)', 'IF', 'Send Low Stock Email (Gmail)'];
const fit = async (p: any, steps = 2) => {
  const b = p.locator('[data-test-id=zoom-to-fit], [data-test-id=canvas-zoom-to-fit]').first();
  if (await b.isVisible().catch(() => false)) await b.click(); else await p.keyboard.press('1');
  await p.waitForTimeout(500);
  const z = p.locator('[data-test-id=zoom-in-button]').first();
  if (await z.isVisible().catch(() => false)) for (let i = 0; i < steps; i++) { await z.click(); await p.waitForTimeout(300); }
  await p.mouse.move(1900, 1000); await p.waitForTimeout(900);
};
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages().find((x) => x.url().includes('n8n.cloud'))!;
    // ---- Stocky canvas
    await p.goto(BASE + STOCKY); await p.waitForSelector(node('Stocky (AI Agent)'), {timeout: 30000});
    await prep(p); await p.waitForTimeout(1500); await fit(p, 1);
    await shot(p, 'n8n_stocky', Object.fromEntries([...STOCKY_NODES.map((n) => [n, node(n)]), ['execute', byText('Execute', 'button')]]));
    // ---- AI Agent panel (system message)
    await p.locator(node('Stocky (AI Agent)')).dblclick(); await p.waitForTimeout(2500);
    await shot(p, 'n8n_agent_panel', {
      sysmsg: `js:[...document.querySelectorAll('textarea, [contenteditable=true], .cm-content')].find(e => (e.value||e.textContent||'').includes('You are Stocky'))`,
      sysmsgLabel: byText('System Message', 'label, span, div'),
      panel: '[data-test-id=ndv]',
    });
    await p.keyboard.press('Escape'); await p.waitForTimeout(800);
    // ---- Old-style alert canvas
    await p.goto(BASE + OLD); await p.waitForSelector(node('IF'), {timeout: 30000});
    await prep(p); await p.waitForTimeout(1500); await fit(p);
    await shot(p, 'n8n_old', Object.fromEntries(OLD_NODES.map((n) => [n, node(n)])));
    await p.locator(node('IF')).dblclick(); await p.waitForTimeout(2500);
    await shot(p, 'n8n_old_if', {
      condition: '[data-test-id=condition], [data-test-id=filter-condition]',
      conditions: '[data-test-id=filter-conditions], [data-test-id=conditions]',
      panel: '[data-test-id=ndv]',
    });
    await p.keyboard.press('Escape');
  } finally { await b.close(); }
})();
