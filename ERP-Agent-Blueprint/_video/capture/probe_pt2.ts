import {connect} from './cdp';
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages()[0];
    console.log(JSON.stringify(await p.evaluate(`(() => { const out=[]; for (const e of document.querySelectorAll('.o_home_menu *')) { const r=e.getBoundingClientRect(); if (r.x<640 && r.x+r.width>570 && r.y<500 && r.y+r.height>440 && r.width<400) out.push(e.tagName+'.'+String(e.className).slice(0,50)+' vis='+getComputedStyle(e).visibility+' disp='+getComputedStyle(e).display+' '+Math.round(r.x)+','+Math.round(r.y)+' '+Math.round(r.width)+'x'+Math.round(r.height)); } return out; })()`)));
  } finally { await b.close(); }
})();
