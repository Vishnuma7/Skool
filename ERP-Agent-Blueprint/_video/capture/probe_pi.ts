import {connect} from './cdp';
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages()[0];
    const s = await b.contexts()[0].newCDPSession(p);
    await s.send('Emulation.setDeviceMetricsOverride', {width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false});
    await p.goto('https://brightleaf-supplies.odoo.com/odoo/action-stock.action_view_inventory_tree'); await p.waitForTimeout(5000);
    await p.screenshot({path: 'work/v02/pi.png'});
    console.log(p.url());
    console.log(JSON.stringify(await p.evaluate(`({btns:[...document.querySelectorAll('.o_control_panel button, .o_list_buttons button')].filter(e=>e.offsetParent).map(e=>e.textContent.trim()+'|'+e.className.slice(0,40)), heads:[...document.querySelectorAll('.o_list_table th')].map(e=>e.textContent.trim()+'|'+(e.getAttribute('data-name')||''))})`)));
  } finally { await b.close(); }
})();
