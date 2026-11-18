# Video 4 Slides: Content Outline
**Video:** Databases Without Fear: Your Data's Home | **Length:** 22 min | **Slides:** 16
(Content outline only. The deck will be designed later with the brand theme.)

---

## Slide 1: Title
- **Title:** Databases Without Fear: Your Data's Home
- **Subtitle:** The ERP Agent Blueprint · Video 4
- **Suggested visual:** A tidy filing cabinet morphing into a neat spreadsheet grid, with Stocky's icon peeking out of the top drawer.

## Slide 2: The $1,840 Cell (Intro hook)
- Stock sheet said "21" for BL-1003 Stretch Wrap (reorder point 200) → 200 rolls ordered
- Reality: 21 cartons × 12 rolls + 8 loose = **260 rolls**
- The number was right; the unit was missing
- Messy data makes an agent "confidently wrong, at speed"
- **Suggested visual:** A single spreadsheet cell "21" under a magnifying glass, revealing cartons stacked behind it, and a price tag "$1,840 wasted".

## Slide 3: What You'll Learn Today
- What a database is (you already know 90%)
- Unique IDs
- Building Stocky's Suppliers and Stock_Log tables
- The five golden rules
- A live messy-data makeover
- **Suggested visual:** A checklist with five ticks and small icons (workbook, ID badge, table, rule book, broom).

## Slide 4: Database = A Super-Organised Workbook
- **Table** = a sheet · **Row** = a record · **Column** = a field · **Database** = the whole workbook
- Odoo's Inventory > Products list view is a table
- **Suggested visual:** A labelled Excel-style grid: one tab highlighted "Table", one row highlighted "Record", one column highlighted "Field", with an Odoo product list screenshot beside it.

## Slide 5: Every Record Has an ID
- Odoo shows an internal ID number at the end of the record's web address
- Rename the product, change the price: the ID never changes
- **Suggested visual:** A browser address bar with the ID number circled, and the BL-1005 product form underneath.

## Slide 6: Why Google Sheets?
- Free and familiar
- Online, so n8n can reach it (a laptop Excel file can't be reached)
- Transparent: you can see everything Stocky writes
- Alternative: Airtable
- **Suggested visual:** Three icon tiles: a price tag "Free", a cloud "Online", an eye "Transparent". A small Airtable logo-free icon labelled "Alternative".

## Slide 7: The Supplier Who Existed Three Times (story)
- "PackRight Industries" · "Pack Right Ind." · "PACKRIGHT (Chicago)"
- Looked like 18% of packaging spend → really **41%**
- Fix: a unique ID, like a passport number → SUP-002
- Never make your agent guess who you mean
- **Suggested visual:** Three name tags with different spellings merging into one ID badge reading "SUP-002", with a pie chart growing from 18% to 41%.

## Slide 8: Building the Suppliers Table
- One table per thing; one header row in row 1
- Headers with underscores: Supplier_ID, Supplier_Name, City, Country_Code, Currency, Latitude, Longitude, Contact_Email, Active
- View > Freeze > 1 row
- Latitude/longitude and currency feed the weather and currency APIs from Video 3
- **Suggested visual:** A screenshot of the finished Suppliers sheet, with arrows from the Latitude/Longitude columns to a weather-cloud icon and from Currency to a currency icon.
- **Pause & Think:** Why do SUP-004 and SUP-006 share a city but have different IDs?

## Slide 9: Guard Dogs for Your Data
- Data > Data validation > Dropdown (US, MX, CN, AE; USD, MXN, CNY, AED)
- Insert > Checkbox for "Active"
- Mark old records inactive; never delete them
- **Suggested visual:** A cartoon guard dog sitting next to a dropdown arrow, with a ticked/unticked checkbox pair.

## Slide 10: Building the Stock Log
- A logbook: every check gets a new row; never overwrite
- Columns: Log_ID, Log_Date, SKU, Qty_On_Hand, Unit, Reorder_Point, Status, Supplier_ID, Logged_By, Note
- Example: LOG-0001 · BL-1005 · 18 · set · 25 · SUP-004
- **Suggested visual:** An old ship's logbook page turning into the Stock_Log sheet, rows stacking downward.

## Slide 11: One Fact per Cell & Data Types
- "18" = a number you can calculate with; "18 sets - urgent!" = text
- Dates in yyyy-mm-dd (03/04 means different things in Mexico and the USA)
- Formula: `=IF(D2<=F2,"REORDER","OK")` → BL-1005 REORDER, BL-1002 REORDER, BL-1001 OK
- **Suggested visual:** A "bad cell vs good cells" comparison: one crowded cell splitting into three neat cells (Qty | Unit | Note), plus a calendar showing 03/04 with two different readings.

## Slide 12: IDs Connect Tables (Relationships)
- `=XLOOKUP(H2,Suppliers!A:A,Suppliers!B:B)` pulls the supplier name from the ID
- The name lives in one place; change it once, it updates everywhere
- **Suggested visual:** Two tables (Stock_Log and Suppliers) with a line connecting Supplier_ID in one to Supplier_ID in the other.

## Slide 13: The Five Golden Rules of Agent-Ready Data
1. One table per thing
2. One header row, in row 1
3. One fact per cell
4. A unique ID on every row
5. Consistent types and units
- Bonus: no merged cells, no colours that carry meaning
- **Suggested visual:** Five stacked "golden" bars / a trophy podium, with a small crossed-out paint bucket and a crossed-out merge icon for the bonus rule.
- **Pause & Think:** Which rules does your most-used spreadsheet break?

## Slide 14: The Messy Export: Spot the Crimes
- Merged titles and supplier cells · "145 boxes", "approx 1,850", "18 - urgent!!"
- "BL 1002" vs "BL-1002" · blank SKU · 5 date formats · red cells · TOTAL row "lots"
- **Suggested visual:** A screenshot of the messy export with numbered red circles on each problem (crime-scene tape style border).

## Slide 15: The Makeover in 7 Fixes
1. Delete title rows · 2. Unmerge and fill down · 3. Find & replace "BL " → "BL-", Trim whitespace · 4. Remove duplicates (2,360 → 1,180 boxes) · 5. Split quantity and unit (21 cartons + 8 → 260 rolls) · 6. Fill the blank ID (BL-1004) · 7. Colours → words, delete the TOTAL row
- **Suggested visual:** Before/after split: messy (17 rows, 2 red cells) vs clean (10 rows, a Status column with 4 REORDER in red and 6 OK in green).
- Surprises: packing tape in red is fine (1,850 vs 1,000); hydraulic oil nobody flagged is short (31 vs 40, 14-day lead time)

## Slide 16: Recap, Activity & Next Video
- Takeaways: database = super-organised workbook · IDs, not names · five golden rules (agents read values, not formatting)
- Common mistakes: cleaning once then letting mess back in · making the database "pretty" · one giant 40-column sheet
- **Activity:** V04_Activity_Messy_Data_Makeover.xlsx (30–40 min) · **Quiz:** 10 questions
- **Next:** Your No-Code Toolkit: Setting Up n8n and Your AI Brain
- **Suggested visual:** Three numbered takeaway cards, a thumbnail of the activity workbook, and a teaser image of an n8n canvas with a few connected blocks.
