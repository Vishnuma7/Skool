import {open, shot, peek} from './v06_util';
import {prep, byText, node} from './snap';
process.env.CAP_OUT = 'public/cap06';
const H = (t: string) => `[data-handleid="inputs/${t}/0"] [data-test-id=canvas-handle-plus], [data-test-id=canvas-handle-plus-wrapper][data-handleid="inputs/${t}/0"] [data-test-id=canvas-handle-plus]`;
(async () => {
  const {p} = await open(); await prep(p);
  const plus = p.locator('[data-test-id=canvas-handle-plus]').nth(1); // ai_languageModel
  await plus.click(); await p.waitForTimeout(2500);
  await shot(p, 's1_model_list', {anthropic: byText('Anthropic Chat Model', '[data-test-id=node-creator] *'), panel: '[data-test-id=node-creator]'});
  await peek(p, 'modellist');
  await p.getByText('Anthropic Chat Model', {exact: true}).first().click(); await p.waitForTimeout(6000);
  await shot(p, 's1_anthropic_ndv', {cred: byText('Anthropic – BrightLeaf'), model: byText('Model', 'label, span, div'), title: '[data-test-id=node-title-container]'});
  await peek(p, 'anthndv');
  process.exit(0);
})();
