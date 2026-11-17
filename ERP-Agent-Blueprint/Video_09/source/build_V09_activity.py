"""Build V09_Activity_Decision_Log_Dashboard.xlsx (run with the course venv python)."""
from datetime import datetime, timedelta
from pathlib import Path

from openpyxl import Workbook
from openpyxl.chart import BarChart, Reference
from openpyxl.formatting.rule import CellIsRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

OUT = Path(__file__).resolve().parent.parent / "V09_Activity_Decision_Log_Dashboard.xlsx"

NAVY = "1F2A44"
HEAD = PatternFill("solid", fgColor=NAVY)
GREEN = PatternFill("solid", fgColor="E2F0D9")
YELLOW = PatternFill("solid", fgColor="FFF4B3")
GREY = PatternFill("solid", fgColor="F2F2F2")
RED = PatternFill("solid", fgColor="F8D7DA")
WHITE_B = Font(bold=True, color="FFFFFF")
BOLD = Font(bold=True)
TITLE = Font(bold=True, size=16, color=NAVY)
SUB = Font(bold=True, size=12, color=NAVY)
thin = Side(style="thin", color="BFBFBF")
BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
WRAP = Alignment(wrap_text=True, vertical="top")


def header(ws, row, values, widths=None):
    for i, v in enumerate(values, start=1):
        c = ws.cell(row=row, column=i, value=v)
        c.fill, c.font, c.border = HEAD, WHITE_B, BOX
        c.alignment = Alignment(wrap_text=True, vertical="center")
    if widths:
        for i, w in enumerate(widths, start=1):
            ws.column_dimensions[ws.cell(row=1, column=i).column_letter].width = w


wb = Workbook()

# ---------------------------------------------------------------- Instructions
ws = wb.active
ws.title = "Instructions"
ws.column_dimensions["A"].width = 4
ws.column_dimensions["B"].width = 110
lines = [
    ("Video 9 Activity: Decision Log & Monday Dashboard", TITLE),
    ("The ERP Agent Blueprint | BrightLeaf Supplies | Time needed: about 30 minutes", None),
    ("", None),
    ("WHAT THIS FILE IS", SUB),
    ("Stocky has been running for 4 weeks (19 Oct to 15 Nov 2026). Every decision it made is in the sheet 'Decision_Log'.", None),
    ("Today's stock levels from Odoo are in 'Products'. You will turn this raw log into the numbers Mr. Kapoor sees every Monday.", None),
    ("Yellow cells = you type something. Green cells = formulas (already done, or you finish them). Don't worry, you can't break anything here.", None),
    ("", None),
    ("TASKS", SUB),
    ("Task 1 (5 min): Open 'Decision_Log'. Read 5 rows. For each row, could you explain the decision to Mr. Kapoor from the Notes column alone?", None),
    ("Task 2 (5 min): Add ONE new row at the bottom (row 28, the first yellow row) as if Stocky just wrote it: 16 Nov 2026 07:15, BL-1007, stock 31... Use the yellow example row in the Instructions below. Watch the Dashboard numbers change.", None),
    ("Task 3 (10 min): Go to 'Dashboard'. The KPI formulas in column C are done for you. Click each one and read it in plain English (e.g. COUNTIF = 'count the rows where...').", None),
    ("               Then finish the 3 yellow formulas in the weekly table (cells marked 'YOUR TURN'). Hint: copy the formula from the cell on the left and change the word in quotes.", None),
    ("Task 4 (5 min): Look at the chart on the Dashboard. Which week had the most risk alerts? Which week had the most money ordered?", None),
    ("Task 5 (5 min): Go to 'Kapoor_Questions' and answer the 3 questions using the log and the Dashboard. Check yourself with the answer key at the bottom.", None),
    ("Task 6 (10 min): NOW TRY IT WITH YOUR COMPANY. Go to 'Your_Company' and design your own Decision Log columns and Monday Report sections.", None),
    ("", None),
    ("EXAMPLE ROW FOR TASK 2", SUB),
    ("LOG-0027 | 2026-11-16 07:15 | BL-1007 | Hydraulic Oil 20L | 31 | RFQ created | Priya Sharma | 5.1 | 49 | (leave Order Value: it is a formula) | Below reorder point 40. RFQ P00030 for 49 drums from Gulf Lubricants.", None),
    ("", None),
    ("COPY-PASTE EXPRESSIONS FOR n8n (from the video)", SUB),
    ("Timestamp:          {{ $now.toFormat('yyyy-MM-dd HH:mm') }}", None),
    ("Log ID:             LOG-{{ $now.toFormat('yyyyMMddHHmmss') }}", None),
    ("Last 7 days filter: {{ $json.Timestamp }}  is after  {{ $now.minus({ days: 7 }).toFormat('yyyy-MM-dd') }}", None),
    ("Email subject:      Monday Stock Report – Week of {{ $now.toFormat('d LLL yyyy') }}", None),
    ("", None),
    ("KEY FORMULAS IN PLAIN ENGLISH", SUB),
    ("Stock health %  = SKUs at or above reorder point ÷ total SKUs.   Money tied up = SUM of (stock on hand × unit cost).", None),
    ("COUNTIFS(Action,\"RFQ created\", Timestamp,\">=\"&WeekStart, Timestamp,\"<\"&WeekStart+7) = 'count RFQs created during that week'.", None),
]
for i, (text, font) in enumerate(lines, start=1):
    c = ws.cell(row=i, column=2, value=text)
    c.alignment = Alignment(wrap_text=True, vertical="top")
    if font:
        c.font = font
    if text.startswith("LOG-0027"):
        c.fill = YELLOW
    if text.startswith(("Timestamp:", "Log ID:", "Last 7", "Email subject:")):
        c.font = Font(name="Consolas", size=10)
        c.fill = GREY

# ---------------------------------------------------------------- Products
products = [
    ("BL-1001", "Steel Hex Bolts M10 (box of 100)", 12.50, 80, 7, "Apex Fasteners (Pune)", 145),
    ("BL-1002", "Corrugated Shipping Box 18x12x10", 0.85, 1500, 5, "PackRight Industries (Mumbai)", 1180),
    ("BL-1003", "Stretch Wrap Film 500mm", 9.20, 200, 6, "PackRight Industries (Mumbai)", 260),
    ("BL-1004", "Industrial Safety Gloves (pair)", 2.40, 600, 10, "SafeHands Co. (Chennai)", 420),
    ("BL-1005", "Pallet Jack Wheels (set)", 38.00, 25, 21, "Global Lift Parts (Shenzhen)", 18),
    ("BL-1006", "Packing Tape 48mm (roll)", 1.10, 1000, 5, "PackRight Industries (Mumbai)", 1850),
    ("BL-1007", "Hydraulic Oil 20L", 54.00, 40, 14, "Gulf Lubricants (Dubai)", 31),
    ("BL-1008", "LED Warehouse Light 150W", 72.00, 30, 28, "Shenzhen BrightTech (Shenzhen)", 34),
    ("BL-1009", "Nylon Cable Ties (pack of 500)", 6.30, 150, 7, "Apex Fasteners (Pune)", 410),
    ("BL-1010", "Forklift Battery Water Kit", 19.75, 20, 12, "Global Lift Parts (Shenzhen)", 26),
]
wp = wb.create_sheet("Products")
header(wp, 1, ["SKU", "Product", "Unit cost (USD)", "Reorder point", "Lead time (days)", "Main supplier",
               "Stock on hand (Odoo, 16 Nov)", "Status", "Stock value (USD)"],
       [10, 34, 14, 13, 13, 30, 16, 13, 16])
for r, p in enumerate(products, start=2):
    for col, v in enumerate(p, start=1):
        c = wp.cell(row=r, column=col, value=v)
        c.border = BOX
    wp.cell(row=r, column=3).number_format = "$#,##0.00"
    wp.cell(row=r, column=7).number_format = "#,##0"
    wp.cell(row=r, column=8, value=f'=IF(G{r}>=D{r},"OK","Below ROP")').border = BOX
    v = wp.cell(row=r, column=9, value=f"=G{r}*C{r}")
    v.number_format, v.border, v.fill = "$#,##0.00", BOX, GREEN
    wp.cell(row=r, column=8).fill = GREEN
wp.cell(row=12, column=8, value="TOTAL").font = BOLD
t = wp.cell(row=12, column=9, value="=SUM(I2:I11)")
t.font, t.number_format = BOLD, "$#,##0.00"
wp.conditional_formatting.add("H2:H11", CellIsRule(operator="equal", formula=['"Below ROP"'], fill=RED))
wp.freeze_panes = "A2"

# ---------------------------------------------------------------- Decision log
name = {p[0]: p[1] for p in products}
cost = {p[0]: p[2] for p in products}
P = "Priya Sharma"
rows = [
    # date, time, sku, stock, action, approved, risk, qty, note   (RFQ qty = reorder point x 2 - on hand)
    ("2026-10-19", "07:05", "BL-1006", 980, "RFQ created", P, 2.3, 1020, "Below reorder point 1000. RFQ P00012 for 1,020 rolls from PackRight."),
    ("2026-10-19", "07:05", "BL-1002", 1420, "RFQ created", P, 2.3, 1580, "Below reorder point 1500. RFQ P00011 for 1,580 boxes from PackRight."),
    ("2026-10-20", "07:05", "BL-1006", 970, "Hold", P, 2.3, 0, "Open RFQ P00012 already in transit. Duplicate suggestion blocked."),
    ("2026-10-21", "07:30", "BL-1008", 41, "Risk alert", "Auto", 6.4, 0, "Shenzhen BrightTech risk above 6: heavy rain forecast in Shenzhen, CNY up 1.2%."),
    ("2026-10-22", "07:05", "BL-1004", 640, "Hold", "Auto", 4.6, 0, "Just above reorder point 600. SafeHands lead time 10 days. Watching daily."),
    ("2026-10-23", "07:05", "BL-1010", 19, "RFQ created", P, 5.9, 21, "Below reorder point 20. RFQ P00014 for 21 kits from Global Lift Parts."),
    ("2026-10-24", "07:05", "BL-1009", 148, "Rejected", P, 4.0, 0, "Rejected: Ravi counted 450 packs on the shelf. Odoo count corrected."),
    ("2026-10-26", "07:05", "BL-1007", 39, "Rejected", P, 5.4, 0, "Rejected: 60 drums arriving 28 Oct on earlier PO P00009."),
    ("2026-10-27", "07:05", "BL-1001", 79, "RFQ created", P, 4.0, 81, "Below reorder point 80. RFQ P00016 for 81 boxes from Apex Fasteners."),
    ("2026-10-28", "07:30", "BL-1005", 24, "Risk alert", "Auto", 7.6, 0, "Global Lift Parts risk 7.6: rain in Shenzhen + CNY up 2.1% vs INR."),
    ("2026-10-28", "09:40", "BL-1005", 24, "Hold", P, 7.6, 0, "Waiting for Global Lift ship date before ordering."),
    ("2026-10-29", "07:05", "BL-1003", 198, "RFQ created", P, 3.0, 202, "Below reorder point 200. RFQ P00017 for 202 rolls from PackRight."),
    ("2026-10-30", "07:05", "BL-1002", 1480, "Rejected", P, 2.4, 0, "Rejected: 1,580 boxes arriving Monday on P00011."),
    ("2026-10-31", "07:30", "BL-1008", 38, "Risk alert", "Auto", 7.1, 0, "Shenzhen BrightTech risk 7.1: public holiday next week + 28-day lead time."),
    ("2026-11-02", "07:05", "BL-1006", 995, "Rejected", P, 2.2, 0, "Rejected: 1,020 rolls (P00012) received, not yet booked in Odoo by Ravi."),
    ("2026-11-03", "07:30", "BL-1004", 605, "Risk alert", "Auto", 6.8, 0, "SafeHands risk 6.8: heavy rain warning in Chennai (85 mm forecast)."),
    ("2026-11-04", "07:05", "BL-1010", 21, "Hold", P, 5.9, 0, "Delivery of P00014 expected Friday. No new order needed."),
    ("2026-11-06", "07:30", "BL-1007", 52, "Risk alert", "Auto", 5.3, 0, "Gulf Lubricants risk 5.3: 42°C heat in Dubai; AED stable."),
    ("2026-11-06", "09:15", "BL-1005", 21, "Hold", P, 7.4, 0, "Still waiting for Global Lift ship date. Asked for revised quote."),
    ("2026-11-09", "07:30", "BL-1008", 36, "Risk alert", "Auto", 7.8, 0, "Shenzhen BrightTech risk 7.8: heavy rain in Shenzhen, CNY up 1.9%."),
    ("2026-11-09", "10:14", "BL-1003", 150, "RFQ created", P, 3.1, 250, "Below reorder point 200. RFQ P00026 for 250 rolls from PackRight. Demand up 18%."),
    ("2026-11-10", "07:05", "BL-1008", 35, "Hold", P, 7.8, 0, "Only 5 above reorder point 30 with a 28-day lead time. Waiting for revised quote ($72 to $68 per unit)."),
    ("2026-11-11", "07:05", "BL-1005", 18, "RFQ created", P, 7.2, 32, "Below reorder point 25. RFQ P00027 for 32 sets from Global Lift. Ship date requested."),
    ("2026-11-12", "07:05", "BL-1002", 1180, "RFQ created", P, 2.3, 1820, "Below reorder point 1500. RFQ P00028 for 1,820 boxes from PackRight."),
    ("2026-11-13", "07:05", "BL-1004", 420, "RFQ created", P, 4.6, 780, "Below reorder point 600. RFQ P00029 for 780 pairs from SafeHands (rain in Chennai noted)."),
    ("2026-11-13", "07:05", "BL-1007", 31, "Hold", P, 5.1, 0, "Below reorder point 40. Suggested 49 drums; Priya asked Gulf Lubricants for an 80-drum volume price."),
]
wl = wb.create_sheet("Decision_Log")
header(wl, 1, ["Log ID", "Timestamp", "SKU", "Product", "Stock On Hand", "Action", "Approved By", "Risk Score",
               "Order Qty", "Order Value (USD)", "Notes"],
       [11, 17, 10, 32, 12, 13, 14, 10, 10, 15, 70])
for i, (d, tm, sku, stock, action, appr, risk, qty, note) in enumerate(rows, start=1):
    r = i + 1
    ts = datetime.strptime(f"{d} {tm}", "%Y-%m-%d %H:%M")
    vals = [f"LOG-{i:04d}", ts, sku, name[sku], stock, action, appr, risk, qty, None, note]
    for col, v in enumerate(vals, start=1):
        c = wl.cell(row=r, column=col, value=v)
        c.border = BOX
    wl.cell(row=r, column=2).number_format = "yyyy-mm-dd hh:mm"
    wl.cell(row=r, column=8).number_format = "0.0"
    fv = wl.cell(row=r, column=10, value=f"=IFERROR(I{r}*VLOOKUP(C{r},Products!$A$2:$C$11,3,FALSE),0)")
    fv.number_format, fv.fill = "$#,##0.00", GREEN
for r in range(len(rows) + 2, len(rows) + 6):  # yellow rows for Task 2
    for col in range(1, 12):
        wl.cell(row=r, column=col).fill = YELLOW
        wl.cell(row=r, column=col).border = BOX
    wl.cell(row=r, column=2).number_format = "yyyy-mm-dd hh:mm"
    fv = wl.cell(row=r, column=10, value=f'=IF(C{r}="","",IFERROR(I{r}*VLOOKUP(C{r},Products!$A$2:$C$11,3,FALSE),0))')
    fv.number_format = "$#,##0.00"
dv = DataValidation(type="list", formula1='"RFQ created,Rejected,Hold,Risk alert"', allow_blank=True)
wl.add_data_validation(dv)
dv.add("F2:F200")
wl.freeze_panes = "A2"
wl.auto_filter.ref = f"A1:K{len(rows) + 5}"

# ---------------------------------------------------------------- Dashboard
wd = wb.create_sheet("Dashboard")
for col, w in zip("ABCDEFG", [3, 38, 16, 14, 14, 14, 16]):
    wd.column_dimensions[col].width = w
wd["B1"] = "BrightLeaf Monday Dashboard (built from the Decision Log)"
wd["B1"].font = TITLE
wd["B2"] = "Green cells are formulas. Compare these with Stocky's Monday Report: the numbers must match."

L = "Decision_Log"
kpis = [
    ("STOCK (from Products / Odoo)", None, None),
    ("Stock health % (SKUs at or above reorder point)", '=COUNTIF(Products!H2:H11,"OK")/COUNTA(Products!A2:A11)', "0%"),
    ("SKUs below reorder point", '=COUNTIF(Products!H2:H11,"Below ROP")', "0"),
    ("Money tied up in stock (USD)", "=SUM(Products!I2:I11)", "$#,##0"),
    ("DECISIONS (from Decision_Log, all 4 weeks)", None, None),
    ("Total decisions logged", f"=COUNTA({L}!A2:A200)", "0"),
    ("RFQs created", f'=COUNTIF({L}!F2:F200,"RFQ created")', "0"),
    ("Rejected", f'=COUNTIF({L}!F2:F200,"Rejected")', "0"),
    ("On hold", f'=COUNTIF({L}!F2:F200,"Hold")', "0"),
    ("Risk alerts", f'=COUNTIF({L}!F2:F200,"Risk alert")', "0"),
    ("Total value of RFQs (USD)", f'=SUMIFS({L}!J2:J200,{L}!F2:F200,"RFQ created")', "$#,##0"),
    ("Average supplier risk score on RFQs", f'=AVERAGEIFS({L}!H2:H200,{L}!F2:F200,"RFQ created")', "0.0"),
    ("Approval rate (RFQs ÷ (RFQs + Rejected))", "=C10/(C10+C11)", "0%"),
    ("RFQs approved by Priya Sharma", f'=COUNTIFS({L}!F2:F200,"RFQ created",{L}!G2:G200,"Priya Sharma")', "0"),
]
r = 4
for label, formula, fmt in kpis:
    b = wd.cell(row=r, column=2, value=label)
    if formula is None:
        b.font = SUB
    else:
        b.border = BOX
        c = wd.cell(row=r, column=3, value=formula)
        c.fill, c.border, c.number_format, c.font = GREEN, BOX, fmt, BOLD
    r += 1
# r is now 18
wr = 20
wd.cell(row=wr - 1, column=2, value="WEEKLY TABLE (feeds the charts)").font = SUB
header_vals = ["Week starting (Monday)", "RFQs created", "Rejected", "On hold", "Risk alerts", "RFQ value (USD)"]
for i, v in enumerate(header_vals, start=2):
    c = wd.cell(row=wr, column=i, value=v)
    c.fill, c.font, c.border = HEAD, WHITE_B, BOX
    c.alignment = Alignment(wrap_text=True)
weeks = [datetime(2026, 10, 19) + timedelta(days=7 * k) for k in range(4)]


def cf(action, rr):
    return (f'=COUNTIFS({L}!$F$2:$F$200,"{action}",{L}!$B$2:$B$200,">="&$B{rr},'
            f'{L}!$B$2:$B$200,"<"&($B{rr}+7))')


for k, wk in enumerate(weeks):
    rr = wr + 1 + k
    a = wd.cell(row=rr, column=2, value=wk)
    a.number_format, a.border = "dd mmm yyyy", BOX
    wd.cell(row=rr, column=3, value=cf("RFQ created", rr))
    # YOUR TURN cells for the last week (D, E, F) - learner completes; others pre-filled
    if k < 3:
        wd.cell(row=rr, column=4, value=cf("Rejected", rr))
        wd.cell(row=rr, column=5, value=cf("Hold", rr))
        wd.cell(row=rr, column=6, value=cf("Risk alert", rr))
    else:
        for col in (4, 5, 6):
            wd.cell(row=rr, column=col, value="YOUR TURN").fill = YELLOW
    wd.cell(row=rr, column=7, value=(f'=SUMIFS({L}!$J$2:$J$200,{L}!$F$2:$F$200,"RFQ created",'
                                     f'{L}!$B$2:$B$200,">="&$B{rr},{L}!$B$2:$B$200,"<"&($B{rr}+7))'))
    for col in range(3, 8):
        c = wd.cell(row=rr, column=col)
        c.border = BOX
        if c.fill != YELLOW:
            c.fill = GREEN
    wd.cell(row=rr, column=7).number_format = "$#,##0"
tr = wr + 5
wd.cell(row=tr, column=2, value="TOTAL").font = BOLD
for col in range(3, 8):
    L_ = wd.cell(row=1, column=col).column_letter
    c = wd.cell(row=tr, column=col, value=f"=SUM({L_}{wr + 1}:{L_}{wr + 4})")
    c.font, c.border = BOLD, BOX
wd.cell(row=tr, column=7).number_format = "$#,##0"
wd.cell(row=tr + 2, column=2, value="Hint for YOUR TURN: copy the formula from the cell just above (week 3) and paste it into week 4. The $ signs keep the log columns fixed while the week date changes.").alignment = WRAP
wd.row_dimensions[tr + 2].height = 45

ch = BarChart()
ch.type = "col"
ch.grouping = "clustered"
ch.title = "Stocky decisions per week"
ch.y_axis.title = "Number of decisions"
ch.x_axis.title = "Week starting"
data = Reference(wd, min_col=3, max_col=6, min_row=wr, max_row=wr + 4)
cats = Reference(wd, min_col=2, min_row=wr + 1, max_row=wr + 4)
ch.add_data(data, titles_from_data=True)
ch.set_categories(cats)
ch.height, ch.width = 8, 16
wd.add_chart(ch, "I3")

ch2 = BarChart()
ch2.type = "col"
ch2.title = "Value of RFQs created per week (USD)"
ch2.add_data(Reference(wd, min_col=7, max_col=7, min_row=wr, max_row=wr + 4), titles_from_data=True)
ch2.set_categories(cats)
ch2.legend = None
ch2.height, ch2.width = 8, 16
wd.add_chart(ch2, "I21")

# ---------------------------------------------------------------- Kapoor questions
wk = wb.create_sheet("Kapoor_Questions")
wk.column_dimensions["A"].width = 4
wk.column_dimensions["B"].width = 70
wk.column_dimensions["C"].width = 60
wk["B1"] = "Answer Mr. Kapoor's questions from the log (like Stocky would)"
wk["B1"].font = TITLE
header(wk, 3, ["#", "Mr. Kapoor asks...", "Your answer (type here)"])
qs = [
    "On 9 November we ordered stretch wrap. How many rolls, what was the stock that day, who approved it, and why?",
    "Over the 4 weeks, how many RFQs did Stocky create, and what was their total value in USD?",
    "Which product appears most often as 'Risk alert' or 'Hold'? What one action would you recommend to me?",
]
for i, q in enumerate(qs, start=1):
    wk.cell(row=3 + i, column=1, value=i).border = BOX
    c = wk.cell(row=3 + i, column=2, value=q)
    c.alignment, c.border = WRAP, BOX
    a = wk.cell(row=3 + i, column=3)
    a.fill, a.border, a.alignment = YELLOW, BOX, WRAP
    wk.row_dimensions[3 + i].height = 60
wk["B9"] = "ANSWER KEY (try first, then scroll down)"
wk["B9"].font = SUB
keys = [
    "1) 250 rolls (RFQ P00026). Stock was 150 vs reorder point 200. Approved by Priya Sharma at 10:14. Reason: below reorder point and demand up 18%. Supplier risk 3.1/10 (low). (250 = reorder point 200 x 2 - 150 on hand.)",
    "2) 9 RFQs (see Dashboard 'RFQs created'), total value $12,685.65 (Dashboard 'Total value of RFQs').",
    "3) BL-1008 LED Warehouse Light 150W, followed by BL-1005 Pallet Jack Wheels (BL-1008 has 4 risk/hold entries, BL-1005 has 3; both come from Shenzhen suppliers). Recommendation: LED lights are only 5 above the reorder point with a 28-day lead time, so decide this week whether to order early (even at $72 if the $68 quote doesn't come), and get a confirmed ship date for RFQ P00027 from Global Lift Parts.",
]
for i, k in enumerate(keys):
    c = wk.cell(row=20 + i, column=2, value=k)
    c.alignment = WRAP
    c.fill = GREY
    wk.merge_cells(start_row=20 + i, start_column=2, end_row=20 + i, end_column=3)
    wk.row_dimensions[20 + i].height = 45

# ---------------------------------------------------------------- Your company
wy = wb.create_sheet("Your_Company")
wy.column_dimensions["A"].width = 4
for col, w in zip("BCDE", [30, 40, 40, 30]):
    wy.column_dimensions[col].width = w
wy["B1"] = "Now try it with your company"
wy["B1"].font = TITLE
wy["B2"] = "Design YOUR agent's Decision Log and Monday Report. BrightLeaf's answers are shown in grey as an example."
header(wy, 4, ["", "Decision Log column", "BrightLeaf example", "Your company's version"])
cols = [
    ("Log ID", "LOG-0001"), ("Timestamp", "2026-11-09 10:14"), ("Item / SKU", "BL-1003"),
    ("Item name", "Stretch Wrap Film 500mm"), ("Key number at that moment", "Stock On Hand = 150"),
    ("Action", "RFQ created / Rejected / Hold / Risk alert"), ("Approved By", "Priya Sharma or Auto"),
    ("Risk / priority score", "3.1 out of 10"), ("Notes (for a human)", "Below reorder point 200. Ordered 250 rolls."),
    ("(add your own)", ""),
]
for i, (c1, c2) in enumerate(cols, start=5):
    wy.cell(row=i, column=2, value=c1).border = BOX
    e = wy.cell(row=i, column=3, value=c2)
    e.fill, e.border = GREY, BOX
    y = wy.cell(row=i, column=4)
    y.fill, y.border = YELLOW, BOX
r0 = 17
header(wy, r0, ["", "Monday Report question", "BrightLeaf example", "Your company's version"])
rep = [
    ("Who reads it?", "Mr. Kapoor, Operations Director (on his phone)"),
    ("When should it arrive?", "Every Monday 7:00 am, Asia/Kolkata"),
    ("Headline: the one thing that matters", "Top risk this week"),
    ("Key number 1", "Stock health %"),
    ("Key number 2", "Money tied up in stock (USD)"),
    ("Key number 3", "SKUs below reorder point"),
    ("Key number 4 (your extra from Pause & Think)", "RFQs created + value"),
    ("Main list", "Top 5 risks with one action each"),
    ("Decisions needed from the boss (max 2)", "Air freight approval, safety stock level"),
    ("Data sources the agent must read", "Odoo products, Decision Log, Suppliers + risk scores"),
    ("Where does the dashboard link go?", "Google Sheet 'Dashboard' tab, Viewer access"),
]
for i, (c1, c2) in enumerate(rep, start=r0 + 1):
    wy.cell(row=i, column=2, value=c1).border = BOX
    e = wy.cell(row=i, column=3, value=c2)
    e.fill, e.border, e.alignment = GREY, BOX, WRAP
    y = wy.cell(row=i, column=4)
    y.fill, y.border = YELLOW, BOX

for sheet in wb.worksheets:
    sheet.sheet_view.zoomScale = 110
wb.save(OUT)
print("saved", OUT)
