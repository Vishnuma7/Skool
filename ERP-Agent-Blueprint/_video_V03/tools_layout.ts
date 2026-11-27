import {layout, TOTAL_FRAMES} from './src/timeline';
for (const {seg, from, dur} of layout()) console.log(seg.id.padEnd(6), String(from).padStart(6), String(dur).padStart(5), (from / 30).toFixed(1) + 's', '+' + (dur / 30).toFixed(1) + 's');
console.log('TOTAL', TOTAL_FRAMES, (TOTAL_FRAMES / 30 / 60).toFixed(2), 'min');
