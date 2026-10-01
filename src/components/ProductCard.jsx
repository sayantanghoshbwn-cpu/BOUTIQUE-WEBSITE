import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Sparkles, Check } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView
  } = useShop();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(() => (product.colors && product.colors[0]) || { name: 'Signature', hex: '#FF2A8D' });
  const [selectedSize, setSelectedSize] = useState(() => (product.sizes && product.sizes[0]) || 'M');
  const [justAdded, setJustAdded] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  useEffect(() => {
    setCurrentImageIndex(0);
    setSelectedColor((product.colors && product.colors[0]) || { name: 'Signature', hex: '#FF2A8D' });
    setSelectedSize((product.sizes && product.sizes[0]) || 'M');
  }, [product]);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-cardBg border border-cardBorder shadow-card-glow transition-all duration-300 hover:border-dragonfruit hover:shadow-dragonfruit flex flex-col justify-between">
      
      {/* Top Media Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-nightViolet cursor-pointer" onClick={() => openQuickView(product)}>
        {/* Main Product Image with Smooth Hover Swap */}
        <img
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#281640] via-transparent to-black/20 opacity-60 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
          <span className="px-3 py-1 rounded-full bg-dragonfruit text-white text-[10px] font-bold tracking-widest uppercase shadow-dragonfruit">
            {product.tag}
          </span>
          {product.originalPriceUSD > product.priceUSD && (
            <span className="px-2.5 py-0.5 rounded-full bg-cardBg/90 backdrop-blur-md border border-cardBorder text-lightLavender text-[10px] font-medium tracking-wide">
              Atelier Price
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 z-10 cursor-pointer ${
            isWishlisted
              ? 'bg-dragonfruit text-white shadow-dragonfruit'
              : 'bg-cardBg/80 text-lightLavender border border-cardBorder hover:text-dragonfruit hover:border-dragonfruit'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Floating Action Overlay Bar on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-cardBg/95 backdrop-blur-md border border-cardBorder text-lightLavender text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#FF4696] hover:text-[#1E1033] hover:border-[#FF4696] transition-all cursor-pointer shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="py-2.5 px-4 rounded-xl bg-dragonfruit text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#FF4696] hover:text-[#1E1033] transition-all cursor-pointer shadow-dragonfruit"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

        {/* Multi-image indicator dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-16 inset-x-0 flex justify-center gap-1 z-10">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                  currentImageIndex === idx ? 'w-4 bg-dragonfruit' : 'bg-white/40 hover:bg-white'
                }`}
                aria-label={`View photo ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Product Details */}
      <div className="p-3.5 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Category & Fabric metadata */}
          <div className="flex items-center justify-between text-xs text-mutedLavender mb-1.5">
            <span className="uppercase tracking-widest font-medium text-[9.5px] sm:text-[10px]">{product.category}</span>
            <span className="text-lightLavender font-medium text-[10px] sm:text-[11px] truncate max-w-[120px] sm:max-w-[150px]">{product.fabric}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => openQuickView(product)}
            className="font-fashion text-base font-bold text-mainHeading group-hover:text-dragonfruit transition-colors line-clamp-1 cursor-pointer mb-2"
          >
            {product.name}
          </h3>

          {/* Color Swatches */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] uppercase tracking-wider text-mutedLavender">Colors:</span>
            <div className="flex items-center gap-1.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color);
                  }}
                  className={`w-4 h-4 rounded-full border transition-all cursor-pointer relative ${
                    selectedColor.name === color.name
                      ? 'border-dragonfruit scale-125 shadow-sm'
                      : 'border-cardBorder opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Available Sizes Pills */}
          <div className="flex items-center gap-1.5 flex-wrap mb-4">
            {product.sizes.slice(0, 4).map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                  selectedSize === size
                    ? 'bg-dragonfruit text-white shadow-sm'
                    : 'bg-inputBg border border-inputBorder text-mutedLavender hover:text-lightLavender'
                }`}
              >
                {size}
              </button>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-[9px] text-mutedLavender font-medium">+more</span>
            )}
          </div>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="pt-2.5 sm:pt-3 border-t border-cardBorder/60 flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline gap-1.5 sm:gap-2 truncate">
              <span className="text-base sm:text-lg font-fashion font-bold text-mainHeading">
                {formatPrice(product.priceUSD)}
              </span>
              {product.originalPriceUSD > product.priceUSD && (
                <span className="text-[10px] sm:text-xs text-mutedLavender line-through">
                  {formatPrice(product.originalPriceUSD)}
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] text-mutedLavender truncate">{product.leadTime}</span>
          </div>

          {/* Primary Action Button: Dragonfruit with White text, hover effect */}
          <button
            onClick={handleQuickAdd}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1 sm:gap-1.5 cursor-pointer font-sans shrink-0 ${
              justAdded
                ? 'bg-[#35D07F] text-[#120824] font-bold shadow-md shadow-[#35D07F]/40 scale-105'
                : 'bg-dragonfruit text-white shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] hover:shadow-dragonfruit-lg'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Added ✓</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
