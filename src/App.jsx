import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductGrid } from './components/ProductGrid';
import { BespokeStudio } from './components/BespokeStudio';
import { LookbookSection } from './components/LookbookSection';
import { AtelierStory } from './components/AtelierStory';
import { TestimonialsSection } from './components/TestimonialsSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';

// Modals, Drawers & Feedback
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { BookingsDrawer } from './components/BookingsDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { FittingModal } from './components/FittingModal';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { VIPStylistButton } from './components/VIPStylistButton';
import { Toast } from './components/Toast';

function BoutiqueApp() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Initialize Ultra-Smooth Lenis Momentum Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2.0,
      infinite: false,
    });

    window.lenis = lenis;

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-nightViolet text-lightLavender font-sans selection:bg-dragonfruit selection:text-white relative">
      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Luxury Experience */}
      <main>
        {/* Editorial Hero Section */}
        <HeroSection />

        {/* Curated Category Showcase Tiles */}
        <CategoryShowcase />

        {/* Haute Couture Product Catalog & Filters */}
        <ProductGrid />

        {/* Private Atelier Bespoke Studio & Tailoring Customizer */}
        <BespokeStudio />

        {/* Editorial Runway Lookbook with Interactive Hotspots */}
        <LookbookSection />

        {/* Heritage Atelier Story & Craftsmanship Pillars */}
        <AtelierStory />

        {/* VIP Client Reviews & Press Accolades */}
        <TestimonialsSection />

        {/* Private Salon Newsletter & Privilege Access */}
        <NewsletterSection />
      </main>

      {/* Luxury Boutique Directory Footer */}
      <Footer />

      {/* Interactive Drawers, Modals & Concierge */}
      <CartDrawer />
      <WishlistDrawer />
      <BookingsDrawer />
      <QuickViewModal />
      <FittingModal />
      <SearchModal />
      <CheckoutModal />
      <VIPStylistButton />

      {/* Toast Notification System */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <BoutiqueApp />
    </ShopProvider>
  );
}
