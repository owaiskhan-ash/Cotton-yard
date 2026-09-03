/* [11] Collection quick-view — native <dialog>, no library.
   Opens from a collection row or filmstrip cell, keyboard navigable. */

import { brand, collections } from '../data/site.js'
import { getStore } from './store-switcher.js'

let dlg, idx = 0

function build () {
  dlg = document.createElement('dialog')
  dlg.className = 'qv'
  dlg.innerHTML = `
    <button class="qv-close" type="button" data-close>Close</button>
    <div class="qv-grid">
      <figure class="qv-fig" id="qvfig"><span class="sw"></span><figcaption id="qvcap"></figcaption></figure>
      <div class="qv-body">
        <span class="n" id="qvn"></span>
        <h3 id="qvt"></h3>
        <span class="c" id="qvc"></span>
        <p id="qvp"></p>
        <dl class="qv-spec" id="qvs"></dl>
        <div class="qv-acts">
          <a class="pill solid" id="qvwa"><span>Ask about this</span></a>
          <a class="pill" id="qvmap" target="_blank" rel="noopener"><span>See it in <span data-store-city></span></span></a>
        </div>
      </div>
      <div class="qv-nav">
        <button type="button" data-prev aria-label="Previous collection">←</button>
        <button type="button" data-next aria-label="Next collection">→</button>
      </div>
    </div>`
  document.body.appendChild(dlg)

  dlg.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) return dlg.close()
    if (e.target.closest('[data-prev]')) return show(idx - 1)
    if (e.target.closest('[data-next]')) return show(idx + 1)
    // click on the backdrop closes
    if (e.target === dlg) dlg.close()
  })

  dlg.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(idx - 1)
    if (e.key === 'ArrowRight') show(idx + 1)
  })
}

function show (i) {
  const n = collections.length
  idx = (i + n) % n
  const c = collections[idx]
  const store = getStore()

  const fig = dlg.querySelector('#qvfig')
  fig.className = `qv-fig crow`
  fig.dataset.m = c.slug              // reuse the swatch palette
  dlg.querySelector('#qvcap').textContent = `Fig. ${String(idx + 1).padStart(2, '0')} — ${c.title}`
  dlg.querySelector('#qvn').textContent = `${String(idx + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`
  dlg.querySelector('#qvt').textContent = c.title
  dlg.querySelector('#qvc').textContent = c.caption
  dlg.querySelector('#qvp').textContent = c.note
  dlg.querySelector('#qvs').innerHTML = Object.entries(c.spec)
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')
  dlg.querySelector('#qvwa').href = brand.wa(`Hi, I'd like to know more about ${c.title} at ${store.city}.`)
  const map = dlg.querySelector('#qvmap')
  map.href = store.map
  map.querySelector('[data-store-city]').textContent = store.city
}

function open (i) {
  if (!dlg) build()
  show(i)
  // View Transitions where available, plain open otherwise
  if (document.startViewTransition) document.startViewTransition(() => dlg.showModal())
  else dlg.showModal()
}

export function initQuickView () {
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-qv]')
    if (!t) return
    e.preventDefault()
    open(+t.dataset.qv)
  })
}
