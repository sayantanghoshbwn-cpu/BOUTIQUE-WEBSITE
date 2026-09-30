import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { commerceConfig } from '../config/boutiqueConfig';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    formatPrice,
    cartSubtotalUSD,
    discountAmountUSD,
    shippingFeeUSD,
    cartTotalUSD,
    isFreeShipping,
    appliedPromo,
    applyPromo,
    removePromo,
    setIsCheckoutOpen
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 500;
  const progressPercent = Math.min(100, (cartSubtotalUSD / freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - cartSubtotalUSD);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromo(inputCode);
      setInputCode('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[999] flex justify-end animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-nightViolet/80 backdrop-blur-md transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md bg-darkViolet border-l border-cardBorder h-full flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-cardBorder flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-dragonfruit" />
            <h3 className="font-fashion text-lg font-bold text-mainHeading">
              Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl text-mutedLavender hover:text-white hover:bg-cardBg transition-colors cursor-pointer"
            aria-label="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3 bg-cardBg border-b border-cardBorder text-xs">
          <div className="flex items-center justify-between mb-1.5 font-medium">
            <span className="text-lightLavender">
              {isFreeShipping ? (
                <span className="text-[#35D07F] font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Unlocked Complimentary Worldwide Couture Delivery!
                </span>
              ) : (
                <span>
                  Add <strong className="text-dragonfruit">{formatPrice(remainingForFree)}</strong> more for Free Shipping
                </span>
              )}
            </span>
            <span className="text-mutedLavender">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-inputBg overflow-hidden">
            <div
              className="h-full bg-dragonfruit transition-all duration-500 rounded-full shadow-[0_0_8px_#FF2A8D]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto overscroll-contain space-y-3.5 no-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-cardBg border border-cardBorder flex items-center justify-center mx-auto text-mutedLavender">
                <ShoppingBag className="w-8 h-8 text-dragonfruit" />
              </div>
              <h4 className="font-fashion text-base font-bold text-mainHeading">Your Bag is Empty</h4>
              <p className="text-xs text-mutedLavender max-w-xs mx-auto">
                Explore our Haute Couture archive and add bespoke handcrafted creations.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  smoothScrollTo('collection', -85);
                }}
                className="mt-2 px-6 py-2.5 rounded-xl bg-dragonfruit text-white text-xs font-semibold uppercase tracking-wider shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const prod = item.product || {};
              const color = item.selectedColor || (prod.colors && prod.colors[0]) || { name: 'Signature', hex: '#FF2A8D' };
              const imgSrc = (prod.images && prod.images[0]) || 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80';
              const price = prod.priceUSD || 0;

              return (
                <div
                  key={item.cartItemId}
                  className="p-3.5 sm:p-4 rounded-2xl bg-cardBg border border-cardBorder flex gap-3.5 sm:gap-4 items-center group relative hover:border-dragonfruit/60 transition-all shadow-sm"
                >
                  {/* Thumbnail */}
                  <img
                    src={imgSrc}
                    alt={prod.name || 'Creation'}
                    className="w-16 sm:w-20 h-20 sm:h-24 rounded-xl object-cover border border-cardBorder shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-mainHeading line-clamp-1">
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-mutedLavender mt-0.5 flex items-center gap-1">
                      <span>Size: <strong className="text-lightLavender">{item.selectedSize || 'M'}</strong></span>
                      <span>•</span>
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full border border-cardBorder align-middle"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                      <span className="truncate max-w-[100px]">{color.name}</span>
                    </p>
                    <p className="text-xs font-fashion font-bold text-dragonfruit mt-1">
                      {formatPrice(price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center rounded-lg bg-inputBg border border-inputBorder">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="p-1 text-mutedLavender hover:text-white transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-mainHeading">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="p-1 text-mutedLavender hover:text-white transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="p-1 text-mutedLavender hover:text-[#FF5C7A] transition-colors ml-auto cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer & Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-6 bg-[#130825] border-t border-cardBorder space-y-3 sm:space-y-4 shrink-0">
            
            {/* VIP Promo Code Section in Cart */}
            <div className="p-3 rounded-2xl bg-cardBg/90 border border-cardBorder/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-lightLavender flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-dragonfruit" />
                  <span>VIP Privilege Coupon</span>
                </span>
                {!appliedPromo && (
                  <button
                    type="button"
                    onClick={() => applyPromo(commerceConfig.promoCode)}
                    className="text-[10px] font-mono font-bold text-dragonfruit hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Use "{commerceConfig.promoCode}" ({commerceConfig.promoDiscountPercent}% OFF)</span>
                  </button>
                )}
              </div>

              {!appliedPromo ? (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder={`Enter code (e.g. ${commerceConfig.promoCode})`}
                    className="flex-1 px-3 py-2 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-xs placeholder:text-mutedLavender/50 focus:outline-none focus:border-dragonfruit uppercase font-mono font-semibold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-dragonfruit text-white text-xs font-semibold hover:bg-[#FF4696] hover:text-[#1E1033] shadow-dragonfruit transition-colors cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between text-xs text-[#35D07F] bg-[#182C25] p-2.5 rounded-xl border border-[#35D07F]/40">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#35D07F]" />
                    <span>{appliedPromo} ({commerceConfig.promoDiscountPercent}% OFF Applied)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">-{formatPrice(discountAmountUSD)}</span>
                    <button
                      type="button"
                      onClick={removePromo}
                      className="text-[10px] text-mutedLavender hover:text-red-400 underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-mutedLavender">
                <span>Subtotal</span>
                <span className="text-lightLavender font-medium">{formatPrice(cartSubtotalUSD)}</span>
              </div>
              {discountAmountUSD > 0 && (
                <div className="flex justify-between text-[#35D07F]">
                  <span>VIP Privilege Discount</span>
                  <span>-{formatPrice(discountAmountUSD)}</span>
                </div>
              )}
              <div className="flex justify-between text-mutedLavender">
                <span>Couture Shipping</span>
                <span className="text-lightLavender">
                  {shippingFeeUSD === 0 ? <strong className="text-[#35D07F]">Free</strong> : formatPrice(shippingFeeUSD)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-fashion font-bold text-mainHeading pt-2 border-t border-cardBorder">
                <span>Total Investment</span>
                <span className="text-dragonfruit text-base">{formatPrice(cartTotalUSD)}</span>
              </div>
            </div>

            {/* Primary Action Button: Dragonfruit with White text */}
            <button
              onClick={handleProceedCheckout}
              className="w-full py-4 rounded-xl bg-dragonfruit text-white font-semibold text-xs tracking-wider uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] hover:shadow-dragonfruit-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <span>Proceed to Bespoke Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-mutedLavender">
              <ShieldCheck className="w-3.5 h-3.5 text-[#35D07F]" />
              <span>Insured International Courier • Hand-Delivered in Trunk</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
