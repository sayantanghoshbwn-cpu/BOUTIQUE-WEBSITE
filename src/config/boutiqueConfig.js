// ==============================================================================
// MAISON VIOLETTE — CENTRALIZED BOUTIQUE CONFIGURATION LOADER
// Reads from .env (import.meta.env) with full fallback support.
// You can edit .env or this file at any time to modify boutique details!
// ==============================================================================

const env = import.meta.env || {};

export const brandConfig = {
  name: env.VITE_BRAND_NAME || 'MAISON VIOLETTE',
  tagline: env.VITE_BRAND_TAGLINE || 'Haute Couture • Atelier Paris',
  description:
    env.VITE_BRAND_DESCRIPTION ||
    'An independent luxury haute couture house dedicated to the preservation of master silk weaving, pure velvet tailoring, and intricate hand Zardozi embroidery.',
  founder: env.VITE_BRAND_FOUNDER || 'Élodie Laurent',
  founderRole: env.VITE_BRAND_FOUNDER_ROLE || 'Founder & Head Couturière',
  founderImage:
    env.VITE_BRAND_FOUNDER_IMAGE ||
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
};

export const contactConfig = {
  email: env.VITE_CONTACT_EMAIL || 'concierge@maisonviolette.couture',
  phone: env.VITE_CONTACT_PHONE || '+33 1 42 68 00 12',
  flagshipAddress: env.VITE_FLAGSHIP_ADDRESS || '24 Place Vendôme, 75001 Paris, France',
  whatsappNumber: env.VITE_WHATSAPP_NUMBER || '+33612345678',
};

export const salonsConfig = [
  { city: 'Paris', location: 'Rue Saint-Honoré', fullAddress: env.VITE_SALON_PARIS || '24 Place Vendôme, 75001 Paris, France' },
  { city: 'London', location: 'Mayfair', fullAddress: env.VITE_SALON_LONDON || '14 New Bond Street, Mayfair, London' },
  { city: 'Mumbai', location: 'Taj Mahal Palace, Colaba', fullAddress: env.VITE_SALON_MUMBAI || 'The Taj Mahal Palace, Colaba, Mumbai' },
  { city: 'Kolkata', location: 'Park Street', fullAddress: env.VITE_SALON_KOLKATA || 'Park Mansion, 57A Park Street, Kolkata' },
  { city: 'New York', location: 'Madison Avenue (By Appt)', fullAddress: env.VITE_SALON_NEW_YORK || '740 Madison Avenue, New York (By Appointment)' },
];

export const commerceConfig = {
  defaultCurrency: env.VITE_DEFAULT_CURRENCY || 'INR',
  freeShippingThreshold: Number(env.VITE_FREE_SHIPPING_THRESHOLD) || 500,
  standardShippingFee: Number(env.VITE_STANDARD_SHIPPING_FEE) || 45,
  promoCode: env.VITE_PROMO_CODE || 'INDIA 2026',
  promoDiscountPercent: Number(env.VITE_PROMO_DISCOUNT_PERCENT) || 25,
  secretPromoCode: env.VITE_VIP_SECRET_PROMO_CODE || 'DRAGONFRUIT20',
  secretDiscountPercent: Number(env.VITE_VIP_SECRET_DISCOUNT_PERCENT) || 20,
};

export const socialConfig = {
  instagram: env.VITE_INSTAGRAM_URL || 'https://instagram.com',
  facebook: env.VITE_FACEBOOK_URL || 'https://facebook.com',
  pinterest: env.VITE_PINTEREST_URL || 'https://pinterest.com',
};

export const announcementsConfig = [
  `👑 VIP Privilege: Use Code "${commerceConfig.promoCode}" for Instant ${commerceConfig.promoDiscountPercent}% Off Today!`,
  '✨ Paris Couture Week Edit: Limited Atelier Handcrafted Silks & Velvet Gowns',
  `🕊️ Complimentary Worldwide Insured Delivery on Bespoke Orders over $${commerceConfig.freeShippingThreshold}`,
  `⚜️ Schedule Private Made-to-Measure Consultations with Lead Couturier ${brandConfig.founder}`,
];
