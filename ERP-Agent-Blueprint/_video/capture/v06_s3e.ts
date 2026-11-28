import fs from 'fs';
import {open, shot, peek} from './v06_util';
import {prep} from './snap';
const M = (scroll: string) => `(() => {
  const t = [...document.querySelectorAll('textarea')].find(x => x.value.startsWith('# ROLE') && x.getBoundingClientRect().width > 300);
  if (!t) return null; t.scrollTop = ${scroll};
  const cs = getComputedStyle(t); const m = document.createElement('div');
  ['fontFamily','fontSize','lineHeight','letterSpacing','padding','border','boxSizing'].forEach(k => m.style[k] = cs[k]);
  m.style.position = 'absolute'; m.style.visibility = 'hidden'; m.style.whiteSpace = 'pre-wrap'; m.style.wordWrap = 'break-word'; m.style.width = t.offsetWidth + 'px';
  document.body.appendChild(m);
  const tr = t.getBoundingClientRect(); const out = {field: {x: tr.x, y: tr.y, w: tr.width, h: tr.height}};
  const txt = t.value; const heads = ['# ROLE', '# GOAL', '# TOOLS', '# RULES', '# OUTPUT FORMAT'];
  const offs = heads.map(h => txt.indexOf(h)).concat([txt.length]);
  function yAt(i) { m.textContent = txt.slice(0, i); const s = document.createElement('span'); s.textContent = '|'; m.appendChild(s); return s.offsetTop; }
  function line(str) { const i = txt.indexOf(str); const a = yAt(i), b = yAt(i + str.length); return {x: tr.x + 6, y: tr.y + a - t.scrollTop, w: tr.width - 20, h: b - a + 18}; }
  heads.forEach((h, k) => { const y0 = yAt(offs[k]), y1 = yAt(offs[k + 1]); out[h.slice(2).toLowerCase().replace(' ', '_')] = {x: tr.x + 6, y: tr.y + y0 - t.scrollTop, w: tr.width - 20, h: y1 - y0 - 8}; });
  out.always = line('Always use the tools to get fresh data before answering any question about stock, reorder points, suppliers, prices or lead times. Never answer these from memory.');
  out.only = line('- Only answer from data your tools returned in this conversation.');
  out.never = line('- Never guess or invent numbers, dates, suppliers, purchase orders or delivery dates.');
  out.low = line('- A product is "running low" when quantity on hand is at or below its reorder point.');
  out.watch = line('- A product is "on the watch list" when quantity on hand is above its reorder point by 15% or less.');
  out.source = line('- End with one line: "Source: Odoo (live) –" followed by the names of the tools you used.');
  m.remove(); return out;
})()`;
(async () => {
  const {p} = await open(); await prep(p);
  for (const [name, sc] of [['s3_prompt_top', '0'], ['s3_prompt_bottom', 't.scrollHeight']] as const) {
    const r: any = await p.evaluate(M(sc)); await p.waitForTimeout(600);
    const t: Record<string, string> = {}; for (const [k, v] of Object.entries(r)) t[k] = 'r:(' + JSON.stringify(v) + ')';
    await shot(p, name, t); await peek(p, name);
  }
  process.exit(0);
})();
