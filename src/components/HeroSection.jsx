import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { commerceConfig } from '../config/boutiqueConfig';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Crown,
  Tag,
  Copy,
  Check,
  Scissors
} from 'lucide-react';

import { smoothScrollTo } from '../utils/scrollUtils';

export const HeroSection = () => {
  const {
    openFittingModal,
    formatPrice,
    copyAndApplyCoupon,
    applyPromo,
    appliedPromo,
    discountPercent
  } = useShop();

  const [copied, setCopied] = useState(false);
  const [heroPromoInput, setHeroPromoInput] = useState('');

  const heroSlides = [
    {
      id: 'slide-1',
      eyebrow: 'SPRING / SUMMER 2026 HAUTE COUTURE',
      title: 'Royal Night Violet & Celestial Silks',
      subtitle: 'Where timeless Parisian silhouette craftsmanship converges with opulent dragonfruit embroidery and pure Italian velvet.',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1400&q=85',
      featuredTag: 'Atelier Runway Piece',
      price: 1450,
      name: 'Aura Nocturne Embroidered Gown',
      productId: 'mv-001'
    },
    {
      id: 'slide-2',
      eyebrow: 'THE HERITAGE BRIDAL EDIT',
      title: 'Zardozi Mastery On Handloom Silk',
      subtitle: 'Over 220 artisan handcraft hours dedicated to creating the royal heirlooms of your unforgettable wedding saga.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85',
      featuredTag: 'Bridal Masterpiece',
      price: 1850,
      name: 'Celestial Dragonfruit Draped Saree',
      productId: 'mv-002'
    },
    {
      id: 'slide-3',
      eyebrow: 'PRÊT-À-PORTER LUXURY SUITING',
      title: 'Architectural Velvet Smoking Jackets',
      subtitle: 'Sharp silhouettes adorned with hand-cut amethyst crystal buttons and heavy pure silk peak lapels.',
      image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1400&q=85',
      featuredTag: 'Prêt Signature',
      price: 890,
      name: 'L’Impératrice Velvet Blazer',
      productId: 'mv-003'
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const current = heroSlides[activeSlide];

  const scrollToCollection = () => {
    smoothScrollTo('collection', -85);
  };

  const handleCopyAndApply = () => {
    copyAndApplyCoupon();
    setCopied(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF2A8D', '#FF4696', '#35D07F', '#FFFFFF']
      });
    } catch {}
    setTimeout(() => setCopied(false), 4000);
  };

  return (
    <section id="hero" className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-nightViolet pt-4 pb-12 lg:pb-16 scroll-mt-28">
      {/* Ambient background glows with dragonfruit & night-violet tones */}
      <div className="absolute top-1/4 left-1/4 w-60 sm:w-[450px] h-60 sm:h-[450px] bg-dragonfruit/5 sm:bg-dragonfruit/8 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#3A2555]/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Editorial Copy */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5 lg:space-y-6">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cardBg border border-cardBorder shadow-card-glow">
            <Sparkles className="w-3.5 h-3.5 text-dragonfruit animate-spin" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-lightLavender uppercase">
              {current.eyebrow}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-fashion font-bold text-mainHeading leading-[1.1] sm:leading-[1.08] tracking-tight">
            {current.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base lg:text-lg text-lightLavender/90 font-light leading-relaxed max-w-xl">
            {current.subtitle}
          </p>

          {/* Interactive CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            {/* Primary Button: Dragonfruit with White text */}
            <button
              onClick={scrollToCollection}
              className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-dragonfruit text-white font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] hover:shadow-dragonfruit-lg transition-all duration-300 transform active:scale-95 cursor-pointer font-sans"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Bespoke Fitting studio secondary button */}
            <button
              onClick={() => openFittingModal()}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-cardBg border border-cardBorder text-lightLavender font-medium text-xs sm:text-sm tracking-wider hover:border-dragonfruit hover:text-white hover:bg-cardBg/90 transition-all duration-300 cursor-pointer"
            >
              <Scissors className="w-4 h-4 text-dragonfruit" />
              <span>Book Private Fitting</span>
            </button>
          </div>

          {/* VIP Patron Coupon Code Capsule */}
          <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 p-2 pr-3.5 rounded-2xl bg-cardBg/90 border border-cardBorder hover:border-dragonfruit/60 transition-all shadow-card-glow max-w-lg w-full">
            <div className="px-2.5 py-1 rounded-xl bg-dragonfruit/20 border border-dragonfruit/60 flex items-center gap-1.5 text-dragonfruit text-[11px] font-bold shrink-0">
              <Crown className="w-3.5 h-3.5" />
              <span>VIP PRIVILEGE</span>
            </div>
            <div className="text-xs text-lightLavender font-medium flex items-center gap-1.5 flex-1 min-w-[140px]">
              <span className="text-mutedLavender">Code:</span>
              <strong className="text-dragonfruit font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-inputBg border border-inputBorder text-xs">
                {commerceConfig.promoCode}
              </strong>
              <span className="text-[11px] text-mutedLavender">({commerceConfig.promoDiscountPercent}% OFF)</span>
            </div>
            <button
              onClick={handleCopyAndApply}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                appliedPromo === commerceConfig.promoCode || copied
                  ? 'bg-[#35D07F] text-[#120824] shadow-md shadow-[#35D07F]/40 scale-105'
                  : 'bg-dragonfruit text-white hover:bg-[#FF4696] hover:text-[#1E1033] shadow-dragonfruit'
              }`}
            >
              {appliedPromo === commerceConfig.promoCode || copied ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Applied ✓</span>
                </>
              ) : (
                <>
                  <Tag className="w-3.5 h-3.5" />
                  <span>Apply 25% Off</span>
                </>
              )}
            </button>
          </div>

          {/* Luxury Quality Badges */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-5 border-t border-cardBorder/60 w-full max-w-lg text-center sm:text-left">
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-fashion font-bold text-mainHeading">4.9 ★</span>
              <span className="text-[10px] sm:text-xs text-mutedLavender mt-0.5 font-medium">Bespoke Rating</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-fashion font-bold text-mainHeading">100%</span>
              <span className="text-[10px] sm:text-xs text-mutedLavender mt-0.5 font-medium">Mulberry & Velvet</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-fashion font-bold text-mainHeading">7 SALONS</span>
              <span className="text-[10px] sm:text-xs text-mutedLavender mt-0.5 font-medium">Paris • London</span>
            </div>
          </div>
        </div>

        {/* Right Editorial Fashion Spotlight Frame */}
        <div className="lg:col-span-5 relative">
          {/* Main Visual Card */}
          <div className="relative rounded-3xl overflow-hidden bg-cardBg border border-cardBorder shadow-2xl group transition-all duration-500 hover:border-dragonfruit">
            {/* Image */}
            <div className="aspect-[3/4] w-full overflow-hidden relative">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nightViolet via-transparent to-transparent opacity-85" />

              {/* Floating Dragonfruit Badge */}
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-dragonfruit/95 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase shadow-dragonfruit">
                {current.featuredTag}
              </div>

              {/* Bottom Spotlight Info */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#1c0d33]/90 backdrop-blur-md border border-[#3A2555] flex items-center justify-between gap-3 shadow-xl">
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-mainHeading line-clamp-1">{current.name}</h4>
                  <p className="text-xs text-dragonfruit font-bold mt-0.5">
                    {formatPrice(current.price)} <span className="text-mutedLavender font-normal text-[10px]">• Made-to-Order</span>
                  </p>
                </div>
                <button
                  onClick={scrollToCollection}
                  className="px-3.5 py-2 rounded-lg bg-dragonfruit text-white text-xs font-semibold hover:bg-[#FF4696] hover:text-[#1E1033] transition-colors cursor-pointer shrink-0"
                >
                  View Piece
                </button>
              </div>
            </div>
          </div>

          {/* Slide Switcher Thumbnails */}
          <div className="flex items-center justify-center gap-3 mt-4">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeSlide === idx
                    ? 'w-8 h-2.5 bg-dragonfruit shadow-sm'
                    : 'w-2.5 h-2.5 bg-cardBorder hover:bg-mutedLavender'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
