export const CURRENCIES = {
  INR: { symbol: '₹', rate: 86.5, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 1, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  AED: { symbol: 'AED ', rate: 3.67, label: 'AED (د.إ)' },
};

export const PRODUCTS = [
  {
    id: 'mv-001',
    name: 'Aura Nocturne Embroidered Velvet Gown',
    category: 'Dresses & Gowns',
    tag: 'Boutique Signature',
    priceUSD: 1450,
    originalPriceUSD: 1800,
    rating: 4.9,
    reviewsCount: 38,
    leadTime: 'Bespoke (10-14 days)',
    inStock: true,
    badgeColor: 'dragonfruit',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Royal Italian Velvet & Metallic Zardozi',
    fabricComposition: '100% Silk-Velvet with 24k Gold Threading',
    silhouette: 'Corseted Floor-Length Mermaid Flare',
    occasion: 'Gala & Red Carpet',
    colors: [
      { name: 'Night Violet', hex: '#1A0C2E' },
      { name: 'Dragonfruit Magenta', hex: '#FF2A8D' },
      { name: 'Obsidian Noir', hex: '#0B090A' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Bespoke'],
    description: 'Sculpted from luminous deep night-violet velvet, this regal gown features hand-stitched dragonfruit metallic thread embroidery along the corseted bodice and an ethereal sweeping train designed for red carpet galas.',
    details: [
      'Hand-crafted internal boning for majestic posture',
      'Embellished with micro-Swarovski crystal dew drops',
      'Concealed back invisible zipper with pearl buttons',
      'Includes complimentary garment trunk and satin preservation bag'
    ]
  },
  {
    id: 'mv-002',
    name: 'Celestial Dragonfruit Draped Silk Saree & Corset',
    category: 'Bridal & Sarees',
    tag: 'Wedding Edition',
    priceUSD: 1850,
    originalPriceUSD: 2200,
    rating: 5.0,
    reviewsCount: 52,
    leadTime: 'Handcrafted (14-21 days)',
    inStock: true,
    badgeColor: 'dragonfruit',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Pure Mulberry Silk Organza & French Lace',
    fabricComposition: '100% Organic Mulberry Silk with Rose Gold Tilla',
    silhouette: 'Pre-Stitched Draped Saree with Structured Corset',
    occasion: 'Wedding & Sangeet',
    colors: [
      { name: 'Dragonfruit Bloom', hex: '#FF2A8D' },
      { name: 'Amethyst Night', hex: '#281640' },
      { name: 'Blush Champagne', hex: '#F3D2C1' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'Custom Bespoke'],
    description: 'An architectural reimagining of the traditional saree. Features a pre-draped fluid mulberry silk pallu paired with an intricately boned dragonfruit embroidered corset adorned with hand-cut sequin flora.',
    details: [
      'Pre-pleated for effortlessly flawless 60-second draping',
      'Heavy pallu border with antique French lace trim',
      'Adjustable lace-up back corset for a tailored fit',
      'Comes with a matched silk underskirt and silk hanger'
    ]
  },
  {
    id: 'mv-003',
    name: 'L’Impératrice Velvet Tailored Smoking Blazer',
    category: 'Blazers & Suits',
    tag: 'Trending Style',
    priceUSD: 890,
    originalPriceUSD: 1050,
    rating: 4.8,
    reviewsCount: 29,
    leadTime: 'Ready to Ship (2-3 days)',
    inStock: true,
    badgeColor: 'dragonfruit',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Plush Night-Violet Silk Velvet',
    fabricComposition: '80% Silk, 20% Rayon Velvet, Silk Cupro Lining',
    silhouette: 'Double-Breasted Hourglass Tailoring',
    occasion: 'Cocktail & Evening Soirée',
    colors: [
      { name: 'Night Violet', hex: '#1A0C2E' },
      { name: 'Deep Dragonfruit', hex: '#D81B60' },
      { name: 'Midnight Navy', hex: '#0B132B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Masterfully tailored in our Paris atelier, this sharp smoking jacket boasts peak silk lapels, structured power shoulders, and custom dragonfruit amethyst crystal buttons.',
    details: [
      'Pure silk satin peak lapels',
      'Hand-sewn dragonfruit glass jewel buttons',
      'Dual rear vents for effortless movement',
      'Internal secret passport and card pocket'
    ]
  },
  {
    id: 'mv-004',
    name: 'Royale Violette Zardozi Bridal Lehenga',
    category: 'Bridal & Sarees',
    tag: 'Bridal Masterpiece',
    priceUSD: 3200,
    originalPriceUSD: 3800,
    rating: 5.0,
    reviewsCount: 64,
    leadTime: 'Bespoke Atelier (25-30 days)',
    inStock: true,
    badgeColor: 'dragonfruit',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Handloom Katan Raw Silk & Velvet',
    fabricComposition: '100% Handspun Silk with Real Silver/Gold Zari',
    silhouette: '16-Kali Full Circle Flared Lehenga with Double Dupatta',
    occasion: 'Grand Wedding Reception',
    colors: [
      { name: 'Royal Amethyst', hex: '#281640' },
      { name: 'Dragonfruit Crimson', hex: '#FF2A8D' },
      { name: 'Imperial Maroon', hex: '#4A0E17' }
    ],
    sizes: ['Custom Made-to-Measure', 'XS', 'S', 'M', 'L'],
    description: 'Over 220 hours of handcrafted Zardozi, Marodi, and micro-pearl artistry. Layered with double dupattas in pure silk organza and scalloped velvet borders.',
    details: [
      '220+ artisan hours of master hand embroidery',
      'Double dupatta set: 1 Velvet trail dupatta + 1 Tissue head veil',
      'Customized monogram & wedding date embroidery inside waistband',
      'Includes private video consultation with head bridal couturier'
    ]
  },
  {
    id: 'mv-005',
    name: 'Sérénade Asymmetrical Draped Silk Slip Gown',
    category: 'Dresses & Gowns',
    tag: 'Best Seller',
    priceUSD: 1150,
    originalPriceUSD: 1350,
    rating: 4.9,
    reviewsCount: 41,
    leadTime: 'Ready to Ship (3-5 days)',
    inStock: true,
    badgeColor: 'dragonfruit',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Heavy Silk Charmeuse (40 Momme)',
    fabricComposition: '100% Pure Mulberry Silk Charmeuse',
    silhouette: 'Bias-Cut Draped Grecian Silhouette',
    occasion: 'High Tea, Premiere & Gala',
    colors: [
      { name: 'Vibrant Dragonfruit', hex: '#FF2A8D' },
      { name: 'Night Violet', hex: '#1A0C2E' },
      { name: 'Starlight Silver', hex: '#E2E8F0' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Cut on the true bias to cascade like liquid moonlight around the body. Featuring an architectural cowl neckline, a high thigh slit, and delicate dragonfruit silk cord back ties.',
    details: [
      'Heavyweight 40 Momme Mulberry Silk for zero sheerness',
      'Seamless bias construction with hand-rolled hems',
      'Adjustable criss-cross rear rouleau straps',
      'Dry clean only in specialized luxury salon'
    ]
  },
  {
    id: 'mv-006',
    name: 'Atelier Dragonfruit Crystal Minaudière Clutch',
    category: 'Accessories',
    tag: 'Artisanal Jewel',
    priceUSD: 680,
    originalPriceUSD: 850,
    rating: 4.9,
    reviewsCount: 23,
    leadTime: 'Ready to Ship',
    inStock: true,
    badgeColor: 'dragonfruit',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Gold-Plated Brass Case & Austrian Crystal Inlay',
    fabricComposition: 'Solid Brass Frame, Amethyst & Dragonfruit Crystal Pave',
    silhouette: 'Geometric Sculpted Minaudière',
    occasion: 'Evening Gala & Wedding',
    colors: [
      { name: 'Dragonfruit Jewel', hex: '#FF2A8D' },
      { name: 'Night Violet Crystal', hex: '#281640' },
      { name: '24k Yellow Gold', hex: '#D4AF37' }
    ],
    sizes: ['One Size (Fits iPhone 16 Pro Max)'],
    description: 'An objet d’art encrusted with over 1,400 faceted dragonfruit and violet Austrian crystals. Fitted with a removable 24k gold-plated snake chain for shoulder wear.',
    details: [
      'Magnetic dragonfruit gemstone clasp',
      'Soft lavender nappa leather interior lining',
      'Includes 110cm detachable woven gold chain',
      'Packaged in an embossed velvet keepsake presentation box'
    ]
  },
  {
    id: 'mv-007',
    name: 'Élixir De Nuit Tiered Organza Ballgown',
    category: 'Dresses & Gowns',
    tag: 'Runway Highlight',
    priceUSD: 2450,
    originalPriceUSD: 2900,
    rating: 5.0,
    reviewsCount: 31,
    leadTime: 'Bespoke Atelier (18-24 days)',
    inStock: true,
    badgeColor: 'dragonfruit',
    images: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Micro-Pleated Silk Organza & Crinoline',
    fabricComposition: '100% Silk Organza with Laser-Cut Petals',
    silhouette: 'Dramatic Voluminous Tiered Ballgown',
    occasion: 'Met Gala & Opera Soirée',
    colors: [
      { name: 'Night Violet Ombré', hex: '#1A0C2E' },
      { name: 'Dragonfruit Blush', hex: '#FF2A8D' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'Custom Bespoke'],
    description: 'A poetic gradient transition from midnight violet to fiery dragonfruit pink across 60 meters of hand-pleated silk organza ruffles. A showstopper in every sense.',
    details: [
      'Sculpted illusion corset with invisible flesh mesh',
      'Gradient ombré dye created with non-toxic botanical pigments',
      'Reinforced internal horsehair hem for dramatic volume',
      'Personal fitting with head tailor included'
    ]
  },
  {
    id: 'mv-008',
    name: 'Sultana Velvet Capelet & Draped Jumpsuit',
    category: 'Blazers & Suits',
    tag: 'Pret Luxury',
    priceUSD: 980,
    originalPriceUSD: 1180,
    rating: 4.8,
    reviewsCount: 19,
    leadTime: 'Ready to Ship (2-4 days)',
    inStock: true,
    badgeColor: 'dragonfruit',
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Stretch Silk Velvet & Chantilly Lace',
    fabricComposition: '92% Silk Velvet, 8% Elastane for structured comfort',
    silhouette: 'Wide-Leg Jumpsuit with Detachable Floor Cape',
    occasion: 'Art Basel & Cocktail Night',
    colors: [
      { name: 'Night Violet', hex: '#1A0C2E' },
      { name: 'Dragonfruit Neon', hex: '#FF2A8D' },
      { name: 'Smoky Amethyst', hex: '#3A2555' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Effortless grandeur. Tailored wide-leg trousers combined with a sweetheart neckline and an ethereal floor-length detachable capelet bordered with dragonfruit silk embroidery.',
    details: [
      'Detachable snap-on shoulder capelet for 2-in-1 styling',
      'Internal structured bustier cups',
      'Two functional invisible slash pockets',
      'Crease-resistant luxury travel velvet'
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Collections', count: 8 },
  { id: 'Dresses & Gowns', label: 'Dresses & Gowns', count: 3 },
  { id: 'Bridal & Sarees', label: 'Bridal & Sarees', count: 2 },
  { id: 'Blazers & Suits', label: 'Blazers & Suits', count: 2 },
  { id: 'Accessories', label: 'Accessories', count: 1 },
];

export const FABRICS = ['All Fabrics', 'Mulberry Silk', 'Royal Velvet', 'French Lace & Organza', 'Katan Raw Silk', 'Crystal & Brass'];
export const OCCASIONS = ['All Occasions', 'Gala & Red Carpet', 'Wedding & Sangeet', 'Cocktail & Evening Soirée', 'High Tea, Premiere & Gala', 'Met Gala & Opera Soirée'];
