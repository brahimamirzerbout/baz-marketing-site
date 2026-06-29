import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type Variant = 'default' | 'accent' | 'success' | 'info' | 'warning' | 'ink';
type Size = 'sm' | 'md';

const variants: Record<Variant, string> = {
  default: 'bg-paper-300 text-ink-700 dark:bg-paper-200 dark:text-ink-900',
  accent: 'bg-accent-soft text-accent-700',
  success: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  info: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  ink: 'bg-ink-900 text-paper dark:bg-paper dark:text-ink-900',
};

const sizes: Record<Size, string> = {
  sm: 'text-[11px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-mono uppercase tracking-wider',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
