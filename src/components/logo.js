/* CottonYard mark, redrawn as SVG so it stays crisp on retina.
   The source raster was 229x60 — too small for a sticky header.
   Ring is the brand cyan (#00A6D6); wordmark inherits currentColor
   so it flips automatically for dark grounds. */

export function logoSVG ({ mono = false, id = 'l' } = {}) {
  const cyan = mono ? 'currentColor' : '#00A6D6'
  return `
<svg class="cy-mark" viewBox="0 0 296 60" role="img" aria-label="CottonYard — a furnishing hub" focusable="false">
  <g fill="none" stroke-linecap="round">
    <!-- dark ring, open at the upper right -->
    <circle cx="30" cy="30" r="24.5" stroke="currentColor" stroke-width="7"
            stroke-dasharray="118 36" transform="rotate(-52 30 30)"/>
    <!-- cyan swoosh riding the open side -->
    <path d="M30 5.5 A24.5 24.5 0 0 1 47.4 47.4" stroke="${cyan}" stroke-width="6"/>
  </g>
  <text x="70" y="27" fill="currentColor" font-family="Helvetica Neue,Helvetica,Arial,sans-serif"
        font-size="26" font-weight="700" letter-spacing="-0.4" dominant-baseline="middle">COTTONYARD</text>
  <text x="71" y="47" fill="currentColor" opacity=".7" font-family="Georgia,Times New Roman,serif"
        font-size="12" font-style="italic" letter-spacing="0.6">a furnishing hub</text>
</svg>`
}

export function mountLogos () {
  document.querySelectorAll('[data-logo]').forEach(el => {
    el.innerHTML = logoSVG({ mono: el.dataset.logo === 'mono' })
  })
}
