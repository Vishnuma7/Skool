import {open, shot, peek} from './v06_util';
import {prep, byText, node} from './snap';
process.env.CAP_OUT = 'public/cap06';
(async () => {
  const {p} = await open(); await prep(p);
  await shot(p, 's1_model_dropdown', {sonnet: byText('Claude Sonnet 5.5', 'li *'), field: byText('Claude Sonnet 5', 'li *')});
  await p.getByText('Claude Sonnet 5.5', {exact: true}).first().click(); await p.waitForTimeout(2500);
  await shot(p, 's1_model_selected', {cred: byText('Anthropic – BrightLeaf'), model: 'r:(()=>{const i=[...document.querySelectorAll("input")].find(x=>x.value==="Claude Sonnet 5.5");if(!i)return null;const r=i.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}})()'});
  await peek(p, 'modelsel');
  await p.click('[data-test-id=ndv-close-button]'); await p.waitForTimeout(2000);
  await shot(p, 's1_model_canvas', {model: node('Anthropic Chat Model'), agent: node('AI Agent')});
  await p.locator('[data-test-id=canvas-handle-plus]').nth(1).click().catch(()=>{}); await p.waitForTimeout(2500);
  await peek(p, 'memplus');
  process.exit(0);
})();
