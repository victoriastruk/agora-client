import { cn } from '../lib';
import { Badge } from '../ui/badge';
import { flairs, type FlairVariant } from '../types/flair';

interface FlairBadgeProps {
  variant: FlairVariant;
  size?: 'sm' | 'md';
}

export const FlairBadge = ({ variant, size = 'md' }: FlairBadgeProps) => {
  const flair = flairs[variant];

  return (
    <Badge
      variant='secondary'
      className={cn(
        'font-medium text-white border-0',
        size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-0.5 text-sm',
      )}
      style={{ backgroundColor: flair.color }}
    >
      {flair.label}
    </Badge>
  );
};
