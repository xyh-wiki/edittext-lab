/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: Toast 提示的全局 Hook 和上下文，用于在任意组件中触发轻量提示
 */
import React, { createContext, useContext, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (type: ToastType, message: string) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let idCounter = 1;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  /**
   * 展示一个新的 Toast 提示，内部使用定时器自动移除。
   */
  const showToast = (type: ToastType, message: string) => {
    const id = idCounter++;
    const toast: ToastItem = { id, type, message };
    setToasts((prev) => [...prev, toast]);
    // 3 秒后自动移除提示
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
};
