import {connect} from './cdp';
(async () => {
  const b = await connect();
  try {
    const p = await b.contexts()[0].newPage();
    const reqs: string[] = [];
    p.on('request', (r) => { const u = r.url(); if (/\.mp3|audio|media/i.test(u)) reqs.push(u); });
    await p.goto(process.argv[2], {waitUntil: 'domcontentloaded', timeout: 45000}).catch(() => {});
    await p.waitForTimeout(4000);
    const info = await p.evaluate(`(() => {
      const btns = [...document.querySelectorAll('button')].map(b => (b.getAttribute('aria-label')||'') + '|' + (b.className||'').toString().slice(0,40) + '|' + (b.textContent||'').trim().slice(0,20)).slice(0,25);
      const aud = [...document.querySelectorAll('audio, source')].map(a => a.src || a.getAttribute('src'));
      const html = document.documentElement.outerHTML;
      const mp3 = [...html.matchAll(/[^"'\\s]*\\.mp3[^"'\\s]*/g)].map(m=>m[0]).slice(0,5);
      return {btns, aud, mp3, title: document.title};
    })()`);
    console.log(JSON.stringify(info, null, 1));
    const play = p.locator('button[aria-label*="lay"]').first();
    if (await play.isVisible().catch(() => false)) { await play.click(); await p.waitForTimeout(3000); }
    console.log('REQS', JSON.stringify(reqs.slice(0, 10)));
    await p.close();
  } finally { await b.close(); }
})();
