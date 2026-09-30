import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import { commerceConfig } from '../config/boutiqueConfig';
import {
  X,
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Sparkles,
  Crown,
  Tag
} from 'lucide-react';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    formatPrice,
    cartSubtotalUSD,
    discountAmountUSD,
    shippingFeeUSD,
    cartTotalUSD,
    appliedPromo,
    applyPromo,
    removePromo,
    addToast
  } = useShop();

  const [checkoutPromoInput, setCheckoutPromoInput] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'France',
    postalCode: '',
    tailoringNotes: '',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '•••'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [errors, setErrors] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First Name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last Name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid Email is required';
    if (!formData.address.trim()) errs.address = 'Delivery Address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please fill all required delivery details.', 'error');
      return;
    }

    const genOrder = `MV-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(genOrder);
    setIsCompleted(true);

    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FF2A8D', '#FF4696', '#35D07F', '#E6DDF8', '#FFFFFF']
      });
    } catch {}

    clearCart();
    addToast(`Order ${genOrder} Placed Successfully!`, 'success');
  };

  const handleClose = () => {
    setIsCompleted(false);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-nightViolet/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[88dvh] sm:max-h-[92vh] overflow-y-auto bg-cardBg border border-cardBorder rounded-3xl p-4 sm:p-6 md:p-10 shadow-2xl z-10 animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-nightViolet/80 border border-cardBorder text-lightLavender hover:text-white hover:border-dragonfruit transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            <div className="flex items-center gap-2 text-dragonfruit text-xs font-semibold tracking-widest uppercase mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Encrypted Haute Couture Checkout</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-fashion font-bold text-mainHeading mb-6 sm:mb-8">
              Bespoke Order Acquisition
            </h2>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Form (7 cols) */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                
                {/* Patron Shipping Details */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xs sm:text-sm font-fashion font-bold text-mainHeading uppercase tracking-wider border-b border-cardBorder pb-2">
                    1. Patron & Insured Delivery Address
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-lightLavender mb-1">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Lady Jacqueline"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-xs focus:outline-none focus:border-dragonfruit"
                      />
                      {errors.firstName && <span className="text-[10px] text-[#FF5C7A]">{errors.firstName}</span>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-lightLavender mb-1">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="De Montmirail"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-xs focus:outline-none focus:border-dragonfruit"
                      />
                      {errors.lastName && <span className="text-[10px] text-[#FF5C7A]">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-lightLavender mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jacqueline@couture.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-xs focus:outline-none focus:border-dragonfruit"
                      />
                      {errors.email && <span className="text-[10px] text-[#FF5C7A]">{errors.email}</span>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-lightLavender mb-1">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+33 6 12 34 56 78"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-xs focus:outline-none focus:border-dragonfruit"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-lightLavender mb-1">Delivery Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Avenue Montaigne, 8th Arrondissement"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-xs focus:outline-none focus:border-dragonfruit"
                    />
                    {errors.address && <span className="text-[10px] text-[#FF5C7A]">{errors.address}</span>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-lightLavender mb-1">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Paris"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-xs focus:outline-none focus:border-dragonfruit"
                      />
                      {errors.city && <span className="text-[10px] text-[#FF5C7A]">{errors.city}</span>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-lightLavender mb-1">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-lightLavender text-xs focus:outline-none focus:border-dragonfruit"
                      >
                        <option value="France">France</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="India">India</option>
                        <option value="UAE">UAE / Dubai</option>
                        <option value="Switzerland">Switzerland</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-lightLavender mb-1">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="75008"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-xs focus:outline-none focus:border-dragonfruit"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-lightLavender mb-1">
                      Custom Bespoke Notes / Tailoring Specifications (Optional)
                    </label>
                    <textarea
                      name="tailoringNotes"
                      rows={2}
                      value={formData.tailoringNotes}
                      onChange={handleChange}
                      placeholder="Special sleeve length, wedding date monogramming inside lining, etc."
                      className="w-full px-3.5 py-2 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-xs focus:outline-none focus:border-dragonfruit"
                    />
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-3">
                  <h3 className="text-sm font-fashion font-bold text-mainHeading uppercase tracking-wider border-b border-cardBorder pb-2">
                    2. Payment Method
                  </h3>

                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-dragonfruit bg-inputBg text-white shadow-dragonfruit'
                          : 'border-cardBorder bg-inputBg/50 text-mutedLavender'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mx-auto mb-1 text-dragonfruit" />
                      <span className="text-[11px] font-semibold block">VIP Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        paymentMethod === 'apple'
                          ? 'border-dragonfruit bg-inputBg text-white shadow-dragonfruit'
                          : 'border-cardBorder bg-inputBg/50 text-mutedLavender'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 mx-auto mb-1 text-dragonfruit" />
                      <span className="text-[11px] font-semibold block">Apple Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wire')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        paymentMethod === 'wire'
                          ? 'border-dragonfruit bg-inputBg text-white shadow-dragonfruit'
                          : 'border-cardBorder bg-inputBg/50 text-mutedLavender'
                      }`}
                    >
                      <Crown className="w-4 h-4 mx-auto mb-1 text-dragonfruit" />
                      <span className="text-[11px] font-semibold block">Private Wire</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Order Summary (5 cols) */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-inputBg/80 border border-cardBorder space-y-5">
                <h3 className="text-sm font-fashion font-bold text-mainHeading uppercase tracking-wider border-b border-cardBorder pb-2">
                  Order Summary ({cart.length} creations)
                </h3>

                {/* Items preview */}
                <div className="max-h-48 overflow-y-auto overscroll-contain space-y-3 pr-1 no-scrollbar">
                  {cart.map((item) => {
                    const prod = item.product || {};
                    const imgSrc = (prod.images && prod.images[0]) || '';
                    const price = prod.priceUSD || 0;
                    const qty = item.quantity || 1;

                    return (
                      <div key={item.cartItemId} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {imgSrc && (
                            <img
                              src={imgSrc}
                              alt={prod.name || 'Creation'}
                              className="w-10 h-12 rounded-lg object-cover border border-cardBorder shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-mainHeading truncate">{prod.name}</p>
                            <p className="text-[10px] text-mutedLavender">
                              Qty: {qty} • Size: {item.selectedSize || 'M'}
                            </p>
                          </div>
                        </div>
                        <span className="font-fashion font-bold text-lightLavender shrink-0 ml-2">
                          {formatPrice(price * qty)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* VIP Promo Code Application Box in Checkout */}
                <div className="p-3.5 rounded-2xl bg-cardBg border border-cardBorder/90 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-lightLavender flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-dragonfruit" />
                      <span>VIP Privilege Coupon</span>
                    </span>
                    {!appliedPromo && (
                      <button
                        type="button"
                        onClick={() => applyPromo(commerceConfig.promoCode)}
                        className="text-[10.5px] font-mono font-bold text-dragonfruit hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Use "{commerceConfig.promoCode}" ({commerceConfig.promoDiscountPercent}% OFF)</span>
                      </button>
                    )}
                  </div>

                  {!appliedPromo ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={checkoutPromoInput}
                        onChange={(e) => setCheckoutPromoInput(e.target.value)}
                        placeholder={`Enter VIP code (e.g. ${commerceConfig.promoCode})`}
                        className="flex-1 px-3 py-2 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-xs placeholder:text-mutedLavender/50 focus:outline-none focus:border-dragonfruit uppercase font-mono font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (checkoutPromoInput.trim()) {
                            applyPromo(checkoutPromoInput);
                            setCheckoutPromoInput('');
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-dragonfruit text-white text-xs font-semibold hover:bg-[#FF4696] hover:text-[#1E1033] shadow-dragonfruit transition-colors cursor-pointer shrink-0"
                      >
                        Apply
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-[#35D07F] bg-[#182C25] p-2.5 rounded-xl border border-[#35D07F]/40">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-[#35D07F]" />
                        <span>Code "{appliedPromo}" ({discountPercent}% Discount Applied)</span>
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

                {/* Financial breakdown */}
                <div className="pt-3 border-t border-cardBorder space-y-1.5 text-xs">
                  <div className="flex justify-between text-mutedLavender">
                    <span>Subtotal</span>
                    <span className="text-lightLavender">{formatPrice(cartSubtotalUSD)}</span>
                  </div>
                  {discountAmountUSD > 0 && (
                    <div className="flex justify-between text-[#35D07F]">
                      <span>VIP Privilege Discount</span>
                      <span>-{formatPrice(discountAmountUSD)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-mutedLavender">
                    <span>Insured Delivery</span>
                    <span>{shippingFeeUSD === 0 ? <strong className="text-[#35D07F]">Complimentary</strong> : formatPrice(shippingFeeUSD)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-fashion font-bold text-mainHeading pt-2 border-t border-cardBorder">
                    <span>Total Acquisition</span>
                    <span className="text-dragonfruit text-lg">{formatPrice(cartTotalUSD)}</span>
                  </div>
                </div>

                {/* Primary Button: Dragonfruit with White text */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-dragonfruit text-white font-semibold text-xs tracking-wider uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] hover:shadow-dragonfruit-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-sans"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Place Order</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-mutedLavender">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#35D07F]" />
                  <span>256-bit SSL Vault Protection</span>
                </div>
              </div>

            </form>
          </div>
        ) : (
          /* Order Complete Confirmation */
          <div className="py-12 text-center max-w-lg mx-auto space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-[#182C25] border-2 border-[#35D07F] text-[#35D07F] flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#35D07F]">
                Haute Couture Acquisition Confirmed
              </span>
              <h3 className="text-3xl font-fashion font-bold text-mainHeading mt-1">
                Thank You, {formData.firstName}
              </h3>
              <p className="text-sm text-mutedLavender mt-2 font-light">
                Your order is now being registered in our Paris Atelier ledger. A formal authenticity certificate and invoice have been dispatched to <strong className="text-white">{formData.email}</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-inputBg border border-inputBorder text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-mutedLavender">Order Reference:</span>
                <span className="font-mono font-bold text-dragonfruit">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mutedLavender">Delivery Destination:</span>
                <span className="text-white font-medium">{formData.city}, {formData.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mutedLavender">Total Investment:</span>
                <span className="text-dragonfruit font-bold">{formatPrice(cartTotalUSD)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mutedLavender">Estimated Dispatch:</span>
                <span className="text-[#35D07F] font-semibold">In 5-7 Business Days in Trunk</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-xl bg-dragonfruit text-white font-semibold text-xs tracking-wider uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] transition-all cursor-pointer"
            >
              Continue Exploring Collections
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
