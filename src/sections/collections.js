import { collections } from '../data/site.js'

export function renderCollections (el) {
  el.innerHTML = collections.map((c, i) => `
    <a class="crow" href="#stores" data-m="${c.slug}" data-qv="${i}" data-cursor="Open">
      <span class="n">${String(i + 1).padStart(2, '0')}</span>
      <span class="t">${c.title}</span>
      <span class="c">${c.caption}</span>
      <span class="a">→</span>
    </a>`).join('')
}
