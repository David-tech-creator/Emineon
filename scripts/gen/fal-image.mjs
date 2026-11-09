#!/usr/bin/env node
// Photoreal alternates via fal flux-pro v1.1 ultra (queue API).
// Usage: node scripts/gen/fal-image.mjs <key> [seed]   (FAL_KEY in env)
// Output: _gen/img/<key>-flux-v<N>.png — select it via _gen/picks.json to use it.
import { writeFileSync, existsSync, appendFileSync } from 'node:fs';
import { IMAGES, fullPrompt } from './prompts.mjs';

const [key, seedArg] = process.argv.slice(2);
const model = 'fal-ai/flux-pro/v1.1-ultra';
const seed = seedArg ? Number(seedArg) : Math.floor(Math.random() * 1e9);
const auth = { Authorization: `Key ${process.env.FAL_KEY}` };
const prompt = fullPrompt(key);
const body = { prompt, aspect_ratio: IMAGES[key].size === 'P' ? '2:3' : '3:2', raw: true, output_format: 'png', seed, safety_tolerance: '2', enable_safety_checker: true };
const sub = await (await fetch(`https://queue.fal.run/${model}`, { method: 'POST', headers: { ...auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) })).json();
if (!sub.status_url) { console.error(JSON.stringify(sub).slice(0, 400)); process.exit(1); }
for (;;) {
  await new Promise((r) => setTimeout(r, 4000));
  const st = await (await fetch(sub.status_url, { headers: auth })).json();
  if (st.status === 'COMPLETED') break;
  if (!['IN_QUEUE', 'IN_PROGRESS'].includes(st.status)) { console.error(JSON.stringify(st).slice(0, 400)); process.exit(1); }
}
const out = await (await fetch(sub.response_url, { headers: auth })).json();
const buf = Buffer.from(await (await fetch(out.images[0].url)).arrayBuffer());
let v = 1;
while (existsSync(`_gen/img/${key}-flux-v${v}.png`)) v++;
const file = `_gen/img/${key}-flux-v${v}.png`;
writeFileSync(file, buf);
appendFileSync('_gen/log.jsonl', JSON.stringify({ key, file, model, seed, raw: true, prompt, at: new Date().toISOString() }) + '\n');
console.log(`[${key}] -> ${file} (seed ${seed})`);
