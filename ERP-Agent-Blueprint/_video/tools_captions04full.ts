// Build soft captions (SRT + VTT) for the whole video from the same timeline the render uses.
// usage: npx tsx tools_captions04full.ts <outBase>   e.g. ../Video_04/Edit/V04_captions
import fs from 'fs';
import words from './src/data/words04.json';
import vo from './vo04/timings.json';
import {clipToSeg} from './src/timeline';
import {beatLayout, fullLayout as layout, HARRISON_LEAD} from './src/v04/timeline';
import harrison from './vo04/harrison.json';

type Wd = {w: string; t: number; e: number};
const FPS = 30;
// Whisper mishearings → what was actually said (clip, wrong words, right words)
const FIXES: [number, string, string][] = [
  [2, 'stretch trap SKUBL 1003.', 'stretch wrap, SKU BL-1003.'],
  [4, 'read data', 'reads data'], [4, 'ground friendly', 'confidently'],
  [5, 'Google sheet', 'Google Sheets'], [5, 'stock key.', 'Stocky:'], [5, 'stock lock.', 'Stock Log.'], [5, 'It also shows', "I'll also show"], [5, 'and safe for', 'and safer for'],
  [6, "the Brightleaf's", "BrightLeaf's"],
  [7, 'pack rate industries?', 'PackRight Industries?'],
  [8, 'pack rate industries.', 'PackRight Industries.'], [8, 'packaging spent.', 'packaging spend.'], [8, 'Pack rate was', 'PackRight was'],
  [9, 'pack rate industries,', 'PackRight Industries,'], [9, 'pack rate IND', 'Pack Right Ind.'], [9, 'pack rate Chicago', 'PACKRIGHT (Chicago)'], [9, 'pack rate actually', 'PackRight actually'],
  [9, 'packaging spent.', 'packaging spend.'], [9, 'Bradley', 'BrightLeaf'], [9, 'released.', 'realised.'],
  [10, 'Sarah Michelle', 'Sarah Mitchell'], [10, 'pack rate gets one id sup002.', 'PackRight gets one ID: SUP-002.'], [10, 'unique id', 'unique ID'], [10, 'to pack rate uses that same id.', 'to PackRight uses that same ID.'],
  [11, 'the id stays', 'the ID stays'], [11, "We don't mind", "We don't want"], [11, 'unique id', 'unique ID'],
  [12, 'supplies table', 'Suppliers table'],
  [13, 'supplies table', 'Suppliers table'],
  [14, 'node column.', 'note column.'],
  [15, '4.', 'Fourth,'], [15, 'pack rate,', 'PackRight,'], [15, 'SUP002', 'SUP-002'], [15, 'LOG0001', 'LOG-0001'], [15, 'And 5.', 'And fifth,'],
  [16, 'I did add', "I'd add"], [16, 'I avoid', 'Avoid'],
  [17, 'Post the video', 'Pause the video'],
  [18, 'mix students', 'mix units'],
  [20, 'supply details,', 'supplier details,'],
  [21, 'That way we are', "That's why we're"],
  [24, 'the visa for activity,', 'the V04 Activity:'], [24, 'bright leaf', 'BrightLeaf'], [24, 'supplies table,', 'Suppliers table,'],
  [26, 'N8N', 'n8n'], [26, 'Claude or charge gpt', 'Claude or ChatGPT'], [26, 'as a AI', 'as the AI'],
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
  } else if (seg.kind === 'pause' && seg.id === 'harrison') {
    // Mr. Harrison's own voice: punctuation from the text, timing from the TTS word boundaries
    const toks = harrison.text.split(/\s+/);
    harrison.words.forEach((w, i) => all.push({w: toks[i] ?? w.w, t: base + HARRISON_LEAD + w.t, e: base + HARRISON_LEAD + w.t + w.d}));
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
const out = process.argv[2] ?? 'work/v04/V04_captions';
fs.writeFileSync('src/data/capwords04full.json', JSON.stringify(all.map((w) => [w.w, +w.t.toFixed(3), +w.e.toFixed(3)])));
fs.writeFileSync(`${out}.srt`, cues.map((c, i) => `${i + 1}\n${ts(c.t, ',')} --> ${ts(c.e, ',')}\n${c.text}\n`).join('\n'));
fs.writeFileSync(`${out}.vtt`, 'WEBVTT\n\n' + cues.map((c) => `${ts(c.t, '.')} --> ${ts(c.e, '.')}\n${c.text}\n`).join('\n'));
const long = cues.filter((c) => c.text.split('\n').some((l) => l.length > 42));
console.log('cues', cues.length, 'over-42 lines', long.length, long.slice(0, 3).map((c) => c.text));
