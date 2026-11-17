"""Build V04_Activity_Messy_Data_Makeover.xlsx (run with the course venv python)."""
from datetime import date
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

OUT = Path(__file__).resolve().parent.parent / "V04_Activity_Messy_Data_Makeover.xlsx"

NAVY = "1F2A44"
HEAD = PatternFill("solid", fgColor=NAVY)
INPUT = PatternFill("solid", fgColor="FFF4B3")
CALC = PatternFill("solid", fgColor="D7ECFB")
GIVEN = PatternFill("solid", fgColor="F2F2F2")
TITLE_FILL = PatternFill("solid", fgColor="FDE9C9")
GOOD = PatternFill("solid", fgColor="C6EFCE")
BAD = PatternFill("solid", fgColor="FFC7CE")
RED = PatternFill("solid", fgColor="FF4D4D")
WHITE_B = Font(bold=True, color="FFFFFF")
thin = Side(style="thin", color="BFBFBF")
BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
WRAP = Alignment(wrap_text=True, vertical="top")

wb = Workbook()


def title(ws, text, sub=None):
    ws["A1"] = text
    ws["A1"].font = Font(bold=True, size=16, color=NAVY)
    if sub:
        ws["A2"] = sub
        ws["A2"].font = Font(italic=True, color="595959")


def header(ws, row, labels, widths):
    for i, lab in enumerate(labels, start=1):
        c = ws.cell(row=row, column=i, value=lab)
        c.fill, c.font, c.border = HEAD, WHITE_B, BOX
        c.alignment = Alignment(wrap_text=True, vertical="center")
    for i, w in enumerate(widths, start=1):
        ws.column_dimensions[ws.cell(row=row, column=i).column_letter].width = w
    ws.freeze_panes = ws.cell(row=row + 1, column=1)


def cell(ws, ref, value=None, fill=None, bold=False, wrap=True):
    c = ws[ref]
    if value is not None:
        c.value = value
    if fill:
        c.fill = fill
    c.border = BOX
    if bold:
        c.font = Font(bold=True)
    if wrap:
        c.alignment = WRAP
    return c


def check_colours(ws, rng):
    first = rng.split(":")[0]
    ws.conditional_formatting.add(rng, FormulaRule(formula=[f'LEFT({first},1)="✔"'], fill=GOOD))
    ws.conditional_formatting.add(rng, FormulaRule(formula=[f'LEFT({first},1)="✖"'], fill=BAD))


# ----------------------------------------------------------------- reference data (canonical)
PRODUCTS = [  # SKU, name, unit, cost, ROP, lead, supplier, on hand (canonical)
    ("BL-1001", "Steel Hex Bolts M10 (box of 100)", "box", 12.50, 80, 7, "SUP-001", 145),
    ("BL-1002", "Corrugated Shipping Box 18x12x10", "each", 0.85, 1500, 5, "SUP-002", 1180),
    ("BL-1003", "Stretch Wrap Film 500mm", "roll", 9.20, 200, 6, "SUP-002", 260),
    ("BL-1004", "Industrial Safety Gloves (pair)", "pair", 2.40, 600, 10, "SUP-003", 420),
    ("BL-1005", "Pallet Jack Wheels (set)", "set", 38.00, 25, 21, "SUP-004", 18),
    ("BL-1006", "Packing Tape 48mm (roll)", "roll", 1.10, 1000, 5, "SUP-002", 1850),
    ("BL-1007", "Hydraulic Oil 20L", "drum", 54.00, 40, 14, "SUP-005", 31),
    ("BL-1008", "LED Warehouse Light 150W", "each", 72.00, 30, 28, "SUP-006", 34),
    ("BL-1009", "Nylon Cable Ties (pack of 500)", "pack", 6.30, 150, 7, "SUP-001", 410),
    ("BL-1010", "Forklift Battery Water Kit", "kit", 19.75, 20, 12, "SUP-004", 26),
]
SUPPLIERS = [
    ("SUP-001", "Apex Fasteners", "Pune", "IN", "INR", 18.52, 73.86, "orders@apexfasteners.example", "TRUE"),
    ("SUP-002", "PackRight Industries", "Mumbai", "IN", "INR", 19.08, 72.88, "sales@packright.example", "TRUE"),
    ("SUP-003", "SafeHands Co.", "Chennai", "IN", "INR", 13.08, 80.27, "supply@safehands.example", "TRUE"),
    ("SUP-004", "Global Lift Parts", "Shenzhen", "CN", "CNY", 22.54, 114.06, "export@globallift.example", "TRUE"),
    ("SUP-005", "Gulf Lubricants", "Dubai", "AE", "AED", 25.20, 55.27, "trade@gulflube.example", "TRUE"),
    ("SUP-006", "Shenzhen BrightTech", "Shenzhen", "CN", "CNY", 22.54, 114.06, "b2b@brighttech.example", "TRUE"),
]
UNITS = ["box", "each", "roll", "pair", "set", "drum", "pack", "kit"]
PROBLEM_TYPES = [
    "Title/notes above the header row",
    "Merged cells",
    "Unit typed inside the quantity",
    "Words/notes inside a number cell",
    "Duplicate record",
    "Inconsistent ID format",
    "Missing (blank) ID",
    "Same name spelled differently",
    "Mixed date formats",
    "Colour used to carry meaning",
    "Currency symbol/text inside a number",
    "Total row inside the data",
]

# ----------------------------------------------------------------- Lists (hidden)
lists = wb.active
lists.title = "Lists"
cols = {
    "A": ("Units", UNITS),
    "B": ("Supplier_IDs", [s[0] for s in SUPPLIERS]),
    "C": ("Problem types", PROBLEM_TYPES),
    "D": ("Yes/No", ["Yes", "No"]),
    "E": ("Country", ["IN", "CN", "AE"]),
    "F": ("Currency", ["INR", "CNY", "AED"]),
    "G": ("Active", ["TRUE", "FALSE"]),
    "H": ("Data types", ["ID", "Text", "Number", "Date", "True/False"]),
}
for col, (head, vals) in cols.items():
    lists[f"{col}1"] = head
    for i, v in enumerate(vals, start=2):
        lists[f"{col}{i}"] = v
# answer key for the clean stock log (J..M)
lists["J1"], lists["K1"], lists["L1"], lists["M1"] = "key_SKU", "key_qty", "key_unit", "key_supplier"
for i, p in enumerate(PRODUCTS, start=2):
    lists[f"J{i}"], lists[f"K{i}"], lists[f"L{i}"], lists[f"M{i}"] = p[0], p[7], p[2], p[6]


def dv_list(ws, src, cells):
    dv = DataValidation(type="list", formula1=src, allow_blank=True)
    ws.add_data_validation(dv)
    for c in cells:
        dv.add(c)


# ----------------------------------------------------------------- Instructions
ins = wb.create_sheet("Instructions", 0)
title(ins, "Messy Data Makeover: Video 4 Activity",
      "The ERP Agent Blueprint | Beginner | About 30–40 minutes | Excel or Google Sheets")
ins.column_dimensions["A"].width = 26
ins.column_dimensions["B"].width = 100
steps = [
    ("The story", "This is BrightLeaf's 'Master Stock Sheet'. It began as an Odoo export three years ago and has been edited by five people "
                  "since. Before Stocky (our AI agent) can read it, it needs a makeover. Agents read VALUES, not colours or layout."),
    ("Colour code", "YELLOW = you type or pick here.  BLUE = formulas that calculate or check (don't type in them).  GREY = given information.  "
                    "Green = correct, red = try again."),
    ("Step 1: Messy_Export", "Just look. Don't fix anything here. Count how many problems you can spot in 2 minutes."),
    ("Step 2: Problem_Spotter", "12 problems are listed by location. Pick the problem type from the dropdown and write how you'd fix it."),
    ("Step 3: Clean_Stock_Log", "Rebuild the messy data as a clean table: one row per product, one fact per cell. Rows 2–3 are done as examples. "
                                "For each other SKU enter Qty_On_Hand (number only!), Unit and Supplier_ID, plus any note. "
                                "Product name, reorder point, status and suggested order quantity fill themselves in. The Check column tells you if you got it right."),
    ("Step 4: Suppliers", "Complete the missing (yellow) cells. Use the dropdowns. Tip: SUP-006 is in the same city as SUP-004."),
    ("Step 5: Checklist", "Score the clean BrightLeaf table AND one spreadsheet from your own job against the 13 clean-data rules."),
    ("Step 6: My_Company", "Now try it with your company: design a clean, agent-ready version of a spreadsheet you use every week."),
    ("Rules to remember", "1) One table per thing  2) One header row, in row 1  3) One fact per cell  4) A unique ID on every row  "
                          "5) Consistent types & units.  Bonus: no merged cells, no colours that carry meaning, no totals inside data."),
    ("Handy menus (Google Sheets)", "Format > Merge cells > Unmerge · Edit > Find and replace · Data > Data cleanup > Remove duplicates / Trim whitespace · "
                                    "Data > Data validation (dropdowns) · View > Freeze > 1 row · Format > Number > Custom date and time"),
    ("Handy menus (Excel)", "Home > Merge & Center (click again to unmerge) · Home > Find & Select > Replace · Data > Remove Duplicates · "
                            "Data > Data Validation · View > Freeze Panes > Freeze Top Row"),
]
r = 4
for k, v in steps:
    cell(ins, f"A{r}", k, GIVEN, bold=True)
    cell(ins, f"B{r}", v)
    ins.row_dimensions[r].height = 46
    r += 1
r += 1
cell(ins, f"A{r}", "YOUR SCORE", TITLE_FILL, bold=True)
r += 1
for k, f in [
    ("Problem Spotter (of 12)", '=COUNTIF(Problem_Spotter!D5:D16,"✔*")'),
    ("Clean Stock Log (of 8)", '=COUNTIF(Clean_Stock_Log!N4:N11,"✔*")'),
    ("Suppliers complete (of 6)", '=COUNTIF(Suppliers!J2:J7,"✔*")'),
    ("Checklist: BrightLeaf (of 13)", '=COUNTIF(Checklist!C5:C17,"Yes")'),
]:
    cell(ins, f"A{r}", k, GIVEN, bold=True)
    cell(ins, f"B{r}", f, CALC, bold=True, wrap=False)
    r += 1

# ----------------------------------------------------------------- Messy export (deliberately bad!)
me = wb.create_sheet("Messy_Export", 1)
me["A1"] = "BRIGHTLEAF SUPPLIES – STOCK REPORT (Nov) – DO NOT EDIT!!"
me["A1"].font = Font(bold=True, size=14)
me["A1"].alignment = Alignment(horizontal="center")
me.merge_cells("A1:H1")
me["A2"] = "Prepared by Ravi / updated by Priya / numbers as of last count"
me["A2"].alignment = Alignment(horizontal="center")
me.merge_cells("A2:H2")
heads = ["Item Code", "Product", "Supplier", "Qty", "Reorder Lvl", "Last Count Date", "Cost", "Remarks"]
for i, h in enumerate(heads, start=1):
    c = me.cell(row=4, column=i, value=h)
    c.font = Font(bold=True)
    c.fill = PatternFill("solid", fgColor="D9D9D9")
for col, w in zip("ABCDEFGH", [12, 34, 26, 34, 12, 16, 10, 20]):
    me.column_dimensions[col].width = w
messy = [
    ("BL-1001", "Steel Hex Bolts M10 (box of 100)", "Apex Fasteners", "145 boxes", 80, "16/11/2026", "$12.50", None),
    ("BL-1009", "Nylon Cable Ties 500pk", None, 410, 150, "Nov 16", 6.3, None),
    ("BL-1001", "Steel Hex Bolts M10", None, "145 boxes", 80, "16/11/2026", "$12.50", None),
    ("BL-1002", "Corrugated Box 18x12x10", "PackRight Industries", "1,180 pcs", 1500, "2026-11-16", 0.85, None),
    ("BL 1002 ", "Corrugated Shipping Box 18x12x10", None, 1180, "1,500", "16-Nov-26", 0.85, None),
    ("BL-1003", "Stretch Wrap Film 500mm", None, "21 cartons (12 rolls each) + 8 loose", 200, "15/11/2026", 9.2, None),
    ("BL-1006", "Packing Tape 48mm", None, "approx 1,850", 1000, "14/11/2026", 1.1, None),
    (None, "Industrial Safety Gloves (pair)", "Safe Hands Co", "420 pairs", 600, "16/11/2026", 2.4, None),
    ("BL-1005", "Pallet Jack Wheels (set)", "Global Lift Parts, Shenzhen", "18 - urgent!!", 25, "16.11.2026", "USD 38", "3 jacks waiting"),
    ("BL-1010", "Forklift Battery Water Kit", None, 26, 20, "16/11/2026", 19.75, None),
    ("BL-1007", "Hydraulic Oil 20L", "Gulf Lubricants", "31 (check w/ Ravi)", 40, "16/11/2026", 54, None),
    ("BL-1008", "LED Warehouse Light 150W", "Shenzhen BrightTech", "34 nos", 30, "13/11/2026", 72, None),
    ("TOTAL", None, None, "lots", None, None, None, "see Ravi's email"),
]
for i, row in enumerate(messy, start=5):
    for j, v in enumerate(row, start=1):
        if v is not None:
            me.cell(row=i, column=j, value=v)
for rng in ("C5:C7", "C8:C11", "C13:C14"):
    me.merge_cells(rng)
    me[rng.split(":")[0]].alignment = Alignment(vertical="center")
me["D11"].fill = RED   # packing tape: coloured "urgent" (but it isn't)
me["D13"].fill = RED   # pallet jack wheels: coloured urgent (it is)
me["A17"].font = Font(bold=True)
me["J4"] = "← Don't fix this sheet. Use it to complete Problem_Spotter and Clean_Stock_Log."
me["J4"].font = Font(italic=True, color="C00000")

# ----------------------------------------------------------------- Problem spotter
ps = wb.create_sheet("Problem_Spotter", 2)
title(ps, "Problem Spotter: label every crime in the messy export",
      "Look at the location in Messy_Export, pick the problem type, then write how you would fix it.")
header(ps, 4, ["#", "Where (Messy_Export)", "What you see", "Check", "Problem type (choose)", "How would you fix it?"],
       [5, 22, 46, 16, 36, 60])
spots = [
    ("Rows 1–2", "Big banner lines: 'BRIGHTLEAF SUPPLIES – STOCK REPORT…' and 'Prepared by Ravi…'", 0),
    ("C5:C7", "'Apex Fasteners' stretched across three rows", 1),
    ("D5", "145 boxes", 2),
    ("Row 7", "BL-1001 Steel Hex Bolts appears again", 4),
    ("A9", "BL 1002  (space instead of dash, extra space at the end)", 5),
    ("D11", "approx 1,850", 3),
    ("A12", "Safety gloves row has no item code", 6),
    ("C12", "'Safe Hands Co' (supplier list says 'SafeHands Co.')", 7),
    ("Column F", "16/11/2026 · Nov 16 · 2026-11-16 · 16-Nov-26 · 16.11.2026", 8),
    ("D11 and D13", "Bright red cells with no explanation", 9),
    ("G5 and G13", "$12.50 · USD 38", 10),
    ("Row 17", "TOTAL … lots … see Ravi's email", 11),
]
for i, (where, what, k) in enumerate(spots, start=5):
    cell(ps, f"A{i}", i - 4, GIVEN)
    cell(ps, f"B{i}", where, GIVEN, bold=True)
    cell(ps, f"C{i}", what, GIVEN)
    cell(ps, f"E{i}", None, INPUT)
    cell(ps, f"F{i}", None, INPUT)
    cell(ps, f"D{i}", f'=IF(E{i}="","",IF(E{i}=Lists!C{k + 2},"✔ Correct","✖ Try again"))', CALC)
    ps.row_dimensions[i].height = 30
dv_list(ps, "=Lists!$C$2:$C$13", [f"E{i}" for i in range(5, 17)])
check_colours(ps, "D5:D16")
cell(ps, "C18", "Score (of 12):", GIVEN, bold=True)
cell(ps, "D18", '=COUNTIF(D5:D16,"✔*")', CALC, bold=True)
ps["C19"] = "Bonus: which red cell was a false alarm, and which un-flagged product is the real emergency? Write it here →"
cell(ps, "F19", None, INPUT)

# ----------------------------------------------------------------- Clean stock log
cs = wb.create_sheet("Clean_Stock_Log", 3)
labels = ["Log_ID", "Log_Date", "SKU", "Product_Name", "Qty_On_Hand", "Unit", "Reorder_Point", "Status",
          "Suggested_Order_Qty", "Supplier_ID", "Supplier_Name", "Note", "Duplicate?", "Check"]
header(cs, 1, labels, [10, 12, 10, 32, 12, 8, 13, 10, 13, 12, 22, 30, 11, 26])
notes = {"BL-1005": "urgent per Ravi; 3 jacks waiting", "BL-1006": "estimate, please recount",
         "BL-1003": "21 cartons x 12 + 8 loose"}
for idx, p in enumerate(PRODUCTS):
    r = idx + 2
    example = idx < 2
    cell(cs, f"A{r}", f"LOG-{idx + 1:04d}", GIVEN)
    c = cell(cs, f"B{r}", date(2026, 11, 16), GIVEN)
    c.number_format = "yyyy-mm-dd"
    cell(cs, f"C{r}", p[0], GIVEN, bold=True)
    cell(cs, f"D{r}", f'=IFERROR(VLOOKUP(C{r},Products!$A$2:$H$11,2,FALSE),"")', CALC)
    cell(cs, f"E{r}", p[7] if example else None, GIVEN if example else INPUT)
    cell(cs, f"F{r}", p[2] if example else None, GIVEN if example else INPUT)
    cell(cs, f"G{r}", f'=IFERROR(VLOOKUP(C{r},Products!$A$2:$H$11,5,FALSE),"")', CALC)
    cell(cs, f"H{r}", f'=IF(E{r}="","",IF(E{r}<=G{r},"REORDER","OK"))', CALC)
    cell(cs, f"I{r}", f'=IF(H{r}="REORDER",G{r}*2-E{r},IF(E{r}="","",0))', CALC)
    cell(cs, f"J{r}", p[6] if example else None, GIVEN if example else INPUT)
    cell(cs, f"K{r}", f'=IFERROR(VLOOKUP(J{r},Suppliers!$A$2:$B$7,2,FALSE),"")', CALC)
    cell(cs, f"L{r}", notes.get(p[0]) if example else None, GIVEN if example else INPUT)
    cell(cs, f"M{r}", f'=IF(C{r}="","",IF(COUNTIF($C$2:$C$11,C{r})>1,"DUPLICATE","unique"))', CALC)
    k = idx + 2
    if example:
        cell(cs, f"N{r}", "(example row)", GIVEN)
    else:
        cell(cs, f"N{r}",
             f'=IF(E{r}="","",IF(AND(E{r}=Lists!K{k},F{r}=Lists!L{k},J{r}=Lists!M{k}),"✔ Correct",'
             f'"✖ check "&IF(E{r}<>Lists!K{k},"qty ","")&IF(F{r}<>Lists!L{k},"unit ","")&IF(J{r}<>Lists!M{k},"supplier","")))', CALC)
dv_list(cs, "=Lists!$A$2:$A$9", [f"F{r}" for r in range(4, 12)])
dv_list(cs, "=Lists!$B$2:$B$7", [f"J{r}" for r in range(4, 12)])
qty_dv = DataValidation(type="decimal", operator="greaterThanOrEqual", formula1="0", allow_blank=True,
                        showErrorMessage=True, errorTitle="Numbers only",
                        error="One fact per cell! Type just the number. Put the unit in the Unit column and comments in Note.")
cs.add_data_validation(qty_dv)
qty_dv.add("E2:E11")
check_colours(cs, "N4:N11")
cs.conditional_formatting.add("H2:H11", FormulaRule(formula=['H2="REORDER"'], fill=BAD))
cs.conditional_formatting.add("H2:H11", FormulaRule(formula=['H2="OK"'], fill=GOOD))
cs.conditional_formatting.add("M2:M11", FormulaRule(formula=['M2="DUPLICATE"'], fill=BAD))
summary = [
    ("Products needing reorder:", '=COUNTIF(H2:H11,"REORDER")'),
    ("Products OK:", '=COUNTIF(H2:H11,"OK")'),
    ("Rows still missing a quantity:", '=COUNTBLANK(E2:E11)'),
    ("Total suggested order value (USD):", '=SUMPRODUCT(I2:I11,Products!D2:D11)'),
]
for i, (lab, f) in enumerate(summary, start=13):
    cell(cs, f"C{i}", lab, GIVEN, bold=True)
    c = cell(cs, f"E{i}", f, CALC, bold=True)
cs["E16"].number_format = '"$"#,##0.00'
cs["C18"] = ("Hint: convert every quantity into the product's unit (see the Products tab). Example: stretch wrap is counted in rolls, "
             "so 21 cartons × 12 rolls + 8 loose = 260.")
cs["C18"].font = Font(italic=True, color="595959")

# ----------------------------------------------------------------- Suppliers
su = wb.create_sheet("Suppliers", 4)
header(su, 1, ["Supplier_ID", "Supplier_Name", "City", "Country_Code", "Currency", "Latitude", "Longitude",
               "Contact_Email", "Active", "Complete?"], [12, 24, 12, 13, 10, 10, 11, 30, 9, 22])
blanks = {("SUP-003", 5), ("SUP-003", 6), ("SUP-005", 3), ("SUP-005", 4),
          ("SUP-006", 2), ("SUP-006", 3), ("SUP-006", 4), ("SUP-006", 5), ("SUP-006", 6)}
for i, s in enumerate(SUPPLIERS, start=2):
    for j, v in enumerate(s):
        ref = f"{'ABCDEFGHI'[j]}{i}"
        if (s[0], j) in blanks:
            cell(su, ref, None, INPUT)
        else:
            val = (v == "TRUE") if j == 8 else v
            cell(su, ref, val, GIVEN)
    cell(su, f"J{i}", f'=IF(COUNTBLANK(A{i}:I{i})=0,"✔ Complete","✖ Missing "&COUNTBLANK(A{i}:I{i})&" field(s)")', CALC)
dv_list(su, "=Lists!$E$2:$E$4", ["D2:D50"])
dv_list(su, "=Lists!$F$2:$F$4", ["E2:E50"])
check_colours(su, "J2:J7")
su["A9"] = "Why do SUP-004 and SUP-006 share a city but have different IDs? Write your answer →"
su["A9"].font = Font(italic=True)
cell(su, "H9", None, INPUT)

# ----------------------------------------------------------------- Products (master)
pr = wb.create_sheet("Products", 5)
header(pr, 1, ["SKU", "Product_Name", "Unit", "Unit_Cost_USD", "Reorder_Point", "Max_Stock", "Lead_Time_Days", "Supplier_ID"],
       [10, 34, 8, 14, 13, 11, 15, 12])
for i, p in enumerate(PRODUCTS, start=2):
    vals = [p[0], p[1], p[2], p[3], p[4], f"=E{i}*2", p[5], p[6]]
    for j, v in enumerate(vals):
        ref = f"{'ABCDEFGH'[j]}{i}"
        cell(pr, ref, v, CALC if j == 5 else GIVEN, wrap=False)
    pr[f"D{i}"].number_format = '"$"#,##0.00'
pr["A13"] = "Max stock = 2 × reorder point. Suggested order quantity = reorder point × 2 − on hand."
pr["A13"].font = Font(italic=True, color="595959")

# ----------------------------------------------------------------- Checklist
ck = wb.create_sheet("Checklist", 6)
title(ck, "Clean-data checklist", "Score your clean BrightLeaf table, then one spreadsheet from your own job. Aim for 13/13.")
header(ck, 4, ["#", "Rule", "BrightLeaf clean table?", "My company's sheet?", "What I'll change"], [5, 62, 20, 20, 50])
rules = [
    "There is exactly ONE header row, and it is in row 1 (no titles above it)",
    "There are NO merged cells anywhere in the data",
    "Every row has a unique ID (SKU, SUP-xxx, LOG-xxxx)",
    "There are no duplicate rows",
    "One fact per cell: no units or notes typed into number cells",
    "Units have their own column (or are written in the header)",
    "All dates use one format, ideally yyyy-mm-dd",
    "Names are spelled consistently, or replaced by IDs that link to a master table",
    "No colours carry meaning (urgent/OK is written as a value)",
    "No totals or subtotals inside the data table",
    "Headers use underscores, not spaces (e.g. Qty_On_Hand)",
    "Dropdowns or checkboxes protect the columns people type into",
    "Old records are marked inactive, never deleted",
]
for i, rule in enumerate(rules, start=5):
    cell(ck, f"A{i}", i - 4, GIVEN)
    cell(ck, f"B{i}", rule, GIVEN)
    cell(ck, f"C{i}", None, INPUT)
    cell(ck, f"D{i}", None, INPUT)
    cell(ck, f"E{i}", None, INPUT)
dv_list(ck, "=Lists!$D$2:$D$3", ["C5:D17"])
ck.conditional_formatting.add("C5:D17", FormulaRule(formula=['C5="Yes"'], fill=GOOD))
ck.conditional_formatting.add("C5:D17", FormulaRule(formula=['C5="No"'], fill=BAD))
cell(ck, "B19", "Score (of 13):", GIVEN, bold=True)
cell(ck, "C19", '=COUNTIF(C5:C17,"Yes")', CALC, bold=True)
cell(ck, "D19", '=COUNTIF(D5:D17,"Yes")', CALC, bold=True)
cell(ck, "B20", "Verdict:", GIVEN, bold=True)
for col in "CD":
    cell(ck, f"{col}20", f'=IF(COUNTA({col}5:{col}17)=0,"",IF({col}19>=12,"Agent-ready!",IF({col}19>=8,"Nearly there","Needs a makeover")))', CALC)

# ----------------------------------------------------------------- My company
mc = wb.create_sheet("My_Company", 7)
title(mc, "Now try it with your company: design an agent-ready table",
      "Pick a spreadsheet you use every week (stock report, supplier list, PO tracker). Redesign it using the five golden rules.")
mc.column_dimensions["A"].width = 30
mc.column_dimensions["B"].width = 40
for col, w in zip("CDEF", [14, 12, 22, 16]):
    mc.column_dimensions[col].width = w
partA = [("Spreadsheet name", None), ("Who updates it / how often", None), ("Top 3 problems it has today", None),
         ("What decision does it support?", None), ("Table name in the new design", None), ("ID pattern (e.g. PO-00001)", None)]
cell(mc, "A4", "PART A: about your sheet", TITLE_FILL, bold=True)
for i, (q, _) in enumerate(partA, start=5):
    cell(mc, f"A{i}", q, GIVEN, bold=True)
    cell(mc, f"B{i}", None, INPUT)
cell(mc, "A12", "PART B: design the columns (grey rows are BrightLeaf examples)", TITLE_FILL, bold=True)
hdr = ["Column_Name", "What it holds", "Data type", "Unit", "Example value", "Dropdown needed?"]
for i, h in enumerate(hdr, start=1):
    c = mc.cell(row=13, column=i, value=h)
    c.fill, c.font, c.border = HEAD, WHITE_B, BOX
ex = [("Log_ID", "Unique ID for each stock check", "ID", "", "LOG-0001", "No"),
      ("Qty_On_Hand", "Units in stock at count time", "Number", "per product unit", "18", "No"),
      ("Supplier_ID", "Links to the Suppliers table", "ID", "", "SUP-004", "Yes")]
for r in range(14, 27):
    e = ex[r - 14] if r - 14 < len(ex) else None
    for j in range(6):
        cell(mc, f"{'ABCDEF'[j]}{r}", e[j] if e else None, GIVEN if e else INPUT)
dv_list(mc, "=Lists!$H$2:$H$6", ["C17:C26"])
dv_list(mc, "=Lists!$D$2:$D$3", ["F17:F26"])
mc["A28"] = "Bonus: rebuild 5 real rows of your sheet in the new design in a blank tab, and run it through the Checklist."
mc["A28"].font = Font(italic=True, color="595959")

lists.sheet_state = "hidden"
wb.move_sheet("Lists", offset=len(wb.sheetnames))
wb.active = 0
wb.save(OUT)
print("saved", OUT)
