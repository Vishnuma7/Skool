"""Builds the two Video 2 activity files (run with the course venv python):
  V02_Activity_BrightLeaf_Product_Import.xlsx  (Odoo import layout, static values, Products sheet first)
  V02_Activity_Odoo_Setup_Workbook.xlsx        (checklist, product master, stock & reorder, field detective, Map My ERP)
"""
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import CellIsRule, FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

HERE = Path(__file__).resolve().parent
IMPORT_OUT = HERE.parent / "V02_Activity_BrightLeaf_Product_Import.xlsx"
WB_OUT = HERE.parent / "V02_Activity_Odoo_Setup_Workbook.xlsx"

NAVY, ORANGE, BLUE, YELLOW = "1F2A44", "FDE9C9", "D7ECFB", "FFF4B3"
GREEN, RED, GREY = "D9F2D9", "F8D7DA", "F2F2F2"
thin = Side(style="thin", color="BFBFBF")
BORDER = Border(left=thin, right=thin, top=thin, bottom=thin)
WRAP = Alignment(wrap_text=True, vertical="top")
MARKUP = Decimal("0.35")


def fill(c):
    return PatternFill("solid", start_color=c, end_color=c)


def header(ws, row, values, widths):
    for i, v in enumerate(values, start=1):
        c = ws.cell(row=row, column=i, value=v)
        c.font = Font(bold=True, color="FFFFFF")
        c.fill = fill(NAVY)
        c.alignment = Alignment(wrap_text=True, vertical="center", horizontal="center")
        c.border = BORDER
        ws.column_dimensions[c.column_letter].width = widths[i - 1]


def title(ws, text, sub=None):
    ws["A1"] = text
    ws["A1"].font = Font(bold=True, size=16, color=NAVY)
    if sub:
        ws["A2"] = sub
        ws["A2"].font = Font(italic=True, color="595959")


def box(ws, r, c1, c2):
    for c in range(c1, c2 + 1):
        ws.cell(row=r, column=c).border = BORDER


# SKU, name, cost, reorder point (min), max, lead time, supplier, city, country, starting stock
PRODUCTS = [
    ("BL-1001", "Steel Hex Bolts M10 (box of 100)", "12.50", 80, 160, 7, "Apex Fasteners", "Columbus", "United States", 145),
    ("BL-1002", "Corrugated Shipping Box 18x12x10", "0.85", 1500, 3000, 5, "PackRight Industries", "Chicago", "United States", 1180),
    ("BL-1003", "Stretch Wrap Film 500mm", "9.20", 200, 400, 6, "PackRight Industries", "Chicago", "United States", 260),
    ("BL-1004", "Industrial Safety Gloves (pair)", "2.40", 600, 1200, 10, "SafeHands Co.", "Monterrey", "Mexico", 420),
    ("BL-1005", "Pallet Jack Wheels (set)", "38.00", 25, 50, 21, "Global Lift Parts", "Shenzhen", "China", 18),
    ("BL-1006", "Packing Tape 48mm (roll)", "1.10", 1000, 2000, 5, "PackRight Industries", "Chicago", "United States", 1850),
    ("BL-1007", "Hydraulic Oil 20L", "54.00", 40, 80, 14, "Gulf Lubricants", "Dubai", "United Arab Emirates", 31),
    ("BL-1008", "LED Warehouse Light 150W", "72.00", 30, 60, 28, "Shenzhen BrightTech", "Shenzhen", "China", 34),
    ("BL-1009", "Nylon Cable Ties (pack of 500)", "6.30", 150, 300, 7, "Apex Fasteners", "Columbus", "United States", 410),
    ("BL-1010", "Forklift Battery Water Kit", "19.75", 20, 40, 12, "Global Lift Parts", "Shenzhen", "China", 26),
]


def sales_price(cost):
    return float((Decimal(cost) * (1 + MARKUP)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))


# =====================================================================
# 1) Import file: Products sheet FIRST (Odoo reads the first sheet by default)
# =====================================================================
imp = Workbook()
ws = imp.active
ws.title = "Products"
cols = ["Internal Reference", "Name", "Product Type", "Track Inventory", "Can be Sold",
        "Can be Purchased", "Sales Price", "Cost", "Product Category"]
header(ws, 1, cols, [18, 40, 14, 16, 13, 17, 12, 10, 18])
for r, p in enumerate(PRODUCTS[1:], start=2):  # BL-1001 is created by hand in the video
    sku, name, cost = p[0], p[1], p[2]
    vals = [sku, name, "Goods", "True", "True", "True", sales_price(cost), float(cost), "All"]
    for c, v in enumerate(vals, start=1):
        cell = ws.cell(row=r, column=c, value=v)
        cell.border = BORDER
        if c in (7, 8):
            cell.number_format = "0.00"
ws.freeze_panes = "A2"

rm = imp.create_sheet("Read_Me")
title(rm, "How to use this import file", "Values only, no formulas, so Odoo can read every cell.")
notes = [
    "1. Do NOT rename the column headers. They match Odoo's field labels, so Odoo maps them automatically.",
    "2. In Odoo: Inventory > Products > Products > gear icon > Import records > Upload File > choose this file.",
    "3. If Odoo asks which sheet to use, choose 'Products'.",
    "4. Click Test first. When you see 'Everything seems valid', click Import.",
    "5. BL-1001 is NOT in this file because we create it by hand in the video. If you skipped that step, add a row:",
    "   BL-1001 | Steel Hex Bolts M10 (box of 100) | Goods | True | True | True | 16.88 | 12.50 | All",
    "6. Older Odoo versions: if 'Track Inventory' does not map, change Product Type to 'Storable Product' and set that column to 'Don't import'.",
    "7. Sales Price = Cost x 1.35 (35% mark-up). See the Product_Master sheet in the Setup Workbook for the formula.",
]
for i, n in enumerate(notes, start=4):
    rm.cell(row=i, column=1, value=n)
rm.column_dimensions["A"].width = 120
imp.save(IMPORT_OUT)
print("saved", IMPORT_OUT)

# =====================================================================
# 2) Setup workbook
# =====================================================================
wb = Workbook()
ws = wb.active
ws.title = "Instructions"
title(ws, "Video 2 Activity: BrightLeaf Odoo Setup Workbook",
      "The ERP Agent Blueprint | Time needed: 30-40 minutes | You can't break anything: it's your own test system")
rows = [
    ("WHAT YOU'LL DO", ""),
    ("Part 1: Setup_Checklist", "Follow 16 steps to build BrightLeaf in your free Odoo trial. Mark each step Yes / No / Stuck. Your progress % updates automatically."),
    ("Part 2: Product_Master", "BrightLeaf's 10 products with cost, mark-up, sales price, reorder point, lead time and supplier. Change the mark-up to see prices update."),
    ("Part 3: Starting_Stock_Reorder", "The starting quantities and Min/Max reorder rules to enter in Odoo. The sheet shows which 4 products are below their reorder point."),
    ("Part 4: Field_Detective", "Where would you find each field in Odoo? Choose from the dropdown; the sheet checks you."),
    ("Part 5: Map_My_ERP", "Now try it with your company: map your own systems into modules, records and fields. This becomes the 'menu' your own agent will read from."),
    ("", ""),
    ("FILES YOU NEED", ""),
    ("Import file", "V02_Activity_BrightLeaf_Product_Import.xlsx (BL-1002 to BL-1010, in Odoo's import layout). Don't edit its headers."),
    ("This workbook", "Keep it open next to Odoo while you work."),
    ("", ""),
    ("REMEMBER", ""),
    ("Module", "A drawer in the filing cabinet (Inventory, Purchase, Sales, Contacts)."),
    ("Record", "One folder in a drawer (one product, one supplier, one purchase order). In Excel terms: a row."),
    ("Field", "One labelled box on the form (Cost, Internal Reference, Lead Time). In Excel terms: a column."),
    ("", ""),
    ("COLOUR KEY", ""),
    ("Yellow cells", "You type or choose here."),
    ("Grey cells", "Formulas. Don't type over them."),
    ("Red rows", "Below reorder point. Leave them low: Stocky flags them in Video 6."),
]
for i, (a, b) in enumerate(rows, start=4):
    ws.cell(row=i, column=1, value=a)
    ws.cell(row=i, column=2, value=b).alignment = WRAP
    if b == "" and a:
        for c in (1, 2):
            ws.cell(row=i, column=c).fill = fill(NAVY)
        ws.cell(row=i, column=1).font = Font(bold=True, color="FFFFFF")
    elif a:
        ws.cell(row=i, column=1).font = Font(bold=True)
ws["A21"].fill = fill(YELLOW)
ws["A22"].fill = fill(GREY)
ws["A23"].fill = fill(RED)
ws.column_dimensions["A"].width = 28
ws.column_dimensions["B"].width = 110

# ---------- Setup_Checklist ----------
ws = wb.create_sheet("Setup_Checklist")
title(ws, "Part 1: Odoo Setup Checklist")
info = [("My Odoo URL", "e.g. https://brightleaf-yourname.odoo.com"),
        ("My database name", "the part before .odoo.com"),
        ("My login email", "")]
for i, (k, hint) in enumerate(info, start=3):
    ws.cell(row=i, column=2, value=k).font = Font(bold=True)
    c = ws.cell(row=i, column=3)
    c.fill = fill(YELLOW)
    c.border = BORDER
    ws.cell(row=i, column=4, value=hint).font = Font(italic=True, color="808080")
STEPS = [
    ("Sign up", "Create the free trial with Inventory, Purchase and Sales", "odoo.com > Start now - It's free > tick Inventory, Purchase, Sales > Continue"),
    ("Sign up", "Company name 'BrightLeaf Supplies'; confirm email and set password", "Sign-up form > Start now; then the Odoo email > Activate"),
    ("Sign up", "Write your URL, database name and login email at the top of this sheet", "Browser address bar"),
    ("Sign up", "Bookmark your Odoo URL", "Browser bookmark star"),
    ("Settings", "Set main currency to USD (optional)", "Settings > search 'currency' > Main Currency = USD > Save"),
    ("Tour", "Open each module: Inventory, Purchase, Sales, Contacts", "Home screen app icons"),
    ("Product", "Create BL-1001 by hand: Goods + Track Inventory, Sales Price 16.88, Cost 12.50, Internal Reference BL-1001", "Inventory > Products > Products > New"),
    ("Product", "Add vendor Apex Fasteners, price 12.50, lead time 7 days", "Product form > Purchase tab > Add a line"),
    ("Contacts", "Add City 'Columbus', State 'Ohio' and Country 'United States' to Apex Fasteners", "Contacts > Apex Fasteners"),
    ("Import", "Import BL-1002 to BL-1010 from the import file (Test first!)", "Inventory > Products > Products > gear icon > Import records"),
    ("Import", "Spot-check BL-1005: Goods, tracked, Cost 38.00, Sales Price 51.30", "Products list > BL-1005"),
    ("Stock", "Enter starting stock for all 10 products (see Starting_Stock_Reorder)", "Inventory > Operations > Physical Inventory > New > Counted Quantity > Apply"),
    ("Rules", "Create the reorder rule for BL-1005: Min 25, Max 50", "Product > Min / Max smart button > New"),
    ("Rules", "Create reorder rules for the other 9 products", "Inventory > Operations > Replenishment > New"),
    ("Check", "Confirm Replenishment shows BL-1005 'To Order' = 32 (don't click Order)", "Inventory > Operations > Replenishment"),
    ("Check", "Open the paper trail for BL-1001", "Product > In / Out smart button"),
]
header(ws, 7, ["#", "Phase", "Task", "Where to click in Odoo", "Done?", "Notes / what went wrong"], [5, 12, 62, 62, 10, 40])
dv = DataValidation(type="list", formula1='"Yes,No,Stuck"', allow_blank=True)
ws.add_data_validation(dv)
first, last = 8, 7 + len(STEPS)
for n, (phase, task, where) in enumerate(STEPS, start=1):
    r = 7 + n
    for c, v in enumerate([n, phase, task, where], start=1):
        ws.cell(row=r, column=c, value=v).alignment = WRAP
    for c in (5, 6):
        ws.cell(row=r, column=c).fill = fill(YELLOW)
    dv.add(ws.cell(row=r, column=5))
    box(ws, r, 1, 6)
ws["B5"] = "Progress:"
ws["B5"].font = Font(bold=True)
ws["C5"] = f'=COUNTIF(E{first}:E{last},"Yes")/{len(STEPS)}'
ws["C5"].number_format = "0%"
ws["C5"].font = Font(bold=True, size=14, color="2E7D32")
ws["D5"] = f'=IF(COUNTIF(E{first}:E{last},"Stuck")>0,COUNTIF(E{first}:E{last},"Stuck")&" step(s) stuck: post them in the community with a screenshot","")'
ws["D5"].font = Font(color="C62828", bold=True)
ws.conditional_formatting.add(f"E{first}:E{last}", CellIsRule(operator="equal", formula=['"Yes"'], fill=fill(GREEN)))
ws.conditional_formatting.add(f"E{first}:E{last}", CellIsRule(operator="equal", formula=['"Stuck"'], fill=fill(RED)))
ws.freeze_panes = "A8"

# ---------- Product_Master ----------
ws = wb.create_sheet("Product_Master")
title(ws, "Part 2: BrightLeaf Product Master (all 10 SKUs)")
ws["A3"] = "Mark-up %"
ws["A3"].font = Font(bold=True)
ws["B3"] = float(MARKUP)
ws["B3"].number_format = "0%"
ws["B3"].fill = fill(YELLOW)
ws["C3"] = "<- change this to see every sales price update (the import file uses 35%)"
ws["C3"].font = Font(italic=True, color="808080")
pm_cols = ["SKU (Internal Reference)", "Product", "Unit cost (USD)", "Sales price (USD)", "Margin per unit",
           "Reorder point (Min)", "Refill to (Max)", "Lead time (days)", "Main supplier", "Supplier city", "Country"]
header(ws, 5, pm_cols, [16, 36, 12, 12, 12, 12, 12, 11, 22, 13, 20])
for r, p in enumerate(PRODUCTS, start=6):
    sku, name, cost, rop, mx, lt, sup, city, ctry, _ = p
    vals = [sku, name, float(cost), f"=ROUND(C{r}*(1+$B$3),2)", f"=D{r}-C{r}", rop, mx, lt, sup, city, ctry]
    for c, v in enumerate(vals, start=1):
        cell = ws.cell(row=r, column=c, value=v)
        cell.border = BORDER
        if c in (3, 4, 5):
            cell.number_format = "0.00"
        if c in (4, 5):
            cell.fill = fill(GREY)
ws.conditional_formatting.add("J6:J15", FormulaRule(formula=['$K6<>"United States"'], fill=fill(ORANGE)))
ws["A17"] = "Orange cities = suppliers outside the US. In Video 8, Stocky checks weather, currency and holidays for these."
ws["A17"].font = Font(italic=True, color="808080")
ws.freeze_panes = "C6"

# ---------- Starting_Stock_Reorder ----------
ws = wb.create_sheet("Starting_Stock_Reorder")
title(ws, "Part 3: Starting Stock & Reorder Rules", "Enter these in Odoo exactly. Four products are deliberately below their reorder point.")
ss_cols = ["SKU", "Product", "Starting on hand", "Min (reorder point)", "Max (refill to)", "Status",
           "Odoo will suggest to order", "Est. cost of that order (USD)", "Stock entered in Odoo?", "Rule created in Odoo?"]
header(ws, 4, ss_cols, [11, 36, 12, 12, 12, 26, 14, 16, 14, 14])
dv2 = DataValidation(type="list", formula1='"Yes,No"', allow_blank=True)
ws.add_data_validation(dv2)
for r, p in enumerate(PRODUCTS, start=5):
    sku, name, cost, rop, mx, lt, sup, city, ctry, onhand = p
    vals = [sku, name, onhand, rop, mx,
            f'=IF(C{r}<D{r},"BELOW - Stocky will flag","OK")',
            f"=IF(C{r}<D{r},E{r}-C{r},0)",
            f"=G{r}*INDEX(Product_Master!$C$6:$C$15,MATCH(A{r},Product_Master!$A$6:$A$15,0))"]
    for c, v in enumerate(vals, start=1):
        ws.cell(row=r, column=c, value=v)
    for c in (6, 7, 8):
        ws.cell(row=r, column=c).fill = fill(GREY)
    ws.cell(row=r, column=8).number_format = "#,##0.00"
    for c in (9, 10):
        ws.cell(row=r, column=c).fill = fill(YELLOW)
        dv2.add(ws.cell(row=r, column=c))
    box(ws, r, 1, 10)
ws.conditional_formatting.add("A5:H14", FormulaRule(formula=["$C5<$D5"], fill=fill(RED)))
ws.conditional_formatting.add("I5:J14", CellIsRule(operator="equal", formula=['"Yes"'], fill=fill(GREEN)))
ws["B16"] = "Products below reorder point:"
ws["C16"] = '=COUNTIF(F5:F14,"BELOW*")'
ws["B17"] = "Total suggested order value (USD):"
ws["C17"] = "=SUM(H5:H14)"
ws["C17"].number_format = "#,##0.00"
for c in ("B16", "B17"):
    ws[c].font = Font(bold=True)
    ws[c].alignment = Alignment(horizontal="right")
for c in ("C16", "C17"):
    ws[c].fill = fill(ORANGE)
    ws[c].font = Font(bold=True, color=NAVY)
ws["B19"] = "Why 'Max - On hand'? Odoo refills up to Max. Example BL-1005: 50 - 18 = 32. At BrightLeaf, Max = 2 x reorder point."
ws["B19"].font = Font(italic=True, color="808080")
ws.freeze_panes = "C5"

# ---------- Field_Detective ----------
ws = wb.create_sheet("Field_Detective")
title(ws, "Part 4: Field Detective", "Where in Odoo would you find each field? Choose from the dropdown, then check column D.")
PLACES = ["Top of product form", "General Information tab", "Purchase tab", "On Hand smart button",
          "Min / Max smart button", "In / Out smart button", "Contacts app", "Purchase app"]
FIELDS = [
    ("Internal Reference (SKU) of a product", "General Information tab"),
    ("Can be Purchased tick box", "Top of product form"),
    ("Cost of a product", "General Information tab"),
    ("Track Inventory tick box", "General Information tab"),
    ("Vendor and vendor price", "Purchase tab"),
    ("Vendor delivery lead time", "Purchase tab"),
    ("Quantity currently on the shelf", "On Hand smart button"),
    ("Reorder point (Min quantity)", "Min / Max smart button"),
    ("History of every stock movement", "In / Out smart button"),
    ("A supplier's city and country", "Contacts app"),
    ("Requests for Quotation sent to suppliers", "Purchase app"),
]
header(ws, 4, ["Field / information", "Where is it? (choose)", "Answer (hidden: try first!)", "Check"], [44, 28, 26, 12])
dv3 = DataValidation(type="list", formula1='"' + ",".join(PLACES) + '"', allow_blank=True)
ws.add_data_validation(dv3)
for r, (f, a) in enumerate(FIELDS, start=5):
    ws.cell(row=r, column=1, value=f)
    ws.cell(row=r, column=2).fill = fill(YELLOW)
    dv3.add(ws.cell(row=r, column=2))
    ws.cell(row=r, column=3, value=a).font = Font(color="FFFFFF")  # white text = hidden until selected
    ws.cell(row=r, column=4, value=f'=IF(B{r}="","",IF(B{r}=C{r},"Correct","Try again"))').fill = fill(GREY)
    box(ws, r, 1, 4)
last_f = 4 + len(FIELDS)
ws.conditional_formatting.add(f"D5:D{last_f}", CellIsRule(operator="equal", formula=['"Correct"'], fill=fill(GREEN)))
ws.conditional_formatting.add(f"D5:D{last_f}", CellIsRule(operator="equal", formula=['"Try again"'], fill=fill(RED)))
ws.cell(row=last_f + 2, column=1, value="Score:").font = Font(bold=True)
ws.cell(row=last_f + 2, column=2, value=f'=COUNTIF(D5:D{last_f},"Correct")&" / {len(FIELDS)}"').font = Font(bold=True, color="2E7D32")
ws.cell(row=last_f + 3, column=1, value="Tip: the answers are in column C in white text. Select the column and change the font colour to reveal them.").font = Font(italic=True, color="808080")
ws.freeze_panes = "A5"

# ---------- Map_My_ERP ----------
ws = wb.create_sheet("Map_My_ERP")
title(ws, "Part 5: Map My ERP (now try it with your company)",
      "Grey rows = BrightLeaf example. Yellow rows = yours. Think: drawer (module) > folder (record) > labelled box (field).")
ws["A3"] = "My company's main ERP / system:"
ws["A3"].font = Font(bold=True)
ws["C3"].fill = fill(YELLOW)
ws.merge_cells("C3:E3")
mcols = ["Business area", "Where it's kept today", "Name of the module / menu in my system",
         "Key records (folders)", "3 most important fields (boxes)", "Who owns this data?",
         "Data quality", "Would my agent need it?"]
header(ws, 5, mcols, [20, 18, 30, 28, 40, 18, 13, 16])
SYSTEMS = ["ERP", "Excel / Sheets", "Email", "Paper", "Other software", "Not tracked"]
dv_sys = DataValidation(type="list", formula1='"' + ",".join(SYSTEMS) + '"', allow_blank=True)
dv_q = DataValidation(type="list", formula1='"Good,OK,Messy"', allow_blank=True)
dv_need = DataValidation(type="list", formula1='"Yes,Later,No"', allow_blank=True)
for d in (dv_sys, dv_q, dv_need):
    ws.add_data_validation(d)
EXAMPLE = [
    ("Inventory", "ERP", "Odoo > Inventory", "Products, stock moves", "Internal Reference, Quantity On Hand, Reorder Min", "Tom", "Good", "Yes"),
    ("Purchasing", "ERP", "Odoo > Purchase", "RFQs, purchase orders", "Vendor, Order Date, Expected Arrival", "Sarah", "OK", "Yes"),
    ("Suppliers", "ERP", "Odoo > Contacts", "Supplier contacts", "Name, City, Country", "Sarah", "Messy", "Yes"),
    ("Supplier delays", "Email", "Sarah's inbox", "Supplier emails", "Supplier, PO number, New date", "Sarah", "Messy", "Later"),
]
AREAS = ["Inventory / stock", "Purchasing", "Suppliers", "Sales orders", "Customers",
         "Warehouse & shipping", "Demand forecast", "Production / BOM", "Finance / invoices", "Other:"]
r = 6
for row in EXAMPLE:
    for c, v in enumerate(row, start=1):
        cell = ws.cell(row=r, column=c, value=v)
        cell.fill = fill(GREY)
        cell.font = Font(italic=True, color="595959")
        cell.alignment = WRAP
    box(ws, r, 1, 8)
    r += 1
ws.cell(row=r, column=1, value="YOUR COMPANY").font = Font(bold=True, color="FFFFFF")
for c in range(1, 9):
    ws.cell(row=r, column=c).fill = fill(NAVY)
r += 1
my_first = r
for area in AREAS:
    ws.cell(row=r, column=1, value=area).font = Font(bold=True)
    for c in range(2, 9):
        ws.cell(row=r, column=c).fill = fill(YELLOW)
        ws.cell(row=r, column=c).alignment = WRAP
    dv_sys.add(ws.cell(row=r, column=2))
    dv_q.add(ws.cell(row=r, column=7))
    dv_need.add(ws.cell(row=r, column=8))
    box(ws, r, 1, 8)
    ws.row_dimensions[r].height = 30
    r += 1
my_last = r - 1
ws.conditional_formatting.add(f"G6:G{my_last}", CellIsRule(operator="equal", formula=['"Messy"'], fill=fill(RED)))
ws.conditional_formatting.add(f"G6:G{my_last}", CellIsRule(operator="equal", formula=['"Good"'], fill=fill(GREEN)))
r += 1
summary = [
    ("Areas my agent needs now:", f'=COUNTIF(H{my_first}:H{my_last},"Yes")'),
    ("...of which data is 'Messy':", f'=COUNTIFS(H{my_first}:H{my_last},"Yes",G{my_first}:G{my_last},"Messy")'),
    ("Areas kept outside the ERP (Excel, email, paper):", f'=COUNTIF(B{my_first}:B{my_last},"Excel / Sheets")+COUNTIF(B{my_first}:B{my_last},"Email")+COUNTIF(B{my_first}:B{my_last},"Paper")'),
]
for label, f in summary:
    a = ws.cell(row=r, column=3, value=label)
    a.font = Font(bold=True)
    a.alignment = Alignment(horizontal="right")
    b = ws.cell(row=r, column=4, value=f)
    b.fill = fill(ORANGE)
    b.font = Font(bold=True, color=NAVY)
    r += 1
ws.cell(row=r + 1, column=1, value="Reflection: any area marked 'Yes' + 'Messy' is your first clean-up job before building your own agent. Write one action here:").font = Font(bold=True)
ws.cell(row=r + 2, column=1).fill = fill(YELLOW)
ws.merge_cells(start_row=r + 2, start_column=1, end_row=r + 2, end_column=8)
ws.row_dimensions[r + 2].height = 40
ws.freeze_panes = "B6"

wb.save(WB_OUT)
print("saved", WB_OUT)
