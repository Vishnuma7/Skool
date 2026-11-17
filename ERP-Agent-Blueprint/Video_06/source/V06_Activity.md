# V06 Activity: Stocky Prompt Builder
**Course:** The ERP Agent Blueprint | **Video 6** | **Time needed:** 25–35 minutes

## What you will do
A system prompt is a job description for your AI intern. In this worksheet you will:

1. Study Stocky's full v1 prompt, part by part (Role, Goal, Tools, Rules, Output format).
2. Answer a few "manager questions" about your own company.
3. Write your own version of the prompt for YOUR company, then paste it into the AI Agent node in n8n and test it.

You don't need any technical knowledge. If you can write clear instructions for a new hire, you can write a great prompt.

> PRO TIP: Keep every version of your prompt (v1, v1.1, v1.2...) in this document with the date and what you changed. When an answer suddenly gets worse, you'll know exactly why.

---

## Part 1: The five-part prompt anatomy

| Part | The question it answers | Stocky's example (short) |
|---|---|---|
| **Role** | Who is the agent, and who does it work for? | "You are Stocky, the inventory and procurement assistant for BrightLeaf Supplies, Pune." |
| **Goal** | What does success look like? | "Help the team understand stock levels quickly and accurately, so that nothing runs out." |
| **Tools** | What can it use, and when? | "get_supplier_info: vendor, price, minimum order quantity and lead time in days (delay)." |
| **Rules** | What must it always / never do? What do your business words mean? | "Only answer from tool data. Say 'I don't know'. Running low = at or below the reorder point." |
| **Output format** | How should the answer look? | "One-line answer, then a table: SKU, Product, On hand, Reorder point, Gap. End with the source." |

---

## Part 2: Stocky's full v1 prompt (BrightLeaf example)
Copy this into the AI Agent node → Options → System Message if you are following the BrightLeaf build.

```
# ROLE
You are Stocky, the inventory and procurement assistant for BrightLeaf Supplies, an industrial and packaging supplies distributor with a warehouse in Pune, India. You support Priya Sharma (Procurement & Inventory Manager) and her team.

# GOAL
Help the team understand stock levels quickly and accurately, so that nothing runs out: answer questions about on-hand stock, reorder points, suppliers, prices and lead times.

# TOOLS
You have three read-only tools that look at live Odoo data:
1. get_products_and_stock: every product with its SKU (default_code), name, quantity on hand (qty_available) and unit cost (standard_price).
2. get_reorder_rules: the reorder point (product_min_qty) and maximum quantity (product_max_qty) for each product.
3. get_supplier_info: the vendor (partner_id), purchase price, minimum order quantity (min_qty) and delivery lead time in days (delay) for each product.
Always use the tools to get fresh data before answering any question about stock, reorder points, suppliers, prices or lead times. Never answer these from memory.

# RULES
- Only answer from data your tools returned in this conversation. If the tool data does not contain the answer, say: "I don't know. That information isn't in the Odoo data I can see." Then suggest where in Odoo Priya could check.
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

### Spot the purpose (warm-up, 5 minutes)
For each line from Stocky's prompt, write which part it belongs to (Role / Goal / Tools / Rules / Output format) and what could go wrong WITHOUT it.

| Line from the prompt | Part | What could go wrong without it? |
|---|---|---|
| "Never guess or invent numbers, dates, suppliers, purchase orders or delivery dates." | | |
| "get_supplier_info: ... delivery lead time in days (delay)" | | |
| "Sort low-stock items by urgency: the biggest shortfall as a percentage first." | | |
| "You support Priya Sharma (Procurement & Inventory Manager) and her team." | | |
| "End with one line: Source: Odoo (live) – ..." | | |

---

## Part 3: Manager questions about YOUR company
Answer these in plain English first. Your answers become the prompt in Part 4.

**1. Role.** What will you call your agent, and who does it support? (Name, company, location, team)

Answer: ______________________________________________________________

**2. Goal.** If this agent does a perfect job for one month, what has changed for you? (e.g. "no stock-outs on A-items", "Monday report done by 9:00")

Answer: ______________________________________________________________

**3. Tools.** Which "drawers" of your ERP does it need to read? For each, list the 3–6 fields that matter.

| Tool name (lowercase_with_underscores) | What's in this drawer (plain English) | Fields it needs |
|---|---|---|
| ________ | ________ | ________ |
| ________ | ________ | ________ |
| ________ | ________ | ________ |

**4. Your definition of "running low".** (At the reorder point? Below safety stock? Fewer than X days of cover? Does it differ for A, B and C items?)

Answer: ______________________________________________________________

**5. Your watch-list rule.** (e.g. "within 15% above the reorder point", "lead time longer than 21 days and less than 30 days of cover")

Answer: ______________________________________________________________

**6. Never-do list.** Three things your agent must never do or say. (e.g. never promise a delivery date to a customer, never share purchase prices, never guess)

- 1. ______________________________________________
- 2. ______________________________________________
- 3. ______________________________________________

**7. "I don't know" sentence.** Exactly what should the agent say when the data isn't there, and where should it send people to check?

Answer: ______________________________________________________________

**8. Output format.** How does YOUR manager like answers? (Table? Bullets? Max length? Currency? Units?)

Answer: ______________________________________________________________

---

## Part 4: Write your prompt (v1)
Fill in each block using your answers from Part 3. Keep the capital-letter headings; they help both you and the AI.

```
# ROLE
You are ____________, the ____________ assistant for ____________ (company), based in ____________. You support ____________ and their team.

# GOAL
Help the team ________________________________________________.

# TOOLS
You have these read-only tools:
1. ____________: ____________________________________________
2. ____________: ____________________________________________
3. ____________: ____________________________________________
Always use the tools to get fresh data before answering. Never answer from memory.

# RULES
- Only answer from data your tools returned in this conversation. If the data does not contain the answer, say: "____________________________________"
- Never guess or invent ____________________________________________.
- "Running low" means ____________________________________________.
- "Watch list" means ____________________________________________.
- Never ____________________________________________.
- If a question is unclear, ask one short clarifying question.

# OUTPUT FORMAT
- ____________________________________________
- ____________________________________________
- End with the source and the tools you used.
```

---

## Part 5: Test it (10 minutes)
1. Paste your prompt into the AI Agent node: **Options → System Message**. Save.
2. Click **Chat**, reset the session, and ask three normal questions and two trap questions (something that doesn't exist, and something the agent isn't allowed to do).
3. Open the **Logs** panel for one answer and check that every number came from a tool.
4. Record the results in **V06_Activity_Test_Question_Bank.xlsx** (sheet "My Company Tests").

| # | Question I asked | Did it use the right tool? (Y/N) | Correct answer? (Y/N) | What I changed in the prompt |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 (trap) | | | | |
| 5 (trap) | | | | |

---

## Part 6: Prompt version log

| Version | Date | What I changed | Why | Pass rate after |
|---|---|---|---|---|
| v1 | | First version | | |
| v1.1 | | | | |
| v1.2 | | | | |

> BEGINNER MISTAKE: Writing "You are a helpful assistant" and nothing else. In Video 6 we saw that exact prompt invent a delivery date for PO P00027. Your Rules section is what stops that.

**Done?** Share your Role and your "running low" definition (no company secrets, no keys!) in the community, and compare with other supply chain pros.
