/* [7] Marquees respond to scroll velocity, and [10] statistics
   scrub with scroll rather than firing once.
   Single shared rAF loop for both. */

export function initVelocity () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // touch devices: skip. Rewriting animation-duration each frame is the
  // most expensive thing we do, and it is barely perceptible on a phone.
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return

  const tracks = [...document.querySelectorAll('.ticker div, .bigword div')]
  if (!tracks.length) return

  let last = scrollY
  let vel = 0
  let running = false

  const loop = () => {
    vel *= 0.92 // decay back to rest
    const boost = Math.max(-2.6, Math.min(2.6, vel / 26))

    tracks.forEach((t, i) => {
      // alternate tracks lean opposite ways for counter-motion
      const dir = i % 2 === 0 ? 1 : -1
      const rate = 1 + boost * dir
      t.style.animationPlayState = 'running'
      t.style.animationDirection = rate < 0 ? 'reverse' : 'normal'
      t.style.animationDuration = (Math.max(6, 40 / Math.max(0.14, Math.abs(rate)))) + 's'
    })

    if (Math.abs(vel) > 0.6) requestAnimationFrame(loop)
    else { running = false; tracks.forEach(t => { t.style.animationDuration = ''; t.style.animationDirection = '' }) }
  }

  addEventListener('scroll', () => {
    vel = scrollY - last
    last = scrollY
    if (!running) { running = true; requestAnimationFrame(loop) }
  }, { passive: true })
}

/* [10] scroll-scrubbed counters */
export function initScrubCounters () {
  const els = [...document.querySelectorAll('.num')]
  if (!els.length) return

  const fmt = n => n.toLocaleString('en-IN')

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(el => { el.textContent = fmt(+el.dataset.to) + (el.dataset.suffix || '') })
    return
  }

  // only measure what's on screen — avoids a forced layout per element per frame
  const live = new Set()
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(x => {
      x.isIntersecting ? live.add(x.target) : live.delete(x.target)
    }), { rootMargin: '20% 0px' })
    els.forEach(e => io.observe(e))
  } else {
    els.forEach(e => live.add(e))
  }

  let ticking = false
  const update = () => {
    const vh = innerHeight
    live.forEach(el => {
      const r = el.getBoundingClientRect()
      if (r.bottom < 0 || r.top > vh) return
      // 0 when the element enters the lower third, 1 once it reaches the middle
      const p = Math.max(0, Math.min(1, (vh * 0.88 - r.top) / (vh * 0.42)))
      const eased = 1 - Math.pow(1 - p, 3)
      const to = +el.dataset.to
      el.textContent = fmt(Math.round(to * eased)) + (el.dataset.suffix || '')
    })
    ticking = false
  }

  addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true }
  }, { passive: true })
  addEventListener('resize', update, { passive: true })
  update()
}
