import fs from 'fs';
import {open, shot, peek} from './v06_util';
import {prep, node} from './snap';
import {ask, setPanel, BOT} from './v06_chat';
const NODES = ['When chat message received', 'AI Agent', 'Anthropic Chat Model', 'Simple Memory', 'get_products_and_stock', 'get_reorder_rules', 'get_supplier_info'];
(async () => {
  const {p} = await open(); await prep(p);
  // close the side panel, save
  await p.locator('button:near(:text("System Message"))').filter({has: p.locator('svg')}).first().isVisible().catch(() => false);
  await p.keyboard.press('Escape'); await p.waitForTimeout(800);
  await p.mouse.click(1882, 83).catch(() => {}); await p.waitForTimeout(1000);
  await p.mouse.click(700, 250); await p.keyboard.press('Meta+s'); await p.waitForTimeout(4000);
  await p.click('[data-test-id=workflow-chat-button]').catch(() => {}); await p.waitForTimeout(2000);
  // new chat session (clears memory)
  const reset = p.locator('[data-test-id=chat-header] button, [data-test-id=chat-session-id] ~ button').last();
  await p.getByTitle(/new|reset|session/i).first().click().catch(async () => { await reset.click().catch(() => {}); });
  await p.waitForTimeout(1500);
  await p.click('[data-test-id=zoom-to-fit]').catch(() => {}); await p.waitForTimeout(800);
  await shot(p, 's4_chat_new', {});
  await peek(p, 's4new');
  const a1 = await ask(p, 's4_q1', "What's running low?", NODES);
  fs.writeFileSync('work/v06/answer_q1.txt', a1);
  await shot(p, 's4_q1_done', {agent: node('AI Agent')});
  await peek(p, 's4q1');
  process.exit(0);
})();
