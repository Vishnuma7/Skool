"""Build the Skool Classroom setup guide (HTML) for Lessons 1-2. Render to PDF with skool_guide_pdf.cjs.

Usage: .venv/bin/python ERP-Agent-Blueprint/_tools/build_skool_guide.py <out.html>
"""
import html, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
E = html.escape


def quiz(path):
    md = open(path, encoding='utf-8').read()
    qpart = md.split('## Questions', 1)[1].split('## Answer Key', 1)[0]
    apart = md.split('## Answer Key', 1)[1]
    qs = []
    for block in re.split(r'\n(?=\*\*\d+\. )', qpart.strip()):
        m = re.match(r'\*\*(\d+)\. (.+?)\*\*\s*(.*)', block, re.S)
        if not m:
            continue
        opts = [o.strip()[2:] for o in m.group(3).strip().splitlines() if o.strip().startswith('- ')]
        qs.append((m.group(1), m.group(2), opts))
    ans = re.findall(r'\*\*(\d+)\. (.+?)\*\*\s*(.+)', apart)
    return qs, [(n, a.strip(), x.strip()) for n, a, x in ans]


# ------------------------------------------------------------------ building blocks
def tag(t):
    return f'<span class="tag">{E(t)}</span>'


def h(text, level='H3'):
    return f'<div class="bh">{tag(level)}<span>{E(text)}</span></div>'


def p(text):
    return f'<p>{text}</p>'


def ul(items):
    return tag('• list') + '<ul>' + ''.join(f'<li>{i}</li>' for i in items) + '</ul>'


def ol(items):
    return tag('1. list') + '<ol>' + ''.join(f'<li>{i}</li>' for i in items) + '</ol>'


def hr():
    return f'<div class="hr">{tag("— divider")}</div>'


def b(t):
    return f'<b>{E(t)}</b>'


def skool_page(n, total, lesson, title, add, body, note=None):
    if lesson.startswith('LESSON'):
        title = f"Lesson {lesson.split()[1]} · {title}"
    adds = ''.join(f'<div class="add"><span class="addk">{E(k)}</span><span>{v}</span></div>' for k, v in add)
    nt = f'<div class="note">{note}</div>' if note else ''
    return f'''
<section class="spage">
  <div class="sphead"><span class="num">{n}</span><span class="spl">PAGE {n} OF {total} · {E(lesson)}</span></div>
  <div class="field"><div class="flabel">1 · TITLE BOX <i>(required: Skool won't save without it)</i></div><div class="title-in">{E(title)}</div></div>
  <div class="field"><div class="flabel">2 · ADD TO THE PAGE</div>{adds}</div>
  <div class="field"><div class="flabel">3 · TEXT TO PASTE <i>(under the video / at the top of the page)</i></div><div class="body">{body}</div></div>
  {nt}
  <div class="save">4 · Leave <b>Published</b> on → click <b>SAVE</b></div>
</section>'''


def quiz_body(qs, ans, nxt):
    out = [p('Answer all 10 questions first, then scroll down to check your answers. Takes about 10 minutes.'), h('Questions')]
    for n, q, opts in qs:
        out.append(f'<p class="q"><b>{n}. {E(q)}</b><br>' + '<br>'.join(E(o) for o in opts) + '</p>')
    out.append(hr())
    out.append(h('Answer key (only after you\'ve tried them all!)'))
    for n, a, x in ans:
        out.append(f'<p class="q"><b>{n}. {E(a)}</b> {E(x)}</p>')
    out.append(p(f'Got 8 or more? You\'re ready for {E(nxt)}. Fewer than 8? Re-watch the sections behind the questions you missed.'))
    return ''.join(out)


# ------------------------------------------------------------------ content
def start_here():
    L = 'START HERE'
    pages = [
        ('Welcome: How This Course Works',
         [('Video (optional)', 'Your free-lesson video, if you want one here. Otherwise text only.')],
         p('Welcome to <b>The ERP Agent Blueprint</b>. Over 10 lessons (about 4 hours) you will build a working AI agent that reads your ERP, checks outside data, writes to a database and alerts you, without writing a single line of code.')
         + h('How each lesson works')
         + ol(['<b>Watch</b> the video.', '<b>Slides & Notes</b>: download the slides and read the key terms.', '<b>Activity</b>: do the hands-on exercise (20-40 minutes).', '<b>Knowledge Check</b>: 10 quick questions.', '<b>Share Your Result</b>: post what you did in the Community.'])
         + p('Tick <b>Mark as complete</b> on each page to move your progress bar.')),
        ('Meet BrightLeaf and Stocky',
         [('Nothing to attach', '—')],
         p('Every lesson uses the same company, so you can follow along step by step.')
         + ul(['<b>BrightLeaf Supplies</b>: a distributor of industrial and packaging supplies in Columbus, Ohio, with customers across the US and Canada. It runs on Odoo.',
               '<b>Sarah Mitchell</b>, Procurement & Inventory Manager: our hero. She spends about 12 hours a week on manual ERP work.',
               '<b>Tom</b>, warehouse lead, and <b>Mr. Harrison</b>, operations director, who wants the Monday stock report.',
               '<b>Stocky</b>: the AI agent we build together to give Sarah her time back.'])),
        ('Your Free Toolkit',
         [('Nothing to attach', '—')],
         p('Every tool has a free tier or free trial. Nothing to install on your computer.')
         + ul(['<b>Lesson 2</b>: Odoo (free 15-day trial), our ERP.', '<b>Lesson 4</b>: Google Sheets, our database.',
               '<b>Lesson 5</b>: n8n Cloud (free trial) and a Claude API key (a few dollars of prepaid credit, with a spending limit).',
               '<b>Lessons 7-9</b>: Gmail for alerts and approvals.'])
         + p('Don\'t create the accounts yet. Each lesson tells you exactly when.')),
        ('How to Get Help',
         [('Nothing to attach', '—')],
         p('Stuck? That\'s normal, and you can\'t break anything in your test system.')
         + ol(['Post in the <b>Community</b> tab.', 'Start the post with the lesson and step, e.g. <b>"Lesson 2, step 10"</b>.', 'Add a <b>screenshot</b> of what you see.'])
         + p('<b>Never post an API key or password</b>, not even in a screenshot.')),
    ]
    return ''.join(skool_page(i + 1, len(pages), L, t, a, bd) for i, (t, a, bd) in enumerate(pages))


def lesson1():
    L = 'LESSON 1'
    qs, ans = quiz(os.path.join(ROOT, 'Video_01', 'source', 'V01_Quiz.md'))
    out = []
    out.append(skool_page(1, 5, L, 'Watch: Why Your ERP Needs an AI Agent',
        [('Video', 'Upload <code>Final_4K/V01_Final_4K.mp4</code> with the ▶ (video) button. Captions are already in the video.')],
        p('Sarah spends 12 hours a week copying ERP numbers, chasing suppliers and building the Monday report. That\'s 576 hours a year. In this lesson you\'ll meet Stocky, the AI agent we\'ll build together, and learn exactly what makes an agent different from a chatbot or a simple automation.')
        + h('In this video, you\'ll see:')
        + ul(['Stocky\'s Monday 7:00 AM email: 10 products checked, 4 below reorder point, and a risk warning on the pallet jack wheels',
              'The Stocky workflow in n8n, and the human "Approve" click that creates draft orders in Odoo',
              'The same question given to a chatbot, an automation and an AI agent',
              'The five parts of every agent: brain, instructions, tools, memory and a human supervisor',
              'The course map and your free toolkit'])
        + h('Key takeaways')
        + ol(['A chatbot talks, an automation follows, an agent reasons and acts.', 'Every agent = brain + instructions + tools + memory + human.', 'The goal is to give Sarah back her 576 hours, not to replace her.'])))
    out.append(skool_page(2, 5, L, 'Slides & Notes',
        [('File', 'Attach <code>Video_01/V01_Slides.pdf</code> (the PDF, not the PowerPoint).')],
        p('Download the slides to review the lesson at your own pace.')
        + h('Key terms')
        + ul(['<b>Chatbot</b>: a brain that talks. No access to your systems; you do the work.',
              '<b>Automation</b>: a recipe card. Same steps, same order, every time.',
              '<b>AI Agent</b>: a smart new intern who reads, thinks, uses tools and acts toward a goal, with instructions and supervision.',
              '<b>LLM</b> (Claude, ChatGPT): the intern\'s brain.',
              '<b>Human in the loop</b>: the manager\'s signature before the check goes out.'])))
    out.append(skool_page(3, 5, L, 'Activity: Agent or Not? + Wishlist',
        [('File', 'Attach <code>Video_01/V01_Activity_Agent_or_Not.xlsx</code>.')],
        p('<b>Time:</b> 25-35 minutes · <b>No technical skills needed.</b> Works in Excel or Google Sheets.')
        + h('Step by step')
        + ol(['Download the workbook and open the <b>Agent_or_Not</b> sheet.',
              'For each of the 20 BrightLeaf tasks, choose Chatbot, Automation, AI Agent or Not worth automating in the yellow column.',
              'Write a one-line reason for each. Ask yourself: is it the same every time? Does it need judgement? Does it need company data?',
              'Check your score at the top. Only then open the <b>Answer_Key</b> sheet.',
              'Read <b>Sarah_Example</b> to see how 12 hours a week becomes 576 hours a year.',
              'On <b>My_Wishlist</b>, list your own repetitive tasks. Fill in the yellow cells only; the grey cells calculate themselves.'])
        + p('<b>You\'re done when:</b> you have a score out of 20 and at least 5 tasks in your Wishlist. Keep the file: your #1 task is a great candidate for your capstone in Lesson 10.')))
    out.append(skool_page(4, 5, L, 'Knowledge Check', [('Link', 'Select the line starting with 👉 and use the link button (🔗) to add your Lesson 1 Google Form "share" link.')],
        p('<b>Test what you\'ve learned: 10 quick questions, about 10 minutes.</b>')
        + p('👉 <b>Start the Lesson 1 Knowledge Check</b>')
        + p('As soon as you submit, click <b>View score</b> to see your result, the correct answers and a short explanation for each question. Got 8 or more? You\'re ready for Lesson 2. Fewer than 8? Re-watch the sections behind the questions you missed and try again. You can take it as many times as you like.')
        + h('Share your score')
        + p('Post your score in the <b>Community</b> tab, for example <b>"Lesson 1 quiz: 9/10"</b>. Have a doubt about any question or answer? Send me a <b>DM</b> on Skool (the chat icon at the top of the page) and I\'ll help you out.')))
    out.append(skool_page(5, 5, L, 'Share Your Result', [('Nothing to attach', '—')],
        p('Head to the <b>Community</b> tab and post:')
        + ul(['Your <b>#1 task</b> from the Automation Wishlist', 'How many <b>hours a year</b> it takes', 'Whether it\'s a job for a <b>chatbot, an automation or an AI agent</b>, and why'])
        + p('Read two other posts and reply to one. Seeing other people\'s lists is the fastest way to spot ideas for your own company.')))
    return ''.join(out)


def lesson2():
    L = 'LESSON 2'
    qs, ans = quiz(os.path.join(ROOT, 'Video_02', 'source', 'V02_Quiz.md'))
    out = []
    out.append(skool_page(1, 5, L, 'Watch: ERP Demystified, a Tour of Odoo',
        [('Video', 'Upload <code>Final_4K/V02_Final_4K.mp4</code> with the ▶ (video) button.')],
        p('Before Stocky can read an ERP, you need to understand one. In this lesson you\'ll set up your own free Odoo, learn the three words every ERP uses (module, record and field) and load BrightLeaf\'s 10 products, stock and reorder rules. It\'s your private test system, so you can\'t break anything.')
        + h('In this video, you\'ll see:')
        + ul(['What an ERP really is: the company\'s filing cabinet plus its rulebook',
              'Creating a free Odoo trial with Inventory, Purchase and Sales',
              'A tour of the modules, and the menu pattern every Odoo app shares',
              'Creating product BL-1001 by hand, then importing 9 more in seconds',
              'Starting stock, reorder rules and the paper trail of every stock move'])
        + h('Key takeaways')
        + ol(['An ERP is the central filing cabinet + rulebook.', 'Module, record, field = drawer, folder, labelled box.', 'Your agent is only as good as your data.'])
        + p('<b>Tip:</b> keep the video and your Odoo side by side and follow along step by step.')))
    out.append(skool_page(2, 5, L, 'Slides & Notes',
        [('File', 'Attach <code>Video_02/V02_Slides.pdf</code>.')],
        p('Download the slides to review the lesson at your own pace.')
        + h('Key terms')
        + ul(['<b>ERP</b>: the company\'s central filing cabinet + rulebook.',
              '<b>Module</b>: a drawer in the cabinet (Inventory, Purchase, Sales, Contacts).',
              '<b>Record</b>: one folder in a drawer (one product, one supplier, one purchase order). In Excel: a row.',
              '<b>Field</b>: a labelled box on the form (Cost, Internal Reference). In Excel: a column.',
              '<b>SKU / Internal Reference</b>: the product code, e.g. BL-1001. Never skip it.',
              '<b>Reorder rule</b>: Min and Max. When stock drops below Min, refill up to Max.'])))
    out.append(skool_page(3, 5, L, 'Activity: Build BrightLeaf in Your Odoo',
        [('File 1', 'Attach <code>Video_02/V02_Activity_Odoo_Setup_Workbook.xlsx</code>.'),
         ('File 2', 'Attach <code>Video_02/V02_Activity_BrightLeaf_Product_Import.xlsx</code>.')],
        p('<b>Time:</b> 30-40 minutes · Keep the workbook open next to Odoo while you work.')
        + h('Step by step')
        + ol(['Download both files. Open the <b>Setup Workbook</b> and go to <b>Setup_Checklist</b>.',
              'Follow the 16 steps with Odoo open beside it. Mark each one Yes, No or Stuck.',
              'Write your <b>Odoo URL</b> and <b>database name</b> at the top of the checklist. You\'ll need them in Lesson 6.',
              'Import BL-1002 to BL-1010 from the <b>Product Import</b> file: Products → ⋮ menu → Import → Upload File → Test → Import. Don\'t rename its column headers.',
              'Enter the starting stock and reorder rules from <b>Starting_Stock_Reorder</b>. Leave the 4 low products low: they\'re Stocky\'s first job.',
              'Play <b>Field_Detective</b> (11 questions), then fill in <b>Map_My_ERP</b> for your own company.'])
        + p('<b>You\'re done when:</b> Inventory → Operations → Replenishment shows BL-1005 with "To Order 32", and your checklist reads 100%.')))
    out.append(skool_page(4, 5, L, 'Knowledge Check', [('Link', 'Select the line starting with 👉 and use the link button (🔗) to add your Lesson 2 Google Form "share" link.')],
        p('<b>Test what you\'ve learned: 10 quick questions, about 10 minutes.</b>')
        + p('👉 <b>Start the Lesson 2 Knowledge Check</b>')
        + p('As soon as you submit, click <b>View score</b> to see your result, the correct answers and a short explanation for each question. Got 8 or more? You\'re ready for Lesson 3. Fewer than 8? Re-watch the sections behind the questions you missed and try again. You can take it as many times as you like.')
        + h('Share your score')
        + p('Post your score in the <b>Community</b> tab, for example <b>"Lesson 2 quiz: 9/10"</b>. Have a doubt about any question or answer? Send me a <b>DM</b> on Skool (the chat icon at the top of the page) and I\'ll help you out.')))
    out.append(skool_page(5, 5, L, 'Share Your Result', [('Nothing to attach', '—')],
        p('Head to the <b>Community</b> tab and post:')
        + ul(['A <b>screenshot of your Replenishment screen</b> showing BL-1005 → 32', 'One area marked <b>"Messy"</b> on your Map My ERP sheet, and what you\'d clean up first'])
        + p('<b>Stuck on a step?</b> Post the step number from the checklist and a screenshot. Hide your email and never share passwords.')))
    return ''.join(out)


SET = os.environ.get('SKOOL_SET', '12')


def kc(n, nxt):
    return skool_page(4, 5, f'LESSON {n}', 'Knowledge Check', [('Link', f'Select the line starting with 👉 and use the link button (🔗) to add your Lesson {n} Google Form "share" link.')],
        p('<b>Test what you\'ve learned: 10 quick questions, about 10 minutes.</b>')
        + p(f'👉 <b>Start the Lesson {n} Knowledge Check</b>')
        + p(f'As soon as you submit, click <b>View score</b> to see your result, the correct answers and a short explanation for each question. Got 8 or more? You\'re ready for {nxt}. Fewer than 8? Re-watch the sections behind the questions you missed and try again. You can take it as many times as you like.')
        + h('Share your score')
        + p(f'Post your score in the <b>Community</b> tab, for example <b>"Lesson {n} quiz: 9/10"</b>. Have a doubt about any question or answer? Send me a <b>DM</b> on Skool (the chat icon at the top of the page) and I\'ll help you out.'))


def lesson3():
    L = 'LESSON 3'
    out = [skool_page(1, 5, L, 'Watch: APIs, the Restaurant Way',
        [('Video', 'Upload <code>Final_4K/V03_Final_4K.mp4</code> with the ▶ (video) button. Captions are already in the video.')],
        p('Last month Sarah copied numbers from websites into Excel 31 times: exchange rates, the weather near suppliers and holiday calendars. That\'s over two hours of copy-and-paste. In this lesson you\'ll learn what an API is, using a waiter in a restaurant, and you\'ll make two real API calls from your own browser. No code and no sign-up.')
        + h('In this video, you\'ll see:')
        + ul(['How an API works: the customer, the waiter and the kitchen',
              'A live weather call for Shenzhen, and how to read the JSON answer like a shopping list',
              'A live currency call (USD to yuan and pesos), and the currency that never came back',
              'GET vs POST, and status codes as restaurant receipts',
              'API keys as hotel key cards, and where Odoo keeps them'])
        + h('Key takeaways')
        + ol(['An API is a waiter: request, endpoint, parameters, response.', 'JSON is a labelled shopping list; status codes are receipts.', 'GET is safe, POST needs a signature, and keys are key cards.'])),
        skool_page(2, 5, L, 'Slides & Notes',
        [('File', 'Attach <code>Video_03/V03_Slides.pdf</code> · Label: <b>Lesson 3 Slides (PDF)</b>')],
        p('Download the slides to review the lesson at your own pace.')
        + h('Key terms')
        + ul(['<b>API</b>: a waiter. You give your order; it brings back exactly what you asked for from the kitchen.',
              '<b>Endpoint</b>: one dish on the menu, e.g. <i>/forecast</i> or <i>/latest</i>.',
              '<b>Parameters</b>: the order details after the <b>?</b> in a web address, joined with <b>&amp;</b>.',
              '<b>JSON</b>: a labelled shopping list, e.g. "timezone": "Asia/Shanghai".',
              '<b>GET / POST</b>: asking (safe, changes nothing) vs submitting (creates or changes something).',
              '<b>Status code</b>: the receipt. 200 OK · 401 wrong key · 404 wrong address · 429 too many orders.',
              '<b>API key</b>: a hotel key card. It opens only certain doors and can be cancelled.'])),
        skool_page(3, 5, L, 'Activity: API Treasure Hunt',
        [('File', 'Attach <code>Video_03/V03_Activity_API_Treasure_Hunt.xlsx</code> · Label: <b>Activity: API Treasure Hunt (Excel)</b>')],
        p('<b>Time:</b> about 30 minutes · <b>No code, no sign-up:</b> just your web browser. Works in Excel or Google Sheets.')
        + h('Step by step')
        + ol(['Download the workbook and read the <b>Instructions</b> sheet.',
              '<b>Treasure_Hunt</b>: open each of the 3 web addresses in a new browser tab and answer the questions in the yellow cells. Live numbers change daily, so your answers will be different from anyone else\'s.',
              '<b>Decode_JSON</b>: read a saved weather answer from a stormy week in Shenzhen and copy the values into the table. The sheet checks your work and works out a risk level.',
              '<b>Status_Codes</b>: match each status code (the "receipt") to its meaning.',
              '<b>GET_or_POST</b>: for each BrightLeaf task, decide whether Stocky is asking (GET) or submitting (POST).',
              '<b>My_Suppliers</b>: enter 3 to 5 of <i>your</i> suppliers\' cities, coordinates and currencies. The sheet builds ready-to-click weather, currency and holiday links for each one.'])
        + p('<b>Tip:</b> in Chrome, tick <b>Pretty-print</b> at the top of the answer page to make it readable. You can\'t break anything: these APIs only answer questions.')
        + p('<b>You\'re done when:</b> your total score shows on the Instructions sheet and the links on My_Suppliers open for at least 3 of your suppliers.')),
        kc(3, 'Lesson 4'),
        skool_page(5, 5, L, 'Share Your Result', [('Nothing to attach', '—')],
        p('Head to the <b>Community</b> tab and post:')
        + ul(['Your <b>Treasure Hunt score</b> (out of 46)', 'One <b>live number</b> you got from an API today, e.g. the rain forecast near one of your suppliers or today\'s USD → MXN rate', 'Which of your own suppliers you\'d want Stocky to check first, and why'])
        + p('<b>Never post an API key</b>, not even in a screenshot.'))]
    return ''.join(out)


def lesson4():
    L = 'LESSON 4'
    out = [skool_page(1, 5, L, 'Watch: Databases Without Fear',
        [('Video', 'Upload <code>Final_4K/V04_Final_4K.mp4</code> with the ▶ (video) button. Captions are already in the video.')],
        p('One cell in BrightLeaf\'s stock sheet said "21". It cost about $1,840. The number was right; the unit was missing. Before Stocky can read your data, it has to be clean. In this lesson you\'ll learn what a database really is (you already know 90% of it from Excel), build Stocky\'s two starter tables in Google Sheets and clean up a messy export live.')
        + h('In this video, you\'ll see:')
        + ul(['Why a database is just a super-organised workbook, and why every record needs an ID',
              'The supplier who existed three times, and how one ID fixed it',
              'Building the <b>Suppliers</b> and <b>Stock_Log</b> tables in Google Sheets, with dropdowns, checkboxes and formulas',
              'The five golden rules of agent-ready data',
              'A messy stock export cleaned up in 7 fixes'])
        + h('Key takeaways')
        + ol(['A database is a super-organised workbook: tables, rows (records) and columns (fields).', 'Use IDs, not names, to connect your tables.', 'Follow the five golden rules: agents read values, not formatting.'])),
        skool_page(2, 5, L, 'Slides & Notes',
        [('File', 'Attach <code>Video_04/V04_Slides.pdf</code> · Label: <b>Lesson 4 Slides (PDF)</b>')],
        p('Download the slides to review the lesson at your own pace.')
        + h('The five golden rules')
        + ol(['One table per thing', 'One header row, in row 1', 'One fact per cell', 'A unique ID on every row', 'Consistent types and units'])
        + p('<b>Bonus:</b> no merged cells, no colours that carry meaning, no totals inside the table.')
        + h('Key terms')
        + ul(['<b>Database</b>: a super-organised workbook.', '<b>Table / Record / Field</b>: a sheet / a row / a column.',
              '<b>Unique ID</b>: like a passport number, e.g. SUP-002. Names vary; IDs don\'t.',
              '<b>Relationship</b>: an ID in one table pointing to a row in another (Stock_Log → Suppliers).',
              '<b>Data validation</b>: dropdowns and checkboxes that stop mess at the door.'])),
        skool_page(3, 5, L, 'Activity: Messy Data Makeover',
        [('File', 'Attach <code>Video_04/V04_Activity_Messy_Data_Makeover.xlsx</code> · Label: <b>Activity: Messy Data Makeover (Excel)</b>')],
        p('<b>Time:</b> 30-40 minutes · Works in Excel or Google Sheets.')
        + h('Step by step')
        + ol(['<b>Messy_Export</b>: just look, don\'t fix anything. How many problems can you spot in 2 minutes?',
              '<b>Problem_Spotter</b>: 12 problems are listed. Pick the problem type from the dropdown and write how you\'d fix it.',
              '<b>Clean_Stock_Log</b>: rebuild the messy data as a clean table: one row per product, one fact per cell. Rows 2-3 are done as examples.',
              '<b>Suppliers</b>: complete the yellow cells. Tip: SUP-006 is in the same city as SUP-004.',
              '<b>Checklist</b>: score the clean BrightLeaf table and one spreadsheet from your own job against the 13 clean-data rules.',
              '<b>My_Company</b>: design a clean, agent-ready version of a spreadsheet you use every week.'])
        + p('<b>Want to follow the video step by step?</b> In Google Sheets, go to File → Import → Upload, choose this file and pick <i>Insert new sheet(s)</i>. Then practise the 7 fixes on the Messy_Export tab.')
        + p('<b>You\'re done when:</b> Clean Stock Log shows 8/8 and Suppliers shows 6/6 on the Instructions score panel.')),
        kc(4, 'Lesson 5'),
        skool_page(5, 5, L, 'Share Your Result', [('Nothing to attach', '—')],
        p('Head to the <b>Community</b> tab and post:')
        + ul(['Which <b>golden rule</b> your most-used work spreadsheet breaks', 'A <b>before and after</b> screenshot of one table you cleaned (hide any sensitive numbers or names)', 'Your Messy Data Makeover score'])
        + p('Seeing other people\'s messy sheets is oddly satisfying, and it\'s the fastest way to spot problems in your own.'))]
    return ''.join(out)


CSS = '''
@page { size: A4; margin: 14mm 14mm 16mm; }
* { box-sizing: border-box; }
body { font-variant-ligatures: none; font-feature-settings: "liga" 0, "clig" 0; font-family: "Open Sans", "Helvetica Neue", Arial, sans-serif; color: #212121; font-size: 10.5pt; line-height: 1.45; margin: 0; }
h1, h2, .num, .big { font-family: "Inconsolata", "Helvetica Neue", Arial, sans-serif; }
.cover { height: 265mm; display: flex; flex-direction: column; justify-content: center; padding: 0 6mm; position: relative; page-break-after: always;
  background: radial-gradient(circle at 92% 6%, rgba(68,212,180,.45), rgba(68,212,180,0) 30%), radial-gradient(circle at 4% 96%, rgba(184,185,192,.35), rgba(184,185,192,0) 28%), #F3F3F3; border-radius: 6mm; }
.cover h1 { font-size: 40pt; line-height: 1.05; margin: 0 0 6mm; color: #212121; }
.cover .sub { font-size: 15pt; color: #305C54; font-weight: 700; margin-bottom: 3mm; }
.cover .meta { color: #55625F; font-size: 11pt; }
.pill { display: inline-block; background: #44D4B4; color: #305C54; font-weight: 700; padding: 2mm 5mm; border-radius: 20mm; margin-top: 10mm; font-size: 11pt; }
h2.part { font-size: 24pt; margin: 0 0 2mm; color: #212121; }
.kicker { color: #4C9484; font-weight: 700; font-size: 9pt; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 1mm; }
.lead { color: #55625F; margin: 0 0 6mm; }
.divider { page-break-before: always; }
.howto { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; margin: 4mm 0 6mm; }
.howto div { background: #fff; border-radius: 3mm; padding: 3.5mm; box-shadow: 0 1px 4px rgba(31,58,52,.12); }
.howto b { display: block; color: #305C54; margin-bottom: 1mm; }
.tree { background: #305C54; color: #fff; border-radius: 4mm; padding: 5mm 6mm; margin: 3mm 0 6mm; }
.tree .row { display: flex; gap: 3mm; margin: 1.6mm 0; align-items: baseline; }
.tree .lvl { color: #44D4B4; font-weight: 700; min-width: 24mm; }
table.files { width: 100%; border-collapse: collapse; margin: 3mm 0 6mm; font-size: 9.5pt; }
table.files th { background: #305C54; color: #fff; text-align: left; padding: 2mm 3mm; }
table.files td { padding: 2mm 3mm; border-bottom: 1px solid #DCE5E2; vertical-align: top; }
table.files tr:nth-child(even) td { background: #F2F7F5; }
code { font-family: "Inconsolata", Menlo, monospace; background: #E2F5EF; color: #305C54; padding: 0 1.2mm; border-radius: 1mm; font-size: 9.5pt; }
.spage { break-before: page; border: 1px solid #DCE5E2; border-radius: 4mm; padding: 5mm 6mm; margin: 0 0 7mm; background: #fff; box-shadow: 0 1px 5px rgba(31,58,52,.10); }
.sphead { display: flex; align-items: center; gap: 3mm; margin-bottom: 3.5mm; }
.num { width: 9mm; height: 9mm; border-radius: 50%; background: #44D4B4; color: #305C54; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 13pt; }
.spl { font-weight: 700; color: #4C9484; letter-spacing: .06em; font-size: 9pt; }
.field { margin-bottom: 3.5mm; }
.flabel { font-size: 8.5pt; font-weight: 700; color: #55625F; letter-spacing: .05em; margin-bottom: 1.3mm; }
.flabel i { font-weight: 400; letter-spacing: 0; }
.title-in { font-size: 15pt; font-weight: 700; color: #212121; border-bottom: 2px solid #44D4B4; padding: 1mm 0 1.5mm; }
.add { display: flex; gap: 3mm; align-items: baseline; margin: 1mm 0; }
.addk { background: #305C54; color: #fff; font-size: 8pt; font-weight: 700; padding: .6mm 2.2mm; border-radius: 1.5mm; white-space: nowrap; }
.body { background: #F7FAF9; border: 1px dashed #B9CFC8; border-radius: 3mm; padding: 4mm 5mm; }
.body p { margin: 0 0 2.5mm; }
.body p.q { margin: 0 0 2.5mm; page-break-inside: avoid; }
.body ul, .body ol { margin: 0 0 3mm; padding-left: 6mm; }
.body li { margin-bottom: 1mm; }
.bh { font-weight: 700; color: #305C54; font-size: 12pt; margin: 3mm 0 1.5mm; display: flex; gap: 2mm; align-items: center; }
.tag { display: inline-block; font-size: 7pt; font-weight: 700; color: #4C9484; border: 1px solid #93E6D3; background: #fff; border-radius: 1mm; padding: 0 1.3mm; line-height: 1.6; vertical-align: middle; font-family: "Helvetica Neue", Arial, sans-serif; }
.body > .tag { margin-bottom: 1mm; }
.hr { border-top: 1.5px solid #B9CFC8; margin: 4mm 0 2mm; padding-top: 1mm; }
.note { background: #E2F5EF; border-radius: 2mm; padding: 2.5mm 4mm; margin-bottom: 3mm; }
.divider > p.lead + .spage { break-before: auto; }
.save { break-before: avoid; font-size: 9.5pt; color: #305C54; background: #E2F5EF; display: inline-block; border-radius: 2mm; padding: 1.5mm 3mm; }
.tip { background: #E2F5EF; border-radius: 3mm; padding: 4mm 5mm; margin: 4mm 0; }
'''


def build():
    if SET == '34':
        META = 'Lesson 3 + Lesson 4'
        ROWS = ('<tr><td>3</td><td>Watch</td><td><code>Final_4K/V03_Final_4K.mp4</code></td></tr>'
                '<tr><td>3</td><td>Slides &amp; Notes</td><td><code>Video_03/V03_Slides.pdf</code></td></tr>'
                '<tr><td>3</td><td>Activity</td><td><code>Video_03/V03_Activity_API_Treasure_Hunt.xlsx</code></td></tr>'
                '<tr><td>4</td><td>Watch</td><td><code>Final_4K/V04_Final_4K.mp4</code></td></tr>'
                '<tr><td>4</td><td>Slides &amp; Notes</td><td><code>Video_04/V04_Slides.pdf</code></td></tr>'
                '<tr><td>4</td><td>Activity</td><td><code>Video_04/V04_Activity_Messy_Data_Makeover.xlsx</code></td></tr>')
        MODS = '"Lesson 3: APIs Explained" and "Lesson 4: Databases Without Fear".'
    else:
        META = 'Start Here + Lesson 1 + Lesson 2'
        ROWS = ('<tr><td>1</td><td>Watch</td><td><code>Final_4K/V01_Final_4K.mp4</code></td></tr>'
                '<tr><td>1</td><td>Slides &amp; Notes</td><td><code>Video_01/V01_Slides.pdf</code></td></tr>'
                '<tr><td>1</td><td>Activity</td><td><code>Video_01/V01_Activity_Agent_or_Not.xlsx</code></td></tr>'
                '<tr><td>2</td><td>Watch</td><td><code>Final_4K/V02_Final_4K.mp4</code></td></tr>'
                '<tr><td>2</td><td>Slides &amp; Notes</td><td><code>Video_02/V02_Slides.pdf</code></td></tr>'
                '<tr><td>2</td><td>Activity</td><td><code>Video_02/V02_Activity_Odoo_Setup_Workbook.xlsx</code> + <code>Video_02/V02_Activity_BrightLeaf_Product_Import.xlsx</code></td></tr>')
        MODS = '"Start Here", "Lesson 1: Why Your ERP Needs an AI Agent", "Lesson 2: ERP Demystified".'
    intro = f'''
<div class="cover">
  <div class="kicker">AGENTIC SCM · CLASSROOM</div>
  <h1>Skool Classroom<br>Setup Guide</h1>
  <div class="sub">AI Agents for SCM: ERP, APIs &amp; Databases</div>
  <div class="meta">{META} · what to type, attach and paste on every page</div>
  <div><span class="pill">Copy · Paste · Save</span></div>
</div>

<div class="kicker">BEFORE YOU START</div>
<h2 class="part">How the classroom is organised</h2>
<p class="lead">Skool calls the folders "modules" (they look like "Day 1" in the reference course) and the items inside them "pages". We use one module per video.</p>
<div class="tree">
  <div class="row"><span class="lvl">Course</span><span>AI Agents for SCM: ERP, APIs &amp; Databases</span></div>
  <div class="row"><span class="lvl">Module</span><span>Start Here · Lesson 1 · Lesson 2 · … · Lesson 10</span></div>
  <div class="row"><span class="lvl">Pages</span><span>1 Watch · 2 Slides &amp; Notes · 3 Activity · 4 Knowledge Check · 5 Share Your Result</span></div>
</div>
<div class="kicker">HOW TO READ EACH PAGE CARD IN THIS GUIDE</div>
<div class="howto">
  <div><b>1 · Title box</b>Type this in the "Title" field at the top. Skool shows "Page title is required" until you do.</div>
  <div><b>2 · Add</b>The video (▶ button in the toolbar) or the file to attach (ADD ▾ at the bottom of the editor).</div>
  <div><b>3 · Text to paste</b>Copy it into the editor. Grey tags like <span class="tag">H3</span> <span class="tag">• list</span> show which toolbar button to use.</div>
  <div><b>4 · Save</b>Leave "Published" on and click SAVE. Use the ⋯ menu on the module to add the next page.</div>
</div>
<div class="kicker">FILES YOU'LL UPLOAD</div>
<table class="files">
<tr><th>Lesson</th><th>Page</th><th>File (in the ERP-Agent-Blueprint folder)</th></tr>
{ROWS}</table>
<div class="tip"><b>Module names to create:</b> {MODS} The Knowledge Check pages link to the Google Form quizzes made with the Apps Script file.</div>
'''
    parts = [
        ('MODULE 3', 'Lesson 3: APIs Explained', 'Video length 20:21 · five pages.', lesson3()),
        ('MODULE 4', 'Lesson 4: Databases Without Fear', 'Video length 21:56 · five pages.', lesson4()),
    ] if SET == '34' else [
        ('MODULE 0', 'Start Here', 'Four short text pages. Create this module above Lesson 1.', start_here()),
        ('MODULE 1', 'Lesson 1: Why Your ERP Needs an AI Agent', 'Video length 16:31 · five pages.', lesson1()),
        ('MODULE 2', 'Lesson 2: ERP Demystified', 'Video length 18:26 · five pages.', lesson2()),
    ]
    body = intro + ''.join(f'<div class="divider"><div class="kicker">{k}</div><h2 class="part">{E(t)}</h2><p class="lead">{E(d)}</p>{c}</div>' for k, t, d, c in parts)
    return f'<!doctype html><html><head><meta charset="utf-8"><title>Skool Classroom Setup Guide</title><style>{CSS}</style></head><body>{body}</body></html>'



def clean(body):
    """Editor-ready HTML: real headings/lists, no format tags."""
    body = re.sub(r'<span class="tag">.*?</span>', '', body)
    body = re.sub(r'<div class="bh"><span>(.*?)</span></div>', r'<h3>\1</h3>', body)
    body = re.sub(r'<div class="hr"></div>', '<hr>', body)
    body = body.replace(' class="q"', '')
    return body


def build_copy():
    cards = []
    global skool_page
    orig = skool_page

    def collect(n, total, lesson, title, add, body, note=None):
        if lesson.startswith('LESSON'):
            title = f"Lesson {lesson.split()[1]} · {title}"
        cards.append((lesson, n, total, title, add, body))
        return ''
    skool_page = collect
    if SET == '34':
        lesson3(); lesson4()
    else:
        start_here(); lesson1(); lesson2()
    skool_page = orig
    out, cur = [], None
    for i, (lesson, n, total, title, add, body) in enumerate(cards):
        if lesson != cur:
            out.append(f'<h1 class="mod">{E(lesson.title())}</h1>'); cur = lesson
        adds = ' · '.join(f'<b>{E(k)}:</b> {v}' for k, v in add)
        out.append(f"""<section class="card"><div class="kick">PAGE {n} OF {total} · {E(lesson)}</div>
<div class="row"><div class="lbl">Title</div><div class="copyable t" id="t{i}">{E(title)}</div><button onclick="cp('t{i}',this)">Copy title</button></div>
<div class="row"><div class="lbl">Add</div><div class="addtxt">{adds}</div></div>
<div class="row top"><div class="lbl">Text</div><div class="copyable body" id="b{i}">{clean(body)}</div><button onclick="cp('b{i}',this)">Copy text</button></div></section>""")
    css = """body{font-family:-apple-system,'Helvetica Neue',Arial,sans-serif;background:#F3F3F3;color:#212121;margin:0;padding:24px 16px 60px}
main{max-width:900px;margin:0 auto}h1.top{font-size:28px;margin:0 0 4px}.lead{color:#55625F;margin:0 0 20px}
h1.mod{font-size:20px;color:#305C54;margin:32px 0 10px;border-bottom:2px solid #44D4B4;padding-bottom:6px}
.card{background:#fff;border-radius:12px;padding:16px 18px;margin:0 0 14px;box-shadow:0 1px 5px rgba(31,58,52,.12)}
.kick{font-size:11px;font-weight:700;letter-spacing:.06em;color:#4C9484;margin-bottom:8px}
.row{display:flex;gap:12px;align-items:center;margin:6px 0}.row.top{align-items:flex-start}
.lbl{width:44px;flex:none;font-size:11px;font-weight:700;color:#55625F;text-transform:uppercase}
.t{font-weight:700;font-size:17px;flex:1}.addtxt{flex:1;font-size:14px;color:#305C54}
.body{flex:1;background:#F7FAF9;border:1px dashed #B9CFC8;border-radius:8px;padding:10px 14px;font-size:14px;line-height:1.5}
.body h3{font-size:16px;margin:10px 0 4px}.body p{margin:0 0 8px}.body ul,.body ol{margin:0 0 8px;padding-left:22px}
code{background:#E2F5EF;color:#305C54;padding:0 4px;border-radius:3px}
button{flex:none;background:#305C54;color:#fff;border:0;border-radius:18px;padding:8px 14px;font-weight:700;cursor:pointer}
button.ok{background:#44D4B4;color:#305C54}
@media(max-width:640px){.row{flex-wrap:wrap}.body{flex-basis:100%}}"""
    js = """function cp(id,btn){const el=document.getElementById(id);const r=document.createRange();r.selectNodeContents(el);
const s=window.getSelection();s.removeAllRanges();s.addRange(r);let ok=false;try{ok=document.execCommand('copy')}catch(e){}
s.removeAllRanges();const old=btn.textContent;btn.textContent=ok?'Copied ✓':'Select & copy manually';btn.classList.add('ok');
setTimeout(()=>{btn.textContent=old;btn.classList.remove('ok')},1800)}"""
    return f"""<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Skool Copy Text</title><style>{css}</style></head>
<body><main><h1 class="top">Skool copy text: {'Lessons 3-4' if SET == '34' else 'Start Here, Lessons 1-2'}</h1>
<p class="lead">Open a page in Skool, click <b>Copy title</b> and paste it into the Title box, then click <b>Copy text</b> and paste it under the video. Headings, bold and bullet lists paste in their proper format. The layout guide is in {'Skool_Classroom_Setup_Guide_Lessons_3-4.pdf' if SET == '34' else 'Skool_Classroom_Setup_Guide.pdf'}.</p>
{''.join(out)}</main><script>{js}</script></body></html>"""


if __name__ == '__main__':
    if len(sys.argv) > 2:
        open(sys.argv[2], 'w', encoding='utf-8').write(build_copy())

    open(sys.argv[1], 'w', encoding='utf-8').write(build())
    print('ok')
