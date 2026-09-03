import { brand, stores } from '../data/site.js'

export function renderStores (el) {
  el.innerHTML = stores.map(s => `
    <div class="store${s.primary ? '' : ' soon'}" data-id="${s.id}">
      <span class="yours">Your showroom</span>
      <span class="flag"${s.primary ? '' : ' style="background:var(--navy)"'}>${s.flag}</span>
      <h3>${s.city}</h3>
      <p class="sub">${s.area}</p>
      <address>${s.address}</address>
      <div class="meta">
        <a href="${brand.phoneHref}">${brand.phone}</a>
        <a href="mailto:${brand.email}">${brand.email}</a>
        <span>${s.hours}</span>
      </div>
      <div class="acts">
        <a class="pill solid" href="${s.map}" target="_blank" rel="noopener"><span>Get Directions</span></a>
        <a class="pill" href="${brand.wa(`Hi, I'd like to visit the ${s.city} showroom.`)}"><span>Book a Visit</span></a>
      </div>
    </div>`).join('')
}
