import { useMemo } from 'react';
import { mockComments } from '@/shared/api/mocks/comments.mock';

export const useUserComments = (userId: string, limit = 20, offset = 0) => {
  const comments = useMemo(() => {
    if (!userId) return [];

    return mockComments
      .filter(comment => comment.author.id === userId)
      .slice(offset, offset + limit);
  }, [userId, limit, offset]);

  return {
    comments,
    isLoading: false,
    error: null,
    refetch: () => {},
  };
};
