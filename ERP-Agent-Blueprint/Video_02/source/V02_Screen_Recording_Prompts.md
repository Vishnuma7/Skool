# Video 2: ERP Demystified: A Supply Chain Pro's Tour of Odoo: Screen-Recording Prompts
**How to use:** 1. Open claude.ai, start a new chat, and paste ONE prompt. 2. Claude builds an animated demo you can preview. If anything looks wrong, reply in the same chat ("make the cursor slower", "the table is cut off"). 3. Open the demo full-screen in Chrome (press F11 / Ctrl+Cmd+F), start your screen recorder (QuickTime: File → New Screen Recording), then click **Start**. 4. Stop recording when the "END" card appears, trim the start and end, and add your voice-over from the script. Each demo runs for the same length as its script section, so the voice-over lines up.

**Sections in this video:**

| # | Section | Time | Length | Prompt |
|---|---|---|---|---|
| 1 | Creating Your Free Odoo Trial | 02:00–05:45 | 3 min 45 s | Prompt 1 |
| 2 | Touring the Apps: Modules Are Departments | 05:45–08:45 | 3 min 0 s | Prompt 2 |
| 3 | Anatomy of a Product Record: Creating BL-1001 by Hand | 10:15–13:45 | 3 min 30 s | Prompt 3 |
| 4 | Importing the Other Nine Products from Excel | 13:45–16:45 | 3 min 0 s | Prompt 4 |
| 5 | Stock, Reorder Rules and the Paper Trail | 18:15–22:00 | 3 min 45 s | Prompt 5 |

---

## Prompt 1 of 5: Creating Your Free Odoo Trial (02:00–05:45, 3 min 45 s)
**What this demo shows:** Signing up for a free Odoo trial as Sarah Mitchell of BrightLeaf Supplies: choosing Inventory, Purchase and Sales, filling in the form, finding the database URL, activating the account and setting the main currency to USD.

### Copy this prompt into Claude:
```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. I will play it full-screen and screen-record it, then add my own voice-over. This section walks complete beginners (supply chain people, not techies) through creating a free Odoo ERP trial for a distributor called BrightLeaf Supplies (Columbus, Ohio), and explains an ERP as "the company's central filing cabinet plus its rulebook".

GLOBAL STYLE (follow exactly):
- One self-contained HTML file (inline CSS + JS, no external libraries except Google Fonts "Inter"). It must work as a claude.ai artifact preview.
- Fixed 16:9 stage of 1920x1080 px, scaled to fit the browser window (letterbox with #0F172A background). All positions are relative to the stage.
- A big "Start" button covers the stage before playing; clicking it starts the timeline. Also add small Pause/Restart controls that appear only on mouse hover at the bottom-right, plus a thin progress bar. Keyboard: Space = pause/play, R = restart.
- The total duration MUST equal the section length given below. Drive everything from one master timeline (requestAnimationFrame with elapsed time), with each scene at the exact start/end times listed. Show an "END" card for the final 1 second.
- The look is clean, modern and simplified: a browser window frame (rounded corners, grey tab bar with the page title, URL bar showing the URL given), white app content, soft shadows. These are simplified look-alike recreations for teaching, NOT pixel copies of any product's real interface; no real logos.
- Animated mouse cursor (a white arrow with a dark outline) that glides smoothly (ease-in-out, ~0.6 s) to each target, shows a click ripple, and makes the element react (pressed state, dropdown opens, field focuses).
- Typing effect for any text the user types (~14 characters/second) with a blinking caret.
- Callouts: yellow (#FFD84D) rounded highlight boxes or arrows with a short label appear on the important element, using a gentle pop-in. Never cover the thing being explained.
- Zoom: for small details, smoothly zoom the stage (scale 1.0 to 1.6, centred on the element) and back out.
- Captions: an ON-SCREEN TEXT lower-third (dark navy #1F2A44 pill, white Inter 34px) whenever the script gives ON-SCREEN TEXT, held for 3-5 s.
- Fonts: Inter. Colours: navy #1F2A44, blue #2563EB, green #16A34A (success), red #DC2626 (errors/low stock), amber #F59E0B (warnings).
- Brand: a small "The ERP Agent Blueprint" watermark at the bottom-left, 40% opacity.
- No sound. Keep motion calm and readable for beginners: hold each important state at least 2 seconds.

SECTION LENGTH: exactly 3:45 (225 seconds). The END card shows from 03:44 to 03:45.

APP LOOK (only these screens appear)
- Odoo-style marketing page (browser frame, tab title "Odoo: Open Source ERP and CRM", URL bar "www.odoo.com"): white page, a simple top nav (Apps, Industries, Community, Pricing, Help, "Sign in"), a large headline "All your business on one platform." and a sub-line "Simple, efficient, yet affordable!", and a big purple (#714B67) rounded button "Start now - It's free". Text wordmark "odoo" in grey, no real logo.
- App selection page (same tab, URL "www.odoo.com/trial"): heading "Choose your apps", a grid of 16 app tiles (icon + name) with checkboxes: Accounting, Knowledge, Sign, CRM, Studio, Subscriptions, Rental, Point of Sale, Discuss, Documents, Project, Timesheets, Sales, Purchase, Inventory, Manufacturing. A ticked tile gets a purple border and a check badge. A "Continue" button at the bottom right.
- Sign-up form (URL "www.odoo.com/trial"): fields Name, Email, Company name, Country (dropdown), Phone number, Company size (dropdown), and a purple "Start now" button.
- Loading screen: centred spinner and the text "Your database is being created".
- Odoo-style ERP home screen (URL "brightleaf-supplies.odoo.com/odoo"): soft gradient background, a grid of rounded app icons with names: Discuss, Sales, Invoicing, Purchase, Inventory, Contacts, Apps, Settings. A thin purple banner at the top: "This database will expire in 15 days. Register your subscription".
- Email inbox (browser tab "Inbox - Mail", URL "mail.google.com/mail/u/0/#inbox"): Gmail-style list and open email.
- Odoo Settings (URL "brightleaf-supplies.odoo.com/odoo/settings"): purple-ish top bar (#714B67) with "Settings"; a search box at the top; left column of setting sections; a "Currencies" block with "Main Currency" dropdown; "Save" (purple) and "Discard" buttons at the top-left.
- Filing-cabinet illustration (overlay card, no browser): a grey three-drawer cabinet with drawers labelled Sales, Purchase, Inventory.

DATA TO SHOW
- Apps to tick: Inventory, Purchase, Sales (nothing else). Note text: "Contacts is added automatically".
- Sign-up form values: Name "Sarah Mitchell"; Email "brightleaf.course@example.com" (any spare address); Company name "BrightLeaf Supplies"; Country "United States"; Phone number "(614) 555-0142"; Company size "50-249 employees".
- Database URL: brightleaf-supplies.odoo.com (database name: brightleaf-supplies). Add a small grey note under the zoomed URL: "yours will differ".
- Setup Checklist card (overlay): "(1) Odoo URL: brightleaf-supplies.odoo.com  (2) Database name: brightleaf-supplies  (3) Login email: brightleaf.course@example.com".
- Activation email: from "Odoo", subject "Welcome to Odoo! Activate your account", body "Hi Sarah Mitchell, your database brightleaf-supplies is ready. Click below to set your password." Button "Activate". Password page: "Set your password" with two masked fields (••••••••••) and a "Confirm" button.
- Trial info: "Free trial: 15 days".
- Settings search text: currency. Main Currency: USD.
- Supplier countries chip row: US, Mexico, China, Dubai.
- ON-SCREEN TEXT (lower-third caption): "Write down: (1) your Odoo URL, (2) your database name, (3) the email you log in with."

TIMELINE (scene by scene; times are relative to the start of this section)
1. 00:00–00:15 | The browser fades in on the Odoo-style marketing page. The cursor glides slowly to the "Start now - It's free" button and hovers (button darkens slightly) without clicking. | Callouts: "Runs in your browser. Nothing to install." and, pointing at the button, "Start here".
2. 00:15–00:46 | The page dims to 30% and the filing-cabinet overlay card slides in at the centre. Title above it: "ERP = the company's central filing cabinet + rulebook". At 00:30 a mini animation: a box icon labelled "Warehouse receives 50 boxes" drops into the Inventory drawer, and a counter "Stock: 120 > 170" updates on all three drawers at the same time with a green flash. | Callout: "One place. Updated for everyone, instantly." Second callout at 00:38: "No emailing spreadsheets around".
3. 00:46–00:50 | The overlay slides away; the cursor clicks "Start now - It's free" (ripple, pressed state). | No callout.
4. 00:50–00:56 | The app selection grid appears (tiles fade in in a wave). | Callout at the top: "Each app = one department's drawer".
5. 00:56–01:14 | The cursor ticks Inventory (00:57), Purchase (01:02) and Sales (01:07); each tile gets a purple border and a check badge, and a small label pops under it: "What's on the shelf", "Buying from suppliers", "Selling to customers". At 01:10 a grey note fades in: "Contacts is added automatically". | Callout: "Tick these 3, nothing else".
6. 01:14–01:23 | Hold 3 seconds on the three ticked tiles, then the cursor glides to "Continue" and clicks at 01:21. | No callout.
7. 01:23–01:43 | The sign-up form. The cursor clicks each field in turn and the values type in at 14 characters/second: Name, Email, Company name (the "BrightLeaf Supplies" field gets a yellow outline for 2 seconds); the Country dropdown opens and "United States" is chosen; phone types in; Company size dropdown picks "50-249 employees". At 01:41 the cursor clicks "Start now". | Callouts: "Use your own name and email" and "Company name: BrightLeaf Supplies (so your screen matches)".
8. 01:43–01:49 | Loading screen with spinner: "Your database is being created". A small timer label counts "about 1 minute". | No callout.
9. 01:49–01:55 | The Odoo home screen appears with the app icons popping in. | No callout.
10. 01:55–02:10 | Zoom to 1.6x on the URL bar "brightleaf-supplies.odoo.com". A yellow box outlines the whole address, then a second box outlines only "brightleaf-supplies". The note "yours will differ" appears underneath. Hold, then zoom out at 02:08. | Callouts: "Your Odoo URL" and "Your database name".
11. 02:10–02:28 | The Setup Checklist card slides in from the right with three empty tick boxes; the three values write themselves in and each box gets a tick. The lower-third caption appears for 5 seconds (02:12–02:17). At 02:20 a small badge appears on the card: "Video 6: Stocky asks for these first". | ON-SCREEN TEXT: "Write down: (1) your Odoo URL, (2) your database name, (3) the email you log in with."
12. 02:28–02:33 | The cursor clicks the "Inbox - Mail" browser tab; the activation email drops in at the top of the list. | No callout.
13. 02:33–02:43 | The cursor opens the email and clicks "Activate". The "Set your password" page appears; both fields fill with masked dots; the cursor clicks "Confirm"; a green check "Account activated". | Callout: "Set a password so you can log back in tomorrow".
14. 02:43–03:06 | Back to the Odoo tab. The purple trial banner at the top gets a yellow outline; a badge pops in: "Free trial: 15 days". At 02:52 a small card slides in: "Trial ran out? New trial + same Excel import = back here in about 5 minutes". At 03:00 the cursor clicks the star (bookmark) icon at the end of the URL bar; it fills yellow. | Callout at 03:00: "Bookmark your Odoo URL now".
15. 03:06–03:12 | The cursor clicks the home grid's "Settings" icon; the Settings page opens. | No callout.
16. 03:12–03:20 | The cursor clicks the Settings search box and types "currency"; the page filters down to the "Currencies" block. | Callout on the search box: "Search instead of scrolling".
17. 03:20–03:33 | Zoom to 1.4x on "Main Currency". The cursor opens the dropdown and picks "USD". The chip row "US, Mexico, China, Dubai" fades in above with a "$" icon. | Callout: "All BrightLeaf prices in US dollars".
18. 03:33–03:44 | Zoom out. The cursor clicks "Save"; a small green toast "Saved". Then a grey note card fades in: "Can't change it? No problem: just treat the numbers as dollars." | No callout.
19. 03:44–03:45 | END card: navy background, white text "END". | -

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00] We're on odoo dot com. Odoo is an ERP used by millions of businesses, and the good news for us is that it runs entirely in your browser. Nothing to install.
[00:15] First, let me explain the word. ERP stands for Enterprise Resource Planning, which is a terrible name, so forget it. Here's what it really is: the company's central filing cabinet plus its rulebook. Every department keeps its records in one place, and the system enforces the rules. When the warehouse receives fifty boxes, the stock number goes up for everyone, instantly. No emailing spreadsheets around.
[00:46] Let's create our own. Click "Start now - It's free".
[00:50] Odoo asks which apps we want. Think of each app as a department's drawer in the filing cabinet. For supply chain, we need three: Inventory, for what's on the shelf. Purchase, for buying from suppliers. And Sales, for selling to customers. Tick those three and nothing else. Odoo will quietly add Contacts as well, because both sales and purchasing need a list of companies to deal with. Click Continue.
[01:23] Now the sign-up form. I'm filling it in as Sarah, but you use your own name and email. For company name, type "BrightLeaf Supplies", so your screen matches mine for the rest of the course. Pick your country and click Start now.
[01:43] Odoo is now building your database. This takes about a minute.
[01:49] And we're in. Before we do anything else, look at the address bar. This web address is your Odoo's home. Mine is brightleaf-supplies dot odoo dot com. Yours will be a bit different. And the first part, before dot odoo dot com, is your database name.
[02:10] Write both of these down right now. There's a box for them on the Setup Checklist sheet in your activity workbook. In video six, when we connect Stocky to Odoo, these are the first two things it asks for.
[02:28] Odoo also sends you an email to confirm your account and set a password. Do that now, so you can log back in tomorrow.
[02:43] One more thing to know. The free trial lasts fifteen days. That's plenty for this course, but if it runs out, don't panic. You can start a fresh trial with a new email, and because we're going to load our products from an Excel file, you'll be back to exactly this point in about five minutes.
[03:06] Last setup step. BrightLeaf buys from suppliers in the US, Mexico, China and Dubai, and in this course we'll keep all our prices in US dollars. Go to the Settings app, type "currency" in the search box, and check that the main currency is USD. If it isn't, set it to USD and click Save.
[03:33] If your Odoo won't let you change it, or you can't find it, don't worry. Just treat the numbers as dollars. Nothing in the course depends on the symbol.

CHECKLIST
- Total duration exactly 3:45, END card visible only from 03:44 to 03:45.
- Only Inventory, Purchase and Sales are ticked; form values and the URL brightleaf-supplies.odoo.com match the DATA block.
- The password is always shown masked; no real email addresses other than the example.com placeholder.
- Start button, hover-only Pause/Restart controls, progress bar, Space and R keys all work.
- Nothing overflows the 1920x1080 stage; no real logos (Odoo and Gmail look-alikes only).
```
**After Claude builds it:**
- Odoo's real sign-up pages change often; this demo is a simplified look-alike, so don't worry if your live screens look slightly different.
- If the form typing feels rushed, ask Claude to "start the sign-up form 2 seconds earlier by shortening scene 6".
- Trim the first second before Start and the frames after END.

---

## Prompt 2 of 5: Touring the Apps: Modules Are Departments (05:45–08:45, 3 min 0 s)
**What this demo shows:** A tour of the Odoo home screen and the Inventory, Purchase, Sales and Contacts apps, ending with a filing-cabinet diagram that shows how the drawers update each other.

### Copy this prompt into Claude:
```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. I will play it full-screen and screen-record it, then add my own voice-over. This section teaches complete beginners that each app in an ERP (Odoo) is a "module": one department's drawer in a shared filing cabinet. It tours Inventory, Purchase, Sales and Contacts for a distributor called BrightLeaf Supplies (Columbus, Ohio) and shows how the drawers talk to each other.

GLOBAL STYLE (follow exactly):
- One self-contained HTML file (inline CSS + JS, no external libraries except Google Fonts "Inter"). It must work as a claude.ai artifact preview.
- Fixed 16:9 stage of 1920x1080 px, scaled to fit the browser window (letterbox with #0F172A background). All positions are relative to the stage.
- A big "Start" button covers the stage before playing; clicking it starts the timeline. Also add small Pause/Restart controls that appear only on mouse hover at the bottom-right, plus a thin progress bar. Keyboard: Space = pause/play, R = restart.
- The total duration MUST equal the section length given below. Drive everything from one master timeline (requestAnimationFrame with elapsed time), with each scene at the exact start/end times listed. Show an "END" card for the final 1 second.
- The look is clean, modern and simplified: a browser window frame (rounded corners, grey tab bar with the page title, URL bar showing the URL given), white app content, soft shadows. These are simplified look-alike recreations for teaching, NOT pixel copies of any product's real interface; no real logos.
- Animated mouse cursor (a white arrow with a dark outline) that glides smoothly (ease-in-out, ~0.6 s) to each target, shows a click ripple, and makes the element react (pressed state, dropdown opens, field focuses).
- Typing effect for any text the user types (~14 characters/second) with a blinking caret.
- Callouts: yellow (#FFD84D) rounded highlight boxes or arrows with a short label appear on the important element, using a gentle pop-in. Never cover the thing being explained.
- Zoom: for small details, smoothly zoom the stage (scale 1.0 to 1.6, centred on the element) and back out.
- Captions: an ON-SCREEN TEXT lower-third (dark navy #1F2A44 pill, white Inter 34px) whenever the script gives ON-SCREEN TEXT, held for 3-5 s.
- Fonts: Inter. Colours: navy #1F2A44, blue #2563EB, green #16A34A (success), red #DC2626 (errors/low stock), amber #F59E0B (warnings).
- Brand: a small "The ERP Agent Blueprint" watermark at the bottom-left, 40% opacity.
- No sound. Keep motion calm and readable for beginners: hold each important state at least 2 seconds.

SECTION LENGTH: exactly 3:00 (180 seconds). The END card shows from 02:59 to 03:00.

APP LOOK (only these screens appear)
- Odoo-style home screen (browser frame, tab title "Odoo", URL bar "brightleaf-supplies.odoo.com/odoo"): soft gradient background, a centred grid of 8 rounded app icons with names underneath: Discuss, Sales, Invoicing, Purchase, Inventory, Contacts, Apps, Settings.
- Odoo-style app screens (URL changes per app, e.g. "brightleaf-supplies.odoo.com/odoo/inventory"): purple-ish top bar (#714B67) with a home-grid icon at the far left, the app name, and the app's menu items; breadcrumb under the bar; a "New" button top-left.
  - Inventory Overview: two cards side by side, "Receipts" (with a green "0 To Process" button) and "Delivery Orders" (with "0 To Process"). Top menu: Overview, Operations, Products, Reporting, Configuration.
  - Purchase: list view "Requests for Quotation", empty, with the empty-state message "No request for quotation found. Let's create one!" Top menu: Orders, Products, Reporting, Configuration.
  - Sales: list view "Quotations", empty, with "Create a new quotation, the first step of a new sale!" Top menu: Orders, To Invoice, Products, Reporting, Configuration.
  - Contacts: kanban view with two cards: "BrightLeaf Supplies" (company icon, "Columbus, Ohio, United States") and "Sarah Mitchell" (person avatar, "BrightLeaf Supplies").
- Filing-cabinet diagram (full stage, no browser): a large grey cabinet labelled "Odoo database" with four drawers: Inventory, Purchase, Sales, Contacts. Drawers can slide out.

DATA TO SHOW
- Home icons: Discuss, Sales, Invoicing, Purchase, Inventory, Contacts, Apps, Settings.
- Inventory menu tooltips: Operations = "Day-to-day work"; Products = "Your catalogue"; Reporting = "Get numbers out"; Configuration = "The rulebook settings".
- Purchase: "RFQ = Request for Quotation = a draft". RFQ > Purchase Order: "Same folder, new status".
- Sales: "Quotation > Sales Order".
- Contacts: BrightLeaf Supplies (company), Sarah Mitchell (person).
- Diagram arrows: "Purchase confirmed > Inventory receipt" and "Sales confirmed > Inventory delivery".

TIMELINE (scene by scene; times are relative to the start of this section)
1. 00:00–00:18 | The browser fades in on the home screen. The 8 icons pop in one by one in a wave (0.2 s apart). Then all icons get a thin yellow outline at once. | Callouts: "Every icon = a module" and, at 00:08, "Module = one department's drawer. Same cabinet, same data."
2. 00:18–00:32 | The cursor glides to Invoicing, then to Discuss; each gets a grey tag as the cursor passes: "Sales + purchases turn into invoices" and "Internal chat". Both icons then dim to 40%. | Callout: "Extras: ignore them for now".
3. 00:32–00:38 | Inventory, Purchase, Sales and Contacts glow softly. The cursor moves to Inventory. | Callout: "The drawers a supply chain pro needs".
4. 00:38–00:42 | Click Inventory (ripple, the icon depresses); the Inventory Overview opens. | No callout.
5. 00:42–00:56 | The "Receipts" card gets a green arrow pointing in and the "Delivery Orders" card a blue arrow pointing out. A small worker icon labelled "Tom (warehouse lead)" appears at the top-right. | Callouts: "Coming in from suppliers" and "Going out to customers".
6. 00:56–01:19 | The cursor hovers each top menu item in turn, about 5 seconds each: Operations, Products, Reporting, Configuration (Overview first briefly). Each shows its tooltip and a small dropdown preview (e.g. Operations: Transfers, Receipts, Deliveries, Physical Inventory, Replenishment). | Callout at 01:12: "Same pattern in nearly every Odoo app".
7. 01:19–01:24 | The cursor clicks the home-grid icon, then Purchase. The empty "Requests for Quotation" list opens. | No callout.
8. 01:24–01:54 | Zoom to 1.4x on the breadcrumb "Requests for Quotation". A small folder graphic appears at the right labelled "RFQ (draft)". At 01:36 a stamp "Confirmed by Sarah" hits the folder and its label flips to "Purchase Order". At 01:46 a badge pops in under it: "Video 7: Stocky creates these for Sarah to approve". | Callouts: "Every purchase starts as an RFQ: a draft" and "Same folder, new status".
9. 01:54–02:01 | Home-grid icon, then Sales; the empty "Quotations" list opens. A mini label animates "Quotation > Sales Order". | Callout: "Same idea, other direction".
10. 02:01–02:05 | Home-grid icon, then Contacts; the kanban opens. | No callout.
11. 02:05–02:26 | The two contact cards get yellow outlines in turn. Then a small "Supplier?" tag and a "Customer?" tag float above an empty third card placeholder labelled "Any company", with a note "It depends on what you do with it". | Callouts: "One shared address book" and "No separate supplier list: a company is just a contact".
12. 02:26–02:44 | Cross-fade to the filing-cabinet diagram. The Purchase drawer slides out with a "PO confirmed" card; an animated arrow carries it to the Inventory drawer, which shows "Receipt expected". Then the Sales drawer slides out with "Sales order confirmed" and an arrow to Inventory "Delivery prepared". | Callout: "One action, every department updated".
13. 02:44–02:59 | A small Stocky robot icon (rounded navy body, blue screen face) appears on the right and draws one clean arrow to the cabinet. On the left, a messy pile of spreadsheet icons appears and gets a red X. | Callout: "Stocky reads one place and sees the whole truth".
14. 02:59–03:00 | END card: navy background, white text "END". | -

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00] This is the home screen, and every icon here is what ERP people call a module. A module is just one department's drawer in the filing cabinet. Same cabinet, same data underneath, different drawers.
[00:18] You'll notice a couple of extras. Invoicing appeared because sales and purchases eventually turn into invoices. Discuss is Odoo's internal chat. We won't need them, so ignore them.
[00:32] Let's open the three drawers that matter to a supply chain pro.
[00:38] First, Inventory. This is Tom's world, the warehouse. These cards are the two directions goods move: Receipts, things coming in from suppliers, and Delivery Orders, things going out to customers.
[00:56] Along the top, you'll see the same pattern in nearly every Odoo app. Operations, where the day-to-day work happens. Products, your catalogue. Reporting, where you get numbers out. And Configuration, the rulebook settings. Remember that pattern. Once you know it in one app, you know it in all of them.
[01:19] Next, Purchase. This is Sarah's drawer. The first thing you see is "Requests for Quotation", or RFQ for short. In Odoo, every purchase starts life as an RFQ, basically a draft. When the supplier agrees and Sarah confirms it, the same record becomes a Purchase Order. Same folder, new status. Keep that in mind, because in video seven, Stocky will create these RFQs for Sarah to approve.
[01:54] Sales works the same way, but in the other direction. Quotations become Sales Orders.
[02:01] And Contacts is the shared address book. Customers, suppliers, even your own company live here, all in one list. Notice there's no separate "supplier list" and "customer list". A company is just a contact. Whether it's a supplier or a customer depends on what you do with it.
[02:26] Here's why this matters. These drawers talk to each other. When Sarah confirms a purchase order, Inventory automatically expects a receipt. When a salesperson confirms an order, Inventory automatically prepares a delivery. One action, every department updated.
[02:44] That's also why an agent is so much more powerful connected to an ERP than to a pile of spreadsheets. Stocky reads one place and sees the whole truth.

CHECKLIST
- Total duration exactly 3:00, END card visible only from 02:59 to 03:00.
- The 8 home icons and the app menus match the APP LOOK block; the lists are empty (no invented orders).
- Each app opens at its exact start time so it lines up with the voice-over.
- Start button, hover-only Pause/Restart controls, progress bar, Space and R keys all work.
- Nothing overflows the 1920x1080 stage; no real logos.
```
**After Claude builds it:**
- This script has a PAUSE & THINK after this section ("Which drawers do you open most?"); add it as a freeze-frame card in your editor if you want it on screen.
- If the menu tooltips in scene 6 overlap, reply "show the menu tooltips below the bar, one at a time".
- Trim the first second before Start and the frames after END.

---

## Prompt 3 of 5: Anatomy of a Product Record: Creating BL-1001 by Hand (10:15–13:45, 3 min 30 s)
**What this demo shows:** Creating the product Steel Hex Bolts M10 (box of 100) field by field in Odoo: Goods + Track Inventory, prices, SKU BL-1001, vendor Apex Fasteners with a 7-day lead time, saving, the smart buttons, and adding Apex's city in Contacts.

### Copy this prompt into Claude:
```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. I will play it full-screen and screen-record it, then add my own voice-over. This section shows complete beginners how to create one product record by hand in an ERP (Odoo) for a distributor called BrightLeaf Supplies (Columbus, Ohio), explaining each important field: Product Type with Track Inventory, prices, the SKU (Internal Reference) and the vendor with its lead time.

GLOBAL STYLE (follow exactly):
- One self-contained HTML file (inline CSS + JS, no external libraries except Google Fonts "Inter"). It must work as a claude.ai artifact preview.
- Fixed 16:9 stage of 1920x1080 px, scaled to fit the browser window (letterbox with #0F172A background). All positions are relative to the stage.
- A big "Start" button covers the stage before playing; clicking it starts the timeline. Also add small Pause/Restart controls that appear only on mouse hover at the bottom-right, plus a thin progress bar. Keyboard: Space = pause/play, R = restart.
- The total duration MUST equal the section length given below. Drive everything from one master timeline (requestAnimationFrame with elapsed time), with each scene at the exact start/end times listed. Show an "END" card for the final 1 second.
- The look is clean, modern and simplified: a browser window frame (rounded corners, grey tab bar with the page title, URL bar showing the URL given), white app content, soft shadows. These are simplified look-alike recreations for teaching, NOT pixel copies of any product's real interface; no real logos.
- Animated mouse cursor (a white arrow with a dark outline) that glides smoothly (ease-in-out, ~0.6 s) to each target, shows a click ripple, and makes the element react (pressed state, dropdown opens, field focuses).
- Typing effect for any text the user types (~14 characters/second) with a blinking caret.
- Callouts: yellow (#FFD84D) rounded highlight boxes or arrows with a short label appear on the important element, using a gentle pop-in. Never cover the thing being explained.
- Zoom: for small details, smoothly zoom the stage (scale 1.0 to 1.6, centred on the element) and back out.
- Captions: an ON-SCREEN TEXT lower-third (dark navy #1F2A44 pill, white Inter 34px) whenever the script gives ON-SCREEN TEXT, held for 3-5 s.
- Fonts: Inter. Colours: navy #1F2A44, blue #2563EB, green #16A34A (success), red #DC2626 (errors/low stock), amber #F59E0B (warnings).
- Brand: a small "The ERP Agent Blueprint" watermark at the bottom-left, 40% opacity.
- No sound. Keep motion calm and readable for beginners: hold each important state at least 2 seconds.

SECTION LENGTH: exactly 3:30 (210 seconds). The END card shows from 03:29 to 03:30.

APP LOOK (only these screens appear)
- Odoo-style ERP (browser frame, tab title "Products - Odoo", URL bar "brightleaf-supplies.odoo.com/odoo/action-stock.product_template_action_product"): purple-ish top bar (#714B67) with a home-grid icon, the app name "Inventory" and menu items Overview, Operations, Products, Reporting, Configuration (Products opens a dropdown: Products, Product Variants, Lots/Serial Numbers). Breadcrumb under the bar. "New" button top-left.
- Product list (empty state): "No product found. Let's create one!"
- Product form view: a large "Product Name" input at the top with checkboxes "Can be Sold" and "Can be Purchased" underneath; a cloud-shaped save icon and an undo icon next to the breadcrumb; smart buttons across the top-right of the form: "On Hand", "Forecasted", "In / Out" (each a small box with an icon, a number and a label). Tabs: General Information, Attributes & Variants, Sales, Purchase, Inventory.
  - General Information tab: left column "Product Type" (dropdown: Goods, Service, Combo) and under it a checkbox "Track Inventory"; "Sales Price", "Cost"; right column "Internal Reference", "Product Category" (value "All").
  - Purchase tab: "Vendors" table with columns Vendor | Price | Currency | Delivery Lead Time, and an "Add a line" link. Typing in the Vendor cell opens an autocomplete dropdown that offers 'Create "Apex Fasteners"'.
- Odoo-style Contacts (tab title "Contacts - Odoo", URL "brightleaf-supplies.odoo.com/odoo/contacts"): kanban cards, and a contact form with fields Street, City, State, ZIP, Country, plus the cloud save icon.

DATA TO SHOW
- Product Name: Steel Hex Bolts M10 (box of 100)
- Can be Sold: ticked. Can be Purchased: ticked.
- Product Type: Goods. Track Inventory: ticked.
- Alternative label note: "Older versions: choose 'Storable Product' - same thing".
- Sales Price: 16.88. Cost: 12.50 (mark-up note: "35% mark-up: 12.50 x 1.35 = 16.88").
- Internal Reference: BL-1001. Product Category: All.
- Vendor line: Apex Fasteners | 12.50 | USD | 7 (days).
- After save, breadcrumb: "Products / Steel Hex Bolts M10 (box of 100)". Smart buttons: On Hand 0.00 Units, Forecasted 0.00 Units, In / Out 0.
- Contact Apex Fasteners: City "Columbus", State "Ohio", Country "United States".
- Name variants for the SKU animation: "M10 bolts", "Hex Bolt M10", "Steel Hex Bolts M10" > "BL-1001".

TIMELINE (scene by scene; times are relative to the start of this section)
1. 00:00–00:12 | The browser shows the Odoo Inventory app. The cursor opens the "Products" menu and clicks "Products"; the empty product list appears. | Callout on the breadcrumb: "Inventory > Products > Products".
2. 00:12–00:19 | The cursor clicks "New"; the blank product form slides in. A small folder icon with the label "1 empty folder = 1 record" appears beside the form. | Callout: "A blank form = one empty folder".
3. 00:19–00:39 | The cursor clicks the Product Name field (focus outline) and types "Steel Hex Bolts M10 (box of 100)" at 14 characters/second. Then the cursor ticks "Can be Sold" and "Can be Purchased" (each with a click ripple and a check). | Callouts: "Product name" and "We buy it AND sell it: tick both".
4. 00:39–00:50 | The cursor clicks the "General Information" tab, opens the "Product Type" dropdown (Goods, Service, Combo) and chooses "Goods". | Callout: "The most important field on this form".
5. 00:50–01:10 | Zoom to 1.6x on "Track Inventory". The cursor ticks it; the tick animates. Then a red (#DC2626) warning callout appears to the side: "Forget this tick = Odoo never counts the product". A mini speech exchange slides in below: Stocky asks "How many bolts do we have?" and the reply bubble is empty "...". | Callout: "Number 1 beginner mistake".
6. 01:10–01:21 | Zoom out. An amber (#F59E0B) note card appears next to the Product Type field: "Older versions: choose 'Storable Product' - same thing". | No callout.
7. 01:21–01:30 | The cursor clicks "Sales Price" and types 16.88, then "Cost" and types 12.50. A small grey formula chip appears: "12.50 x 1.35 = 16.88". | Callout: "35% mark-up (see your workbook)".
8. 01:30–01:59 | The cursor clicks "Internal Reference" and types BL-1001. The field gets a yellow outline. Then a side animation: three name chips "M10 bolts", "Hex Bolt M10", "Steel Hex Bolts M10" float in, wobble, and merge into one solid navy chip "BL-1001". | Callouts: "Your SKU. Never skip it." and "Names change. BL-1001 is always BL-1001."
9. 01:59–02:05 | The cursor clicks the "Purchase" tab; the empty Vendors table appears; the cursor clicks "Add a line". | No callout.
10. 02:05–02:17 | In the Vendor cell, "Apex Fasteners" types in; the autocomplete dropdown opens with 'Create "Apex Fasteners"' highlighted; the cursor clicks it. | Callout: "Doesn't exist yet? Odoo offers to create it."
11. 02:17–02:24 | The cursor sets Price 12.50 (Currency shows USD) and Delivery Lead Time 7. | Callout on the lead time cell: "7 days to our Columbus warehouse".
12. 02:24–02:39 | A small timeline graphic slides in below the table: "Order placed" > 7 days > "Arrives in Columbus". Two status pills appear one after the other: grey "You're low" and amber "You're low and have 7 days". | Callout: "Lead time is gold for an agent".
13. 02:39–02:47 | The cursor clicks the cloud save icon (ripple); the breadcrumb updates to "Products / Steel Hex Bolts M10 (box of 100)" and a small green check flashes. | Callout: "Saved: our first record".
14. 02:47–03:02 | Zoom to 1.5x on the smart buttons: On Hand 0.00, Forecasted 0.00, In / Out 0. Yellow outline on "On Hand". Zoom out at 03:00. | Callouts: "Smart buttons" and "On Hand = 0: nothing received yet".
15. 03:02–03:08 | The cursor clicks the home-grid icon, then "Contacts". The kanban shows BrightLeaf Supplies, Sarah Mitchell and the new card "Apex Fasteners" (which pulses once). | Callout: "Created from a product, lives in Contacts".
16. 03:08–03:22 | The cursor opens Apex Fasteners; clicks City and types "Columbus"; picks State "Ohio" and Country "United States" from dropdowns; clicks the cloud save icon. | Callout on City: "Supplier city".
17. 03:22–03:29 | A small weather-cloud icon with the label "Video 8: Stocky checks the weather in supplier cities" slides in next to the City field. | Callout: "Drawers talk to each other".
18. 03:29–03:30 | END card: navy background, white text "END". | -

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00] Let's create our first record by hand, so you can see every field. Go to Inventory, then Products, then Products again, and click New. This blank form is one empty folder. Let's fill it in with BrightLeaf's best seller.
[00:19] Product name: Steel Hex Bolts M10, box of one hundred. Just under the name, make sure both "Can be Sold" and "Can be Purchased" are ticked. BrightLeaf buys these from a supplier and sells them to customers, so both are true.
[00:39] Now the most important field on this whole form, and the number one beginner mistake. Product Type. Choose "Goods", and then tick "Track Inventory".
[00:50] If you forget that tick, Odoo will happily let you buy and sell the product, but it will never count it. There will be no stock number. And when Stocky asks "how many bolts do we have?", the answer will be nothing at all.
[01:10] If your Odoo shows a list with "Storable Product" instead, choose "Storable Product". It means the same thing.
[01:21] Sales Price: sixteen eighty-eight. Cost: twelve fifty. That's a thirty-five percent mark-up, and your workbook shows you the calculation.
[01:30] Then Internal Reference: BL dash one zero zero one. This is your SKU, your product code. Please never skip this field. Product names change, people type them differently, someone writes "M10 bolts" and someone else writes "Hex Bolt M10". But BL-1001 is always BL-1001. When Stocky talks about products, it will use this code, so nothing gets mixed up.
[01:59] Now the Purchase tab. This is where we tell Odoo who we buy from. Click "Add a line" under Vendors. Type Apex Fasteners. It doesn't exist yet, so Odoo offers to create it. Click Create.
[02:17] Price, twelve fifty. And delivery lead time, seven days. That's how long Apex usually takes from order to arrival at our Columbus warehouse. Lead time is gold for an agent. It's the difference between "you're low" and "you're low and you have seven days before it's a problem".
[02:39] Save, with this little cloud icon. And there it is: our first record. One folder in the Inventory drawer. Look at these buttons across the top. Odoo calls them smart buttons. On Hand says zero, because we haven't received anything yet. We'll fix that in a few minutes.
[03:02] And here's that "drawers talk to each other" idea again. We created Apex Fasteners from inside a product, but it lives in Contacts, the shared address book. Let me add its city, Columbus, Ohio, and the country, United States. In video eight, Stocky uses supplier cities to check the local weather. So this little field will matter later.

CHECKLIST
- Total duration exactly 3:30, END card visible only from 03:29 to 03:30.
- All field values match the DATA block exactly: name, Goods + Track Inventory, 16.88, 12.50, BL-1001, Apex Fasteners, 12.50, 7 days, Columbus, Ohio, United States.
- The Track Inventory zoom is clearly readable and held at least 2 seconds.
- Start button, hover-only Pause/Restart controls, progress bar, Space and R keys all work.
- Nothing overflows the 1920x1080 stage; no real logos.
```
**After Claude builds it:**
- If your own Odoo shows "Storable Product", the demo still matches the voice-over line at 01:10, so no change is needed.
- If the form looks too crowded at 1920x1080, reply "make the product form 1500 px wide and the field text 24 px".
- Trim the first second before Start and the frames after END.

---

## Prompt 4 of 5: Importing the Other Nine Products from Excel (13:45–16:45, 3 min 0 s)
**What this demo shows:** The import spreadsheet with BL-1002 to BL-1010, Odoo's Import records screen with automatic column mapping, Test ("Everything seems valid."), Import, a spot-check of BL-1005 and a "BL-100" search.

### Copy this prompt into Claude:
```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. I will play it full-screen and screen-record it, then add my own voice-over. This section shows complete beginners how to import products into an ERP (Odoo) from an Excel file for a distributor called BrightLeaf Supplies (Columbus, Ohio): matching column headers to field names, testing first, importing, and checking the result.

GLOBAL STYLE (follow exactly):
- One self-contained HTML file (inline CSS + JS, no external libraries except Google Fonts "Inter"). It must work as a claude.ai artifact preview.
- Fixed 16:9 stage of 1920x1080 px, scaled to fit the browser window (letterbox with #0F172A background). All positions are relative to the stage.
- A big "Start" button covers the stage before playing; clicking it starts the timeline. Also add small Pause/Restart controls that appear only on mouse hover at the bottom-right, plus a thin progress bar. Keyboard: Space = pause/play, R = restart.
- The total duration MUST equal the section length given below. Drive everything from one master timeline (requestAnimationFrame with elapsed time), with each scene at the exact start/end times listed. Show an "END" card for the final 1 second.
- The look is clean, modern and simplified: a browser window frame (rounded corners, grey tab bar with the page title, URL bar showing the URL given), white app content, soft shadows. These are simplified look-alike recreations for teaching, NOT pixel copies of any product's real interface; no real logos.
- Animated mouse cursor (a white arrow with a dark outline) that glides smoothly (ease-in-out, ~0.6 s) to each target, shows a click ripple, and makes the element react (pressed state, dropdown opens, field focuses).
- Typing effect for any text the user types (~14 characters/second) with a blinking caret.
- Callouts: yellow (#FFD84D) rounded highlight boxes or arrows with a short label appear on the important element, using a gentle pop-in. Never cover the thing being explained.
- Zoom: for small details, smoothly zoom the stage (scale 1.0 to 1.6, centred on the element) and back out.
- Captions: an ON-SCREEN TEXT lower-third (dark navy #1F2A44 pill, white Inter 34px) whenever the script gives ON-SCREEN TEXT, held for 3-5 s.
- Fonts: Inter. Colours: navy #1F2A44, blue #2563EB, green #16A34A (success), red #DC2626 (errors/low stock), amber #F59E0B (warnings).
- Brand: a small "The ERP Agent Blueprint" watermark at the bottom-left, 40% opacity.
- No sound. Keep motion calm and readable for beginners: hold each important state at least 2 seconds.

SECTION LENGTH: exactly 3:00 (180 seconds). The END card shows from 02:59 to 03:00.

APP LOOK (only these screens appear)
- Excel-style spreadsheet (desktop window frame instead of a browser, title bar "V02_Activity_BrightLeaf_Product_Import.xlsx - Excel"): green ribbon strip, formula bar, column letters A-I, row numbers, bold header row with a light green fill and frozen header line, a sheet tab "Products" at the bottom.
- Odoo-style ERP (browser frame, tab title "Products - Odoo", URL bar "brightleaf-supplies.odoo.com/odoo/action-stock.product_template_action_product"): purple-ish top bar (#714B67) with "Inventory" and menu Overview, Operations, Products, Reporting, Configuration; breadcrumb "Products" with a small gear icon right next to it (the gear opens a dropdown: "Import records", "Export All"); a "New" button; a search bar at the top-centre with a magnifier; view switcher (kanban / list) at the top-right. List view with checkbox column: Internal Reference | Name | Sales Price | Cost | On Hand.
- Odoo import screen (URL ".../odoo/action-import"): an "Upload File" button (purple) and, after upload, a mapping table with columns "File Column" | "Odoo Field" (dropdown) | a status icon; buttons "Test" and "Import" at the top-left. A green banner appears for a valid test.
- A simple file-picker dialog (macOS-like, light grey) showing the Desktop with V02_Activity_BrightLeaf_Product_Import.xlsx and V02_Activity_Odoo_Setup_Workbook.xlsx.
- Odoo product form for BL-1005 (General Information tab with Product Type, Track Inventory, Sales Price, Cost, Internal Reference).

DATA TO SHOW
- Import file header row (columns A-I): Internal Reference | Name | Product Type | Track Inventory | Can be Sold | Can be Purchased | Sales Price | Cost | Product Category
- Import file rows (exactly these nine):
  BL-1002 | Corrugated Shipping Box 18x12x10 | Goods | True | True | True | 1.15 | 0.85 | All
  BL-1003 | Stretch Wrap Film 500mm | Goods | True | True | True | 12.42 | 9.20 | All
  BL-1004 | Industrial Safety Gloves (pair) | Goods | True | True | True | 3.24 | 2.40 | All
  BL-1005 | Pallet Jack Wheels (set) | Goods | True | True | True | 51.30 | 38.00 | All
  BL-1006 | Packing Tape 48mm (roll) | Goods | True | True | True | 1.49 | 1.10 | All
  BL-1007 | Hydraulic Oil 20L | Goods | True | True | True | 72.90 | 54.00 | All
  BL-1008 | LED Warehouse Light 150W | Goods | True | True | True | 97.20 | 72.00 | All
  BL-1009 | Nylon Cable Ties (pack of 500) | Goods | True | True | True | 8.51 | 6.30 | All
  BL-1010 | Forklift Battery Water Kit | Goods | True | True | True | 26.66 | 19.75 | All
- Product already in Odoo before import: BL-1001 | Steel Hex Bolts M10 (box of 100) | 16.88 | 12.50 | 0.00
- Mapping: every File Column maps to the Odoo Field with the same name (green check on each).
- Test banner: "Everything seems valid."
- After import, the list shows 10 products (BL-1001 to BL-1010), On Hand 0.00 for all.
- BL-1005 spot-check: Product Type Goods, Track Inventory ticked, Cost 38.00, Sales Price 51.30.
- Search "BL-100" shows the 9 products BL-1001 to BL-1009 (BL-1010 does not contain "BL-100").

TIMELINE (scene by scene; times are relative to the start of this section)
1. 00:00–00:14 | The Excel window opens with the import file. A counter graphic pops in at the top-right: "Typed by hand: 1 product, about 3 minutes", then "BrightLeaf: 10", then "Your company: 10,000?". | Callout: "Nobody types these by hand. We import them."
2. 00:14–00:41 | The cursor glides along the header row; each header cell gets a yellow outline in turn (about 2 seconds each for Internal Reference, Name, Product Type, Track Inventory, Sales Price, Cost). At 00:30 a small inset of the Odoo product form appears at the bottom-right with the same field labels, and dotted lines connect "Internal Reference" and "Sales Price" in the sheet to the same labels on the form. | Callouts: "One row per product, one column per field" and "Headers spelled exactly like the field labels".
3. 00:41–01:03 | The inset fades. Row 2 (BL-1002) gets a yellow outline. A ghost row "BL-1001 | Steel Hex Bolts M10 (box of 100)" fades in above it in grey, gets a red X and fades away, followed by two identical grey "bolt" folder icons with a red "Duplicate!" tag. | Callouts: "BL-1001 isn't here: we already typed it" and "Duplicates confuse humans and agents".
4. 01:03–01:14 | Switch to the browser: Odoo Products list view showing only BL-1001. The cursor clicks the gear icon next to "Products"; the dropdown opens; the cursor clicks "Import records". | Callout on the gear: "Gear icon > Import records".
5. 01:14–01:19 | The import screen. The cursor clicks "Upload File"; the file picker opens; the cursor double-clicks V02_Activity_BrightLeaf_Product_Import.xlsx. | No callout.
6. 01:19–01:40 | The mapping table builds row by row (0.4 s apart): each File Column on the left, its Odoo Field on the right, a green check appearing on each. Labels float above the two columns. | Callouts: "Your Excel columns" (left), "Odoo fields" (right) and, at 01:30, "All matched automatically".
7. 01:40–02:01 | Illustration of a fix: the "Sales Price" row briefly switches to an amber state "To import, select a field". The cursor clicks its dropdown, a list of fields opens, the cursor picks "Sales Price", and the row turns green again. | Callout: "Mapping = telling Odoo which labelled box each column goes in".
8. 02:01–02:15 | The cursor clicks "Test" (ripple). A short spinner, then the green banner "Everything seems valid." slides down. | Callouts: "Always Test first" and "Test checks every row without saving anything".
9. 02:15–02:30 | The cursor clicks "Import". The screen returns to the Products list; the nine new rows slide in quickly (0.15 s apart) under BL-1001. A counter badge: "10 products: 1 typed + 9 imported in about 4 seconds". | No callout.
10. 02:30–02:39 | The cursor clicks the "Internal Reference" column header (sort arrow appears; list orders BL-1001 to BL-1010), then opens BL-1005 Pallet Jack Wheels (set). Yellow outlines in turn on Product Type "Goods", the ticked "Track Inventory", Cost 38.00 and Sales Price 51.30. | Callout: "Spot-check one: perfect".
11. 02:39–02:59 | Back to the list via the breadcrumb. The cursor clicks the search bar and types "BL-100"; the list filters to BL-1001 to BL-1009 with the matching "BL-100" part of each code highlighted. Hold. | Callouts: "Clean, consistent SKU codes" and "Stocky will search exactly like this".
12. 02:59–03:00 | END card: navy background, white text "END". | -

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00] Typing one product took us about three minutes. BrightLeaf has ten. Your company probably has ten thousand. Nobody types those in by hand. We import them.
[00:14] Here's the import file from your resources. One row per product, one column per field. Look at the column headers: Internal Reference, Name, Product Type, Track Inventory, Sales Price, Cost. They are spelled exactly like the field labels we just saw on the form. That's on purpose. When the headers match, Odoo matches the columns for you.
[00:41] Notice BL-1001 isn't in here, because we just created it by hand. If we imported it again, we'd have two bolt records, and that's the kind of duplicate that confuses humans and agents alike.
[01:03] Back in Odoo, on the Products list. Click the little gear icon next to the word Products, and choose "Import records".
[01:14] Click Upload File and choose the import workbook.
[01:19] And this is the screen I want you to understand. On the left, your Excel columns. On the right, the Odoo field each one will go into. Odoo has matched them all automatically, because our headers match the field names.
[01:40] If one of your columns ever shows "To import, select a field", or it's left blank, just click the dropdown and pick the right field yourself. That's all mapping is: telling Odoo which labelled box each column belongs in.
[02:01] Before importing, always click Test. Test checks every row without saving anything. If something's wrong, like a letter in the price column, it tells you which row. Green banner, everything seems valid.
[02:15] Now click Import. And there we go. Ten products. BL-1001 that we typed, plus nine imported in about four seconds.
[02:30] Let's spot-check one. Pallet Jack Wheels, BL-1005. Goods, inventory tracked, cost thirty-eight, sales price fifty-one thirty. Perfect.
[02:39] Now try something. Use the search bar at the top of the list and type "BL-100". Every product code starting with BL-100 appears. That's the power of a clean, consistent SKU code. Stocky will search exactly like this.

CHECKLIST
- Total duration exactly 3:00, END card visible only from 02:59 to 03:00.
- The nine import rows and all prices match the DATA block exactly; BL-1001 is not in the import file.
- After import the list shows exactly 10 products; the "BL-100" search shows BL-1001 to BL-1009.
- Start button, hover-only Pause/Restart controls, progress bar, Space and R keys all work.
- Nothing overflows the 1920x1080 stage (the 9-column spreadsheet must fit); no real logos.
```
**After Claude builds it:**
- If the 9 spreadsheet columns don't fit, reply "shrink the spreadsheet font to 20 px and hide the ribbon".
- Scene 7 (the amber "select a field" row) is only an illustration of what to do if a column isn't matched; mention that in your voice-over if you like.
- Trim the first second before Start and the frames after END.

---

## Prompt 5 of 5: Stock, Reorder Rules and the Paper Trail (18:15–22:00, 3 min 45 s)
**What this demo shows:** Adding starting stock with Physical Inventory, creating the Min 25 / Max 50 reorder rule for BL-1005, seeing "To Order 32" on the Replenishment screen, and opening the In / Out paper trail for BL-1001.

### Copy this prompt into Claude:
```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. I will play it full-screen and screen-record it, then add my own voice-over. This section shows complete beginners how to load starting stock into an ERP (Odoo), add a reorder rule (min/max), read the Replenishment suggestion and follow a product's paper trail of stock moves, for a distributor called BrightLeaf Supplies (Columbus, Ohio).

GLOBAL STYLE (follow exactly):
- One self-contained HTML file (inline CSS + JS, no external libraries except Google Fonts "Inter"). It must work as a claude.ai artifact preview.
- Fixed 16:9 stage of 1920x1080 px, scaled to fit the browser window (letterbox with #0F172A background). All positions are relative to the stage.
- A big "Start" button covers the stage before playing; clicking it starts the timeline. Also add small Pause/Restart controls that appear only on mouse hover at the bottom-right, plus a thin progress bar. Keyboard: Space = pause/play, R = restart.
- The total duration MUST equal the section length given below. Drive everything from one master timeline (requestAnimationFrame with elapsed time), with each scene at the exact start/end times listed. Show an "END" card for the final 1 second.
- The look is clean, modern and simplified: a browser window frame (rounded corners, grey tab bar with the page title, URL bar showing the URL given), white app content, soft shadows. These are simplified look-alike recreations for teaching, NOT pixel copies of any product's real interface; no real logos.
- Animated mouse cursor (a white arrow with a dark outline) that glides smoothly (ease-in-out, ~0.6 s) to each target, shows a click ripple, and makes the element react (pressed state, dropdown opens, field focuses).
- Typing effect for any text the user types (~14 characters/second) with a blinking caret.
- Callouts: yellow (#FFD84D) rounded highlight boxes or arrows with a short label appear on the important element, using a gentle pop-in. Never cover the thing being explained.
- Zoom: for small details, smoothly zoom the stage (scale 1.0 to 1.6, centred on the element) and back out.
- Captions: an ON-SCREEN TEXT lower-third (dark navy #1F2A44 pill, white Inter 34px) whenever the script gives ON-SCREEN TEXT, held for 3-5 s.
- Fonts: Inter. Colours: navy #1F2A44, blue #2563EB, green #16A34A (success), red #DC2626 (errors/low stock), amber #F59E0B (warnings).
- Brand: a small "The ERP Agent Blueprint" watermark at the bottom-left, 40% opacity.
- No sound. Keep motion calm and readable for beginners: hold each important state at least 2 seconds.

SECTION LENGTH: exactly 3:45 (225 seconds). The END card shows from 03:44 to 03:45.

APP LOOK (only these screens appear)
- Odoo-style ERP (browser frame, tab title changes per screen, e.g. "Physical Inventory - Odoo", URL bar "brightleaf-supplies.odoo.com/odoo/action-stock.action_view_inventory_tree"): purple-ish top bar (#714B67) with a home-grid icon, the app name "Inventory" and menu items Overview, Operations, Products, Reporting, Configuration. The Operations dropdown lists: Transfers (Receipts, Deliveries), Adjustments (Physical Inventory, Scrap), Procurement (Replenishment). Breadcrumb under the bar. "New" button top-left.
- Physical Inventory list: editable rows with columns Location | Product | On Hand Quantity | Counted Quantity | Difference, and an "Apply" button on each changed row; clicking Apply opens a small dialog "Inventory Adjustment Reference / Reason" with a purple "Apply" button.
- Product form for BL-1005 with smart buttons across the top: On Hand, Forecasted, In / Out, Min / Max (circular-arrows icon).
- Reorder rules list (from the Min / Max smart button): columns Product | Location | Min Quantity | Max Quantity, editable inline, cloud save icon.
- Replenishment list (Inventory > Operations > Replenishment): columns Product | Location | On Hand | Forecast | Min | Max | To Order, and a purple "Order" button on each row.
- Moves History list (from the In / Out smart button): columns Date | Reference | Product | From | To | Quantity | Done By | Status ("Done" green badge).

DATA TO SHOW
- Starting stock (Counted Quantity at Location "WH/Stock"):
  BL-1001 Steel Hex Bolts M10 (box of 100): 145
  BL-1002 Corrugated Shipping Box 18x12x10: 1,180
  BL-1003 Stretch Wrap Film 500mm: 260
  BL-1004 Industrial Safety Gloves (pair): 420
  BL-1005 Pallet Jack Wheels (set): 18
  BL-1006 Packing Tape 48mm (roll): 1,850
  BL-1007 Hydraulic Oil 20L: 31
  BL-1008 LED Warehouse Light 150W: 34
  BL-1009 Nylon Cable Ties (pack of 500): 410
  BL-1010 Forklift Battery Water Kit: 26
- Below reorder point after rules are added: BL-1002, BL-1004, BL-1005, BL-1007.
- Reorder rule for BL-1005: Location WH/Stock, Min 25, Max 50 (Max = 2 x reorder point). 50 - 18 = 32. Supplier Global Lift Parts, Shenzhen, lead time 21 days.
- Replenishment row: BL-1005 Pallet Jack Wheels (set) | WH/Stock | On Hand 18 | Forecast 18 | Min 25 | Max 50 | To Order 32.
- Rows that join later (after the learner adds the other rules):
  BL-1002 Corrugated Shipping Box 18x12x10 | 1,180 | Min 1,500 | Max 3,000 | To Order 1,820
  BL-1004 Industrial Safety Gloves (pair) | 420 | Min 600 | Max 1,200 | To Order 780
  BL-1007 Hydraulic Oil 20L | 31 | Min 40 | Max 80 | To Order 49
- Stock move for BL-1001: Date 11/17/2026 | Reference "Product Quantity Updated" | Steel Hex Bolts M10 (box of 100) | From "Virtual Locations/Inventory adjustment" | To "WH/Stock" | Quantity 145.00 | Done By Sarah Mitchell | Done.
- Future (ghosted) example moves: "Receipt from Apex Fasteners" and "Delivery to a customer in Dubai".
- Stocky's future insight bubble: "We've used about 40 boxes of bolts a week for the last month, so 145 will last under four weeks. Fine for now, but watch it."
- ON-SCREEN TEXT 1: "Use the "Starting Stock & Reorder" sheet in your workbook for all 10 quantities."
- ON-SCREEN TEXT 2: "Your Odoo now has: 10 products, 1 supplier, starting stock, a reorder rule, and a full paper trail."

TIMELINE (scene by scene; times are relative to the start of this section)
1. 00:00–00:09 | The browser shows the Inventory app. The cursor opens "Operations" and clicks "Physical Inventory". The list opens, empty. | Callout: "The screen you use after a stock count".
2. 00:09–00:26 | The cursor clicks "New". A new row appears: the Product cell opens a dropdown and the cursor picks "[BL-1001] Steel Hex Bolts M10 (box of 100)"; Location shows "WH/Stock"; the cursor clicks Counted Quantity and types 145. The cursor clicks "Apply"; the dialog opens; the cursor clicks the purple "Apply"; the row's On Hand becomes 145.00 with a green flash. | Callouts: "WH/Stock = the main warehouse shelf" and "Counted: 145".
3. 00:26–00:33 | Same steps for BL-1005 Pallet Jack Wheels (set), Counted Quantity 18, Apply. | Callout: "BL-1005: 18".
4. 00:33–00:43 | A "Fast forward 4x" badge appears at the top-right; the remaining eight rows fill in quickly with the exact quantities from the DATA block and each flashes green. The lower-third caption appears for 5 seconds (00:36–00:41). | ON-SCREEN TEXT 1: "Use the "Starting Stock & Reorder" sheet in your workbook for all 10 quantities."
5. 00:43–00:55 | The badge disappears. All 10 rows are visible. Rows BL-1002, BL-1004, BL-1005 and BL-1007 get a red side marker and a small red tag "below reorder point". | Callouts: "4 products low on purpose" and "Don't fix them: Stocky's first job in Video 6".
6. 00:55–01:13 | The cursor opens product BL-1005 Pallet Jack Wheels (set) (from the Products list), then clicks the "Min / Max" smart button (zoom 1.4x on the smart button, then out). The empty reorder rules list opens; the cursor clicks "New". | Callouts: "The rulebook part of the filing cabinet" and "Called 'Min / Max' or shows a refresh icon".
7. 01:13–01:28 | The new rule row: Location WH/Stock; the cursor types Min Quantity 25 and Max Quantity 50; clicks the cloud save icon. | Callouts: "Min = reorder point (25)" and "Max = 2 x reorder point (50)".
8. 01:28–01:52 | A rule card slides in at the right: "When wheels drop below 25 sets, top them back up to 50." Then a calculation animates under it: "50 - 18 = 32" with 32 in bold blue. Then a badge: "From Shenzhen, 21-day lead time" with a small moon icon and the label "Keeps Sarah awake at night". | Callout: "Odoo knows we need 32 more".
9. 01:52–02:00 | The cursor opens "Operations" and clicks "Replenishment". The Replenishment list opens. | No callout.
10. 02:00–02:15 | The BL-1005 row is visible: On Hand 18, Min 25, Max 50, To Order 32. Zoom to 1.5x on "To Order 32". The cursor hovers near the purple "Order" button but does NOT click; a small "no" icon (circle with a slash) appears beside the cursor. Zoom out at 02:13. | Callout: "Don't click Order: that decision is for Stocky and Sarah later".
11. 02:15–02:30 | A note card slides in at the top: "Add reorder rules for the other 9 products (your workbook)". Then three more rows slide into the Replenishment list one after another: BL-1002 (To Order 1,820), BL-1004 (To Order 780), BL-1007 (To Order 49), each with a red marker. | Callout: "Shipping boxes, safety gloves, hydraulic oil join the wheels".
12. 02:30–02:40 | The cursor opens product BL-1001 Steel Hex Bolts M10 (box of 100) and clicks the "In / Out" smart button. The Moves History list opens. | No callout.
13. 02:40–02:58 | One move row is visible. Zoom to 1.4x on the row; the columns get small labels one after another: "When" (Date), "From where" (Virtual Locations/Inventory adjustment), "To where" (WH/Stock), "How many" (145.00), "Who" (Sarah Mitchell). Zoom out at 02:56. | Callout: "The product's paper trail".
14. 02:58–03:18 | Two ghosted (40% opacity, dashed outline) future rows slide in below the real row: "Receipt from Apex Fasteners" and "Delivery to a customer in Dubai", then three more faint rows stack up and fade, suggesting a growing list. | Callout: "Every move, forever".
15. 03:18–03:39 | A padlock icon appears beside the list with the label "Nobody can quietly change a stock number". At 03:26 a small Stocky robot icon (rounded navy body, blue screen face) appears at the bottom-right with the speech bubble from the DATA block, typing in at about 20 characters/second. | Callout: "For an agent, this history is gold".
16. 03:39–03:44 | The lower-third caption appears for 5 seconds over a clean view of the Moves History list. | ON-SCREEN TEXT 2: "Your Odoo now has: 10 products, 1 supplier, starting stock, a reorder rule, and a full paper trail."
17. 03:44–03:45 | END card: navy background, white text "END". | -

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00] Our products exist, but the shelves are empty. Let's give BrightLeaf some starting stock. Go to Inventory, Operations, Physical Inventory. This is the screen you'd use after a stock count.
[00:09] Click New. Product: BL-1001, the bolts. Location: WH slash Stock, that's the main warehouse shelf. Counted quantity: one hundred and forty-five. Then Apply.
[00:26] Pallet jack wheels, BL-1005: eighteen. And I'll speed through the rest. All ten numbers are on the "Starting Stock and Reorder" sheet in your workbook, so you can copy them exactly.
[00:43] I've chosen these numbers on purpose. Four of our products are now below their reorder point. Don't fix that. Those four are Stocky's first job in video six.
[00:55] Now the rulebook part of our filing cabinet. Open the pallet jack wheels. Click the smart button for reorder rules. Depending on your version it says "Min / Max" or shows a little refresh icon. Then New.
[01:13] Min quantity: twenty-five. That's BrightLeaf's reorder point for the wheels. Max quantity: fifty. That's how high we want to refill to. At BrightLeaf, the Max is simply double the reorder point.
[01:28] So the rule now reads: when wheels drop below twenty-five sets, top them back up to fifty. We have eighteen. So Odoo knows we need thirty-two more. And remember, these come from Shenzhen with a twenty-one-day lead time. That's exactly the kind of product that keeps Sarah awake at night.
[01:52] And here's where it pays off. Inventory, Operations, Replenishment. Odoo already shows BL-1005 with a suggested "To Order" of thirty-two. Don't click Order. We're leaving that decision for Stocky and Sarah later in the course.
[02:15] Add reorder rules for the other nine products using your workbook. Once they are in, three more products join the wheels below their reorder point: the shipping boxes, the safety gloves and the hydraulic oil. It takes about five minutes, and it's great practice.
[02:30] Last thing, and it's my favourite. Open the bolts, BL-1001, and click "In slash Out". This is the product's paper trail. Every time stock moves in or out, Odoo writes it down: the date, from where, to where, how many and who did it.
[02:58] Right now there's just one line: one hundred and forty-five boxes of bolts added by an inventory adjustment, by Sarah, today. Once BrightLeaf starts buying and selling, this list grows. Receipt from Apex. Delivery to a customer in Dubai. Every move, forever.
[03:18] This is the rulebook side of the ERP. Nobody can quietly change a stock number. There's always a record of what happened. And for an agent, this history is gold. It's how Stocky will one day be able to say, "we've used about forty boxes of bolts a week for the last month, so a hundred and forty-five will last under four weeks. Fine for now, but watch it."

CHECKLIST
- Total duration exactly 3:45, END card visible only from 03:44 to 03:45.
- All 10 starting quantities, the 25/50 rule, "To Order 32" and the three later rows (1,820 / 780 / 49) match the DATA block exactly.
- The "Order" button is never clicked.
- Start button, hover-only Pause/Restart controls, progress bar, Space and R keys all work.
- Nothing overflows the 1920x1080 stage; no real logos.
```
**After Claude builds it:**
- The fast-forward in scene 4 should feel obviously sped up; if not, reply "add a subtle motion blur and a 4x badge during the fast-forward".
- Speak "Don't click Order" while the cursor hovers the button at about 02:05.
- Trim the first second before Start and the frames after END.

---
