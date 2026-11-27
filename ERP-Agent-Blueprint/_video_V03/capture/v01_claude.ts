import {connect} from './cdp';
import {prep, shot} from './snap';
import {Rec} from './rec';
const Q = 'How many Steel Hex Bolts M10 do we have in stock at BrightLeaf right now, and should I reorder?';
const CSS = `nav, [data-testid="sidebar"], aside, .lg\\:fixed.lg\\:left-0{display:none!important}
  a[href*="upgrade"], button:has(> span:only-child):has-text("Upgrade"){display:none!important}`;
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages().find((x) => x.url().includes('claude.ai'))!;
    await p.goto('https://claude.ai/new'); await p.waitForTimeout(5000);
    const s = await prep(p);
    // hide sidebar, plan pill, promo cards; keep the page centred
    await p.addStyleTag({content: CSS});
    await p.evaluate(`(() => {
      for (const el of document.querySelectorAll('div, span, a, button')) {
        const t = (el.textContent || '').trim();
        if ((t === 'Free plan · Upgrade' || t.startsWith('New in Pro') || t === 'Free planUpgrade') && el.children.length < 6) el.style.display = 'none';
      }
      for (const el of document.querySelectorAll('h1, h2, div')) { if ((el.textContent||'').trim()==="You’re here!" ) {} }
    })()`);
    const close = p.locator('button[aria-label*="lose"], button[aria-label*="ismiss"]').last();
    if (await close.isVisible().catch(() => false)) await close.click().catch(() => {});
    await p.mouse.move(1900, 1070); await p.waitForTimeout(800);
    const input = p.locator('div[contenteditable="true"]').first();
    await shot(p, 'claude_empty', {input: 'div[contenteditable="true"]'});
    const rec = new Rec(p, 'claude_chat');
    await rec.start(s);
    await p.waitForTimeout(800);
    await input.click(); rec.mark('click', {label: 'input'});
    await p.waitForTimeout(400);
    rec.mark('typeStart');
    for (const ch of Q) { await p.keyboard.type(ch); await p.waitForTimeout(1000 / 14); }
    rec.mark('typeEnd');
    await p.waitForTimeout(700);
    const send = p.locator('button[aria-label*="Send"]').first();
    const sr = await send.boundingBox();
    rec.mark('send', sr ? {x: sr.x + sr.width / 2, y: sr.y + sr.height / 2} : {});
    await send.click();
    // wait until the answer finished streaming (stop button disappears / text stable)
    let last = '', stable = 0;
    for (let i = 0; i < 120 && stable < 6; i++) {
      await p.waitForTimeout(500);
      const t = await p.evaluate(`(document.querySelector('[data-is-streaming], .font-claude-response, .font-claude-message')||{}).textContent||''`) as string;
      if (t && t === last) stable++; else stable = 0; last = t;
      if (i === 0) rec.mark('answerStart');
    }
    rec.mark('answerEnd');
    await p.waitForTimeout(1200);
    await rec.stop('public/cap/claude_chat.mp4');
    await p.addStyleTag({content: CSS});
    await shot(p, 'claude_answer', {
      answer: `js:[...document.querySelectorAll('.font-claude-response, .font-claude-message, [data-is-streaming]')].pop()`,
      accessSentence: `js:(() => { const r=[...document.querySelectorAll('.font-claude-response p, .font-claude-message p, [data-is-streaming] p')]; return r.find(e=>/access/i.test(e.textContent))||r[0]; })()`,
      question: `js:[...document.querySelectorAll('[data-testid="user-message"], .font-user-message')].pop()`,
    });
    console.log('ANSWER:', last.slice(0, 600));
  } finally { await b.close(); }
})();
