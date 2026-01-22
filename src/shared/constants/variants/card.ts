import { cva } from 'class-variance-authority';

export const cardVariants = cva(
  'rounded-xl border bg-card text-card-foreground transition-all duration-200',
  {
    defaultVariants: {
      padding: 'default',
      variant: 'default',
    },
    variants: {
      padding: {
        default: '[&>*:first-child]:p-6 [&>*:not(:first-child)]:px-6 [&>*:not(:first-child)]:pb-6',
        lg: '[&>*:first-child]:p-8 [&>*:not(:first-child)]:px-8 [&>*:not(:first-child)]:pb-8',
        none: '',
        sm: '[&>*:first-child]:p-4 [&>*:not(:first-child)]:px-4 [&>*:not(:first-child)]:pb-4',
      },
      variant: {
        default: 'shadow-sm hover:shadow-md',
        elevated: 'shadow-md hover:shadow-lg',
        ghost: 'border-transparent shadow-none bg-transparent',
        interactive: 'shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer',
        outline: 'shadow-none border-2',
      },
    },
  },
);
