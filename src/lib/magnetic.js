export function initMagnetic () {
  if (!matchMedia('(hover: hover)').matches) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

  document.querySelectorAll('.pill').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) * 0.16
      const y = (e.clientY - r.top - r.height / 2) * 0.26
      btn.style.transform = `translate(${x}px, ${y}px)`
    })
    btn.addEventListener('mouseleave', () => { btn.style.transform = '' })
  })
}
