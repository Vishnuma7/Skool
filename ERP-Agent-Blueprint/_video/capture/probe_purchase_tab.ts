import {connect} from './cdp';
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages()[0];
    await p.screenshot({path: 'work/v02/ptab.png'});
    console.log(JSON.stringify(await p.evaluate(`[...document.querySelectorAll('.o_notebook .tab-pane.active .o_field_widget[name], .o_notebook .tab-pane.active a, .o_notebook .tab-pane.active button')].filter(e=>e.offsetParent).map(e=>e.tagName+':'+(e.getAttribute('name')||'')+':'+(e.textContent||'').trim().slice(0,40)+':'+String(e.className).slice(0,50))`)));
  } finally { await b.close(); }
})();
