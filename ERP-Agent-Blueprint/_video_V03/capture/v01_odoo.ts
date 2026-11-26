import {execFileSync} from 'child_process';
import {connect} from './cdp';
import {prep, shot, byText} from './snap';
const URL = 'https://brightleaf-supplies.odoo.com/odoo/purchase';
const rows = (n: number) => `js:document.querySelectorAll('.o_list_table tbody tr.o_data_row')[${n}]`;
const th = (txt: string) => byText(txt, '.o_list_table thead th');
(async () => {
  execFileSync('python3', ['-I', 'odoo_rfqs.py', 'reset'], {stdio: 'inherit'});
  const b = await connect();
  try {
    const p = b.contexts()[0].pages().find((x) => x.url().includes('odoo.com'))!;
    await p.goto(URL); await p.waitForSelector('.o_list_table, .o_view_nocontent', {timeout: 30000});
    await prep(p); await p.waitForTimeout(2500); await p.mouse.move(1900, 1070);
    await shot(p, 'odoo_rfq_empty', {orders: byText('Orders', '.o_main_navbar button, .o_main_navbar a, .o_main_navbar span'), breadcrumb: '.o_breadcrumb, .o_last_breadcrumb_item'});
    await p.locator('.o_main_navbar').getByText('Orders', {exact: true}).first().click(); await p.waitForTimeout(900);
    await shot(p, 'odoo_orders_menu', {rfqItem: byText('Requests for Quotation', '.dropdown-menu a, .dropdown-item, .o-dropdown-item'), orders: byText('Orders', '.o_main_navbar button, .o_main_navbar a')});
    await p.keyboard.press('Escape');
    execFileSync('python3', ['-I', 'odoo_rfqs.py', 'create'], {stdio: 'inherit'});
    await p.goto(URL); await p.waitForSelector('.o_list_table tbody tr.o_data_row', {timeout: 30000});
    await prep(p); await p.waitForTimeout(2500); await p.mouse.move(1900, 1070);
    await shot(p, 'odoo_rfq_list', {r0: rows(0), r1: rows(1), r2: rows(2), r3: rows(3), vendor: th('Vendor'), total: th('Total'), status: th('Status'), breadcrumb: '.o_breadcrumb, .o_last_breadcrumb_item',
      vendorCol: `js:(() => { const h=[...document.querySelectorAll('.o_list_table thead th')].find(e=>e.textContent.includes('Vendor')); const rs=document.querySelectorAll('.o_list_table tbody tr.o_data_row'); const a=h.getBoundingClientRect(), z=rs[rs.length-1].getBoundingClientRect(); return {getBoundingClientRect:()=>({x:a.x,y:a.y,width:a.width,height:z.bottom-a.y})}; })()`,
      totalCol: `js:(() => { const h=[...document.querySelectorAll('.o_list_table thead th')].find(e=>e.textContent.includes('Total')); const rs=document.querySelectorAll('.o_list_table tbody tr.o_data_row'); const a=h.getBoundingClientRect(), z=rs[rs.length-1].getBoundingClientRect(); return {getBoundingClientRect:()=>({x:a.x,y:a.y,width:a.width,height:z.bottom-a.y})}; })()`,
    });
  } finally { await b.close(); }
})();
