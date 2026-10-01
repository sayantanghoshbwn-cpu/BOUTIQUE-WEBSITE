import React, { useState, useMemo, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { X, Search, Sparkles, ArrowRight } from 'lucide-react';

export const SearchModal = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    openQuickView,
    formatPrice
  } = useShop();

  const [query, setQuery] = useState('');

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isSearchOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen, setIsSearchOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return PRODUCTS.slice(0, 4);
    const q = query.toLowerCase();
    return PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchOpen) return null;

  const popularTags = ['Velvet Gown', 'Bridal Saree', 'Silk Slip Dress', 'Smoking Blazer', 'Mulberry Silk', 'Minaudière'];

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-20 px-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-nightViolet/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-cardBg border border-cardBorder rounded-3xl shadow-2xl z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Search Header */}
        <div className="p-5 border-b border-cardBorder flex items-center gap-3">
          <Search className="w-5 h-5 text-dragonfruit shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search haute couture, bridal silks, velvets, accessories..."
            autoFocus
            className="flex-1 bg-transparent text-mainHeading placeholder:text-mutedLavender/60 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-mutedLavender hover:text-white"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-lg text-mutedLavender hover:text-white hover:bg-inputBg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-5 py-3 bg-inputBg border-b border-inputBorder flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-mutedLavender text-[11px] uppercase tracking-wider shrink-0">Popular:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-cardBg border border-cardBorder text-lightLavender text-[11px] hover:border-dragonfruit hover:text-dragonfruit transition-colors shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3">
          <div className="text-xs text-mutedLavender mb-2 font-medium">
            {query.trim() ? `Found ${searchResults.length} creations` : 'Featured Atelier Highlights'}
          </div>

          {searchResults.length === 0 ? (
            <div className="py-12 text-center text-mutedLavender text-sm">
              No couture creations match "{query}". Try searching for "Velvet" or "Silk".
            </div>
          ) : (
            searchResults.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setIsSearchOpen(false);
                  openQuickView(product);
                }}
                className="p-3 rounded-2xl bg-inputBg/70 border border-cardBorder flex items-center justify-between gap-4 hover:border-dragonfruit hover:bg-inputBg transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-14 h-16 rounded-xl object-cover border border-cardBorder shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] text-dragonfruit uppercase font-semibold block">
                      {product.category}
                    </span>
                    <h4 className="text-xs font-bold text-mainHeading group-hover:text-dragonfruit transition-colors line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-mutedLavender truncate max-w-xs">{product.fabric}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-fashion font-bold text-mainHeading">
                    {formatPrice(product.priceUSD)}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-cardBg border border-cardBorder flex items-center justify-center text-mutedLavender group-hover:bg-[#FF4696] group-hover:text-[#1E1033] group-hover:border-[#FF4696] transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
