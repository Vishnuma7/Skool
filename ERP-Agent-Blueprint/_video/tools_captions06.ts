// Build soft captions (SRT + VTT) for the whole video from the same timeline the render uses.
// usage: npx tsx tools_captions04full.ts <outBase>   e.g. ../Video_04/Edit/V04_captions
import fs from 'fs';
import words from './src/data/words06.json';
import vo from './vo06/timings.json';
import {clipToSeg} from './src/timeline';
import {beatLayout, fullLayout as layout, QUOTE_LEAD} from './src/v06/timeline';
import harrison from './vo06/harrison06.json';
import jake from './vo06/jake.json';

type Wd = {w: string; t: number; e: number};
const FPS = 30;
// Whisper mishearings → what was actually said (clip, wrong words, right words)
const FIXES: [number, string, string][] = [
  [1, 'excel', 'Excel'], [1, 'vlookup,', 'VLOOKUP,'], [1, 'the road', 'the rows'], [1, 'sends to my list.', 'sends Tom a list.'],
  [4, 'from modu.', 'from Odoo.'], [4, 'the product against a reorder point', 'the products against their reorder points'],
  [5, 'up on screen', 'appear on screen'], [5, "how it's used", 'how it used'],
  [6, 'AA agents', 'an AI'], [6, 'Hallucinations.', 'hallucinations.'],
  [7, 'Indian finally start works.', 'intern finally starts work.'], [7, 'video 5', 'Video 5'],
  [8, 'from modu.', 'from Odoo.'],
  [9, "You didn't", "You'd"], [9, 'must know to do,', 'must not do,'], [9, 'how we expect', 'how you expect'], [9, 'this 5 part', 'this the five-part'],
  [10, 'BrightLeaf supplies', 'BrightLeaf Supplies'],
  [11, 'supply information', 'supplier information'], [11, 'bright leaf.', 'BrightLeaf,'], [11, 'in one day deliver a date.', 'invent a delivery date.'],
  [13, 'rewarder po in the red line', 'reorder point "the red line"'],
  [14, 'the stock key now.', 'Stocky now.'],
  [15, 'biggest stress', 'biggest risks'], [15, 'new Indian', 'new intern'],
  [16, 'Jensen', 'Shenzhen'], [16, '"Tuesdays are."', '"Tuesday, sir."'],
  [17, 'supply\'s lead', "supplier's lead"], [17, 'facts. the facts.', 'facts.'],
  [18, 'AI Highway Station', 'AI hallucination'], [18, 'charge GPT', 'ChatGPT'],
  [19, 'store quantity', 'stock quantity'],
  [20, 'store code', 'stock-out'],
  [21, 'answer views in the data', 'answer using the data'],
  [23, 'compare Stocky against the Rio de reappoints,', 'compare stock against the reorder points,'],
  [25, 'Claude has its', 'Claude as its'], [25, 'audio tools', 'Odoo tools'], [25, 'the field it', 'the fields it'],
  [26, 'system problem', 'system prompt'], [26, 'goals,', 'goal,'],
  [27, 'and trust the agent', 'and test the agent'],
  [28, 'the resource activity "Stocky Prom Builder Document".', 'the V06 Activity: Stocky Prompt Builder document.'], [28, "Stokey's", "Stocky's"], [28, "what's running", 'what "running'], [28, 'low means', 'low" means'],
  [29, 'v06 activity,', 'V06 Activity:'], [29, 'torquay', 'Stocky'],
  [30, 'out of 10D,', 'out of 20,'], [30, 'video 6', 'Video 6'],
  [32, 'Agent that take', 'Agents That Take'],
];
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const clipWords = (clip: number): Wd[] => {
  let ws: Wd[] = ((words as any)[String(clip)] as [string, number, number][]).filter(([w]) => w && !w.startsWith('[') && w !== '-')
    .map(([w, t, e]) => ({w, t, e: Math.max(e, t + 0.15)}));
  for (const [c, bad, good] of FIXES) {
    if (c !== clip) continue;
    const b = bad.split(' ');
    for (let i = 0; i + b.length <= ws.length; i++) {
      if (b.every((x, j) => norm(ws[i + j].w) === norm(x))) {
        const g = good.split(' ');
        const t0 = ws[i].t, t1 = ws[i + b.length - 1].e;
        const repl = g.map((w, j) => ({w, t: t0 + ((t1 - t0) * j) / g.length, e: t0 + ((t1 - t0) * (j + 1)) / g.length}));
        ws.splice(i, b.length, ...repl);
        break;
      }
    }
  }
  return ws;
};

/** VO words with punctuation restored from the paragraph text. */
const voWords = (key: string): Wd[] => {
  const v = (vo as any)[key];
  const toks = (v.text as string).split(/\s+/);
  const out: Wd[] = [];
  let ti = 0;
  for (const bw of v.words as {w: string; t: number; d: number}[]) {
    const parts = bw.w.split(/\s+/);
    for (const part of parts) {
      while (ti < toks.length && norm(toks[ti]) === '') ti++;
      const tok = ti < toks.length && norm(toks[ti]).startsWith(norm(part).slice(0, 3)) ? toks[ti++] : part;
      out.push({w: tok, t: bw.t, e: bw.t + bw.d});
    }
  }
  return out;
};

const all: Wd[] = [];
for (const {seg, from} of layout()) {
  const base = from / FPS;
  if (seg.kind === 'oncam') {
    for (const w of clipWords(seg.clip)) {
      if (w.t < seg.from - 0.05 || w.t >= seg.to) continue;
      const t0 = clipToSeg(seg.keeps, Math.max(w.t, seg.from), true)!;
      const t1 = clipToSeg(seg.keeps, Math.min(w.e, seg.to), true)!;
      all.push({w: w.w, t: base + t0, e: base + Math.max(t1, t0 + 0.12)});
    }
  } else if (seg.kind === 'pause' && (seg.id === 'harrison' || seg.id === 'jake')) {
    // the character's own voice: punctuation from the text, timing from the TTS word boundaries
    const v = seg.id === 'harrison' ? harrison : jake;
    const toks = v.text.split(/\s+/);
    v.words.forEach((w, i) => all.push({w: toks[i] ?? w.w, t: base + QUOTE_LEAD + w.t, e: base + QUOTE_LEAD + w.t + w.d}));
  } else if (seg.kind === 'screen') {
    const {starts} = beatLayout(seg.beats);
    for (const k of seg.beats) for (const w of voWords(k)) all.push({w: w.w, t: base + starts[k] + w.t, e: base + starts[k] + w.e});
  }
}

// group into cues: ≤ 2 lines × 42 chars, break after sentence end or long pause, ≤ 6.5 s
type Cue = {t: number; e: number; text: string};
const cues: Cue[] = [];
let cur: Wd[] = [];
const flush = () => {
  if (!cur.length) return;
  const text = cur.map((x) => x.w).join(' ');
  // split into ≤2 balanced lines
  let lines = [text];
  if (text.length > 42) {
    let best = 0, bd = 1e9;
    for (let i = 1; i < cur.length; i++) {
      const a = cur.slice(0, i).map((x) => x.w).join(' ');
      const b = cur.slice(i).map((x) => x.w).join(' ');
      if (a.length <= 42 && b.length <= 42 && Math.abs(a.length - b.length) < bd) { bd = Math.abs(a.length - b.length); best = i; }
    }
    if (best) lines = [cur.slice(0, best).map((x) => x.w).join(' '), cur.slice(best).map((x) => x.w).join(' ')];
    else {
      // cannot fit 2×42: emit the first ≤42-char chunk as its own cue and continue with the rest
      let i = 1;
      while (i < cur.length && cur.slice(0, i + 1).map((x) => x.w).join(' ').length <= 42) i++;
      const head = cur.slice(0, i), tail = cur.slice(i);
      cues.push({t: head[0].t, e: head[head.length - 1].e + 0.1, text: head.map((x) => x.w).join(' ')});
      cur = tail; flush(); return;
    }
  }
  cues.push({t: cur[0].t, e: cur[cur.length - 1].e + 0.25, text: lines.join('\n')});
  cur = [];
};
for (let i = 0; i < all.length; i++) {
  const w = all[i];
  const next = all[i + 1];
  const len = [...cur, w].map((x) => x.w).join(' ').length;
  if (cur.length && (len > 72 || w.t - cur[cur.length - 1].e > 0.9 || w.e - cur[0].t > 6.5)) flush();
  cur.push(w);
  const endSentence = /[.?!]["”]?$/.test(w.w);
  const curLen = cur.map((x) => x.w).join(' ').length;
  if ((endSentence && curLen > 18) || (/[,;:]$/.test(w.w) && curLen > 60) || !next) flush();
}
for (let i = 0; i < cues.length - 1; i++) cues[i].e = Math.min(cues[i].e, cues[i + 1].t - 0.04);

const ts = (s: number, sep: string) => {
  const ms = Math.max(0, Math.round(s * 1000));
  const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000), sec = Math.floor((ms % 60000) / 1000), r = ms % 1000;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}${sep}${String(r).padStart(3, '0')}`;
};
const out = process.argv[2] ?? 'work/v06/V06_captions';
fs.writeFileSync('src/data/capwords06.json', JSON.stringify(all.map((w) => [w.w, +w.t.toFixed(3), +w.e.toFixed(3)])));
fs.writeFileSync(`${out}.srt`, cues.map((c, i) => `${i + 1}\n${ts(c.t, ',')} --> ${ts(c.e, ',')}\n${c.text}\n`).join('\n'));
fs.writeFileSync(`${out}.vtt`, 'WEBVTT\n\n' + cues.map((c) => `${ts(c.t, '.')} --> ${ts(c.e, '.')}\n${c.text}\n`).join('\n'));
const long = cues.filter((c) => c.text.split('\n').some((l) => l.length > 42));
console.log('cues', cues.length, 'over-42 lines', long.length, long.slice(0, 3).map((c) => c.text));
