"""reset | create : the 4 draft RFQs Stocky prepares (after Sarah approves)."""
import sys; sys.path.insert(0, '.')
import odoo_api as o
import datetime
DEADLINE = (datetime.datetime.utcnow() + datetime.timedelta(days=2)).strftime('%Y-%m-%d 16:00:00')
RFQS = [('PackRight Industries', 'BL-1002', 1820), ('SafeHands Co.', 'BL-1004', 780),
        ('Global Lift Parts', 'BL-1005', 32), ('Gulf Lubricants', 'BL-1007', 49)]
def reset():
    ids = o.x('purchase.order', 'search', [])
    if ids:
        try: o.x('purchase.order', 'button_cancel', ids)
        except Exception as e:
            if 'cannot marshal None' not in str(e): raise
        o.x('purchase.order', 'unlink', ids)
    seq = o.x('ir.sequence', 'search', [['code', '=', 'purchase.order']])
    o.x('ir.sequence', 'write', seq, {'number_next': 1})
    try: o.x('ir.sequence', '_alter_sequence', seq)
    except Exception: pass
    print('reset ok')
def create():
    me = o.uid()
    for vendor, sku, qty in RFQS:
        pid = o.x('res.partner', 'search', [['name', '=', vendor]])[0]
        prod = o.x('product.product', 'search_read', [['default_code', '=', sku]], fields=['id', 'standard_price'])[0]
        po = o.x('purchase.order', 'create', {'partner_id': pid, 'user_id': me, 'date_order': DEADLINE,
             'order_line': [(0, 0, {'product_id': prod['id'], 'product_qty': qty, 'price_unit': prod['standard_price']})]})
        r = o.x('purchase.order', 'read', [po], fields=['name', 'amount_total', 'state'])[0]
        print(r['name'], vendor, r['amount_total'], r['state'])
{'reset': reset, 'create': create}[sys.argv[1]]()
