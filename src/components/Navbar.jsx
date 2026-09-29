import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { CURRENCIES } from '../data/products';
import { brandConfig, contactConfig, commerceConfig } from '../config/boutiqueConfig';
import { smoothScrollTo } from '../utils/scrollUtils';
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
  Tag
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
    openFittingModal,
    openBookingsDrawer,
    navigateToCategory,
    selectedCategory,
    appliedPromo,
    applyPromo
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavSection, setActiveNavSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

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

    window.addEventListener('scroll', handleScroll);
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

  const handleMobileCategoryNav = (catName) => {
    navigateToCategory(catName);
    setActiveNavSection('collection');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      
      {/* FLOATING CURVED LUXURY BOUTIQUE NAVBAR (Curved at both ends: rounded-full) */}
      <div className="pt-2 sm:pt-3 lg:pt-4 pb-1 px-3 sm:px-5 lg:px-6 max-w-[1550px] mx-auto w-full">
        <nav
          className={`w-full rounded-full bg-[#1a0c2e]/95 backdrop-blur-2xl border border-cardBorder shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(58,37,85,0.4)] px-3 sm:px-5 lg:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-2 xl:gap-3 transition-all duration-300 hover:border-dragonfruit/50 ${
            isScrolled ? 'shadow-dragonfruit/15 border-dragonfruit/40 bg-[#160a28]/98' : ''
          }`}
        >
          
          {/* Left: Brand Logo & Tagline in Curved Capsule (Curved Start) */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-full bg-[#25143B]/70 hover:bg-[#281640] border border-[#3A2555]/60 hover:border-dragonfruit/60 transition-all duration-300 group cursor-pointer shrink-0 shadow-inner"
            title="Return to Home"
          >
            <div className="w-6 h-6 rounded-full bg-dragonfruit/20 border border-dragonfruit/80 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,42,141,0.5)] group-hover:scale-105 transition-transform">
              <Sparkles className="w-3 h-3 text-dragonfruit animate-pulse" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-fashion text-xs sm:text-sm xl:text-base font-bold tracking-[0.14em] text-mainHeading group-hover:text-dragonfruit transition-colors duration-300 leading-tight">
                {brandConfig.name}
              </span>
              <span className="text-[6.5px] sm:text-[7.5px] tracking-[0.24em] text-mutedLavender uppercase font-sans font-medium">
                {brandConfig.tagline}
              </span>
            </div>
          </button>

          {/* Center: Familiar, Recognized Boutique Navigation Links (Desktop lg+) */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[11px] xl:text-[12px] 2xl:text-[12.5px] font-semibold tracking-wide whitespace-nowrap">
            
            {/* Home */}
            <button
              onClick={scrollToTop}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                activeNavSection === 'home'
                  ? 'bg-dragonfruit/25 text-dragonfruit font-bold border border-dragonfruit/40 shadow-[0_0_10px_rgba(255,42,141,0.25)]'
                  : 'text-lightLavender hover:text-white hover:bg-dragonfruit/10'
              }`}
            >
              Home
            </button>

            {/* Dresses & Gowns */}
            <button
              onClick={() => navigateToCategory('Dresses & Gowns')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                selectedCategory === 'Dresses & Gowns' && activeNavSection === 'collection'
                  ? 'bg-dragonfruit/25 text-dragonfruit font-bold border border-dragonfruit/40 shadow-[0_0_10px_rgba(255,42,141,0.25)]'
                  : 'text-lightLavender hover:text-white hover:bg-dragonfruit/10'
              }`}
            >
              Dresses & Gowns
            </button>

            {/* Bridal & Sarees */}
            <button
              onClick={() => navigateToCategory('Bridal & Sarees')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                selectedCategory === 'Bridal & Sarees' && activeNavSection === 'collection'
                  ? 'bg-dragonfruit/25 text-dragonfruit font-bold border border-dragonfruit/40 shadow-[0_0_10px_rgba(255,42,141,0.25)]'
                  : 'text-lightLavender hover:text-white hover:bg-dragonfruit/10'
              }`}
            >
              Bridal & Sarees
            </button>

            {/* Blazers & Suits */}
            <button
              onClick={() => navigateToCategory('Blazers & Suits')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                selectedCategory === 'Blazers & Suits' && activeNavSection === 'collection'
                  ? 'bg-dragonfruit/25 text-dragonfruit font-bold border border-dragonfruit/40 shadow-[0_0_10px_rgba(255,42,141,0.25)]'
                  : 'text-lightLavender hover:text-white hover:bg-dragonfruit/10'
              }`}
            >
              Blazers & Suits
            </button>

            {/* Custom Tailoring */}
            <button
              onClick={() => scrollToSection('bespoke-studio', 'custom-tailoring')}
              className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                activeNavSection === 'custom-tailoring'
                  ? 'bg-dragonfruit/25 text-dragonfruit font-bold border border-dragonfruit/40 shadow-[0_0_10px_rgba(255,42,141,0.25)]'
                  : 'text-lightLavender hover:text-white hover:bg-dragonfruit/10'
              }`}
            >
              <Scissors className="w-2.5 h-2.5 text-dragonfruit shrink-0" />
              <span>Custom Tailoring</span>
            </button>

            {/* Lookbook */}
            <button
              onClick={() => scrollToSection('lookbook', 'lookbook')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                activeNavSection === 'lookbook'
                  ? 'bg-dragonfruit/25 text-dragonfruit font-bold border border-dragonfruit/40 shadow-[0_0_10px_rgba(255,42,141,0.25)]'
                  : 'text-lightLavender hover:text-white hover:bg-dragonfruit/10'
              }`}
            >
              Lookbook
            </button>

            {/* Our Story */}
            <button
              onClick={() => scrollToSection('atelier-story', 'our-story')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                activeNavSection === 'our-story'
                  ? 'bg-dragonfruit/25 text-dragonfruit font-bold border border-dragonfruit/40 shadow-[0_0_10px_rgba(255,42,141,0.25)]'
                  : 'text-lightLavender hover:text-white hover:bg-dragonfruit/10'
              }`}
            >
              Our Story
            </button>

            {/* Reviews */}
            <button
              onClick={() => scrollToSection('testimonials', 'reviews')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                activeNavSection === 'reviews'
                  ? 'bg-dragonfruit/25 text-dragonfruit font-bold border border-dragonfruit/40 shadow-[0_0_10px_rgba(255,42,141,0.25)]'
                  : 'text-lightLavender hover:text-white hover:bg-dragonfruit/10'
              }`}
            >
              Reviews
            </button>

            {/* Contact */}
            <button
              onClick={() => scrollToSection('salons', 'contact')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                activeNavSection === 'contact'
                  ? 'bg-dragonfruit/25 text-dragonfruit font-bold border border-dragonfruit/40 shadow-[0_0_10px_rgba(255,42,141,0.25)]'
                  : 'text-lightLavender hover:text-white hover:bg-dragonfruit/10'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Right: Actions, Currency, Appointments Badge, Drawers & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Currency Selector Pill */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-inputBg border border-inputBorder text-[10.5px] sm:text-[11px] text-lightLavender hover:border-dragonfruit transition-all cursor-pointer shadow-sm"
                title="Change Currency"
              >
                <Globe className="w-3 h-3 text-mutedLavender" />
                <span className="font-semibold">{currency}</span>
                <ChevronDown className="w-2.5 h-2.5 text-mutedLavender" />
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-cardBg border border-cardBorder rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95">
                  {Object.keys(CURRENCIES).map((currCode) => (
                    <button
                      key={currCode}
                      onClick={() => {
                        setCurrency(currCode);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        currency === currCode
                          ? 'bg-dragonfruit/20 text-dragonfruit font-bold'
                          : 'text-lightLavender hover:bg-[#FF4696] hover:text-[#1E1033]'
                      }`}
                    >
                      <span>{CURRENCIES[currCode].label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bookings / Appointments Trigger Circle (Visible with badge when appointments exist) */}
            <button
              onClick={() => openBookingsDrawer()}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all relative cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${
                bookingsCount > 0
                  ? 'bg-dragonfruit/20 border-dragonfruit text-dragonfruit shadow-[0_0_12px_rgba(255,42,141,0.4)]'
                  : 'bg-inputBg/80 border-inputBorder text-lightLavender hover:border-dragonfruit hover:text-dragonfruit'
              }`}
              title={bookingsCount > 0 ? `${bookingsCount} VIP Appointment(s) Confirmed` : 'View Appointments'}
            >
              <Calendar className="w-3.5 h-3.5" />
              {bookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-dragonfruit text-white text-[9px] font-bold flex items-center justify-center shadow-[0_0_8px_#FF2A8D] animate-pulse">
                  {bookingsCount}
                </span>
              )}
            </button>

            {/* Wishlist Trigger Circle */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="w-8 h-8 rounded-full bg-inputBg/80 border border-inputBorder text-lightLavender hover:border-dragonfruit hover:text-dragonfruit flex items-center justify-center transition-all relative cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              title="View Wishlist"
            >
              <Heart className="w-3.5 h-3.5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-dragonfruit text-white text-[9px] font-bold flex items-center justify-center shadow-[0_0_8px_#FF2A8D] animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger Circle */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-8 h-8 rounded-full bg-inputBg/80 border border-inputBorder text-lightLavender hover:border-dragonfruit hover:text-dragonfruit flex items-center justify-center transition-all relative cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              title="View Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-dragonfruit text-white text-[9px] font-bold flex items-center justify-center shadow-[0_0_8px_#FF2A8D]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Book Fitting Curved Pill Button (Desktop) with Booking Counter Badge */}
            <button
              onClick={() => (bookingsCount > 0 ? openBookingsDrawer() : openFittingModal())}
              className="hidden xl:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-dragonfruit text-white font-bold text-[11px] tracking-wider uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] hover:shadow-dragonfruit-lg transition-all duration-300 transform active:scale-95 cursor-pointer font-sans shrink-0 relative"
            >
              <Calendar className="w-3 h-3" />
              <span>{bookingsCount > 0 ? `Fitting (${bookingsCount})` : 'Book Fitting'}</span>
              {bookingsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#35D07F] shadow-[0_0_6px_#35D07F] animate-ping" />
              )}
            </button>

            {/* Mobile Hamburger Toggle Button (lg:hidden) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-full bg-dragonfruit/20 border border-dragonfruit/70 text-dragonfruit hover:bg-dragonfruit hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 ml-0.5 shrink-0"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </nav>

        {/* Mobile Luxury Navigation Drawer / Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-3xl bg-[#1c0d33]/98 backdrop-blur-2xl border border-cardBorder shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(58,37,85,0.6)] animate-in fade-in slide-in-from-top-4 duration-300 space-y-3.5">
            
            {/* Top drawer header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-cardBorder/60 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-dragonfruit shadow-[0_0_8px_#FF2A8D]" />
                <span className="font-fashion text-sm font-bold tracking-widest text-mainHeading uppercase">
                  {brandConfig.name} Atelier
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-mutedLavender hover:text-white text-xs px-2.5 py-1 rounded-full bg-inputBg border border-inputBorder cursor-pointer transition-colors"
              >
                Close ✕
              </button>
            </div>

            {/* Active Bookings Banner on Mobile (if any booked) */}
            {bookingsCount > 0 && (
              <div
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openBookingsDrawer();
                }}
                className="p-3 rounded-2xl bg-dragonfruit/15 border border-dragonfruit/50 flex items-center justify-between cursor-pointer hover:bg-dragonfruit/25 transition-all shadow-[0_0_15px_rgba(255,42,141,0.2)]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-dragonfruit text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {bookingsCount}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white leading-tight">Confirmed VIP Fitting</h5>
                    <p className="text-[10px] text-lightLavender/80">Tap to view appointment dossier</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-dragonfruit">
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            {/* Mobile VIP Coupon Banner */}
            <div className="p-3 rounded-2xl bg-[#281640] border border-dragonfruit/40 flex items-center justify-between gap-2 shadow-sm">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-dragonfruit shrink-0 animate-pulse" />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-mainHeading">
                    VIP Privilege: <span className="text-dragonfruit">{commerceConfig.promoDiscountPercent}% OFF</span>
                  </div>
                  <div className="text-[9.5px] text-mutedLavender">Code: {commerceConfig.promoCode}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => applyPromo(commerceConfig.promoCode)}
                className="px-2.5 py-1 rounded-lg bg-dragonfruit text-white text-[10px] font-bold font-mono uppercase hover:bg-[#FF4696] hover:text-[#1E1033] transition-colors cursor-pointer shrink-0"
              >
                {appliedPromo ? '✓ Applied' : 'Apply Code'}
              </button>
            </div>

            {/* Mobile navigation links list - Clean, harmonious, no pre-selected blocks */}
            <div className="grid grid-cols-1 gap-1">
              
              {/* Home */}
              <button
                onClick={scrollToTop}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-lightLavender hover:text-white hover:bg-cardBg transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-dragonfruit opacity-80 group-hover:opacity-100" />
                  <span>Home</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Dresses & Gowns */}
              <button
                onClick={() => handleMobileCategoryNav('Dresses & Gowns')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-lightLavender hover:text-white hover:bg-cardBg transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">👗</span>
                  <span>Dresses & Gowns</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Bridal & Sarees */}
              <button
                onClick={() => handleMobileCategoryNav('Bridal & Sarees')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-lightLavender hover:text-white hover:bg-cardBg transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Crown className="w-3.5 h-3.5 text-dragonfruit opacity-80 group-hover:opacity-100" />
                  <span>Bridal & Sarees</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Blazers & Suits */}
              <button
                onClick={() => handleMobileCategoryNav('Blazers & Suits')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-lightLavender hover:text-white hover:bg-cardBg transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">🧥</span>
                  <span>Blazers & Suits</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Custom Tailoring Studio */}
              <button
                onClick={() => scrollToSection('bespoke-studio', 'custom-tailoring')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-lightLavender hover:text-white hover:bg-cardBg transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Scissors className="w-3.5 h-3.5 text-dragonfruit opacity-80 group-hover:opacity-100" />
                  <span>Custom Tailoring Studio</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Lookbook */}
              <button
                onClick={() => scrollToSection('lookbook', 'lookbook')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-lightLavender hover:text-white hover:bg-cardBg transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-dragonfruit opacity-80 group-hover:opacity-100" />
                  <span>Paris Runway Lookbook</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Our Heritage Story */}
              <button
                onClick={() => scrollToSection('atelier-story', 'our-story')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-lightLavender hover:text-white hover:bg-cardBg transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-3.5 h-3.5 text-dragonfruit opacity-80 group-hover:opacity-100" />
                  <span>Our Heritage Story</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Reviews */}
              <button
                onClick={() => scrollToSection('testimonials', 'reviews')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-lightLavender hover:text-white hover:bg-cardBg transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Star className="w-3.5 h-3.5 text-dragonfruit opacity-80 group-hover:opacity-100" />
                  <span>VIP Client Reviews</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Contact */}
              <button
                onClick={() => scrollToSection('salons', 'contact')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-lightLavender hover:text-white hover:bg-cardBg transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-dragonfruit opacity-80 group-hover:opacity-100" />
                  <span>Contact & Salons</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>

            {/* Mobile Actions: Book Fitting & View Appointments */}
            <div className="pt-1 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openFittingModal();
                }}
                className="w-full py-3 rounded-xl bg-dragonfruit text-white font-bold text-xs uppercase tracking-wider shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Private Video Fitting</span>
              </button>

              {bookingsCount > 0 && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openBookingsDrawer();
                  }}
                  className="w-full py-2.5 rounded-xl bg-inputBg border border-inputBorder text-lightLavender hover:border-dragonfruit hover:text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#35D07F]" />
                  <span>View Confirmed Appointments ({bookingsCount})</span>
                </button>
              )}
            </div>

            {/* Quick Contact Desk Footer */}
            <div className="pt-2 text-[10.5px] text-mutedLavender flex items-center justify-between px-1 border-t border-cardBorder/50">
              <span>VIP Desk: {contactConfig.phone}</span>
              <span className="text-dragonfruit font-medium">Paris • London • Mumbai</span>
            </div>

          </div>
        )}

      </div>

    </header>
  );
};
