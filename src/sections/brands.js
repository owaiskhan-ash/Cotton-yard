import { brands } from '../data/site.js'

export function renderBrands (el) {
  el.innerHTML = brands.map(b => `<span>${b}</span>`).join('')
}
