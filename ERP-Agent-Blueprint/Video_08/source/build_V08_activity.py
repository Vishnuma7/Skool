"""Builds V08_Activity_SupplierRiskScorecard.xlsx (run with the course venv python)."""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import CellIsRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

OUT = Path(__file__).resolve().parent.parent / "V08_Activity_SupplierRiskScorecard.xlsx"

NAVY = "1F2A44"
HEAD = PatternFill("solid", fgColor=NAVY)
INPUT = PatternFill("solid", fgColor="FFF4B3")
CALC = PatternFill("solid", fgColor="E8F1FB")
GREEN = PatternFill("solid", fgColor="C6EFCE")
AMBER = PatternFill("solid", fgColor="FFE699")
RED = PatternFill("solid", fgColor="F8CBAD")
WHITE_B = Font(bold=True, color="FFFFFF")
BOLD = Font(bold=True)
TITLE = Font(bold=True, size=16, color=NAVY)
NOTE = Font(italic=True, color="666666")
thin = Side(style="thin", color="BFBFBF")
BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
WRAP = Alignment(wrap_text=True, vertical="top")


def header(ws, row, names, widths=None):
    for i, h in enumerate(names, start=1):
        c = ws.cell(row=row, column=i, value=h)
        c.fill = HEAD
        c.font = WHITE_B
        c.border = BOX
        c.alignment = Alignment(wrap_text=True, vertical="center", horizontal="center")
        if widths:
            ws.column_dimensions[c.column_letter].width = widths[i - 1]
    ws.row_dimensions[row].height = 34


def cell(ws, r, c, v, fill=None, fmt=None, wrap=False, bold=False):
    x = ws.cell(row=r, column=c, value=v)
    x.border = BOX
    if fill:
        x.fill = fill
    if fmt:
        x.number_format = fmt
    if wrap:
        x.alignment = WRAP
    if bold:
        x.font = BOLD
    return x


def band_rules(ws, rng):
    ws.conditional_formatting.add(rng, CellIsRule(operator="equal", formula=['"LOW"'], fill=GREEN, font=Font(bold=True, color="006100")))
    ws.conditional_formatting.add(rng, CellIsRule(operator="equal", formula=['"MEDIUM"'], fill=AMBER, font=Font(bold=True, color="7F6000")))
    ws.conditional_formatting.add(rng, CellIsRule(operator="equal", formula=['"HIGH"'], fill=RED, font=Font(bold=True, color="9C0006")))


wb = Workbook()

# ------------------------------------------------------------ Instructions
ws = wb.active
ws.title = "Instructions"
ws.sheet_view.showGridLines = False
ws.column_dimensions["A"].width = 4
ws.column_dimensions["B"].width = 112
lines = [
    ("Supplier Risk Scorecard: Score BrightLeaf's suppliers with today's real data", TITLE),
    ("Course: The ERP Agent Blueprint | Video 8: Seeing Beyond the ERP | Time: 30-40 minutes", NOTE),
    ("", None),
    ("WHAT YOU'LL DO", BOLD),
    ("You'll do by hand exactly what Stocky does with its three tools: open three free APIs in your browser, read today's weather, exchange rates and holidays, and turn them into a Supplier Risk Score out of 10. Doing it by hand once is the best way to understand (and check) what your agent is doing.", None),
    ("", None),
    ("COLOUR CODE: Yellow = you type. Blue = formulas (don't type over them). Green / Amber / Red = risk bands.", BOLD),
    ("", None),
    ("STEP 1 (5 min): Read the 'Rules' sheet. These are the same scoring rules as in the video and in Stocky's system message.", None),
    ("STEP 2 (10 min): Go to 'Suppliers'. Click each blue weather link (it opens Open-Meteo for that city). Note the highest wind speed and the highest daily rain in the 7-day forecast.", None),
    ("STEP 3 (10 min): Go to 'Live Data'. The grey example exchange rates and holidays are real values from 17 November 2026 (the weather values are calm-week examples). Overwrite them with TODAY's values: weather (Step 2), exchange rates (open the two Frankfurter links at the top of Live Data) and holidays (open the Nager.Date links for US, MX and CN; for the UAE use the list on the Rules sheet).", None),
    ("STEP 4 (5 min): Go to 'Scorecard'. The four scores, total and risk band fill in automatically. If you disagree with a score (you know something the data doesn't), type your own number in the yellow Override column and say why.", None),
    ("STEP 5 (5 min): For every MEDIUM or HIGH supplier (or, if all are LOW, the highest-scoring one), write ONE plain-English sentence in the 'Why' column, like Stocky does: 'Gulf Lubricants: LOW (3/10) but top of the list. UAE National Day 2-3 Dec; order oil this week.'", None),
    ("STEP 6 (5 min): Look at 'Fire Drill', the Golden Week + typhoon scenario from the video, scored 8/10 HIGH. Change one input at a time and watch the band change.", None),
    ("STEP 7 (10 min): Now try it with your company. On 'Your Company', add your top 3-5 suppliers, look up their city coordinates (search '<city> coordinates'), and score them with today's data.", None),
    ("", None),
    ("BONUS: The 'n8n Copy-Paste' sheet has the exact tool URLs, descriptions and system message from the video, ready to paste into n8n.", None),
    ("", None),
    ("Remember: the score is GUIDANCE, NOT TRUTH. It tells you where to look today. You decide what to do.", Font(bold=True, color="9C0006")),
]
for i, (t, f) in enumerate(lines, start=1):
    c = ws.cell(row=i, column=2, value=t)
    c.alignment = WRAP
    if f:
        c.font = f

# ------------------------------------------------------------ Rules
ru = wb.create_sheet("Rules")
ru["A1"] = "Supplier Risk Score rules (total out of 10)"
ru["A1"].font = TITLE
header(ru, 3, ["Part", "Points", "Rule", "Data source"], [16, 9, 78, 34])
rules = [
    ("Weather", "0-3", "Next 7 days. 0 = calm. 1 = rain >= 20 mm in a day OR wind >= 40 km/h. 2 = rain >= 50 mm OR wind >= 60 km/h. 3 = rain >= 100 mm OR wind >= 90 km/h (storm / typhoon strength).", "Open-Meteo (free, no key)"),
    ("Holiday", "0-3", "Next 30 days. 0 = no public holiday. 1 = one holiday day. 2 = two or more holiday days. 3 = a major shutdown: Golden Week (1-7 Oct), Chinese New Year, Christmas-New Year week, Eid break.", "Nager.Date for US, Mexico and China; written list below for the UAE"),
    ("Currency", "0-2", "30-day move of USD->supplier currency (CNY, MXN). Under 1% = 0. 1% to 3% = 1. 3% or more = 2. US suppliers paid in dollars = 0. AED is pegged to USD at about 3.67, so the dirham adds about 0 risk.", "Frankfurter (free, no key; ECB reference rates)"),
    ("Lead time", "0-2", "Longest lead time for this supplier's items. 7 days or less = 0. 8-20 days = 1. 21 days or more = 2.", "Odoo (product > Purchase tab)"),
    ("BANDS", "", "0-3 = LOW (green).  4-6 = MEDIUM (amber).  7-10 = HIGH (red).", ""),
]
for i, r in enumerate(rules, start=4):
    for j, v in enumerate(r, start=1):
        cell(ru, i, j, v, wrap=True, bold=(j == 1))
    ru.row_dimensions[i].height = 48
ru["A10"] = "Holidays NOT covered by Nager.Date (check the exact dates every January; Islamic holidays depend on the moon)"
ru["A10"].font = BOLD
header(ru, 11, ["Country", "Date(s)", "Holiday", "Notes"])
hol = [
    ("UAE", "approx. 20-22 Mar 2026", "Eid al-Fitr", "Moon-dependent; often a multi-day break"),
    ("UAE", "approx. 26-29 May 2026", "Arafat Day + Eid al-Adha", "Moon-dependent"),
    ("UAE", "2-3 Dec", "National Day (Eid Al Etihad)", "Two holiday days"),
    ("China (FYI)", "6 Feb 2027", "Chinese New Year", "Official days are short, but factories often close 2-3 weeks"),
    ("USA / Mexico (FYI)", "26 Nov 2026 (US) / 16 Nov 2026 (MX)", "Thanksgiving / Revolution Day", "These ARE in Nager.Date (US, MX). Many US plants also close the Friday after Thanksgiving"),
]
for i, r in enumerate(hol, start=12):
    for j, v in enumerate(r, start=1):
        cell(ru, i, j, v, wrap=True)

# ------------------------------------------------------------ Suppliers
sp = wb.create_sheet("Suppliers")
sp["A1"] = "BrightLeaf suppliers, map pins and API links"
sp["A1"].font = TITLE
sp["A2"] = "Click a blue link to open that city's 7-day forecast in your browser. The links are built by a formula from the latitude and longitude."
sp["A2"].font = NOTE
cols = ["Supplier", "City", "Country code", "Latitude", "Longitude", "Currency", "Longest lead time (days)", "Items (SKU)", "Weather link (Open-Meteo)"]
header(sp, 4, cols, [24, 12, 10, 10, 10, 10, 12, 36, 34])
suppliers = [
    ("Shenzhen BrightTech", "Shenzhen", "CN", 22.54, 114.06, "CNY", 28, "BL-1008 LED Warehouse Light 150W"),
    ("Global Lift Parts", "Shenzhen", "CN", 22.54, 114.06, "CNY", 21, "BL-1005 Pallet Jack Wheels, BL-1010 Forklift Battery Water Kit"),
    ("Gulf Lubricants", "Dubai", "AE", 25.20, 55.27, "AED", 14, "BL-1007 Hydraulic Oil 20L"),
    ("SafeHands Co.", "Monterrey", "MX", 25.69, -100.32, "MXN", 10, "BL-1004 Industrial Safety Gloves"),
    ("PackRight Industries", "Chicago", "US", 41.88, -87.63, "USD", 6, "BL-1002 Boxes, BL-1003 Stretch Wrap, BL-1006 Packing Tape"),
    ("Apex Fasteners", "Columbus", "US", 39.96, -83.00, "USD", 7, "BL-1001 Hex Bolts, BL-1009 Cable Ties"),
]
SR0 = 5
for i, s in enumerate(suppliers):
    r = SR0 + i
    for j, v in enumerate(s, start=1):
        cell(sp, r, j, v, wrap=(j == 8))
    link = (f'=HYPERLINK("https://api.open-meteo.com/v1/forecast?latitude="&D{r}&"&longitude="&E{r}'
            f'&"&daily=precipitation_sum,wind_speed_10m_max&timezone=auto&forecast_days=7","Open forecast for "&B{r})')
    x = cell(sp, r, 9, link, fill=CALC)
    x.font = Font(color="0563C1", underline="single")
    sp.row_dimensions[r].height = 30
sp.freeze_panes = "B5"

# ------------------------------------------------------------ Live Data
ld = wb.create_sheet("Live Data")
ld["A1"] = "Paste today's live API values here"
ld["A1"].font = TITLE
ld["A2"] = "Grey-italic examples: exchange rates and holidays are real values from 17 November 2026; weather values are calm-week examples. Overwrite every yellow cell with what YOU see today."
ld["A2"].font = NOTE
ld["A4"] = "EXCHANGE RATES (1 US dollar =)"
ld["A4"].font = BOLD
header(ld, 5, ["Currency", "Today", "30 days ago", "% move", "Where to look"], [26, 14, 14, 12, 70])
fx = [
    ("MXN (Mexican peso)", 18.4639, 18.3835, "https://api.frankfurter.dev/v1/latest?from=USD&to=CNY,MXN   then swap 'latest' for the date 30 days ago, e.g. 2026-10-16"),
    ("CNY (Chinese yuan)", 6.6661, 6.6862, "Same two links as above"),
    ("AED (UAE dirham)", 3.6725, 3.6725, "Not on Frankfurter's menu (an API only serves what its kitchen stocks). Pegged to USD at about 3.67 since 1997: leave as is, risk about 0."),
]
for i, (name, today, ago, where) in enumerate(fx, start=6):
    cell(ld, i, 1, name, bold=True)
    cell(ld, i, 2, today, fill=INPUT, fmt="0.0000").font = NOTE
    cell(ld, i, 3, ago, fill=INPUT, fmt="0.0000").font = NOTE
    cell(ld, i, 4, f"=(B{i}-C{i})/C{i}", fill=CALC, fmt="0.00%")
    cell(ld, i, 5, where, wrap=True)
    ld.row_dimensions[i].height = 30

ld["A11"] = "PER SUPPLIER (weather for the next 7 days, holidays for the next 30 days)"
ld["A11"].font = BOLD
lcols = ["Supplier", "City", "Max wind next 7 days (km/h)", "Max daily rain next 7 days (mm)",
         "Holiday days in next 30 days", "Major shutdown in next 30 days?", "Holiday name(s) and date(s)",
         "Currency", "Biggest 30-day FX move"]
header(ld, 12, lcols)
for col, w in zip("ABCDEFGHI", (26, 14, 14, 14, 13, 14, 40, 10, 14)):
    ld.column_dimensions[col].width = w
live = [
    (19.3, 1.4, 0, "No", "Next CN holiday: New Year 1 Jan 2027 (outside 30 days)"),
    (19.3, 1.4, 0, "No", "Same city as above"),
    (15.4, 0.3, 2, "No", "UAE National Day 2-3 Dec (written list; Nager.Date has no UAE data)"),
    (18.0, 1.0, 0, "No", "Revolution Day was 16 Nov (past); Christmas 25 Dec is outside 30 days"),
    (30.0, 6.0, 1, "No", "Thanksgiving 26 Nov"),
    (26.0, 8.0, 1, "No", "Thanksgiving 26 Nov"),
]
yn = DataValidation(type="list", formula1='"Yes,No"', allow_blank=False)
ld.add_data_validation(yn)
LR0 = 13
for i, (wind, rain, hdays, major, names) in enumerate(live):
    r = LR0 + i
    cell(ld, r, 1, f"=Suppliers!A{SR0 + i}", fill=CALC, bold=True)
    cell(ld, r, 2, f"=Suppliers!B{SR0 + i}", fill=CALC)
    for j, v in ((3, wind), (4, rain), (5, hdays), (6, major), (7, names)):
        x = cell(ld, r, j, v, fill=INPUT, wrap=(j == 7))
        x.font = NOTE
    yn.add(f"F{r}")
    cell(ld, r, 8, f"=Suppliers!F{SR0 + i}", fill=CALC)
    cell(ld, r, 9, f'=IF(H{r}="USD",0,IF(H{r}="MXN",ABS($D$6),IF(H{r}="CNY",ABS($D$7),ABS($D$8))))', fill=CALC, fmt="0.00%")
    ld.row_dimensions[r].height = 30
ld["A20"] = "Holiday links: https://date.nager.at/api/v3/PublicHolidays/2026/US  (swap US for MX or CN; change the year if needed). The UAE (AE) is not covered: use the list on the Rules sheet."
ld["A20"].font = NOTE
ld.freeze_panes = "C13"


# ------------------------------------------------------------ Scorecard
def score_formulas(ws, r, wind, rain, hdays, major, fxmove, lead):
    ws.cell(row=r, column=3, value=f"=IF(OR({wind}>=90,{rain}>=100),3,IF(OR({wind}>=60,{rain}>=50),2,IF(OR({wind}>=40,{rain}>=20),1,0)))")
    ws.cell(row=r, column=4, value=f'=IF({major}="Yes",3,IF({hdays}>=2,2,IF({hdays}=1,1,0)))')
    ws.cell(row=r, column=5, value=f"=IF({fxmove}>=0.03,2,IF({fxmove}>=0.01,1,0))")
    ws.cell(row=r, column=6, value=f"=IF({lead}>=21,2,IF({lead}>=8,1,0))")
    for k, (calc, ov) in enumerate(((3, 7), (4, 8), (5, 9), (6, 10))):
        ws.cell(row=r, column=11 + k, value=f'=IF({ws.cell(row=r, column=ov).coordinate}<>"",{ws.cell(row=r, column=ov).coordinate},{ws.cell(row=r, column=calc).coordinate})')
    ws.cell(row=r, column=15, value=f"=SUM(K{r}:N{r})")
    ws.cell(row=r, column=16, value=f'=IF(O{r}>=7,"HIGH",IF(O{r}>=4,"MEDIUM","LOW"))')
    for c in list(range(3, 7)) + list(range(11, 17)):
        x = ws.cell(row=r, column=c)
        x.fill = CALC
        x.border = BOX
        x.alignment = Alignment(horizontal="center")
    for c in (7, 8, 9, 10, 17, 18):
        x = ws.cell(row=r, column=c)
        x.fill = INPUT
        x.border = BOX
        x.alignment = WRAP


SC_COLS = ["Supplier", "City", "Weather (data)", "Holiday (data)", "Currency (data)", "Lead time (data)",
           "Weather override", "Holiday override", "Currency override", "Lead time override",
           "Weather FINAL /3", "Holiday FINAL /3", "Currency FINAL /2", "Lead time FINAL /2",
           "TOTAL /10", "RISK BAND", "Why (one plain-English sentence)", "Action / override reason"]
SC_W = [22, 11, 9, 9, 9, 9, 10, 10, 10, 10, 9, 9, 9, 9, 9, 11, 46, 34]


def add_overrides(ws, first, last):
    d3 = DataValidation(type="list", formula1='"0,1,2,3"', allow_blank=True)
    d2 = DataValidation(type="list", formula1='"0,1,2"', allow_blank=True)
    ws.add_data_validation(d3)
    ws.add_data_validation(d2)
    d3.add(f"G{first}:H{last}")
    d2.add(f"I{first}:J{last}")
    band_rules(ws, f"P{first}:P{last}")


scw = wb.create_sheet("Scorecard")
scw["A1"] = "Supplier Risk Scorecard"
scw["A1"].font = TITLE
scw["A2"] = "Scores fill in from 'Live Data'. Disagree? Pick your own score from the dropdown in an Override column and write why. Score = guidance, not truth."
scw["A2"].font = NOTE
header(scw, 4, SC_COLS, SC_W)
for i in range(len(suppliers)):
    r = 5 + i
    lr, sr = LR0 + i, SR0 + i
    cell(scw, r, 1, f"='Live Data'!A{lr}", bold=True)
    cell(scw, r, 2, f"='Live Data'!B{lr}")
    score_formulas(scw, r, f"'Live Data'!C{lr}", f"'Live Data'!D{lr}", f"'Live Data'!E{lr}",
                   f"'Live Data'!F{lr}", f"'Live Data'!I{lr}", f"Suppliers!G{sr}")
    scw.row_dimensions[r].height = 32
scw["Q7"] = "Gulf Lubricants: LOW (3/10), but the highest score today. UAE National Day 2-3 Dec falls in the next 30 days and Hydraulic Oil (31 on hand vs reorder point 40) has a 14-day lead time: order this week."
add_overrides(scw, 5, 10)
scw.freeze_panes = "C5"
scw["A12"] = "Example sentence (Gulf Lubricants) is pre-filled in the Why column. Write your own for any MEDIUM or HIGH supplier (if all are LOW, for the highest score). LOW doesn't mean ignore."
scw["A12"].font = NOTE

# ------------------------------------------------------------ Fire Drill
fd = wb.create_sheet("Fire Drill")
fd["A1"] = "Fire drill: Golden Week + typhoon (pretend date 24 September 2026)"
fd["A1"].font = TITLE
fd["A2"] = "This is the scenario from the video. Change ONE yellow input at a time and watch the score and band change."
fd["A2"].font = NOTE
header(fd, 4, ["Input", "Value", "Notes"], [42, 14, 70])
drill = [
    ("Supplier", "Shenzhen BrightTech", "LED Warehouse Light 150W (BL-1008)"),
    ("Max wind next 7 days (km/h)", 110, "Assumed for the drill (typhoon strength) on 29-30 Sept"),
    ("Max daily rain next 7 days (mm)", 140, "Assumed for the drill"),
    ("Holiday days in next 30 days", 8, "Mid-Autumn Festival 25 Sept + National Day 1 Oct (Golden Week 1-7 Oct), from Nager.Date"),
    ("Major shutdown in next 30 days?", "Yes", "Golden Week: most factories close for the week"),
    ("USD->CNY % move (24 Aug to 24 Sept 2026)", 0.0015, "6.7227 -> 6.7126 (real Frankfurter rates), size of move"),
    ("Longest lead time (days)", 28, "From Odoo"),
]
for i, (a, b, c) in enumerate(drill, start=5):
    cell(fd, i, 1, a, bold=True)
    x = cell(fd, i, 2, b, fill=INPUT)
    if i == 10:
        x.number_format = "0.00%"
    cell(fd, i, 3, c, wrap=True)
fd.add_data_validation(dv_fd := DataValidation(type="list", formula1='"Yes,No"'))
dv_fd.add("B9")
header(fd, 15, ["Score part", "Points", "Rule applied"])
parts = [
    ("Weather /3", "=IF(OR(B6>=90,B7>=100),3,IF(OR(B6>=60,B7>=50),2,IF(OR(B6>=40,B7>=20),1,0)))", "Wind >= 90 km/h or rain >= 100 mm = 3"),
    ("Holiday /3", '=IF(B9="Yes",3,IF(B8>=2,2,IF(B8=1,1,0)))', "Major shutdown in next 30 days = 3"),
    ("Currency /2", "=IF(ABS(B10)>=0.03,2,IF(ABS(B10)>=0.01,1,0))", "Move under 1% = 0"),
    ("Lead time /2", "=IF(B11>=21,2,IF(B11>=8,1,0))", "21 days or more = 2"),
    ("TOTAL /10", "=SUM(B16:B19)", ""),
    ("RISK BAND", '=IF(B20>=7,"HIGH",IF(B20>=4,"MEDIUM","LOW"))', "0-3 LOW, 4-6 MEDIUM, 7-10 HIGH"),
]
for i, (a, f, n) in enumerate(parts, start=16):
    cell(fd, i, 1, a, bold=True)
    cell(fd, i, 2, f, fill=CALC).alignment = Alignment(horizontal="center")
    cell(fd, i, 3, n, wrap=True)
band_rules(fd, "B21")
fd["A23"] = "Stocky's sentence:"
fd["A23"].font = BOLD
fd["B23"] = '="Shenzhen BrightTech: "&B21&" risk ("&B20&"/10). Golden Week holiday + typhoon warning; order LED lights 10 days earlier."'
fd["A25"] = "Try: (1) set wind to 30 and rain to 5. (2) set Major shutdown to No. (3) set the CNY move to 0.035. What band do you get each time?"
fd["A25"].font = NOTE

# ------------------------------------------------------------ Your Company
yc = wb.create_sheet("Your Company")
yc["A1"] = "Now try it with your company"
yc["A1"].font = TITLE
yc["A2"] = "Step 1: fill in the yellow cells in the top table (your suppliers + today's data). Step 2: the scorecard underneath fills itself in. Write a 'Why' sentence for anything MEDIUM or HIGH."
yc["A2"].font = NOTE
ycols = ["Supplier", "City", "Latitude", "Longitude", "Currency (USD = home)", "Longest lead time (days)",
         "Max wind next 7 days (km/h)", "Max daily rain (mm)", "Holiday days next 30 days",
         "Major shutdown? (Yes/No)", "Biggest 30-day FX move (e.g. 1.2%)", "Weather link"]
header(yc, 4, ycols, [22, 12, 10, 10, 12, 11, 11, 11, 11, 11, 13, 30])
yn2 = DataValidation(type="list", formula1='"Yes,No"', allow_blank=True)
yc.add_data_validation(yn2)
for r in range(5, 13):
    for c in range(1, 12):
        cell(yc, r, c, None, fill=INPUT)
    yc.cell(row=r, column=11).number_format = "0.00%"
    yn2.add(f"J{r}")
    x = cell(yc, r, 12, (f'=IF(C{r}="","",HYPERLINK("https://api.open-meteo.com/v1/forecast?latitude="&C{r}&"&longitude="&D{r}'
                         f'&"&daily=precipitation_sum,wind_speed_10m_max&timezone=auto&forecast_days=7","Open forecast"))'), fill=CALC)
    x.font = Font(color="0563C1", underline="single")
header(yc, 15, SC_COLS)
for col, w in zip("MNOPQR", (9, 9, 9, 11, 46, 34)):
    yc.column_dimensions[col].width = w
for i in range(8):
    r, src = 16 + i, 5 + i
    cell(yc, r, 1, f'=IF(A{src}="","",A{src})', bold=True)
    cell(yc, r, 2, f'=IF(B{src}="","",B{src})')
    score_formulas(yc, r, f"G{src}", f"H{src}", f"I{src}", f"J{src}", f'IF(E{src}="USD",0,ABS(K{src}))', f"F{src}")
    yc.cell(row=r, column=16, value=f'=IF(A{src}="","",IF(O{r}>=7,"HIGH",IF(O{r}>=4,"MEDIUM","LOW")))')
add_overrides(yc, 16, 23)
yc.freeze_panes = "B5"

# ------------------------------------------------------------ n8n Copy-Paste
cp = wb.create_sheet("n8n Copy-Paste")
cp["A1"] = "Copy-paste text for the n8n build in Video 8"
cp["A1"].font = TITLE
cp.column_dimensions["A"].width = 28
cp.column_dimensions["B"].width = 120
SYSTEM = """You are Stocky, BrightLeaf Supplies' procurement risk assistant.
Today's date is {{ $now.toFormat('yyyy-MM-dd') }}.

SUPPLIERS (name | city | country | lat, long | currency | longest lead time)
- Shenzhen BrightTech | Shenzhen | CN | 22.54, 114.06 | CNY | 28 days (LED lights)
- Global Lift Parts | Shenzhen | CN | 22.54, 114.06 | CNY | 21 days
- Gulf Lubricants | Dubai | AE | 25.20, 55.27 | AED (pegged) | 14 days
- SafeHands Co. | Monterrey | MX | 25.69, -100.32 | MXN | 10 days
- PackRight Industries | Chicago | US | 41.88, -87.63 | USD | 6 days
- Apex Fasteners | Columbus | US | 39.96, -83.00 | USD | 7 days

SCORING (total out of 10)
Weather 0-3 (next 7 days): 0 calm; 1 rain>=20mm or wind>=40km/h;
  2 rain>=50mm or wind>=60km/h; 3 rain>=100mm or wind>=90km/h.
Holiday 0-3 (next 30 days): 0 none; 1 one holiday day; 2 two or more
  days; 3 major shutdown (China National Day = Golden Week 1-7 Oct,
  Chinese New Year, Christmas-New Year week, Eid break).
Currency 0-2: 30-day move of USD->supplier currency:
  <1% = 0; 1-3% = 1; >=3% = 2. US suppliers paid in USD = 0.
  AED is pegged to USD (about 3.67), so Dubai's AED risk is about 0.
Lead time 0-2: <=7 days 0; 8-20 days 1; >=21 days 2.
Bands: 0-3 LOW, 4-6 MEDIUM, 7-10 HIGH.

HOLIDAYS NOT IN THE API (check dates each year)
UAE: Eid al-Fitr (approx. 20-22 Mar 2026), Eid al-Adha (approx.
  26-29 May 2026), National Day 2-3 Dec.

RULES
- Use the tools for real data. Never invent a number.
- If a tool fails or data is missing, say so and score that part 0
  with the note "not checked".
- Output a table: Supplier | Weather | Holiday | Currency | Lead time
  | Total | Band. Then one plain-English sentence per MEDIUM or HIGH
  supplier (if none, for the highest-scoring supplier): what the
  risk is and what Sarah could do.
- End with: "This score is guidance, not truth. Please check before acting.\""""
items = [
    ("TOOL 1 name", "get_weather"),
    ("TOOL 1 description", "Gets the 7-day weather forecast for one supplier city. Give it the city's latitude and longitude. Returns daily rain (mm) and maximum wind speed (km/h)."),
    ("TOOL 1 URL", "https://api.open-meteo.com/v1/forecast"),
    ("TOOL 1 query parameters", "latitude = (sparkle: let the model define)\nlongitude = (sparkle: let the model define)\ndaily = precipitation_sum,wind_speed_10m_max\ntimezone = auto\nforecast_days = 7"),
    ("TOOL 2 name", "get_exchange_rates"),
    ("TOOL 2 description", 'Gets US dollar exchange rates for CNY and MXN. Use date = "latest" for today, or a date like 2026-10-16 to get the rate on that day (for the 30-day comparison). Do not ask for AED: it is not available, and the dirham is pegged to USD at about 3.67, so its currency risk is about 0.'),
    ("TOOL 2 URL", "https://api.frankfurter.dev/v1/{{ $fromAI('date', 'latest, or a date in YYYY-MM-DD format') }}"),
    ("TOOL 2 query parameters", "from = USD\nto = CNY,MXN"),
    ("TOOL 3 name", "get_public_holidays"),
    ("TOOL 3 description", "Gets official public holidays for one country and year. countryCode: US, MX (Mexico) or CN (China). The UAE is NOT covered: use the holiday list in your instructions for AE. Returns a list of dates and holiday names."),
    ("TOOL 3 URL", "https://date.nager.at/api/v3/PublicHolidays/{{ $fromAI('year', 'four-digit year, e.g. 2026') }}/{{ $fromAI('countryCode', 'two-letter country code, e.g. CN') }}"),
    ("AI Agent > Options > System Message", SYSTEM),
    ("Test message 1", "Good morning Stocky. Give me today's supplier risk scores."),
    ("Test message 2 (fire drill)", "Fire drill. Pretend today is 24 September 2026. Use the real holiday and currency tools. For weather, assume the Shenzhen forecast shows 110 km/h wind and 140 mm of rain on 29-30 September. Score Shenzhen BrightTech."),
]
for i, (a, b) in enumerate(items, start=3):
    cell(cp, i, 1, a, bold=True, wrap=True)
    x = cell(cp, i, 2, b, fill=INPUT, wrap=True)
    x.font = Font(name="Consolas", size=10)
    cp.row_dimensions[i].height = max(18, 15 * (b.count("\n") + 1 + len(b) // 110))

wb.save(OUT)
print("saved", OUT)
