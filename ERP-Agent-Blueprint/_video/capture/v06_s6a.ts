import fs from 'fs';
import {open, shot, peek} from './v06_util';
import {prep, byText, node} from './snap';
import {ask, setPanel, BOT} from './v06_chat';
const NODES = ['When chat message received', 'AI Agent', 'Anthropic Chat Model', 'Simple Memory', 'get_products_and_stock', 'get_reorder_rules', 'get_supplier_info'];
(async () => {
  const {p} = await open();
  await p.goto('https://brightleaf.app.n8n.cloud/workflow/CnZDME5og3w9lC4Q', {waitUntil: 'domcontentloaded'}); await p.locator(node('get_supplier_info')).waitFor({timeout: 90000}); await prep(p); await p.waitForTimeout(2000);
  // show the weak prompt in the agent panel
  await p.locator(node('AI Agent')).dblclick(); await p.waitForTimeout(5000);
  await shot(p, 's6_weak_prompt', {sys: byText('You are a helpful inventory assistant for BrightLeaf Supplies.', 'textarea, div')});
  await peek(p, 's6weak');
  await p.click('[data-test-id=ndv-close-button]'); await p.waitForTimeout(1200);
  if (!(await p.locator('[data-test-id=canvas-chat] textarea').first().isVisible().catch(() => false))) await p.click('[data-test-id=workflow-chat-button]', {force: true});
  await p.waitForTimeout(2000);
  await p.locator('[data-test-id=chat-header] button').last().click().catch(() => {}); await p.waitForTimeout(1500);
  if (await p.evaluate((s) => document.querySelectorAll(s).length, BOT)) { console.log('not reset'); process.exit(1); }
  await setPanel(p, 740); await p.click('[data-test-id=zoom-to-fit]').catch(() => {}); await p.waitForTimeout(800);
  const a = await ask(p, 's6_weak', 'When will purchase order P00027 from Global Lift Parts arrive?', NODES);
  fs.writeFileSync('work/v06/answer_weak.txt', a);
  await shot(p, 's6_weak_done', {agent: node('AI Agent')});
  await setPanel(p, 300);
  await p.evaluate(() => document.querySelector('[data-test-id=chat-message-user], .chat-message-from-user')?.scrollIntoView({block: 'start'})); await p.waitForTimeout(800);
  await shot(p, 's6_weak_answer', {bot: BOT});
  await peek(p, 's6weakans');
  process.exit(0);
})();
