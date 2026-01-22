import { Slot } from '@radix-ui/react-slot';
import { buttonVariants } from '../constants/variants';
import * as React from 'react';

import { cn } from '../lib';

import type { VariantProps } from 'class-variance-authority';

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, children, disabled, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        data-slot='button'
        disabled={disabled || loading}
        className={cn(
          buttonVariants({
            className,
            size,
            variant,
            disabled: disabled || loading ? true : undefined,
          }),
        )}
        {...props}
      >
        {loading ? (
          <>
            <span className='size-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
            <span className='sr-only'>Loading...</span>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button };
