# Video 2 Quiz: ERP Demystified
**Course:** The ERP Agent Blueprint | **Video:** 2 of 10 | **Questions:** 10 | **Time:** about 10 minutes

Choose the best answer for each question. The answer key with explanations is at the end, so try them all first.

---

## Questions

**1. Which everyday picture best describes an ERP?**
- A. A calculator on everyone's desk
- B. The company's central filing cabinet plus its rulebook, where every department keeps its records in one place
- C. A chat app for the warehouse team
- D. A folder of separate Excel files, one per department

**2. In the filing cabinet picture, what is a "record"?**
- A. The whole cabinet
- B. One drawer, such as Inventory
- C. One folder, such as one product or one purchase order
- D. One labelled box on a form, such as "Cost"

**3. In Excel terms, a field is most like:**
- A. A column
- B. A workbook
- C. A chart
- D. A password

**4. Why is the "Track Inventory" tick box (or "Storable Product" in older versions) so important?**
- A. It makes the product cheaper
- B. Without it, Odoo doesn't count the product's stock, so reports and agents can't see an on-hand quantity
- C. It sends an email to the supplier
- D. It is only needed for products sold online

**5. Why should every product have an Internal Reference (SKU) like BL-1001?**
- A. Odoo will not save a product without one
- B. It makes the product appear first in the list
- C. Names get typed in different ways, but a consistent code always identifies the same product, for humans and agents
- D. It sets the reorder point automatically

**6. When importing products, what does the "Test" button do?**
- A. Imports the file twice to be safe
- B. Checks every row for problems without saving anything
- C. Deletes old products
- D. Emails the file to Odoo support

**7. Scenario: Sarah has already created BL-1001 by hand. She now wants to import the rest of the catalogue. What should she do?**
- A. Import all ten products, including BL-1001, then delete one later
- B. Import only BL-1002 to BL-1010, so she doesn't create a duplicate bolt record
- C. Type all the remaining products by hand to be safe
- D. Rename BL-1001 first so the import doesn't notice it

**8. A reorder rule for BL-1005 (Pallet Jack Wheels) has Min 25 and Max 50. On hand is 18. What does Odoo suggest ordering on the Replenishment screen (with no other orders open)?**
- A. 7
- B. 25
- C. 32
- D. 50

**9. Scenario: Tom says the stock of hydraulic oil looks wrong, and Sarah wants to see every movement in and out of the warehouse for that product. Where should she look?**
- A. The product's "In / Out" smart button (the moves history), which is its paper trail
- B. The Sales app's Quotations list
- C. The Settings app
- D. The Discuss chat

**10. True or false: "An AI agent will fix bad ERP data on its own, so data quality matters less once you have one."**
- A. True
- B. False

---

## Answer Key

**1. B.** An ERP is one central filing cabinet plus a rulebook. Everyone reads and writes the same records, so there's one version of the truth.

**2. C.** A record is one folder: one product, one supplier, one purchase order. The cabinet is the ERP, drawers are modules and labelled boxes are fields.

**3. A.** A record is like a row and a field is like a column. That's why your Excel skills transfer directly to ERPs and databases.

**4. B.** Without inventory tracking, Odoo never counts the product. Any stock alert or agent will silently skip it, which is exactly what caused the "garbage in, garbage out" story in the video.

**5. C.** "M10 bolts" and "Hex Bolt M10" look different to a computer, but BL-1001 is always BL-1001. Agents rely on codes like this to avoid mix-ups.

**6. B.** Test checks the whole file and tells you which rows have problems, without saving anything. Always click Test before Import.

**7. B.** Odoo would create a second bolt record if she imported BL-1001 again. Duplicates confuse people and agents, so import only what doesn't exist yet.

**8. C.** The rule refills up to the Max: 50 minus 18 on hand = 32.

**9. A.** The In / Out button shows every stock move with date, locations, quantity and user. That paper trail is what makes the ERP a rulebook, not just a list.

**10. B. False.** An agent makes bad data more dangerous, because it states wrong numbers confidently. Clean data is the foundation the agent stands on.
