"""Build V05_Activity_Toolkit_Setup.xlsx (run with the course venv python)."""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import CellIsRule, FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

OUT = Path(__file__).resolve().parent.parent / "V05_Activity_Toolkit_Setup.xlsx"

NAVY = "1F2A44"
LIGHT = "EAF2FB"
INPUT = "FFF4B3"
WHITE = "FFFFFF"
thin = Side(style="thin", color="BFBFBF")
BORDER = Border(left=thin, right=thin, top=thin, bottom=thin)
HEAD_FONT = Font(bold=True, color=WHITE)
HEAD_FILL = PatternFill("solid", fgColor=NAVY)
INPUT_FILL = PatternFill("solid", fgColor=INPUT)
WRAP = Alignment(wrap_text=True, vertical="top")


def header(ws, row, values, widths=None):
    for i, v in enumerate(values, start=1):
        c = ws.cell(row=row, column=i, value=v)
        c.font = HEAD_FONT
        c.fill = HEAD_FILL
        c.alignment = Alignment(wrap_text=True, vertical="center")
        c.border = BORDER
    if widths:
        for i, w in enumerate(widths, start=1):
            ws.column_dimensions[chr(64 + i)].width = w


def title(ws, text, sub):
    ws["A1"] = text
    ws["A1"].font = Font(bold=True, size=16, color=NAVY)
    ws["A2"] = sub
    ws["A2"].font = Font(italic=True, color="555555")


wb = Workbook()

# ---------------- Instructions ----------------
ws = wb.active
ws.title = "Instructions"
ws.column_dimensions["A"].width = 110
lines = [
    ("V05 Activity: Toolkit Setup Checklist, Credentials Safety Log & Cost Estimator", "title"),
    ("The ERP Agent Blueprint | Video 5 | Time needed: 25-35 minutes", "sub"),
    ("", None),
    ("WHAT YOU WILL DO", "h"),
    ("1. Setup Checklist: work through every setup step from Video 5. Set the Status dropdown (Not started / In progress / Done / Stuck). The progress bar at the top updates itself.", None),
    ("2. Credentials Safety Log: record every key you created (Anthropic or OpenAI, Odoo). Write WHERE it lives (the n8n credential name), never the key itself.", None),
    ("3. Cost Estimator: change the yellow cells to estimate what an AI agent would cost per month, first for BrightLeaf, then for your own company.", None),
    ("", None),
    ("THE GOLDEN RULE", "h"),
    ("Never type, paste or store an actual API key anywhere in this workbook. Keys live only in n8n Credentials. This file tracks the location, owner and renewal date of each key, just like a key register at a warehouse cage.", None),
    ("", None),
    ("HOW TO USE THE COLOURS", "h"),
    ("Yellow cells = you type here. Blue cells = formulas, don't overwrite them. Dark header rows are frozen so they stay visible when you scroll.", None),
    ("", None),
    ("BRIGHTLEAF EXAMPLE", "h"),
    ("Each sheet is pre-filled with Priya's BrightLeaf setup as an example. Keep her rows for reference, and add your own rows underneath.", None),
    ("", None),
    ("NOW TRY IT WITH YOUR COMPANY", "h"),
    ("On the Cost Estimator, fill in the 'My Company' column: how many questions per day would your team ask an agent? What is one hour of your time worth? How many hours a week could it save? Bring your number to the community and compare with other learners.", None),
    ("", None),
    ("WHEN YOU ARE DONE", "h"),
    ("You should have: an n8n workflow 'V05 Hello World' that writes a supplier email, two saved credentials (Anthropic – BrightLeaf, Odoo – BrightLeaf), a spending limit set, and a monthly cost estimate for your own company. Then take the Video 5 quiz.", None),
]
for i, (text, kind) in enumerate(lines, start=1):
    c = ws.cell(row=i, column=1, value=text)
    c.alignment = WRAP
    if kind == "title":
        c.font = Font(bold=True, size=16, color=NAVY)
    elif kind == "sub":
        c.font = Font(italic=True, color="555555")
    elif kind == "h":
        c.font = Font(bold=True, color=WHITE)
        c.fill = HEAD_FILL

# ---------------- Setup Checklist ----------------
ws = wb.create_sheet("Setup Checklist")
title(ws, "Toolkit Setup Checklist", "Set the Status for each step. Progress updates automatically.")
ws["F1"] = "Progress:"
ws["F1"].font = Font(bold=True)
header(ws, 4, ["#", "Area", "Step", "Where to click (menu path)", "Status", "Date done", "Notes / what went wrong"],
       [5, 14, 42, 55, 14, 13, 40])
steps = [
    ("n8n", "Create n8n Cloud trial account", "n8n.io → Get started for free → choose account name (e.g. brightleaf.app.n8n.cloud) → confirm email"),
    ("n8n", "Create and rename a workflow", "Overview → Create Workflow → click 'My workflow' → rename to 'V05 Hello World'"),
    ("n8n", "Add a Manual Trigger", "Add first step → Trigger manually"),
    ("n8n", "Run a test and find it in the logbook", "Execute workflow → Executions tab (next to Editor)"),
    ("AI brain", "Create Anthropic console account", "console.anthropic.com → sign in → organisation name"),
    ("AI brain", "Buy prepaid credits, auto reload OFF", "Settings → Billing → Buy credits (minimum) → leave Auto reload off"),
    ("AI brain", "Set a monthly spending limit + email alert", "Settings → Limits → monthly limit (e.g. $10) → alert (e.g. $5)"),
    ("AI brain", "Create an API key", "API Keys → Create Key → name 'n8n-stocky-brightleaf' → copy once"),
    ("n8n", "Save the Anthropic credential", "Overview → Credentials → Create Credential → Anthropic → paste key → rename → Save (green test)"),
    ("n8n", "Build hello world: AI Agent + chat model", "+ → AI Agent → Source for Prompt: Define below → System Message option → Chat Model + → Anthropic Chat Model"),
    ("n8n", "Run hello world and read the email", "Execute workflow → open AI Agent node → output"),
    ("n8n", "Change one fact and run again", "Edit prompt (e.g. delay 10 days, or BL-1007 / Gulf Lubricants) → Execute workflow"),
    ("Odoo", "Activate developer mode (if needed)", "Settings → scroll to bottom → Developer Tools → Activate the developer mode"),
    ("Odoo", "Generate an Odoo API key", "Settings → Users & Companies → Users → your user → Account Security → New API Key"),
    ("n8n", "Save the Odoo credential", "Create Credential → Odoo API → Site URL, Username, API Key, Database Name → Save (green test)"),
    ("Safety", "Fill in the Credentials Safety Log", "This workbook → 'Credentials Safety Log' sheet"),
    ("Safety", "Check: no key in any chat, sheet, email or desktop file", "Search your desktop/notes for 'sk-' and delete any copies"),
]
for r, (area, step, path) in enumerate(steps, start=5):
    vals = [r - 4, area, step, path, "Not started", None, None]
    for col, v in enumerate(vals, start=1):
        c = ws.cell(row=r, column=col, value=v)
        c.border = BORDER
        c.alignment = WRAP
        if col in (5, 6, 7):
            c.fill = INPUT_FILL
    ws.cell(row=r, column=6).number_format = "dd-mmm-yyyy"
last = 4 + len(steps)
dv = DataValidation(type="list", formula1='"Not started,In progress,Done,Stuck"', allow_blank=True)
ws.add_data_validation(dv)
dv.add(f"E5:E{last + 10}")
ws["G1"] = f'=COUNTIF(E5:E{last + 10},"Done")/COUNTA(C5:C{last + 10})'
ws["G1"].number_format = "0%"
ws["G1"].font = Font(bold=True, size=14, color=NAVY)
ws["G1"].fill = PatternFill("solid", fgColor=LIGHT)
ws["G2"] = f'=COUNTIF(E5:E{last + 10},"Stuck")&" step(s) stuck: ask in the community!"'
ws.conditional_formatting.add(f"E5:E{last + 10}", CellIsRule(operator="equal", formula=['"Done"'], fill=PatternFill("solid", fgColor="C6EFCE")))
ws.conditional_formatting.add(f"E5:E{last + 10}", CellIsRule(operator="equal", formula=['"Stuck"'], fill=PatternFill("solid", fgColor="FFC7CE")))
ws.conditional_formatting.add(f"E5:E{last + 10}", CellIsRule(operator="equal", formula=['"In progress"'], fill=PatternFill("solid", fgColor="FFEB9C")))
ws.freeze_panes = "A5"

# ---------------- Credentials Safety Log ----------------
ws = wb.create_sheet("Credentials Safety Log")
title(ws, "Credentials Safety Log (a key register, NOT a key store)",
      "Record where each key lives and when to renew it. NEVER type the key itself here.")
cols = ["Key / credential", "Service", "What doors it opens", "Where it lives (n8n credential name)",
        "Created on", "Renew / review by", "Owner", "Spending limit set?", "Key stored outside n8n?", "Safety status"]
header(ws, 4, cols, [26, 16, 34, 32, 13, 15, 16, 14, 16, 30])
examples = [
    ("n8n-stocky-brightleaf", "Anthropic (Claude)", "Run Claude models, billed to BrightLeaf's console account",
     "Anthropic – BrightLeaf", "2026-11-16", "Priya Sharma", "Yes", "No"),
    ("n8n Stocky", "Odoo", "Read/write Odoo data with Priya's user rights (products, stock, purchases)",
     "Odoo – BrightLeaf", "2026-11-16", "Priya Sharma", "N/A", "No"),
]
import datetime as _dt
for r in range(5, 25):
    for col in range(1, 11):
        c = ws.cell(row=r, column=col)
        c.border = BORDER
        c.alignment = WRAP
        if col not in (6, 10):
            c.fill = INPUT_FILL
    ws.cell(row=r, column=5).number_format = "dd-mmm-yyyy"
    ws.cell(row=r, column=6).number_format = "dd-mmm-yyyy"
    ws.cell(row=r, column=6, value=f'=IF(E{r}="","",E{r}+90)')
    ws.cell(row=r, column=6).fill = PatternFill("solid", fgColor=LIGHT)
    ws.cell(row=r, column=10, value=(
        f'=IF(A{r}="","",IF(I{r}="Yes","DANGER: move it into n8n and create a new key",'
        f'IF(AND(F{r}<>"",F{r}<TODAY()),"Renew this key now",'
        f'IF(H{r}="No","Set a spending limit","OK"))))'))
    ws.cell(row=r, column=10).fill = PatternFill("solid", fgColor=LIGHT)
for i, ex in enumerate(examples):
    r = 5 + i
    name, svc, doors, where, created, owner, limit, outside = ex
    ws.cell(row=r, column=1, value=name)
    ws.cell(row=r, column=2, value=svc)
    ws.cell(row=r, column=3, value=doors)
    ws.cell(row=r, column=4, value=where)
    ws.cell(row=r, column=5, value=_dt.date.fromisoformat(created))
    ws.cell(row=r, column=7, value=owner)
    ws.cell(row=r, column=8, value=limit)
    ws.cell(row=r, column=9, value=outside)
dv1 = DataValidation(type="list", formula1='"Yes,No,N/A"', allow_blank=True)
dv2 = DataValidation(type="list", formula1='"Yes,No"', allow_blank=True)
dv3 = DataValidation(type="list", formula1='"Anthropic (Claude),OpenAI,Odoo,Google,Gmail,Slack,Telegram,Other"', allow_blank=True)
for d in (dv1, dv2, dv3):
    ws.add_data_validation(d)
dv1.add("H5:H24")
dv2.add("I5:I24")
dv3.add("B5:B24")
ws.conditional_formatting.add("J5:J24", FormulaRule(formula=['LEFT(J5,6)="DANGER"'], fill=PatternFill("solid", fgColor="FFC7CE")))
ws.conditional_formatting.add("J5:J24", FormulaRule(formula=['J5="OK"'], fill=PatternFill("solid", fgColor="C6EFCE")))
ws.conditional_formatting.add("J5:J24", FormulaRule(formula=['OR(J5="Renew this key now",J5="Set a spending limit")'], fill=PatternFill("solid", fgColor="FFEB9C")))
ws["A26"] = "Renew/review date = created date + 90 days (a sensible habit). If a key ever leaks: cancel it in the service, create a new one, update the n8n credential, and update this log."
ws["A26"].font = Font(italic=True, color="555555")
ws.freeze_panes = "A5"

# ---------------- Cost Estimator ----------------
ws = wb.create_sheet("Cost Estimator")
title(ws, "AI Cost Estimator", "Change the yellow cells. Prices are examples at the time of recording; check the provider's pricing page.")
header(ws, 4, ["Input", "BrightLeaf (Sonnet)", "BrightLeaf (Haiku)", "My Company", "What it means"], [44, 20, 20, 20, 60])
rows = [
    ("Questions / runs per day", 20, 20, None, "How many times a day the agent runs or is asked something"),
    ("Working days per month", 22, 22, None, "Usually 20-23"),
    ("Input tokens per run", 12000, 12000, None, "Instructions + ERP data sent in. Hello world ≈ 350. A Stocky question ≈ 8,000-15,000, because the agent calls the brain 2-3 times and re-reads the stock data each time"),
    ("Output tokens per run", 600, 600, None, "Words the AI writes back, including its tool requests. A short email ≈ 200"),
    ("Price per 1M input tokens (USD)", 2.00, 0.10, None, "Example: Claude Sonnet ≈ $2, Claude Haiku ≈ $0.10 (check current prices)"),
    ("Price per 1M output tokens (USD)", 10.00, 0.50, None, "Example: Claude Sonnet ≈ $10, Claude Haiku ≈ $0.50"),
    ("Hours saved per week", 4, 4, None, "Be conservative. Priya spends ~12 h/week on manual ERP work"),
    ("Value of one hour of your time (USD)", 15, 15, None, "Your loaded hourly cost, or what your manager would value it at"),
]
r0 = 5
for i, (label, a, b, cval, note) in enumerate(rows):
    r = r0 + i
    ws.cell(row=r, column=1, value=label).font = Font(bold=True)
    for col, v in ((2, a), (3, b), (4, cval)):
        c = ws.cell(row=r, column=col, value=v)
        c.fill = INPUT_FILL
        c.border = BORDER
    ws.cell(row=r, column=5, value=note).alignment = WRAP
for col in "BCD":
    for r in (9, 10):
        ws[f"{col}{r}"].number_format = '"$"#,##0.00'
    ws[f"{col}12"].number_format = '"$"#,##0'
ws["A14"] = "Results (formulas)"
ws["A14"].font = HEAD_FONT
ws["A14"].fill = HEAD_FILL
results = [
    ("Cost per run (USD)", "=IF({c}7=\"\",\"\",({c}7*{c}9+{c}8*{c}10)/1000000)", '"$"0.0000', "Input tokens × input price + output tokens × output price"),
    ("Runs per month", "=IF({c}5=\"\",\"\",{c}5*{c}6)", "#,##0", "Runs per day × working days"),
    ("AI cost per month (USD)", "=IF({c}15=\"\",\"\",{c}15*{c}16)", '"$"#,##0.00', "Set your monthly spending limit a bit above this"),
    ("Runs per $1", "=IF(OR({c}15=\"\",{c}15=0),\"\",1/{c}15)", "#,##0", "How far one dollar goes"),
    ("Value of time saved per month (USD)", "=IF({c}11=\"\",\"\",{c}11*{c}12*4.33)", '"$"#,##0', "Hours/week × hourly value × 4.33 weeks"),
    ("Return: value ÷ AI cost", "=IF(OR({c}17=\"\",{c}17=0),\"\",{c}19/{c}17)", '0"x"', "How many times the AI cost pays for itself"),
    ("Suggested monthly spending limit (USD)", "=IF({c}17=\"\",\"\",ROUNDUP({c}17*1.5,0))", '"$"#,##0', "AI cost + 50% buffer, rounded up"),
]
for i, (label, f, fmt, note) in enumerate(results):
    r = 15 + i
    ws.cell(row=r, column=1, value=label).font = Font(bold=True)
    for col in "BCD":
        c = ws[f"{col}{r}"]
        c.value = f.format(c=col)
        c.number_format = fmt
        c.fill = PatternFill("solid", fgColor=LIGHT)
        c.border = BORDER
    ws.cell(row=r, column=5, value=note).alignment = WRAP
ws["A23"] = "Reality check: one hello world email ≈ 350 input + 200 output tokens on Sonnet ≈ $0.003 (about a third of a cent)."
ws["A23"].font = Font(italic=True, color="555555")
ws["A24"] = "Now try it with your company: fill column D (My Company). Copy prices from column B or C to start."
ws["A24"].font = Font(italic=True, color="555555")
ws.freeze_panes = "A5"

wb.save(OUT)
print("saved", OUT)
