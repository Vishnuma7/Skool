import fs from 'fs';
import {open, shot, peek} from './v06_util';
import {prep, node} from './snap';
import {ask} from './v06_chat';
const NODES = ['When chat message received', 'AI Agent', 'Anthropic Chat Model', 'Simple Memory', 'get_products_and_stock', 'get_reorder_rules', 'get_supplier_info'];
(async () => {
  const {p} = await open();
  await p.goto('https://brightleaf.app.n8n.cloud/workflow/CnZDME5og3w9lC4Q', {waitUntil: 'domcontentloaded'}); await p.locator(node('get_supplier_info')).waitFor({timeout: 90000}); await prep(p); await p.waitForTimeout(2000);
  if (await p.locator('[data-test-id=ndv-close-button]').isVisible().catch(() => false)) { await p.click('[data-test-id=ndv-close-button]'); await p.waitForTimeout(1000); }
  if (!(await p.locator('[data-test-id=canvas-chat] textarea').first().isVisible().catch(() => false))) { await p.click('[data-test-id=workflow-chat-button]', {force: true}); } await p.waitForTimeout(2500);
  await p.click('[data-test-id=zoom-to-fit]').catch(() => {}); await p.waitForTimeout(800);
  await shot(p, 's4_chat_new', {chat: '[data-test-id=canvas-chat]'});
  const a1 = await ask(p, 's4_q1', "What's running low?", NODES);
  fs.writeFileSync('work/v06/answer_q1.txt', a1);
  await shot(p, 's4_q1_done', {agent: node('AI Agent')});
  await peek(p, 's4q1');
  process.exit(0);
})();
