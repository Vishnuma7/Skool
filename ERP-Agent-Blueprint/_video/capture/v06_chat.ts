import {Page} from 'playwright-core';
import {shot, peek} from './v06_util';
import {node} from './snap';
export const BOT = '[data-test-id=chat-message-bot], .chat-message-from-bot';
export const botCount = (p: Page) => p.evaluate((s) => document.querySelectorAll(s).length, BOT);
export const setPanel = async (p: Page, y: number) => {
  const cur = await p.evaluate(() => { const e = document.querySelector('[data-test-id=logs-panel]'); return e ? e.getBoundingClientRect().top : 1040; });
  await p.mouse.move(800, cur + 1); await p.mouse.down(); await p.mouse.move(800, (cur + y) / 2, {steps: 6}); await p.mouse.move(800, y, {steps: 6}); await p.mouse.up(); await p.waitForTimeout(900);
};
/** Type a question, capture a burst while the agent runs, then the answer. */
export const ask = async (p: Page, tag: string, q: string, nodes: string[]) => {
  const ta = p.locator('[data-test-id=canvas-chat] textarea').first();
  await ta.click(); await ta.type(q, {delay: 30}); await p.waitForTimeout(400);
  await shot(p, `${tag}_typed`, {input: '[data-test-id=canvas-chat] textarea'}, true);
  const before = await botCount(p);
  await p.keyboard.press('Enter');
  const T: Record<string, string> = {}; for (const n of nodes) T[n] = node(n);
  for (let i = 0; i < 40; i++) {
    await p.waitForTimeout(900);
    if (i < 14) await shot(p, `${tag}_run${String(i).padStart(2, '0')}`, T);
    const done = await p.evaluate(({s, b}) => { const a = document.querySelectorAll(s); return a.length > b && (a[a.length - 1].textContent || '').trim().length > 25; }, {s: BOT, b: before});
    if (done) break;
  }
  await p.waitForTimeout(2500);
  const ans = await p.evaluate((s) => { const a = document.querySelectorAll(s); return a[a.length - 1]?.textContent?.trim() ?? ''; }, BOT);
  console.log(`=== ${tag} answer:\n${ans}`);
  return ans;
};
