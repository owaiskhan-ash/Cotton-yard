/* [6] Contextual cursor + [8] ambient light on dark grounds.
   Desktop, fine-pointer only. One rAF loop, transform-only writes. */

export function initCursor () {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const el = document.createElement('div')
  el.className = 'cursor'
  el.setAttribute('aria-hidden', 'true')
  el.innerHTML = '<b></b>'
  document.body.appendChild(el)
  const label = el.querySelector('b')

  let x = innerWidth / 2, y = innerHeight / 2
  let cx = x, cy = y
  let raf = 0

  const lit = [...document.querySelectorAll('.band, footer')]

  const loop = () => {
    // light trailing lag reads as weight
    cx += (x - cx) * 0.22
    cy += (y - cy) * 0.22
    el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
    raf = Math.abs(x - cx) > 0.1 || Math.abs(y - cy) > 0.1 ? requestAnimationFrame(loop) : 0
  }

  addEventListener('mousemove', e => {
    x = e.clientX; y = e.clientY
    el.classList.add('on')
    if (!raf) raf = requestAnimationFrame(loop)

    // ambient glow — only for dark sections currently on screen
    for (const s of lit) {
      const r = s.getBoundingClientRect()
      const inside = e.clientY > r.top && e.clientY < r.bottom
      s.classList.toggle('lit', inside)
      if (inside) {
        s.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%')
        s.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%')
      }
    }
  }, { passive: true })

  addEventListener('mouseleave', () => {
    el.classList.remove('on')
    lit.forEach(s => s.classList.remove('lit'))
  })

  /* contextual states, delegated so injected DOM works too */
  const WIDE = '.fig, .jrn article, .qv-fig'
  const DOT = 'a, button, .crow, .strip .cell, input, select'

  document.addEventListener('mouseover', e => {
    const wide = e.target.closest(WIDE)
    if (wide) {
      el.classList.add('wide'); el.classList.remove('dot')
      label.textContent = wide.dataset.cursor || 'View'
      return
    }
    const dot = e.target.closest(DOT)
    if (dot) {
      el.classList.add('dot'); el.classList.remove('wide')
      label.textContent = ''
      return
    }
    el.classList.remove('wide', 'dot')
    label.textContent = ''
  })
}
