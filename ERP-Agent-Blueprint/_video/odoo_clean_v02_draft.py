"""Remove any active (non-archived) BL products / Apex contact left by a partial capture run."""
import sys; sys.path.insert(0, '.')
import odoo_api as o
t = o.x('product.template', 'search', [['active', '=', True], '|', ['default_code', 'like', 'BL-'], ['name', 'ilike', 'Steel Hex Bolts']])
if t:
    try: o.x('product.template', 'unlink', t)
    except Exception as e: o.x('product.template', 'write', t, {'active': False})
a = o.x('res.partner', 'search', [['active', '=', True], ['name', '=', 'Apex Fasteners']])
if a:
    try: o.x('res.partner', 'unlink', a)
    except Exception: o.x('res.partner', 'write', a, {'active': False})
print('cleaned products', t, 'apex', a)
