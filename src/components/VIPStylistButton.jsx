import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { contactConfig, brandConfig } from '../config/boutiqueConfig';
import { MessageCircle, X, Sparkles, Send, Scissors, PhoneCall, CheckCircle2 } from 'lucide-react';

export const VIPStylistButton = () => {
  const { openFittingModal, addToast } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'stylist',
      text: `Bonjour! I am Jacqueline, Senior Couturière at ${brandConfig.name}. How may I assist your wardrobe or bespoke bridal fittings today?`,
      time: 'Just now'
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage;
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: 'Now' }
    ]);
    setChatMessage('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'stylist',
          text: `Thank you for your enquiry. For immediate private salon fittings or custom measurement consultations, you can also book directly with us or connect on WhatsApp (${contactConfig.phone}).`,
          time: 'Just now'
        }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-20 lg:bottom-6 left-3 sm:left-6 z-30">
      {/* Floating Trigger Button */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-darkViolet/95 backdrop-blur-md border border-cardBorder text-lightLavender shadow-2xl hover:border-dragonfruit hover:shadow-dragonfruit transition-all duration-300 transform hover:scale-105 cursor-pointer"
          title="Connect with VIP Stylist"
        >
          <div className="relative">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-dragonfruit flex items-center justify-center text-white shadow-[0_0_12px_#FF2A8D]">
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#35D07F] rounded-full border-2 border-darkViolet" />
          </div>
          <div className="text-left hidden sm:block pr-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-dragonfruit block">
              VIP Concierge
            </span>
            <span className="text-xs font-semibold text-mainHeading">
              Private Stylist Online
            </span>
          </div>
        </button>
      ) : (
        /* Chat Box Popover */
        <div className="w-[calc(100vw-24px)] max-w-sm sm:w-96 rounded-3xl bg-cardBg border border-cardBorder shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
          {/* Header */}
          <div className="p-4 bg-darkViolet border-b border-cardBorder flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={brandConfig.founderImage}
                  alt="Stylist"
                  className="w-10 h-10 rounded-full object-cover border border-dragonfruit"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#35D07F] rounded-full border-2 border-darkViolet" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-mainHeading font-fashion">
                  Jacqueline (Senior Stylist)
                </h4>
                <span className="text-[10px] text-mutedLavender flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-dragonfruit" /> {brandConfig.name} Atelier
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-mutedLavender hover:text-white hover:bg-inputBg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 bg-inputBg border-b border-cardBorder/60 flex items-center justify-between text-[11px]">
            <button
              onClick={() => {
                setIsOpen(false);
                openFittingModal();
              }}
              className="text-dragonfruit hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Scissors className="w-3 h-3" /> Book Fitting
            </button>
            <a
              href={`https://wa.me/${contactConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="text-lightLavender hover:text-dragonfruit font-medium flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3 text-[#35D07F]" /> WhatsApp Desk
            </a>
          </div>

          {/* Message History */}
          <div className="p-4 h-56 overflow-y-auto space-y-3 text-xs bg-nightViolet/50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-dragonfruit text-white rounded-br-none shadow-dragonfruit'
                      : 'bg-inputBg border border-cardBorder text-lightLavender rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-mutedLavender mt-0.5 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-darkViolet border-t border-cardBorder flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Ask about fabrics, sizing, styling..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-inputBg border border-inputBorder text-mainHeading text-xs placeholder:text-mutedLavender/50 focus:outline-none focus:border-dragonfruit"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-dragonfruit text-white hover:bg-[#FF4696] hover:text-[#1E1033] transition-colors cursor-pointer shadow-dragonfruit"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
