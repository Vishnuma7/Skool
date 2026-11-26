import {connect} from './cdp';
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages().find((x) => x.url().includes('n8n.cloud'))!;
    await p.reload(); await p.waitForTimeout(9000);
    for (const sel of ['button:has-text("Got it")', '[data-test-id="banner-close"]', '[data-test-id="banners"] button', 'button[aria-label="Close"]']) {
      const el = p.locator(sel).first();
      if (await el.isVisible().catch(() => false)) { await el.click(); console.log('clicked', sel); await p.waitForTimeout(800); }
    }
    await p.screenshot({path: 'work/shots/stocky2.png'});
  } finally { await b.close(); }
})();
