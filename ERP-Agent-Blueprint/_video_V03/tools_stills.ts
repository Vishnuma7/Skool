// usage: npx tsx tools_stills.ts <comp> <outdir> <scale> <frame> [frame...]   (frames may be "seg:id:seconds")
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'path';
import fs from 'fs';
import {clipToSeg, layout} from './src/timeline';
const [comp, outDir, scale, ...frames] = process.argv.slice(2);
fs.mkdirSync(outDir, {recursive: true});
const toFrame = (s: string) => {
  if (!s.includes(':')) return Number(s);
  const [, id, sec] = s.split(':');
  const it = layout().find((x) => x.seg.id === id)!;
  const seg = it.seg as any;
  const off = seg.kind === 'oncam' ? clipToSeg(seg.keeps, Number(sec), true)! : Number(sec);
  return it.from + Math.round(off * 30);
};
(async () => {
  const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), publicDir: path.resolve('public')});
  const composition = await selectComposition({serveUrl, id: comp});
  for (const fr of frames) {
    const frame = toFrame(fr);
    const out = path.join(outDir, `${fr.replace(/:/g, '_')}.png`);
    await renderStill({serveUrl, composition, frame, output: out, scale: Number(scale)});
    console.log('ok', fr, frame);
  }
})();
