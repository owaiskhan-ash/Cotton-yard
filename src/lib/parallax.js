import { nativeScrollTimeline } from './reveal.js'

export function initParallax () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // [1] handled by CSS scroll-timeline where supported
  if (nativeScrollTimeline) return

  const hero = document.getElementById('heroimg')
  if (!hero) return
  let ticking = false

  const update = () => {
    if (scrollY < 1000) hero.style.transform = `translateY(${scrollY * -0.07}px)`
    ticking = false
  }

  addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true }
  }, { passive: true })
}
