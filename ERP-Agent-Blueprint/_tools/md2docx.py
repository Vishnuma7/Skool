"""Convert the course's Markdown sources into styled .docx files.

Usage: python md2docx.py input.md output.docx

Supports: # / ## / ### headings, paragraphs, **bold**, *italic*, `code`,
- bullets, 1. numbered lists, > callouts, | tables |, --- rules, ``` code blocks.
Section headings tagged [ON CAMERA] / [SCREEN RECORDING] get coloured banners.
"""
import re
import sys

from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt, RGBColor, Cm

NAVY = RGBColor(0x1F, 0x2A, 0x44)
CAMERA_FILL = "FDE9C9"   # warm orange = presenter on camera
SCREEN_FILL = "D7ECFB"   # light blue = screen recording
CALLOUT_FILL = "F2F2F2"
THINK_FILL = "FFF4B3"
TABLE_HEAD_FILL = "1F2A44"


def shade(paragraph_or_cell, fill):
    el = paragraph_or_cell._p if hasattr(paragraph_or_cell, "_p") else paragraph_or_cell._tc
    pr = el.get_or_add_pPr() if hasattr(paragraph_or_cell, "_p") else el.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), fill)
    pr.append(shd)


def add_runs(paragraph, text, base_bold=False, color=None, size=None):
    tokens = re.split(r"(\*\*[^*]+\*\*|`[^`]+`|\*[^*\s][^*]*\*)", text)
    for tok in tokens:
        if not tok:
            continue
        bold, italic, code = base_bold, False, False
        if tok.startswith("**") and tok.endswith("**"):
            tok, bold = tok[2:-2], True
        elif tok.startswith("`") and tok.endswith("`"):
            tok, code = tok[1:-1], True
        elif tok.startswith("*") and tok.endswith("*") and len(tok) > 2:
            tok, italic = tok[1:-1], True
        run = paragraph.add_run(tok)
        run.bold = bold
        run.italic = italic
        if code:
            run.font.name = "Consolas"
            run.font.color.rgb = RGBColor(0xA3, 0x1F, 0x34)
        if color is not None:
            run.font.color.rgb = color
        if size:
            run.font.size = Pt(size)


def add_table(doc, rows):
    header = [c.strip() for c in rows[0].strip().strip("|").split("|")]
    body = []
    for r in rows[1:]:
        cells = [c.strip() for c in r.strip().strip("|").split("|")]
        if all(re.fullmatch(r":?-{2,}:?", c) for c in cells if c):
            continue
        body.append(cells)
    table = doc.add_table(rows=1, cols=len(header))
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    for i, h in enumerate(header):
        cell = table.rows[0].cells[i]
        cell.text = ""
        add_runs(cell.paragraphs[0], h, base_bold=True, color=RGBColor(0xFF, 0xFF, 0xFF), size=10)
        shade(cell, TABLE_HEAD_FILL)
    for r in body:
        row = table.add_row().cells
        for i in range(len(header)):
            row[i].text = ""
            add_runs(row[i].paragraphs[0], r[i] if i < len(r) else "", size=10)
    doc.add_paragraph()


def convert(src, dst):
    with open(src, encoding="utf-8") as f:
        lines = f.read().splitlines()

    doc = Document()
    sec = doc.sections[0]
    sec.left_margin = sec.right_margin = Cm(2.2)
    normal = doc.styles["Normal"]
    normal.font.name = "Calibri"
    normal.font.size = Pt(11)
    for lvl, size in ((1, 20), (2, 14), (3, 12)):
        st = doc.styles[f"Heading {lvl}"]
        st.font.color.rgb = NAVY
        st.font.size = Pt(size)

    i = 0
    while i < len(lines):
        line = lines[i]
        s = line.strip()

        if s.startswith("```"):
            i += 1
            buf = []
            while i < len(lines) and not lines[i].strip().startswith("```"):
                buf.append(lines[i])
                i += 1
            p = doc.add_paragraph()
            shade(p, CALLOUT_FILL)
            r = p.add_run("\n".join(buf))
            r.font.name = "Consolas"
            r.font.size = Pt(9.5)
            i += 1
            continue

        if s.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                rows.append(lines[i])
                i += 1
            add_table(doc, rows)
            continue

        if not s:
            i += 1
            continue

        if s == "---":
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.add_run("— — —").font.color.rgb = RGBColor(0x99, 0x99, 0x99)
        elif s.startswith("# "):
            doc.add_heading(s[2:].strip(), level=1)
        elif s.startswith("## "):
            text = s[3:].strip()
            if "[ON CAMERA]" in text or "[SCREEN RECORDING]" in text:
                cam = "[ON CAMERA]" in text
                label = "🎥 ON CAMERA" if cam else "🖥  SCREEN RECORDING"
                rest = text.replace("[ON CAMERA]", "").replace("[SCREEN RECORDING]", "").strip()
                p = doc.add_paragraph()
                p.paragraph_format.space_before = Pt(14)
                shade(p, CAMERA_FILL if cam else SCREEN_FILL)
                r = p.add_run(f"{label}  |  {rest}")
                r.bold = True
                r.font.size = Pt(13)
                r.font.color.rgb = NAVY
            else:
                doc.add_heading(text, level=2)
        elif s.startswith("### "):
            doc.add_heading(s[4:].strip(), level=3)
        elif s.startswith("#### "):
            p = doc.add_paragraph()
            add_runs(p, s[5:].strip(), base_bold=True)
        elif s.startswith(">"):
            text = s.lstrip(">").strip()
            p = doc.add_paragraph()
            p.paragraph_format.left_indent = Cm(0.5)
            fill = THINK_FILL if text.upper().startswith("PAUSE & THINK") else CALLOUT_FILL
            shade(p, fill)
            add_runs(p, text, base_bold=text.upper().startswith("PAUSE & THINK"))
        elif re.match(r"^[-*] ", s):
            indent = (len(line) - len(line.lstrip())) // 2
            p = doc.add_paragraph(style="List Bullet 2" if indent else "List Bullet")
            add_runs(p, s[2:])
        elif re.match(r"^\d+[.)] ", s):
            p = doc.add_paragraph(style="List Number")
            add_runs(p, re.sub(r"^\d+[.)] ", "", s))
        elif s.startswith("- [ ]") or s.startswith("[ ]"):
            p = doc.add_paragraph()
            add_runs(p, "☐ " + s.split("]", 1)[1].strip())
        else:
            p = doc.add_paragraph()
            add_runs(p, s)
        i += 1

    doc.save(dst)


if __name__ == "__main__":
    convert(sys.argv[1], sys.argv[2])
    print("saved", sys.argv[2])
