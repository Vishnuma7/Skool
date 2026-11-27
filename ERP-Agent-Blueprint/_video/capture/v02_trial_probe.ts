import {connect} from './cdp';
(async () => {
  const b = await connect();
  try {
    const ctx = b.contexts()[0];
    const p = ctx.pages().find((x) => x.url().includes('odoo.com/trial'))!;
    const s = await ctx.newCDPSession(p);
    await s.send('Emulation.setDeviceMetricsOverride', {width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false});
    await p.reload(); await p.waitForTimeout(4000);
    const card = (t: string) => p.locator('label, .o_trial_app, a, div').filter({hasText: new RegExp(`^\\s*${t}\\s*$`)}).first();
    for (const t of ['Sales', 'Inventory', 'Purchase']) {
      const c = p.getByText(t, {exact: true}).filter({visible: true});
      console.log(t, await c.count());
      await c.last().scrollIntoViewIfNeeded(); await c.last().click(); await p.waitForTimeout(600);
    }
    await p.screenshot({path: 'work/v02/trial_sel.png'});
    const btns = await p.evaluate(`[...document.querySelectorAll('button, a.btn, input[type=submit]')].filter(e=>e.offsetParent).map(e=>(e.textContent||e.value||'').trim().replace(/\\s+/g,' ').slice(0,40)).filter(Boolean)`);
    console.log(JSON.stringify(btns));
    void card;
  } finally { await b.close(); }
})();
