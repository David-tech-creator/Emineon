#!/usr/bin/env node
// Measures loop seamlessness: per-frame mean abs luma diff (median/p99/max) vs the wrap (last->first).
// Usage: node scripts/gen/loopcheck.mjs public/media/video/<name>.mp4
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = require('../../_gen/node_modules/sharp');
const FF = process.env.FFMPEG || '_gen/node_modules/ffmpeg-static/ffmpeg';

for (const file of process.argv.slice(2)) {
  const dir = mkdtempSync('_gen/lc-');
  execFileSync(FF, ['-v', 'error', '-i', file, '-vf', `scale=${process.env.LC_W || 96}:-2:flags=area,format=gray`, `${dir}/%04d.png`]);
  const px = [];
  for (const f of readdirSync(dir).sort()) px.push(await sharp(readFileSync(`${dir}/${f}`)).raw().toBuffer());
  rmSync(dir, { recursive: true });
  const d = (a, b) => { let t = 0; for (let i = 0; i < a.length; i++) t += Math.abs(a[i] - b[i]); return t / a.length; };
  const ds = []; for (let i = 1; i < px.length; i++) ds.push(d(px[i - 1], px[i]));
  ds.sort((a, b) => a - b);
  console.log(`${file}: frames ${px.length} median ${ds[ds.length >> 1].toFixed(3)} p99 ${ds[Math.floor(ds.length * 0.99)].toFixed(3)} max ${ds.at(-1).toFixed(3)} WRAP ${d(px.at(-1), px[0]).toFixed(3)}`);
}
