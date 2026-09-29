import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toasts, removeToast } = useShop();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-3 border ${
              isSuccess
                ? 'bg-[#182C25]/90 border-[#35D07F]/60 text-white shadow-[#35D07F]/20'
                : isError
                ? 'bg-[#331422]/90 border-[#FF5C7A]/60 text-white shadow-[#FF5C7A]/20'
                : 'bg-[#281640]/95 border-[#3A2555] text-lightLavender shadow-purple-900/30'
            }`}
          >
            <div className="flex items-center gap-3">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#35D07F] shrink-0" />}
              {isError && <AlertCircle className="w-5 h-5 text-[#FF5C7A] shrink-0" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-dragonfruit shrink-0" />}
              <span className="text-sm font-medium leading-relaxed">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 p-1 rounded-lg text-mutedLavender hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
