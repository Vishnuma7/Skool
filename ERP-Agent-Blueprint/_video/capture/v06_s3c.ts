import fs from 'fs';
import {open, shot, peek} from './v06_util';
import {prep} from './snap';
const MEASURE = `(() => {
  const t = [...document.querySelectorAll('textarea')].find(x => x.value.startsWith('# ROLE'));
  if (!t) return null;
  t.style.height = (window.innerHeight - t.getBoundingClientRect().top - 120) + 'px'; t.scrollTop = 0;
  const cs = getComputedStyle(t); const m = document.createElement('div');
  ['fontFamily','fontSize','lineHeight','letterSpacing','padding','border','boxSizing'].forEach(k => m.style[k] = cs[k]);
  m.style.position = 'absolute'; m.style.visibility = 'hidden'; m.style.whiteSpace = 'pre-wrap'; m.style.wordWrap = 'break-word'; m.style.width = t.offsetWidth + 'px';
  document.body.appendChild(m);
  const tr = t.getBoundingClientRect(); const out = {field: {x: tr.x, y: tr.y, w: tr.width, h: tr.height}};
  const txt = t.value; const heads = ['# ROLE', '# GOAL', '# TOOLS', '# RULES', '# OUTPUT FORMAT'];
  const offs = heads.map(h => txt.indexOf(h)).concat([txt.length]);
  function yAt(i) { m.textContent = txt.slice(0, i); const s = document.createElement('span'); s.textContent = '|'; m.appendChild(s); return s.offsetTop; }
  heads.forEach((h, k) => { const y0 = yAt(offs[k]), y1 = yAt(offs[k + 1]); out[h.slice(2).toLowerCase().replace(' ', '_')] = {x: tr.x + 4, y: tr.y + y0, w: tr.width - 8, h: y1 - y0}; });
  out.total = m.scrollHeight; m.remove(); return out;
})()`;
(async () => {
  const {p} = await open(); await prep(p);
  const rects: any = await p.evaluate(MEASURE);
  console.log(JSON.stringify(rects));
  fs.writeFileSync('work/v06/prompt_rects.json', JSON.stringify(rects, null, 1));
  const t: Record<string, string> = {}; for (const [k, v] of Object.entries(rects)) if (typeof v === 'object') t[k] = 'r:(' + JSON.stringify(v) + ')';
  await shot(p, 's3_sys_full', t);
  await peek(p, 'sysfull');
  process.exit(0);
})();
