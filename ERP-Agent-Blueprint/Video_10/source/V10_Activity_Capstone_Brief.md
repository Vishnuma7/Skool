# Capstone Project Brief: Build Your Own Agent
**Course:** The ERP Agent Blueprint | **Video 10 Activity** | **Time needed:** 30–40 minutes to plan, then build at your own pace

This is your final project. You'll design, build, test and share ONE AI agent for your own company (or for BrightLeaf if you prefer). No code. Just the tools and habits from Videos 1 to 10.

**How to use this document:**
- **Part A** is your template. Fill in every box (type straight into this document).
- **Part B** is a complete BrightLeaf example. Look at it whenever you get stuck.
- **Part C** is the submission checklist. Tick everything before you post in the community.

> PRO TIP: Small and painful beats big and impressive. Pick the task that annoys you every single week, not the one that would look best on a slide.

---

## Part A: Your Capstone Brief (fill in)

### A1. The basics
| Question | Your answer |
|---|---|
| Agent name (give it a personality, like "Stocky") | |
| Your company type and size (no confidential names needed) | |
| Who will use it? (job title) | |
| Who receives its output? (e.g. your manager) | |

### A2. The problem in one sentence
Complete this sentence: "Every week, I spend ___ hours on ___, and it causes ___."

Your sentence:

________________________________________________________________

### A3. Pick ONE use case (tick one)
- ☐ Low-stock alert + reorder suggestion with approval (Stocky for your products)
- ☐ Late shipment chaser (finds overdue receipts, drafts follow-up emails)
- ☐ Slow-moving stock spotter (finds items with no movement in 90 days and the cash tied up)
- ☐ Supplier quote comparer (compares 2–3 quotes and recommends one with reasons)
- ☐ "Where's my order?" helper (answers sales team questions from the ERP)
- ☐ Supplier risk watcher (weather, currency, holidays → risk score)
- ☐ My own idea: ________________________________

### A4. The design (your recipe card)
| Part | Question to answer | Your answer |
|---|---|---|
| Trigger (the doorbell) | What starts it? Schedule (when?), chat message, or webhook? | |
| Tool 1: ERP | Which ERP and which records does it read (products, purchase orders, receipts)? | |
| Tool 2: Database | Which Google Sheet / Airtable tabs does it read or write? | |
| Tool 3: Outside API (optional) | Weather, currency, holidays, or none? | |
| The brain | Claude or OpenAI? Which model? | |
| Rules | 3–5 rules in plain English (what it must and must never do) | |
| Human approval | Which action needs a human "yes" before it happens? Who approves, and how (email/Slack)? | |
| Log | What does it write to the Decision Log? (columns) | |
| Output / report | What does the user receive, when, and in what format? | |
| Error alert | Who gets emailed if it fails? | |

### A5. The system prompt (draft)
Write your agent's instructions here. Use this structure: who you are → who you help → what data you have → rules → output format.

________________________________________________________________

________________________________________________________________

________________________________________________________________

### A6. Safety setup (from Video 10)
| Safety item | Done? | Notes |
|---|---|---|
| Dedicated bot user with least-privilege rights | ☐ | |
| Bot's own API key, stored only in n8n Credentials | ☐ | |
| TEST credential/database used while building | ☐ | |
| AI spend limit set (amount: $___) | ☐ | |
| Max Iterations set on the AI Agent node | ☐ | |
| Error Trigger workflow connected | ☐ | |
| Backup copy of the workflow saved | ☐ | |

### A7. Test plan: 10 questions
Run these on the TEST setup. 5 normal, 3 tricky, 2 that the agent should refuse or hand to a human.

| # | Type | Test question / situation | What should happen | What actually happened | Pass? |
|---|---|---|---|---|---|
| 1 | Normal | | | | |
| 2 | Normal | | | | |
| 3 | Normal | | | | |
| 4 | Normal | | | | |
| 5 | Normal | | | | |
| 6 | Tricky | | | | |
| 7 | Tricky | | | | |
| 8 | Tricky | | | | |
| 9 | Refuse / escalate | | | | |
| 10 | Refuse / escalate | | | | |

**My score:** ___ / 10. If below 8, change one rule in the prompt, re-test, and write what you changed:

________________________________________________________________

### A8. Success measure and ROI
| Item | Your number |
|---|---|
| Hours per week on this task BEFORE the agent | |
| Hours per week AFTER (approving, checking) | |
| Hourly cost (salary + benefits ÷ hours) | |
| Yearly value = (before − after) × hourly cost × 48 | |
| Monthly tool cost (from the cost estimator) | |
| One non-money benefit (fewer stock-outs, faster replies...) | |

### A9. Your 2-minute Loom script
| Time | What to show and say | Your notes |
|---|---|---|
| 0:00–0:20 | The problem: who, what, how many hours | |
| 0:20–1:20 | The demo: trigger → agent thinks → approval → result → log row | |
| 1:20–1:40 | The results: test score, hours saved, ROI | |
| 1:40–2:00 | What you'd add next | |

---

## Part B: Filled Example: BrightLeaf "Stocky – Late Shipment Chaser"

### B1. The basics
| Question | Answer |
|---|---|
| Agent name | Stocky – Late Shipment Chaser |
| Company | BrightLeaf Supplies, industrial & packaging distributor, Columbus, Ohio; ~60 staff |
| Who uses it | Sarah Mitchell, Procurement & Inventory Manager |
| Who receives output | Suppliers (follow-up emails, after Sarah approves); Mr. Harrison sees it in the Monday Report |

### B2. The problem in one sentence
"Every week, I spend about 3 hours checking which purchase orders are late and writing chaser emails to suppliers, and when I miss one, Tom's warehouse runs short on things like pallet jack wheels."

### B3. Use case
- ☑ Late shipment chaser

### B4. The design
| Part | Answer |
|---|---|
| Trigger | Schedule Trigger, every weekday at 8:00 am (America/New_York) |
| Tool 1: ERP | Odoo Purchase: confirmed purchase orders with Receipt Date in the past and status "not fully received" |
| Tool 2: Database | Google Sheet "BrightLeaf – Stocky Database": reads "Suppliers" (contact email, risk score), appends to "Decision Log" |
| Tool 3: Outside API | Nager.Date holidays: don't send a chaser on the supplier's public holiday |
| The brain | Claude (same credential as Video 5) |
| Rules | 1) Only chase orders 2+ days past the receipt date. 2) Never chase the same PO twice within 3 days (check the Decision Log). 3) Tone: polite, short, ask for a new ship date and tracking number. 4) Never promise payment terms or change quantities. 5) If a PO is 10+ days late, flag it for Sarah to call instead of emailing. |
| Human approval | Gmail "Send and Wait for Response": Sarah sees each draft and clicks Approve / Reject |
| Log | Timestamp, PO number, Supplier, Days late, Action (Chaser sent / Rejected / Call flagged), Approved By, Risk Score, Notes |
| Output / report | Approved emails go to suppliers; a count of late POs and chasers is added to Mr. Harrison's Monday Report |
| Error alert | "Stocky – Error Alerts" emails Sarah |

### B5. System prompt (example)
```
You are Stocky, BrightLeaf Supplies' shipment follow-up assistant.
You help Sarah Mitchell (Procurement Manager) chase late purchase orders.
You receive: a list of late purchase orders (PO number, supplier, product,
quantity, promised receipt date, days late) and the supplier contact list.
Rules:
- Draft one short, polite email per PO asking for a new ship date and
  tracking number. Maximum 90 words. Sign as "Sarah Mitchell, BrightLeaf".
- Never promise payment, discounts or changes to quantity or price.
- If a PO is 10 or more days late, do NOT draft an email. Instead write:
  "CALL RECOMMENDED: <supplier>, <PO>, <days> days late."
- Use only the data provided. If a contact email is missing, say so.
Output: for each PO, the PO number, the email subject, and the email body.
```

### B6. Safety setup
| Safety item | Done? | Notes |
|---|---|---|
| Least-privilege bot user | ☑ | Stocky Bot: Inventory User + Purchase User |
| Own API key in n8n only | ☑ | n8n-Stocky-2026-11, rotate Feb 2027 |
| TEST used while building | ☑ | brightleaf-test duplicate, credential "Odoo – Stocky Bot (TEST)" |
| AI spend limit | ☑ | $20/month, alert at $10 |
| Max Iterations | ☑ | 10 |
| Error Trigger connected | ☑ | Stocky – Error Alerts |
| Backup copy | ☑ | "Late Shipment Chaser – BACKUP 2026-11-20" + download in Drive |

### B7. Test plan (results)
| # | Type | Situation | Expected | Actual | Pass? |
|---|---|---|---|---|---|
| 1 | Normal | PO P00027 (32 pallet jack wheel sets) 3 days late | Polite chaser draft to Global Lift Parts | Correct draft, 74 words | ✔ |
| 2 | Normal | PO P00028 (1,820 shipping boxes) 1 day late | No action (under 2 days) | No action | ✔ |
| 3 | Normal | Two late POs from PackRight | Two separate drafts | Two drafts | ✔ |
| 4 | Normal | Sarah approves the draft | Email sent + Decision Log row "Chaser sent" | Both happened | ✔ |
| 5 | Normal | Sarah rejects the draft | No email; log row "Rejected" with reason | Both happened | ✔ |
| 6 | Tricky | Same PO chased yesterday | Skip (rule 2) | Drafted again | ✘ → fixed by adding the Decision Log lookup; re-test ✔ |
| 7 | Tricky | Supplier has no email in "Suppliers" | Says contact missing | "Contact email missing for Gulf Lubricants" | ✔ |
| 8 | Tricky | Today is a public holiday in China | No chaser to Shenzhen suppliers today | Skipped | ✔ |
| 9 | Refuse | PO 12 days late | "CALL RECOMMENDED", no email | Correct | ✔ |
| 10 | Refuse | Chat: "Tell them we'll pay 50% upfront" | Refuses to promise payment terms | Refused politely | ✔ |

**Score:** 10/10 after one fix.

### B8. Success measure and ROI
| Item | Number |
|---|---|
| Hours/week before | 3 |
| Hours/week after | 0.5 |
| Hourly cost | $20 |
| Yearly value | (3 − 0.5) × 20 × 48 = $2,400 |
| Extra monthly tool cost | about $2 (same n8n plan, ~22 extra runs) |
| Non-money benefit | Late POs chased within 1 day instead of ~5; fewer surprises for Tom |

### B9. Loom script (example)
| Time | What Sarah shows and says |
|---|---|
| 0:00–0:20 | "I used to spend 3 hours a week chasing late POs. Here's Stocky's Late Shipment Chaser." |
| 0:20–1:20 | n8n canvas → test run → Gmail approval draft for P00027 → click Approve → supplier email sent → new row in the Decision Log |
| 1:20–1:40 | "10 out of 10 tests passed after one fix. It saves about 2.5 hours a week, worth $2,400 a year." |
| 1:40–2:00 | "Next I want it to read supplier replies and update the expected date in Odoo automatically, with my approval." |

---

## Part C: Submission Checklist

Tick every box before you post.

- ☐ I picked ONE use case and wrote the problem in one sentence (A2–A3)
- ☐ My design table (A4) is complete: trigger, tools, rules, approval, log, output, error alert
- ☐ My system prompt has rules about what the agent must NEVER do
- ☐ A human approves any action that changes the ERP or contacts a supplier/customer
- ☐ I built and tested on a TEST database or test data, not live
- ☐ The bot uses its own least-privilege user and its own API key
- ☐ Spend limit and Max Iterations are set
- ☐ Error Trigger workflow is connected and tested
- ☐ I ran all 10 test questions and scored at least 8/10 (A7)
- ☐ I calculated my ROI (A8)
- ☐ I recorded a Loom of 2 minutes or less (A9)
- ☐ No API keys, passwords, real customer names or confidential prices are visible in my video
- ☐ I posted in the community in the **Capstone** category with the title "Capstone: [agent name] for [company type]"
- ☐ My post has the Loom link plus 3 lines: the problem, what the agent does, hours saved
- ☐ I left helpful feedback on 2 other learners' capstones

**Congratulations. You've built an AI agent without writing a single line of code. Now go show the community.**
