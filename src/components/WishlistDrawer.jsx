import React, { useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    formatPrice,
    openQuickView
  } = useShop();

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isWishlistOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsWishlistOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isWishlistOpen, setIsWishlistOpen]);

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveToBag = (product) => {
    const size = (product.sizes && product.sizes[0]) || 'M';
    const color = (product.colors && product.colors[0]) || null;
    setIsWishlistOpen(false);
    addToCart(product, size, color, 1);
    toggleWishlist(product);
  };

  return (
    <div className="fixed inset-0 z-[999] flex justify-end animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="fixed inset-0 bg-nightViolet/80 backdrop-blur-md transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md bg-darkViolet border-l border-cardBorder h-full flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-cardBorder flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-dragonfruit fill-dragonfruit" />
            <h3 className="font-fashion text-lg font-bold text-mainHeading">
              My Saved Wishlist ({wishlistedProducts.length})
            </h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 rounded-xl text-mutedLavender hover:text-white hover:bg-cardBg transition-colors cursor-pointer"
            aria-label="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-cardBg border border-cardBorder flex items-center justify-center mx-auto text-mutedLavender">
                <Heart className="w-8 h-8 text-dragonfruit" />
              </div>
              <h4 className="font-fashion text-base font-bold text-mainHeading">Your Wishlist is Empty</h4>
              <p className="text-xs text-mutedLavender max-w-xs mx-auto">
                Explore our collections and tap the heart icon on pieces you desire.
              </p>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 rounded-2xl bg-cardBg border border-cardBorder flex gap-4 items-center group relative hover:border-cardBorder/80 transition-all"
              >
                {/* Thumbnail */}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-24 rounded-xl object-cover border border-cardBorder shrink-0 cursor-pointer"
                  onClick={() => {
                    setIsWishlistOpen(false);
                    openQuickView(product);
                  }}
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-mutedLavender uppercase tracking-wider block">
                    {product.category}
                  </span>
                  <h4
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openQuickView(product);
                    }}
                    className="text-xs font-bold text-mainHeading line-clamp-1 cursor-pointer hover:text-dragonfruit transition-colors"
                  >
                    {product.name}
                  </h4>
                  <p className="text-xs font-fashion font-bold text-dragonfruit mt-1">
                    {formatPrice(product.priceUSD)}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => handleMoveToBag(product)}
                      className="px-3 py-1.5 rounded-lg bg-dragonfruit text-white text-xs font-semibold hover:bg-[#FF4696] hover:text-[#1E1033] transition-colors flex items-center gap-1.5 cursor-pointer shadow-dragonfruit"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className="p-1.5 rounded-lg text-mutedLavender hover:text-[#FF5C7A] transition-colors cursor-pointer"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#130825] border-t border-cardBorder">
          <p className="text-center text-xs text-mutedLavender font-light">
            Bespoke pieces reserved in your wishlist remain handcrafted to order.
          </p>
        </div>

      </div>
    </div>
  );
};
