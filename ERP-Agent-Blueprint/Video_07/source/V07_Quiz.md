# Video 7 Quiz: Agents That Take Action
**Course:** The ERP Agent Blueprint | **Video:** 7 of 10 | **Questions:** 10

Answer each question, then check yourself against the Answer Key at the end. There are no trick questions: if you watched the video, you can do this.

---

## Questions

**1. In the traffic-light rule, which of these is an AMBER action for Stocky?**
- A) Reading the quantity on hand of every product
- B) Creating a draft RFQ in Odoo that hasn't been sent to anyone
- C) Confirming a purchase order and emailing it to the supplier
- D) Approving a supplier's invoice for payment

**2. What does "human-in-the-loop" mean in this course?**
- A) A person has to type every number into Odoo by hand
- B) The agent asks a human to approve before it takes an important action, like a manager's signature before the cheque goes out
- C) A human watches the n8n screen all day
- D) The agent sends a report after the order is already placed

**3. BrightLeaf's reorder point for Pallet Jack Wheels (BL-1005) is 25 and there are 18 on hand. Using the rule "reorder point × 2 − on hand", what is the suggested order quantity?**
- A) 7
- B) 25
- C) 32
- D) 50

**4. Which n8n node starts the workflow every morning at 8am without anyone typing anything?**
- A) Chat Trigger
- B) Schedule Trigger
- C) Filter
- D) Edit Fields (Set)

**5. Why did we set the workflow Timezone to Asia/Kolkata in Settings?**
- A) Because n8n only works in India
- B) So that Odoo shows prices in rupees
- C) So "8am" means 8am at the Pune warehouse, not 8am on some other clock
- D) Because Gmail needs it to send approval buttons

**6. Which Gmail action pauses the workflow until someone clicks Approve or Reject?**
- A) Send a message
- B) Reply to a message
- C) Send message and wait for response
- D) Add label to message

**7. Scenario: Stocky suggests ordering 49 drums of Hydraulic Oil at $54 each ($2,646). BrightLeaf's rule says any order over $2,000 needs Mr. Kapoor. What should happen?**
- A) Stocky confirms the PO because the stock is low
- B) The IF node "Over $2,000?" sends the approval email to Mr. Kapoor instead of Priya
- C) Priya approves it anyway because she's the procurement manager
- D) Stocky splits it into two orders of $1,323 to avoid the rule

**8. Scenario: Priya gets an approval email for 780 pairs of Industrial Safety Gloves, but she knows 500 pairs are already arriving on Thursday on an open purchase order. What should she do?**
- A) Approve it, because the agent is always right
- B) Reject it, and later consider switching the workflow to use Odoo's Forecasted Quantity, which counts incoming orders
- C) Delete the whole workflow
- D) Approve it and cancel the Thursday delivery

**9. True or False: Once the test runs perfectly, it's a good idea to let Stocky confirm purchase orders automatically from week one.**
- A) True
- B) False

**10. In the "ten times too big" story, which guardrail would have caught the 6,000-pair glove order?**
- A) A faster internet connection
- B) A bigger warehouse
- C) Any of these: a human approval step, a maximum order value, or a sanity check that flags quantities far above normal
- D) Using a different email provider

---

## Answer Key

**1. B.** A draft RFQ is amber: something is created, but nothing is committed and it can be deleted in two clicks. Reading (A) is green; confirming a PO (C) and approving payments (D) are red.

**2. B.** Human-in-the-loop is the manager's signature before the cheque goes out. The agent prepares the work and a person approves the important action.

**3. C.** 25 × 2 = 50, and 50 − 18 = 32. The rule "fills the shelf back up to twice the reorder point". It's simple and predictable, which is exactly what you want in week one.

**4. B.** The Schedule Trigger is the alarm-clock doorbell. The Chat Trigger (A) waits for someone to type a message, which is what we used in Video 6.

**5. C.** Without the right timezone, n8n might use a different clock, so "8am" could arrive in the middle of your evening. Always set the timezone to where your warehouse is.

**6. C.** "Send message and wait for response" with Response Type "Approval" sends Approve and Reject buttons and pauses the workflow until someone clicks one, or until the wait limit (we used one day) runs out.

**7. B.** The IF node is Mr. Kapoor's rule written as a block: over $2,000 goes to him. Splitting orders to dodge an approval limit (D) is exactly the behaviour guardrails exist to stop.

**8. B.** This is why the human stays in the loop: Priya knows about stock on the way. The formula only sees quantity on hand; Odoo's Forecasted Quantity also counts open purchase orders.

**9. B (False).** Run with approvals for at least a month and count how often you reject. Confirming POs is a red action, and it stays with a human until the rules have proven themselves.

**10. C.** The automation did exactly what it was told. A human approval, a maximum order value and a sanity check ("this is 10× the usual quantity") are each enough to stop it, and Stocky now has all three.
