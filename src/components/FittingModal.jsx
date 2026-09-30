import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Scissors
} from 'lucide-react';

export const FittingModal = () => {
  const {
    isFittingModalOpen,
    fittingInitialProduct,
    closeFittingModal,
    addBooking,
    openBookingsDrawer,
    addToast
  } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Paris Flagship (Rue Saint-Honoré)',
    mode: 'Virtual 3D Video Fitting',
    date: '',
    time: '14:00',
    garmentOfInterest: '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [refId, setRefId] = useState('');

  useEffect(() => {
    if (fittingInitialProduct) {
      setFormData((prev) => ({
        ...prev,
        garmentOfInterest: fittingInitialProduct.name
      }));
    }
  }, [fittingInitialProduct]);

  if (!isFittingModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone / WhatsApp is required';
    if (!formData.date) errs.date = 'Please pick a date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please complete all required fields.', 'error');
      return;
    }

    const code = `VIP-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefId(code);

    addBooking({
      id: code,
      type: 'Fitting',
      title: 'Private VIP Video / Salon Fitting',
      clientName: formData.name,
      email: formData.email,
      phone: formData.phone,
      salon: formData.city,
      mode: formData.mode,
      date: formData.date,
      time: formData.time,
      garment: formData.garmentOfInterest,
      specialRequests: formData.specialRequests
    });

    setIsSuccess(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF2A8D', '#FF4696', '#35D07F', '#FFFFFF']
      });
    } catch {}

    addToast(`Fitting Scheduled! Your VIP Invitation Code is ${code}`, 'success');
  };

  const handleClose = () => {
    setIsSuccess(false);
    closeFittingModal();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-nightViolet/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl max-h-[88dvh] sm:max-h-[92vh] overflow-y-auto bg-cardBg border border-cardBorder rounded-3xl p-4 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-nightViolet/80 border border-cardBorder text-lightLavender hover:text-white hover:border-dragonfruit transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="text-center mb-5 sm:mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-inputBg border border-inputBorder text-dragonfruit text-xs font-semibold tracking-widest uppercase mb-2">
                <Scissors className="w-3.5 h-3.5" />
                <span>Private Consultation</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-fashion font-bold text-mainHeading">
                Book a VIP Fitting
              </h3>
              <p className="text-xs text-mutedLavender mt-1 max-w-sm mx-auto">
                One-on-one consultation with our lead couturiers for bespoke bridal and red carpet creations.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-lightLavender mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Lady Jacqueline"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-xs placeholder:text-mutedLavender/50 focus:outline-none focus:border-dragonfruit"
                  />
                  {errors.name && (
                    <span className="text-[11px] text-[#FF5C7A] mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-lightLavender mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jacqueline@couture.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-xs placeholder:text-mutedLavender/50 focus:outline-none focus:border-dragonfruit"
                  />
                  {errors.email && (
                    <span className="text-[11px] text-[#FF5C7A] mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-lightLavender mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+33 6 12 34 56 78"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-xs placeholder:text-mutedLavender/50 focus:outline-none focus:border-dragonfruit"
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-[#FF5C7A] mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-lightLavender mb-1">
                    Salon Location
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-lightLavender text-xs focus:outline-none focus:border-dragonfruit"
                  >
                    <option value="Paris Flagship (Rue Saint-Honoré)" className="bg-cardBg">Paris Flagship (Rue Saint-Honoré)</option>
                    <option value="London Salon (Mayfair)" className="bg-cardBg">London Salon (Mayfair)</option>
                    <option value="Mumbai Studio (Taj Colaba)" className="bg-cardBg">Mumbai Studio (Taj Colaba)</option>
                    <option value="Kolkata Heritage Lounge" className="bg-cardBg">Kolkata Heritage Lounge</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-lightLavender mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-lightLavender text-xs focus:outline-none focus:border-dragonfruit"
                  />
                  {errors.date && (
                    <span className="text-[11px] text-[#FF5C7A] mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.date}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-lightLavender mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-lightLavender text-xs focus:outline-none focus:border-dragonfruit"
                  >
                    <option value="11:00 AM" className="bg-cardBg">11:00 AM Morning</option>
                    <option value="14:00 PM" className="bg-cardBg">02:00 PM Afternoon</option>
                    <option value="17:00 PM" className="bg-cardBg">05:00 PM Evening</option>
                    <option value="19:30 PM" className="bg-cardBg">07:30 PM VIP Night</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-lightLavender mb-1">
                  Garment of Interest (Optional)
                </label>
                <input
                  type="text"
                  name="garmentOfInterest"
                  value={formData.garmentOfInterest}
                  onChange={handleChange}
                  placeholder="e.g. Aura Nocturne Gown or Bespoke Bridal Saree"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-xs placeholder:text-mutedLavender/50 focus:outline-none focus:border-dragonfruit"
                />
              </div>

              {/* Primary Action Button: Dragonfruit with White text */}
              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl bg-dragonfruit text-white font-semibold text-xs tracking-wider uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] hover:shadow-dragonfruit-lg transition-all duration-300 cursor-pointer font-sans"
              >
                Confirm VIP Appointment
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#182C25] border-2 border-[#35D07F] text-[#35D07F] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-fashion font-bold text-mainHeading">
              VIP Appointment Scheduled
            </h3>
            <p className="text-xs text-mutedLavender max-w-sm mx-auto">
              Our Senior Couturière will connect with you at <strong className="text-white">{formData.email}</strong> to finalize fitting preparations.
            </p>

            <div className="p-4 rounded-xl bg-inputBg border border-inputBorder text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-mutedLavender">Invitation ID:</span>
                <span className="font-mono font-bold text-dragonfruit">{refId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mutedLavender">Date & Time:</span>
                <span className="text-white font-medium">{formData.date} ({formData.time})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mutedLavender">Salon:</span>
                <span className="text-white font-medium">{formData.city}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl bg-cardBg border border-cardBorder text-lightLavender text-xs hover:border-dragonfruit hover:text-white transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleClose();
                  openBookingsDrawer();
                }}
                className="px-5 py-2.5 rounded-xl bg-dragonfruit text-white font-semibold text-xs tracking-wider uppercase shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] transition-all cursor-pointer font-sans flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>View My Appointments</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
