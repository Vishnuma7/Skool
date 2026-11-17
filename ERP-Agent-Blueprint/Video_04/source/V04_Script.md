# Video 4: Databases Without Fear: Your Data's Home
**Course:** The ERP Agent Blueprint | **Length:** 22 min | **Level:** Beginner

**Learning objectives:**
- Explain what a database is using the "super-organised Excel workbook" analogy: tables, rows (records) and columns (fields)
- Understand why every record needs a unique ID, and why names are not good enough
- Apply the five golden rules of agent-ready data: one table per thing, one header row, one fact per cell, a unique ID on every row, consistent types and units
- Build Stocky's two starter tables in Google Sheets: **Suppliers** and **Stock_Log**
- Clean up a messy BrightLeaf stock export: unmerge cells, split mixed units, remove duplicates and fill blank IDs

**Before recording, prepare:**
- Chrome, signed in to a Google account (a free Gmail account is fine)
- Tab 1: your BrightLeaf Odoo trial from Video 2, on **Inventory > Products > Products**
- Tab 2: an empty browser tab (we'll type `sheets.new`)
- Tab 3: a Google Sheet called "BrightLeaf Messy Export", made by importing the **Messy_Export** tab from `V04_Activity_Messy_Data_Makeover.xlsx` (**File > Import > Upload**, import location **Insert new sheet(s)**). Keep the merged cells and red fills; they are the point of the demo.
- A "before vs after" slide: messy export on the left, clean Stock_Log on the right

**Resources for this video:**
- Activity: `V04_Activity_Messy_Data_Makeover.xlsx`
- Quiz: `V04_Quiz.docx`

---

## [ON CAMERA] Intro (00:00–02:00)

**SAY:**
Two hundred rolls of stretch wrap. That's what BrightLeaf ordered last month that it didn't need. One thousand eight hundred and forty dollars of film, sitting on a rack in the Pune warehouse, because of one cell in a spreadsheet.

Here's what happened. The stock sheet said "21" next to stretch wrap, SKU BL-1003. The reorder point is 200. Twenty-one is way below 200, so a purchase order went out. But Ravi's team hadn't counted rolls. They'd counted cartons. Twenty-one cartons of twelve rolls, plus eight loose rolls. Two hundred and sixty rolls. Plenty of stock. The number was right. The unit was missing.

Now imagine that sheet being read not by a tired human on a Monday morning, but by an AI agent that reads it every hour and can raise a purchase order in seconds. Messy data doesn't just slow an agent down. It makes the agent confidently wrong, at speed.

That's why this video exists. Today you'll learn what a database really is, and you'll find out you already know most of it, because if you can use Excel, you're ninety percent there. We'll build Stocky's two home tables in Google Sheets: a Suppliers table and a Stock Log. You'll learn five golden rules that make data safe for an agent to read. And then we'll take a genuinely messy BrightLeaf export, merged cells, duplicates, "approx 300", the works, and make it clean, live, together.

No code, no SQL, nothing to install. If you've ever fought with a spreadsheet someone else built, this one's going to feel very satisfying. Let's open the filing cabinet.

---

## [SCREEN RECORDING] What a Database Really Is (02:00–05:00)

**SHOW:** The Odoo tab. **Inventory > Products > Products**. Click the **list view** icon (the small lines icon in the top-right, next to the kanban/cards icon).

**SAY:**
Let's start somewhere familiar, your BrightLeaf Odoo from Video 2. I'm in Inventory, Products, and I'm switching from the picture cards to the list view, the icon with the little lines on the top right.

Look at this. Rows and columns. Each row is one product. Each column is one piece of information about that product: the reference, the name, the sales price, the cost, the quantity on hand.

Guess what? Underneath, Odoo stores this in a database. And a database, at the level we need, is simply a super-organised Excel workbook.

**ON-SCREEN TEXT:** Database = a super-organised workbook · Table = a sheet · Row = a record · Column = a field

**SAY:**
Four words, and you know all of them already.

A **table** is like one sheet in a workbook. Odoo has a table for products, a table for suppliers, a table for purchase orders.

A **row** is one **record**, one thing. One product. One supplier. One stock count.

A **column** is one **field**, one type of information that every record has. Product name. Cost. Lead time.

And the **database** is the whole workbook holding all of those tables together.

**SHOW:** Click the row for **BL-1005 Pallet Jack Wheels (set)** to open it. Point at the end of the browser's address bar, where Odoo shows a number for this record.

**SAY:**
Now here's something most people never notice. I'll open the pallet jack wheels. Look at the very end of the web address. There's a number. That number is Odoo's own internal ID for this product. It never changes. You can rename the product, change the price, change the supplier, and that number stays the same. Hold on to that idea, because unique IDs are going to save us in a few minutes.

**SHOW:** Switch to the empty tab. Type `sheets.new` in the address bar. A blank Google Sheet opens.

**SAY:**
So why are we using Google Sheets as Stocky's database instead of something fancy? Three reasons.

One, it's free and you already know how to use it. Two, it lives online, so our automation tool, n8n, can reach it from anywhere, whereas an Excel file sitting on your laptop is locked inside your laptop. And three, you can open it and see exactly what Stocky wrote. Nothing is hidden in a black box.

There's an app called Airtable that does the same job with a few more features, and it's a fine alternative. But for learning, Google Sheets is perfect.

My shortcut: I just typed "sheets dot new" in the address bar, and a blank sheet opened instantly. I'll click the title "Untitled spreadsheet" and rename it "BrightLeaf Stocky Database".

> PRO TIP: `sheets.new` creates a new Google Sheet in one step. It works for any signed-in Google account.

---

## [ON CAMERA] Real-World Story: The Supplier Who Existed Three Times (05:00–06:30)

**SAY:**
Before we build anything, a story about why IDs matter.

Last year Mr. Kapoor asked Priya a simple question. "How much do we spend with PackRight Industries? I want to negotiate a volume discount."

Priya pulled the purchase history into Excel and filtered on "PackRight Industries". Answer: about eighteen percent of BrightLeaf's packaging spend. Not much leverage. Mr. Kapoor dropped the idea.

Six months later, Priya found the problem. PackRight existed three times. "PackRight Industries". "Pack Right Ind." with a space. And "PACKRIGHT (Mumbai)" in capitals, typed by someone in a hurry. Three spellings, one company. When she added them up, PackRight was forty-one percent of packaging spend. They'd had real negotiating power the whole time, and they'd left it on the table.

That's the problem with names. People spell them differently, companies get renamed, and two customers can both be called "Sharma Traders".

The fix is a **unique ID**, like a passport or Aadhaar number. Thousands of people are called Priya Sharma, but each has one passport number. If PackRight is supplier SUP-002, every purchase order and every stock row points to SUP-002. Spell the name any way you like; the total is always right.

For an agent this matters even more. Agents guess too, but sometimes wrongly, and they don't tell you they guessed. So never make your agent guess who you mean. Give everything an ID.

---

## [SCREEN RECORDING] Building the Suppliers Table (06:30–10:30)

**SHOW:** The new "BrightLeaf Stocky Database" sheet. Double-click the tab name **Sheet1** at the bottom. Type `Suppliers`. Press Enter.

**SAY:**
Let's build Stocky's first table. One table for one kind of thing. This table is about suppliers, and only suppliers. I double-click the tab at the bottom and rename it "Suppliers".

**SHOW:** Type these headers in row 1, A to I: `Supplier_ID`, `Supplier_Name`, `City`, `Country_Code`, `Currency`, `Latitude`, `Longitude`, `Contact_Email`, `Active`.

**SAY:**
Now the headers, the column names, in row 1. Supplier ID, supplier name, city, country code, currency, latitude, longitude, contact email, and active.

Notice two things about how I'm writing them. First, there's exactly one header row. No title above it, no "BrightLeaf supplier list, updated by Priya" in a merged banner. Row 1 is headers, and data starts in row 2. Agents and automation tools expect that.

Second, I'm using underscores instead of spaces, like "Supplier underscore ID". Spaces in headers work in Sheets, but they cause small annoyances in automation tools later. Underscores never do. It's a two-second habit that saves real headaches.

**SHOW:** Select row 1. Click **Bold**. Then **View > Freeze > 1 row**. Scroll down to show the header stays visible.

**SAY:**
I'll make the headers bold, then View, Freeze, one row. Now when the list gets long, the headers stay on screen.

**SHOW:** Type the six suppliers:

| Supplier_ID | Supplier_Name | City | Country_Code | Currency | Latitude | Longitude | Contact_Email | Active |
|---|---|---|---|---|---|---|---|---|
| SUP-001 | Apex Fasteners | Pune | IN | INR | 18.52 | 73.86 | orders@apexfasteners.example | TRUE |
| SUP-002 | PackRight Industries | Mumbai | IN | INR | 19.08 | 72.88 | sales@packright.example | TRUE |
| SUP-003 | SafeHands Co. | Chennai | IN | INR | 13.08 | 80.27 | supply@safehands.example | TRUE |
| SUP-004 | Global Lift Parts | Shenzhen | CN | CNY | 22.54 | 114.06 | export@globallift.example | TRUE |
| SUP-005 | Gulf Lubricants | Dubai | AE | AED | 25.20 | 55.27 | trade@gulflube.example | TRUE |
| SUP-006 | Shenzhen BrightTech | Shenzhen | CN | CNY | 22.54 | 114.06 | b2b@brighttech.example | TRUE |

**SAY:**
Now the data. Supplier ID first, SUP dash 001. Apex Fasteners, Pune. SUP-002, PackRight Industries, Mumbai. All the way to SUP-006, Shenzhen BrightTech.

See the ID pattern? Three letters that tell you what kind of thing it is, a dash, and a number with leading zeros. SUP for suppliers, and in a minute LOG for stock log entries. When you see "SUP-004" in an email, you instantly know it's a supplier, not a product.

Now look at the latitude and longitude columns. Recognise those numbers? 22.54 and 114.06. That's Shenzhen, the exact numbers we sent to the weather API in the last video. This is where it all connects. Later, Stocky will read this table, take each supplier's latitude and longitude, and build its own weather request. Same with the currency column: it feeds the currency API. Your database becomes the agent's to-do list.

> PAUSE & THINK: Why do Global Lift Parts and Shenzhen BrightTech have the same city and coordinates but different Supplier_IDs? Pause and answer before I tell you.

**SAY:**
Because they're different companies. Same city, same weather, but different contracts, different products, different people to call. The ID identifies the supplier, not the city.

**SHOW:** Select D2:D100. Go to **Data > Data validation**. In the sidebar, click **Add rule**. Under **Criteria**, choose **Dropdown**. Enter options `IN`, `CN`, `AE`. Click **Done**. Click D2 to show the dropdown arrow.

**SAY:**
Here's a trick that prevents mess before it happens. I select the country code column, then Data, Data validation, Add rule. For criteria, I choose "Dropdown", and I type the allowed values: IN, CN, AE. Done.

Now nobody can type "India" in one row, "IND" in another and "in" in a third. They pick from the list. A dropdown is a tiny guard dog for your data. I'll do the same for the currency column: INR, CNY, AED.

**SHOW:** Select I2:I100. **Insert > Checkbox**. Checkboxes appear, already ticked for the six rows that said TRUE.

**SAY:**
Last one. The "Active" column. I select it and click Insert, Checkbox. TRUE becomes a ticked box. If BrightLeaf stops buying from a supplier, Priya unticks it. We don't delete the row, because old purchase orders still point to that ID. We just mark it inactive, and Stocky will skip it.

> BEGINNER MISTAKE: Deleting old suppliers or products. Mark them inactive instead. Deleting breaks the history that still points to their IDs.

---

## [SCREEN RECORDING] Building the Stock Log (10:30–14:00)

**SHOW:** Click the **+** at the bottom-left to add a sheet. Rename it `Stock_Log`. Type headers in A1:J1: `Log_ID`, `Log_Date`, `SKU`, `Qty_On_Hand`, `Unit`, `Reorder_Point`, `Status`, `Supplier_ID`, `Logged_By`, `Note`. Bold, then **View > Freeze > 1 row**.

**SAY:**
Second table: the Stock Log. This is where Stocky will write down every stock check it does. I click the plus sign at the bottom, rename the tab "Stock underscore Log", and add the headers: log ID, log date, SKU, quantity on hand, unit, reorder point, status, supplier ID, logged by, and note. Bold and freeze.

A log is like a ship's logbook or a diary. You never rub out yesterday's entry. Every check gets a brand-new row. That way, three months from now, Priya can ask, "How fast were we burning through safety gloves in October?" and the answer is sitting right there.

**SHOW:** Type three rows:

| Log_ID | Log_Date | SKU | Qty_On_Hand | Unit | Reorder_Point | Status | Supplier_ID | Logged_By | Note |
|---|---|---|---|---|---|---|---|---|---|
| LOG-0001 | 2026-11-16 | BL-1005 | 18 | set | 25 | | SUP-004 | Priya | 3 pallet jacks waiting for wheels |
| LOG-0002 | 2026-11-16 | BL-1002 | 1180 | each | 1500 | | SUP-002 | Priya | |
| LOG-0003 | 2026-11-16 | BL-1001 | 145 | box | 80 | | SUP-001 | Priya | |

**SAY:**
Let me add three entries. LOG-0001, today's date, BL-1005, the pallet jack wheels. Quantity: 18. Unit: set. Reorder point: 25. Supplier: SUP-004. Logged by Priya. And in the note column: "3 pallet jacks waiting for wheels."

Now pay close attention to the quantity cell. I typed "18". Just the number. Not "18 sets". Not "18 - urgent!". The unit has its own column. The comment has its own column. This is the most important rule in this whole video: **one fact per cell**.

Why? Because "18" is a number. You can add it, compare it, and ask "is it below 25?". But "18 sets - urgent!" is just text. A formula can't do maths with it, and an agent has to guess what you meant.

**SHOW:** Select column B. **Format > Number > Custom date and time**. Choose the pattern that shows `2026-11-16` (year-month-day). Click **Apply**.

**SAY:**
That brings us to data types. Every column holds one type of thing. Quantity holds numbers. Names hold text. Active holds true or false. And dates hold real dates, not text that looks like a date.

I select the date column, then Format, Number, Custom date and time, and pick year-month-day. Why? Because "03/04" means the 3rd of April in India and March the 4th in America. 2026-11-16 can't be misread by anyone, human or machine, and it sorts correctly.

**SHOW:** Click G2. Type `=IF(D2<=F2,"REORDER","OK")`. Press Enter. Drag the fill handle down to G4. Results: REORDER, REORDER, OK.

**SAY:**
Now let's make the table do some work. In the status column I type: equals IF, open bracket, D2 less than or equal to F2, comma, "REORDER" in quotes, comma, "OK" in quotes, close bracket. In English: if quantity on hand is at or below the reorder point, say REORDER, otherwise say OK.

I drag it down. Pallet jack wheels, 18 against 25: REORDER. Corrugated boxes, 1,180 against 1,500: REORDER. Hex bolts, 145 against 80: OK.

That formula only works because quantity and reorder point are clean numbers. If D2 said "18 sets", this would break. Clean data is what makes the smart stuff possible.

**SHOW:** In K1 type `Supplier_Name`. In K2 type `=XLOOKUP(H2,Suppliers!A:A,Suppliers!B:B)`. Drag down. Names appear: Global Lift Parts, PackRight Industries, Apex Fasteners.

**SAY:**
One last bit of magic, for my fellow Excel lovers. The stock log only stores the supplier ID, not the name. But I can look up the name from the Suppliers table. In K2: equals XLOOKUP, H2, then the Suppliers ID column, then the Suppliers name column. Drag down. There they are.

This is what makes it a real database. The name lives in one place only. If PackRight renames itself tomorrow, Priya changes it once, and every stock log row updates instantly. In database language, this ID connection is called a relationship. You've just built one.

---

## [ON CAMERA] The Five Golden Rules of Agent-Ready Data (14:00–15:30)

**SAY:**
Let's pull that together into five golden rules. Write these down, or screenshot this.

Rule one: **one table per thing.** Suppliers in one table, stock checks in another. Don't mix supplier details into the stock log, or stock numbers into the supplier list.

Rule two: **one header row, in row 1.** No titles, no blank rows on top, no notes above the headers. Data starts in row 2.

Rule three: **one fact per cell.** Quantity in one cell, unit in another, comment in another. If you ever type a number followed by a word in the same cell, stop and split it.

Rule four: **a unique ID on every row.** Not a name. An ID that never changes and never repeats: SUP-001, BL-1005, LOG-0001.

Rule five: **consistent types and units.** Dates are real dates in one format. Numbers are numbers. Units are written down, never assumed.

And here's a bonus rule that's really part of the others: **no merged cells, and no colours that carry meaning.** A red cell that means "urgent" is invisible to an agent. Agents read values, not colours. If it's urgent, write "urgent" in the note column.

> PAUSE & THINK: Think of the stock or supplier spreadsheet you use most at work. Pause the video. Which of these five rules does it break? Most real spreadsheets break at least three. Write down your top one; you'll fix it in the activity.

---

## [SCREEN RECORDING] The Messy Data Makeover (15:30–19:30)

**SHOW:** Switch to the "BrightLeaf Messy Export" sheet. Slowly scroll across it. Merged title rows at the top, a merged Supplier column, red cells, "approx 1,850", "18 - urgent!!", a TOTAL row.

**SAY:**
Now the fun part. This is BrightLeaf's real-world stock sheet. It started as an Odoo export three years ago and has been passed between five people since. You might recognise some of these crimes.

Merged title rows. Supplier names merged across several rows. Quantities like "145 boxes", "approx 1,850" and "18 - urgent!!". "BL 1002" with a space next to "BL-1002" with a dash. A blank SKU. Dates in five different formats. Red cells only Ravi understands. And a TOTAL row that just says "lots". A human can muddle through. An agent will stumble on every one. Let's fix them.

**SHOW:** Select the merged title rows 1–3. Right-click > **Delete rows 1 - 3**.

**SAY:**
Fix one: I delete the top three rows: the merged title, the "prepared by" line and the blank row. Now row 1 is the headers.

**SHOW:** Select column C. **Format > Merge cells > Unmerge**. Supplier names now only appear in the first row of each group; the cells below are blank. Copy each supplier name down into its blank cells.

**SAY:**
Fix two: merged cells. The supplier column looks tidy, but only the top cell of a merge actually holds the name. The rows underneath are empty, so if you sort or filter, products lose their supplier. Format, Merge cells, Unmerge. See the blanks? I copy each name down. Every row now knows its own supplier.

**SHOW:** Select column A. **Edit > Find and replace**. Find `BL ` (with a space), replace with `BL-`. Click **Replace all**. Then **Data > Data cleanup > Trim whitespace**.

**SAY:**
Fix three: inconsistent IDs. To a computer, "BL 1002" and "BL-1002" are as different as "apple" and "banana". Edit, Find and replace, "BL space" with "BL dash", Replace all. Then Data, Data cleanup, Trim whitespace, to remove invisible spaces, the number one reason a VLOOKUP says "not found" when you can see the value right there.

**SHOW:** Select all data. **Data > Data cleanup > Remove duplicates**. Tick **Data has header row**. Choose columns **Item Code** and **Last Count Date** only. Click **Remove duplicates**. Then delete the remaining duplicate BL-1002 row by hand after comparing.

**SAY:**
Fix four: duplicates. Data, Data cleanup, Remove duplicates, data has a header row. The duplicate hex bolts disappear. The two corrugated box rows had different date formats, so I delete one by hand. Before this, a stock total would have counted 2,360 boxes instead of 1,180, which is above the reorder point of 1,500, so the reorder alert would never have fired.

**SHOW:** Insert a new column next to Qty called **Unit**. Rewrite the quantities one by one: `145 boxes` → 145 | box; `21 cartons (12 rolls each) + 8 loose` → 260 | roll; `approx 1,850` → 1850 | roll, note "estimate, recount"; `18 - urgent!!` → 18 | set, note "urgent"; `31 (check w/ Ravi)` → 31 | drum; `34 nos` → 34 | each.

**SAY:**
Fix five: one fact per cell. I insert a Unit column and split every quantity. "145 boxes" becomes 145 and "box". "approx 1,850" becomes 1,850, with "estimate, recount" in the remarks. And our stretch wrap: "21 cartons, 12 rolls each, plus 8 loose" becomes 260 rolls, because the reorder point is in rolls. Not a stock-out. The eighteen-hundred-dollar cell, fixed in five seconds.

**SHOW:** Click the blank SKU cell in the gloves row. Check the Products list. Type `BL-1004`. Then in the red-filled rows, type "urgent per Ravi" into Remarks and clear the fill colour (**Fill color > Reset**). Delete the TOTAL row.

**SAY:**
Fix six: the blank ID. The safety gloves have no SKU. The product list says BL-1004. A row without an ID is a parcel without a label.

Fix seven: the red cells meant "urgent", so I write that in the remarks and reset the colour. And the TOTAL row goes. Totals belong in reports, not data tables, or the agent counts them as a product.

**SHOW:** Side-by-side slide: messy (17 rows, 2 red cells) vs clean (10 rows, a Status column showing 4 REORDER and 6 OK).

**SAY:**
Before and after. Messy: seventeen rows and two red "urgent" cells. Clean: ten rows, one per product, and four need reordering: boxes, gloves, wheels and hydraulic oil. Two surprises. The packing tape coloured red for "urgent"? 1,850 rolls against a reorder point of 1,000. Fine. And the hydraulic oil nobody flagged is at 31 drums against 40, with a 14-day lead time from Dubai. That's a real emergency, and the messy sheet was hiding it under "check with Ravi".

---

## [ON CAMERA] Common Mistakes (19:30–20:30)

**SAY:**
Three quick mistakes I see all the time, so you can skip them.

First, cleaning the data once and then letting it get messy again. Use dropdowns and checkboxes, like we did, so mess can't get in. Prevention beats a monthly clean-up.

Second, making the database pretty. Merged headers, colours, blank spacer rows, a logo at the top. Pretty is for reports. The database should be boring. Boring is reliable.

Third, building one giant sheet with everything in it. Supplier address, product, stock, purchase orders, all in one forty-column monster. Split it into tables that connect through IDs. Your future self, and your agent, will thank you.

---

## [ON CAMERA] Outro (20:30–22:00)

**SAY:**
Let's recap with three key takeaways.

One. A database is just a super-organised workbook. Tables are sheets, rows are records, columns are fields. Google Sheets is a perfectly good database for Stocky to start with.

Two. Every record needs a unique ID, like a passport number. Names get misspelled; IDs don't. IDs are also what connect your tables, like our XLOOKUP from the Stock Log to the Suppliers table.

Three. Agent-ready data follows five rules: one table per thing, one header row, one fact per cell, an ID on every row, consistent types and units. And no merged cells or colours that carry meaning, because agents read values, not formatting.

Your activity is the **V04 Activity, Messy Data Makeover** workbook. It contains the exact messy BrightLeaf export from this video. You'll spot and label every problem, rebuild it as a clean Stock Log with formulas that check your work, complete the Suppliers table, and score yourself on the clean-data checklist. The final tab asks you to do the same for one spreadsheet from your own company. Give it about thirty minutes. Then take the ten-question quiz.

Next time, we finally pick up our tools. In "Your No-Code Toolkit: Setting Up n8n and Your AI Brain", you'll create your n8n account and your Claude or ChatGPT account, store your key cards safely, and build your very first workflow. Remember the waiter, the shopping list and the clean tables? That's where they all come together. See you there.
