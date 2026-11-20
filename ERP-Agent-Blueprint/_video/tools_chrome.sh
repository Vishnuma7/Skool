#!/bin/zsh
# Launch the dedicated capture Chrome (separate profile, remote debugging on 9333).
exec "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --user-data-dir="$(dirname $0)/work/chrome-profile" --remote-debugging-port=9333 \
  --no-first-run --no-default-browser-check --window-size=1600,1000 \
  "https://www.odoo.com/trial" "https://app.n8n.cloud/register" "https://claude.ai/login" >/dev/null 2>&1
