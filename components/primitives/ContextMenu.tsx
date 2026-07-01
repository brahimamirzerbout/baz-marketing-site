import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHI } from '../../styles/aether-design-system';

// ═══════════════════════════════════════════════════════════════════
// CONTEXT MENU — Right-click golden-ratio positioned menu
// ═══════════════════════════════════════════════════════════════════

export interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  action: () => void;
  danger?: boolean;
  divider?: boolean;
  disabled?: boolean;
  shortcut?: string;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  children: React.ReactNode;
}

export function ContextMenu({ items, children }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleContext = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = ref.current?.getBoundingClientRect();
    setPos({ x: e.clientX - (rect?.left ?? 0), y: e.clientY - (rect?.top ?? 0) });
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener('click', close);
    window.addEventListener('contextmenu', close);
    return () => {
      window.removeEventListener('click', close);
      window.removeEventListener('contextmenu', close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative" onContextMenu={handleContext}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 1 / PHI, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1 / PHI, y: -5 }}
            transition={{ duration: 0.144, ease: [0.618, 0, 0.618, 1] }}
            className="aether-glass fixed z-[89] min-w-[144px] py-[5px] rounded-[8px]"
            style={{ left: pos.x, top: pos.y, border: '1px solid var(--aether-border-default)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {items.map((item, i) => (
              <React.Fragment key={i}>
                {item.divider && (
                  <div className="h-[1px] my-[3px] mx-[8px]" style={{ background: 'var(--aether-border-default)' }} />
                )}
                <button
                  disabled={item.disabled}
                  onClick={() => {
                    item.action();
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-[8px] px-[13px] py-[5px] text-[11px] aether-transition-colors disabled:opacity-[0.377] text-left"
                  style={{ color: item.danger ? 'var(--aether-danger)' : 'var(--aether-text-secondary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = item.danger
                      ? 'hsla(8, 80%, 58%, 0.055)'
                      : 'var(--aether-l5)';
                    e.currentTarget.style.color = item.danger
                      ? 'var(--aether-danger)'
                      : 'var(--aether-text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = item.danger
                      ? 'var(--aether-danger)'
                      : 'var(--aether-text-secondary)';
                  }}
                >
                  {item.icon && <span className="w-[13px] h-[13px] flex-shrink-0">{item.icon}</span>}
                  <span className="flex-1">{item.label}</span>
                  {item.shortcut && (
                    <span className="aether-mono text-[8px]" style={{ color: 'var(--aether-text-ghost)' }}>
                      {item.shortcut}
                    </span>
                  )}
                </button>
              </React.Fragment>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}