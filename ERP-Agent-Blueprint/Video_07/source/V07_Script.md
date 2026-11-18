# Video 7: Agents That Take Action: Draft Purchase Orders with Human Approval
**Course:** The ERP Agent Blueprint | **Length:** 26 min | **Level:** Beginner

**Learning objectives:**
- Explain the difference between an agent that **reads** and an agent that **writes**, and why the risk is different (the traffic-light rule)
- Build a workflow that wakes up every morning at 8am, finds SKUs below their reorder point and calculates a suggested order quantity
- Send an approval email with Approve / Reject buttons, with a guardrail that sends any order over $2,000 to Mr. Harrison instead of Sarah
- Create a **draft** Request for Quotation (RFQ) in Odoo only after a human clicks Approve, and confirm it back by email
- Know the "week-one rules": why an agent should never confirm a purchase order on its own

**Before recording, prepare:**
- Odoo trial database from Video 2, with the 10 BrightLeaf products, a reordering rule (Min quantity) on each product, and the 6 suppliers as Contacts
- Use the course's canonical starting stock (on hand): BL-1001 145, BL-1002 1,180, BL-1003 260, BL-1004 420, BL-1005 18, BL-1006 1,850, BL-1007 31, BL-1008 34, BL-1009 410, BL-1010 26. Exactly four products are below their reorder point: BL-1002, BL-1004, BL-1005, BL-1007.
- n8n open with the Odoo, Gmail and Claude credentials from Video 5, and Stocky v1 from Video 6 saved
- The BrightLeaf Google Sheet from Video 4, with a new tab called **Supplier Map** (columns: SKU, Supplier, Odoo Vendor ID), filled in for all 10 SKUs
- A finished copy of today's workflow called **"Stocky – Morning Reorder"** (for the tour in section 3), plus an empty copy to build live
- Two email inboxes open in browser tabs: one playing Sarah, one playing Mr. Harrison (use your own addresses for testing)
- The diagram "Read / Draft / Commit" traffic light on a slide

**Resources for this video:** V07_Activity_ReorderSimulator.xlsx, V07_Activity_ApprovalRules.docx, V07_Quiz.docx

---

## [ON CAMERA] Intro: From "What's Low?" to "Shall I Order It?" (00:00–02:00)

Last video, Stocky learned to read. You typed "What's running low?" and Stocky looked inside Odoo and answered in plain English. That alone saves Sarah a lot of copying and pasting.

But be honest with yourself for a second. When Stocky says "Hydraulic Oil is at 31 and the reorder point is 40", what happens next? Sarah still opens Odoo. She still works out how many to order. She still finds the supplier, creates the request for quotation, types the quantity, double-checks the price and saves it. Every single morning. For BrightLeaf that's roughly 20 to 30 minutes a day, which is about two and a half hours a week of pure clicking.

Today Stocky stops just *talking* about the problem and starts *doing* something about it. By the end of this video, Stocky will wake up at 8 o'clock every morning on its own, check every product in Odoo, work out what's below the reorder point, calculate how much to order, and send Sarah an email with two buttons: Approve and Reject. She clicks Approve on her phone with her morning coffee, and a draft RFQ appears in Odoo, ready for the right supplier.

Now, the moment an agent can *create* things in your ERP, the stakes change. So today is also about safety. I'm going to tell you a real-world style story about an automation that ordered ten times too much stock, and I'll show you the three simple guardrails that would have stopped it.

If giving software the power to create purchase orders makes you a bit nervous, good. That's exactly the right instinct, and by the end you'll know how to turn that nervousness into rules. Let's go.

---

## [ON CAMERA] Read vs Write: The Traffic-Light Rule (02:00–03:45)

**ON-SCREEN TEXT:** GREEN = Read | AMBER = Draft | RED = Commit

Here's the most important idea in this whole video, and it fits on a traffic light.

**Green is reading.** Stocky looks at stock levels, looks at prices, looks at suppliers. If Stocky reads the wrong thing, the worst case is a wrong answer in a chat. Nobody loses money. Everything we did in Video 6 was green.

**Amber is drafting.** Stocky creates something in Odoo, but it's a draft. A request for quotation sitting in Odoo with the status "RFQ" hasn't been sent to anyone and hasn't committed a single dollar. If it's wrong, Sarah deletes it in two clicks. Today we are working in amber.

**Red is committing.** Confirming a purchase order, emailing it to the supplier, approving a payment. Once that's done, the truck is getting loaded. Red actions are where real money and real relationships are on the line.

Think of Stocky like a smart new intern. In week one, would you let a new intern sign purchase orders? Of course not. You'd let them prepare the paperwork, and you'd sign it. That signature is what we call **human-in-the-loop**: the manager's signature before the check goes out.

So our rule for today is simple. Stocky can read anything. Stocky can draft, but only after a human says yes. And Stocky never, ever touches red.

> PAUSE & THINK: Look at your own job. Name one task that is green (just looking), one that is amber (preparing a draft) and one that is red (committing money). Which one would you hand to an intern first?

---

## [SCREEN RECORDING] Tour of the Finished Workflow (03:45–05:00)

**SHOW:** n8n, the finished workflow "Stocky – Morning Reorder", zoomed out so all the nodes are visible.

**SAY:** Before we build, let me show you where we're going. This is the finished recipe card. Don't worry about the details yet, just follow the story from left to right.

**SHOW:** Hover over the first node, "Every Morning 8am".

**SAY:** Step one is the doorbell. Instead of Sarah typing a question, a clock rings the doorbell at 8am every day.

**SHOW:** Hover over "Get Stock from Odoo", then "Below Reorder Point", then "Calculate Order".

**SAY:** Then we read every product from Odoo. That's green. We keep only the ones below their reorder point, and we calculate how much to order and what it would cost.

**SHOW:** Hover over "Find Supplier" and "Stocky Writes Request".

**SAY:** We look up the right supplier, and Stocky, our AI agent, writes a short, friendly approval request in plain English.

**SHOW:** Hover over the diamond "Over $2,000?" and the two email nodes "Ask Mr. Harrison" and "Ask Sarah".

**SAY:** This diamond is Mr. Harrison's rule. Anything over two thousand dollars goes to him. Everything else goes to Sarah. Then the workflow literally pauses and waits for a human to click a button.

**SHOW:** Hover over "Approved?", "Create Draft RFQ", "Add Product Line" and "Confirm to Sarah".

**SAY:** Only if someone clicks Approve do we create a draft RFQ in Odoo. That's amber. And then Stocky confirms back by email. About a dozen blocks. No code. Let's build it from scratch.

**ON-SCREEN TEXT:** Read (green) → Decide → Ask a human → Draft (amber) → Confirm

---

## [SCREEN RECORDING] Step 1: The 8am Doorbell and Reading Stock from Odoo (05:00–08:30)

**SHOW:** n8n home → **Create Workflow**. Rename it at the top left to **Stocky – Morning Reorder**.

**SAY:** Create a new workflow and call it "Stocky – Morning Reorder". Naming things clearly now saves you a headache in three months when you have fifteen workflows.

**SHOW:** Click **Add first step** → search "schedule" → choose **Schedule Trigger**.

**SAY:** Our doorbell this time is the Schedule Trigger. Think of it as an alarm clock for your recipe card.

**SHOW:** In the Schedule Trigger panel set **Trigger Interval: Days**, **Days Between Triggers: 1**, **Trigger at Hour: 8am**, **Trigger at Minute: 0**. Rename the node "Every Morning 8am".

**SAY:** Trigger interval: Days. Days between triggers: one. Trigger at hour: 8am. Minute: zero. I'll rename it "Every Morning 8am" so anyone can read the canvas like a sentence.

**SHOW:** Click the **three dots (…)** at the top right of the canvas → **Settings** → **Timezone** → choose **America/New_York** (Columbus runs on Eastern Time). Save.

> BEGINNER MISTAKE: Forgetting the timezone. n8n Cloud may run on a different clock, so "8am" could mean 8am UTC, which is 3am in Columbus. Always set the workflow timezone to your warehouse's timezone.

**SAY:** Here's a mistake I see all the time. The alarm clock needs to know which time zone it lives in. Click the three dots, Settings, and set Timezone to America/New_York, because Columbus runs on Eastern Time, or whatever your warehouse uses. Otherwise 8am might be 8am in London.

**SHOW:** Click the **+** after the trigger → search "Odoo" → choose **Odoo** → action **Get many custom resources**. Credential: the Odoo credential from Video 5.

**SAY:** Next, we read from Odoo. Click plus, search Odoo, and pick the Odoo node. You'll see your credential from Video 5 is already selected. That's our hotel key card. It opens only the doors we gave it.

**SHOW:** Set **Resource: Custom Resource**, **Custom Resource Name:** search "product.product" (it may display as "Product" or "Product Variant"), **Operation: Get Many**, **Return All: on**.

**SAY:** For Resource, choose Custom Resource. Then in the name box, search for "product dot product". Depending on your Odoo version it may be labelled "Product" or "Product Variant". It's the list of every item you stock. Operation: Get Many. And switch on Return All, so we don't accidentally stop at the first 50 products.

**SHOW:** **Options → Add option → Fields to Include.** Select: Internal Reference (default_code), Name, Quantity On Hand (qty_available), Min (reordering_min_qty), Cost (standard_price).

**SAY:** Now, a product in Odoo has more than a hundred fields. We only want five, so click Add option, Fields to Include, and tick these: Internal Reference, which is our SKU. Name. Quantity On Hand. Min, which is the reorder point from the reordering rule we set up in Video 2. And Cost, which is the unit cost. Asking only for what you need keeps things fast and keeps the agent from getting confused.

**SHOW:** Click **Execute step**. The output panel shows 10 items. Switch to **Table** view.

**SAY:** Let's test it. Execute step. And there they are, ten products, in a nice table. Look at BL-1002, Corrugated Shipping Boxes: on hand 1,180, Min 1,500. BL-1004, Safety Gloves: 420 on hand, Min 600. BL-1005, Pallet Jack Wheels: 18 on hand, Min 25. And BL-1007, Hydraulic Oil: 31 on hand, Min 40. Everything else is healthy.

**ON-SCREEN TEXT:** Each row = one "labelled shopping list" (JSON) for one product

**SAY:** Each row is one labelled shopping list. Product name, quantity, reorder point. Exactly like the JSON we saw in Video 3. Rename this node "Get Stock from Odoo". Notice that everything so far is green. We're only looking.

> PRO TIP: If the Min column shows 0 for a product, that product has no reordering rule in Odoo yet. Open **Inventory → Products → [product] → Min/Max** smart button and add one. No rule, no reorder.

---

## [SCREEN RECORDING] Step 2: Who's Low, and How Much Should We Order? (08:30–12:30)

**SHOW:** Click **+** → search "Filter" → choose **Filter**. Rename it "Below Reorder Point".

**SAY:** Now we need to throw away the healthy products and keep only the low ones. For that we use a Filter node. Think of it as a sieve: only the rows that match your rule fall through.

**SHOW:** Drag **qty_available** from the left input panel into the first value box. Choose operator **Number → is less than**. Drag **reordering_min_qty** into the second value box.

**SAY:** I drag "quantity on hand" from the left into the first box. Operator: Number, is less than. And I drag the reorder point into the second box. In plain English: keep this product if what we have is less than the reorder point. That's the same as an Excel formula, equals on-hand less-than reorder-point.

**SHOW:** Click **Add condition**. Drag **reordering_min_qty** → **Number → is greater than** → type **0**.

**SAY:** And one more condition: the reorder point must be greater than zero. That stops Stocky from ordering products that have no rule yet. Small safety habits like this add up.

**SHOW:** Execute step. Output shows **4 items**: BL-1002, BL-1004, BL-1005, BL-1007. The "Discarded" tab shows 6.

**SAY:** Execute. Four items kept, six discarded. Exactly the four we expected. Now, you could also use an IF node here, which has a true and a false exit. But we don't need to do anything with the healthy products, so a Filter is simpler.

**SHOW:** Click **+** → **Edit Fields (Set)**. Rename "Calculate Order". Mode: **Manual Mapping**. Turn on **Include Other Input Fields → All**.

**SAY:** Next, the maths. We use an Edit Fields node and call it "Calculate Order". It's like adding new columns to a spreadsheet. And switch on "Include Other Input Fields" so we keep the product name and SKU alongside our new columns.

**SHOW:** Slide: "Suggested order = Reorder point × 2 − On hand" with the Pallet Jack Wheels example: 25 × 2 = 50; 50 − 18 = 32.

**SAY:** Let me explain our ordering rule, because it's deliberately simple. Suggested order equals reorder point times two, minus what's on hand. Think of it as "fill the shelf back up to twice the reorder point." For Pallet Jack Wheels, the reorder point is 25. Twice that is 50. We have 18. So we order 32. That's it. Is it perfect? No. It ignores pack sizes, minimum order quantities and seasonal demand. But it's predictable, and in week one, predictable beats clever. You can swap in your own company's formula later.

**SHOW:** Click **Add Field**. Name: **suggested_qty**, Type: **Number**, Value (expression): `{{ $json.reordering_min_qty * 2 - $json.qty_available }}`

**SAY:** Add a field. Name it suggested underscore qty, type Number. In the value box I'm typing a formula. It looks technical, but read it out loud: reorder point, times two, minus quantity on hand. The curly brackets just tell n8n "this is a formula, not plain text", like the equals sign in Excel. You can copy it from the activity file.

**SHOW:** Add Field: **order_value**, Type **Number**, Value: `{{ ($json.reordering_min_qty * 2 - $json.qty_available) * $json.standard_price }}`

**SAY:** Second field: order underscore value. That's the suggested quantity times the unit cost. The money.

**SHOW:** Execute step. Table view shows four rows.

**ON-SCREEN TEXT:**
BL-1002 Corrugated Shipping Box → 1,820 × $0.85 = $1,547.00
BL-1004 Industrial Safety Gloves → 780 × $2.40 = $1,872.00
BL-1005 Pallet Jack Wheels → 32 × $38.00 = $1,216.00
BL-1007 Hydraulic Oil 20L → 49 × $54.00 = $2,646.00

**SAY:** Execute. Shipping boxes: 1,500 times two is 3,000, minus 1,180, so 1,820 boxes at 85 cents, one thousand five hundred and forty-seven dollars. Safety gloves: 1,200 minus 420 is 780 pairs, one thousand eight hundred and seventy-two dollars. Pallet Jack Wheels: 32 sets, one thousand two hundred and sixteen dollars. And Hydraulic Oil: 40 times two is 80, minus 31, so 49 drums at 54 dollars, that's two thousand six hundred and forty-six dollars. Check my maths with a calculator. You should always be able to check an agent's maths with a calculator.

> PRO TIP: Let the calculator do the maths and let the brain do the words. Use Edit Fields for numbers. An AI model can make arithmetic slips; an Edit Fields formula never does.

> PAUSE & THINK: The Hydraulic Oil order is $2,646. Who at BrightLeaf should approve that, and why? Pause and decide before I show you.

---

## [ON CAMERA] Real-World Story: The Order That Was Ten Times Too Big (12:30–14:30)

Let me tell you a story. It's a composite of things I've heard from procurement teams, but every piece of it has happened somewhere.

A packaging distributor, a lot like BrightLeaf, built an automation. Every night it checked stock and, if something was low, it created and *confirmed* a purchase order and emailed it straight to the supplier. No human in between. For three months it worked beautifully. Everyone loved it.

Then someone in the warehouse changed the unit of measure on safety gloves. They used to be counted in pairs. Now they were counted in packs of ten. Nobody told the automation. That night it worked out that it needed 600, and it meant 600 pairs. But the unit in the system was now "pack of ten", so the purchase order said 600 packs. That's 6,000 pairs. Ten times too much. About fourteen thousand four hundred dollars instead of fourteen hundred and forty.

The PO went out on a Friday at 11pm. The supplier, who was delighted, shipped on Monday. The warehouse had no space. Returning the stock cost a 20% restocking fee, and the finance director spent a week explaining it to the owner.

Here's the thing. The automation didn't break. It did exactly what it was told. What was missing were three simple guardrails. One: a human approval before anything goes out. Two: a maximum order value, above which a senior person must sign. Three: a sanity check, something that says "hang on, this is ten times bigger than usual."

Today we're building all three into Stocky. The approval email is guardrail one. Mr. Harrison's two-thousand-dollar rule is guardrail two. And Stocky itself is going to be guardrail three.

---

## [SCREEN RECORDING] Step 3: Finding the Supplier and Letting Stocky Write the Request (14:30–17:30)

**SHOW:** Odoo → **Contacts** → open **Global Lift Parts**. Zoom into the browser address bar, which ends in a number, e.g. `/odoo/contacts/14` (older versions show `id=14`).

**SAY:** To create an RFQ, Odoo needs to know *which* supplier, and it identifies suppliers by a number, like an employee badge number. Here's how to find it, no tech needed. Open Contacts, click Global Lift Parts, and look at the address bar. The number at the end, 14 in my case, is the vendor ID. Yours will be different, and that's fine.

**SHOW:** Google Sheet "BrightLeaf" from Video 4 → tab **Supplier Map** with columns SKU | Supplier | Odoo Vendor ID. Rows: BL-1002 | PackRight Industries | 12; BL-1004 | SafeHands Co. | 13; BL-1005 | Global Lift Parts | 14; BL-1007 | Gulf Lubricants | 15, etc.

**SAY:** I've added a small tab to our Google Sheet database from Video 4. It's called Supplier Map. Three columns: SKU, Supplier, and the Odoo Vendor ID. Ten rows, typed once. It took me five minutes. This is our "who do we buy this from" lookup table.

**SHOW:** Back in n8n → **+** → **Google Sheets** → action **Get row(s) in sheet**. Document: BrightLeaf. Sheet: **Supplier Map**. **Filters → Column: SKU**, **Value:** drag **default_code** from the input panel. Rename "Find Supplier".

**SAY:** In n8n, add a Google Sheets node, and choose "Get rows in sheet". Pick our BrightLeaf document and the Supplier Map tab. Under Filters, choose the column SKU, and for the value, drag in the SKU from the left. So for each low product, n8n looks up its row, exactly like a VLOOKUP.

**SHOW:** Execute step. Four rows: PackRight Industries 12, SafeHands Co. 13, Global Lift Parts 14, Gulf Lubricants 15.

**SAY:** Execute. Four suppliers found. Lovely.

**SHOW:** **+** → **AI Agent**. Rename "Stocky Writes Request". Attach **Chat Model: Anthropic Chat Model** (Claude credential from Video 5). **Source for Prompt: Define below.**

**SAY:** Now Stocky joins the party. Add an AI Agent node, call it "Stocky Writes Request", and plug in the Claude chat model, the intern's brain, just like in Video 6. This time there's no chat box, so set "Source for Prompt" to "Define below".

**SHOW:** Prompt (User Message) field, with values dragged in from earlier nodes:

```
Write an approval request for Sarah about this reorder.
Product: {{ name }} ({{ SKU }})
On hand: {{ qty_available }} | Reorder point: {{ reordering_min_qty }}
Suggested order: {{ suggested_qty }} units at ${{ standard_price }} = ${{ order_value }}
Supplier: {{ Supplier }}
```

**SAY:** In the prompt, I write a short brief and drag in the facts: product, SKU, on hand, reorder point, suggested quantity, unit cost, order value and supplier. To grab values from earlier steps, scroll up in the left panel to "Calculate Order" or "Find Supplier" and just drag them in.

**SHOW:** **Options → System Message.** Type:

```
You are Stocky, BrightLeaf Supplies' procurement assistant.
Write a short approval email body (max 5 sentences).
Line 1: "Approval needed: [qty] x [product] from [supplier] ($[value])."
Then explain in plain English why: on hand vs reorder point.
SANITY CHECK: if the suggested quantity is more than 3 times the
reorder point, or the order value is over $5,000, start with
"CHECK THIS FIRST:" and say what looks unusual.
Never say the order is placed. It is only a draft request.
```

**SAY:** And in the system message, the rulebook. You are Stocky. Keep it to five sentences. Start with "Approval needed". Explain why. And here's guardrail three, the sanity check. If the quantity is more than three times the reorder point, or the value is over five thousand dollars, start with "CHECK THIS FIRST" and say what looks odd. That alone would have caught the glove disaster. Last line: never say the order is placed.

**SHOW:** Execute step. Output for BL-1007: "Approval needed: 49 x Hydraulic Oil 20L from Gulf Lubricants ($2,646.00). We have 31 drums on hand against a reorder point of 40, so we're below our safety line. With a 14-day lead time from Dubai, ordering today keeps the forklifts running into next month. This creates a draft RFQ only; nothing is sent to the supplier until you confirm it in Odoo."

**SAY:** Look at that. Clear, polite, and it even mentioned the 14-day lead time on its own. That's the agent part: the formula did the maths, and the brain did the explaining.

---

## [SCREEN RECORDING] Step 4: Mr. Harrison's Rule and the Approval Email (17:30–20:15)

**SHOW:** **+** → **If**. Rename "Over $2,000?". Condition: drag **order_value** from "Calculate Order" → **Number → is greater than** → **2000**.

**SAY:** Now, guardrail two. Add an IF node and call it "Over two thousand dollars?". Drag in order value from the Calculate Order step, "is greater than", two thousand. This diamond has two exits. True means "big order, go to Mr. Harrison". False means "Sarah can approve this herself". This is BrightLeaf's real approval policy, just written as a block.

**SHOW:** From the **true** exit → **+** → **Gmail** → action **Send message and wait for response**. Rename "Ask Mr. Harrison".

**SAY:** From the true exit, add a Gmail node and choose this special action: "Send message and wait for response". This is human-in-the-loop in one block. The email goes out, and the whole workflow pauses, like a check sitting on the manager's desk, until somebody clicks a button.

**SHOW:** Fields: **To:** harrison's test address. **Subject:** `Approval needed: {{ name }} – ${{ order_value }}`. **Message:** drag in **output** from "Stocky Writes Request". **Response Type: Approval.** **Approval Options → Type of Approval: Approve and Disapprove**, **Approve Button Label:** "Approve draft RFQ", **Disapprove Button Label:** "Reject".

**SAY:** To: Mr. Harrison. Subject: "Approval needed", plus the product and value. Message: drag in the text Stocky just wrote. Response type: Approval. Type of approval: Approve and Disapprove. I'll label the buttons "Approve draft RFQ" and "Reject". Notice the word "draft" on the button. Words matter. Nobody should think they're spending money with this click.

**SHOW:** **Options → Add option → Limit Wait Time** → **1 day**.

**SAY:** Then one more option: Limit Wait Time, one day. If nobody answers in 24 hours, the request expires. In procurement, silence should never mean yes.

**SHOW:** Right-click "Ask Mr. Harrison" → **Duplicate**. Connect the duplicate to the **false** exit. Rename "Ask Sarah". Change **To:** Sarah's address.

**SAY:** Duplicate that node, connect the copy to the false exit, call it "Ask Sarah", and change the email address. Same email, different approver.

**SHOW:** Click **Execute workflow** (top). The canvas shows the green ticks up to the Gmail nodes, which spin with "Waiting".

**SAY:** Let's run the whole thing. Execute workflow. Watch the canvas. Green ticks march along, and then the email nodes say "waiting". The recipe is paused, waiting for people.

**SHOW:** Switch to Mr. Harrison's inbox. Email "Approval needed: Hydraulic Oil 20L – $2,646" with Stocky's text and two buttons.

**SAY:** Here's Mr. Harrison's inbox. The Hydraulic Oil request, two thousand six hundred and forty-six dollars, with Stocky's explanation and two big buttons. He reads it in ten seconds and clicks "Approve draft RFQ".

**SHOW:** Switch to Sarah's inbox. Three emails: Shipping Boxes ($1,547), Safety Gloves ($1,872) and Pallet Jack Wheels ($1,216). Click Approve on Boxes and Wheels. Click **Reject** on Safety Gloves.

**SAY:** Sarah got three emails. Shipping boxes and Pallet Jack Wheels: she approves both. Safety gloves: she rejects. Why? Because she knows there are 500 pairs arriving from SafeHands on Thursday on an open order. Stocky didn't know that. This, right here, is why the human stays in the loop. Sarah knows things the system doesn't.

**ON-SCREEN TEXT:** The human adds context the ERP doesn't have.

---

## [SCREEN RECORDING] Step 5: Creating the Draft RFQ in Odoo and Confirming Back (20:15–23:15)

**SHOW:** Back in n8n. Connect both "Ask Mr. Harrison" and "Ask Sarah" outputs into a new **If** node. Rename "Approved?". Condition: drag **data → approved** → **Boolean → is true**.

**SAY:** Back in n8n. Both email nodes now connect into one IF node called "Approved?". When someone clicks a button, n8n receives a little labelled shopping list that says approved: true or approved: false. Our condition: approved is true. Rejected or expired requests go out the false exit and simply stop. Next video, we'll log those too.

**SHOW:** True exit → **+** → **Odoo** → **Create a custom resource**. Rename "Create Draft RFQ". **Custom Resource Name:** search "purchase.order" (Purchase Order). **Fields → Add Field:** **partner_id** = `{{ $('Find Supplier').item.json['Odoo Vendor ID'] }}` (drag from Find Supplier); **origin** = `Stocky – approved by email`.

**SAY:** Now, finally, the amber step. Add an Odoo node, action "Create a custom resource", and pick Purchase Order. In Odoo, a purchase order and an RFQ are the same form. It's called an RFQ while it's a draft, and becomes a purchase order only when a human clicks Confirm. Two fields. Vendor, which Odoo calls partner underscore id: drag in the Odoo Vendor ID from "Find Supplier". And Source Document, called origin, where I type "Stocky, approved by email". That's our paper trail. Anyone opening this RFQ will know where it came from.

**SHOW:** **+** → **Odoo** → **Create a custom resource** → **purchase.order.line** (Purchase Order Line). Rename "Add Product Line". Fields: **order_id** = `{{ $json.id }}`; **product_id** = `{{ $('Get Stock from Odoo').item.json.id }}`; **product_qty** = `{{ $('Calculate Order').item.json.suggested_qty }}`.

**SAY:** A purchase order is like a paper form with a header, who we're buying from, and lines, what we're buying. The first node made the header. This second Odoo node adds the line. Pick Purchase Order Line. Order ID is the number Odoo just gave us back. Product ID comes from "Get Stock from Odoo". And product quantity is our suggested quantity. Odoo fills in the description and the vendor price by itself.

**SHOW:** **+** → **Gmail** → **Send a message**. Rename "Confirm to Sarah". To: Sarah. Subject: `Draft RFQ created: {{ name }}`. Message: "Done. Draft RFQ #{{ order id }} created in Odoo for {{ suggested_qty }} x {{ name }} from {{ Supplier }}. It is a DRAFT. Review it in Purchase → Requests for Quotation, then send it to the supplier yourself."

**SAY:** Last block: a confirmation email back to Sarah. "Done. Draft RFQ created for this quantity, from this supplier. It's a draft. Review it in Odoo and send it yourself." Stocky always closes the loop.

**SHOW:** Run again and approve. Then Odoo → **Purchase** → **Orders → Requests for Quotation**. Three new rows, status **RFQ**: PackRight Industries (1,820 × Corrugated Shipping Box, $1,547.00), Global Lift Parts (32 × Pallet Jack Wheels, $1,216.00) and Gulf Lubricants (49 × Hydraulic Oil 20L, $2,646.00). Open one; Source Document reads "Stocky – approved by email".

**SAY:** Let's check Odoo. Purchase, Requests for Quotation. There they are. PackRight, 1,820 boxes. Global Lift Parts, 32 Pallet Jack Wheels. Gulf Lubricants, 49 drums of hydraulic oil, the one Mr. Harrison approved. Status: RFQ. Not confirmed. Not sent. Source document: "Stocky, approved by email". And no safety gloves, because Sarah said no.

**SHOW:** Point at the **Confirm Order** button in Odoo without clicking it.

**SAY:** And see this "Confirm Order" button? That's red. That stays Sarah's job. Stocky prepares, Sarah signs. What used to take her twenty-five minutes every morning now takes about forty seconds of reading and clicking.

**SHOW:** Toggle the workflow **Active** (or click **Publish**, depending on your n8n version).

**SAY:** Last thing: switch the workflow on with the Active toggle, or the Publish button in newer versions of n8n. From tomorrow, 8am, it runs by itself.

---

## [ON CAMERA] Common Mistakes and the Week-One Rules (23:15–24:20)

Before we wrap up, four mistakes I see beginners make once their agent can write.

Mistake one: auto-confirming purchase orders in week one. It's so tempting when the test runs perfectly. Don't. Run with approvals for at least a month. Count how often you click Reject. If you're rejecting one in five, the rules aren't ready.

Mistake two: forgetting incoming stock. Our formula uses quantity on hand. Sarah rejected the gloves because 500 pairs were already on the way. When you're comfortable, switch from "Quantity On Hand" to Odoo's "Forecasted Quantity", which counts open purchase orders too.

Mistake three: giving the Odoo key more power than it needs. Stocky's Odoo user should be able to create RFQs, not approve them or post bills. A key card only opens the doors it needs to.

Mistake four: vague approval emails. If the email doesn't show the quantity, the price and the reason, people click Approve without reading. Make the important numbers impossible to miss.

> PAUSE & THINK: What is your company's approval limit, and who signs above it? If you don't know, that's your first question to ask on Monday.

---

## [ON CAMERA] Outro (24:20–26:00)

Let's recap. Three key takeaways.

One: the traffic-light rule. Reading is green, drafting is amber, committing is red. Stocky now works in amber, and the red button stays with a human.

Two: human-in-the-loop is just one block. "Send message and wait for response" turns any workflow into "prepare, then ask the manager to sign".

Three: guardrails beat cleverness. A simple order formula, a two-thousand-dollar rule for Mr. Harrison and a sanity check would have stopped that ten-times-too-big order cold.

Your activity for this video has two parts. First, open **V07_Activity_ReorderSimulator.xlsx**. You'll play Stocky and Sarah for a morning: ten SKUs, the formulas already built, and you decide Approve or Reject for each one. There's a tab where you'll try to recreate the glove disaster and see if the sanity check catches it. Second, fill in **V07_Activity_ApprovalRules.docx**, the Approval Rules Designer. You'll write down which actions are green, amber and red at your own company, and who signs what. That document becomes Stocky's rulebook for your business. Then take the quiz, **V07_Quiz**, to lock it in.

So far Stocky only sees what's inside Odoo. But your biggest risks often come from outside the building: a typhoon near Shenzhen, a week-long holiday in China, the peso moving overnight. In the next video, "Seeing Beyond the ERP", we'll connect Stocky to free weather, currency and holiday APIs, and it'll build a supplier risk score that tells Sarah, in plain English, which orders to place early. See you there.
