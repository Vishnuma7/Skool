import {connect} from './cdp';
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages()[0];
    await p.goto('https://brightleaf-supplies.odoo.com/odoo'); await p.waitForTimeout(5000);
    console.log(JSON.stringify(await p.evaluate(`[...document.querySelectorAll('*')].filter(e=>e.children.length<3 && /^(Discuss|Calendar|Barcode)$/.test((e.textContent||'').trim())).map(e=>{ let c=e; const chain=[]; for(let i=0;i<4&&c;i++){chain.push(c.tagName+'.'+String(c.className).slice(0,40)); c=c.parentElement;} return chain; })`), null, 0));
  } finally { await b.close(); }
})();
