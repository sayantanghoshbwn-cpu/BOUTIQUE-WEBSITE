import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Heart,
  ShoppingBag,
  Sparkles,
  Scissors,
  ShieldCheck,
  Check,
  Ruler,
  Star
} from 'lucide-react';

export const QuickViewModal = () => {
  const {
    isQuickViewOpen,
    quickViewProduct: product,
    closeQuickView,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openFittingModal
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!isQuickViewOpen || !product) return null;

  const currentColor = selectedColor || product.colors[0];
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, currentColor, quantity);
    closeQuickView();
  };

  const handleBookFitting = () => {
    closeQuickView();
    openFittingModal(product);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-nightViolet/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-cardBg border border-cardBorder rounded-3xl shadow-2xl z-10 animate-in zoom-in-95 duration-300 flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-nightViolet/80 border border-cardBorder text-lightLavender hover:text-white hover:border-dragonfruit transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 md:p-10">
          
          {/* Left Gallery (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            {/* Main Active Image */}
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-nightViolet border border-cardBorder relative">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />

              {/* Tag Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-dragonfruit text-white text-[10px] font-bold tracking-widest uppercase shadow-dragonfruit">
                {product.tag}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
                  isWishlisted
                    ? 'bg-dragonfruit text-white shadow-dragonfruit'
                    : 'bg-cardBg/80 text-lightLavender border border-cardBorder hover:text-dragonfruit'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Switchers */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-dragonfruit scale-105 shadow-sm'
                      : 'border-cardBorder opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Product Specifications (6 cols) */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-dragonfruit font-semibold uppercase tracking-widest">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-lightLavender">
                  <Star className="w-3.5 h-3.5 fill-dragonfruit text-dragonfruit" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-mutedLavender">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Main Heading White */}
              <h2 className="text-2xl md:text-3xl font-fashion font-bold text-mainHeading leading-tight">
                {product.name}
              </h2>

              {/* Price & Lead Time */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-cardBorder">
                <span className="text-2xl font-fashion font-bold text-mainHeading">
                  {formatPrice(product.priceUSD)}
                </span>
                {product.originalPriceUSD > product.priceUSD && (
                  <span className="text-sm text-mutedLavender line-through">
                    {formatPrice(product.originalPriceUSD)}
                  </span>
                )}
                <span className="text-xs text-dragonfruit font-semibold ml-auto">
                  {product.leadTime}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-lightLavender/90 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Fabric Specs */}
              <div className="p-3.5 rounded-xl bg-inputBg border border-inputBorder text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-mutedLavender">Fabric:</span>
                  <span className="text-mainHeading font-medium">{product.fabric}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mutedLavender">Composition:</span>
                  <span className="text-lightLavender">{product.fabricComposition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mutedLavender">Silhouette:</span>
                  <span className="text-lightLavender">{product.silhouette}</span>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-xs font-semibold text-lightLavender mb-2 uppercase tracking-wider">
                  Color: <span className="text-dragonfruit">{currentColor.name}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                        currentColor.name === c.name
                          ? 'border-dragonfruit bg-inputBg text-white shadow-sm'
                          : 'border-cardBorder bg-inputBg/50 text-mutedLavender hover:text-lightLavender'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection & Size Guide */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-lightLavender uppercase tracking-wider">
                    Select Size:
                  </label>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-xs text-dragonfruit hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{showSizeGuide ? 'Hide Size Chart' : 'Haute Couture Size Chart'}</span>
                  </button>
                </div>

                {showSizeGuide && (
                  <div className="p-3 mb-3 rounded-xl bg-nightViolet border border-cardBorder text-[11px] text-lightLavender space-y-1 animate-in fade-in">
                    <div className="grid grid-cols-4 font-bold text-dragonfruit border-b border-cardBorder/40 pb-1">
                      <span>Size</span>
                      <span>Bust (in)</span>
                      <span>Waist (in)</span>
                      <span>Hips (in)</span>
                    </div>
                    <div className="grid grid-cols-4 text-mutedLavender">
                      <span>XS</span><span>32-33</span><span>24-25</span><span>35-36</span>
                    </div>
                    <div className="grid grid-cols-4 text-mutedLavender">
                      <span>S</span><span>34-35</span><span>26-27</span><span>37-38</span>
                    </div>
                    <div className="grid grid-cols-4 text-mutedLavender">
                      <span>M</span><span>36-37</span><span>28-29</span><span>39-40</span>
                    </div>
                    <div className="grid grid-cols-4 text-mutedLavender">
                      <span>L</span><span>38-40</span><span>30-32</span><span>41-43</span>
                    </div>
                    <div className="grid grid-cols-4 text-mutedLavender">
                      <span>MTM</span><span className="col-span-3 text-dragonfruit">Custom 1-on-1 Measurements</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-dragonfruit text-white shadow-dragonfruit'
                          : 'bg-inputBg border border-inputBorder text-lightLavender hover:border-dragonfruit'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Handcrafted Bullet Details */}
              <ul className="text-xs text-mutedLavender space-y-1.5 pt-1 font-light">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-dragonfruit shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-cardBorder">
              <div className="flex gap-3">
                {/* Primary Button: Dragonfruit with White text */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-dragonfruit text-white font-semibold text-xs tracking-wider uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] hover:shadow-dragonfruit-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-sans"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag</span>
                </button>

                <button
                  onClick={handleBookFitting}
                  className="py-3.5 px-5 rounded-xl bg-cardBg border border-cardBorder text-lightLavender text-xs font-semibold hover:border-dragonfruit hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Book Private Fitting for this piece"
                >
                  <Scissors className="w-4 h-4 text-dragonfruit" />
                  <span>Custom Fit</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-mutedLavender">
                <ShieldCheck className="w-3.5 h-3.5 text-[#35D07F]" />
                <span>Complimentary Worldwide Insured Delivery in Velvet Trunk</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
