#!/usr/bin/env node
// Image-to-video via the fal queue. Uses the same image as first AND last frame
// so the clip loops (near-)seamlessly.
// Usage: node scripts/gen/fal-video.mjs <name> <image.png> "<motion prompt>" [duration=8] [model]
// Requires FAL_KEY in env. Output: _gen/vid/<name>-v<N>.mp4
import { readFileSync, writeFileSync, existsSync, appendFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = require('../../_gen/node_modules/sharp');

const [name, img, prompt, duration = '8', model = 'fal-ai/kling-video/v3/pro/image-to-video'] = process.argv.slice(2);
if (!process.env.FAL_KEY) { console.error('FAL_KEY missing'); process.exit(1); }
mkdirSync('_gen/vid', { recursive: true });
const auth = { Authorization: `Key ${process.env.FAL_KEY}` };

const jpg = await sharp(readFileSync(img)).jpeg({ quality: 92 }).toBuffer();
const dataUri = `data:image/jpeg;base64,${jpg.toString('base64')}`;

const body = {
  prompt,
  start_image_url: dataUri,
  end_image_url: dataUri,
  duration: String(duration),
  generate_audio: false,
  negative_prompt: 'text, letters, watermark, logo, people, faces, fast motion, camera shake, cuts, flicker, blur, distortion, low quality',
  cfg_scale: 0.5,
};
const sub = await fetch(`https://queue.fal.run/${model}`, {
  method: 'POST', headers: { ...auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
});
const subJson = await sub.json();
if (!sub.ok) { console.error('submit failed', sub.status, JSON.stringify(subJson).slice(0, 500)); process.exit(1); }
const { status_url, response_url, request_id } = subJson;
console.log(`[${name}] queued ${request_id}`);

for (;;) {
  await new Promise((r) => setTimeout(r, 10000));
  const st = await (await fetch(status_url, { headers: auth })).json();
  if (st.status === 'COMPLETED') break;
  if (st.status !== 'IN_QUEUE' && st.status !== 'IN_PROGRESS') { console.error('status', JSON.stringify(st).slice(0, 500)); process.exit(1); }
}
const out = await (await fetch(response_url, { headers: auth })).json();
const url = out?.video?.url;
if (!url) { console.error('no video', JSON.stringify(out).slice(0, 500)); process.exit(1); }
const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
let v = 1;
while (existsSync(`_gen/vid/${name}-v${v}.mp4`)) v++;
const file = `_gen/vid/${name}-v${v}.mp4`;
writeFileSync(file, buf);
appendFileSync('_gen/log.jsonl', JSON.stringify({ key: `video:${name}`, file, model, source: img, prompt, duration, request_id, at: new Date().toISOString() }) + '\n');
console.log(`[${name}] -> ${file}`);
