# Skool Classroom Structure: Lessons 1 and 2

Course: **AI Agents for SCM: ERP, APIs & Databases** (The ERP Agent Blueprint)

In Skool, a course holds **modules** (the collapsible "Day 1" sets in the reference) and each module holds **pages**. We use one module per video, called a **Lesson**. Each page gets Skool's "mark as complete" tick, so the progress bar moves as learners work through it.

## Page pattern for every lesson (5 pages)

| # | Page title | What goes on it |
|---|---|---|
| 1 | **Watch:** <video title> | The video, a 2-3 line intro, "In this video you'll see" bullets, and the 3 key takeaways |
| 2 | **Slides & Notes** | The lesson slides (PDF), the key terms in one line each, and useful links |
| 3 | **Activity:** <activity name> | The activity file(s) plus the step-by-step guidance, time needed and "you're done when…" |
| 4 | **Knowledge Check** | The 10-question quiz (see note below) |
| 5 | **Share Your Result** | A prompt to post one result in the Community feed |

Why this differs a little from the original plan (Video → Resources → Quiz → Guidance → Activity):

- **Guidance is merged into the Activity page.** Learners need the instructions next to the file, not on a separate page they have to flip back to.
- **The Activity comes before the Quiz.** Doing the activity makes the quiz easier and more meaningful, and the quiz becomes the "check" at the end.
- **"Resources" is renamed "Slides & Notes".** The activity files live on the Activity page, so this page holds only the reference material.
- **A "Share" page was added** (like "Share Your Day 1 Build" in the reference). It drives community posts, which is the main reason people stay in a Skool group.

**Quiz note:** I'm not certain Skool has a built-in graded quiz. If it doesn't, the cleanest option is a Google Form in quiz mode (auto-graded, with the explanation from our answer key shown after submitting), linked from the page. The fallback is to paste the questions on the page and attach the answer key as a separate PDF.

---

## Module 0: Start Here (one-time, above Lesson 1)

1. **Welcome: How This Course Works** (the free lesson video, or a short welcome text: 10 lessons, ~4 hours, no code, and how each lesson is laid out)
2. **Meet BrightLeaf and Stocky** (the case study, the cast and the product table, in one short page)
3. **Your Free Toolkit** (what accounts you'll need and when: Odoo in Lesson 2, n8n + Claude/ChatGPT in Lesson 5)
4. **How to Get Help** (post in the Community with a screenshot and the lesson number)

---

## Lesson 1: Why Your ERP Needs an AI Agent

### 1. Watch: Why Your ERP Needs an AI Agent (16:31)
- Video: `Final_4K/V01_Final_4K.mp4` (upload the `V01_Final_4K.srt` captions with it)
- Intro: *Sarah spends 12 hours a week copying ERP numbers, chasing suppliers and building the Monday report. That's 576 hours a year. In this lesson you'll meet Stocky, the AI agent we'll build together, and learn exactly what makes an agent different from a chatbot or a simple automation.*
- In this video you'll see:
  - Stocky's Monday 7:00 AM email: 10 products checked, 4 below reorder point, and a risk warning on BL-1005
  - The Stocky workflow in n8n, and the human "Approve" click that creates draft RFQs in Odoo
  - The same question put to a chatbot, an automation and an agent
  - The five parts of every agent: brain, instructions, tools, memory, human supervisor
  - The course map and your free toolkit
- Key takeaways: a chatbot talks, an automation follows, an agent reasons and acts · every agent = brain + instructions + tools + memory + human · the goal is to give Sarah her 576 hours back, not replace her

### 2. Slides & Notes
- File: `Video_01/V01_Slides.pdf` (17 slides; the editable `.pptx` stays with the team)
- Key terms: **Chatbot** (a brain that talks, no access to your systems) · **Automation** (a recipe card: same steps every time) · **AI Agent** (a smart new intern who reads, thinks, uses tools and acts with supervision) · **LLM** (the intern's brain)

### 3. Activity: Agent or Not? + My Automation Wishlist
- File: `Video_01/V01_Activity_Agent_or_Not.xlsx` · Time: 25-35 min · No technical skills needed
- Steps (same as the Instructions sheet):
  1. On **Agent_or_Not**, choose an answer for each of the 20 tasks in the yellow column.
  2. Write a one-line reason for each.
  3. Check your score at the top; only then open **Answer_Key**.
  4. Read **Sarah_Example** to see how 12 hours a week becomes 576 hours a year.
  5. On **My_Wishlist**, list your own repetitive tasks (yellow cells only).
  6. Note your #1 ranked task. It's a strong candidate for your capstone in Lesson 10.
- You're done when: you have a score out of 20 and at least 5 tasks in your Wishlist.

### 4. Knowledge Check
- Source: `Video_01/V01_Quiz.docx` (10 questions + answer key)

### 5. Share Your Result
- Prompt: *Post your #1 Wishlist task in the Community: what is it, how many hours a year does it take, and is it a job for a chatbot, an automation or an agent?*

---

## Lesson 2: ERP Demystified: A Supply Chain Pro's Tour of Odoo

### 1. Watch: ERP Demystified (18:26)
- Video: `Final_4K/V02_Final_4K.mp4` (+ `V02_Final_4K.srt`)
- Intro: *Before Stocky can read an ERP, you need to understand one. In this lesson you set up your own free Odoo, learn the three words every ERP uses (module, record, field), and load BrightLeaf's 10 products, stock and reorder rules. It's your private test system: you can't break anything.*
- In this video you'll see:
  - What an ERP really is: the company's filing cabinet plus its rulebook
  - Creating a free Odoo trial with Inventory, Purchase and Sales
  - A tour of the modules and the menu pattern every Odoo app shares
  - Creating BL-1001 by hand and importing 9 more products in seconds
  - Starting stock, reorder rules and the paper trail of every stock move
- Key takeaways: an ERP is the central filing cabinet + rulebook · module, record, field = drawer, folder, labelled box · your agent is only as good as your data

### 2. Slides & Notes
- File: `Video_02/V02_Slides.pdf` (18 slides)
- Key terms: **ERP** (filing cabinet + rulebook) · **Module** (a drawer: Inventory, Purchase) · **Record** (a folder: one product = an Excel row) · **Field** (a labelled box = an Excel column) · **SKU / Internal Reference** (BL-1001) · **Reorder rule** (Min / Max)

### 3. Activity: Build BrightLeaf in Your Odoo
- Files: `Video_02/V02_Activity_Odoo_Setup_Workbook.xlsx` + `Video_02/V02_Activity_BrightLeaf_Product_Import.xlsx` · Time: 30-40 min
- Steps:
  1. Work through the 16 steps on **Setup_Checklist** with Odoo open next to it; mark each Yes / No / Stuck.
  2. Write your Odoo URL and database name at the top of the checklist. You'll need them in Lesson 6.
  3. Import BL-1002 to BL-1010 from the import file (Products → ⋮ menu → Import → Test → Import). Don't rename its headers.
  4. Enter starting stock and reorder rules from **Starting_Stock_Reorder**. Leave the 4 low products low.
  5. Play **Field_Detective** (11 questions), then fill in **Map_My_ERP** for your own company.
- You're done when: Replenishment shows BL-1005 with "To Order 32" and your checklist reads 100%.

### 4. Knowledge Check
- Source: `Video_02/V02_Quiz.docx`

### 5. Share Your Result
- Prompt: *Post a screenshot of your Replenishment screen showing BL-1005 → 32, plus one "Messy" area from your Map My ERP sheet. Stuck on a step? Post the step number and a screenshot.*
