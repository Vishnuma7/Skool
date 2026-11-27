"""Builds V01_Activity_Agent_or_Not.xlsx (run with the course venv python)."""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import CellIsRule, FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

OUT = Path(__file__).resolve().parent.parent / "V01_Activity_Agent_or_Not.xlsx"

NAVY = "1F2A44"
ORANGE = "FDE9C9"
BLUE = "D7ECFB"
YELLOW = "FFF4B3"
GREEN = "D9F2D9"
RED = "F8D7DA"
GREY = "F2F2F2"
thin = Side(style="thin", color="BFBFBF")
BORDER = Border(left=thin, right=thin, top=thin, bottom=thin)
WRAP = Alignment(wrap_text=True, vertical="top")


def fill(c):
    return PatternFill("solid", start_color=c, end_color=c)


def header(ws, row, values, widths=None):
    for i, v in enumerate(values, start=1):
        c = ws.cell(row=row, column=i, value=v)
        c.font = Font(bold=True, color="FFFFFF")
        c.fill = fill(NAVY)
        c.alignment = Alignment(wrap_text=True, vertical="center", horizontal="center")
        c.border = BORDER
    if widths:
        for i, w in enumerate(widths, start=1):
            ws.column_dimensions[ws.cell(row=1, column=i).column_letter].width = w


def title(ws, text, sub=None):
    ws["A1"] = text
    ws["A1"].font = Font(bold=True, size=16, color=NAVY)
    if sub:
        ws["A2"] = sub
        ws["A2"].font = Font(italic=True, color="595959")


TASKS = [
    ("Every night, copy yesterday's sales orders from Odoo into a Google Sheet.", "Automation",
     "Same steps every time, clear rule, no judgement. An agent would be overkill."),
    ("Read 40 supplier emails a week and work out which shipments are delayed and what that means for next week's stock.", "AI Agent",
     "Every email is worded differently and the answer must be linked to stock data: reading + judgement + tools."),
    ("Help Sarah rewrite a polite but firm email to a late supplier.", "Chatbot",
     "One-off writing help, no company data needed, and Sarah reads it before sending."),
    ("Send Tom an email every time a receipt is validated in Odoo.", "Automation",
     "A trigger (doorbell) plus one fixed action. No thinking required."),
    ("Every Monday, check all 10 products against reorder points, consider supplier risk (weather, holidays, currency) and suggest what to order, with reasons.", "AI Agent",
     "This is Stocky's core job: several tools, weighing several factors, explaining a recommendation."),
    ("Explain the difference between FOB and CIF shipping terms to a new team member.", "Chatbot",
     "General knowledge question. No access to BrightLeaf's systems is needed."),
    ("Once a year, decide whether to switch BrightLeaf's main packaging supplier after site visits and negotiation.", "Not worth automating",
     "Rare, high-stakes, relationship-heavy. AI can help research, but the decision stays human."),
    ("Convert the Mexican supplier's peso (MXN) price list into US dollars every morning using the published exchange rate.", "Automation",
     "Fetch a number, multiply, save. A recipe card does this perfectly."),
    ("Read supplier quotations (PDFs in different layouts) and compare price, lead time and payment terms in one table.", "AI Agent",
     "Messy, differently formatted documents need reading and judgement before they can be compared."),
    ("Brainstorm 10 ideas to reduce packaging waste in the warehouse.", "Chatbot",
     "Creative thinking help. No systems or actions involved."),
    ("Approve a one-off USD 40,000 order for new warehouse racking.", "Not worth automating",
     "Happens once, big money, needs human sign-off. Don't automate the manager's signature."),
    ("When a sales order over USD 5,000 is confirmed, post a message in the sales team's Slack channel.", "Automation",
     "Clear trigger, clear rule, fixed message."),
    ("Answer the warehouse team's questions like 'Do we have enough stretch wrap for Friday's Toronto order?' using live Odoo data.", "AI Agent",
     "Questions arrive in any wording; the agent must understand them and look up live data with a tool."),
    ("Summarise a 30-page supplier contract you paste in, so you can read the key points quickly.", "Chatbot",
     "You provide the text and read the answer yourself. A chatbot is enough."),
    ("Every Friday, export the stock Moves History and save it to a shared folder.", "Automation",
     "Repeated, identical steps on a schedule."),
    ("Watch for storms or port strikes near supplier cities and flag which open purchase orders might be affected.", "AI Agent",
     "Combines outside data with ERP data and needs judgement about what is 'affected'."),
    ("Handle a sensitive phone call with a key customer whose order was delayed.", "Not worth automating",
     "Relationships and empathy. Keep this human (AI can help you prepare notes)."),
    ("Turn your bullet notes into an agenda for next week's S&OP meeting.", "Chatbot",
     "Simple writing help from text you provide."),
    ("Mark an RFQ as 'late' in a tracking sheet when its expected date passes with no receipt.", "Automation",
     "A date comparison: if today > expected date and not received, then mark late."),
    ("Each month, review slow-moving stock and sales history, then suggest which items to discount, return or stop buying, with reasons.", "AI Agent",
     "Needs data from tools, weighing trade-offs, and a clear written explanation."),
]
OPTIONS = ["Chatbot", "Automation", "AI Agent", "Not worth automating"]

wb = Workbook()

# ---------- Instructions ----------
ws = wb.active
ws.title = "Instructions"
title(ws, "Video 1 Activity: Agent or Not? + My Automation Wishlist",
      "The ERP Agent Blueprint | Time needed: 25-35 minutes | No technical skills needed")
rows = [
    ("WHAT YOU'LL DO", ""),
    ("Part 1: Agent or Not?", "Sort 20 real BrightLeaf tasks into Chatbot, Automation, AI Agent or Not worth automating. The sheet checks your answers."),
    ("Part 2: Sarah's Example", "See how Sarah's 12 hours a week add up to 576 hours a year. Use it as a model."),
    ("Part 3: My Wishlist", "Now try it with your company: list your own repetitive tasks. The workbook calculates hours per year and ranks your best candidates."),
    ("", ""),
    ("STEP BY STEP", ""),
    ("Step 1", "Go to the 'Agent_or_Not' sheet. For each task, choose an answer from the dropdown in the yellow column (C)."),
    ("Step 2", "In column D, write one short reason. Ask yourself: Is it the same every time? Does it need judgement? Does it need company data or actions?"),
    ("Step 3", "Column E tells you if you matched the answer key. Your score appears at the top. Only open the 'Answer_Key' sheet after you've tried all 20."),
    ("Step 4", "Read 'Sarah_Example'. Notice the formulas: hours each time x times per year = hours per year."),
    ("Step 5", "Go to 'My_Wishlist'. Fill in the yellow cells only (task, frequency, hours, systems, judgement, best fit, pain level). Grey cells calculate themselves."),
    ("Step 6", "Look at your Rank column. Your number 1 task is a great candidate for your capstone project in Video 10. Keep this file."),
    ("", ""),
    ("THE QUICK TEST", ""),
    ("Chatbot", "A brain that talks. You give it the text, you read the answer. No access to your systems."),
    ("Automation", "A recipe card. Same steps, same order, every time. Great for clear rules."),
    ("AI Agent", "A smart new intern. Reads, thinks, uses tools and acts toward a goal, with instructions and supervision."),
    ("Not worth automating", "Rare, high-stakes or relationship-heavy work. Keep it human (AI can still help you prepare)."),
    ("", ""),
    ("COLOUR KEY", ""),
    ("Yellow cells", "You type or choose here."),
    ("Grey cells", "Formulas. Don't type over them."),
]
for i, (a, b) in enumerate(rows, start=4):
    ws.cell(row=i, column=1, value=a)
    ws.cell(row=i, column=2, value=b).alignment = WRAP
    if b == "" and a:
        ws.cell(row=i, column=1).font = Font(bold=True, color="FFFFFF")
        ws.cell(row=i, column=1).fill = fill(NAVY)
        ws.cell(row=i, column=2).fill = fill(NAVY)
    elif a:
        ws.cell(row=i, column=1).font = Font(bold=True)
ws["A24"].fill = fill(YELLOW)
ws["A25"].fill = fill(GREY)
ws.column_dimensions["A"].width = 26
ws.column_dimensions["B"].width = 110

# ---------- Agent_or_Not ----------
ws = wb.create_sheet("Agent_or_Not")
title(ws, "Part 1: Agent or Not? Sort 20 BrightLeaf tasks")
ws["A3"] = "Your score:"
ws["A3"].font = Font(bold=True)
first, last = 6, 5 + len(TASKS)
ws["B3"] = f'=COUNTIF(E{first}:E{last},"Correct")&" / 20 correct"'
ws["B3"].font = Font(bold=True, size=13, color="2E7D32")
ws["C3"] = f'=COUNTA(C{first}:C{last})&" of 20 answered"'
header(ws, 5, ["#", "Task at BrightLeaf", "Your answer (choose)", "Your reason (1 line)", "Check"])
for w, col in zip([5, 70, 24, 50, 14], "ABCDE"):
    ws.column_dimensions[col].width = w
dv = DataValidation(type="list", formula1='"' + ",".join(OPTIONS) + '"', allow_blank=True)
ws.add_data_validation(dv)
for n, (task, ans, why) in enumerate(TASKS, start=1):
    r = 5 + n
    ws.cell(row=r, column=1, value=n)
    ws.cell(row=r, column=2, value=task).alignment = WRAP
    c = ws.cell(row=r, column=3)
    c.fill = fill(YELLOW)
    dv.add(c)
    ws.cell(row=r, column=4).fill = fill(YELLOW)
    ws.cell(row=r, column=4).alignment = WRAP
    ws.cell(row=r, column=5, value=f'=IF(C{r}="","",IF(C{r}=Answer_Key!C{r},"Correct","Try again"))').fill = fill(GREY)
    for col in range(1, 6):
        ws.cell(row=r, column=col).border = BORDER
    ws.row_dimensions[r].height = 32
ws.conditional_formatting.add(f"E{first}:E{last}", CellIsRule(operator="equal", formula=['"Correct"'], fill=fill(GREEN)))
ws.conditional_formatting.add(f"E{first}:E{last}", CellIsRule(operator="equal", formula=['"Try again"'], fill=fill(RED)))
ws.freeze_panes = "C6"

# ---------- Answer_Key ----------
ws = wb.create_sheet("Answer_Key")
title(ws, "Answer Key (try all 20 first!)")
header(ws, 5, ["#", "Task", "Best fit", "Why"])
for w, col in zip([5, 70, 22, 80], "ABCD"):
    ws.column_dimensions[col].width = w
colour = {"Chatbot": BLUE, "Automation": GREEN, "AI Agent": ORANGE, "Not worth automating": GREY}
for n, (task, ans, why) in enumerate(TASKS, start=1):
    r = 5 + n
    ws.cell(row=r, column=1, value=n)
    ws.cell(row=r, column=2, value=task).alignment = WRAP
    c = ws.cell(row=r, column=3, value=ans)
    c.fill = fill(colour[ans])
    c.font = Font(bold=True)
    ws.cell(row=r, column=4, value=why).alignment = WRAP
    for col in range(1, 5):
        ws.cell(row=r, column=col).border = BORDER
    ws.row_dimensions[r].height = 32
ws.freeze_panes = "A6"

# ---------- shared wishlist builder ----------
FREQ = ["Daily", "Weekly", "Monthly", "Quarterly"]
JUDGE = ["No", "Some", "Yes"]
PAIN = ["1", "2", "3", "4", "5"]
COLS = ["#", "Task (what do you do?)", "Who does it", "How often", "Hours each time",
        "Times per year", "Hours per year", "Systems / data used", "Needs judgement?",
        "Best fit", "Pain level (1-5)", "Priority score", "Rank"]
WIDTHS = [5, 46, 14, 12, 12, 12, 12, 30, 14, 22, 12, 12, 8]


def wishlist(ws, rows, n_blank, ttl, sub):
    title(ws, ttl, sub)
    header(ws, 5, COLS)
    for w, i in zip(WIDTHS, range(1, 14)):
        ws.column_dimensions[ws.cell(row=5, column=i).column_letter].width = w
    dvs = {
        4: DataValidation(type="list", formula1='"' + ",".join(FREQ) + '"', allow_blank=True),
        9: DataValidation(type="list", formula1='"' + ",".join(JUDGE) + '"', allow_blank=True),
        10: DataValidation(type="list", formula1='"' + ",".join(OPTIONS) + '"', allow_blank=True),
        11: DataValidation(type="whole", operator="between", formula1="1", formula2="5", allow_blank=True),
    }
    num = DataValidation(type="decimal", operator="between", formula1="0", formula2="100", allow_blank=True)
    for d in list(dvs.values()) + [num]:
        ws.add_data_validation(d)
    data = list(rows) + [None] * n_blank
    first = 6
    last = first + len(data) - 1
    for k, item in enumerate(data):
        r = first + k
        ws.cell(row=r, column=1, value=k + 1)
        if item:
            task, who, freq, hrs, systems, judge, fit, pain = item
            vals = {2: task, 3: who, 4: freq, 5: hrs, 8: systems, 9: judge, 10: fit, 11: pain}
            for col, v in vals.items():
                ws.cell(row=r, column=col, value=v)
        for col in (2, 3, 4, 5, 8, 9, 10, 11):
            ws.cell(row=r, column=col).fill = fill(YELLOW)
            ws.cell(row=r, column=col).alignment = WRAP
        for col, d in dvs.items():
            d.add(ws.cell(row=r, column=col))
        num.add(ws.cell(row=r, column=5))
        ws.cell(row=r, column=6, value=f'=IF(D{r}="","",IF(D{r}="Daily",240,IF(D{r}="Weekly",48,IF(D{r}="Monthly",12,4))))')
        ws.cell(row=r, column=7, value=f'=IF(OR(E{r}="",F{r}=""),"",E{r}*F{r})')
        ws.cell(row=r, column=12, value=f'=IF(OR(G{r}="",K{r}=""),"",ROUND(G{r}*K{r}/5,0))')
        ws.cell(row=r, column=13, value=f'=IF(L{r}="","",RANK(L{r},$L${first}:$L${last}))')
        for col in (1, 6, 7, 12, 13):
            ws.cell(row=r, column=col).fill = fill(GREY)
        for col in range(1, 14):
            ws.cell(row=r, column=col).border = BORDER
    t = last + 2
    summary = [
        ("Total hours per week", f"=SUM(G{first}:G{last})/48"),
        ("Total hours per year", f"=SUM(G{first}:G{last})"),
        ("= Working weeks per year (40 h)", f"=ROUND(SUM(G{first}:G{last})/40,1)"),
        ("Tasks that look like an AI Agent job", f'=COUNTIF(J{first}:J{last},"AI Agent")'),
        ("Your #1 candidate", f'=IFERROR(INDEX(B{first}:B{last},MATCH(1,M{first}:M{last},0)),"Fill in some tasks")'),
    ]
    for i, (label, f) in enumerate(summary):
        a = ws.cell(row=t + i, column=2, value=label)
        a.font = Font(bold=True)
        a.alignment = Alignment(horizontal="right")
        b = ws.cell(row=t + i, column=3, value=f)
        b.font = Font(bold=True, color=NAVY, size=12)
        b.fill = fill(ORANGE)
        ws.merge_cells(start_row=t + i, start_column=3, end_row=t + i, end_column=8)
    ws.cell(row=t, column=3).number_format = "0.0"
    ws.conditional_formatting.add(f"M{first}:M{last}", CellIsRule(operator="between", formula=["1", "3"], fill=fill(GREEN), font=Font(bold=True)))
    ws.conditional_formatting.add(f"J{first}:J{last}", FormulaRule(formula=[f'J{first}="AI Agent"'], fill=fill(ORANGE)))
    ws.freeze_panes = "C6"


SARAH = [
    ("Copy stock numbers from Odoo into the Excel stock sheet", "Sarah", "Weekly", 3, "Odoo Inventory, Excel", "No", "Automation", 4),
    ("Build the Monday stock report for Mr. Harrison", "Sarah", "Weekly", 2.5, "Odoo, Excel, Email", "Some", "AI Agent", 5),
    ("Chase suppliers on email for delivery dates", "Sarah", "Daily", 0.5, "Email, Odoo Purchase", "Yes", "AI Agent", 4),
    ("Check what's below reorder point and draft RFQs", "Sarah", "Weekly", 2, "Odoo Inventory + Purchase", "Some", "AI Agent", 5),
    ("Update exchange rates in the landed-cost sheet", "Sarah", "Weekly", 1, "Bank website, Excel", "No", "Automation", 2),
    ("Answer 'do we have stock?' questions from sales", "Sarah", "Daily", 0.2, "Odoo Inventory, phone, chat", "Some", "AI Agent", 3),
]
wishlist(wb.create_sheet("Sarah_Example"), SARAH, 0,
         "Part 2: Sarah's Example (BrightLeaf Supplies)",
         "Sarah's 12 hours a week. Change any yellow cell to see the formulas react.")
wishlist(wb.create_sheet("My_Wishlist"), [], 15,
         "Part 3: My Automation Wishlist (now try it with your company)",
         "List every repetitive task in your week, even small ones. Fill yellow cells; grey cells calculate. Priority = hours per year x pain / 5.")

wb.save(OUT)
print("saved", OUT)
