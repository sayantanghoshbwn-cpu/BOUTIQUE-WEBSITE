import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { brandConfig, commerceConfig } from '../config/boutiqueConfig';
import confetti from 'canvas-confetti';
import { Sparkles, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterSection = () => {
  const { addToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid luxury patron email address.', 'error');
      return;
    }

    setIsSubscribed(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#FF2A8D', '#FF4696', '#35D07F', '#FFFFFF']
      });
    } catch {}

    addToast(`Welcome to the Private Salon! Use code ${commerceConfig.promoCode} for ${commerceConfig.promoDiscountPercent}% off.`, 'success');
  };

  return (
    <section className="py-16 sm:py-20 bg-nightViolet relative overflow-hidden border-t border-cardBorder/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="relative rounded-3xl bg-cardBg border border-cardBorder p-8 md:p-14 text-center overflow-hidden shadow-2xl">
          {/* Subtle dragonfruit glow in the background */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-dragonfruit/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-900/30 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-inputBg border border-inputBorder text-dragonfruit text-xs font-semibold tracking-[0.25em] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Private Salon Club</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-fashion font-bold text-mainHeading leading-tight">
              Receive Private Runway Invitations & Bespoke Privileges
            </h2>

            <p className="text-sm md:text-base text-mutedLavender font-light leading-relaxed">
              Patrons receive early access to seasonal haute couture collections, private showroom trunk shows, and a complimentary 15% privilege credit on their first bespoke acquisition.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 pt-2 max-w-md mx-auto">
                <div className="relative w-full">
                  <Mail className="w-4 h-4 text-mutedLavender absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your patron email..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-sm placeholder:text-mutedLavender/50 focus:outline-none focus:border-dragonfruit transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-dragonfruit text-white font-semibold text-xs tracking-wider uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] hover:shadow-dragonfruit-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shrink-0 font-sans"
                >
                  <span>Join Salon</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-inputBg border border-[#35D07F]/40 text-center animate-in fade-in">
                <div className="flex items-center justify-center gap-2 text-[#35D07F] text-sm font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>VIP Invitation Dispatched!</span>
                </div>
                <p className="text-xs text-lightLavender">
                  Use your exclusive code <strong className="text-dragonfruit font-mono text-sm">{commerceConfig.promoCode}</strong> at checkout for {commerceConfig.promoDiscountPercent}% off.
                </p>
              </div>
            )}

            <div className="flex items-center justify-center gap-6 pt-2 text-[11px] text-mutedLavender">
              <span>✦ Zero Spam Guarantee</span>
              <span>✦ Unsubscribe Anytime</span>
              <span>✦ Encrypted Data Vault</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
