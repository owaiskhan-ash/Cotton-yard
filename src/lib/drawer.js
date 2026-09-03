export function initDrawer () {
  const drawer = document.getElementById('drawer')
  const burger = document.getElementById('burger')
  const close = document.getElementById('dclose')
  if (!drawer || !burger) return

  const set = open => {
    drawer.classList.toggle('open', open)
    drawer.setAttribute('aria-hidden', String(!open))
    burger.setAttribute('aria-expanded', String(open))
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) close.focus()
  }

  burger.addEventListener('click', () => set(true))
  close.addEventListener('click', () => set(false))
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => set(false)))
  addEventListener('keydown', e => { if (e.key === 'Escape') set(false) })
  set(false)
}
