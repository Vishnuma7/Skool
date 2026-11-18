# Video 5: Your No-Code Toolkit: Setting Up n8n and Your AI Brain: Screen-Recording Prompts

**How to use:** 1. Open claude.ai, start a new chat, and paste ONE prompt. 2. Claude builds an animated demo you can preview. If anything looks wrong, reply in the same chat ("make the cursor slower", "the table is cut off"). 3. Open the demo full-screen in Chrome (press F11 / Ctrl+Cmd+F), start your screen recorder (QuickTime: File → New Screen Recording), then click **Start**. 4. Stop recording when the "END" card appears, trim the start and end, and add your voice-over from the script. Each demo runs for the same length as its script section, so the voice-over lines up.

<!-- VO NOTE START -->
**Voice-over (Fish Audio):** Under every prompt you'll find a grey **"Voice-over text for Fish Audio"** box. Copy that text into Fish Audio and download the audio. Best order: make the audio FIRST, check its length, and if it's longer or shorter than the section length, add one line to the prompt before sending it to Claude: *"Make the total duration exactly M:SS"* (your audio length). Claude's demo has no sound, so you join the audio and video in a video editor (CapCut, iMovie, Descript): put both on the timeline starting at 0:00.
<!-- VO NOTE END -->

**Sections in this video:**

| # | Section | Time | Length | Prompt |
|---|---|---|---|---|
| 1 | Create Your n8n Cloud Account | 02:00–04:00 | 2 min 0 s | Prompt 1 |
| 2 | A Tour of the Canvas: Trigger, Nodes, Connections, Executions | 04:00–07:45 | 3 min 45 s | Prompt 2 |
| 3 | Get Your AI Brain's Key and Set a Spending Limit | 09:45–12:15 | 2 min 30 s | Prompt 3 |
| 4 | Store the Key Safely in n8n Credentials | 12:15–13:30 | 1 min 15 s | Prompt 4 |
| 5 | Hello World: Your First AI Workflow | 15:30–19:45 | 4 min 15 s | Prompt 5 |
| 6 | Get Your Odoo API Key and Save the Odoo Credential | 19:45–22:30 | 2 min 45 s | Prompt 6 |

---

## Prompt 1 of 6: Create Your n8n Cloud Account (02:00–04:00, 2 min 0 s)

**What this demo shows:** Signing up for an n8n Cloud trial as Sarah: the landing page, sign-up form, account name (brightleaf.app.n8n.cloud), onboarding questions, email confirmation and the empty Overview page.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. It will be screen-recorded and used in a beginner course for supply-chain managers ("The ERP Agent Blueprint"). This section walks a complete beginner through creating a free n8n Cloud trial account (n8n is a no-code workflow automation tool), from the homepage to the empty Overview page.

SECTION LENGTH: 2 min 0 s (120 seconds). The master timeline runs from 00:00 to 02:00 exactly.

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

APP LOOK
- Chrome-style browser window.
- Simplified n8n-style marketing homepage (https://n8n.io): dark header with the plain text wordmark "n8n" (text only, no logo), nav links "Product, Use cases, Docs, Pricing", and a top-right orange button "Get started for free". A hero headline "Automate your work with building blocks" with a small decorative row of connected rounded-square nodes.
- Sign-up page: white card centred, fields "First name", "Last name", "Email", "Password", orange "Start free trial" button, small grey line "14-day free trial. No credit card required."
- Account name page: title "Choose your account name", one input, live preview line "Your n8n address: <name>.app.n8n.cloud", orange "Continue".
- Onboarding page: question cards with selectable chips: "What's your role?" (Operations, Engineering, Sales, Other), "Company size" (1-10, 11-50, 51-200, 201+), "What do you want to automate?" (Supply chain / inventory, Marketing, IT ops, Other); orange "Continue".
- Gmail-style inbox: left folder list, email list, open email with a big orange "Confirm email" button.
- n8n-style Overview page (https://brightleaf.app.n8n.cloud/home/workflows): light grey left sidebar (Overview, Templates, Variables, Help), page title "Overview", tabs "Workflows | Credentials | Executions", top-right orange button "Create Workflow" (with a small dropdown arrow on its right), empty state "No workflows yet".

DATA TO SHOW (exact)
- Sign-up values: First name "Sarah", Last name "Mitchell", Email "sarah@brightleaf-demo.com", Password shown as dots "••••••••••••".
- Account name: "brightleaf" -> preview "brightleaf.app.n8n.cloud".
- Onboarding picks: "Operations" and "Supply chain / inventory" (company size: "11-50").
- Email: from "n8n" subject "Confirm your email address", body "Hi Sarah, please confirm your email to activate your n8n Cloud trial." button "Confirm email".
- Ghost future workflow cards (faint, dashed): "Stocky reads stock", "Stocky drafts purchase orders", "Monday stock report".
- Callout chips: "n8n = 'n-eight-n', short for 'nodemation'"; "Write this address down: brightleaf.app.n8n.cloud"; "Self-hosting? Optional. Not needed for this course."; "Alternatives exist (e.g. Make.com). We use n8n for its beginner-friendly AI Agent block."
- ON-SCREEN TEXT: "n8n = your workflow builder. Free trial, no credit card needed."

TIMELINE (scene by scene; times relative to the start of this demo)
1. 00:00-00:10 | Browser at https://n8n.io; the homepage fades in; the decorative nodes in the hero light up one after another. The cursor glides to "Get started for free" and hovers (button brightens). | Callout: "n8n = 'n-eight-n', short for 'nodemation'".
2. 00:10-00:23 | Hold on hover; at 00:20 the cursor clicks (pressed state + ripple). | ON-SCREEN TEXT lower-third 00:11-00:16: "n8n = your workflow builder. Free trial, no credit card needed."
3. 00:23-00:45 | Sign-up page. Cursor clicks each field and types: "Sarah", "Mitchell", "sarah@brightleaf-demo.com", then the password as dots. The grey line "14-day free trial. No credit card required." gets a yellow highlight at 00:38. Click "Start free trial" at 00:43. | Callout on the email field: "Use an email you actually check".
4. 00:45-01:09 | "Choose your account name" page. Types "brightleaf"; the preview line updates live letter by letter to "brightleaf.app.n8n.cloud". Zoom 1.5 on the preview, hold, zoom out at 01:05; click "Continue". | Callout: "Write this address down: brightleaf.app.n8n.cloud".
5. 01:09-01:18 | Onboarding questions. Cursor clicks chips "Operations", "11-50", "Supply chain / inventory" (each turns orange), then "Continue". A small grey chip at the bottom: "Self-hosting? Optional. Not needed for this course." | Callout: "No wrong answers".
6. 01:18-01:30 | Cut to the Gmail-style inbox: a new email from "n8n" slides to the top (bold, unread). Cursor opens it and clicks "Confirm email". | Callout on the button: "Confirm".
7. 01:30-01:45 | New browser tab loads https://brightleaf.app.n8n.cloud/home/workflows: the Overview page with "No workflows yet". The "Create Workflow" button gets a gentle pulse. | Callout: "Your kitchen. Empty for now."
8. 01:45-01:59 | Three faint dashed ghost workflow cards fade into the empty list: "Stocky reads stock", "Stocky drafts purchase orders", "Monday stock report"; then a small grey note chip: "Alternatives exist (e.g. Make.com). We use n8n for its beginner-friendly AI Agent block." Hold. | Callout: "These recipe cards come next".
9. 01:59-02:00 | END card. | "END"

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00-00:23] This is n8n. People pronounce it "n-eight-n". The name is short for "nodemation", which tells you what it does: it automates work using little building blocks called nodes. We'll come back to nodes in a minute. First, let's get you an account. Click "Get started for free".
[00:23-00:45] Fill in your name, your email and a password. I'm signing up as Sarah. Use an email you actually check, because n8n will send you a confirmation link. The cloud trial is free for fourteen days and you don't need a credit card to start.
[00:45-01:09] Now n8n asks for an account name. This becomes your personal web address. I'll type "brightleaf", so my n8n lives at brightleaf dot app dot n8n dot cloud. Pick your company name or your own name. Write that address down, because it's where you'll log in from now on.
[01:09-01:18] n8n asks a few questions about you. There are no wrong answers here. I'll pick Operations. Then click through.
[01:18-01:59] Check your inbox, click the confirmation link, and you land here, on the Overview page. Think of this as your kitchen. It's empty right now. Over the next few videos, this list will fill up with recipe cards: Stocky reading stock, Stocky drafting purchase orders, Stocky sending the Monday report. And just so you know, there are other tools that do a similar job, Make.com is a popular one, but we'll use n8n because its AI Agent building block is the friendliest for beginners.

CHECKLIST
- Total duration exactly 2:00 (120 s), END card in the last second.
- Values typed: Sarah / Mitchell / sarah@brightleaf-demo.com / brightleaf; password only as dots.
- The address preview reads exactly brightleaf.app.n8n.cloud.
- Simplified look-alike screens only, with text wordmarks and no real logos.
- Start button, END card, watermark present; nothing overflows the stage.
```

**After Claude builds it:** The real n8n sign-up flow changes often; if yours differs, ask Claude to match the field order you see. Record full-screen and trim the first second.

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*244 words, about 1 min 38 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
This is n8n. People pronounce it "n-eight-n". The name is short for "nodemation", which tells you what it does: it automates work using little building blocks called nodes. We'll come back to nodes in a minute. First, let's get you an account. Click "Get started for free".

Fill in your name, your email and a password. I'm signing up as Sarah. Use an email you actually check, because n8n will send you a confirmation link. The cloud trial is free for fourteen days and you don't need a credit card to start.

Now n8n asks for an account name. This becomes your personal web address. I'll type "brightleaf", so my n8n lives at brightleaf dot app dot n8n dot cloud. Pick your company name or your own name. Write that address down, because it's where you'll log in from now on.

n8n asks a few questions about you. There are no wrong answers here. I'll pick Operations. Then click through.

Check your inbox, click the confirmation link, and you land here, on the Overview page. Think of this as your kitchen. It's empty right now. Over the next few videos, this list will fill up with recipe cards: Stocky reading stock, Stocky drafting purchase orders, Stocky sending the Monday report. And just so you know, there are other tools that do a similar job, Make.com is a popular one, but we'll use n8n because its AI Agent building block is the friendliest for beginners.
```
<!-- VOICEOVER END -->

---

## Prompt 2 of 6: A Tour of the Canvas: Trigger, Nodes, Connections, Executions (04:00–07:45, 3 min 45 s)

**What this demo shows:** Creating and naming a workflow, the list of triggers, adding a manual trigger node, searching the node library (Odoo, Gmail, Google Sheets), a connection to a "No Operation" node, running it (green ticks, "1 item") and the Executions logbook.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. It will be screen-recorded and used in a beginner course for supply-chain managers ("The ERP Agent Blueprint"). This section is a guided tour of the n8n workflow canvas, teaching four words with simple metaphors: trigger (the doorbell), node (one step, a Lego block), connection (the "and then" arrow) and execution (one run, saved in a logbook).

SECTION LENGTH: 3 min 45 s (225 seconds). The master timeline runs from 00:00 to 03:45 exactly.

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

APP LOOK
- Chrome-style browser at https://brightleaf.app.n8n.cloud/workflow/new (later /workflow/7Kd2... after save).
- n8n-style workflow editor: dark grey (#2B2B2B) dotted canvas; top bar with the editable workflow name at the top-left ("My workflow", then "V05 Hello World"), a centred tab switch "Editor | Executions", and top-right "Save" button. A big orange "Execute workflow" button centred at the bottom of the canvas.
- Empty canvas: a dashed rounded box with a "+" and the label "Add first step" in the centre.
- Nodes: rounded squares (~140px) with an icon and a label underneath; a small grey "+" connector on the right edge; on success, a green tick badge.
- Nodes panel: slides in from the right (white, 520px wide) with a search box at the top.
  - Trigger list title "What triggers this workflow?": "Trigger manually", "On a schedule", "On webhook call", "On chat message", "On app event" (each with a small icon and a grey one-line description).
  - Next-step panel title "What happens next?": categories "AI", "Action in an app", "Data transformation", "Flow", "Core".
- Connections: grey curved lines between nodes; animated dots flow along them during a run; an item-count label on the line after a run.
- Executions tab: a list table with columns Status | Started | Run time | ID.

DATA TO SHOW (exact)
- Workflow rename: "My workflow" -> "V05 Hello World".
- Trigger node label: "When clicking 'Execute workflow'".
- Search results: typing "odoo" shows a result "Odoo"; "gmail" shows "Gmail"; "google sheets" shows "Google Sheets". (Plain coloured initial-letter icons, no real logos.)
- Sample node: search "No Operation" -> "No Operation, do nothing".
- After the run: green ticks on both nodes; label "1 item" on the connection.
- Execution row (illustrative timestamp): Status "Success" (green pill) | Started "Nov 17, 2026, 09:14:32" | Run time "21ms" | ID "#1".
- Trigger descriptions: Trigger manually = "you press a button"; On a schedule = "a clock rings it, e.g. every morning at 7"; On chat message = "someone types a question (how we'll talk to Stocky)"; On webhook call = "another app presses the doorbell".
- Keycaps: "Delete", "Cmd+S / Ctrl+S"; toast "Saved".
- ON-SCREEN TEXT 1: "Trigger = the doorbell that starts the recipe."
- ON-SCREEN TEXT 2: "Trigger = doorbell | Node = one step | Connection = "and then" | Execution = one run, saved in the logbook"

TIMELINE (scene by scene; times relative to the start of this demo)
1. 00:00-00:16 | Start on the Overview page; cursor clicks "Create Workflow"; the empty dotted canvas appears with "Add first step". A faint left-to-right arrow sweeps across the canvas with three ghost labels "step 1 -> step 2 -> step 3". | Callout: "The canvas = a blank recipe card, read left to right".
2. 00:16-00:32 | Cursor clicks "My workflow" at the top-left; the text selects; types "V05 Hello World"; Enter. | Callout: "First habit: name your workflow".
3. 00:32-00:42 | Cursor clicks "Add first step"; the nodes panel slides in with "What triggers this workflow?" and the 5 trigger options. | No callout.
4. 00:42-01:12 | A small doorbell icon rings (wiggle). Each option highlights in turn with its description chip: Trigger manually (00:48), On a schedule (00:55), On chat message (01:01, with an extra tag "Stocky, next video"), On webhook call (01:07). | ON-SCREEN TEXT lower-third 00:43-00:48: "Trigger = the doorbell that starts the recipe."
5. 01:12-01:30 | Cursor clicks "Trigger manually"; the panel closes; a node pops onto the canvas labelled "When clicking 'Execute workflow'" (pointer-click icon). A yellow box around it. | Callout: "Node = one step, one Lego block".
6. 01:30-01:38 | Cursor hovers the node's right "+" (it grows), clicks; the panel opens "What happens next?" with the 5 categories. | No callout.
7. 01:38-02:01 | In the search box, types "odoo" -> result "Odoo" highlights (01:40); clears, types "gmail" -> "Gmail" (01:47); clears, types "google sheets" -> "Google Sheets" (01:53). An "Esc" keycap appears at 01:59 and the panel closes. | Callout: "Hundreds of apps, ready-made, no code".
8. 02:01-02:30 | Quick add (badge "sample node"): "+" -> search "No Operation" -> "No Operation, do nothing"; the second node appears connected. Cursor slowly traces the grey connection line from left to right (02:09-02:15), a tiny dot travels along it. At 02:18 a ghost unconnected node appears off to the side with a red tag "Not connected = they don't talk", then fades. | Callout on the line: "Connection = 'and then'".
9. 02:30-02:55 | Cursor clicks the orange "Execute workflow" button; dots flow along the line; both nodes show a brief spinner then green ticks; the label "1 item" appears on the connection. Zoom 1.6 on "1 item", hold, zoom out at 02:52. | Callout: "1 item travelled down the line. Later: 10 products = 10 items."
10. 02:55-03:28 | Cursor clicks the "Executions" tab; the list shows one row: Success | Nov 17, 2026, 09:14:32 | 21ms | #1. Yellow box around the row. | Callout: "Your logbook: when, how long, success or failure". ON-SCREEN TEXT lower-third 03:18-03:23: "Trigger = doorbell | Node = one step | Connection = "and then" | Execution = one run, saved in the logbook"
11. 03:28-03:44 | Cursor clicks "Editor"; selects the "No Operation" node (selection outline), a "Delete" keycap presses, the node disappears; then a "Cmd+S / Ctrl+S" keycap presses and a toast "Saved" appears top-right. Hold on the single trigger node. | Callout: "Keep the trigger, save".
12. 03:44-03:45 | END card. | "END"

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00-00:16] Click "Create Workflow". This dotted grid is called the canvas. It's a blank recipe card. Every workflow you build will read from left to right, like a sentence. Step one, step two, step three.
[00:16-00:32] First habit: name your workflow. Click "My workflow" at the top left and call it "V05 Hello World". In six months you'll have twenty of these, and "My workflow 7" won't help anyone.
[00:32-01:12] Now click "Add first step". Look at the list. Every one of these is a trigger. A trigger is the doorbell that starts the recipe. Nothing happens in n8n until a doorbell rings. "Trigger manually" means you press a button. "On a schedule" means a clock rings it, say, every morning at seven. "On chat message" means someone types a question, which is exactly how we'll talk to Stocky next video. And "On webhook call" is a doorbell that another app can press.
[01:12-01:30] Let's pick "Trigger manually". See this box? That's a node. One node is one step, one Lego block on the recipe card. This one says "When clicking Execute workflow". Simple: when I press the button, start.
[01:30-02:01] Every node has a little plus on its right side. Click it, and you can add the next step. Look at the search box. Type "odoo". There it is, a ready-made Odoo block. Type "gmail". There's Gmail. "Google Sheets". There's your database from Video 4. These are the doors Stocky will walk through. Hundreds of apps, already built, no code. I'll press Escape for now.
[02:01-02:30] When two nodes are joined, you get a line between them. That's a connection. It's the arrow on the recipe card that says "and then". Information flows along this line, from left to right. If two nodes are not connected, they don't talk to each other. A very common beginner mistake is building a beautiful node and forgetting to connect it.
[02:30-02:55] Now the big orange button at the bottom: "Execute workflow". Click it. Green ticks. That means each step ran successfully. And see "1 item" on the line? That's n8n telling you one piece of information travelled down the connection. Later, when Stocky reads ten products from Odoo, this will say "10 items".
[02:55-03:28] Last stop on the tour. At the top, next to "Editor", there's a tab called "Executions". This is your logbook. Every time a workflow runs, n8n writes it down here: when it ran, how long it took, and whether it succeeded or failed. When something goes wrong at two in the morning, this is where you look first. It's like the CCTV footage of your recipe card.
[03:28-03:44] I'll delete that test node, keep the manual trigger, and save with Control S, or Command S on a Mac. Now let's give our intern a brain. But first, a quick story about keys.

CHECKLIST
- Total duration exactly 3:45 (225 s), END card in the last second.
- Workflow named exactly "V05 Hello World"; trigger node label "When clicking 'Execute workflow'".
- Search shows Odoo, Gmail and Google Sheets results; the run shows green ticks and "1 item".
- Executions list shows one green "Success" row.
- Start button, END card, watermark present; nothing overflows the stage.
```

**After Claude builds it:** On a dark canvas the cursor must stay visible; if it gets lost, ask Claude to add a soft white glow to the cursor. Record full-screen and trim the first second.

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*465 words, about 3 min 06 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Click "Create Workflow". This dotted grid is called the canvas. It's a blank recipe card. Every workflow you build will read from left to right, like a sentence. Step one, step two, step three.

First habit: name your workflow. Click "My workflow" at the top left and call it "V05 Hello World". In six months you'll have twenty of these, and "My workflow 7" won't help anyone.

Now click "Add first step". Look at the list. Every one of these is a trigger. A trigger is the doorbell that starts the recipe. Nothing happens in n8n until a doorbell rings. "Trigger manually" means you press a button. "On a schedule" means a clock rings it, say, every morning at seven. "On chat message" means someone types a question, which is exactly how we'll talk to Stocky next video. And "On webhook call" is a doorbell that another app can press.

Let's pick "Trigger manually". See this box? That's a node. One node is one step, one Lego block on the recipe card. This one says "When clicking Execute workflow". Simple: when I press the button, start.

Every node has a little plus on its right side. Click it, and you can add the next step. Look at the search box. Type "odoo". There it is, a ready-made Odoo block. Type "gmail". There's Gmail. "Google Sheets". There's your database from Video 4. These are the doors Stocky will walk through. Hundreds of apps, already built, no code. I'll press Escape for now.

When two nodes are joined, you get a line between them. That's a connection. It's the arrow on the recipe card that says "and then". Information flows along this line, from left to right. If two nodes are not connected, they don't talk to each other. A very common beginner mistake is building a beautiful node and forgetting to connect it.

Now the big orange button at the bottom: "Execute workflow". Click it. Green ticks. That means each step ran successfully. And see "1 item" on the line? That's n8n telling you one piece of information travelled down the connection. Later, when Stocky reads ten products from Odoo, this will say "10 items".

Last stop on the tour. At the top, next to "Editor", there's a tab called "Executions". This is your logbook. Every time a workflow runs, n8n writes it down here: when it ran, how long it took, and whether it succeeded or failed. When something goes wrong at two in the morning, this is where you look first. It's like the CCTV footage of your recipe card.

I'll delete that test node, keep the manual trigger, and save with Control S, or Command S on a Mac. Now let's give our intern a brain. But first, a quick story about keys.
```
<!-- VOICEOVER END -->

---

## Prompt 3 of 6: Get Your AI Brain's Key and Set a Spending Limit (09:45–12:15, 2 min 30 s)

**What this demo shows:** Signing in to the Anthropic Console, naming the organisation, buying $5 of prepaid credits with auto reload OFF, setting a $10 monthly limit with a $5 email alert, and creating the API key "n8n-stocky-brightleaf" (shown masked).

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. It will be screen-recorded and used in a beginner course for supply-chain managers ("The ERP Agent Blueprint"). This section shows how to get an API key for Claude (the AI agent's "brain") from the Anthropic Console, with spending safety rails first: prepaid credits, auto reload off, a monthly limit and an email alert. All keys and card numbers must stay masked.

SECTION LENGTH: 2 min 30 s (150 seconds). The master timeline runs from 00:00 to 02:30 exactly.

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

APP LOOK
- Chrome-style browser at https://console.anthropic.com (simplified look-alike, no real logos: a plain text heading "Console").
- Sign-in page: centred card, heading "Sign in to Console", buttons "Continue with Google" and "Continue with email".
- Organisation setup: "Name your organization" input, "Continue" button.
- Anthropic Console style dashboard: left sidebar menu "Dashboard", "Workbench", "API Keys", "Settings" (expanding to "Organization", "Billing", "Limits", "Members"); white content area, black/dark-navy primary buttons, rounded inputs.
- Billing page: "Credit balance $0.00", button "Buy credits"; modal with amount options "$5" (minimum), "$25", "$100", card fields shown as a blurred grey block, a toggle "Auto reload" (OFF, grey), button "Purchase".
- Limits page: "Monthly spend limit" input with "$" prefix, "Email notification" threshold input with "$" prefix, "Save" button.
- API Keys page: table (Name, Key, Created), button "Create Key"; modal "Create API key" with a "Name" input and "Add" button; result modal "Save your API key" showing the key in a grey box with a copy icon, warning text, and "Close".

DATA TO SHOW (exact)
- Organisation name: "BrightLeaf Supplies"
- Credits: "$5" selected; card details blurred; "Auto reload" OFF; after purchase "Credit balance $5.00".
- Limits: Monthly spend limit "10" (USD); Email notification at "5" (USD).
- Key name: "n8n-stocky-brightleaf"
- Key display (masked, never real): sk-ant-••••••••••3f9a
- Warning in the key modal: "Save this key now. You won't be able to see it again."
- Info card: "Claude = an LLM (large language model) = the intern's brain"
- Callout on "console": "Developer side: NOT the normal Claude chat website"
- BEGINNER MISTAKE banner: "Claude Pro / ChatGPT Plus is for chatting on the website. It does NOT include API usage. The API is pay-as-you-go."
- Don't-paste chips (crossed): "Notepad", "Email to yourself"; arrow chip "Straight to n8n".
- PRO TIP chip: "Prefer ChatGPT? platform.openai.com > API keys > Create new secret key, set a monthly budget under Limits; in n8n pick 'OpenAI Chat Model'."
- ON-SCREEN TEXT: "Safety rail: prepaid credits + auto reload OFF + monthly limit + email alert"

TIMELINE (scene by scene; times relative to the start of this demo)
1. 00:00-00:12 | Browser at https://console.anthropic.com showing the sign-in card. Zoom 1.4 on the address bar word "console", yellow underline. | Callout: "Developer side: NOT the normal Claude chat website".
2. 00:12-00:33 | Zoom out. Info card slides in at the left: "Claude = an LLM (large language model) = the intern's brain". Cursor clicks "Continue with email" (00:22). The BEGINNER MISTAKE banner slides up from the bottom (00:24-00:33). | Banner text as in DATA.
3. 00:33-00:44 | "Name your organization" page; types "BrightLeaf Supplies"; clicks "Continue"; dashboard loads. | Callout: "Your company or your own name".
4. 00:44-01:15 | Cursor clicks "Settings" > "Billing"; clicks "Buy credits"; modal: clicks "$5" (gets a selected outline, small tag "minimum"); card fields appear as a blurred block; zoom 1.6 on the "Auto reload" toggle, which stays OFF (grey) with a red-outlined callout; zoom out; clicks "Purchase"; balance animates "$0.00" -> "$5.00". | Callout on the toggle: "Leave OFF: when $5 runs out, Claude simply stops".
5. 01:15-01:45 | Cursor clicks "Limits"; clicks "Monthly spend limit" and types "10"; clicks "Email notification" and types "5"; clicks "Save" (toast "Limits updated"). | Callout: "Your safety rail: a loop can't cost more than this". ON-SCREEN TEXT lower-third 01:36-01:41: "Safety rail: prepaid credits + auto reload OFF + monthly limit + email alert"
6. 01:45-02:16 | Cursor clicks "API Keys" > "Create Key"; modal: types "n8n-stocky-brightleaf"; clicks "Add"; the result modal shows sk-ant-••••••••••3f9a in a grey box. Zoom 1.6 on the key and the warning line "Save this key now. You won't be able to see it again." | Callout: "Shown only once".
7. 02:16-02:29 | Cursor clicks the copy icon (tooltip "Copied"). Two crossed-out chips pop: "Notepad", "Email to yourself"; an orange arrow chip "Straight to n8n". A small PRO TIP chip appears bottom-left for the ChatGPT alternative. The browser tab bar shows the n8n tab being clicked at 02:27. | Callout: "Copy it, then go straight to the locked cabinet".
8. 02:29-02:30 | END card. | "END"

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00-00:33] Our intern's brain will be Claude, made by a company called Anthropic. Claude is what we call an LLM, a large language model. In plain English: the intern's brain. Go to console dot anthropic dot com. Notice the word "console". This is NOT the normal Claude chat website. It's the developer side, where you get keys and pay for usage. Sign in with Google or with your email.
[00:33-00:44] The first time, it asks for an organisation name. I'll type "BrightLeaf Supplies". You can use your company name or just your own name.
[00:44-01:15] Before we make a key, let's add a little money. Go to Settings, then Billing, then "Buy credits". I'm adding five dollars, which is the minimum. Now, look carefully at this option: auto reload. Leave it OFF. That way, when the five dollars is used up, Claude simply stops. No surprises. Five dollars will easily carry you through this entire course and then some.
[01:15-01:45] Next, under Settings, click "Limits". Here you can set a monthly spending limit, and an email alert before you reach it. I'll set the limit to ten dollars a month and an alert at five. This is your safety rail. Even if you build a workflow with a mistake that runs in a loop all night, it can't cost more than this number.
[01:45-02:16] Now the key itself. Click "API Keys", then "Create Key". Give it a name that tells future-you where it's used. I'll call it "n8n stocky brightleaf". Click "Add". And here's your key. It starts with "sk-ant". Read this message: Anthropic shows you the full key only once. If you close this window without copying it, it's gone, and you simply make a new one.
[02:16-02:29] Click the copy icon. Now, don't paste it into a notepad, don't email it to yourself. We go straight to n8n and put it in the locked cabinet.

CHECKLIST
- Total duration exactly 2:30 (150 s), END card in the last second.
- Values: BrightLeaf Supplies, $5 credits, auto reload OFF, limit 10, alert 5, key name n8n-stocky-brightleaf.
- The key is only ever shown masked as sk-ant-••••••••••3f9a; card details are blurred.
- Simplified look-alike console with no real logos.
- Start button, END card, watermark present; nothing overflows the stage.
```

**After Claude builds it:** Compare menu names with your real console on recording day (Billing / Limits / API Keys); ask Claude to rename any label that has changed. Record full-screen and trim the first second.

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*311 words, about 2 min 04 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Our intern's brain will be Claude, made by a company called Anthropic. Claude is what we call an LLM, a large language model. In plain English: the intern's brain. Go to console dot anthropic dot com. Notice the word "console". This is NOT the normal Claude chat website. It's the developer side, where you get keys and pay for usage. Sign in with Google or with your email.

The first time, it asks for an organisation name. I'll type "BrightLeaf Supplies". You can use your company name or just your own name.

Before we make a key, let's add a little money. Go to Settings, then Billing, then "Buy credits". I'm adding five dollars, which is the minimum. Now, look carefully at this option: auto reload. Leave it OFF. That way, when the five dollars is used up, Claude simply stops. No surprises. Five dollars will easily carry you through this entire course and then some.

Next, under Settings, click "Limits". Here you can set a monthly spending limit, and an email alert before you reach it. I'll set the limit to ten dollars a month and an alert at five. This is your safety rail. Even if you build a workflow with a mistake that runs in a loop all night, it can't cost more than this number.

Now the key itself. Click "API Keys", then "Create Key". Give it a name that tells future-you where it's used. I'll call it "n8n stocky brightleaf". Click "Add". And here's your key. It starts with "sk-ant". Read this message: Anthropic shows you the full key only once. If you close this window without copying it, it's gone, and you simply make a new one.

Click the copy icon. Now, don't paste it into a notepad, don't email it to yourself. We go straight to n8n and put it in the locked cabinet.
```
<!-- VOICEOVER END -->

---

## Prompt 4 of 6: Store the Key Safely in n8n Credentials (12:15–13:30, 1 min 15 s)

**What this demo shows:** Creating an Anthropic credential in n8n, pasting the key (dots only), renaming it "Anthropic – BrightLeaf", saving with "Connection tested successfully", and reopening it to show the key stays hidden.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. It will be screen-recorded and used in a beginner course for supply-chain managers ("The ERP Agent Blueprint"). This short section shows how to store an AI API key safely in n8n Credentials (the "locked key cabinet"), and that once saved, nobody can read the key again.

SECTION LENGTH: 1 min 15 s (75 seconds). The master timeline runs from 00:00 to 01:15 exactly.

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

APP LOOK
- Chrome-style browser at https://brightleaf.app.n8n.cloud/home/credentials.
- n8n-style Overview page: light grey left sidebar, title "Overview", tabs "Workflows | Credentials | Executions" (Credentials active), top-right orange "Create Workflow" button with a separate small dropdown-arrow segment; the dropdown shows "Create Credential".
- Modal "Add new credential": search input, results list, orange "Continue".
- Credential form modal: editable title at the top-left ("Anthropic account"), a single field "API Key" (password-style input), orange "Save" button, close "X". After save, a green banner at the top of the form: "Connection tested successfully".
- Credentials list: rows with a small coloured initial-letter icon, name, and "Last updated just now".

DATA TO SHOW (exact)
- Search text: "Anthropic"; result: "Anthropic".
- Default name "Anthropic account" -> renamed "Anthropic – BrightLeaf".
- API Key field after paste: dots only, e.g. "••••••••••••••••••••••••" (never show sk-ant text in this demo).
- Success banner: "Connection tested successfully".
- Callouts: "The locked key cabinet"; "Tested and stored encrypted"; "Only dots. Nobody can read it, not even you."; "Need it again? Make a new one in the Anthropic console."
- ON-SCREEN TEXT: "Keys live in n8n Credentials. In your notes, write WHERE a key lives, never the key itself."

TIMELINE (scene by scene; times relative to the start of this demo)
1. 00:00-00:07 | Overview page; cursor clicks the "Credentials" tab; an empty list "No credentials yet". A small padlock-cabinet icon appears beside the tab. | Callout: "The locked key cabinet".
2. 00:07-00:14 | Cursor clicks the small arrow next to "Create Workflow"; the dropdown opens; clicks "Create Credential". | No callout.
3. 00:14-00:23 | Modal "Add new credential": types "Anthropic"; the "Anthropic" result highlights; click; click "Continue"; the form with one field "API Key" appears. | Callout on the field: "One field: API Key".
4. 00:23-00:32 | Cursor clicks the field; a paste flash; the field fills with dots. Cursor clicks the title "Anthropic account", selects it and types "Anthropic – BrightLeaf". | No callout.
5. 00:32-00:46 | Cursor clicks "Save"; a 1 s spinner; green banner "Connection tested successfully" slides down; a small padlock icon closes with a click animation. | Callout: "Tested and stored encrypted".
6. 00:46-00:54 | Cursor closes the modal; the list shows "Anthropic – BrightLeaf, Last updated just now"; cursor clicks it to reopen. | No callout.
7. 00:54-01:06 | Zoom 1.6 onto the API Key field: still only dots. | Callouts: "Only dots. Nobody can read it, not even you." then (01:01) "Need it again? Make a new one in the Anthropic console."
8. 01:06-01:14 | Zoom out and hold. | ON-SCREEN TEXT lower-third 01:07-01:12: "Keys live in n8n Credentials. In your notes, write WHERE a key lives, never the key itself."
9. 01:14-01:15 | END card. | "END"

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00-00:14] Back in n8n, on the Overview page, click the "Credentials" tab. This is the locked key cabinet. Now click the arrow next to "Create Workflow" and choose "Create Credential".
[00:14-00:23] Search for "Anthropic", select it, and click "Continue". There's one field: API Key. Paste your key here.
[00:23-00:46] Let's also rename it. Click the name at the top and call it "Anthropic, BrightLeaf". Now click "Save". n8n tests the key straight away, and we get a green message: "Connection tested successfully". That means the key works, and it's now stored encrypted inside n8n.
[00:46-01:14] Watch this. If I open it again, I can't see the key. Only dots. That's the whole point. From now on, any workflow can use "Anthropic, BrightLeaf", but nobody can read the key, not even me. If you ever need it again, you don't copy it from here. You create a new one in the Anthropic console.

CHECKLIST
- Total duration exactly 1:15 (75 s), END card in the last second.
- The credential is renamed exactly "Anthropic – BrightLeaf".
- The key is shown only as dots, before and after saving.
- Green "Connection tested successfully" banner appears after Save.
- Start button, END card, watermark present; nothing overflows the stage.
```

**After Claude builds it:** This demo is short, so check the paste-and-rename step (00:23-00:32) is readable; ask Claude to slow the typing slightly if it feels rushed. Record full-screen and trim the first second.

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*148 words, about 0 min 59 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Back in n8n, on the Overview page, click the "Credentials" tab. This is the locked key cabinet. Now click the arrow next to "Create Workflow" and choose "Create Credential".

Search for "Anthropic", select it, and click "Continue". There's one field: API Key. Paste your key here.

Let's also rename it. Click the name at the top and call it "Anthropic, BrightLeaf". Now click "Save". n8n tests the key straight away, and we get a green message: "Connection tested successfully". That means the key works, and it's now stored encrypted inside n8n.

Watch this. If I open it again, I can't see the key. Only dots. That's the whole point. From now on, any workflow can use "Anthropic, BrightLeaf", but nobody can read the key, not even me. If you ever need it again, you don't copy it from here. You create a new one in the Anthropic console.
```
<!-- VOICEOVER END -->

---

## Prompt 5 of 6: Hello World: Your First AI Workflow (15:30–19:45, 4 min 15 s)

**What this demo shows:** Building Manual Trigger -> AI Agent -> Anthropic Chat Model in n8n, writing the user prompt and system message, running it, and reading the polite follow-up email to Global Lift Parts that Claude writes in about four seconds.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. It will be screen-recorded and used in a beginner course for supply-chain managers ("The ERP Agent Blueprint"). This section builds the learner's first AI workflow in n8n: a manual trigger, an AI Agent node (the "intern"), and an Anthropic Chat Model (the "brain"). The agent writes a supplier follow-up email from a clear brief. It teaches the difference between the user message (today's task) and the system message (the job description). Because this section is over 4 minutes long, organise the code by scene (one function or object per scene) so it is easy to tweak.

SECTION LENGTH: 4 min 15 s (255 seconds). The master timeline runs from 00:00 to 04:15 exactly.

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

APP LOOK
- Chrome-style browser at https://brightleaf.app.n8n.cloud/workflow/7Kd2 (illustrative ID), tab title "V05 Hello World - n8n".
- n8n-style workflow editor: dark grey (#2B2B2B) dotted canvas; top bar with workflow name "V05 Hello World", centred tabs "Editor | Executions", top-right "Save"; orange "Execute workflow" button at the bottom centre.
- Nodes: rounded squares with icon + label underneath, grey connector lines, green tick badge on success, spinner while running.
- AI Agent node: wider rectangle labelled "AI Agent" with a robot icon; underneath it three small diamond-shaped sub-connectors with labels "Chat Model", "Memory", "Tool", each with a "+" below.
- Node settings panel: a large modal (~80% of the stage) with three columns: INPUT (left, narrow), PARAMETERS (centre), OUTPUT (right). Parameters include: "Source for Prompt (User Message)" dropdown, "Prompt (User Message)" multi-line text box, and at the bottom "Options" with an "Add Option" button whose list contains "System Message".
- Anthropic Chat Model sub-node: small round node hanging under "Chat Model" with a dashed connector; its panel shows "Credential to connect with" dropdown and "Model" dropdown.
- OUTPUT column shows a JSON-like "output" field with the email text rendered in a readable 24px block.
- Executions tab: list with Status | Started | Run time | ID.

DATA TO SHOW (exact)
- Search text: "AI Agent".
- Source for Prompt: from "Connected Chat Trigger Node" to "Define below".
- Prompt (User Message), exactly:
  Write a short, friendly follow-up email to our supplier Global Lift Parts in Shenzhen.
  Facts:
  - Purchase order: P00027
  - Item: BL-1005 Pallet Jack Wheels (set), quantity 40
  - Expected delivery date was 3 days ago and we have not received any shipping update
  - Our stock is down to 18 sets and our reorder point is 25
  Ask for the tracking number and a confirmed new delivery date by Friday.
  Sign it as: Sarah Mitchell, Procurement & Inventory Manager, BrightLeaf Supplies, Columbus, Ohio.
- System Message, exactly:
  You are Stocky, the procurement assistant at BrightLeaf Supplies, an industrial and packaging supplies distributor in Columbus, Ohio, USA.
  You write clear, polite, professional emails to suppliers.
  Keep every email under 120 words, include a subject line, and never invent facts that are not in the request.
- Chat model: "Anthropic Chat Model"; Credential: "Anthropic – BrightLeaf"; Model: "Claude Sonnet (latest)" (label it generically; real model names change).
- Output email, exactly:
  Subject: Follow-up on PO P00027 – BL-1005 Pallet Jack Wheels

  Dear Global Lift Parts team,

  I hope you are well. I'm following up on our purchase order P00027 for 40 sets of
  Pallet Jack Wheels (BL-1005). The expected delivery date passed three days ago,
  and we have not yet received a shipping update.

  Our stock is now down to 18 sets, below our reorder point of 25, so this order is
  becoming urgent for us.

  Could you please share the tracking number and confirm a new delivery date by Friday?

  Thank you for your help.

  Best regards,
  Sarah Mitchell
  Procurement & Inventory Manager
  BrightLeaf Supplies, Columbus, Ohio
- Execution row (illustrative timestamp): Success | Nov 17, 2026, 09:41:08 | 4.1s | #2
- Fact highlight tags (on the prompt): "PO number", "item + quantity", "how late", "stock vs reorder point", "exactly what we want back".
- Sub-connector labels: Chat Model = "the brain", Memory = "remembers the conversation", Tool = "its hands (e.g. the Odoo door)".
- ON-SCREEN TEXT 1: "System message = the job description (stays the same). User message = today's task (changes every time)."
- ON-SCREEN TEXT 2: "~4 seconds | ~$0.003 | 0 lines of code"
- PAUSE & THINK card: "Change ONE fact: make the delay 10 days instead of 3, or switch to Gulf Lubricants in Dubai and BL-1007 Hydraulic Oil. Run it again. How did the tone change?"
- Tone comparison chips: "3 days late: friendly" vs "10 days late: noticeably firmer, asks to escalate to a manager".

TIMELINE (scene by scene; times relative to the start of this demo)
1. 00:00-00:10 | Workflow list; cursor opens "V05 Hello World"; the canvas shows the single manual trigger node. | No callout.
2. 00:10-00:24 | Cursor clicks the "+" on the trigger's right; panel opens; types "AI Agent"; clicks the result; the AI Agent node appears, connected to the trigger. | Callout: "This node IS the intern".
3. 00:24-00:47 | The settings panel opens. Yellow box on "Source for Prompt (User Message)" showing "Connected Chat Trigger Node"; cursor opens the dropdown and picks "Define below"; the "Prompt (User Message)" box appears. | Callout: "Where does the instruction come from? Today: right here".
4. 00:47-01:30 | Cursor clicks into the prompt box; the prompt text is pasted (paste flash). Then each fact gets a yellow highlight with a small tag in sync with narration: "P00027" (00:55, "PO number"), "BL-1005 ... quantity 40" (01:01, "item + quantity"), "3 days ago" (01:07, "how late"), "18 sets ... reorder point is 25" (01:13, "stock vs reorder point"), "tracking number ... by Friday" (01:20, "exactly what we want back"). | Callout: "Brief it like a good manager briefs an intern".
5. 01:30-02:03 | Cursor scrolls the parameters column to "Options", clicks "Add Option", picks "System Message"; a text box appears with grey default text, which is selected and replaced by the system message (paste flash). "never invent facts that are not in the request" gets a red underline at 01:59. | ON-SCREEN TEXT lower-third 01:44-01:49: "System message = the job description (stays the same). User message = today's task (changes every time)."
6. 02:03-02:27 | Cursor closes the panel. Zoom 1.5 on the AI Agent node's three sub-connectors; each lights up with its label: "Chat Model = the brain" (02:08), "Memory = remembers the conversation" (02:13), "Tool = its hands (e.g. the Odoo door)" (02:18). Cursor clicks the "+" under "Chat Model" (02:24). | Callouts as listed.
7. 02:27-02:58 | Panel lists chat models; cursor picks "Anthropic Chat Model". In its settings: "Credential to connect with" dropdown -> "Anthropic – BrightLeaf" (02:36); "Model" dropdown -> "Claude Sonnet (latest)" (02:46). Panel closes; the round chat-model node hangs under the agent with a dashed line. | Callout at 02:36: "We never touch the key again". Callout at 02:46: "Sonnet: smart and affordable".
8. 02:58-03:07 | Full canvas view: trigger -> AI Agent, chat model underneath. Cursor clicks "Execute workflow" (02:59); dots flow; the AI Agent node spins for 4 s (03:00-03:04); green ticks on all nodes at 03:04. | Callout: "Moment of truth".
9. 03:07-03:41 | Cursor double-clicks the AI Agent node; OUTPUT column shows the "output" field; the email reveals line by line (fast typewriter, ~3 s). Then highlights in sequence: subject line with P00027 (03:13), "18 sets, below our reorder point of 25" (03:19), the two asks (03:25), the signature (03:30). | ON-SCREEN TEXT lower-third 03:34-03:39: "~4 seconds | ~$0.003 | 0 lines of code"
10. 03:41-03:50 | Cursor closes the panel and clicks the "Executions" tab; the new row "Success | Nov 17, 2026, 09:41:08 | 4.1s | #2" sits at the top; cursor clicks it and the frozen canvas with green ticks shows. | Callout: "Saved in the logbook".
11. 03:50-04:14 | PAUSE & THINK card slides in over a dimmed screen (03:50-04:00). Then two tone chips appear side by side: "3 days late: friendly" and "10 days late: noticeably firmer, asks to escalate to a manager". At 04:08 a small teaser chip: "Next: the key to Odoo". | Cards as in DATA.
12. 04:14-04:15 | END card. | "END"

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00-00:24] Time for the fun part. Open "V05 Hello World". Click the plus next to the manual trigger, search for "AI Agent", and select it. This is the most important building block in the whole course. This node IS the intern. It can think, and later it can use tools.
[00:24-00:47] The settings panel opens. The first setting is "Source for Prompt". That's a fancy way of asking, "Where does the instruction come from?" Next video, the instruction will come from a chat window. Today, we'll type it right here, so change it to "Define below".
[00:47-01:30] Here's the instruction. Notice how I wrote it. I didn't just say "write an email to a supplier". I gave the facts like a good manager briefing an intern: the PO number, P zero zero zero two seven. The item, BL-1005, pallet jack wheels, forty sets. The fact that it's three days late. Our stock: eighteen sets against a reorder point of twenty-five. And exactly what I want back: a tracking number and a new date by Friday. The more specific your brief, the better the intern's work.
[01:30-02:03] Now scroll down to "Options", click "Add Option" and choose "System Message". The system message is the intern's job description. It stays the same every time, while the user message changes. I'm telling it who it is, Stocky, BrightLeaf's procurement assistant. How to write: polite and professional. And one golden rule: never invent facts. Keep that rule in mind. It becomes very important next video.
[02:03-02:27] Close the panel and look underneath the AI Agent node. Three little plugs: Chat Model, Memory and Tool. The chat model is the brain. Memory lets it remember a conversation. Tools are its hands, like the Odoo door. Today, we only need the brain. Click the plus under "Chat Model".
[02:27-02:58] Pick "Anthropic Chat Model". In "Credential to connect with", choose the credential we just saved, "Anthropic, BrightLeaf". See? We never touch the key again. Then, in "Model", choose the newest Claude Sonnet you see in the list. Model names get updated every few months, so your list might look a little different from mine. Sonnet is the all-rounder: smart and affordable.
[02:58-03:07] Here's our recipe card. The doorbell, the intern, and the intern's brain. Moment of truth. Click "Execute workflow".
[03:07-03:41] Let's open the AI Agent node and look at the output. Read that. A subject line with the PO number. Polite. It explains why it's urgent, using our real numbers, eighteen against twenty-five. It asks for exactly two things. And it's signed properly. That took about four seconds and cost about a third of a cent. Sarah used to spend ten minutes on emails like this, several times a day.
[03:41-03:50] And check the logbook. Executions tab. There's our run, saved, with the exact output. Nothing gets lost.
[03:50-04:14] Try that challenge yourself. When I changed the delay to ten days, the email got noticeably firmer and asked to escalate to a manager. Same recipe card, different facts, different email. That's the power of a good instruction. Now, one more key before we finish: the key to Odoo.

CHECKLIST
- Total duration exactly 4:15 (255 s), END card in the last second; code organised by scene.
- Prompt, system message and output email match the DATA block word for word.
- Canvas ends as Manual Trigger -> AI Agent with the Anthropic Chat Model under "Chat Model"; credential "Anthropic – BrightLeaf".
- The run takes about 4 seconds on screen and ends with green ticks; Executions shows a Success row.
- Start button, END card, watermark present; the email text is fully readable and nothing overflows the stage.
```

**After Claude builds it:** Check that the full email fits in the OUTPUT column without scrolling at 1920x1080; if it doesn't, ask Claude to reduce the output font to 22px. Record full-screen and trim the first second.

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*512 words, about 3 min 25 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Time for the fun part. Open "V05 Hello World". Click the plus next to the manual trigger, search for "AI Agent", and select it. This is the most important building block in the whole course. This node IS the intern. It can think, and later it can use tools.

The settings panel opens. The first setting is "Source for Prompt". That's a fancy way of asking, "Where does the instruction come from?" Next video, the instruction will come from a chat window. Today, we'll type it right here, so change it to "Define below".

Here's the instruction. Notice how I wrote it. I didn't just say "write an email to a supplier". I gave the facts like a good manager briefing an intern: the PO number, P zero zero zero two seven. The item, BL-1005, pallet jack wheels, forty sets. The fact that it's three days late. Our stock: eighteen sets against a reorder point of twenty-five. And exactly what I want back: a tracking number and a new date by Friday. The more specific your brief, the better the intern's work.

Now scroll down to "Options", click "Add Option" and choose "System Message". The system message is the intern's job description. It stays the same every time, while the user message changes. I'm telling it who it is, Stocky, BrightLeaf's procurement assistant. How to write: polite and professional. And one golden rule: never invent facts. Keep that rule in mind. It becomes very important next video.

Close the panel and look underneath the AI Agent node. Three little plugs: Chat Model, Memory and Tool. The chat model is the brain. Memory lets it remember a conversation. Tools are its hands, like the Odoo door. Today, we only need the brain. Click the plus under "Chat Model".

Pick "Anthropic Chat Model". In "Credential to connect with", choose the credential we just saved, "Anthropic, BrightLeaf". See? We never touch the key again. Then, in "Model", choose the newest Claude Sonnet you see in the list. Model names get updated every few months, so your list might look a little different from mine. Sonnet is the all-rounder: smart and affordable.

Here's our recipe card. The doorbell, the intern, and the intern's brain. Moment of truth. Click "Execute workflow".

Let's open the AI Agent node and look at the output. Read that. A subject line with the PO number. Polite. It explains why it's urgent, using our real numbers, eighteen against twenty-five. It asks for exactly two things. And it's signed properly. That took about four seconds and cost about a third of a cent. Sarah used to spend ten minutes on emails like this, several times a day.

And check the logbook. Executions tab. There's our run, saved, with the exact output. Nothing gets lost.

Try that challenge yourself. When I changed the delay to ten days, the email got noticeably firmer and asked to escalate to a manager. Same recipe card, different facts, different email. That's the power of a good instruction. Now, one more key before we finish: the key to Odoo.
```
<!-- VOICEOVER END -->

---

## Prompt 6 of 6: Get Your Odoo API Key and Save the Odoo Credential (19:45–22:30, 2 min 45 s)

**What this demo shows:** Turning on developer mode in Odoo, generating an API key for Sarah ("n8n Stocky"), creating the four-field Odoo API credential in n8n, a successful test, a failed test and its fix, and the final credentials list.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. It will be screen-recorded and used in a beginner course for supply-chain managers ("The ERP Agent Blueprint"). This section shows how to create an API key in the Odoo ERP and store it in n8n as an "Odoo API" credential (four fields: Site URL, Username, API key, Database Name), including what a failed connection looks like and how to fix it. All keys stay masked.

SECTION LENGTH: 2 min 45 s (165 seconds). The master timeline runs from 00:00 to 02:45 exactly.

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

APP LOOK
- Chrome-style browser with two tabs: "BrightLeaf - Odoo" (https://brightleaf-demo.odoo.com/odoo) and "Credentials - n8n" (https://brightleaf.app.n8n.cloud/home/credentials).
- Odoo-style ERP: purple-ish top bar (#714B67) with a grid "main menu" icon and the current app name; top-right a small bug icon (only after developer mode), and an avatar "SM".
  - Main menu: app tiles Inventory, Purchase, Sales, Contacts, Settings.
  - Settings page: top menu "General Settings | Users & Companies | Technical"; long page; at the bottom a "Developer Tools" section with the link "Activate the developer mode".
  - Users list: columns Name | Login | Latest authentication; rows "Administrator" and "Sarah Mitchell (sarah@brightleaf-demo.com)".
  - User form: "Sarah Mitchell", tabs "Access Rights | Preferences | Account Security". Account Security: "API Keys" section with a "New API Key" button.
  - Pop-ups: "Security Control" (password field shown as dots, button "Confirm Password"); "New API Key" (field "Description", dropdown "Duration", button "Generate Key"); result dialog "API Key Ready" with the masked key, a copy icon and the warning text.
- n8n-style screens: Overview with tabs "Workflows | Credentials | Executions", orange "Create Workflow" with a dropdown arrow containing "Create Credential"; modal "Add new credential" with search; credential form with editable title, four labelled fields, orange "Save", green or red banner at the top after testing.

DATA TO SHOW (exact)
- Odoo URL: https://brightleaf-demo.odoo.com/odoo ; Settings https://brightleaf-demo.odoo.com/odoo/settings ; after activation the URL gains "?debug=1".
- API key description: "n8n Stocky"; Duration: "3 months" (illustrative note chip: "Expires Feb 17, 2027: write it in your Credentials Safety Log").
- Masked Odoo key: ••••••••••••••••••••7c2e ; warning "Make sure to copy your new key now. You won't be able to see it again."
- n8n credential: search "Odoo" -> "Odoo API".
- Fields, filled one at a time:
  1 Site URL: https://brightleaf-demo.odoo.com   (tag: "nothing after .com")
  2 Username: sarah@brightleaf-demo.com   (tag: "the email you log in to Odoo with")
  3 Password or API Key: dots only   (tag: "the API key, NOT your password")
  4 Database Name: brightleaf-demo   (tag: "first part of your web address")
- Credential name: "Odoo account" -> "Odoo – BrightLeaf".
- Success banner: "Connection tested successfully".
- Failure demo: Database Name changed to "brightleaf_demo" (typo) -> red banner "Couldn't connect with settings" (illustrative); checklist card: "1 Extra text at the end of the URL / 2 Typo in the database name / 3 Password pasted instead of the API key"; fixed back to "brightleaf-demo" -> green banner again.
- Final Credentials list: "Anthropic – BrightLeaf" and "Odoo – BrightLeaf".
- BEGINNER MISTAKE chip: "Don't remember an Odoo password? If you signed in with your Odoo.com account, use that password."
- PRO TIP chip: "Not sure of the database name? odoo.com > My Databases."

TIMELINE (scene by scene; times relative to the start of this demo)
1. 00:00-00:10 | Browser on the Odoo tab (main menu tiles). Cursor clicks the "Settings" tile; the Settings page loads. | Callout: "Odoo needs its own key card".
2. 00:10-00:24 | Smooth scroll to the bottom; yellow box around "Activate the developer mode" in "Developer Tools". | Callout: "Changes no data. Just shows a few extra menus."
3. 00:24-00:33 | Cursor clicks the link; white reload flash; URL gains "?debug=1"; a bug icon fades into the top bar; zoom 1.6 on it, then out. | Callout: "Bug icon = developer mode is ON".
4. 00:33-00:47 | Cursor clicks "Users & Companies" > "Users"; the list shows; clicks "Sarah Mitchell"; the user form opens; clicks the "Account Security" tab; clicks "New API Key". | Callout: "Your own user".
5. 00:47-00:58 | "Security Control" pop-up; password typed as dots; click "Confirm Password". The BEGINNER MISTAKE chip appears at the bottom-left for 5 s. | Callout: "Odoo checks it's really you".
6. 00:58-01:15 | "New API Key" dialog: types "n8n Stocky" in Description; Duration dropdown -> "3 months" (note chip about the expiry date); clicks "Generate Key". Result dialog shows ••••••••••••••••••••7c2e and the warning; zoom 1.5; cursor clicks the copy icon ("Copied"). | Callout: "Shown once. Copy it and go straight to n8n."
7. 01:15-01:31 | Cursor clicks the n8n tab. Overview > Credentials; arrow next to "Create Workflow" > "Create Credential"; types "Odoo"; selects "Odoo API"; "Continue". The form shows four empty fields. | Callout: "Four fields, like a delivery address with four lines".
8. 01:31-02:06 | Fields fill one at a time, each with a numbered yellow tag (about 8 s each): Site URL (01:32), Username (01:40), Password or API Key as dots via paste (01:48), Database Name (01:56; a dotted line links "brightleaf-demo" in the Site URL to this field). The PRO TIP chip appears at 02:01. | Tags as in DATA.
9. 02:06-02:18 | Cursor clicks the title "Odoo account" and types "Odoo – BrightLeaf"; clicks "Save"; spinner; green banner "Connection tested successfully". | Callout: "n8n knocked, showed the key card, Odoo said 'come in'".
10. 02:18-02:34 | Example (small grey "example" tag): Database Name edited to "brightleaf_demo"; Save; red banner "Couldn't connect with settings"; checklist card with the three usual causes appears; cursor fixes it back to "brightleaf-demo"; Save; green banner returns. | Callout: "Red? Check these three things".
11. 02:34-02:44 | Modal closes; the Credentials list shows two rows: "Anthropic – BrightLeaf" and "Odoo – BrightLeaf", each with a padlock icon. | Callout: "A brain, and a door to the ERP".
12. 02:44-02:45 | END card. | "END"

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00-00:33] Over to Odoo, our central filing cabinet. Odoo needs its own key card too. In some versions, the key menu is hidden until you switch on developer mode. Don't let the name scare you. It changes no data, it just shows a few extra menus. Go to Settings, scroll all the way to the bottom, and click "Activate the developer mode". The page reloads, and you'll see a little bug icon at the top. That's how you know it's on.
[00:33-00:47] Now, in Settings, click "Users and Companies", then "Users". Click your own user. I'm logged in as Sarah. Open the tab called "Account Security". And there's the button: "New API Key". Click it.
[00:47-01:15] Odoo asks for your password first, to be sure it's really you. Then add a description. I'll write "n8n Stocky". Some Odoo versions also ask how long the key should last. Pick a sensible length, like three months, and write the expiry date in your Credentials Safety Log. Click "Generate Key". Same rule as before: Odoo shows this key once. Copy it, and go straight to n8n.
[01:15-01:31] Back in n8n: "Create Credential", search "Odoo", and select "Odoo API". This one has four fields. Think of it as a delivery address with four lines. Get any line wrong, and the waiter can't find the kitchen.
[01:31-02:06] Line one, Site URL. That's the address in your browser bar, starting with https and ending with dot odoo dot com, with nothing after it. Line two, Username. That's the email you log in to Odoo with. Line three, Password or API Key. Paste the key we just generated, not your password. Line four, Database Name. On Odoo Online, this is usually the first part of your web address. My address is brightleaf-demo dot odoo dot com, so my database is called "brightleaf-demo".
[02:06-02:18] Rename it "Odoo, BrightLeaf", and click "Save". And there it is: "Connection tested successfully". n8n just knocked on Odoo's door, showed the key card, and Odoo said "come in".
[02:18-02:34] See a red error instead? It's almost always one of three things: extra text at the end of the URL, a typo in the database name, or your password pasted instead of the API key. Fix it and save again.
[02:34-02:44] Look at our key cabinet. Two keys, both locked away safely. A brain, and a door to the ERP. That's everything Stocky needs.

CHECKLIST
- Total duration exactly 2:45 (165 s), END card in the last second.
- Field values exactly: https://brightleaf-demo.odoo.com / sarah@brightleaf-demo.com / (masked key) / brightleaf-demo.
- Keys and passwords only ever appear as dots or as ••••••••••••••••••••7c2e.
- Final list shows "Anthropic – BrightLeaf" and "Odoo – BrightLeaf".
- Start button, END card, watermark present; nothing overflows the stage.
```

**After Claude builds it:** If your Odoo version shows the API key under "My Profile" instead of Users & Companies, ask Claude to change the click path in scene 4 to match. Record full-screen and trim the first second.

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*392 words, about 2 min 37 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Over to Odoo, our central filing cabinet. Odoo needs its own key card too. In some versions, the key menu is hidden until you switch on developer mode. Don't let the name scare you. It changes no data, it just shows a few extra menus. Go to Settings, scroll all the way to the bottom, and click "Activate the developer mode". The page reloads, and you'll see a little bug icon at the top. That's how you know it's on.

Now, in Settings, click "Users and Companies", then "Users". Click your own user. I'm logged in as Sarah. Open the tab called "Account Security". And there's the button: "New API Key". Click it.

Odoo asks for your password first, to be sure it's really you. Then add a description. I'll write "n8n Stocky". Some Odoo versions also ask how long the key should last. Pick a sensible length, like three months, and write the expiry date in your Credentials Safety Log. Click "Generate Key". Same rule as before: Odoo shows this key once. Copy it, and go straight to n8n.

Back in n8n: "Create Credential", search "Odoo", and select "Odoo API". This one has four fields. Think of it as a delivery address with four lines. Get any line wrong, and the waiter can't find the kitchen.

Line one, Site URL. That's the address in your browser bar, starting with https and ending with dot odoo dot com, with nothing after it. Line two, Username. That's the email you log in to Odoo with. Line three, Password or API Key. Paste the key we just generated, not your password. Line four, Database Name. On Odoo Online, this is usually the first part of your web address. My address is brightleaf-demo dot odoo dot com, so my database is called "brightleaf-demo".

Rename it "Odoo, BrightLeaf", and click "Save". And there it is: "Connection tested successfully". n8n just knocked on Odoo's door, showed the key card, and Odoo said "come in".

See a red error instead? It's almost always one of three things: extra text at the end of the URL, a typo in the database name, or your password pasted instead of the API key. Fix it and save again.

Look at our key cabinet. Two keys, both locked away safely. A brain, and a door to the ERP. That's everything Stocky needs.
```
<!-- VOICEOVER END -->

---
