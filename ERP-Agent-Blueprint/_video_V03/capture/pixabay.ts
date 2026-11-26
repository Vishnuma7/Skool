// Open Pixabay item pages in the capture Chrome and extract the cdn audio URL from the live page.
import {connect} from './cdp';
const PAGES = process.argv.slice(2);
(async () => {
  const b = await connect();
  try {
    const ctx = b.contexts()[0];
    const p = await ctx.newPage();
    for (const url of PAGES) {
      const found = new Set<string>();
      p.on('request', (r) => { if (/cdn\.pixabay\.com\/(download\/)?audio/.test(r.url())) found.add(r.url()); });
      await p.goto(url, {waitUntil: 'domcontentloaded', timeout: 45000}).catch(() => {});
      await p.waitForTimeout(3000);
      for (const sel of ['button[aria-label*="Play" i]', '[class*="play" i] button', 'button:has(svg[class*="play" i])', '[data-testid*="play" i]']) {
        const el = p.locator(sel).first();
        if (await el.isVisible().catch(() => false)) { await el.click().catch(() => {}); await p.waitForTimeout(2500); break; }
      }
      const html = await p.content();
      for (const m of html.matchAll(/https:\/\/cdn\.pixabay\.com\/(?:download\/)?audio\/[^"'\s\\)]+?\.mp3/g)) found.add(m[0]);
      const lic = /Pixabay Content License/i.test(html) ? 'license-ok' : 'license?';
      console.log(JSON.stringify({url, lic, mp3: [...found].slice(0, 3)}));
      p.removeAllListeners('request');
    }
    await p.close();
  } finally { await b.close(); }
})();
