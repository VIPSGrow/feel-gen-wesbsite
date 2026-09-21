"use client"
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
const generateId = () => `toast-${Math.random().toString(36).substr(2, 9)}`;
import type { Toast, ToastType } from '@/lib/types/Toast';
import '@/app/globals.css'; // Ensure global styles available

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => {
      const newToasts = prev.filter((t) => t.id !== id);
      // Clear timeout if exists
      const toast = prev.find((t) => t.id === id);
      if (toast?.timeoutId) {
        clearTimeout(toast.timeoutId);
      }
      return newToasts;
    });
  }, []);

  const addToast = useCallback((message: string, type: ToastType = 'info'): string => {
    const id = generateId();
    const toast: Toast = { id, message, type };
    
    setToasts((prev) => [...prev, toast]);

    // Auto remove after 5 seconds
    const timeoutId = setTimeout(() => removeToast(id), 5000);
    toast.timeoutId = timeoutId;

    return id;
  }, [removeToast]);

  // const removeToast = useCallback((id: string) => {
  //   setToasts((prev) => {
  //     const newToasts = prev.filter((t) => t.id !== id);
  //     // Clear timeout if exists
  //     const toast = prev.find((t) => t.id === id);
  //     if (toast?.timeoutId) {
  //       clearTimeout(toast.timeoutId);
  //     }
  //     return newToasts;
  //   });
  // }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-lg shadow-lg max-w-sm animate-in slide-in-from-right fade-in duration-300
              ${toast.type === 'success' && 'bg-green-500 text-white border border-green-600'}
              ${toast.type === 'error' && 'bg-red-500 text-white border border-red-600'}
              ${toast.type === 'info' && 'bg-blue-500 text-white border border-blue-600'}
              ${toast.type === 'warning' && 'bg-yellow-500 text-white border border-yellow-600'}`}
          >
            <div className="flex justify-between items-center">
              <span>{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 text-white hover:opacity-75"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

