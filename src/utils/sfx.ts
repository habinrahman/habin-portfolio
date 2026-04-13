let ctx: AudioContext | null = null
let lastAt = 0

function getCtx() {
  if (ctx) return ctx
  // Created on demand (must be triggered by user gesture in most browsers).
  ctx = new AudioContext()
  return ctx
}

function nowMs() {
  return performance.now()
}

function playTone(frequency: number, durationMs: number, gainValue: number) {
  const t = nowMs()
  if (t - lastAt < 40) return
  lastAt = t

  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()

  osc.type = 'sine'
  osc.frequency.value = frequency
  gain.gain.value = 0

  osc.connect(gain)
  gain.connect(c.destination)

  const start = c.currentTime + 0.001
  const end = start + durationMs / 1000

  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(gainValue, start + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, end)

  osc.start(start)
  osc.stop(end + 0.01)
}

export function sfxTick() {
  playTone(920, 26, 0.015)
}

export function sfxUnlock() {
  playTone(520, 60, 0.02)
  // tiny “chirp” tail
  window.setTimeout(() => playTone(780, 40, 0.012), 35)
}

