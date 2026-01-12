export const communityKeys = {
  all: ['communities'] as const,
  lists: () => [...communityKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...communityKeys.lists(), filters] as const,
  details: () => [...communityKeys.all, 'detail'] as const,
  detail: (id: string) => [...communityKeys.details(), id] as const,
} as const;
