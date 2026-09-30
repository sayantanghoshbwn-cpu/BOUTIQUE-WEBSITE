import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import {
  Scissors,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Crown,
  Ruler,
  Layers,
  Palette
} from 'lucide-react';

export const BespokeStudio = () => {
  const { addToast, formatPrice, addBooking, openBookingsDrawer } = useShop();

  const [step, setStep] = useState(1);
  const [silhouette, setSilhouette] = useState('Sculpted Mermaid Gown');
  const [fabric, setFabric] = useState('Royal Italian Velvet');
  const [colorTone, setColorTone] = useState('Night Violet');
  const [embellishment, setEmbellishment] = useState('Hand-stitched Zardozi & Crystals');
  
  // Form fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    consultationType: 'Virtual 3D Video Fitting',
    salonCity: 'Paris Atelier (Rue Saint-Honoré)',
    date: '',
    time: '14:00 (Afternoon)',
    bust: '',
    waist: '',
    hips: '',
    height: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isBooked, setIsBooked] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const silhouettes = [
    {
      id: 'mermaid',
      name: 'Sculpted Mermaid Gown',
      basePriceUSD: 1450,
      desc: 'Form-fitting corseted bodice flaring at the knee with an architectural train.',
      icon: '👗'
    },
    {
      id: 'lehenga',
      name: 'Regal 16-Kali Flared Lehenga',
      basePriceUSD: 2400,
      desc: 'Full-circle flared skirt with structured cancan and double organza dupattas.',
      icon: '✨'
    },
    {
      id: 'saree-corset',
      name: 'Draped Saree & Structured Corset',
      basePriceUSD: 1650,
      desc: 'Pre-stitched fluid silk drape with internal boned corset and lace trims.',
      icon: '⚜️'
    },
    {
      id: 'smoking',
      name: 'Velvet Smoking Jacket & Trouser',
      basePriceUSD: 1250,
      desc: 'Hourglass double-breasted velvet blazer paired with tailored wide-leg trousers.',
      icon: '🧥'
    }
  ];

  const fabrics = [
    { name: 'Royal Italian Velvet', extra: 0, desc: 'Plush, opulent depth in signature night violet' },
    { name: 'Pure Mulberry Silk Charmeuse', extra: 200, desc: '40 Momme liquid silk drape' },
    { name: 'Handloom Katan Raw Silk', extra: 350, desc: 'Authentic Banarasi handwoven silk with real silver zari' },
    { name: 'French Chantilly Lace & Tulle', extra: 280, desc: 'Delicate floral openwork from Paris ateliers' }
  ];

  const colorTones = [
    { name: 'Night Violet', hex: '#1A0C2E' },
    { name: 'Dragonfruit Magenta', hex: '#FF2A8D' },
    { name: 'Obsidian Noir', hex: '#0B090A' },
    { name: 'Royal Amethyst', hex: '#281640' },
    { name: 'Champagne Rose', hex: '#F3D2C1' }
  ];

  const embellishments = [
    { name: 'Minimalist Draped Silk Pleats', extra: 0 },
    { name: 'Hand-stitched Zardozi & Crystals', extra: 450 },
    { name: 'Full Swarovski Pave Bodice', extra: 850 },
    { name: 'Antique 24k Gold Metallic Tilla', extra: 600 }
  ];

  // Calculate estimated bespoke price
  const selectedSilObj = silhouettes.find((s) => s.name === silhouette) || silhouettes[0];
  const selectedFabObj = fabrics.find((f) => f.name === fabric) || fabrics[0];
  const selectedEmbObj = embellishments.find((e) => e.name === embellishment) || embellishments[0];
  const estimatedTotalUSD = selectedSilObj.basePriceUSD + selectedFabObj.extra + selectedEmbObj.extra;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid Email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.date) errs.date = 'Please select a fitting date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleScheduleFitting = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      addToast('Please fill all required consultation fields correctly.', 'error');
      return;
    }

    const generatedId = `BESPOKE-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(generatedId);

    addBooking({
      id: generatedId,
      type: 'Bespoke',
      title: 'Bespoke Made-to-Measure Atelier Session',
      clientName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      salon: formData.salonCity,
      mode: formData.consultationType,
      date: formData.date,
      time: formData.time,
      garment: `${silhouette} in ${fabric} (${colorTone})`,
      embellishment,
      measurements: {
        bust: formData.bust,
        waist: formData.waist,
        hips: formData.hips
      },
      estimatedPriceUSD: estimatedTotalUSD
    });

    setIsBooked(true);

    // Confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF2A8D', '#FF4696', '#35D07F', '#E6DDF8', '#FFFFFF']
      });
    } catch {}

    addToast(`Private Fitting Confirmed! Your Reservation ID is ${generatedId}`, 'success');
  };

  const resetBespoke = () => {
    setIsBooked(false);
    setStep(1);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      consultationType: 'Virtual 3D Video Fitting',
      salonCity: 'Paris Atelier (Rue Saint-Honoré)',
      date: '',
      time: '14:00 (Afternoon)',
      bust: '',
      waist: '',
      hips: '',
      height: '',
      notes: ''
    });
  };

  return (
    <section id="bespoke-studio" className="py-24 bg-nightViolet relative scroll-mt-20 border-t border-cardBorder/40">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-dragonfruit/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cardBg/60 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Studio Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cardBg border border-cardBorder text-dragonfruit text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            <Scissors className="w-3.5 h-3.5" />
            <span>The Private Atelier Studio</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-fashion font-bold text-mainHeading mb-4">
            Bespoke Made-to-Measure
          </h2>
          <p className="text-mutedLavender text-sm md:text-base font-light leading-relaxed">
            Customize your dream garment silhouette, select rare silk velvets, and reserve a private one-on-one consultation with our lead Paris couturiers.
          </p>
        </div>

        {/* Bespoke Studio Content Container */}
        <div className="rounded-2xl sm:rounded-3xl bg-cardBg border border-cardBorder shadow-2xl p-4 sm:p-6 lg:p-10">
          
          {!isBooked ? (
            <div>
              {/* Stepper Navigation */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-cardBorder">
                {[
                  { num: 1, title: 'Silhouette', icon: Ruler },
                  { num: 2, title: 'Fabric & Color', icon: Palette },
                  { num: 3, title: 'Embellishment', icon: Sparkles },
                  { num: 4, title: 'VIP Consultation', icon: Calendar },
                ].map((s) => {
                  const Icon = s.icon;
                  const isActive = step === s.num;
                  const isDone = step > s.num;
                  return (
                    <button
                      key={s.num}
                      onClick={() => setStep(s.num)}
                      className={`flex flex-col items-center sm:flex-row sm:items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-dragonfruit text-white shadow-sm font-bold'
                          : isDone
                          ? 'bg-inputBg border border-cardBorder text-[#35D07F]'
                          : 'bg-inputBg/50 text-mutedLavender hover:text-lightLavender'
                      }`}
                    >
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold ${
                        isActive ? 'bg-white text-dragonfruit' : isDone ? 'bg-[#35D07F] text-nightViolet' : 'bg-cardBorder text-mutedLavender'
                      }`}>
                        {isDone ? '✓' : s.num}
                      </div>
                      <span className="text-[10px] sm:text-xs tracking-wider uppercase hidden sm:inline">{s.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Step Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Configuration Area (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* STEP 1: SILHOUETTE */}
                  {step === 1 && (
                    <div className="space-y-4 animate-in fade-in">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-fashion font-bold text-mainHeading">
                          Step 1: Choose Your Couture Silhouette
                        </h3>
                        <span className="text-xs text-mutedLavender">Select base architecture</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {silhouettes.map((s) => (
                          <div
                            key={s.id}
                            onClick={() => setSilhouette(s.name)}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                              silhouette === s.name
                                ? 'bg-inputBg border-dragonfruit shadow-sm'
                                : 'bg-inputBg/60 border-cardBorder hover:border-mutedLavender'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <span className="text-2xl">{s.icon}</span>
                              <span className="text-xs font-fashion font-bold text-dragonfruit">
                                From {formatPrice(s.basePriceUSD)}
                              </span>
                            </div>
                            <h4 className="font-fashion text-base font-bold text-mainHeading mb-1">{s.name}</h4>
                            <p className="text-xs text-mutedLavender font-light leading-relaxed mb-3">{s.desc}</p>
                            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-cardBorder/60">
                              <span className="text-lightLavender">Atelier Pattern Cut</span>
                              {silhouette === s.name && (
                                <span className="text-dragonfruit font-bold flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          onClick={() => setStep(2)}
                          className="px-6 py-3 rounded-xl bg-dragonfruit text-white font-semibold text-xs tracking-wider uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] transition-all cursor-pointer font-sans"
                        >
                          Next: Fabric & Colors →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: FABRIC & COLOR */}
                  {step === 2 && (
                    <div className="space-y-6 animate-in fade-in">
                      <div>
                        <h3 className="text-lg font-fashion font-bold text-mainHeading mb-1">
                          Step 2: Select Rare Fabrics & Signature Palette
                        </h3>
                        <p className="text-xs text-mutedLavender">Woven by century-old heritage textile mills</p>
                      </div>

                      {/* Fabric Selection */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {fabrics.map((f) => (
                          <div
                            key={f.name}
                            onClick={() => setFabric(f.name)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer ${
                              fabric === f.name
                                ? 'bg-inputBg border-dragonfruit shadow-sm'
                                : 'bg-inputBg/60 border-cardBorder hover:border-mutedLavender'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="text-sm font-bold text-mainHeading">{f.name}</h4>
                              {f.extra > 0 && (
                                <span className="text-xs text-dragonfruit">+{formatPrice(f.extra)}</span>
                              )}
                            </div>
                            <p className="text-xs text-mutedLavender">{f.desc}</p>
                          </div>
                        ))}
                      </div>

                      {/* Color Tone */}
                      <div>
                        <label className="block text-xs font-semibold tracking-wider uppercase text-lightLavender mb-3">
                          Select Signature Shade
                        </label>
                        <div className="flex items-center gap-3 flex-wrap">
                          {colorTones.map((c) => (
                            <button
                              key={c.name}
                              onClick={() => setColorTone(c.name)}
                              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                                colorTone === c.name
                                  ? 'bg-inputBg border-dragonfruit shadow-sm text-white'
                                  : 'bg-inputBg/60 border-cardBorder text-mutedLavender hover:text-lightLavender'
                              }`}
                            >
                              <span
                                className="w-4 h-4 rounded-full border border-white/20"
                                style={{ backgroundColor: c.hex }}
                              />
                              <span className="text-xs font-medium">{c.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <button
                          onClick={() => setStep(1)}
                          className="px-5 py-2.5 rounded-xl bg-cardBg border border-cardBorder text-lightLavender text-xs hover:border-dragonfruit transition-colors cursor-pointer"
                        >
                          ← Back
                        </button>
                        <button
                          onClick={() => setStep(3)}
                          className="px-6 py-3 rounded-xl bg-dragonfruit text-white font-semibold text-xs tracking-wider uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] transition-all cursor-pointer font-sans"
                        >
                          Next: Embellishments →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: EMBELLISHMENT */}
                  {step === 3 && (
                    <div className="space-y-6 animate-in fade-in">
                      <div>
                        <h3 className="text-lg font-fashion font-bold text-mainHeading mb-1">
                          Step 3: Artisanal Hand-Embroidery & Detailing
                        </h3>
                        <p className="text-xs text-mutedLavender">Crafted by master Zardozi artisans</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {embellishments.map((emb) => (
                          <div
                            key={emb.name}
                            onClick={() => setEmbellishment(emb.name)}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                              embellishment === emb.name
                                ? 'bg-inputBg border-dragonfruit shadow-sm'
                                : 'bg-inputBg/60 border-cardBorder hover:border-mutedLavender'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <Sparkles className="w-5 h-5 text-dragonfruit" />
                              <span className="text-xs text-dragonfruit font-bold">
                                {emb.extra > 0 ? `+${formatPrice(emb.extra)}` : 'Included'}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-mainHeading mb-1">{emb.name}</h4>
                            <p className="text-xs text-mutedLavender font-light">
                              Includes micro-needle precision work and certified luxury finishes.
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between pt-4">
                        <button
                          onClick={() => setStep(2)}
                          className="px-5 py-2.5 rounded-xl bg-cardBg border border-cardBorder text-lightLavender text-xs hover:border-dragonfruit transition-colors cursor-pointer"
                        >
                          ← Back
                        </button>
                        <button
                          onClick={() => setStep(4)}
                          className="px-6 py-3 rounded-xl bg-dragonfruit text-white font-semibold text-xs tracking-wider uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] transition-all cursor-pointer font-sans"
                        >
                          Next: Reserve Fitting Appointment →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: VIP CONSULTATION FORM */}
                  {step === 4 && (
                    <form onSubmit={handleScheduleFitting} className="space-y-5 animate-in fade-in">
                      <div>
                        <h3 className="text-lg font-fashion font-bold text-mainHeading mb-1">
                          Step 4: Reserve Your Private VIP Fitting
                        </h3>
                        <p className="text-xs text-mutedLavender">
                          Complimentary 45-minute bespoke appointment with Élodie Laurent
                        </p>
                      </div>

                      {/* Client Info with User Specified Inputs #25143B / #49325F */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-lightLavender mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Lady Genevieve Sterling"
                            className="w-full px-4 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-sm placeholder:text-mutedLavender/50 focus:outline-none focus:border-dragonfruit transition-all"
                          />
                          {errors.fullName && (
                            <span className="text-[11px] text-[#FF5C7A] mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.fullName}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-lightLavender mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="genevieve@sterling.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-sm placeholder:text-mutedLavender/50 focus:outline-none focus:border-dragonfruit transition-all"
                          />
                          {errors.email && (
                            <span className="text-[11px] text-[#FF5C7A] mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.email}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-lightLavender mb-1.5">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 (555) 382-9920"
                            className="w-full px-4 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-sm placeholder:text-mutedLavender/50 focus:outline-none focus:border-dragonfruit transition-all"
                          />
                          {errors.phone && (
                            <span className="text-[11px] text-[#FF5C7A] mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.phone}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-lightLavender mb-1.5">
                            Consultation Mode
                          </label>
                          <select
                            name="consultationType"
                            value={formData.consultationType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-lightLavender text-sm focus:outline-none focus:border-dragonfruit"
                          >
                            <option value="Virtual 3D Video Fitting" className="bg-cardBg">
                              Virtual 3D Video Fitting (Worldwide)
                            </option>
                            <option value="In-Person Private Salon" className="bg-cardBg">
                              In-Person Private Salon Appointment
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-lightLavender mb-1.5">
                            Preferred Date *
                          </label>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-lightLavender text-sm focus:outline-none focus:border-dragonfruit"
                          />
                          {errors.date && (
                            <span className="text-[11px] text-[#FF5C7A] mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.date}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-lightLavender mb-1.5">
                            Preferred Time Slot
                          </label>
                          <select
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-lightLavender text-sm focus:outline-none focus:border-dragonfruit"
                          >
                            <option value="11:00 (Morning Salon)" className="bg-cardBg">11:00 AM (Morning Salon)</option>
                            <option value="14:00 (Afternoon)" className="bg-cardBg">02:00 PM (Afternoon)</option>
                            <option value="17:00 (Evening Soirée)" className="bg-cardBg">05:00 PM (Evening Soirée)</option>
                            <option value="19:30 (Late VIP Salon)" className="bg-cardBg">07:30 PM (Late VIP Salon)</option>
                          </select>
                        </div>
                      </div>

                      {/* Optional Measurements */}
                      <div className="p-4 rounded-xl bg-inputBg/40 border border-inputBorder">
                        <span className="text-xs font-semibold text-lightLavender block mb-2">
                          Optional Pre-Fitting Measurements (in inches)
                        </span>
                        <div className="grid grid-cols-3 gap-3">
                          <input
                            type="text"
                            name="bust"
                            value={formData.bust}
                            onChange={handleInputChange}
                            placeholder="Bust (e.g. 34)"
                            className="px-3 py-2 rounded-lg bg-inputBg border border-inputBorder text-mainHeading text-xs focus:outline-none focus:border-dragonfruit"
                          />
                          <input
                            type="text"
                            name="waist"
                            value={formData.waist}
                            onChange={handleInputChange}
                            placeholder="Waist (e.g. 27)"
                            className="px-3 py-2 rounded-lg bg-inputBg border border-inputBorder text-mainHeading text-xs focus:outline-none focus:border-dragonfruit"
                          />
                          <input
                            type="text"
                            name="hips"
                            value={formData.hips}
                            onChange={handleInputChange}
                            placeholder="Hips (e.g. 37)"
                            className="px-3 py-2 rounded-lg bg-inputBg border border-inputBorder text-mainHeading text-xs focus:outline-none focus:border-dragonfruit"
                          />
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex justify-between pt-4">
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="px-5 py-2.5 rounded-xl bg-cardBg border border-cardBorder text-lightLavender text-xs hover:border-dragonfruit transition-colors cursor-pointer"
                        >
                          ← Back
                        </button>
                        
                        {/* Primary Button: Dragonfruit with White text, hover effect */}
                        <button
                          type="submit"
                          className="px-8 py-3.5 rounded-xl bg-dragonfruit text-white font-semibold text-xs tracking-wider uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] hover:shadow-dragonfruit-lg transition-all duration-300 flex items-center gap-2 cursor-pointer font-sans"
                        >
                          <Crown className="w-4 h-4" />
                          <span>Confirm Bespoke Reservation</span>
                        </button>
                      </div>
                    </form>
                  )}

                </div>

                {/* Right Summary Card (4 cols) */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-inputBg/70 border border-cardBorder space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-cardBorder">
                    <span className="text-xs font-fashion font-bold uppercase tracking-widest text-lightLavender">
                      Bespoke Atelier Summary
                    </span>
                    <span className="w-2 h-2 rounded-full bg-dragonfruit animate-ping" />
                  </div>

                  {/* Summary list */}
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-mutedLavender">Silhouette:</span>
                      <span className="text-mainHeading font-semibold text-right">{silhouette}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-mutedLavender">Fabric:</span>
                      <span className="text-mainHeading font-semibold text-right">{fabric}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-mutedLavender">Color:</span>
                      <span className="text-mainHeading font-semibold flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{
                            backgroundColor:
                              colorTones.find((c) => c.name === colorTone)?.hex || '#FF2A8D',
                          }}
                        />
                        {colorTone}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-mutedLavender">Embellishment:</span>
                      <span className="text-mainHeading font-semibold text-right">{embellishment}</span>
                    </div>
                  </div>

                  {/* Estimated Price */}
                  <div className="pt-4 border-t border-cardBorder">
                    <span className="text-[10px] uppercase tracking-wider text-mutedLavender block mb-1">
                      Estimated Atelier Investment
                    </span>
                    <div className="text-2xl font-fashion font-bold text-dragonfruit">
                      {formatPrice(estimatedTotalUSD)}
                    </div>
                    <span className="text-[10px] text-mutedLavender block mt-1">
                      Includes personal fitting & luxury preservation case
                    </span>
                  </div>

                  {/* Boutique Assurance */}
                  <div className="p-3 rounded-xl bg-cardBg border border-cardBorder text-[11px] text-mutedLavender space-y-1.5">
                    <div className="flex items-center gap-2 text-[#35D07F]">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="font-semibold">Flawless Fit Guarantee</span>
                    </div>
                    <p className="font-light">
                      Includes 2 complimentary alterations at our Paris or London salons.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* SUCCESS CONFIRMATION STATE */
            <div className="py-12 text-center max-w-lg mx-auto space-y-6 animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-full bg-[#182C25] border-2 border-[#35D07F] text-[#35D07F] flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#35D07F]">
                  Reservation Confirmed
                </span>
                <h3 className="text-3xl font-fashion font-bold text-mainHeading mt-1">
                  We Await Your Presence
                </h3>
                <p className="text-sm text-mutedLavender mt-2 font-light">
                  A bespoke invitation dossier has been dispatched to <strong className="text-white">{formData.email}</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-inputBg border border-inputBorder text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-mutedLavender">Reservation ID:</span>
                  <span className="font-mono font-bold text-dragonfruit">{bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mutedLavender">Date & Time:</span>
                  <span className="text-white font-medium">{formData.date} at {formData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mutedLavender">Consultation Mode:</span>
                  <span className="text-white font-medium">{formData.consultationType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mutedLavender">Creation:</span>
                  <span className="text-white font-medium">{silhouette} ({colorTone})</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={resetBespoke}
                  className="px-6 py-3 rounded-xl bg-cardBg border border-cardBorder text-lightLavender text-xs font-semibold hover:border-dragonfruit hover:text-white transition-all cursor-pointer"
                >
                  Configure Another Bespoke Creation
                </button>
                <button
                  onClick={openBookingsDrawer}
                  className="px-6 py-3 rounded-xl bg-dragonfruit text-white font-semibold text-xs uppercase tracking-wider shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] transition-all cursor-pointer font-sans flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>View My Appointments</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
