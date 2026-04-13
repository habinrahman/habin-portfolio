/**
 * One-step hero headshot: crops to a tight square (top-weighted for face + chest),
 * bumps contrast/sharpness, outputs WebP under 200KB when possible.
 *
 * Usage: add `public/headshot-source.jpg` (or .png), then:
 *   npm run optimize:headshot
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const publicDir = path.join(root, 'public')

const candidates = ['headshot-source.jpg', 'headshot-source.jpeg', 'headshot-source.png']
const outWebp = path.join(publicDir, 'headshot.webp')

let input = candidates.map((f) => path.join(publicDir, f)).find((p) => fs.existsSync(p))

if (!input) {
  console.warn(
    '[optimize-headshot] No source found. Add one of:\n  public/headshot-source.jpg\n  public/headshot-source.png\nThen run: npm run optimize:headshot',
  )
  process.exit(0)
}

// 2× display size (72px → 144px) for crisp retina
const size = 288

// Attention-based crop keeps the face / subject centered when trimming background
let pipeline = sharp(input).rotate().resize(size, size, {
  fit: 'cover',
  position: sharp.strategy.attention,
})

pipeline = pipeline
  .modulate({ saturation: 0.97 })
  .linear(1.06, -(128 * 0.03))
  .sharpen({ sigma: 0.65, m1: 0.8, m2: 0.15 })

let buf = await pipeline.webp({ quality: 82, effort: 6 }).toBuffer()

if (buf.length > 200_000) {
  buf = await sharp(buf).webp({ quality: 72, effort: 6 }).toBuffer()
}

fs.writeFileSync(outWebp, buf)
const kb = (buf.length / 1024).toFixed(1)
console.log(`[optimize-headshot] Wrote public/headshot.webp (${kb} KB) from ${path.basename(input)}`)
