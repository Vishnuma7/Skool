# Video 4 Quiz: Databases Without Fear: Your Data's Home
**Course:** The ERP Agent Blueprint | **Level:** Beginner | **Questions:** 10 | **Time:** about 10 minutes

Choose the best answer for each question. The answer key with explanations is at the end. Try the whole quiz first, no peeking!

---

## Questions

**1. Using this course's analogy, what is a database?**
- A. A very large PDF file
- B. A super-organised Excel workbook, where tables are sheets, rows are records and columns are fields
- C. A folder of emails
- D. A type of AI model

**2. In BrightLeaf's Stock_Log table, what does one row represent?**
- A. One field, such as "Qty_On_Hand"
- B. All products for one supplier
- C. One record: a single stock check for one SKU on one date
- D. The total stock in the warehouse

**3. Why is "SUP-002" a better way to identify PackRight Industries than the name "PackRight Industries"?**
- A. IDs look more professional
- B. IDs are shorter to type
- C. Names get spelled differently ("Pack Right Ind.", "PACKRIGHT"), but a unique ID never changes and never repeats, so totals and lookups stay correct
- D. Google Sheets doesn't allow names in cells

**4. Which cell follows the "one fact per cell" rule for the Qty_On_Hand column?**
- A. `18 sets - urgent!`
- B. `approx 18`
- C. `18`
- D. `18 (see Ravi's email)`

**5. Why are merged cells dangerous in a data table?**
- A. They make the file larger
- B. Only the top cell of a merge actually holds the value, so when you sort, filter or let an agent read it, the other rows look empty
- C. Google Sheets can't print merged cells
- D. Merged cells are only a problem in Odoo

**6. True or False: Colouring a cell red is a reliable way to tell an AI agent that a product is urgent.**
- A. True
- B. False

**7. Which date format did we use in the Stock_Log, and why?**
- A. 03/04/26, because it is the shortest
- B. "Nov 16", because it is friendly
- C. 2026-11-16 (year-month-day), because it can't be misread in different countries and it sorts correctly
- D. Any format, because Google Sheets fixes it automatically

**8. The messy export shows "21 cartons (12 rolls each) + 8 loose" for stretch wrap (BL-1003), whose reorder point is 200 rolls. What is the clean Qty_On_Hand, and what is the status?**
- A. 21, REORDER
- B. 260, OK
- C. 12, REORDER
- D. 200, REORDER

**9. Scenario: BrightLeaf stops buying from Gulf Lubricants (SUP-005). Priya wants Stocky to stop checking them. What should she do in the Suppliers table?**
- A. Delete the SUP-005 row so it disappears
- B. Untick the "Active" checkbox for SUP-005, so the history still links to it but Stocky skips it
- C. Colour the row grey
- D. Change the Supplier_ID to "OLD"

**10. Scenario: Priya's Stock_Log has a formula `=IF(D2<=F2,"REORDER","OK")`, but row 7 shows an error. Cell D7 contains "31 - urgent!!" for BL-1007 Hydraulic Oil (reorder point 40). What is the best fix?**
- A. Delete the formula
- B. Put 31 in D7 and move "urgent" into the Note column
- C. Make D7 bold so the formula notices it
- D. Merge D7 with the Note column

---

## Answer Key

**1. B. A super-organised Excel workbook.** Tables are like sheets, rows are records (one thing each) and columns are fields (one type of information each). You already know most of this from Excel.

**2. C. One record: a single stock check.** A log adds a new row for every check and never overwrites old ones, like a ship's logbook. That's how Priya can see trends later.

**3. C. Names vary; IDs don't.** PackRight existed three times under different spellings, which hid 41% of packaging spend. A unique ID, like a passport number, keeps every record pointing to the same supplier.

**4. C. `18`.** Only a clean number can be compared with the reorder point in a formula. The unit goes in the Unit column and comments go in the Note column.

**5. B. Only the top cell holds the value.** Unmerge (Format > Merge cells > Unmerge) and copy the value down, so every row carries its own supplier.

**6. B. False.** Agents read values, not colours. If something is urgent, write "urgent" in a Note column.

**7. C. 2026-11-16.** "03/04" means 3 April in India and 4 March in the USA. Year-month-day is unambiguous for humans and machines, and it sorts in the right order.

**8. B. 260, OK.** 21 cartons × 12 rolls + 8 loose rolls = 260 rolls, which is above the 200 reorder point. Reading "21" as rolls would trigger an unnecessary order of about 200 rolls (about $1,840).

**9. B. Untick "Active".** Never delete records that old purchase orders and logs still point to. Mark them inactive instead, and the agent can skip them.

**10. B. Put 31 in D7 and move "urgent" to the Note column.** One fact per cell keeps D7 a real number, so the formula works again: 31 is below the reorder point of 40, so it shows REORDER.
