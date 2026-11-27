export const HIDE_V01 = `(() => { let n=0; for (const r of document.querySelectorAll('tr.o_data_row')) if (/V01-BL-/.test(r.textContent)) { r.style.display='none'; n++; }
  for (const e of document.querySelectorAll('.o_pager_value, .o_pager_limit, .o_pager_counter span')) { if (n) e.textContent = e.textContent.replace(/(\\d+)/g, (m)=> String(Math.max(0, +m - n))); } })()`;
