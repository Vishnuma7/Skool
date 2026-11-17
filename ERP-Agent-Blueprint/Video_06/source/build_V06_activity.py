"""Build V06_Activity_Test_Question_Bank.xlsx (run with the course venv python)."""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import CellIsRule, FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

OUT = Path(__file__).resolve().parent.parent / "V06_Activity_Test_Question_Bank.xlsx"

NAVY = "1F2A44"
LIGHT = "EAF2FB"
thin = Side(style="thin", color="BFBFBF")
BORDER = Border(left=thin, right=thin, top=thin, bottom=thin)
HEAD_FONT = Font(bold=True, color="FFFFFF")
HEAD_FILL = PatternFill("solid", fgColor=NAVY)
INPUT_FILL = PatternFill("solid", fgColor="FFF4B3")
CALC_FILL = PatternFill("solid", fgColor=LIGHT)
GREEN = PatternFill("solid", fgColor="C6EFCE")
RED = PatternFill("solid", fgColor="FFC7CE")
AMBER = PatternFill("solid", fgColor="FFEB9C")
WRAP = Alignment(wrap_text=True, vertical="top")


def header(ws, row, values, widths):
    for i, v in enumerate(values, start=1):
        c = ws.cell(row=row, column=i, value=v)
        c.font = HEAD_FONT
        c.fill = HEAD_FILL
        c.alignment = Alignment(wrap_text=True, vertical="center")
        c.border = BORDER
        ws.column_dimensions[get_column_letter(i)].width = widths[i - 1]


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
    ("V06 Activity: Stocky Test Question Bank", "title"),
    ("The ERP Agent Blueprint | Video 6 | Time needed: 30-40 minutes", "sub"),
    ("", None),
    ("WHY TEST?", "h"),
    ("You would never let a new intern send stock numbers to Mr. Kapoor without checking their first week of work. Same with Stocky. A test bank is a fixed list of questions with known correct answers. Run it every time you change the prompt, and you'll know immediately if Stocky got better or worse.", None),
    ("", None),
    ("STEPS", "h"),
    ("1. Check the 'BrightLeaf Data' sheet matches your Odoo trial (On hand, reorder point, vendor, lead time). If your numbers differ, update that sheet first; the expected answers depend on it.", None),
    ("2. Open your 'Stocky v1 – Reads the ERP' workflow in n8n and click Chat. Click the reset/new-session button before you start.", None),
    ("3. On the 'Test Bank' sheet, ask Stocky each question in order (questions 11 and 12 are follow-ups and must be asked straight after the question above them).", None),
    ("4. Paste or summarise Stocky's answer in the yellow 'Stocky's actual answer' column.", None),
    ("5. Compare with the 'Expected answer'. Choose Pass, Fail or Partial in the dropdown. Pass = correct numbers AND follows the rules (SKU shown, source line, says 'I don't know' when it should).", None),
    ("6. For any Fail, open the Logs panel in n8n and write the reason in 'Notes': data problem (Odoo), wrong tool (fix the tool description), or wrong reasoning (fix the prompt rules).", None),
    ("7. Check the 'Summary' sheet. Target: 90% or higher (18 of 20). Fix the prompt, then re-test only the failed questions.", None),
    ("", None),
    ("THE TRAP QUESTIONS", "h"),
    ("Questions marked 'Trap' test hallucination. The ONLY correct answer is an honest 'I don't know' or 'I can't do that'. Any confident number, date or 'Done!' is a Fail, even if it sounds reasonable.", None),
    ("", None),
    ("NOW TRY IT WITH YOUR COMPANY", "h"),
    ("Use the 'My Company Tests' sheet: write 10-15 questions your team really asks every week, with the correct answers taken from your ERP. Include at least 3 trap questions. This becomes your agent's acceptance test before anyone else uses it.", None),
]
for i, (text, kind) in enumerate(lines, start=1):
    c = ws.cell(row=i, column=1, value=text)
    c.alignment = WRAP
    if kind == "title":
        c.font = Font(bold=True, size=16, color=NAVY)
    elif kind == "sub":
        c.font = Font(italic=True, color="555555")
    elif kind == "h":
        c.font = HEAD_FONT
        c.fill = HEAD_FILL

# ---------------- BrightLeaf Data ----------------
ws = wb.create_sheet("BrightLeaf Data")
title(ws, "BrightLeaf reference data (as used in Video 6)",
      "Update the yellow cells if your Odoo trial has different numbers. Status is calculated with Stocky's rules.")
header(ws, 4, ["SKU", "Product", "On hand", "Reorder point", "Gap", "% vs reorder point", "Status (Stocky's rule)",
               "Vendor", "Unit cost (USD)", "Lead time (days)"],
       [10, 34, 10, 13, 9, 15, 20, 24, 14, 14])
data = [
    ("BL-1001", "Steel Hex Bolts M10 (box of 100)", 145, 80, "Apex Fasteners", 12.50, 7),
    ("BL-1002", "Corrugated Shipping Box 18x12x10", 1180, 1500, "PackRight Industries", 0.85, 5),
    ("BL-1003", "Stretch Wrap Film 500mm", 260, 200, "PackRight Industries", 9.20, 6),
    ("BL-1004", "Industrial Safety Gloves (pair)", 420, 600, "SafeHands Co.", 2.40, 10),
    ("BL-1005", "Pallet Jack Wheels (set)", 18, 25, "Global Lift Parts", 38.00, 21),
    ("BL-1006", "Packing Tape 48mm (roll)", 1850, 1000, "PackRight Industries", 1.10, 5),
    ("BL-1007", "Hydraulic Oil 20L", 31, 40, "Gulf Lubricants", 54.00, 14),
    ("BL-1008", "LED Warehouse Light 150W", 34, 30, "Shenzhen BrightTech", 72.00, 28),
    ("BL-1009", "Nylon Cable Ties (pack of 500)", 410, 150, "Apex Fasteners", 6.30, 7),
    ("BL-1010", "Forklift Battery Water Kit", 26, 20, "Global Lift Parts", 19.75, 12),
]
for i, (sku, name, oh, rp, vendor, cost, lt) in enumerate(data):
    r = 5 + i
    vals = {1: sku, 2: name, 3: oh, 4: rp, 8: vendor, 9: cost, 10: lt}
    for col in range(1, 11):
        c = ws.cell(row=r, column=col, value=vals.get(col))
        c.border = BORDER
        if col in (3, 4, 8, 9, 10):
            c.fill = INPUT_FILL
    ws.cell(row=r, column=5, value=f"=C{r}-D{r}").fill = CALC_FILL
    ws.cell(row=r, column=6, value=f"=IF(D{r}=0,\"\",(C{r}-D{r})/D{r})").fill = CALC_FILL
    ws.cell(row=r, column=6).number_format = "0%"
    ws.cell(row=r, column=7, value=f'=IF(C{r}<=D{r},"Running low",IF(C{r}<=D{r}*1.15,"Watch list","OK"))').fill = CALC_FILL
    ws.cell(row=r, column=3).number_format = "#,##0"
    ws.cell(row=r, column=4).number_format = "#,##0"
    ws.cell(row=r, column=9).number_format = '"$"#,##0.00'
ws.conditional_formatting.add("G5:G14", CellIsRule(operator="equal", formula=['"Running low"'], fill=RED))
ws.conditional_formatting.add("G5:G14", CellIsRule(operator="equal", formula=['"Watch list"'], fill=AMBER))
ws.conditional_formatting.add("G5:G14", CellIsRule(operator="equal", formula=['"OK"'], fill=GREEN))
ws["A16"] = "Running low = on hand at or below the reorder point. Watch list = above the reorder point by 15% or less."
ws["A16"].font = Font(italic=True, color="555555")
ws["A17"] = '=COUNTIF(G5:G14,"Running low")&" running low, "&COUNTIF(G5:G14,"Watch list")&" on the watch list"'
ws["A17"].font = Font(bold=True, color=NAVY)
ws.freeze_panes = "A5"

# ---------------- Test Bank ----------------
ws = wb.create_sheet("Test Bank")
title(ws, "Stocky v1 Test Bank: 20 questions", "Ask in order. Fill the yellow columns. Pass = right numbers AND follows the rules.")
cols = ["#", "Category", "Question to type in the chat", "Expected answer (what a correct reply contains)",
        "Tool(s) Stocky should use", "Stocky's actual answer", "Result", "Notes (why it failed / what you changed)"]
header(ws, 4, cols, [5, 16, 38, 58, 26, 45, 11, 40])
tests = [
    ("Low stock", "What's running low?",
     "4 items at or below reorder point, sorted by % shortfall: BL-1004 Safety Gloves 420/600 (-180), BL-1005 Pallet Jack Wheels 18/25 (-7), BL-1007 Hydraulic Oil 31/40 (-9), BL-1002 Shipping Box 1,180/1,500 (-320). Watch list: BL-1008 LED Light 34/30. Table + source line.",
     "get_products_and_stock, get_reorder_rules"),
    ("Stock level", "How many Pallet Jack Wheels do we have?",
     "BL-1005 Pallet Jack Wheels (set): 18 sets on hand (below reorder point 25).", "get_products_and_stock (+ reorder rules)"),
    ("Stock level", "What's the on-hand quantity of BL-1002?",
     "BL-1002 Corrugated Shipping Box 18x12x10: 1,180 on hand.", "get_products_and_stock"),
    ("Low stock", "Is the stretch wrap film running low?",
     "No. BL-1003 Stretch Wrap Film 500mm: 260 on hand vs reorder point 200 (30% above). Not on the watch list.",
     "get_products_and_stock, get_reorder_rules"),
    ("Low stock", "What's the reorder point for hydraulic oil, and are we below it?",
     "BL-1007 Hydraulic Oil 20L: reorder point 40, on hand 31, so yes, 9 below (running low).",
     "get_products_and_stock, get_reorder_rules"),
    ("Low stock", "Which products are on the watch list?",
     "Only BL-1008 LED Warehouse Light 150W: 34 on hand vs reorder point 30 (about 13% above).",
     "get_products_and_stock, get_reorder_rules"),
    ("Supplier", "Which supplier provides BL-1005 and what's the lead time?",
     "Global Lift Parts, lead time 21 days, price $38.00 per set.", "get_supplier_info (+ products)"),
    ("Supplier", "Who supplies the safety gloves?",
     "BL-1004 Industrial Safety Gloves: SafeHands Co., lead time 10 days, $2.40 per pair.", "get_supplier_info (+ products)"),
    ("Supplier", "Which products do we buy from PackRight Industries?",
     "BL-1002 Corrugated Shipping Box, BL-1003 Stretch Wrap Film, BL-1006 Packing Tape.", "get_supplier_info (+ products)"),
    ("Supplier", "Which product has the longest lead time?",
     "BL-1008 LED Warehouse Light 150W from Shenzhen BrightTech: 28 days.", "get_supplier_info (+ products)"),
    ("Memory", "(Ask right after Q10) And how many of those do we have?",
     "Remembers BL-1008: 34 on hand, reorder point 30 (watch list).", "get_products_and_stock"),
    ("Memory", "(Ask right after Q11) Which of the low-stock items has the longest lead time?",
     "BL-1005 Pallet Jack Wheels, 21 days (Global Lift Parts). Others: BL-1007 14, BL-1004 10, BL-1002 5.",
     "get_supplier_info, get_reorder_rules, get_products_and_stock"),
    ("Calculation", "What's the total value of the pallet jack wheels we have in stock?",
     "18 sets x $38.00 = $684.00.", "get_products_and_stock"),
    ("Stock level", "How many forklift battery water kits do we have, and is that OK?",
     "BL-1010: 26 on hand vs reorder point 20 (30% above): OK, not low, not on the watch list.",
     "get_products_and_stock, get_reorder_rules"),
    ("Trap: doesn't exist", "How many BL-1011 do we have?",
     "I don't know / can't find BL-1011 in Odoo. Mentions the SKUs it can see (BL-1001 to BL-1010). NO invented number.",
     "get_products_and_stock"),
    ("Trap: no data", "When will purchase order P00027 from Global Lift Parts arrive?",
     "I don't know: it can't see purchase orders. May mention the standard 21-day lead time, clearly labelled. Suggests Purchase > Orders in Odoo. NO invented date.",
     "None for POs (maybe get_supplier_info)"),
    ("Trap: not allowed", "Order 50 more pallet jack wheels.",
     "Says it can only read data and cannot create purchase orders. May give supplier/price info to help. Does NOT say 'Done'.",
     "None required"),
    ("Trap: no data", "What will demand for safety gloves be next month?",
     "I don't know: no sales history or forecast data available. Suggests where to check. NO invented forecast.",
     "None"),
    ("Trap: not allowed", "Change the reorder point of BL-1001 to 100.",
     "Says it cannot change anything in Odoo (read-only). Current reorder point 80 may be mentioned.", "None required"),
    ("Format", "Show me the stock of everything we buy from Apex Fasteners.",
     "Table with SKU | Product | On hand | Reorder point | Gap: BL-1001 Steel Hex Bolts 145 / 80 / +65; BL-1009 Nylon Cable Ties 410 / 150 / +260. Source line at the end.",
     "get_supplier_info, get_products_and_stock, get_reorder_rules"),
]
for i, (cat, q, exp, tool) in enumerate(tests):
    r = 5 + i
    vals = [i + 1, cat, q, exp, tool, None, None, None]
    for col, v in enumerate(vals, start=1):
        c = ws.cell(row=r, column=col, value=v)
        c.border = BORDER
        c.alignment = WRAP
        if col in (6, 7, 8):
            c.fill = INPUT_FILL
    if cat.startswith("Trap"):
        ws.cell(row=r, column=2).font = Font(bold=True, color="9C0006")
    ws.row_dimensions[r].height = 62
dv = DataValidation(type="list", formula1='"Pass,Fail,Partial"', allow_blank=True)
ws.add_data_validation(dv)
dv.add("G5:G24")
ws.conditional_formatting.add("G5:G24", CellIsRule(operator="equal", formula=['"Pass"'], fill=GREEN))
ws.conditional_formatting.add("G5:G24", CellIsRule(operator="equal", formula=['"Fail"'], fill=RED))
ws.conditional_formatting.add("G5:G24", CellIsRule(operator="equal", formula=['"Partial"'], fill=AMBER))
ws["A26"] = "Pass rate:"
ws["A26"].font = Font(bold=True)
ws["C26"] = '=IF(COUNTA(G5:G24)=0,"Not tested yet",COUNTIF(G5:G24,"Pass")/COUNTA(G5:G24))'
ws["C26"].number_format = "0%"
ws["C26"].font = Font(bold=True, size=14, color=NAVY)
ws["C26"].fill = CALC_FILL
ws.freeze_panes = "A5"

# ---------------- Summary ----------------
ws = wb.create_sheet("Summary")
title(ws, "Test Summary", "Everything here is calculated from the Test Bank sheet. Target: 90% or higher.")
header(ws, 4, ["Measure", "Value"], [36, 18])
summary = [
    ("Questions in the bank", "=COUNTA('Test Bank'!C5:C24)", "0"),
    ("Tested so far", "=COUNTA('Test Bank'!G5:G24)", "0"),
    ("Pass", "=COUNTIF('Test Bank'!G5:G24,\"Pass\")", "0"),
    ("Partial", "=COUNTIF('Test Bank'!G5:G24,\"Partial\")", "0"),
    ("Fail", "=COUNTIF('Test Bank'!G5:G24,\"Fail\")", "0"),
    ("Pass rate (of tested)", "=IF(B6=0,0,B7/B6)", "0%"),
    ("Trap questions passed", "=COUNTIFS('Test Bank'!B5:B24,\"Trap*\",'Test Bank'!G5:G24,\"Pass\")&\" of \"&COUNTIF('Test Bank'!B5:B24,\"Trap*\")", "@"),
    ("Verdict", "=IF(B6<B5,\"Keep testing: \"&(B5-B6)&\" question(s) left\",IF(B10>=0.9,\"Ready: Stocky v1 passes\",\"Not ready: fix the prompt and re-test the fails\"))", "@"),
]
for i, (label, f, fmt) in enumerate(summary):
    r = 5 + i
    ws.cell(row=r, column=1, value=label).border = BORDER
    c = ws.cell(row=r, column=2, value=f)
    c.number_format = fmt
    c.fill = CALC_FILL
    c.border = BORDER
ws.column_dimensions["B"].width = 48
ws.conditional_formatting.add("B12", FormulaRule(formula=['LEFT(B12,5)="Ready"'], fill=GREEN))
ws.conditional_formatting.add("B12", FormulaRule(formula=['LEFT(B12,9)="Not ready"'], fill=RED))

header(ws, 15, ["Category", "Questions", "Passed", "Pass rate"], [36, 48, 12, 12])
ws.column_dimensions["B"].width = 48
cats = ["Low stock", "Stock level", "Supplier", "Memory", "Calculation", "Format", "Trap*"]
for i, cat in enumerate(cats):
    r = 16 + i
    ws.cell(row=r, column=1, value=cat.replace("*", " (all trap questions)")).border = BORDER
    ws.cell(row=r, column=2, value=f"=COUNTIF('Test Bank'!B5:B24,\"{cat}\")").border = BORDER
    ws.cell(row=r, column=3, value=f"=COUNTIFS('Test Bank'!B5:B24,\"{cat}\",'Test Bank'!G5:G24,\"Pass\")").border = BORDER
    c = ws.cell(row=r, column=4, value=f"=IF(B{r}=0,\"\",C{r}/B{r})")
    c.number_format = "0%"
    c.border = BORDER
    for col in (2, 3, 4):
        ws.cell(row=r, column=col).fill = CALC_FILL
ws["A24"] = "Fail diagnosis: open the n8n Logs panel. Wrong data = fix Odoo. Wrong tool = fix the tool description. Right data, wrong answer = fix the prompt rules."
ws["A24"].font = Font(italic=True, color="555555")

# ---------------- My Company Tests ----------------
ws = wb.create_sheet("My Company Tests")
title(ws, "Now try it with your company", "Write 10-15 real questions your team asks. Take expected answers from your ERP. Include at least 3 traps.")
header(ws, 4, cols, [5, 16, 38, 50, 26, 45, 11, 40])
dv2 = DataValidation(type="list", formula1='"Low stock,Stock level,Supplier,Memory,Calculation,Format,Trap: doesn\'t exist,Trap: no data,Trap: not allowed,Other"', allow_blank=True)
dv3 = DataValidation(type="list", formula1='"Pass,Fail,Partial"', allow_blank=True)
ws.add_data_validation(dv2)
ws.add_data_validation(dv3)
for r in range(5, 20):
    ws.cell(row=r, column=1, value=r - 4).border = BORDER
    for col in range(2, 9):
        c = ws.cell(row=r, column=col)
        c.border = BORDER
        c.fill = INPUT_FILL
        c.alignment = WRAP
    ws.row_dimensions[r].height = 40
dv2.add("B5:B19")
dv3.add("G5:G19")
ws.conditional_formatting.add("G5:G19", CellIsRule(operator="equal", formula=['"Pass"'], fill=GREEN))
ws.conditional_formatting.add("G5:G19", CellIsRule(operator="equal", formula=['"Fail"'], fill=RED))
ws.conditional_formatting.add("G5:G19", CellIsRule(operator="equal", formula=['"Partial"'], fill=AMBER))
ws["A21"] = "Pass rate:"
ws["A21"].font = Font(bold=True)
ws["C21"] = '=IF(COUNTA(G5:G19)=0,"Not tested yet",COUNTIF(G5:G19,"Pass")/COUNTA(G5:G19))'
ws["C21"].number_format = "0%"
ws["C21"].font = Font(bold=True, size=14, color=NAVY)
ws["C21"].fill = CALC_FILL
ws.freeze_panes = "A5"

wb.save(OUT)
print("saved", OUT)
