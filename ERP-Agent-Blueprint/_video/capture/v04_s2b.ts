// V04 S2 part B: supplier rows.
import fs from 'fs';
import {connect} from './cdp';
import {prepSheets, snapSheet, goto, measure, typeRow} from './sheets';
export const ROWS = [
  ['SUP-001', 'Apex Fasteners', 'Columbus', 'US', 'USD', '39.96', '-83.00', 'orders@apexfasteners.example', 'TRUE'],
  ['SUP-002', 'PackRight Industries', 'Chicago', 'US', 'USD', '41.88', '-87.63', 'sales@packright.example', 'TRUE'],
  ['SUP-003', 'SafeHands Co.', 'Monterrey', 'MX', 'MXN', '25.69', '-100.32', 'supply@safehands.example', 'TRUE'],
  ['SUP-004', 'Global Lift Parts', 'Shenzhen', 'CN', 'CNY', '22.54', '114.06', 'export@globallift.example', 'TRUE'],
  ['SUP-005', 'Gulf Lubricants', 'Dubai', 'AE', 'AED', '25.20', '55.27', 'trade@gulflube.example', 'TRUE'],
  ['SUP-006', 'Shenzhen BrightTech', 'Shenzhen', 'CN', 'CNY', '22.54', '114.06', 'b2b@brighttech.example', 'TRUE'],
];
(async () => {
  const b = await connect();
  try {
    const p = b.contexts()[0].pages().find((x) => x.url().includes(JSON.parse(fs.readFileSync('work/v04/docs.json', 'utf8')).stocky))!;
    await prepSheets(p);
    await typeRow(p, 'A2', ROWS[0].slice(0, 5)); await goto(p, 'F2');
    await snapSheet(p, 's2_row2_half', await measure(p, {a2: 'A2'}).then(async (m) => { await goto(p, 'F2'); return m; }));
    await typeRow(p, 'F2', ROWS[0].slice(5)); await goto(p, 'A3');
    await snapSheet(p, 's2_row2', {});
    await typeRow(p, 'A3', ROWS[1]); await goto(p, 'A4');
    await snapSheet(p, 's2_row3', {});
    for (let i = 2; i < 6; i++) await typeRow(p, `A${i + 2}`, ROWS[i]);
    const m = await measure(p, {a2: 'A2', ids: 'A2:A7', a5: 'A5', latlong5: 'F5:G5', lat: 'F2:G7', cur: 'E2:E7', r5: 'A5:I5', r7: 'A7:I7', table: 'A1:I7', d: 'D2:D7', i6: 'I6', r6: 'A6:I6'});
    await goto(p, 'A8');
    await snapSheet(p, 's2_rows_all', m);
    fs.writeFileSync('work/v04/s2_rects.json', JSON.stringify(m));
  } catch (e) { console.error('ERR', e); } finally { process.exit(0); }
})();
