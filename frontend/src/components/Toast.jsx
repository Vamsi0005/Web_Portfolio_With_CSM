import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border transition-all duration-300 transform translate-y-0 opacity-100 max-w-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
      {isSuccess ? (
        <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
      ) : (
        <AlertCircle className="w-6 h-6 text-rose-500 shrink-0" />
      )}
      <p className="text-sm font-medium leading-relaxed">{message}</p>
      <button
        onClick={onClose}
        className="ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
