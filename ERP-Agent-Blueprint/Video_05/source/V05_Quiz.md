# Video 5 Quiz: Your No-Code Toolkit: Setting Up n8n and Your AI Brain
**Course:** The ERP Agent Blueprint | **Level:** Beginner | **Questions:** 10

Answer each question, then check yourself against the Answer Key at the end. There are no trick questions. If you get one wrong, re-watch the part of Video 5 mentioned in the explanation.

---

## Questions

### Question 1
In n8n, what is a **trigger**?

- A) The AI model that writes the answer
- B) The doorbell that starts the workflow, for example a button, a schedule or a chat message
- C) The line that connects two nodes
- D) The place where API keys are stored

### Question 2
What is a **node** in n8n?

- A) One step, one Lego block on the recipe card
- B) A type of API key
- C) A list of past runs
- D) The name of your n8n web address

### Question 3
Priya builds two nodes on the canvas, presses "Execute workflow", and only the first node runs. The second node has no green tick. What is the most likely reason?

- A) Her Claude credits have run out
- B) The two nodes are not joined by a connection
- C) n8n only runs one node at a time on the free trial
- D) She forgot to rename the workflow

### Question 4
Where should you look first to see when a workflow ran, how long it took, and whether it succeeded or failed?

- A) The Credentials tab
- B) The Anthropic console
- C) The Executions tab
- D) The Odoo Settings page

### Question 5 (True or False)
If you already pay for a Claude Pro or ChatGPT Plus subscription, that subscription also pays for the API usage of your n8n workflows.

- A) True
- B) False

### Question 6 (Scenario)
Priya has just created her Claude API key in the Anthropic console. Ravi suggests she paste it into the "Suppliers" tab of the BrightLeaf Google Sheet "so the team can find it". What should she do?

- A) Paste it into the Google Sheet, but in a hidden column
- B) Email it to herself so she has a backup
- C) Paste it only into an n8n Credential, and record in her Credentials Safety Log WHERE the key lives, never the key itself
- D) Paste it into a ChatGPT chat and ask ChatGPT to remember it

### Question 7
Which combination best protects you from a surprise AI bill?

- A) Use the most expensive model so it makes fewer mistakes
- B) Prepaid credits with auto reload OFF, a monthly spending limit, and an email alert
- C) Run workflows only at night
- D) Share one API key across the whole company

### Question 8
AI usage is billed in **tokens**. Roughly how many words is 1,000 tokens?

- A) About 10 words
- B) About 75 words
- C) About 750 words
- D) About 75,000 words

### Question 9 (Scenario)
Priya saves her Odoo credential in n8n and gets a red error instead of "Connection tested successfully". Her Site URL is `https://brightleaf-demo.odoo.com/odoo/inventory`. What is the most likely fix?

- A) Activate developer mode again
- B) Shorten the Site URL to `https://brightleaf-demo.odoo.com`, with nothing after `.odoo.com`
- C) Replace the API key with a Claude API key
- D) Change the Database Name to "Odoo"

### Question 10
In the AI Agent node, what is the difference between the **system message** and the **user message (prompt)**?

- A) There is no difference; they are two names for the same box
- B) The system message is the intern's job description and stays the same; the user message is today's task and changes each time
- C) The system message is written by n8n; the user message is written by Claude
- D) The system message holds the API key; the user message holds the email

---

## Answer Key

**1. B.** A trigger is the doorbell that starts the recipe. Nothing in n8n runs until a trigger fires: a manual button, a schedule, a chat message or a webhook.

**2. A.** A node is one step on the recipe card, like one Lego block. You chain nodes together to build a workflow.

**3. B.** Information flows only along connections. A node that isn't connected never receives anything, so it never runs. Forgetting to connect a node is one of the most common beginner mistakes.

**4. C.** The Executions tab is your logbook (think CCTV footage for your recipe card). Every run is saved with its time, duration, status and data.

**5. B (False).** Chat subscriptions cover the chat website only. API usage is billed separately, pay-as-you-go, through console.anthropic.com or platform.openai.com.

**6. C.** API keys go in n8n Credentials, where they are stored encrypted. Spreadsheets, emails and chats are like hanging the master key on the noticeboard. A safety log should record where the key lives and when to renew it, never the key itself.

**7. B.** Prepaid credits with auto reload off mean usage simply stops when the money runs out, and a monthly limit plus an alert keeps you in control even if a workflow misbehaves.

**8. C.** As a rule of thumb, 1,000 tokens is about 750 words. That's why a short supplier email costs only a fraction of a cent.

**9. B.** The Site URL must be just the base address of your Odoo database. Extra text at the end of the URL is one of the three most common reasons the Odoo credential fails (the other two are a database-name typo and pasting your password instead of the API key).

**10. B.** The system message is the permanent job description ("You are Stocky, BrightLeaf's procurement assistant... never invent facts"). The user message is the specific task for this run, such as the follow-up email for PO P00027.
