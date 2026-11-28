import fs from 'fs';
import {open, shot, peek} from './v06_util';
import {prep, byText} from './snap';
const PROMPT = fs.readFileSync('work/v06/system_prompt.txt', 'utf8').trim();
(async () => {
  const {p} = await open(); await prep(p);
  const idx = await p.evaluate(() => [...document.querySelectorAll('textarea')].findIndex(t => (t as HTMLTextAreaElement).value.startsWith('You are a helpful') || (t as HTMLTextAreaElement).value.startsWith('# ROLE')));
  console.log('idx', idx); await p.evaluate((i) => (document.querySelectorAll('textarea')[i] as HTMLElement).setAttribute('data-sysmsg', '1'), idx);
  const sys = p.locator('textarea[data-sysmsg]');
  await sys.click(); await p.keyboard.press('Meta+a'); await p.keyboard.press('Backspace'); await p.waitForTimeout(400);
  await shot(p, 's3_sys_cleared', {}, true);
  await p.keyboard.insertText(PROMPT); await p.waitForTimeout(1500);
  // make the field tall enough to read the whole prompt (same as dragging its resize corner)
  const rects = await p.evaluate(() => {
    const t = document.querySelector('textarea[data-sysmsg]') as HTMLTextAreaElement;
    t.style.height = (window.innerHeight - t.getBoundingClientRect().top - 120) + 'px'; t.scrollTop = 0;
    const cs = getComputedStyle(t); const m = document.createElement('div');
    for (const k of ['fontFamily', 'fontSize', 'lineHeight', 'letterSpacing', 'padding', 'border', 'boxSizing', 'whiteSpace', 'wordWrap', 'width'] as const) (m.style as any)[k] = (cs as any)[k];
    m.style.position = 'absolute'; m.style.visibility = 'hidden'; m.style.whiteSpace = 'pre-wrap'; m.style.width = t.clientWidth + 'px'; document.body.appendChild(m);
    const tr = t.getBoundingClientRect(); const out: any = {field: {x: tr.x, y: tr.y, w: tr.width, h: tr.height}};
    const txt = t.value; const heads = ['# ROLE', '# GOAL', '# TOOLS', '# RULES', '# OUTPUT FORMAT'];
    const offs = heads.map(h => txt.indexOf(h)).concat([txt.length]);
    const yAt = (i: number) => { m.textContent = txt.slice(0, i); const s = document.createElement('span'); s.textContent = '|'; m.appendChild(s); return s.offsetTop; };
    heads.forEach((h, k) => { const y0 = yAt(offs[k]), y1 = yAt(offs[k + 1]); out[h.slice(2).toLowerCase().replace(' ', '_')] = {x: tr.x + 4, y: tr.y + y0 - t.scrollTop, w: tr.width - 8, h: y1 - y0}; });
    out.total = m.scrollHeight; m.remove(); return out;
  });
  console.log(JSON.stringify(rects));
  fs.writeFileSync('work/v06/prompt_rects.json', JSON.stringify(rects, null, 1));
  await shot(p, 's3_sys_full', {field: 'r:(' + JSON.stringify(rects.field) + ')'});
  await peek(p, 'sysfull');
  process.exit(0);
})();
