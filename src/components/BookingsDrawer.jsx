import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Scissors,
  CheckCircle2,
  Trash2,
  Plus,
  Sparkles,
  Phone,
  ShieldCheck,
  Video
} from 'lucide-react';
import { contactConfig } from '../config/boutiqueConfig';

export const BookingsDrawer = () => {
  const {
    isBookingsDrawerOpen,
    closeBookingsDrawer,
    bookings,
    cancelBooking,
    openFittingModal
  } = useShop();

  if (!isBookingsDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={closeBookingsDrawer}
        className="fixed inset-0 bg-nightViolet/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full sm:max-w-md bg-cardBg border-l border-cardBorder shadow-2xl flex flex-col z-10">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-cardBorder flex items-center justify-between bg-inputBg/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-dragonfruit/20 border border-dragonfruit/60 flex items-center justify-center text-dragonfruit shadow-sm">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-fashion text-base sm:text-lg font-bold text-mainHeading flex items-center gap-2">
                  <span>VIP Appointments</span>
                  <span className="px-2 py-0.5 rounded-full bg-dragonfruit/20 border border-dragonfruit/50 text-dragonfruit text-[10px] font-sans font-bold">
                    {bookings.length}
                  </span>
                </h3>
                <p className="text-[11px] text-mutedLavender">Private Salon & 3D Video Fittings</p>
              </div>
            </div>

            <button
              onClick={closeBookingsDrawer}
              className="p-2 rounded-full bg-nightViolet border border-cardBorder text-lightLavender hover:text-white hover:border-dragonfruit transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Bookings List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {bookings.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-inputBg border border-inputBorder flex items-center justify-center text-mutedLavender">
                  <Calendar className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-fashion text-lg font-bold text-mainHeading">No VIP Fittings Scheduled</h4>
                  <p className="text-xs text-mutedLavender max-w-xs mx-auto">
                    Reserve a private one-on-one session with our master couturiers in Paris, London, or via Virtual 3D.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeBookingsDrawer();
                    openFittingModal();
                  }}
                  className="px-6 py-3 rounded-xl bg-dragonfruit text-white font-semibold text-xs uppercase tracking-wider shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] transition-all cursor-pointer font-sans flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Book Private Fitting</span>
                </button>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-4 sm:p-5 rounded-2xl bg-inputBg/80 border border-cardBorder shadow-md hover:border-dragonfruit/50 transition-all space-y-3 relative group"
                >
                  {/* Status & Code */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#35D07F] shadow-sm animate-pulse" />
                      <span className="text-[11px] font-bold text-[#35D07F] uppercase tracking-wider">
                        {booking.status || 'Confirmed VIP'}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-dragonfruit bg-dragonfruit/10 px-2 py-0.5 rounded-md border border-dragonfruit/30">
                      {booking.id}
                    </span>
                  </div>

                  {/* Title / Type */}
                  <div>
                    <h4 className="font-fashion text-sm font-bold text-mainHeading flex items-center gap-1.5">
                      {booking.type === 'Bespoke' ? (
                        <Scissors className="w-3.5 h-3.5 text-dragonfruit shrink-0" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5 text-dragonfruit shrink-0" />
                      )}
                      <span>{booking.title || (booking.type === 'Bespoke' ? 'Bespoke Made-to-Measure Fitting' : 'Private VIP Video Fitting')}</span>
                    </h4>
                    {booking.garment && (
                      <p className="text-xs text-lightLavender mt-0.5 font-medium">
                        Focus: <span className="text-white">{booking.garment}</span>
                      </p>
                    )}
                  </div>

                  {/* Appointment Details */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-xl bg-cardBg/80 border border-cardBorder">
                    <div className="flex items-center gap-1.5 text-lightLavender">
                      <Calendar className="w-3 h-3 text-dragonfruit shrink-0" />
                      <span>{booking.date || 'To be scheduled'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-lightLavender">
                      <Clock className="w-3 h-3 text-dragonfruit shrink-0" />
                      <span>{booking.time || '14:00 PM'}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 text-mutedLavender truncate">
                      {booking.mode && booking.mode.includes('Virtual') ? (
                        <Video className="w-3 h-3 text-dragonfruit shrink-0" />
                      ) : (
                        <MapPin className="w-3 h-3 text-dragonfruit shrink-0" />
                      )}
                      <span className="truncate">{booking.salon || booking.city || booking.mode || 'Virtual 3D Video Fitting'}</span>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="text-[11px] text-mutedLavender flex items-center justify-between border-t border-cardBorder/60 pt-2">
                    <span>Client: <strong className="text-white font-medium">{booking.clientName || booking.name || booking.fullName || 'VIP Guest'}</strong></span>
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      className="text-mutedLavender hover:text-[#FF5C7A] text-[10.5px] flex items-center gap-1 transition-colors cursor-pointer"
                      title="Cancel Appointment"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Action */}
          {bookings.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-cardBorder bg-inputBg/40 space-y-3">
              <button
                onClick={() => {
                  closeBookingsDrawer();
                  openFittingModal();
                }}
                className="w-full py-3 rounded-xl bg-dragonfruit text-white font-semibold text-xs uppercase tracking-wider shadow-dragonfruit hover:bg-[#FF4696] hover:text-[#1E1033] transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Schedule Another Consultation</span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-mutedLavender px-1">
                <span className="flex items-center gap-1 text-[#35D07F]">
                  <ShieldCheck className="w-3.5 h-3.5" /> Private Concierge Protected
                </span>
                <span>{contactConfig.phone}</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
