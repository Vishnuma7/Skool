import {connect} from './cdp';
import {prep} from './snap';
(async () => {
  const b = await connect();
  const p = b.contexts()[0].pages().find(x => x.url().includes('odoo.com/trial')) ?? b.contexts()[0].pages()[0];
  await p.bringToFront(); await p.goto('https://www.odoo.com/trial'); await p.waitForTimeout(4000); await prep(p);
  const r = await p.evaluate(`(() => { const out=[]; for (const e of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) { const r=e.getBoundingClientRect(); if (r.width) out.push([e.tagName, (e.textContent||'').trim().slice(0,40), Math.round(r.y+scrollY)]); } return out; })()`);
  console.log(JSON.stringify(r)); console.log(await p.evaluate('document.documentElement.scrollHeight'));
  await b.close();
})();
