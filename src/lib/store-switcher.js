/* [12] Store switcher + live open/closed state.
   Pins a preferred store; phone, WhatsApp and directions across the
   page follow it. Persists in localStorage. */

import { brand, stores } from '../data/site.js'

const KEY = 'cy:store'
const pad = n => String(n).padStart(2, '0')

/* IST regardless of the visitor's own timezone — the shops are here, not there */
function istNow () {
  const d = new Date()
  const utc = d.getTime() + d.getTimezoneOffset() * 60000
  return new Date(utc + 5.5 * 3600000)
}

export function openState (store) {
  const now = istNow()
  const slot = store.open[now.getDay()]
  const mins = now.getHours() * 60 + now.getMinutes()

  if (slot) {
    const [o, c] = slot
    if (mins >= o * 60 && mins < c * 60) {
      return { open: true, label: `Open now · closes ${pad(c)}:00` }
    }
    if (mins < o * 60) return { open: false, label: `Opens ${pad(o)}:00 today` }
  }
  // find the next day that has hours
  for (let i = 1; i <= 7; i++) {
    const d = (now.getDay() + i) % 7
    const s = store.open[d]
    if (s) {
      const name = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d]
      return { open: false, label: i === 1 ? `Opens tomorrow ${pad(s[0])}:00` : `Opens ${name} ${pad(s[0])}:00` }
    }
  }
  return { open: false, label: 'Closed' }
}

export function getStore () {
  const id = localStorage.getItem(KEY)
  return stores.find(s => s.id === id) || stores[0]
}

export function initStoreSwitcher () {
  const bar = document.getElementById('storebar')
  if (!bar) return

  const active = getStore()

  bar.innerHTML = `
    <div class="switch" role="group" aria-label="Choose your showroom">
      <span class="knob" aria-hidden="true"></span>
      ${stores.map(s => `<button type="button" data-id="${s.id}" aria-pressed="${s.id === active.id}">${s.city}</button>`).join('')}
    </div>
    <span class="openstate" id="openstate" aria-live="polite"><i></i><span></span></span>`

  const knob = bar.querySelector('.knob')
  const btns = [...bar.querySelectorAll('.switch button')]

  const moveKnob = () => {
    const on = btns.find(b => b.getAttribute('aria-pressed') === 'true') || btns[0]
    knob.style.width = on.offsetWidth + 'px'
    knob.style.transform = `translateX(${on.offsetLeft - 3}px)`
  }

  const apply = (id, persist) => {
    const store = stores.find(s => s.id === id)
    if (persist) localStorage.setItem(KEY, id)
    btns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.id === id)))
    moveKnob()

    // open / closed pill
    const st = openState(store)
    const el = document.getElementById('openstate')
    el.classList.toggle('open', st.open)
    el.querySelector('span').textContent = `${store.city} · ${st.label}`

    // highlight the matching store card
    document.querySelectorAll('.store').forEach(c => {
      c.classList.toggle('active', c.dataset.id === id)
    })

    // retarget every store-aware link on the page
    document.querySelectorAll('[data-store-link]').forEach(a => {
      const kind = a.dataset.storeLink
      if (kind === 'map') a.href = store.map
      if (kind === 'wa') a.href = brand.wa(`Hi, I'd like to visit the ${store.city} showroom.`)
      if (kind === 'consult') a.href = brand.wa(`Hi, I'd like to book a design consultation at ${store.city}.`)
    })
    document.querySelectorAll('[data-store-city]').forEach(n => { n.textContent = store.city })

    document.dispatchEvent(new CustomEvent('cy:store', { detail: store }))
  }

  btns.forEach(b => b.addEventListener('click', () => apply(b.dataset.id, true)))
  addEventListener('resize', moveKnob, { passive: true })

  apply(active.id, false)
  requestAnimationFrame(moveKnob)

  // refresh the open/closed label every minute
  setInterval(() => apply(getStore().id, false), 60000)
}
