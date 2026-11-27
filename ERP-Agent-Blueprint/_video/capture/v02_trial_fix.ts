import {connect} from './cdp';
import {prep, shot, byText} from './snap';
const card = (t: string) => `js:[...document.querySelectorAll('label, a, div')].filter(e => e.offsetParent && (e.textContent||'').trim() === ${JSON.stringify(t)} && e.getBoundingClientRect().x < 1250).map(e => e.closest('label') || e.parentElement).pop()`;
const side = (t: string) => `js:[...document.querySelectorAll('li, div, span, a')].filter(e => e.offsetParent && (e.textContent||'').trim() === ${JSON.stringify(t)} && e.getBoundingClientRect().x > 1280).sort((a,b)=>b.getBoundingClientRect().width-a.getBoundingClientRect().width)[0]`;
const clickCard = `(t) => { const e=[...document.querySelectorAll('label, a, div')].filter(e => e.offsetParent && (e.textContent||'').trim() === t && e.getBoundingClientRect().x < 1250).pop(); e.click(); }`;
(async () => {
  const b = await connect();
  const p = b.contexts()[0].pages().find(x => x.url().includes('odoo.com/trial')) ?? b.contexts()[0].pages()[0];
  await p.goto('https://www.odoo.com/trial'); await p.waitForTimeout(4000); await prep(p); await p.mouse.move(1900, 1070);
  const SC = 1489 - 150, SS = 554 - 150;
  const tgt = {inventory: card('Inventory'), purchase: card('Purchase'), sales: card('Sales'), cont: byText('Continue', 'button, a'), selected: byText('Apps selected', 'div, h4, h5, span'),
    sInventory: side('Inventory'), sPurchase: side('Purchase'), sSales: side('Sales')};
  await p.evaluate(`window.scrollTo(0, ${SC})`); await p.waitForTimeout(800);
  await shot(p, 'trial_a0', tgt);
  await p.evaluate(`(${clickCard})('Inventory')`); await p.waitForTimeout(800); await p.mouse.move(1900, 1070);
  await shot(p, 'trial_a1', tgt);
  await p.evaluate(`(${clickCard})('Purchase')`); await p.waitForTimeout(800); await p.mouse.move(1900, 1070);
  await shot(p, 'trial_a2', tgt);
  await p.evaluate(`window.scrollTo(0, ${SS})`); await p.waitForTimeout(800);
  await shot(p, 'trial_b0', tgt);
  await p.evaluate(`(${clickCard})('Sales')`); await p.waitForTimeout(800); await p.mouse.move(1900, 1070);
  await shot(p, 'trial_b1', tgt);
  await b.close();
})();
