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
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-dragonfruit/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#3A2555]/40 rounded-full blur-[120px] pointer-events-none" />

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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-fashion font-bold text-mainHeading leading-[1.08] tracking-tight">
            {current.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-lightLavender/90 font-light leading-relaxed max-w-xl">
            {current.subtitle}
          </p>

          {/* In-Page Interactive VIP Privilege Coupon & Application Bar */}
          <div className="w-full max-w-xl p-3 sm:p-3.5 rounded-2xl bg-[#281640]/95 backdrop-blur-md border border-dragonfruit/50 shadow-[0_0_25px_rgba(255,42,141,0.25)] space-y-2.5">
            
            {/* Top row: VIP offer details & 1-click button */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-dragonfruit shrink-0 animate-pulse" />
                <div>
                  <span className="text-xs font-fashion font-bold text-mainHeading">
                    VIP Privilege: <span className="text-dragonfruit">{commerceConfig.promoDiscountPercent}% OFF</span> Entire Order
                  </span>
                </div>
              </div>

              {/* 1-Click Tap to Apply Chip */}
              <button
                type="button"
                onClick={handleCopyAndApply}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-dragonfruit text-white text-xs font-mono font-bold uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] transition-all cursor-pointer shrink-0"
                title="Click to apply INDIA 2026 coupon"
              >
                <Tag className="w-3 h-3" />
                <span>{commerceConfig.promoCode}</span>
                {copied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 opacity-80" />}
              </button>
            </div>

            {/* Bottom row: Direct Apply Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (heroPromoInput.trim()) {
                  applyPromo(heroPromoInput);
                  setHeroPromoInput('');
                }
              }}
              className="flex items-center gap-2 pt-1 border-t border-cardBorder/60"
            >
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-mutedLavender absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={heroPromoInput}
                  onChange={(e) => setHeroPromoInput(e.target.value)}
                  placeholder={`Apply coupon code (e.g. ${commerceConfig.promoCode})`}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-xs placeholder:text-mutedLavender/60 focus:outline-none focus:border-dragonfruit uppercase font-mono font-semibold"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-cardBg border border-cardBorder text-lightLavender hover:border-dragonfruit hover:text-dragonfruit text-xs font-semibold transition-all cursor-pointer shrink-0"
              >
                Apply
              </button>
            </form>

            {appliedPromo && (
              <div className="text-[11px] text-[#35D07F] font-semibold flex items-center gap-1.5 bg-[#182C25] px-2.5 py-1 rounded-lg border border-[#35D07F]/40">
                <Check className="w-3.5 h-3.5" />
                <span>Active VIP Privilege: <strong>{appliedPromo}</strong> ({discountPercent}% discount activated across entire cart & checkout!)</span>
              </div>
            )}
          </div>

          {/* Interactive CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            {/* Primary Button: Dragonfruit with White text */}
            <button
              onClick={scrollToCollection}
              className="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-dragonfruit text-white font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] hover:shadow-dragonfruit-lg transition-all duration-300 transform active:scale-95 cursor-pointer font-sans"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Bespoke Fitting studio secondary button */}
            <button
              onClick={() => openFittingModal()}
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-cardBg border border-cardBorder text-lightLavender font-medium text-xs sm:text-sm tracking-wider hover:border-dragonfruit hover:text-white hover:bg-cardBg/90 transition-all duration-300 cursor-pointer"
            >
              <Scissors className="w-4 h-4 text-dragonfruit" />
              <span>Book Private Fitting</span>
            </button>
          </div>

          {/* Luxury Quality Badges */}
          <div className="grid grid-cols-3 gap-4 pt-5 border-t border-cardBorder/60 w-full max-w-lg">
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-fashion font-bold text-mainHeading">4.9 ★</span>
              <span className="text-xs text-mutedLavender mt-0.5 font-medium">Bespoke Rating</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-fashion font-bold text-mainHeading">100%</span>
              <span className="text-xs text-mutedLavender mt-0.5 font-medium">Mulberry & Velvet</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-fashion font-bold text-mainHeading">7 SALONS</span>
              <span className="text-xs text-mutedLavender mt-0.5 font-medium">Paris • London • Mumbai</span>
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
                    ? 'w-8 h-2.5 bg-dragonfruit shadow-[0_0_10px_#FF2A8D]'
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
