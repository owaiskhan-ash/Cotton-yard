import { mission } from '../data/site.js'

export function renderMission (el) {
  el.innerHTML = mission.map(([k, h, p]) => `
    <div class="card">
      <span class="k">${k}</span>
      <div><h4>${h}</h4><p>${p}</p></div>
    </div>`).join('')
}
