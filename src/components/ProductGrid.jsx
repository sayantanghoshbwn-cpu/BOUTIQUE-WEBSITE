import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES, FABRICS, OCCASIONS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, Sparkles, RotateCcw, Check } from 'lucide-react';

export const ProductGrid = () => {
  const { selectedCategory, setSelectedCategory } = useShop();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFabric, setSelectedFabric] = useState('All Fabrics');
  const [selectedOccasion, setSelectedOccasion] = useState('All Occasions');
  const [sortBy, setSortBy] = useState('featured');
  const [showFiltersBar, setShowFiltersBar] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Fabric filter
      if (selectedFabric !== 'All Fabrics' && !p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
        return false;
      }
      // Occasion filter
      if (selectedOccasion !== 'All Occasions' && !p.occasion.toLowerCase().includes(selectedOccasion.toLowerCase())) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchCat = p.category.toLowerCase().includes(query);
        const matchFabric = p.fabric.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        if (!matchName && !matchCat && !matchFabric && !matchDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price-high') return b.priceUSD - a.priceUSD;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured
    });
  }, [selectedCategory, selectedFabric, selectedOccasion, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedFabric('All Fabrics');
    setSelectedOccasion('All Occasions');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedFabric !== 'All Fabrics' ||
    selectedOccasion !== 'All Occasions' ||
    searchQuery.trim() !== '' ||
    sortBy !== 'featured';

  return (
    <section id="collection" className="py-16 sm:py-20 bg-nightViolet relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cardBg border border-cardBorder text-dragonfruit text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atelier Catalog & Bespoke Archive</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-fashion font-bold text-mainHeading mb-4">
            The Haute Couture Collection
          </h2>
          <p className="text-mutedLavender text-sm md:text-base font-light leading-relaxed">
            Crafted with uncompromising devotion to detail. Each garment is made from the finest organic Mulberry silk, royal velvets, and French lace with tailored custom sizing available.
          </p>
        </div>

        {/* Collection Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-dragonfruit text-white shadow-dragonfruit shadow-[0_0_15px_rgba(255,42,141,0.5)] scale-105'
                    : 'bg-cardBg border border-cardBorder text-lightLavender hover:bg-[#FF4696] hover:text-[#1E1033] hover:border-[#FF4696]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search & Filter Bar with User Specified Inputs */}
        <div className="p-4 rounded-2xl bg-cardBg border border-cardBorder shadow-xl mb-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Search Input: Styled with inputBg #25143B and inputBorder #49325F */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-mutedLavender absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search velvet, silk saree, gowns..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading placeholder:text-mutedLavender/60 text-sm focus:outline-none focus:border-dragonfruit focus:ring-1 focus:ring-dragonfruit transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-mutedLavender hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sub-Filters: Fabric, Occasion & Sort */}
            <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap justify-end">
              
              {/* Fabric Select */}
              <select
                value={selectedFabric}
                onChange={(e) => setSelectedFabric(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-lightLavender text-xs focus:outline-none focus:border-dragonfruit cursor-pointer"
              >
                {FABRICS.map((fabric) => (
                  <option key={fabric} value={fabric} className="bg-cardBg text-lightLavender">
                    {fabric}
                  </option>
                ))}
              </select>

              {/* Occasion Select */}
              <select
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-lightLavender text-xs focus:outline-none focus:border-dragonfruit cursor-pointer"
              >
                {OCCASIONS.map((occ) => (
                  <option key={occ} value={occ} className="bg-cardBg text-lightLavender">
                    {occ}
                  </option>
                ))}
              </select>

              {/* Sort By Select */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-lightLavender text-xs focus:outline-none focus:border-dragonfruit cursor-pointer"
              >
                <option value="featured" className="bg-cardBg">Sort: Featured</option>
                <option value="price-low" className="bg-cardBg">Price: Low to High</option>
                <option value="price-high" className="bg-cardBg">Price: High to Low</option>
                <option value="rating" className="bg-cardBg">Highest Rated</option>
              </select>

              {/* Reset Filters */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="px-3.5 py-2.5 rounded-xl bg-cardBg border border-cardBorder text-xs text-mutedLavender hover:text-white hover:border-dragonfruit flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-dragonfruit" />
                  <span>Reset</span>
                </button>
              )}
            </div>

          </div>

          {/* Results Summary count */}
          <div className="mt-3 pt-3 border-t border-cardBorder/40 flex items-center justify-between text-xs text-mutedLavender">
            <span>
              Showing <strong className="text-mainHeading">{filteredProducts.length}</strong> master creations
            </span>
            {hasActiveFilters && (
              <span className="text-dragonfruit font-medium">Filters active</span>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center rounded-3xl bg-cardBg border border-cardBorder p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-dragonfruit/20 border border-dragonfruit flex items-center justify-center mx-auto mb-4 text-dragonfruit">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-fashion font-bold text-mainHeading mb-2">
              No Masterpieces Found
            </h3>
            <p className="text-sm text-mutedLavender mb-6">
              We couldn't find any creations matching your specific search or filter criteria.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 rounded-xl bg-dragonfruit text-white font-semibold text-xs tracking-wider uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
