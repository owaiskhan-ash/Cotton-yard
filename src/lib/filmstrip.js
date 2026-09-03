/* [14] Horizontal filmstrip view for collections.
   Native scroll + scroll-snap, with drag-to-pan and keyboard support.
   Toggles against the index list; preference persists. */

import { collections } from '../data/site.js'

const KEY = 'cy:view'

export function initFilmstrip () {
  const strip = document.getElementById('strip')
  const list = document.getElementById('coll')
  const toggle = document.getElementById('viewtoggle')
  const rail = document.getElementById('striprail')
  if (!strip || !list || !toggle) return

  strip.innerHTML = collections.map((c, i) => `
    <button class="cell" data-m="${c.slug}" data-qv="${i}" type="button" data-cursor="Open">
      <span class="n">${String(i + 1).padStart(2, '0')}</span>
      <span>
        <h4>${c.title}</h4>
        <span class="c">${c.caption}</span>
      </span>
      <span class="go">Quick view →</span>
    </button>`).join('')

  /* ---- view toggle ---- */
  const setView = (v, persist) => {
    const strips = v === 'strip'
    strip.hidden = !strips
    rail.hidden = !strips
    list.hidden = strips
    toggle.querySelectorAll('button').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.view === v)))
    if (persist) localStorage.setItem(KEY, v)
    if (strips) requestAnimationFrame(bar)
  }

  toggle.addEventListener('click', e => {
    const b = e.target.closest('button')
    if (b) setView(b.dataset.view, true)
  })

  /* ---- progress bar ---- */
  const fill = rail.querySelector('i')
  const bar = () => {
    const max = strip.scrollWidth - strip.clientWidth
    const p = max > 0 ? strip.scrollLeft / max : 0
    const w = strip.clientWidth / strip.scrollWidth
    fill.style.width = (w * 100) + '%'
    fill.style.transform = `translateX(${(p * (1 / w - 1) * 100)}%)`
  }
  strip.addEventListener('scroll', () => requestAnimationFrame(bar), { passive: true })
  addEventListener('resize', bar, { passive: true })

  /* ---- drag to pan ---- */
  let down = false, sx = 0, sl = 0, moved = 0

  strip.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch') return // let native touch scrolling do its job
    down = true; moved = 0
    sx = e.clientX; sl = strip.scrollLeft
    strip.classList.add('drag')
    strip.setPointerCapture(e.pointerId)
  })

  strip.addEventListener('pointermove', e => {
    if (!down) return
    const dx = e.clientX - sx
    moved = Math.max(moved, Math.abs(dx))
    strip.scrollLeft = sl - dx
  })

  const up = e => {
    if (!down) return
    down = false
    strip.classList.remove('drag')
    try { strip.releasePointerCapture(e.pointerId) } catch {}
  }
  strip.addEventListener('pointerup', up)
  strip.addEventListener('pointercancel', up)

  // a drag shouldn't fire the quick-view underneath it
  strip.addEventListener('click', e => {
    if (moved > 6) { e.preventDefault(); e.stopPropagation() }
  }, true)

  /* ---- keyboard ---- */
  strip.addEventListener('keydown', e => {
    const step = strip.clientWidth * 0.6
    if (e.key === 'ArrowRight') { strip.scrollBy({ left: step, behavior: 'smooth' }); e.preventDefault() }
    if (e.key === 'ArrowLeft') { strip.scrollBy({ left: -step, behavior: 'smooth' }); e.preventDefault() }
  })

  setView(localStorage.getItem(KEY) || 'list', false)
}
