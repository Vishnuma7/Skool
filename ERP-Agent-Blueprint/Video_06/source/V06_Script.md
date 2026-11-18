# Video 6: Your First Agent: Stocky Reads the ERP
**Course:** The ERP Agent Blueprint | **Length:** 26 min | **Level:** Beginner

**Learning objectives:**
- Build Stocky v1 in n8n: a Chat Trigger, an AI Agent with a Claude chat model, Simple Memory, and three read-only Odoo tools
- Write a clear system prompt using the five-part prompt anatomy: Role, Goal, Tools, Rules, Output format
- Ask Stocky real questions ("What's running low?", "Which supplier provides BL-1005 and what's the lead time?") and check the answers against Odoo
- Read the execution log to "watch the agent think": which tool it used, what data came back, and how it reached its answer
- Explain what hallucination is and reduce it with "only answer from tool data; say I don't know"

**Before recording, prepare:**
- n8n with the two credentials from Video 5: `Anthropic – BrightLeaf` and `Odoo – BrightLeaf`
- Odoo trial with the 10 BrightLeaf products, each with: an On Hand quantity, a reorder rule (minimum quantity) and a vendor line (Purchase tab: vendor, price, delivery lead time). Use these on-hand quantities so the answers match the script:

| SKU | Product | On hand | Reorder point | Vendor | Lead time (days) |
|---|---|---|---|---|---|
| BL-1001 | Steel Hex Bolts M10 (box of 100) | 145 | 80 | Apex Fasteners | 7 |
| BL-1002 | Corrugated Shipping Box 18x12x10 | 1,180 | 1,500 | PackRight Industries | 5 |
| BL-1003 | Stretch Wrap Film 500mm | 260 | 200 | PackRight Industries | 6 |
| BL-1004 | Industrial Safety Gloves (pair) | 420 | 600 | SafeHands Co. | 10 |
| BL-1005 | Pallet Jack Wheels (set) | 18 | 25 | Global Lift Parts | 21 |
| BL-1006 | Packing Tape 48mm (roll) | 1,850 | 1,000 | PackRight Industries | 5 |
| BL-1007 | Hydraulic Oil 20L | 31 | 40 | Gulf Lubricants | 14 |
| BL-1008 | LED Warehouse Light 150W | 34 | 30 | Shenzhen BrightTech | 28 |
| BL-1009 | Nylon Cable Ties (pack of 500) | 410 | 150 | Apex Fasteners | 7 |
| BL-1010 | Forklift Battery Water Kit | 26 | 20 | Global Lift Parts | 12 |

- The full Stocky system prompt (below) ready to paste, plus a second tab with the "weak" one-line prompt for the hallucination demo
- Odoo open in a second tab on Inventory → Products (list view with the On Hand column) for fact-checking on screen

**Resources for this video:**
- Activities: `V06_Activity_Stocky_Prompt_Builder.docx` and `V06_Activity_Test_Question_Bank.xlsx`
- Quiz: `V06_Quiz.docx`

---

## [ON CAMERA] Intro: The Question Sarah Asks Every Morning (00:00–02:00)

Every single morning, Sarah asks the same question. "What's running low?"

And every single morning, answering it takes her about forty minutes. She opens Odoo. She exports the stock list. She opens last week's Excel file with the reorder points. She runs a VLOOKUP, fixes the VLOOKUP, colours the red rows, and finally sends Tom a list. By then, the warehouse has already shipped another two hundred boxes.

Forty minutes a day is more than three hours a week. On one question.

Today, that question takes ten seconds.

In this video, we build **Stocky version one**. Stocky is the AI intern we've been talking about since Video 1. Today, it gets a chat window, a brain, a memory, and, most importantly, hands that can reach into Odoo and read the live stock. You'll type "What's running low?", and Stocky will go into the ERP, compare every product with its reorder point, and answer you in a neat table.

But I'm not just going to show you the magic. I'm going to show you how to look inside Stocky's head, in the execution log, so you can see exactly which data it read and why it said what it said. Because in supply chain, you never trust a number you can't trace.

And I'll show you the one thing that scares people most about AI: making things up. We'll catch Stocky inventing an answer on camera, and then we'll fix it with two simple rules in its instructions.

If Video 5 was setting up the desk, this is the intern's first day on the job. Let's build.

---

## [SCREEN RECORDING] Build Stocky's Skeleton: Chat, Brain and Memory (02:00–05:00)

**SHOW:** n8n Overview. Click "Create Workflow". Rename it to `Stocky v1 – Reads the ERP`.

**SAY:** Open n8n and click "Create Workflow". Name it straight away: "Stocky v1, Reads the ERP". This is the workflow you'll keep improving for the rest of the course.

**SHOW:** Click "Add first step", choose "On chat message". A node appears: "When chat message received". A "Chat" button appears at the bottom of the canvas.

**SAY:** Click "Add first step" and choose "On chat message". Last video our doorbell was a button. Today, the doorbell is a chat message. Every time someone types a question, the recipe starts. See the new "Chat" button at the bottom? That's where we'll talk to Stocky.

**SHOW:** Click the "+" on the right of the chat trigger, search `AI Agent`, select it. In the AI Agent panel, "Source for Prompt (User Message)" already shows "Connected Chat Trigger Node". Leave it.

**SAY:** Now click the plus, search "AI Agent", and add it. Look at "Source for Prompt". It already says "Connected Chat Trigger Node". Exactly right. Whatever we type in the chat becomes Stocky's task. Close the panel.

**SHOW:** Under the AI Agent node, click "+" under "Chat Model". Choose "Anthropic Chat Model". Credential: `Anthropic – BrightLeaf`. Model: the newest Claude Sonnet in the list.

**SAY:** Underneath the AI Agent, remember the three plugs. First, the brain. Click the plus under "Chat Model", choose "Anthropic Chat Model", pick the credential "Anthropic, BrightLeaf" we saved last time, and choose the newest Claude Sonnet model. Sonnet is a great choice for agents because it's good at deciding which tool to use.

**SHOW:** Click "+" under "Memory". Choose "Simple Memory". Show the "Context Window Length" field. Change it from 5 to 10.

**SAY:** Second plug: memory. Click the plus under "Memory" and choose "Simple Memory". Why do we need this? Without memory, Stocky forgets everything after each message. You ask about BL-1005, then ask "and who supplies it?", and Stocky says, "Supplies what?" Like an intern with a goldfish brain. The "Context Window Length" is how many back-and-forth messages Stocky remembers. I'll set it to ten. That's plenty for a normal conversation.

**ON-SCREEN TEXT:** Simple Memory = the intern's notepad for this conversation. It does NOT remember forever.

**SHOW:** Click "Chat" at the bottom. Type: `Hi Stocky, how many Pallet Jack Wheels do we have?` Press Enter. Stocky replies something like: "I'm sorry, I don't have access to your inventory data..."

**SAY:** Before we go further, let's test the skeleton. Click "Chat" and ask: "Hi Stocky, how many Pallet Jack Wheels do we have?" Look at the answer. Stocky politely says it doesn't have access to inventory data. And that's good! It has a brain and a memory, but no hands. It can't reach into Odoo yet. A brain without tools is just a chatbot. Let's give it hands.

---

## [SCREEN RECORDING] Give Stocky Hands: Three Odoo Tools (05:00–09:15)

**SHOW:** Quick switch to Odoo. Inventory → Products → open "Pallet Jack Wheels (set)". Point at: "On Hand: 18", the "Min / Max" smart button (25 / 50), and the "Purchase" tab with the vendor line "Global Lift Parts – Price 38.00 – Delivery Lead Time 21 days".

**SAY:** Quick check in Odoo first, because an agent is only as good as the data it reads. Here's BL-1005, Pallet Jack Wheels. On hand: eighteen. The reorder rule, here in the "Min Max" button: minimum twenty-five. And on the Purchase tab, the vendor: Global Lift Parts, thirty-eight dollars a set, delivery lead time twenty-one days. Three kinds of information, in three different drawers of the filing cabinet. So we'll give Stocky three tools, one for each drawer. If one of your products is missing a reorder rule or a vendor line, add it now. Garbage in, garbage out.

**ON-SCREEN TEXT:** Drawer 1: products & stock | Drawer 2: reorder rules | Drawer 3: suppliers & lead times

**SHOW:** Back in n8n, click "+" under "Tool" on the AI Agent. Search `Odoo`, choose "Odoo Tool".

**SAY:** Back in n8n, click the plus under "Tool". Search "Odoo" and choose "Odoo Tool". This is the same Odoo waiter we met in Video 3, but now it works for the agent. Stocky can call it whenever it decides it needs data.

**SHOW:** Fill in the tool settings:
- Rename the node (click its title) to `get_products_and_stock`
- Credential to connect with: `Odoo – BrightLeaf`
- Tool Description: Set Manually → `Returns every product with its SKU (default_code), name, quantity on hand (qty_available) and unit cost (standard_price). Use this for any question about stock levels.`
- Resource: `Custom Resource`
- Custom Resource Name: `product.product` (it may appear as "Product Variant")
- Operation: `Get Many`
- Return All: ON
- Options → Add option → Fields to Include: `default_code`, `name`, `qty_available`, `standard_price`

**SAY:** Let's set it up line by line. First, rename the node to "get products and stock", with underscores. The name matters, because Stocky reads it to decide when to use this tool. Credential: "Odoo, BrightLeaf". Next, "Tool Description". Set it manually and describe in plain English what this tool returns: every product, with its SKU, name, quantity on hand and unit cost. This sentence is like the label on the drawer. A clear label means Stocky opens the right drawer.

**SAY:** Resource: choose "Custom Resource". That lets us pick any drawer in Odoo. For the name, choose "product dot product". Odoo might call it "Product Variant". That's the list of products with their stock. Operation: "Get Many", because we want the whole list. Switch on "Return All". And finally, under Options, "Fields to Include". We'll pick just four fields: default code, which is Odoo's name for the SKU, name, quantity available, and standard price. Why only four? Because every extra field is more reading for Stocky, which means more tokens, more cost, and more chance of confusion. Give the intern the page they need, not the whole binder.

> BEGINNER MISTAKE: Leaving "Fields to Include" empty. Odoo then sends back dozens of fields per product, Stocky reads all of them, and each question costs several times more for no better answer.

**SHOW:** Hover over the new tool node, open the three-dot menu, choose "Duplicate". Change the copy: name `get_reorder_rules`; Custom Resource Name `stock.warehouse.orderpoint` (may appear as "Minimum Inventory Rule"); Fields to Include: `product_id`, `product_min_qty`, `product_max_qty`; Description: `Returns the reorder point (product_min_qty) and maximum quantity for each product. Use this to decide whether stock is running low.`

**SAY:** Tool number two is quicker. Duplicate the first one and change three things. The name: "get reorder rules". The drawer: "stock dot warehouse dot orderpoint", which Odoo may show as "Minimum Inventory Rule". And the fields: product, minimum quantity, and maximum quantity. The minimum quantity is your reorder point. Update the description to say exactly that.

**SHOW:** Duplicate again. Name `get_supplier_info`; Custom Resource Name `product.supplierinfo` (may appear as "Supplier Pricelist" or "Vendor Pricelist"); Fields to Include: `partner_id`, `product_tmpl_id`, `price`, `min_qty`, `delay`; Description: `Returns the vendor (partner_id), purchase price, minimum order quantity and delivery lead time in days (delay) for each product. Use this for questions about suppliers, prices and lead times.`

**SAY:** And tool number three: "get supplier info". The drawer is "product dot supplier info", which may show as "Supplier Pricelist". The fields: the partner, which is the vendor, the product, the price, the minimum order quantity, and "delay". In Odoo, "delay" means the delivery lead time in days. That's an odd name, so we explain it in the description: "delay is the lead time in days." Without that sentence, Stocky might think "delay" means the shipment is late.

**SHOW:** The canvas: Chat Trigger → AI Agent, with Anthropic Chat Model, Simple Memory and three Odoo tools hanging underneath. Press Cmd+S / Ctrl+S.

**SAY:** Step back and look. A doorbell, an intern, a brain, a notepad, and three hands, each reaching into a different drawer. And notice: every tool only uses "Get Many". Stocky can read, but it can't change anything in Odoo. That's on purpose. Reading first, acting later, with your approval. Save it.

**ON-SCREEN TEXT:** Stocky v1 is READ-ONLY. Safe to experiment.

---

## [ON CAMERA] Prompt Anatomy: Writing a Job Description for Your Intern (09:15–11:30)

Right now, Stocky has everything except the most important thing: instructions.

Think about the last time you hired someone for the warehouse or the purchasing team. You didn't just say, "Welcome, do inventory stuff." You gave them a job description. Who they are, what they're responsible for, which systems they can use, what they must never do, and how you want their reports to look.

A system prompt is exactly that. And every good one has five parts. I call it the prompt anatomy.

**One: Role.** Who is the agent? "You are Stocky, the inventory and procurement assistant for BrightLeaf Supplies in Columbus, Ohio." This sets the context, so it talks like a procurement professional, not a poet.

**Two: Goal.** What does success look like? "Help the team understand stock levels quickly and accurately so nothing runs out."

**Three: Tools.** What can it use, and when? List each tool and what's in it. "Use get supplier info for questions about suppliers and lead times."

**Four: Rules.** The guardrails. This is where your supply chain experience matters most. What counts as "running low"? At or below the reorder point. What must it never do? Never guess a number. Never invent a delivery date.

**Five: Output format.** How should the answer look? A table with SKU, product, on hand, reorder point and gap, sorted by urgency, with the source at the bottom.

Here's the thing most people miss: the AI doesn't know your business. It doesn't know that BrightLeaf calls it "reorder point" and the warehouse calls it "the red line". It doesn't know Mr. Harrison hates long answers. You know all of that. Writing the prompt is where your expertise turns into the agent's behaviour. You're not a programmer here. You're the manager writing the job description.

---

## [SCREEN RECORDING] Write Stocky's System Prompt (11:30–13:45)

**SHOW:** Open the AI Agent node. Scroll to "Options" → "Add Option" → "System Message". Delete the default text "You are a helpful assistant". Paste the full prompt:

```
# ROLE
You are Stocky, the inventory and procurement assistant for BrightLeaf Supplies, an industrial and packaging supplies distributor with a warehouse in Columbus, Ohio, USA. You support Sarah Mitchell (Procurement & Inventory Manager) and her team.

# GOAL
Help the team understand stock levels quickly and accurately, so that nothing runs out: answer questions about on-hand stock, reorder points, suppliers, prices and lead times.

# TOOLS
You have three read-only tools that look at live Odoo data:
1. get_products_and_stock: every product with its SKU (default_code), name, quantity on hand (qty_available) and unit cost (standard_price).
2. get_reorder_rules: the reorder point (product_min_qty) and maximum quantity (product_max_qty) for each product.
3. get_supplier_info: the vendor (partner_id), purchase price, minimum order quantity (min_qty) and delivery lead time in days (delay) for each product.
Always use the tools to get fresh data before answering any question about stock, reorder points, suppliers, prices or lead times. Never answer these from memory.

# RULES
- Only answer from data your tools returned in this conversation. If the tool data does not contain the answer, say: "I don't know. That information isn't in the Odoo data I can see." Then suggest where in Odoo Sarah could check.
- Never guess or invent numbers, dates, suppliers, purchase orders or delivery dates.
- A product is "running low" when quantity on hand is at or below its reorder point.
- A product is "on the watch list" when quantity on hand is above its reorder point by 15% or less.
- Always show the SKU (for example BL-1005) together with the product name.
- You can only read data. You cannot create, change or delete anything in Odoo. If someone asks you to, explain that you can't do that yet.
- If a question is unclear, ask one short clarifying question.
- Be short and practical. No small talk.

# OUTPUT FORMAT
- Start with a one-line answer.
- When listing products, use a table with the columns: SKU | Product | On hand | Reorder point | Gap (on hand minus reorder point).
- Sort low-stock items by urgency: the biggest shortfall as a percentage of the reorder point first.
- End with one line: "Source: Odoo (live) –" followed by the names of the tools you used.
```

**SAY:** Open the AI Agent node, go to Options, add "System Message", delete the default "You are a helpful assistant", and paste Stocky's job description. You'll find the full text in the Stocky Prompt Builder activity file, so you don't need to pause and type. Let's walk through it, because every line is there for a reason.

**SHOW:** Highlight the ROLE and GOAL blocks.

**SAY:** Role and Goal: who Stocky is, who it works for, and what success means. Notice I wrote the headings in capital letters with a hash sign. That's not code. It's just a tidy way to organise text so both you and the AI can find each section.

**SHOW:** Highlight the TOOLS block.

**SAY:** Tools: each tool, in plain English, with the Odoo field names in brackets, so Stocky can match "lead time" to the odd word "delay". And one important line: "Always use the tools to get fresh data. Never answer from memory." Stock changes every hour. Yesterday's number is a wrong number.

**SHOW:** Highlight the RULES block, especially the first two bullets and the "running low" definition.

**SAY:** Rules. The first two are the most important lines in the whole prompt. Only answer from tool data. And if the data isn't there, say "I don't know." Then, our business definitions: running low means at or below the reorder point, and the watch list is anything within fifteen percent above it. That's a decision a supply chain person makes, not a programmer. Change the fifteen percent to whatever your company uses.

**SHOW:** Highlight the OUTPUT FORMAT block.

**SAY:** And the output format: a one-line answer first, then a table, sorted by urgency, and a source line at the end. The source line is my favourite trick. It forces Stocky to tell you which drawers it opened, so you can always check.

**SHOW:** Close the panel. Save the workflow.

> PRO TIP: Save a copy of every prompt version in a document, with the date and what you changed (v1, v1.1, v1.2...). When an answer suddenly gets worse, you'll know exactly what changed.

> PAUSE & THINK: What is YOUR company's definition of "running low"? At the reorder point? Below safety stock? Fewer than X days of cover? Write it down as one sentence that a new intern could follow without asking you a single question.

---

## [SCREEN RECORDING] Stocky's First Real Conversation (13:45–17:00)

**SHOW:** Click "Chat" at the bottom. The memory was cleared by starting a new chat session. Type: `What's running low?` Press Enter. The AI Agent node shows a spinning icon, then each tool node lights up green in turn. After about 8 seconds, the answer appears:

```
4 products are at or below their reorder point.

| SKU     | Product                           | On hand | Reorder point | Gap  |
|---------|-----------------------------------|---------|---------------|------|
| BL-1004 | Industrial Safety Gloves (pair)   | 420     | 600           | -180 |
| BL-1005 | Pallet Jack Wheels (set)          | 18      | 25            | -7   |
| BL-1007 | Hydraulic Oil 20L                 | 31      | 40            | -9   |
| BL-1002 | Corrugated Shipping Box 18x12x10  | 1,180   | 1,500         | -320 |

Watch list: BL-1008 LED Warehouse Light 150W – 34 on hand, reorder point 30 (13% above).

Source: Odoo (live) – get_products_and_stock, get_reorder_rules
```

**SAY:** Here we go. The question Sarah asks every morning. "What's running low?" Press Enter. Watch the canvas. The brain lights up, then the stock tool, then the reorder rules tool. Stocky is opening the drawers. And here's the answer. Four products at or below the reorder point. Safety gloves, four hundred and twenty against six hundred. Pallet jack wheels, eighteen against twenty-five. Hydraulic oil, thirty-one against forty. And shipping boxes, one thousand one hundred and eighty against fifteen hundred.

**SAY:** Look at the order. The boxes have the biggest gap in units, minus three hundred and twenty, but they're at the bottom. Why? Because we told Stocky to sort by percentage shortfall. Gloves are thirty percent below their reorder point, boxes only twenty-one percent. That's the rule we wrote, followed exactly. It even flagged the LED lights on the watch list. Thirty-four against thirty. And with a twenty-eight-day lead time from Shenzhen, that's exactly the one Sarah would want to know about.

**SHOW:** Switch to the Odoo tab: Inventory → Products, list view, On Hand column. Point at Industrial Safety Gloves: 420, Pallet Jack Wheels: 18.

**SAY:** But don't trust it yet. Check it. Here's Odoo. Gloves, four hundred and twenty. Wheels, eighteen. The numbers match. Ten seconds instead of forty minutes.

**ON-SCREEN TEXT:** Before: ~40 minutes (export, VLOOKUP, colour, email). After: ~10 seconds.

**SHOW:** Back to the chat. Type: `Which supplier provides BL-1005 and what's the lead time?` Answer appears:

```
BL-1005 Pallet Jack Wheels (set) is supplied by Global Lift Parts, with a delivery lead time of 21 days.

- Purchase price: $38.00 per set
- Minimum order quantity: 10 sets
- Current stock: 18 sets, 7 below the reorder point of 25

With a 21-day lead time, an order placed today would arrive in about 3 weeks.

Source: Odoo (live) – get_products_and_stock, get_supplier_info
```

**SAY:** Second question: "Which supplier provides BL-1005, and what's the lead time?" Global Lift Parts. Twenty-one days. Thirty-eight dollars a set, minimum order ten sets. And without being asked, it connected the dots: we're seven below the reorder point, and an order today arrives in about three weeks. That's the kind of thinking a good intern does.

**SHOW:** Type: `And what about the hydraulic oil?` Answer:

```
BL-1007 Hydraulic Oil 20L is supplied by Gulf Lubricants, with a delivery lead time of 14 days.
- Purchase price: $54.00 per 20L drum
- Current stock: 31, 9 below the reorder point of 40

Source: Odoo (live) – get_products_and_stock, get_supplier_info
```

**SAY:** Now watch the memory. I'll just say, "And what about the hydraulic oil?" I didn't say "supplier" or "lead time". But Stocky remembered what we were talking about, thanks to Simple Memory, and gave me Gulf Lubricants, fourteen days. That's the notepad at work.

> PAUSE & THINK: Look at the "What's running low?" answer. If you were Sarah, which product would you order FIRST, and why? Hint: compare the gap with the lead time. Wheels are 7 below with a 21-day lead time; boxes are 320 below with a 5-day lead time.

---

## [SCREEN RECORDING] Watch the Agent Think: Reading the Execution Log (17:00–19:30)

**SHOW:** Below the canvas, open the "Logs" panel (it appears after a chat run). It lists the steps of the last run in order: "AI Agent" → "Anthropic Chat Model" → "get_products_and_stock" → "get_supplier_info" → "Anthropic Chat Model".

**SAY:** So far we've seen what Stocky said. Now let's see how it thought. Open the "Logs" panel at the bottom of the canvas. This is the step-by-step story of the last question. Read it from top to bottom like a diary.

**SHOW:** Click the first "Anthropic Chat Model" step. Show its output: the model requesting tool calls to `get_products_and_stock` and `get_supplier_info`.

**SAY:** Step one: the brain reads the question and our job description, and decides, "To answer this, I need the product list and the supplier info." It doesn't answer yet. It asks for tools. That's the big difference between an agent and a chatbot. A chatbot answers straight away from what it already knows. An agent first decides what it needs to find out.

**SHOW:** Click the "get_supplier_info" step. Show the output in table view, then switch to JSON view and highlight one record:

```
{
  "id": 5,
  "partner_id": [14, "Global Lift Parts"],
  "product_tmpl_id": [5, "[BL-1005] Pallet Jack Wheels (set)"],
  "price": 38.0,
  "min_qty": 10.0,
  "delay": 21
}
```

**SAY:** Step two: the Odoo tool runs. Click it and you can see exactly what Odoo sent back. I'll switch to JSON view. Remember JSON from Video 3? A labelled shopping list. Partner: Global Lift Parts. Product: BL-1005, Pallet Jack Wheels. Price: thirty-eight. Minimum quantity: ten. Delay: twenty-one. Every number in Stocky's answer is right here in the shopping list. Nothing was made up.

**SHOW:** Click the last "Anthropic Chat Model" step. Show the input (the tool results) and the output (the final answer text).

**SAY:** Step three: the brain reads the shopping lists and writes the answer in our format. So the pattern is always: think, use a tool, read the result, then answer. Sometimes it loops, think, tool, think, another tool, before answering. That loop is what makes it an agent.

**ON-SCREEN TEXT:** The agent loop: Think → Use a tool → Read the result → (repeat) → Answer

**SHOW:** Click the "Executions" tab at the top. Show the list of chat runs, each with a status and duration (about 6–9 seconds each). Open one to show the same frozen canvas.

**SAY:** And every conversation is also saved in the Executions tab, our logbook from Video 5. If Mr. Harrison ever asks, "Where did Stocky get that number on Tuesday?", you can open the run and show him the exact data Odoo returned. That's traceability. Supply chain people love traceability.

> PRO TIP: When an answer looks wrong, don't argue with the agent in the chat. Open the log. Either the tool returned the wrong data (a data problem in Odoo), the agent opened the wrong drawer (fix the tool description), or it read the right data and still got it wrong (fix the rules in the prompt). The log tells you which one.

---

## [ON CAMERA] The Confident Intern: What Hallucination Really Is (19:30–21:15)

Let me tell you about an intern I'll call Jake.

Jake was smart, keen and eager to please. In his second week, Mr. Harrison stopped by his desk and asked, "When do the LED warehouse lights from Shenzhen arrive?" Jake didn't know. But he didn't want to look bad in front of the director. So he said, "Tuesday, sir."

It sounded confident. Mr. Harrison promised a customer installation on Wednesday. And the lights? They hadn't even left the factory. Twenty-eight-day lead time.

Jake wasn't lying to hurt anyone. He just gave the answer that sounded most likely. And that is exactly what AI hallucination is.

Language models like Claude and ChatGPT are trained to produce the most likely next words. Most of the time, "likely" and "true" are the same thing. But when the AI doesn't have the facts, it can still produce something that sounds perfectly reasonable, with complete confidence. A date. A number. A supplier name. And it looks just as convincing as a real answer.

In supply chain, a confident wrong answer is worse than no answer. A wrong delivery date becomes a broken customer promise. A wrong stock number becomes a stock-out or an unnecessary rush order.

The fix is the same for Stocky as it was for Jake. One: give it the real data, through tools. Two: make it a rule that it may only answer from that data. And three: make "I don't know" an acceptable, even praised, answer. Let's catch Stocky in the act and then fix it.

---

## [SCREEN RECORDING] Catch a Hallucination, Then Fix It (21:15–23:45)

**SHOW:** Open the AI Agent node. Copy the full system message into a text file for safekeeping. Replace it with the weak one-liner: `You are a helpful inventory assistant for BrightLeaf Supplies.` Save. Open the chat and click the reset (new session) button.

**SAY:** For this experiment, I'll temporarily replace Stocky's job description with a lazy one-liner: "You are a helpful inventory assistant for BrightLeaf Supplies." That's what most people write. I've saved the good version safely. Now I'll start a fresh chat.

**SHOW:** Type: `When will purchase order P00027 from Global Lift Parts arrive?` The weak Stocky answers something like:

```
Purchase order P00027 from Global Lift Parts is expected to arrive in about 3 weeks, since their lead time is 21 days. You should receive it around the end of the month.
```

**SAY:** Now a question Stocky cannot answer, because it has no tool for purchase orders. "When will purchase order P zero zero zero two seven from Global Lift Parts arrive?" And look. "Expected to arrive in about three weeks, around the end of the month." It sounds great. It's completely made up. Stocky never saw that purchase order. In Video 5, our email said that order was already three days late! It took the lead time and invented a delivery date. That's Jake saying "Tuesday, sir."

**SHOW:** Open the Logs panel. Show that only `get_supplier_info` was called and no purchase order data exists anywhere in the log.

**SAY:** And here's how you catch it: open the log. There's no purchase order data anywhere. Only supplier info. The answer can't be traced, so it can't be trusted.

**SHOW:** Paste the full Stocky system prompt back into "System Message". Save. Reset the chat. Ask the same question. Stocky answers:

```
I don't know. That information isn't in the Odoo data I can see. I can read products, stock, reorder rules and supplier info, but not purchase orders, so I can't see P00027 or its delivery date.

What I can tell you: Global Lift Parts' standard lead time for BL-1005 is 21 days. To check P00027, open Purchase → Orders in Odoo and search for P00027.

Source: Odoo (live) – get_supplier_info
```

**SAY:** Now let's put the real job description back, reset the chat, and ask the exact same question. "I don't know. That information isn't in the Odoo data I can see." It explains what it CAN see, gives the one useful fact it has, the twenty-one day lead time, clearly labelled as a standard lead time, not a delivery date. And it tells Sarah exactly where to check: Purchase, Orders. That's the intern you want.

**SHOW:** Type two more trap questions, one at a time:
1. `How many BL-1011 do we have?` → "I don't know. I can't find a product with SKU BL-1011 in Odoo. The SKUs I can see run from BL-1001 to BL-1010."
2. `Order 50 more pallet jack wheels.` → "I can't do that yet. I can only read data in Odoo; I can't create purchase orders. BL-1005 is supplied by Global Lift Parts ($38.00 per set, 21-day lead time) if you'd like to raise the order yourself."

**SAY:** Two more traps. A product that doesn't exist, BL-1011. Stocky says it can't find it, and tells me which SKUs it can see. And an action it isn't allowed to take: "Order fifty more pallet jack wheels." Stocky says it can only read. Good. Ordering is next video, and it will always come to you for approval first.

**ON-SCREEN TEXT:** Reduce hallucination: 1) Give real data through tools 2) "Only answer from tool data" 3) "Say I don't know" 4) Ask for the source 5) Test with trap questions

> BEGINNER MISTAKE: Testing only the questions you know will work. Always include "trap" questions: things that don't exist, things the agent can't see, and things it isn't allowed to do. In today's Test Question Bank you'll run twenty questions, including the traps, and calculate Stocky's pass rate.

---

## [ON CAMERA] Outro: Stocky Can Read (23:45–26:00)

Take a second to appreciate what you just did. You built an AI agent that reads live data from an ERP, checks it against your business rules, answers in plain English, shows its sources, and admits when it doesn't know. With zero lines of code.

Three key takeaways.

**One.** An agent is a brain plus tools plus instructions. The Chat Trigger is the doorbell, Claude is the brain, Simple Memory is the notepad, and the Odoo tools are the hands. Give each tool a clear name, a clear description, and only the fields it needs.

**Two.** The system prompt is a job description, and it has five parts: Role, Goal, Tools, Rules and Output format. The Rules are where your supply chain expertise lives, like your definition of "running low".

**Three.** Trust, but verify. Open the log to watch the agent think, check numbers against the ERP, and fight hallucination with three habits: only answer from tool data, make "I don't know" acceptable, and always test with trap questions.

Now your activities. First, open **V06_Activity_Stocky_Prompt_Builder.docx**. It has Stocky's full prompt as an example, and space to write a version for YOUR company, with your own definition of running low. Second, open **V06_Activity_Test_Question_Bank.xlsx**. Ask Stocky the twenty test questions, mark each one pass or fail, and the sheet calculates your pass rate. Aim for eighteen out of twenty. Then take the Video 6 quiz.

Right now, Stocky can read. But Sarah still has to raise the purchase order herself. In the next video, Stocky learns to act. It will draft the purchase order in Odoo for you, and then stop and wait for your approval on email before anything happens. The manager's signature before the check goes out. That's Video 7: **Agents That Take Action: Draft Purchase Orders with Human Approval**. See you there.
