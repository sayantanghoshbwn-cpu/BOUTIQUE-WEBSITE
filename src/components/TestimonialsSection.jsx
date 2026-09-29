import React from 'react';
import { TESTIMONIALS } from '../data/lookbook';
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-nightViolet relative overflow-hidden scroll-mt-20 border-t border-cardBorder/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cardBg border border-cardBorder text-dragonfruit text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP Client Chronicles</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-fashion font-bold text-mainHeading mb-4">
            Voices of Our Patrons
          </h2>
          <p className="text-mutedLavender text-sm md:text-base font-light leading-relaxed">
            From royal galas in London and Paris to destination weddings in Rajasthan, discover why discerning women trust Maison Violette for their most defining moments.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-3xl bg-cardBg border border-cardBorder shadow-card-glow hover:border-dragonfruit transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-dragonfruit mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-dragonfruit" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm font-light text-lightLavender/90 leading-relaxed italic mb-6">
                  “{t.comment}”
                </p>
              </div>

              {/* Client Profile */}
              <div className="pt-4 border-t border-cardBorder/60 flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-cardBorder"
                />
                <div>
                  <h4 className="font-fashion font-bold text-mainHeading text-sm flex items-center gap-1.5">
                    {t.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#35D07F]" title="Verified VIP Client" />
                  </h4>
                  <p className="text-xs text-mutedLavender">{t.role} • {t.city}</p>
                  <span className="text-[10px] text-dragonfruit font-medium block mt-0.5">
                    Acquired: {t.itemPurchased}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
