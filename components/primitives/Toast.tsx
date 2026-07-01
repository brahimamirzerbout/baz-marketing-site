import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHI, DURATION } from '../../styles/aether-design-system';

// ═══════════════════════════════════════════════════════════════════
// TOAST — Fibonacci-stacked notification system
// ═══════════════════════════════════════════════════════════════════

export type ToastType = 'info' | 'success' | 'warning' | 'danger';

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

const TOAST_COLORS: Record<ToastType, { border: string; icon: string }> = {
  info:    { border: 'hsla(210, 75%, 60%, 0.233)',  icon: 'ℹ' },
  success: { border: 'hsla(145, 70%, 55%, 0.233)',  icon: '✓' },
  warning: { border: 'hsla(38, 85%, 58%, 0.233)',   icon: '⚠' },
  danger:  { border: 'hsla(8, 80%, 58%, 0.233)',    icon: '✕' },
};

export function Toast({ toast, onDismiss }: ToastProps) {
  const colors = TOAST_COLORS[toast.type];
  const duration = toast.duration ?? DURATION.smooth * 5; // ~3s

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), duration);
    return () => clearTimeout(timer);
  }, [toast.id, duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 89, scale: 1 / PHI }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 89, scale: 1 / PHI }}
      transition={{ duration: DURATION.fast / 1000, ease: [0.618, 0, 0.618, 1] }}
      className="aether-glass flex items-start gap-[8px] px-[13px] py-[8px] rounded-[13px] min-w-[233px] max-w-[377px]"
      style={{ borderLeft: `2px solid ${colors.border}` }}
    >
      <span className="text-[13px] flex-shrink-0 mt-[1px]" style={{ color: colors.border }}>
        {colors.icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-medium" style={{ color: 'var(--aether-text-primary)' }}>
          {toast.title}
        </div>
        {toast.message && (
          <div className="text-[10px] mt-[2px]" style={{ color: 'var(--aether-text-tertiary)' }}>
            {toast.message}
          </div>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 w-[13px] h-[13px] flex items-center justify-center rounded-[3px] aether-transition-colors"
        style={{ color: 'var(--aether-text-ghost)' }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--aether-text-primary)'; e.currentTarget.style.background = 'var(--aether-l5)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--aether-text-ghost)'; e.currentTarget.style.background = 'transparent'; }}
      >
        ✕
      </button>
    </motion.div>
  );
}

// ─── TOAST CONTAINER ───
export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const push = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  // Expose push globally (in real app, use context)
  useEffect(() => {
    (window as any).__aetherToast = push;
  }, [push]);

  return (
    <div className="fixed bottom-[21px] right-[21px] z-[55] flex flex-col gap-[8px]">
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}