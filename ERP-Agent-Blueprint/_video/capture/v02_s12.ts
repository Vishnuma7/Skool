import {connect} from './cdp';
import {execFileSync} from 'child_process';
import {prep, shot, byText} from './snap';
const ODOO = 'https://brightleaf-supplies.odoo.com';
const HIDE_IN = `(() => { for (const el of document.querySelectorAll('*')) { const t=(el.textContent||'').trim();
  if (t.length < 90 && /Rs \\/ month|Rs\\/month|for ALL apps|Gandhinagar|Business Show/.test(t)) {
    const box = el.closest('a, .o_event_banner, [class*=banner], [class*=event]') || el; box.style.visibility='hidden'; } }
  for (const el of document.querySelectorAll('a, div')) { const t=(el.textContent||''); if (/Register/.test(t) && /Dec 3/.test(t) && el.getBoundingClientRect().width > 500 && el.getBoundingClientRect().width < 1200) { el.style.visibility='hidden'; } }
  for (const img of document.querySelectorAll('img, svg')) { const r = img.getBoundingClientRect(); if (r.x > 1100 && r.y > 250 && r.y < 420 && r.width < 400) img.style.visibility='hidden'; } })()`;
const KEEP_APPS = `(() => { const keep = ['Discuss','Sales','Invoicing','Purchase','Inventory','Contacts','Apps','Settings'];
  for (const a of document.querySelectorAll('.o_app')) { if (!keep.includes((a.textContent||'').trim())) (a.closest('.o_draggable')||a).style.setProperty('display','none','important'); }
  for (const d of document.querySelectorAll('.o_apps > *')) { const cap = (d.querySelector('.o_caption')?.textContent || '').trim(); if (!keep.includes(cap)) d.style.setProperty('display','none','important'); }
  const stray = document.elementFromPoint(605, 470);
  if (stray && stray.closest('.o_home_menu') && !stray.classList.contains('o_home_menu')) { const r = stray.getBoundingClientRect(); if (r.width < 300) (stray.closest('.o_draggable') || stray).style.setProperty('visibility','hidden','important'); }
  const hm = document.querySelector('.o_home_menu'); if (hm) for (const el of hm.querySelectorAll('img, svg, .o_home_menu_logo, [class*=logo]')) { if (!el.closest('.o_app')) el.style.setProperty('visibility','hidden','important'); } })()`;
const appIcon = (name: string) => `js:[...document.querySelectorAll('.o_app, .o_home_menu a, a.o_app')].find(e => (e.textContent||'').trim() === ${JSON.stringify(name)})`;
(async () => {
  const b = await connect();
  try {
    const ctx = b.contexts()[0];
    const p = ctx.pages()[0];
    // ---------------- odoo.com
    await p.goto('https://www.odoo.com/'); await p.waitForTimeout(4000); await prep(p); await p.evaluate(HIDE_IN); await p.mouse.move(1900, 1070);
    await shot(p, 'com_home', {start: byText("Start now - It's free", 'a')});
    await p.goto('https://www.odoo.com/trial'); await p.waitForTimeout(4000); await prep(p); await p.mouse.move(1900, 1070);
    const card = (t: string) => `js:[...document.querySelectorAll('label, a, div')].filter(e => e.offsetParent && (e.textContent||'').trim() === ${JSON.stringify(t)}).map(e => e.closest('label') || e.parentElement).pop()`;
    await shot(p, 'com_trial_1', {sales: card('Sales')});
    await p.getByText('Sales', {exact: true}).last().click(); await p.waitForTimeout(700); await p.mouse.move(1900, 1070);
    await shot(p, 'com_trial_2', {sales: card('Sales')});
    await p.getByText('Inventory', {exact: true}).last().scrollIntoViewIfNeeded();
    await p.evaluate(`window.scrollBy(0, 250)`); await p.waitForTimeout(500);
    await p.getByText('Inventory', {exact: true}).last().click(); await p.waitForTimeout(500);
    await p.getByText('Purchase', {exact: true}).last().click(); await p.waitForTimeout(800); await p.mouse.move(1900, 1070);
    await shot(p, 'com_trial_3', {inventory: card('Inventory'), purchase: card('Purchase'), cont: byText('Continue', 'button, a'), selected: byText('Apps selected', 'div, h4, h5, span')});
    await p.getByText('Continue', {exact: true}).click(); await p.waitForTimeout(3500); await prep(p); await p.mouse.move(1900, 1070);
    await shot(p, 'com_form_1', {name: '#username', start: byText('Start Now', 'button')});
    await p.fill('#username', 'Sarah Mitchell'); await p.fill('#company-name', 'BrightLeaf Supplies');
    await p.fill('#email', 'sarah.mitchell@brightleafsupplies.com'); await p.fill('#phone', '+1 614 555 0142');
    await p.selectOption('#country-id', {label: 'United States'});
    await p.selectOption('select[name=lang]', {label: 'English (US)'}).catch(() => {});
    await p.selectOption('select[name=company_size]', {label: '20 - 50 employees'});
    await p.mouse.move(1900, 1070); await p.waitForTimeout(500);
    await p.evaluate(`(() => { for (const el of document.querySelectorAll('*')) { if (el.children.length < 6 && /\\.odoo\\.com/.test(el.textContent||'') && (el.textContent||'').length < 60 && el.offsetParent) { (el.closest('.form-group, .mb-3, div') || el).style.display='none'; } } })()`);
    await shot(p, 'com_form_2', {name: '#username', company: '#company-name', email: '#email', country: '#country-id', size: 'select[name=company_size]', start: byText('Start Now', 'button')});
    // ---------------- Odoo database
    await p.goto(`${ODOO}/odoo`); await p.waitForTimeout(5000); await prep(p); await p.evaluate(KEEP_APPS); await p.mouse.move(1900, 1070);
    await shot(p, 'odoo_home', Object.fromEntries(['Discuss', 'Sales', 'Invoicing', 'Purchase', 'Inventory', 'Contacts', 'Apps', 'Settings'].map((n) => [n, appIcon(n)])));
    await p.goto(`${ODOO}/odoo/settings`); await p.waitForTimeout(5000); await prep(p);
    const search = p.locator('.o_searchview_input, input[placeholder*="Search"]').first();
    await search.click(); await search.fill('currency'); await p.waitForTimeout(2500); await p.mouse.move(1900, 1070);
    await shot(p, 'odoo_settings_currency', {
      currency: `js:[...document.querySelectorAll('.o_setting_box, .o_setting_container .o_setting_box, div.o_setting_box')].find(e=>/Main Currency|Currenc/.test(e.textContent))`,
      field: '.o_field_widget[name=currency_id]',
      save: byText('Save', 'button'), search: '.o_searchview_input',
    });
    await p.goto(`${ODOO}/odoo/inventory`); await p.waitForTimeout(5000); await prep(p); await p.mouse.move(1900, 1070);
    const menu = (t: string) => `js:[...document.querySelectorAll('.o_menu_sections > *')].find(e=>(e.textContent||'').trim()===${JSON.stringify(t)})`;
    await shot(p, 'odoo_inventory', {
      receipts: `js:[...document.querySelectorAll('.o_kanban_record')].find(e=>/Receipts/.test(e.textContent))`,
      delivery: `js:[...document.querySelectorAll('.o_kanban_record')].find(e=>/Delivery/.test(e.textContent))`,
      Overview: menu('Overview'), Operations: menu('Operations'), Products: menu('Products'), Reporting: menu('Reporting'), Configuration: menu('Configuration'),
      menuBar: '.o_menu_sections',
    });
    await p.goto(`${ODOO}/odoo/purchase`); await p.waitForTimeout(5000); await prep(p); await p.mouse.move(1900, 1070);
    await shot(p, 'odoo_purchase', {title: '.o_breadcrumb, .o_last_breadcrumb_item'});
    await p.goto(`${ODOO}/odoo/sales`); await p.waitForTimeout(5000); await prep(p); await p.mouse.move(1900, 1070);
    await shot(p, 'odoo_sales', {title: '.o_breadcrumb, .o_last_breadcrumb_item'});
    await p.goto(`${ODOO}/odoo/contacts`); await p.waitForTimeout(5000); await prep(p); await p.mouse.move(1900, 1070);
    await shot(p, 'odoo_contacts', {
      company: `js:[...document.querySelectorAll('.o_kanban_record, tr.o_data_row')].find(e=>/BrightLeaf Supplies/.test(e.textContent))`,
      sarah: `js:[...document.querySelectorAll('.o_kanban_record, tr.o_data_row')].find(e=>/Sarah Mitchell/.test(e.textContent))`,
    });
    execFileSync('bin/ffmpeg', ['-v', 'error', '-y', '-i', 'public/cap02/odoo_home.png', '-vf', 'delogo=x=1176:y=890:w=76:h=100', 'public/cap02/odoo_home_fix.png']);
    execFileSync('mv', ['public/cap02/odoo_home_fix.png', 'public/cap02/odoo_home.png']);
  } finally { await b.close(); }
})();
