"""Build Free_Activity_ERP_Time_Drain_Calculator.xlsx for the free lesson.

Run: /Users/vishnuma/Documents/Cursor/Skool/.venv/bin/python build_time_drain_calculator.py
"""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import CellIsRule, FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

OUT = Path(__file__).resolve().parent.parent / "Free_Activity_ERP_Time_Drain_Calculator.xlsx"

NAVY = "1F2A44"
INPUT = "FFF4B3"      # yellow = you type here
CALC = "EAF2FB"       # light blue = formula, don't touch
GREEN = "DFF2E1"
RED = "F8D7DA"
GREY = "F2F2F2"

thin = Side(style="thin", color="BFBFBF")
BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
HEAD_FONT = Font(bold=True, color="FFFFFF", size=11)
HEAD_FILL = PatternFill("solid", fgColor=NAVY)
WRAP = Alignment(wrap_text=True, vertical="top")
CENTER = Alignment(horizontal="center", vertical="center", wrap_text=True)


def fill(color):
    return PatternFill("solid", fgColor=color)


def title(ws, text, sub=None):
    ws["A1"] = text
    ws["A1"].font = Font(bold=True, size=16, color=NAVY)
    if sub:
        ws["A2"] = sub
        ws["A2"].font = Font(italic=True, size=11, color="595959")


def header_row(ws, row, headers):
    for col, h in enumerate(headers, start=1):
        c = ws.cell(row=row, column=col, value=h)
        c.font = HEAD_FONT
        c.fill = HEAD_FILL
        c.alignment = CENTER
        c.border = BOX
    ws.row_dimensions[row].height = 36


def widths(ws, values):
    for letter, w in values.items():
        ws.column_dimensions[letter].width = w


wb = Workbook()

# ---------------------------------------------------------------- Start Here
ws = wb.active
ws.title = "Start Here"
title(ws, "ERP Time Drain Calculator", "Free activity from the Agentic SCM community | about 15 minutes")
lines = [
    ("What is this?", True),
    ("A simple calculator that shows how many hours (and how much money) you lose each year to "
     "repetitive copy-paste work between your ERP, Excel and email. Those hours are where an AI agent can help first.", False),
    ("", False),
    ("Colour guide", True),
    ("YELLOW cells = you type here.", False),
    ("BLUE cells = formulas. They calculate by themselves, so please don't type over them.", False),
    ("", False),
    ("Step 1: Look at the example (2 minutes)", True),
    ("Open the 'Time Drain Calculator' sheet. The first 6 rows show Priya's week at BrightLeaf Supplies. "
     "Notice how small tasks add up to about 12 hours a week.", False),
    ("", False),
    ("Step 2: Add your own tasks (8 minutes)", True),
    ("In the empty yellow rows, list the jobs you repeat every week. Ideas: exporting stock, updating a tracker, "
     "chasing suppliers, building a report, answering 'do we have it in stock?'.", False),
    ("For each task, type how many times per week you do it, how many minutes it takes each time, "
     "and your rough hourly cost (your salary divided by working hours is fine; a guess is fine too).", False),
    ("Then choose Yes / Partly / No from the dropdown: could a smart intern with access to your ERP do this?", False),
    ("Tip: you can delete Priya's example rows once you've added your own, or keep them for comparison.", False),
    ("", False),
    ("Step 3: Read your totals (1 minute)", True),
    ("The green totals row shows your hours per week, hours per year and cost per year, "
     "plus how many hours an agent could realistically give back.", False),
    ("", False),
    ("Step 4: Practise spotting opportunities (4 minutes)", True),
    ("Open 'BrightLeaf Stock Snapshot' to see how a simple formula flags products that need reordering, "
     "then answer the 3 questions on 'Spot the Agent Opportunity'.", False),
    ("", False),
    ("Step 5: Share it", True),
    ("Fill in the 'Find Your First AI Agent' worksheet, then post your yearly hours and your agent's "
     "one-sentence job description in the Agentic SCM community. We'd love to see it!", False),
    ("", False),
    ("If this feels new, that's normal. You can't break anything here; just close without saving and start again.", False),
]
for i, (text, bold) in enumerate(lines, start=4):
    c = ws.cell(row=i, column=1, value=text)
    c.alignment = WRAP
    if bold:
        c.font = Font(bold=True, size=12, color=NAVY)
ws["A8"].fill = fill(INPUT)
ws["A9"].fill = fill(CALC)
ws.column_dimensions["A"].width = 110

# ---------------------------------------------------------- Time Drain Calculator
ws = wb.create_sheet("Time Drain Calculator")
title(ws, "Time Drain Calculator", "Where do your hours go? Yellow = type here, blue = calculated for you.")
ws["A3"] = "Working weeks per year:"
ws["A3"].font = Font(bold=True)
ws.merge_cells("A3:B3")
ws["C3"] = 48
ws["C3"].fill = fill(INPUT)
ws["C3"].border = BOX
ws["C3"].alignment = CENTER

HEAD = 5
header_row(ws, HEAD, [
    "#", "Repetitive task", "System(s) involved", "Times per week", "Minutes each time",
    "Hours / week", "Hours / year", "Hourly cost (USD)", "Cost / year (USD)",
    "Could an agent do this? (Yes / Partly / No)", "Notes",
])
examples = [
    ("Export stock from Odoo to Excel and compare with reorder points", "Odoo, Excel", 5, 36, 25, "Yes",
     "Daily morning check"),
    ("Answer sales team's 'do we have it in stock?' emails", "Odoo, Email", 12, 5, 25, "Yes", ""),
    ("Type up purchase orders / RFQs for low-stock items", "Odoo, Excel", 4, 30, 25, "Partly",
     "Agent drafts, Priya approves"),
    ("Chase suppliers by email for delivery dates", "Email", 6, 10, 25, "Partly", ""),
    ("Check weather, exchange rates and holidays for overseas suppliers", "Websites, Excel", 4, 30, 25, "Yes",
     "Shenzhen, Dubai, Chennai"),
    ("Build the Monday stock report for Mr. Kapoor", "Odoo, Excel, Email", 1, 180, 25, "Yes", ""),
]
FIRST = HEAD + 1
EMPTY_ROWS = 10
LAST = FIRST + len(examples) + EMPTY_ROWS - 1
for idx in range(len(examples) + EMPTY_ROWS):
    r = FIRST + idx
    data = examples[idx] if idx < len(examples) else ("", "", None, None, None, None, "")
    task, system, times, mins, cost, agent, notes = data
    ws.cell(row=r, column=1, value=idx + 1)
    ws.cell(row=r, column=2, value=task or None)
    ws.cell(row=r, column=3, value=system or None)
    ws.cell(row=r, column=4, value=times)
    ws.cell(row=r, column=5, value=mins)
    ws.cell(row=r, column=6, value=f'=IF(OR(D{r}="",E{r}=""),"",D{r}*E{r}/60)')
    ws.cell(row=r, column=7, value=f'=IF(F{r}="","",F{r}*$C$3)')
    ws.cell(row=r, column=8, value=cost)
    ws.cell(row=r, column=9, value=f'=IF(OR(G{r}="",H{r}=""),"",G{r}*H{r})')
    ws.cell(row=r, column=10, value=agent)
    ws.cell(row=r, column=11, value=notes or None)
    for col in range(1, 12):
        c = ws.cell(row=r, column=col)
        c.border = BOX
        c.alignment = WRAP if col in (2, 3, 11) else CENTER
        if col in (6, 7, 9):
            c.fill = fill(CALC)
        elif col != 1:
            c.fill = fill(INPUT)
    ws.cell(row=r, column=6).number_format = "0.0"
    ws.cell(row=r, column=7).number_format = "#,##0"
    ws.cell(row=r, column=8).number_format = "$#,##0.00"
    ws.cell(row=r, column=9).number_format = "$#,##0"
    ws.row_dimensions[r].height = 32

dv = DataValidation(type="list", formula1='"Yes,Partly,No"', allow_blank=True,
                    showErrorMessage=True, errorTitle="Pick from the list",
                    error="Please choose Yes, Partly or No.")
ws.add_data_validation(dv)
dv.add(f"J{FIRST}:J{LAST}")

T = LAST + 1
ws.cell(row=T, column=2, value="TOTALS")
ws.cell(row=T, column=6, value=f"=SUM(F{FIRST}:F{LAST})")
ws.cell(row=T, column=7, value=f"=SUM(G{FIRST}:G{LAST})")
ws.cell(row=T, column=9, value=f"=SUM(I{FIRST}:I{LAST})")
ws.cell(row=T, column=10, value=f'=COUNTIF(J{FIRST}:J{LAST},"Yes")&" Yes / "&COUNTIF(J{FIRST}:J{LAST},"Partly")&" Partly"')
for col in range(1, 12):
    c = ws.cell(row=T, column=col)
    c.font = Font(bold=True)
    c.fill = fill(GREEN)
    c.border = BOX
    c.alignment = CENTER
ws.cell(row=T, column=6).number_format = "0.0"
ws.cell(row=T, column=7).number_format = "#,##0"
ws.cell(row=T, column=9).number_format = "$#,##0"

S = T + 2
summary = [
    ("Hours per year an agent could give back (Yes = 100%, Partly = 50%):",
     f'=SUMIF(J{FIRST}:J{LAST},"Yes",G{FIRST}:G{LAST})+0.5*SUMIF(J{FIRST}:J{LAST},"Partly",G{FIRST}:G{LAST})',
     "#,##0"),
    ("That's this many full 8-hour working days:", f"=G{S}/8", "0"),
    ("Value of that time per year (USD):",
     f'=SUMIF(J{FIRST}:J{LAST},"Yes",I{FIRST}:I{LAST})+0.5*SUMIF(J{FIRST}:J{LAST},"Partly",I{FIRST}:I{LAST})',
     "$#,##0"),
]
for i, (label, formula, fmt) in enumerate(summary):
    r = S + i
    ws.cell(row=r, column=2, value=label).font = Font(bold=True)
    ws.merge_cells(start_row=r, start_column=2, end_row=r, end_column=6)
    ws.cell(row=r, column=2).alignment = Alignment(horizontal="right")
    c = ws.cell(row=r, column=7, value=formula)
    c.number_format = fmt
    c.font = Font(bold=True, size=12, color=NAVY)
    c.fill = fill(GREEN)
    c.border = BOX
    c.alignment = CENTER
ws.cell(row=S + 4, column=2,
        value="Post your 'Hours per year an agent could give back' number in the Agentic SCM community!").font = \
    Font(italic=True, color="595959")

widths(ws, {"A": 5, "B": 46, "C": 18, "D": 11, "E": 11, "F": 11, "G": 11, "H": 12, "I": 13, "J": 18, "K": 26})
ws.freeze_panes = f"C{FIRST}"

# ------------------------------------------------------- BrightLeaf Stock Snapshot
ws = wb.create_sheet("BrightLeaf Stock Snapshot")
title(ws, "BrightLeaf Stock Snapshot (Monday 08:00)",
      "This is the kind of check Stocky the agent does every morning. Column J flags what needs reordering.")
products = [
    ("BL-1001", "Steel Hex Bolts M10 (box of 100)", 12.50, 80, 7, "Apex Fasteners", "Pune", 145),
    ("BL-1002", "Corrugated Shipping Box 18x12x10", 0.85, 1500, 5, "PackRight Industries", "Mumbai", 1180),
    ("BL-1003", "Stretch Wrap Film 500mm", 9.20, 200, 6, "PackRight Industries", "Mumbai", 260),
    ("BL-1004", "Industrial Safety Gloves (pair)", 2.40, 600, 10, "SafeHands Co.", "Chennai", 420),
    ("BL-1005", "Pallet Jack Wheels (set)", 38.00, 25, 21, "Global Lift Parts", "Shenzhen", 18),
    ("BL-1006", "Packing Tape 48mm (roll)", 1.10, 1000, 5, "PackRight Industries", "Mumbai", 1850),
    ("BL-1007", "Hydraulic Oil 20L", 54.00, 40, 14, "Gulf Lubricants", "Dubai", 31),
    ("BL-1008", "LED Warehouse Light 150W", 72.00, 30, 28, "Shenzhen BrightTech", "Shenzhen", 34),
    ("BL-1009", "Nylon Cable Ties (pack of 500)", 6.30, 150, 7, "Apex Fasteners", "Pune", 410),
    ("BL-1010", "Forklift Battery Water Kit", 19.75, 20, 12, "Global Lift Parts", "Shenzhen", 26),
]
HEAD = 4
header_row(ws, HEAD, [
    "SKU", "Product", "Unit cost (USD)", "Reorder point", "Lead time (days)", "Main supplier",
    "Supplier city", "On hand (qty)", "Shortfall (qty)", "Status", "Cost to refill to reorder point (USD)",
])
P1 = HEAD + 1
PN = P1 + len(products) - 1
for i, (sku, name, cost, rp, lt, sup, city, oh) in enumerate(products):
    r = P1 + i
    vals = [sku, name, cost, rp, lt, sup, city, oh,
            f"=MAX(0,D{r}-H{r})",
            f'=IF(H{r}<D{r},"REORDER","OK")',
            f"=I{r}*C{r}"]
    for col, v in enumerate(vals, start=1):
        c = ws.cell(row=r, column=col, value=v)
        c.border = BOX
        c.alignment = WRAP if col == 2 else CENTER
        if col in (9, 10, 11):
            c.fill = fill(CALC)
    ws.cell(row=r, column=3).number_format = "$#,##0.00"
    ws.cell(row=r, column=8).number_format = "#,##0"
    ws.cell(row=r, column=8).fill = fill(INPUT)
    ws.cell(row=r, column=11).number_format = "$#,##0.00"

rng = f"J{P1}:J{PN}"
ws.conditional_formatting.add(rng, CellIsRule(operator="equal", formula=['"REORDER"'],
                                              fill=fill(RED), font=Font(bold=True, color="9C0006")))
ws.conditional_formatting.add(rng, CellIsRule(operator="equal", formula=['"OK"'],
                                              fill=fill(GREEN), font=Font(color="006100")))
ws.conditional_formatting.add(f"A{P1}:H{PN}", FormulaRule(formula=[f'$J{P1}="REORDER"'], fill=fill("FCE4E4")))

ws.cell(row=PN + 2, column=2, value="Products to reorder:").font = Font(bold=True)
ws.cell(row=PN + 2, column=3, value=f'=COUNTIF({rng},"REORDER")').font = Font(bold=True, color="9C0006")
ws.cell(row=PN + 3, column=2,
        value="Try it: change an 'On hand' number (yellow) and watch the Status update by itself.").font = \
    Font(italic=True, color="595959")
widths(ws, {"A": 10, "B": 34, "C": 12, "D": 11, "E": 11, "F": 22, "G": 13, "H": 12, "I": 12, "J": 12, "K": 18})
ws.freeze_panes = f"C{P1}"

# ------------------------------------------------------- Spot the Agent Opportunity
ws = wb.create_sheet("Spot the Agent Opportunity")
title(ws, "Spot the Agent Opportunity",
      "Use the 'BrightLeaf Stock Snapshot' sheet. Type your answers in the yellow cells, then check them.")
header_row(ws, 4, ["#", "Question", "Your answer", "Check"])
snap = "'BrightLeaf Stock Snapshot'"
questions = [
    ("How many products need reordering right now?", None,
     f'=IF(C5="","",IF(C5=COUNTIF({snap}!J{P1}:J{PN},"REORDER"),"Correct!","Not quite: count the red REORDER cells"))'),
    ("Of the products that need reordering, which one is the riskiest because it has the LONGEST lead time? "
     "(type the SKU, e.g. BL-1001)", None,
     '=IF(C6="","",IF(UPPER(TRIM(C6))="BL-1005","Correct! 21 days from Shenzhen",'
     '"Not quite: compare the lead time column for the REORDER rows"))'),
    ("Roughly how much (USD) would it cost to bring ALL low products back up to their reorder point? "
     "(within $50 counts)", None,
     f'=IF(C7="","",IF(ABS(C7-SUMIF({snap}!J{P1}:J{PN},"REORDER",{snap}!K{P1}:K{PN}))<=50,"Correct!",'
     '"Not quite: add up column K for the REORDER rows"))'),
]
for i, (q, ans, check) in enumerate(questions):
    r = 5 + i
    ws.cell(row=r, column=1, value=i + 1)
    ws.cell(row=r, column=2, value=q)
    ws.cell(row=r, column=3, value=ans)
    ws.cell(row=r, column=4, value=check)
    for col in range(1, 5):
        c = ws.cell(row=r, column=col)
        c.border = BOX
        c.alignment = WRAP if col == 2 else CENTER
    ws.cell(row=r, column=3).fill = fill(INPUT)
    ws.cell(row=r, column=4).fill = fill(CALC)
    ws.row_dimensions[r].height = 48
ws["C7"].number_format = "$#,##0"
ws.conditional_formatting.add("D5:D7", FormulaRule(formula=['LEFT(D5,7)="Correct"'],
                                                   fill=fill(GREEN), font=Font(bold=True, color="006100")))

ws["B10"] = "Bonus thinking question (no right answer)"
ws["B10"].font = Font(bold=True, size=12, color=NAVY)
ws["B11"] = ("Priya does this check by hand every morning. Which 'door' would an agent use to get the on-hand "
             "numbers (ERP, API or database)? And what should the agent ALWAYS ask Priya before doing?")
ws["B11"].alignment = WRAP
ws.row_dimensions[11].height = 48
ws["B12"] = "Your thoughts:"
ws["C12"].fill = fill(INPUT)
ws.merge_cells("C12:D14")
ws["C12"].alignment = WRAP
ws["C12"].border = BOX

ws["B16"] = "Answers (peek only after you've tried!)"
ws["B16"].font = Font(bold=True, color="595959")
answers = [
    "1) 4 products: BL-1002 boxes, BL-1004 gloves, BL-1005 pallet jack wheels, BL-1007 hydraulic oil.",
    "2) BL-1005 Pallet Jack Wheels: 21-day lead time from Shenzhen, and only 9 sets on hand.",
    "3) About $3,218 ($510 + $912 + $608 + $1,188).",
    "Bonus) The ERP door (Odoo), and the agent should ask Priya before sending any purchase order to a supplier.",
]
for i, a in enumerate(answers):
    c = ws.cell(row=17 + i, column=2, value=a)
    c.font = Font(color="A6A6A6")
    c.alignment = WRAP
widths(ws, {"A": 5, "B": 70, "C": 18, "D": 34})

wb.save(OUT)
print(f"Saved {OUT}")
