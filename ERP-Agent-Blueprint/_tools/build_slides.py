"""Build the Video 1 and Video 2 lesson slide decks on the Slidesgo 'ADAPTADA' theme.

Usage:  .venv/bin/python ERP-Agent-Blueprint/_tools/build_slides.py <assets_dir>
assets_dir holds  icons/<Name>_<w|g|m|r>.png, icons/logo_<name>.png and img/*.jpg (frames from the final videos).
Output: Video_01/V01_Slides.pptx, Video_02/V02_Slides.pptx
"""
import copy, os, sys
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.oxml.ns import qn
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
THEME = os.path.join(ROOT, 'ADAPTADA - Technology Consulting Toolkit by Slidesgo.pptx')
A = sys.argv[1]
ICON = os.path.join(A, 'icons')
IMG = os.path.join(A, 'img')
CAP = os.path.join(ROOT, '_video', 'public')
os.makedirs(os.path.join(A, 'crops'), exist_ok=True)

# Theme palette (from the template's theme3.xml)
G, M, T, LM, TX = '305C54', '44D4B4', '4C9484', '93E6D3', '212121'
MUTED, CARD, TINT, LINE, RED = '55625F', 'FFFFFF', 'E2F5EF', 'C9D6D2', 'C0392B'
BODY, HEAD = 'Open Sans', 'Inconsolata'


def rgb(h):
    return RGBColor.from_string(h)


# ------------------------------------------------------------------ deck plumbing
def new_deck():
    p = Presentation(THEME)
    lst = p.slides._sldIdLst
    for sid in list(lst):
        p.part.drop_rel(sid.get(qn('r:id')))
        lst.remove(sid)
    return p


def layout(p, name):
    for l in p.slide_masters[0].slide_layouts:
        if l.name == name:
            return l
    raise KeyError(name)


def slide(p, lay='TITLE_ONLY', title=None, notes=None):
    s = p.slides.add_slide(layout(p, lay))
    if title is not None:
        s.shapes.title.text = title
    for ph in list(s.placeholders):  # remove unused placeholders
        if ph.has_text_frame and not ph.text_frame.text.strip():
            ph._element.getparent().remove(ph._element)
    if notes:
        s.notes_slide.notes_text_frame.text = notes
    return s


def _bullet(par, on, color=T):
    pPr = par._p.get_or_add_pPr()
    for tag in ('a:buNone', 'a:buChar', 'a:buClr', 'a:buSzPct', 'a:buFont'):
        for e in pPr.findall(qn(tag)):
            pPr.remove(e)
    if on:
        pPr.set('marL', str(Emu(Inches(0.22))))
        pPr.set('indent', str(-Emu(Inches(0.2))))
        clr = pPr.makeelement(qn('a:buClr'), {})
        c = clr.makeelement(qn('a:srgbClr'), {'val': color}); clr.append(c)
        pPr.append(clr)
        pPr.append(pPr.makeelement(qn('a:buFont'), {'typeface': 'Arial'}))
        pPr.append(pPr.makeelement(qn('a:buChar'), {'char': '•'}))
    else:
        pPr.set('marL', '0'); pPr.set('indent', '0')
        pPr.append(pPr.makeelement(qn('a:buNone'), {}))


def text(s, x, y, w, h, paras, size=14, color=TX, bold=False, align='l', anchor='t', font=BODY,
         bullets=False, space=4, line=None, name=None):
    """paras: str | list of (str | list of runs). run = str | (str, {bold,color,size,font,italic})."""
    tb = s.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    if name: tb.name = name
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = {'t': MSO_ANCHOR.TOP, 'm': MSO_ANCHOR.MIDDLE, 'b': MSO_ANCHOR.BOTTOM}[anchor]
    if isinstance(paras, str):
        paras = [paras]
    for i, para in enumerate(paras):
        par = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        par.alignment = {'l': PP_ALIGN.LEFT, 'c': PP_ALIGN.CENTER, 'r': PP_ALIGN.RIGHT}[align]
        par.space_after = Pt(space)
        if line: par.line_spacing = line
        _bullet(par, bullets)
        runs = para if isinstance(para, list) else [para]
        for r in runs:
            t, o = (r, {}) if isinstance(r, str) else r
            run = par.add_run(); run.text = t
            f = run.font
            f.name = o.get('font', font); f.size = Pt(o.get('size', size))
            f.bold = o.get('bold', bold); f.italic = o.get('italic', False)
            f.color.rgb = rgb(o.get('color', color))
    return tb


def box(s, x, y, w, h, fill=CARD, line=None, radius=0.12, shape=MSO_SHAPE.ROUNDED_RECTANGLE, shadow=False, name=None):
    sh = s.shapes.add_shape(shape, Inches(x), Inches(y), Inches(w), Inches(h))
    if name: sh.name = name
    if shape == MSO_SHAPE.ROUNDED_RECTANGLE:
        sh.adjustments[0] = min(0.5, radius / min(w, h))
    if fill is None:
        sh.fill.background()
    else:
        sh.fill.solid(); sh.fill.fore_color.rgb = rgb(fill)
    if line:
        sh.line.color.rgb = rgb(line); sh.line.width = Pt(1)
    else:
        sh.line.fill.background()
    if shadow:
        sp = sh._element.spPr
        eff = sp.makeelement(qn('a:effectLst'), {})
        sd = eff.makeelement(qn('a:outerShdw'), {'blurRad': '190500', 'dist': '38100', 'dir': '5400000', 'algn': 't', 'rotWithShape': '0'})
        c = sd.makeelement(qn('a:srgbClr'), {'val': '1F3A34'})
        a = c.makeelement(qn('a:alpha'), {'val': '16000'}); c.append(a); sd.append(c); eff.append(sd); sp.append(eff)
    else:
        sh.shadow.inherit = False
    sh.text_frame.text = ''
    return sh


def icon(s, name, x, y, d, color='w', bg=G):
    """Icon in a filled circle (bg) or bare (bg=None)."""
    if bg:
        box(s, x, y, d, d, fill=bg, shape=MSO_SHAPE.OVAL)
        pad = d * 0.24
        s.shapes.add_picture(os.path.join(ICON, f'{name}_{color}.png'), Inches(x + pad), Inches(y + pad), Inches(d - 2 * pad), Inches(d - 2 * pad))
    else:
        s.shapes.add_picture(os.path.join(ICON, f'{name}_{color}.png'), Inches(x), Inches(y), Inches(d), Inches(d))


def logo(s, name, x, y, w, h):
    path = os.path.join(ICON, f'logo_{name}.png')
    iw, ih = Image.open(path).size
    sc = min(w / iw, h / ih)
    s.shapes.add_picture(path, Inches(x + (w - iw * sc) / 2), Inches(y + (h - ih * sc) / 2), Inches(iw * sc), Inches(ih * sc))


def crop(src, bx, key):
    out = os.path.join(A, 'crops', key + '.jpg')
    im = Image.open(src).convert('RGB')
    if bx: im = im.crop(bx)
    im.thumbnail((2400, 2400))
    im.save(out, quality=90)
    return out


def pic(s, path, x, y, w, h, frame=True, align='c'):
    """Fit image inside (x,y,w,h), keep aspect, optional white card frame with shadow."""
    iw, ih = Image.open(path).size
    sc = min(w / iw, h / ih)
    pw, ph = iw * sc, ih * sc
    px = x + (w - pw) / 2 if align == 'c' else x
    py = y + (h - ph) / 2
    if frame:
        box(s, px - 0.06, py - 0.06, pw + 0.12, ph + 0.12, fill=CARD, radius=0.08, shadow=True)
    pc = s.shapes.add_picture(path, Inches(px), Inches(py), Inches(pw), Inches(ph))
    pc.line.color.rgb = rgb('DCE3E1'); pc.line.width = Pt(0.75)
    return px, py, pw, ph


def pill(s, x, y, w, h, label, fill=G, color='FFFFFF', size=12, bold=True):
    box(s, x, y, w, h, fill=fill, radius=h / 2)
    text(s, x, y, w, h, label, size=size, color=color, bold=bold, align='c', anchor='m')


def numdot(s, n, x, y, d=0.42, fill=M, color=G, size=14):
    box(s, x, y, d, d, fill=fill, shape=MSO_SHAPE.OVAL)
    text(s, x, y, d, d, str(n), size=size, color=color, bold=True, align='c', anchor='m', font=HEAD)


def card(s, x, y, w, h, head, body, ic=None, fill=CARD, head_size=15, body_size=12, icon_bg=G, shadow=True):
    box(s, x, y, w, h, fill=fill, shadow=shadow)
    tx = x + 0.2
    if ic:
        icon(s, ic, x + 0.2, y + 0.2, 0.46, bg=icon_bg)
        text(s, x + 0.78, y + 0.2, w - 0.95, 0.46, head, size=head_size, bold=True, color=G, anchor='m')
        text(s, tx, y + 0.78, w - 0.4, h - 0.9, body, size=body_size, color=TX)
    else:
        text(s, tx, y + 0.18, w - 0.4, 0.4, head, size=head_size, bold=True, color=G)
        text(s, tx, y + 0.62, w - 0.4, h - 0.75, body, size=body_size, color=TX)


def tag(s, label):
    """Small kicker label, top right, like the template's section tags."""
    text(s, 4.2, 0.12, 5.4, 0.25, label, size=10, color=T, bold=True, align='r')


def credits(p, video):
    s = slide(p, 'TITLE_ONLY', 'Credits')
    text(s, 0.78, 1.4, 8.2, 2.4, [
        'Presentation template: ADAPTADA Technology Consulting Toolkit by Slidesgo (slidesgo.com), with infographics by Freepik.',
        'Icons: Lucide (lucide.dev). Portraits: Unsplash (Unsplash License).',
        'Screenshots: Odoo, n8n, Claude, Gmail and Google Sheets, captured for this course. All BrightLeaf data is fictional.',
    ], size=13, color=MUTED, bullets=True, space=10)
    text(s, 0.78, 4.6, 8.4, 0.4, f'The ERP Agent Blueprint · {video}', size=12, color=T, bold=True)


# ------------------------------------------------------------------ VIDEO 1
def build_v01():
    p = new_deck()
    V = 'VIDEO 1 · WHY YOUR ERP NEEDS AN AI AGENT'

    # 1 Title
    s = slide(p, 'TITLE', 'Why Your ERP Needs an AI Agent', notes='Welcome. In this lesson: what an AI agent really is, a demo of Stocky, and the map of the course.')
    text(s, 0.78, 3.9, 5.6, 0.4, 'The ERP Agent Blueprint · Video 1', size=16, color=G, bold=True)
    text(s, 0.78, 4.3, 5.6, 0.4, 'Beginner · 16 minutes · No code', size=13, color=MUTED)
    icon(s, 'Bot', 6.85, 1.25, 2.3, bg=G)
    pill(s, 6.95, 3.75, 2.1, 0.42, 'Meet Stocky', fill=M, color=G, size=13)

    # 2 576 hours
    s = slide(p, 'TITLE_ONLY', 'The 576-hour problem', notes='12 hours a week of copying numbers, chasing suppliers and building the Monday report adds up to 576 hours a year.')
    tag(s, V)
    text(s, 0.78, 1.35, 4.2, 1.4, '576', size=96, bold=True, color=G, font=HEAD)
    text(s, 0.82, 2.75, 4.2, 0.4, 'hours a year on repetitive ERP work', size=15, color=TX, bold=True)
    rows = [('12 h', 'a week: copying ERP numbers, chasing suppliers, the Monday report'), ('× 48', 'working weeks'), ('≈ 14', 'working weeks: three and a half months')]
    for i, (a, b) in enumerate(rows):
        y = 3.3 + i * 0.55
        text(s, 0.82, y, 0.85, 0.45, a, size=17, bold=True, color=T, font=HEAD, anchor='m')
        text(s, 1.7, y, 3.4, 0.45, b, size=12, color=TX, anchor='m')
    # 52-week calendar, 14 weeks shaded
    box(s, 5.35, 1.35, 3.9, 3.75, fill=CARD, shadow=True)
    text(s, 5.6, 1.5, 3.4, 0.35, 'One year = 52 weeks', size=13, bold=True, color=G)
    for k in range(52):
        cx, cy = 5.6 + (k % 8) * 0.43, 1.98 + (k // 8) * 0.38
        box(s, cx, cy, 0.34, 0.28, fill=(G if k >= 38 else 'E7ECEA'), radius=0.05)
    pill(s, 5.6, 4.62, 3.4, 0.34, '14 weeks lost to copy-and-paste', fill=TINT, color=G, size=11)

    # 3 BrightLeaf
    s = slide(p, 'TITLE_ONLY', 'Meet BrightLeaf Supplies', notes='Our case study for the whole course. Fictional distributor in Columbus, Ohio, running on Odoo.')
    tag(s, V)
    box(s, 0.78, 1.35, 3.0, 3.75, fill=G, shadow=True)
    icon(s, 'Warehouse', 1.0, 1.6, 0.6, color='g', bg=M)
    text(s, 1.0, 2.35, 2.6, 0.7, 'BrightLeaf Supplies', size=18, bold=True, color='FFFFFF')
    text(s, 1.0, 3.0, 2.6, 2.0, ['Industrial & packaging supplies', 'Warehouse in Columbus, Ohio', 'Customers across the US and Canada', 'Runs on Odoo'], size=12, color='FFFFFF', bullets=True, space=6)
    cast = [('sarah', 'Sarah Mitchell', 'Procurement & Inventory Manager', 'Our hero. 12 h a week on manual ERP work.'),
            ('tom', 'Tom', 'Warehouse lead', 'Knows what is really on the shelf.'),
            ('harrison', 'Mr. Harrison', 'Operations Director', 'Wants the Monday stock report.')]
    for i, (f, n, r, d) in enumerate(cast):
        y = 1.35 + i * 1.28
        box(s, 4.05, y, 5.17, 1.13, fill=CARD, shadow=True)
        s.shapes.add_picture(os.path.join(CAP, 'faces', f + '.jpg'), Inches(4.22), Inches(y + 0.14), Inches(0.85), Inches(0.85))
        text(s, 5.25, y + 0.12, 3.8, 0.3, n, size=14, bold=True, color=G)
        text(s, 5.25, y + 0.42, 3.8, 0.25, r, size=11, bold=True, color=T)
        text(s, 5.25, y + 0.7, 3.8, 0.3, d, size=11, color=MUTED)

    # 4 Promise
    s = slide(p, 'TITLE_ONLY', 'The promise of this course', notes='By the end you will have built a working agent that does these four things, without writing code.')
    tag(s, V)
    text(s, 0.78, 1.2, 8.4, 0.4, 'By the end, you will have built a working AI agent that:', size=14, color=MUTED)
    items = [('Archive', 'Reads your ERP', 'Stock levels from Odoo'), ('CloudRain', 'Checks outside data', 'Weather, currency, holidays'),
             ('FileSpreadsheet', 'Writes to a database', 'Every decision logged'), ('Mail', 'Alerts you', 'Email with Approve / Decline')]
    for i, (ic, h, b) in enumerate(items):
        x = 0.78 + i * 2.15
        box(s, x, 1.8, 1.95, 2.2, fill=CARD, shadow=True)
        icon(s, ic, x + 0.65, 2.0, 0.65, bg=G)
        text(s, x + 0.12, 2.8, 1.71, 0.5, h, size=14, bold=True, color=G, align='c')
        text(s, x + 0.12, 3.3, 1.71, 0.6, b, size=11, color=MUTED, align='c')
    pill(s, 3.1, 4.35, 3.8, 0.5, '0 lines of code', fill=M, color=G, size=16)

    # 5 Monday email
    s = slide(p, 'TITLE_ONLY', "Stocky's Monday 7:00 AM email", notes='The finished agent. It checked 10 products, found 4 below reorder point and explains its reasoning. BL-1005 gets a risk note.')
    tag(s, V)
    pic(s, os.path.join(IMG, 'email.jpg'), 0.78, 1.3, 5.6, 3.85)
    facts = [('10', 'products checked'), ('4', 'below reorder point'), ('$7,281', 'total suggested spend')]
    for i, (a, b) in enumerate(facts):
        y = 1.3 + i * 0.72
        text(s, 6.7, y, 1.25, 0.6, a, size=22, bold=True, color=G, font=HEAD, anchor='m')
        text(s, 7.95, y, 1.3, 0.6, b, size=11, color=TX, anchor='m')
    box(s, 6.7, 3.55, 2.55, 1.3, fill=TINT)
    text(s, 6.85, 3.65, 2.3, 1.15, [[('BL-1005 risk: ', {'bold': True, 'color': RED}), 'storms in Shenzhen, US Thanksgiving next week, 21-day lead time. '], [('"Order today."', {'bold': True, 'color': G})]], size=11)

    # 6 Behind the curtain
    s = slide(p, 'TITLE_ONLY', 'Behind the curtain: the Stocky workflow', notes='Every box is one step in n8n. No code.')
    tag(s, V)
    pic(s, crop(os.path.join(CAP, 'cap', 'n8n_stocky.png'), (0, 260, 3840, 1560), 'n8n_stocky'), 0.78, 1.25, 8.44, 2.75)
    steps = [('Timer', 'Timer'), ('Archive', 'Odoo'), ('Bot', 'AI Agent'), ('CloudRain', 'Weather · FX · Holidays'), ('FileSpreadsheet', 'Sheet log'), ('Mail', 'Email + approval'), ('ShoppingCart', 'Draft RFQs')]
    for i, (ic, lb) in enumerate(steps):
        x = 0.78 + i * 1.22
        icon(s, ic, x + 0.3, 4.2, 0.42, bg=(M if ic == 'Bot' else G), color=('g' if ic == 'Bot' else 'w'))
        text(s, x - 0.05, 4.68, 1.12, 0.45, lb, size=10, color=TX, bold=True, align='c')

    # 7 Human click
    s = slide(p, 'TITLE_ONLY', 'The human click', notes='Stocky prepares; Sarah approves. Draft RFQs appear in Odoo only after she clicks Approve.')
    tag(s, V)
    box(s, 0.78, 1.3, 2.7, 3.8, fill='EEF1F0', shadow=False)
    icon(s, 'Clock', 1.08, 1.55, 0.55, bg=MUTED)
    text(s, 1.08, 2.25, 2.2, 0.4, 'Before', size=13, bold=True, color=MUTED)
    text(s, 1.08, 2.6, 2.3, 0.8, '~3 hours', size=30, bold=True, color=MUTED, font=HEAD)
    text(s, 1.08, 3.35, 2.2, 1.5, 'every Monday morning: export, copy, check, email', size=12, color=MUTED)
    box(s, 3.68, 1.3, 2.7, 3.8, fill=G, shadow=True)
    icon(s, 'Hand', 3.98, 1.55, 0.55, color='g', bg=M)
    text(s, 3.98, 2.25, 2.2, 0.4, 'With Stocky', size=13, bold=True, color=M)
    text(s, 3.98, 2.6, 2.3, 0.8, '90 sec', size=30, bold=True, color='FFFFFF', font=HEAD)
    text(s, 3.98, 3.35, 2.2, 0.8, 'read the email, click Approve', size=12, color='FFFFFF')
    pill(s, 3.98, 4.35, 1.2, 0.4, 'Approve', fill='1E9E50', size=12)
    box(s, 6.6, 1.3, 2.62, 2.55, fill=CARD, shadow=True)
    text(s, 6.78, 1.4, 2.3, 0.3, 'DRAFT RFQs IN ODOO', size=10, bold=True, color=T)
    rfqs = [('P00001', 'PackRight', '$1,547'), ('P00002', 'SafeHands', '$1,872'), ('P00003', 'Global Lift', '$1,216'), ('P00004', 'Gulf Lubricants', '$2,646')]
    for i, (a, b, c) in enumerate(rfqs):
        y = 1.75 + i * 0.42
        text(s, 6.78, y, 0.75, 0.35, a, size=10, bold=True, color=G, anchor='m')
        text(s, 7.5, y, 1.0, 0.35, b, size=10, anchor='m')
        text(s, 8.35, y, 0.75, 0.35, c, size=10, align='r', anchor='m')
    text(s, 6.78, 3.45, 2.32, 0.3, [[('Total ', {'color': MUTED}), ('$7,281', {'bold': True, 'color': G})]], size=11, align='r')
    text(s, 6.6, 4.05, 2.62, 1.05, [[('Only after Approve. ', {'bold': True, 'color': G}), 'Stocky prepares; Sarah decides.']], size=12)

    # 8 Sarah's Monday before
    s = slide(p, 'TITLE_ONLY', "Sarah's Monday before Stocky", notes='The job asked her to be a copy machine, a calculator and an analyst at once.')
    tag(s, V)
    tasks = ['Export stock from Odoo', 'Copy & paste into Excel', 'Fix broken formulas', 'Highlight the red rows', 'Email suppliers for dates', "Build Mr. Harrison's report"]
    text(s, 0.78, 1.25, 4, 0.35, '8:30 AM → 11:00 AM', size=14, bold=True, color=T, font=HEAD)
    for i, t in enumerate(tasks):
        y = 1.7 + i * 0.56
        numdot(s, i + 1, 0.78, y, d=0.4, size=12)
        text(s, 1.35, y, 3.6, 0.4, t, size=13, anchor='m')
    # 60-row sheet with row 41 red
    box(s, 5.5, 1.25, 3.72, 3.9, fill=CARD, shadow=True)
    text(s, 5.7, 1.38, 3.3, 0.3, 'Monday report: 60 rows', size=12, bold=True, color=G)
    for r in range(60):
        cx, cy = 5.7 + (r // 20) * 1.08, 1.78 + (r % 20) * 0.135
        box(s, cx, cy, 0.98, 0.09, fill=(RED if r == 40 else 'E2E8E6'), radius=0.02)
    text(s, 5.7, 4.55, 3.3, 0.5, [[('Stretch wrap', {'bold': True, 'color': RED}), ' was on the report... in row 41.']], size=12)

    # 9 Three words
    s = slide(p, 'TITLE_ONLY', 'Three words, three different things', notes='Chatbot talks. Automation follows a fixed recipe. An agent reasons toward a goal, uses tools and acts with approval.')
    tag(s, V)
    cols = [('MessageSquare', 'Chatbot', 'e.g. Claude, ChatGPT', ['Talks', 'No access to your systems', 'You do the work']),
            ('ListOrdered', 'Automation', 'e.g. an n8n IF rule', ['Follows fixed steps', 'Fast and reliable', 'No judgement']),
            ('Bot', 'AI Agent', 'e.g. Stocky', ['Reasons toward a goal', 'Uses tools', 'Acts with approval'])]
    for i, (ic, h, e, bl) in enumerate(cols):
        x = 0.78 + i * 2.88
        dark = i == 2
        box(s, x, 1.3, 2.68, 3.8, fill=(G if dark else CARD), shadow=True)
        icon(s, ic, x + 0.25, 1.5, 0.6, bg=(M if dark else G), color=('g' if dark else 'w'))
        text(s, x + 0.25, 2.25, 2.3, 0.4, h, size=18, bold=True, color=('FFFFFF' if dark else G))
        text(s, x + 0.25, 2.65, 2.3, 0.3, e, size=11, color=(LM if dark else T))
        text(s, x + 0.25, 3.15, 2.3, 1.8, bl, size=13, color=('FFFFFF' if dark else TX), bullets=True, space=8)

    # 10 Chatbot test
    s = slide(p, 'TITLE_ONLY', 'Test 1: the chatbot', notes='A brilliant brain in a room with no doors. It can only think about what you type into it.')
    tag(s, V)
    pic(s, crop(os.path.join(CAP, 'cap', 'claude_answer.png'), (1100, 180, 2900, 1500), 'claude'), 0.78, 1.25, 4.3, 3.9)
    box(s, 5.4, 1.3, 3.82, 1.0, fill=TINT)
    text(s, 5.55, 1.38, 3.55, 0.85, [[('Question: ', {'bold': True, 'color': G}), '"How many Steel Hex Bolts M10 do we have in stock right now?"']], size=12, anchor='m')
    box(s, 5.4, 2.45, 3.82, 0.85, fill=CARD, shadow=True)
    text(s, 5.55, 2.5, 3.55, 0.75, [[('Answer: ', {'bold': True, 'color': G}), "it can't see BrightLeaf's inventory system."]], size=12, anchor='m')
    icon(s, 'Lock', 5.4, 3.6, 0.6, bg=G)
    text(s, 6.15, 3.55, 3.1, 1.2, [[('A brilliant brain in a room with no doors.', {'bold': True, 'color': G})], 'It talks. It cannot open Odoo or send an email.'], size=13)

    # 11 Automation test
    s = slide(p, 'TITLE_ONLY', 'Test 2: the automation', notes='The rule follows the recipe exactly, even when the rule is wrong. 26 is one above 25, so it stays silent.')
    tag(s, V)
    pic(s, crop(os.path.join(CAP, 'cap', 'n8n_old_if.png'), (900, 120, 2500, 800), 'n8n_if'), 0.78, 1.25, 4.6, 2.6)
    box(s, 0.78, 4.05, 4.6, 1.05, fill=G)
    text(s, 0.98, 4.1, 4.2, 0.95, [[('IF ', {'bold': True, 'color': M}), 'quantity on hand < reorder point'], [('THEN ', {'bold': True, 'color': M}), 'send an email']], size=14, color='FFFFFF', anchor='m', font=HEAD)
    box(s, 5.65, 1.25, 3.57, 3.85, fill=CARD, shadow=True)
    text(s, 5.85, 1.4, 3.2, 0.3, 'WHAT IF…', size=11, bold=True, color=T)
    text(s, 5.85, 1.7, 3.2, 0.5, 'Pallet jack wheels: 26 on hand', size=14, bold=True, color=G)
    text(s, 5.85, 2.2, 3.2, 0.3, 'Reorder point 25  →  26 > 25', size=12, color=TX)
    text(s, 5.85, 2.65, 3.2, 1.3, ['Supplier in Shenzhen', 'Storms and a holiday coming', '21-day lead time'], size=12, bullets=True, space=4)
    pill(s, 5.85, 4.4, 3.2, 0.44, 'No alert. It stays silent.', fill=RED, size=12)

    # 12 Agent test
    s = slide(p, 'TITLE_ONLY', 'Test 3: the agent', notes="Nobody wrote a 'Shenzhen plus rain plus holiday' rule. The agent worked it out from a goal, tools and rules.")
    tag(s, V)
    pic(s, crop(os.path.join(CAP, 'cap', 'n8n_agent_panel.png'), (720, 300, 2240, 1950), 'agent'), 0.78, 1.25, 3.4, 3.9)
    box(s, 4.45, 1.25, 4.77, 2.05, fill=G, shadow=True)
    text(s, 4.65, 1.35, 4.4, 0.3, "STOCKY'S INSTRUCTIONS (PLAIN ENGLISH)", size=10, bold=True, color=M)
    text(s, 4.65, 1.65, 4.4, 1.6, '"Check every product against its reorder point. For suppliers outside the US, consider weather, currency and holidays. Never send a purchase order without Sarah\'s approval. Explain your reasoning."', size=11, color='FFFFFF')
    tools = [('Archive', 'Odoo'), ('CloudRain', 'Weather'), ('Coins', 'Currency'), ('CalendarDays', 'Holidays'), ('FileSpreadsheet', 'Sheets')]
    for i, (ic, lb) in enumerate(tools):
        x = 4.45 + i * 0.96
        icon(s, ic, x + 0.17, 3.48, 0.5, bg=M, color='g')
        text(s, x - 0.05, 4.02, 1.0, 0.3, lb, size=10, bold=True, align='c')
    text(s, 4.45, 4.45, 4.77, 0.65, [[('It worked it out. ', {'bold': True, 'color': G}), 'Goal + tools + rules, and it decides which tool to use and when.']], size=12)

    # 13 Pause & Think
    s = slide(p, 'TITLE_ONLY', 'Pause & think: which tool fits?', notes='Pause the video and decide for each task before you look at the answers.')
    tag(s, V)
    tasks = [('Every night, copy yesterday\'s sales orders from Odoo into a Google Sheet', 'Automation', 'Same steps, every time'),
             ('Read 40 supplier emails and work out which shipments are delayed', 'AI Agent', 'Messy text + judgement + stock data'),
             ('Rewrite an email to a late supplier: polite but firm', 'Chatbot', 'Just words to draft')]
    for i, (t, a, why) in enumerate(tasks):
        y = 1.3 + i * 1.28
        box(s, 0.78, y, 8.44, 1.1, fill=CARD, shadow=True)
        numdot(s, i + 1, 1.0, y + 0.32, d=0.46)
        text(s, 1.65, y + 0.12, 4.9, 0.86, t, size=13, anchor='m')
        pill(s, 6.75, y + 0.18, 2.25, 0.4, a, fill=(G if a == 'AI Agent' else (T if a == 'Automation' else M)), color=('FFFFFF' if a != 'Chatbot' else G), size=12)
        text(s, 6.75, y + 0.64, 2.3, 0.35, why, size=10, color=MUTED, align='c')

    # 14 Five parts
    s = slide(p, 'TITLE_ONLY', 'The five parts of every agent', notes='Miss one and you do not have an agent you can trust. Beginner mistake: full power on day one. Start with read and suggest.')
    tag(s, V)
    parts = [('Brain', '1 Brain', 'The AI model (LLM): Claude or ChatGPT'), ('ClipboardList', '2 Instructions', 'The day-one briefing'),
             ('Wrench', '3 Tools', 'The doors you open: Odoo, weather, email'), ('NotebookPen', '4 Memory', 'A notebook: the Google Sheet log'),
             ('UserCheck', '5 Human supervisor', 'You approve before money moves')]
    for i, (ic, h, b) in enumerate(parts):
        x = 0.78 + i * 1.7
        dark = i == 4
        box(s, x, 1.3, 1.56, 2.6, fill=(G if dark else CARD), shadow=True)
        icon(s, ic, x + 0.45, 1.5, 0.66, bg=(M if dark else G), color=('g' if dark else 'w'))
        text(s, x + 0.1, 2.3, 1.36, 0.6, h, size=13, bold=True, color=('FFFFFF' if dark else G), align='c')
        text(s, x + 0.1, 2.88, 1.36, 0.95, b, size=10, color=('FFFFFF' if dark else MUTED), align='c')
    box(s, 0.78, 4.15, 8.44, 0.95, fill=TINT)
    icon(s, 'TriangleAlert', 1.0, 4.36, 0.5, bg=RED)
    text(s, 1.7, 4.2, 7.3, 0.85, [[('Beginner mistake: ', {'bold': True, 'color': RED}), 'giving full power on day one. Start with "read and suggest", then "draft", and keep "send" and "spend" behind a human click.']], size=12, anchor='m')

    # 15 Course map + toolkit
    s = slide(p, 'TITLE_ONLY', 'Your course map and toolkit', notes='Videos 1 to 5 are the foundations. Videos 6 to 10 build Stocky step by step. Every tool has a free tier or trial.')
    tag(s, V)
    found = ['Why agents', 'ERP & Odoo', 'APIs', 'Databases', 'No-code toolkit']
    build = ['Reads the ERP', 'Drafts POs', 'Outside risk', 'Memory & report', 'Go live + capstone']
    text(s, 0.78, 1.2, 4.0, 0.3, 'FOUNDATIONS', size=11, bold=True, color=T)
    text(s, 0.78, 2.35, 4.0, 0.3, 'BUILD STOCKY', size=11, bold=True, color=T)
    for row, (items, y, off) in enumerate([(found, 1.5, 0), (build, 2.65, 5)]):
        for i, lb in enumerate(items):
            x = 0.78 + i * 1.7
            box(s, x, y, 1.56, 0.66, fill=(G if row else CARD), shadow=True)
            text(s, x + 0.1, y + 0.04, 0.4, 0.58, str(off + i + 1), size=18, bold=True, color=(M if row else T), font=HEAD, anchor='m')
            text(s, x + 0.48, y + 0.04, 1.03, 0.58, lb, size=10, bold=True, color=('FFFFFF' if row else G), anchor='m')
    text(s, 0.78, 3.55, 4.0, 0.3, 'YOUR TOOLKIT (ALL FREE TIERS OR TRIALS)', size=11, bold=True, color=T)
    logos = [('odoo_mark', 'Odoo'), ('n8n_mark', 'n8n'), ('claude_mark', 'Claude'), ('openai_mark', 'ChatGPT'), ('sheets', 'Sheets'), ('gmail', 'Gmail')]
    for i, (lg, lb) in enumerate(logos):
        x = 0.78 + i * 1.0
        box(s, x, 3.85, 0.88, 0.85, fill=CARD, shadow=True)
        logo(s, lg, x + 0.22, 3.93, 0.44, 0.4)
        text(s, x, 4.38, 0.88, 0.25, lb, size=9, bold=True, color=G, align='c')
    text(s, 6.85, 3.9, 2.4, 0.75, ['Open-Meteo (weather)', 'Frankfurter (currency)', 'Nager.Date (holidays)'], size=10, color=TX, space=1)
    text(s, 0.78, 4.85, 8.4, 0.3, 'Nothing to install on your computer. Odoo and n8n both run in your browser.', size=11, color=MUTED)

    # 16 Recap + activity
    s = slide(p, 'TITLE_ONLY', 'Recap and your next steps', notes='Three takeaways, then the activity workbook and the quiz before Video 2.')
    tag(s, V)
    tk = [('A chatbot talks, an automation follows, an agent reasons and acts.'), ('Every agent = brain + instructions + tools + memory + human.'), ("The goal: give Sarah back her 576 hours, not replace her.")]
    for i, t in enumerate(tk):
        y = 1.3 + i * 0.78
        numdot(s, i + 1, 0.78, y + 0.08, d=0.46)
        text(s, 1.42, y, 3.75, 0.66, t, size=12, anchor='m')
    box(s, 0.78, 3.85, 4.35, 1.25, fill=TINT)
    text(s, 1.0, 3.9, 3.95, 1.15, [[('Keep your wishlist. ', {'bold': True, 'color': G}), 'Your #1 task is a great candidate for your capstone in Video 10.']], size=12, anchor='m')
    acts = [('FileSpreadsheet', 'Activity (25-35 min)', 'V01_Activity_Agent_or_Not.xlsx: sort 20 tasks, then build your Automation Wishlist'),
            ('HelpCircle', 'Knowledge check', '10 questions, about 10 minutes'),
            ('PlayCircle', 'Next: Video 2', 'ERP Demystified: A Supply Chain Pro\'s Tour of Odoo')]
    for i, (ic, h, b) in enumerate(acts):
        y = 1.3 + i * 1.28
        box(s, 5.4, y, 3.82, 1.12, fill=(G if i == 0 else CARD), shadow=True)
        icon(s, ic, 5.58, y + 0.2, 0.5, bg=(M if i == 0 else G), color=('g' if i == 0 else 'w'))
        text(s, 6.25, y + 0.1, 2.85, 0.32, h, size=13, bold=True, color=('FFFFFF' if i == 0 else G))
        text(s, 6.25, y + 0.43, 2.85, 0.65, b, size=10, color=('FFFFFF' if i == 0 else MUTED))
    credits(p, 'Video 1')
    return p


# ------------------------------------------------------------------ VIDEO 2
def build_v02():
    p = new_deck()
    V = 'VIDEO 2 · ERP DEMYSTIFIED'
    C2 = os.path.join(CAP, 'cap02')

    s = slide(p, 'TITLE', 'ERP Demystified', notes='In this lesson you set up your own free Odoo, learn module, record and field, and load BrightLeaf.')
    text(s, 0.78, 2.9, 5.6, 0.5, "A Supply Chain Pro's Tour of Odoo", size=22, color=G, bold=True)
    text(s, 0.78, 3.9, 5.6, 0.4, 'The ERP Agent Blueprint · Video 2', size=16, color=G, bold=True)
    text(s, 0.78, 4.3, 5.6, 0.4, 'Beginner · 18 minutes · Your own free Odoo', size=13, color=MUTED)
    icon(s, 'Archive', 6.85, 1.25, 2.3, bg=G)
    pill(s, 6.95, 3.75, 2.1, 0.42, 'The filing cabinet', fill=M, color=G, size=13)

    # 2 One question three answers
    s = slide(p, 'TITLE_ONLY', 'One question, three answers', notes='Three systems, three numbers. An agent is only as good as the data it reads.')
    tag(s, V)
    box(s, 0.78, 1.3, 8.44, 0.8, fill=G)
    text(s, 1.0, 1.3, 8.0, 0.8, [[('Customer: ', {'bold': True, 'color': M}), '"Do you have 200 rolls of stretch wrap for tomorrow?"']], size=15, color='FFFFFF', anchor='m')
    ans = [('FileSpreadsheet', 'Sales spreadsheet', '220'), ('Warehouse', 'Warehouse shelf', '150'), ('Mail', 'Purchasing email', '"ordered 300?"')]
    for i, (ic, h, n) in enumerate(ans):
        x = 0.78 + i * 2.88
        box(s, x, 2.35, 2.68, 1.75, fill=CARD, shadow=True)
        icon(s, ic, x + 0.25, 2.55, 0.5, bg=T)
        text(s, x + 0.9, 2.55, 1.7, 0.5, h, size=12, bold=True, color=G, anchor='m')
        text(s, x + 0.25, 3.2, 2.3, 0.7, n, size=26, bold=True, color=RED, font=HEAD, anchor='m')
    text(s, 0.78, 4.4, 8.44, 0.6, [[('An agent is only as good as the data it reads. ', {'bold': True, 'color': G}), 'An ERP gives everyone one number.']], size=14)

    # 3 Today
    s = slide(p, 'TITLE_ONLY', "What you'll do today", notes='Your own private test system. You cannot break anything.')
    tag(s, V)
    todo = [('Rocket', 'Set up your own free Odoo', 'About 5 minutes'), ('BookOpen', 'Learn three words', 'Module, record, field'),
            ('Boxes', "Load BrightLeaf's 10 products", 'Plus stock and reorder rules'), ('ShieldCheck', 'Practise safely', "It's your private test system")]
    for i, (ic, h, b) in enumerate(todo):
        x, y = 0.78 + (i % 2) * 4.32, 1.3 + (i // 2) * 1.9
        card(s, x, y, 4.12, 1.7, h, b, ic=ic, icon_bg=(M if i == 3 else G))
    # 4 What an ERP is
    s = slide(p, 'TITLE_ONLY', 'What an ERP really is', notes='Forget the name Enterprise Resource Planning. It is the central filing cabinet plus its rulebook.')
    tag(s, V)
    box(s, 3.55, 1.65, 2.9, 2.6, fill=G, shadow=True)
    icon(s, 'Archive', 4.55, 1.85, 0.9, color='g', bg=M)
    text(s, 3.7, 2.85, 2.6, 0.4, 'Filing cabinet', size=16, bold=True, color='FFFFFF', align='c')
    text(s, 3.7, 3.25, 2.6, 0.4, '+ rulebook', size=14, color=LM, align='c')
    text(s, 3.7, 3.65, 2.6, 0.5, 'One place, one truth', size=11, color='FFFFFF', align='c')
    depts = [('ShoppingCart', 'Purchasing', 0.78, 1.55), ('Truck', 'Sales', 0.78, 3.25), ('Warehouse', 'Warehouse', 6.75, 1.55), ('Coins', 'Finance', 6.75, 3.25)]
    for ic, lb, x, y in depts:
        box(s, x, y, 2.47, 1.1, fill=CARD, shadow=True)
        icon(s, ic, x + 0.2, y + 0.27, 0.56, bg=T)
        text(s, x + 0.9, y + 0.2, 1.5, 0.7, lb, size=14, bold=True, color=G, anchor='m')
    text(s, 0.78, 4.6, 8.44, 0.5, '50 boxes arrive → the stock number goes up for everyone, instantly. No emailing spreadsheets around.', size=12, color=MUTED, align='c')

    # 5 Free trial
    s = slide(p, 'TITLE_ONLY', 'Create your free Odoo trial', notes='Tick Inventory, Purchase and Sales. Contacts comes automatically.')
    tag(s, V)
    pic(s, crop(os.path.join(C2, 'com_trial_3.png'), (300, 0, 2900, 1000), 'trial'), 0.78, 1.25, 5.2, 2.4)
    steps = ['odoo.com → "Start now - It\'s free"', 'Tick Inventory, Purchase, Sales (Contacts is added for you)', 'Company name: BrightLeaf Supplies', 'Settings → Main Currency = USD']
    for i, t in enumerate(steps):
        y = 1.3 + i * 0.6
        numdot(s, i + 1, 6.25, y, d=0.4, size=12)
        text(s, 6.8, y - 0.05, 2.45, 0.55, t, size=11, anchor='m')
    box(s, 0.78, 3.95, 8.44, 1.15, fill=TINT)
    icon(s, 'Timer', 1.0, 4.22, 0.6, bg=G)
    text(s, 1.8, 4.0, 7.3, 1.05, [[('15-day trial. ', {'bold': True, 'color': G}), 'Plenty for this course. If it expires, start a fresh trial and re-import the products in about 5 minutes.']], size=12, anchor='m')

    # 6 Write these down
    s = slide(p, 'TITLE_ONLY', 'Write these down now', notes='You need the URL and database name in Video 6, when Stocky connects to Odoo.')
    tag(s, V)
    box(s, 0.78, 1.35, 8.44, 0.85, fill=CARD, shadow=True)
    text(s, 1.05, 1.35, 8.0, 0.85, [[('https://', {'color': MUTED}), ('brightleaf-yourname', {'bold': True, 'color': G}), ('.odoo.com', {'color': MUTED})]], size=22, anchor='m', font=HEAD)
    box(s, 2.35, 2.28, 3.95, 0.07, fill=M, radius=0.03)
    text(s, 2.35, 2.4, 3.95, 0.3, '↑ your database name', size=11, bold=True, color=T, align='c')
    wd = [('Link2', 'Your Odoo URL', 'e.g. brightleaf-yourname.odoo.com'), ('Database', 'Your database name', 'The part before .odoo.com'), ('Mail', 'Your login email', 'The one you signed up with')]
    for i, (ic, h, b) in enumerate(wd):
        card(s, 0.78 + i * 2.88, 2.95, 2.68, 1.6, h, b, ic=ic, head_size=13, body_size=11)
    text(s, 0.78, 4.7, 8.44, 0.35, 'There is a box for all three on the Setup Checklist sheet of your workbook.', size=11, color=MUTED)

    # 7 Modules
    s = slide(p, 'TITLE_ONLY', 'Apps are modules: drawers in the cabinet', notes='Same cabinet, same data underneath, different drawers.')
    tag(s, V)
    pic(s, crop(os.path.join(C2, 'odoo_home.png'), (700, 40, 2900, 620), 'home'), 0.78, 1.25, 4.1, 1.5)
    mods = [('Warehouse', 'Inventory', 'What is on the shelf: Receipts in, Delivery Orders out'), ('ShoppingCart', 'Purchase', 'RFQ → Purchase Order'),
            ('Truck', 'Sales', 'Quotation → Sales Order'), ('Users', 'Contacts', 'One shared address book for suppliers and customers')]
    for i, (ic, h, b) in enumerate(mods):
        x, y = 5.15 + (i % 2) * 2.07, 1.25 + (i // 2) * 1.95
        box(s, x, y, 1.95, 1.8, fill=CARD, shadow=True)
        icon(s, ic, x + 0.18, y + 0.18, 0.46, bg=G)
        text(s, x + 0.72, y + 0.18, 1.2, 0.46, h, size=13, bold=True, color=G, anchor='m')
        text(s, x + 0.18, y + 0.75, 1.65, 1.0, b, size=10, color=TX)
    box(s, 0.78, 3.0, 4.1, 2.05, fill=TINT)
    text(s, 1.0, 3.1, 3.7, 1.9, [[('Ignore the extras. ', {'bold': True, 'color': G}), 'Invoicing appears because sales and purchases turn into invoices. Discuss is the internal chat. We won\'t need either.']], size=12, anchor='m')

    # 8 Menu pattern
    s = slide(p, 'TITLE_ONLY', 'The same menu pattern everywhere', notes='Learn the pattern in one app and you know it in all of them.')
    tag(s, V)
    pic(s, crop(os.path.join(C2, 'odoo_inventory.png'), (0, 0, 2600, 560), 'inv_menu'), 0.78, 1.25, 8.44, 1.75)
    menu = [('Settings', 'Operations', 'Day-to-day work'), ('Boxes', 'Products', 'Your catalogue'), ('Gauge', 'Reporting', 'Numbers out'), ('Lock', 'Configuration', 'The rulebook settings')]
    for i, (ic, h, b) in enumerate(menu):
        x = 0.78 + i * 2.15
        box(s, x, 3.25, 1.98, 1.85, fill=(G if i == 0 else CARD), shadow=True)
        icon(s, ic, x + 0.2, 3.45, 0.5, bg=(M if i == 0 else G), color=('g' if i == 0 else 'w'))
        text(s, x + 0.2, 4.05, 1.7, 0.4, h, size=14, bold=True, color=('FFFFFF' if i == 0 else G))
        text(s, x + 0.2, 4.45, 1.7, 0.55, b, size=11, color=('FFFFFF' if i == 0 else MUTED))

    # 9 Drawers talk
    s = slide(p, 'TITLE_ONLY', 'The drawers talk to each other', notes='One action, every department updated. Stocky reads one place and sees the whole truth.')
    tag(s, V)
    flows = [[('ShoppingCart', 'Confirm a purchase order'), ('ArrowDownToLine', 'Receipt expected'), ('Boxes', 'Stock goes up')],
             [('Truck', 'Confirm a sales order'), ('ArrowUpFromLine', 'Delivery prepared'), ('Boxes', 'Stock goes down')]]
    for r, fl in enumerate(flows):
        y = 1.4 + r * 1.55
        for i, (ic, lb) in enumerate(fl):
            x = 0.78 + i * 2.95
            box(s, x, y, 2.4, 1.2, fill=(G if i == 2 else CARD), shadow=True)
            icon(s, ic, x + 0.2, y + 0.32, 0.56, bg=(M if i == 2 else T), color=('g' if i == 2 else 'w'))
            text(s, x + 0.9, y + 0.1, 1.42, 1.0, lb, size=12, bold=True, color=('FFFFFF' if i == 2 else G), anchor='m')
            if i < 2:
                icon(s, 'ArrowRight', x + 2.5, y + 0.4, 0.4, color='m', bg=None)
    text(s, 0.78, 4.6, 8.44, 0.5, [[('One action, every department updated. ', {'bold': True, 'color': G}), 'That is why an agent connected to an ERP beats a pile of spreadsheets.']], size=12)

    # 10 Module record field
    s = slide(p, 'TITLE_ONLY', 'Module, record, field', notes='Agents ask for data in exactly these words. Your Excel skills transfer directly.')
    tag(s, V)
    mrf = [('Archive', 'Module', 'A drawer', 'Inventory, Purchase', 'The workbook'), ('FolderOpen', 'Record', 'A folder', 'One product, one PO', 'A row'),
           ('Tag', 'Field', 'A labelled box', 'Cost, Internal Reference', 'A column')]
    for i, (ic, h, a, e, xl) in enumerate(mrf):
        x = 0.78 + i * 2.88
        box(s, x, 1.3, 2.68, 3.0, fill=CARD, shadow=True)
        icon(s, ic, x + 0.25, 1.5, 0.62, bg=G)
        text(s, x + 1.0, 1.5, 1.6, 0.62, h, size=20, bold=True, color=G, anchor='m')
        text(s, x + 0.25, 2.3, 2.3, 0.35, a, size=14, bold=True, color=T)
        text(s, x + 0.25, 2.7, 2.3, 0.5, 'e.g. ' + e, size=11, color=MUTED)
        box(s, x + 0.25, 3.45, 2.18, 0.6, fill=TINT)
        text(s, x + 0.25, 3.45, 2.18, 0.6, [[('In Excel: ', {'color': MUTED}), (xl, {'bold': True, 'color': G})]], size=12, align='c', anchor='m')
    text(s, 0.78, 4.55, 8.44, 0.5, 'Cabinet → drawer → folder → labelled box. Agents ask for data in exactly these words.', size=12, color=MUTED, align='c')

    # 11 Anatomy
    s = slide(p, 'TITLE_ONLY', 'Anatomy of a product record: BL-1001', notes='Goods plus Track Inventory is the most important setting on the form.')
    tag(s, V)
    pic(s, crop(os.path.join(C2, 'p_type.png'), (0, 120, 2000, 1150), 'ptype'), 0.78, 1.25, 4.9, 2.3)
    fields = [('Product name', 'Steel Hex Bolts M10 (box of 100)'), ('Sales / Purchase', 'both ticked'), ('Product Type', 'Goods + Track Inventory'),
              ('Sales Price · Cost', '$16.88 · $12.50 (35% mark-up)'), ('Reference', 'BL-1001: your SKU'), ('Purchase tab', 'Apex Fasteners · $12.50 · 7 days')]
    for i, (k, v) in enumerate(fields):
        y = 1.25 + i * 0.64
        numdot(s, i + 1, 5.95, y + 0.04, d=0.38, size=11)
        text(s, 6.45, y - 0.02, 2.8, 0.3, k, size=11, bold=True, color=G)
        text(s, 6.45, y + 0.25, 2.8, 0.3, v, size=10, color=TX)
    box(s, 0.78, 3.8, 4.9, 1.3, fill=TINT)
    text(s, 1.0, 3.85, 4.5, 1.2, [[('Older Odoo? ', {'bold': True, 'color': G}), 'If you see "Storable Product" instead of Goods + Track Inventory, choose Storable Product. It means the same thing.']], size=11, anchor='m')

    # 12 Beginner mistake
    s = slide(p, 'TITLE_ONLY', 'Beginner mistake: no inventory tracking', notes='Without the Track Inventory tick, the product is never counted, so alerts, reports and agents cannot see it.')
    tag(s, V)
    for i, (ok, h, oh) in enumerate([(True, 'Track Inventory ticked', '145'), (False, 'Not tracked', '?')]):
        x = 0.78 + i * 4.32
        box(s, x, 1.3, 4.12, 2.65, fill=CARD, shadow=True)
        icon(s, 'CircleCheck' if ok else 'CircleX', x + 0.25, 1.5, 0.6, bg=('1E9E50' if ok else RED))
        text(s, x + 1.0, 1.5, 3.0, 0.6, h, size=16, bold=True, color=G, anchor='m')
        text(s, x + 0.25, 2.35, 1.6, 0.35, 'On Hand', size=12, color=MUTED)
        text(s, x + 0.25, 2.7, 3.6, 0.9, oh, size=44, bold=True, color=(G if ok else RED), font=HEAD)
        text(s, x + 1.7, 2.8, 2.3, 0.8, 'Counted, visible to Stocky' if ok else 'Bought and sold, never counted', size=11, color=MUTED, anchor='m')
    box(s, 0.78, 4.2, 8.44, 0.9, fill=G)
    text(s, 1.0, 4.2, 8.0, 0.9, 'No on-hand number = invisible to alerts, reports and agents.', size=15, bold=True, color='FFFFFF', anchor='m')

    # 13 Import
    s = slide(p, 'TITLE_ONLY', 'Import nine products in four seconds', notes='Headers match Odoo field labels, so the columns map automatically. Always click Test before Import.')
    tag(s, V)
    pic(s, crop(os.path.join(C2, 'i_test.png'), (0, 80, 1980, 1600), 'itest'), 0.78, 1.25, 4.6, 3.85)
    steps = ['Products list → ⋮ menu next to "Products" → Import', 'Upload File → V02_Activity_BrightLeaf_Product_Import.xlsx', 'Check the mapping: File Column → Odoo Field', 'Click Test → "Everything seems valid"', 'Click Import']
    for i, t in enumerate(steps):
        y = 1.25 + i * 0.6
        numdot(s, i + 1, 5.65, y + 0.03, d=0.38, size=11)
        text(s, 6.15, y - 0.03, 3.1, 0.55, t, size=11, anchor='m')
    box(s, 5.65, 4.3, 3.57, 0.8, fill=TINT)
    text(s, 5.8, 4.3, 3.35, 0.8, [[('BL-1001 is not in the file: ', {'bold': True, 'color': G}), 'no duplicate bolts.']], size=11, anchor='m')

    # 14 GIGO
    s = slide(p, 'TITLE_ONLY', 'Garbage in, garbage out', notes='A distributor set up a stock alert that ran for three months and never flagged their biggest product, because it was not tracked.')
    tag(s, V)
    box(s, 0.78, 1.3, 3.3, 3.8, fill=G, shadow=True)
    text(s, 1.0, 1.5, 2.9, 0.3, 'A REAL STORY', size=11, bold=True, color=M)
    text(s, 1.0, 1.85, 2.9, 1.0, '3 months', size=40, bold=True, color='FFFFFF', font=HEAD)
    text(s, 1.0, 2.85, 2.9, 2.1, 'A stock alert ran for three months and never flagged their biggest product. It was never tracked.', size=12, color='FFFFFF')
    mis = [('Boxes', 'No inventory tracking', 'The product is never counted'), ('Tag', 'Messy SKUs', '"M10 bolts" vs "Hex Bolt M10"'), ('Clock', 'Missing lead times', 'No warning before it is too late')]
    text(s, 4.35, 1.3, 4.8, 0.3, 'TOP 3 MISTAKES', size=11, bold=True, color=T)
    for i, (ic, h, b) in enumerate(mis):
        y = 1.65 + i * 0.92
        box(s, 4.35, y, 4.87, 0.8, fill=CARD, shadow=True)
        icon(s, ic, 4.5, y + 0.16, 0.48, bg=RED)
        text(s, 5.15, y + 0.06, 3.9, 0.35, h, size=13, bold=True, color=G)
        text(s, 5.15, y + 0.4, 3.9, 0.35, b, size=11, color=MUTED)
    text(s, 4.35, 4.5, 4.87, 0.6, [[('Agents turn bad data into confident wrong answers.', {'bold': True, 'color': RED})]], size=12)

    # 15 Stock & rules
    s = slide(p, 'TITLE_ONLY', 'Starting stock and reorder rules', notes='Four products are deliberately below their reorder point. Leave them low: they are Stocky\'s first job in Video 6.')
    tag(s, V)
    rows = [('SKU', 'Product', 'On hand', 'Min'), ('BL-1002', 'Shipping boxes', '1,180', '1,500'), ('BL-1004', 'Safety gloves', '420', '600'),
            ('BL-1005', 'Pallet jack wheels', '18', '25'), ('BL-1007', 'Hydraulic oil 20L', '31', '40')]
    tbl = s.shapes.add_table(5, 4, Inches(0.78), Inches(1.3), Inches(4.6), Inches(2.3)).table
    widths = [0.95, 1.65, 0.95, 1.05]
    for j, w in enumerate(widths): tbl.columns[j].width = Inches(w)
    for i, r in enumerate(rows):
        for j, v in enumerate(r):
            c = tbl.cell(i, j); c.text = v
            c.fill.solid(); c.fill.fore_color.rgb = rgb(G if i == 0 else ('FFFFFF' if i % 2 else 'F2F7F5'))
            par = c.text_frame.paragraphs[0]; par.alignment = PP_ALIGN.RIGHT if j >= 2 else PP_ALIGN.LEFT
            f = par.runs[0].font; f.size = Pt(12); f.name = BODY; f.bold = i == 0 or j == 0
            f.color.rgb = rgb('FFFFFF' if i == 0 else (RED if j == 2 else TX))
            c.margin_left = c.margin_right = Inches(0.08)
    text(s, 0.78, 3.75, 4.6, 0.3, 'Inventory → Operations → Physical Inventory', size=11, color=MUTED)
    box(s, 5.65, 1.3, 3.57, 3.8, fill=G, shadow=True)
    text(s, 5.85, 1.45, 3.2, 0.3, 'REORDER RULE · BL-1005', size=11, bold=True, color=M)
    text(s, 5.85, 1.8, 3.2, 0.4, 'Min 25 · Max 50', size=18, bold=True, color='FFFFFF', font=HEAD)
    text(s, 5.85, 2.35, 3.2, 0.9, '50 − 18 = 32', size=30, bold=True, color=M, font=HEAD)
    text(s, 5.85, 3.2, 3.2, 1.0, 'Replenishment suggests "To Order 32". At BrightLeaf, Max = 2 × reorder point.', size=11, color='FFFFFF')
    pill(s, 5.85, 4.45, 3.1, 0.42, "Don't click Order", fill=M, color=G, size=12)
    text(s, 0.78, 4.2, 4.6, 0.85, [[('Leave them low. ', {'bold': True, 'color': G}), "These four are Stocky's first job in Video 6."]], size=12)

    # 16 Paper trail
    s = slide(p, 'TITLE_ONLY', 'The paper trail', notes='The In / Out smart button shows every stock move. Nobody can quietly change a number.')
    tag(s, V)
    pic(s, crop(os.path.join(C2, 'mv_list.png'), (0, 140, 3840, 470), 'mvlist'), 0.78, 1.25, 8.44, 0.9)
    cols3 = [('History', 'Every move recorded', 'Date, from, to, quantity and who did it'), ('ShieldCheck', 'Nobody changes it quietly', 'The rulebook side of the ERP'),
             ('Sparkles', 'Gold for an agent', '"145 boxes of bolts will last under 4 weeks. Fine for now, but watch it."')]
    for i, (ic, h, b) in enumerate(cols3):
        card(s, 0.78 + i * 2.88, 2.45, 2.68, 2.0, h, b, ic=ic, head_size=13, body_size=11, icon_bg=(M if i == 2 else G))

    # 17 Recap
    s = slide(p, 'TITLE_ONLY', 'Recap and your next steps', notes='Three takeaways, the two activity files, the quiz, then Video 3 on APIs.')
    tag(s, V)
    tk = ['An ERP is the central filing cabinet + rulebook.', 'Module, record, field = drawer, folder, labelled box.', 'Your agent is only as good as your data.']
    for i, t in enumerate(tk):
        y = 1.3 + i * 0.78
        numdot(s, i + 1, 0.78, y + 0.08, d=0.46)
        text(s, 1.42, y, 3.75, 0.66, t, size=12, anchor='m')
    box(s, 0.78, 3.85, 4.35, 1.25, fill=TINT)
    text(s, 1.0, 3.9, 3.95, 1.15, [[('Pause & think: ', {'bold': True, 'color': G}), 'which drawers do you open most each week? Jot them on the Map My ERP sheet.']], size=12, anchor='m')
    acts = [('FileSpreadsheet', 'Activity (30-40 min)', 'V02_Activity_Odoo_Setup_Workbook.xlsx + the Product Import file'),
            ('HelpCircle', 'Knowledge check', '10 questions, about 10 minutes'),
            ('PlayCircle', 'Next: Video 3', 'APIs Explained Like You\'re Ordering at a Restaurant')]
    for i, (ic, h, b) in enumerate(acts):
        y = 1.3 + i * 1.28
        box(s, 5.4, y, 3.82, 1.12, fill=(G if i == 0 else CARD), shadow=True)
        icon(s, ic, 5.58, y + 0.2, 0.5, bg=(M if i == 0 else G), color=('g' if i == 0 else 'w'))
        text(s, 6.25, y + 0.1, 2.85, 0.32, h, size=13, bold=True, color=('FFFFFF' if i == 0 else G))
        text(s, 6.25, y + 0.43, 2.85, 0.65, b, size=10, color=('FFFFFF' if i == 0 else MUTED))
    credits(p, 'Video 2')
    return p


MONO = 'Courier New'


def code(s, x, y, w, h, lines, size=12, fill='1F2A2A', color='E6F4EF'):
    box(s, x, y, w, h, fill=fill, radius=0.1)
    text(s, x + 0.2, y + 0.12, w - 0.4, h - 0.24, lines, size=size, color=color, font=MONO, space=2)


def recap(s, tk, acts, extra=None):
    for i, t in enumerate(tk):
        y = 1.3 + i * 0.78
        numdot(s, i + 1, 0.78, y + 0.08, d=0.46)
        text(s, 1.42, y, 3.75, 0.66, t, size=12, anchor='m')
    if extra:
        box(s, 0.78, 3.85, 4.35, 1.25, fill=TINT)
        text(s, 1.0, 3.9, 3.95, 1.15, extra, size=12, anchor='m')
    for i, (ic, h, b) in enumerate(acts):
        y = 1.3 + i * 1.28
        box(s, 5.4, y, 3.82, 1.12, fill=(G if i == 0 else CARD), shadow=True)
        icon(s, ic, 5.58, y + 0.2, 0.5, bg=(M if i == 0 else G), color=('g' if i == 0 else 'w'))
        text(s, 6.25, y + 0.1, 2.85, 0.32, h, size=13, bold=True, color=('FFFFFF' if i == 0 else G))
        text(s, 6.25, y + 0.43, 2.85, 0.65, b, size=10, color=('FFFFFF' if i == 0 else MUTED))


def build_v03():
    p = new_deck()
    V = 'VIDEO 3 · APIs EXPLAINED'
    s = slide(p, 'TITLE', 'APIs Explained', notes='In this lesson: what an API is, two live API calls, JSON, GET vs POST, status codes and API keys.')
    text(s, 0.78, 2.9, 5.6, 0.5, "Like You're Ordering at a Restaurant", size=22, color=G, bold=True)
    text(s, 0.78, 3.9, 5.6, 0.4, 'The ERP Agent Blueprint · Video 3', size=16, color=G, bold=True)
    text(s, 0.78, 4.3, 5.6, 0.4, 'Beginner · No code · Just your web browser', size=13, color=MUTED)
    icon(s, 'ConciergeBell', 6.85, 1.25, 2.3, bg=G)
    pill(s, 6.95, 3.75, 2.1, 0.42, 'The waiter', fill=M, color=G, size=13)

    s = slide(p, 'TITLE_ONLY', 'The copy-paste problem', notes='Sarah copied numbers from websites into Excel 31 times in one month.')
    tag(s, V)
    text(s, 0.78, 1.3, 3.0, 1.3, '31', size=96, bold=True, color=G, font=HEAD)
    text(s, 0.82, 2.75, 4.2, 0.6, 'times Sarah copied numbers from websites into Excel in one month', size=14, bold=True)
    rows = [('Coins', 'USD → CNY and USD → MXN rates, every Monday'), ('CloudRain', 'Shenzhen weather, every week'), ('CalendarDays', 'Supplier holidays')]
    for i, (ic, t) in enumerate(rows):
        y = 3.5 + i * 0.52
        icon(s, ic, 0.82, y, 0.4, bg=T)
        text(s, 1.35, y, 3.7, 0.4, t, size=12, anchor='m')
    box(s, 5.4, 1.3, 3.82, 3.8, fill=CARD, shadow=True)
    text(s, 5.6, 1.45, 3.4, 0.3, 'One month of copy… paste… repeat', size=12, bold=True, color=G)
    for k in range(31):
        cx, cy = 5.65 + (k % 8) * 0.42, 1.9 + (k // 8) * 0.55
        box(s, cx, cy, 0.08, 0.42, fill=(RED if k == 30 else G), radius=0.02, shape=MSO_SHAPE.RECTANGLE)
    text(s, 5.6, 4.15, 3.4, 0.8, [[('4-5 min each = ', {'color': MUTED}), ('2+ hours a month', {'bold': True, 'color': RED})]], size=14)

    s = slide(p, 'TITLE_ONLY', "What you'll learn today", notes='Five stops on today\'s road.')
    tag(s, V)
    steps = [('ConciergeBell', 'What an API is', 'The restaurant'), ('CloudRain', 'Live call: weather', 'Shenzhen, no sign-up'),
             ('Banknote', 'Live call: currency', 'USD → CNY, MXN'), ('Receipt', 'GET, POST, codes', 'Asking vs submitting'), ('KeyRound', 'API keys', 'Hotel key cards')]
    for i, (ic, h1, b1) in enumerate(steps):
        x = 0.78 + i * 1.7
        box(s, x, 1.5, 1.56, 2.6, fill=(G if i == 0 else CARD), shadow=True)
        icon(s, ic, x + 0.45, 1.7, 0.66, bg=(M if i == 0 else G), color=('g' if i == 0 else 'w'))
        text(s, x + 0.1, 2.55, 1.36, 0.6, h1, size=13, bold=True, color=('FFFFFF' if i == 0 else G), align='c')
        text(s, x + 0.1, 3.2, 1.36, 0.8, b1, size=10, color=('FFFFFF' if i == 0 else MUTED), align='c')
    text(s, 0.78, 4.45, 8.44, 0.5, 'No code, no sign-up: you only need a web browser.', size=13, color=MUTED, align='c')

    s = slide(p, 'TITLE_ONLY', 'An API is a waiter', notes='You never walk into the kitchen. You give your order to the waiter, who brings back exactly what you asked for.')
    tag(s, V)
    trio = [('Bot', 'You (Stocky)', 'The customer'), ('ConciergeBell', 'The API', 'The waiter'), ('Archive', 'Odoo', 'The kitchen')]
    for i, (ic, h1, b1) in enumerate(trio):
        x = 0.78 + i * 2.95
        box(s, x, 1.4, 2.4, 1.9, fill=(G if i == 1 else CARD), shadow=True)
        icon(s, ic, x + 0.85, 1.55, 0.7, bg=(M if i == 1 else G), color=('g' if i == 1 else 'w'))
        text(s, x + 0.1, 2.35, 2.2, 0.4, h1, size=15, bold=True, color=('FFFFFF' if i == 1 else G), align='c')
        text(s, x + 0.1, 2.75, 2.2, 0.4, b1, size=12, color=(LM if i == 1 else MUTED), align='c')
        if i < 2:
            icon(s, 'ArrowRight', x + 2.5, 2.1, 0.4, color='m', bg=None)
    text(s, 0.78, 3.6, 8.44, 1.5, ['You never walk into the kitchen.', 'The waiter brings back exactly what you asked for.', 'The kitchen stays safe and decides what can leave it.'], size=14, bullets=True, space=6)

    s = slide(p, 'TITLE_ONLY', 'Request, response, endpoint', notes='The request is the order; the response is what comes back; an endpoint is one dish on the menu.')
    tag(s, V)
    words = [('Send', 'Request', 'The order you give'), ('Download', 'Response', 'What comes back to your table'), ('Utensils', 'Endpoint', 'One dish on the menu')]
    for i, (ic, h1, b1) in enumerate(words):
        card(s, 0.78, 1.3 + i * 1.28, 4.6, 1.12, h1, b1, ic=ic)
    box(s, 5.75, 1.3, 3.47, 3.8, fill=CARD, shadow=True)
    text(s, 5.95, 1.45, 3.1, 0.35, 'THE MENU (ENDPOINTS)', size=11, bold=True, color=T)
    for i, (e, d) in enumerate([('/forecast', 'Weather'), ('/latest', 'Exchange rates'), ('/PublicHolidays', 'Holidays')]):
        y = 1.95 + i * 0.95
        text(s, 5.95, y, 3.1, 0.35, e, size=15, bold=True, color=G, font=MONO)
        text(s, 5.95, y + 0.35, 3.1, 0.3, d, size=11, color=MUTED)

    s = slide(p, 'TITLE_ONLY', 'Anatomy of a real order', notes='The web address is an order slip: restaurant address, the dish, and the order details.')
    tag(s, V)
    parts = [('https://api.open-meteo.com', G, 'Restaurant address', 3.1), ('/v1/forecast', T, 'The dish (endpoint)', 1.65), ('?latitude=22.54&longitude=114.06…', M, 'Order details (parameters)', 3.45)]
    x = 0.78
    for t, c, lb, w in parts:
        box(s, x, 1.55, w, 0.8, fill=c, radius=0.08)
        text(s, x, 1.55, w, 0.8, t, size=12, bold=True, color=('FFFFFF' if c != M else G), align='c', anchor='m', font=MONO)
        text(s, x, 2.45, w, 0.4, lb, size=12, bold=True, color=G, align='c')
        x += w + 0.12
    for i, (k, v) in enumerate([('?', '"here come my order details"'), ('&', '"and also"')]):
        y = 3.3 + i * 0.75
        box(s, 0.78, y, 0.6, 0.6, fill=TINT)
        text(s, 0.78, y, 0.6, 0.6, k, size=22, bold=True, color=G, align='c', anchor='m', font=MONO)
        text(s, 1.55, y, 6.0, 0.6, v, size=15, anchor='m')

    s = slide(p, 'TITLE_ONLY', 'The Shenzhen rainstorm', notes='The warning was public on Sunday. Sarah found out from the supplier email the next Monday.')
    tag(s, V)
    facts = [('60 sets', 'BL-1005 wheels'), ('21 days', 'lead time'), ('9 days', 'late')]
    for i, (a, b1) in enumerate(facts):
        x = 0.78 + i * 2.88
        box(s, x, 1.3, 2.68, 1.0, fill=CARD, shadow=True)
        text(s, x + 0.2, 1.33, 2.3, 0.55, a, size=22, bold=True, color=G, font=HEAD)
        text(s, x + 0.2, 1.85, 2.3, 0.35, b1, size=11, color=MUTED)
    for r, (lbl, pts, col) in enumerate([('Without an API', [('Sunday', 'Warning public'), ('Tuesday', 'Storm, port slowed 3 days'), ('Next Monday', 'Supplier email')], RED),
                                          ('With Stocky', [('Sunday', 'Stocky alert'), ('', ''), ('', '4-day head start')], '1E9E50')]):
        y = 2.6 + r * 1.25
        text(s, 0.78, y, 1.6, 0.9, lbl, size=12, bold=True, color=col, anchor='m')
        box(s, 2.45, y + 0.42, 6.7, 0.06, fill=col, radius=0.02, shape=MSO_SHAPE.RECTANGLE)
        for i, (d, e) in enumerate(pts):
            if not d and not e: continue
            x = 2.45 + i * 2.6
            if d:
                box(s, x, y + 0.3, 0.3, 0.3, fill=col, shape=MSO_SHAPE.OVAL)
                text(s, x - 0.1, y - 0.05, 2.4, 0.3, d, size=11, bold=True, color=col)
            text(s, x - 0.1, y + 0.62, 2.5, 0.3, e, size=10, color=TX, bold=not d)

    s = slide(p, 'TITLE_ONLY', 'Live call #1: weather in Shenzhen', notes='Paste the address into any browser. No sign-up, no key. The answer arrives in under a second.')
    tag(s, V)
    code(s, 0.78, 1.3, 8.44, 0.75, ['https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06', '  &daily=precipitation_sum,wind_speed_10m_max&timezone=auto'], size=11)
    tips = [('Globe', 'Any browser', 'Paste the address, press Enter'), ('ShieldCheck', 'No sign-up, no key', 'Open-Meteo is free'), ('Timer', 'Under a second', 'The response is a JSON list'), ('CircleCheck', 'Tick Pretty-print', 'In Chrome, to make it readable')]
    for i, (ic, h1, b1) in enumerate(tips):
        card(s, 0.78 + (i % 2) * 4.32, 2.3 + (i // 2) * 1.42, 4.12, 1.25, h1, b1, ic=ic, head_size=14, body_size=11)

    s = slide(p, 'TITLE_ONLY', 'JSON = a labelled shopping list', notes='Label on the left, value on the right. Square brackets mean a list, like an Excel column.')
    tag(s, V)
    box(s, 0.78, 1.3, 3.6, 2.5, fill='FFF8E6', shadow=True)
    text(s, 1.0, 1.45, 3.2, 0.4, 'Shopping list', size=14, bold=True, color=G)
    text(s, 1.0, 1.95, 3.2, 2.5, ['Milk: 2 L', 'Eggs: 12', 'Bread: 1 loaf'], size=16, space=10)
    code(s, 4.6, 1.3, 4.62, 2.5, ['{', '  "timezone": "Asia/Shanghai",', '  "daily_units": {', '    "precipitation_sum": "mm",', '    "wind_speed_10m_max": "km/h"', '  },', '  "daily": { "time": [ … ] }', '}'], size=11)
    text(s, 4.6, 4.0, 4.62, 1.1, [[('Label', {'bold': True, 'color': G}), ' on the left, ', ('value', {'bold': True, 'color': G}), ' on the right. ', ('[ ]', {'bold': True, 'color': G, 'font': MONO}), ' = a list, like an Excel column.']], size=12)

    s = slide(p, 'TITLE_ONLY', 'Read the lists like columns', notes='The first date goes with the first rain number and the first wind number.')
    tag(s, V)
    rows = [('Date', 'Rain (mm)', 'Wind (km/h)'), ('22 Nov', '0', '16.8'), ('23 Nov', '0.1', '20.9'), ('24 Nov', '48.4', '20.7'), ('25-28 Nov', 'mostly 0', '…')]
    tbl = s.shapes.add_table(5, 3, Inches(0.78), Inches(1.3), Inches(4.6), Inches(2.5)).table
    for i, r in enumerate(rows):
        for j, v in enumerate(r):
            c = tbl.cell(i, j); c.text = v; c.fill.solid(); c.fill.fore_color.rgb = rgb(G if i == 0 else ('FFFFFF' if i % 2 else 'F2F7F5'))
            f = c.text_frame.paragraphs[0].runs[0].font; f.size = Pt(13); f.name = BODY; f.bold = i == 0; f.color.rgb = rgb('FFFFFF' if i == 0 else TX)
    text(s, 0.78, 3.95, 4.6, 0.4, 'Recorded on 22 November. Your live numbers will differ.', size=11, color=MUTED)
    box(s, 5.65, 1.3, 3.57, 3.8, fill=TINT)
    icon(s, 'TriangleAlert', 5.85, 1.5, 0.55, bg=RED)
    text(s, 5.85, 2.2, 3.2, 0.4, 'The worry zone', size=16, bold=True, color=RED)
    text(s, 5.85, 2.65, 3.2, 1.2, ['Rain 50+ mm a day', 'Wind 60+ km/h'], size=14, bullets=True, space=6)
    text(s, 5.85, 3.75, 3.2, 1.2, '48.4 mm on the 24th is a seriously wet day: time for Sarah to call Global Lift Parts.', size=12, color=MUTED)

    s = slide(p, 'TITLE_ONLY', 'Change the order, change the dish', notes='Swap the coordinates to Dubai and the same request checks Gulf Lubricants.')
    tag(s, V)
    cities = [('Shenzhen', '22.54, 114.06', 'Global Lift Parts · BrightTech'), ('Dubai', '25.20, 55.27', 'Gulf Lubricants'), ('Monterrey', '25.69, -100.32', 'SafeHands Co.'), ('Chicago', '41.88, -87.63', 'PackRight Industries'), ('Columbus', '39.96, -83.00', 'Apex Fasteners')]
    for i, (c, ll, sp) in enumerate(cities):
        y = 1.3 + i * 0.75
        box(s, 0.78, y, 5.2, 0.62, fill=(G if i == 1 else CARD), shadow=True)
        icon(s, 'MapPin', 0.92, y + 0.11, 0.4, bg=(M if i == 1 else T), color=('g' if i == 1 else 'w'))
        text(s, 1.45, y, 1.3, 0.62, c, size=13, bold=True, color=('FFFFFF' if i == 1 else G), anchor='m')
        text(s, 2.75, y, 1.45, 0.62, ll, size=11, color=('FFFFFF' if i == 1 else TX), anchor='m', font=MONO)
        text(s, 4.2, y, 1.75, 0.62, sp, size=10, color=(LM if i == 1 else MUTED), anchor='m')
    box(s, 6.25, 1.3, 2.97, 3.67, fill=TINT)
    text(s, 6.45, 1.45, 2.6, 3.4, [[('Same request, different details.', {'bold': True, 'color': G})], 'Change latitude and longitude to 25.20, 55.27 and the waiter brings back Dubai\'s forecast.', 'That\'s all Stocky does to check five supplier cities in seconds.'], size=12, space=8)

    s = slide(p, 'TITLE_ONLY', 'Live call #2: the currency waiter', notes='The old address forwards to frankfurter.dev. Recording day (20 Nov): 1 USD = 6.6777 CNY and 19.0673 MXN.')
    tag(s, V)
    code(s, 0.78, 1.3, 8.44, 0.6, 'https://api.frankfurter.dev/v1/latest?from=USD&to=CNY,MXN', size=12)
    code(s, 0.78, 2.1, 4.3, 1.4, ['{"amount": 1.0, "base": "USD",', ' "date": "2026-11-20",', ' "rates": {"CNY": 6.6777,', '           "MXN": 19.0673}}'], size=11)
    text(s, 0.78, 3.65, 4.3, 1.4, 'Old address api.frankfurter.app forwards here, like a "we\'ve moved" note on the restaurant door.', size=11, color=MUTED)
    box(s, 5.35, 2.1, 3.87, 3.0, fill=G, shadow=True)
    text(s, 5.55, 2.2, 3.5, 0.3, 'WHY IT MATTERS: BL-1005', size=10, bold=True, color=M)
    text(s, 5.55, 2.55, 3.5, 1.6, ['60 × $38 = $2,280 ≈ ¥15,200', 'Yuan 3% stronger (≈ 6.48 per $):', '¥15,200 ≈ $2,350'], size=12, color='FFFFFF', space=4)
    text(s, 5.55, 4.0, 3.5, 0.9, '$68 more, same price', size=20, bold=True, color=M, font=HEAD)

    s = slide(p, 'TITLE_ONLY', "Where's the dirham?", notes='We asked for three currencies and got two. Always check that what came back matches what you asked for.')
    tag(s, V)
    for i, (cur, ok) in enumerate([('CNY', True), ('MXN', True), ('AED', False)]):
        x = 0.78 + i * 2.0
        box(s, x, 1.4, 1.8, 1.6, fill=CARD, shadow=True)
        icon(s, 'CircleCheck' if ok else 'CircleX', x + 0.6, 1.55, 0.6, bg=('1E9E50' if ok else RED))
        text(s, x, 2.3, 1.8, 0.5, cur, size=20, bold=True, color=(G if ok else RED), align='c', font=HEAD)
    box(s, 6.95, 1.4, 2.27, 1.6, fill=TINT)
    text(s, 7.1, 1.45, 2.0, 1.5, [[('AED', {'bold': True, 'color': G}), ' is pegged at about ', ('3.67', {'bold': True, 'color': G}), ' per USD.']], size=12, anchor='m')
    box(s, 0.78, 3.35, 8.44, 1.7, fill=G)
    text(s, 1.0, 3.4, 8.0, 1.6, [[('The kitchen doesn\'t stock it. ', {'bold': True, 'color': M}), 'The European Central Bank data behind this API has no dirham.'], [('Lesson: ', {'bold': True, 'color': M}), 'always check that what came back matches what you asked for.']], size=14, color='FFFFFF', anchor='m', space=8)

    s = slide(p, 'TITLE_ONLY', 'GET vs POST: asking vs submitting', notes='Stocky can GET freely. Important POSTs need Sarah\'s approval.')
    tag(s, V)
    for i, (h1, ic, ex, rule, dark) in enumerate([('GET = asking', 'Search', '"How many BL-1002 boxes do we have?"', 'Safe: changes nothing', False),
                                                 ('POST = submitting', 'PencilLine', '"Create a PO for 1,820 boxes from PackRight"', 'Creates or changes something', True)]):
        x = 0.78 + i * 4.32
        box(s, x, 1.3, 4.12, 2.2, fill=(G if dark else CARD), shadow=True)
        icon(s, ic, x + 0.25, 1.5, 0.55, bg=(M if dark else G), color=('g' if dark else 'w'))
        text(s, x + 0.95, 1.5, 3.0, 0.55, h1, size=17, bold=True, color=('FFFFFF' if dark else G), anchor='m')
        text(s, x + 0.25, 2.2, 3.7, 0.7, ex, size=12, color=('FFFFFF' if dark else TX))
        text(s, x + 0.25, 2.95, 3.7, 0.4, rule, size=12, bold=True, color=(M if dark else T))
    box(s, 0.78, 3.7, 8.44, 1.4, fill=TINT)
    text(s, 1.0, 3.75, 8.0, 0.35, 'PAUSE & THINK: GET OR POST?', size=11, bold=True, color=T)
    text(s, 1.0, 4.1, 8.0, 0.95, ['Checking a supplier\'s lead time', 'Updating the reorder point for BL-1004 to 700', 'Sending a reminder email to SafeHands Co.', 'Reading this week\'s sales orders'], size=11, bullets=True, space=1)

    s = slide(p, 'TITLE_ONLY', 'Status codes = receipts', notes='2xx good news, 4xx a problem with your order, 5xx a problem in their kitchen.')
    tag(s, V)
    codes = [('200', 'OK', 'CircleCheck', '1E9E50'), ('401', 'Wrong key card', 'KeyRound', RED), ('404', 'Wrong address', 'MapPin', RED), ('429', 'Too many orders', 'Timer', 'E0A100')]
    for i, (c, m, ic, col) in enumerate(codes):
        x = 0.78 + i * 2.15
        box(s, x, 1.3, 1.98, 2.3, fill=CARD, shadow=True)
        icon(s, ic, x + 0.69, 1.45, 0.6, bg=col)
        text(s, x, 2.15, 1.98, 0.7, c, size=34, bold=True, color=col, align='c', font=HEAD)
        text(s, x, 2.95, 1.98, 0.4, m, size=12, bold=True, color=G, align='c')
    for i, (a, b1) in enumerate([('2xx', 'good news'), ('4xx', "your order's problem"), ('5xx', "their kitchen's problem")]):
        x = 0.78 + i * 2.88
        pill(s, x, 3.9, 2.68, 0.45, f'{a} = {b1}', fill=(TINT if i else G), color=(G if i else 'FFFFFF'), size=12)
    text(s, 0.78, 4.55, 8.44, 0.5, 'Live demo: a typo ("forecst") gives 404 Not Found. "daily=banana" gives 400, a bad request.', size=11, color=MUTED)

    s = slide(p, 'TITLE_ONLY', 'API keys = hotel key cards', notes='A key opens only certain doors, belongs to one user and can be cancelled.')
    tag(s, V)
    box(s, 0.78, 1.3, 3.3, 2.1, fill=G, shadow=True)
    icon(s, 'KeyRound', 1.0, 1.5, 0.6, color='g', bg=M)
    text(s, 1.0, 2.2, 2.9, 0.4, 'Room 412 · Gym · Pool', size=13, bold=True, color='FFFFFF')
    text(s, 1.0, 2.6, 2.9, 0.6, "NOT the manager's office", size=12, color=M, bold=True)
    text(s, 0.78, 3.6, 3.3, 1.5, ['Opens only certain doors', 'Belongs to one user', 'Can be cancelled'], size=12, bullets=True, space=4)
    box(s, 4.35, 1.3, 4.87, 2.1, fill=CARD, shadow=True)
    text(s, 4.55, 1.42, 4.5, 0.3, 'WHERE ODOO KEEPS THEM', size=10, bold=True, color=T)
    text(s, 4.55, 1.75, 4.5, 1.6, ['Settings → Activate the developer mode', 'Your avatar → My Profile / Preferences', 'Account Security → API Keys'], size=11, bullets=True, space=4)
    for i, rr in enumerate(['Never share in chats', 'One key per tool', 'Cancel if in doubt']):
        x = 4.35 + i * 1.66
        box(s, x, 3.65, 1.55, 1.45, fill=TINT)
        icon(s, ['Ban', 'KeyRound', 'CircleX'][i], x + 0.53, 3.8, 0.48, bg=G)
        text(s, x + 0.05, 4.35, 1.45, 0.7, rr, size=11, bold=True, color=G, align='c')

    s = slide(p, 'TITLE_ONLY', 'Recap and your next steps', notes='Three takeaways, the Treasure Hunt activity and the quiz, then Video 4 on databases.')
    tag(s, V)
    recap(s, ['An API is a waiter: request, endpoint, parameters, response.', 'JSON is a labelled shopping list; status codes are receipts.', 'GET is safe, POST needs a signature, keys are key cards.'],
          [('FileSpreadsheet', 'Activity (about 30 min)', 'V03_Activity_API_Treasure_Hunt.xlsx: call 3 real APIs and decode their answers'),
           ('HelpCircle', 'Knowledge check', '10 questions, about 10 minutes'), ('PlayCircle', 'Next: Video 4', 'Databases Without Fear: Your Data\'s Home')],
          [[('Beginner mistakes: ', {'bold': True, 'color': G}), 'typos in the address, ignoring units, not noticing a missing item, careless keys.']])
    credits(p, 'Video 3')
    return p


def build_v04():
    p = new_deck()
    V = 'VIDEO 4 · DATABASES WITHOUT FEAR'
    C4 = os.path.join(CAP, 'cap04')
    s = slide(p, 'TITLE', 'Databases Without Fear', notes='In this lesson: what a database is, unique IDs, Stocky\'s two tables, the five golden rules and a messy-data makeover.')
    text(s, 0.78, 2.9, 5.6, 0.5, "Your Data's Home", size=22, color=G, bold=True)
    text(s, 0.78, 3.9, 5.6, 0.4, 'The ERP Agent Blueprint · Video 4', size=16, color=G, bold=True)
    text(s, 0.78, 4.3, 5.6, 0.4, 'Beginner · 22 minutes · Google Sheets', size=13, color=MUTED)
    icon(s, 'Database', 6.85, 1.25, 2.3, bg=G)
    pill(s, 6.95, 3.75, 2.1, 0.42, 'Your data\'s home', fill=M, color=G, size=13)

    s = slide(p, 'TITLE_ONLY', 'The $1,840 cell', notes='The number was right; the unit was missing. Messy data makes an agent confidently wrong, at speed.')
    tag(s, V)
    box(s, 0.78, 1.3, 3.0, 2.2, fill=CARD, shadow=True)
    text(s, 0.98, 1.4, 2.6, 0.3, 'BL-1003 Stretch Wrap · stock sheet', size=10, bold=True, color=T)
    text(s, 0.78, 1.75, 3.0, 1.3, '21', size=72, bold=True, color=RED, align='c', font=HEAD)
    text(s, 0.98, 3.05, 2.6, 0.35, 'Reorder point: 200 rolls', size=11, color=MUTED, align='c')
    box(s, 4.05, 1.3, 5.17, 2.2, fill=G, shadow=True)
    text(s, 4.25, 1.4, 4.8, 0.3, 'THE REALITY', size=10, bold=True, color=M)
    text(s, 4.25, 1.75, 4.8, 0.6, '21 cartons × 12 rolls + 8 loose', size=15, color='FFFFFF', bold=True)
    text(s, 4.25, 2.35, 4.8, 0.9, '= 260 rolls', size=32, bold=True, color=M, font=HEAD)
    box(s, 0.78, 3.75, 8.44, 1.35, fill=TINT)
    icon(s, 'TriangleAlert', 1.0, 4.12, 0.6, bg=RED)
    text(s, 1.8, 3.8, 7.3, 1.25, [[('200 rolls ordered for nothing: about $1,840. ', {'bold': True, 'color': RED}), 'The number was right; the unit was missing. Messy data makes an agent confidently wrong, at speed.']], size=13, anchor='m')

    s = slide(p, 'TITLE_ONLY', "What you'll learn today", notes='Five steps today.')
    tag(s, V)
    steps = [('FileSpreadsheet', 'What a database is', 'You know 90% already'), ('IdCard', 'Unique IDs', 'Names vary, IDs don\'t'), ('Table', "Stocky's tables", 'Suppliers + Stock_Log'),
             ('Trophy', '5 golden rules', 'Agent-ready data'), ('Eraser', 'Messy makeover', '7 fixes, live')]
    for i, (ic, h1, b1) in enumerate(steps):
        x = 0.78 + i * 1.7
        box(s, x, 1.5, 1.56, 2.6, fill=(G if i == 0 else CARD), shadow=True)
        icon(s, ic, x + 0.45, 1.7, 0.66, bg=(M if i == 0 else G), color=('g' if i == 0 else 'w'))
        text(s, x + 0.1, 2.55, 1.36, 0.6, h1, size=13, bold=True, color=('FFFFFF' if i == 0 else G), align='c')
        text(s, x + 0.1, 3.2, 1.36, 0.8, b1, size=10, color=('FFFFFF' if i == 0 else MUTED), align='c')
    text(s, 0.78, 4.45, 8.44, 0.5, 'All you need is a free Google account.', size=13, color=MUTED, align='c')

    s = slide(p, 'TITLE_ONLY', 'A database = a super-organised workbook', notes='Table = sheet, row = record, column = field, database = the whole workbook.')
    tag(s, V)
    pic(s, crop(os.path.join(C4, 's1_list.png'), (0, 330, 3800, 1720), 'v4_list'), 0.78, 1.25, 5.0, 2.8)
    text(s, 0.78, 4.25, 5.0, 0.8, "Odoo's Inventory → Products list is a table.", size=12, color=MUTED)
    for i, (k, v) in enumerate([('Table', 'a sheet'), ('Row', 'a record'), ('Column', 'a field'), ('Database', 'the whole workbook')]):
        y = 1.3 + i * 0.95
        box(s, 6.05, y, 3.17, 0.8, fill=(G if i == 3 else CARD), shadow=True)
        text(s, 6.25, y, 1.4, 0.8, k, size=15, bold=True, color=(M if i == 3 else G), anchor='m')
        text(s, 7.6, y, 1.6, 0.8, '= ' + v, size=12, color=('FFFFFF' if i == 3 else TX), anchor='m')

    s = slide(p, 'TITLE_ONLY', 'Every record has an ID', notes='Odoo shows the record\'s internal ID at the end of the web address. Rename it, change the price: the ID never changes.')
    tag(s, V)
    box(s, 0.78, 1.3, 8.44, 0.75, fill=CARD, shadow=True)
    text(s, 1.0, 1.3, 8.0, 0.75, [[('brightleaf-supplies.odoo.com/odoo/action-703/', {'color': MUTED}), ('45', {'bold': True, 'color': RED, 'size': 22})]], size=17, anchor='m', font=MONO)
    pic(s, crop(os.path.join(C4, 's1_form.png'), (0, 140, 2100, 800), 'v4_form'), 0.78, 2.3, 4.6, 2.8)
    box(s, 5.65, 2.3, 3.57, 2.8, fill=G, shadow=True)
    text(s, 5.85, 2.45, 3.2, 0.4, 'ID 45 = BL-1005', size=17, bold=True, color=M, font=HEAD)
    text(s, 5.85, 3.0, 3.2, 2.0, ['Rename the product: still 45', 'Change the price: still 45', 'Like a passport number: it never changes'], size=12, color='FFFFFF', bullets=True, space=6)

    s = slide(p, 'TITLE_ONLY', 'Why Google Sheets?', notes='Free, online so n8n can reach it, and transparent. Airtable is an alternative.')
    tag(s, V)
    for i, (ic, h1, b1) in enumerate([('Tag', 'Free', 'And familiar if you know Excel'), ('Cloud', 'Online', 'n8n can reach it. A laptop Excel file can\'t be reached.'), ('Eye', 'Transparent', 'You can see everything Stocky writes')]):
        x = 0.78 + i * 2.88
        box(s, x, 1.4, 2.68, 2.6, fill=(G if i == 1 else CARD), shadow=True)
        icon(s, ic, x + 0.99, 1.6, 0.7, bg=(M if i == 1 else G), color=('g' if i == 1 else 'w'))
        text(s, x + 0.15, 2.45, 2.38, 0.45, h1, size=18, bold=True, color=('FFFFFF' if i == 1 else G), align='c')
        text(s, x + 0.15, 2.95, 2.38, 0.9, b1, size=11, color=('FFFFFF' if i == 1 else MUTED), align='c')
    text(s, 0.78, 4.35, 8.44, 0.5, 'Alternative: Airtable works the same way.', size=12, color=MUTED, align='c')

    s = slide(p, 'TITLE_ONLY', 'The supplier who existed three times', notes='Three spellings hid PackRight\'s real share of packaging spend: 41%, not 18%.')
    tag(s, V)
    for i, n in enumerate(['PackRight Industries', 'Pack Right Ind.', 'PACKRIGHT (Chicago)']):
        y = 1.35 + i * 0.75
        box(s, 0.78, y, 3.3, 0.6, fill=CARD, shadow=True)
        text(s, 0.95, y, 3.0, 0.6, n, size=13, bold=True, color=RED, anchor='m')
    icon(s, 'ArrowRight', 4.25, 2.0, 0.5, color='m', bg=None)
    box(s, 4.95, 1.35, 1.9, 2.1, fill=G, shadow=True)
    icon(s, 'IdCard', 5.55, 1.5, 0.7, color='g', bg=M)
    text(s, 4.95, 2.35, 1.9, 0.5, 'SUP-002', size=20, bold=True, color='FFFFFF', align='c', font=HEAD)
    text(s, 4.95, 2.85, 1.9, 0.4, 'one passport number', size=10, color=LM, align='c')
    box(s, 7.1, 1.35, 2.12, 2.1, fill=CARD, shadow=True)
    text(s, 7.1, 1.45, 2.12, 0.3, 'Share of packaging spend', size=9, bold=True, color=T, align='c')
    text(s, 7.1, 1.8, 2.12, 0.5, '18%', size=18, color=MUTED, align='c', font=HEAD)
    text(s, 7.1, 2.3, 2.12, 0.8, '41%', size=34, bold=True, color=G, align='c', font=HEAD)
    box(s, 0.78, 3.75, 8.44, 1.35, fill=TINT)
    text(s, 1.0, 3.8, 8.0, 1.25, [[('Never make your agent guess who you mean. ', {'bold': True, 'color': G}), 'Give every supplier a unique ID, like a passport number, and use it everywhere.']], size=14, anchor='m')

    s = slide(p, 'TITLE_ONLY', 'Building the Suppliers table', notes='One table per thing, one header row, frozen. Latitude and longitude feed the weather API; Currency feeds the currency API.')
    tag(s, V)
    pic(s, crop(os.path.join(C4, 's2_dv_done.png'), (0, 500, 3320, 940), 'v4_sup'), 0.78, 1.25, 8.44, 1.5)
    tips = [('Table', 'One header row', 'Supplier_ID, Supplier_Name, City… underscores, no spaces'), ('Layers', 'Freeze it', 'View → Freeze → 1 row'), ('CloudRain', 'Feeds Video 3', 'Lat/long → weather · Currency → exchange rates')]
    for i, (ic, h1, b1) in enumerate(tips):
        card(s, 0.78 + i * 2.88, 3.05, 2.68, 1.5, h1, b1, ic=ic, head_size=13, body_size=10)
    text(s, 0.78, 4.7, 8.44, 0.4, [[('Pause & think: ', {'bold': True, 'color': T}), 'why do SUP-004 and SUP-006 share a city but have different IDs?']], size=12)

    s = slide(p, 'TITLE_ONLY', 'Guard dogs for your data', notes='Dropdowns and checkboxes stop typos at the door. Mark old records inactive; never delete them.')
    tag(s, V)
    for i, (ic, h1, b1) in enumerate([('Filter', 'Dropdowns', 'Data → Data validation → Dropdown: US, MX, CN, AE and USD, MXN, CNY, AED'),
                                     ('CircleCheck', 'Checkbox', 'Insert → Checkbox for the "Active" column'), ('Archive', 'Never delete', 'Untick Active instead. Old orders and logs still point to the record.')]):
        card(s, 0.78 + i * 2.88, 1.4, 2.68, 2.6, h1, b1, ic=ic, icon_bg=(M if i == 2 else G))
    box(s, 0.78, 4.25, 8.44, 0.85, fill=G)
    text(s, 1.0, 4.25, 8.0, 0.85, 'Stop mess at the door, so you never have to clean it up later.', size=14, bold=True, color='FFFFFF', anchor='m')

    s = slide(p, 'TITLE_ONLY', 'Building the Stock Log', notes='A logbook: every check gets a new row; never overwrite.')
    tag(s, V)
    pic(s, crop(os.path.join(C4, 's3_final.png'), (0, 500, 3720, 770), 'v4_log'), 0.78, 1.25, 8.44, 1.1)
    for i, (ic, h1, b1) in enumerate([('NotebookPen', 'A logbook', 'Every check adds a new row. Never overwrite.'), ('Ruler', 'One fact per cell', '18 in Qty, "set" in Unit, comments in Note'),
                                     ('CalendarCheck', 'Dates: yyyy-mm-dd', '03/04 means different days in Mexico and the USA'), ('Sparkles', 'A Status formula', '=IF(D2<=F2,"REORDER","OK")')]):
        card(s, 0.78 + (i % 2) * 4.32, 2.6 + (i // 2) * 1.27, 4.12, 1.15, h1, b1, ic=ic, head_size=13, body_size=11)

    s = slide(p, 'TITLE_ONLY', 'IDs connect tables', notes='XLOOKUP pulls the supplier name from the ID. Change the name once and it updates everywhere.')
    tag(s, V)
    for i, (t, rows_) in enumerate([('Stock_Log', [('LOG-0001', 'BL-1005', 'SUP-004'), ('LOG-0002', 'BL-1002', 'SUP-002'), ('LOG-0003', 'BL-1001', 'SUP-001')]),
                                   ('Suppliers', [('SUP-001', 'Apex Fasteners', ''), ('SUP-002', 'PackRight Industries', ''), ('SUP-004', 'Global Lift Parts', '')])]):
        x = 0.78 + i * 4.6
        box(s, x, 1.3, 3.85, 2.4, fill=CARD, shadow=True)
        text(s, x + 0.2, 1.38, 3.4, 0.35, t, size=13, bold=True, color=G)
        for j, r in enumerate(rows_):
            y = 1.85 + j * 0.58
            box(s, x + 0.2, y, 3.45, 0.48, fill=('F2F7F5' if j % 2 else 'FFFFFF'), line='DCE5E2', radius=0.04)
            cells = [c for c in r if c]
            for k, c in enumerate(cells):
                hi = c.startswith('SUP')
                text(s, x + 0.3 + k * (3.3 / len(cells)), y, 3.3 / len(cells), 0.48, c, size=10, bold=hi, color=(RED if hi else TX), anchor='m')
    icon(s, 'Link2', 4.8, 2.3, 0.5, color='m', bg=None)
    code(s, 0.78, 3.95, 8.44, 0.55, '=XLOOKUP(H2, Suppliers!A:A, Suppliers!B:B)', size=13)
    text(s, 0.78, 4.6, 8.44, 0.5, [[('The name lives in one place. ', {'bold': True, 'color': G}), 'Change it once and it updates everywhere.']], size=12)

    s = slide(p, 'TITLE_ONLY', 'The five golden rules of agent-ready data', notes='Agents read values, not formatting.')
    tag(s, V)
    rules = ['One table per thing', 'One header row, in row 1', 'One fact per cell', 'A unique ID on every row', 'Consistent types and units']
    for i, r in enumerate(rules):
        y = 1.3 + i * 0.62
        box(s, 0.78, y, 5.4, 0.52, fill=(G if i % 2 == 0 else CARD), shadow=True)
        text(s, 0.95, y, 0.5, 0.52, str(i + 1), size=18, bold=True, color=(M if i % 2 == 0 else T), anchor='m', font=HEAD)
        text(s, 1.45, y, 4.6, 0.52, r, size=14, bold=True, color=('FFFFFF' if i % 2 == 0 else G), anchor='m')
    box(s, 6.45, 1.3, 2.77, 3.0, fill=TINT)
    icon(s, 'Trophy', 6.65, 1.5, 0.6, bg=G)
    text(s, 6.65, 2.25, 2.4, 0.35, 'BONUS RULES', size=11, bold=True, color=T)
    text(s, 6.65, 2.6, 2.4, 1.6, ['No merged cells', 'No colours that carry meaning', 'No totals inside the table'], size=12, bullets=True, space=4)
    text(s, 0.78, 4.55, 8.44, 0.5, [[('Pause & think: ', {'bold': True, 'color': T}), 'which of these rules does your most-used spreadsheet break?']], size=12)

    s = slide(p, 'TITLE_ONLY', 'The messy export: spot the crimes', notes='Merged cells, units mixed into numbers, inconsistent codes, five date formats, colours and a TOTAL row.')
    tag(s, V)
    pic(s, crop(os.path.join(C4, 's4_messy.png'), (0, 500, 3000, 1580), 'v4_messy'), 0.78, 1.25, 5.3, 3.85)
    crimes = ['Merged title and supplier cells', '"145 boxes", "approx 1,850", "18 - urgent!!"', '"BL 1002" vs "BL-1002"', 'A blank SKU and a duplicate row', '5 different date formats', 'Red cells and a TOTAL row of "lots"']
    for i, c in enumerate(crimes):
        y = 1.3 + i * 0.62
        numdot(s, i + 1, 6.3, y + 0.04, d=0.38, fill=RED, color='FFFFFF', size=11)
        text(s, 6.8, y - 0.02, 2.45, 0.55, c, size=11, anchor='m')

    s = slide(p, 'TITLE_ONLY', 'The makeover in 7 fixes', notes='Seven fixes turn the messy export into a clean table Stocky can read.')
    tag(s, V)
    fixes = ['Delete the title rows', 'Unmerge and fill down', 'Replace "BL " with "BL-", trim spaces', 'Remove duplicates (2,360 → 1,180 boxes)', 'Split quantity and unit (21 cartons + 8 → 260 rolls)', 'Fill the blank ID (BL-1004)', 'Colours → words; delete the TOTAL row']
    for i, f_ in enumerate(fixes):
        y = 1.25 + i * 0.5
        numdot(s, i + 1, 0.78, y + 0.03, d=0.36, size=11)
        text(s, 1.25, y, 3.9, 0.44, f_, size=11, anchor='m')
    pic(s, crop(os.path.join(C4, 's4_final.png'), (0, 500, 1960, 1180), 'v4_final'), 5.3, 1.25, 3.92, 2.3)
    box(s, 5.3, 3.7, 3.92, 1.4, fill=TINT)
    text(s, 5.45, 3.75, 3.65, 1.3, [[('Surprises: ', {'bold': True, 'color': G}), 'packing tape in red was fine (1,850 vs 1,000). Hydraulic oil nobody flagged is short: 31 vs 40, with a 14-day lead time.']], size=11, anchor='m')

    s = slide(p, 'TITLE_ONLY', 'Recap and your next steps', notes='Three takeaways, the Messy Data Makeover activity and the quiz, then Video 5.')
    tag(s, V)
    recap(s, ['A database is a super-organised workbook.', 'Use IDs, not names, to connect your tables.', 'Follow the five golden rules: agents read values, not formatting.'],
          [('FileSpreadsheet', 'Activity (30-40 min)', 'V04_Activity_Messy_Data_Makeover.xlsx: spot 12 problems and rebuild a clean table'),
           ('HelpCircle', 'Knowledge check', '10 questions, about 10 minutes'), ('PlayCircle', 'Next: Video 5', 'Your No-Code Toolkit: Setting Up n8n and Your AI Brain')],
          [[('Common mistakes: ', {'bold': True, 'color': G}), 'cleaning once then letting mess back in, making the database "pretty", one giant 40-column sheet.']])
    credits(p, 'Video 4')
    return p


if __name__ == '__main__':
    only = sys.argv[2:]
    for v, fn in [('01', build_v01), ('02', build_v02), ('03', build_v03), ('04', build_v04)]:
        if not only or v in only:
            fn().save(os.path.join(ROOT, f'Video_{v}', f'V{v}_Slides.pptx'))
    print('ok')
