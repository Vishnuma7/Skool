# Video 01 Production Prompts

Every instruction given to Claude to produce Video 01 ("Welcome: Why Your ERP Needs an AI Agent") of The ERP Agent Blueprint, in the order it was given. Prompts are quoted as written; answers to Claude's multiple-choice questions are listed as decisions. API keys and the login email are redacted. The last section merges everything into one reusable prompt for Videos 02–10.

Online copy: https://claude.ai/artifact/MpF6idbRGDSkDFTCwTMMLh

## 1. Original brief

The opening prompt, quoted in full.

> check the files in the folder, we are going to create the video_01, i have attached all the on camera recordings in Recording folder use the pdf V01_Full_Script_Corrected_On_Camera_Only.pdf for the full script and for the screen recording creation use the file V01_Screen_Recording_Prompts.pdf also in the same file it includes the speech for screen recording use that also, the important thing is first read the full script for an idea what you are going to create.
>
> use minimalistic edit professional editing, do necessary color grading and audio enchnacing of the raw footage shots. and for the screen recording dont do zoom in instead use highlight box without label. in the raw video you can include motion graphics and special effecrts to enchance it. also use the motion graphics to list the things and represent the numbers etc...
>
> we need voiceover matching screen recording and we are planning to use my trained voice model from fish audio on the final take not now. for now can proceed with british voice and later on after final take and edits we can replace with fish audio trained model for the final output so our credits wont be exhauseted. the voice over should match the visual and when there are some delays on processing or buffering you can trim out the time wasted.
>
> for the caption part dont burn the caption to video instaed it needs to be like switch on off type. generate the necessary visuals or graphics that needs to be placed on where it feels blank. set up all the necessary things required to run and screen record the video, the script is like story telling so make necessary visuals if needed, if you add those videos then move the raw video to one side of the video frame with round boder.
>
> if anything feels odd you have the permission to correct it but you need to highlight in chat response that you have chnaged. ask me as enough questions to clear your doiubts before proceding so we wont be wasting time.

## 2. Decisions from clarifying questions

Twelve decisions, in the order they were asked. Words in quotes are what was typed; the rest is the option chosen.

| # | Question | Decision |
| --- | --- | --- |
| 1 | How to produce the screen-recording sections | "what about using the real systems and doing the processes then recording it" |
| 2 | Temporary British voice | Edge neural, male (en-GB-RyanNeural) |
| 3 | Where the video will be hosted (decides caption format) | YouTube / Vimeo embed |
| 4 | Background music and sound effects | Subtle music + light SFX |
| 5 | Which real accounts already exist | "currently nothing is setup in this pc" |
| 6 | Who does the clicking during capture | "you will do everything i will do setup the account, i only will do simple assist not everything" |
| 7 | Stocky's "public holiday in China next week" claim | Make it true with real data |
| 8 | Final export resolution | 4K |
| 9 | Which Google account holds Gmail and the decision-log Sheet | "you can simulate google acount" |
| 10 | AI model key for the n8n AI Agent node | "i will give you open router api key" |
| 11 | Real claude.ai answer named the account's connectors; how to handle the chatbot demo | Simulate claude.ai with the script's exact answer |
| 12 | The bright lime-green wall behind the presenter | "colorgrade the bg dont remove it" |

## 3. Setup details provided

Given after creating the Odoo trial, the n8n Cloud trial and logging in to claude.ai in the capture browser. The original message asked: "add these to .env file".

| Item | Value |
| --- | --- |
| Odoo URL | https://brightleaf-supplies.odoo.com |
| Odoo database | brightleaf-supplies.odoo.com (Claude used `brightleaf-supplies`, which is what the API accepts) |
| Odoo user | [redacted login email] |
| Odoo API key | [redacted] |
| OpenRouter API key | [redacted] |
| n8n workspace | brightleaf.app.n8n.cloud |

The real values live only in `_video/.env`, which is git-ignored.

## 4. Follow-ups during production

Short instructions and questions while the edit and renders ran, in order.

1. "i am going to sleep , so do all the necessary things"
2. "what is the status ?"
3. "i mean like how long would it take to complete ?"
4. "does it take too much clAUDE OR IST IT JUST A LOCAL SYSTEM PROCESS ?"
5. "what is the status. ?"
6. "don't start to render 4k yet , we have to review the 1080p video with our team and need to check for the changes or issues"

## 5. Review feedback on the 1080p cut

Two changes requested after watching the review cut; both are still open.

> the man issue i found is like the colour grading of the raw on camera video can we grade the bg to something like dark studio vibe like the yt studio interior shades, dark and glowing by just colour grading the current bg. also need some fast cut editing for the raw on camera video. like rn it feels the edits are very minimalisitc for the raw on camera video , if you have any doubts feel free to ask it before proceeding

- [ ] Background: grade the green wall into a dark, glowing studio look, by colour grading only (no removal or replacement)
- [ ] On-camera edit: faster, more dynamic cutting than the current minimal edit

Later requests: put all of these prompts in one doc, then "do it and push" (save this copy in the repo and push it).

## 6. Consolidated master prompt

All of the above merged into one prompt. Swap `NN` for the video number; the review feedback is folded in as requirements.

```text
Create Video NN of The ERP Agent Blueprint.

INPUTS
- On-camera recordings: Video_NN/Recording/
- Full script (on-camera lines): Video_NN/VNN_Full_Script_Corrected_On_Camera_Only.pdf. Read the whole script first so you know the story before editing.
- Screen-recording sections and their voice-over text: Video_NN/VNN_Screen_Recording_Prompts.pdf

ON-CAMERA EDIT
- Professional, dynamic editing with fast cuts: trim pauses and dead air, use punch-ins and cut points that keep the pace up.
- Colour grade and audio-enhance every raw clip; match clips shot with different cameras.
- Background: colour grade only (never remove or replace it). Grade the wall into a dark, glowing YouTube-studio look while keeping skin tones natural.
- Add motion graphics and effects to support the story: list items, show numbers, illustrate story beats, and fill moments that feel blank.
- When a graphic or visual needs room, move the presenter to one side of the frame in a rounded-border frame.

SCREEN-RECORDING SECTIONS
- Use the real systems and do the real processes (Odoo, n8n). I create the accounts; you do everything else: staging data, building workflows, driving the browser, capturing and editing.
- Simulate Google (Gmail and Sheets) and the claude.ai chatbot demo, using the script's exact text.
- No zoom-ins. Use highlight boxes without labels.
- Trim time wasted on processing, loading or buffering so the visuals match the voice-over.

VOICE-OVER
- Use the voice-over text from the screen-recording prompts file.
- For now use a temporary British voice (Edge neural, male). After the final edit it will be replaced with my trained Fish Audio voice, so set it up so the swap re-times everything with one re-render.

CAPTIONS
- Never burn captions in. Deliver toggleable captions: .srt and .vtt for YouTube/Vimeo plus an embedded soft subtitle track.

AUDIO
- Subtle background music and light sound effects under the edit.

OUTPUT
- Final export in 4K. Render a 1080p review cut first; do not render 4K until the team has reviewed it.
- AI model for the n8n agent: my OpenRouter key.

CORRECTIONS AND QUESTIONS
- If anything in the script feels wrong, you may correct it (make claims true with real data), but list every change in your reply.
- Ask enough questions before starting so no time is wasted.
```
