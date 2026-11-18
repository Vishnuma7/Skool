# Video 2: ERP Demystified: A Supply Chain Pro's Tour of Odoo
**Course:** The ERP Agent Blueprint | **Length:** 24 min | **Level:** Beginner

**Learning objectives:**
- Explain what an ERP is, using the "central filing cabinet + rulebook" picture, and why every agent needs one as its source of truth
- Create your own free Odoo trial database with the Inventory, Purchase and Sales apps
- Tell the difference between a module, a record and a field, and find them on screen
- Create one product by hand and import the other nine BrightLeaf products from Excel
- Add starting stock and a reorder rule, and follow a product's "paper trail" of stock moves

**Before recording, prepare:**
- A fresh browser profile or incognito window (so the Odoo sign-up looks exactly like the learner's)
- A spare email address for the trial sign-up, with its inbox open in another tab
- The activity files downloaded to the desktop: V02_Activity_BrightLeaf_Product_Import.xlsx and V02_Activity_Odoo_Setup_Workbook.xlsx
- Odoo version note: this script uses the current Odoo Online labels ("Goods" + "Track Inventory"). If your version shows "Storable Product" instead, say the alternative line given in the script.
- Graphic: filing cabinet diagram (cabinet = ERP, drawers = modules, folders = records, labelled boxes on a form = fields)
- Graphic: "How BrightLeaf's departments share one cabinet" (Sales, Purchase, Inventory, Contacts around one central cabinet)

**Resources for this video:** V02_Activity_Odoo_Setup_Workbook.xlsx, V02_Activity_BrightLeaf_Product_Import.xlsx, V02_Quiz.docx

---

## [ON CAMERA] Intro (00:00–02:00)

**SAY:**
Quick question. If a customer calls BrightLeaf and asks, "Do you have two hundred rolls of stretch wrap I can collect tomorrow?", where does the answer come from?

At a lot of companies, the honest answer is: it depends who picks up the phone. Sales checks their spreadsheet. The warehouse checks the shelf. Procurement checks the purchase orders on email. Three people, three different numbers, and a customer waiting on the line.

That's exactly the problem an ERP solves. And it's why every agent we build in this course starts with the ERP. An agent is only as good as the data it reads. If Stocky reads the wrong number, it gives Sarah the wrong advice, very confidently.

So in this video, we're going inside. I'll give you a supply chain pro's tour of an ERP called Odoo. You'll set up your own free copy in about five minutes. You'll learn three words that unlock every ERP on the planet: module, record and field. And you'll load BrightLeaf's ten products, with stock and reorder points, so that Stocky has something real to read later in the course.

And here's the best part. This is your own private test system. Click anything. Break anything. Nothing touches your real company. If this feels new, that's completely normal. Let's open the filing cabinet.

---

## [SCREEN RECORDING] Creating Your Free Odoo Trial (02:00–05:45)

**SHOW:** Browser at odoo.com. Point to the "Start now - It's free" button.

**SAY:**
We're on odoo dot com. Odoo is an ERP used by millions of businesses, and the good news for us is that it runs entirely in your browser. Nothing to install.

First, let me explain the word. ERP stands for Enterprise Resource Planning, which is a terrible name, so forget it. Here's what it really is: the company's central filing cabinet plus its rulebook. Every department keeps its records in one place, and the system enforces the rules. When the warehouse receives fifty boxes, the stock number goes up for everyone, instantly. No emailing spreadsheets around.

Let's create our own. Click "Start now - It's free".

**SHOW:** The app selection page. Tick **Inventory**, **Purchase** and **Sales**. Leave everything else unticked. Click **Continue**.

**SAY:**
Odoo asks which apps we want. Think of each app as a department's drawer in the filing cabinet. For supply chain, we need three: Inventory, for what's on the shelf. Purchase, for buying from suppliers. And Sales, for selling to customers. Tick those three and nothing else. Odoo will quietly add Contacts as well, because both sales and purchasing need a list of companies to deal with.

Click Continue.

**SHOW:** The sign-up form. Fill in: Name "Sarah Mitchell", Email (the spare address), Company name "BrightLeaf Supplies", Country "United States", Phone, and choose a company size. Click **Start now**.

**SAY:**
Now the sign-up form. I'm filling it in as Sarah, but you use your own name and email. For company name, type "BrightLeaf Supplies", so your screen matches mine for the rest of the course. Pick your country and click Start now.

**SHOW:** The loading screen "Your database is being created". Then the browser lands on the Odoo home screen. Zoom in on the address bar: brightleaf-supplies.odoo.com (yours will differ).

**SAY:**
Odoo is now building your database. This takes about a minute.

And we're in. Before we do anything else, look at the address bar. This web address is your Odoo's home. Mine is brightleaf-supplies dot odoo dot com. Yours will be a bit different. And the first part, before dot odoo dot com, is your database name.

Write both of these down right now. There's a box for them on the Setup Checklist sheet in your activity workbook. In video six, when we connect Stocky to Odoo, these are the first two things it asks for.

**ON-SCREEN TEXT:** Write down: (1) your Odoo URL, (2) your database name, (3) the email you log in with.

**SHOW:** Switch to the email inbox. Open the Odoo email and click **Activate** / set a password.

**SAY:**
Odoo also sends you an email to confirm your account and set a password. Do that now, so you can log back in tomorrow.

One more thing to know. The free trial lasts fifteen days. That's plenty for this course, but if it runs out, don't panic. You can start a fresh trial with a new email, and because we're going to load our products from an Excel file, you'll be back to exactly this point in about five minutes.

> PRO TIP: Bookmark your Odoo URL now. Half of all "I can't find my Odoo" messages come from people who closed the tab on day one.

**SHOW:** Click the menu to reach **Settings**. In the search box at the top of Settings, type "currency". Show the **Main Currency** option and set it to **USD**. Click **Save**.

**SAY:**
Last setup step. BrightLeaf buys from suppliers in the US, Mexico, China and Dubai, and in this course we'll keep all our prices in US dollars. Go to the Settings app, type "currency" in the search box, and check that the main currency is USD. If it isn't, set it to USD and click Save.

If your Odoo won't let you change it, or you can't find it, don't worry. Just treat the numbers as dollars. Nothing in the course depends on the symbol.

---

## [SCREEN RECORDING] Touring the Apps: Modules Are Departments (05:45–08:45)

**SHOW:** The Odoo home screen with the app icons: Discuss, Sales, Invoicing, Purchase, Inventory, Contacts, Apps, Settings.

**SAY:**
This is the home screen, and every icon here is what ERP people call a module. A module is just one department's drawer in the filing cabinet. Same cabinet, same data underneath, different drawers.

You'll notice a couple of extras. Invoicing appeared because sales and purchases eventually turn into invoices. Discuss is Odoo's internal chat. We won't need them, so ignore them.

Let's open the three drawers that matter to a supply chain pro.

**SHOW:** Click **Inventory**. The Inventory Overview shows cards for "Receipts" and "Delivery Orders". Then hover over the top menu: Overview, Operations, Products, Reporting, Configuration.

**SAY:**
First, Inventory. This is Tom's world, the warehouse. These cards are the two directions goods move: Receipts, things coming in from suppliers, and Delivery Orders, things going out to customers.

Along the top, you'll see the same pattern in nearly every Odoo app. Operations, where the day-to-day work happens. Products, your catalogue. Reporting, where you get numbers out. And Configuration, the rulebook settings. Remember that pattern. Once you know it in one app, you know it in all of them.

**SHOW:** Click the home icon, then **Purchase**. The empty "Requests for Quotation" list.

**SAY:**
Next, Purchase. This is Sarah's drawer. The first thing you see is "Requests for Quotation", or RFQ for short. In Odoo, every purchase starts life as an RFQ, basically a draft. When the supplier agrees and Sarah confirms it, the same record becomes a Purchase Order. Same folder, new status. Keep that in mind, because in video seven, Stocky will create these RFQs for Sarah to approve.

**SHOW:** Home icon, then **Sales**. The empty "Quotations" list. Then home icon, then **Contacts**. The Contacts kanban shows "BrightLeaf Supplies" and "Sarah Mitchell".

**SAY:**
Sales works the same way, but in the other direction. Quotations become Sales Orders.

And Contacts is the shared address book. Customers, suppliers, even your own company live here, all in one list. Notice there's no separate "supplier list" and "customer list". A company is just a contact. Whether it's a supplier or a customer depends on what you do with it.

**SHOW:** Graphic: one central filing cabinet labelled "Odoo database" with four drawers: Inventory, Purchase, Sales, Contacts. Arrows show: Purchase confirmed > Inventory receipt; Sales confirmed > Inventory delivery.

**SAY:**
Here's why this matters. These drawers talk to each other. When Sarah confirms a purchase order, Inventory automatically expects a receipt. When a salesperson confirms an order, Inventory automatically prepares a delivery. One action, every department updated.

That's also why an agent is so much more powerful connected to an ERP than to a pile of spreadsheets. Stocky reads one place and sees the whole truth.

> PAUSE & THINK: Your company has an ERP, or a mix of systems. Which "drawers" do you open most in a normal week? Which ones do you never open but probably should? Jot them down on the "Map My ERP" sheet in your workbook.

---

## [ON CAMERA] Records and Fields: The Filing Cabinet Explained (08:45–10:15)

**SAY:**
Before we create our first product, let me give you the three words that unlock every ERP, whether it's Odoo, SAP, Oracle or Microsoft Dynamics.

Picture a real filing cabinet. The cabinet itself is the ERP. Each drawer is a module: Inventory, Purchase, Sales. Inside each drawer are folders. Each folder is one record. One product is one record. One supplier is one record. One purchase order is one record.

And inside each folder is a form with labelled boxes: product name, cost, supplier, reorder point. Each labelled box is a field.

That's it. Module, record, field. Drawer, folder, labelled box.

If you're good at Excel, and I know most of you are, here's an even quicker way to see it. A record is a row. A field is a column. A module is a group of related sheets.

Now, why am I making such a fuss about this? Because an agent doesn't see screens. It doesn't see the pretty buttons. When Stocky asks Odoo a question, it asks it in exactly these words: "In the product records, give me the field called quantity on hand." If you know the names of your fields, you can tell your agent exactly what to look for. And that's a superpower most people in your company won't have.

---

## [SCREEN RECORDING] Anatomy of a Product Record: Creating BL-1001 by Hand (10:15–13:45)

**SHOW:** Go to **Inventory > Products > Products**. Click **New**.

**SAY:**
Let's create our first record by hand, so you can see every field. Go to Inventory, then Products, then Products again, and click New.

This blank form is one empty folder. Let's fill it in with BrightLeaf's best seller.

**SHOW:** In **Product Name**, type "Steel Hex Bolts M10 (box of 100)". Tick **Can be Sold** and **Can be Purchased** if not already ticked.

**SAY:**
Product name: Steel Hex Bolts M10, box of one hundred. Just under the name, make sure both "Can be Sold" and "Can be Purchased" are ticked. BrightLeaf buys these from a supplier and sells them to customers, so both are true.

**SHOW:** On the **General Information** tab, set **Product Type** to **Goods** and tick **Track Inventory**. Zoom in on the tick box.

**SAY:**
Now the most important field on this whole form, and the number one beginner mistake. Product Type. Choose "Goods", and then tick "Track Inventory".

If you forget that tick, Odoo will happily let you buy and sell the product, but it will never count it. There will be no stock number. And when Stocky asks "how many bolts do we have?", the answer will be nothing at all.

If your Odoo shows a list with "Storable Product" instead, choose "Storable Product". It means the same thing.

> BEGINNER MISTAKE: Creating products without inventory tracking (or as "Consumable" in older versions). The product looks fine, but it has no on-hand quantity, so any stock alert, report or agent will silently skip it.

**SHOW:** Fill in **Sales Price** 16.88, **Cost** 12.50, **Internal Reference** BL-1001. Leave Product Category as "All".

**SAY:**
Sales Price: sixteen eighty-eight. Cost: twelve fifty. That's a thirty-five percent mark-up, and your workbook shows you the calculation.

Then Internal Reference: BL dash one zero zero one. This is your SKU, your product code. Please never skip this field. Product names change, people type them differently, someone writes "M10 bolts" and someone else writes "Hex Bolt M10". But BL-1001 is always BL-1001. When Stocky talks about products, it will use this code, so nothing gets mixed up.

**SHOW:** Click the **Purchase** tab. Under **Vendors**, click **Add a line**. In the Vendor field type "Apex Fasteners" and choose **Create "Apex Fasteners"**. Set **Price** 12.50. If the **Delivery Lead Time** column is visible, set it to 7 (days); if not, open the line and set it there.

**SAY:**
Now the Purchase tab. This is where we tell Odoo who we buy from. Click "Add a line" under Vendors. Type Apex Fasteners. It doesn't exist yet, so Odoo offers to create it. Click Create.

Price, twelve fifty. And delivery lead time, seven days. That's how long Apex usually takes from order to arrival at our Columbus warehouse. Lead time is gold for an agent. It's the difference between "you're low" and "you're low and you have seven days before it's a problem".

**SHOW:** Click the **save** icon (cloud icon next to the record name). Then point to the breadcrumb "Products / Steel Hex Bolts M10 (box of 100)" and the smart buttons at the top: On Hand, Forecasted, In / Out.

**SAY:**
Save, with this little cloud icon. And there it is: our first record. One folder in the Inventory drawer.

Look at these buttons across the top. Odoo calls them smart buttons. On Hand says zero, because we haven't received anything yet. We'll fix that in a few minutes.

**SHOW:** Click **Contacts** in the home menu. Open **Apex Fasteners**. Show it was created as a contact. Set **City** to Columbus, **State** Ohio, **Country** United States, then save.

**SAY:**
And here's that "drawers talk to each other" idea again. We created Apex Fasteners from inside a product, but it lives in Contacts, the shared address book. Let me add its city, Columbus, Ohio, and the country, United States. In video eight, Stocky uses supplier cities to check the local weather. So this little field will matter later.

---

## [SCREEN RECORDING] Importing the Other Nine Products from Excel (13:45–16:45)

**SHOW:** Open V02_Activity_BrightLeaf_Product_Import.xlsx in Excel. Show the header row: Internal Reference, Name, Product Type, Track Inventory, Can be Sold, Can be Purchased, Sales Price, Cost, Product Category. Nine rows, BL-1002 to BL-1010.

**SAY:**
Typing one product took us about three minutes. BrightLeaf has ten. Your company probably has ten thousand. Nobody types those in by hand. We import them.

Here's the import file from your resources. One row per product, one column per field. Look at the column headers: Internal Reference, Name, Product Type, Track Inventory, Sales Price, Cost. They are spelled exactly like the field labels we just saw on the form. That's on purpose. When the headers match, Odoo matches the columns for you.

Notice BL-1001 isn't in here, because we just created it by hand. If we imported it again, we'd have two bolt records, and that's the kind of duplicate that confuses humans and agents alike.

**SHOW:** Back in Odoo: **Inventory > Products > Products**, switch to list view. Click the **gear icon** next to the "Products" title and choose **Import records**.

**SAY:**
Back in Odoo, on the Products list. Click the little gear icon next to the word Products, and choose "Import records".

**SHOW:** Click **Upload File** (or **Load File**), select the import file. The mapping screen shows each "File Column" next to an "Odoo Field". All columns show a matched field.

**SAY:**
Click Upload File and choose the import workbook.

And this is the screen I want you to understand. On the left, your Excel columns. On the right, the Odoo field each one will go into. Odoo has matched them all automatically, because our headers match the field names.

If one of your columns ever shows "To import, select a field", or it's left blank, just click the dropdown and pick the right field yourself. That's all mapping is: telling Odoo which labelled box each column belongs in.

**SHOW:** Click **Test**. A green banner: "Everything seems valid." Then click **Import**. The list now shows 10 products.

**SAY:**
Before importing, always click Test. Test checks every row without saving anything. If something's wrong, like a letter in the price column, it tells you which row. Green banner, everything seems valid.

Now click Import. And there we go. Ten products. BL-1001 that we typed, plus nine imported in about four seconds.

**SHOW:** Sort the list by **Internal Reference**. Open **BL-1005 Pallet Jack Wheels (set)** and show Product Type "Goods" with Track Inventory ticked, Cost 38.00, Sales Price 51.30.

**SAY:**
Let's spot-check one. Pallet Jack Wheels, BL-1005. Goods, inventory tracked, cost thirty-eight, sales price fifty-one thirty. Perfect.

Now try something. Use the search bar at the top of the list and type "BL-100". Every product code starting with BL-100 appears. That's the power of a clean, consistent SKU code. Stocky will search exactly like this.

> PRO TIP: Before importing into a real company ERP, always import into a test database first, just like this one. Your IT team will thank you, and you'll never accidentally create 3,000 duplicate products on a Friday afternoon.

---

## [ON CAMERA] Common Mistakes: Garbage In, Garbage Out (16:45–18:15)

**SAY:**
Let me tell you a quick story about why we're being so careful with this data.

A distributor I know, a lot like BrightLeaf, set up a simple alert to warn them when stock went below the reorder point. Sensible idea. It ran for three months and never flagged their biggest product. Not once.

Why? Because when that product was created years earlier, someone set it up without inventory tracking. The ERP never counted it. So the alert looked at it, saw no stock number, and moved on. They found out when a major customer order couldn't ship.

The alert wasn't broken. The data was.

Here are the three mistakes I see most often, and you've now avoided all three. One: products without inventory tracking. Two: missing or inconsistent SKU codes, so the same item exists twice under different names. Three: no lead times on the supplier, so nothing can tell you when "low" becomes "urgent".

An AI agent makes these problems bigger, not smaller, because it speaks confidently. Bad data in a spreadsheet looks messy. Bad data in an agent's answer looks like a fact. So clean data isn't boring admin. It's the foundation Stocky stands on.

---

## [SCREEN RECORDING] Stock, Reorder Rules and the Paper Trail (18:15–22:00)

**SHOW:** **Inventory > Operations > Physical Inventory**. Click **New**. Choose Product "BL-1001 Steel Hex Bolts M10 (box of 100)", Location "WH/Stock", **Counted Quantity** 145. Click **Apply** and confirm.

**SAY:**
Our products exist, but the shelves are empty. Let's give BrightLeaf some starting stock. Go to Inventory, Operations, Physical Inventory. This is the screen you'd use after a stock count.

Click New. Product: BL-1001, the bolts. Location: WH slash Stock, that's the main warehouse shelf. Counted quantity: one hundred and forty-five. Then Apply.

**SHOW:** Repeat for BL-1005 (18). Then fast-forward through the remaining products using the values from the "Starting_Stock_Reorder" sheet: BL-1002 1180, BL-1003 260, BL-1004 420, BL-1006 1850, BL-1007 31, BL-1008 34, BL-1009 410, BL-1010 26.

**ON-SCREEN TEXT:** Use the "Starting Stock & Reorder" sheet in your workbook for all 10 quantities.

**SAY:**
Pallet jack wheels, BL-1005: eighteen. And I'll speed through the rest. All ten numbers are on the "Starting Stock and Reorder" sheet in your workbook, so you can copy them exactly.

I've chosen these numbers on purpose. Four of our products are now below their reorder point. Don't fix that. Those four are Stocky's first job in video six.

**SHOW:** Open product **BL-1005 Pallet Jack Wheels (set)**. Click the **Min / Max** smart button (or go to **Inventory > Operations > Replenishment**). Click **New**. Location "WH/Stock", **Min** 25, **Max** 50. Save.

**SAY:**
Now the rulebook part of our filing cabinet. Open the pallet jack wheels. Click the smart button for reorder rules. Depending on your version it says "Min / Max" or shows a little refresh icon. Then New.

Min quantity: twenty-five. That's BrightLeaf's reorder point for the wheels. Max quantity: fifty. That's how high we want to refill to. At BrightLeaf, the Max is simply double the reorder point.

So the rule now reads: when wheels drop below twenty-five sets, top them back up to fifty. We have eighteen. So Odoo knows we need thirty-two more. And remember, these come from Shenzhen with a twenty-one-day lead time. That's exactly the kind of product that keeps Sarah awake at night.

**SHOW:** Go to **Inventory > Operations > Replenishment**. Show the list with BL-1005, its On Hand 18, Min 25, Max 50 and **To Order** 32. Do not click Order.

**SAY:**
And here's where it pays off. Inventory, Operations, Replenishment. Odoo already shows BL-1005 with a suggested "To Order" of thirty-two. Don't click Order. We're leaving that decision for Stocky and Sarah later in the course.

Add reorder rules for the other nine products using your workbook. Once they are in, three more products join the wheels below their reorder point: the shipping boxes, the safety gloves and the hydraulic oil. It takes about five minutes, and it's great practice.

**SHOW:** Open BL-1001, click the **In / Out** smart button (or **Inventory > Reporting > Moves History**). Show the stock move line: from "Virtual Locations/Inventory adjustment" to "WH/Stock", quantity 145, with date and user.

**SAY:**
Last thing, and it's my favourite. Open the bolts, BL-1001, and click "In slash Out". This is the product's paper trail. Every time stock moves in or out, Odoo writes it down: the date, from where, to where, how many and who did it.

Right now there's just one line: one hundred and forty-five boxes of bolts added by an inventory adjustment, by Sarah, today. Once BrightLeaf starts buying and selling, this list grows. Receipt from Apex. Delivery to a customer in Dubai. Every move, forever.

This is the rulebook side of the ERP. Nobody can quietly change a stock number. There's always a record of what happened. And for an agent, this history is gold. It's how Stocky will one day be able to say, "we've used about forty boxes of bolts a week for the last month, so a hundred and forty-five will last under four weeks. Fine for now, but watch it."

**ON-SCREEN TEXT:** Your Odoo now has: 10 products, 1 supplier, starting stock, a reorder rule, and a full paper trail.

---

## [ON CAMERA] Outro (22:00–24:00)

**SAY:**
Look at what you just did. Twenty-four minutes ago, ERP was a scary three-letter word. Now you have your own working ERP, loaded with real products, stock and rules.

Here are the three things to remember.

One. An ERP is the company's central filing cabinet plus its rulebook. One place, one truth, and every department's drawer connected to the others.

Two. Module, record, field. Drawer, folder, labelled box. Those three words work in every ERP in the world, and they're exactly the words your agent uses when it asks for data.

Three. Your agent is only as good as your data. Track inventory, use clean SKU codes and fill in your lead times, because an agent turns bad data into confident wrong answers.

Your activity for this video has two files. First, the BrightLeaf Product Import file, which you'll use to load the nine products, just like I did. Second, the Odoo Setup Workbook. It has a step-by-step setup checklist with a progress tracker, the starting stock and reorder numbers for all ten products, and a sheet called "Map My ERP", where you map your own company's systems into modules, records and fields. That last sheet is the one I really want you to do, because it's the first draft of what your own agent will read. Then take the ten-question quiz.

In the next video, we answer the big question: how does Stocky actually talk to Odoo? It doesn't click buttons like we did. It uses something called an API. And I'm going to explain it like you're ordering at a restaurant. Once you get it, you'll never be confused by that word again.

See you in video three.
