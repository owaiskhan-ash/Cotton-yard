import { journal } from '../data/site.js'

export function renderJournal (el) {
  el.innerHTML = journal.map(p => `
    <article>
      <a href="${p.url}" target="_blank" rel="noopener">
        <div class="jm"><img src="${p.img}" alt="${p.title}" loading="lazy" width="760" height="507"></div>
        <h4>${p.title}</h4>
        <time>${p.date}</time>
        <p>${p.text}</p>
      </a>
    </article>`).join('')
}
