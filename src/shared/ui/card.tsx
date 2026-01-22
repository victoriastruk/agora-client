import { cardVariants } from '../constants/variants';
import { forwardRef } from 'react';

import { cn } from '../lib';

import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ className, padding, variant }))} {...props} />
  ),
);
Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        'text-xl font-semibold leading-tight tracking-tight text-foreground',
        className,
      )}
      {...props}
    >
      {children || ''}
    </Component>
  ),
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground leading-relaxed', className)}
      {...props}
    />
  ),
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  ),
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-3 p-6 border-t border-border mt-6 -mx-6 px-6 pt-4 bg-muted/30',
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
