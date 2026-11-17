# Video 6 Quiz: Your First Agent: Stocky Reads the ERP
**Course:** The ERP Agent Blueprint | **Level:** Beginner | **Questions:** 10

Answer each question, then check yourself against the Answer Key at the end. If you get one wrong, re-watch the part of Video 6 mentioned in the explanation.

---

## Questions

### Question 1
In Stocky v1, which trigger starts the workflow?

- A) A Manual Trigger button
- B) A schedule that runs every morning at 7:00
- C) A Chat Trigger ("On chat message"), so every typed question starts the recipe
- D) An email arriving in Priya's inbox

### Question 2
What does the **Simple Memory** connected to the AI Agent do?

- A) It stores every conversation forever in Odoo
- B) It lets Stocky remember the last few messages of the current conversation, so follow-up questions like "And what about the hydraulic oil?" make sense
- C) It saves the API keys
- D) It makes Stocky answer faster by caching stock levels

### Question 3
Why did we choose only four fields (`default_code`, `name`, `qty_available`, `standard_price`) in "Fields to Include" for the products tool?

- A) Odoo only allows four fields per request
- B) Fewer fields means less for Stocky to read: lower cost, faster answers, and less chance of confusion
- C) The other fields are secret
- D) n8n's free trial limits the number of fields

### Question 4
In Odoo's supplier info (`product.supplierinfo`), what does the field called **`delay`** mean?

- A) How many days the current shipment is late
- B) The supplier's payment terms
- C) The delivery lead time in days
- D) How long the API takes to respond

### Question 5
Which list shows the five parts of the **prompt anatomy** taught in this video?

- A) Role, Goal, Tools, Rules, Output format
- B) Hello, Context, Question, Answer, Goodbye
- C) Trigger, Node, Connection, Execution, Credential
- D) SKU, Product, On hand, Reorder point, Gap

### Question 6 (Scenario)
Stocky says the Industrial Safety Gloves (BL-1004) have 240 pairs on hand, but Priya believes it's 420. What should she do FIRST?

- A) Argue with Stocky in the chat until it changes the number
- B) Delete the workflow and start again
- C) Open the Logs panel (or the Executions tab) and check what the Odoo tool actually returned, then compare it with Odoo itself
- D) Switch to a more expensive AI model

### Question 7
What is an AI **hallucination**?

- A) When the AI refuses to answer
- B) When the AI gives a confident, plausible-sounding answer that isn't based on real data
- C) When the workflow fails with a red error
- D) When the Odoo connection test fails

### Question 8 (True or False)
Because Stocky v1's Odoo tools only use the "Get Many" operation, Stocky can read data in Odoo but cannot create, change or delete anything there.

- A) True
- B) False

### Question 9 (Scenario)
Priya asks Stocky, "When will PO P00027 arrive?" Stocky has no tool for purchase orders. Which answer shows that her system prompt is working well?

- A) "PO P00027 will arrive next Tuesday."
- B) "It should arrive in about 3 weeks, around the end of the month."
- C) "I don't know. That information isn't in the Odoo data I can see. I can't read purchase orders; please check Purchase → Orders in Odoo."
- D) "Purchase orders usually arrive on time."

### Question 10
According to Stocky's rules, BL-1008 LED Warehouse Light has 34 on hand and a reorder point of 30. How should Stocky classify it?

- A) Running low, because it is close to the reorder point
- B) On the watch list, because it is above the reorder point by 15% or less (about 13%)
- C) Fine, no mention needed
- D) Out of stock

---

## Answer Key

**1. C.** Stocky v1 uses the Chat Trigger ("When chat message received"). Each message rings the doorbell and becomes the AI Agent's task through "Connected Chat Trigger Node".

**2. B.** Simple Memory is the intern's notepad for the current conversation. With a Context Window Length of 10, Stocky remembers the last 10 exchanges, which is why a short follow-up question works. It does not remember forever.

**3. B.** Every extra field is more text for the AI to read, which means more tokens (cost), slower answers and more room for confusion. Give the intern the page they need, not the whole binder.

**4. C.** In Odoo, `delay` on the vendor line is the delivery lead time in days. Because the name is misleading, we explain it in the tool description and the system prompt, so Stocky doesn't think a shipment is late.

**5. A.** Role (who it is), Goal (what success looks like), Tools (what it can use and when), Rules (guardrails and business definitions) and Output format (how the answer should look).

**6. C.** The log shows exactly what Odoo returned. If the tool returned 240, the problem is in the Odoo data. If the tool returned 420 and Stocky said 240, the problem is the prompt or the agent's reading. Arguing in the chat doesn't tell you which.

**7. B.** Language models produce the most likely-sounding words. Without real data, they can still produce a confident answer, such as a delivery date, that is simply made up. In supply chain, that can mean broken customer promises.

**8. A (True).** "Get Many" only reads records. Stocky v1 is read-only by design, which makes it safe to experiment with. Taking action comes later, always with human approval.

**9. C.** The rules "only answer from tool data" and "say I don't know" make Stocky admit what it can't see and point Priya to where she can check. Answers A, B and D are confident guesses: hallucinations.

**10. B.** 34 is above 30, so it is not running low. But 34 is only about 13% above the reorder point, within the 15% watch-list rule, and with a 28-day lead time from Shenzhen, it's exactly the item Priya wants flagged early.
