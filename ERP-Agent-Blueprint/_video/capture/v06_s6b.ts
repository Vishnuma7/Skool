import fs from 'fs';
import {open, shot, peek} from './v06_util';
import {prep, byText, node} from './snap';
import {ask, setPanel, BOT} from './v06_chat';
const NODES = ['When chat message received', 'AI Agent', 'Anthropic Chat Model', 'Simple Memory', 'get_products_and_stock', 'get_reorder_rules', 'get_supplier_info'];
(async () => {
  const {p} = await open();
  await p.goto('https://brightleaf.app.n8n.cloud/workflow/CnZDME5og3w9lC4Q', {waitUntil: 'domcontentloaded'}); await p.locator(node('get_supplier_info')).waitFor({timeout: 90000}); await prep(p); await p.waitForTimeout(2000);
  if (!(await p.locator('[data-test-id=canvas-chat] textarea').first().isVisible().catch(() => false))) await p.click('[data-test-id=workflow-chat-button]', {force: true});
  await p.waitForTimeout(2000);
  await p.locator('[data-test-id=chat-header] button').last().click().catch(() => {}); await p.waitForTimeout(1500);
  if (await p.evaluate((s) => document.querySelectorAll(s).length, BOT)) { console.log('not reset'); process.exit(1); }
  await setPanel(p, 740); await p.click('[data-test-id=zoom-to-fit]').catch(() => {}); await p.waitForTimeout(800);
  const Q = [['s6_full', 'When will purchase order P00027 from Global Lift Parts arrive?'], ['s6_trap1', 'How many BL-1011 do we have?'], ['s6_trap2', 'Order 50 more pallet jack wheels.']];
  for (const [i, [tag, q]] of Q.entries()) {
    const a = await ask(p, tag, q, NODES); fs.writeFileSync(`work/v06/answer_${tag}.txt`, a);
    await shot(p, `${tag}_done`, {agent: node('AI Agent')});
    await setPanel(p, 300);
    await p.evaluate((i) => document.querySelectorAll('[data-test-id=chat-message-user], .chat-message-from-user')[i]?.scrollIntoView({block: 'start'}), i); await p.waitForTimeout(800);
    await shot(p, `${tag}_answer`, {user: `js:document.querySelectorAll('[data-test-id=chat-message-user], .chat-message-from-user')[${i}]`, bot: `js:document.querySelectorAll('${BOT}')[${i}]`});
    await peek(p, `${tag}_answer`);
    await setPanel(p, 740);
  }
  process.exit(0);
})();
