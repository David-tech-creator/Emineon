// Contact sheet of icons + brand marks -> _gen/icons.html
//   node scripts/gen/sheet.mjs && browse goto file://.../_gen/icons.html
import { writeFileSync, readFileSync } from "node:fs";
import { ICONS, ICON_KEYS } from "../../src/components/icons/data.ts";

const root = new URL("../../", import.meta.url).pathname;
const icon = (k, size, accent = false, sw = 1.5) => {
  const d = ICONS[k];
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none"><g stroke="currentColor" stroke-width="${sw}" stroke-linecap="square" stroke-linejoin="miter">${d.strokes
    .map((p) => `<path d="${p}"/>`)
    .join("")}</g><g fill="${accent ? "#FF5B1F" : "currentColor"}">${d.nodes
    .map(([x, y, r = 1.5]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`)
    .join("")}</g></svg>`;
};
const brand = (f) => readFileSync(root + "public/brand/" + f, "utf8");

const grid = (k) =>
  `<svg viewBox="0 0 24 24" width="96" height="96" class="g"><defs><pattern id="p${k}" width="1" height="1" patternUnits="userSpaceOnUse"><path d="M1 0H0V1" fill="none" stroke="rgba(237,234,227,.07)" stroke-width=".05"/></pattern></defs><rect width="24" height="24" fill="url(#p${k})"/><rect x="2" y="2" width="20" height="20" fill="none" stroke="rgba(255,91,31,.25)" stroke-width=".05"/></svg>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><title>Emineon icon sheet</title>
<style>
body{margin:0;background:#07080A;color:#EDEAE3;font:13px/1.4 ui-monospace,Menlo,monospace;padding:40px}
h2{font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;color:#9A978F;margin:40px 0 16px}
.icons{display:grid;grid-template-columns:repeat(8,1fr);border-top:1px solid rgba(237,234,227,.09);border-left:1px solid rgba(237,234,227,.09)}
.cell{border-right:1px solid rgba(237,234,227,.09);border-bottom:1px solid rgba(237,234,227,.09);padding:18px 14px 12px;display:flex;flex-direction:column;align-items:center;gap:12px}
.big{position:relative;width:96px;height:96px}.big svg{position:absolute;inset:0}
.row{display:flex;gap:14px;align-items:center}
.lbl{font-size:10px;color:#9A978F;letter-spacing:.08em}
.light{background:#EDEAE3;color:#0B0C0E;padding:24px;display:flex;flex-wrap:wrap;gap:22px}
.logos{display:flex;gap:48px;align-items:flex-end;flex-wrap:wrap}
.logos>div{display:flex;flex-direction:column;gap:8px}
.ink{background:#EDEAE3;padding:24px}
</style></head><body>
<h2>[ Icons — 96 / 24 / 20 / 16 px · accent ]</h2>
<div class="icons">${ICON_KEYS.map(
  (k) =>
    `<div class="cell"><div class="big">${grid(k)}${icon(k, 96)}</div><div class="row">${icon(k, 24)}${icon(k, 20)}${icon(k, 16)}${icon(k, 24, true)}</div><div class="lbl">${k}</div></div>`,
).join("")}</div>
<h2>[ Icons on bone — 24 px ]</h2>
<div class="light">${ICON_KEYS.map((k) => icon(k, 24)).join("")}</div>
<h2>[ Icons in context — 32 px, accent ]</h2>
<div class="light" style="background:#0D0F12;color:#EDEAE3">${ICON_KEYS.map((k) => icon(k, 32, true)).join("")}</div>
<h2>[ Brand — identity 08 + Dot Oak ]</h2>
<div class="logos ink">
 <div style="width:420px">${brand("wordmark-ink.svg")}<span class="lbl">wordmark 420</span></div>
 <div style="width:110px">${brand("wordmark-ink.svg")}<span class="lbl">wordmark 110 (nav)</span></div>
 <div style="width:96px">${brand("symbol-ink.svg")}<span class="lbl">symbol 96</span></div>
 <div style="width:32px">${brand("favicon.svg")}<span class="lbl">fav 32</span></div>
 <div style="width:16px">${brand("favicon.svg")}<span class="lbl">16</span></div>
 <div style="width:200px">${brand("dot-oak-ink.svg")}<span class="lbl">dot oak 200</span></div>
</div>
<div class="logos" style="margin-top:24px">
 <div style="width:420px">${brand("wordmark-paper.svg")}<span class="lbl">wordmark on ink</span></div>
 <div style="width:96px">${brand("symbol-paper.svg")}<span class="lbl">symbol</span></div>
 <div style="width:96px">${brand("symbol-ember.svg")}<span class="lbl">one-colour ember</span></div>
 <div style="width:200px">${brand("dot-oak-paper.svg")}<span class="lbl">dot oak</span></div>
</div>
</body></html>`;
writeFileSync(root + "_gen/icons.html", html);
console.log("sheet: _gen/icons.html");
