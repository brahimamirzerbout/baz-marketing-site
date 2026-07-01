import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHI } from '../../styles/aether-design-system';

// ═══════════════════════════════════════════════════════════════════
// TOOLTIP — Golden ratio positioned hover information
// ═══════════════════════════════════════════════════════════════════

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export function Tooltip({ content, children, side = 'top', delay = 377 }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const offsets = {
    top:    { x: 0, y: -8 },
    bottom: { x: 0, y: 8 },
    left:   { x: -8, y: 0 },
    right:  { x: 8, y: 0 },
  };
  const off = offsets[side];

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.span
            initial={{ opacity: 0, scale: 1 / PHI, x: off.x / 2, y: off.y / 2 }}
            animate={{ opacity: 1, scale: 1, x: off.x, y: off.y }}
            exit={{ opacity: 0, scale: 1 / PHI, x: off.x / 2, y: off.y / 2 }}
            transition={{ duration: 0.144, ease: [0.618, 0, 0.618, 1] }}
            className="aether-glass-sm absolute z-[89] whitespace-nowrap px-[5px] py-[3px] text-[10px] font-medium rounded-[3px] pointer-events-none"
            style={{
              background: 'var(--aether-l4)',
              color: 'var(--aether-text-primary)',
              border: '1px solid var(--aether-border-default)',
              boxShadow: 'var(--aether-shadow-md)',
              ...(side === 'top' && { bottom: '100%', left: '50%', marginLeft: '-50%' }),
              ...(side === 'bottom' && { top: '100%', left: '50%', marginLeft: '-50%' }),
              ...(side === 'left' && { right: '100%', top: '50%', marginTop: '-8px' }),
              ...(side === 'right' && { left: '100%', top: '50%', marginTop: '-8px' }),
            }}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}