import {connect} from './cdp';
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages()[0];
    const s = await b.contexts()[0].newCDPSession(p);
    await s.send('Emulation.setDeviceMetricsOverride', {width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false});
    await p.goto('https://brightleaf-supplies.odoo.com/odoo/action-stock.product_template_action_product'); await p.waitForTimeout(5000);
    await p.screenshot({path: 'work/v02/prod_list.png'});
    await p.locator('button.o_list_button_add, button.o-kanban-button-new, button:has-text("New")').first().click(); await p.waitForTimeout(3000);
    await p.screenshot({path: 'work/v02/prod_new.png'});
    console.log(p.url());
    console.log(JSON.stringify(await p.evaluate(`[...document.querySelectorAll('.o_field_widget[name]')].filter(e=>e.offsetParent).map(e=>e.getAttribute('name')+':'+(e.querySelector('input')?.type||e.querySelector('select')?'select':'')+':'+e.className.split(' ').filter(c=>c.startsWith('o_field_')).join(','))`)));
    console.log(JSON.stringify(await p.evaluate(`[...document.querySelectorAll('.o_notebook .nav-link')].map(e=>e.textContent.trim()+'|'+e.getAttribute('name'))`)));
  } finally { await b.close(); }
})();
