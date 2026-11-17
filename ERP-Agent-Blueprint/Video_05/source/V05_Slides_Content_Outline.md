# Video 5 Slides: Content Outline
**Video:** Your No-Code Toolkit: Setting Up n8n and Your AI Brain | **Length:** 24 min | **Slides:** 17
(Content outline only. Final design will follow the brand theme.)

---

### Slide 1: Title
- **Your No-Code Toolkit: Setting Up n8n and Your AI Brain**
- The ERP Agent Blueprint · Video 5 · 24 min
- **Suggested picture:** An empty office desk with a laptop, a name plate reading "Stocky (Intern)", a brain icon on a sticky note, and a small key ring. Caption: "Day one: desk, brain, keys."

### Slide 2: Monday 8:10 at BrightLeaf
- Priya: 3 suppliers to chase, Mr. Kapoor's report due at 11:00, pallet jack wheels (BL-1005) almost out
- Videos 1-4 = understanding. Video 5 = building starts
- **Suggested picture:** Illustrated Priya at her desk with a coffee, a spreadsheet, and three speech bubbles: "Report by 11!" (Mr. Kapoor), "Wheels nearly gone!" (Ravi), "Supplier hasn't replied" (inbox).

### Slide 3: What You'll Set Up Today
- The desk: **n8n** (workflow builder)
- The brain: **Claude** (or ChatGPT) via an API key
- The keys: stored safely in **n8n Credentials**
- The result: a "hello world" supplier email + the Odoo key ready for Video 6
- **Suggested picture:** Three numbered icons in a row: desk → brain → key ring, with a finish flag labelled "Hello world email".

### Slide 4: Meet n8n
- "n-eight-n", short for "nodemation"
- Cloud trial: free for 14 days, no credit card; self-hosting is optional and NOT needed
- One alternative exists (Make.com); we use n8n for its beginner-friendly AI Agent node
- **Suggested picture:** Screenshot of the n8n Overview page with the "Create Workflow" button circled and the address bar showing `brightleaf.app.n8n.cloud`.

### Slide 5: The Recipe Card
- A workflow = a recipe card: step 1, step 2, step 3, read left to right
- **Suggested picture:** A kitchen recipe card titled "Monday Stock Check" with three steps ("Doorbell rings at 8:00", "Read stock from Odoo", "Email low items to Ravi"), each step drawn as a Lego brick.

### Slide 6: The Four Words of n8n
- **Trigger** = the doorbell that starts the recipe
- **Node** = one step, one Lego block
- **Connection** = the "and then" arrow
- **Execution** = one run, saved in the logbook
- **Suggested picture:** A 2x2 grid of icons: doorbell, Lego brick, arrow, CCTV camera/logbook, each with its n8n screenshot thumbnail beside it.

### Slide 7: Triggers You'll Use in This Course
- Trigger manually (today) · On chat message (Video 6) · On a schedule (the Monday report) · On webhook call (a doorbell another app can press)
- **Suggested picture:** Four doorbells of different styles labelled with each trigger type, with a small course-video number tag on each.

### Slide 8: Pause & Think
- Think of one task you do every week. What rings the doorbell? What are the first two steps?
- Example: Every Monday 8:00 → read stock from the ERP → email low items to Ravi
- **Suggested picture:** Big yellow "Pause & Think" banner with a blank three-box recipe card for the viewer to imagine filling in.

### Slide 9: The Key on the Noticeboard
- A warehouse cage master key hung by the noticeboard → 11 batteries missing, nobody accountable
- An API key = a hotel room key card: opens only certain doors, can be cancelled, but anyone holding it can use it
- **Suggested picture:** A key hanging on a hook beside a shift noticeboard, with a cycle-count sheet showing "Batteries: -11" in red.

### Slide 10: Three Places a Key Must NEVER Go
- NEVER: Chats (ChatGPT, Claude, WhatsApp, Slack)
- NEVER: Spreadsheets and shared documents (including your Google Sheet database)
- NEVER: Emails and screenshots
- ALWAYS: One place only: **n8n Credentials** (encrypted, hidden after saving)
- **Suggested picture:** Three crossed-out icons (chat bubble, spreadsheet, envelope) and one green-ticked locked key cabinet labelled "n8n Credentials".

### Slide 11: Getting Your Claude Key
- console.anthropic.com (the developer console, not the chat website)
- Chat subscriptions (Claude Pro / ChatGPT Plus) do NOT cover API usage
- API Keys → Create Key → name it → copy once → straight into n8n
- OpenAI alternative: platform.openai.com → API keys → Create new secret key
- **Suggested picture:** Annotated screenshot of the Anthropic console with three numbered callouts: "API Keys", "Create Key", "Copy (shown once!)", and the key itself blurred.

### Slide 12: Your Spending Safety Rail
- Prepaid credits (start with the minimum)
- Auto reload OFF
- Monthly spending limit (e.g. $10) + email alert (e.g. $5)
- **Suggested picture:** A highway guard rail with three labelled posts: "Prepaid credits", "Auto reload OFF", "Monthly limit + alert", keeping a small car (the workflow) from going off a cliff labelled "Surprise bill".

### Slide 13: What Does It Cost?
- Billed in **tokens**: 1,000 tokens ≈ 750 words
- Example prices (check current pricing): Claude Sonnet ≈ $2 per 1M tokens in, $10 per 1M out; Claude Haiku is a fraction of that
- Hello world email ≈ 350 in + 200 out ≈ **$0.003** (≈ 300 emails per $1)
- Stocky question ≈ 2-4 cents → 20 questions/day × 22 days ≈ **$13/month**
- **Suggested picture:** A simple bar chart comparing "AI cost per month: $13" with "Value of 4 hours/week saved: ~$260", plus a coin stack showing "1 email = 1/3 cent".

### Slide 14: Anatomy of the Hello World Workflow
- Manual Trigger → AI Agent ← Anthropic Chat Model (credential: Anthropic – BrightLeaf)
- The AI Agent's three plugs: Chat Model (brain), Memory, Tool (hands)
- **Suggested picture:** Clean diagram of the n8n canvas: doorbell node → robot "AI Agent" node, with three plugs underneath labelled Brain / Memory / Hands; only the Brain plug is connected (to a Claude logo).

### Slide 15: System Message vs User Message
- System message = the job description (stays the same): "You are Stocky... polite... under 120 words... never invent facts"
- User message = today's task (changes): PO P00027, BL-1005, 40 sets, 3 days late, stock 18 vs reorder point 25
- Result: a polite, specific email in ~4 seconds
- **Suggested picture:** Two cards side by side: a laminated "Job Description" badge and a yellow sticky note "Today's task", both pointing into the robot, with the finished email shown on the right.

### Slide 16: The Odoo Key + Credential
- Odoo: Settings → (Activate the developer mode) → Users & Companies → Users → your user → Account Security → New API Key
- n8n "Odoo API" credential = 4 lines of an address: Site URL · Username · API Key · Database Name
- Top 3 errors: extra text after `.odoo.com`, database-name typo, password instead of API key
- **Suggested picture:** An envelope addressed in four lines (`https://brightleaf-demo.odoo.com` / `priya@...` / `••••••••` / `brightleaf-demo`) next to a green "Connection tested successfully" stamp.

### Slide 17: Recap + Your Activity
- 1) n8n = recipe card: trigger, nodes, connections, executions
- 2) Keys live only in n8n Credentials, with a spending safety rail
- 3) AI is cheap when you brief it well
- Activity: **V05_Activity_Toolkit_Setup.xlsx** (Setup Checklist, Credentials Safety Log, Cost Estimator) · Then: Video 5 quiz
- Next: **Video 6: Your First Agent: Stocky Reads the ERP**
- **Suggested picture:** Three ticked checkboxes, the activity file icon, and a teaser image of a chat bubble saying "What's running low?" next to the Stocky robot.
