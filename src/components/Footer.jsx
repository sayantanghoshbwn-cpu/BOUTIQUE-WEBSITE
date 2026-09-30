import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Globe, ShieldCheck, Share2 } from 'lucide-react';
import { brandConfig, contactConfig, salonsConfig, socialConfig } from '../config/boutiqueConfig';
import { smoothScrollTo } from '../utils/scrollUtils';

export const Footer = () => {
  const scrollToTop = () => {
    smoothScrollTo(0);
  };

  return (
    <footer id="salons" className="bg-[#0c0519] text-lightLavender border-t border-cardBorder pt-14 sm:pt-16 pb-28 lg:pb-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-cardBorder/60">
          
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-dragonfruit shadow-[0_0_10px_#FF2A8D]" />
              <span className="font-fashion text-2xl font-bold tracking-[0.25em] text-white">
                {brandConfig.name}
              </span>
            </div>
            <p className="text-xs text-mutedLavender font-light leading-relaxed max-w-sm">
              {brandConfig.description}
            </p>
            <div className="pt-2 text-xs text-lightLavender space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-dragonfruit" />
                <span>Flagship: {contactConfig.flagshipAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-dragonfruit" />
                <span>{contactConfig.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-dragonfruit" />
                <span>{contactConfig.phone} (VIP Client Desk)</span>
              </div>
            </div>
          </div>

          {/* Haute Couture Collections */}
          <div className="space-y-3">
            <h4 className="font-fashion text-xs font-bold uppercase tracking-[0.2em] text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-mutedLavender">
              <li><button onClick={() => smoothScrollTo('collection', -85)} className="hover:text-dragonfruit transition-colors text-left cursor-pointer">Haute Couture Gowns</button></li>
              <li><button onClick={() => smoothScrollTo('collection', -85)} className="hover:text-dragonfruit transition-colors text-left cursor-pointer">Bridal & Festive Lehengas</button></li>
              <li><button onClick={() => smoothScrollTo('collection', -85)} className="hover:text-dragonfruit transition-colors text-left cursor-pointer">Draped Silk Sarees & Corsets</button></li>
              <li><button onClick={() => smoothScrollTo('collection', -85)} className="hover:text-dragonfruit transition-colors text-left cursor-pointer">Velvet Smoking Blazers</button></li>
              <li><button onClick={() => smoothScrollTo('collection', -85)} className="hover:text-dragonfruit transition-colors text-left cursor-pointer">Artisanal Minaudières</button></li>
              <li><button onClick={() => smoothScrollTo('lookbook', -85)} className="hover:text-dragonfruit transition-colors text-left cursor-pointer">Paris Runway Lookbook</button></li>
            </ul>
          </div>

          {/* Bespoke Client Services */}
          <div className="space-y-3">
            <h4 className="font-fashion text-xs font-bold uppercase tracking-[0.2em] text-white">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-mutedLavender">
              <li><button onClick={() => smoothScrollTo('bespoke-studio', -85)} className="hover:text-dragonfruit transition-colors text-left cursor-pointer">Made-to-Measure Studio</button></li>
              <li><button onClick={() => smoothScrollTo('bespoke-studio', -85)} className="hover:text-dragonfruit transition-colors text-left cursor-pointer">Virtual 3D Video Fittings</button></li>
              <li><button onClick={() => smoothScrollTo('bespoke-studio', -85)} className="hover:text-dragonfruit transition-colors text-left cursor-pointer">Bridal Trousseau Curation</button></li>
              <li><button onClick={() => smoothScrollTo('atelier-story', -85)} className="hover:text-dragonfruit transition-colors text-left cursor-pointer">Garment Preservation & Vault</button></li>
              <li><button onClick={() => smoothScrollTo('atelier-story', -85)} className="hover:text-dragonfruit transition-colors text-left cursor-pointer">Fabric Sourcing Archive</button></li>
              <li><button onClick={() => smoothScrollTo('testimonials', -85)} className="hover:text-dragonfruit transition-colors text-left cursor-pointer">Corporate & Gala Dressing</button></li>
            </ul>
          </div>

          {/* Global Flagship Salons from .env */}
          <div className="space-y-3">
            <h4 className="font-fashion text-xs font-bold uppercase tracking-[0.2em] text-white">
              Private Salons
            </h4>
            <ul className="space-y-2 text-xs text-mutedLavender">
              {salonsConfig.map((s) => (
                <li key={s.city} title={s.fullAddress}>
                  <strong className="text-lightLavender">{s.city}:</strong> {s.location}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-mutedLavender">
          <p>© {new Date().getFullYear()} {brandConfig.name} HAUTE COUTURE. All Rights Reserved. Pure slow-fashion artistry.</p>
          
          <div className="flex items-center gap-6">
            <a href={socialConfig.instagram} target="_blank" rel="noreferrer" className="hover:text-dragonfruit transition-colors">Instagram</a>
            <a href={socialConfig.facebook} target="_blank" rel="noreferrer" className="hover:text-dragonfruit transition-colors">Facebook</a>
            <a href={socialConfig.pinterest} target="_blank" rel="noreferrer" className="hover:text-dragonfruit transition-colors">Pinterest</a>
            <button
              onClick={scrollToTop}
              className="text-dragonfruit hover:underline font-semibold cursor-pointer ml-4"
            >
              Back to Top ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
