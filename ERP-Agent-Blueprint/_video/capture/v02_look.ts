// usage: npx tsx capture/v02_look.ts <url> <out.png> [waitMs]  — open in a fresh tab at 1920x1080, screenshot, list buttons/links text
import {connect} from './cdp';
(async () => {
  const [url, out, wait = '5000'] = process.argv.slice(2);
  const b = await connect();
  try {
    const ctx = b.contexts()[0];
    const p = ctx.pages().find((x) => x.url().startsWith(url)) ?? (await ctx.newPage());
    const s = await ctx.newCDPSession(p);
    await s.send('Emulation.setDeviceMetricsOverride', {width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false});
    if (!p.url().startsWith(url)) await p.goto(url, {waitUntil: 'domcontentloaded'});
    await p.waitForTimeout(Number(wait));
    await p.screenshot({path: out});
    const t = await p.evaluate(`[...document.querySelectorAll('a,button,label,input,select')].filter(e=>e.offsetParent).map(e=>(e.tagName+':'+(e.name||'')+':'+(e.textContent||e.value||e.placeholder||'').trim().replace(/\\s+/g,' ').slice(0,40))).slice(0,80)`);
    console.log(p.url()); console.log(JSON.stringify(t));
  } finally { await b.close(); }
})();
