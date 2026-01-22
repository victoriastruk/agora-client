import { useMemo } from 'react';
import { mockComments } from '@/shared/api/mocks/comments.mock';

export const useComments = (postId: string, limit = 50, offset = 0) => {
  const comments = useMemo(() => {
    if (!postId) return [];

    return mockComments.filter(comment => comment.postId === postId).slice(offset, offset + limit);
  }, [postId, limit, offset]);

  return {
    comments,
    isLoading: false,
    error: null,
    refetch: () => {},
  };
};
