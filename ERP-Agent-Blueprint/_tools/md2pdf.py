"""Convert the course's Markdown sources into styled PDF files (same look as md2docx).

Usage: python md2pdf.py input.md output.pdf
"""
import re
import sys
from xml.sax.saxutils import escape

from fontTools.ttLib import TTFont as FTFont
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.fonts import addMapping
from reportlab.platypus import (KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table,
                                TableStyle)

FONT_DIR = "/System/Library/Fonts/Supplemental/"
pdfmetrics.registerFont(TTFont("Arial", FONT_DIR + "Arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", FONT_DIR + "Arial Bold.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Italic", FONT_DIR + "Arial Italic.ttf"))
pdfmetrics.registerFont(TTFont("Arial-BoldItalic", FONT_DIR + "Arial Bold Italic.ttf"))
pdfmetrics.registerFont(TTFont("ArialUni", FONT_DIR + "Arial Unicode.ttf"))
addMapping("Arial", 0, 0, "Arial")
addMapping("Arial", 1, 0, "Arial-Bold")
addMapping("Arial", 0, 1, "Arial-Italic")
addMapping("Arial", 1, 1, "Arial-BoldItalic")

ARIAL_CHARS = set(FTFont(FONT_DIR + "Arial Bold.ttf").getBestCmap()) & set(
    FTFont(FONT_DIR + "Arial.ttf").getBestCmap())
UNI_CHARS = set(FTFont(FONT_DIR + "Arial Unicode.ttf").getBestCmap())

NAVY = colors.HexColor("#1F2A44")
CAMERA_FILL = colors.HexColor("#FDE9C9")
SCREEN_FILL = colors.HexColor("#D7ECFB")
CALLOUT_FILL = colors.HexColor("#F2F2F2")
THINK_FILL = colors.HexColor("#FFF4B3")

BASE = ParagraphStyle("base", fontName="Arial", fontSize=10.5, leading=14.5, spaceAfter=5)
H1 = ParagraphStyle("h1", parent=BASE, fontName="Arial-Bold", fontSize=19, leading=23,
                    textColor=NAVY, spaceBefore=4, spaceAfter=10)
H2 = ParagraphStyle("h2", parent=BASE, fontName="Arial-Bold", fontSize=14, leading=18,
                    textColor=NAVY, spaceBefore=10, spaceAfter=6)
H3 = ParagraphStyle("h3", parent=BASE, fontName="Arial-Bold", fontSize=12, leading=15,
                    textColor=NAVY, spaceBefore=8, spaceAfter=4)
BANNER = ParagraphStyle("banner", parent=BASE, fontName="Arial-Bold", fontSize=12.5,
                        leading=16, textColor=NAVY, spaceAfter=0)
BULLET = ParagraphStyle("bullet", parent=BASE, leftIndent=16, bulletIndent=5, spaceAfter=3)
BULLET2 = ParagraphStyle("bullet2", parent=BULLET, leftIndent=30, bulletIndent=19)
CELL = ParagraphStyle("cell", parent=BASE, fontSize=9, leading=11.5, spaceAfter=0)
CELL_HEAD = ParagraphStyle("cellh", parent=CELL, fontName="Arial-Bold", textColor=colors.white)
CODE = ParagraphStyle("code", parent=BASE, fontName="ArialUni", fontSize=8.8, leading=11.5,
                      spaceAfter=0)
RULE = ParagraphStyle("rule", parent=BASE, alignment=TA_CENTER, textColor=colors.grey)

EMOJI = re.compile("[\U0001F300-\U0001FAFF☀-➿️]")


def fix_glyphs(markup):
    """Route characters Arial lacks (arrows, ≈, ☐ …) to Arial Unicode; drop unsupported ones."""
    out, in_tag = [], False
    for ch in markup:
        if ch == "<":
            in_tag = True
        if in_tag or ord(ch) < 128 or ord(ch) in ARIAL_CHARS:
            out.append(ch)
        elif ord(ch) in UNI_CHARS:
            out.append(f'<font name="ArialUni">{ch}</font>')
        if ch == ">":
            in_tag = False
    return "".join(out)


def inline(text):
    text = EMOJI.sub("", text)
    parts = re.split(r"(\*\*[^*]+\*\*|`[^`]+`|\*[^*\s][^*]*\*)", text)
    html = []
    for tok in parts:
        if not tok:
            continue
        if tok.startswith("**") and tok.endswith("**"):
            html.append(f"<b>{escape(tok[2:-2])}</b>")
        elif tok.startswith("`") and tok.endswith("`"):
            html.append(f'<font name="ArialUni" color="#A31F34">{escape(tok[1:-1])}</font>')
        elif tok.startswith("*") and tok.endswith("*") and len(tok) > 2:
            html.append(f"<i>{escape(tok[1:-1])}</i>")
        else:
            html.append(escape(tok))
    return fix_glyphs("".join(html))


def box(flowable_or_text, fill, style=BASE, width=None):
    para = Paragraph(inline(flowable_or_text), style) if isinstance(flowable_or_text, str) \
        else flowable_or_text
    t = Table([[para]], colWidths=[width])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), fill),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return t


def table(rows, width):
    header = [c.strip() for c in rows[0].strip().strip("|").split("|")]
    body = []
    for r in rows[1:]:
        cells = [c.strip() for c in r.strip().strip("|").split("|")]
        if all(re.fullmatch(r":?-{2,}:?", c) for c in cells if c):
            continue
        body.append((cells + [""] * len(header))[:len(header)])
    # column widths proportional to content length (bounded)
    lens = [max([len(header[i])] + [len(r[i]) for r in body]) for i in range(len(header))]
    lens = [min(max(l, 6), 60) for l in lens]
    total = sum(lens)
    widths = [width * l / total for l in lens]
    data = [[Paragraph(inline(h), CELL_HEAD) for h in header]]
    data += [[Paragraph(inline(c), CELL) for c in r] for r in body]
    t = Table(data, colWidths=widths, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#B0B7C3")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F6F8FB")]),
        ("LEFTPADDING", (0, 0), (-1, -1), 4), ("RIGHTPADDING", (0, 0), (-1, -1), 4),
    ]))
    return t


def convert(src, dst):
    with open(src, encoding="utf-8") as f:
        lines = f.read().splitlines()

    doc = SimpleDocTemplate(dst, pagesize=A4, leftMargin=2 * cm, rightMargin=2 * cm,
                            topMargin=1.8 * cm, bottomMargin=1.8 * cm)
    W = doc.width
    title = next((l[2:].strip() for l in lines if l.startswith("# ")), "")
    story = []
    i = 0
    while i < len(lines):
        line = lines[i]
        s = line.strip()
        if s.startswith("```"):
            i += 1
            buf = []
            while i < len(lines) and not lines[i].strip().startswith("```"):
                raw = EMOJI.sub("", lines[i])
                lead = len(raw) - len(raw.lstrip(" "))
                buf.append("&nbsp;" * lead + fix_glyphs(escape(raw.lstrip(" "))) or "&nbsp;")
                i += 1
            # one row per line so long code blocks split cleanly across pages
            t = Table([[Paragraph(b, CODE)] for b in buf] or [[""]], colWidths=[W])
            t.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), CALLOUT_FILL),
                ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 0.5), ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5),
                ("TOPPADDING", (0, 0), (-1, 0), 6), ("BOTTOMPADDING", (0, -1), (-1, -1), 6),
            ]))
            story += [t, Spacer(1, 6)]
            i += 1
            continue
        if s.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                rows.append(lines[i])
                i += 1
            story += [table(rows, W), Spacer(1, 8)]
            continue
        if not s:
            i += 1
            continue

        if s == "---":
            story.append(Paragraph("— — —", RULE))
        elif s.startswith("# "):
            story.append(Paragraph(inline(s[2:]), H1))
        elif s.startswith("## "):
            text = s[3:].strip()
            if "[ON CAMERA]" in text or "[SCREEN RECORDING]" in text:
                cam = "[ON CAMERA]" in text
                label = "ON CAMERA" if cam else "SCREEN RECORDING"
                rest = text.replace("[ON CAMERA]", "").replace("[SCREEN RECORDING]", "").strip()
                story += [Spacer(1, 10),
                          box(f"**{label}**  |  {rest}", CAMERA_FILL if cam else SCREEN_FILL,
                              BANNER, W), Spacer(1, 6)]
            else:
                story.append(Paragraph(inline(text), H2))
        elif s.startswith("### "):
            story.append(Paragraph(inline(s[4:]), H3))
        elif s.startswith("#### "):
            story.append(Paragraph(f"<b>{inline(s[5:])}</b>", BASE))
        elif s.startswith(">"):
            text = s.lstrip(">").strip()
            think = text.upper().startswith("PAUSE & THINK")
            story += [box(f"**{text}**" if think and "**" not in text else text,
                          THINK_FILL if think else CALLOUT_FILL, width=W), Spacer(1, 6)]
        elif re.match(r"^[-*] \[[ xX]\]", s):
            story.append(Paragraph(inline("☐ " + s.split("]", 1)[1].strip()), BULLET))
        elif re.match(r"^[-*] ", s):
            indent = (len(line) - len(line.lstrip())) // 2
            story.append(Paragraph(inline(s[2:]), BULLET2 if indent else BULLET,
                                   bulletText="◦" if indent else "•"))
        elif re.match(r"^\d+[.)] ", s):
            num = re.match(r"^(\d+)", s).group(1)
            story.append(Paragraph(inline(re.sub(r"^\d+[.)] ", "", s)), BULLET,
                                   bulletText=f"{num}."))
        else:
            story.append(Paragraph(inline(s), BASE))
        i += 1

    def footer(canvas, d):
        canvas.saveState()
        canvas.setFont("Arial", 8)
        canvas.setFillColor(colors.grey)
        canvas.drawString(2 * cm, 1 * cm, f"The ERP Agent Blueprint  |  {fix_glyphs(title)[:90]}"
                          if "<" not in fix_glyphs(title) else "The ERP Agent Blueprint")
        canvas.drawRightString(A4[0] - 2 * cm, 1 * cm, f"Page {d.page}")
        canvas.restoreState()

    doc.title = title
    doc.build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    convert(sys.argv[1], sys.argv[2])
    print("saved", sys.argv[2])
