// V04 Section 1, Odoo part, captured at the same 1280x720 viewport as the Sheets shots (readable at 1080p).
import {connect} from './cdp';
import {prepSheets, snapSheet, domRect, Rect} from './sheets';
const ODOO = 'https://brightleaf-supplies.odoo.com';
const F = (n: string) => `document.querySelector('.o_field_widget[name=${n}]')`;
const colU = (name: string) => `(() => { const els = [...document.querySelectorAll('th[data-name=${name}], td[name=${name}]')].filter(e => e.offsetParent); if (!els.length) return null;
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9; for (const e of els) { const r = e.getBoundingClientRect(); x0=Math.min(x0,r.left); y0=Math.min(y0,r.top); x1=Math.max(x1,r.right); y1=Math.max(y1,r.bottom); } return {x:x0,y:y0,w:x1-x0,h:y1-y0}; })()`;
const row = (sku: string) => `[...document.querySelectorAll('tr.o_data_row')].find(e => e.textContent.includes('${sku}'))`;
(async () => {
  const b = await connect();
  try {
    const ctx = b.contexts()[0];
    const p = ctx.pages().find((x) => x.url().includes('odoo.com')) ?? await ctx.newPage();
    await p.goto(`${ODOO}/odoo/action-stock.product_template_action_product`); await p.waitForTimeout(4500);
    if (p.url().includes('/login')) throw new Error('Odoo logged out');
    await prepSheets(p);
    await p.addStyleTag({content: '.o_database_expiration_panel,.database_expiration_panel{display:none!important}'});
    const kb = p.locator('.o_switch_view.o_kanban').first(); if (await kb.isVisible().catch(() => false)) { await kb.click(); await p.waitForTimeout(2500); }
    const R = async (m: Record<string, string>) => { const o: Record<string, Rect | null> = {}; for (const [k, e] of Object.entries(m)) o[k] = await (e.startsWith('(') ? p.evaluate(e) as Promise<Rect | null> : domRect(p, e)); return o; };
    await snapSheet(p, 's1_kanban', await R({breadcrumb: `document.querySelector('.o_breadcrumb')`, listIcon: `document.querySelector('.o_switch_view.o_list')`}));
    await p.locator('.o_switch_view.o_list').first().click(); await p.waitForTimeout(3000);
    await snapSheet(p, 's1_list', await R({listIcon: `document.querySelector('.o_switch_view.o_list')`, r1005: row('BL-1005'), r1003: row('BL-1003'),
      c_ref: colU('default_code'), c_name: colU('name'), c_price: colU('list_price'), c_cost: colU('standard_price'), c_qty: colU('qty_available')}));
    await p.locator('tr.o_data_row').filter({hasText: 'BL-1005'}).first().locator('td[name=name]').click(); await p.waitForTimeout(3000);
    console.log('form url', p.url());
    await snapSheet(p, 's1_form', await R({name: F('name'), price: F('list_price'), cost: F('standard_price')}));
    await p.locator('.o_field_widget[name=name] textarea, .o_field_widget[name=name] input').first().fill('PJ Wheels Set');
    await p.locator('.o_field_widget[name=standard_price] input').fill('39.00'); await p.locator('.o_field_widget[name=default_code] input').click(); await p.waitForTimeout(600);
    await snapSheet(p, 's1_form_edit', await R({name: F('name'), cost: F('standard_price')}));
    await p.locator('.o_form_button_cancel').first().click(); await p.waitForTimeout(1500);
  } catch (e) { console.error('ERR', e); process.exit(1); } finally { process.exit(0); }
})();
