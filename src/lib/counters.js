const fmt = n => n.toLocaleString('en-IN')

export function initCounters () {
  const els = document.querySelectorAll('.num')
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(el => { el.textContent = fmt(+el.dataset.to) + (el.dataset.suffix || '') })
    return
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(x => {
      if (!x.isIntersecting) return
      io.unobserve(x.target)
      const el = x.target
      const to = +el.dataset.to
      const sfx = el.dataset.suffix || ''
      const t0 = performance.now()
      const dur = 1900
      const step = t => {
        const p = Math.min((t - t0) / dur, 1)
        const e = 1 - Math.pow(1 - p, 4) // quart-out
        el.textContent = fmt(Math.round(to * e)) + sfx
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    })
  }, { threshold: 0.5 })

  els.forEach(e => io.observe(e))
}
