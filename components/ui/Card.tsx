import { cn } from '@/lib/cn';
import type { ReactNode, HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'article' | 'section';
  hover?: boolean;
  bordered?: boolean;
  padded?: boolean;
  children: ReactNode;
};

export function Card({
  as: Tag = 'div',
  hover = false,
  bordered = true,
  padded = true,
  className,
  children,
  ...rest
}: Props) {
  return (
    <Tag
      className={cn(
        'bg-card text-card-foreground rounded-lg',
        bordered && 'border border-border',
        padded && 'p-6 md:p-7',
        hover && 'transition-all duration-200 hover:-translate-y-px hover:border-foreground/20',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}