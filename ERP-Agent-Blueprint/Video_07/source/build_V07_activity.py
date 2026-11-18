"""Builds V07_Activity_ReorderSimulator.xlsx (run with the course venv python)."""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import CellIsRule, FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

OUT = Path(__file__).resolve().parent.parent / "V07_Activity_ReorderSimulator.xlsx"

NAVY = "1F2A44"
HEAD = PatternFill("solid", fgColor=NAVY)
INPUT = PatternFill("solid", fgColor="FFF4B3")
CALC = PatternFill("solid", fgColor="E8F1FB")
GREEN = PatternFill("solid", fgColor="D9F2D9")
AMBER = PatternFill("solid", fgColor="FDE9C9")
RED = PatternFill("solid", fgColor="F8D0D0")
WHITE_B = Font(bold=True, color="FFFFFF")
BOLD = Font(bold=True)
TITLE = Font(bold=True, size=16, color=NAVY)
thin = Side(style="thin", color="BFBFBF")
BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
WRAP = Alignment(wrap_text=True, vertical="top")

wb = Workbook()

# ---------------------------------------------------------------- Instructions
ws = wb.active
ws.title = "Instructions"
ws.column_dimensions["A"].width = 4
ws.column_dimensions["B"].width = 110
lines = [
    ("Reorder Decision Simulator: Play Stocky and Sarah for one morning", TITLE),
    ("Course: The ERP Agent Blueprint | Video 7: Agents That Take Action | Time: 25-35 minutes", Font(italic=True)),
    ("", None),
    ("WHAT THIS IS", BOLD),
    ("It's Monday, 8am at BrightLeaf Supplies. Stocky has just read stock levels from Odoo. This workbook does exactly what the n8n workflow in the video does: it finds SKUs below the reorder point, calculates a suggested order quantity, works out the order value, decides who must approve, and runs a sanity check. YOU play Sarah and make the final call.", None),
    ("", None),
    ("COLOUR CODE", BOLD),
    ("Yellow cells = you can type here.  Blue cells = formulas (don't type over them).  Red = needs attention.", None),
    ("", None),
    ("STEP 1 (5 min): Open the 'Simulator' sheet. Look at the Settings box at the top: multiplier 2, Mr. Harrison's limit $2,000, sanity multiple 3, hard ceiling $10,000.", None),
    ("STEP 2 (5 min): Read each row. Which SKUs say YES under 'Needs reorder?'. Check one suggested quantity with a calculator: reorder point x 2 - on hand.", None),
    ("STEP 3 (10 min): Read 'Notes from Sarah's desk' (column N). Then choose Approve / Reject / Change qty in column O for every SKU that needs reordering, and write your reason in column P. Remember: the human knows things the ERP doesn't.", None),
    ("STEP 4 (10 min): Go to the 'Scenarios' sheet and work through the 5 what-if questions. Scenario 4 recreates the 'ten times too big' story from the video. Does the sanity check catch it?", None),
    ("STEP 5 (10 min, optional): Now try it with your company. Open 'Your Company', type 5-10 of your own products with real reorder points, stock and costs, and set your own approval limit.", None),
    ("", None),
    ("THE ORDER RULE (from the video)", BOLD),
    ("Suggested order = Reorder point x 2 - On hand.  In words: 'fill the shelf back up to twice the reorder point'. Example: Pallet Jack Wheels, reorder point 25, on hand 18: 25 x 2 = 50, 50 - 18 = 32. Simple and predictable, perfect for week one.", None),
    ("", None),
    ("THE THREE GUARDRAILS", BOLD),
    ("1. Human approval: nothing becomes a draft RFQ until someone clicks Approve.", None),
    ("2. Maximum order value: over $2,000 goes to Mr. Harrison; over $10,000 is blocked (hard ceiling).", None),
    ("3. Sanity check: if the suggested quantity is more than 3 x the reorder point, or the value is over $5,000, the email starts with 'CHECK THIS FIRST'.", None),
    ("", None),
    ("You can't break anything here. If you mess up a formula, just download the file again.", Font(italic=True, color="666666")),
]
for i, (text, font) in enumerate(lines, start=1):
    c = ws.cell(row=i, column=2, value=text)
    c.alignment = WRAP
    if font:
        c.font = font
ws.sheet_view.showGridLines = False

# ---------------------------------------------------------------- Simulator
products = [
    # SKU, product, supplier, lead, cost, reorder point, on hand (canonical BrightLeaf stock), note
    ("BL-1001", "Steel Hex Bolts M10 (box of 100)", "Apex Fasteners (Columbus)", 7, 12.50, 80, 145, ""),
    ("BL-1002", "Corrugated Shipping Box 18x12x10", "PackRight Industries (Chicago)", 5, 0.85, 1500, 1180, "Big customer shipment went out Friday. Demand for boxes is normal."),
    ("BL-1003", "Stretch Wrap Film 500mm", "PackRight Industries (Chicago)", 6, 9.20, 200, 260, ""),
    ("BL-1004", "Industrial Safety Gloves (pair)", "SafeHands Co. (Monterrey)", 10, 2.40, 600, 420, "500 pairs arriving THURSDAY from SafeHands on an open purchase order."),
    ("BL-1005", "Pallet Jack Wheels (set)", "Global Lift Parts (Shenzhen)", 21, 38.00, 25, 18, "Tom: two pallet jacks are waiting for new wheels. 21-day lead time."),
    ("BL-1006", "Packing Tape 48mm (roll)", "PackRight Industries (Chicago)", 5, 1.10, 1000, 1850, ""),
    ("BL-1007", "Hydraulic Oil 20L", "Gulf Lubricants (Dubai)", 14, 54.00, 40, 31, "Tom says two forklifts are due for an oil change next week."),
    ("BL-1008", "LED Warehouse Light 150W", "Shenzhen BrightTech (Shenzhen)", 28, 72.00, 30, 34, "Only 4 above the reorder point, and a 28-day lead time. Keep an eye on it."),
    ("BL-1009", "Nylon Cable Ties (pack of 500)", "Apex Fasteners (Columbus)", 7, 6.30, 150, 410, ""),
    ("BL-1010", "Forklift Battery Water Kit", "Global Lift Parts (Shenzhen)", 12, 19.75, 20, 26, "No open orders. Could combine with a Global Lift Parts order."),
]

sim = wb.create_sheet("Simulator")
sim["A1"] = "Monday 8:00am: Stocky's reorder check"
sim["A1"].font = TITLE
sim["A2"] = "Yellow = you type. Blue = formulas. Make a decision in column O for every row that says YES."
sim["A2"].font = Font(italic=True, color="666666")

settings = [
    ("Order multiplier (reorder point x ?)", 2, "B4"),
    ("Mr. Harrison's approval limit (USD)", 2000, "B5"),
    ("Sanity check: flag if qty > reorder point x", 3, "B6"),
    ("Hard ceiling: block orders above (USD)", 10000, "B7"),
]
sim["A3"] = "SETTINGS"
sim["A3"].font = BOLD
for r, (label, val, _) in enumerate(settings, start=4):
    sim.cell(row=r, column=1, value=label).font = BOLD
    c = sim.cell(row=r, column=2, value=val)
    c.fill = INPUT
    c.border = BOX
    if r in (5, 7):
        c.number_format = '"$"#,##0'

headers = ["SKU", "Product", "Supplier", "Lead time (days)", "Unit cost (USD)", "Reorder point",
           "On hand (Odoo)", "Needs reorder?", "Suggested qty", "Order value (USD)", "Who approves?",
           "Sanity check", "Light", "Notes from Sarah's desk", "Your decision", "Your reason"]
HR = 9
widths = [10, 34, 30, 10, 11, 10, 11, 11, 11, 13, 22, 18, 9, 48, 14, 40]
for i, h in enumerate(headers, start=1):
    c = sim.cell(row=HR, column=i, value=h)
    c.fill = HEAD
    c.font = WHITE_B
    c.alignment = Alignment(wrap_text=True, vertical="center", horizontal="center")
    c.border = BOX
    sim.column_dimensions[c.column_letter].width = widths[i - 1]
sim.row_dimensions[HR].height = 32


def formula_row(ws, r):
    ws.cell(row=r, column=8, value=f'=IF(AND(F{r}>0,G{r}<>"",G{r}<F{r}),"YES","no")')
    ws.cell(row=r, column=9, value=f'=IF(H{r}="YES",F{r}*$B$4-G{r},0)')
    ws.cell(row=r, column=10, value=f"=I{r}*E{r}")
    ws.cell(row=r, column=11, value=(
        f'=IF(H{r}<>"YES","-",IF(J{r}>$B$7,"BLOCKED (over hard ceiling)",'
        f'IF(J{r}>$B$5,"Mr. Harrison","Sarah")))'))
    ws.cell(row=r, column=12, value=(
        f'=IF(H{r}<>"YES","-",IF(OR(I{r}>F{r}*$B$6,J{r}>5000),"CHECK THIS FIRST","OK"))'))
    ws.cell(row=r, column=13, value=f'=IF(H{r}<>"YES","Green",IF(O{r}="Approve","Amber","Waiting"))')
    for col in range(8, 14):
        c = ws.cell(row=r, column=col)
        c.fill = CALC
        c.border = BOX
    ws.cell(row=r, column=10).number_format = '"$"#,##0.00'
    ws.cell(row=r, column=5).number_format = '"$"#,##0.00'
    for col in (15, 16):
        c = ws.cell(row=r, column=col)
        c.fill = INPUT
        c.border = BOX
    ws.cell(row=r, column=7).fill = INPUT


def add_rules(ws, first, last):
    rng = lambda col: f"{col}{first}:{col}{last}"
    ws.conditional_formatting.add(rng("H"), CellIsRule(operator="equal", formula=['"YES"'], fill=RED, font=Font(bold=True, color="9C0006")))
    ws.conditional_formatting.add(rng("K"), CellIsRule(operator="equal", formula=['"Mr. Harrison"'], fill=AMBER, font=BOLD))
    ws.conditional_formatting.add(rng("K"), FormulaRule(formula=[f'LEFT(K{first},7)="BLOCKED"'], fill=RED, font=Font(bold=True, color="9C0006")))
    ws.conditional_formatting.add(rng("L"), CellIsRule(operator="equal", formula=['"CHECK THIS FIRST"'], fill=RED, font=Font(bold=True, color="9C0006")))
    ws.conditional_formatting.add(rng("M"), CellIsRule(operator="equal", formula=['"Green"'], fill=GREEN))
    ws.conditional_formatting.add(rng("M"), CellIsRule(operator="equal", formula=['"Amber"'], fill=AMBER))
    ws.conditional_formatting.add(rng("M"), CellIsRule(operator="equal", formula=['"Waiting"'], fill=PatternFill("solid", fgColor="EDEDED")))
    ws.conditional_formatting.add(rng("O"), CellIsRule(operator="equal", formula=['"Approve"'], fill=GREEN))
    ws.conditional_formatting.add(rng("O"), CellIsRule(operator="equal", formula=['"Reject"'], fill=RED))
    dv = DataValidation(type="list", formula1='"Approve,Reject,Change qty"', allow_blank=True)
    dv.error = "Pick Approve, Reject or Change qty"
    dv.prompt = "Your call, Sarah"
    ws.add_data_validation(dv)
    dv.add(rng("O"))


first = HR + 1
for i, p in enumerate(products):
    r = first + i
    for col, val in enumerate(p[:7], start=1):
        c = sim.cell(row=r, column=col, value=val)
        c.border = BOX
    sim.cell(row=r, column=14, value=p[7]).alignment = WRAP
    sim.cell(row=r, column=14).border = BOX
    formula_row(sim, r)
last = first + len(products) - 1
add_rules(sim, first, last)

s = last + 2
summary = [
    ("SKUs that need reordering", f'=COUNTIF(H{first}:H{last},"YES")', None),
    ("Total value Stocky suggested (USD)", f"=SUM(J{first}:J{last})", '"$"#,##0.00'),
    ("Total value YOU approved (USD)", f'=SUMIF(O{first}:O{last},"Approve",J{first}:J{last})', '"$"#,##0.00'),
    ("Requests that go to Mr. Harrison", f'=COUNTIF(K{first}:K{last},"Mr. Harrison")', None),
    ("Sanity-check flags", f'=COUNTIF(L{first}:L{last},"CHECK THIS FIRST")', None),
    ("Requests you rejected", f'=COUNTIF(O{first}:O{last},"Reject")', None),
]
sim.cell(row=s, column=2, value="SUMMARY").font = BOLD
for i, (label, f, fmt) in enumerate(summary, start=1):
    sim.cell(row=s + i, column=2, value=label).font = BOLD
    c = sim.cell(row=s + i, column=3, value=f)
    c.fill = CALC
    c.border = BOX
    if fmt:
        c.number_format = fmt
sim.freeze_panes = sim.cell(row=HR + 1, column=3)

# ---------------------------------------------------------------- Scenarios
sc = wb.create_sheet("Scenarios")
sc["A1"] = "What-if scenarios: change the Simulator, watch what happens"
sc["A1"].font = TITLE
sc["A2"] = "Change ONE thing at a time on the 'Simulator' sheet, write what happened, then change it back (Ctrl+Z / Cmd+Z)."
sc["A2"].font = Font(italic=True, color="666666")
sh = ["#", "Scenario", "What to change on the Simulator sheet", "Question", "Your answer"]
for i, h in enumerate(sh, start=1):
    c = sc.cell(row=4, column=i, value=h)
    c.fill = HEAD
    c.font = WHITE_B
    c.border = BOX
    c.alignment = Alignment(wrap_text=True, vertical="center")
for col, w in zip("ABCDE", (5, 28, 42, 46, 46)):
    sc.column_dimensions[col].width = w
scenarios = [
    ("Mr. Harrison gets busy", "Set Mr. Harrison's limit (B5) to 1000.", "How many requests now go to Mr. Harrison? Is that a good use of a director's time?"),
    ("A more cautious buyer", "Set the order multiplier (B4) to 1.5.", "What is the new suggested qty for Pallet Jack Wheels (BL-1005)? Show your maths."),
    ("Tom's quick count", "Tom counts the boxes: change BL-1002 On hand to 1550.", "Does BL-1002 still need reordering? What changed in the Summary?"),
    ("The ten-times-too-big order", "Someone adds an extra zero: change the BL-1004 Reorder point from 600 to 6000.", "What is the suggested qty and order value? Who approves it? Does the sanity check fire? Would the email have stopped the disaster?"),
    ("A quiet typo", "Change BL-1010 On hand from 26 to -60 (a counting error).", "Does the sanity check catch it? What extra rule would you add? (Hint: Part 3 of the Approval Rules Designer.)"),
]
for i, (name, change, q) in enumerate(scenarios, start=1):
    r = 4 + i
    for col, val in enumerate((i, name, change, q, ""), start=1):
        c = sc.cell(row=r, column=col, value=val)
        c.alignment = WRAP
        c.border = BOX
    sc.cell(row=r, column=5).fill = INPUT
    sc.row_dimensions[r].height = 62
sc.freeze_panes = "A5"

sc["A12"] = "Answer check (try first, then peek)"
sc["A12"].font = BOLD
answers = [
    "1. All four requests now go to Mr. Harrison: BL-1002 ($1,547), BL-1004 ($1,872), BL-1005 ($1,216) and BL-1007 ($2,646), up from just one. A director approving $1,200 wheel orders is a poor use of his time, so set limits that match real risk.",
    "2. 25 x 1.5 = 37.5, minus 18 = 19.5, so about 20 sets ($741). A smaller multiplier = smaller, more frequent orders.",
    "3. No. 1550 is above the reorder point of 1500, so BL-1002 drops out and the suggested total falls by $1,547.",
    "4. Suggested qty = 6000 x 2 - 420 = 11,580 pairs, value $27,792. It's above the $10,000 hard ceiling, so it's BLOCKED, and the sanity check says CHECK THIS FIRST. Two guardrails catch it, and nobody would even get an Approve button.",
    "5. On hand -60 gives a suggested qty of 100 (5x the reorder point of 20), so the sanity check DOES fire. But a negative stock count is itself a data problem: add a rule 'if on hand is negative, don't order; ask Tom to count the shelf'.",
]
for i, a in enumerate(answers):
    c = sc.cell(row=13 + i, column=2, value=a)
    sc.merge_cells(start_row=13 + i, start_column=2, end_row=13 + i, end_column=5)
    c.alignment = WRAP
    c.font = Font(color="555555")
    sc.row_dimensions[13 + i].height = 34

# ---------------------------------------------------------------- Your Company
yc = wb.create_sheet("Your Company")
yc["A1"] = "Now try it with your company"
yc["A1"].font = TITLE
yc["A2"] = "Type up to 15 of your own products in the yellow cells. Set YOUR approval limit and rules in the Settings box. The formulas do the rest."
yc["A2"].font = Font(italic=True, color="666666")
yc["A3"] = "SETTINGS"
yc["A3"].font = BOLD
own_settings = [("Order multiplier (reorder point x ?)", 2), ("Senior approver limit (your currency)", 2000),
                ("Sanity check: flag if qty > reorder point x", 3), ("Hard ceiling: block orders above", 10000)]
for r, (label, val) in enumerate(own_settings, start=4):
    yc.cell(row=r, column=1, value=label).font = BOLD
    c = yc.cell(row=r, column=2, value=val)
    c.fill = INPUT
    c.border = BOX
yc["D5"] = "Senior approver's role:"
yc["D5"].font = BOLD
yc["E5"].fill = INPUT
yc["E5"].border = BOX
own_headers = headers[:]
own_headers[2] = "Supplier"
own_headers[10] = "Who approves? (Senior = above limit)"
for i, h in enumerate(own_headers, start=1):
    c = yc.cell(row=HR, column=i, value=h)
    c.fill = HEAD
    c.font = WHITE_B
    c.alignment = Alignment(wrap_text=True, vertical="center", horizontal="center")
    c.border = BOX
    yc.column_dimensions[c.column_letter].width = widths[i - 1]
yc.row_dimensions[HR].height = 32
for r in range(HR + 1, HR + 16):
    for col in range(1, 8):
        c = yc.cell(row=r, column=col)
        c.fill = INPUT
        c.border = BOX
    formula_row(yc, r)
    yc.cell(row=r, column=11, value=(
        f'=IF(H{r}<>"YES","-",IF(J{r}>$B$7,"BLOCKED (over hard ceiling)",'
        f'IF(J{r}>$B$5,"Senior approver","Buyer")))'))
    yc.cell(row=r, column=14).fill = INPUT
    yc.cell(row=r, column=14).border = BOX
add_rules(yc, HR + 1, HR + 15)
yc.conditional_formatting.add(f"K{HR+1}:K{HR+15}", CellIsRule(operator="equal", formula=['"Senior approver"'], fill=AMBER, font=BOLD))
yc.freeze_panes = yc.cell(row=HR + 1, column=3)

# ---------------------------------------------------------------- n8n Copy-Paste
cp = wb.create_sheet("n8n Copy-Paste")
cp["A1"] = "Copy-paste text for the n8n build in Video 7"
cp["A1"].font = TITLE
cp.column_dimensions["A"].width = 34
cp.column_dimensions["B"].width = 115
items = [
    ("Schedule Trigger", "Trigger Interval: Days | Days Between Triggers: 1 | Trigger at Hour: 8am | Trigger at Minute: 0\nWorkflow ... > Settings > Timezone: America/New_York (Columbus, Ohio)"),
    ("Odoo 'Get Stock from Odoo'", "Resource: Custom Resource | Custom Resource Name: product.product | Operation: Get Many | Return All: on\nFields to Include: default_code, name, qty_available, reordering_min_qty, standard_price"),
    ("Filter 'Below Reorder Point'", "{{ $json.qty_available }}  Number: is less than  {{ $json.reordering_min_qty }}\nAND  {{ $json.reordering_min_qty }}  Number: is greater than  0"),
    ("Edit Fields: suggested_qty (Number)", "{{ $json.reordering_min_qty * 2 - $json.qty_available }}"),
    ("Edit Fields: order_value (Number)", "{{ ($json.reordering_min_qty * 2 - $json.qty_available) * $json.standard_price }}"),
    ("Google Sheets 'Find Supplier'", "Operation: Get row(s) in sheet | Sheet: Supplier Map | Filter column: SKU | Value: {{ $json.default_code }}"),
    ("AI Agent system message", "You are Stocky, BrightLeaf Supplies' procurement assistant." '\nWrite a short approval email body (max 5 sentences).\nLine 1: "Approval needed: [qty] x [product] from [supplier] ($[value])."\nThen explain in plain English why: on hand vs reorder point.\nSANITY CHECK: if the suggested quantity is more than 3 times the\nreorder point, or the order value is over $5,000, start with\n"CHECK THIS FIRST:" and say what looks unusual.\nNever say the order is placed. It is only a draft request.'),
    ("IF 'Over $2,000?'", "{{ $('Calculate Order').item.json.order_value }}  Number: is greater than  2000"),
    ("Gmail 'Ask Mr. Harrison' / 'Ask Sarah'", "Operation: Send message and wait for response | Response Type: Approval | Type of Approval: Approve and Disapprove\nApprove label: Approve draft RFQ | Disapprove label: Reject | Option: Limit Wait Time = 1 day"),
    ("IF 'Approved?'", "{{ $json.data.approved }}  Boolean: is true"),
    ("Odoo 'Create Draft RFQ' (purchase.order)", "partner_id = {{ $('Find Supplier').item.json['Odoo Vendor ID'] }}\norigin = Stocky - approved by email"),
    ("Odoo 'Add Product Line' (purchase.order.line)", "order_id = {{ $json.id }}\nproduct_id = {{ $('Get Stock from Odoo').item.json.id }}\nproduct_qty = {{ $('Calculate Order').item.json.suggested_qty }}"),
]
for i, (a, b) in enumerate(items, start=3):
    x = cp.cell(row=i, column=1, value=a)
    x.font = BOLD
    x.alignment = WRAP
    x.border = BOX
    y = cp.cell(row=i, column=2, value=b)
    y.font = Font(name="Consolas", size=10)
    y.fill = INPUT
    y.alignment = WRAP
    y.border = BOX
    cp.row_dimensions[i].height = 16 * (b.count("\n") + 1) + 6

wb.save(OUT)
print("saved", OUT)
