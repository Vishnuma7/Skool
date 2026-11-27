// Captions for Video 04 screen sections (VO only). Writes src/data/capwords04.json (global timeline, for burned captions)
// and one SRT/VTT per section, timed from that section's own 0:00.  usage: npx tsx tools_captions04.ts <outDir>
import fs from 'fs';
import vo from './vo04/timings.json';
import {beatLayout, layout} from './src/v04/timeline';
type Wd = {w: string; t: number; e: number};
const FPS = 30;
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
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


const outDir = process.argv[2] ?? 'work/v04';
fs.mkdirSync(outDir, {recursive: true});
const ts = (s: number, sep: string) => {
  const ms = Math.max(0, Math.round(s * 1000));
  const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000), sec = Math.floor((ms % 60000) / 1000), r = ms % 1000;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}${sep}${String(r).padStart(3, '0')}`;
};
const global: Wd[] = [];
for (const {seg, from} of layout()) {
  const base = from / FPS;
  const {starts} = beatLayout(seg.beats);
  const all: Wd[] = [];
  for (const k of seg.beats) for (const w of voWords(k)) all.push({w: w.w, t: starts[k] + w.t, e: starts[k] + w.e});
  for (const w of all) global.push({w: w.w, t: base + w.t, e: base + w.e});
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
  const name = `${outDir}/V04_${seg.id}_captions`;
  fs.writeFileSync(`${name}.srt`, cues.map((c, i) => `${i + 1}\n${ts(c.t, ',')} --> ${ts(c.e, ',')}\n${c.text}\n`).join('\n'));
  fs.writeFileSync(`${name}.vtt`, 'WEBVTT\n\n' + cues.map((c) => `${ts(c.t, '.')} --> ${ts(c.e, '.')}\n${c.text}\n`).join('\n'));
  console.log(seg.id, 'cues', cues.length, 'over-42', cues.filter((c) => c.text.split('\n').some((l) => l.length > 42)).length);
}
fs.writeFileSync('src/data/capwords04.json', JSON.stringify(global.map((w) => [w.w, +w.t.toFixed(3), +w.e.toFixed(3)])));
