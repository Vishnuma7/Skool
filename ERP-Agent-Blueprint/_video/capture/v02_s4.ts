import path from 'path';
import {connect} from './cdp';
import {prep, shot, byText} from './snap';
const ODOO = 'https://brightleaf-supplies.odoo.com';
const XLSX = path.resolve('../Video_02/V02_Activity_BrightLeaf_Product_Import.xlsx');
const F = (n: string) => `.o_field_widget[name=${n}]`;
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages()[0];
    const park = () => p.mouse.move(1900, 1070);
    await p.goto(`${ODOO}/odoo/action-stock.product_template_action_product?view_type=list`); await p.waitForTimeout(4500); await prep(p);
    const sw = p.locator('.o_switch_view.o_list').first(); if (await sw.isVisible().catch(() => false)) { await sw.click(); await p.waitForTimeout(1500); }
    await park();
    const gearSel = '.o_control_panel button.o_btn_circle';
    await shot(p, 'i_list', {gear: gearSel, title: '.o_breadcrumb'});
    await p.locator('.o_control_panel button.o_btn_circle').first().click(); await p.waitForTimeout(800); await park();
    await shot(p, 'i_gear', {item: `js:[...document.querySelectorAll('.o-dropdown--menu .dropdown-item, .dropdown-menu .dropdown-item')].find(e=>e.offsetParent && e.textContent.trim()==='Import')`, gear: gearSel});
    await p.locator('.o-dropdown--menu .dropdown-item, .dropdown-menu .dropdown-item').filter({hasText: /^\s*Import\s*$/}).first().click(); await p.waitForTimeout(2500); await park();
    await shot(p, 'i_upload', {upload: byText('Upload', 'button, label')});
    await p.locator('input[type=file]').first().setInputFiles(XLSX); await p.waitForTimeout(4000); await park();
    await shot(p, 'i_map', {
      table: '.o_import_data_content table, table.o_import_fields_table, .o_import_compatible_fields table, table',
      fileCol: byText('File Column', 'th, div, span'), odooCol: byText('Odoo Field', 'th, div, span'),
    });
    await p.getByRole('button', {name: 'Test'}).first().click(); await p.waitForTimeout(3500); await park();
    await shot(p, 'i_test', {banner: `js:[...document.querySelectorAll('.alert, .o_import_report, [role=alert]')].find(e=>e.offsetParent)`, test: byText('Test', 'button'), imp: byText('Import', 'button')});
    await p.getByRole('button', {name: 'Import', exact: true}).first().click(); await p.waitForTimeout(5000); await park();
    const sw2 = p.locator('.o_switch_view.o_list').first(); if (await sw2.isVisible().catch(() => false)) { await sw2.click(); await p.waitForTimeout(1500); }
    await park();
    await shot(p, 'i_done', {rows: '.o_list_table tbody', refHead: byText('Reference', '.o_list_table th'), pager: '.o_pager_value, .o_pager_counter'});
    // open BL-1005
    await p.locator('.o_list_table tbody tr.o_data_row').filter({hasText: 'BL-1005'}).first().click(); await p.waitForTimeout(3000); await park();
    await shot(p, 'i_1005', {type: F('type'), storable: F('is_storable'), cost: F('standard_price'), price: F('list_price'), ref: F('default_code'), name: F('name')});
    await p.goBack(); await p.waitForTimeout(2500);
    const sb = p.locator('.o_searchview_input').first(); await sb.click(); await sb.fill('BL-100'); await p.waitForTimeout(800); await p.keyboard.press('Enter'); await p.waitForTimeout(2500);
    await sb.fill('BL-100'); await p.waitForTimeout(900); await park();
    await shot(p, 'i_search', {search: '.o_searchview', rows: '.o_list_table tbody'});
    await p.keyboard.press('Escape');
  } finally { await b.close(); }
})();
