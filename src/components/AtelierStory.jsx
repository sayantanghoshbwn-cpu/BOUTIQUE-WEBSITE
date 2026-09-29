import React from 'react';
import { ATELIER_PILLARS, PRESS_LOGOS } from '../data/lookbook';
import { brandConfig } from '../config/boutiqueConfig';
import { Sparkles, Award, Shield, HeartHandshake, Feather } from 'lucide-react';

export const AtelierStory = () => {
  return (
    <section id="atelier-story" className="py-16 sm:py-24 bg-nightViolet relative overflow-hidden scroll-mt-20 border-t border-cardBorder/40">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dragonfruit/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cardBg border border-cardBorder text-dragonfruit text-xs font-semibold tracking-[0.25em] uppercase">
              <Feather className="w-3.5 h-3.5" />
              <span>Slow Luxury & Heritage Craft</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-fashion font-bold text-mainHeading leading-tight">
              Honoring Century-Old Atelier Traditions
            </h2>

            <p className="text-lightLavender/90 text-sm md:text-base font-light leading-relaxed">
              At {brandConfig.name}, each gown is not merely sewn—it is sculpted. Our atelier was founded on the philosophy that true luxury requires unhurried patience, rare natural silks, and master karigars who breathe life into every stitch.
            </p>

            <p className="text-mutedLavender text-sm font-light leading-relaxed">
              From our flagship atelier on Paris's Rue Saint-Honoré to our master embroidery looms in Kolkata and Varanasi, we celebrate slow fashion that survives generations.
            </p>

            {/* Founder Signature from .env */}
            <div className="pt-4 border-t border-cardBorder/60 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-dragonfruit overflow-hidden">
                <img
                  src={brandConfig.founderImage}
                  alt={brandConfig.founder}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-fashion font-bold text-mainHeading text-sm block">
                  {brandConfig.founder}
                </span>
                <span className="text-xs text-dragonfruit font-medium">
                  {brandConfig.founderRole}
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Composition */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-cardBorder shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80"
                  alt="Silk Fabric and Thread Work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 rounded-2xl bg-cardBg border border-cardBorder text-center">
                <span className="text-2xl font-fashion font-bold text-dragonfruit">24k Gold</span>
                <p className="text-[11px] text-mutedLavender mt-0.5">Metallic Zardozi Inlays</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 rounded-2xl bg-cardBg border border-cardBorder text-center">
                <span className="text-2xl font-fashion font-bold text-mainHeading">40 Momme</span>
                <p className="text-[11px] text-mutedLavender mt-0.5">Heavy Mulberry Silk</p>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-cardBorder shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&q=80"
                  alt="Haute Couture Fitting Studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {ATELIER_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-cardBg border border-cardBorder shadow-card-glow hover:border-dragonfruit transition-all duration-300"
            >
              <span className="text-3xl font-fashion font-bold text-dragonfruit block mb-2">
                {pillar.number}
              </span>
              <h4 className="text-base font-fashion font-bold text-mainHeading mb-2">
                {pillar.label}
              </h4>
              <p className="text-xs text-mutedLavender font-light leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Press Accolades */}
        <div className="p-8 rounded-3xl bg-cardBg/60 border border-cardBorder text-center">
          <span className="text-xs font-semibold tracking-[0.25em] text-mutedLavender uppercase block mb-6">
            Celebrated by International Fashion Press
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {PRESS_LOGOS.map((press, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-inputBg/40 border border-inputBorder/50">
                <span className="text-xl font-fashion font-extrabold tracking-widest text-mainHeading block mb-1">
                  {press.name}
                </span>
                <p className="text-[11px] font-serif italic text-lightLavender/80">
                  {press.quote}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
