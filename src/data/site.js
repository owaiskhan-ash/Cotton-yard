/* Single source of truth for all site content.
   Change the Mumbai address here and it updates the store card,
   the visit list, the switcher and the footer at once. */

export const brand = {
  name: 'CottonYard',
  suffix: 'Furnishings',
  since: 1958,
  phone: '084 900 86396',
  phoneHref: 'tel:+918490086396',
  email: 'info@cottonyard.in',
  wa: (note) => `https://wa.me/916352111134?text=${encodeURIComponent(note)}`,
  social: {
    instagram: 'https://www.instagram.com/cottonyardfurnishings/',
    facebook: 'https://www.facebook.com/cottonyardfurnishinghub/',
    linkedin: 'https://www.linkedin.com/company/cottonyard-funishing-hub/'
  }
}

export const stores = [
  {
    id: 'ahmedabad',
    city: 'Ahmedabad',
    area: 'Ellisbridge',
    flag: 'Flagship · Since 1958',
    primary: true,
    address: 'CottonYard House, Maharashtra Society, Ellisbridge, Ahmedabad, Gujarat 380006',
    hours: 'Mon – Sat · 10:00 – 20:00',
    // 0 = Sunday. null = closed.
    open: [null, [10, 20], [10, 20], [10, 20], [10, 20], [10, 20], [10, 20]],
    map: 'https://maps.google.com/?q=CottonYard+House,+Maharashtra+Society,+Ellisbridge,+Ahmedabad,+Gujarat+380006'
  },
  {
    id: 'mumbai',
    city: 'Mumbai',
    area: 'Maharashtra',
    flag: 'Now Open',
    primary: false,
    address: '[MUMBAI ADDRESS — street, locality, Mumbai, Maharashtra PIN]',
    hours: 'Mon – Sat · 10:00 – 20:00',
    open: [null, [10, 20], [10, 20], [10, 20], [10, 20], [10, 20], [10, 20]],
    map: 'https://maps.google.com/?q=CottonYard+Furnishings+Mumbai'
  }
]

/* slug drives the CSS swatch palette in immersive.css */
export const collections = [
  {
    slug: 'bed-linen', title: 'Bed Linen', caption: 'Cotton · Sateen · Percale',
    note: 'Long-staple cotton in sateen, percale and washed linen. Fitted to Indian mattress depths, including the deeper pillow-tops most imported sets refuse to cover.',
    spec: { Composition: '100% long-staple cotton', 'Thread count': '210 – 800 TC', Sizes: 'Single to Emperor', Care: 'Machine wash 40°' }
  },
  {
    slug: 'curtains', title: 'Curtains', caption: 'Sheers · Blackout · Custom Drop',
    note: 'Cut to your drop, not to a standard length. Sheers that soften afternoon glare, and triple-weave blackout for bedrooms facing the street.',
    spec: { Widths: 'Up to 300 cm seamless', Lining: 'Sheer, dim-out, blackout', Heading: 'Pinch, eyelet, wave, rod-pocket', Fitting: 'Measured & installed' }
  },
  {
    slug: 'window-blinds', title: 'Window Blinds', caption: 'Roller · Roman · Venetian',
    note: 'Roller, Roman, Venetian, vertical and honeycomb. Chain, wand or motorised, with child-safe tensioners fitted as standard.',
    spec: { Types: 'Roller · Roman · Venetian · Vertical', Control: 'Chain, wand or motorised', Finish: 'Aluminium, timber, fabric', Fitting: 'Recess or face-fix' }
  },
  {
    slug: 'upholstery', title: 'Upholstery', caption: 'Sofa · Chair · Headboard',
    note: 'Reupholstery and new builds. Bring in a frame you love and we will rebuild the seat, or specify one from scratch in a fabric rubbed to 40,000 cycles.',
    spec: { Rub: '25,000 – 100,000 Martindale', Foam: 'HR, memory, feather-wrap', Service: 'Re-cover or new build', Lead: '3 – 5 weeks' }
  },
  {
    slug: 'rugs', title: 'Rugs', caption: 'Hand-Knotted · Flatweave',
    note: 'Hand-knotted wool and silk-blend, flatweave dhurries and tufted contemporary. Custom sizes cut and bound in the workshop.',
    spec: { Make: 'Hand-knotted · Tufted · Flatweave', Fibre: 'Wool, viscose, jute, silk blend', Sizes: 'Custom cut & bound', Care: 'Professional clean' }
  },
  {
    slug: 'wallpaper', title: 'Wallpaper', caption: 'Textured · Mural · Grasscloth',
    note: 'Non-woven textures, wide-format murals and natural grasscloth. Papered by our own team, because a bad seam ruins a good design.',
    spec: { Type: 'Non-woven · Vinyl · Grasscloth', Roll: '53 cm & 106 cm widths', Custom: 'Made-to-measure murals', Fitting: 'Installation included' }
  },
  {
    slug: 'wooden-flooring', title: 'Wooden Flooring', caption: 'Engineered · Laminate',
    note: 'Engineered oak with a real wear layer, plus high-AC laminate where budget matters. Acoustic underlay standard on apartments.',
    spec: { Build: 'Engineered oak · Laminate', Wear: 'AC4 – AC5 / 3 mm veneer', Finish: 'Matt, brushed, oiled', Warranty: 'Up to 25 years' }
  },
  {
    slug: 'mattresses', title: 'Mattresses', caption: 'Latex · Memory · Pocket Spring',
    note: 'Pocket spring, natural latex and memory foam across four firmness grades. Lie on them properly in the showroom — ten minutes, shoes off.',
    spec: { Types: 'Pocket spring · Latex · Memory', Firmness: 'Soft to extra-firm', Depth: '15 – 30 cm', Trial: 'In-store, unhurried' }
  }
]

export const mission = [
  ['01', 'Timeless Craftsmanship', 'Pieces engineered to merge style, comfort and durability — precise, quiet, made to outlast a trend cycle.'],
  ['02', 'Personalised Elegance', 'Décor should read like the person living in it. Every furnishing is tailored to your proportions and taste.'],
  ['03', 'Homes into Masterpieces', 'Innovative design and superior material, brought together until a room stops being a room and becomes yours.']
]

export const brands = [
  "D'Decor", 'Welspun', 'Raymond Home', 'Spaces', 'Portico New York', 'Nautica',
  'Tom Tailor', 'Pierre Cardin Bedding', 'United Colors of Benetton', 'Esprit',
  'Biederlack', 'Ador by Asian Paints', 'Birla Century', 'Boutique Living',
  'My Trident', 'Spread Spain', 'Stellar Home', 'Stylla Home', 'Bellagio Home Decor',
  'La Casa', 'Le Reve Home', 'Himeya Life', 'Luxury Attires', 'Malako', 'Pluchi',
  'Sadyaska', 'Desenhista', 'Florida', 'GMF', 'CottonYard'
]

/* curtain fullness multipliers for the measure tool */
export const headings = [
  { id: 'pinch', label: 'Pinch pleat', fullness: 2.5 },
  { id: 'wave', label: 'Wave / ripple', fullness: 2.2 },
  { id: 'eyelet', label: 'Eyelet', fullness: 2.0 },
  { id: 'rod', label: 'Rod pocket', fullness: 1.8 }
]

import journalMattress from '../assets/journal-mattress.jpg'
import journalGuide from '../assets/journal-guide.jpg'
import journalTrends from '../assets/journal-trends.jpg'

export const journal = [
  {
    img: journalMattress,
    date: '28 April 2025',
    title: 'Top 7 Mistakes to Dodge When Shopping for a Mattress in Ahmedabad',
    text: 'Dodge the common mistakes and shop smart — where quality sleep meets style.',
    url: 'https://cottonyard.in/mattress-shopping-mistakes-ahmedabad/'
  },
  {
    img: journalGuide,
    date: '25 April 2025',
    title: 'Your Ultimate Guide to Home Furnishing Stores Near You in Ahmedabad',
    text: 'From luxe linens to cosy cushions — comfort, style and personality.',
    url: 'https://cottonyard.in/ultimate-guide-home-furnishing-stores-ahmedabad/'
  },
  {
    img: journalTrends,
    date: '25 April 2025',
    title: 'Home Decor & Furnishing Trends in Ahmedabad: Style Your Space in 2025',
    text: 'Bold styles, smart designs and earthy layers for every corner.',
    url: 'https://cottonyard.in/home-decor-furnishing-trends-ahmedabad/'
  }
]
