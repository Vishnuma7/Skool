// Video 3 — Odoo screens for "API Keys: Your Hotel Key Card" (read-only: nothing is created or changed in Odoo).
// usage: npx tsx capture/v03_odoo.ts
// Never calls browser.close(): over CDP that can shut the capture Chrome down. We just exit.
import {connect} from './cdp';
import {prep, shot, byText} from './snap';
const BASE = 'https://brightleaf-supplies.odoo.com';
(async () => {
  const b = await connect();
  const ctx = b.contexts()[0];
  const p = await ctx.newPage();
  try {
  const settle = async (sel: string) => { await p.waitForSelector(sel, {timeout: 30000}); await prep(p); await p.waitForTimeout(2000); await p.mouse.move(1900, 1070); };
  // The demo Odoo login is the account owner's real email: never show it on screen; Sarah gets a fictional one.
  const maskEmail = () => p.evaluate(() => {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n: Node | null;
    while ((n = w.nextNode())) if (n.textContent!.includes('vishnuma967@gmail.com')) n.textContent = n.textContent!.replace(/vishnuma967@gmail\.com/g, 'sarah.mitchell@brightleafsupplies.com');
    document.querySelectorAll('input').forEach((i) => { if (i.value.includes('vishnuma967')) i.value = 'sarah.mitchell@brightleafsupplies.com'; });
  });

  // 1. Inventory > Products (list) — the kitchen's stock, BL-1005 = 18
  await p.goto(`${BASE}/odoo/action-stock.product_template_action_product?view_type=list`);
  await settle('.o_list_table tbody tr.o_data_row');
  await shot(p, 'odoo_products', {bl1005: byText('Pallet Jack Wheels', '.o_list_table tbody td'), onHand: byText('On Hand', '.o_list_table thead th')});

  // 2. Settings, scrolled to the developer-tools block with "Activate the developer mode"
  await p.goto(`${BASE}/odoo/settings`);
  await settle('.o_setting_container, .settings');
  const dev = p.getByText('Activate the developer mode', {exact: false}).first();
  await dev.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
  await shot(p, 'odoo_settings_dev', {devLink: byText('Activate the developer mode', 'a, button, span')});

  // 3. Same page in developer mode (what you see after the reload)
  await p.goto(`${BASE}/odoo/settings?debug=1`);
  await settle('.o_setting_container, .settings');
  await shot(p, 'odoo_settings_debug', {bug: '.o_debug_manager, [title*="Developer"], .fa-bug, .oi-bug', avatar: '.o_user_menu, .o_menu_systray .o_avatar'});

  // 4. User menu open
  await p.locator('.o_user_menu button, .o_user_menu .dropdown-toggle, .o_menu_systray .o_user_menu').first().click();
  await p.waitForTimeout(900);
  await shot(p, 'odoo_user_menu', {profile: byText('My Profile', '.dropdown-item, .o-dropdown-item, a, span'), prefs: byText('Preferences', '.dropdown-item, .o-dropdown-item, a, span')});

  // 5. Preferences dialog ("Change My Preferences") > Security tab (API Keys + "New API Key").
  //    This Odoo version (saas-19.5) calls them "Preferences" / "Security" (older: "My Profile" / "Account Security").
  const item = p.locator('.dropdown-item, .o-dropdown-item').filter({hasText: /My Profile|Preferences/}).first();
  await item.click();
  await p.waitForSelector('.modal .nav-link', {timeout: 30000}); await p.waitForTimeout(1200);
  await maskEmail(); await prep(p); await p.mouse.move(1900, 1070);
  await shot(p, 'odoo_prefs', {securityTab: byText('Security', '.modal .nav-link')});
  await p.locator('.modal .nav-link').filter({hasText: /^\s*(Account )?Security\s*$/}).first().click();
  await p.waitForTimeout(1500); await maskEmail();
  // Hide private / off-story details: the "Devices" block (real IPs + Indian cities) and the existing API key
  // card (the script says no key exists yet). Only the empty "API Keys" row with its "Create API Key" button stays.
  // (plain-string script: tsx's __name helper doesn't exist inside the page)
  await p.evaluate(`(() => {
    const pane = document.querySelector('.modal .tab-pane.active');
    // each setting is one direct child row: [label column | content column]
    for (const row of pane.children) {
      const label = (row.querySelector('.o_form_label') || {}).textContent || '';
      if (label.trim() === 'Devices') row.style.setProperty('display', 'none', 'important');
      if (label.trim() === 'API Keys') row.querySelectorAll('article.o_card_record').forEach((c) => c.style.setProperty('display', 'none', 'important'));
    }
    return [document.querySelectorAll('.modal').length, document.querySelectorAll('.modal .tab-pane.active').length, pane.children.length, [...pane.children].map((r) => ((r.querySelector('.o_form_label') || {}).textContent || '?').trim() + ':' + r.style.display).join(' | '), document.querySelector('.modal').innerText.includes('Kochi')];
  })()`).then((r) => console.log('HIDE', JSON.stringify(r)));
  const leftover = await p.evaluate(() => (document.querySelector('.modal') as HTMLElement).innerText.match(/Kochi|Thiruvananthapuram|India|223\.181|103\.189|Created on|Devices/g));
  if (leftover) {
    console.log(await p.evaluate(`(() => { const m = document.querySelector('.modal'); const out = []; const walk = (e, d) => { if (d > 14) return; const own = [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join(' ').slice(0, 40); out.push(' '.repeat(d) + e.tagName + '.' + String(e.className).split(' ').slice(0, 3).join('.') + (own ? ' "' + own + '"' : '')); [...e.children].forEach(c => walk(c, d + 1)); }; walk(m.querySelector('.tab-pane.active') || m, 0); return out.slice(0, 140).join(String.fromCharCode(10)); })()`));
    throw new Error('private details still visible: ' + leftover.join(', '));
  }
  await prep(p); await p.mouse.move(1900, 1070);
  await shot(p, 'odoo_security', {tab: byText('Security', '.modal .nav-link'), apiKeys: byText('API Keys', '.modal h2, .modal h3, .modal h4, .modal div, .modal span, .modal label'),
    newKey: byText('Create API Key', '.modal button, .modal a')});

  } catch (e) {
    console.error(e); process.exitCode = 1;
  } finally {
    // leave developer mode so the shared Odoo looks normal again, and always close our tab
    await p.goto(`${BASE}/odoo?debug=0`).catch(() => {}); await p.waitForTimeout(1000);
    await p.close().catch(() => {});
  }
  process.exit();
})();
