import {connect} from './cdp';
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages()[0];
    const s = await b.contexts()[0].newCDPSession(p);
    await s.send('Emulation.setDeviceMetricsOverride', {width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false});
    await p.goto('https://brightleaf-supplies.odoo.com/odoo'); await p.waitForTimeout(5000);
    console.log(JSON.stringify(await p.evaluate(`(() => { let e=document.elementFromPoint(605,470); const out=[]; for(let i=0;i<6&&e;i++){out.push(e.tagName+'.'+String(e.className).slice(0,60)+' #'+e.id); e=e.parentElement;} return out; })()`)));
  } finally { await b.close(); }
})();
