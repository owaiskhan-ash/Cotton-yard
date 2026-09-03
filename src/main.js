import './styles/base.css'
import './styles/patterns.css'
import './styles/typography.css'
import './styles/header.css'
import './styles/hero.css'
import './styles/sections.css'
import './styles/stores.css'
import './styles/footer.css'
import './styles/motion.css'
import './styles/immersive.css'
import './styles/scroll-driven.css'
import './styles/mobile.css'

import { renderCollections } from './sections/collections.js'
import { renderStores } from './sections/stores.js'
import { renderBrands } from './sections/brands.js'
import { renderJournal } from './sections/journal.js'
import { renderMission } from './sections/mission.js'
import { mountLogos } from './components/logo.js'

import { initReveal } from './lib/reveal.js'
import { initHeader } from './lib/header.js'
import { initParallax } from './lib/parallax.js'
import { initMagnetic } from './lib/magnetic.js'
import { initDrawer } from './lib/drawer.js'
import { initCursor } from './lib/cursor.js'
import { initVelocity, initScrubCounters } from './lib/velocity.js'
import { initStoreSwitcher } from './lib/store-switcher.js'
import { initQuickView } from './lib/quickview.js'
import { initDrape } from './lib/drape.js'
import { initFilmstrip } from './lib/filmstrip.js'
import { initMeasure } from './lib/measure.js'

import heroImg from './assets/hero-drape.jpg'
import sofaImg from './assets/drawing-room.jpg'
import sofaColor from './assets/drawing-room-color.jpg'
import luxImg from './assets/luxury-vignette.jpg'
import luxColor from './assets/luxury-vignette-color.jpg'

// hashed asset URLs
document.getElementById('heroimg').src = heroImg
document.getElementById('sofaimg').src = sofaImg
document.getElementById('luximg').src = luxImg

// [9] full-colour layers that bloom on hover — lazy so they cost nothing up front
document.getElementById('sofacolor').src = sofaColor
document.getElementById('luxcolor').src = luxColor

// content injection
mountLogos()
renderMission(document.getElementById('mission'))
renderCollections(document.getElementById('coll'))
renderStores(document.getElementById('storegrid'))
renderBrands(document.getElementById('brandlist'))
renderJournal(document.getElementById('jrn'))

// behaviour — after injected DOM exists so observers and delegates see it
initReveal()          // [1] no-ops where native scroll timelines exist
initHeader()
initParallax()        // [1] no-ops where native scroll timelines exist
initMagnetic()
initDrawer()
initStoreSwitcher()   // [12] must run before quickview/measure read the store
initScrubCounters()   // [10]
initVelocity()        // [7]
initCursor()          // [6][8]
initQuickView()       // [11]
initDrape()           // [13]
initFilmstrip()       // [14]
initMeasure()          // [15]

// [mobile] ship the calculator collapsed on phones
const fold = document.getElementById('estimatefold')
if (fold && matchMedia('(max-width: 860px)').matches) fold.open = false
