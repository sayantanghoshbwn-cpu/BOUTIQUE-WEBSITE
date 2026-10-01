import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { CURRENCIES } from '../data/products';
import { brandConfig, contactConfig, commerceConfig } from '../config/boutiqueConfig';
import { smoothScrollTo } from '../utils/scrollUtils';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  Heart,
  Calendar,
  Sparkles,
  ChevronDown,
  Globe,
  Scissors,
  Menu,
  X,
  Phone,
  ArrowRight,
  Crown,
  BookOpen,
  Star,
  MapPin,
  CheckCircle2,
  Tag,
  Search,
  Grid,
  Check,
  PhoneCall,
  Home,
  Copy
} from 'lucide-react';

export const Navbar = () => {
  const {
    cartCount,
    wishlistCount,
    bookingsCount,
    currency,
    setCurrency,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    openFittingModal,
    openBookingsDrawer,
    navigateToCategory,
    selectedCategory,
    appliedPromo,
    applyPromo,
    copyAndApplyCoupon,
    removePromo,
    cartTotalUSD,
    formatPrice
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isCollectionsDropdownOpen, setIsCollectionsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavSection, setActiveNavSection] = useState('home');
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const collectionsRef = useRef(null);
  const currencyRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (collectionsRef.current && !collectionsRef.current.contains(event.target)) {
        setIsCollectionsDropdownOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setIsCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 250;
      const sections = [
        { id: 'hero', name: 'home' },
        { id: 'collection', name: 'collection' },
        { id: 'bespoke-studio', name: 'custom-tailoring' },
        { id: 'lookbook', name: 'lookbook' },
        { id: 'atelier-story', name: 'our-story' },
        { id: 'testimonials', name: 'reviews' },
        { id: 'salons', name: 'contact' }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveNavSection(sections[i].name);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    smoothScrollTo(0);
    setActiveNavSection('home');
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (id, sectionName) => {
    smoothScrollTo(id, -85);
    setActiveNavSection(sectionName);
    setIsMobileMenuOpen(false);
  };

  const handleCategoryNav = (catName) => {
    navigateToCategory(catName);
    setActiveNavSection('collection');
    setIsCollectionsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleTopCouponApply = () => {
    copyAndApplyCoupon();
    setCopiedCoupon(true);
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.15 },
        colors: ['#FF2A8D', '#FF4696', '#35D07F', '#FFFFFF']
      });
    } catch {}
    setTimeout(() => setCopiedCoupon(false), 3500);
  };

  const categoryOptions = [
    { id: 'all', label: 'All Masterpieces', emoji: '✨', desc: 'Full haute couture archive' },
    { id: 'Dresses & Gowns', label: 'Dresses & Gowns', emoji: '👗', desc: 'Sculpted corsets & silks' },
    { id: 'Bridal & Sarees', label: 'Bridal & Sarees', emoji: '👑', desc: 'Hand Zardozi & pure silk' },
    { id: 'Blazers & Suits', label: 'Blazers & Suits', emoji: '🧥', desc: 'Tailored velvet jackets' },
    { id: 'Accessories', label: 'Artisanal Clutches', emoji: '👝', desc: 'Jewel encrusted brass' }
  ];

  const atelierMenuOptions = [
    {
      id: 'custom-tailoring',
      target: 'bespoke-studio',
      label: 'Custom Tailoring Studio',
      icon: Scissors,
      desc: '3D Virtual & in-person fittings'
    },
    {
      id: 'lookbook',
      target: 'lookbook',
      label: 'Paris Runway Lookbook 2026',
      icon: Sparkles,
      desc: 'Interactive hotspots & editorial'
    },
    {
      id: 'our-story',
      target: 'atelier-story',
      label: 'Our Heritage Story',
      icon: BookOpen,
      desc: 'Centuries of French craftsmanship'
    },
    {
      id: 'reviews',
      target: 'testimonials',
      label: 'VIP Client Reviews',
      icon: Star,
      desc: '4.9★ Global patron accolades'
    },
    {
      id: 'contact',
      target: 'salons',
      label: 'Private Salons & Concierge',
      icon: MapPin,
      desc: 'Paris • London • Mumbai • Kolkata'
    }
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full transition-all duration-300">
        
        {/* TOP VIP ANNOUNCEMENT & PROMO TICKER */}
        <div className="w-full bg-[#160a28]/95 border-b border-cardBorder/60 py-1 px-3 text-center transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[10.5px] sm:text-xs">
            <div className="flex items-center gap-1.5 text-mutedLavender truncate mx-auto sm:mx-0">
              <Sparkles className="w-3 h-3 text-dragonfruit animate-pulse shrink-0" />
              <span className="text-lightLavender font-medium">VIP Privilege:</span>
              <span>Use code</span>
              <span className="font-mono font-bold text-dragonfruit bg-inputBg px-1.5 py-0.5 rounded border border-inputBorder">
                {commerceConfig.promoCode}
              </span>
              <span>for {commerceConfig.promoDiscountPercent}% OFF</span>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={handleTopCouponApply}
                className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  appliedPromo === commerceConfig.promoCode || copiedCoupon
                    ? 'bg-[#35D07F] text-[#120824] shadow-sm'
                    : 'bg-dragonfruit/20 text-dragonfruit border border-dragonfruit/60 hover:bg-dragonfruit hover:text-white'
                }`}
              >
                {appliedPromo === commerceConfig.promoCode || copiedCoupon ? (
                  <>
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>25% Applied ✓</span>
                  </>
                ) : (
                  <>
                    <Tag className="w-3 h-3" />
                    <span>Apply 25% Off</span>
                  </>
                )}
              </button>

              <span className="text-mutedLavender/40">|</span>
              <a
                href={`tel:${contactConfig.phone}`}
                className="text-mutedLavender hover:text-dragonfruit transition-colors flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-dragonfruit" />
                <span>Concierge Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* FLOATING CURVED LUXURY BOUTIQUE NAVBAR */}
        <div className="pt-2 sm:pt-2.5 lg:pt-3 pb-1 px-2 sm:px-4 lg:px-6 max-w-[1550px] mx-auto w-full">
          <nav
            className={`w-full rounded-2xl lg:rounded-full bg-[#1a0c2e]/95 backdrop-blur-2xl border border-cardBorder shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(58,37,85,0.4)] px-2.5 sm:px-3.5 lg:px-5 py-2 transition-all duration-300 hover:border-dragonfruit/50 ${
              isScrolled ? 'shadow-dragonfruit/20 border-dragonfruit/40 bg-[#160a28]/98' : ''
            }`}
          >
            
            {/* ========================================================================= */}
            {/* 1. MOBILE NAVBAR (lg:hidden) - BEAUTIFULLY CENTERED & SYMMETRICAL          */}
            {/* ========================================================================= */}
            <div className="lg:hidden flex items-center justify-between w-full">
              
              {/* Mobile Left: Menu Toggle */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-8.5 h-8.5 rounded-xl bg-inputBg/80 border border-inputBorder text-lightLavender hover:border-dragonfruit hover:text-dragonfruit flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>

              {/* Mobile Center (Majhkhane): Brand Logo & Title */}
              <button
                onClick={scrollToTop}
                className="flex flex-col items-center justify-center text-center px-1.5 py-0.5 group cursor-pointer transition-transform active:scale-95 max-w-[220px]"
                title="Return to Home"
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-dragonfruit/20 border border-dragonfruit/60 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Sparkles className="w-2.5 h-2.5 text-dragonfruit animate-pulse" />
                  </div>
                  <span className="font-fashion text-xs sm:text-sm font-bold tracking-[0.14em] sm:tracking-[0.16em] text-mainHeading group-hover:text-dragonfruit transition-colors duration-300 leading-tight">
                    {brandConfig.name}
                  </span>
                </div>
                <span className="text-[6.5px] sm:text-[7.5px] tracking-[0.22em] text-mutedLavender uppercase font-sans font-medium mt-0.5">
                  {brandConfig.tagline}
                </span>
              </button>

              {/* Mobile Right: Search Trigger */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="w-8.5 h-8.5 rounded-xl bg-inputBg/80 border border-inputBorder text-lightLavender hover:border-dragonfruit hover:text-dragonfruit flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Search Collection"
                  aria-label="Search"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* ========================================================================= */}
            {/* 2. DESKTOP & LAPTOP NAVBAR (hidden lg:flex) - SLEEK, SPACIOUS & NO OVERFLOW */}
            {/* ========================================================================= */}
            <div className="hidden lg:flex items-center justify-between w-full gap-2 lg:gap-3">
              
              {/* Left: Brand Logo Capsule */}
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-[#25143B]/80 hover:bg-[#281640] border border-[#3A2555]/70 hover:border-dragonfruit/60 transition-all duration-300 group cursor-pointer shrink-0 shadow-inner"
                title="Return to Home"
              >
                <div className="w-6 h-6 rounded-full bg-dragonfruit/20 border border-dragonfruit/60 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Sparkles className="w-3 h-3 text-dragonfruit animate-pulse" />
                </div>
                <div className="flex flex-col text-left truncate">
                  <span className="font-fashion text-xs xl:text-[14.5px] 2xl:text-base font-bold tracking-[0.14em] text-mainHeading group-hover:text-dragonfruit transition-colors duration-300 leading-tight">
                    {brandConfig.name}
                  </span>
                  <span className="text-[6.5px] xl:text-[7.5px] tracking-[0.24em] text-mutedLavender uppercase font-sans font-medium">
                    {brandConfig.tagline}
                  </span>
                </div>
              </button>

              {/* Center: Desktop Navigation Links */}
              <div className="flex items-center gap-0.5 xl:gap-1 text-[11px] xl:text-[12px] 2xl:text-[12.5px] font-semibold tracking-wide whitespace-nowrap">
                
                {/* 1. Home */}
                <button
                  onClick={scrollToTop}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    activeNavSection === 'home'
                      ? 'bg-dragonfruit/25 text-dragonfruit font-bold border border-dragonfruit/40 shadow-sm'
                      : 'text-lightLavender hover:text-white hover:bg-dragonfruit/10'
                  }`}
                >
                  Home
                </button>

                {/* 2. Collections Dropdown Pill */}
                <div
                  className="relative group/dropdown"
                  ref={collectionsRef}
                  onMouseEnter={() => setIsCollectionsDropdownOpen(true)}
                  onMouseLeave={() => setIsCollectionsDropdownOpen(false)}
                >
                  <button
                    onClick={() => setIsCollectionsDropdownOpen(!isCollectionsDropdownOpen)}
                    className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeNavSection === 'collection' || isCollectionsDropdownOpen
                        ? 'bg-dragonfruit text-white font-bold shadow-md shadow-dragonfruit/30'
                        : 'text-lightLavender hover:text-white hover:bg-dragonfruit/10'
                    }`}
                  >
                    <span>Collections</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCollectionsDropdownOpen ? 'rotate-180 text-white' : 'text-mutedLavender'}`} />
                  </button>

                  {/* Luxury Solid High-Contrast Dropdown Menu */}
                  {isCollectionsDropdownOpen && (
                    <div
                      className="absolute top-full left-0 pt-2 z-[100]"
                      onMouseEnter={() => setIsCollectionsDropdownOpen(true)}
                    >
                      <div className="w-88 sm:w-96 rounded-2xl bg-[#110522] border-2 border-[#FF2A8D]/50 shadow-[0_25px_70px_rgba(0,0,0,0.98),0_0_35px_rgba(255,42,141,0.35)] p-3 space-y-2 animate-in fade-in zoom-in-95 duration-200">
                        {/* Dropdown Header */}
                        <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#1C0D36] border border-[#3A2555] mb-1">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-dragonfruit animate-pulse" />
                            <span className="text-[10.5px] font-bold tracking-[0.22em] uppercase text-dragonfruit">
                              Haute Couture Archives
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-white bg-[#110522] px-2.5 py-0.5 rounded-full border border-cardBorder">
                            5 Curations
                          </span>
                        </div>

                        {/* Dropdown Category Cards */}
                        {categoryOptions.map((cat) => {
                          const isSelected = selectedCategory === cat.id && activeNavSection === 'collection';
                          return (
                            <button
                              key={cat.id}
                              onClick={() => handleCategoryNav(cat.id)}
                              className={`w-full text-left p-2.5 sm:p-3 rounded-xl text-xs transition-all duration-200 flex items-center justify-between cursor-pointer group border ${
                                isSelected
                                  ? 'bg-dragonfruit text-white border-dragonfruit shadow-lg shadow-dragonfruit/40 scale-[1.01]'
                                  : 'bg-[#1C0D36] hover:bg-[#FF2A8D] border-[#3A2555] hover:border-[#FF2A8D] text-white hover:text-white hover:shadow-md hover:shadow-dragonfruit/20'
                              }`}
                            >
                              <div className="flex items-center gap-3.5 min-w-0">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-inner transition-colors ${
                                  isSelected
                                    ? 'bg-white/20 text-white'
                                    : 'bg-[#110522] border border-[#3A2555] group-hover:bg-white/20 group-hover:border-white/30'
                                }`}>
                                  {cat.emoji}
                                </div>
                                <div className="min-w-0">
                                  <span className="block font-fashion font-bold text-sm sm:text-[14.5px] leading-tight text-white group-hover:text-white transition-colors truncate">
                                    {cat.label}
                                  </span>
                                  <span className={`block text-[11px] font-normal mt-0.5 transition-colors truncate ${
                                    isSelected ? 'text-white/90' : 'text-[#D3C6F0] group-hover:text-white/90'
                                  }`}>
                                    {cat.desc}
                                  </span>
                                </div>
                              </div>
                              <ArrowRight className={`w-4 h-4 shrink-0 transition-transform duration-200 ml-2 ${
                                isSelected
                                  ? 'text-white translate-x-1'
                                  : 'text-dragonfruit group-hover:text-white opacity-80 group-hover:opacity-100 group-hover:translate-x-1.5'
                              }`} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Custom Tailoring */}
                <button
                  onClick={() => scrollToSection('bespoke-studio', 'custom-tailoring')}
                  className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                    activeNavSection === 'custom-tailoring'
                      ? 'bg-dragonfruit/25 text-dragonfruit font-bold border border-dragonfruit/40 shadow-sm'
                      : 'text-lightLavender hover:text-white hover:bg-dragonfruit/10'
                  }`}
                >
                  <Scissors className="w-2.5 h-2.5 text-dragonfruit shrink-0" />
                  <span className="hidden xl:inline">Custom Tailoring</span>
                  <span className="xl:hidden">Bespoke</span>
                </button>

                {/* 4. Lookbook */}
                <button
                  onClick={() => scrollToSection('lookbook', 'lookbook')}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    activeNavSection === 'lookbook'
                      ? 'bg-dragonfruit/25 text-dragonfruit font-bold border border-dragonfruit/40 shadow-sm'
                      : 'text-lightLavender hover:text-white hover:bg-dragonfruit/10'
                  }`}
                >
                  Lookbook
                </button>

                {/* 5. Our Story */}
                <button
                  onClick={() => scrollToSection('atelier-story', 'our-story')}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    activeNavSection === 'our-story'
                      ? 'bg-dragonfruit/25 text-dragonfruit font-bold border border-dragonfruit/40 shadow-sm'
                      : 'text-lightLavender hover:text-white hover:bg-dragonfruit/10'
                  }`}
                >
                  <span className="hidden xl:inline">Our Story</span>
                  <span className="xl:hidden">Story</span>
                </button>

                {/* 6. Reviews */}
                <button
                  onClick={() => scrollToSection('testimonials', 'reviews')}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    activeNavSection === 'reviews'
                      ? 'bg-dragonfruit/25 text-dragonfruit font-bold border border-dragonfruit/40 shadow-sm'
                      : 'text-lightLavender hover:text-white hover:bg-dragonfruit/10'
                  }`}
                >
                  Reviews
                </button>

                {/* 7. Contact */}
                <button
                  onClick={() => scrollToSection('salons', 'contact')}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    activeNavSection === 'contact'
                      ? 'bg-dragonfruit/25 text-dragonfruit font-bold border border-dragonfruit/40 shadow-sm'
                      : 'text-lightLavender hover:text-white hover:bg-dragonfruit/10'
                  }`}
                >
                  Contact
                </button>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-1.5 lg:gap-2 shrink-0">
                
                {/* Search Trigger */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-inputBg/80 border border-inputBorder text-lightLavender hover:border-dragonfruit hover:text-dragonfruit flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 shrink-0"
                  title="Search Collection"
                  aria-label="Search"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>

                {/* Currency Selector */}
                <div className="relative hidden md:block" ref={currencyRef}>
                  <button
                    onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-inputBg border border-inputBorder text-[11px] sm:text-xs text-lightLavender hover:border-dragonfruit transition-all cursor-pointer shadow-sm hover:scale-105"
                    title="Change Active Currency"
                  >
                    <Globe className="w-3.5 h-3.5 text-dragonfruit" />
                    <span className="font-bold text-white tracking-wide">
                      {CURRENCIES[currency]?.symbol || '₹'} {currency}
                    </span>
                    <ChevronDown className={`w-3 h-3 text-mutedLavender transition-transform duration-200 ${isCurrencyDropdownOpen ? 'rotate-180 text-dragonfruit' : ''}`} />
                  </button>

                  {isCurrencyDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-44 bg-[#120624] border-2 border-[#3A2555] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_20px_rgba(255,42,141,0.2)] p-2 z-[100] animate-in fade-in zoom-in-95 duration-200 space-y-1">
                      <div className="px-2.5 py-1 text-[9.5px] font-bold tracking-[0.2em] uppercase text-dragonfruit border-b border-[#3A2555]/80 mb-1 flex items-center justify-between">
                        <span>Select Currency</span>
                        <span className="text-[8.5px] text-mutedLavender">Default: INR</span>
                      </div>
                      {Object.keys(CURRENCIES).map((currCode) => {
                        const curr = CURRENCIES[currCode];
                        const isCurrent = currency === currCode;
                        return (
                          <button
                            key={currCode}
                            onClick={() => {
                              setCurrency(currCode);
                              setIsCurrencyDropdownOpen(false);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer border ${
                              isCurrent
                                ? 'bg-dragonfruit text-white font-bold border-dragonfruit shadow-sm'
                                : 'bg-[#1D0E38] hover:bg-[#2A154F] border-transparent text-white hover:text-dragonfruit'
                            }`}
                          >
                            <span className="font-semibold">{curr.label}</span>
                            <span className="text-[11px] font-bold opacity-90">{curr.symbol}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Bookings Trigger */}
                <button
                  onClick={() => openBookingsDrawer()}
                  className={`hidden md:flex w-7 h-7 sm:w-8 sm:h-8 rounded-full border items-center justify-center transition-all relative cursor-pointer shadow-sm hover:scale-105 active:scale-95 shrink-0 ${
                    bookingsCount > 0
                      ? 'bg-dragonfruit/20 border-dragonfruit text-dragonfruit shadow-sm'
                      : 'bg-inputBg/80 border-inputBorder text-lightLavender hover:border-dragonfruit hover:text-dragonfruit'
                  }`}
                  title={bookingsCount > 0 ? `${bookingsCount} VIP Appointment(s) Confirmed` : 'View Appointments'}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  {bookingsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-dragonfruit text-white text-[9px] font-bold flex items-center justify-center shadow-sm animate-pulse">
                      {bookingsCount}
                    </span>
                  )}
                </button>

                {/* Wishlist Trigger */}
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-inputBg/80 border border-inputBorder text-lightLavender hover:border-dragonfruit hover:text-dragonfruit flex items-center justify-center transition-all relative cursor-pointer shadow-sm hover:scale-105 active:scale-95 shrink-0"
                  title="View Wishlist"
                  aria-label="Wishlist"
                >
                  <Heart className="w-3.5 h-3.5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-dragonfruit text-white text-[8.5px] sm:text-[9px] font-bold flex items-center justify-center shadow-sm animate-bounce">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Shopping Bag Trigger */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-inputBg/80 border border-inputBorder text-lightLavender hover:border-dragonfruit hover:text-dragonfruit flex items-center justify-center transition-all relative cursor-pointer shadow-sm hover:scale-105 active:scale-95 shrink-0"
                  title="View Shopping Bag"
                  aria-label="Shopping Bag"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-dragonfruit text-white text-[8.5px] sm:text-[9px] font-bold flex items-center justify-center shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Book Fitting Pill Button */}
                <button
                  onClick={() => (bookingsCount > 0 ? openBookingsDrawer() : openFittingModal())}
                  className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dragonfruit text-white font-bold text-[10.5px] xl:text-[11px] tracking-wider uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] hover:shadow-dragonfruit-lg transition-all duration-300 transform active:scale-95 cursor-pointer font-sans shrink-0 relative ml-0.5"
                  title="Book VIP Fitting"
                >
                  <Calendar className="w-3 h-3" />
                  <span>{bookingsCount > 0 ? `Fitting (${bookingsCount})` : 'Book Fitting'}</span>
                  {bookingsCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-[#35D07F] shadow-sm animate-ping" />
                  )}
                </button>

              </div>

            </div>

          </nav>
        </div>

      </header>

      {/* FULL-SCREEN SLIDE-IN LUXURY MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden flex justify-end animate-in fade-in duration-300">
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-nightViolet/80 backdrop-blur-md transition-opacity cursor-pointer"
          />

          {/* Drawer Content Panel */}
          <div className="relative w-full sm:max-w-sm md:max-w-md bg-[#160a28]/98 backdrop-blur-3xl border-l border-cardBorder h-[100dvh] flex flex-col justify-between shadow-2xl z-10 overflow-hidden">
            
            {/* 1. Drawer Header */}
            <div className="px-4 py-3.5 sm:px-5 sm:py-4 border-b border-cardBorder/70 flex items-center justify-between shrink-0 bg-[#1e0e37]/70">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-dragonfruit/20 border border-dragonfruit/60 flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-dragonfruit animate-pulse" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-fashion text-sm sm:text-base font-bold tracking-widest text-mainHeading uppercase leading-tight truncate">
                    {brandConfig.name}
                  </h3>
                  <span className="text-[7.5px] sm:text-[8px] tracking-[0.2em] text-mutedLavender uppercase font-sans block truncate">
                    Haute Couture Atelier
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-inputBg border border-inputBorder text-mutedLavender hover:text-white hover:border-dragonfruit flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 2. Scrollable Body Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4 pb-6 no-scrollbar">
              
              {/* VIP Promo Banner Inside Drawer */}
              <div className="p-3 rounded-2xl bg-[#1C0D36] border border-[#3A2555] flex items-center justify-between gap-2 shadow-md">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#120624] border border-[#3A2555] flex items-center justify-center text-dragonfruit shrink-0">
                    <Crown className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9.5px] uppercase font-bold text-dragonfruit tracking-wider block">VIP Privilege Code</span>
                    <span className="font-mono font-bold text-xs text-white truncate block">
                      {commerceConfig.promoCode} • {commerceConfig.promoDiscountPercent}% OFF
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleTopCouponApply}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
                    appliedPromo === commerceConfig.promoCode || copiedCoupon
                      ? 'bg-[#35D07F] text-[#120824] shadow-sm'
                      : 'bg-dragonfruit text-white shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033]'
                  }`}
                >
                  {appliedPromo === commerceConfig.promoCode || copiedCoupon ? 'Applied ✓' : 'Apply'}
                </button>
              </div>

              {/* Currency Selector & Confirmed Bookings Pill Row */}
              <div className="grid grid-cols-2 gap-2">
                {/* Currency Switcher */}
                <div className="p-2 sm:p-2.5 rounded-2xl bg-[#1C0D36] border border-[#3A2555] flex items-center justify-between min-w-0">
                  <div className="flex items-center gap-1.5 text-xs text-[#D3C6F0] shrink-0">
                    <div className="w-6 h-6 rounded-lg bg-[#120624] border border-[#3A2555] flex items-center justify-center text-dragonfruit">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-white text-[11px]">{CURRENCIES[currency]?.symbol || '₹'} {currency}</span>
                  </div>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-[#120624] text-white text-[10.5px] font-semibold focus:outline-none cursor-pointer text-right min-w-0 px-2 py-1 rounded-lg border border-[#3A2555]"
                  >
                    {Object.keys(CURRENCIES).map((c) => (
                      <option key={c} value={c} className="bg-[#120624] text-white">
                        {CURRENCIES[c].label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* VIP Appointments Status Pill */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (bookingsCount > 0) openBookingsDrawer();
                    else openFittingModal();
                  }}
                  className={`p-2 sm:p-2.5 rounded-2xl border flex items-center justify-between text-[11px] cursor-pointer transition-all min-w-0 ${
                    bookingsCount > 0
                      ? 'bg-dragonfruit/20 border-dragonfruit text-dragonfruit shadow-sm'
                      : 'bg-[#1C0D36] border-[#3A2555] text-white hover:border-dragonfruit'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0 truncate">
                    <div className="w-6 h-6 rounded-lg bg-[#120624] border border-[#3A2555] flex items-center justify-center text-dragonfruit shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold truncate text-[11px]">
                      {bookingsCount > 0 ? `Bookings (${bookingsCount})` : 'Book Fitting'}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1 opacity-60 text-dragonfruit" />
                </button>
              </div>

              {/* 1. Category Showcase Section */}
              <div className="space-y-2">
                <span className="text-[10.5px] uppercase tracking-[0.2em] font-bold text-dragonfruit px-1 block mb-1">
                  Haute Couture Collections
                </span>

                {categoryOptions.map((cat) => {
                  const isSelected = selectedCategory === cat.id && activeNavSection === 'collection';
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryNav(cat.id)}
                      className={`w-full text-left p-2.5 sm:p-3 rounded-2xl text-xs font-medium transition-all duration-200 flex items-center justify-between cursor-pointer border ${
                        isSelected
                          ? 'bg-dragonfruit text-white border-dragonfruit shadow-md shadow-dragonfruit/30'
                          : 'bg-[#1C0D36] hover:bg-[#281448] border-[#3A2555] text-white hover:border-dragonfruit/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 shadow-inner ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#120624] border border-[#3A2555]'
                        }`}>
                          {cat.emoji}
                        </div>
                        <div className="min-w-0">
                          <span className="block font-fashion font-bold text-sm text-white truncate">
                            {cat.label}
                          </span>
                          <span className={`block text-[10.5px] mt-0.5 truncate ${
                            isSelected ? 'text-white/90' : 'text-[#D3C6F0]'
                          }`}>
                            {cat.desc}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-white' : 'text-dragonfruit opacity-80'
                      }`} />
                    </button>
                  );
                })}
              </div>

              {/* 2. Atelier Experience & Navigation Section */}
              <div className="space-y-2 pt-2 border-t border-[#3A2555]/60">
                <span className="text-[10.5px] uppercase tracking-[0.2em] font-bold text-dragonfruit px-1 block mb-1">
                  Atelier Experience & Salons
                </span>

                {atelierMenuOptions.map((item) => {
                  const IconComponent = item.icon;
                  const isSelected = activeNavSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.target, item.id)}
                      className={`w-full text-left p-2.5 sm:p-3 rounded-2xl text-xs font-medium transition-all duration-200 flex items-center justify-between cursor-pointer border ${
                        isSelected
                          ? 'bg-dragonfruit text-white border-dragonfruit shadow-md shadow-dragonfruit/30'
                          : 'bg-[#1C0D36] hover:bg-[#281448] border-[#3A2555] text-white hover:border-dragonfruit/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#120624] border border-[#3A2555] text-dragonfruit'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block font-fashion font-bold text-sm text-white truncate">
                            {item.label}
                          </span>
                          <span className={`block text-[10.5px] mt-0.5 truncate ${
                            isSelected ? 'text-white/90' : 'text-[#D3C6F0]'
                          }`}>
                            {item.desc}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-white' : 'text-dragonfruit opacity-80'
                      }`} />
                    </button>
                  );
                })}
              </div>

            </div>

            {/* 3. Drawer Bottom Action Buttons & Concierge */}
            <div className="p-4 sm:p-5 border-t border-[#3A2555] bg-[#120624] space-y-2 shrink-0">
              
              {/* Primary Video Fitting CTA */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openFittingModal();
                }}
                className="w-full py-3 rounded-2xl bg-dragonfruit text-white font-bold text-xs uppercase tracking-wider shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Private Video Fitting</span>
              </button>

              {/* View Shopping Bag CTA */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-2.5 rounded-2xl bg-[#1C0D36] border border-[#3A2555] text-white hover:border-dragonfruit hover:text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-dragonfruit" />
                <span>View Shopping Bag ({cartCount})</span>
              </button>

              {/* Concierge Desk */}
              <div className="pt-1.5 text-[10px] sm:text-[10.5px] text-mutedLavender flex items-center justify-between gap-1">
                <a
                  href={`tel:${contactConfig.phone}`}
                  className="flex items-center gap-1.5 hover:text-dragonfruit transition-colors truncate"
                >
                  <Phone className="w-3 h-3 text-dragonfruit shrink-0" />
                  <span className="truncate">VIP: {contactConfig.phone}</span>
                </a>
                <span className="text-dragonfruit font-medium shrink-0">Paris • London • Mumbai</span>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MOBILE FULL-WIDTH LUXURY APP TAB BAR (Native App Look, Edge-to-Edge, Safe-Area aware) */}
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#130725]/96 backdrop-blur-2xl border-t border-cardBorder/80 shadow-[0_-10px_35px_rgba(0,0,0,0.85)] px-2 sm:px-6 pt-2 pb-[max(0.65rem,env(safe-area-inset-bottom))] flex items-center justify-around transition-all"
        aria-label="Mobile Navigation"
      >
        {/* 1. Home */}
        <button
          onClick={scrollToTop}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer relative active:scale-90 ${
            activeNavSection === 'home'
              ? 'text-dragonfruit font-bold'
              : 'text-mutedLavender hover:text-white'
          }`}
          title="Home"
        >
          <Home className="w-4 h-4" />
          <span className="text-[9.5px] mt-0.5 tracking-tight font-medium">Home</span>
          {activeNavSection === 'home' && (
            <span className="w-1.5 h-1.5 rounded-full bg-dragonfruit absolute -bottom-0.5 shadow-sm shadow-dragonfruit" />
          )}
        </button>

        {/* 2. Collection */}
        <button
          onClick={() => {
            smoothScrollTo('collection', -85);
            setActiveNavSection('collection');
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer relative active:scale-90 ${
            activeNavSection === 'collection'
              ? 'text-dragonfruit font-bold'
              : 'text-mutedLavender hover:text-white'
          }`}
          title="Collection"
        >
          <Grid className="w-4 h-4" />
          <span className="text-[9.5px] mt-0.5 tracking-tight font-medium">Catalog</span>
          {activeNavSection === 'collection' && (
            <span className="w-1.5 h-1.5 rounded-full bg-dragonfruit absolute -bottom-0.5 shadow-sm shadow-dragonfruit" />
          )}
        </button>

        {/* 3. Bespoke Studio (Center Elevated Action Button) */}
        <button
          onClick={() => {
            smoothScrollTo('bespoke-studio', -85);
            setActiveNavSection('custom-tailoring');
          }}
          className="flex flex-col items-center justify-center -mt-5 group cursor-pointer active:scale-90 transition-transform"
          title="Custom Tailoring Studio"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D81B60] via-[#FF2A8D] to-[#FF4696] text-white flex items-center justify-center shadow-lg shadow-dragonfruit/40 border-2 border-[#130725] group-hover:scale-105 transition-all">
            <Scissors className="w-5 h-5" />
          </div>
          <span className="text-[9.5px] font-bold text-white mt-0.5 tracking-tight">Bespoke</span>
        </button>

        {/* 4. Wishlist */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer text-mutedLavender hover:text-white relative active:scale-90"
          title="Wishlist"
        >
          <div className="relative">
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-dragonfruit text-white text-[8px] font-bold flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[9.5px] mt-0.5 tracking-tight font-medium">Wishlist</span>
        </button>

        {/* 5. Bag */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer text-mutedLavender hover:text-white relative active:scale-90"
          title="Shopping Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-dragonfruit text-white text-[8px] font-bold flex items-center justify-center shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[9.5px] mt-0.5 tracking-tight font-medium">Bag</span>
        </button>
      </nav>
    </>
  );
};
