import { inputVariants } from '../constants/variants';
import { forwardRef } from 'react';

import { cn } from '../lib';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

type InputProps = Omit<ComponentProps<'input'>, 'size'> & VariantProps<typeof inputVariants>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, variant, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot='input'
      className={cn(inputVariants({ className, size, variant }))}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export { Input };
