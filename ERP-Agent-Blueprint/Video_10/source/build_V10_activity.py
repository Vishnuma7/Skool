"""Build V10_Activity_GoLive_Checklist_ROI.xlsx (run with the course venv python)."""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import CellIsRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

OUT = Path(__file__).resolve().parent.parent / "V10_Activity_GoLive_Checklist_ROI.xlsx"

NAVY = "1F2A44"
HEAD = PatternFill("solid", fgColor=NAVY)
GREEN = PatternFill("solid", fgColor="E2F0D9")
YELLOW = PatternFill("solid", fgColor="FFF4B3")
GREY = PatternFill("solid", fgColor="F2F2F2")
RED = PatternFill("solid", fgColor="F8D7DA")
AMBER = PatternFill("solid", fgColor="FCE4C4")
WHITE_B = Font(bold=True, color="FFFFFF")
BOLD = Font(bold=True)
TITLE = Font(bold=True, size=16, color=NAVY)
SUB = Font(bold=True, size=12, color=NAVY)
thin = Side(style="thin", color="BFBFBF")
BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
WRAP = Alignment(wrap_text=True, vertical="top")


def header(ws, row, values, start_col=1):
    for i, v in enumerate(values, start=start_col):
        c = ws.cell(row=row, column=i, value=v)
        c.fill, c.font, c.border = HEAD, WHITE_B, BOX
        c.alignment = Alignment(wrap_text=True, vertical="center")


def widths(ws, mapping):
    for col, w in mapping.items():
        ws.column_dimensions[col].width = w


wb = Workbook()

# ------------------------------------------------------------ Instructions
ws = wb.active
ws.title = "Instructions"
widths(ws, {"A": 4, "B": 110})
lines = [
    ("Video 10 Activity: Go-Live Safety Checklist + ROI Calculator", TITLE),
    ("The ERP Agent Blueprint | BrightLeaf Supplies | Time needed: about 30 minutes", None),
    ("", None),
    ("WHAT THIS FILE IS", SUB),
    ("Everything you need to switch your agent on safely and prove it's worth it. BrightLeaf's numbers are filled in as an example.", None),
    ("Yellow cells = you type or choose. Green cells = formulas that update themselves. You can't break anything here.", None),
    ("", None),
    ("TASKS", SUB),
    ("Task 1 (10 min) 'GoLive_Checklist': BrightLeaf is at 72% ready. Set item 17 to 'Done' and watch it reach 76%. Then reset every status and fill it in for YOUR agent.", None),
    ("               Rule: don't activate anything until readiness is 90%+ AND 'Open MUST items' shows 0.", None),
    ("Task 2 (5 min) 'Monthly_Cost_Estimator': change the runs per month to match your agent. How close are you to your spend limit?", None),
    ("Task 3 (5 min) 'ROI_Calculator': replace Sarah's numbers (12 h before, 2 h after, $20/h) with yours. Write down your ROI multiple.", None),
    ("Task 4 (5 min) 'Weekly_Maintenance': put the 10-minute Friday check in your calendar. Try week 1 this Friday.", None),
    ("Task 5 (10 min) 'One_Page_Pitch': write your 5-section pitch for your boss using your ROI and cost numbers.", None),
    ("", None),
    ("NOW TRY IT WITH YOUR COMPANY", SUB),
    ("Every sheet works for any agent, not just Stocky. Your capstone brief (V10_Activity_Capstone_Brief.docx) asks for the ROI and safety numbers from this file.", None),
    ("", None),
    ("STATUS MEANINGS", SUB),
    ("Not started = nothing done yet | In progress = started, not finished | Done = finished and tested | N/A = genuinely doesn't apply (it's removed from the %).", None),
]
for i, (text, font) in enumerate(lines, start=1):
    c = ws.cell(row=i, column=2, value=text)
    c.alignment = WRAP
    if font:
        c.font = font

# ------------------------------------------------------------ Checklist
wc = wb.create_sheet("GoLive_Checklist")
widths(wc, {"A": 5, "B": 14, "C": 62, "D": 10, "E": 15, "F": 16, "G": 40})
wc["A1"] = "Go-Live Safety Checklist: Stocky (BrightLeaf)"
wc["A1"].font = TITLE
wc["A2"] = "Go-live readiness:"
wc["A2"].font = BOLD
wc["C2"] = '=COUNTIF(E6:E30,"Done")/(COUNTA(C6:C30)-COUNTIF(E6:E30,"N/A"))'
wc["C2"].number_format = "0%"
wc["C2"].font = Font(bold=True, size=14, color=NAVY)
wc["C2"].fill = GREEN
wc["A3"] = "Open MUST items:"
wc["A3"].font = BOLD
wc["C3"] = '=COUNTIFS(D6:D30,"Must",E6:E30,"<>Done",E6:E30,"<>N/A")'
wc["C3"].font = Font(bold=True, size=14, color="A31F34")
wc["C3"].fill = GREEN
wc["D2"] = '=IF(AND(C2>=0.9,C3=0),"READY TO GO LIVE","NOT READY YET")'
wc["D2"].font = BOLD
header(wc, 5, ["#", "Area", "Checklist item", "Priority", "Status", "Owner", "Where / how (from Video 10)"])
items = [
    ("Access", "Dedicated 'Stocky Bot' user created in Odoo", "Must", "Done", "Sarah", "Settings → Users & Companies → Users → New"),
    ("Access", "Bot has ONLY Inventory: User + Purchase: User (all else blank)", "Must", "Done", "Sarah", "User form → Access Rights tab"),
    ("Access", "Purchase Order Approval above $5,000 switched on", "Should", "Done", "Sarah", "Purchase → Configuration → Settings"),
    ("Access", "Readers have Viewer access; only n8n edits the Decision Log", "Should", "Done", "Sarah", "Google Sheet → Share"),
    ("Keys", "Bot's own API key, named with purpose + date", "Must", "Done", "Sarah", "My Profile → Account Security → New API Key"),
    ("Keys", "Keys stored ONLY in n8n Credentials", "Must", "Done", "Sarah", "n8n → Credentials"),
    ("Keys", "90-day key rotation reminder in calendar", "Should", "Done", "Sarah", "New key → update n8n → test → delete old"),
    ("Keys", "No keys in emails, chats, screenshots, sheets, prompts or Looms", "Must", "Done", "Everyone", "Treat any shared key as stolen: delete it"),
    ("Costs", "Monthly AI spend limit set ($20)", "Must", "Done", "Sarah", "AI console → Settings → Limits"),
    ("Costs", "Spend alert email set ($10)", "Should", "Done", "Sarah", "AI console → Settings → Limits"),
    ("Costs", "Max Iterations = 10 on every AI Agent node", "Should", "In progress", "Sarah", "AI Agent node → Add Option"),
    ("Costs", "Monthly cost estimate done and shared", "Should", "Done", "Sarah", "Sheet 'Monthly_Cost_Estimator'"),
    ("Testing", "Test database duplicated 'For testing purposes'", "Must", "Done", "Sarah", "odoo.com → My Databases → Duplicate"),
    ("Testing", "Credentials clearly named LIVE and TEST", "Must", "Done", "Sarah", "n8n → Credentials"),
    ("Testing", "10 test questions passed (8/10 or better)", "Must", "Done", "Sarah", "Capstone brief, section A7"),
    ("Testing", "Approval flow tested for BOTH approve and reject", "Must", "Done", "Sarah", "Gmail 'Send and Wait for Response'"),
    ("Errors", "'Stocky – Error Alerts' workflow emails the owner", "Must", "In progress", "Sarah", "Error Trigger → Gmail"),
    ("Errors", "Error Workflow selected in EVERY Stocky workflow", "Must", "Not started", "Sarah", "Workflow … → Settings → Error Workflow"),
    ("Errors", "Error alert tested with a deliberate failure", "Should", "Not started", "Sarah", "Test copy, wrong key, schedule every 1 min"),
    ("Go-Live", "Backup duplicate + download of every workflow", "Must", "Done", "Sarah", "… → Duplicate, … → Download → Drive 'Stocky Backups'"),
    ("Go-Live", "Workflow time zone set (America/New_York)", "Should", "Done", "Sarah", "Workflow … → Settings → Timezone"),
    ("Go-Live", "Error Alerts activated FIRST, then other workflows", "Must", "Not started", "Sarah", "Active toggle / Publish"),
    ("Go-Live", "Boss signed off the one-page pitch", "Should", "In progress", "Mr. Harrison", "Sheet 'One_Page_Pitch'"),
    ("Maintenance", "10-minute Friday check in the calendar", "Should", "Done", "Sarah", "Sheet 'Weekly_Maintenance'"),
    ("Maintenance", "Owner AND backup person named (who fixes it if Sarah is on leave?)", "Should", "In progress", "Sarah + Tom", "Write both names here"),
]
for i, (area, item, prio, status, owner, where) in enumerate(items, start=1):
    r = 5 + i
    vals = [i, area, item, prio, status, owner, where]
    for col, v in enumerate(vals, start=1):
        c = wc.cell(row=r, column=col, value=v)
        c.border, c.alignment = BOX, WRAP
    wc.cell(row=r, column=5).fill = YELLOW
    wc.cell(row=r, column=6).fill = YELLOW
dv = DataValidation(type="list", formula1='"Not started,In progress,Done,N/A"', allow_blank=True)
wc.add_data_validation(dv)
dv.add("E6:E30")
dvp = DataValidation(type="list", formula1='"Must,Should"', allow_blank=True)
wc.add_data_validation(dvp)
dvp.add("D6:D30")
wc.conditional_formatting.add("E6:E30", CellIsRule(operator="equal", formula=['"Done"'], fill=GREEN))
wc.conditional_formatting.add("E6:E30", CellIsRule(operator="equal", formula=['"In progress"'], fill=AMBER))
wc.conditional_formatting.add("E6:E30", CellIsRule(operator="equal", formula=['"Not started"'], fill=RED))
wc.freeze_panes = "A6"

# ------------------------------------------------------------ Cost estimator
wm = wb.create_sheet("Monthly_Cost_Estimator")
widths(wm, {"A": 36, "B": 16, "C": 18, "D": 18, "E": 50})
wm["A1"] = "Monthly Cost Estimator"
wm["A1"].font = TITLE
wm["A2"] = "Prices are examples from the time of recording. Always check the current n8n and AI pricing pages."
header(wm, 4, ["Workflow", "Runs per month", "AI cost per run (USD)", "Monthly AI cost (USD)", "How we estimated runs"])
runs = [
    ("Stocky – Daily Reorder Check", 30, 0.03, "Once a day"),
    ("Stocky – Supplier Risk Check", 30, 0.03, "Once a day"),
    ("Stocky – Monday Report", 4, 0.08, "Once a week (bigger prompt = higher cost)"),
    ("Stocky – Chat (Sarah + Tom)", 150, 0.02, "About 7 questions per working day"),
    ("Stocky – Error Alerts (no AI)", 5, 0.00, "Hopefully fewer!"),
    ("(your workflow)", 0, 0.00, ""),
]
for i, (name, n, c, how) in enumerate(runs, start=5):
    wm.cell(row=i, column=1, value=name).border = BOX
    b = wm.cell(row=i, column=2, value=n)
    b.fill, b.border = YELLOW, BOX
    cc = wm.cell(row=i, column=3, value=c)
    cc.fill, cc.border, cc.number_format = YELLOW, BOX, "$#,##0.00"
    d = wm.cell(row=i, column=4, value=f"=B{i}*C{i}")
    d.fill, d.border, d.number_format = GREEN, BOX, "$#,##0.00"
    wm.cell(row=i, column=5, value=how).border = BOX
wm["A11"] = "TOTAL runs / AI cost"
wm["A11"].font = BOLD
wm["B11"] = "=SUM(B5:B10)"
wm["D11"] = "=SUM(D5:D10)"
wm["D11"].number_format = "$#,##0.00"
for c in ("B11", "D11"):
    wm[c].font, wm[c].fill = BOLD, GREEN

header(wm, 13, ["Fixed monthly costs", "USD per month", "", "", "Notes"])
fixed = [
    ("n8n Cloud starter plan", 24, "Check your plan's execution limit vs TOTAL runs above"),
    ("Google Sheets + Gmail", 0, "Free with a Google account"),
    ("Odoo 'Stocky Bot' user seat", 0, "Free on the trial; may be a paid seat on your plan: ask your Odoo admin"),
]
for i, (name, v, note) in enumerate(fixed, start=14):
    wm.cell(row=i, column=1, value=name).border = BOX
    b = wm.cell(row=i, column=2, value=v)
    b.fill, b.border, b.number_format = YELLOW, BOX, "$#,##0.00"
    wm.cell(row=i, column=5, value=note).border = BOX
wm["A17"] = "Safety buffer (10% of AI + fixed)"
wm["B17"] = "=ROUND((D11+SUM(B14:B16))*0.1,2)"
wm["A19"] = "ESTIMATED TOTAL PER MONTH"
wm["B19"] = "=D11+SUM(B14:B17)"
wm["A20"] = "Estimated total per year"
wm["B20"] = "=B19*12"
wm["A21"] = "Your AI spend limit (per month)"
wm["B21"] = 20
wm["A22"] = "AI cost as % of your spend limit"
wm["B22"] = "=D11/B21"
for c in ("B17", "B19", "B20"):
    wm[c].number_format = "$#,##0.00"
    wm[c].fill = GREEN
wm["B21"].number_format = "$#,##0.00"
wm["B21"].fill = YELLOW
wm["B22"].number_format = "0%"
wm["B22"].fill = GREEN
for c in ("A19", "B19"):
    wm[c].font = Font(bold=True, size=13, color=NAVY)
for r in range(17, 23):
    wm.cell(row=r, column=1).border = BOX
    wm.cell(row=r, column=2).border = BOX

# ------------------------------------------------------------ ROI
wr = wb.create_sheet("ROI_Calculator")
widths(wr, {"A": 52, "B": 18, "C": 60})
wr["A1"] = "ROI Calculator: is the agent worth it?"
wr["A1"].font = TITLE
wr["A2"] = "ROI = hours saved × hourly cost, compared with what the tools cost. Yellow = your inputs."
header(wr, 4, ["INPUTS", "Value", "Notes"])
inputs = [
    ("Hours per week on this work BEFORE the agent", 12, "Sarah: copying ERP data, chasing reorders, Monday report", "0"),
    ("Hours per week AFTER the agent", 2, "Approving RFQs, reading the report, Friday check", "0"),
    ("Fully loaded hourly cost (salary + benefits) (USD)", 20, "Use your own number. Ask HR or estimate: yearly cost ÷ 1,900 hours", "$#,##0.00"),
    ("Working weeks per year", 48, "After holidays and leave", "0"),
    ("Monthly tool cost (USD)", "=Monthly_Cost_Estimator!B19", "Linked to the cost estimator (you can overwrite it)", "$#,##0.00"),
    ("One-time build hours (learning + building + testing)", 30, "Optional: your own time to set it up", "0"),
]
for i, (label, v, note, fmt) in enumerate(inputs, start=5):
    wr.cell(row=i, column=1, value=label).border = BOX
    b = wr.cell(row=i, column=2, value=v)
    b.fill, b.border, b.number_format = YELLOW, BOX, fmt
    wr.cell(row=i, column=3, value=note).border = BOX
header(wr, 12, ["RESULTS", "Value", "In plain English"])
outs = [
    ("Hours saved per week", "=B5-B6", "0", "Time handed back to the person every week"),
    ("Hours saved per year", "=B13*B8", "#,##0", "That's this many full working days ÷ 8"),
    ("Value of time saved per year (USD)", "=B14*B7", "$#,##0", "Hours saved × hourly cost"),
    ("Tool cost per year (USD)", "=B9*12", "$#,##0", "Monthly cost × 12"),
    ("Net benefit per year (USD)", "=B15-B16", "$#,##0", "Value minus cost"),
    ("ROI multiple (value ÷ cost)", '=IF(B16=0,"n/a",B15/B16)', '0.0"x"', "Every $1 spent returns this many dollars of time"),
    ("Weekly value of time saved (USD)", "=B13*B7", "$#,##0", ""),
    ("Weeks for the time saved to cover one month of tools", '=IF(B19=0,"n/a",B9/B19)', "0.0", "Under 1 = it pays for itself in the first week"),
    ("Weeks to pay back your one-time build time too", '=IF(B19=0,"n/a",(B10*B7+B9)/(B19-B9*12/52))', "0.0", "Including your setup hours"),
    ("Working days given back per year", "=B14/8", "0", "Great line for your pitch"),
]
for i, (label, f, fmt, note) in enumerate(outs, start=13):
    wr.cell(row=i, column=1, value=label).border = BOX
    b = wr.cell(row=i, column=2, value=f)
    b.fill, b.border, b.number_format, b.font = GREEN, BOX, fmt, BOLD
    wr.cell(row=i, column=3, value=note).border = BOX
wr["A25"] = "Pitch sentence (copy into One_Page_Pitch):"
wr["A25"].font = SUB
wr["A26"] = ('="The agent saves "&TEXT(B13,"0")&" hours a week ("&TEXT(B14,"#,##0")&" hours a year), worth $"'
             '&TEXT(B15,"#,##0")&" a year, for about $"&TEXT(B9,"#,##0")&" a month: a return of about "&TEXT(B18,"0")&"x."')
wr["A26"].alignment = WRAP
wr.merge_cells("A26:C27")
wr.row_dimensions[26].height = 30
wr["A26"].fill = GREEN

# ------------------------------------------------------------ Weekly maintenance
wk = wb.create_sheet("Weekly_Maintenance")
widths(wk, {"A": 5, "B": 52, "C": 38, "D": 12, "E": 12, "F": 12, "G": 12, "H": 40})
wk["A1"] = "The 10-Minute Friday Check"
wk["A1"].font = TITLE
wk["A2"] = "Choose OK or Issue each Friday. Any 'Issue' → write the fix in Notes."
header(wk, 4, ["#", "Check", "Where", "Week 1", "Week 2", "Week 3", "Week 4", "Notes / fix"])
checks = [
    ("Any failed runs this week?", "n8n → Executions → Status: Error"),
    ("Did the Monday Report arrive, and do the numbers match the Dashboard?", "Gmail + Google Sheet 'Dashboard'"),
    ("Skim the Decision Log for anything odd (duplicates, blanks)", "Google Sheet → Decision Log"),
    ("Spot-check 3 Stocky answers against Odoo", "Stocky – Chat + Odoo Inventory"),
    ("AI spend vs limit", "AI console → Usage"),
    ("n8n runs used vs plan limit", "n8n → Usage"),
    ("Rejected suggestions: should a rule change in the prompt?", "Decision Log, Action = Rejected"),
    ("Key rotation due? (every 90 days)", "Calendar reminder"),
]
for i, (chk, where) in enumerate(checks, start=1):
    r = 4 + i
    wk.cell(row=r, column=1, value=i).border = BOX
    c = wk.cell(row=r, column=2, value=chk)
    c.border, c.alignment = BOX, WRAP
    wk.cell(row=r, column=3, value=where).border = BOX
    for col in range(4, 8):
        x = wk.cell(row=r, column=col)
        x.fill, x.border = YELLOW, BOX
    wk.cell(row=r, column=8).border = BOX
sample = ["OK", "OK", "Issue", "OK", "OK", "OK", "Issue", "OK"]
for i, v in enumerate(sample):
    wk.cell(row=5 + i, column=4, value=v)
wk.cell(row=7, column=8, value="Week 1: Stocky suggested BL-1006 again while P00012 was in transit. Added 'check Decision Log first' rule.")
wk.cell(row=11, column=8, value="Week 1: Sarah rejected 2 tape orders (delivery coming). Rule added.")
dvm = DataValidation(type="list", formula1='"OK,Issue"', allow_blank=True)
wk.add_data_validation(dvm)
dvm.add("D5:G12")
wk.conditional_formatting.add("D5:G12", CellIsRule(operator="equal", formula=['"OK"'], fill=GREEN))
wk.conditional_formatting.add("D5:G12", CellIsRule(operator="equal", formula=['"Issue"'], fill=RED))
wk["B14"] = "Issues this month:"
wk["B14"].font = BOLD
wk["C14"] = '=COUNTIF(D5:G12,"Issue")'
wk["C14"].fill = GREEN

# ------------------------------------------------------------ One-page pitch
wp = wb.create_sheet("One_Page_Pitch")
widths(wp, {"A": 26, "B": 62, "C": 62})
wp["A1"] = "One-Page Pitch for Your Boss"
wp["A1"].font = TITLE
wp["A2"] = "Bosses don't buy AI. They buy hours back, fewer mistakes and less risk. Keep each box to 2–4 lines."
header(wp, 4, ["Section", "BrightLeaf example (Sarah → Mr. Harrison)", "Your version"])
pitch = [
    ("1. The problem", "I spend ~12 hours a week copying Odoo data, chasing reorders and building the Monday report. Reorders get missed when I'm busy (e.g. pallet jack wheels ran short in October)."),
    ("2. What the agent does", "• Checks stock every morning and drafts RFQs for my approval\n• Scores supplier risk (weather, currency, holidays)\n• Logs every decision and emails you the Monday report at 7 am"),
    ("3. The proof", "4 weeks of the Decision Log: 26 decisions, 9 RFQs, 3 duplicate suggestions blocked. Attached: last Monday's report (stock health 60%, $16,153 in stock)."),
    ("4. Cost + safety nets", "≈ $32/month. Bot has only Inventory/Purchase rights; I approve every order; Odoo approval above $5,000; $20 AI spend limit; error alerts to me; tested on a copy first."),
    ("5. The ask", "Let me run it for 3 months. I'll report hours saved each month. Expected: ~10 hours/week saved, ≈ $9,600/year of my time, ≈ 25x return."),
]
for i, (sec, ex) in enumerate(pitch, start=5):
    a = wp.cell(row=i, column=1, value=sec)
    a.font, a.border, a.alignment = BOLD, BOX, WRAP
    b = wp.cell(row=i, column=2, value=ex)
    b.fill, b.border, b.alignment = GREY, BOX, WRAP
    c = wp.cell(row=i, column=3)
    c.fill, c.border, c.alignment = YELLOW, BOX, WRAP
    wp.row_dimensions[i].height = 75

for sheet in wb.worksheets:
    sheet.sheet_view.zoomScale = 110
wb.save(OUT)
print("saved", OUT)
