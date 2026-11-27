"""Return the BrightLeaf Odoo to an 'empty' state for the Video 02 walkthrough (archive, never destroy history)."""
import sys; sys.path.insert(0, '.')
import odoo_api as o
def call(model, method, ids):
    try: o.x(model, method, ids)
    except Exception as e:
        if 'cannot marshal None' not in str(e): raise
pos = o.x('purchase.order', 'search', [])
if pos: call('purchase.order', 'button_cancel', pos); o.x('purchase.order', 'unlink', pos)
seq = o.x('ir.sequence', 'search', [['code', '=', 'purchase.order']]); o.x('ir.sequence', 'write', seq, {'number_next': 1})
ops = o.x('stock.warehouse.orderpoint', 'search', [['active', 'in', [True, False]]])
if ops: o.x('stock.warehouse.orderpoint', 'unlink', ops)
tmpl = o.x('product.template', 'search', [['default_code', 'like', 'BL-'], ['active', '=', True]])
if tmpl: o.x('product.template', 'write', tmpl, {'active': False})
vend = o.x('res.partner', 'search', [['supplier_rank', '>', 0], ['active', '=', True], ['id', '!=', 1]])
names = [p['name'] for p in o.x('res.partner', 'read', vend, fields=['name'])] if vend else []
if vend: o.x('res.partner', 'write', vend, {'active': False})
print('POs removed', len(pos), '| orderpoints removed', len(ops), '| products archived', len(tmpl), '| vendors archived', names)
print('active products', o.x('product.template', 'search_count', [['sale_ok', 'in', [True, False]]]))
print('contacts', [p['name'] for p in o.x('res.partner', 'search_read', [['is_company', 'in', [True, False]]], fields=['name'], limit=20)])
