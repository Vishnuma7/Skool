import {Page} from 'playwright-core';
import {connect, pageFor} from './cdp';
import {prep, shot as rawShot} from './snap';
/** hide n8n's 'Offline' badge (slow push connection) and the banner before every capture */
export const clean = async (p: Page) => p.evaluate(() => {
  window.getSelection()?.removeAllRanges(); window.scrollTo(0, 0); document.querySelectorAll('#app, body, html, [class*=app-grid]').forEach(e => { (e as HTMLElement).scrollTop = 0; });
  for (const e of document.querySelectorAll('*')) if (e.children.length === 0 && e.textContent?.trim() === 'Offline') {
    const box = (e.closest('button,[role=button],div') as HTMLElement) || (e as HTMLElement); box.style.visibility = 'hidden';
    const parent = box.parentElement as HTMLElement | null; if (parent && parent.textContent?.trim() === 'Offline') parent.style.visibility = 'hidden';
  }
});
export const shot = async (p: Page, name: string, t: Record<string, string> = {}, keepMouse = false) => { if (!keepMouse) await p.mouse.move(1500, 160); await clean(p); return rawShot(p, name, t); };
export const open = async () => { const b = await connect(); const p = await pageFor(b, 'n8n.cloud'); return {b, p}; };
export const ready = async (p: Page, ms = 1500) => { await p.waitForLoadState('domcontentloaded'); await p.waitForTimeout(ms); };
export const goto = async (p: Page, url: string, waitText?: string) => {
  await p.goto(url, {waitUntil: 'domcontentloaded'});
  if (waitText) await p.getByText(waitText, {exact: false}).first().waitFor({timeout: 90000});
  await prep(p); await p.waitForTimeout(1500);
};
/** small preview png for checking */
export const peek = async (p: Page, name: string) => { await p.screenshot({path: `work/v06/peek_${name}.png`, scale: 'css'}); };
