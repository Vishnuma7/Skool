# Context and Decisions: Intro Video Launch

Background for anyone (human or AI assistant) picking up this work. Read this before changing the scripts.

## The situation
- **Agentic SCM** is a Skool community (`skool.com/agentic-scm-6915`) run by Adithyan P B, co-founder of Experidium (builds AI agents for procurement, inventory and demand planning).
- About 549 members, of which 540+ are on the **free tier**.
- Plan: switch the community to **paid only ($49/month)** for new joiners, and convert existing free members to the paid tier with the free intro lesson. The model may switch back to **freemium** later.
- The community is at an **early stage**: today the main paid content is **The ERP Agent Blueprint** (10 videos, ~4 hours, no code, n8n + Odoo). There is no large library of resources yet.

## The three videos
| Video | Where | Length | Job | Files |
|---|---|---|---|---|
| **Long intro** (free lesson) | Skool Classroom + launch post | ~9–10 min | Teach, show the Stocky demo, convert free members to the paid tier | `script/Intro_Long_Script.*` |
| **Short teaser** | Skool feed, LinkedIn, Reels, About page (2nd) | under 60 s | Stop the scroll, show Stocky, send people to the Blueprint | `script/Intro_Short_Script.*` |
| **About video** | Skool About page (1st), where people decide to join | ~50–55 s | Who/why, the first agent you build, join | `script/About_Video_FINAL_Read_To_Camera.pdf` (final, approved) + `script/About_Video_Script.*` |

The long and short are recorded in one session (long first, then the short's two on-camera parts); the short reuses the long video's demo footage. See `Production_Plan.md`.

## Decisions (do not undo without asking)
1. **One upgrade line, word for word, everywhere:** "Upgrade to the Agentic SCM paid tier and build Stocky yourself." Asked twice in the long video (after the demo and at the end) and once in the short.
2. **No price is spoken in any video.** The About video goes further: no pricing or membership words at all (price, paid, free, upgrade, tier, monthly, cancel), because the model may switch back to freemium.
3. **No founding-member offer.** There isn't one. No deadlines or fake urgency anywhere.
4. **No single upgrade link.** Each member's upgrade link is personal, so videos send people to **The ERP Agent Blueprint in the Classroom** (button word in the scripts: "unlock"; check it matches Skool's real button). For outsiders (LinkedIn), use the public About page link.
5. **Only promise what exists today.** No member counts, testimonials, savings figures or claims of a big library. Weekly live sessions and templates are mentioned in the long script; confirm they're real before recording, or soften them to "coming".
6. **The ERP Agent Blueprint is the main reason to upgrade**; live sessions, templates and new courses only support it. Sell the transformation (from copying ERP data by hand to your own agent that drafts POs for approval), not the feature list.
7. **The About video does not mention Stocky or show a demo** (the short teaser next to it does that).
8. **Short videos have a hard 60-second limit.**
9. **Plain, simple hooks.** No money maths in short hooks (it confused viewers). The long video keeps one "$18,000 a year" line, set up with context.
10. **Presenter facts:** Adithyan, co-founder of Experidium. Do not mention any other employer. Do not add titles, years, clients or results. His design rule, "the agent prepares the work, a person approves it", fits the course.
11. **"No code" is accurate** (n8n is a no-code tool) and matches the rest of the course; keep it.

## Converting the 540+ free members (launch plan summary)
- **Channels:** Skool post with "email all members" ticked (strongest), pinned post, the free lesson as the first Classroom item with the Blueprint locked right next to it, a live "Build Stocky" workshop, personal DMs to the most active free members, LinkedIn.
- **Rough sequence:** Day 0 launch post + email · Days 1–3 reply to every comment · Day 6 live workshop · Days 7–13 reminder posts showing what members build (no invented deadlines).
- **Check in Skool first:** whether existing free members keep free access when the group goes paid-only. The course must be **locked to the paid tier**, not just the joining fee raised.
- Typical free-to-paid conversion is a few percent; a strong launch to a warm group might reach ~5–10% (planning estimate, not data).

## Voice-over and audio tools (in `ERP-Agent-Blueprint/_tools/`)
- `fish_tts.py`: Fish Audio TTS (model `drama-3`, default voice `6d11afc7494f48fcac22c708c73ba6a6`; earlier voice `361418c36a5e42f7b899a5bdf71f4722`). Reads `FISH_API_KEY` from `.env` in the repo root (git-ignored; never commit it). `--enhance` also writes a studio-polished copy.
- `enhance_audio.py`: ffmpeg chain (rumble cut, light denoise, voice EQ, de-esser, compression, two-pass loudness to −16 LUFS / −1.5 dBTP, 48 kHz). Needs ffmpeg on PATH.
- `md2docx.py` / `md2pdf.py`: build Word/PDF from the `.md` scripts. `md2pdf.py` now works on Windows and macOS.

## Windows setup notes
- Python packages for the doc tools live in the repo's `.venv` (git-ignored): `python -m venv .venv` then `.venv\Scripts\python -m pip install python-docx reportlab fonttools`.
- The Remotion video project in `ERP-Agent-Blueprint/_video/` is written for macOS (`.sh` scripts, `python3`, `/Users/...` paths).
- Recording 4K video needs several GB of free disk space.

## Still open
- Confirm the Skool button name on the locked course ("unlock" in the scripts).
- Confirm weekly live sessions / templates exist before recording the long video.
- Update `ERP-Agent-Blueprint/00_Free_Lesson/source/Free_Screen_Recording_Prompts.md` for the new "journey" and "What's in the paid tier" slides.
- The short teaser says "upgrade to the paid tier"; if the community goes freemium-only (no tiers), its ending needs changing.
- Make the two slides (journey, paid tier) and the end cards.
