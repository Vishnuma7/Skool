# Video 6: Your First Agent: Stocky Reads the ERP: Screen-Recording Prompts

**How to use:** 1. Open claude.ai, start a new chat, and paste ONE prompt. 2. Claude builds an animated demo you can preview. If anything looks wrong, reply in the same chat ("make the cursor slower", "the table is cut off"). 3. Open the demo full-screen in Chrome (press F11 / Ctrl+Cmd+F), start your screen recorder (QuickTime: File → New Screen Recording), then click **Start**. 4. Stop recording when the "END" card appears, trim the start and end, and add your voice-over from the script. Each demo runs for the same length as its script section, so the voice-over lines up.

**Sections in this video:**

| # | Section | Time | Length | Prompt |
|---|---|---|---|---|
| 1 | Build Stocky's Skeleton: Chat, Brain and Memory | 02:00–05:00 | 3 min 0 s | Prompt 1 of 6 |
| 2 | Give Stocky Hands: Three Odoo Tools | 05:00–09:15 | 4 min 15 s | Prompt 2 of 6 |
| 3 | Write Stocky's System Prompt | 11:30–13:45 | 2 min 15 s | Prompt 3 of 6 |
| 4 | Stocky's First Real Conversation | 13:45–17:00 | 3 min 15 s | Prompt 4 of 6 |
| 5 | Watch the Agent Think: Reading the Execution Log | 17:00–19:30 | 2 min 30 s | Prompt 5 of 6 |
| 6 | Catch a Hallucination, Then Fix It | 21:15–23:45 | 2 min 30 s | Prompt 6 of 6 |

---

## Prompt 1 of 6: Build Stocky's Skeleton: Chat, Brain and Memory (02:00–05:00, 3 min 0 s)

**What this demo shows:** a new n8n workflow being built from a Chat Trigger, an AI Agent, an Anthropic Chat Model and Simple Memory, then a first chat test where Stocky admits it has no access to inventory data.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. The demo recreates, in a simplified look-alike style, an n8n-style workflow builder. It teaches beginners how to build the skeleton of an AI agent called "Stocky": a chat trigger (the doorbell), an AI Agent (the intern), a Claude chat model (the brain) and Simple Memory (the notepad). It ends with a chat test that proves a brain without tools cannot read inventory data.

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

SECTION LENGTH: exactly 3:00 (180 seconds), including the 1-second END card.

APP LOOK
- Browser frame: tab title "n8n - Overview" (later "Stocky v1 – Reads the ERP - n8n"), URL bar "https://brightleaf.app.n8n.cloud/home/workflows" (after creating: "https://brightleaf.app.n8n.cloud/workflow/new").
- n8n-style app: thin dark left sidebar with simple icons (Overview, Templates, Credentials) and a light "Overview" page that lists workflows as rows, with an orange "Create Workflow" button at the top-right.
- Workflow editor: top bar with the editable workflow name at the top-left (click to rename), an "Editor | Executions" tab switch in the centre, and a grey "Save" button at the right. Below it a dark grey canvas (#2B2D31) with a subtle dotted grid.
- Empty canvas: a large dashed rounded square in the centre with a "+" and the label "Add first step".
- Node creator: a right-side panel (white, 480 px wide) with a search box at the top and a list of options with small icons and one-line descriptions.
- Nodes: rounded squares (100x100 px) with a white simple line icon and a label underneath in light grey. Trigger nodes have a rounded left edge and a small lightning badge. Connections are smooth grey bezier lines with a small "+" button on the right edge of each node on hover.
- AI Agent node: a wider rounded rectangle (240x100 px) with a robot icon and the label "AI Agent". On its bottom edge it has three small diamond-shaped sub-ports labelled "Chat Model*", "Memory" and "Tool", each with a "+" below it. Sub-nodes (Anthropic Chat Model, Simple Memory) are circles (80 px) hanging below the agent, linked by dashed grey lines.
- Node settings panel: a large centred modal over a dimmed canvas, with a title bar (node icon + editable name), "Parameters | Settings" tabs and labelled form fields (dropdowns with a chevron, number inputs, text areas).
- Chat panel: a "Chat" pill button at the bottom centre of the canvas. When clicked, a bottom drawer slides up (40% of the height): left half is the chat (user bubbles on the right in blue #2563EB with white text, assistant bubbles on the left in light grey #F1F5F9 with dark text, an input box at the bottom with a send arrow, and a small circular "reset session" icon at the top-right of the chat); right half is a "Logs" area that stays empty in this section.
- While the agent runs: the AI Agent node gets a spinning orange ring; the sub-node it is using pulses; finished nodes show a small green tick at the top-right.

DATA TO SHOW (use exactly)
- Workflow name typed: Stocky v1 – Reads the ERP
- Trigger chosen in the node creator: "On chat message" (description: "Runs the flow when a user sends a chat message"). Node label on canvas: "When chat message received".
- Search text: AI Agent. AI Agent panel field: "Source for Prompt (User Message)" = "Connected Chat Trigger Node".
- Chat model: "Anthropic Chat Model". Field "Credential to connect with" = "Anthropic – BrightLeaf". Field "Model" = "Claude Sonnet (latest)" (the newest Sonnet at the top of the list, with a small "newest" tag).
- Memory: "Simple Memory". Field "Session ID" = "Connected Chat Trigger Node" (greyed). Field "Context Window Length" changes from 5 to 10.
- Chat test, user types: Hi Stocky, how many Pallet Jack Wheels do we have?
- Stocky replies: "I'm sorry, I don't have access to your inventory data, so I can't tell you how many Pallet Jack Wheels you have right now. If you can share the stock figures, I'm happy to help."

TIMELINE (scene by scene; times relative to section start)
1. 00:00-00:04 | n8n Overview page with an empty-ish list of workflows. Cursor glides to the orange "Create Workflow" button and clicks (ripple). | -
2. 00:04-00:10 | The editor opens with an empty dotted canvas and the name "My workflow" at the top-left. Cursor clicks the name, it becomes an editable field with the text selected; typing "Stocky v1 – Reads the ERP", then Enter. The browser tab title updates. | -
3. 00:10-00:17 | Hold on the named workflow. | Callout on the name: "Name it straight away - you'll improve this one all course"
4. 00:17-00:24 | Cursor clicks the dashed "Add first step" square. The right node-creator panel slides in ("What triggers this workflow?"). Typing "chat" in the search; the list filters and "On chat message" highlights; cursor clicks it. | -
5. 00:24-00:32 | Panel closes. The trigger node "When chat message received" (chat-bubble icon, lightning badge) pops onto the canvas at left-centre with a soft bounce. A "Chat" pill button slides up at the bottom centre of the canvas. | -
6. 00:32-00:44 | Hold. Two callouts pop in one after the other. | Callout on the node: "The doorbell = a chat message". Then callout with an arrow on the Chat button: "This is where we talk to Stocky"
7. 00:44-00:52 | Cursor hovers the trigger node; the small "+" appears on its right edge; click. Node creator opens; typing "AI Agent"; cursor clicks the "AI Agent" result. | -
8. 00:52-01:00 | The AI Agent node appears to the right, connected by a grey line, and its settings modal opens. Smooth zoom (1.5x) onto the field "Source for Prompt (User Message)" showing "Connected Chat Trigger Node". | Callout: "Whatever we type in the chat = Stocky's task"
9. 01:00-01:06 | Zoom back out; cursor clicks the modal's close X. The canvas now shows Chat Trigger -> AI Agent, with the three sub-ports under the agent. | -
10. 01:06-01:14 | Hold; the three sub-ports gently pulse one by one. | Callout: "The three plugs: Chat Model / Memory / Tool"
11. 01:14-01:26 | Cursor clicks "+" under "Chat Model*". Node creator lists language models; cursor clicks "Anthropic Chat Model". Its modal opens: cursor opens "Credential to connect with" and picks "Anthropic – BrightLeaf"; then opens "Model" and picks "Claude Sonnet (latest)". | Small callout next to the Model field: "Sonnet: good at choosing the right tool"
12. 01:26-01:38 | Modal closes. A circular sub-node "Anthropic Chat Model" (spark icon) hangs under the "Chat Model*" port with a dashed line. | Callout: "Plug 1: the brain"
13. 01:38-01:46 | Cursor clicks "+" under "Memory"; chooses "Simple Memory"; its modal opens. | -
14. 01:46-01:58 | Inside the modal, a small illustrative inset card slides in on the right (not over the fields): two mini chat lines, "You: Tell me about BL-1005" then "You: and who supplies it?" and a reply "Supplies what?" with a little goldfish icon and a crossed-out notepad. | Callout on the inset: "No memory = goldfish brain"
15. 01:58-02:10 | Inset fades. Zoom (1.5x) onto "Context Window Length" = 5. Cursor clicks the field, selects 5, types 10. | Callout: "How many back-and-forth messages Stocky remembers"
16. 02:10-02:19 | Zoom out, modal closes; a circular "Simple Memory" sub-node (notepad icon) hangs under the "Memory" port. | ON-SCREEN TEXT lower-third from 02:12 to 02:17: "Simple Memory = the intern's notepad for this conversation. It does NOT remember forever."
17. 02:19-02:24 | Cursor clicks the "Chat" pill; the chat drawer slides up from the bottom (chat left, empty Logs right). | -
18. 02:24-02:31 | Cursor clicks the input box; typing "Hi Stocky, how many Pallet Jack Wheels do we have?"; Enter. The blue user bubble appears. | -
19. 02:31-02:37 | The AI Agent node shows its spinning orange ring and the Anthropic sub-node pulses for ~3 s; then both get a green tick and Stocky's grey reply bubble fades in with the full reply text. | -
20. 02:37-02:50 | Hold on the reply; the phrase "I don't have access to your inventory data" gets a soft yellow highlight. | Callout: "Good! It has a brain and memory... but no hands"
21. 02:50-02:59 | Camera pans slightly to the AI Agent node; the empty "Tool" sub-port pulses with a dashed outline. | Callout on the Tool port: "Brain without tools = just a chatbot. Next: give it hands"
22. 02:59-03:00 | END card. | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
00:00 Open n8n and click "Create Workflow". Name it straight away: "Stocky v1, Reads the ERP". This is the workflow you'll keep improving for the rest of the course.
00:17 Click "Add first step" and choose "On chat message". Last video our doorbell was a button. Today, the doorbell is a chat message. Every time someone types a question, the recipe starts. See the new "Chat" button at the bottom? That's where we'll talk to Stocky.
00:44 Now click the plus, search "AI Agent", and add it. Look at "Source for Prompt". It already says "Connected Chat Trigger Node". Exactly right. Whatever we type in the chat becomes Stocky's task. Close the panel.
01:06 Underneath the AI Agent, remember the three plugs. First, the brain. Click the plus under "Chat Model", choose "Anthropic Chat Model", pick the credential "Anthropic, BrightLeaf" we saved last time, and choose the newest Claude Sonnet model. Sonnet is a great choice for agents because it's good at deciding which tool to use.
01:38 Second plug: memory. Click the plus under "Memory" and choose "Simple Memory". Why do we need this? Without memory, Stocky forgets everything after each message. You ask about BL-1005, then ask "and who supplies it?", and Stocky says, "Supplies what?" Like an intern with a goldfish brain. The "Context Window Length" is how many back-and-forth messages Stocky remembers. I'll set it to ten.
02:19 Before we go further, let's test the skeleton. Click "Chat" and ask: "Hi Stocky, how many Pallet Jack Wheels do we have?" Look at the answer. Stocky politely says it doesn't have access to inventory data. And that's good! It has a brain and a memory, but no hands. It can't reach into Odoo yet. A brain without tools is just a chatbot. Let's give it hands.

CHECKLIST
- Total duration exactly 3:00 (180 s), driven by one master timeline; END card in the final second.
- Start button, hover-only Pause/Restart, progress bar, Space and R keys all work.
- Workflow name, node names, credential "Anthropic – BrightLeaf" and Context Window Length 5 -> 10 match the DATA block exactly.
- The AI Agent node clearly shows the three sub-ports (Chat Model*, Memory, Tool) and the Tool port stays empty at the end.
- Callouts never cover the field or node they explain; nothing overflows the 1920x1080 stage.
```

**After Claude builds it:** Press Start and let it run once without recording to check that the chat drawer does not hide the AI Agent node in the final scene. If the typing feels rushed, ask Claude to slow it to 12 characters per second but keep the total at 3:00. Trim the first second (the Start click) in your editor.

---

## Prompt 2 of 6: Give Stocky Hands: Three Odoo Tools (05:00–09:15, 4 min 15 s)

**What this demo shows:** a quick check of BL-1005 in Odoo (on hand, Min/Max, vendor line), then three read-only Odoo Tool nodes being added under the AI Agent, each with a clear name, description, resource and only the fields it needs.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. The demo recreates, in a simplified look-alike style, an Odoo-style ERP and an n8n-style workflow builder. It teaches beginners that an agent is only as good as the data it reads: we check one product in the ERP, then give the AI agent "Stocky" three read-only tools ("hands"), one for each "drawer" of data: products & stock, reorder rules, and suppliers & lead times.
This section is longer than 4 minutes: organise the JavaScript by scene (one function or object per scene, with its start/end time) so each scene is easy to tweak.

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

SECTION LENGTH: exactly 4:15 (255 seconds), including the 1-second END card.

APP LOOK
- Browser frame with two tabs: "Pallet Jack Wheels (set) - Odoo" (URL "https://brightleaf.odoo.com/odoo/inventory/products/5") and "Stocky v1 – Reads the ERP - n8n" (URL "https://brightleaf.app.n8n.cloud/workflow/stocky-v1"). Switching tabs = the active tab turns white and the content cross-fades.
- Odoo-style ERP: purple-ish top bar (#714B67) with the app name "Inventory" and menu items "Overview, Operations, Products, Reporting, Configuration"; a breadcrumb "Products / Pallet Jack Wheels (set)". Product form view: product name as a big title, a row of smart buttons at the top-right (rounded boxes with an icon, a big number and a label), a "General Information | Sales | Purchase | Inventory" tab row, and form fields in two columns.
- n8n-style workflow canvas: dark grey dotted canvas (#2B2D31), rounded square nodes with an icon and label, grey connector lines with animated dots when data flows, settings shown in a centred modal over a dimmed canvas, an orange "Test workflow" button bottom-centre, and an "Editor | Executions" switch at the top.
- AI Agent node: a wide rounded rectangle with a robot icon and "AI Agent", three sub-ports on its bottom edge labelled "Chat Model*", "Memory" and "Tool". Already attached from the previous section: circular sub-nodes "Anthropic Chat Model" (under Chat Model) and "Simple Memory" (under Memory), with dashed links. On the left, the trigger node "When chat message received" connects into the agent.
- Odoo Tool sub-nodes: circles (80 px) with a simple database/cabinet icon and the node name under it, hanging under the "Tool" port with dashed links. Hovering a tool shows a small toolbar above it with a "..." menu (options: Open, Rename, Duplicate, Delete).
- Tool settings modal fields (top to bottom): editable node title; "Credential to connect with" (dropdown); "Tool Description" (dropdown "Set Automatically / Set Manually" and, when manual, a "Description" textarea); "Resource" (dropdown); "Custom Resource Name or ID" (searchable dropdown); "Operation" (dropdown); "Return All" (toggle switch, orange when on); "Options" section with an "Add option" button, which adds "Fields to Include" as a multi-select that shows chosen fields as grey chips with a small x.

DATA TO SHOW (use exactly)
Odoo product form for BL-1005:
- Title: Pallet Jack Wheels (set). Internal Reference: BL-1005. Product Type: Goods. Cost: $38.00.
- Smart buttons: "On Hand 18 Units", "Forecasted 18 Units", "Min / Max 25 / 50", "In: 0 / Out: 0".
- Purchase tab, vendor table with columns Vendor | Price | Currency | Delivery Lead Time, one row: Global Lift Parts | 38.00 | USD | 21 days.
Tool 1:
- Name: get_products_and_stock
- Credential: Odoo – BrightLeaf
- Tool Description: Set Manually -> "Returns every product with its SKU (default_code), name, quantity on hand (qty_available) and unit cost (standard_price). Use this for any question about stock levels."
- Resource: Custom Resource. Custom Resource Name: product.product (shown in the list as "Product Variant (product.product)").
- Operation: Get Many. Return All: ON.
- Options -> Fields to Include: default_code, name, qty_available, standard_price
Tool 2 (duplicate of tool 1, then changed):
- Name: get_reorder_rules
- Custom Resource Name: stock.warehouse.orderpoint (shown as "Minimum Inventory Rule (stock.warehouse.orderpoint)")
- Fields to Include: product_id, product_min_qty, product_max_qty
- Description: "Returns the reorder point (product_min_qty) and maximum quantity for each product. Use this to decide whether stock is running low."
Tool 3 (duplicate again):
- Name: get_supplier_info
- Custom Resource Name: product.supplierinfo (shown as "Supplier Pricelist (product.supplierinfo)")
- Fields to Include: partner_id, product_tmpl_id, price, min_qty, delay
- Description: "Returns the vendor (partner_id), purchase price, minimum order quantity and delivery lead time in days (delay) for each product. Use this for questions about suppliers, prices and lead times."
Final canvas: When chat message received -> AI Agent; under the agent: Anthropic Chat Model, Simple Memory, get_products_and_stock, get_reorder_rules, get_supplier_info. Save shortcut badge: "Cmd+S" with a green toast "Saved".

TIMELINE (scene by scene; times relative to section start)
1. 00:00-00:05 | Odoo tab is active on the Inventory > Products list; cursor clicks the row "Pallet Jack Wheels (set)"; the product form opens. | -
2. 00:05-00:14 | Product form for BL-1005. Cursor glides to the "On Hand 18 Units" smart button; it gets a red outline. | Callout: "On hand: 18"
3. 00:14-00:22 | Cursor moves to "Min / Max 25 / 50"; zoom 1.4x on it. | Callout: "Reorder point (Min): 25"
4. 00:22-00:32 | Zoom out; cursor clicks the "Purchase" tab; the vendor table appears. Zoom 1.5x onto the row "Global Lift Parts | 38.00 | USD | 21 days". | Callout: "Vendor, price and lead time"
5. 00:32-00:42 | Zoom out. A clean illustration slides in over the right half (not covering the vendor row): a three-drawer filing cabinet; each drawer slides open in turn with a label: "products & stock", "reorder rules", "suppliers & lead times". | ON-SCREEN TEXT lower-third from 00:34 to 00:39: "Drawer 1: products & stock | Drawer 2: reorder rules | Drawer 3: suppliers & lead times"
6. 00:42-00:49 | Cabinet stays; a small amber note card appears under it. | Amber callout: "Missing a reorder rule or vendor line? Add it now. Garbage in, garbage out."
7. 00:49-00:55 | Cursor clicks the n8n browser tab; the canvas fades in showing the chat trigger, AI Agent, Anthropic Chat Model and Simple Memory. Cursor glides to "+" under the "Tool" port. | -
8. 00:55-01:03 | Click; node creator panel "Tools" opens; typing "Odoo"; result "Odoo Tool" highlights; click. | -
9. 01:03-01:09 | The tool settings modal opens (title "Odoo"). | Callout: "Same Odoo 'waiter' from Video 3 - now working for the agent"
10. 01:09-01:18 | Cursor clicks the modal title; text selected; typing "get_products_and_stock"; Enter. | Callout: "Stocky reads this name to decide when to use it"
11. 01:18-01:24 | Cursor opens "Credential to connect with" and picks "Odoo – BrightLeaf". | -
12. 01:24-01:40 | "Tool Description" dropdown -> "Set Manually"; the Description textarea appears; the description of tool 1 types in (speed this one up to ~13 characters/second so it finishes by 01:38). | -
13. 01:40-01:49 | Hold; a little drawer icon with a paper label appears beside the textarea, the label text being the description's first words. | Callout: "The label on the drawer - clear label, right drawer"
14. 01:49-01:56 | "Resource" dropdown opens -> "Custom Resource". | -
15. 01:56-02:06 | "Custom Resource Name or ID" dropdown opens with a search; typing "product.product"; the option "Product Variant (product.product)" highlights; click. | Callout: "Odoo may call it 'Product Variant'"
16. 02:06-02:13 | "Operation" -> "Get Many"; cursor clicks the "Return All" toggle; it slides to ON (orange). | -
17. 02:13-02:30 | Cursor clicks "Add option" -> "Fields to Include"; the multi-select opens a long field list (with a scrollbar and a faint counter "100+ fields"); four chips get added one by one, about 3 s apart: default_code, name, qty_available, standard_price. | Callout on the first chip: "default_code = Odoo's name for the SKU"
18. 02:30-02:42 | Zoom 1.4x on the four chips. A small side card appears: a single page icon vs a fat binder icon (crossed out). | Callout: "Only 4 fields = fewer tokens, lower cost, less confusion. The page they need, not the whole binder."
19. 02:42-02:48 | Zoom out; modal closes; the "get_products_and_stock" sub-node now hangs under the Tool port. Cursor hovers it, opens the "..." menu and clicks "Duplicate"; a copy pops in to its right with a dashed link to the Tool port. | -
20. 02:48-03:02 | The copy's modal opens. Title renamed by typing "get_reorder_rules". "Custom Resource Name" changed to "Minimum Inventory Rule (stock.warehouse.orderpoint)". The four old chips fade out and the new chips appear: product_id, product_min_qty, product_max_qty. | Small callout on product_min_qty: "min qty = your reorder point"
21. 03:02-03:10 | Description textarea: select-all, then the tool 2 description pastes in (appears instantly with a soft flash). | -
22. 03:10-03:16 | Modal closes; cursor duplicates again; a third sub-node appears to the right. | -
23. 03:16-03:30 | Its modal opens: title typed "get_supplier_info"; Custom Resource Name -> "Supplier Pricelist (product.supplierinfo)"; chips appear: partner_id, product_tmpl_id, price, min_qty, delay. | -
24. 03:30-03:40 | Description pastes in; zoom 1.5x on the phrase "delivery lead time in days (delay)", which gets a yellow highlight. | -
25. 03:40-03:49 | The "delay" chip gets a yellow ring; a tiny illustration of a calendar (good) next to a crossed-out "LATE!" stamp. | Callout: "delay = lead time in days, NOT a late shipment"
26. 03:49-03:58 | Modal closes; the canvas zooms out to show the whole agent. Friendly labels pop in under each node, one by one: trigger "doorbell", AI Agent "intern", Anthropic Chat Model "brain", Simple Memory "notepad", the three tools "hands". | -
27. 03:58-04:05 | A small green "Get Many - read only" badge with a lock icon appears on each of the three tools. | Callout: "Stocky can read, but can't change anything in Odoo"
28. 04:05-04:14 | A keyboard badge "Cmd+S" appears; a green toast "Saved" slides in at the top-right. | ON-SCREEN TEXT lower-third from 04:08 to 04:13: "Stocky v1 is READ-ONLY. Safe to experiment."
29. 04:14-04:15 | END card. | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
00:00 Quick check in Odoo first, because an agent is only as good as the data it reads. Here's BL-1005, Pallet Jack Wheels. On hand: eighteen. The reorder rule, here in the "Min Max" button: minimum twenty-five. And on the Purchase tab, the vendor: Global Lift Parts, thirty-eight dollars a set, delivery lead time twenty-one days. Three kinds of information, in three different drawers of the filing cabinet. So we'll give Stocky three tools, one for each drawer. If one of your products is missing a reorder rule or a vendor line, add it now. Garbage in, garbage out.
00:49 Back in n8n, click the plus under "Tool". Search "Odoo" and choose "Odoo Tool". This is the same Odoo waiter we met in Video 3, but now it works for the agent. Stocky can call it whenever it decides it needs data.
01:09 Let's set it up line by line. First, rename the node to "get products and stock", with underscores. The name matters, because Stocky reads it to decide when to use this tool. Credential: "Odoo, BrightLeaf". Next, "Tool Description". Set it manually and describe in plain English what this tool returns: every product, with its SKU, name, quantity on hand and unit cost. This sentence is like the label on the drawer. A clear label means Stocky opens the right drawer.
01:49 Resource: choose "Custom Resource". That lets us pick any drawer in Odoo. For the name, choose "product dot product". Odoo might call it "Product Variant". Operation: "Get Many", because we want the whole list. Switch on "Return All". And finally, under Options, "Fields to Include". We'll pick just four fields: default code, which is Odoo's name for the SKU, name, quantity available, and standard price. Why only four? Because every extra field is more reading for Stocky, which means more tokens, more cost, and more chance of confusion. Give the intern the page they need, not the whole binder.
02:42 Tool number two is quicker. Duplicate the first one and change three things. The name: "get reorder rules". The drawer: "stock dot warehouse dot orderpoint", which Odoo may show as "Minimum Inventory Rule". And the fields: product, minimum quantity, and maximum quantity. The minimum quantity is your reorder point.
03:10 And tool number three: "get supplier info". The drawer is "product dot supplier info", which may show as "Supplier Pricelist". The fields: the partner, the product, the price, the minimum order quantity, and "delay". In Odoo, "delay" means the delivery lead time in days. That's an odd name, so we explain it in the description. Without that sentence, Stocky might think "delay" means the shipment is late.
03:49 Step back and look. A doorbell, an intern, a brain, a notepad, and three hands, each reaching into a different drawer. And notice: every tool only uses "Get Many". Stocky can read, but it can't change anything in Odoo. That's on purpose. Reading first, acting later, with your approval. Save it.

CHECKLIST
- Total duration exactly 4:15 (255 s); END card in the final second; code organised by scene.
- Odoo values match exactly: On Hand 18, Min / Max 25 / 50, Global Lift Parts, 38.00 USD, 21 days.
- All three tool names, resource names, descriptions and field chips match the DATA block character for character (underscores included).
- The final canvas shows 5 sub-nodes under the AI Agent (brain, notepad, three tools) with nothing overlapping.
- Both ON-SCREEN TEXT lower-thirds appear for 5 s each; callouts never cover the field they explain; nothing overflows the 1920x1080 stage.
```

**After Claude builds it:** This is the longest demo in the video, so preview scenes 17 to 25 carefully: the field chips must be readable at full screen. If you need to adjust one step, ask Claude to change only that scene's function. Record in one take and trim the Start click.

---

## Prompt 3 of 6: Write Stocky's System Prompt (11:30–13:45, 2 min 15 s)

**What this demo shows:** the full five-part system prompt (Role, Goal, Tools, Rules, Output format) being pasted into the AI Agent's System Message, then each block highlighted in turn.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. The demo recreates, in a simplified look-alike style, the settings panel of an AI Agent node in an n8n-style workflow builder. It teaches beginners how to write a system prompt as a job description with five parts (Role, Goal, Tools, Rules, Output format), by pasting a full prompt and then walking through each block with highlights.

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

SECTION LENGTH: exactly 2:15 (135 seconds), including the 1-second END card.

APP LOOK
- Browser frame: tab title "Stocky v1 – Reads the ERP - n8n", URL "https://brightleaf.app.n8n.cloud/workflow/stocky-v1".
- n8n-style workflow canvas (dark grey dotted background #2B2D31) showing: "When chat message received" -> "AI Agent", and hanging below the agent (dashed links) the circular sub-nodes "Anthropic Chat Model", "Simple Memory", "get_products_and_stock", "get_reorder_rules", "get_supplier_info".
- AI Agent settings: a large centred modal (1400x900 px) over the dimmed canvas. Title bar with robot icon and "AI Agent". Fields: "Source for Prompt (User Message)" = "Connected Chat Trigger Node", then an "Options" section with an "Add Option" button. Clicking it opens a small list ("System Message", "Max Iterations", "Return Intermediate Steps"). Adding "System Message" shows a tall text editor field with a monospace-like look (use Inter at 20 px, line-height 1.45, dark text on a very light grey #F8FAFC background) containing the default text "You are a helpful assistant".
- The editor must fit the whole prompt below without scrolling the text out of view: use the full modal height, and if needed auto-scroll the editor smoothly so the block being discussed is in the centre. Section headings (# ROLE etc.) are bold navy.
- Highlights: a block being discussed gets a soft yellow (#FFD84D at 35% opacity) band behind it and the rest of the text dims to 50%.

DATA TO SHOW (use exactly; this is the full system prompt pasted into the editor, line breaks as shown)
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

TIMELINE (scene by scene; times relative to section start)
1. 00:00-00:05 | Canvas view. Cursor double-clicks the AI Agent node; the settings modal opens. | -
2. 00:05-00:12 | Cursor scrolls down to "Options", clicks "Add Option"; the small list opens; cursor clicks "System Message". The editor appears with "You are a helpful assistant". | -
3. 00:12-00:18 | Cursor clicks into the editor; the default text gets selected (blue selection) and disappears (delete). A keyboard badge "Cmd+V" appears. | -
4. 00:18-00:28 | The full prompt pastes in (appears in one go with a soft flash, then settles). | Callout at the editor's top-right: "Full text: Stocky Prompt Builder activity file - no need to pause and type"
5. 00:28-00:40 | The # ROLE block gets the yellow band; the rest dims. Words "Stocky", "BrightLeaf Supplies", "Columbus, Ohio, USA" and "Sarah Mitchell" get thin underlines one by one. | Callout: "ROLE: who Stocky is and who it works for"
6. 00:40-00:46 | The band moves to # GOAL. | Callout: "GOAL: what success looks like"
7. 00:46-00:52 | Zoom 1.5x on the "#" sign of "# ROLE" and "# GOAL". | Callout: "Not code - just tidy headings for you and the AI"
8. 00:52-01:04 | Zoom out; the band moves to # TOOLS. The bracketed field names (default_code), (qty_available), (standard_price), (product_min_qty), (product_max_qty), (partner_id), (min_qty), (delay) turn blue one after another. A small blue tag "lead time <-> delay" floats next to tool 3. | Callout: "Plain English + Odoo field names in brackets"
9. 01:04-01:16 | Zoom 1.4x on the line "Always use the tools to get fresh data ... Never answer these from memory." It gets a stronger yellow band. | Callout: "Stock changes every hour. Yesterday's number is a wrong number."
10. 01:16-01:30 | Zoom out; the band moves to # RULES; the first two bullets get a bright yellow band with a thick left bar; a small "1" and "2" badge appear beside them. | Callout: "The two most important lines in the prompt"
11. 01:30-01:40 | The "running low" and "watch list" bullets highlight. | Callout: "Business definitions = a supply chain decision, not a programming one"
12. 01:40-01:52 | Zoom 1.5x on "15%", which gets an amber circle drawn around it. | Amber callout: "Change 15% to whatever your company uses"
13. 01:52-02:02 | Zoom out; the band moves to # OUTPUT FORMAT. A small ghost preview card slides in beside the editor (not over the text): a one-line answer, a tiny table header "SKU | Product | On hand | Reorder point | Gap", and a footer "Source: Odoo (live) – ...". | Callout: "One-line answer, table, sorted by urgency"
14. 02:02-02:10 | Zoom 1.5x on the line 'End with one line: "Source: Odoo (live) –"'. | Callout: "The source line: Stocky tells you which drawers it opened"
15. 02:10-02:14 | Zoom out; all text undims; cursor clicks the modal's close X; a "Cmd+S" badge and a green "Saved" toast appear. | -
16. 02:14-02:15 | END card. | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
00:00 Open the AI Agent node, go to Options, add "System Message", delete the default "You are a helpful assistant", and paste Stocky's job description. You'll find the full text in the Stocky Prompt Builder activity file, so you don't need to pause and type. Let's walk through it, because every line is there for a reason.
00:28 Role and Goal: who Stocky is, who it works for, and what success means. Notice I wrote the headings in capital letters with a hash sign. That's not code. It's just a tidy way to organise text so both you and the AI can find each section.
00:52 Tools: each tool, in plain English, with the Odoo field names in brackets, so Stocky can match "lead time" to the odd word "delay". And one important line: "Always use the tools to get fresh data. Never answer from memory." Stock changes every hour. Yesterday's number is a wrong number.
01:16 Rules. The first two are the most important lines in the whole prompt. Only answer from tool data. And if the data isn't there, say "I don't know." Then, our business definitions: running low means at or below the reorder point, and the watch list is anything within fifteen percent above it. That's a decision a supply chain person makes, not a programmer. Change the fifteen percent to whatever your company uses.
01:52 And the output format: a one-line answer first, then a table, sorted by urgency, and a source line at the end. The source line is my favourite trick. It forces Stocky to tell you which drawers it opened, so you can always check.

CHECKLIST
- Total duration exactly 2:15 (135 s); END card in the final second.
- The system prompt text matches the DATA block word for word, with all five headings.
- Every block is readable when highlighted (auto-scroll or zoom so the active block is fully visible).
- Highlights and callouts are in sync with the TIMELINE and never cover the highlighted lines.
- Start button, Pause/Restart, progress bar and keyboard shortcuts work; nothing overflows the 1920x1080 stage.
```

**After Claude builds it:** Check that the full prompt is readable at your recording resolution; if the text looks small, ask Claude to increase the editor font and auto-scroll more. Keep the paste moment (00:18) crisp, as it's the "wow" beat. Trim the Start click.

---

## Prompt 4 of 6: Stocky's First Real Conversation (13:45–17:00, 3 min 15 s)

**What this demo shows:** Stocky answering "What's running low?" with a sorted table, a fact-check against the Odoo product list, then a supplier question and a memory follow-up.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. The demo recreates, in a simplified look-alike style, an n8n-style workflow builder with its chat panel, plus an Odoo-style ERP product list. It teaches beginners what a working AI agent looks like: you ask a question in plain English, the agent calls its read-only tools (you can watch the nodes light up), answers in a table, and you then check the numbers against the ERP. It also shows conversation memory in action.

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

SECTION LENGTH: exactly 3:15 (195 seconds), including the 1-second END card.

APP LOOK
- Browser frame with two tabs: "Stocky v1 – Reads the ERP - n8n" (URL "https://brightleaf.app.n8n.cloud/workflow/stocky-v1") and "Products - Odoo" (URL "https://brightleaf.odoo.com/odoo/inventory/products").
- n8n-style canvas in the top 45% of the stage (dark grey dotted #2B2D31): "When chat message received" -> "AI Agent" (wide rounded rectangle, robot icon) with five circular sub-nodes hanging underneath via dashed lines: "Anthropic Chat Model", "Simple Memory", "get_products_and_stock", "get_reorder_rules", "get_supplier_info".
- Chat drawer in the bottom 55%: chat on the left 60% (user bubbles right-aligned in blue #2563EB with white text, Stocky bubbles left-aligned in light grey #F1F5F9 with dark text, Markdown tables rendered as real neat tables with a header row, an input box with a send arrow at the bottom, and a small circular reset icon at the top-right labelled "New session"); a narrow empty "Logs" column on the right 40% (just a heading, it is used in the next section).
- Run animation (the key visual): when Stocky is thinking, the AI Agent node shows a spinning orange ring; the sub-node being used glows orange for ~1.5 s, small white dots travel along its dashed link toward the agent, then it gets a green tick at its top-right. Ticks stay visible until the next question.
- Odoo-style product list: purple-ish top bar (#714B67) with "Inventory" and menu items; breadcrumb "Products"; a list view with a checkbox column and columns Internal Reference | Name | Cost | On Hand | Forecasted. Rows below their reorder point show the On Hand number in red.
- Stocky's answers render Markdown: bold is not needed, tables as tables, a final grey "Source: ..." line in smaller italic text.

DATA TO SHOW (use exactly)
Question 1 (typed): What's running low?
Answer 1 (rendered):
4 products are at or below their reorder point.
| SKU | Product | On hand | Reorder point | Gap |
| BL-1004 | Industrial Safety Gloves (pair) | 420 | 600 | -180 |
| BL-1005 | Pallet Jack Wheels (set) | 18 | 25 | -7 |
| BL-1007 | Hydraulic Oil 20L | 31 | 40 | -9 |
| BL-1002 | Corrugated Shipping Box 18x12x10 | 1,180 | 1,500 | -320 |
Watch list: BL-1008 LED Warehouse Light 150W – 34 on hand, reorder point 30 (13% above).
Source: Odoo (live) – get_products_and_stock, get_reorder_rules
Tools that light up for question 1, in order: Anthropic Chat Model -> get_products_and_stock -> get_reorder_rules -> Anthropic Chat Model.

Side card for the sort order (percentage shortfall of the reorder point): Gloves 180 / 600 = 30% below; Wheels 7 / 25 = 28% below; Oil 9 / 40 = 22.5% below; Boxes 320 / 1,500 = 21% below.

Odoo product list (Internal Reference | Name | Cost | On Hand):
BL-1001 | Steel Hex Bolts M10 (box of 100) | $12.50 | 145
BL-1002 | Corrugated Shipping Box 18x12x10 | $0.85 | 1,180 (red)
BL-1003 | Stretch Wrap Film 500mm | $9.20 | 260
BL-1004 | Industrial Safety Gloves (pair) | $2.40 | 420 (red)
BL-1005 | Pallet Jack Wheels (set) | $38.00 | 18 (red)
BL-1006 | Packing Tape 48mm (roll) | $1.10 | 1,850
BL-1007 | Hydraulic Oil 20L | $54.00 | 31 (red)
BL-1008 | LED Warehouse Light 150W | $72.00 | 34
BL-1009 | Nylon Cable Ties (pack of 500) | $6.30 | 410
BL-1010 | Forklift Battery Water Kit | $19.75 | 26
(Forecasted = same as On Hand.)

Question 2 (typed): Which supplier provides BL-1005 and what's the lead time?
Answer 2:
BL-1005 Pallet Jack Wheels (set) is supplied by Global Lift Parts, with a delivery lead time of 21 days.
- Purchase price: $38.00 per set
- Minimum order quantity: 10 sets
- Current stock: 18 sets, 7 below the reorder point of 25
With a 21-day lead time, an order placed today would arrive in about 3 weeks.
Source: Odoo (live) – get_products_and_stock, get_supplier_info
Tools that light up: Anthropic Chat Model -> get_products_and_stock -> get_supplier_info -> Anthropic Chat Model.

Question 3 (typed): And what about the hydraulic oil?
Answer 3:
BL-1007 Hydraulic Oil 20L is supplied by Gulf Lubricants, with a delivery lead time of 14 days.
- Purchase price: $54.00 per 20L drum
- Current stock: 31, 9 below the reorder point of 40
Source: Odoo (live) – get_products_and_stock, get_supplier_info
Nodes that light up: Simple Memory (glows first, with a small notepad icon), Anthropic Chat Model -> get_products_and_stock -> get_supplier_info -> Anthropic Chat Model.

TIMELINE (scene by scene; times relative to section start)
1. 00:00-00:05 | Canvas with the chat drawer open and empty. Cursor clicks the reset icon; a small grey pill "New session started" appears in the chat. | -
2. 00:05-00:09 | Cursor clicks the input; typing "What's running low?"; Enter; the blue user bubble appears. | -
3. 00:09-00:19 | Run animation, about 8 s: AI Agent spinner; Anthropic Chat Model glows; dots flow and get_products_and_stock glows then ticks green; then get_reorder_rules glows then ticks green; Anthropic Chat Model glows again and ticks. A three-dot "typing" indicator shows in the chat meanwhile. | Callout near the tool nodes: "Stocky is opening the drawers"
4. 00:19-00:24 | Answer 1 fades in, line by line (one-line answer, table, watch list, source). | -
5. 00:24-00:54 | Rows highlight in turn with a soft red band, each for ~7 s: BL-1004 gloves (00:24-00:31), BL-1005 wheels (00:31-00:38), BL-1007 oil (00:38-00:46), BL-1002 boxes (00:46-00:54). The highlighted row's "On hand" and "Reorder point" cells are bold. | -
6. 00:54-01:05 | The Gap cell "-320" on the boxes row gets a yellow ring; a small arrow points out that this row is at the bottom. | Callout: "Biggest gap in units... but listed last. Why?"
7. 01:05-01:20 | A side card slides in to the right of the table (not over it) with the four percentage lines from the DATA block; the Gloves 30% and Boxes 21% lines are bold. | Callout: "Sorted by % shortfall - the rule we wrote, followed exactly"
8. 01:20-01:35 | Hold on table + side card. | -
9. 01:35-01:49 | Side card fades; the "Watch list: BL-1008 ..." line gets an amber band and a small amber "28-day lead time from Shenzhen" tag appears next to it. | Amber callout: "The one Sarah would want to know about"
10. 01:49-01:53 | Cursor clicks the Odoo tab; the product list fades in. | -
11. 01:53-02:06 | Cursor points at Industrial Safety Gloves On Hand "420" (green tick "matches" pops), then at Pallet Jack Wheels "18" (green tick). | ON-SCREEN TEXT lower-third from 02:00 to 02:05: "Before: ~40 minutes (export, VLOOKUP, colour, email). After: ~10 seconds."
12. 02:06-02:12 | Back to the n8n tab (ticks reset to grey). Typing "Which supplier provides BL-1005 and what's the lead time?"; Enter. | -
13. 02:12-02:20 | Run animation (Anthropic -> get_products_and_stock -> get_supplier_info -> Anthropic), then Answer 2 fades in. | -
14. 02:20-02:28 | "Global Lift Parts" and "21 days" highlight. | -
15. 02:28-02:35 | "$38.00 per set" and "10 sets" highlight. | -
16. 02:35-02:44 | "7 below the reorder point of 25" and "arrive in about 3 weeks" highlight. | Callout: "It connected the dots on its own"
17. 02:44-02:50 | Typing "And what about the hydraulic oil?"; Enter. | Small callout on the question: "No 'supplier', no 'lead time'"
18. 02:50-02:57 | Simple Memory glows first with a notepad icon, then the run animation; Answer 3 fades in. | -
19. 02:57-03:14 | "Gulf Lubricants" and "14 days" highlight; a dashed arrow goes from the Simple Memory node to the answer. | Callout on Simple Memory: "The notepad at work: it remembered we were talking about suppliers and lead times"
20. 03:14-03:15 | END card. | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
00:00 Here we go. The question Sarah asks every morning. "What's running low?" Press Enter. Watch the canvas. The brain lights up, then the stock tool, then the reorder rules tool. Stocky is opening the drawers. And here's the answer. Four products at or below the reorder point. Safety gloves, four hundred and twenty against six hundred. Pallet jack wheels, eighteen against twenty-five. Hydraulic oil, thirty-one against forty. And shipping boxes, one thousand one hundred and eighty against fifteen hundred.
00:54 Look at the order. The boxes have the biggest gap in units, minus three hundred and twenty, but they're at the bottom. Why? Because we told Stocky to sort by percentage shortfall. Gloves are thirty percent below their reorder point, boxes only twenty-one percent. That's the rule we wrote, followed exactly. It even flagged the LED lights on the watch list. Thirty-four against thirty. And with a twenty-eight-day lead time from Shenzhen, that's exactly the one Sarah would want to know about.
01:49 But don't trust it yet. Check it. Here's Odoo. Gloves, four hundred and twenty. Wheels, eighteen. The numbers match. Ten seconds instead of forty minutes.
02:06 Second question: "Which supplier provides BL-1005, and what's the lead time?" Global Lift Parts. Twenty-one days. Thirty-eight dollars a set, minimum order ten sets. And without being asked, it connected the dots: we're seven below the reorder point, and an order today arrives in about three weeks. That's the kind of thinking a good intern does.
02:44 Now watch the memory. I'll just say, "And what about the hydraulic oil?" I didn't say "supplier" or "lead time". But Stocky remembered what we were talking about, thanks to Simple Memory, and gave me Gulf Lubricants, fourteen days. That's the notepad at work.

CHECKLIST
- Total duration exactly 3:15 (195 s); END card in the final second.
- All three answers and the Odoo list match the DATA block exactly (order of rows: BL-1004, BL-1005, BL-1007, BL-1002).
- Tool nodes light up in the order given for each question; ticks reset between questions.
- The chat table is fully readable (no cut-off columns) at 1920x1080.
- ON-SCREEN TEXT appears for 5 s; Start button, Pause/Restart and progress bar work.
```

**After Claude builds it:** Watch scene 3 closely: the nodes lighting up one by one is the moment that sells the idea, so ask Claude to make the glow brighter if it is subtle. If the chat feels crowded, ask Claude to scroll older messages up smoothly. Trim the Start click.

---

## Prompt 5 of 6: Watch the Agent Think: Reading the Execution Log (17:00–19:30, 2 min 30 s)

**What this demo shows:** the Logs panel of the last run read like a diary (model asks for tools, Odoo returns JSON, model writes the answer), the agent loop, and the Executions tab for traceability.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. The demo recreates, in a simplified look-alike style, the run log of an n8n-style workflow builder. It teaches beginners how to "watch an AI agent think": the model first decides which tools it needs, the tool returns real data (shown as JSON), and the model then writes the answer from that data. It also shows the saved Executions list as an audit trail.

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

SECTION LENGTH: exactly 2:30 (150 seconds), including the 1-second END card.

APP LOOK
- Browser frame: tab title "Stocky v1 – Reads the ERP - n8n", URL "https://brightleaf.app.n8n.cloud/workflow/stocky-v1" (on the Executions tab: ".../workflow/stocky-v1/executions").
- n8n-style canvas at the top (dark grey dotted #2B2D31): "When chat message received" -> "AI Agent" with circular sub-nodes "Anthropic Chat Model", "Simple Memory", "get_products_and_stock", "get_reorder_rules", "get_supplier_info". After the last run, the agent, the chat model, get_products_and_stock and get_supplier_info carry green ticks; get_reorder_rules has none.
- Top bar with an "Editor | Executions" switch in the centre.
- Bottom panel (opens to 55% of the height) with three columns: left "Chat" (shows the last exchange: user "Which supplier provides BL-1005 and what's the lead time?" and Stocky's answer starting "BL-1005 Pallet Jack Wheels (set) is supplied by Global Lift Parts..."); middle "Logs" (a vertical list of steps with icons, a thin timeline line connecting them, each with a duration on the right); right "Details" (Input / Output tabs and a "Table | JSON" view switch).
- JSON view: Chrome "pretty print" style, monospace, keys in purple, strings in green, numbers in blue, light background.
- Executions tab: a list of runs on the left (date/time, a green "Succeeded" pill, duration), and the selected run on the right as a frozen, read-only copy of the canvas with green ticks and a small grey banner "Read-only: past execution".

DATA TO SHOW (use exactly)
Logs list (top to bottom, with example durations):
1. AI Agent (7.6s) - parent row, the five below are indented under it
2. Anthropic Chat Model (2.1s)
3. get_products_and_stock (0.6s)
4. get_supplier_info (0.5s)
5. Anthropic Chat Model (3.9s)
First "Anthropic Chat Model" step, Output (show as a simple card): "Calling tools:" then two rows with a wrench icon: get_products_and_stock, get_supplier_info. No answer text.
"get_supplier_info" step, Output: Table view with columns id | partner_id | product_tmpl_id | price | min_qty | delay; 10 rows, where only the BL-1005 row is sharp and the other 9 rows are softly blurred (unreadable). Then JSON view of the highlighted record:
{
  "id": 5,
  "partner_id": [14, "Global Lift Parts"],
  "product_tmpl_id": [5, "[BL-1005] Pallet Jack Wheels (set)"],
  "price": 38.0,
  "min_qty": 10.0,
  "delay": 21
}
Last "Anthropic Chat Model" step: Input tab = collapsed tool results ("get_products_and_stock: 10 items", "get_supplier_info: 10 items"); Output tab = the final answer text:
"BL-1005 Pallet Jack Wheels (set) is supplied by Global Lift Parts, with a delivery lead time of 21 days. - Purchase price: $38.00 per set - Minimum order quantity: 10 sets - Current stock: 18 sets, 7 below the reorder point of 25. With a 21-day lead time, an order placed today would arrive in about 3 weeks. Source: Odoo (live) – get_products_and_stock, get_supplier_info"
Executions list (newest first): Nov 18, 09:47:12 Succeeded 6.4s; Nov 18, 09:46:30 Succeeded 7.6s; Nov 18, 09:45:02 Succeeded 8.9s; Nov 18, 09:31:55 Succeeded 3.2s.
ON-SCREEN TEXT: The agent loop: Think → Use a tool → Read the result → (repeat) → Answer

TIMELINE (scene by scene; times relative to section start)
1. 00:00-00:06 | Canvas with ticks from the last run. Cursor clicks "Logs" at the bottom; the bottom panel slides up. | -
2. 00:06-00:15 | The five log rows appear one by one from top to bottom (0.8 s apart), the connecting line drawing down as they appear. | -
3. 00:15-00:23 | Hold. | Callout on the Logs column: "Read it top to bottom, like a diary"
4. 00:23-00:30 | Cursor clicks row 2 "Anthropic Chat Model"; on the canvas, the Anthropic sub-node glows in sync. The Details column shows the "Calling tools" card. | -
5. 00:30-00:44 | Zoom 1.4x on the card; the two tool names get yellow bands. | Callout: "It doesn't answer yet. It asks for tools."
6. 00:44-00:59 | Zoom out. A comparison card slides in over the canvas area (top half, not over the log): left "Chatbot: question -> answer from what it already knows" (grey), right "Agent: question -> decide what to find out -> use tools -> answer" (blue, with a small check). | -
7. 00:59-01:06 | Card fades. Cursor clicks row 4 "get_supplier_info" (the tool node glows on the canvas); Details shows the Table view with the BL-1005 row sharp. | -
8. 01:06-01:12 | Cursor clicks "JSON"; the view flips to the pretty-printed record. | -
9. 01:12-01:28 | Zoom 1.5x on the JSON. Lines highlight in sync, ~3 s each: partner_id "Global Lift Parts", product_tmpl_id "[BL-1005] Pallet Jack Wheels (set)", price 38.0, min_qty 10.0, delay 21. | Callout: "A labelled shopping list"
10. 01:28-01:35 | Zoom out to show the JSON and the chat answer at the same time; thin yellow connector lines draw from 38.0 to "$38.00", 10.0 to "10 sets", 21 to "21 days". | Callout: "Every number traced. Nothing made up."
11. 01:35-01:42 | Cursor clicks row 5, the last "Anthropic Chat Model"; Details shows the Input tab (two collapsed tool results), then auto-switches to the Output tab with the final answer text. | -
12. 01:42-01:52 | Hold on the Output. | Callout: "Reads the shopping lists, writes the answer in our format"
13. 01:52-02:02 | A circular loop diagram fades in over the canvas area: four nodes on a circle "Think" -> "Use a tool" -> "Read the result" -> back to "Think", with an exit arrow to "Answer"; a dot travels around the loop twice, then exits to "Answer". | ON-SCREEN TEXT lower-third from 01:54 to 01:59: "The agent loop: Think → Use a tool → Read the result → (repeat) → Answer"
14. 02:02-02:08 | Loop fades. Cursor clicks "Executions" in the top switch; the Executions list appears. | Callout on the duration column: "Every chat = a saved run"
15. 02:08-02:18 | Cursor clicks the second run (09:46:30, 7.6s); the frozen read-only canvas appears on the right with green ticks and the banner. | -
16. 02:18-02:29 | Hold; a small badge "Tuesday's answer? Open the run." floats near the banner. | Callout: "Traceability: show Mr. Harrison the exact data Odoo returned"
17. 02:29-02:30 | END card. | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
00:00 So far we've seen what Stocky said. Now let's see how it thought. Open the "Logs" panel at the bottom of the canvas. This is the step-by-step story of the last question. Read it from top to bottom like a diary.
00:23 Step one: the brain reads the question and our job description, and decides, "To answer this, I need the product list and the supplier info." It doesn't answer yet. It asks for tools. That's the big difference between an agent and a chatbot. A chatbot answers straight away from what it already knows. An agent first decides what it needs to find out.
00:59 Step two: the Odoo tool runs. Click it and you can see exactly what Odoo sent back. I'll switch to JSON view. A labelled shopping list. Partner: Global Lift Parts. Product: BL-1005, Pallet Jack Wheels. Price: thirty-eight. Minimum quantity: ten. Delay: twenty-one. Every number in Stocky's answer is right here in the shopping list. Nothing was made up.
01:35 Step three: the brain reads the shopping lists and writes the answer in our format. So the pattern is always: think, use a tool, read the result, then answer. Sometimes it loops, think, tool, think, another tool, before answering. That loop is what makes it an agent.
02:02 And every conversation is also saved in the Executions tab, our logbook from Video 5. If Mr. Harrison ever asks, "Where did Stocky get that number on Tuesday?", you can open the run and show him the exact data Odoo returned. That's traceability.

CHECKLIST
- Total duration exactly 2:30 (150 s); END card in the final second.
- The log shows exactly five steps in the order given; the JSON record matches the DATA block exactly.
- The JSON-to-answer connector lines are clear and do not cover the numbers.
- ON-SCREEN TEXT appears for 5 s; the loop animation is calm and readable.
- Start button, Pause/Restart, progress bar and keyboard shortcuts work; nothing overflows the 1920x1080 stage.
```

**After Claude builds it:** The JSON scene (01:12) is the heart of this demo: if the text is small, ask Claude to zoom further (up to 1.6x). Make sure the blurred table rows look clearly intentional. Trim the Start click.

---

## Prompt 6 of 6: Catch a Hallucination, Then Fix It (21:15–23:45, 2 min 30 s)

**What this demo shows:** a weak one-line prompt making Stocky invent a delivery date, the log proving no purchase-order data was read, then the full prompt restored so Stocky says "I don't know" and passes two more trap questions.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. The demo recreates, in a simplified look-alike style, an n8n-style workflow builder with an AI agent called "Stocky" and its chat panel. It teaches beginners what an AI hallucination looks like (a confident, invented answer), how to catch it in the run log, and how a strong system prompt ("only answer from tool data; say I don't know") fixes it.

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

SECTION LENGTH: exactly 2:30 (150 seconds), including the 1-second END card.

APP LOOK
- Browser frame: tab title "Stocky v1 – Reads the ERP - n8n", URL "https://brightleaf.app.n8n.cloud/workflow/stocky-v1".
- n8n-style canvas at the top (dark grey dotted #2B2D31): "When chat message received" -> "AI Agent" with circular sub-nodes "Anthropic Chat Model", "Simple Memory", "get_products_and_stock", "get_reorder_rules", "get_supplier_info". A status badge sits on the AI Agent node: red "WEAK PROMPT" while the one-liner is active, green "FULL PROMPT" after the fix.
- AI Agent settings modal (centred, over a dimmed canvas) with a tall "System Message" text editor (light grey #F8FAFC background, dark text).
- A small floating "text file" window (like a plain notepad, title "stocky_system_prompt_v1.txt") used to keep the good prompt safe.
- Bottom drawer: chat on the left (user bubbles right in blue #2563EB, Stocky bubbles left in light grey #F1F5F9, input box, circular reset icon labelled "New session"); "Logs" on the right (vertical list of steps with icons and durations).
- Run animation: AI Agent spinner ring; the sub-node being used glows orange with dots flowing along its dashed link, then a green tick.

DATA TO SHOW (use exactly)
- The full system prompt is a long multi-section text starting "# ROLE / You are Stocky, the inventory and procurement assistant for BrightLeaf Supplies..." with headings # ROLE, # GOAL, # TOOLS, # RULES, # OUTPUT FORMAT (show it as about 30 lines of text; only the headings and first lines need to be legible).
- Weak one-liner typed into System Message: You are a helpful inventory assistant for BrightLeaf Supplies.
- Trap question 1 (typed twice, once per prompt): When will purchase order P00027 from Global Lift Parts arrive?
- Weak Stocky answer: "Purchase order P00027 from Global Lift Parts is expected to arrive in about 3 weeks, since their lead time is 21 days. You should receive it around the end of the month."
- Flashback card (from an earlier lesson): an email snippet "PO P00027 – Global Lift Parts – 3 days late" with a red "LATE" pill.
- Logs for the weak run: AI Agent -> Anthropic Chat Model -> get_supplier_info -> Anthropic Chat Model (no purchase-order step).
- Strong Stocky answer:
"I don't know. That information isn't in the Odoo data I can see. I can read products, stock, reorder rules and supplier info, but not purchase orders, so I can't see P00027 or its delivery date.
What I can tell you: Global Lift Parts' standard lead time for BL-1005 is 21 days. To check P00027, open Purchase → Orders in Odoo and search for P00027.
Source: Odoo (live) – get_supplier_info"
- Trap question 2: How many BL-1011 do we have?
  Answer: "I don't know. I can't find a product with SKU BL-1011 in Odoo. The SKUs I can see run from BL-1001 to BL-1010."
- Trap question 3: Order 50 more pallet jack wheels.
  Answer: "I can't do that yet. I can only read data in Odoo; I can't create purchase orders. BL-1005 is supplied by Global Lift Parts ($38.00 per set, 21-day lead time) if you'd like to raise the order yourself."
- ON-SCREEN TEXT: Reduce hallucination: 1) Give real data through tools 2) "Only answer from tool data" 3) "Say I don't know" 4) Ask for the source 5) Test with trap questions

TIMELINE (scene by scene; times relative to section start)
1. 00:00-00:06 | Cursor double-clicks the AI Agent; the modal opens with the full system prompt. Cursor selects all (blue selection), "Cmd+C" badge; the "stocky_system_prompt_v1.txt" window slides in from the right, the text pastes in, and it shrinks to a small icon at the top-right with a green tag "Saved copy". | -
2. 00:06-00:12 | Back in the editor: the selected text is deleted; typing "You are a helpful inventory assistant for BrightLeaf Supplies." | -
3. 00:12-00:20 | Modal closes; "Cmd+S" badge and "Saved" toast; the red "WEAK PROMPT" badge pops onto the AI Agent node. Cursor clicks the chat reset icon; the chat clears and shows "New session started". | Callout on the badge: "The lazy one-liner most people write"
4. 00:20-00:27 | Typing "When will purchase order P00027 from Global Lift Parts arrive?"; Enter. | -
5. 00:27-00:33 | Run animation: only Anthropic Chat Model and get_supplier_info light up; then the weak answer fades in. | -
6. 00:33-00:45 | "about 3 weeks" and "around the end of the month" get red wavy underlines. | Red callout: "Sounds great. Completely made up."
7. 00:45-00:55 | The flashback card slides in at the top-right of the canvas area with a red "LATE" pill. | Callout: "This order was already 3 days late"
8. 00:55-01:05 | A small speech-bubble illustration of an intern saying "Tuesday, sir." appears next to the answer, then a formula tag: "lead time + guess = invented delivery date". | -
9. 01:05-01:12 | Flashback and bubble fade. Cursor opens the Logs column: AI Agent, Anthropic Chat Model, get_supplier_info, Anthropic Chat Model. | -
10. 01:12-01:20 | A magnifying-glass sweep passes over the log; a small red result chip "purchase order data: 0 found" appears. | Callout: "Can't be traced = can't be trusted"
11. 01:20-01:30 | Cursor opens the AI Agent modal, clicks the saved text icon (the notepad window pops out), copies, pastes the full prompt back into System Message, closes, "Saved" toast. The badge flips from red "WEAK PROMPT" to green "FULL PROMPT". Cursor clicks reset in the chat. | -
12. 01:30-01:36 | Typing the same question again (fast paste is fine: it appears in the input at once) and Enter; run animation (Anthropic Chat Model, get_supplier_info). | -
13. 01:36-01:42 | The strong answer fades in. | -
14. 01:42-01:48 | "I don't know. That information isn't in the Odoo data I can see." gets a green band. | Green callout: "Honest beats confident"
15. 01:48-01:53 | "standard lead time for BL-1005 is 21 days" highlights. | Callout: "Labelled as a standard lead time, not a delivery date"
16. 01:53-01:59 | "open Purchase → Orders in Odoo" highlights. | Callout: "Tells Sarah exactly where to check"
17. 01:59-02:06 | Typing "How many BL-1011 do we have?"; Enter; quick run; trap answer 2 appears. | -
18. 02:06-02:12 | Hold. | Small green tag on the bubble: "Doesn't exist -> says so"
19. 02:12-02:19 | Typing "Order 50 more pallet jack wheels."; Enter; quick run; trap answer 3 appears. | -
20. 02:19-02:24 | Hold. | Small green tag: "Not allowed -> read-only. Ordering comes next video, with approval."
21. 02:24-02:29 | Hold on the chat with all three green tags visible. | ON-SCREEN TEXT lower-third from 02:24 to 02:29: "Reduce hallucination: 1) Give real data through tools 2) "Only answer from tool data" 3) "Say I don't know" 4) Ask for the source 5) Test with trap questions" (use a two-line pill if needed)
22. 02:29-02:30 | END card. | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
00:00 For this experiment, I'll temporarily replace Stocky's job description with a lazy one-liner: "You are a helpful inventory assistant for BrightLeaf Supplies." That's what most people write. I've saved the good version safely. Now I'll start a fresh chat.
00:20 Now a question Stocky cannot answer, because it has no tool for purchase orders. "When will purchase order P zero zero zero two seven from Global Lift Parts arrive?" And look. "Expected to arrive in about three weeks, around the end of the month." It sounds great. It's completely made up. Stocky never saw that purchase order. In Video 5, our email said that order was already three days late! It took the lead time and invented a delivery date. That's Jake saying "Tuesday, sir."
01:05 And here's how you catch it: open the log. There's no purchase order data anywhere. Only supplier info. The answer can't be traced, so it can't be trusted.
01:20 Now let's put the real job description back, reset the chat, and ask the exact same question. "I don't know. That information isn't in the Odoo data I can see." It explains what it CAN see, gives the one useful fact it has, the twenty-one day lead time, clearly labelled as a standard lead time, not a delivery date. And it tells Sarah exactly where to check: Purchase, Orders. That's the intern you want.
01:59 Two more traps. A product that doesn't exist, BL-1011. Stocky says it can't find it, and tells me which SKUs it can see. And an action it isn't allowed to take: "Order fifty more pallet jack wheels." Stocky says it can only read. Good. Ordering is next video, and it will always come to you for approval first.

CHECKLIST
- Total duration exactly 2:30 (150 s); END card in the final second.
- All questions and answers match the DATA block word for word, including P00027 and BL-1011.
- The WEAK PROMPT / FULL PROMPT badge is clearly visible and flips at 01:20-01:30.
- Red marks are used only for the invented answer; green for the honest answers.
- ON-SCREEN TEXT appears for 5 s; Start button, Pause/Restart and progress bar work; nothing overflows the 1920x1080 stage.
```

**After Claude builds it:** The contrast between the red "made up" answer and the green "I don't know" answer is the point of this demo; if it is not obvious at a glance, ask Claude for stronger colours. If the chat history overflows by scene 19, ask Claude to scroll older bubbles up. Trim the Start click.
