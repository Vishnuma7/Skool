import fs from 'fs';
import {open, shot, peek} from './v06_util';
import {prep, node} from './snap';
import {ask, setPanel, BOT} from './v06_chat';
const NODES = ['When chat message received', 'AI Agent', 'Anthropic Chat Model', 'Simple Memory', 'get_products_and_stock', 'get_reorder_rules', 'get_supplier_info'];
const tall = async (p: any, name: string, idx: number) => {
  await setPanel(p, 250);
  await p.evaluate(({s, i}: any) => { const u = document.querySelectorAll('[data-test-id=chat-message-user], .chat-message-from-user'); u[i]?.scrollIntoView({block: 'start'}); }, {s: BOT, i: idx});
  await p.waitForTimeout(800);
  await shot(p, name, {user: `js:document.querySelectorAll('[data-test-id=chat-message-user], .chat-message-from-user')[${idx}]`, bot: `js:document.querySelectorAll('${BOT}')[${idx}]`});
  await peek(p, name);
  await setPanel(p, 740);
};
(async () => {
  const {p} = await open();
  await p.goto('https://brightleaf.app.n8n.cloud/workflow/CnZDME5og3w9lC4Q', {waitUntil: 'domcontentloaded'}); await p.locator(node('get_supplier_info')).waitFor({timeout: 90000}); await prep(p); await p.waitForTimeout(2000);
  if (await p.locator('[data-test-id=ndv-close-button]').isVisible().catch(() => false)) { await p.click('[data-test-id=ndv-close-button]'); await p.waitForTimeout(1000); }
  if (!(await p.locator('[data-test-id=canvas-chat] textarea').first().isVisible().catch(() => false))) await p.click('[data-test-id=workflow-chat-button]', {force: true});
  await p.waitForTimeout(2000);
  // new session = memory cleared
  await p.locator('[data-test-id=chat-header] button').last().click().catch(() => {}); await p.waitForTimeout(1500);
  await peek(p, 'newsession');
  const n = await p.evaluate((s) => document.querySelectorAll(s).length, BOT); console.log('bot msgs after reset', n);
  if (n > 0) { console.log('session not reset, stopping'); process.exit(1); }
  await setPanel(p, 740); await p.click('[data-test-id=zoom-to-fit]').catch(() => {}); await p.waitForTimeout(800);
  await shot(p, 's4_chat_new', {chat: '[data-test-id=canvas-chat]'});
  const Q = [["s4_q1", "What's running low?"], ['s4_q2', "Which supplier provides BL-1005 and what's the lead time?"], ['s4_q3', 'And what about the hydraulic oil?']];
  for (const [i, [tag, q]] of Q.entries()) {
    const a = await ask(p, tag, q, NODES); fs.writeFileSync(`work/v06/answer_${tag}.txt`, a);
    await shot(p, `${tag}_done`, {agent: node('AI Agent')});
    await tall(p, `${tag}_answer`, i);
  }
  process.exit(0);
})();
