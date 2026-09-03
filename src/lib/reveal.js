/* Scroll reveals.
   [1] Where the browser supports native scroll-driven animations, the CSS
   in scroll-driven.css handles this on the compositor and we do nothing.
   This module is only the fallback for older browsers. */

export const nativeScrollTimeline =
  CSS.supports('animation-timeline: view()')

export function initReveal () {
  if (nativeScrollTimeline && !matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const els = document.querySelectorAll('.reveal')
  if (!('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('in'))
    return
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(x => {
      if (x.isIntersecting) {
        x.target.classList.add('in')
        io.unobserve(x.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
  els.forEach(e => io.observe(e))
}
