# Video 2 Slides: Content Outline
**Video:** ERP Demystified: A Supply Chain Pro's Tour of Odoo | **Length:** 24 min | **Slides:** 17
*Content only. Visual design and brand theme will be applied later. Suggested visuals are descriptions, not final assets.*

---

### Slide 1: Title
- The ERP Agent Blueprint
- Video 2: ERP Demystified: A Supply Chain Pro's Tour of Odoo
- Beginner | 24 minutes
- **Suggested visual:** An open filing cabinet with the Odoo app icons peeking out of the drawers.

### Slide 2: One Question, Three Answers
- Customer: "Do you have 200 rolls of stretch wrap for tomorrow?"
- Sales spreadsheet says one thing, warehouse shelf another, purchasing email a third
- An agent is only as good as the data it reads
- **Suggested visual:** Three people with three different numbers in speech bubbles (220, 150, "ordered 300?") and a confused customer on the phone.

### Slide 3: What You'll Do Today
- Set up your own free Odoo (about 5 minutes)
- Learn three words: module, record, field
- Load BrightLeaf's 10 products, stock and reorder rules
- Your private test system: you can't break anything
- **Suggested visual:** Checklist graphic with four ticks and a "sandbox" icon.

### Slide 4: What an ERP Really Is
- "Enterprise Resource Planning": forget the name
- The company's central filing cabinet + its rulebook
- One place, one truth; when 50 boxes arrive, everyone sees it instantly
- **Suggested visual:** Filing cabinet diagram with a rulebook on top and departments (people icons) around it all pointing in.

### Slide 5: Creating Your Free Trial
- odoo.com > "Start now - It's free"
- Tick Inventory, Purchase, Sales (Contacts comes automatically)
- Company name: BrightLeaf Supplies
- 15-day trial; re-import in 5 minutes if it expires
- **Suggested visual:** Screenshot of the Odoo app-selection page with the three apps ticked.

### Slide 6: Write These Down Now
- Your Odoo URL (e.g. brightleaf-yourname.odoo.com)
- Your database name (the part before .odoo.com)
- Your login email
- You'll need all three in Video 6
- **Suggested visual:** Browser address bar screenshot with the subdomain highlighted and labelled "database name".

### Slide 7: Apps Are Modules (Drawers)
- Inventory: what's on the shelf (Receipts in, Delivery Orders out)
- Purchase: RFQ > Purchase Order
- Sales: Quotation > Sales Order
- Contacts: one shared address book for suppliers and customers
- **Suggested visual:** Screenshot of the Odoo home screen with the four relevant app icons circled.

### Slide 8: The Same Menu Pattern Everywhere
- Overview | Operations | Products | Reporting | Configuration
- Learn it in one app, know it in all of them
- **Suggested visual:** Screenshot of the Inventory top menu bar with each item labelled.

### Slide 9: The Drawers Talk to Each Other
- Confirm a purchase order > Inventory expects a receipt
- Confirm a sales order > Inventory prepares a delivery
- One action, every department updated; Stocky reads one place and sees the whole truth
- **Suggested visual:** Flow diagram: Purchase > Receipt > Stock; Sales > Delivery > Stock, all inside one cabinet.

### Slide 10: Module, Record, Field
- Module = drawer (Inventory)
- Record = folder (one product, one supplier, one PO) = an Excel row
- Field = labelled box on the form (Cost, Internal Reference) = an Excel column
- Agents ask for data in exactly these words
- **Suggested visual:** Three-level zoom: cabinet > drawer > folder > form, next to an Excel grid showing row = record, column = field.

### Slide 11: Anatomy of a Product Record (BL-1001)
- Product Name: Steel Hex Bolts M10 (box of 100)
- Product Type: Goods + Track Inventory (older: Storable Product)
- Sales Price 16.88 | Cost 12.50 | Internal Reference BL-1001
- Purchase tab: Apex Fasteners, 12.50, lead time 7 days
- **Suggested visual:** Annotated screenshot of the product form with numbered callouts on each field.

### Slide 12: Beginner Mistake: No Inventory Tracking
- Product can be bought and sold, but is never counted
- No on-hand number = invisible to alerts, reports and agents
- **Suggested visual:** Side-by-side of two product forms: one with Track Inventory ticked (green check), one without (red cross and "On Hand: ?").

### Slide 13: Importing Nine Products in Four Seconds
- Headers match Odoo field labels > automatic mapping
- Gear icon > Import records > Upload File > **Test** > Import
- BL-1001 isn't in the file: no duplicates
- **Suggested visual:** Screenshot of the Odoo import mapping screen (File Column > Odoo Field) with the green "Everything seems valid" banner.

### Slide 14: Garbage In, Garbage Out
- Real story: an alert never flagged the biggest product for 3 months (no inventory tracking)
- Top 3 mistakes: no tracking, messy SKUs, missing lead times
- Agents turn bad data into confident wrong answers
- **Suggested visual:** A funnel with messy papers going in and a robot confidently holding a wrong number coming out.

### Slide 15: Starting Stock and Reorder Rules
- Inventory > Operations > Physical Inventory: enter counted quantities
- Four products deliberately below reorder point: BL-1002 (1,180/1,500), BL-1004 (420/600), BL-1005 (18/25), BL-1007 (31/40)
- Rule for BL-1005: Min 25, Max 50 > Replenishment suggests 32 (Max = 2 x reorder point)
- **Suggested visual:** Screenshot of the Replenishment list with BL-1005's "To Order 32" highlighted, plus a mini table of the four low products.

### Slide 16: The Paper Trail
- In / Out smart button = every stock move: date, from, to, quantity, who
- Nobody can quietly change a number
- History lets Stocky estimate usage: "145 boxes of bolts will last under 4 weeks"
- **Suggested visual:** Screenshot of the Moves History line "Inventory adjustment > WH/Stock, 145", with a timeline graphic of future moves.

### Slide 17: Recap + Your Activity
- An ERP = central filing cabinet + rulebook
- Module, record, field = drawer, folder, labelled box
- Your agent is only as good as your data
- Activity: **V02_Activity_BrightLeaf_Product_Import.xlsx** + **V02_Activity_Odoo_Setup_Workbook.xlsx** (checklist, stock & reorder, Field Detective, Map My ERP) | Quiz: 10 questions
- Next: APIs Explained Like You're Ordering at a Restaurant
- **Suggested visual:** Three takeaway tiles, thumbnails of both workbooks, and a "Next video" card showing a waiter carrying a tray.
