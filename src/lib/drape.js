/* [13] Fabric-drape displacement on the hero.
   An SVG feDisplacementMap driven by pointer position. The filter is
   GPU-composited; we only rewrite two numeric attributes per frame. */

export function initDrape () {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const hero = document.querySelector('.hero-r')
  if (!hero) return

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden'
  svg.innerHTML = `
    <defs>
      <filter id="drape" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB">
        <feTurbulence id="drapeNoise" type="fractalNoise" baseFrequency="0.006 0.013"
                      numOctaves="2" seed="7" result="n"/>
        <feDisplacementMap id="drapeMap" in="SourceGraphic" in2="n"
                           scale="0" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>`
  document.body.appendChild(svg)

  const map = svg.querySelector('#drapeMap')
  const noise = svg.querySelector('#drapeNoise')
  hero.classList.add('drape')

  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0

  const loop = () => {
    cx += (tx - cx) * 0.07
    cy += (ty - cy) * 0.07
    // scale reads as how hard the cloth is being pulled
    const scale = Math.min(26, Math.hypot(cx, cy) * 30)
    map.setAttribute('scale', scale.toFixed(2))
    noise.setAttribute('baseFrequency', `${(0.005 + Math.abs(cx) * 0.008).toFixed(4)} ${(0.012 + Math.abs(cy) * 0.01).toFixed(4)}`)

    if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(loop)
    else raf = 0
  }

  const kick = () => { if (!raf) raf = requestAnimationFrame(loop) }

  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect()
    tx = (e.clientX - r.left) / r.width - 0.5
    ty = (e.clientY - r.top) / r.height - 0.5
    kick()
  }, { passive: true })

  hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick() })
}
