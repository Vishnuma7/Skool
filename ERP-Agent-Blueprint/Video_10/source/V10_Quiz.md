# Video 10 Quiz: Going Live Safely + Your Capstone Project
**Course:** The ERP Agent Blueprint | **Video 10:** Going Live Safely + Your Capstone Project | **Level:** Beginner

Answer all 10 questions, then check yourself with the Answer Key at the end. Aim for 8 out of 10 or better.

---

## Questions

**1. What does "least privilege" mean for an AI agent like Stocky?**
- A) The agent gets the cheapest AI model available
- B) The agent gets only the access it needs to do its job, and nothing more
- C) The agent can only run once a week
- D) Only the least senior employee may use the agent

**2. Which Odoo access rights should the "Stocky Bot" user have for BrightLeaf's reorder agent?**
- A) Administration: Settings, so it never gets blocked
- B) Sales: Administrator and Accounting: Billing
- C) Inventory: User and Purchase: User, everything else blank
- D) No rights at all; the agent should use Sarah's login

**3. Where should an API key be stored?**
- A) In a WhatsApp group so the team can find it
- B) In the AI prompt, so the agent knows it
- C) In a Google Sheet tab called "Passwords"
- D) Only in n8n Credentials, which stores it encrypted

**4. What is the safe order of steps when rotating Stocky's Odoo API key?**
- A) Delete the old key → create a new key → update n8n
- B) Create a new key → update and test the n8n credential → then delete the old key
- C) Update n8n first → create the new key next week
- D) Keep using the same key forever; rotation is optional

**5. True or False: The n8n Error Trigger workflow also fires when you click "Test workflow" manually.**
- A) True
- B) False

**6. Why should you tick "For testing purposes" when duplicating your Odoo database?**
- A) It makes the copy load faster
- B) It turns off outgoing emails and scheduled jobs in the copy, so tests can't contact real suppliers
- C) It deletes all products in the copy
- D) It gives the copy unlimited users for free

**7. Sarah wants to change the prompt in the live "Daily Reorder Check" workflow. What should she do first?**
- A) Edit the live workflow directly and hope it works
- B) Duplicate it as a dated BACKUP (and download it), edit and test the copy on the TEST credential, then swap
- C) Delete the workflow and rebuild it from scratch
- D) Ask Stocky to edit its own workflow

**8. Which TWO settings best protect BrightLeaf from a surprise AI bill?**
- A) A monthly spend limit (with an alert) in the AI provider console, and Max Iterations on the AI Agent node
- B) A longer Odoo password and a new Gmail address
- C) Turning off the Monday Report and the Decision Log
- D) Using Google Sheets instead of Airtable

**9. Sarah used to spend 12 hours a week on this work; now she spends 2. Her cost is $20/hour and she works 48 weeks a year. What is the yearly value of the time saved?**
- A) $2,400
- B) $4,800
- C) $9,600
- D) $11,520

**10. Ahmed wants to start his capstone. He plans an agent that handles purchasing, sales quotes, invoices and HR leave requests all at once. What is the best advice?**
- A) Great plan; bigger is always more impressive
- B) Pick ONE painful use case, design it with the capstone brief, build it in a test environment, test with 10 questions, and share a 2-minute Loom demo
- C) Skip the design and start clicking in n8n
- D) Wait until he has learned to code

---

## Answer Key

**1. B.** Least privilege means the agent gets only the key cards it needs. If something goes wrong, the damage is limited by the lock, not just by the prompt.

**2. C.** Stocky reads products and stock and creates RFQs, so Inventory: User and Purchase: User are enough. Admin, Sales and Accounting rights would open doors it never needs.

**3. D.** A key lives in exactly one place: n8n Credentials (encrypted). Keys in chats, sheets, screenshots or prompts should be treated as stolen.

**4. B.** New key first, update and test n8n, then delete the old key. That way Stocky never goes offline during the change.

**5. B (False).** The Error Trigger only fires for automatic (production) runs. To test it, use a test copy with a schedule, break something on purpose, and activate it briefly.

**6. B.** The testing option neutralises the copy: no real emails and no scheduled jobs. That is what makes it a safe sandbox.

**7. B.** Golden rule: duplicate → edit the copy on TEST → test → swap. The dated backup lets her go back to the working version in seconds.

**8. A.** A spend limit caps the worst-case monthly bill, and Max Iterations stops a confused agent from looping through tools over and over in one run.

**9. C.** (12 − 2) hours × $20 × 48 weeks = 10 × 20 × 48 = $9,600 a year. Against roughly $384 a year of tool costs, that's about a 25x return.

**10. B.** Small and painful beats big and impressive. One clear use case, designed on paper, built and tested safely, and shared with the community is how a capstone succeeds.
