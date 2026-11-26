import {connect} from './cdp';
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages().find((x) => x.url().includes('claude.ai'))!;
    await p.goto('https://claude.ai/new'); await p.waitForTimeout(5000);
    const plus = p.locator('button[aria-label*="Add"], button[aria-label*="add"], button[data-testid*="input-plus"], button[aria-label*="ools"]').first();
    console.log('plus visible', await plus.isVisible().catch(() => false), await plus.getAttribute('aria-label').catch(() => ''));
    await plus.click(); await p.waitForTimeout(1200);
    await p.screenshot({path: 'work/shots/claude_menu.png'});
    const items = await p.evaluate(`[...document.querySelectorAll('[role=menu] *, [role=menuitem], [role=menuitemcheckbox], [role=switch]')].map(e => (e.getAttribute('role')||'') + ':' + (e.textContent||'').trim().slice(0,60)).filter((v,i,a)=>a.indexOf(v)===i).slice(0,40)`);
    console.log(JSON.stringify(items, null, 1));
  } finally { await b.close(); }
})();
