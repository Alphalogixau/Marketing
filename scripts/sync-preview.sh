#!/usr/bin/env bash
#
# Publishes this site as a staff-only preview inside the alphalogix-tools hub.
#
# The tools hub is an Azure Static Web App behind Entra ID auth
# (staticwebapp.config.json routes /* to "authenticated"), so the preview is
# visible to staff and to nobody else.
#
#   ./scripts/sync-preview.sh ../alphalogix-tools
#
# Idempotent: safe to re-run after every change to this site. Re-running is
# how the preview stays current — it is a copy, not a live deploy, so it goes
# stale until you sync again.
#
# It does three things to the tools repo, then leaves the commit to you:
#   1. builds this site with basePath=/web-preview and copies it to web-preview/
#   2. adds /web-preview/* to navigationFallback.exclude, or deep links fall
#      through to the hub's own index.html
#   3. inserts the hub tool card into index.html
#
set -euo pipefail

TOOLS_REPO="${1:-}"
BASE_PATH="/web-preview"

if [[ -z "$TOOLS_REPO" ]]; then
  echo "usage: $0 <path-to-alphalogix-tools-clone>" >&2
  exit 64
fi
if [[ ! -f "$TOOLS_REPO/index.html" || ! -f "$TOOLS_REPO/staticwebapp.config.json" ]]; then
  echo "error: $TOOLS_REPO does not look like alphalogix-tools" >&2
  echo "       expected index.html and staticwebapp.config.json at its root" >&2
  exit 66
fi

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$HERE"

echo "==> building with basePath=$BASE_PATH"
rm -rf out
PREVIEW_BASE_PATH="$BASE_PATH" npm run build >/dev/null

echo "==> verifying the build serves correctly from $BASE_PATH"
PREVIEW_BASE_PATH="$BASE_PATH" npm run verify:preview

DEST="$TOOLS_REPO${BASE_PATH}"
echo "==> copying $(find out -type f | wc -l | tr -d ' ') files to $DEST"
rm -rf "$DEST"
mkdir -p "$DEST"
cp -R out/. "$DEST/"

echo "==> patching staticwebapp.config.json"
python3 - "$TOOLS_REPO" "$BASE_PATH" <<'PY'
import json, sys, pathlib
repo, base = sys.argv[1], sys.argv[2]
p = pathlib.Path(repo) / 'staticwebapp.config.json'
cfg = json.loads(p.read_text(encoding='utf-8'))
pattern = f'{base}/*'
ex = cfg.setdefault('navigationFallback', {}).setdefault('exclude', [])
if pattern in ex:
    print(f'    exclude already contains {pattern}')
else:
    ex.append(pattern)
    p.write_text(json.dumps(cfg, indent=2) + '\n', encoding='utf-8')
    print(f'    added {pattern} to navigationFallback.exclude')
PY

echo "==> inserting the hub tool card"
python3 - "$TOOLS_REPO" "$HERE" "$BASE_PATH" <<'PY'
import sys, pathlib, re
repo, here, base = sys.argv[1], sys.argv[2], sys.argv[3]
index = pathlib.Path(repo) / 'index.html'
html = index.read_text(encoding='utf-8')

marker = 'data-alphalogix-web-preview'
if marker in html:
    print('    card already present')
    raise SystemExit(0)

snippet = (pathlib.Path(here) / 'docs/tools-hub-card.html').read_text(encoding='utf-8')
card = re.sub(r'(?s)^.*?(<a class="tool")', r'\1', snippet).strip()
card = card.replace('href="#SET-DESTINATION-SEE-COMMENT-ABOVE"', f'href="{base}/"')
card = card.replace('<a class="tool"', f'<a class="tool" {marker}', 1)
card = card.replace(
    '<span class="host">Alphalogixau/Marketing &middot; PR #3</span>',
    f'<span class="host">{base}/</span>')

# Insert AFTER the first existing tool card, so the hub's own featured tool
# keeps top position and any HTML comment introducing it still sits directly
# above the card it describes.
m = re.search(r'([ \t]*)<a class="tool', html)
if not m:
    print('    ERROR: no existing <a class="tool"> found — insert manually', file=sys.stderr)
    raise SystemExit(1)
indent = m.group(1)
close = re.compile(r'\n' + re.escape(indent) + r'</a>')
c = close.search(html, m.end())
if not c:
    print('    ERROR: could not find the end of the first tool card — insert manually',
          file=sys.stderr)
    raise SystemExit(1)
at = c.end()
block = '\n'.join(indent + line if line.strip() else line for line in card.split('\n'))
html = html[:at] + '\n\n' + block + html[at:]
index.write_text(html, encoding='utf-8')
print('    card inserted after the first existing tool card')
PY

cat <<EOF

Done. Review, then commit in the tools repo:

  cd $TOOLS_REPO
  git status
  git add web-preview staticwebapp.config.json index.html
  git commit -m "Add staff preview of the new alphalogix.com.au"
  git push

Azure will deploy it to tools.alphalogix.com.au${BASE_PATH}/ (staff auth required).

Note: links to /service/*, /blog/* and /case-study/* point at the WordPress
site and will 404 on the tools domain. That is expected for a preview hosted
off-domain, not a fault in the build.
EOF
