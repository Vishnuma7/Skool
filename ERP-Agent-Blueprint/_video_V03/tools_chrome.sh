#!/usr/bin/env bash
# Launch the dedicated capture Chrome (separate profile, remote debugging on 9333).
# Works on macOS and on Windows (Git Bash). Sign in to Odoo / n8n / claude.ai once in this window; it remembers.
DIR="$(cd "$(dirname "$0")" && pwd)/work/chrome-profile"
mkdir -p "$DIR"
case "$(uname -s)" in
  Darwin) CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ;;
  MINGW*|MSYS*|CYGWIN*)
    CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
    [ -x "$CHROME" ] || CHROME="$LOCALAPPDATA/Google/Chrome/Application/chrome.exe"
    DIR="$(cygpath -w "$DIR")" ;;
  *) CHROME="$(command -v google-chrome || command -v chromium)" ;;
esac
"$CHROME" --user-data-dir="$DIR" --remote-debugging-port=9333 \
  --no-first-run --no-default-browser-check --window-size=1600,1000 \
  "https://brightleaf-supplies.odoo.com/web/login" >/dev/null 2>&1 &
echo "Capture Chrome started (profile: $DIR, debug port 9333)"
