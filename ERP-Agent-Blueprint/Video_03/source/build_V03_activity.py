"""Build V03_Activity_API_Treasure_Hunt.xlsx (run with the course venv python)."""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import CellIsRule, FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

OUT = Path(__file__).resolve().parent.parent / "V03_Activity_API_Treasure_Hunt.xlsx"

NAVY = "1F2A44"
HEAD = PatternFill("solid", fgColor=NAVY)
INPUT = PatternFill("solid", fgColor="FFF4B3")   # yellow = you type here
CALC = PatternFill("solid", fgColor="D7ECFB")    # blue = formula, don't touch
GIVEN = PatternFill("solid", fgColor="F2F2F2")   # grey = given info
TITLE_FILL = PatternFill("solid", fgColor="FDE9C9")
GOOD = PatternFill("solid", fgColor="C6EFCE")
BAD = PatternFill("solid", fgColor="FFC7CE")
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


def header(ws, row, labels, widths=None):
    for i, lab in enumerate(labels, start=1):
        c = ws.cell(row=row, column=i, value=lab)
        c.fill, c.font, c.border = HEAD, WHITE_B, BOX
        c.alignment = Alignment(wrap_text=True, vertical="center")
    if widths:
        for i, w in enumerate(widths, start=1):
            ws.column_dimensions[chr(64 + i)].width = w
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
    ws.conditional_formatting.add(rng, FormulaRule(formula=[f'LEFT({rng.split(":")[0]},1)="✔"'], fill=GOOD))
    ws.conditional_formatting.add(rng, FormulaRule(formula=[f'LEFT({rng.split(":")[0]},1)="✖"'], fill=BAD))


# ---------------------------------------------------------------- Lists (hidden)
lists = wb.active
lists.title = "Lists"
meanings = [
    "OK: your order arrived perfectly",
    "Created: your new order slip was accepted and something new was made",
    "Moved: the restaurant moved, follow the forwarding note",
    "Bad request: your order didn't make sense",
    "Wrong key card: missing, wrong or cancelled API key",
    "Forbidden: key card works, but not for this door",
    "Wrong address: dish or page not found",
    "Too many orders: slow down and try again later",
    "Kitchen problem: their server failed, not your fault",
]
lists["A1"] = "Status meanings"
for i, m in enumerate(meanings, start=2):
    lists.cell(row=i, column=1, value=m)
lists["C1"] = "Yes/No"
lists["C2"], lists["C3"] = "Yes", "No"
lists["E1"] = "GET/POST"
lists["E2"], lists["E3"] = "GET", "POST"

# ---------------------------------------------------------------- Instructions
ins = wb.create_sheet("Instructions", 0)
title(ins, "API Treasure Hunt: Video 3 Activity",
      "The ERP Agent Blueprint | Beginner | About 30 minutes | No code, no sign-up, just your web browser")
ins.column_dimensions["A"].width = 26
ins.column_dimensions["B"].width = 95
rows = [
    ("Your mission", "Sarah at BrightLeaf Supplies wants to know if APIs can replace her weekly copy-and-paste checks "
                     "(weather near suppliers, exchange rates, supplier holidays). You will call three real, free APIs, "
                     "decode their answers, and prove you can read the 'receipts'."),
    ("Colour code", "YELLOW cells = you type here.  BLUE cells = formulas that calculate or check your answers (don't type in them).  "
                    "GREY cells = information we give you.  Green = correct, red = try again."),
    ("Step 1: Treasure_Hunt", "Open each of the 3 web addresses in a new browser tab (click the link or copy-paste it). "
                              "Answer the questions in the yellow cells. Live numbers change daily, so there's no single right answer "
                              "for those, but some questions are auto-checked. Then look at the BrightLeaf price-impact calculator."),
    ("Step 2: Decode_JSON", "We saved a weather response from a stormy week in Shenzhen. Read it like a labelled shopping list "
                            "and copy the values into the table. The sheet checks your work and calculates a rain/wind risk level."),
    ("Step 3: Status_Codes", "Match each status code (the 'receipt') to its meaning using the dropdowns."),
    ("Step 4: GET_or_POST", "For each BrightLeaf task, decide: is Stocky ASKING (GET) or SUBMITTING (POST)?"),
    ("Step 5: My_Suppliers", "Now try it with your company. Enter 3 to 5 of YOUR suppliers' cities, coordinates and currencies. "
                             "The sheet builds ready-to-click weather, currency and holiday links for each one."),
    ("Tip", "Use Chrome or Firefox. In Chrome, tick 'Pretty-print' at the top of the JSON page to make it readable. "
            "Find any city's coordinates by searching '<city> latitude longitude'."),
    ("Reassurance", "You cannot break anything. These APIs only answer questions (GET). If you see an error, check for a typo "
                    "in the address: that's a 404 receipt, and now you know exactly what it means."),
]
r = 4
for k, v in rows:
    cell(ins, f"A{r}", k, GIVEN, bold=True)
    cell(ins, f"B{r}", v)
    ins.row_dimensions[r].height = 48
    r += 1

r += 1
cell(ins, f"A{r}", "YOUR SCORE", TITLE_FILL, bold=True)
r += 1
score_rows = [
    ("Treasure Hunt auto-checks (of 4)", "=COUNTIF(Treasure_Hunt!F5:F20,\"✔*\")"),
    ("Decode JSON (of 23)", "=COUNTIF(Decode_JSON!F17:H23,\"✔*\")+COUNTIF(Decode_JSON!G28:G29,\"✔*\")"),
    ("Status codes (of 9)", "=COUNTIF(Status_Codes!D5:D13,\"✔*\")"),
    ("GET or POST (of 10)", "=COUNTIF(GET_or_POST!D5:D14,\"✔*\")"),
    ("TOTAL (of 46)", f"=SUM(B{r}:B{r + 3})"),
]
for k, f in score_rows:
    cell(ins, f"A{r}", k, GIVEN, bold=True)
    cell(ins, f"B{r}", f, CALC, bold=True, wrap=False)
    r += 1

# ---------------------------------------------------------------- Treasure Hunt
th = wb.create_sheet("Treasure_Hunt", 1)
title(th, "Treasure Hunt: call 3 real APIs from your browser",
      "Click each link (or paste it into a new tab). Write your answers in the yellow cells.")
th["A3"] = "Restaurant 1 (Weather, Shenzhen): "
th["B3"] = '=HYPERLINK("https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto","https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto")'
th["B3"].font = Font(color="0563C1", underline="single")
th["A3"].font = Font(bold=True)
header(th, 4, ["#", "API", "Question", "Your answer", "Hint", "Check"], [5, 16, 52, 26, 48, 22])
qs = [
    ("Weather", "What timezone does the response say? (copy it exactly)", "Look for the label \"timezone\" near the top.",
     '=IF(D5="","",IF(LOWER(TRIM(D5))="asia/shanghai","✔ Correct","✖ Look at \"timezone\""))'),
    ("Weather", "What unit is the rainfall (precipitation_sum) measured in?", "Look inside \"daily_units\".",
     '=IF(D6="","",IF(LOWER(TRIM(D6))="mm","✔ Correct","✖ Check daily_units"))'),
    ("Weather", "Which date has the MOST rain this week?", "Line up the \"time\" list with the \"precipitation_sum\" list.", ""),
    ("Weather", "How many mm of rain on that day? (number only)", "One fact per cell: just the number.", ""),
    ("Weather", "What is the highest wind speed this week (km/h)?", "Look at \"wind_speed_10m_max\".", ""),
    ("Weather", "Stocky's suggestion: should Sarah be warned?", "Formula: warns if rain is 50 mm or more, or wind is 60 km/h or more.",
     '=IF(D8="","",IF(OR(D8>=50,D9>=60),"⚠ Yes: warn Sarah","No warning needed"))'),
]
qs2 = [
    ("Currency", "After you pressed Enter, what web address did the browser end up on? (copy the address bar)", "Did the restaurant move house?",
     '=IF(D12="","",IF(ISNUMBER(SEARCH("frankfurter.dev",D12)),"✔ Correct: it moved to .dev","✖ Look at the address bar again"))'),
    ("Currency", "1 USD = how many CNY? (number)", "Look inside \"rates\".", ""),
    ("Currency", "1 USD = how many MXN? (number)", "Look inside \"rates\".", ""),
    ("Currency", "Did AED (UAE dirham) come back? (Yes/No)", "Count the currencies inside \"rates\".",
     '=IF(D15="","",IF(D15="No","✔ Correct: the kitchen doesn\'t stock AED","✖ Look again"))'),
]
qs3 = [
    ("Holidays", "What is the NEXT public holiday in Mexico? (the \"name\")", "The first item in the list is the next one.", ""),
    ("Holidays", "On what date?", "Look at the \"date\" label of the first item.", ""),
    ("Holidays", "Would this holiday affect a BL-1004 glove order from SafeHands placed today (10-day lead time)? (Yes/No)", "Is the holiday within the next 10 days?", ""),
]


def put(rownum, n, q):
    api, text, hint, chk = q
    cell(th, f"A{rownum}", n, GIVEN)
    cell(th, f"B{rownum}", api, GIVEN)
    cell(th, f"C{rownum}", text, GIVEN)
    cell(th, f"D{rownum}", None, INPUT)
    cell(th, f"E{rownum}", hint, GIVEN)
    cell(th, f"F{rownum}", chk if chk else "(live answer: no auto-check)", CALC)
    th.row_dimensions[rownum].height = 32


n = 1
for i, q in enumerate(qs):
    put(5 + i, n, q)
    n += 1
th["A11"] = "Restaurant 2 (Currency): "
th["A11"].font = Font(bold=True)
th["B11"] = '=HYPERLINK("https://api.frankfurter.app/latest?from=USD&to=CNY,MXN,AED","https://api.frankfurter.app/latest?from=USD&to=CNY,MXN,AED")'
th["B11"].font = Font(color="0563C1", underline="single")
for i, q in enumerate(qs2):
    put(12 + i, n, q)
    n += 1
th["A16"] = "Restaurant 3 (Holidays, Mexico): "
th["A16"].font = Font(bold=True)
th["B16"] = '=HYPERLINK("https://date.nager.at/api/v3/NextPublicHolidays/MX","https://date.nager.at/api/v3/NextPublicHolidays/MX")'
th["B16"].font = Font(color="0563C1", underline="single")
for i, q in enumerate(qs3):
    put(17 + i, n, q)
    n += 1
yn = DataValidation(type="list", formula1="=Lists!$C$2:$C$3", allow_blank=True)
th.add_data_validation(yn)
yn.add("D15")
yn.add("D19")
check_colours(th, "F5:F20")

# Price impact calculator: what a yuan or peso move does to the DOLLAR cost of an order
cell(th, "A22", "BrightLeaf price-impact calculator (uses YOUR live CNY and MXN rates from questions 8 and 9)", TITLE_FILL, bold=True)  # a title banner on an activity sheet, not inside a data table
calc = [
    ("Item", "BL-1005 Pallet Jack Wheels (set), Global Lift Parts, Shenzhen (bills in CNY)",
     "BL-1004 Industrial Safety Gloves (pair), SafeHands Co., Monterrey (bills in MXN)", None),
    ("Quantity ordered", 60, 780, INPUT),
    ("Unit cost today (USD)", 38, 2.40, GIVEN),
    ("Order value today (USD)", "=C24*C25", "=D24*D25", CALC),
    ("Your live rate: 1 USD = ? (from Q8 / Q9)", '=IF($D$13="","enter Q8 first",$D$13)', '=IF($D$14="","enter Q9 first",$D$14)', CALC),
    ("Supplier's invoice in its own currency", '=IF(ISNUMBER(C27),C26*C27,"")', '=IF(ISNUMBER(D27),D26*D27,"")', CALC),
    ("If the supplier's currency STRENGTHENS by (%)", 3, 2, INPUT),
    ("New rate (fewer yuan / pesos per dollar)", '=IF(ISNUMBER(C27),C27/(1+C29/100),"")', '=IF(ISNUMBER(D27),D27/(1+D29/100),"")', CALC),
    ("Same invoice, new cost in USD", '=IF(ISNUMBER(C30),C28/C30,"")', '=IF(ISNUMBER(D30),D28/D30,"")', CALC),
    ("Extra cost in USD, nobody changed the price", '=IF(ISNUMBER(C31),C31-C26,"")', '=IF(ISNUMBER(D31),D31-D26,"")', CALC),
]
for i, (lab, v1, v2, fill) in enumerate(calc, start=23):
    cell(th, f"B{i}", lab, GIVEN, bold=True)
    for col, val in (("C", v1), ("D", v2)):
        c = cell(th, f"{col}{i}", val, fill if fill else GIVEN)
        if i in (25, 26, 31, 32):
            c.number_format = '"$"#,##0.00'
        if i in (27, 30):
            c.number_format = '0.0000'
        if i == 28:
            c.number_format = '#,##0.00'
th["B33"] = ("Test day (17 Nov 2026): 1 USD = 6.6661 CNY and 18.4639 MXN. A month earlier (16 Oct) it was 6.6862 CNY and 18.3835 MXN. "
             "Small moves, but on every import order they add up.")
th["B33"].font = Font(italic=True, color="595959")

# ---------------------------------------------------------------- Decode JSON
dj = wb.create_sheet("Decode_JSON", 2)
title(dj, "Decode the JSON: a stormy week in Shenzhen",
      "Saved response from Open-Meteo for Global Lift Parts & Shenzhen BrightTech (sample data). Read it like a labelled shopping list.")
dj.column_dimensions["A"].width = 4
json_lines = [
    '{',
    '  "latitude": 22.53, "longitude": 114.08, "timezone": "Asia/Shanghai",',
    '  "daily_units": { "time": "iso8601", "precipitation_sum": "mm", "wind_speed_10m_max": "km/h" },',
    '  "daily": {',
    '    "time":               ["2026-09-14","2026-09-15","2026-09-16","2026-09-17","2026-09-18","2026-09-19","2026-09-20"],',
    '    "precipitation_sum":  [2.1, 18.4, 86.2, 132.7, 41.5, 6.0, 0.0],',
    '    "wind_speed_10m_max": [14.2, 27.9, 58.3, 74.6, 39.1, 18.8, 12.5]',
    '  }',
    '}',
]
dj["B3"] = "Step 1: read the JSON response below. Step 2: fill the yellow table. The lists line up like Excel columns: date 1 ↔ rain 1 ↔ wind 1."
dj["B3"].font = Font(bold=True)
for i, line in enumerate(json_lines, start=4):
    c = dj.cell(row=i, column=2, value=line)
    c.font = Font(name="Consolas", size=10, color="A31F34")
dj["B14"] = "Risk rules Stocky uses: rain ≥ 50 mm = HIGH, ≥ 20 mm = MEDIUM. Wind ≥ 60 km/h = HIGH, ≥ 40 km/h = MEDIUM."
dj["B14"].font = Font(italic=True)

header_row = 16
for col, w in zip("BCDEFGHI", [14, 14, 14, 12, 16, 16, 16, 30]):
    dj.column_dimensions[col].width = w
labels = ["Day #", "Date (time)", "Rain (mm)", "Wind (km/h)", "Check date", "Check rain", "Check wind", "Stocky's risk level"]
for i, lab in enumerate(labels, start=2):
    c = dj.cell(row=header_row, column=i, value=lab)
    c.fill, c.font, c.border = HEAD, WHITE_B, BOX
dj.freeze_panes = "A17"
key_dates = ["2026-09-14", "2026-09-15", "2026-09-16", "2026-09-17", "2026-09-18", "2026-09-19", "2026-09-20"]
key_rain = [2.1, 18.4, 86.2, 132.7, 41.5, 6.0, 0.0]
key_wind = [14.2, 27.9, 58.3, 74.6, 39.1, 18.8, 12.5]
lists["G1"], lists["H1"], lists["I1"] = "key_date", "key_rain", "key_wind"
for i in range(7):
    r = header_row + 1 + i
    lists.cell(row=2 + i, column=7, value=key_dates[i])
    lists.cell(row=2 + i, column=8, value=key_rain[i])
    lists.cell(row=2 + i, column=9, value=key_wind[i])
    cell(dj, f"B{r}", i + 1, GIVEN)
    for col in "CDE":
        cell(dj, f"{col}{r}", None, INPUT)
    k = 2 + i
    cell(dj, f"F{r}", f'=IF(C{r}="","",IF(IF(ISNUMBER(C{r}),TEXT(C{r},"yyyy-mm-dd"),TRIM(C{r}))=Lists!G{k},"✔","✖ check"))', CALC)
    cell(dj, f"G{r}", f'=IF(D{r}="","",IF(D{r}=Lists!H{k},"✔","✖ check"))', CALC)
    cell(dj, f"H{r}", f'=IF(E{r}="","",IF(E{r}=Lists!I{k},"✔","✖ check"))', CALC)
    cell(dj, f"I{r}",
         f'=IF(OR(D{r}="",E{r}=""),"",IF(OR(D{r}>=50,E{r}>=60),"HIGH: warn Sarah",'
         f'IF(OR(D{r}>=20,E{r}>=40),"MEDIUM: keep an eye","LOW")))', CALC)
    dj[f"C{r}"].number_format = "@"   # store the date exactly as the JSON writes it
check_colours(dj, "F17:H23")
dj.conditional_formatting.add("I17:I23", FormulaRule(formula=['LEFT(I17,4)="HIGH"'], fill=BAD))
dj.conditional_formatting.add("I17:I23", FormulaRule(formula=['LEFT(I17,6)="MEDIUM"'], fill=INPUT))
dj["B24"] = "Total rain this week (mm):"
dj["B24"].font = Font(bold=True)
cell(dj, "D24", "=SUM(D17:D23)", CALC)
dj["B25"] = "Tip: type the date exactly as it appears inside the quotes, e.g. 2026-09-14."
dj["B25"].font = Font(italic=True, color="595959")
dj["B27"] = "Questions (answer in yellow):"
dj["B27"].font = Font(bold=True)
qrows = [
    ("Which unit is wind speed in?", "km/h"),
    ("On which date should Stocky warn Sarah first? (yyyy-mm-dd)", "2026-09-16"),
]
for i, (q, a) in enumerate(qrows, start=28):
    cell(dj, f"B{i}", q, GIVEN, wrap=False)
    cell(dj, f"F{i}", None, INPUT)
    dj[f"F{i}"].number_format = "@"
    cell(dj, f"G{i}", f'=IF(F{i}="","",IF(IF(ISNUMBER(F{i}),TEXT(F{i},"yyyy-mm-dd"),TRIM(F{i}))="{a}","✔ Correct","✖ Try again"))', CALC)
check_colours(dj, "G28:G29")

# ---------------------------------------------------------------- Status Codes
sc = wb.create_sheet("Status_Codes", 3)
title(sc, "Status codes: read the receipt", "Pick the meaning for each code from the dropdown. 2xx = good news, 4xx = your order's problem, 5xx = their kitchen's problem.")
header(sc, 4, ["Code", "Where you might meet it at BrightLeaf", "Meaning (choose)", "Check"], [8, 60, 62, 18])
codes = [
    (200, "Stocky asks Open-Meteo for Shenzhen's forecast and gets it", 0),
    (404, "Sarah types .../v1/forecst (missing an 'a')", 6),
    (401, "Stocky uses an Odoo API key that Sarah cancelled last week", 4),
    (429, "A test workflow asks the currency API 2,000 times in one minute", 7),
    (500, "The supplier portal is down for maintenance", 8),
    (400, "Asking Open-Meteo for daily=banana", 3),
    (201, "Stocky submits a new draft purchase order and it is created", 1),
    (301, "frankfurter.app forwards you to frankfurter.dev", 2),
    (403, "Stocky's key works, but it tries to open the Accounting records it isn't allowed to see", 5),
]
dv = DataValidation(type="list", formula1="=Lists!$A$2:$A$10", allow_blank=True)
sc.add_data_validation(dv)
for i, (code, where, k) in enumerate(codes, start=5):
    cell(sc, f"A{i}", code, GIVEN, bold=True)
    cell(sc, f"B{i}", where, GIVEN)
    cell(sc, f"C{i}", None, INPUT)
    dv.add(f"C{i}")
    cell(sc, f"D{i}", f'=IF(C{i}="","",IF(C{i}=Lists!A{k + 2},"✔ Correct","✖ Try again"))', CALC)
    sc.row_dimensions[i].height = 30
check_colours(sc, "D5:D13")
cell(sc, "B15", "Score (of 9):", GIVEN, bold=True)
cell(sc, "C15", '=COUNTIF(D5:D13,"✔*")', CALC, bold=True)

# ---------------------------------------------------------------- GET or POST
gp = wb.create_sheet("GET_or_POST", 4)
title(gp, "GET (asking) or POST (submitting)?", "Asking never changes anything. Submitting creates or changes something, so important POSTs need Sarah's approval.")
header(gp, 4, ["#", "What Stocky does", "GET or POST?", "Check", "Needs Sarah's approval? (your view)"], [5, 70, 14, 16, 34])
tasks = [
    ("Read the on-hand quantity of BL-1004 Industrial Safety Gloves", "GET"),
    ("Create a draft purchase order for 1,820 corrugated boxes (BL-1002) from PackRight Industries", "POST"),
    ("Check this week's rainfall forecast in Monterrey", "GET"),
    ("Look up today's USD to CNY exchange rate", "GET"),
    ("Send a delivery reminder email to Global Lift Parts", "POST"),
    ("List all products below their reorder point", "GET"),
    ("Add a new row to the Stock Log in Google Sheets", "POST"),
    ("Fetch the next public holidays in Mexico", "GET"),
    ("Change the reorder point of BL-1006 Packing Tape from 1,000 to 1,200", "POST"),
    ("Read the lead time of Gulf Lubricants' hydraulic oil (BL-1007)", "GET"),
]
gdv = DataValidation(type="list", formula1="=Lists!$E$2:$E$3", allow_blank=True)
ydv = DataValidation(type="list", formula1="=Lists!$C$2:$C$3", allow_blank=True)
gp.add_data_validation(gdv)
gp.add_data_validation(ydv)
for i, (t, a) in enumerate(tasks, start=5):
    cell(gp, f"A{i}", i - 4, GIVEN)
    cell(gp, f"B{i}", t, GIVEN)
    cell(gp, f"C{i}", None, INPUT)
    gdv.add(f"C{i}")
    cell(gp, f"D{i}", f'=IF(C{i}="","",IF(C{i}="{a}","✔ Correct","✖ Try again"))', CALC)
    cell(gp, f"E{i}", None, INPUT)
    ydv.add(f"E{i}")
check_colours(gp, "D5:D14")
cell(gp, "B16", "Score (of 10):", GIVEN, bold=True)
cell(gp, "C16", '=COUNTIF(D5:D14,"✔*")', CALC, bold=True)

# ---------------------------------------------------------------- My Suppliers
ms = wb.create_sheet("My_Suppliers", 5)
title(ms, "Now try it with your company: build your own API links",
      "Fill the yellow cells for 3–5 of YOUR suppliers. The blue cells build clickable API links automatically. First 3 rows are BrightLeaf examples.")
header(ms, 4, ["Supplier", "City", "Latitude", "Longitude", "Currency code", "Country code",
               "Weather link (click)", "Currency link (click)", "Holiday link (click)", "What would you watch for?"],
       [24, 14, 11, 11, 11, 11, 22, 22, 22, 40])
examples = [
    ("Global Lift Parts", "Shenzhen", 22.54, 114.06, "CNY", "CN", "Typhoon rain delaying BL-1005 wheels (21-day lead time)"),
    ("Gulf Lubricants", "Dubai", 25.20, 55.27, "AED", "AE", "Sandstorm wind; Eid and UAE National Day (2–3 Dec). Holiday link comes back empty: keep a written list"),
    ("SafeHands Co.", "Monterrey", 25.69, -100.32, "MXN", "MX", "Hurricane-season rain (Jun–Nov); peso moves on BL-1004 gloves; Christmas closures"),
]
for r in range(5, 13):
    ex = examples[r - 5] if r - 5 < len(examples) else None
    for j, col in enumerate("ABCDEF"):
        cell(ms, f"{col}{r}", ex[j] if ex else None, GIVEN if ex else INPUT)
    cell(ms, f"J{r}", ex[6] if ex else None, GIVEN if ex else INPUT)
    cell(ms, f"G{r}",
         f'=IF(OR(C{r}="",D{r}=""),"",HYPERLINK("https://api.open-meteo.com/v1/forecast?latitude="&C{r}&"&longitude="&D{r}'
         f'&"&daily=precipitation_sum,wind_speed_10m_max&timezone=auto","Weather: "&B{r}))', CALC)
    cell(ms, f"H{r}",
         f'=IF(E{r}="","",HYPERLINK("https://api.frankfurter.dev/v1/latest?from=USD&to="&E{r},"USD to "&E{r}))', CALC)
    cell(ms, f"I{r}",
         f'=IF(F{r}="","",HYPERLINK("https://date.nager.at/api/v3/NextPublicHolidays/"&F{r},"Holidays: "&F{r}))', CALC)
ms["A14"] = ("Notes: currency codes are 3 letters (CNY, MXN, AED, EUR, CAD, JPY...). Country codes are 2 letters (US, MX, CN, AE, CA...). "
             "If a currency (like AED) or a holiday list (like AE) doesn't come back, the API's kitchen doesn't stock it. That's a finding, not a failure!")
ms.row_dimensions[14].height = 30

lists.sheet_state = "hidden"
wb.move_sheet("Lists", offset=len(wb.sheetnames))
wb.active = 0
for ws in wb.worksheets:
    ws.sheet_view.zoomScale = 110
wb.save(OUT)
print("saved", OUT)
