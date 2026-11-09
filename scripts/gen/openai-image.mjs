#!/usr/bin/env node
// Usage: node scripts/gen/openai-image.mjs <key> [<key>...] [--extra "prompt addendum"]
// Requires OPENAI_API_KEY in env (set -a; source .env.local; set +a).
// Writes _gen/img/<key>-v<N>.png (never overwrites) and appends to _gen/log.jsonl.
import { writeFileSync, existsSync, appendFileSync, mkdirSync } from 'node:fs';
import { IMAGES, fullPrompt } from './prompts.mjs';

const args = process.argv.slice(2);
let extra = '';
const xi = args.indexOf('--extra');
if (xi >= 0) { extra = args[xi + 1]; args.splice(xi, 2); }
const keys = args;
if (!process.env.OPENAI_API_KEY) { console.error('OPENAI_API_KEY missing'); process.exit(1); }
mkdirSync('_gen/img', { recursive: true });

async function gen(key) {
  const spec = IMAGES[key];
  if (!spec) throw new Error(`unknown key ${key}`);
  const prompt = (extra ? `${extra} ` : '') + fullPrompt(key);
  const size = spec.size === 'P' ? '1024x1536' : '1536x1024';
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model: 'gpt-image-2', prompt, size, quality: 'high', n: 1 }),
    });
    const json = await res.json();
    if (!res.ok) {
      console.error(`[${key}] attempt ${attempt} ${res.status}: ${json?.error?.message}`);
      if (attempt === 3) return;
      await new Promise((r) => setTimeout(r, 5000 * attempt));
      continue;
    }
    let v = 1;
    while (existsSync(`_gen/img/${key}-v${v}.png`)) v++;
    const out = `_gen/img/${key}-v${v}.png`;
    writeFileSync(out, Buffer.from(json.data[0].b64_json, 'base64'));
    appendFileSync('_gen/log.jsonl', JSON.stringify({ key, file: out, model: 'gpt-image-2', size, quality: 'high', prompt, at: new Date().toISOString() }) + '\n');
    console.log(`[${key}] -> ${out}`);
    return;
  }
}

// modest concurrency
const queue = [...keys];
await Promise.all(Array.from({ length: Math.min(5, queue.length) }, async () => {
  while (queue.length) await gen(queue.shift()).catch((e) => console.error(e.message));
}));
