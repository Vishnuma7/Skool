# Video 10: Going Live Safely + Your Capstone Project: Screen-Recording Prompts

**How to use:** 1. Open claude.ai, start a new chat, and paste ONE prompt. 2. Claude builds an animated demo you can preview. If anything looks wrong, reply in the same chat ("make the cursor slower", "the table is cut off"). 3. Open the demo full-screen in Chrome (press F11 / Ctrl+Cmd+F), start your screen recorder (QuickTime: File → New Screen Recording), then click **Start**. 4. Stop recording when the "END" card appears, trim the start and end, and add your voice-over from the script. Each demo runs for the same length as its script section, so the voice-over lines up.

<!-- VO NOTE START -->
**Voice-over (Fish Audio):** Under every prompt you'll find a grey **"Voice-over text for Fish Audio"** box. Copy that text into Fish Audio and download the audio. Best order: make the audio FIRST, check its length, and if it's longer or shorter than the section length, add one line to the prompt before sending it to Claude: *"Make the total duration exactly M:SS"* (your audio length). Claude's demo has no sound, so you join the audio and video in a video editor (CapCut, iMovie, Descript): put both on the timeline starting at 0:00.
<!-- VO NOTE END -->

**Sections in this video:**

| # | Section | Time | Length | Prompt |
|---|---|---|---|---|
| 1 | Step 1: Give Stocky Its Own Key Card | 02:00–05:30 | 3 min 30 s | Prompt 1 |
| 2 | Step 2: Protect Your Keys and Control Your Costs | 05:30–08:30 | 3 min 0 s | Prompt 2 |
| 3 | Step 3: Test First, Then Catch Errors | 10:00–13:30 | 3 min 30 s | Prompt 3 |
| 4 | Step 4: Go Live: Activate, Version, Maintain | 13:30–16:00 | 2 min 30 s | Prompt 4 |
| 5 | The Go-Live Checklist & ROI Calculator | 18:00–19:30 | 1 min 30 s | Prompt 5 |
| 6 | Capstone Brief + Recording Your Loom Demo | 21:30–23:00 | 1 min 30 s | Prompt 6 |

---

## Prompt 1 of 6: Step 1: Give Stocky Its Own Key Card (02:00–05:30, 3 min 30 s)

**What this demo shows:** Creating a least-privilege "Stocky Bot" user in Odoo (Inventory User + Purchase User only), a $5,000 purchase approval rule, the bot's own API key, switching the n8n credential, and testing that Stocky can no longer see sales invoices.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. This section teaches the idea of least privilege: the agent gets its own Odoo user with only Inventory and Purchase rights and its own API key, so even a tricked agent is stopped by the system itself, not just by its prompt.

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

SECTION LENGTH: exactly 3 min 30 s (210 seconds). The master timeline runs from 00:00 to 03:30; the END card fills 03:29–03:30.

APP LOOK
- Odoo-style ERP (simplified look-alike, no real logo): purple-ish top bar (#714B67) with the app name, a left breadcrumb, list views with a checkbox column, form views with a status bar at the top-right, a "New" button top-left, a round avatar at the top-right. Browser URL bar "brightleaf.odoo.com/odoo/...", tab title "Odoo".
- Odoo user form: fields Name and Email/Login at the top, tabs "Access Rights | Preferences | Account Security"; on Access Rights, a list of apps with a dropdown each (Inventory, Purchase, Sales, Accounting / Invoicing, Employees, Administration). A gear/"Action" menu at the top with "Change Password".
- Private window: same browser frame but with a dark charcoal tab bar and a small "Private" badge.
- n8n-style workflow app (simplified look-alike): left sidebar (Overview, Credentials, Executions), dark grey dotted canvas, rounded square nodes with an icon and label, grey connector lines with animated dots when data flows, a right-side panel for node settings, an orange "Test workflow" button, an Executions tab. Browser URL bar "brightleaf.app.n8n.cloud/...", tab title "n8n".
- Credential editor: a modal with labelled fields (URL, Database, Username, Password or API Key shown as dots), a "Save" button and a green banner "Connection tested successfully".
- Claude/ChatGPT-style chat panel inside n8n for "Stocky – Chat": user bubbles on the right, Stocky's answers on the left.

DATA TO SHOW (copy exactly; do not change any number, name, URL or wording)
Before: Odoo top-right avatar label "Mitchell Admin". n8n credential "Odoo – BrightLeaf" with Username: admin (the administrator login), key shown as ••••••••••••••••a91b.
ON-SCREEN TEXT: Least privilege = give the agent ONLY the access it needs to do its job. Nothing more.
Door diagram: Inventory (open, green) | Purchase (open, green) | Sales, Accounting, Employees, Settings (locked, grey)
New user: Settings -> Users & Companies -> Users -> New | Name: Stocky Bot | Email/Login: stocky.bot@brightleaf.example
Mock RFQ chatter line (preview): "Created by Stocky Bot"
Access Rights: Inventory = User | Purchase = User | Sales = (blank) | Accounting / Invoicing = (blank) | Employees = (blank) | Administration = (blank) -> Save
Action menu -> Change Password -> long password shown as •••••••••••••••••••• -> Change Password
Note chip: "Paid Odoo plan: an extra user may cost a licence seat. Trial: free."
Purchase -> Configuration -> Settings -> tick "Purchase Order Approval" -> Minimum amount: 5,000 -> Save
Two-locks diagram: Lock 1 "Sarah's email approval" + Lock 2 "Odoo Purchase manager approval for orders above $5,000"
Private window login: stocky.bot@brightleaf.example -> avatar -> My Profile -> Account Security tab -> New API Key -> confirm password (dots) -> Description: n8n-Stocky-2026-11 -> Generate Key
Key dialog: "Here is your new API key. Copy it now: you won't see it again." Key: ••••••••••••••••••••••••7c2e (masked) with a "Copy" button.
n8n: Overview -> Credentials -> "Odoo – BrightLeaf" -> Username: stocky.bot@brightleaf.example -> Password or API Key: ••••••••••••••••7c2e -> Save -> "Connection tested successfully" -> rename to "Odoo – Stocky Bot (LIVE)"
Workflows using this credential: Stocky – Chat | Stocky – Daily Reorder Check | Stocky – Supplier Risk Check | Stocky – Monday Report
Chat test (typed): Show me last month's sales invoices.
Stocky reply: "I don't have access to sales or accounting data. I can help with stock levels, products and purchase orders."
API keys and passwords are NEVER shown in full: always as dots with only the last 4 characters, e.g. ••••••••••••••••7c2e.

TIMELINE (scene by scene; times are relative to the section start; format: time | what appears / cursor action | callout or caption text)
1. 00:00–00:08 | Odoo home (admin). The avatar label "Mitchell Admin" at the top-right gets a yellow box. | Callout: "Logged in as the administrator"
2. 00:08–00:18 | Cut to n8n Credentials: the "Odoo – BrightLeaf" credential is open; Username "admin" glows amber. | Callout: "Stocky has been using Sarah's admin account"
3. 00:18–00:32 | Illustration slides in: a big master key unlocking a row of six doors (Inventory, Purchase, Sales, Accounting, Employees, Settings) vs. a hotel key card that only opens two. | Callout: "An API key is a hotel key card: it should open only the doors it needs"
4. 00:32–00:37 | Hold the illustration. | Caption (ON-SCREEN TEXT): "Least privilege = give the agent ONLY the access it needs to do its job. Nothing more."
5. 00:37–00:48 | The six doors re-arrange: Inventory and Purchase turn green and open; Sales, Accounting, Employees, Settings turn grey with padlocks. | Callout: "Read stock, create RFQs. That's it."
6. 00:48–00:56 | Back to Odoo. Cursor clicks Settings -> Users & Companies -> Users, then "New". | Callout: "Settings > Users & Companies > Users > New"
7. 00:56–01:06 | Name typed "Stocky Bot"; Email/Login typed "stocky.bot@brightleaf.example". | No callout
8. 01:06–01:12 | A small preview card pops in at the right: an RFQ chatter line "Created by Stocky Bot". | Callout: "Anyone can see a machine made it"
9. 01:12–01:22 | Cursor clicks the "Access Rights" tab; Inventory dropdown -> "User"; Purchase dropdown -> "User". | Callout: "The most important screen in this video"
10. 01:22–01:34 | Zoom 1.4 on the list: Sales, Accounting / Invoicing, Employees, Administration stay blank; a small grey padlock appears next to each. | Callout: "Everything else: blank"
11. 01:34–01:40 | Cursor clicks Save (breadcrumb shows "Stocky Bot"). | Callout: "The rule isn't just in the prompt. It's in the lock."
12. 01:40–01:52 | Cursor opens the gear/Action menu -> Change Password; a dialog opens; a long password fills in as dots; cursor clicks "Change Password". | No callout
13. 01:52–01:57 | A note chip appears at the top-right. | Callout: "Paid plan: an extra user may cost a seat. Trial: free."
14. 01:57–02:08 | Cursor goes to Purchase -> Configuration -> Settings, ticks "Purchase Order Approval", types 5,000 in Minimum amount, clicks Save. | Callout: "Orders above $5,000 need a Purchase manager"
15. 02:08–02:25 | Two-locks diagram slides in: one door with two padlocks labelled "Sarah's email approval" and "Odoo approval above $5,000". | Callout: "Two locks on the same door: the answer to '10,000 boxes'"
16. 02:25–02:33 | A private window opens (dark tab bar, "Private" badge). Login typed as stocky.bot@brightleaf.example; password as dots; Log in. | Callout: "Private window = log in as the bot"
17. 02:33–02:45 | Avatar -> My Profile -> Account Security tab -> "New API Key"; confirm password (dots); Description typed "n8n-Stocky-2026-11"; click "Generate Key". | Callout: "Name it: where it's used + when it was made"
18. 02:45–02:51 | The key dialog shows the masked key; cursor clicks "Copy" (button turns to "Copied"). | Amber callout: "Odoo shows it only once"
19. 02:51–03:03 | n8n Credentials: "Odoo – BrightLeaf" opens; Username replaced with stocky.bot@brightleaf.example; key field pasted (dots ending 7c2e); Save; green banner "Connection tested successfully". | Callout: "Green tick"
20. 03:03–03:14 | Credential renamed "Odoo – Stocky Bot (LIVE)". Overlay: four workflow chips connect by lines to this one credential and all turn green together. | Callout: "All four workflows switched in one move"
21. 03:14–03:20 | Open "Stocky – Chat"; the question is typed in the chat box and sent. | Callout: "Test the lock"
22. 03:20–03:29 | Stocky's reply appears; a padlock icon pops beside it. | Callout: "Not because it chose to behave: the door is locked"
23. 03:29–03:30 | END card | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
(00:00) Here's a confession. Until now, Stocky has been logging into Odoo with Sarah's administrator account. That was fine for learning. For going live, it's like giving the new intern the master key to every room in the building, including the finance office and the CEO's safe. ... an API key is a hotel key card. It should open only the doors it needs.
(00:32) This idea has a name: least privilege. Stocky needs to read products and stock, and create RFQs. That's it. It doesn't need Sales, Accounting, Employees, or Settings. So let's create a dedicated user.
(00:48) I go to Settings, Users and Companies, Users, and click New. Name: Stocky Bot. Login: stocky dot bot at brightleaf. Naming it "Bot" matters. When anyone looks at an RFQ in six months and sees "Created by Stocky Bot", they instantly know a machine made it, not Sarah.
(01:12) Now the Access Rights tab, the most important screen in this video. Inventory: User. Purchase: User. Everything else: blank. ... If someone ever tricked Stocky into "show me everyone's salaries" or "delete all customers", Odoo itself would say no. The rule isn't just in the prompt. It's in the lock.
(01:40) I give the bot a long password from the Action menu. On a paid Odoo plan, an extra user may cost a licence seat... On your trial, it's free.
(01:57) One more safety net while we're here. In Purchase, Configuration, Settings, I tick "Purchase Order Approval" and set the minimum to 5,000 dollars. ... Two locks on the same door. That answers Mr. Harrison's "10,000 boxes" question.
(02:25) Now the bot's own key card. In a private window, I log in as Stocky Bot, click the avatar, My Profile, Account Security, New API Key. I name it "n8n Stocky 2026-11" ... Generate, and copy it. Odoo shows it only once.
(02:51) In n8n, I open Credentials, edit the Odoo credential, swap the username to the bot and paste the new key. Save. Green tick, connection tested. And because every Stocky workflow uses this one credential, they've all switched to the safe key card in one move.
(03:14) Let's test the lock. I ask Stocky for last month's sales invoices. And it can't. Not because it chose to behave, but because the door is locked. That's what safe looks like.

CHECKLIST
- Total duration exactly 3 min 30 s (210 s), with every scene at the times listed above.
- Access Rights show Inventory = User and Purchase = User, all other apps blank.
- Every key and password is masked (dots + last 4 characters only); no full key appears anywhere.
- Names match exactly: Stocky Bot, stocky.bot@brightleaf.example, n8n-Stocky-2026-11, Odoo – Stocky Bot (LIVE), minimum amount 5,000.
- The ON-SCREEN TEXT caption is shown for about 5 seconds.
- Start button, hover Pause/Restart controls, progress bar and the 1-second END card are present.
- Nothing overflows the 1920x1080 stage, and every callout sits beside (not on top of) what it explains.
```

**After Claude builds it:**

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*421 words, about 2 min 48 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Here's a confession. Until now, Stocky has been logging into Odoo with Sarah's administrator account. That was fine for learning. For going live, it's like giving the new intern the master key to every room in the building, including the finance office and the CEO's safe. Remember our analogy: an API key is a hotel key card. It should open only the doors it needs.

This idea has a name: least privilege. Stocky needs to read products and stock, and create RFQs. That's it. It doesn't need Sales, Accounting, Employees, or Settings. So let's create a dedicated user.

I go to Settings, Users and Companies, Users, and click New. Name: Stocky Bot. Login: stocky dot bot at brightleaf. Naming it "Bot" matters. When anyone looks at an RFQ in six months and sees "Created by Stocky Bot", they instantly know a machine made it, not Sarah.

Now the Access Rights tab, the most important screen in this video. Inventory: User. Purchase: User. Everything else: blank. No Sales, no Accounting, no Administration. If someone ever tricked Stocky into "show me everyone's salaries" or "delete all customers", Odoo itself would say no. The rule isn't just in the prompt. It's in the lock.

I give the bot a long password from the Action menu. On a paid Odoo plan, an extra user may cost a licence seat, so check with whoever manages Odoo. On your trial, it's free.

One more safety net while we're here. In Purchase, Configuration, Settings, I tick "Purchase Order Approval" and set the minimum to 5,000 dollars. Now any order above that needs a Purchase manager to approve it inside Odoo, on top of Sarah's email approval. Two locks on the same door. That answers Mr. Harrison's "10,000 boxes" question.

Now the bot's own key card. In a private window, I log in as Stocky Bot, click the avatar, My Profile, Account Security, New API Key. I name it "n8n Stocky 2026-11", so I know where it's used and when it was made. Generate, and copy it. Odoo shows it only once.

In n8n, I open Credentials, edit the Odoo credential, swap the username to the bot and paste the new key. Save. Green tick, connection tested. And because every Stocky workflow uses this one credential, they've all switched to the safe key card in one move.

Let's test the lock. I ask Stocky for last month's sales invoices. And it can't. Not because it chose to behave, but because the door is locked. That's what safe looks like.
```
<!-- VOICEOVER END -->

- Check the masked keys in the preview before recording; a viewer should never be able to read a key.
- If the Odoo menus move too fast, reply "hold each opened menu for 1 second before clicking".

---

## Prompt 2 of 6: Step 2: Protect Your Keys and Control Your Costs (05:30–08:30, 3 min 0 s)

**What this demo shows:** The three key rules (never share, rotate, delete on leak) with a live key rotation, a $20 monthly AI spend limit with a $10 alert, Max Iterations = 10, and the Monthly Cost Estimator showing about $5 of AI per month.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. This section teaches how to keep API keys safe (never share, rotate every 90 days, delete on leak) and how to cap costs (AI spend limit, Max Iterations) and estimate the monthly running cost of an agent.

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

SECTION LENGTH: exactly 3 min 0 s (180 seconds). The master timeline runs from 00:00 to 03:00; the END card fills 02:59–03:00.

APP LOOK
- Slide look for the rules: white card, navy title Inter Bold 56px, list items with red cross icons, simple flat illustrations (key card, vault, calendar).
- Odoo-style ERP (simplified look-alike, no real logo): purple-ish top bar (#714B67) with the app name, a left breadcrumb, list views with a checkbox column, form views with a status bar at the top-right, a "New" button top-left, a round avatar at the top-right. Browser URL bar "brightleaf.odoo.com/odoo/...", tab title "Odoo".
- n8n-style workflow app (simplified look-alike): left sidebar (Overview, Credentials, Executions), dark grey dotted canvas, rounded square nodes with an icon and label, grey connector lines with animated dots when data flows, a right-side panel for node settings, an orange "Test workflow" button, an Executions tab. Browser URL bar "brightleaf.app.n8n.cloud/...", tab title "n8n".
- Credential editor: a modal with labelled fields (URL, Database, Username, Password or API Key shown as dots), a "Save" button and a green banner "Connection tested successfully".
- Anthropic Console style (simplified, no real logo): a simple developer console page with a left menu (Dashboard, API Keys, Usage, Settings) and a Settings page with a "Limits" tab: fields "Monthly spend limit (USD)" and "Email notification at (USD)", a "Save" button. URL bar "console.anthropic.com/settings/limits".
- Excel-style spreadsheet for "V10_Activity_GoLive_Checklist_ROI.xlsx", sheet tab "Monthly Cost Estimator" active.

DATA TO SHOW (copy exactly; do not change any number, name, URL or wording)
Rule 1 slide title: "Rule 1: Never share keys"
"Never put a key in:" email | WhatsApp | Slack | a screenshot | a Google Sheet | a prompt | a Loom video
Vault label: "n8n Credentials (encrypted)" ; callout "See a key in a chat message? Treat it as stolen."
Rule 2: "Rotate: every 90 days, or the same day someone with access leaves the team. Takes 5 minutes."
Rotation in Odoo (as Stocky Bot): Account Security -> New API Key -> Description: n8n-Stocky-2027-02 -> Generate Key -> key ••••••••••••••••••••••••4d81 (masked) -> Copy
n8n credential "Odoo – Stocky Bot (LIVE)": paste (••••••••••••••••4d81) -> Save -> "Connection tested successfully"
Odoo API keys list: n8n-Stocky-2026-11 (trash icon clicked, row removed) | n8n-Stocky-2027-02 (stays)
Rule 3: "Key leaked? Delete it in Odoo immediately and make a new one. A deleted key card opens nothing."
Pro tip chip: "Calendar reminder: 'Rotate Stocky keys' every 90 days"
Anthropic Console: Settings -> Limits -> Monthly spend limit = $20 | Email notification at = $10 -> Save
Side card: "OpenAI: platform.openai.com -> Settings -> Limits -> monthly budget + alert"
n8n AI Agent node -> Add Option -> Max Iterations = 10
Monthly Cost Estimator:
| Workflow | Runs per month | AI cost per run | Monthly AI cost |
| Daily Reorder Check | 30 | $0.03 | $0.90 |
| Supplier Risk Check | 30 | $0.03 | $0.90 |
| Monday Report | 4 | $0.08 | $0.32 |
| Chat questions (Sarah + Tom) | 150 | $0.02 | $3.00 |
| Error alerts (no AI) | 5 | $0.00 | $0.00 |
| Total | 219 runs | | $5.12 |
All-in card: "AI about $5 + n8n Cloud starter about $20-25 (at time of recording) + Google Sheets & Gmail $0 = about $32 / month". Small grey note: "Prices change: check the pricing pages."
API keys and passwords are NEVER shown in full: always as dots with only the last 4 characters, e.g. ••••••••••••••••7c2e.

TIMELINE (scene by scene; times are relative to the section start; format: time | what appears / cursor action | callout or caption text)
1. 00:00–00:12 | Rule 1 slide: title appears, then the seven "never put a key in" items pop in one by one, each with a red cross. | No callout
2. 00:12–00:26 | A key-card icon floats in and drops into a vault labelled "n8n Credentials (encrypted)"; the vault door closes. | Callout: "See a key in a chat message? Treat it as stolen."
3. 00:26–00:43 | Rule 2 slide: a hotel key card swaps for a new one; a calendar flips to "every 90 days" with a second tag "or the day someone leaves". | Callout: "Takes five minutes"
4. 00:43–00:50 | Odoo as Stocky Bot, Account Security: "New API Key"; description typed "n8n-Stocky-2027-02"; Generate; masked key; Copy. | Callout: "1 New key first"
5. 00:50–00:58 | n8n credential: key field cleared and pasted (dots ending 4d81); Save; green "Connection tested successfully". | Callout: "2 Paste, save, test"
6. 00:58–01:07 | Back to Odoo: the API keys list shows two rows; cursor clicks the trash icon next to n8n-Stocky-2026-11; the row fades out. | Callout: "3 Old one last, so Stocky never goes offline"
7. 01:07–01:13 | Rule 3 slide: a key card with a red "LEAKED" stamp is dragged into a bin; it shatters. | Callout: "A deleted key card opens nothing"
8. 01:13–01:18 | Hold. | Caption: "PRO TIP: Calendar reminder 'Rotate Stocky keys' every 90 days"
9. 01:18–01:26 | Browser on console.anthropic.com; cursor clicks Settings -> Limits. | Callout: "The AI brain charges by usage"
10. 01:26–01:42 | Cursor types 20 in Monthly spend limit and 10 in Email notification; clicks Save; green toast "Limits saved". | Callout: "Worst case: $20, not a nasty surprise"
11. 01:42–01:49 | A side card slides in with the OpenAI path. | Callout: "Same idea on OpenAI"
12. 01:49–02:09 | n8n: cursor opens the AI Agent node, Add Option -> Max Iterations, types 10. A small looping-arrow icon gets a stop sign. | Callout: "Caps tool uses per run: a confused intern can't run in circles"
13. 02:09–02:30 | The Monthly Cost Estimator sheet; the five workflow rows appear one by one as they are read. | No callout
14. 02:30–02:42 | The Total row highlights: 219 runs and $5.12 get yellow boxes. | Callout: "About 220 runs, about $5 of AI"
15. 02:42–02:56 | The all-in card slides in, adding up: AI ~$5 + n8n starter ~$20-25 + Sheets & Gmail $0 = ~$32 / month; the grey "Prices change" note fades in under it. | Callout: "Less than a team lunch"
16. 02:56–02:59 | Hold. | No callout
17. 02:59–03:00 | END card | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
(00:00) Three rules for keys. Rule one: never share them. Not in email, not on WhatsApp, not in a screenshot, not pasted into a prompt. A key lives in exactly one place: n8n Credentials, which stores it encrypted. If you ever see a key in a chat message, treat it as stolen.
(00:26) Rule two: rotate them. Hotels change key cards when a guest leaves; you change API keys every ninety days, or the same day someone with access leaves the team. It takes five minutes.
(00:43) Here's the five-minute rotation. Make a new key, paste it into the n8n credential, save, test. Green tick. Only then do I go back to Odoo and delete the old key with the little trash icon. New one first, old one last, so Stocky never goes offline.
(01:07) Rule three: if a key leaks, delete it immediately in Odoo and make a new one. A deleted key card opens nothing.
(01:18) Now money. The AI brain charges by usage, a tiny amount per question. Tiny, unless something loops. So I go to the Anthropic Console, Settings, Limits, and set a monthly spend limit of twenty dollars, with an email alert at ten. On OpenAI it's the same idea under Settings, Limits. Now the worst case is twenty dollars, not a nasty surprise.
(01:49) Inside n8n, the AI Agent node has an option called Max Iterations. It caps how many times the agent can use a tool in one run. I set it to ten. A confused intern can't run in circles forever.
(02:09) So what does Stocky cost per month? Here's the estimator from your activity file. Daily reorder check, thirty runs. Risk check, thirty. Monday report, four. About a hundred and fifty chat questions from Sarah and Tom. That's around 220 runs a month. AI cost: about five dollars. Add n8n Cloud's starter plan, roughly twenty to twenty-five dollars a month at the time of recording, and Google Sheets and Gmail are free. Call it thirty-two dollars a month, all in. Prices change... but the order of magnitude is: less than a team lunch.

CHECKLIST
- Total duration exactly 3 min 0 s (180 s), with every scene at the times listed above.
- All cost table numbers match the DATA block ($0.90, $0.90, $0.32, $3.00, $0.00; 219 runs; $5.12).
- Spend limit $20, alert $10, Max Iterations 10.
- Key rotation order is visible: new key created, pasted and tested BEFORE the old key is deleted.
- Every key is masked (dots + last 4 characters).
- Start button, hover Pause/Restart controls, progress bar and the 1-second END card are present.
- Nothing overflows the 1920x1080 stage, and every callout sits beside (not on top of) what it explains.
```

**After Claude builds it:**

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*351 words, about 2 min 20 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Three rules for keys. Rule one: never share them. Not in email, not on WhatsApp, not in a screenshot, not pasted into a prompt. A key lives in exactly one place: n8n Credentials, which stores it encrypted. If you ever see a key in a chat message, treat it as stolen.

Rule two: rotate them. Hotels change key cards when a guest leaves; you change API keys every ninety days, or the same day someone with access leaves the team. It takes five minutes.

Here's the five-minute rotation. Make a new key, paste it into the n8n credential, save, test. Green tick. Only then do I go back to Odoo and delete the old key with the little trash icon. New one first, old one last, so Stocky never goes offline.

Rule three: if a key leaks, delete it immediately in Odoo and make a new one. A deleted key card opens nothing.

Now money. The AI brain charges by usage, a tiny amount per question. Tiny, unless something loops. So I go to the Anthropic Console, Settings, Limits, and set a monthly spend limit of twenty dollars, with an email alert at ten. On OpenAI it's the same idea under Settings, Limits. Now the worst case is twenty dollars, not a nasty surprise.

Inside n8n, the AI Agent node has an option called Max Iterations. It caps how many times the agent can use a tool in one run. I set it to ten. A confused intern can't run in circles forever.

So what does Stocky cost per month? Here's the estimator from your activity file. Daily reorder check, thirty runs. Risk check, thirty. Monday report, four. About a hundred and fifty chat questions from Sarah and Tom. That's around 220 runs a month. AI cost: about five dollars. Add n8n Cloud's starter plan, roughly twenty to twenty-five dollars a month at the time of recording, and Google Sheets and Gmail are free. Call it thirty-two dollars a month, all in. Prices change, so always check the pricing pages, but the order of magnitude is: less than a team lunch.
```
<!-- VOICEOVER END -->

- The Anthropic Console screen is a simplified look-alike; if your real console looks different, that's fine for teaching.
- If the cost table is too small, ask Claude to "zoom to 1.3 on the table while rows appear".

---

## Prompt 3 of 6: Step 3: Test First, Then Catch Errors (10:00–13:30, 3 min 30 s)

**What this demo shows:** Duplicating the Odoo database "For testing purposes", adding a TEST credential, building a "Stocky – Error Alerts" workflow (Error Trigger + Gmail), connecting it to every workflow, and proving it with a deliberate failure email.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. This section teaches two going-live habits: practise on a test copy of the database (with clearly named LIVE and TEST credentials), and set up an Error Trigger workflow that emails the owner whenever any workflow fails.

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

SECTION LENGTH: exactly 3 min 30 s (210 seconds). The master timeline runs from 00:00 to 03:30; the END card fills 03:29–03:30.

APP LOOK
- odoo.com "My Databases" page (simplified, no real logo): a list of database cards with a name, URL and a gear/three-dot menu containing "Duplicate"; the Duplicate dialog has a "New name" field, a checkbox "For testing purposes" and a "Continue" button.
- n8n-style workflow app (simplified look-alike): left sidebar (Overview, Credentials, Executions), dark grey dotted canvas, rounded square nodes with an icon and label, grey connector lines with animated dots when data flows, a right-side panel for node settings, an orange "Test workflow" button, an Executions tab. Browser URL bar "brightleaf.app.n8n.cloud/...", tab title "n8n".
- Credential editor: a modal with labelled fields (URL, Database, Username, Password or API Key shown as dots), a "Save" button and a green banner "Connection tested successfully".
- Workflow Settings dialog (from the "..." menu): an "Error Workflow" dropdown and a "Save" button.
- Gmail-style inbox for sarah@brightleaf.example: email list and an open email (no real logos).

DATA TO SHOW (copy exactly; do not change any number, name, URL or wording)
My Databases: brightleaf (brightleaf.odoo.com) -> gear -> Duplicate -> New name: brightleaf-test -> tick "For testing purposes" -> Continue -> new card "brightleaf-test (brightleaf-test.odoo.com)" with a "Test" tag
Checkbox callout: "Switches off outgoing emails and scheduled jobs in the copy"
ON-SCREEN TEXT: LIVE database = real money. TEST database = your sandbox. You can't break anything in the test system.
TEST credential: Create Credential -> Odoo | URL: https://brightleaf-test.odoo.com | Database: brightleaf-test | Username: stocky.bot@brightleaf.example | API key: ••••••••••••••••b3e0 (from the test copy) | Name: Odoo – Stocky Bot (TEST)
Credentials list afterwards: "Odoo – Stocky Bot (LIVE)" (green tag LIVE) | "Odoo – Stocky Bot (TEST)" (amber tag TEST)
Beginner mistake caption: "BEGINNER MISTAKE: Naming credentials 'Odoo' and 'Odoo 2'. Always write LIVE or TEST."
Failure reasons card: "The Odoo trial expires · A password changes · Google has a bad day"
New workflow: Stocky – Error Alerts | first node: Error Trigger
Gmail node: Send | To: sarah@brightleaf.example | Subject: ALERT: Stocky failed – {{ $json.workflow.name }} | Email Type: HTML | Message:
<p><b>Stocky hit a problem.</b></p>
<p>Workflow: {{ $json.workflow.name }}<br>
Step that failed: {{ $json.execution.lastNodeExecuted }}<br>
Error: {{ $json.execution.error.message }}<br>
Time: {{ $now.toFormat('dd LLL yyyy HH:mm') }}</p>
<p><a href="{{ $json.execution.url }}">Open this run in n8n</a></p>
<p>Nothing was ordered in this run. Check the step above, fix, and re-run.</p>
Connect: "Stocky – Daily Reorder Check" -> ... -> Settings -> Error Workflow = Stocky – Error Alerts -> Save; repeat for Stocky – Chat, Stocky – Supplier Risk Check, Stocky – Monday Report
Note card: "The Error Trigger only fires for automatic runs, not when you click 'Test'."
Test copy: "Stocky – Daily Reorder Check (TEST)" using credential "Odoo – Stocky Bot (TEST)" with a deliberately wrong key (••••••••••••••••XXXX, red "wrong on purpose" tag); Schedule Trigger temporarily = every 1 minute; Active on
Failing node: "Get Products" (turns red)
Received email: Subject "ALERT: Stocky failed – Stocky – Daily Reorder Check (TEST)"; body: "Stocky hit a problem." / Workflow: Stocky – Daily Reorder Check (TEST) / Step that failed: Get Products / Error: Access Denied / Time: 16 Nov 2026 10:21 / link "Open this run in n8n" / "Nothing was ordered in this run. Check the step above, fix, and re-run."
API keys and passwords are NEVER shown in full: always as dots with only the last 4 characters, e.g. ••••••••••••••••7c2e.

TIMELINE (scene by scene; times are relative to the section start; format: time | what appears / cursor action | callout or caption text)
1. 00:00–00:08 | odoo.com My Databases page with the "brightleaf" card. | Callout: "Rule one: never practise on the real thing"
2. 00:08–00:16 | Cursor clicks the gear next to brightleaf -> "Duplicate"; the dialog opens. | No callout
3. 00:16–00:24 | Cursor types "brightleaf-test" in New name and ticks "For testing purposes". | No callout
4. 00:24–00:33 | Zoom 1.5 on the checkbox; then cursor clicks Continue and a new "brightleaf-test" card slides in with a "Test" tag. | Callout: "Switches off outgoing emails and scheduled jobs in the copy"
5. 00:33–00:38 | Hold on the two cards side by side. | Caption (ON-SCREEN TEXT): "LIVE database = real money. TEST database = your sandbox."
6. 00:38–00:58 | n8n Credentials -> Create Credential -> Odoo; the fields are typed: URL, Database, Username; the API key pasted (dots); name typed "Odoo – Stocky Bot (TEST)"; Save; green test banner. | Callout on the name: "TEST in capital letters"
7. 00:58–01:07 | The credentials list shows LIVE (green tag) and TEST (amber tag) side by side; an arrow shows "new things -> TEST, then LIVE when it passes". | Callout: "Two credentials: LIVE and TEST"
8. 01:07–01:13 | Hold. | Caption: "BEGINNER MISTAKE: Never 'Odoo' and 'Odoo 2'. Always write LIVE or TEST."
9. 01:13–01:28 | A small card with three failure reasons pops in, each with an amber warning icon; then a red alarm-bell icon rings gently. | Callout: "Failures are normal. Hearing it from Mr. Harrison is not."
10. 01:28–01:40 | Overview -> Create Workflow -> name typed "Stocky – Error Alerts" -> Add first step -> search "Error Trigger" -> added. | Callout: "The smoke alarm: rings when any other workflow fails"
11. 01:40–02:00 | A Gmail node is added: Send; To typed; Subject typed; Email Type = HTML; Message pasted. | No callout
12. 02:00–02:22 | Zoom 1.4 on the message; lines highlight in turn: Workflow, Step that failed, Error, Time, the "Open this run in n8n" link. | Callout: "Plain English, one click to investigate"
13. 02:22–02:32 | Save. Open "Stocky – Daily Reorder Check" -> "..." -> Settings -> Error Workflow dropdown -> "Stocky – Error Alerts" -> Save. | Callout: "Connect the alarm"
14. 02:32–02:41 | A checklist card ticks four workflows one by one: Daily Reorder Check, Chat, Supplier Risk Check, Monday Report. | Callout: "Four workflows, about one minute"
15. 02:41–02:50 | Note card slides in. | Callout: "Error Trigger only fires for automatic runs, not 'Test'"
16. 02:50–03:02 | The test copy opens: credential TEST with the wrong key (red tag); Schedule Trigger changed to every 1 minute; the Active toggle turns on. | Callout: "Break the key on purpose, run every minute"
17. 03:02–03:08 | A countdown ring sweeps from 60 s to 0 (fast); the "Get Products" node turns red with an error badge. | No callout
18. 03:08–03:20 | Switch to Sarah's inbox: the ALERT email arrives at the top (red subject); cursor opens it; "Get Products" and "Access Denied" get yellow boxes. | Callout: "Exactly which step failed, and why"
19. 03:20–03:29 | Back in n8n: the Active toggle is switched off and the key field is re-pasted (dots, now ending b3e0); a green tick. | Caption: "Sarah hears about problems before anyone else does."
20. 03:29–03:30 | END card | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
(00:00) Rule one of going live: never practise on the real thing. On odoo.com, under My Databases, I click the gear next to BrightLeaf and choose Duplicate. I name it "brightleaf test" and tick "For testing purposes". That checkbox is important. It switches off outgoing emails and scheduled jobs in the copy, so a test can't accidentally email a real supplier.
(00:39) In n8n, I make a second Odoo credential pointing at the test copy, and I put TEST in capital letters in its name. So now we have two: LIVE and TEST. Whenever I'm trying something new, the workflow points at TEST. Only when it passes do I switch it to LIVE.
(01:13) Now the smoke alarm. Things will fail sometimes. The Odoo trial expires, a password changes, Google is having a bad day. That's normal. What's not okay is finding out from Mr. Harrison on Monday that the report never came. So I create a new workflow called "Stocky – Error Alerts" and add an Error Trigger. This doorbell rings whenever any other workflow fails.
(01:54) Then a Gmail node to Sarah. The subject says "ALERT: Stocky failed", plus the workflow name. The message tells her which step failed, the error message, the time, and a link straight to that run in n8n. Plain English, one click to investigate.
(02:22) Now I connect the alarm to every Stocky workflow. In each one, the three-dot menu, Settings, Error Workflow, pick "Stocky – Error Alerts", Save. Four workflows, about one minute.
(02:41) Let's prove it works. One detail: the Error Trigger only fires for automatic runs, not when you click "Test". So on my test copy, I break the key on purpose, set the schedule to every minute, and activate it. A minute later, Sarah's inbox: "ALERT: Stocky failed. Step that failed: Get Products. Error: Access Denied." Perfect. I switch it off and fix the key. Now Sarah hears about problems before anyone else does.

CHECKLIST
- Total duration exactly 3 min 30 s (210 s), with every scene at the times listed above.
- Names match exactly: brightleaf-test, Odoo – Stocky Bot (TEST), Stocky – Error Alerts, Get Products, Access Denied.
- The Gmail message HTML is shown exactly as in the DATA block.
- All keys are masked; the wrong key is shown masked with a red tag.
- The ON-SCREEN TEXT caption is shown for about 5 seconds.
- Start button, hover Pause/Restart controls, progress bar and the 1-second END card are present.
- Nothing overflows the 1920x1080 stage, and every callout sits beside (not on top of) what it explains.
```

**After Claude builds it:**

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*319 words, about 2 min 08 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Rule one of going live: never practise on the real thing. On odoo.com, under My Databases, I click the gear next to BrightLeaf and choose Duplicate. I name it "brightleaf test" and tick "For testing purposes". That checkbox is important. It switches off outgoing emails and scheduled jobs in the copy, so a test can't accidentally email a real supplier.

In n8n, I make a second Odoo credential pointing at the test copy, and I put TEST in capital letters in its name. So now we have two: LIVE and TEST. Whenever I'm trying something new, the workflow points at TEST. Only when it passes do I switch it to LIVE.

Now the smoke alarm. Things will fail sometimes. The Odoo trial expires, a password changes, Google is having a bad day. That's normal. What's not okay is finding out from Mr. Harrison on Monday that the report never came. So I create a new workflow called "Stocky – Error Alerts" and add an Error Trigger. This doorbell rings whenever any other workflow fails.

Then a Gmail node to Sarah. The subject says "ALERT: Stocky failed", plus the workflow name. The message tells her which step failed, the error message, the time, and a link straight to that run in n8n. Plain English, one click to investigate.

Now I connect the alarm to every Stocky workflow. In each one, the three-dot menu, Settings, Error Workflow, pick "Stocky – Error Alerts", Save. Four workflows, about one minute.

Let's prove it works. One detail: the Error Trigger only fires for automatic runs, not when you click "Test". So on my test copy, I break the key on purpose, set the schedule to every minute, and activate it. A minute later, Sarah's inbox: "ALERT: Stocky failed. Step that failed: Get Products. Error: Access Denied." Perfect. I switch it off and fix the key. Now Sarah hears about problems before anyone else does.
```
<!-- VOICEOVER END -->

- The "one minute later" wait is compressed into a 6-second countdown; say "a minute later" in the voice-over as written.
- If the alert email is hard to read, ask Claude to "zoom the open email to 1.4 when it arrives".

---

## Prompt 4 of 6: Step 4: Go Live: Activate, Version, Maintain (13:30–16:00, 2 min 30 s)

**What this demo shows:** Activating the workflows (Error Alerts first), making a dated BACKUP copy and a download into "Stocky Backups", checking the Executions tab for errors, and the 8-point Friday maintenance checklist.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. This section teaches how to go live safely: switch workflows to Active in the right order, back up before every edit, and run a 10-minute weekly maintenance check.

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

SECTION LENGTH: exactly 2 min 30 s (150 seconds). The master timeline runs from 00:00 to 02:30; the END card fills 02:29–02:30.

APP LOOK
- n8n-style workflow app (simplified look-alike): left sidebar (Overview, Credentials, Executions), dark grey dotted canvas, rounded square nodes with an icon and label, grey connector lines with animated dots when data flows, a right-side panel for node settings, an orange "Test workflow" button, an Executions tab. Browser URL bar "brightleaf.app.n8n.cloud/...", tab title "n8n".
- Credential editor: a modal with labelled fields (URL, Database, Username, Password or API Key shown as dots), a "Save" button and a green banner "Connection tested successfully".
- n8n Overview list: one row per workflow with name, "Last updated" and an Active toggle at the right (grey = inactive, green = active).
- Google Drive-style folder view (simplified, no real logo) for the folder "Stocky Backups".
- Excel-style spreadsheet "V10_Activity_GoLive_Checklist_ROI.xlsx", sheet tab "Weekly Maintenance" active.

DATA TO SHOW (copy exactly; do not change any number, name, URL or wording)
Workflows (Overview list, all Inactive at the start): Stocky – Error Alerts | Stocky – Daily Reorder Check | Stocky – Supplier Risk Check | Stocky – Monday Report | Stocky – Chat
Activation order: 1 Stocky – Error Alerts, 2 Daily Reorder Check, 3 Supplier Risk Check, 4 Monday Report, 5 Chat
Toggle note: "Newer n8n: the button is called Publish"
Backup: open "Stocky – Daily Reorder Check" -> ... -> Duplicate -> name: Stocky – Daily Reorder Check – BACKUP 2026-11-16 (left Inactive)
Download: ... -> Download -> file "Stocky - Daily Reorder Check.json" saved into Google Drive folder "Stocky Backups"
ON-SCREEN TEXT: Golden rule: Duplicate -> edit the copy on TEST -> test -> then swap. Never edit the live workflow directly.
Pro tip chip: "Some plans: Workflow history (clock icon). A dated backup works on every plan."
Executions tab: filter Status: Error -> empty state "No executions found" + chip "0 errors this week"
Weekly Maintenance sheet:
| # | Friday check (10 minutes) | Where |
| 1 | Any failed runs this week? | n8n -> Executions -> Status: Error |
| 2 | Did the Monday Report arrive and do the numbers match? | Gmail + Dashboard tab |
| 3 | Skim the Decision Log for anything odd | Google Sheet -> Decision Log |
| 4 | Spot-check 3 Stocky answers against Odoo | Stocky – Chat + Odoo Inventory |
| 5 | AI spend vs limit | Anthropic / OpenAI -> Usage |
| 6 | n8n runs used vs plan | n8n -> Usage |
| 7 | Rejected suggestions: should a rule change? | Decision Log, Action = Rejected |
| 8 | Key rotation due? | Calendar reminder (every 90 days) |

TIMELINE (scene by scene; times are relative to the section start; format: time | what appears / cursor action | callout or caption text)
1. 00:00–00:10 | n8n Overview with the five workflows, all toggles grey. | Callout: "Time to go live"
2. 00:10–00:18 | Zoom 1.4 on a toggle. | Callout: "A scheduled workflow only runs by itself when Active (newer n8n: Publish)"
3. 00:18–00:35 | Cursor flips the toggles one by one, starting with Stocky – Error Alerts (a small "1 Alarm first" badge pops on it), then Daily Reorder Check, Supplier Risk Check, Monday Report, Chat; each turns green with a soft pulse. | Callout on Error Alerts: "The alarm is on before anything else starts"
4. 00:35–00:47 | Open Stocky – Daily Reorder Check; "..." -> Duplicate; the name "Stocky – Daily Reorder Check – BACKUP 2026-11-16" is typed; the copy appears in the list with a grey (inactive) toggle. | Callout: "BACKUP + today's date. Leave it off."
5. 00:47–00:57 | "..." -> Download; a JSON file chip flies out and lands in a Google Drive folder "Stocky Backups". | Callout: "The whole recipe card in one small file"
6. 00:57–01:05 | A rewind icon spins next to the backup. | Callout: "Back to the working version in 30 seconds"
7. 01:05–01:10 | Hold. | Caption (ON-SCREEN TEXT): "Golden rule: Duplicate -> edit the copy on TEST -> test -> then swap. Never edit the live workflow directly."
8. 01:10–01:17 | A small clock icon at the top of the editor glows. | Callout: "Some plans keep Workflow history: nice, but a dated backup works on every plan"
9. 01:17–01:28 | A small car icon with a wrench and a chip "Every Friday, 10 minutes" slide in at the top-right. | Callout: "Not set and forget: more like a car"
10. 01:28–01:41 | Cursor clicks the Executions tab, opens the Status filter, picks "Error"; the empty state appears with a green chip "0 errors this week". | Callout: "Zero this week. Good."
11. 01:41–02:20 | The Weekly Maintenance sheet; rows 1 to 8 appear one by one (about 5 s each), each getting a green tick as it is read. | No callout (let the rows read)
12. 02:20–02:29 | Zoom 1.5 on row 7 "Rejected suggestions: should a rule change?"; a small example bubble: "Packing tape rejected again: a delivery is already coming -> add a rule". | Callout: "Every rejection is a lesson"
13. 02:29–02:30 | END card | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
(00:00) Time to go live. Here are all our workflows. In n8n, a workflow with a schedule only runs by itself when it's switched to Active. In newer versions this button is called Publish. I activate the Error Alerts first, so the alarm is on before anything else starts. Then the reorder check, the risk check, the Monday report and the chat.
(00:35) Now, versioning. Before you edit a workflow that's working, always make a copy. Three dots, Duplicate, and I name it with the word BACKUP and today's date. I leave the backup switched off. I also click Download, which saves the whole recipe card as one small file, and keep it in a Google Drive folder called "Stocky Backups". If an edit goes wrong, I can be back to the working version in thirty seconds.
(01:17) Last piece: maintenance. An agent isn't "set and forget". It's more like a car. A quick check every week keeps it running for years. Every Friday, Sarah spends ten minutes. First, the Executions tab, filter by Error. Zero this week. Good.
(01:41) Then the rest of the checklist. Did the Monday report arrive, and do the numbers match the dashboard? Skim the Decision Log. Ask Stocky three questions and check the answers in Odoo. Look at the AI spend and the n8n usage. And my favourite: look at what Sarah rejected this week. Every rejection is a lesson. If she keeps rejecting packing tape orders because a delivery is already coming, that's a rule to add to the prompt. That's how Stocky gets smarter every month.

CHECKLIST
- Total duration exactly 2 min 30 s (150 s), with every scene at the times listed above.
- Error Alerts is activated first, then the other four workflows.
- Backup name is exactly "Stocky – Daily Reorder Check – BACKUP 2026-11-16" and stays inactive.
- The Weekly Maintenance table shows all 8 rows exactly as in DATA.
- The ON-SCREEN TEXT caption is shown for about 5 seconds.
- Start button, hover Pause/Restart controls, progress bar and the 1-second END card are present.
- Nothing overflows the 1920x1080 stage, and every callout sits beside (not on top of) what it explains.
```

**After Claude builds it:**

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*260 words, about 1 min 44 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Time to go live. Here are all our workflows. In n8n, a workflow with a schedule only runs by itself when it's switched to Active. In newer versions this button is called Publish. I activate the Error Alerts first, so the alarm is on before anything else starts. Then the reorder check, the risk check, the Monday report and the chat.

Now, versioning. Before you edit a workflow that's working, always make a copy. Three dots, Duplicate, and I name it with the word BACKUP and today's date. I leave the backup switched off. I also click Download, which saves the whole recipe card as one small file, and keep it in a Google Drive folder called "Stocky Backups". If an edit goes wrong, I can be back to the working version in thirty seconds.

Last piece: maintenance. An agent isn't "set and forget". It's more like a car. A quick check every week keeps it running for years. Every Friday, Sarah spends ten minutes. First, the Executions tab, filter by Error. Zero this week. Good.

Then the rest of the checklist. Did the Monday report arrive, and do the numbers match the dashboard? Skim the Decision Log. Ask Stocky three questions and check the answers in Odoo. Look at the AI spend and the n8n usage. And my favourite: look at what Sarah rejected this week. Every rejection is a lesson. If she keeps rejecting packing tape orders because a delivery is already coming, that's a rule to add to the prompt. That's how Stocky gets smarter every month.
```
<!-- VOICEOVER END -->

- The maintenance table is the payoff: if the rows appear too fast, ask for "one row every 5 seconds".
- Trim any frames before the Overview list is fully visible.

---

## Prompt 5 of 6: The Go-Live Checklist & ROI Calculator (18:00–19:30, 1 min 30 s)

**What this demo shows:** The 25-item go-live checklist with its self-updating readiness % (72% to 76%), and the ROI calculator showing 480 hours and $9,600 a year for about $384 of tools.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. This section teaches how to use the go-live checklist (status dropdowns and a readiness percentage) and a simple ROI calculator (hours saved x hourly cost vs tool cost) as the heart of a one-page pitch.

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

SECTION LENGTH: exactly 1 min 30 s (90 seconds). The master timeline runs from 00:00 to 01:30; the END card fills 01:29–01:30.

APP LOOK
- Excel-style spreadsheet (simplified look-alike) inside the browser frame: green accent, formula bar, column letters, row numbers, sheet tabs at the bottom: "GoLive_Checklist" (active first), "ROI_Calculator", "Monthly_Cost_Estimator", "Weekly_Maintenance", "One_Page_Pitch". Browser tab and URL bar "V10_Activity_GoLive_Checklist_ROI.xlsx".
- Checklist sheet: a big header cell "Go-live readiness: 72%" with a horizontal progress bar; group bands in light blue (Access, Keys, Costs, Testing, Errors, Go-Live, Maintenance); Status cells with a small dropdown arrow; Done cells light green, In progress amber, Not started light grey.
- ROI sheet: input cells with yellow fill, output cells with green fill, large clear numbers.

DATA TO SHOW (copy exactly; do not change any number, name, URL or wording)
GoLive_Checklist rows (Group | Item | Priority | Status):
Access | Dedicated 'Stocky Bot' user created in Odoo | Must | Done
Access | Bot has ONLY Inventory: User + Purchase: User (all else blank) | Must | Done
Access | Purchase Order Approval above $5,000 switched on | Should | Done
Access | Readers have Viewer access; only n8n edits the Decision Log | Should | Done
Keys | Bot's own API key, named with purpose + date | Must | Done
Keys | Keys stored ONLY in n8n Credentials | Must | Done
Keys | 90-day key rotation reminder in calendar | Should | Done
Keys | No keys in emails, chats, screenshots, sheets, prompts or Looms | Must | Done
Costs | Monthly AI spend limit set ($20) | Must | Done
Costs | Spend alert email set ($10) | Should | Done
Costs | Max Iterations = 10 on every AI Agent node | Should | In progress
Costs | Monthly cost estimate done and shared | Should | Done
Testing | Test database duplicated 'For testing purposes' | Must | Done
Testing | Credentials clearly named LIVE and TEST | Must | Done
Testing | 10 test questions passed (8/10 or better) | Must | Done
Testing | Approval flow tested for BOTH approve and reject | Must | Done
Errors | Error Trigger workflow emails the owner ('Stocky – Error Alerts') | Must | In progress  -> changed to Done during the demo
Errors | Error Workflow selected in EVERY Stocky workflow | Must | Not started
Errors | Error alert tested with a deliberate failure | Should | Not started
Go-Live | Backup duplicate + download of every workflow | Must | Done
Go-Live | Workflow time zone set (America/New_York) | Should | Done
Go-Live | Error Alerts activated FIRST, then other workflows | Must | Not started
Go-Live | Boss signed off the one-page pitch | Should | In progress
Maintenance | 10-minute Friday check in the calendar | Should | Done
Maintenance | Owner AND backup person named | Should | In progress
(25 items; 18 Done = 72%; after the change 19 Done = 76%)
Status dropdown options: Not started / In progress / Done / N/A
Rule callout: "Don't switch anything to Active until readiness is above 90% and every 'Must' item is Done."
ROI_Calculator inputs (yellow): Hours per week before = 12 | Hours per week after = 2 | Hourly cost = $20 | Working weeks = 48 | Monthly tool cost = $32
ROI_Calculator outputs (green): Hours saved per year = 480 | Value per year = $9,600 | Cost per year = $384 | Net benefit = $9,216 | ROI multiple = 25x | Payback = under 1 week

TIMELINE (scene by scene; times are relative to the section start; format: time | what appears / cursor action | callout or caption text)
1. 00:00–00:08 | The checklist sheet fades in; the header "Go-live readiness: 72%" and its progress bar get a yellow box. | Callout: "Everything from this video in one place"
2. 00:08–00:24 | The seven group bands highlight one after another (about 2 s each): Access, Keys, Costs, Testing, Errors, Go-Live, Maintenance; a chip "25 items" pops at the top. | No callout
3. 00:24–00:30 | Cursor clicks a Status cell; the dropdown opens showing Not started / In progress / Done / N/A; then closes. | Callout: "Pick a status: the % updates itself"
4. 00:30–00:36 | The Priority column "Must" cells glow. | Callout: "Rule: above 90% and every 'Must' Done before going Active"
5. 00:36–00:45 | Cursor opens the Status of "Error Trigger workflow emails the owner" (In progress), picks "Done"; the cell turns green; the header counts up 72% -> 76% and the bar grows. | Callout: "Oddly satisfying"
6. 00:45–00:55 | Cursor clicks the "ROI_Calculator" tab; the five yellow input cells glow one by one. | Callout: "Yellow cells are yours to change"
7. 00:55–01:15 | The green outputs count up one by one: 480 hours, $9,600, $384, $9,216, 25x, "under 1 week". | Callouts: "480 hours saved a year" / "$9,600 of value" / "Payback: less than a week"
8. 01:15–01:29 | Zoom out and hold the full calculator. | Callout: "Put in your own numbers: the heart of your one-page pitch"
9. 01:29–01:30 | END card | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
(00:00) Here's your go-live checklist, everything from this video in one place. Twenty-five items, grouped into Access, Keys, Costs, Testing, Errors, Go-Live and Maintenance. For each one, pick a status from the dropdown: Not started, In progress, Done. The percentage at the top updates itself. My rule: don't switch anything to Active until you're above ninety percent, and every item marked "Must" is Done.
(00:36) Watch. I mark the error workflow as Done and the readiness goes up. It's oddly satisfying.
(00:45) And the ROI calculator. Yellow cells are yours to change. Sarah's numbers are in already: twelve hours before, two after, twenty dollars an hour, forty-eight weeks, thirty-two dollars a month. Out come the green numbers: 480 hours saved a year, nine thousand six hundred dollars of value, a net benefit of over nine thousand dollars, and a payback time of less than a week. Put in your own numbers, and you have the heart of your one-page pitch.

CHECKLIST
- Total duration exactly 1 min 30 s (90 s), with every scene at the times listed above.
- Readiness moves from exactly 72% to exactly 76% when the Error Trigger item changes to Done.
- All 25 checklist rows are shown (scrolling is fine) with the statuses in DATA.
- ROI inputs and outputs match the DATA block exactly (480, $9,600, $384, $9,216, 25x, under 1 week).
- Start button, hover Pause/Restart controls, progress bar and the 1-second END card are present.
- Nothing overflows the 1920x1080 stage, and every callout sits beside (not on top of) what it explains.
```

**After Claude builds it:**

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*157 words, about 1 min 03 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Here's your go-live checklist, everything from this video in one place. Twenty-five items, grouped into Access, Keys, Costs, Testing, Errors, Go-Live and Maintenance. For each one, pick a status from the dropdown: Not started, In progress, Done. The percentage at the top updates itself. My rule: don't switch anything to Active until you're above ninety percent, and every item marked "Must" is Done.

Watch. I mark the error workflow as Done and the readiness goes up. It's oddly satisfying.

And the ROI calculator. Yellow cells are yours to change. Sarah's numbers are in already: twelve hours before, two after, twenty dollars an hour, forty-eight weeks, thirty-two dollars a month. Out come the green numbers: 480 hours saved a year, nine thousand six hundred dollars of value, a net benefit of over nine thousand dollars, and a payback time of less than a week. Put in your own numbers, and you have the heart of your one-page pitch.
```
<!-- VOICEOVER END -->

- This is a short demo (1 min 30 s); record it in one go and don't trim more than the first second.
- If 25 rows don't fit, ask Claude to "scroll the checklist slowly during the group highlights".

---

## Prompt 6 of 6: Capstone Brief + Recording Your Loom Demo (21:30–23:00, 1 min 30 s)

**What this demo shows:** The capstone brief template (Part A), the filled BrightLeaf example (Part B), recording a short Loom and posting it in the community's Capstone category, and the Part C submission checklist.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. This section shows learners how to plan their capstone agent with the brief, look at a finished example, record a short Loom demo and post it in the community.

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

SECTION LENGTH: exactly 1 min 30 s (90 seconds). The master timeline runs from 00:00 to 01:30; the END card fills 01:29–01:30.

APP LOOK
- Word/Google Docs-style document view (simplified look-alike) inside the browser frame: white page on a grey background, headings in navy, tables with light grid lines, checkbox symbols. Browser tab and URL bar "V10_Activity_Capstone_Brief.docx".
- Loom-style recorder (simplified, no real logo): a "New video" button with a menu item "Record a video", a mode chooser "Screen + Camera", a tab picker, a red recording timer and a round camera bubble in the corner, a "Copy link" button. URL bar "loom.com".
- Community feed (simplified look-alike of a course community, no real logos): a "Write something" box at the top, a post composer with a Title field, a body field and a "Category" dropdown (choose "Capstone"), and a "Post" button. URL bar "skool.com/agentic-scm".

DATA TO SHOW (copy exactly; do not change any number, name, URL or wording)
PART A headings (template): Use case | Trigger | Tools | Rules | Human approval | Log | Report | Success measure | Test plan (a 10-row table: 5 Normal, 3 Tricky, 2 Refuse / escalate)
PART B (filled example): "Stocky – Late Shipment Chaser"
  Trigger: Schedule Trigger, every weekday at 8:00 am (America/New_York)
  Tools: Odoo Purchase | Gmail | Decision Log (Google Sheet "BrightLeaf – Stocky Database")
  Rule: "Only chase orders 2+ days past the receipt date: draft a polite follow-up asking for a new ship date and tracking number."
  Human approval: Gmail "Send and Wait for Response": Sarah sees each draft and clicks Approve / Reject
Loom steps: New video -> Record a video -> Screen + Camera -> select the n8n tab -> record (timer 00:00 -> 00:20) -> Stop -> Copy link (show the link masked as "loom.com/share/••••••••")
Community post: Write something -> Category: Capstone -> Title: Capstone: Late Shipment Chaser for BrightLeaf -> body: Loom link + 3 lines:
  "Problem: checking late POs and writing chaser emails by hand every week."
  "What it does: finds POs 2+ days late, drafts a polite follow-up, Sarah approves before it sends."
  "Hours saved: about 2.5 a week."
Beginner mistake caption: "BEGINNER MISTAKE: Never show a real API key, password or customer name in your Loom."
PART C checklist (show these lines with checkboxes ticking): I picked ONE use case and wrote the problem in one sentence | My design table is complete | My system prompt has rules about what the agent must NEVER do | A human approves any action that changes the ERP or contacts a supplier/customer | I built and tested on a TEST database or test data | Spend limit and Max Iterations are set | Error Trigger workflow is connected and tested | I ran all 10 test questions and scored at least 8/10 | I recorded a Loom of 2 minutes or less | No API keys, passwords, real customer names or confidential prices are visible | I posted in the Capstone category | I left helpful feedback on 2 other learners' capstones

TIMELINE (scene by scene; times are relative to the section start; format: time | what appears / cursor action | callout or caption text)
1. 00:00–00:05 | The capstone brief document opens at "Part A: Your Capstone Brief (fill in)". | Callout: "Part A: your template"
2. 00:05–00:21 | The document scrolls slowly; each heading (Use case, Trigger, Tools, Rules, Human approval, Log, Report, Success measure) gets a quick yellow highlight; the scroll stops on the 10-row test table. | Callout on the table: "Ten rows for your ten test questions"
3. 00:21–00:28 | Smooth scroll to "Part B"; the title "Stocky – Late Shipment Chaser" gets a yellow box. | Callout: "Part B: Sarah's next agent"
4. 00:28–00:46 | Four rows highlight in turn: Trigger (8 am daily), Tools, the 2+ days rule, Human approval. | Callouts in turn: "Every morning at 8" / "Odoo + Gmail + Decision Log" / "2+ days late -> polite follow-up" / "Sarah approves before sending"
5. 00:46–00:58 | Switch to loom.com: New video -> Record a video -> Screen + Camera -> pick the n8n tab; the red timer runs 00:00 -> 00:20 (sped up) with a camera bubble; Stop; Copy link ("Copied"). | Callout: "Talk through your agent, then copy the link"
6. 00:58–01:12 | Switch to the community: click "Write something"; Category -> Capstone; title typed; the Loom link pasted; the three lines appear (fast paste). | Callout: "Problem · what it does · hours saved"
7. 01:12–01:15 | Hold on the finished post. | Caption: "BEGINNER MISTAKE: Never show a real API key, password or customer name in your Loom."
8. 01:15–01:29 | Switch back to the document, "Part C: Submission Checklist"; the boxes tick one after another; the last line "I left helpful feedback on 2 other learners' capstones" gets a yellow box. | Callout: "Tick every box, then give feedback on two others"
9. 01:29–01:30 | END card | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
(00:00) Here's the capstone brief. Part A is your template. It walks you through every decision: the problem in one sentence, the trigger, the tools, the rules, where the human signs off, what gets logged, and how you'll measure success. And a test table with ten rows for your ten questions.
(00:21) Part B is a complete example from BrightLeaf: Sarah's next agent, a late shipment chaser. Every morning at 8, it finds purchase orders whose receipt date has passed by two or more days, drafts a polite follow-up email to the supplier, and waits for Sarah to approve before sending. Use it as a model when you get stuck.
(00:46) Recording the demo is easy. On Loom, New video, Screen and Camera, pick your n8n tab, and talk through it. Then copy the link. In our community, click "Write something", choose the Capstone category, give it a title like "Capstone: Late Shipment Chaser for BrightLeaf", paste your Loom link, and write three lines: the problem, what your agent does, and the hours you think it saves.
(01:15) Part C is the submission checklist. Tick every box before you post. And one last request: leave helpful feedback on two other people's capstones. You'll learn as much from theirs as from your own.

CHECKLIST
- Total duration exactly 1 min 30 s (90 s), with every scene at the times listed above.
- The post title is exactly "Capstone: Late Shipment Chaser for BrightLeaf" and the category is "Capstone".
- Part B shows the 8 am trigger, the 2+ days rule and Sarah's approval exactly as in DATA.
- No real logos; the Loom link is masked.
- Start button, hover Pause/Restart controls, progress bar and the 1-second END card are present.
- Nothing overflows the 1920x1080 stage, and every callout sits beside (not on top of) what it explains.
```

**After Claude builds it:**

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*208 words, about 1 min 23 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Here's the capstone brief. Part A is your template. It walks you through every decision: the problem in one sentence, the trigger, the tools, the rules, where the human signs off, what gets logged, and how you'll measure success. And a test table with ten rows for your ten questions.

Part B is a complete example from BrightLeaf: Sarah's next agent, a late shipment chaser. Every morning at 8, it finds purchase orders whose receipt date has passed by two or more days, drafts a polite follow-up email to the supplier, and waits for Sarah to approve before sending. Use it as a model when you get stuck.

Recording the demo is easy. On Loom, New video, Screen and Camera, pick your n8n tab, and talk through it. Then copy the link. In our community, click "Write something", choose the Capstone category, give it a title like "Capstone: Late Shipment Chaser for BrightLeaf", paste your Loom link, and write three lines: the problem, what your agent does, and the hours you think it saves.

Part C is the submission checklist. Tick every box before you post. And one last request: leave helpful feedback on two other people's capstones. You'll learn as much from theirs as from your own.
```
<!-- VOICEOVER END -->

- This demo is only 1 min 30 s and moves quickly between three apps; preview it once to check the switches feel smooth.
- If the document text is too small, ask Claude to "show the document at 120% zoom".
