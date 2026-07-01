import React from 'react';
import { motion } from 'framer-motion';
import { PHI, SPACING, DURATION } from '../../styles/aether-design-system';

// ═══════════════════════════════════════════════════════════════════
// ACTIVITY BAR — Fibonacci-width vertical navigation
// Content agnostic: the icons define themselves, the bar adapts.
// ═══════════════════════════════════════════════════════════════════

export interface ActivityItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

interface ActivityBarProps {
  items: ActivityItem[];
  activeId: string;
  onSelect: (id: string) => void;
  bottomItems?: ActivityItem[];
}

export function ActivityBar({ items, activeId, onSelect, bottomItems = [] }: ActivityBarProps) {
  const renderItem = (item: ActivityItem) => {
    const active = activeId === item.id;
    return (
      <motion.button
        key={item.id}
        whileHover={{ scale: 1 + 1 / (PHI * 10), x: 1 }}
        whileTap={{ scale: 1 - 1 / (PHI * 10) }}
        onClick={() => onSelect(item.id)}
        className="relative p-[8px] rounded-[13px] aether-transition-colors"
        style={{
          color: active ? 'var(--aether-accent, var(--aether-text-primary))' : 'var(--aether-text-ghost)',
          background: active ? 'var(--aether-accent-bg, var(--aether-l4))' : 'transparent',
          border: active ? '1px solid var(--aether-accent-border, var(--aether-border-default))' : '1px solid transparent',
          boxShadow: active ? 'var(--aether-shadow-glow)' : 'none',
        }}
        title={item.label}
      >
        {active && (
          <motion.div
            layoutId="activity-active"
            className="absolute top-[2px] right-[2px] w-[3px] h-[3px] rounded-full"
            style={{ background: 'var(--aether-accent, var(--aether-text-primary))' }}
            animate={{ scale: [1, 1.236, 1], opacity: [1, 0.610, 1] }}
            transition={{ duration: DURATION.smooth / 1000, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        {item.icon}
        {item.badge !== undefined && item.badge > 0 && (
          <span
            className="absolute -top-[1px] -right-[1px] text-[8px] font-bold px-[2px] py-[1px] rounded-[3px]"
            style={{
              background: 'var(--aether-danger)',
              color: 'white',
              minWidth: '13px',
              textAlign: 'center',
            }}
          >
            {item.badge > 99 ? '99+' : item.badge}
          </span>
        )}
      </motion.button>
    );
  };

  return (
    <motion.aside
      initial={{ x: -SPACING[13], opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: DURATION.normal / 1000, ease: [0.618, 0, 0.618, 1] }}
      className="flex flex-col items-center py-[13px] gap-[8px] flex-shrink-0"
      style={{
        width: `${SPACING[34]}px`,
        background: 'var(--aether-gradient-void)',
        borderRight: '1px solid var(--aether-border-subtle)',
        backdropFilter: `blur(${SPACING[8]}px) saturate(1.618)`,
      }}
    >
      {items.map(renderItem)}
      <div className="flex-1" />
      {bottomItems.map(renderItem)}
    </motion.aside>
  );
}