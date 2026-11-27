import fs from 'fs';
import {vcue} from './src/lib/cues';
const files = ['src/screen/S1.tsx', 'src/screen/S2.tsx', 'src/screen/S3.tsx', 'src/screen/S4.tsx', 'src/screen/S5.tsx'];
let bad = 0;
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(/T\('(S\d_\d\d)',\s*(['"])(.*?)\2(?:,\s*(\d))?\)/g)) {
    try { vcue(m[1], m[3], m[4] ? Number(m[4]) : 0); } catch (e) { bad++; console.log(f, m[1], JSON.stringify(m[3]), m[4] ?? ''); }
  }
}
console.log('bad cues:', bad);
