import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const CategoryShowcase = () => {
  const { navigateToCategory } = useShop();

  const categories = [
    {
      id: 'Dresses & Gowns',
      title: 'Dresses & Gowns',
      subtitle: 'Sculpted corsets, sweeping trains & 40 momme silks',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      badge: 'Best Selling',
      count: '3 Outfits'
    },
    {
      id: 'Bridal & Sarees',
      title: 'Bridal & Sarees',
      subtitle: '220+ hours of hand Zardozi & antique rose-gold tilla',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      badge: 'Wedding Edit',
      count: '2 Outfits'
    },
    {
      id: 'Blazers & Suits',
      title: 'Blazers & Suits',
      subtitle: 'Sharp tailored smoking blazers & fluid evening jumpsuits',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      badge: 'Western Wear',
      count: '2 Outfits'
    },
    {
      id: 'Accessories',
      title: 'Accessories & Bags',
      subtitle: 'Solid brass minaudières encrusted with Austrian crystals',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      badge: 'Jewel Clutches',
      count: '1 Piece'
    }
  ];

  const handleCategoryClick = (catId) => {
    navigateToCategory(catId);
  };

  return (
    <section className="py-16 sm:py-20 bg-nightViolet relative overflow-hidden border-t border-cardBorder/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-dragonfruit text-xs font-semibold tracking-[0.25em] uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Explore Boutique Collections</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-fashion font-bold text-mainHeading">
              Shop by Category
            </h2>
          </div>
          <p className="text-mutedLavender text-sm max-w-md mt-4 md:mt-0 font-light">
            Each outfit is handcrafted with premium Mulberry silk, royal velvet, and authentic slow-fashion craftsmanship.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative rounded-2xl overflow-hidden bg-cardBg border border-cardBorder shadow-xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-dragonfruit"
            >
              {/* Image with zoom effect */}
              <div className="aspect-[4/5] w-full overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nightViolet via-nightViolet/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-cardBg/90 backdrop-blur-md border border-cardBorder text-[10px] font-bold text-lightLavender tracking-wider uppercase">
                    {cat.badge}
                  </span>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                  <span className="text-xs text-dragonfruit font-semibold tracking-wider uppercase mb-1">
                    {cat.count}
                  </span>
                  <h3 className="text-xl font-fashion font-bold text-mainHeading mb-2 leading-snug group-hover:text-dragonfruit transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-lightLavender/80 line-clamp-2 mb-4 font-light leading-relaxed">
                    {cat.subtitle}
                  </p>

                  {/* Explore button with exact user hover spec: #FF4696 background, #1E1033 text */}
                  <div className="flex items-center justify-between pt-3 border-t border-cardBorder/60">
                    <span className="text-xs font-semibold text-lightLavender group-hover:text-dragonfruit transition-colors">
                      Shop Now
                    </span>
                    <div className="w-8 h-8 rounded-full bg-cardBg border border-cardBorder flex items-center justify-center text-lightLavender group-hover:bg-[#FF4696] group-hover:text-[#1E1033] group-hover:border-[#FF4696] transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
