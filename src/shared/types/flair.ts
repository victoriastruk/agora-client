export const flairs = {
  new: {
    label: 'New',
    color: '#10b981',
  },
  hot: {
    label: 'Hot',
    color: '#ef4444',
  },
  trending: {
    label: 'Trending',
    color: '#f59e0b',
  },
  beta: {
    label: 'Beta',
    color: '#3b82f6',
  },
} as const;

export type FlairVariant = keyof typeof flairs;
