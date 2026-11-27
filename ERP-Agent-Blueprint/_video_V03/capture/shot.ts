// usage: npx tsx capture/shot.ts <url> <out.png> [waitMs]
import {connect} from './cdp';
import {macLook} from './snap';
(async () => {
  const [url, out, wait = '6000'] = process.argv.slice(2);
  const b = await connect();
  try {
    const ctx = b.contexts()[0];
    const p = ctx.pages().find((x) => x.url().startsWith(url.split('/').slice(0, 3).join('/'))) ?? (await ctx.newPage());
    const s = await ctx.newCDPSession(p);
    await s.send('Emulation.setDeviceMetricsOverride', {width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false});
    if (p.url() !== url) await p.goto(url, {waitUntil: 'domcontentloaded'});
    await p.waitForTimeout(Number(wait));
    await macLook(p);
    await p.screenshot({path: out});
    console.log('saved', out, p.url());
  } finally { await b.close(); }
})();
