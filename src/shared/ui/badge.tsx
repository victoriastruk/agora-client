import { badgeVariants } from '../constants/variants';
import * as React from 'react';

import { cn } from '../lib';

import type { VariantProps } from 'class-variance-authority';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
};

export { Badge };
