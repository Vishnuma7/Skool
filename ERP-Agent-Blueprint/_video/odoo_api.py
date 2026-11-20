"""Tiny Odoo XML-RPC helper (reads _video/.env)."""
import ssl, xmlrpc.client, pathlib
ENV = dict(l.split('=', 1) for l in (pathlib.Path(__file__).parent / '.env').read_text().split() if '=' in l)
CTX = ssl.create_default_context(cafile='/etc/ssl/cert.pem')
URL, DB, USER, KEY = ENV['ODOO_URL'], ENV['ODOO_DB'], ENV['ODOO_USER'], ENV['ODOO_API_KEY']
common = xmlrpc.client.ServerProxy(f"{URL}/xmlrpc/2/common", context=CTX)
models = xmlrpc.client.ServerProxy(f"{URL}/xmlrpc/2/object", context=CTX, allow_none=True)
UID = None
def uid():
    global UID
    if UID is None: UID = common.authenticate(DB, USER, KEY, {})
    return UID
def x(model, method, *args, **kw):
    return models.execute_kw(DB, uid(), KEY, model, method, list(args), kw)
