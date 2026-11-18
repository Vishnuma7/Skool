"""Insert a 'Voice-over text for Fish Audio' block under every prompt in a
Screen_Recording_Prompts.md file, taken from the SAY lines of the matching
[SCREEN RECORDING] section in the video script.

Usage: python add_voiceover.py <script.md> <prompts.md>
Re-running replaces previously inserted blocks (idempotent).
"""
import re
import sys

START = "<!-- VOICEOVER START -->"
END = "<!-- VOICEOVER END -->"
NOTE_START = "<!-- VO NOTE START -->"
NOTE_END = "<!-- VO NOTE END -->"

NOTE = """**Voice-over (Fish Audio):** Under every prompt you'll find a grey **"Voice-over text for Fish Audio"** box. Copy that text into Fish Audio and download the audio. Best order: make the audio FIRST, check its length, and if it's longer or shorter than the section length, add one line to the prompt before sending it to Claude: *"Make the total duration exactly M:SS"* (your audio length). Claude's demo has no sound, so you join the audio and video in a video editor (CapCut, iMovie, Descript): put both on the timeline starting at 0:00."""

STOP = re.compile(r"^(\*\*(SHOW|ON-SCREEN TEXT|SAY)[^*]*:\*\*|>|## |---\s*$|\|)")


def clean(text):
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*\s][^*]*)\*", r"\1", text)
    text = text.replace("`", "")
    return re.sub(r"[ \t]+", " ", text).strip()


def say_sections(script_path):
    lines = open(script_path, encoding="utf-8").read().splitlines()
    sections, cur, in_screen = [], None, False
    i = 0
    while i < len(lines):
        s = lines[i].strip()
        if s.startswith("## "):
            in_screen = "[SCREEN RECORDING]" in s
            if in_screen:
                cur = []
                sections.append(cur)
            i += 1
            continue
        if in_screen and s.startswith("**SAY"):
            first = re.sub(r"^\*\*SAY[^*]*:\*\*", "", s).strip()
            para, paras = ([first] if first else []), []
            i += 1
            while i < len(lines) and not STOP.match(lines[i].strip()):
                t = lines[i].strip()
                if t:
                    para.append(t)
                elif para:
                    paras.append(" ".join(para))
                    para = []
                i += 1
            if para:
                paras.append(" ".join(para))
            cur.extend(clean(p) for p in paras if clean(p))
            continue
        i += 1
    return sections


def main(script_path, prompts_path):
    sections = say_sections(script_path)
    text = open(prompts_path, encoding="utf-8").read()
    text = re.sub(re.escape(START) + r".*?" + re.escape(END) + r"\n*", "", text, flags=re.S)
    text = re.sub(re.escape(NOTE_START) + r".*?" + re.escape(NOTE_END) + r"\n*", "", text, flags=re.S)

    parts = re.split(r"(?m)^(?=## Prompt )", text)
    head, prompts = parts[0], parts[1:]
    if len(prompts) != len(sections):
        sys.exit(f"MISMATCH {prompts_path}: {len(prompts)} prompts vs {len(sections)} sections")

    head = re.sub(r"(?m)^(\*\*How to use:\*\*.*)$",
                  lambda m: m.group(1) + f"\n\n{NOTE_START}\n{NOTE}\n{NOTE_END}", head, count=1)

    out = [head]
    for p, paras in zip(prompts, sections):
        words = sum(len(x.split()) for x in paras)
        mins = words / 150
        block = (f"{START}\n### Voice-over text for Fish Audio (paste this)\n"
                 f"*{words} words, about {int(mins)} min {int(round((mins % 1) * 60)):02d} s at a natural pace "
                 f"(150 words/min). Paste it as is; each paragraph is a natural pause.*\n\n"
                 "```text\n" + "\n\n".join(paras) + "\n```\n" + END + "\n\n")
        m = re.search(r"(?m)^\*\*After Claude builds it:\*\*.*$", p)
        if m:
            p = p[:m.end()] + "\n\n" + block + p[m.end():].lstrip("\n")
        else:
            p = p.rstrip() + "\n\n" + block
        out.append(p)
    open(prompts_path, "w", encoding="utf-8").write("".join(out))
    print(f"{prompts_path}: {len(prompts)} voice-over blocks added")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
