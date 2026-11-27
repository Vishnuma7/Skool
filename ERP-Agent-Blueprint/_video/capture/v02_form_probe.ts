import {connect} from './cdp';
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages().find((x) => x.url().includes('odoo.com/trial'))!;
    await p.getByText('Continue', {exact: true}).click(); await p.waitForTimeout(4000);
    console.log(p.url());
    await p.screenshot({path: 'work/v02/form.png'});
    console.log(JSON.stringify(await p.evaluate(`[...document.querySelectorAll('input,select,button,textarea')].filter(e=>e.offsetParent).map(e=>({t:e.tagName,type:e.type,name:e.name,id:e.id,ph:e.placeholder,txt:(e.textContent||'').trim().slice(0,30), opts: e.tagName==='SELECT'? [...e.options].slice(0,6).map(o=>o.text):undefined}))`)));
  } finally { await b.close(); }
})();
