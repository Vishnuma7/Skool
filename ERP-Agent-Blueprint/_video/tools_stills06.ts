// usage: npx tsx tools_stills06.ts <outdir> <scale> <frame|sec:s> ...   renders stills of V06 (bundles once)
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'path';
import fs from 'fs';
const [outDir, scale, ...frames] = process.argv.slice(2);
fs.mkdirSync(outDir, {recursive: true});
(async () => {
  const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), publicDir: path.resolve('public')});
  const composition = await selectComposition({serveUrl, id: 'V06'});
  for (const fr of frames) {
    const frame = fr.startsWith('s') ? Math.round(Number(fr.slice(1)) * 30) : Number(fr);
    const out = path.join(outDir, `${String(frame).padStart(6, '0')}.png`);
    try { await renderStill({serveUrl, composition, frame, output: out, scale: Number(scale)}); }
    catch (e) { console.log('ERR', frame, String(e).slice(0, 300)); }
  }
  console.log('done');
})();
