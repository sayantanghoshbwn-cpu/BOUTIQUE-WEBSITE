import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CURRENCIES } from '../data/products';
import { commerceConfig } from '../config/boutiqueConfig';
import { smoothScrollTo } from '../utils/scrollUtils';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Global Category Selection State
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Cart state with localStorage persistence (starts EMPTY by default)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('mv_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Validate that each item is a real user-added product (filter out any old test 'init-1' seeds)
          const valid = parsed.filter(item => 
            item && 
            item.cartItemId !== 'init-1' &&
            item.product && 
            item.product.id && 
            typeof item.product.priceUSD === 'number'
          );
          return valid;
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  // Wishlist state (starts EMPTY by default)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('mv_wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return [];
    } catch {
      return [];
    }
  });

  // Bookings state with localStorage persistence
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('mv_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Currency with localStorage persistence and default to INR
  const [currency, setCurrency] = useState(() => {
    try {
      const saved = localStorage.getItem('mv_currency');
      return saved && CURRENCIES[saved] ? saved : (commerceConfig.defaultCurrency || 'INR');
    } catch {
      return commerceConfig.defaultCurrency || 'INR';
    }
  });

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBookingsDrawerOpen, setIsBookingsDrawerOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isFittingModalOpen, setIsFittingModalOpen] = useState(false);
  const [fittingInitialProduct, setFittingInitialProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Promo discounts
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mv_currency', currency);
    } catch (e) {
      console.error(e);
    }
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem('mv_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('mv_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('mv_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  // Toast notification helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Price formatter with active currency and locale awareness
  const formatPrice = (amountUSD = 0) => {
    const validAmount = typeof amountUSD === 'number' && !isNaN(amountUSD) ? amountUSD : 0;
    const curr = CURRENCIES[currency] || CURRENCIES.INR || CURRENCIES.USD;
    const converted = Math.round(validAmount * curr.rate);
    const locale = currency === 'INR' ? 'en-IN' : 'en-US';
    return `${curr.symbol}${converted.toLocaleString(locale)}`;
  };

  // Category navigation & smooth scroll
  const navigateToCategory = (catId) => {
    setSelectedCategory(catId);
    smoothScrollTo('collection', -85);
  };

  // Cart operations with defensive validation
  const addToCart = (product, size = 'M', color = null, quantity = 1, customMeasurements = '') => {
    if (!product) return;
    const chosenColor = color || (product.colors && product.colors[0]) || { name: 'Signature', hex: '#FF2A8D' };
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'M';
    const numQty = Math.max(1, parseInt(quantity, 10) || 1);
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor.name || 'default'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + numQty }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          quantity: numQty,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          customMeasurements
        }
      ];
    });

    addToast(`Added "${product.name}" (${chosenSize}) to your Shopping Bag!`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    addToast('Item removed from your bag.', 'info');
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    const exists = wishlist.includes(product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== product.id));
      addToast(`Removed "${product.name}" from your Wishlist.`, 'info');
    } else {
      setWishlist((prev) => [...prev, product.id]);
      addToast(`Saved "${product.name}" to your Wishlist!`, 'success');
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Quick View
  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  // Fitting modal
  const openFittingModal = (product = null) => {
    setFittingInitialProduct(product);
    setIsFittingModalOpen(true);
  };

  const closeFittingModal = () => {
    setIsFittingModalOpen(false);
    setFittingInitialProduct(null);
  };

  // Flexible promo code validation supporting "INDIA 2026", "INDIA2026", "INDIA", etc.
  const applyPromo = (code) => {
    if (!code) return false;
    const clean = code.trim().toUpperCase().replace(/\s+/g, '');
    const configuredClean = (commerceConfig.promoCode || 'INDIA 2026').toUpperCase().replace(/\s+/g, '');
    const secretClean = (commerceConfig.secretPromoCode || 'DRAGONFRUIT20').toUpperCase().replace(/\s+/g, '');

    if (
      clean === configuredClean ||
      clean === 'INDIA2026' ||
      clean === 'INDIA' ||
      clean === 'HAUTE15' ||
      clean === 'VIOLETTE15' ||
      clean === 'VIP25' ||
      clean === 'VIP2026' ||
      clean === 'WELCOME25' ||
      clean === 'MAISON25'
    ) {
      const pCode = commerceConfig.promoCode || 'INDIA 2026';
      setDiscountPercent(commerceConfig.promoDiscountPercent || 25);
      setAppliedPromo(pCode);
      setPromoCode(pCode);
      addToast(`👑 VIP Privilege Code Applied: ${commerceConfig.promoDiscountPercent || 25}% OFF your entire order!`, 'success');
      return true;
    } else if (
      clean === secretClean ||
      clean === 'ROYAL20' ||
      clean === 'DRAGONFRUIT20' ||
      clean === 'DRAGONFRUIT' ||
      clean === 'SECRET20'
    ) {
      const sCode = commerceConfig.secretPromoCode || 'DRAGONFRUIT20';
      setDiscountPercent(commerceConfig.secretDiscountPercent || 20);
      setAppliedPromo(sCode);
      setPromoCode(sCode);
      addToast(`⚜️ Atelier Secret Code Applied: ${commerceConfig.secretDiscountPercent || 20}% OFF your order!`, 'success');
      return true;
    } else {
      addToast(`Invalid or expired VIP invitation code. Use "${commerceConfig.promoCode || 'INDIA 2026'}"`, 'error');
      return false;
    }
  };

  const removePromo = () => {
    setDiscountPercent(0);
    setAppliedPromo('');
    setPromoCode('');
    addToast('Promo coupon removed.', 'info');
  };

  // Helper to copy and apply coupon in one click
  const copyAndApplyCoupon = () => {
    const code = commerceConfig.promoCode || 'INDIA 2026';
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code);
      }
    } catch {}
    applyPromo(code);
  };

  // Bookings / Appointments operations
  const addBooking = (bookingData) => {
    const newBooking = {
      id: bookingData.id || `VIP-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      ...bookingData
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    addToast('Appointment cancelled.', 'info');
  };

  const openBookingsDrawer = () => {
    setIsBookingsDrawerOpen(true);
  };

  const closeBookingsDrawer = () => {
    setIsBookingsDrawerOpen(false);
  };

  // Defensive Calculations
  const cartSubtotalUSD = cart.reduce(
    (acc, item) => acc + ((item?.product?.priceUSD || 0) * (item?.quantity || 1)),
    0
  );
  const discountAmountUSD = (cartSubtotalUSD * (discountPercent || 0)) / 100;
  const isFreeShipping = cartSubtotalUSD >= (commerceConfig.freeShippingThreshold || 500);
  const shippingFeeUSD = cart.length === 0 ? 0 : isFreeShipping ? 0 : (commerceConfig.standardShippingFee || 45);
  const cartTotalUSD = Math.max(0, cartSubtotalUSD - discountAmountUSD + shippingFeeUSD);
  const cartCount = cart.reduce((acc, item) => acc + (item?.quantity || 0), 0);
  const wishlistCount = wishlist.length;
  const bookingsCount = bookings.length;

  return (
    <ShopContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        navigateToCategory,
        cart,
        wishlist,
        bookings,
        bookingsCount,
        addBooking,
        cancelBooking,
        isBookingsDrawerOpen,
        setIsBookingsDrawerOpen,
        openBookingsDrawer,
        closeBookingsDrawer,
        currency,
        setCurrency,
        formatPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isQuickViewOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isFittingModalOpen,
        fittingInitialProduct,
        openFittingModal,
        closeFittingModal,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        promoCode,
        setPromoCode,
        discountPercent,
        appliedPromo,
        applyPromo,
        removePromo,
        copyAndApplyCoupon,
        toasts,
        addToast,
        removeToast,
        cartSubtotalUSD,
        discountAmountUSD,
        shippingFeeUSD,
        cartTotalUSD,
        cartCount,
        wishlistCount,
        isFreeShipping
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
