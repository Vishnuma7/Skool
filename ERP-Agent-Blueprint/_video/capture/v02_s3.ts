import {connect} from './cdp';
import {execFileSync} from 'child_process';
import {prep, shot, byText} from './snap';
const ODOO = 'https://brightleaf-supplies.odoo.com';
const F = (n: string) => `.o_field_widget[name=${n}]`;
const statBtn = (re: string) => `js:[...document.querySelectorAll('.oe_stat_button, .o-form-buttonbox button')].find(e=>/${re}/.test(e.textContent))`;
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages()[0];
    const park = () => p.mouse.move(1900, 1070);
    // leave any half-filled form WITHOUT saving it, then clean leftovers
    for (const sel of ['.modal .btn-primary', '.modal button:has-text("Close")', '.o_form_button_cancel']) {
      const el = p.locator(sel).first(); if (await el.isVisible().catch(() => false)) { await el.click().catch(() => {}); await p.waitForTimeout(600); }
    }
    await p.goto(`${ODOO}/odoo`); await p.waitForTimeout(2500);
    execFileSync('python3', ['-I', 'odoo_clean_v02_draft.py'], {stdio: 'inherit'});
    await p.goto(`${ODOO}/odoo/action-stock.product_template_action_product`); await p.waitForTimeout(5000); await prep(p); await park();
    await shot(p, 'p_list', {newBtn: byText('New', 'button'), menuProducts: `js:[...document.querySelectorAll('.o_menu_sections > *')].find(e=>(e.textContent||'').trim()==='Products')`});
    await p.locator('button.o_list_button_add, button.o-kanban-button-new').first().click(); await p.waitForTimeout(3000);
    // start with Track Inventory OFF so the 'tick it' moment is visible
    const tog = p.locator(`${F('is_storable')} input`);
    if (await tog.isChecked()) { await p.locator(`${F('is_storable')} .form-check-input, ${F('is_storable')} label`).first().click(); await p.waitForTimeout(500); }
    await park();
    await shot(p, 'p_new', {name: F('name'), form: '.o_form_sheet'});
    await p.locator(`${F('name')} textarea, ${F('name')} input`).first().fill('Steel Hex Bolts M10 (box of 100)'); await p.waitForTimeout(400); await park();
    await shot(p, 'p_name', {name: F('name'), sale: F('sale_ok'), purchase: F('purchase_ok')});
    await p.locator(`${F('is_storable')} .form-check-input, ${F('is_storable')} label`).first().click(); await p.waitForTimeout(600); await park();
    await shot(p, 'p_type', {type: F('type'), storable: F('is_storable'), goods: byText('Goods', `${F('type')} label`)});
    await p.locator(`${F('list_price')} input`).fill('16.88');
    await p.locator(`${F('standard_price')} input`).fill('12.50');
    await p.locator(`${F('default_code')} input`).fill('BL-1001'); await p.waitForTimeout(500); await park();
    await shot(p, 'p_prices', {list: F('list_price'), cost: F('standard_price'), ref: F('default_code'), categ: F('categ_id')});
    await p.locator('.o_notebook .nav-link[name=purchase]').click(); await p.waitForTimeout(800);
    await p.locator(`${F("seller_ids")}`).getByRole("button", {name: "Add a line"}).first().click(); await p.waitForTimeout(1000);
    const vend = p.locator(`${F('seller_ids')} .o_data_row ${F('partner_id')} input`).first();
    await vend.fill('Apex Fasteners'); await p.waitForTimeout(1500); await park();
    await shot(p, 'p_vendor_create', {create: `js:[...document.querySelectorAll('.o-autocomplete--dropdown-item, .ui-menu-item')].find(e=>/Create/.test(e.textContent))`, vendors: F('seller_ids'), tab: '.o_notebook .nav-link[name=purchase]'});
    await p.locator('.o-autocomplete--dropdown-item, .ui-menu-item').filter({hasText: 'Create'}).first().click(); await p.waitForTimeout(1500);
    const row = p.locator(`${F('seller_ids')} .o_data_row`).first();
    const price = row.locator(`${F('price')} input`); if (await price.count()) await price.fill('12.50');
    const delay = row.locator(`${F('delay')} input`); if (await delay.count()) await delay.fill('7');
    await p.waitForTimeout(600); await park();
    await shot(p, 'p_vendor_line', {row: `${F('seller_ids')} .o_data_row`, priceCell: `${F('seller_ids')} .o_data_row ${F('price')}`, delayCell: `${F('seller_ids')} .o_data_row ${F('delay')}`,
      delayHead: byText('Lead Time', `${F('seller_ids')} th`)});
    await p.locator('.o_form_button_save').click(); await p.waitForTimeout(2500); await park();
    await shot(p, 'p_saved', {breadcrumb: '.o_breadcrumb', save: '.o_form_status_indicator, .o_form_button_save', onhand: statBtn('On Hand'), forecast: statBtn('Forecast'), inout: statBtn('In:'), buttons: '.o-form-buttonbox'});
    console.log('product url', p.url());
    // Contacts: Apex Fasteners
    await p.goto(`${ODOO}/odoo/contacts`); await p.waitForTimeout(4000); await prep(p); await park();
    await shot(p, 'c_list', {apex: `js:[...document.querySelectorAll('.o_kanban_record, tr.o_data_row')].find(e=>/Apex Fasteners/.test(e.textContent))`});
    await p.locator('.o_kanban_record, tr.o_data_row').filter({hasText: 'Apex Fasteners'}).first().click(); await p.waitForTimeout(3000);
    await p.locator(`${F('city')} input`).fill('Columbus');
    const country = p.locator(`${F('country_id')} input`); await country.fill('United States'); await p.waitForTimeout(1200);
    await p.locator('.o-autocomplete--dropdown-item').filter({hasText: /^United States$/}).first().click(); await p.waitForTimeout(800);
    const state = p.locator(`${F('state_id')} input`); await state.fill('Ohio'); await p.waitForTimeout(1200);
    await p.locator('.o-autocomplete--dropdown-item').filter({hasText: 'Ohio'}).first().click(); await p.waitForTimeout(800);
    await p.locator('.o_form_button_save').click(); await p.waitForTimeout(2000); await park();
    await shot(p, 'c_apex', {name: F('name'), city: F('city'), state: F('state_id'), country: F('country_id'), address: '.o_address_format'});
  } finally { await b.close(); }
})();
