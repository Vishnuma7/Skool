# Video 9 Quiz: Memory & Reports
**Course:** The ERP Agent Blueprint | **Video 9:** Logging to a Database and the Monday Report | **Level:** Beginner

Answer all 10 questions, then check yourself with the Answer Key at the end. Aim for 8 out of 10 or better.

---

## Questions

**1. Why does Stocky need a Decision Log?**
- A) To make the Odoo database run faster
- B) To give the agent a memory and give the company an audit trail
- C) Because n8n will not run without a Google Sheet
- D) To replace the purchase orders in Odoo

**2. What does the n8n Google Sheets operation "Append Row" do?**
- A) Deletes the oldest row and adds a new one
- B) Overwrites row 2 with the newest data
- C) Adds a new row at the bottom of the sheet without changing existing rows
- D) Copies the whole sheet into a new tab

**3. Which of these is the BEST "Notes" entry for a Decision Log row?**
- A) "done"
- B) "RFQ"
- C) "Below reorder point 80. RFQ P00027 for 200 boxes from Apex Fasteners."
- D) "Approved by Sarah on Tuesday because stock was low and supplier ok"

**4. True or False: You only need to log the approved orders. Rejections are not important.**
- A) True
- B) False

**5. Sarah wants the Monday Report to arrive at 7 am Columbus time, but it keeps arriving at 2 am. What should she do?**
- A) Change the Schedule Trigger to 2 am
- B) Set the workflow's Timezone to America/New_York in the workflow Settings
- C) Ask Mr. Harrison to read it in the evening
- D) Delete the Schedule Trigger and run it by hand

**6. In the Monday Report workflow, why do we add an Aggregate node after reading the 10 products from Odoo?**
- A) To delete products that are out of stock
- B) To translate the data into English
- C) To combine the 10 separate items into one list, so the AI writes ONE report instead of ten
- D) To make the email arrive faster

**7. BrightLeaf has 10 SKUs. 6 are at or above their reorder point and 4 are below. What is the stock health %?**
- A) 40%
- B) 60%
- C) 64%
- D) 100%

**8. Why does the report prompt spell out the formula "stock on hand × unit cost" for money tied up in stock?**
- A) Because the AI cannot read numbers
- B) So the AI calculates the same way every week and the number matches your spreadsheet, instead of guessing its own method
- C) Because Gmail needs the formula to send HTML
- D) It isn't needed; it only makes the prompt longer

**9. Mr. Harrison needs to see the Google Sheets dashboard. Sarah is worried he might accidentally delete rows from the Decision Log. What should she do?**
- A) Share the sheet with him as Editor
- B) Email him a screenshot every month instead
- C) Share the sheet with him as Viewer, so he can look but not change anything
- D) Make the sheet public to anyone with the link, as Editor

**10. The daily reorder check keeps suggesting a new RFQ for hydraulic oil every morning, even though an order is already on the way. What is the best fix?**
- A) Turn off the daily reorder check permanently
- B) Raise the reorder point to 1,000 drums
- C) Add a rule: check the Decision Log first and don't suggest a second RFQ for a SKU that already has an open RFQ within its lead time
- D) Ask Tom to delete the extra RFQs every afternoon

---

## Answer Key

**1. B.** The log is the agent's memory (it can look up what it already did) and the company's audit trail ("if it isn't written down, it didn't happen").

**2. C.** Append means "add to the bottom", like writing on the next empty line of a notebook. Nothing existing is changed or deleted.

**3. C.** A good note is short, specific and readable by a human: the reason, the RFQ number, the quantity and the supplier. Option D mixes several fields (name, date) into one cell; those belong in their own columns.

**4. B (False).** A "no" is a decision too. Rejections and holds are often what people ask about later ("why didn't we order?"), so log every branch.

**5. B.** n8n may run in a different time zone. Set the workflow's Timezone in Settings so "7 am" means 7 am in Columbus.

**6. C.** n8n runs the next step once per item. Aggregate puts the 10 "loose receipts" into one "envelope", so the AI Agent runs once and writes one report.

**7. B.** Stock health % = SKUs at or above reorder point ÷ total SKUs × 100 = 6 ÷ 10 × 100 = 60%.

**8. B.** AI models write well but can be sloppy at maths when left to guess. Spelling out the formula keeps the number consistent and checkable against your spreadsheet.

**9. C.** Viewer access lets him read the dashboard and log but not edit. Only the n8n account should write to the Decision Log, so it stays a trustworthy audit trail.

**10. C.** This is exactly what memory is for. Reading the Decision Log before acting stops duplicate orders, one of the most expensive automation mistakes.
