# Activity: The Approval Rules Designer
**Course:** The ERP Agent Blueprint | **Video 7:** Agents That Take Action | **Time:** about 25 minutes

**What you'll make:** a one-page rulebook that says exactly what your agent may do on its own, what it may draft, and who must sign what. This is the most important safety document you'll write in this course, and you don't need any software to do it. Just this worksheet and your knowledge of your business.

**How to use this worksheet:**
1. Read the BrightLeaf example in each part. It shows you what a good answer looks like.
2. Fill in the "Your company" boxes. Short, plain sentences are perfect.
3. Keep this document. When you build your own version of Stocky, every rule here becomes a block in n8n (a Filter, an IF node, or an approval email).

> Reminder from the video: GREEN = Read (just looking). AMBER = Draft (creates something, nothing committed). RED = Commit (money, suppliers or customers are affected).

---

## Part 1: Sort your agent's actions into traffic lights (8 min)

### BrightLeaf example

| Action Stocky could take | Green / Amber / Red | Who must approve? |
|---|---|---|
| Read stock levels from Odoo | Green | Nobody |
| Read supplier lead times and prices | Green | Nobody |
| Create a draft RFQ for a low SKU | Amber | Sarah (or Mr. Harrison over $2,000) |
| Confirm a purchase order | Red | Sarah, by hand in Odoo. Stocky never does this. |
| Email the PO to the supplier | Red | Sarah, by hand. Stocky never does this. |
| Change a reorder point | Red | Sarah + Mr. Harrison. Stocky never does this. |

### Your company

List 6 actions an agent could take in your procurement or inventory process. Then colour them.

| Action | Green / Amber / Red | Who must approve? |
|---|---|---|
| 1. | | |
| 2. | | |
| 3. | | |
| 4. | | |
| 5. | | |
| 6. | | |

> PAUSE & THINK: Did you put anything in "Red" that you're secretly tempted to automate? Write it down here and write next to it what would need to be true (how many weeks of clean approvals?) before you'd even consider it.

My tempting red action: ______________________________________________

What would need to be true first: ______________________________________

---

## Part 2: Who signs what? Your approval limits (6 min)

### BrightLeaf example

| Order value (USD) | Who approves | How they're asked |
|---|---|---|
| $0 – $2,000 | Sarah Mitchell (Procurement & Inventory Manager) | Approval email with Approve / Reject buttons |
| Over $2,000 | Mr. Harrison (Operations Director) | Approval email with Approve / Reject buttons |
| Over $10,000 | Not proposed by Stocky at all. Flagged in the morning email for a meeting. | Hard ceiling |

### Your company

| Order value (your currency) | Who approves (role, not just a name) | How they're asked (email / Slack / Teams) |
|---|---|---|
| From ______ to ______ | | |
| From ______ to ______ | | |
| Above ______ (hard ceiling) | | |

**Who is the backup approver when the main approver is on leave?** ____________________

> BEGINNER MISTAKE: Writing a person's name instead of a role. People change jobs and go on holiday. Write "Procurement Manager (currently Sarah)" so the rule survives.

---

## Part 3: Sanity checks: what looks "weird"? (5 min)

A sanity check is a rule that says "stop and show a human, this looks unusual", even if the order is under the approval limit. It's what would have caught the 10× glove order in the video.

### BrightLeaf example
- If the suggested quantity is **more than 3 × the reorder point**, start the email with "CHECK THIS FIRST".
- If the order value is **over $5,000**, start the email with "CHECK THIS FIRST".
- If the same SKU was already approved **in the last 7 days**, flag it as a possible duplicate.
- If on-hand stock is **negative**, don't suggest an order at all; ask Tom to count the shelf.

### Your company
Write at least three sanity checks that fit your products:
1. ___________________________________________________________
2. ___________________________________________________________
3. ___________________________________________________________

---

## Part 4: What happens when nobody answers? (3 min)

### BrightLeaf example
- Approval requests expire after **1 day** (n8n option: Limit Wait Time).
- Expired = **No**. Silence never means yes.
- Tomorrow at 8am, if the product is still low, Stocky asks again.

### Your company
- Requests should expire after: __________
- When a request expires, the agent should: ______________________________
- If the same item expires 3 days in a row, the agent should tell: __________

---

## Part 5: My week-one rules checklist (3 min)

Tick each rule you commit to for the first month of your agent:

[ ] The agent can read anything it needs, but its ERP user can only create drafts, not confirm or approve.
[ ] Every draft needs a human click first (human-in-the-loop).
[ ] Orders above my approval limit go to the senior approver.
[ ] The approval email always shows quantity, unit price, total and the reason.
[ ] The approval button says "draft" so nobody thinks they're spending money.
[ ] Every draft has a Source Document note saying it came from the agent.
[ ] I'll count how many requests I reject each week. If it's more than 1 in 5, I fix the rules before going further.

---

## Part 6: Now try it with your company (optional, 5 min)

Pick ONE real product you buy often. Fill this in with real numbers:

| Field | Your answer |
|---|---|
| Product name / SKU | |
| Reorder point | |
| On hand today | |
| Suggested order (reorder point × 2 − on hand) | |
| Unit cost | |
| Order value | |
| Who would approve it under your rules? | |
| Does any sanity check fire? Which one? | |
| Would you approve it? Why or why not? | |

When you're done, keep this worksheet next to you in Video 9 and Video 10. You'll use it again.
