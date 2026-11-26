"""Idempotently load BrightLeaf master data + canonical starting stock into Odoo (course bible)."""
import sys; sys.path.insert(0, '.')
import odoo_api as o

VENDORS = {
  'Apex Fasteners': ('Columbus', 'US', 'OH'), 'PackRight Industries': ('Chicago', 'US', 'IL'),
  'SafeHands Co.': ('Monterrey', 'MX', None), 'Global Lift Parts': ('Shenzhen', 'CN', None),
  'Shenzhen BrightTech': ('Shenzhen', 'CN', None), 'Gulf Lubricants': ('Dubai', 'AE', None),
}
#        SKU       name                                   cost   RP    lead vendor                 on hand
PRODUCTS = [
  ('BL-1001', 'Steel Hex Bolts M10 (box of 100)',         12.50,   80,  7, 'Apex Fasteners',        145),
  ('BL-1002', 'Corrugated Shipping Box 18x12x10',          0.85, 1500,  5, 'PackRight Industries', 1180),
  ('BL-1003', 'Stretch Wrap Film 500mm',                   9.20,  200,  6, 'PackRight Industries',  260),
  ('BL-1004', 'Industrial Safety Gloves (pair)',           2.40,  600, 10, 'SafeHands Co.',         420),
  ('BL-1005', 'Pallet Jack Wheels (set)',                 38.00,   25, 21, 'Global Lift Parts',      18),
  ('BL-1006', 'Packing Tape 48mm (roll)',                  1.10, 1000,  5, 'PackRight Industries', 1850),
  ('BL-1007', 'Hydraulic Oil 20L',                        54.00,   40, 14, 'Gulf Lubricants',        31),
  ('BL-1008', 'LED Warehouse Light 150W',                 72.00,   30, 28, 'Shenzhen BrightTech',    34),
  ('BL-1009', 'Nylon Cable Ties (pack of 500)',            6.30,  150,  7, 'Apex Fasteners',        410),
  ('BL-1010', 'Forklift Battery Water Kit',               19.75,   20, 12, 'Global Lift Parts',      26),
]

def one(model, dom, vals):
    ids = o.x(model, 'search', dom)
    if ids:
        o.x(model, 'write', ids[:1], vals); return ids[0]
    return o.x(model, 'create', vals)

country = {c: o.x('res.country', 'search', [['code', '=', c]])[0] for c in {'US', 'MX', 'CN', 'AE'}}
vid = {}
for n, (city, cc, st) in VENDORS.items():
    vals = {'name': n, 'is_company': True, 'city': city, 'country_id': country[cc], 'supplier_rank': 1}
    if st: vals['state_id'] = o.x('res.country.state', 'search', [['code', '=', st], ['country_id', '=', country['US']]])[0]
    vid[n] = one('res.partner', [['name', '=', n]], vals)

wh = o.x('stock.warehouse', 'search_read', [], fields=['id', 'lot_stock_id'], limit=1)[0]
loc = wh['lot_stock_id'][0]
for sku, name, cost, rp, lead, vendor, qty in PRODUCTS:
    t = one('product.template', [['default_code', '=', sku]], {
        'name': name, 'default_code': sku, 'type': 'consu', 'is_storable': True, 'standard_price': cost,
        'list_price': round(cost * 1.35, 2), 'purchase_ok': True, 'sale_ok': True})
    p = o.x('product.product', 'search', [['product_tmpl_id', '=', t]])[0]
    one('product.supplierinfo', [['product_tmpl_id', '=', t], ['partner_id', '=', vid[vendor]]],
        {'product_tmpl_id': t, 'partner_id': vid[vendor], 'price': cost, 'delay': lead, 'min_qty': 1})
    one('stock.warehouse.orderpoint', [['product_id', '=', p]], {
        'product_id': p, 'warehouse_id': wh['id'], 'location_id': loc, 'product_min_qty': rp,
        'product_max_qty': rp * 2, 'trigger': 'manual'})
    q = o.x('stock.quant', 'search', [['product_id', '=', p], ['location_id', '=', loc]])
    if q:
        o.x('stock.quant', 'write', q, {'inventory_quantity': qty})
    else:
        q = [o.x('stock.quant', 'create', {'product_id': p, 'location_id': loc, 'inventory_quantity': qty})]
    try:
        o.x('stock.quant', 'action_apply_inventory', q)
    except Exception as e:
        if 'cannot marshal None' not in str(e): raise

rows = o.x('product.product', 'search_read', [['default_code', 'like', 'BL-']], fields=['default_code', 'name', 'qty_available'], order='default_code')
rp = {r[0]: r[3] for r in PRODUCTS}
for r in rows:
    flag = 'LOW' if r['qty_available'] < rp[r['default_code']] else ''
    print(r['default_code'], f"{r['qty_available']:>6.0f}", 'RP', rp[r['default_code']], flag, '-', r['name'])
