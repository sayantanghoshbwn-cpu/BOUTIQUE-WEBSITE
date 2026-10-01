import React, { useState } from 'react';
import { LOOKBOOK_ITEMS } from '../data/lookbook';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Sparkles, ChevronLeft, ChevronRight, Eye, Tag } from 'lucide-react';

export const LookbookSection = () => {
  const { openQuickView, formatPrice } = useShop();
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = LOOKBOOK_ITEMS[currentIndex];
  const matchedProduct = PRODUCTS.find((p) => p.id === current.featuredProductId) || PRODUCTS[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % LOOKBOOK_ITEMS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + LOOKBOOK_ITEMS.length) % LOOKBOOK_ITEMS.length);
  };

  return (
    <section id="lookbook" className="py-16 sm:py-24 bg-nightViolet relative overflow-hidden scroll-mt-20 border-t border-cardBorder/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-dragonfruit text-xs font-semibold tracking-[0.25em] uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Editorial Archive</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-fashion font-bold text-mainHeading">
              Runway Lookbook 2026
            </h2>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl bg-cardBg border border-cardBorder text-lightLavender hover:border-dragonfruit hover:text-dragonfruit transition-colors cursor-pointer"
              aria-label="Previous editorial slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-fashion font-bold text-mutedLavender px-2">
              0{currentIndex + 1} / 0{LOOKBOOK_ITEMS.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl bg-cardBg border border-cardBorder text-lightLavender hover:border-dragonfruit hover:text-dragonfruit transition-colors cursor-pointer"
              aria-label="Next editorial slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Editorial Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-cardBg border border-cardBorder p-6 lg:p-10 shadow-2xl">
          
          {/* Editorial Image with Interactive Hotspots (7 cols) */}
          <div className="lg:col-span-7 relative aspect-[4/5] rounded-2xl overflow-hidden group">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nightViolet/80 via-transparent to-transparent pointer-events-none" />

            {/* Season Badge */}
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-nightViolet/85 backdrop-blur-md border border-cardBorder text-[10px] font-bold tracking-widest text-dragonfruit uppercase">
              {current.season}
            </div>

            {/* Interactive Hotspot Pins */}
            {current.hotspots.map((spot, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => openQuickView(matchedProduct)}
                className="absolute group/pin cursor-pointer transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                style={{ top: spot.top, left: spot.left }}
                title={`View ${spot.label} — ${spot.product}`}
              >
                {/* Pulsing Pin */}
                <div className="relative">
                  <div className="w-7 h-7 rounded-full bg-dragonfruit/40 animate-ping absolute inset-0" />
                  <div className="w-7 h-7 rounded-full bg-dragonfruit border-2 border-white shadow-dragonfruit flex items-center justify-center text-white text-[10px] font-bold transition-transform group-hover/pin:scale-110">
                    +
                  </div>
                </div>

                {/* Tooltip on hover/focus */}
                <div className="absolute left-9 top-1/2 -translate-y-1/2 hidden group-hover/pin:block group-focus/pin:block whitespace-nowrap px-3.5 py-2 rounded-xl bg-cardBg/95 backdrop-blur-md border border-dragonfruit shadow-2xl text-xs z-30 text-left">
                  <span className="block font-bold text-mainHeading">{spot.label}</span>
                  <span className="text-[10px] text-dragonfruit font-medium">{spot.product} • Tap to View</span>
                </div>
              </button>
            ))}
          </div>

          {/* Editorial Story & Direct Shop Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-dragonfruit font-semibold block mb-1">
                {current.subtitle}
              </span>
              <h3 className="text-3xl font-fashion font-bold text-mainHeading mb-4">
                {current.title}
              </h3>
              <blockquote className="font-serif italic text-lg text-lightLavender/90 leading-relaxed border-l-2 border-dragonfruit pl-4 mb-3">
                {current.quote}
              </blockquote>
              <cite className="text-xs text-mutedLavender not-italic font-medium block">
                — {current.designer}
              </cite>
            </div>

            {/* Featured Product Shop Box */}
            <div className="p-4 rounded-2xl bg-inputBg border border-inputBorder flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={matchedProduct.images[0]}
                  alt={matchedProduct.name}
                  className="w-14 h-14 rounded-xl object-cover border border-cardBorder"
                />
                <div>
                  <h4 className="text-xs font-bold text-mainHeading line-clamp-1">{matchedProduct.name}</h4>
                  <p className="text-xs text-dragonfruit font-semibold mt-0.5">
                    {formatPrice(matchedProduct.priceUSD)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => openQuickView(matchedProduct)}
                className="px-3.5 py-2 rounded-xl bg-dragonfruit text-white text-xs font-semibold hover:bg-[#FF4696] hover:text-[#1E1033] transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Shop Look</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
