"""whisper (-dtw) JSON -> src/data/words.json  {clip: [[word, start, end], ...]} with spelling fixes.
Also sets clips.json 'from' (head trim) using the first word."""
import json, re, pathlib
ROOT = pathlib.Path(__file__).resolve().parent
FIX = {"stokke":"Stocky","stocky":"Stocky","stokey":"Stocky","sara":"Sarah","sarva":"Sarah","odo":"Odoo","brightleaf":"BrightLeaf",
       "symbol":"simple","cloud":"Claude","stretchwalk":"stretch wrap","board":"bot"}
def words_of(path):
    d = json.load(open(path)); ws = []
    for s in d["transcription"]:
        for t in s["tokens"]:
            txt = t["text"]
            if txt.startswith("[_") or t.get("t_dtw", -1) < 0: continue
            ts = max(0.0, t["t_dtw"]/100 - 0.06)
            if ws and not txt.startswith(" ") and re.match(r"[\w']", txt[:1]):
                ws[-1][0] += txt; ws[-1][2] = ts + 0.15
            elif ws and not txt.startswith(" "):
                ws[-1][0] += txt
            else:
                ws.append([txt.strip(), ts, ts + 0.2])
    for i in range(len(ws) - 1): ws[i][2] = min(ws[i][2] if ws[i][2] > ws[i][1] else ws[i][1]+0.2, ws[i+1][1])
    for w in ws:
        core = re.sub(r"[^\w]", "", w[0]).lower()
        if core in FIX: w[0] = re.sub(r"[\w]+", FIX[core], w[0], count=1)
    return [w for w in ws if w[0]]
if __name__ == "__main__":
    out = {str(i): words_of(ROOT/f"work/tx/{i}.json") for i in range(1, 22)}
    (ROOT/"src/data/words.json").write_text(json.dumps(out))
    clips = json.load(open(ROOT/"work/clips.json"))
    for k, ws in out.items():
        clips[k]["from"] = round(max(0.0, ws[0][1] - 0.3), 3)
        print(k, "from", clips[k]["from"], "to", clips[k]["to"], "|", " ".join(w[0] for w in ws[:6]))
    json.dump(clips, open(ROOT/"work/clips.json", "w"), indent=1)
