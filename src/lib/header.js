import { nativeScrollTimeline } from './reveal.js'

export function initHeader () {
  const hdr = document.getElementById('hdr')
  const prog = document.getElementById('prog')
  // [1] the progress bar is CSS scroll-timeline driven where supported
  const jsProg = !nativeScrollTimeline || matchMedia('(prefers-reduced-motion: reduce)').matches
  let ticking = false

  const update = () => {
    hdr.classList.toggle('stuck', scrollY > 20)
    if (jsProg) {
      const h = document.body.scrollHeight - innerHeight
      prog.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%'
    }
    ticking = false
  }

  addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true }
  }, { passive: true })

  update()
}
