/* [15] Window measure tool.
   Estimates fabric and pricing, draws a live diagram, and hands the
   numbers to WhatsApp so the enquiry arrives already specified. */

import { brand, headings } from '../data/site.js'
import { getStore } from './store-switcher.js'

const clamp = (n, a, b) => Math.max(a, Math.min(b, n))
const inr = n => '₹' + Math.round(n).toLocaleString('en-IN')

export function initMeasure () {
  const root = document.getElementById('measure')
  if (!root) return

  root.innerHTML = `
    <div class="mform">
      <p class="eyebrow">Estimate</p>
      <h3 style="font-family:var(--serif);font-size:clamp(24px,3vw,38px);line-height:1.08;margin:12px 0 4px">
        Measure your window.</h3>
      <p style="color:#33507a;font-size:14.5px;margin:0 0 8px;max-width:44ch">
        Rough numbers are fine — we re-measure on site before anything is cut.</p>

      <div class="mrow">
        <div class="mfield">
          <label for="mw">Track width (cm)</label>
          <input id="mw" type="number" inputmode="numeric" min="30" max="900" step="1" value="180">
        </div>
        <div class="mfield">
          <label for="mh">Drop (cm)</label>
          <input id="mh" type="number" inputmode="numeric" min="30" max="400" step="1" value="230">
        </div>
      </div>

      <div class="mrow">
        <div class="mfield">
          <label for="mhead">Heading style</label>
          <select id="mhead">
            ${headings.map(h => `<option value="${h.id}" data-f="${h.fullness}">${h.label} · ${h.fullness}× fullness</option>`).join('')}
          </select>
        </div>
        <div class="mfield">
          <label for="mpanels">Panels</label>
          <select id="mpanels">
            <option value="2">A pair (2 panels)</option>
            <option value="1">Single panel</option>
          </select>
        </div>
      </div>

      <dl class="mout" id="mout"></dl>
      <p class="mnote">Estimate assumes a 20 cm hem-and-header allowance and 137 cm fabric width.
        Excludes track, lining and fitting. Final quote confirmed in the showroom.</p>

      <div class="qv-acts" style="margin-top:22px">
        <a class="pill solid" id="mwa"><span>Send to WhatsApp</span></a>
        <a class="pill" href="#stores"><span>Book a measure</span></a>
      </div>
    </div>

    <div class="mviz" aria-hidden="true">
      <span class="rod"></span>
      <span class="drape l"></span>
      <span class="drape r"></span>
      <span class="frame"></span>
      <span class="dim w" id="dimw"></span>
      <span class="dim h" id="dimh"></span>
    </div>`

  const w = root.querySelector('#mw')
  const h = root.querySelector('#mh')
  const head = root.querySelector('#mhead')
  const panels = root.querySelector('#mpanels')
  const out = root.querySelector('#mout')
  const wa = root.querySelector('#mwa')
  const frame = root.querySelector('.frame')
  const rod = root.querySelector('.rod')
  const dl = root.querySelector('.drape.l')
  const dr = root.querySelector('.drape.r')

  const calc = () => {
    const W = clamp(+w.value || 0, 30, 900)
    const H = clamp(+h.value || 0, 30, 400)
    const F = +head.selectedOptions[0].dataset.f
    const P = +panels.value

    const flat = W * F                       // total flat width needed, cm
    const cuts = Math.ceil(flat / 137)       // 137 cm bolt width
    const perDrop = H + 20                   // hem + header allowance
    const metres = (cuts * perDrop) / 100

    // indicative fabric bands, ex-fitting
    const low = metres * 850
    const high = metres * 2400

    out.innerHTML = `
      <div><dt>Fabric needed</dt><dd>${metres.toFixed(1)}<small>m</small></dd></div>
      <div><dt>Widths / cuts</dt><dd>${cuts}<small>× ${perDrop} cm</small></dd></div>
      <div><dt>Finished panels</dt><dd>${P}<small>× ${Math.round(flat / P)} cm flat</small></dd></div>
      <div><dt>Indicative</dt><dd>${inr(low)} – ${inr(high)}</dd></div>`

    // diagram — proportional, clamped so extremes stay readable
    const ar = clamp(W / H, 0.35, 2.6)
    const maxW = 62, maxH = 70
    let vw = maxW, vh = maxW / ar
    if (vh > maxH) { vh = maxH; vw = maxH * ar }
    frame.style.width = vw + '%'
    frame.style.height = vh + '%'
    rod.style.width = (vw + 22) + '%'
    rod.style.left = (50 - (vw + 22) / 2) + '%'
    const dw = clamp((F - 1.6) * 22, 12, 30)
    dl.style.width = dw + '%'
    dr.style.width = dw + '%'
    root.querySelector('#dimw').textContent = `${W} cm wide`
    root.querySelector('#dimh').textContent = `${H} cm drop`

    const store = getStore()
    wa.href = brand.wa(
      `Hi CottonYard — curtain estimate from your site.\n` +
      `Window: ${W} cm wide × ${H} cm drop\n` +
      `Heading: ${head.selectedOptions[0].textContent}\n` +
      `Panels: ${P}\n` +
      `Fabric needed: ~${metres.toFixed(1)} m (${cuts} widths)\n` +
      `Preferred showroom: ${store.city}\n` +
      `Could you confirm options and pricing?`)
  }

  ;[w, h, head, panels].forEach(el => {
    el.addEventListener('input', calc)
    el.addEventListener('change', calc)
  })
  document.addEventListener('cy:store', calc)
  calc()
}
